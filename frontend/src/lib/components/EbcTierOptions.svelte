<script lang="ts">
	import { Check, X, CalendarDays } from '@lucide/svelte';
	import { reveal, revealStagger } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';

	let tiers = $derived(content.ebcTiers.tiers);
</script>

<section class="relative bg-surface px-5 py-28 md:px-8 md:py-36">
	<div class="mx-auto max-w-[1400px]">
		<div use:reveal class="mx-auto max-w-xl text-center">
			<h2 class="font-display text-4xl font-bold text-ink sm:text-5xl" style="letter-spacing: -0.015em;">
				{content.ebcTiers.heading}
			</h2>
			<span class="mx-auto mt-4 block h-[3px] w-14 rule-gold" aria-hidden="true"></span>
			<p class="mx-auto mt-6 max-w-md font-sans text-base text-muted md:text-lg">
				{content.ebcTiers.body}
			</p>
		</div>

		<div
			use:revealStagger={{ y: 28, stagger: 0.1 }}
			class="mt-14 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-3"
		>
			{#each tiers as tier (tier.name)}
				<div class="shadow-cozy flex flex-col rounded-2xl border border-ink/10 bg-snow p-7">
					<span
						class="inline-flex w-fit items-center rounded-lg border border-gold/40 px-2.5 py-1 font-sans text-xs font-semibold tracking-wide text-gold uppercase"
					>
						{tier.badge}
					</span>
					<h3 class="mt-4 font-display text-xl font-bold text-ink">{tier.name}</h3>

					<div class="mt-3 flex items-center gap-4 font-sans text-sm text-muted">
						<span class="flex items-center gap-1.5">
							<CalendarDays class="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
							{tier.days} Days
						</span>
						<span>
							from <span class="font-display text-lg font-bold text-gold">${tier.price.toLocaleString()}</span>
						</span>
					</div>

					<p class="mt-4 font-sans text-sm leading-relaxed text-ink/75">{tier.description}</p>

					<ul class="mt-5 flex flex-col gap-2.5 border-t border-ink/10 pt-5">
						{#each tier.features as feature (feature.label)}
							<li class="flex items-center gap-2.5 font-sans text-sm">
								{#if feature.included}
									<Check class="h-4 w-4 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" />
									<span class="text-ink/85">{feature.label}</span>
								{:else}
									<X class="h-4 w-4 shrink-0 text-muted" strokeWidth={2} aria-hidden="true" />
									<span class="text-muted">{feature.label}</span>
								{/if}
							</li>
						{/each}
					</ul>

					<a
						href={tier.href}
						class="mt-6 inline-flex h-11 items-center justify-center rounded-lg border border-ink/25 px-5 font-sans text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold"
					>
						{tier.cta}
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
