<script lang="ts">
	import { revealStagger, reveal } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';
	import { resolveImageSrcset } from '$lib/cms/media';

	let activities = $derived(content.activities.activities);
</script>

<section class="relative bg-snow px-5 py-28 md:px-8 md:py-36">
	<div class="mx-auto max-w-[1400px]">
		<div use:reveal class="mx-auto max-w-xl text-center">
			<h2 class="font-display text-4xl font-bold text-ink sm:text-5xl" style="letter-spacing: -0.015em;">
				{content.activities.heading}
			</h2>
			<span class="mx-auto mt-4 block h-[3px] w-14 rule-gold" aria-hidden="true"></span>
			<p class="mx-auto mt-6 max-w-md font-sans text-base text-muted md:text-lg">
				{content.activities.body}
			</p>
		</div>

		<div
			use:revealStagger={{ y: 24, stagger: 0.08 }}
			class="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
		>
			{#each activities as activity (activity.title)}
				<a
					href={activity.href}
					class="group shadow-cozy shadow-cozy-hover relative aspect-[3/4] overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
				>
					<picture>
						{#if resolveImageSrcset(activity.image).srcset}
							<source
								srcset={resolveImageSrcset(activity.image).srcset}
								type="image/webp"
								sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
							/>
						{/if}
						<img
							src={resolveImageSrcset(activity.image).src}
							alt={activity.imageAlt}
							class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
							loading="lazy"
							decoding="async"
						/>
					</picture>
					<div
						class="pointer-events-none absolute inset-0"
						style="background: linear-gradient(180deg, rgba(11,15,20,0.05) 45%, rgba(11,15,20,0.9) 100%);"
					></div>
					<span
						class="absolute top-4 left-4 rounded-lg bg-gold px-2.5 py-1 font-sans text-xs font-semibold text-ink"
					>
						{activity.badge}
					</span>
					<span class="absolute right-4 bottom-4 left-4 font-display text-xl font-bold text-on-scrim">
						{activity.title}
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
