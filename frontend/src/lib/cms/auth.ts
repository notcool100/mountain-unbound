import { PUBLIC_ADMIN_EMAIL } from '$env/static/public';
import { ApiError } from '$lib/api';
import { loginRequest } from '$lib/api/auth';
import { clearToken, getToken, setToken } from '$lib/api/token';

export function isAuthed(): boolean {
	return getToken() !== null;
}

/** Logs in against the backend using the fixed admin email — the login form only asks for a password. */
export async function login(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const { token } = await loginRequest(PUBLIC_ADMIN_EMAIL, password);
		setToken(token);
		return { ok: true };
	} catch (err) {
		if (err instanceof ApiError && err.status === 401) {
			return { ok: false, error: 'Incorrect password.' };
		}
		return { ok: false, error: 'Could not reach the server. Please try again.' };
	}
}

export function logout() {
	clearToken();
}
