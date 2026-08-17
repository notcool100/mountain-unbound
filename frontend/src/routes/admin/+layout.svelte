<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import {
		MountainSnow,
		LayoutDashboard,
		Home,
		Map,
		Newspaper,
		Quote,
		HelpCircle,
		UserRound,
		Mail,
		Settings,
		ExternalLink,
		LogOut
	} from '@lucide/svelte';
	import { isAuthed, logout } from '$lib/cms/auth';
	import SaveIndicator from '$lib/admin/SaveIndicator.svelte';

	let { children } = $props();

	let isLoginPage = $derived(page.url.pathname === '/admin/login');
	let ready = $state(false);

	// Re-checks whenever the route changes (including client-side nav after
	// login), since this layout instance persists across nested navigation.
	$effect(() => {
		if (isLoginPage) return;
		if (isAuthed()) {
			ready = true;
		} else {
			ready = false;
			goto('/admin/login');
		}
	});

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/admin/homepage', label: 'Homepage', icon: Home },
		{ href: '/admin/treks', label: 'Treks & Itineraries', icon: Map },
		{ href: '/admin/journal', label: 'Journal', icon: Newspaper },
		{ href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
		{ href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
		{ href: '/admin/about', label: 'About Page', icon: UserRound },
		{ href: '/admin/contact', label: 'Contact Page', icon: Mail },
		{ href: '/admin/site', label: 'Site & Footer', icon: Settings }
	];

	function handleLogout() {
		logout();
		goto('/admin/login');
	}
</script>

{#if isLoginPage}
	{@render children()}
{:else if ready}
	<div class="min-h-dvh bg-snow">
		<div class="mx-auto flex max-w-[1600px]">
			<aside class="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-ink/10 bg-surface lg:flex">
				<div class="flex items-center gap-2 border-b border-ink/10 px-6 py-5 font-display text-base font-semibold text-ink">
					<MountainSnow class="h-5 w-5 text-gold" strokeWidth={1.75} aria-hidden="true" />
					Windhorse Admin
				</div>
				<nav class="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4" aria-label="Admin">
					{#each navItems as item (item.href)}
						<a
							href={item.href}
							aria-current={page.url.pathname === item.href ? 'page' : undefined}
							class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm transition-colors {page.url.pathname ===
							item.href
								? 'bg-ink/5 font-semibold text-ink'
								: 'text-ink/70 hover:bg-ink/5 hover:text-ink'}"
						>
							<item.icon class="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
							{item.label}
						</a>
					{/each}
				</nav>
				<div class="flex flex-col gap-2 border-t border-ink/10 px-3 py-4">
					<a
						href="/"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
					>
						<ExternalLink class="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
						View live site
					</a>
					<button
						type="button"
						onclick={handleLogout}
						class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-sans text-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
					>
						<LogOut class="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
						Log out
					</button>
				</div>
			</aside>

			<div class="min-w-0 flex-1">
				<header class="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-ink/10 bg-snow/95 px-5 py-4 backdrop-blur-sm md:px-8">
					<a href="/" target="_blank" rel="noopener" class="flex items-center gap-2 font-display text-sm font-semibold text-ink lg:hidden">
						<MountainSnow class="h-4 w-4 text-gold" strokeWidth={1.75} aria-hidden="true" />
						Windhorse Admin
					</a>
					<div class="ml-auto"><SaveIndicator /></div>
				</header>
				<main class="px-5 py-8 md:px-8 md:py-10">
					{@render children()}
				</main>
			</div>
		</div>
	</div>
{/if}
