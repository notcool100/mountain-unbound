<script lang="ts">
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Menu, X, MountainSnow } from '@lucide/svelte';
	import { scrollState } from '$lib/utils/scrollState.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { content } from '$lib/cms/store.svelte';
	import { resolveImageSrcset } from '$lib/cms/media';

	let menuOpen = $state(false);

	let links = $derived(content.nav.links);
	let logoSrc = $derived(content.branding.logoUrl ? resolveImageSrcset(content.branding.logoUrl).src : '');

	let isHome = $derived(page.url.pathname === '/');
	// On the home page the nav starts transparent over the dark hero photo (light text),
	// then becomes a solid light bar once scrolled (dark text). Every other page is
	// solid light from the start.
	let showSolid = $derived(!isHome || scrollState.pastThreshold);

	function closeMenu() {
		menuOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) closeMenu();
	}

	$effect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<header
	class="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 {showSolid
		? 'border-ink/10 bg-snow/90'
		: 'border-transparent bg-transparent'}"
	class:supports-backdrop={showSolid}
>
	<div class="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-8">
		<a
			href="/"
			class="flex items-center gap-2 font-display text-lg font-semibold tracking-tight transition-colors md:text-xl {showSolid
				? 'text-ink'
				: 'text-on-scrim'}"
		>
			{#if logoSrc}
				<img src={logoSrc} alt={content.nav.brand} class="h-7 w-auto object-contain" />
			{:else}
				<MountainSnow
					class="h-5 w-5 transition-colors {showSolid ? 'text-gold' : 'text-gold-bright'}"
					strokeWidth={1.75}
					aria-hidden="true"
				/>
			{/if}
			<span>{content.nav.brand}</span>
			<span
				class="hidden text-[0.6rem] font-sans font-medium tracking-[0.14em] transition-colors sm:inline {showSolid
					? 'text-muted'
					: 'text-on-scrim/70'}"
				>{content.nav.brandBadge}</span
			>
		</a>

		<nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={page.url.pathname.startsWith(link.href) ? 'page' : undefined}
					class="group relative py-2 font-sans text-sm font-medium transition-colors {showSolid
						? page.url.pathname.startsWith(link.href)
							? 'text-ink'
							: 'text-ink/75 hover:text-ink'
						: page.url.pathname.startsWith(link.href)
							? 'text-on-scrim'
							: 'text-on-scrim/90 hover:text-on-scrim'}"
				>
					{link.label}
					<span
						class="absolute inset-x-0 -bottom-0.5 h-px transition-transform duration-300 {showSolid
							? 'bg-gold'
							: 'bg-gold-bright'} {page.url.pathname.startsWith(link.href)
							? 'scale-x-100'
							: 'scale-x-0 group-hover:scale-x-100'}"
					></span>
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-1.5 md:gap-3">
			<ThemeToggle light={!showSolid} />

			<div class="hidden lg:block">
				<a
					href="/contact"
					class="inline-flex h-11 items-center rounded-lg bg-crimson px-5 font-sans text-sm font-semibold text-on-scrim transition-colors hover:bg-crimson-dim"
				>
					{content.nav.ctaText}
				</a>
			</div>

			<button
				type="button"
				class="flex h-11 w-11 items-center justify-center rounded-lg transition-colors lg:hidden {showSolid
					? 'text-ink'
					: 'text-on-scrim'}"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<X class="h-6 w-6" strokeWidth={1.75} />
				{:else}
					<Menu class="h-6 w-6" strokeWidth={1.75} />
				{/if}
			</button>
		</div>
	</div>
</header>

{#if menuOpen}
	<div
		id="mobile-menu"
		class="fixed inset-0 z-40 bg-snow lg:hidden"
		transition:fade={{ duration: 200 }}
	>
		<nav
			class="flex h-full flex-col items-start justify-center gap-2 px-8"
			aria-label="Mobile primary"
		>
			{#each links as link, i (link.href)}
				<a
					href={link.href}
					onclick={closeMenu}
					in:fly={{ y: 16, duration: 350, delay: 80 + i * 60, easing: cubicOut }}
					class="py-3 font-display text-4xl font-semibold text-ink"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/contact"
				onclick={closeMenu}
				in:fly={{ y: 16, duration: 350, delay: 80 + links.length * 60, easing: cubicOut }}
				class="mt-6 inline-flex h-12 items-center rounded-lg bg-crimson px-6 font-sans text-base font-semibold text-on-scrim"
			>
				Plan Your Trek
			</a>
		</nav>
	</div>
{/if}

<style>
	.supports-backdrop {
		backdrop-filter: blur(16px) saturate(140%);
		-webkit-backdrop-filter: blur(16px) saturate(140%);
	}
</style>
