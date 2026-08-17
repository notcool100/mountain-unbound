import { browser } from '$app/environment';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'windhorse-theme';

function readStored(): ThemePreference {
	if (!browser) return 'system';
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === 'light' || stored === 'dark' ? stored : 'system';
}

export const themeState = $state({ preference: readStored() });

export function applyTheme(preference: ThemePreference) {
	themeState.preference = preference;
	if (!browser) return;

	if (preference === 'system') {
		document.documentElement.removeAttribute('data-theme');
		localStorage.removeItem(STORAGE_KEY);
	} else {
		document.documentElement.setAttribute('data-theme', preference);
		localStorage.setItem(STORAGE_KEY, preference);
	}
}
