<script lang="ts">
	import { goto } from '$app/navigation';
	import { Plus, Trash2, ArrowRight } from '@lucide/svelte';
	import { content, slugify } from '$lib/cms/store.svelte';
	import type { Article } from '$lib/data/journal';

	function uniqueSlug(base: string): string {
		let slug = base || 'new-article';
		let i = 2;
		while (content.journal.some((a) => a.slug === slug)) {
			slug = `${base || 'new-article'}-${i}`;
			i++;
		}
		return slug;
	}

	function addArticle() {
		const slug = uniqueSlug('new-article');
		const article: Article = {
			slug,
			title: 'New Article',
			excerpt: '',
			category: 'Planning',
			readMinutes: 5,
			publishDate: new Date().toISOString().slice(0, 10),
			image: '/images/ebc-ridge',
			imageAlt: '',
			sections: []
		};
		content.journal = [...content.journal, article];
		goto(`/admin/journal/${slug}`);
	}

	let confirmingDelete = $state<string | null>(null);

	function deleteArticle(slug: string) {
		if (confirmingDelete !== slug) {
			confirmingDelete = slug;
			return;
		}
		content.journal = content.journal.filter((a) => a.slug !== slug);
		confirmingDelete = null;
	}
</script>

<svelte:head>
	<title>Journal | Windhorse Admin</title>
</svelte:head>

<div class="mx-auto max-w-[1100px]">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="font-display text-3xl font-bold text-ink">Journal</h1>
			<p class="mt-2 font-sans text-sm text-muted">{content.journal.length} articles.</p>
		</div>
		<button
			type="button"
			onclick={addArticle}
			class="flex shrink-0 items-center gap-2 rounded-lg bg-crimson px-4 py-2.5 font-sans text-sm font-semibold text-on-scrim transition-colors hover:bg-crimson-dim"
		>
			<Plus class="h-4 w-4" strokeWidth={2} aria-hidden="true" />
			Add article
		</button>
	</div>

	<div class="mt-8 flex flex-col gap-3">
		{#each content.journal as article (article.slug)}
			<div class="shadow-cozy flex flex-wrap items-center gap-4 rounded-2xl border border-ink/10 bg-surface p-5">
				<div class="min-w-0 flex-1">
					<a href={`/admin/journal/${article.slug}`} class="font-display text-lg font-bold text-ink hover:text-gold">
						{article.title}
					</a>
					<p class="mt-1 font-sans text-sm text-muted">
						{article.category} &middot; {article.readMinutes} min read &middot; {article.publishDate}
					</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<button
						type="button"
						onclick={() => deleteArticle(article.slug)}
						class="flex h-9 items-center gap-1.5 rounded-lg px-3 font-sans text-xs font-semibold transition-colors {confirmingDelete ===
						article.slug
							? 'bg-crimson/10 text-crimson'
							: 'text-muted hover:bg-crimson/10 hover:text-crimson'}"
					>
						<Trash2 class="h-4 w-4" strokeWidth={1.75} />
						{confirmingDelete === article.slug ? 'Confirm?' : ''}
					</button>
					<a
						href={`/admin/journal/${article.slug}`}
						class="flex h-9 items-center gap-1.5 rounded-lg border border-ink/20 px-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold"
					>
						Edit
						<ArrowRight class="h-3.5 w-3.5" strokeWidth={2} />
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
