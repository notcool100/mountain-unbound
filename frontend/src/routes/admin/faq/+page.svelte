<script lang="ts">
	import { content } from '$lib/cms/store.svelte';
	import ContentCard from '$lib/admin/ContentCard.svelte';
	import TextField from '$lib/admin/fields/TextField.svelte';
	import TextAreaField from '$lib/admin/fields/TextAreaField.svelte';
	import RepeaterField from '$lib/admin/fields/RepeaterField.svelte';
</script>

<svelte:head>
	<title>FAQ | Windhorse Admin</title>
</svelte:head>

<div class="mx-auto max-w-[1000px] flex flex-col gap-6">
	<div>
		<h1 class="font-display text-3xl font-bold text-ink">FAQ</h1>
		<p class="mt-2 font-sans text-sm text-muted">Shown on the homepage.</p>
	</div>

	<ContentCard title="Questions" open>
		<RepeaterField
			label="FAQ items"
			bind:items={content.faqs}
			createItem={() => ({ id: crypto.randomUUID(), question: 'New question?', answer: '' })}
			itemLabel={(f) => f.question || 'Untitled'}
			addLabel="Add question"
		>
			{#snippet children(faq)}
				<div class="sm:col-span-2">
					<TextField label="Question" bind:value={faq.question} />
				</div>
				<div class="sm:col-span-2">
					<TextAreaField label="Answer" bind:value={faq.answer} rows={4} />
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>
</div>
