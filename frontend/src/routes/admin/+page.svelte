<script lang="ts">
	import {
		Home,
		Map,
		Newspaper,
		Quote,
		HelpCircle,
		UserRound,
		Mail,
		Settings,
		ArrowRight,
		RotateCcw
	} from '@lucide/svelte';
	import { resetAll } from '$lib/cms/store.svelte';

	const sections = [
		{ href: '/admin/homepage', label: 'Homepage', icon: Home, description: 'Hero, stats, regions, activities, pricing tiers, and every homepage section.' },
		{ href: '/admin/treks', label: 'Treks & Itineraries', icon: Map, description: 'Add or edit treks, pricing, galleries, and day-by-day itineraries.' },
		{ href: '/admin/journal', label: 'Journal', icon: Newspaper, description: 'Articles, sections, and cover images for the trail journal.' },
		{ href: '/admin/testimonials', label: 'Testimonials', icon: Quote, description: 'Trekker quotes shown in the homepage carousel.' },
		{ href: '/admin/faq', label: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions on the homepage.' },
		{ href: '/admin/about', label: 'About Page', icon: UserRound, description: 'Company story, values, guiding team, and credentials.' },
		{ href: '/admin/contact', label: 'Contact Page', icon: Mail, description: 'Contact form labels, banner, and reach-us details.' },
		{ href: '/admin/site', label: 'Site & Footer', icon: Settings, description: 'Navigation links, footer, and shared trek/journal page labels.' }
	];

	let confirmingReset = $state(false);

	function handleResetAll() {
		if (!confirmingReset) {
			confirmingReset = true;
			return;
		}
		resetAll();
		confirmingReset = false;
	}
</script>

<svelte:head>
	<title>Admin Dashboard | Windhorse Expeditions</title>
</svelte:head>

<div class="mx-auto max-w-[1200px]">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="font-display text-3xl font-bold text-ink">Content dashboard</h1>
			<p class="mt-2 max-w-xl font-sans text-sm text-muted">
				Edits save automatically to this browser and show up on the live site right away. Once a
				backend exists, this same editor will write through the API instead of localStorage.
			</p>
		</div>
		<button
			type="button"
			onclick={handleResetAll}
			class="flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2.5 font-sans text-sm font-semibold transition-colors {confirmingReset
				? 'border-crimson bg-crimson/10 text-crimson'
				: 'border-ink/20 text-ink hover:border-crimson hover:text-crimson'}"
		>
			<RotateCcw class="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
			{confirmingReset ? 'Click again to confirm' : 'Reset all content'}
		</button>
	</div>

	<div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each sections as section (section.href)}
			<a
				href={section.href}
				class="shadow-cozy shadow-cozy-hover group flex flex-col rounded-2xl border border-ink/10 bg-surface p-6"
			>
				<section.icon class="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
				<h2 class="mt-4 font-display text-lg font-bold text-ink">{section.label}</h2>
				<p class="mt-2 font-sans text-sm leading-relaxed text-muted">{section.description}</p>
				<span class="mt-4 flex items-center gap-1.5 font-sans text-sm font-semibold text-ink">
					Edit
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
				</span>
			</a>
		{/each}
	</div>
</div>
