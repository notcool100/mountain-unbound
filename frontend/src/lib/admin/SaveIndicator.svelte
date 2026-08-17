<script lang="ts">
	import { cmsMeta } from '$lib/cms/store.svelte';
</script>

<span class="inline-flex items-center gap-1.5 font-sans text-xs text-muted" class:text-crimson={cmsMeta.saveState === 'error'}>
	<span
		class="h-1.5 w-1.5 rounded-full {cmsMeta.saveState === 'error' ? 'bg-crimson' : 'bg-gold'}"
		class:animate-pulse={cmsMeta.saveState === 'saving' || cmsMeta.saveState === 'loading'}
		aria-hidden="true"
	></span>
	{#if cmsMeta.saveState === 'loading'}
		Loading…
	{:else if cmsMeta.saveState === 'saving'}
		Saving…
	{:else if cmsMeta.saveState === 'error'}
		{cmsMeta.error ?? 'Something went wrong'}
	{:else}
		All changes saved
	{/if}
</span>
