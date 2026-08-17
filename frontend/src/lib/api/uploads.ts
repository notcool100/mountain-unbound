import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { ApiError } from './client';
import { getToken } from './token';

async function uploadFile(path: string, file: File): Promise<{ base?: string; url?: string }> {
	const token = getToken();
	const form = new FormData();
	form.append('file', file);

	const res = await fetch(`${PUBLIC_API_BASE_URL}${path}`, {
		method: 'POST',
		headers: token ? { Authorization: `Bearer ${token}` } : undefined,
		body: form
	});

	const raw = await res.json().catch(() => null);

	if (!res.ok) {
		throw new ApiError(res.status, raw?.message ?? res.statusText, raw?.details);
	}

	return raw?.data ?? {};
}

/** Uploads an image file, returning its base path (backend generates `{base}-960.webp` / `{base}-1920.webp`). */
export async function uploadImage(file: File): Promise<string> {
	const { base } = await uploadFile('/uploads/image', file);
	if (!base) throw new ApiError(500, 'Upload succeeded but no path was returned');
	return base;
}

/** Uploads a video file, returning its playable URL. */
export async function uploadVideo(file: File): Promise<string> {
	const { url } = await uploadFile('/uploads/video', file);
	if (!url) throw new ApiError(500, 'Upload succeeded but no path was returned');
	return url;
}
