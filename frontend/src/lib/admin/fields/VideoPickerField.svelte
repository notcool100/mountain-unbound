<script lang="ts">
	import { videoLibrary } from '$lib/cms/imageLibrary';

	type Props = { label: string; value: string };
	let { label, value = $bindable() }: Props = $props();
</script>

<div class="flex flex-col gap-1.5">
	<span class="font-sans text-sm font-medium text-ink">{label}</span>
	<div class="flex flex-col gap-2">
		{#each videoLibrary as vid (vid.src)}
			<label class="flex cursor-pointer items-center gap-2.5">
				<input type="radio" name="video-{label}" value={vid.src} bind:group={value} class="h-4 w-4 accent-gold" />
				<span class="font-sans text-sm text-ink">{vid.label}</span>
			</label>
		{/each}
	</div>
</div>
