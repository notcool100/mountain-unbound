import { api } from './client';
import type { SiteContent } from '$lib/cms/schema';

export function fetchSiteContent(fetchImpl?: typeof fetch) {
	return api.get<SiteContent>('/site-content', fetchImpl);
}

export function patchSection<K extends keyof SiteContent>(section: K, body: SiteContent[K]) {
	return api.patch<SiteContent[K]>(`/site-content/${section}`, body);
}
