<script lang="ts">
	type Option = { value: string; label: string };
	type Props = { label: string; value: string; options: Option[]; hint?: string };
	let { label, value = $bindable(), options, hint }: Props = $props();
</script>

<label class="flex flex-col gap-1.5">
	<span class="font-sans text-sm font-medium text-ink">{label}</span>
	<select
		bind:value
		class="h-11 rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink focus-visible:border-gold"
	>
		{#each options as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	{#if hint}<span class="font-sans text-xs text-muted">{hint}</span>{/if}
</label>
