<script lang="ts">
	import { onMount } from 'svelte';
	import { MapPin, ArrowUpDown } from '@lucide/svelte';
	import type { ItineraryDay } from '$lib/data/itinerary';
	import { ensureGsap, gsap } from '$lib/utils/gsap';
	import { prefersReducedMotion } from '$lib/utils/motion.svelte';
	import { reveal } from '$lib/utils/reveal';

	type Props = {
		days: ItineraryDay[];
		eyebrow: string;
		heading?: string;
		description?: string;
	};

	let {
		days: itineraryDays,
		eyebrow,
		heading = 'The route, day by day',
		description = 'This is the exact itinerary our groups follow, built around real acclimatisation, not a rushed schedule.'
	}: Props = $props();

	let listEl: HTMLDivElement = $state()!;
	let progressPathEl: SVGPathElement = $state()!;
	let svgHeight = $state(0);

	function measure() {
		if (listEl) svgHeight = listEl.offsetHeight;
	}

	onMount(() => {
		measure();
		const onResize = () => measure();
		window.addEventListener('resize', onResize);

		if (prefersReducedMotion()) {
			return () => window.removeEventListener('resize', onResize);
		}

		ensureGsap();
		let ctx: ReturnType<typeof gsap.context> | undefined;

		// Wait a tick so svgHeight (from the resize/measure above) is committed before measuring path length.
		const raf = requestAnimationFrame(() => {
			const length = progressPathEl.getTotalLength();
			progressPathEl.style.strokeDasharray = `${length}`;
			progressPathEl.style.strokeDashoffset = `${length}`;

			ctx = gsap.context(() => {
				gsap.to(progressPathEl, {
					strokeDashoffset: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: listEl,
						start: 'top 75%',
						end: 'bottom 60%',
						scrub: 0.6
					}
				});
			});
		});

		return () => {
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(raf);
			ctx?.revert();
		};
	});
</script>

<section id="itinerary" class="relative bg-snow px-5 py-28 md:px-8 md:py-36">
	<div class="mx-auto max-w-[1000px]">
		<div use:reveal class="max-w-2xl">
			<p class="font-sans text-xs font-semibold tracking-[0.14em] text-gold uppercase">
				{eyebrow}
			</p>
			<h2
				class="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl"
				style="letter-spacing: -0.015em; line-height: 1.08;"
			>
				{heading}
			</h2>
			<p class="mt-5 max-w-lg font-sans text-base text-muted md:text-lg">
				{description}
			</p>
		</div>

		<div bind:this={listEl} class="relative mt-16 md:mt-20">
			<svg
				class="absolute top-0 left-[15px] hidden h-full w-6 overflow-visible md:block"
				width="24"
				height={svgHeight}
				viewBox={`0 0 24 ${svgHeight}`}
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<path
					d={`M 1 0 L 1 ${svgHeight}`}
					stroke="rgba(11,15,20,0.14)"
					stroke-width="2"
					fill="none"
				/>
				<path
					bind:this={progressPathEl}
					d={`M 1 0 L 1 ${svgHeight}`}
					stroke="#9A631A"
					stroke-width="2"
					fill="none"
				/>
			</svg>

			<ol class="flex flex-col gap-10 md:gap-12">
				{#each itineraryDays as day (day.day)}
					<li use:reveal={{ y: 16, start: 'top 90%' }} class="relative md:pl-14">
						<span
							class="absolute top-0 left-0 hidden h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-surface font-sans text-xs font-semibold text-gold md:flex"
						>
							{day.day}
						</span>

						<div class="flex items-baseline gap-3 md:hidden">
							<span
								class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-surface font-sans text-[0.7rem] font-semibold text-gold"
							>
								{day.day}
							</span>
							<h3 class="font-display text-xl font-semibold text-ink">{day.title}</h3>
						</div>

						<h3 class="hidden font-display text-2xl font-semibold text-ink md:block">
							{day.title}
						</h3>

						<div
							class="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-sans text-xs text-muted md:mt-2.5"
						>
							<span class="flex items-center gap-1.5">
								<MapPin class="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
								{day.location}
							</span>
							<span class="flex items-center gap-1.5">
								<ArrowUpDown class="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
								{day.elevation}
							</span>
						</div>

						<p class="mt-3 max-w-xl font-sans text-sm leading-relaxed text-ink/80 md:text-base">
							{day.description}
						</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
