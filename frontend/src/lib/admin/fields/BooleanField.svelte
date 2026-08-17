<script lang="ts">
	type Props = { label: string; value: boolean };
	let { label, value = $bindable() }: Props = $props();
</script>

<label class="flex cursor-pointer items-center gap-2.5">
	<input type="checkbox" bind:checked={value} class="h-4 w-4 accent-gold" />
	<span class="font-sans text-sm text-ink">{label}</span>
</label>
