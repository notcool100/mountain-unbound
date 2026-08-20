<script lang="ts">
	import { goto } from '$app/navigation';
	import { Plus, Copy, Trash2, ArrowRight } from '@lucide/svelte';
	import { content, slugify } from '$lib/cms/store.svelte';
	import type { Trek } from '$lib/data/treks';

	function uniqueSlug(base: string): string {
		let slug = base || 'new-trek';
		let i = 2;
		while (content.treks.some((t) => t.slug === slug)) {
			slug = `${base || 'new-trek'}-${i}`;
			i++;
		}
		return slug;
	}

	function addTrek() {
		const slug = uniqueSlug('new-trek');
		const trek: Trek = {
			slug,
			category: 'signature',
			name: 'New Trek',
			region: 'Nepal Himalaya',
			tagline: 'Add a tagline for this trek',
			summary: 'Add a short summary for this trek.',
			overview: 'Add an overview for this trek.',
			days: 7,
			maxAltitude: 'TBD',
			difficulty: 'Moderate',
			bestSeasons: 'TBD',
			groupSize: 'TBD',
			startEnd: 'TBD',
			price: 0,
			priceNote: 'per person, twin-share teahouse',
			image: '/images/ebc-card',
			imageAlt: 'New trek',
			gallery: [],
			highlights: [],
			includes: [],
			excludes: [],
			departures: []
		};
		content.treks = [...content.treks, trek];
		content.itineraries[slug] = [];
		goto(`/admin/treks/${slug}`);
	}

	function duplicateTrek(trek: Trek) {
		const slug = uniqueSlug(`${trek.slug}-copy`);
		// trek and content.itineraries are reactive $state — native structuredClone()
		// can't clone Svelte's reactive proxies, so snapshot to plain data first
		// ($state.snapshot already deep-clones, so no separate structuredClone needed).
		const copy: Trek = $state.snapshot(trek);
		copy.slug = slug;
		copy.name = `${trek.name} (Copy)`;
		content.treks = [...content.treks, copy];
		content.itineraries[slug] = $state.snapshot(content.itineraries[trek.slug] ?? []);
	}

	let confirmingDelete = $state<string | null>(null);

	function deleteTrek(slug: string) {
		if (confirmingDelete !== slug) {
			confirmingDelete = slug;
			return;
		}
		content.treks = content.treks.filter((t) => t.slug !== slug);
		delete content.itineraries[slug];
		confirmingDelete = null;
	}
</script>

<svelte:head>
	<title>Treks | Windhorse Admin</title>
</svelte:head>

<div class="mx-auto max-w-[1100px]">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="font-display text-3xl font-bold text-ink">Treks & itineraries</h1>
			<p class="mt-2 font-sans text-sm text-muted">{content.treks.length} treks. Click one to edit every detail.</p>
		</div>
		<button
			type="button"
			onclick={addTrek}
			class="flex shrink-0 items-center gap-2 rounded-lg bg-crimson px-4 py-2.5 font-sans text-sm font-semibold text-on-scrim transition-colors hover:bg-crimson-dim"
		>
			<Plus class="h-4 w-4" strokeWidth={2} aria-hidden="true" />
			Add trek
		</button>
	</div>

	<div class="mt-8 flex flex-col gap-3">
		{#each content.treks as trek (trek.slug)}
			<div class="shadow-cozy flex flex-wrap items-center gap-4 rounded-2xl border border-ink/10 bg-surface p-5">
				<div class="min-w-0 flex-1">
					<a href={`/admin/treks/${trek.slug}`} class="font-display text-lg font-bold text-ink hover:text-gold">
						{trek.name}
					</a>
					<p class="mt-1 font-sans text-sm text-muted">
						{trek.slug} &middot; {trek.category} &middot; {trek.days} days &middot; ${trek.price.toLocaleString()}
					</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<button
						type="button"
						onclick={() => duplicateTrek(trek)}
						title="Duplicate"
						class="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink"
					>
						<Copy class="h-4 w-4" strokeWidth={1.75} />
					</button>
					<button
						type="button"
						onclick={() => deleteTrek(trek.slug)}
						title="Delete"
						class="flex h-9 items-center gap-1.5 rounded-lg px-3 font-sans text-xs font-semibold transition-colors {confirmingDelete ===
						trek.slug
							? 'bg-crimson/10 text-crimson'
							: 'text-muted hover:bg-crimson/10 hover:text-crimson'}"
					>
						<Trash2 class="h-4 w-4" strokeWidth={1.75} />
						{confirmingDelete === trek.slug ? 'Confirm?' : ''}
					</button>
					<a
						href={`/admin/treks/${trek.slug}`}
						class="flex h-9 items-center gap-1.5 rounded-lg border border-ink/20 px-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold"
					>
						Edit
						<ArrowRight class="h-3.5 w-3.5" strokeWidth={2} />
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
