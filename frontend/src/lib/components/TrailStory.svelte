<script lang="ts">
	import { onMount } from 'svelte';
	import { ensureGsap, gsap, ScrollTrigger } from '$lib/utils/gsap';
	import { prefersReducedMotion } from '$lib/utils/motion.svelte';
	import { content } from '$lib/cms/store.svelte';
	import { resolveImageSrcset } from '$lib/cms/media';

	let sectionEl: HTMLElement = $state()!;
	let backEl: HTMLDivElement = $state()!;
	let midEl: HTMLDivElement = $state()!;
	let foreEl: HTMLDivElement = $state()!;
	let captionEl: HTMLDivElement = $state()!;

	let backgroundImg = $derived(resolveImageSrcset(content.trailStory.backgroundImage));
	let midImg = $derived(resolveImageSrcset(content.trailStory.midImage));
	let foregroundImg = $derived(resolveImageSrcset(content.trailStory.foregroundImage));

	onMount(() => {
		if (prefersReducedMotion()) return;

		ensureGsap();
		const mm = gsap.matchMedia();

		mm.add('(min-width: 768px)', () => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 0.6
				}
			});
			tl.to(backEl, { yPercent: -6, ease: 'none' }, 0)
				.to(midEl, { yPercent: -12, ease: 'none' }, 0)
				.to(foreEl, { yPercent: -16, ease: 'none' }, 0);

			gsap.fromTo(
				captionEl,
				{ opacity: 0, y: 24 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: captionEl,
						start: 'top 70%',
						toggleActions: 'play none none reverse'
					}
				}
			);

			return () => {
				tl.scrollTrigger?.kill();
				tl.kill();
			};
		});

		mm.add('(max-width: 767px)', () => {
			gsap.fromTo(
				captionEl,
				{ opacity: 0, y: 16 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: 'power2.out',
					scrollTrigger: { trigger: captionEl, start: 'top 80%', toggleActions: 'play none none reverse' }
				}
			);
		});

		return () => mm.revert();
	});
</script>

<section
	id="trail"
	bind:this={sectionEl}
	class="relative bg-scrim md:h-[220vh]"
>
	<div class="relative h-[74vh] overflow-hidden md:sticky md:top-0 md:h-[100dvh]">
		<!-- Layer 1: distant peak silhouette, slowest. Desktop-only: mobile shows the foreground layer alone. -->
		<div bind:this={backEl} class="absolute inset-x-0 -inset-y-[30%] will-change-transform hidden md:block">
			<picture>
				{#if backgroundImg.srcset}
					<source srcset={backgroundImg.srcset} type="image/webp" sizes="100vw" />
				{/if}
				<img
					src={backgroundImg.src}
					alt={content.trailStory.backgroundAlt}
					class="h-full w-full object-cover brightness-[0.55] saturate-[0.7]"
					loading="lazy"
					decoding="async"
				/>
			</picture>
		</div>

		<!-- Layer 2: mid-ground ridgeline with trekkers, medium speed. Desktop-only, see note above. -->
		<div bind:this={midEl} class="absolute inset-x-0 -inset-y-[30%] will-change-transform hidden md:block">
			<picture>
				{#if midImg.srcset}
					<source srcset={midImg.srcset} type="image/webp" sizes="100vw" />
				{/if}
				<img
					src={midImg.src}
					alt={content.trailStory.midAlt}
					class="h-full w-full object-cover brightness-[0.72]"
					loading="lazy"
					decoding="async"
				/>
			</picture>
		</div>

		<!-- Layer 3: foreground prayer flags, fastest -->
		<div bind:this={foreEl} class="absolute inset-x-0 -inset-y-[30%] will-change-transform">
			<picture>
				{#if foregroundImg.srcset}
					<source srcset={foregroundImg.srcset} type="image/webp" sizes="100vw" />
				{/if}
				<img
					src={foregroundImg.src}
					alt={content.trailStory.foregroundAlt}
					class="h-full w-full object-cover object-bottom"
					loading="lazy"
					decoding="async"
				/>
			</picture>
		</div>

		<div
			class="pointer-events-none absolute inset-0"
			style="background: linear-gradient(180deg, rgba(11,15,20,0.35) 0%, rgba(11,15,20,0.1) 35%, rgba(11,15,20,0.65) 100%);"
		></div>

		<div class="relative z-10 flex h-full items-center justify-center px-6 text-center">
			<div bind:this={captionEl}>
				<p
					class="font-display text-3xl font-semibold text-on-scrim sm:text-4xl md:text-6xl"
					style="letter-spacing: -0.01em; line-height: 1.15;"
				>
					{content.trailStory.headlineLine1}
					<span class="block text-gold-bright italic" style="padding-bottom: 0.15em;">{content.trailStory.headlineLine2}</span>
				</p>
				<p class="mx-auto mt-6 max-w-md font-sans text-sm text-on-scrim/80 md:text-base">
					{content.trailStory.body}
				</p>
				<a
					href={content.trailStory.ctaHref}
					class="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-on-scrim"
				>
					{content.trailStory.ctaText}
					<span class="h-px w-6 bg-gold-bright" aria-hidden="true"></span>
				</a>
			</div>
		</div>
	</div>
</section>
