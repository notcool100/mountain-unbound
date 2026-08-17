<script lang="ts">
	import { revealStagger, reveal } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';

	let regions = $derived(content.regions.regions);
</script>

<section class="relative bg-snow px-5 py-28 md:px-8 md:py-36">
	<div class="mx-auto max-w-[1400px]">
		<div class="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
			<div use:reveal class="lg:w-[280px] lg:shrink-0">
				<h2
					class="font-display text-4xl font-bold text-ink sm:text-5xl"
					style="letter-spacing: -0.015em; line-height: 1.1;"
				>
					{content.regions.heading} <span class="text-gold">{content.regions.headingAccent}</span>
				</h2>
				<span class="mt-4 block h-[3px] w-14 rule-gold" aria-hidden="true"></span>
				<p class="mt-6 max-w-xs font-sans text-base text-muted">
					{content.regions.body}
				</p>
			</div>

			<div
				use:revealStagger={{ y: 24, stagger: 0.1 }}
				class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-3"
			>
				{#each regions as region (region.name)}
					<a
						href={region.href}
						class="group shadow-cozy shadow-cozy-hover relative aspect-[3/4] overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
					>
						<picture>
							<source
								srcset={`${region.image}-960.webp 960w, ${region.image}-1920.webp 1920w`}
								type="image/webp"
								sizes="(min-width: 640px) 33vw, 100vw"
							/>
							<img
								src={`${region.image}-1920.webp`}
								alt={region.imageAlt}
								class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
								loading="lazy"
								decoding="async"
							/>
						</picture>
						<div
							class="pointer-events-none absolute inset-0"
							style="background: linear-gradient(180deg, rgba(11,15,20,0.1) 40%, rgba(11,15,20,0.88) 100%);"
						></div>
						<span
							class="absolute top-4 left-4 rounded-lg bg-gold px-2.5 py-1 font-sans text-xs font-semibold text-ink"
						>
							{region.trekCount}
						</span>
						<span
							class="absolute right-4 bottom-4 left-4 font-display text-2xl font-bold text-on-scrim"
						>
							{region.name}
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
