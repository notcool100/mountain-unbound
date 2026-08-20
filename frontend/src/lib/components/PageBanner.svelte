<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/utils/reveal';
	import { resolveImageSrcset } from '$lib/cms/media';
	import { scrollState } from '$lib/utils/scrollState.svelte';

	type Props = {
		image: string;
		imageAlt: string;
		eyebrow?: string;
		title: string;
		subtitle?: string;
	};

	let { image, imageAlt, eyebrow, title, subtitle }: Props = $props();
	let banner = $derived(resolveImageSrcset(image));

	let sentinelEl: HTMLDivElement = $state()!;

	// Mirrors Hero.svelte's sentinel: drives the nav's transparent -> frosted-glass
	// transition on pages that open with this banner instead of the home hero.
	onMount(() => {
		const navObserver = new IntersectionObserver(
			([entry]) => {
				scrollState.pastThreshold = !entry.isIntersecting;
			},
			{ threshold: 0 }
		);
		navObserver.observe(sentinelEl);

		return () => navObserver.disconnect();
	});
</script>

<section class="relative flex h-[52vh] min-h-[380px] items-end overflow-hidden bg-scrim md:h-[58vh]">
	<div bind:this={sentinelEl} class="pointer-events-none absolute inset-x-0 top-20 h-px"></div>
	<picture>
		{#if banner.srcset}
			<source srcset={banner.srcset} type="image/webp" sizes="100vw" />
		{/if}
		<img
			src={banner.src}
			alt={imageAlt}
			class="absolute inset-0 h-full w-full object-cover brightness-[0.65]"
			loading="eager"
			fetchpriority="high"
			decoding="async"
		/>
	</picture>
	<div
		class="pointer-events-none absolute inset-0"
		style="background: linear-gradient(180deg, rgba(11,15,20,0.55) 0%, rgba(11,15,20,0.15) 35%, rgba(11,15,20,0.95) 100%);"
	></div>

	<div class="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-12 md:px-8 md:pb-16">
		<div use:reveal>
			{#if eyebrow}
				<p class="font-sans text-xs font-semibold tracking-[0.14em] text-gold-bright uppercase">{eyebrow}</p>
			{/if}
			<h1
				class="mt-3 font-display font-bold text-on-scrim"
				style="font-size: clamp(2.5rem, 6vw, 4.5rem); letter-spacing: -0.015em; line-height: 1.05;"
			>
				{title}
			</h1>
			{#if subtitle}
				<p class="mt-4 max-w-xl font-sans text-base text-on-scrim/80 md:text-lg">{subtitle}</p>
			{/if}
		</div>
	</div>
</section>
