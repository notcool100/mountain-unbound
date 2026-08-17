<script lang="ts">
	import { Sun, Moon, Monitor, Check } from '@lucide/svelte';
	import { themeState, applyTheme, type ThemePreference } from '$lib/utils/theme.svelte';

	type Props = { light?: boolean };
	let { light = false }: Props = $props();

	let open = $state(false);
	let rootEl: HTMLDivElement = $state()!;

	const options: { key: ThemePreference; label: string; icon: typeof Sun }[] = [
		{ key: 'light', label: 'Light', icon: Sun },
		{ key: 'dark', label: 'Dark', icon: Moon },
		{ key: 'system', label: 'System', icon: Monitor }
	];

	let activeIcon = $derived(options.find((o) => o.key === themeState.preference)?.icon ?? Monitor);

	function select(key: ThemePreference) {
		applyTheme(key);
		open = false;
	}

	function handleClickOutside(e: MouseEvent) {
		if (open && rootEl && !rootEl.contains(e.target as Node)) open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div bind:this={rootEl} class="relative">
	<button
		type="button"
		onclick={() => (open = !open)}
		aria-label="Change color theme"
		aria-expanded={open}
		aria-haspopup="true"
		class="flex h-10 w-10 items-center justify-center rounded-lg transition-colors {light
			? 'text-on-scrim hover:bg-on-scrim/10'
			: 'text-ink hover:bg-ink/5'}"
	>
		{#if activeIcon === Sun}
			<Sun class="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
		{:else if activeIcon === Moon}
			<Moon class="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
		{:else}
			<Monitor class="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
		{/if}
	</button>

	{#if open}
		<div
			role="menu"
			class="shadow-cozy absolute top-12 right-0 z-50 w-40 overflow-hidden rounded-lg border border-ink/10 bg-surface py-1.5"
		>
			{#each options as option (option.key)}
				<button
					type="button"
					role="menuitem"
					onclick={() => select(option.key)}
					class="flex w-full items-center gap-2.5 px-3.5 py-2.5 font-sans text-sm text-ink transition-colors hover:bg-ink/5"
				>
					<option.icon class="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
					{option.label}
					{#if themeState.preference === option.key}
						<Check class="ml-auto h-4 w-4 text-gold" strokeWidth={2} aria-hidden="true" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
