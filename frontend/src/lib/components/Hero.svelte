<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { ArrowDown } from '@lucide/svelte';
	import { ensureGsap, gsap, ScrollTrigger } from '$lib/utils/gsap';
	import { prefersReducedMotion } from '$lib/utils/motion.svelte';
	import { scrollState } from '$lib/utils/scrollState.svelte';
	import { content } from '$lib/cms/store.svelte';

	let sectionEl: HTMLElement = $state()!;
	let sentinelEl: HTMLDivElement = $state()!;
	let bgEl: HTMLDivElement = $state()!;
	let overlayEl: HTMLDivElement = $state()!;
	let contentEl: HTMLDivElement = $state()!;
	let videoEl: HTMLVideoElement = $state()!;
	let scrollCueEl: HTMLDivElement = $state()!;
	let line1El: HTMLSpanElement = $state()!;
	let line2El: HTMLSpanElement = $state()!;
	let subEl: HTMLParagraphElement = $state()!;
	let ctaEl: HTMLAnchorElement = $state()!;

	let videoReady = $state(false);
	let hasScrolledOnce = $state(false);

	let headlineLine1 = $derived(content.hero.headlineLine1);
	let headlineLine2 = $derived(content.hero.headlineLine2);

	onMount(() => {
		const reduced = prefersReducedMotion();
		let onVisibility: (() => void) | undefined;

		// LCP-safe static image is always in the DOM; video is a progressive enhancement.
		if (!reduced && videoEl) {
			videoEl.play().catch(() => {
				/* autoplay blocked; static poster/image remains visible */
			});
			videoEl.addEventListener('playing', () => (videoReady = true));

			onVisibility = () => {
				if (document.hidden) videoEl.pause();
				else videoEl.play().catch(() => {});
			};
			document.addEventListener('visibilitychange', onVisibility);

			ensureGsap();
		}

		// Entrance: headline words, subhead, CTA. Runs once on load, not scroll-triggered.
		const words1 = line1El?.querySelectorAll('span') ?? [];
		const words2 = line2El?.querySelectorAll('span') ?? [];

		if (reduced) {
			gsap.set([...words1, ...words2, subEl, ctaEl], { opacity: 1, y: 0 });
		} else {
			ensureGsap();
			const tl = gsap.timeline({ delay: 0.2 });
			tl.set([...words1, ...words2], { opacity: 0, y: 28 })
				.set([subEl, ctaEl], { opacity: 0, y: 16 })
				.to([...words1, ...words2], {
					opacity: 1,
					y: 0,
					duration: 0.9,
					ease: 'power3.out',
					stagger: 0.07
				})
				.to(subEl, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.35')
				.to(ctaEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45');
		}

		// Scroll-down affordance: fades out permanently after first scroll.
		const onFirstScroll = () => {
			if (!hasScrolledOnce) hasScrolledOnce = true;
			window.removeEventListener('scroll', onFirstScroll);
		};
		if (!reduced) window.addEventListener('scroll', onFirstScroll, { passive: true, once: true });

		// Sentinel drives the nav's transparent -> frosted-glass transition (IntersectionObserver, no scroll listener).
		const navObserver = new IntersectionObserver(
			([entry]) => {
				scrollState.pastThreshold = !entry.isIntersecting;
			},
			{ threshold: 0 }
		);
		navObserver.observe(sentinelEl);

		let ctx: ReturnType<typeof gsap.context> | undefined;
		if (!reduced) {
			ctx = gsap.context(() => {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: sectionEl,
							start: 'top top',
							end: '+=100%',
							scrub: 1,
							pin: true
						}
					})
					.to(bgEl, { scale: 1.15, yPercent: -15, ease: 'none' })
					.to(overlayEl, { opacity: 0.85, ease: 'none' }, '<')
					.to(contentEl, { opacity: 0, yPercent: -20, ease: 'none' }, '<');
			}, sectionEl);
		}

		return () => {
			navObserver.disconnect();
			ctx?.revert();
			if (onVisibility) document.removeEventListener('visibilitychange', onVisibility);
		};
	});
</script>

<section
	id="top"
	bind:this={sectionEl}
	class="relative flex min-h-[100dvh] items-center overflow-hidden bg-scrim"
>
	<div bind:this={sentinelEl} class="pointer-events-none absolute inset-x-0 top-20 h-px"></div>

	<!-- Background layer: static image is the real (LCP) element; video enhances on top -->
	<div bind:this={bgEl} class="absolute inset-0 will-change-transform">
		<picture>
			<source
				srcset={`${content.hero.posterImage}-960.webp 960w, ${content.hero.posterImage}-1920.webp 1920w`}
				type="image/webp"
				sizes="100vw"
			/>
			<img
				src={`${content.hero.posterImage}-1920.jpg`}
				alt={content.hero.posterAlt}
				class="h-full w-full object-cover"
				fetchpriority="high"
				loading="eager"
			/>
		</picture>

		{#if browser}
			<video
				bind:this={videoEl}
				class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
				class:opacity-0={!videoReady}
				class:opacity-100={videoReady}
				poster={`${content.hero.posterImage}-1920.jpg`}
				muted
				loop
				playsinline
				preload="none"
				aria-hidden="true"
			>
				<source src={content.hero.videoSrc} type="video/mp4" />
			</video>
		{/if}
	</div>

	<!-- Gradient overlay: darker at bottom for legibility, lighter at top for the nav -->
	<div
		bind:this={overlayEl}
		class="pointer-events-none absolute inset-0"
		style="background: linear-gradient(180deg, rgba(11,15,20,0.28) 0%, rgba(11,15,20,0.18) 30%, rgba(11,15,20,0.55) 68%, rgba(11,15,20,0.92) 100%);"
	></div>

	<div bind:this={contentEl} class="relative z-10 w-full px-5 pt-24 pb-28 md:px-8 lg:pb-36">
		<div class="mx-auto max-w-[1400px]">
			<h1
				class="font-display font-black text-on-scrim"
				style="font-size: clamp(2.75rem, 9vw, 7.5rem); line-height: 1.02; letter-spacing: -0.02em;"
			>
				<span bind:this={line1El} class="block overflow-hidden">
					{#each headlineLine1.split(' ') as word (word)}
						<span class="inline-block pr-[0.28em]"><span class="inline-block">{word}</span></span>
					{/each}
				</span>
				<span bind:this={line2El} class="block overflow-hidden">
					{#each headlineLine2.split(' ') as word (word)}
						<span class="inline-block pr-[0.28em]"><span class="inline-block">{word}</span></span>
					{/each}
				</span>
			</h1>

			<p
				bind:this={subEl}
				class="mt-6 max-w-xl font-sans text-base text-on-scrim/85 md:mt-8 md:text-lg"
			>
				{content.hero.subhead}
			</p>

			<a
				bind:this={ctaEl}
				href={content.hero.ctaHref}
				class="group relative mt-9 inline-flex items-center font-sans text-sm font-semibold tracking-wide text-on-scrim md:mt-10"
			>
				{content.hero.ctaText}
				<span
					class="ml-3 h-px w-8 bg-gold-bright transition-all duration-300 group-hover:w-12"
					aria-hidden="true"
				></span>
			</a>
		</div>
	</div>

	{#if browser}
		<div
			bind:this={scrollCueEl}
			class="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center transition-opacity duration-700"
			class:opacity-0={hasScrolledOnce}
			class:opacity-70={!hasScrolledOnce}
			aria-hidden="true"
		>
			<ArrowDown class="h-5 w-5 animate-bounce text-on-scrim" strokeWidth={1.5} />
		</div>
	{/if}
</section>
