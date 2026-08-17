<script lang="ts">
	import { reveal, revealStagger } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';
	import { getIcon } from '$lib/cms/icons';

	let items = $derived(content.whyGrid.items);
</script>

<section class="relative bg-snow px-5 py-28 md:px-8 md:py-36">
	<div class="mx-auto max-w-[1200px]">
		<div use:reveal class="mx-auto max-w-xl text-center">
			<h2 class="font-display text-4xl font-bold text-ink sm:text-5xl" style="letter-spacing: -0.015em;">
				{content.whyGrid.heading}
			</h2>
			<span class="mx-auto mt-4 block h-[3px] w-14 rule-gold" aria-hidden="true"></span>
			<p class="mx-auto mt-6 max-w-md font-sans text-base text-muted md:text-lg">
				{content.whyGrid.body}
			</p>
		</div>

		<div
			use:revealStagger={{ y: 24, stagger: 0.07 }}
			class="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
		>
			{#each items as item (item.title)}
				{@const Icon = getIcon(item.icon)}
				<div class="text-center sm:text-left">
					<Icon class="mx-auto h-7 w-7 text-gold sm:mx-0" strokeWidth={1.5} aria-hidden="true" />
					<h3 class="mt-4 font-display text-lg font-bold text-ink">{item.title}</h3>
					<p class="mt-2 font-sans text-sm leading-relaxed text-ink/70">{item.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
