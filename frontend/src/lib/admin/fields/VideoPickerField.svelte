<script lang="ts">
	import { videoLibrary } from '$lib/cms/imageLibrary';
	import { resolveVideoUrl } from '$lib/cms/media';
	import { uploadsApi, ApiError } from '$lib/api';

	type Props = { label: string; value: string };
	let { label, value = $bindable() }: Props = $props();

	type Tab = 'upload' | 'link' | 'library';
	let tab = $state<Tab | null>(null);
	let dragging = $state(false);
	let uploading = $state(false);
	let error = $state('');
	let fileInput: HTMLInputElement = $state()!;

	const previewSrc = $derived(resolveVideoUrl(value));

	async function handleFile(file: File | undefined) {
		if (!file) return;
		uploading = true;
		error = '';
		try {
			value = await uploadsApi.uploadVideo(file);
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Upload failed. Please try again.';
		} finally {
			uploading = false;
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragging = false;
		handleFile(e.dataTransfer?.files?.[0]);
	}

	function handleFileInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		handleFile(target.files?.[0]);
		target.value = '';
	}
</script>

<div class="flex flex-col gap-1.5">
	<span class="font-sans text-sm font-medium text-ink">{label}</span>

	<div class="flex items-center gap-3">
		{#if previewSrc}
			<video src={previewSrc} muted class="h-16 w-24 shrink-0 rounded-lg border border-ink/15 bg-snow object-cover"
			></video>
		{/if}
		<div class="flex flex-wrap gap-2">
			{#each [
				['upload', 'Upload'],
				['link', 'Paste link'],
				['library', 'Library']
			] as [key, tabLabel] (key)}
				<button
					type="button"
					onclick={() => (tab = tab === key ? null : (key as Tab))}
					class="rounded-lg border px-3 py-2 font-sans text-sm transition-colors {tab === key
						? 'border-gold text-gold'
						: 'border-ink/20 text-ink hover:border-gold hover:text-gold'}"
				>
					{tabLabel}
				</button>
			{/each}
		</div>
	</div>

	{#if tab === 'upload'}
		<div class="mt-1 rounded-lg border border-ink/10 bg-snow p-3">
			<button
				type="button"
				ondragover={(e) => {
					e.preventDefault();
					dragging = true;
				}}
				ondragleave={() => (dragging = false)}
				ondrop={handleDrop}
				onclick={() => fileInput?.click()}
				class="flex w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors {dragging
					? 'border-gold bg-gold/5'
					: 'border-ink/20'}"
			>
				<span class="font-sans text-sm text-ink">
					{uploading ? 'Uploading…' : 'Drag and drop a video, or click to browse'}
				</span>
				<span class="font-sans text-xs text-muted">MP4 or WebM</span>
			</button>
			<input
				bind:this={fileInput}
				type="file"
				accept="video/mp4,video/webm"
				class="hidden"
				onchange={handleFileInput}
			/>
			{#if error}<p class="mt-2 font-sans text-sm text-crimson">{error}</p>{/if}
		</div>
	{:else if tab === 'link'}
		<div class="mt-1 rounded-lg border border-ink/10 bg-snow p-3">
			<input
				type="url"
				bind:value
				placeholder="https://example.com/video.mp4"
				class="h-11 w-full rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink focus-visible:border-gold"
			/>
		</div>
	{:else if tab === 'library'}
		<div class="mt-1 flex flex-col gap-2 rounded-lg border border-ink/10 bg-snow p-3">
			{#each videoLibrary as vid (vid.src)}
				<label class="flex cursor-pointer items-center gap-2.5">
					<input type="radio" name="video-{label}" value={vid.src} bind:group={value} class="h-4 w-4 accent-gold" />
					<span class="font-sans text-sm text-ink">{vid.label}</span>
				</label>
			{/each}
		</div>
	{/if}
</div>
