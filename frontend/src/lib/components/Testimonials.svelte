<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight, Quote, Star } from '@lucide/svelte';
	import { reveal } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';

	let testimonials = $derived(content.testimonials);
	let trackEl: HTMLDivElement = $state()!;
	let slideEls: HTMLElement[] = $state([]);
	let activeIndex = $state(0);

	function goTo(i: number) {
		slideEls[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
	}

	function next() {
		goTo(Math.min(activeIndex + 1, testimonials.length - 1));
	}

	function prev() {
		goTo(Math.max(activeIndex - 1, 0));
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const idx = slideEls.indexOf(entry.target as HTMLElement);
						if (idx !== -1) activeIndex = idx;
					}
				});
			},
			{ root: trackEl, threshold: 0.6 }
		);
		slideEls.forEach((el) => el && observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<div class="bg-snow px-5 pt-20 pb-2 md:px-8 md:pt-28">
	<div
		use:reveal
		class="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-ink/10 pt-8"
	>
		<div class="flex items-center gap-4">
			<span class="font-display text-5xl font-bold text-ink">4.9</span>
			<div>
				<div class="flex gap-0.5" aria-hidden="true">
					{#each Array(5) as _}
						<Star class="h-4 w-4 fill-gold text-gold" strokeWidth={1.5} />
					{/each}
				</div>
				<p class="mt-1 font-sans text-sm text-muted">
					Average trip rating across 340+ completed treks
				</p>
			</div>
		</div>
		<div class="flex flex-wrap gap-x-10 gap-y-3 font-sans text-sm text-muted">
			<span><strong class="font-semibold text-ink">30+</strong> countries of origin</span>
			<span><strong class="font-semibold text-ink">58%</strong> arrive through a referral</span>
		</div>
	</div>
</div>

<section id="testimonials" class="relative h-[78vh] overflow-hidden bg-scrim md:h-[88vh]">
	<div
		bind:this={trackEl}
		class="track flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
	>
		{#each testimonials as t, i (t.name)}
			<div bind:this={slideEls[i]} class="relative h-full w-full shrink-0 snap-start snap-always">
				<div class="kenburns absolute inset-0">
					<picture>
						<source
							srcset={`${t.image}-960.webp 960w, ${t.image}-1920.webp 1920w`}
							type="image/webp"
							sizes="100vw"
						/>
						<img
							src={`${t.image}-1920.webp`}
							alt={t.imageAlt}
							class="h-full w-full object-cover"
							loading="lazy"
							decoding="async"
						/>
					</picture>
				</div>
				<div
					class="pointer-events-none absolute inset-0"
					style="background: linear-gradient(180deg, rgba(11,15,20,0.55) 0%, rgba(11,15,20,0.35) 40%, rgba(11,15,20,0.82) 100%);"
				></div>

				<div class="relative flex h-full items-end justify-center px-6 pb-16 md:items-center md:pb-0">
					<div class="max-w-2xl text-center">
						<Quote class="mx-auto h-8 w-8 text-gold-bright" strokeWidth={1.5} aria-hidden="true" />
						<p
							class="mt-5 font-display text-2xl leading-snug font-semibold text-on-scrim sm:text-3xl md:text-4xl"
							style="letter-spacing: -0.01em;"
						>
							{t.quote}
						</p>
						<p class="mt-6 font-sans text-sm text-on-scrim/85">
							<span class="font-semibold text-on-scrim">{t.name}</span>
							<span class="text-on-scrim/65"> &middot; {t.location}</span>
						</p>
						<p class="mt-1 font-sans text-xs tracking-wide text-gold-bright uppercase">{t.trek}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<button
		type="button"
		onclick={prev}
		disabled={activeIndex === 0}
		aria-label="Previous testimonial"
		class="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-on-scrim/20 bg-scrim/50 text-on-scrim backdrop-blur-sm transition-opacity hover:bg-scrim/70 disabled:pointer-events-none disabled:opacity-30 md:left-6"
	>
		<ChevronLeft class="h-5 w-5" strokeWidth={1.75} />
	</button>
	<button
		type="button"
		onclick={next}
		disabled={activeIndex === testimonials.length - 1}
		aria-label="Next testimonial"
		class="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-on-scrim/20 bg-scrim/50 text-on-scrim backdrop-blur-sm transition-opacity hover:bg-scrim/70 disabled:pointer-events-none disabled:opacity-30 md:right-6"
	>
		<ChevronRight class="h-5 w-5" strokeWidth={1.75} />
	</button>

	<div class="absolute inset-x-0 bottom-6 flex justify-center gap-2">
		{#each testimonials as t, i (t.name)}
			<button
				type="button"
				onclick={() => goTo(i)}
				aria-label={`Go to testimonial ${i + 1} of ${testimonials.length}`}
				aria-current={activeIndex === i}
				class="h-2 rounded-full transition-all {activeIndex === i ? 'w-5 bg-gold-bright' : 'w-2 bg-on-scrim/30'}"
			></button>
		{/each}
	</div>
</section>

<style>
	.track {
		scrollbar-width: none;
	}
	.track::-webkit-scrollbar {
		display: none;
	}

	.kenburns img {
		animation: kenburns 20s ease-in-out infinite alternate;
	}

	@keyframes kenburns {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.08);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.kenburns img {
			animation: none;
		}
	}
</style>
