import { browser } from '$app/environment';
import { ensureGsap, gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from './motion.svelte';

type RevealOptions = {
	y?: number;
	duration?: number;
	delay?: number;
	ease?: string;
	start?: string;
};

/**
 * Scroll-reveal action for a single element: opacity + y rise, plays once forward
 * and reverses if scrolled back above the trigger. Degrades to an instant/simple
 * fade under prefers-reduced-motion.
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	if (!browser) return {};
	const { y = 20, duration = 0.6, delay = 0, ease = 'power2.out', start = 'top 85%' } = options;

	if (prefersReducedMotion()) {
		node.style.transition = 'opacity 250ms ease-out';
		node.style.opacity = '0';
		requestAnimationFrame(() => (node.style.opacity = '1'));
		return {};
	}

	ensureGsap();
	gsap.set(node, { opacity: 0, y });

	const tween = gsap.to(node, {
		opacity: 1,
		y: 0,
		duration,
		delay,
		ease,
		scrollTrigger: {
			trigger: node,
			start,
			toggleActions: 'play none none reverse'
		}
	});

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}

/**
 * Staggers the direct children of a container as they enter the viewport.
 * Use on the grid/list wrapper; children animate with a per-item offset.
 */
export function revealStagger(
	node: HTMLElement,
	options: { y?: number; stagger?: number; duration?: number; start?: string } = {}
) {
	if (!browser) return {};
	const { y = 24, stagger = 0.08, duration = 0.6, start = 'top 80%' } = options;
	const children = Array.from(node.children) as HTMLElement[];

	if (prefersReducedMotion()) {
		children.forEach((child) => {
			child.style.transition = 'opacity 250ms ease-out';
			child.style.opacity = '0';
		});
		requestAnimationFrame(() => children.forEach((child) => (child.style.opacity = '1')));
		return {};
	}

	ensureGsap();
	gsap.set(children, { opacity: 0, y });

	const tween = gsap.to(children, {
		opacity: 1,
		y: 0,
		duration,
		stagger,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: node,
			start,
			toggleActions: 'play none none reverse'
		}
	});

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}

export { ScrollTrigger };
