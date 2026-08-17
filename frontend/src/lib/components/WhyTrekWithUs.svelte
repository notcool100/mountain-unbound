<script lang="ts">
	import { onMount } from 'svelte';
	import { ensureGsap, gsap } from '$lib/utils/gsap';
	import { prefersReducedMotion } from '$lib/utils/motion.svelte';
	import { reveal } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';

	let stats = $derived(content.statsSection.stats);
	let statEls: HTMLElement[] = $state([]);
	let headerEl: HTMLDivElement = $state()!;

	function format(value: number, decimals: number) {
		return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
	}

	onMount(() => {
		if (prefersReducedMotion()) {
			statEls.forEach((el, i) => {
				const decimals = Number.isInteger(stats[i].value) ? 0 : 1;
				el.textContent = format(stats[i].value, decimals);
			});
			return;
		}

		ensureGsap();
		statEls.forEach((el, i) => {
			const decimals = Number.isInteger(stats[i].value) ? 0 : 1;
			const proxy = { val: 0 };
			gsap.to(proxy, {
				val: stats[i].value,
				duration: 1.8,
				ease: 'power2.out',
				onUpdate: () => (el.textContent = format(proxy.val, decimals)),
				scrollTrigger: {
					trigger: el,
					start: 'top 88%',
					once: true
				}
			});
		});
	});
</script>

<section id="why-us" class="relative overflow-hidden bg-snow py-28 md:py-36">
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.1]"
		style="background: url('{content.statsSection.backgroundImage}-1920.webp') center 30% / cover no-repeat;"
		aria-hidden="true"
	></div>
	<div class="pointer-events-none absolute inset-0 bg-snow/90" aria-hidden="true"></div>

	<div class="relative mx-auto max-w-[1400px] px-5 md:px-8">
		<div bind:this={headerEl} use:reveal class="mx-auto max-w-2xl text-center">
			<h2
				class="font-display text-4xl font-bold text-ink sm:text-5xl"
				style="letter-spacing: -0.015em; line-height: 1.1;"
			>
				{content.statsSection.heading}
			</h2>
			<p class="mx-auto mt-5 max-w-lg font-sans text-base text-muted md:text-lg">
				{content.statsSection.body}
			</p>
		</div>

		<dl class="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-x-8">
			{#each stats as stat, i (stat.label)}
				<div class="border-t border-ink/15 pt-5 text-center md:text-left">
					<dt class="sr-only">{stat.label}</dt>
					<dd class="flex items-baseline justify-center gap-0.5 font-display text-4xl font-bold text-ink sm:text-5xl md:justify-start">
						{#if stat.prefix}<span>{stat.prefix}</span>{/if}
						<span bind:this={statEls[i]}>0</span>
						{#if stat.suffix}<span>{stat.suffix}</span>{/if}
					</dd>
					<p class="mt-2 font-sans text-sm leading-snug text-muted">{stat.label}</p>
				</div>
			{/each}
		</dl>
	</div>
</section>
