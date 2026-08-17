<script lang="ts">
	import { Plus, Trash2 } from '@lucide/svelte';

	type Props = { label: string; items: string[]; addLabel?: string };
	let { label, items = $bindable(), addLabel = 'Add' }: Props = $props();

	function add() {
		items = [...items, ''];
	}

	function remove(i: number) {
		items = items.filter((_, idx) => idx !== i);
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
	<div class="mt-3 flex flex-col gap-2">
		{#each items as _, i (i)}
			<div class="flex items-center gap-2">
				<input
					type="text"
					bind:value={items[i]}
					class="h-10 flex-1 rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink focus-visible:border-gold"
				/>
				<button
					type="button"
					onclick={() => remove(i)}
					aria-label="Remove"
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-crimson/10 hover:text-crimson"
				>
					<Trash2 class="h-4 w-4" strokeWidth={1.75} />
				</button>
			</div>
		{/each}
		{#if items.length === 0}
			<p class="font-sans text-sm text-muted italic">Nothing here yet.</p>
		{/if}
	</div>
</div>
