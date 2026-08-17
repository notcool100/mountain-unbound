import { api } from './client';
import type { Testimonial } from '$lib/data/testimonials';

/** `order` isn't part of the display type (array position drives it client-side) but the API needs it explicitly. */
type TestimonialPayload = Omit<Testimonial, 'id'> & { order: number };

export function createTestimonial(payload: TestimonialPayload) {
	return api.post<Testimonial>('/testimonials', payload);
}

export function updateTestimonial(id: string, payload: TestimonialPayload) {
	return api.put<Testimonial>(`/testimonials/${encodeURIComponent(id)}`, payload);
}

export function deleteTestimonial(id: string) {
	return api.delete<void>(`/testimonials/${encodeURIComponent(id)}`);
}
