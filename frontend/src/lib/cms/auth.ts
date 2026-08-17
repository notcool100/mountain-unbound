import { ApiError } from '$lib/api';
import { loginRequest } from '$lib/api/auth';
import { clearToken, getToken, setToken } from '$lib/api/token';

export function isAuthed(): boolean {
	return getToken() !== null;
}

export async function login(email: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const { token } = await loginRequest(email, password);
		setToken(token);
		return { ok: true };
	} catch (err) {
		if (err instanceof ApiError && err.status === 401) {
			return { ok: false, error: 'Incorrect email or password.' };
		}
		return { ok: false, error: 'Could not reach the server. Please try again.' };
	}
}

export function logout() {
	clearToken();
}
