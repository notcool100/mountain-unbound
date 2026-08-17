<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { Plus, Trash2, ChevronUp, ChevronDown } from '@lucide/svelte';

	type Props = {
		label: string;
		items: T[];
		createItem: () => T;
		itemLabel?: (item: T, index: number) => string;
		addLabel?: string;
		children: Snippet<[T, number]>;
	};

	let { label, items = $bindable(), createItem, itemLabel, addLabel = 'Add', children }: Props = $props();

	/** Keys by `id` when the item has one (testimonials, FAQs, stats — backed by
	 *  real database rows), falling back to index for the many item types here
	 *  that don't (nav links, gallery images, itinerary days, ...). */
	function keyOf(item: T, i: number): unknown {
		return item && typeof item === 'object' && 'id' in item ? (item as { id: unknown }).id : i;
	}

	function add() {
		items = [...items, createItem()];
	}

	function remove(i: number) {
		items = items.filter((_, idx) => idx !== i);
	}

	function moveUp(i: number) {
		if (i === 0) return;
		const next = [...items];
		[next[i - 1], next[i]] = [next[i], next[i - 1]];
		items = next;
	}

	function moveDown(i: number) {
		if (i === items.length - 1) return;
		const next = [...items];
		[next[i + 1], next[i]] = [next[i], next[i + 1]];
		items = next;
	}
</script>

<div>
	<div class="flex items-center justify-between">
		<h3 class="font-sans text-sm font-semibold tracking-wide text-ink uppercase">{label}</h3>
		<button
			type="button"
			onclick={add}
			class="flex items-center gap-1.5 rounded-lg border border-ink/20 px-3 py-1.5 font-sans text-xs font-semibold text-ink transition-colors hover:border-gold hover:text-gold"
		>
			<Plus class="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
			{addLabel}
		</button>
	</div>

	<div class="mt-3 flex flex-col gap-4">
		{#each items as item, i (keyOf(item, i))}
			<div class="rounded-lg border border-ink/15 bg-snow p-4">
				<div class="flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
					<span class="font-sans text-xs font-semibold text-muted uppercase">
						{itemLabel ? itemLabel(item, i) : `Item ${i + 1}`}
					</span>
					<div class="flex items-center gap-1">
						<button
							type="button"
							onclick={() => moveUp(i)}
							disabled={i === 0}
							aria-label="Move up"
							class="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
						>
							<ChevronUp class="h-4 w-4" strokeWidth={1.75} />
						</button>
						<button
							type="button"
							onclick={() => moveDown(i)}
							disabled={i === items.length - 1}
							aria-label="Move down"
							class="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
						>
							<ChevronDown class="h-4 w-4" strokeWidth={1.75} />
						</button>
						<button
							type="button"
							onclick={() => remove(i)}
							aria-label="Remove"
							class="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-crimson/10 hover:text-crimson"
						>
							<Trash2 class="h-4 w-4" strokeWidth={1.75} />
						</button>
					</div>
				</div>
				<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
					{@render children(item, i)}
				</div>
			</div>
		{/each}
		{#if items.length === 0}
			<p class="font-sans text-sm text-muted italic">Nothing here yet. Click "{addLabel}" to add one.</p>
		{/if}
	</div>
</div>
