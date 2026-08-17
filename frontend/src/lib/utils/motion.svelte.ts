import { browser } from '$app/environment';

/** Synchronous read of the user's reduced-motion preference. Safe to call during SSR (returns false). */
export function prefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Svelte 5 rune-friendly reactive reduced-motion flag.
 * Usage: const reduced = reducedMotionState(); ...later read reduced.value
 */
export function reducedMotionState() {
	const state = $state({ value: prefersReducedMotion() });

	if (browser) {
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
		const handler = (e: MediaQueryListEvent) => (state.value = e.matches);
		mql.addEventListener('change', handler);
	}

	return state;
}
