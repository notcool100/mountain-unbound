<script lang="ts">
	import { reveal } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';

	type Props = { trekName?: string };
	let { trekName }: Props = $props();

	let subject = $derived(trekName ? `Trek Inquiry: ${trekName}` : 'Trek Inquiry');
	let mailtoHref = $derived(`mailto:${content.planYourTrek.email}?subject=${encodeURIComponent(subject)}`);
	let telHref = $derived(`tel:${content.planYourTrek.phone.replace(/[^+\d]/g, '')}`);
</script>

<section id="plan" class="relative bg-snow px-5 py-32 md:px-8 md:py-44">
	<div use:reveal class="mx-auto max-w-2xl text-center">
		<h2
			class="font-display text-4xl font-bold text-ink sm:text-5xl md:text-6xl"
			style="letter-spacing: -0.015em; line-height: 1.08;"
		>
			{content.planYourTrek.heading}
		</h2>
		<p class="mx-auto mt-5 max-w-md font-sans text-base text-muted md:text-lg">
			{content.planYourTrek.body}
		</p>

		<a
			href={mailtoHref}
			class="mt-10 inline-flex h-14 items-center rounded-lg bg-crimson px-9 font-sans text-base font-semibold text-on-scrim transition-colors hover:bg-crimson-dim md:mt-12"
		>
			Plan Your Trek
		</a>

		<p class="mt-6 font-sans text-sm text-muted">
			Or call
			<a href={telHref} class="text-ink/80 underline decoration-ink/30 underline-offset-4 hover:text-ink"
				>{content.planYourTrek.phone}</a
			>
			, Kathmandu office hours
		</p>
	</div>
</section>
