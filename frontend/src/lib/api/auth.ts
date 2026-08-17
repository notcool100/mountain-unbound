import { api } from './client';

export type LoginResult = {
	token: string;
	admin: { id: string; email: string; name: string | null };
};

export function loginRequest(email: string, password: string) {
	return api.post<LoginResult>('/auth/login', { email, password });
}

export function meRequest() {
	return api.get<{ id: string; email: string; name: string | null }>('/auth/me');
}
