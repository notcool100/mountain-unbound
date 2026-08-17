<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Flame, Mountain, Footprints, CalendarDays, Gauge, ChevronLeft, ChevronRight, ArrowRight } from '@lucide/svelte';
	import type { TrekCategory } from '$lib/data/treks';
	import { revealStagger } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';

	const tabs: { key: TrekCategory; label: string; icon: typeof Flame }[] = [
		{ key: 'signature', label: 'Signature Treks', icon: Flame },
		{ key: 'peak-climbing', label: 'Peak Climbing', icon: Mountain },
		{ key: 'short-treks', label: 'Short Treks', icon: Footprints }
	];

	let activeTab = $state<TrekCategory>('signature');
	let filteredTreks = $derived(content.treks.filter((trek) => trek.category === activeTab));

	let trackEl: HTMLDivElement = $state()!;
	let atStart = $state(true);
	let atEnd = $state(false);
	let overflows = $state(false);

	function checkEdges() {
		if (!trackEl) return;
		overflows = trackEl.scrollWidth > trackEl.clientWidth + 8;
		atStart = trackEl.scrollLeft < 8;
		atEnd = trackEl.scrollLeft + trackEl.clientWidth >= trackEl.scrollWidth - 8;
	}

	async function selectTab(key: TrekCategory) {
		activeTab = key;
		await tick();
		if (trackEl) trackEl.scrollTo({ left: 0 });
		checkEdges();
	}

	onMount(() => {
		checkEdges();
		const onResize = () => checkEdges();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});

	function scrollByCard(dir: 1 | -1) {
		if (!trackEl) return;
		const card = trackEl.querySelector<HTMLElement>('.trip-card');
		const step = (card?.offsetWidth ?? 320) + 20;
		trackEl.scrollBy({ left: dir * step, behavior: 'smooth' });
	}
</script>

<section id="treks" class="relative bg-snow px-5 py-28 md:px-8 md:py-36">
	<div class="mx-auto max-w-[1400px]">
		<div class="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-b border-ink/10 pb-5">
			<div class="scrollbar-none flex items-center gap-7 overflow-x-auto sm:gap-9">
				{#each tabs as tab (tab.key)}
					<button
						type="button"
						onclick={() => selectTab(tab.key)}
						aria-current={activeTab === tab.key ? 'true' : undefined}
						class="group relative flex shrink-0 items-center gap-2 py-1 font-sans text-sm transition-colors sm:text-base {activeTab ===
						tab.key
							? 'font-semibold text-ink'
							: 'text-muted hover:text-ink'}"
					>
						<tab.icon class="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} aria-hidden="true" />
						{tab.label}
						<span
							class="absolute right-0 -bottom-[21px] left-0 h-[2px] bg-gold transition-transform duration-300 {activeTab ===
							tab.key
								? 'scale-x-100'
								: 'scale-x-0'}"
						></span>
					</button>
				{/each}
			</div>
			<a
				href="/treks"
				class="group inline-flex shrink-0 items-center gap-2 font-sans text-sm font-semibold text-ink"
			>
				View all treks &amp; pricing
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
			</a>
		</div>

		<div class="relative mt-10 md:mt-12">
			{#key activeTab}
				<div
					bind:this={trackEl}
					onscroll={checkEdges}
					use:revealStagger={{ y: 24, stagger: 0.1 }}
					class="track flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
				>
					{#each filteredTreks as trek (trek.slug)}
						<a
							href={`/treks/${trek.slug}`}
							class="trip-card group shadow-cozy shadow-cozy-hover w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-[340px]"
						>
							<div class="relative aspect-[4/3] w-full overflow-hidden">
								<picture>
									<source
										srcset={`${trek.image}-960.webp 960w, ${trek.image}-1920.webp 1920w`}
										type="image/webp"
										sizes="(min-width: 640px) 340px, 78vw"
									/>
									<img
										src={`${trek.image}-1920.webp`}
										alt={trek.imageAlt}
										class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
										loading="lazy"
										decoding="async"
									/>
								</picture>
							</div>

							<div class="p-5">
								<span class="flex items-center gap-1.5 font-sans text-xs text-muted">
									<CalendarDays class="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
									{trek.days} Days
								</span>
								<h3 class="mt-2 font-display text-xl font-bold text-ink" style="letter-spacing: -0.01em;">
									{trek.name}
								</h3>

								<div class="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
									<p class="font-sans text-sm text-ink/70">
										from <span class="font-display text-lg font-bold text-gold">${trek.price.toLocaleString()}</span>
									</p>
									<span class="flex items-center gap-1 font-sans text-xs text-muted">
										<Gauge class="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
										{trek.difficulty}
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/key}

			{#if overflows}
				<button
					type="button"
					onclick={() => scrollByCard(-1)}
					disabled={atStart}
					aria-label="Previous treks"
					class="absolute top-[35%] -left-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-surface/90 text-ink shadow-cozy backdrop-blur-sm transition-opacity hover:bg-surface disabled:pointer-events-none disabled:opacity-30 md:flex lg:-left-5"
				>
					<ChevronLeft class="h-5 w-5" strokeWidth={1.75} />
				</button>
				<button
					type="button"
					onclick={() => scrollByCard(1)}
					disabled={atEnd}
					aria-label="Next treks"
					class="absolute top-[35%] -right-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-surface/90 text-ink shadow-cozy backdrop-blur-sm transition-opacity hover:bg-surface disabled:pointer-events-none disabled:opacity-30 md:flex lg:-right-5"
				>
					<ChevronRight class="h-5 w-5" strokeWidth={1.75} />
				</button>
			{/if}
		</div>
	</div>
</section>

<style>
	.track,
	.scrollbar-none {
		scrollbar-width: none;
	}
	.track::-webkit-scrollbar,
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
