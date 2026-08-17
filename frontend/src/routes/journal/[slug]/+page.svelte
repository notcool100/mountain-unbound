<script lang="ts">
	import { Clock } from '@lucide/svelte';
	import { page } from '$app/state';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PlanYourTrek from '$lib/components/PlanYourTrek.svelte';
	import { reveal } from '$lib/utils/reveal';
	import { content, cmsMeta } from '$lib/cms/store.svelte';

	let article = $derived(content.journal.find((a) => a.slug === page.params.slug));
	let related = $derived(
		article ? content.journal.filter((a) => a.slug !== article!.slug).slice(0, 2) : []
	);

	function formatDate(iso: string) {
		return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title
		>{article
			? `${article.title} | Windhorse Expeditions Journal`
			: cmsMeta.hasLoaded
				? 'Article not found | Windhorse Expeditions'
				: 'Loading… | Windhorse Expeditions'}</title
	>
	<meta name="description" content={article?.excerpt ?? 'This article could not be found.'} />
</svelte:head>

{#if article}
<PageBanner
	image={article.image}
	imageAlt={article.imageAlt}
	eyebrow={article.category}
	title={article.title}
	subtitle={article.excerpt}
/>

<article class="relative bg-snow px-5 py-16 md:px-8 md:py-24">
	<div class="mx-auto max-w-[720px]">
		<div use:reveal class="flex items-center gap-4 border-b border-ink/10 pb-6 font-sans text-sm text-muted">
			<span>{formatDate(article.publishDate)}</span>
			<span class="flex items-center gap-1.5">
				<Clock class="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
				{article.readMinutes} min read
			</span>
		</div>

		{#each article.sections as section (section.heading)}
			<div use:reveal class="mt-10">
				<h2 class="font-display text-2xl font-bold text-ink sm:text-3xl">{section.heading}</h2>
				{#each section.body as paragraph}
					<p class="mt-4 font-sans text-base leading-relaxed text-ink/85">{paragraph}</p>
				{/each}
			</div>
		{/each}
	</div>
</article>

{#if related.length > 0}
	<section class="relative bg-surface px-5 py-16 md:px-8 md:py-20">
		<div class="mx-auto max-w-[1100px]">
			<h2 class="font-display text-2xl font-bold text-ink">{content.journalDetailLabels.moreHeading}</h2>
			<div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
				{#each related as item (item.slug)}
					<a href={`/journal/${item.slug}`} class="group">
						<p class="font-sans text-xs font-semibold tracking-[0.12em] text-gold uppercase">
							{item.category}
						</p>
						<h3 class="mt-2 font-display text-xl font-bold text-ink group-hover:text-ink/80">
							{item.title}
						</h3>
						<p class="mt-2 font-sans text-sm leading-relaxed text-ink/70">{item.excerpt}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<PlanYourTrek />
{:else if !cmsMeta.hasLoaded}
<section class="relative bg-snow px-5 py-32 text-center md:px-8" aria-busy="true">
	<p class="font-sans text-sm text-muted">Loading…</p>
</section>
{:else}
<section class="relative bg-snow px-5 py-32 text-center md:px-8">
	<h1 class="font-display text-3xl font-bold text-ink">Article not found</h1>
	<p class="mt-3 font-sans text-base text-muted">
		This article may have been renamed or removed. <a href="/journal" class="text-gold underline">Browse the journal</a>.
	</p>
</section>
{/if}
