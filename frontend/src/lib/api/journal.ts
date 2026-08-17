import { api } from './client';
import type { Article } from '$lib/data/journal';

export function createArticle(payload: Article) {
	return api.post<Article>('/journal', payload);
}

export function updateArticle(slug: string, payload: Omit<Article, 'slug'>) {
	return api.put<Article>(`/journal/${encodeURIComponent(slug)}`, payload);
}

export function deleteArticle(slug: string) {
	return api.delete<void>(`/journal/${encodeURIComponent(slug)}`);
}
