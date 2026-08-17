<script lang="ts">
	import { goto } from '$app/navigation';
	import { MountainSnow } from '@lucide/svelte';
	import { login } from '$lib/cms/auth';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let submitting = $state(false);

	function focusOnMount(node: HTMLInputElement) {
		node.focus();
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitting = true;
		error = '';
		const result = await login(email, password);
		submitting = false;
		if (result.ok) {
			goto('/admin');
		} else {
			error = result.error;
		}
	}
</script>

<svelte:head>
	<title>Admin Login | Windhorse Expeditions</title>
</svelte:head>

<div class="flex min-h-dvh items-center justify-center bg-snow px-5">
	<div class="shadow-cozy w-full max-w-sm rounded-2xl border border-ink/10 bg-surface p-8">
		<div class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
			<MountainSnow class="h-5 w-5 text-gold" strokeWidth={1.75} aria-hidden="true" />
			Windhorse Admin
		</div>
		<p class="mt-2 font-sans text-sm text-muted">Sign in with your admin email and password to edit the site.</p>

		<form onsubmit={handleSubmit} class="mt-6 flex flex-col gap-4" novalidate>
			<label class="flex flex-col gap-1.5">
				<span class="font-sans text-sm font-medium text-ink">Email</span>
				<input
					type="email"
					bind:value={email}
					autocomplete="username"
					use:focusOnMount
					class="h-11 rounded-lg border border-ink/20 bg-snow px-3 font-sans text-sm text-ink focus-visible:border-gold"
				/>
			</label>
			<label class="flex flex-col gap-1.5">
				<span class="font-sans text-sm font-medium text-ink">Password</span>
				<input
					type="password"
					bind:value={password}
					autocomplete="current-password"
					class="h-11 rounded-lg border border-ink/20 bg-snow px-3 font-sans text-sm text-ink focus-visible:border-gold"
				/>
			</label>
			{#if error}
				<p class="font-sans text-sm text-crimson">{error}</p>
			{/if}
			<button
				type="submit"
				disabled={submitting}
				class="h-11 rounded-lg bg-crimson font-sans text-sm font-semibold text-on-scrim transition-colors hover:bg-crimson-dim disabled:opacity-60"
			>
				{submitting ? 'Signing in…' : 'Sign in'}
			</button>
		</form>
	</div>
</div>
