<script lang="ts">
	import { content } from '$lib/cms/store.svelte';
	import { iconKeys } from '$lib/cms/icons';
	import ContentCard from '$lib/admin/ContentCard.svelte';
	import TextField from '$lib/admin/fields/TextField.svelte';
	import TextAreaField from '$lib/admin/fields/TextAreaField.svelte';
	import NumberField from '$lib/admin/fields/NumberField.svelte';
	import SelectField from '$lib/admin/fields/SelectField.svelte';
	import BooleanField from '$lib/admin/fields/BooleanField.svelte';
	import ImagePickerField from '$lib/admin/fields/ImagePickerField.svelte';
	import VideoPickerField from '$lib/admin/fields/VideoPickerField.svelte';
	import RepeaterField from '$lib/admin/fields/RepeaterField.svelte';

	const iconOptions = iconKeys.map((k) => ({ value: k, label: k }));
</script>

<svelte:head>
	<title>Homepage | Windhorse Admin</title>
</svelte:head>

<div class="mx-auto flex max-w-[1000px] flex-col gap-6">
	<div>
		<h1 class="font-display text-3xl font-bold text-ink">Homepage</h1>
		<p class="mt-2 font-sans text-sm text-muted">Every section on the homepage, top to bottom.</p>
	</div>

	<ContentCard title="Hero" description="The full-bleed opening section." open>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Headline, line 1" bind:value={content.hero.headlineLine1} />
			<TextField label="Headline, line 2" bind:value={content.hero.headlineLine2} />
		</div>
		<TextAreaField label="Subhead" bind:value={content.hero.subhead} rows={3} />
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Button text" bind:value={content.hero.ctaText} />
			<TextField label="Button link" bind:value={content.hero.ctaHref} />
		</div>
		<ImagePickerField label="Background image" bind:value={content.hero.posterImage} />
		<TextField label="Background image alt text" bind:value={content.hero.posterAlt} />
		<VideoPickerField label="Background video" bind:value={content.hero.videoSrc} />
	</ContentCard>

	<ContentCard title="Stats & Accountability" description={'"Small teams. Real accountability." section.'}>
		<TextField label="Heading" bind:value={content.statsSection.heading} />
		<TextAreaField label="Body" bind:value={content.statsSection.body} rows={3} />
		<ImagePickerField label="Background texture image" bind:value={content.statsSection.backgroundImage} />
		<RepeaterField
			label="Stats"
			bind:items={content.statsSection.stats}
			createItem={() => ({ id: crypto.randomUUID(), value: 0, label: 'New stat', prefix: '', suffix: '' })}
			itemLabel={(s) => s.label || 'Untitled stat'}
			addLabel="Add stat"
		>
			{#snippet children(stat)}
				<NumberField label="Value" bind:value={stat.value} />
				<TextField label="Label" bind:value={stat.label} />
				<TextField label="Prefix (optional)" bind:value={stat.prefix} />
				<TextField label="Suffix (optional)" bind:value={stat.suffix} />
			{/snippet}
		</RepeaterField>
	</ContentCard>

	<ContentCard title="Trail Story" description="The parallax photo section with the about-us caption.">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Headline, line 1" bind:value={content.trailStory.headlineLine1} />
			<TextField label="Headline, line 2 (accent)" bind:value={content.trailStory.headlineLine2} />
		</div>
		<TextAreaField label="Body" bind:value={content.trailStory.body} rows={3} />
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Link text" bind:value={content.trailStory.ctaText} />
			<TextField label="Link href" bind:value={content.trailStory.ctaHref} />
		</div>
		<ImagePickerField label="Background layer image" bind:value={content.trailStory.backgroundImage} />
		<TextField label="Background layer alt text" bind:value={content.trailStory.backgroundAlt} />
		<ImagePickerField label="Mid layer image" bind:value={content.trailStory.midImage} />
		<TextField label="Mid layer alt text" bind:value={content.trailStory.midAlt} />
		<ImagePickerField label="Foreground layer image" bind:value={content.trailStory.foregroundImage} />
		<TextField label="Foreground layer alt text" bind:value={content.trailStory.foregroundAlt} />
	</ContentCard>

	<ContentCard title="Regions" description={'"Three Regions, One Range" section.'}>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Heading" bind:value={content.regions.heading} />
			<TextField label="Heading accent" bind:value={content.regions.headingAccent} />
		</div>
		<TextAreaField label="Body" bind:value={content.regions.body} rows={3} />
		<RepeaterField
			label="Region cards"
			bind:items={content.regions.regions}
			createItem={() => ({ name: 'New region', trekCount: '1 Trek', href: '/treks', image: '/images/ebc-card', imageAlt: '' })}
			itemLabel={(r) => r.name || 'Untitled region'}
			addLabel="Add region"
		>
			{#snippet children(region)}
				<TextField label="Name" bind:value={region.name} />
				<TextField label="Trek count label" bind:value={region.trekCount} />
				<TextField label="Link href" bind:value={region.href} />
				<div class="sm:col-span-2">
					<ImagePickerField label="Image" bind:value={region.image} />
				</div>
				<div class="sm:col-span-2">
					<TextField label="Image alt text" bind:value={region.imageAlt} />
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>

	<ContentCard title="Activities Offered">
		<TextField label="Heading" bind:value={content.activities.heading} />
		<TextAreaField label="Body" bind:value={content.activities.body} rows={3} />
		<RepeaterField
			label="Activity cards"
			bind:items={content.activities.activities}
			createItem={() => ({ title: 'New activity', badge: 'Badge', href: '/treks', image: '/images/ebc-card', imageAlt: '' })}
			itemLabel={(a) => a.title || 'Untitled activity'}
			addLabel="Add activity"
		>
			{#snippet children(activity)}
				<TextField label="Title" bind:value={activity.title} />
				<TextField label="Badge label" bind:value={activity.badge} />
				<TextField label="Link href" bind:value={activity.href} />
				<div class="sm:col-span-2">
					<ImagePickerField label="Image" bind:value={activity.image} />
				</div>
				<div class="sm:col-span-2">
					<TextField label="Image alt text" bind:value={activity.imageAlt} />
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>

	<ContentCard title="EBC Pricing Tiers" description="Everest Base Camp, Your Way comparison cards.">
		<TextField label="Heading" bind:value={content.ebcTiers.heading} />
		<TextAreaField label="Body" bind:value={content.ebcTiers.body} rows={3} />
		<RepeaterField
			label="Tiers"
			bind:items={content.ebcTiers.tiers}
			createItem={() => ({
				badge: 'New',
				name: 'New tier',
				days: 13,
				price: 1000,
				description: '',
				features: [],
				href: '/contact',
				cta: 'Enquire'
			})}
			itemLabel={(t) => t.name || 'Untitled tier'}
			addLabel="Add tier"
		>
			{#snippet children(tier)}
				<TextField label="Badge" bind:value={tier.badge} />
				<TextField label="Name" bind:value={tier.name} />
				<NumberField label="Days" bind:value={tier.days} />
				<NumberField label="Price (USD)" bind:value={tier.price} />
				<div class="sm:col-span-2">
					<TextAreaField label="Description" bind:value={tier.description} rows={2} />
				</div>
				<TextField label="Link href" bind:value={tier.href} />
				<TextField label="Button text" bind:value={tier.cta} />
				<div class="sm:col-span-2">
					<RepeaterField
						label="Features"
						bind:items={tier.features}
						createItem={() => ({ label: 'New feature', included: true })}
						itemLabel={(f) => f.label || 'Untitled feature'}
						addLabel="Add feature"
					>
						{#snippet children(feature)}
							<TextField label="Label" bind:value={feature.label} />
							<BooleanField label="Included" bind:value={feature.included} />
						{/snippet}
					</RepeaterField>
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>

	<ContentCard title="Why Windhorse grid" description="The six-item icon grid.">
		<TextField label="Heading" bind:value={content.whyGrid.heading} />
		<TextAreaField label="Body" bind:value={content.whyGrid.body} rows={3} />
		<RepeaterField
			label="Items"
			bind:items={content.whyGrid.items}
			createItem={() => ({ icon: 'compass', title: 'New item', body: '' })}
			itemLabel={(i) => i.title || 'Untitled item'}
			addLabel="Add item"
		>
			{#snippet children(item)}
				<TextField label="Title" bind:value={item.title} />
				<SelectField label="Icon" bind:value={item.icon} options={iconOptions} />
				<div class="sm:col-span-2">
					<TextAreaField label="Body" bind:value={item.body} rows={2} />
				</div>
			{/snippet}
		</RepeaterField>
	</ContentCard>

	<ContentCard title="Plan Your Trek CTA" description="The closing call-to-action band.">
		<TextField label="Heading" bind:value={content.planYourTrek.heading} />
		<TextAreaField label="Body" bind:value={content.planYourTrek.body} rows={3} />
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<TextField label="Email" bind:value={content.planYourTrek.email} />
			<TextField label="Phone" bind:value={content.planYourTrek.phone} />
		</div>
	</ContentCard>
</div>
