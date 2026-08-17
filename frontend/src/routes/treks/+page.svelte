<script lang="ts">
	import {
		CalendarDays,
		Mountain,
		Gauge,
		Users,
		ArrowRight,
		Flame,
		Footprints,
		Compass,
		X
	} from '@lucide/svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import type { TrekCategory, Trek } from '$lib/data/treks';
	import { revealStagger, reveal } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';
	import { resolveImageSrcset } from '$lib/cms/media';

	const categoryTabs: { key: TrekCategory | 'all'; label: string; icon: typeof Flame }[] = [
		{ key: 'all', label: 'All Treks', icon: Compass },
		{ key: 'signature', label: 'Signature Treks', icon: Flame },
		{ key: 'peak-climbing', label: 'Peak Climbing', icon: Mountain },
		{ key: 'short-treks', label: 'Short Treks', icon: Footprints }
	];

	const difficulties: Trek['difficulty'][] = ['Moderate', 'Challenging', 'Strenuous'];

	const durationBuckets = [
		{ key: 'all', label: 'Any length' },
		{ key: 'short', label: 'Under 10 days' },
		{ key: 'mid', label: '10 – 15 days' },
		{ key: 'long', label: '16+ days' }
	] as const;

	const sortOptions = [
		{ key: 'featured', label: 'Featured' },
		{ key: 'price-asc', label: 'Price: low to high' },
		{ key: 'price-desc', label: 'Price: high to low' },
		{ key: 'days-asc', label: 'Duration: shortest first' },
		{ key: 'days-desc', label: 'Duration: longest first' }
	] as const;

	let activeCategory = $state<TrekCategory | 'all'>('all');
	let activeDifficulties = $state<Set<Trek['difficulty']>>(new Set());
	let durationBucket = $state<(typeof durationBuckets)[number]['key']>('all');
	let sortBy = $state<(typeof sortOptions)[number]['key']>('featured');

	function selectCategory(key: TrekCategory | 'all') {
		activeCategory = key;
	}

	function toggleDifficulty(d: Trek['difficulty']) {
		const next = new Set(activeDifficulties);
		if (next.has(d)) next.delete(d);
		else next.add(d);
		activeDifficulties = next;
	}

	function inDurationBucket(days: number, bucket: (typeof durationBuckets)[number]['key']) {
		if (bucket === 'short') return days < 10;
		if (bucket === 'mid') return days >= 10 && days <= 15;
		if (bucket === 'long') return days >= 16;
		return true;
	}

	let filteredTreks = $derived.by(() => {
		let list = content.treks.filter((t) => activeCategory === 'all' || t.category === activeCategory);
		if (activeDifficulties.size > 0) {
			list = list.filter((t) => activeDifficulties.has(t.difficulty));
		}
		list = list.filter((t) => inDurationBucket(t.days, durationBucket));

		const sorted = [...list];
		if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
		else if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
		else if (sortBy === 'days-asc') sorted.sort((a, b) => a.days - b.days);
		else if (sortBy === 'days-desc') sorted.sort((a, b) => b.days - a.days);

		return sorted;
	});

	let activeFilterCount = $derived(
		activeDifficulties.size + (durationBucket !== 'all' ? 1 : 0)
	);

	function clearFilters() {
		activeDifficulties = new Set();
		durationBucket = 'all';
		sortBy = 'featured';
	}
</script>

<svelte:head>
	<title>{content.treksPage.seo.title}</title>
	<meta name="description" content={content.treksPage.seo.description} />
</svelte:head>

<PageBanner
	image={content.treksPage.banner.image}
	imageAlt={content.treksPage.banner.imageAlt}
	eyebrow={content.treksPage.banner.eyebrow}
	title={content.treksPage.banner.title}
	subtitle={content.treksPage.banner.subtitle}
/>

<section class="relative bg-snow px-5 py-24 md:px-8 md:py-32">
	<div class="mx-auto max-w-[1400px]">
		<div class="scrollbar-none flex items-center gap-7 overflow-x-auto border-b border-ink/10 pb-5 sm:gap-9">
			{#each categoryTabs as tab (tab.key)}
				<button
					type="button"
					onclick={() => selectCategory(tab.key)}
					aria-current={activeCategory === tab.key ? 'true' : undefined}
					class="group relative flex shrink-0 items-center gap-2 py-1 font-sans text-sm transition-colors sm:text-base {activeCategory ===
					tab.key
						? 'font-semibold text-ink'
						: 'text-muted hover:text-ink'}"
				>
					<tab.icon class="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} aria-hidden="true" />
					{tab.label}
					<span
						class="absolute right-0 -bottom-[21px] left-0 h-[2px] bg-gold transition-transform duration-300 {activeCategory ===
						tab.key
							? 'scale-x-100'
							: 'scale-x-0'}"
					></span>
				</button>
			{/each}
		</div>

		<div class="mt-10 grid grid-cols-1 gap-10 md:mt-12 lg:grid-cols-[1fr_272px]">
			<div>
				<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
					<p class="font-sans text-sm text-muted">
						{filteredTreks.length}
						{filteredTreks.length === 1 ? 'trek' : 'treks'} found
					</p>
					<label class="flex items-center gap-2 font-sans text-sm text-ink/80">
						Sort by
						<select
							bind:value={sortBy}
							class="h-10 rounded-lg border border-ink/20 bg-surface px-2.5 font-sans text-sm text-ink focus-visible:border-gold"
						>
							{#each sortOptions as opt (opt.key)}
								<option value={opt.key}>{opt.label}</option>
							{/each}
						</select>
					</label>
				</div>

				{#if filteredTreks.length > 0}
					<div
						use:revealStagger={{ y: 28, stagger: 0.1 }}
						class="grid grid-cols-1 gap-6 sm:grid-cols-2"
					>
						{#each filteredTreks as trek (trek.slug)}
							<a
								href={`/treks/${trek.slug}`}
								class="group shadow-cozy shadow-cozy-hover flex flex-col overflow-hidden rounded-2xl bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
							>
								<div class="relative aspect-[4/3] w-full overflow-hidden">
									<picture>
										{#if resolveImageSrcset(trek.image).srcset}
											<source
												srcset={resolveImageSrcset(trek.image).srcset}
												type="image/webp"
												sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
											/>
										{/if}
										<img
											src={resolveImageSrcset(trek.image).src}
											alt={trek.imageAlt}
											class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
											loading="lazy"
											decoding="async"
										/>
									</picture>
									<div
										class="pointer-events-none absolute inset-0"
										style="background: linear-gradient(180deg, rgba(11,15,20,0) 55%, rgba(11,15,20,0.85) 100%);"
									></div>
									<p
										class="absolute right-4 bottom-4 left-4 font-sans text-xs font-semibold tracking-[0.1em] text-on-scrim uppercase"
									>
										{trek.region}
									</p>
								</div>

								<div class="flex flex-1 flex-col p-6">
									<h2 class="font-display text-2xl font-bold text-ink" style="letter-spacing: -0.01em;">
										{trek.name}
									</h2>
									<p class="mt-1 pb-0.5 font-sans text-sm leading-[1.4] text-ink/70 italic">
										{trek.tagline}
									</p>

									<dl class="mt-5 grid grid-cols-2 gap-y-3 border-t border-ink/10 pt-4">
										<div class="flex items-center gap-1.5">
											<CalendarDays class="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
											<dt class="sr-only">Duration</dt>
											<dd class="font-sans text-xs text-ink/80">{trek.days} days</dd>
										</div>
										<div class="flex items-center gap-1.5">
											<Mountain class="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
											<dt class="sr-only">Maximum altitude</dt>
											<dd class="font-sans text-xs text-ink/80">{trek.maxAltitude.split('·')[0].trim()}</dd>
										</div>
										<div class="flex items-center gap-1.5">
											<Gauge class="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
											<dt class="sr-only">Difficulty</dt>
											<dd class="font-sans text-xs text-ink/80">{trek.difficulty}</dd>
										</div>
										<div class="flex items-center gap-1.5">
											<Users class="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
											<dt class="sr-only">Group size</dt>
											<dd class="font-sans text-xs text-ink/80">{trek.groupSize}</dd>
										</div>
									</dl>

									<div class="mt-6 flex flex-1 items-end justify-between gap-4">
										<p class="font-sans text-sm text-ink">
											From
											<span class="block font-display text-2xl font-bold text-gold"
												>${trek.price.toLocaleString()}</span
											>
										</p>
										<span
											class="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-ink"
										>
											Itinerary
											<ArrowRight
												class="h-4 w-4 transition-transform group-hover:translate-x-1"
												strokeWidth={1.75}
											/>
										</span>
									</div>
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<div class="rounded-2xl border border-dashed border-ink/20 px-6 py-16 text-center">
						<p class="font-display text-xl font-bold text-ink">No treks match those filters</p>
						<p class="mt-2 font-sans text-sm text-muted">
							Try a different difficulty or duration, or clear your filters below.
						</p>
						<button
							type="button"
							onclick={clearFilters}
							class="mt-6 inline-flex h-11 items-center rounded-lg border border-ink/20 px-5 font-sans text-sm font-semibold text-ink transition-colors hover:border-gold"
						>
							Clear filters
						</button>
					</div>
				{/if}

				{#if filteredTreks.length > 0}
					<div use:reveal class="mt-16 overflow-x-auto md:mt-20">
						<table class="w-full min-w-[640px] border-collapse font-sans text-sm">
							<caption class="mb-4 text-left font-display text-2xl font-bold text-ink">
								Compare at a glance
							</caption>
							<thead>
								<tr class="border-b border-ink/15 text-left text-xs tracking-wide text-muted uppercase">
									<th scope="col" class="py-3 pr-4 font-medium">Trek</th>
									<th scope="col" class="py-3 pr-4 font-medium">Duration</th>
									<th scope="col" class="py-3 pr-4 font-medium">Max altitude</th>
									<th scope="col" class="py-3 pr-4 font-medium">Difficulty</th>
									<th scope="col" class="py-3 pr-4 font-medium">Best seasons</th>
									<th scope="col" class="py-3 font-medium">From</th>
								</tr>
							</thead>
							<tbody>
								{#each filteredTreks as trek (trek.slug)}
									<tr class="border-b border-ink/8 text-ink/85">
										<th scope="row" class="py-4 pr-4 font-sans font-semibold text-ink">
											<a href={`/treks/${trek.slug}`} class="hover:text-gold">{trek.name}</a>
										</th>
										<td class="py-4 pr-4">{trek.days} days</td>
										<td class="py-4 pr-4">{trek.maxAltitude}</td>
										<td class="py-4 pr-4">{trek.difficulty}</td>
										<td class="py-4 pr-4">{trek.bestSeasons}</td>
										<td class="py-4 font-semibold text-gold">${trek.price.toLocaleString()}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>

			<aside class="h-fit lg:sticky lg:top-24">
				<div class="shadow-cozy rounded-2xl border border-ink/10 bg-surface p-6">
					<div class="flex items-center justify-between">
						<h2 class="font-display text-lg font-bold text-ink">Filter</h2>
						{#if activeFilterCount > 0}
							<button
								type="button"
								onclick={clearFilters}
								class="flex items-center gap-1 font-sans text-xs font-semibold text-muted transition-colors hover:text-gold"
							>
								<X class="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
								Clear ({activeFilterCount})
							</button>
						{/if}
					</div>

					<fieldset class="mt-6">
						<legend class="font-sans text-xs font-semibold tracking-[0.08em] text-muted uppercase">
							Difficulty
						</legend>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each difficulties as d (d)}
								<button
									type="button"
									onclick={() => toggleDifficulty(d)}
									aria-pressed={activeDifficulties.has(d)}
									class="rounded-lg border px-3 py-1.5 font-sans text-sm transition-colors {activeDifficulties.has(
										d
									)
										? 'border-gold bg-gold/10 font-semibold text-ink'
										: 'border-ink/15 text-ink/70 hover:border-ink/30'}"
								>
									{d}
								</button>
							{/each}
						</div>
					</fieldset>

					<fieldset class="mt-6">
						<legend class="font-sans text-xs font-semibold tracking-[0.08em] text-muted uppercase">
							Duration
						</legend>
						<div class="mt-3 flex flex-col gap-2">
							{#each durationBuckets as bucket (bucket.key)}
								<label
									class="flex cursor-pointer items-center gap-2.5 font-sans text-sm text-ink/80"
								>
									<input
										type="radio"
										name="duration"
										value={bucket.key}
										checked={durationBucket === bucket.key}
										onchange={() => (durationBucket = bucket.key)}
										class="h-4 w-4 accent-gold"
									/>
									{bucket.label}
								</label>
							{/each}
						</div>
					</fieldset>
				</div>
			</aside>
		</div>
	</div>
</section>

<style>
	.scrollbar-none {
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
