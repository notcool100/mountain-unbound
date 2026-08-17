<script lang="ts">
	import { content } from '$lib/cms/store.svelte';
	import { iconKeys } from '$lib/cms/icons';
	import ContentCard from '$lib/admin/ContentCard.svelte';
	import TextField from '$lib/admin/fields/TextField.svelte';
	import TextAreaField from '$lib/admin/fields/TextAreaField.svelte';
	import NumberField from '$lib/admin/fields/NumberField.svelte';
	import SelectField from '$lib/admin/fields/SelectField.svelte';
	import ImagePickerField from '$lib/admin/fields/ImagePickerField.svelte';
	import RepeaterField from '$lib/admin/fields/RepeaterField.svelte';
	import StringListField from '$lib/admin/fields/StringListField.svelte';

	const iconOptions = iconKeys.map((k) => ({ value: k, label: k }));
</script>

<svelte:head>
	<title>About Page | Windhorse Admin</title>
</svelte:head>

<div class="mx-auto flex max-w-[1000px] flex-col gap-6">
	<div>
		<h1 class="font-display text-3xl font-bold text-ink">About page</h1>
	</div>

	<ContentCard title="SEO">
		<TextField label="Page title" bind:value={content.about.seo.title} />
		<TextAreaField label="Meta description" bind:value={content.about.seo.description} rows={2} />
	</ContentCard>

	<ContentCard title="Banner" open>
		<ImagePickerField label="Image" bind:value={content.about.banner.image} />
		<TextField label="Image alt text" bind:value={content.about.banner.imageAlt} />
		<TextField label="Eyebrow" bind:value={content.about.banner.eyebrow} />
		<TextField label="Title" bind:value={content.about.banner.title} />
		<TextAreaField label="Subtitle" bind:value={content.about.banner.subtitle} rows={2} />
	</ContentCard>

	<ContentCard title="Intro">
		<StringListField label="Paragraphs" bind:items={content.about.introParagraphs} addLabel="Add paragraph" />
	</ContentCard>

	<ContentCard title="Values">
		<RepeaterField
			label="Value cards"
			bind:items={content.about.values}
			createItem={() => ({ icon: 'compass', title: 'New value', body: '' })}
			itemLabel={(v) => v.title || 'Untitled'}
			addLabel="Add value"
		>
			{#snippet children(value)}
				<TextField label="Title" bind:value={value.title} />
				<SelectField label="Icon" bind:value={value.icon} options={iconOptions} />
				<div class="sm:col-span-2">
					<TextAreaField label="Body" bind:value={value.body} rows={2} />
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>

	<ContentCard title="Guiding team">
		<TextField label="Section heading" bind:value={content.about.teamHeading} />
		<TextAreaField label="Section body" bind:value={content.about.teamBody} rows={3} />
		<RepeaterField
			label="Guides"
			bind:items={content.about.guides}
			createItem={() => ({ name: 'New guide', role: '', years: 1, bio: '' })}
			itemLabel={(g) => g.name || 'Untitled'}
			addLabel="Add guide"
		>
			{#snippet children(guide)}
				<TextField label="Name" bind:value={guide.name} />
				<TextField label="Role" bind:value={guide.role} />
				<NumberField label="Years guiding" bind:value={guide.years} />
				<div class="sm:col-span-2">
					<TextAreaField label="Bio" bind:value={guide.bio} rows={2} />
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>

	<ContentCard title="Credentials">
		<TextField label="Section heading" bind:value={content.about.credentialsHeading} />
		<TextAreaField label="Section body" bind:value={content.about.credentialsBody} rows={2} />
		<RepeaterField
			label="Credentials"
			bind:items={content.about.credentials}
			createItem={() => ({ name: 'New credential', body: '' })}
			itemLabel={(c) => c.name || 'Untitled'}
			addLabel="Add credential"
		>
			{#snippet children(cred)}
				<div class="sm:col-span-2">
					<TextField label="Name" bind:value={cred.name} />
				</div>
				<div class="sm:col-span-2">
					<TextAreaField label="Body" bind:value={cred.body} rows={2} />
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>
</div>
