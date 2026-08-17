import { browser } from '$app/environment';
import { defaults } from './defaults';
import type { SiteContent } from './schema';
import { ApiError, siteContentApi, treksApi, journalApi, testimonialsApi, faqsApi, statsApi } from '$lib/api';

/**
 * Runs a create/update call that might target a row the admin hasn't finished
 * filling in yet (e.g. a freshly-added FAQ with a still-empty answer). A 400
 * from the backend's required-field validation in that case isn't a real
 * failure — it just means "not ready to persist yet", so we skip it silently
 * and let the next autosave tick retry once the field has content. Any other
 * error (network, 401, 500) is a real failure and propagates.
 */
async function attemptSync<T>(fn: () => Promise<T>): Promise<T | undefined> {
	try {
		return await fn();
	} catch (err) {
		if (err instanceof ApiError && err.status === 400) return undefined;
		throw err;
	}
}

const SAVE_DEBOUNCE_MS = 600;

export const content = $state<SiteContent>(structuredClone(defaults));

export type SaveState = 'idle' | 'loading' | 'saving' | 'saved' | 'error';
/**
 * `hasLoaded` is false until the initial API fetch settles (success or
 * failure). Pages that look up a single item by slug (trek/article detail)
 * must check this before rendering a "not found" state — otherwise a page
 * for content that exists renders "not found" for the brief window before
 * `content` is hydrated past its bundled-defaults starting value.
 */
export const cmsMeta = $state<{ saveState: SaveState; error: string | null; hasLoaded: boolean }>({
	saveState: 'idle',
	error: null,
	hasLoaded: false
});

/** Snapshot of what the server currently has, used to diff on every autosave. */
let lastSynced: SiteContent = structuredClone(defaults);

let saveTimeout: ReturnType<typeof setTimeout> | undefined;
let initialized = false;
/** True while an API-driven hydration is writing into `content`, so that write doesn't get echoed back as a save. */
let hydrating = false;

const SECTION_KEYS = [
	'seo',
	'nav',
	'footer',
	'hero',
	'whyGrid',
	'regions',
	'activities',
	'trailStory',
	'ebcTiers',
	'planYourTrek',
	'about',
	'contact',
	'treksPage',
	'journalPage',
	'trekDetailLabels',
	'journalDetailLabels'
] as const satisfies readonly (keyof SiteContent)[];

function isEqual(a: unknown, b: unknown): boolean {
	return JSON.stringify(a) === JSON.stringify(b);
}

async function loadFromApi() {
	cmsMeta.saveState = 'loading';
	try {
		const data = await siteContentApi.fetchSiteContent();
		hydrating = true;
		for (const key of Object.keys(data) as (keyof SiteContent)[]) {
			(content as Record<string, unknown>)[key] = data[key];
		}
		lastSynced = structuredClone(data);
		cmsMeta.saveState = 'idle';
		cmsMeta.error = null;
	} catch (err) {
		console.error('Failed to load site content from the API, showing bundled defaults', err);
		cmsMeta.saveState = 'error';
		cmsMeta.error = 'Could not load live content. Showing defaults.';
	} finally {
		hydrating = false;
		cmsMeta.hasLoaded = true;
	}
}

/**
 * Reconciles a flat, id-keyed collection (testimonials, FAQs, stats) against
 * the server via create/update/delete. These rows carry no `order` field in
 * the frontend type — array position *is* the order (that's what the
 * repeater's move-up/down buttons manipulate) — so `order` is derived from
 * each item's index here and sent explicitly on every create/update. A pure
 * reorder (move up/down) changes no item's own fields, only its index, so
 * the index is part of what's diffed against `previous`, not just the item
 * content — otherwise a reorder would look like "nothing changed" and never
 * reach the server.
 *
 * Returns the reconciled array (for `content`) alongside just the subset
 * that's confirmed persisted (for `lastSynced` — an item skipped by
 * `attemptSync` because it's still incomplete stays out of this, so it's
 * retried on the next edit).
 */
async function syncIdCollection<T extends { id: string }>(
	current: T[],
	previous: T[],
	ops: {
		create: (payload: Omit<T, 'id'> & { order: number }) => Promise<T>;
		update: (id: string, payload: Omit<T, 'id'> & { order: number }) => Promise<T>;
		remove: (id: string) => Promise<void>;
	}
): Promise<{ result: T[]; synced: T[] }> {
	const previousById = new Map(previous.map((item, order) => [item.id, { item, order }]));
	const result: T[] = [];
	const synced: T[] = [];

	for (let order = 0; order < current.length; order++) {
		const item = current[order];
		const { id, ...rest } = item;
		const payload = { ...rest, order } as Omit<T, 'id'> & { order: number };
		const prevEntry = previousById.get(id);

		if (!prevEntry) {
			const created = await attemptSync(() => ops.create(payload));
			result.push(created ?? item);
			if (created) synced.push(created);
		} else if (!isEqual(prevEntry.item, item) || prevEntry.order !== order) {
			const updated = await attemptSync(() => ops.update(id, payload));
			result.push(updated ?? item);
			if (updated) synced.push(updated);
		} else {
			result.push(item);
			synced.push(item);
		}
	}

	const currentIds = new Set(current.map((item) => item.id));
	for (const prev of previous) {
		if (!currentIds.has(prev.id)) await ops.remove(prev.id);
	}

	return { result, synced };
}

async function syncSections() {
	for (const key of SECTION_KEYS) {
		if (!isEqual(content[key], lastSynced[key])) {
			await siteContentApi.patchSection(key, content[key]);
			(lastSynced as Record<string, unknown>)[key] = $state.snapshot(content[key]);
		}
	}

	// statsSection's copy (heading/body/backgroundImage) is a JSON section like any other;
	// its `stats` array is a separate relational collection, synced below with the others.
	const { stats: _currentStats, ...currentCopy } = content.statsSection;
	const { stats: _prevStats, ...prevCopy } = lastSynced.statsSection;
	if (!isEqual(currentCopy, prevCopy)) {
		await siteContentApi.patchSection('statsSection', content.statsSection);
		lastSynced.statsSection = { ...lastSynced.statsSection, ...$state.snapshot(currentCopy) };
	}
}

async function syncTreks() {
	const current = content.treks;
	const previous = lastSynced.treks;
	const previousBySlug = new Map(previous.map((trek) => [trek.slug, trek]));
	const currentSlugs = new Set(current.map((trek) => trek.slug));

	const syncedTreks: typeof current = [];
	const syncedItineraries: SiteContent['itineraries'] = {};

	for (const trek of current) {
		const itinerary = content.itineraries[trek.slug] ?? [];
		const prev = previousBySlug.get(trek.slug);
		const prevItinerary = lastSynced.itineraries[trek.slug] ?? [];

		if (!prev) {
			const created = await attemptSync(() => treksApi.createTrek({ ...trek, itinerary }));
			if (created) {
				syncedTreks.push(trek);
				syncedItineraries[trek.slug] = itinerary;
			}
		} else if (!isEqual(prev, trek)) {
			const { slug, ...payload } = trek;
			const updated = await attemptSync(() => treksApi.updateTrek(slug, { ...payload, itinerary }));
			if (updated) {
				syncedTreks.push(trek);
				syncedItineraries[trek.slug] = itinerary;
			} else {
				syncedItineraries[trek.slug] = prevItinerary;
			}
		} else if (!isEqual(prevItinerary, itinerary)) {
			const replaced = await attemptSync(() => treksApi.replaceItinerary(trek.slug, itinerary));
			syncedTreks.push(trek);
			syncedItineraries[trek.slug] = replaced ? itinerary : prevItinerary;
		} else {
			syncedTreks.push(trek);
			syncedItineraries[trek.slug] = itinerary;
		}
	}

	for (const prev of previous) {
		if (!currentSlugs.has(prev.slug)) await treksApi.deleteTrek(prev.slug);
	}

	lastSynced.treks = $state.snapshot(syncedTreks);
	lastSynced.itineraries = $state.snapshot(syncedItineraries);
}

async function syncJournal() {
	const current = content.journal;
	const previous = lastSynced.journal;
	const previousBySlug = new Map(previous.map((article) => [article.slug, article]));
	const currentSlugs = new Set(current.map((article) => article.slug));

	const syncedArticles: typeof current = [];

	for (const article of current) {
		const prev = previousBySlug.get(article.slug);
		if (!prev) {
			const created = await attemptSync(() => journalApi.createArticle(article));
			if (created) syncedArticles.push(article);
		} else if (!isEqual(prev, article)) {
			const { slug, ...payload } = article;
			const updated = await attemptSync(() => journalApi.updateArticle(slug, payload));
			if (updated) syncedArticles.push(article);
		} else {
			syncedArticles.push(article);
		}
	}

	for (const prev of previous) {
		if (!currentSlugs.has(prev.slug)) await journalApi.deleteArticle(prev.slug);
	}

	lastSynced.journal = $state.snapshot(syncedArticles);
}

async function persist() {
	if (hydrating) return;
	cmsMeta.saveState = 'saving';
	try {
		await syncSections();

		{
			const { result, synced } = await syncIdCollection(content.testimonials, lastSynced.testimonials, {
				create: testimonialsApi.createTestimonial,
				update: testimonialsApi.updateTestimonial,
				remove: testimonialsApi.deleteTestimonial
			});
			content.testimonials = result;
			lastSynced.testimonials = $state.snapshot(synced);
		}

		{
			const { result, synced } = await syncIdCollection(content.faqs, lastSynced.faqs, {
				create: faqsApi.createFaq,
				update: faqsApi.updateFaq,
				remove: faqsApi.deleteFaq
			});
			content.faqs = result;
			lastSynced.faqs = $state.snapshot(synced);
		}

		{
			const { result, synced } = await syncIdCollection(content.statsSection.stats, lastSynced.statsSection.stats, {
				create: statsApi.createStat,
				update: statsApi.updateStat,
				remove: statsApi.deleteStat
			});
			content.statsSection.stats = result;
			lastSynced.statsSection.stats = $state.snapshot(synced);
		}

		await syncTreks();
		await syncJournal();

		cmsMeta.saveState = 'saved';
		cmsMeta.error = null;
	} catch (err) {
		console.error('Failed to save changes', err);
		cmsMeta.saveState = 'error';
		cmsMeta.error = 'Failed to save. Your last change may not have been persisted.';
	}
}

function scheduleSave() {
	if (saveTimeout) clearTimeout(saveTimeout);
	saveTimeout = setTimeout(persist, SAVE_DEBOUNCE_MS);
}

/**
 * Hydrates the store from the API and wires up autosave. Call once,
 * client-side, from the root layout — safe to call multiple times.
 */
export function initCms() {
	if (initialized || !browser) return;
	initialized = true;

	loadFromApi().then(() => {
		$effect.root(() => {
			let first = true;
			$effect(() => {
				// Reading every field (via serialization) is what subscribes this
				// effect to deep mutations anywhere in the content tree.
				JSON.stringify(content);
				if (first) {
					first = false;
					return;
				}
				if (hydrating) return;
				scheduleSave();
			});
		});
	});
}

export function resetSection<K extends keyof SiteContent>(key: K) {
	content[key] = structuredClone(defaults[key]);
}

export function resetAll() {
	for (const key of Object.keys(defaults) as (keyof SiteContent)[]) {
		(content as Record<string, unknown>)[key] = structuredClone(defaults[key as keyof SiteContent]);
	}
}

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
