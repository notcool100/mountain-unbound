<script lang="ts">
	import { imageLibrary } from '$lib/cms/imageLibrary';
	import { resolveImageSrcset } from '$lib/cms/media';
	import { uploadsApi, ApiError } from '$lib/api';

	type Props = { label: string; value: string };
	let { label, value = $bindable() }: Props = $props();

	type Tab = 'upload' | 'link' | 'library';
	let tab = $state<Tab | null>(null);
	let dragging = $state(false);
	let uploading = $state(false);
	let error = $state('');
	let fileInput: HTMLInputElement = $state()!;

	const preview = $derived(resolveImageSrcset(value));

	async function handleFile(file: File | undefined) {
		if (!file) return;
		uploading = true;
		error = '';
		try {
			value = await uploadsApi.uploadImage(file);
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

	function select(base: string) {
		value = base;
		tab = null;
	}
</script>

<div class="flex flex-col gap-1.5">
	<span class="font-sans text-sm font-medium text-ink">{label}</span>
	<div class="flex items-center gap-3">
		<div class="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-ink/15 bg-snow">
			{#if preview.src}
				<img src={preview.src} srcset={preview.srcset} alt="" class="h-full w-full object-cover" />
			{/if}
		</div>
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
					{uploading ? 'Uploading…' : 'Drag and drop an image, or click to browse'}
				</span>
				<span class="font-sans text-xs text-muted">JPEG, PNG, WebP, or GIF</span>
			</button>
			<input
				bind:this={fileInput}
				type="file"
				accept="image/jpeg,image/png,image/webp,image/gif"
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
				placeholder="https://example.com/photo.jpg"
				class="h-11 w-full rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink focus-visible:border-gold"
			/>
		</div>
	{:else if tab === 'library'}
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
