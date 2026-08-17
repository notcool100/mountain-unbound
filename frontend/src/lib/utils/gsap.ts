import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

let registered = false;

/** Registers GSAP plugins exactly once, client-side only. Call from onMount before using ScrollTrigger. */
export function ensureGsap() {
	if (!browser || registered) return gsap;
	gsap.registerPlugin(ScrollTrigger, Flip);
	registered = true;
	return gsap;
}

/**
 * Recomputes every ScrollTrigger's start/end distances once web fonts and
 * below-the-fold images have actually settled. Without this, pin/scrub
 * sections measured before a lazy image or a swapped web font finishes
 * loading end up with stale (short) trigger distances, which reads as
 * animations "finishing early" or scrub feeling off.
 */
export function refreshOnSettle() {
	if (!browser) return;
	const refresh = () => ScrollTrigger.refresh();

	if ('fonts' in document) {
		document.fonts.ready.then(refresh);
	}
	window.addEventListener('load', refresh, { once: true });

	// Catch late-arriving lazy images (below the fold) as they decode in.
	const imgs = Array.from(document.images).filter((img) => !img.complete);
	let remaining = imgs.length;
	if (remaining === 0) return;
	imgs.forEach((img) => {
		const done = () => {
			remaining -= 1;
			if (remaining <= 0) refresh();
		};
		img.addEventListener('load', done, { once: true });
		img.addEventListener('error', done, { once: true });
	});
}

export { gsap, ScrollTrigger, Flip };
