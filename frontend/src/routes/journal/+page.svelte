<script lang="ts">
	import { Clock, ArrowRight } from '@lucide/svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { revealStagger } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';
	import { resolveImageSrcset } from '$lib/cms/media';

	let articles = $derived(content.journal);

	function formatDate(iso: string) {
		return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{content.journalPage.seo.title}</title>
	<meta name="description" content={content.journalPage.seo.description} />
</svelte:head>

<PageBanner
	image={content.journalPage.banner.image}
	imageAlt={content.journalPage.banner.imageAlt}
	eyebrow={content.journalPage.banner.eyebrow}
	title={content.journalPage.banner.title}
	subtitle={content.journalPage.banner.subtitle}
/>

<section class="relative bg-snow px-5 py-24 md:px-8 md:py-32">
	<div class="mx-auto max-w-[1100px]">
		<div use:revealStagger={{ y: 24, stagger: 0.1 }} class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
			{#each articles as article (article.slug)}
				<a
					href={`/journal/${article.slug}`}
					class="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
				>
					<div class="shadow-cozy shadow-cozy-hover relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
						<picture>
							{#if resolveImageSrcset(article.image).srcset}
								<source
									srcset={resolveImageSrcset(article.image).srcset}
									type="image/webp"
									sizes="(min-width: 768px) 50vw, 100vw"
								/>
							{/if}
							<img
								src={resolveImageSrcset(article.image).src}
								alt={article.imageAlt}
								class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
								loading="lazy"
								decoding="async"
							/>
						</picture>
					</div>
					<p class="mt-5 font-sans text-xs font-semibold tracking-[0.12em] text-gold uppercase">
						{article.category}
					</p>
					<h2 class="mt-2 font-display text-2xl font-bold text-ink" style="letter-spacing: -0.01em;">
						{article.title}
					</h2>
					<p class="mt-2 font-sans text-sm leading-relaxed text-ink/75">{article.excerpt}</p>
					<div class="mt-4 flex items-center gap-4 font-sans text-xs text-muted">
						<span>{formatDate(article.publishDate)}</span>
						<span class="flex items-center gap-1">
							<Clock class="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
							{article.readMinutes} min read
						</span>
					</div>
					<span
						class="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-ink"
					>
						Read
						<ArrowRight
							class="h-4 w-4 transition-transform group-hover:translate-x-1"
							strokeWidth={1.75}
						/>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
