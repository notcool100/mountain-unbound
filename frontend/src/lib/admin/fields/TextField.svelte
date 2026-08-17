<script lang="ts">
	type Props = { label: string; value: string | undefined; hint?: string; placeholder?: string };
	let { label, value = $bindable(''), hint, placeholder }: Props = $props();
</script>

<label class="flex flex-col gap-1.5">
	<span class="font-sans text-sm font-medium text-ink">{label}</span>
	<input
		type="text"
		bind:value
		{placeholder}
		class="h-11 rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink placeholder:text-muted focus-visible:border-gold"
	/>
	{#if hint}<span class="font-sans text-xs text-muted">{hint}</span>{/if}
</label>
