import { api } from './client';
import type { Stat } from '$lib/data/stats';

/** `order` isn't part of the display type (array position drives it client-side) but the API needs it explicitly. */
type StatPayload = Omit<Stat, 'id'> & { order: number };

export function createStat(payload: StatPayload) {
	return api.post<Stat>('/stats', payload);
}

export function updateStat(id: string, payload: StatPayload) {
	return api.put<Stat>(`/stats/${encodeURIComponent(id)}`, payload);
}

export function deleteStat(id: string) {
	return api.delete<void>(`/stats/${encodeURIComponent(id)}`);
}
