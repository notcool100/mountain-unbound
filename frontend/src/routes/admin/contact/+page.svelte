<script lang="ts">
	import { content } from '$lib/cms/store.svelte';
	import ContentCard from '$lib/admin/ContentCard.svelte';
	import TextField from '$lib/admin/fields/TextField.svelte';
	import TextAreaField from '$lib/admin/fields/TextAreaField.svelte';
	import ImagePickerField from '$lib/admin/fields/ImagePickerField.svelte';
</script>

<svelte:head>
	<title>Contact Page | Windhorse Admin</title>
</svelte:head>

<div class="mx-auto flex max-w-[1000px] flex-col gap-6">
	<div>
		<h1 class="font-display text-3xl font-bold text-ink">Contact page</h1>
	</div>

	<ContentCard title="SEO">
		<TextField label="Page title" bind:value={content.contact.seo.title} />
		<TextAreaField label="Meta description" bind:value={content.contact.seo.description} rows={2} />
	</ContentCard>

	<ContentCard title="Banner" open>
		<ImagePickerField label="Image" bind:value={content.contact.banner.image} />
		<TextField label="Image alt text" bind:value={content.contact.banner.imageAlt} />
		<TextField label="Eyebrow" bind:value={content.contact.banner.eyebrow} />
		<TextField label="Title" bind:value={content.contact.banner.title} />
		<TextAreaField label="Subtitle" bind:value={content.contact.banner.subtitle} rows={2} />
	</ContentCard>

	<ContentCard title="Contact details" open>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Email" bind:value={content.contact.email} />
			<TextField label="Phone" bind:value={content.contact.phone} />
			<TextField label="Address" bind:value={content.contact.address} />
			<TextField label="Hours" bind:value={content.contact.hours} />
		</div>
	</ContentCard>

	<ContentCard title="Form copy">
		<TextAreaField label='"Sending opens your email" note' bind:value={content.contact.sendNote} rows={2} />
		<TextField label='"What happens next" heading' bind:value={content.contact.nextStepsHeading} />
		<TextAreaField label='"What happens next" body' bind:value={content.contact.nextStepsBody} rows={3} />
	</ContentCard>
</div>
