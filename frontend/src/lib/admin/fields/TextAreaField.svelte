<script lang="ts">
	type Props = { label: string; value: string | undefined; hint?: string; rows?: number };
	let { label, value = $bindable(''), hint, rows = 4 }: Props = $props();
</script>

<label class="flex flex-col gap-1.5">
	<span class="font-sans text-sm font-medium text-ink">{label}</span>
	<textarea
		bind:value
		{rows}
		class="rounded-lg border border-ink/20 bg-surface px-3 py-2.5 font-sans text-sm text-ink placeholder:text-muted focus-visible:border-gold"
	></textarea>
	{#if hint}<span class="font-sans text-xs text-muted">{hint}</span>{/if}
</label>
