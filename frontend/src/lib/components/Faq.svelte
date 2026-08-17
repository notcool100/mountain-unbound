<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { reveal, revealStagger } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';

	let faqs = $derived(content.faqs);
</script>

<section id="faq" class="relative bg-snow px-5 py-28 md:px-8 md:py-36">
	<div class="mx-auto max-w-[900px]">
		<div use:reveal class="max-w-xl">
			<h2
				class="font-display text-4xl font-bold text-ink sm:text-5xl"
				style="letter-spacing: -0.015em; line-height: 1.08;"
			>
				Questions before you book
			</h2>
			<p class="mt-4 font-sans text-base text-muted md:text-lg">
				The things people ask us most, before their first email.
			</p>
		</div>

		<div use:revealStagger={{ y: 16, stagger: 0.06 }} class="mt-10 flex flex-col md:mt-12">
			{#each faqs as faq (faq.question)}
				<details name="faq" class="faq-item group border-t border-ink/10 py-5 last:border-b">
					<summary
						class="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base font-semibold text-ink marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:text-lg"
					>
						{faq.question}
						<Plus
							class="faq-icon h-5 w-5 shrink-0 text-gold transition-transform duration-300"
							strokeWidth={1.75}
							aria-hidden="true"
						/>
					</summary>
					<p class="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink/75 md:text-base">
						{faq.answer}
					</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq-item[open] > summary .faq-icon {
		transform: rotate(45deg);
	}

	.faq-item summary::-webkit-details-marker {
		display: none;
	}
</style>
