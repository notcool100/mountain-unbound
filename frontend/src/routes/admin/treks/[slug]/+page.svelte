<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { content, slugify } from '$lib/cms/store.svelte';
	import ContentCard from '$lib/admin/ContentCard.svelte';
	import TextField from '$lib/admin/fields/TextField.svelte';
	import TextAreaField from '$lib/admin/fields/TextAreaField.svelte';
	import NumberField from '$lib/admin/fields/NumberField.svelte';
	import SelectField from '$lib/admin/fields/SelectField.svelte';
	import ImagePickerField from '$lib/admin/fields/ImagePickerField.svelte';
	import RepeaterField from '$lib/admin/fields/RepeaterField.svelte';
	import StringListField from '$lib/admin/fields/StringListField.svelte';

	let trek = $derived(content.treks.find((t) => t.slug === page.params.slug));

	$effect(() => {
		if (trek && !content.itineraries[trek.slug]) {
			content.itineraries[trek.slug] = [];
		}
	});

	let slugDraft = $state('');
	let slugError = $state('');
	$effect(() => {
		if (trek) slugDraft = trek.slug;
	});

	function renameSlug() {
		if (!trek) return;
		const next = slugify(slugDraft);
		if (!next) {
			slugError = 'Slug cannot be empty.';
			return;
		}
		if (next !== trek.slug && content.treks.some((t) => t.slug === next)) {
			slugError = 'Another trek already uses that slug.';
			return;
		}
		slugError = '';
		const oldSlug = trek.slug;
		trek.slug = next;
		if (oldSlug !== next) {
			content.itineraries[next] = content.itineraries[oldSlug] ?? [];
			delete content.itineraries[oldSlug];
			goto(`/admin/treks/${next}`, { replaceState: true });
		}
	}

	const categoryOptions = [
		{ value: 'signature', label: 'Signature Treks' },
		{ value: 'peak-climbing', label: 'Peak Climbing' },
		{ value: 'short-treks', label: 'Short Treks' }
	];
	const difficultyOptions = [
		{ value: 'Moderate', label: 'Moderate' },
		{ value: 'Challenging', label: 'Challenging' },
		{ value: 'Strenuous', label: 'Strenuous' }
	];
</script>

<svelte:head>
	<title>{trek ? trek.name : 'Trek'} | Windhorse Admin</title>
</svelte:head>

{#if trek}
	<div class="mx-auto flex max-w-[1000px] flex-col gap-6">
		<div>
			<a href="/admin/treks" class="font-sans text-sm text-muted hover:text-ink">&larr; All treks</a>
			<h1 class="mt-2 font-display text-3xl font-bold text-ink">{trek.name}</h1>
		</div>

		<ContentCard title="URL slug" description="Changes the trek's page URL. Careful — this can break saved links." open>
			<div class="flex flex-wrap items-end gap-3">
				<div class="flex-1">
					<TextField label="Slug" bind:value={slugDraft} hint="/treks/{slugDraft}" />
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
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<TextField label="Name" bind:value={trek.name} />
				<TextField label="Region" bind:value={trek.region} />
				<SelectField label="Category" bind:value={trek.category} options={categoryOptions} />
				<SelectField label="Difficulty" bind:value={trek.difficulty} options={difficultyOptions} />
			</div>
			<TextField label="Tagline" bind:value={trek.tagline} />
			<TextAreaField label="Summary (used for search-engine descriptions)" bind:value={trek.summary} rows={2} />
			<TextAreaField label="Overview (main page copy)" bind:value={trek.overview} rows={6} />
		</ContentCard>

		<ContentCard title="Trip facts">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<NumberField label="Days" bind:value={trek.days} />
				<TextField label="Max altitude" bind:value={trek.maxAltitude} hint="e.g. 5,364 m · Kala Patthar" />
				<TextField label="Best seasons" bind:value={trek.bestSeasons} />
				<TextField label="Group size" bind:value={trek.groupSize} />
				<div class="sm:col-span-2">
					<TextField label="Start / end" bind:value={trek.startEnd} />
				</div>
			</div>
		</ContentCard>

		<ContentCard title="Pricing">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<NumberField label="Price (USD)" bind:value={trek.price} />
				<TextField label="Price note" bind:value={trek.priceNote} />
			</div>
		</ContentCard>

		<ContentCard title="Images">
			<ImagePickerField label="Card / banner image" bind:value={trek.image} />
			<TextField label="Image alt text" bind:value={trek.imageAlt} />
			<RepeaterField
				label="Gallery"
				bind:items={trek.gallery}
				createItem={() => ({ image: '/images/ebc-card', alt: '' })}
				itemLabel={(g, i) => `Photo ${i + 1}`}
				addLabel="Add photo"
			>
				{#snippet children(shot)}
					<div class="sm:col-span-2">
						<ImagePickerField label="Image" bind:value={shot.image} />
					</div>
					<div class="sm:col-span-2">
						<TextField label="Alt text" bind:value={shot.alt} />
					</div>
				{/snippet}
			</RepeaterField>
		</ContentCard>

		<ContentCard title="Highlights, includes & excludes">
			<StringListField label="Trip highlights" bind:items={trek.highlights} addLabel="Add highlight" />
			<StringListField label="Included" bind:items={trek.includes} addLabel="Add included item" />
			<StringListField label="Not included" bind:items={trek.excludes} addLabel="Add excluded item" />
		</ContentCard>

		<ContentCard title="Departures">
			<RepeaterField
				label="Upcoming departures"
				bind:items={trek.departures}
				createItem={() => ({ date: new Date().toISOString().slice(0, 10), spotsLeft: 8 })}
				itemLabel={(d) => d.date}
				addLabel="Add departure"
			>
				{#snippet children(departure)}
					<TextField label="Start date (YYYY-MM-DD)" bind:value={departure.date} />
					<NumberField label="Spots left" bind:value={departure.spotsLeft} />
				{/snippet}
			</RepeaterField>
		</ContentCard>

		<ContentCard title="Day-by-day itinerary" description="Shown on the trek page and used for the self-drawing route line.">
			<RepeaterField
				label="Days"
				bind:items={content.itineraries[trek.slug]}
				createItem={() => ({
					day: (content.itineraries[trek!.slug]?.length ?? 0) + 1,
					title: 'New day',
					location: '',
					elevation: '',
					description: ''
				})}
				itemLabel={(d) => `Day ${d.day} — ${d.title || 'Untitled'}`}
				addLabel="Add day"
			>
				{#snippet children(day)}
					<NumberField label="Day number" bind:value={day.day} />
					<TextField label="Title" bind:value={day.title} />
					<TextField label="Location" bind:value={day.location} hint="e.g. Lukla → Phakding" />
					<TextField label="Elevation" bind:value={day.elevation} hint="e.g. 2,610 m → 2,610 m" />
					<div class="sm:col-span-2">
						<TextAreaField label="Description" bind:value={day.description} rows={3} />
					</div>
				{/snippet}
			</RepeaterField>
		</ContentCard>
	</div>
{:else}
	<div class="mx-auto max-w-[1000px] text-center">
		<p class="font-sans text-base text-muted">This trek doesn't exist anymore.</p>
		<a href="/admin/treks" class="mt-3 inline-block font-sans text-sm font-semibold text-gold">Back to all treks</a>
	</div>
{/if}
