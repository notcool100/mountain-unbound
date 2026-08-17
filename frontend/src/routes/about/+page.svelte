<script lang="ts">
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PlanYourTrek from '$lib/components/PlanYourTrek.svelte';
	import { reveal, revealStagger } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';
	import { getIcon } from '$lib/cms/icons';

	let values = $derived(content.about.values);
	let guides = $derived(content.about.guides);
	let credentials = $derived(content.about.credentials);
</script>

<svelte:head>
	<title>{content.about.seo.title}</title>
	<meta name="description" content={content.about.seo.description} />
</svelte:head>

<PageBanner
	image={content.about.banner.image}
	imageAlt={content.about.banner.imageAlt}
	eyebrow={content.about.banner.eyebrow}
	title={content.about.banner.title}
	subtitle={content.about.banner.subtitle}
/>

<section class="relative bg-snow px-5 py-20 md:px-8 md:py-28">
	<div class="mx-auto max-w-[1000px]">
		<div use:reveal class="max-w-2xl">
			{#each content.about.introParagraphs as paragraph (paragraph)}
				<p class="mt-5 font-sans text-base leading-relaxed text-ink/85 first:mt-0 md:text-lg">
					{paragraph}
				</p>
			{/each}
		</div>
	</div>
</section>

<section class="relative bg-snow px-5 pb-16 md:px-8 md:pb-24">
	<div class="mx-auto max-w-[1400px]">
		<div use:revealStagger={{ y: 24, stagger: 0.08 }} class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each values as value (value.title)}
				{@const Icon = getIcon(value.icon)}
				<div class="shadow-cozy rounded-2xl border border-ink/10 bg-surface p-6 md:p-8">
					<Icon class="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
					<h2 class="mt-4 font-display text-xl font-bold text-ink">{value.title}</h2>
					<p class="mt-2 font-sans text-sm leading-relaxed text-ink/75">{value.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="relative bg-snow px-5 pb-16 md:px-8 md:pb-24">
	<div class="mx-auto max-w-[1000px]">
		<div use:reveal>
			<h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">{content.about.teamHeading}</h2>
			<p class="mt-4 max-w-2xl font-sans text-base leading-relaxed text-muted">
				{content.about.teamBody}
			</p>
		</div>

		<div use:revealStagger={{ y: 24, stagger: 0.08 }} class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
			{#each guides as guide (guide.name)}
				<div class="flex gap-4 border-t border-ink/15 pt-5">
					<span
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-base font-semibold text-gold"
						aria-hidden="true"
					>
						{guide.name
							.split(' ')
							.map((part) => part[0])
							.join('')}
					</span>
					<div>
						<h3 class="font-display text-lg font-bold text-ink">{guide.name}</h3>
						<p class="font-sans text-xs tracking-wide text-gold uppercase">
							{guide.role} &middot; {guide.years} yrs
						</p>
						<p class="mt-2 font-sans text-sm leading-relaxed text-ink/75">{guide.bio}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="relative bg-surface px-5 py-20 md:px-8 md:py-28">
	<div class="mx-auto max-w-[1400px]">
		<div use:reveal class="max-w-2xl">
			<h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">{content.about.credentialsHeading}</h2>
			<p class="mt-4 font-sans text-base text-muted">
				{content.about.credentialsBody}
			</p>
		</div>
		<div use:revealStagger={{ y: 24, stagger: 0.08 }} class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each credentials as credential (credential.name)}
				<div class="border-t border-ink/15 pt-5">
					<h3 class="font-sans text-sm font-semibold tracking-wide text-gold uppercase">
						{credential.name}
					</h3>
					<p class="mt-2 font-sans text-sm leading-relaxed text-ink/75">{credential.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<PlanYourTrek />
