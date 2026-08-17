<script lang="ts">
	import { CalendarDays, Mountain, Gauge, Users, Sun, MapPinned, Check, X } from '@lucide/svelte';
	import { page } from '$app/state';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import ItineraryTimeline from '$lib/components/ItineraryTimeline.svelte';
	import PlanYourTrek from '$lib/components/PlanYourTrek.svelte';
	import { reveal, revealStagger } from '$lib/utils/reveal';
	import { content, cmsMeta } from '$lib/cms/store.svelte';
	import { resolveImageSrcset } from '$lib/cms/media';

	let trek = $derived(content.treks.find((t) => t.slug === page.params.slug));
	let itinerary = $derived(trek ? (content.itineraries[trek.slug] ?? []) : []);
	let labels = $derived(content.trekDetailLabels);

	function formatDate(iso: string) {
		return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	let facts = $derived(
		trek
			? [
					{ icon: CalendarDays, label: 'Duration', value: `${trek.days} days` },
					{ icon: Mountain, label: 'Max altitude', value: trek.maxAltitude },
					{ icon: Gauge, label: 'Difficulty', value: trek.difficulty },
					{ icon: Sun, label: 'Best seasons', value: trek.bestSeasons },
					{ icon: Users, label: 'Group size', value: trek.groupSize },
					{ icon: MapPinned, label: 'Route', value: trek.startEnd }
				]
			: []
	);
</script>

<svelte:head>
	<title
		>{trek
			? `${trek.name} | Windhorse Expeditions`
			: cmsMeta.hasLoaded
				? 'Trek not found | Windhorse Expeditions'
				: 'Loading… | Windhorse Expeditions'}</title
	>
	<meta name="description" content={trek?.summary ?? 'This trek could not be found.'} />
</svelte:head>

{#if trek}
<PageBanner
	image={trek.image}
	imageAlt={trek.imageAlt}
	eyebrow={trek.region}
	title={trek.name}
	subtitle={trek.tagline}
/>

<section class="relative bg-snow px-5 py-16 md:px-8 md:py-24">
	<div class="mx-auto max-w-[1000px]">
		<div use:reveal>
			<p class="max-w-2xl font-sans text-base leading-relaxed text-ink/85 md:text-lg">
				{trek.overview}
			</p>
		</div>

		<dl
			use:revealStagger={{ y: 16, stagger: 0.06 }}
			class="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-ink/10 py-8 md:grid-cols-3"
		>
			{#each facts as fact (fact.label)}
				<div class="flex items-start gap-3">
					<fact.icon class="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
					<div>
						<dt class="font-sans text-xs tracking-wide text-muted uppercase">{fact.label}</dt>
						<dd class="mt-0.5 font-sans text-sm text-ink">{fact.value}</dd>
					</div>
				</div>
			{/each}
		</dl>

		<div use:reveal class="mt-12">
			<h2 class="font-display text-2xl font-bold text-ink">{labels.highlightsHeading}</h2>
			<ul class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each trek.highlights as highlight (highlight)}
					<li class="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-ink/85">
						<Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" />
						{highlight}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

{#if trek.gallery.length > 0}
	<section class="relative bg-snow px-5 pb-16 md:px-8 md:pb-24">
		<div class="mx-auto max-w-[1400px]">
			<div
				use:revealStagger={{ y: 24, stagger: 0.08 }}
				class="grid grid-cols-1 gap-4 sm:grid-cols-2"
			>
				{#each trek.gallery as shot (shot.image)}
					<div class="relative aspect-[16/10] overflow-hidden rounded-2xl">
						<picture>
							{#if resolveImageSrcset(shot.image).srcset}
								<source
									srcset={resolveImageSrcset(shot.image).srcset}
									type="image/webp"
									sizes="(min-width: 640px) 50vw, 100vw"
								/>
							{/if}
							<img
								src={resolveImageSrcset(shot.image).src}
								alt={shot.alt}
								class="h-full w-full object-cover"
								loading="lazy"
								decoding="async"
							/>
						</picture>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<ItineraryTimeline
	days={itinerary}
	eyebrow={`${trek.name} · ${trek.days} days`}
	heading={labels.itineraryHeading}
	description={labels.itineraryDescriptionTemplate.replace('{trekName}', trek.name)}
/>

<section class="relative bg-snow px-5 py-16 md:px-8 md:py-24">
	<div class="mx-auto max-w-[1000px]">
		<div use:reveal class="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-6">
			<div>
				<h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">{labels.costHeading}</h2>
				<p class="mt-2 font-sans text-sm text-muted">{trek.priceNote}</p>
			</div>
			<p class="font-display text-4xl font-bold text-gold sm:text-5xl">
				${trek.price.toLocaleString()}
			</p>
		</div>

		<div use:revealStagger={{ y: 20, stagger: 0.08 }} class="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
			<div>
				<h3 class="font-sans text-sm font-semibold tracking-wide text-ink uppercase">{labels.includedHeading}</h3>
				<ul class="mt-4 flex flex-col gap-3">
					{#each trek.includes as item (item)}
						<li class="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-ink/80">
							<Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" />
							{item}
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3 class="font-sans text-sm font-semibold tracking-wide text-ink uppercase">{labels.notIncludedHeading}</h3>
				<ul class="mt-4 flex flex-col gap-3">
					{#each trek.excludes as item (item)}
						<li class="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-ink/70">
							<X class="mt-0.5 h-4 w-4 shrink-0 text-muted" strokeWidth={2} aria-hidden="true" />
							{item}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div use:reveal class="mt-14">
			<h3 class="font-sans text-sm font-semibold tracking-wide text-ink uppercase">
				{labels.departuresHeading}
			</h3>
			<div class="mt-4 overflow-x-auto">
				<table class="w-full min-w-[480px] border-collapse font-sans text-sm">
					<thead>
						<tr class="border-b border-ink/15 text-left text-xs tracking-wide text-muted uppercase">
							<th scope="col" class="py-3 pr-4 font-medium">Start date</th>
							<th scope="col" class="py-3 font-medium">Spots left</th>
						</tr>
					</thead>
					<tbody>
						{#each trek.departures as departure (departure.date)}
							<tr class="border-b border-ink/8 text-ink/85">
								<td class="py-3.5 pr-4">{formatDate(departure.date)}</td>
								<td class="py-3.5">
									{#if departure.spotsLeft <= 3}
										<span class="text-crimson">{departure.spotsLeft} left</span>
									{:else}
										{departure.spotsLeft} open
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="mt-4 font-sans text-sm text-muted">
				{labels.privateDeparturesNote}
			</p>
		</div>
	</div>
</section>

<PlanYourTrek trekName={trek.name} />
{:else if !cmsMeta.hasLoaded}
<section class="relative bg-snow px-5 py-32 text-center md:px-8" aria-busy="true">
	<p class="font-sans text-sm text-muted">Loading…</p>
</section>
{:else}
<section class="relative bg-snow px-5 py-32 text-center md:px-8">
	<h1 class="font-display text-3xl font-bold text-ink">Trek not found</h1>
	<p class="mt-3 font-sans text-base text-muted">
		This trek may have been renamed or removed. <a href="/treks" class="text-gold underline">Browse all treks</a>.
	</p>
</section>
{/if}
