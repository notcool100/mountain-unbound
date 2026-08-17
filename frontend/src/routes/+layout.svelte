<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { refreshOnSettle } from '$lib/utils/gsap';
	import { content, initCms } from '$lib/cms/store.svelte';
	import { resolveImageSrcset } from '$lib/cms/media';

	let { children } = $props();

	let isAdmin = $derived(page.url.pathname.startsWith('/admin'));
	let faviconHref = $derived(
		content.branding.faviconUrl ? resolveImageSrcset(content.branding.faviconUrl).src : favicon
	);

	function scheduleRefresh() {
		// Double rAF: let this navigation's components finish mounting and
		// creating their own ScrollTriggers before measuring the page.
		requestAnimationFrame(() => requestAnimationFrame(refreshOnSettle));
	}

	onMount(() => {
		initCms();
		scheduleRefresh();
	});
	afterNavigate(scheduleRefresh);
</script>

<svelte:head><link rel="icon" href={faviconHref} /></svelte:head>

{#if !isAdmin}<Nav />{/if}
<main>
	{@render children()}
</main>
{#if !isAdmin}<Footer />{/if}
