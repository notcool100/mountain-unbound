<script lang="ts">
	import { imageLibrary } from '$lib/cms/imageLibrary';

	type Props = { label: string; value: string };
	let { label, value = $bindable() }: Props = $props();

	let open = $state(false);

	function select(base: string) {
		value = base;
		open = false;
	}
</script>

<div class="flex flex-col gap-1.5">
	<span class="font-sans text-sm font-medium text-ink">{label}</span>
	<div class="flex items-center gap-3">
		<div class="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-ink/15 bg-snow">
			<img src={`${value}-960.webp`} alt="" class="h-full w-full object-cover" />
		</div>
		<button
			type="button"
			onclick={() => (open = !open)}
			class="rounded-lg border border-ink/20 px-3 py-2 font-sans text-sm text-ink transition-colors hover:border-gold hover:text-gold"
		>
			{open ? 'Close' : 'Change image'}
		</button>
	</div>
	{#if open}
		<div class="mt-1 grid grid-cols-3 gap-2 rounded-lg border border-ink/10 bg-snow p-3 sm:grid-cols-4">
			{#each imageLibrary as img (img.base)}
				<button
					type="button"
					onclick={() => select(img.base)}
					title={img.label}
					class="group relative aspect-video overflow-hidden rounded-lg border-2 {value === img.base
						? 'border-gold'
						: 'border-transparent'}"
				>
					<img src={`${img.base}-960.webp`} alt={img.label} class="h-full w-full object-cover" />
				</button>
			{/each}
		</div>
	{/if}
</div>
