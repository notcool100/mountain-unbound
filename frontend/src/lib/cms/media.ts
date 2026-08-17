import { PUBLIC_API_BASE_URL } from '$env/static/public';

/** Origin the backend serves `/uploads/...` from, derived from the API base URL. */
const backendOrigin = new URL(PUBLIC_API_BASE_URL).origin;

function isExternalUrl(value: string): boolean {
	return /^https?:\/\//i.test(value);
}

/**
 * Resolves a stored image value into a renderable `src`/`srcset` pair.
 * A stored value is one of three things:
 *  - a legacy curated-library base path, e.g. "/images/ebc-card" (relative to the frontend's own static dir)
 *  - a backend-uploaded base path, e.g. "/uploads/images/{id}" (needs the backend origin prefixed)
 *  - a pasted external URL (used as-is, no `-960/-1920` derivatives to suffix)
 * Library and uploaded paths both follow the `{base}-960.webp` / `{base}-1920.webp` convention.
 */
export function resolveImageSrcset(value: string): { src: string; srcset?: string } {
	if (!value) return { src: '' };
	if (isExternalUrl(value)) return { src: value };

	const base = value.startsWith('/uploads/') ? `${backendOrigin}${value}` : value;
	return {
		src: `${base}-1920.webp`,
		srcset: `${base}-960.webp 960w, ${base}-1920.webp 1920w`
	};
}

/** Resolves a stored video value (uploaded path or pasted direct file URL) into a playable `src`. */
export function resolveVideoUrl(value: string): string {
	if (!value) return '';
	if (isExternalUrl(value)) return value;
	return value.startsWith('/uploads/') ? `${backendOrigin}${value}` : value;
}
