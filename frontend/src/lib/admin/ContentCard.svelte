<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ChevronDown } from '@lucide/svelte';

	type Props = { title: string; description?: string; open?: boolean; children: Snippet };
	let { title, description, open = false, children }: Props = $props();
</script>

<details {open} class="shadow-cozy group rounded-2xl border border-ink/10 bg-surface">
	<summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
		<div>
			<h2 class="font-display text-lg font-bold text-ink">{title}</h2>
			{#if description}
				<p class="mt-1 font-sans text-sm text-muted">{description}</p>
			{/if}
		</div>
		<ChevronDown
			class="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
			strokeWidth={1.75}
			aria-hidden="true"
		/>
	</summary>
	<div class="flex flex-col gap-6 border-t border-ink/10 px-6 py-6">
		{@render children()}
	</div>
</details>
