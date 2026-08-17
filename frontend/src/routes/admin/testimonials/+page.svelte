<script lang="ts">
	import { content } from '$lib/cms/store.svelte';
	import ContentCard from '$lib/admin/ContentCard.svelte';
	import TextField from '$lib/admin/fields/TextField.svelte';
	import TextAreaField from '$lib/admin/fields/TextAreaField.svelte';
	import ImagePickerField from '$lib/admin/fields/ImagePickerField.svelte';
	import RepeaterField from '$lib/admin/fields/RepeaterField.svelte';
</script>

<svelte:head>
	<title>Testimonials | Windhorse Admin</title>
</svelte:head>

<div class="mx-auto max-w-[1000px] flex flex-col gap-6">
	<div>
		<h1 class="font-display text-3xl font-bold text-ink">Testimonials</h1>
		<p class="mt-2 font-sans text-sm text-muted">Shown in the full-bleed carousel on the homepage.</p>
	</div>

	<ContentCard title="Testimonials" open>
		<RepeaterField
			label="Quotes"
			bind:items={content.testimonials}
			createItem={() => ({
				id: crypto.randomUUID(),
				quote: '',
				name: 'New trekker',
				location: '',
				trek: '',
				image: '/images/ebc-trail',
				imageAlt: ''
			})}
			itemLabel={(t) => t.name || 'Untitled'}
			addLabel="Add testimonial"
		>
			{#snippet children(t)}
				<div class="sm:col-span-2">
					<TextAreaField label="Quote" bind:value={t.quote} rows={3} />
				</div>
				<TextField label="Name" bind:value={t.name} />
				<TextField label="Location" bind:value={t.location} hint="e.g. Bergen, Norway" />
				<TextField label="Trek label" bind:value={t.trek} hint="e.g. Everest Base Camp, 2025" />
				<div class="sm:col-span-2">
					<ImagePickerField label="Background photo" bind:value={t.image} />
				</div>
				<div class="sm:col-span-2">
					<TextField label="Image alt text" bind:value={t.imageAlt} />
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>
</div>
