import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { clearToken, getToken } from './token';

export class ApiError extends Error {
	readonly status: number;
	readonly details?: unknown;

	constructor(status: number, message: string, details?: unknown) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.details = details;
	}
}

type RequestOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: unknown;
	/** Pass SvelteKit's load-scoped `fetch` when calling from a `load` function. */
	fetch?: typeof fetch;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const fetchImpl = options.fetch ?? fetch;
	const token = getToken();

	const headers: Record<string, string> = { 'Content-Type': 'application/json' };
	if (token) headers.Authorization = `Bearer ${token}`;

	const res = await fetchImpl(`${PUBLIC_API_BASE_URL}${path}`, {
		method: options.method ?? 'GET',
		headers,
		body: options.body !== undefined ? JSON.stringify(options.body) : undefined
	});

	const raw = res.status === 204 ? null : await res.json().catch(() => null);

	if (!res.ok) {
		if (res.status === 401 && token) clearToken();
		throw new ApiError(res.status, raw?.message ?? res.statusText, raw?.details);
	}

	return (raw?.data ?? null) as T;
}

export const api = {
	get: <T>(path: string, fetchImpl?: typeof fetch) => request<T>(path, { fetch: fetchImpl }),
	post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
	put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body }),
	patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
	delete: <T>(path: string) => request<T>(path, { method: 'DELETE' })
};
