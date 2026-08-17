<script lang="ts">
	import { content } from '$lib/cms/store.svelte';
	import ContentCard from '$lib/admin/ContentCard.svelte';
	import TextField from '$lib/admin/fields/TextField.svelte';
	import TextAreaField from '$lib/admin/fields/TextAreaField.svelte';
	import ImagePickerField from '$lib/admin/fields/ImagePickerField.svelte';
	import RepeaterField from '$lib/admin/fields/RepeaterField.svelte';
	import StringListField from '$lib/admin/fields/StringListField.svelte';
</script>

<svelte:head>
	<title>Site & Footer | Windhorse Admin</title>
</svelte:head>

<div class="mx-auto flex max-w-[1000px] flex-col gap-6">
	<div>
		<h1 class="font-display text-3xl font-bold text-ink">Site & footer</h1>
		<p class="mt-2 font-sans text-sm text-muted">Navigation, footer, and page chrome shared across the site.</p>
	</div>

	<ContentCard title="Navigation" open>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Brand name" bind:value={content.nav.brand} />
			<TextField label="Brand badge" bind:value={content.nav.brandBadge} />
		</div>
		<TextField label="Nav button text" bind:value={content.nav.ctaText} />
		<RepeaterField
			label="Nav links"
			bind:items={content.nav.links}
			createItem={() => ({ href: '/', label: 'New link' })}
			itemLabel={(l) => l.label || 'Untitled'}
			addLabel="Add link"
		>
			{#snippet children(link)}
				<TextField label="Label" bind:value={link.label} />
				<TextField label="Href" bind:value={link.href} />
			{/snippet}
		</RepeaterField>
	</ContentCard>

	<ContentCard title="Footer" open>
		<TextAreaField label="Tagline" bind:value={content.footer.tagline} rows={2} />
		<StringListField label="Credential badges" bind:items={content.footer.credentials} addLabel="Add badge" />
		<RepeaterField
			label="Explore links"
			bind:items={content.footer.exploreLinks}
			createItem={() => ({ href: '/', label: 'New link' })}
			itemLabel={(l) => l.label || 'Untitled'}
			addLabel="Add link"
		>
			{#snippet children(link)}
				<TextField label="Label" bind:value={link.label} />
				<TextField label="Href" bind:value={link.href} />
			{/snippet}
		</RepeaterField>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Email" bind:value={content.footer.email} />
			<TextField label="Address" bind:value={content.footer.address} />
		</div>
		<TextField label="Newsletter label" bind:value={content.footer.newsletterLabel} />
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Newsletter input placeholder" bind:value={content.footer.newsletterPlaceholder} />
			<TextField label="Newsletter button text" bind:value={content.footer.newsletterButton} />
		</div>
		<TextField label="Newsletter success message" bind:value={content.footer.newsletterSuccess} />
		<TextAreaField label="Photo credit line" bind:value={content.footer.photoCredit} rows={2} />
	</ContentCard>

	<ContentCard title="Homepage SEO">
		<TextField label="Page title" bind:value={content.seo.title} />
		<TextAreaField label="Meta description" bind:value={content.seo.description} rows={2} />
	</ContentCard>

	<ContentCard title="Treks listing page">
		<TextField label="Page title" bind:value={content.treksPage.seo.title} />
		<TextAreaField label="Meta description" bind:value={content.treksPage.seo.description} rows={2} />
		<ImagePickerField label="Banner image" bind:value={content.treksPage.banner.image} />
		<TextField label="Banner image alt text" bind:value={content.treksPage.banner.imageAlt} />
		<TextField label="Banner eyebrow" bind:value={content.treksPage.banner.eyebrow} />
		<TextField label="Banner title" bind:value={content.treksPage.banner.title} />
		<TextAreaField label="Banner subtitle" bind:value={content.treksPage.banner.subtitle} rows={2} />
	</ContentCard>

	<ContentCard title="Journal listing page">
		<TextField label="Page title" bind:value={content.journalPage.seo.title} />
		<TextAreaField label="Meta description" bind:value={content.journalPage.seo.description} rows={2} />
		<ImagePickerField label="Banner image" bind:value={content.journalPage.banner.image} />
		<TextField label="Banner image alt text" bind:value={content.journalPage.banner.imageAlt} />
		<TextField label="Banner eyebrow" bind:value={content.journalPage.banner.eyebrow} />
		<TextField label="Banner title" bind:value={content.journalPage.banner.title} />
		<TextAreaField label="Banner subtitle" bind:value={content.journalPage.banner.subtitle} rows={2} />
	</ContentCard>

	<ContentCard title="Trek detail page labels" description="Shared chrome shown on every individual trek page.">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label='"Trip highlights" heading' bind:value={content.trekDetailLabels.highlightsHeading} />
			<TextField label="Cost & what's included heading" bind:value={content.trekDetailLabels.costHeading} />
			<TextField label='"Included" heading' bind:value={content.trekDetailLabels.includedHeading} />
			<TextField label='"Not included" heading' bind:value={content.trekDetailLabels.notIncludedHeading} />
			<TextField label='"Upcoming departures" heading' bind:value={content.trekDetailLabels.departuresHeading} />
			<TextField label="Itinerary section heading" bind:value={content.trekDetailLabels.itineraryHeading} />
		</div>
		<TextAreaField label="Private-departures note" bind:value={content.trekDetailLabels.privateDeparturesNote} rows={2} />
		<TextAreaField
			label="Itinerary description template"
			bind:value={content.trekDetailLabels.itineraryDescriptionTemplate}
			hint="Use the token trekName wrapped in curly braces anywhere you want the trek's name inserted."
			rows={2}
		/>
	</ContentCard>

	<ContentCard title="Journal detail page labels">
		<TextField label='"More from the journal" heading' bind:value={content.journalDetailLabels.moreHeading} />
	</ContentCard>
</div>
