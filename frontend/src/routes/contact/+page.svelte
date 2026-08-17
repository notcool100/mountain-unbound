<script lang="ts">
	import { Mail, Phone, MapPin, Clock } from '@lucide/svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { reveal } from '$lib/utils/reveal';
	import { content } from '$lib/cms/store.svelte';

	let name = $state('');
	let email = $state('');
	let trekInterest = $state('Not sure yet');
	let message = $state('');
	let error = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim() || !email.includes('@') || !message.trim()) {
			error = 'Please fill in your name, a valid email, and a short message.';
			return;
		}
		error = '';

		const subject = `Trek Inquiry: ${trekInterest}`;
		const body = `Name: ${name}\nEmail: ${email}\nTrek interest: ${trekInterest}\n\n${message}`;
		window.location.href = `mailto:${content.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

	let trekOptions = $derived(['Not sure yet', ...content.treks.map((t) => t.name)]);
</script>

<svelte:head>
	<title>{content.contact.seo.title}</title>
	<meta name="description" content={content.contact.seo.description} />
</svelte:head>

<PageBanner
	image={content.contact.banner.image}
	imageAlt={content.contact.banner.imageAlt}
	eyebrow={content.contact.banner.eyebrow}
	title={content.contact.banner.title}
	subtitle={content.contact.banner.subtitle}
/>

<section class="relative bg-snow px-5 py-20 md:px-8 md:py-28">
	<div class="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr]">
		<form use:reveal onsubmit={handleSubmit} novalidate class="flex flex-col gap-5">
			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<div class="flex flex-col gap-2">
					<label for="name" class="font-sans text-sm text-ink/80">Full name</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						autocomplete="name"
						required
						class="h-12 rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink placeholder:text-muted focus-visible:border-gold"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label for="email" class="font-sans text-sm text-ink/80">Email address</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						autocomplete="email"
						required
						class="h-12 rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink placeholder:text-muted focus-visible:border-gold"
					/>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<label for="trek" class="font-sans text-sm text-ink/80">Which trek?</label>
				<select
					id="trek"
					bind:value={trekInterest}
					class="h-12 rounded-lg border border-ink/20 bg-surface px-3 font-sans text-sm text-ink focus-visible:border-gold"
				>
					{#each trekOptions as option (option)}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-col gap-2">
				<label for="message" class="font-sans text-sm text-ink/80">Message</label>
				<textarea
					id="message"
					bind:value={message}
					rows="6"
					required
					placeholder="Preferred season, group size, fitness level, anything else worth knowing."
					class="rounded-lg border border-ink/20 bg-surface px-3 py-2.5 font-sans text-sm text-ink placeholder:text-muted focus-visible:border-gold"
				></textarea>
			</div>

			{#if error}
				<p class="font-sans text-sm text-crimson">{error}</p>
			{/if}

			<button
				type="submit"
				class="mt-2 inline-flex h-12 w-fit items-center rounded-lg bg-crimson px-7 font-sans text-sm font-semibold text-on-scrim transition-colors hover:bg-crimson-dim"
			>
				Send Inquiry
			</button>
			<p class="font-sans text-xs text-muted">
				{content.contact.sendNote}
			</p>
		</form>

		<div use:reveal class="flex flex-col gap-6">
			<div class="shadow-cozy rounded-2xl border border-ink/10 bg-surface p-6 md:p-8">
				<h2 class="font-display text-xl font-bold text-ink">Reach us directly</h2>
				<ul class="mt-5 flex flex-col gap-4 font-sans text-sm text-ink/80">
					<li class="flex items-start gap-3">
						<Mail class="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
						<a href={`mailto:${content.contact.email}`} class="hover:text-ink">{content.contact.email}</a>
					</li>
					<li class="flex items-start gap-3">
						<Phone class="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
						<a href={`tel:${content.contact.phone.replace(/[^+\d]/g, '')}`} class="hover:text-ink"
							>{content.contact.phone}</a
						>
					</li>
					<li class="flex items-start gap-3">
						<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
						{content.contact.address}
					</li>
					<li class="flex items-start gap-3">
						<Clock class="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
						{content.contact.hours}
					</li>
				</ul>
			</div>

			<div class="shadow-cozy rounded-2xl border border-ink/10 bg-surface p-6 md:p-8">
				<h2 class="font-display text-xl font-bold text-ink">{content.contact.nextStepsHeading}</h2>
				<p class="mt-3 font-sans text-sm leading-relaxed text-ink/75">
					{content.contact.nextStepsBody}
				</p>
			</div>
		</div>
	</div>
</section>
