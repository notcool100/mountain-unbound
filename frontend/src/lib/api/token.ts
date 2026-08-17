import { browser } from '$app/environment';

const TOKEN_KEY = 'windhorse-admin-token';

/** Session-scoped (not localStorage) so an admin token never outlives the tab, matching the old auth gate's behavior. */
export function getToken(): string | null {
	if (!browser) return null;
	return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
	if (browser) sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
	if (browser) sessionStorage.removeItem(TOKEN_KEY);
}
