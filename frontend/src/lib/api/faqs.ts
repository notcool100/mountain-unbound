import { api } from './client';
import type { FaqItem } from '$lib/data/faq';

/** `order` isn't part of the display type (array position drives it client-side) but the API needs it explicitly. */
type FaqPayload = Omit<FaqItem, 'id'> & { order: number };

export function createFaq(payload: FaqPayload) {
	return api.post<FaqItem>('/faqs', payload);
}

export function updateFaq(id: string, payload: FaqPayload) {
	return api.put<FaqItem>(`/faqs/${encodeURIComponent(id)}`, payload);
}

export function deleteFaq(id: string) {
	return api.delete<void>(`/faqs/${encodeURIComponent(id)}`);
}
