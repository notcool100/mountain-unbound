<script lang="ts">
	type Props = { label: string; value: number; hint?: string; min?: number; step?: number };
	let { label, value = $bindable(), hint, min, step = 1 }: Props = $props();
</script>

<label class="flex flex-col gap-1.5">
	<span class="font-sans text-sm font-medium text-ink">{label}</span>
	<input
		type="number"
		bind:value
		{min}
		{step}
		class="h-11 rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink focus-visible:border-gold"
	/>
	{#if hint}<span class="font-sans text-xs text-muted">{hint}</span>{/if}
</label>
