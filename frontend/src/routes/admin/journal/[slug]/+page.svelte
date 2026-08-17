<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { content, slugify } from '$lib/cms/store.svelte';
	import ContentCard from '$lib/admin/ContentCard.svelte';
	import TextField from '$lib/admin/fields/TextField.svelte';
	import TextAreaField from '$lib/admin/fields/TextAreaField.svelte';
	import NumberField from '$lib/admin/fields/NumberField.svelte';
	import ImagePickerField from '$lib/admin/fields/ImagePickerField.svelte';
	import RepeaterField from '$lib/admin/fields/RepeaterField.svelte';
	import StringListField from '$lib/admin/fields/StringListField.svelte';

	let article = $derived(content.journal.find((a) => a.slug === page.params.slug));

	let slugDraft = $state('');
	let slugError = $state('');
	$effect(() => {
		if (article) slugDraft = article.slug;
	});

	function renameSlug() {
		if (!article) return;
		const next = slugify(slugDraft);
		if (!next) {
			slugError = 'Slug cannot be empty.';
			return;
		}
		if (next !== article.slug && content.journal.some((a) => a.slug === next)) {
			slugError = 'Another article already uses that slug.';
			return;
		}
		slugError = '';
		const changed = next !== article.slug;
		article.slug = next;
		if (changed) goto(`/admin/journal/${next}`, { replaceState: true });
	}
</script>

<svelte:head>
	<title>{article ? article.title : 'Article'} | Windhorse Admin</title>
</svelte:head>

{#if article}
	<div class="mx-auto flex max-w-[1000px] flex-col gap-6">
		<div>
			<a href="/admin/journal" class="font-sans text-sm text-muted hover:text-ink">&larr; All articles</a>
			<h1 class="mt-2 font-display text-3xl font-bold text-ink">{article.title}</h1>
		</div>

		<ContentCard title="URL slug" open>
			<div class="flex flex-wrap items-end gap-3">
				<div class="flex-1">
					<TextField label="Slug" bind:value={slugDraft} hint="/journal/{slugDraft}" />
				</div>
				<button
					type="button"
					onclick={renameSlug}
					class="h-11 shrink-0 rounded-lg border border-ink/20 px-4 font-sans text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold"
				>
					Apply
				</button>
			</div>
			{#if slugError}<p class="font-sans text-sm text-crimson">{slugError}</p>{/if}
		</ContentCard>

		<ContentCard title="Basics" open>
			<TextField label="Title" bind:value={article.title} />
			<TextAreaField label="Excerpt" bind:value={article.excerpt} rows={2} />
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<TextField label="Category" bind:value={article.category} />
				<NumberField label="Read minutes" bind:value={article.readMinutes} />
				<TextField label="Publish date (YYYY-MM-DD)" bind:value={article.publishDate} />
			</div>
			<ImagePickerField label="Cover image" bind:value={article.image} />
			<TextField label="Image alt text" bind:value={article.imageAlt} />
		</ContentCard>

		<ContentCard title="Sections" description="Each section is a heading followed by one or more paragraphs.">
			<RepeaterField
				label="Sections"
				bind:items={article.sections}
				createItem={() => ({ heading: 'New section', body: [''] })}
				itemLabel={(s) => s.heading || 'Untitled section'}
				addLabel="Add section"
			>
				{#snippet children(section)}
					<div class="sm:col-span-2">
						<TextField label="Heading" bind:value={section.heading} />
					</div>
					<div class="sm:col-span-2">
						<StringListField label="Paragraphs" bind:items={section.body} addLabel="Add paragraph" />
					</div>
				{/snippet}
			</RepeaterField>
		</ContentCard>
	</div>
{:else}
	<div class="mx-auto max-w-[1000px] text-center">
		<p class="font-sans text-base text-muted">This article doesn't exist anymore.</p>
		<a href="/admin/journal" class="mt-3 inline-block font-sans text-sm font-semibold text-gold">Back to all articles</a>
	</div>
{/if}
