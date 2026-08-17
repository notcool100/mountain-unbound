<script lang="ts">
	import { MountainSnow, Mail, MapPin } from '@lucide/svelte';
	import { content } from '$lib/cms/store.svelte';

	let email = $state('');
	let subscribed = $state(false);
	let error = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email.includes('@') || !email.includes('.')) {
			error = 'Enter a valid email address.';
			return;
		}
		error = '';
		subscribed = true;
	}

	let exploreLinks = $derived(content.footer.exploreLinks);
	let credentials = $derived(content.footer.credentials);
</script>

<footer class="relative border-t border-ink/10 bg-snow px-5 pt-16 pb-8 md:px-8 md:pt-20">
	<div class="mx-auto max-w-[1400px]">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_0.7fr_1fr]">
			<div>
				<a href="/" class="flex items-center gap-2 font-display text-xl font-semibold text-ink">
					<MountainSnow class="h-5 w-5 text-gold" strokeWidth={1.75} aria-hidden="true" />
					Windhorse Expeditions
				</a>
				<p class="mt-4 max-w-sm font-sans text-sm leading-relaxed text-muted">
					{content.footer.tagline}
				</p>
				<ul class="mt-6 flex flex-wrap gap-2">
					{#each credentials as credential (credential)}
						<li
							class="rounded-lg border border-ink/15 px-3 py-1.5 font-sans text-xs text-ink/70"
						>
							{credential}
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="font-sans text-xs font-semibold tracking-[0.12em] text-ink/60 uppercase">
					Explore
				</h3>
				<ul class="mt-4 flex flex-col gap-3">
					{#each exploreLinks as link (link.href)}
						<li>
							<a
								href={link.href}
								class="font-sans text-sm text-muted transition-colors hover:text-ink"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="font-sans text-xs font-semibold tracking-[0.12em] text-ink/60 uppercase">
					Get in touch
				</h3>
				<ul class="mt-4 flex flex-col gap-3 font-sans text-sm text-muted">
					<li class="flex items-center gap-2">
						<Mail class="h-4 w-4 shrink-0 text-muted" strokeWidth={1.5} aria-hidden="true" />
						<a href={`mailto:${content.footer.email}`} class="hover:text-ink">{content.footer.email}</a>
					</li>
					<li class="flex items-center gap-2">
						<MapPin class="h-4 w-4 shrink-0 text-muted" strokeWidth={1.5} aria-hidden="true" />
						{content.footer.address}
					</li>
				</ul>

				<form onsubmit={handleSubmit} class="mt-6" novalidate>
					<label for="newsletter-email" class="font-sans text-xs text-ink/70">
						{content.footer.newsletterLabel}
					</label>
					<div class="mt-2 flex gap-2">
						<input
							id="newsletter-email"
							type="email"
							bind:value={email}
							placeholder={content.footer.newsletterPlaceholder}
							autocomplete="email"
							class="h-11 min-w-0 flex-1 rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink placeholder:text-muted focus-visible:border-gold"
						/>
						<button
							type="submit"
							class="h-11 shrink-0 rounded-lg border border-ink/25 px-4 font-sans text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold"
						>
							{content.footer.newsletterButton}
						</button>
					</div>
					{#if error}
						<p class="mt-2 font-sans text-xs text-crimson">{error}</p>
					{:else if subscribed}
						<p class="mt-2 font-sans text-xs text-gold">{content.footer.newsletterSuccess}</p>
					{/if}
				</form>
			</div>
		</div>

		<div
			class="mt-16 flex flex-col gap-3 border-t border-ink/10 pt-6 font-sans text-xs text-muted md:flex-row md:items-center md:justify-between"
		>
			<p>&copy; {new Date().getFullYear()} Windhorse Expeditions. All rights reserved.</p>
			<p class="max-w-xl md:text-right">{content.footer.photoCredit}</p>
		</div>
	</div>
</footer>
