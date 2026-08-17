import { api } from './client';
import type { Trek } from '$lib/data/treks';
import type { ItineraryDay } from '$lib/data/itinerary';

type TrekPayload = Trek & { itinerary: ItineraryDay[] };

export function createTrek(payload: TrekPayload) {
	return api.post<Trek>('/treks', payload);
}

export function updateTrek(slug: string, payload: Omit<TrekPayload, 'slug'>) {
	return api.put<Trek>(`/treks/${encodeURIComponent(slug)}`, payload);
}

export function deleteTrek(slug: string) {
	return api.delete<void>(`/treks/${encodeURIComponent(slug)}`);
}

export function replaceItinerary(slug: string, itinerary: ItineraryDay[]) {
	return api.put<ItineraryDay[]>(`/treks/${encodeURIComponent(slug)}/itinerary`, { itinerary });
}
