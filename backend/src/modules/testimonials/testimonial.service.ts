import { ApiError } from '../../utils/ApiError.js';
import * as repository from './testimonial.repository.js';
import { toTestimonialDTO } from './testimonial.mapper.js';
import type { CreateTestimonialInput, UpdateTestimonialInput } from './testimonial.validation.js';

export async function listTestimonials() {
	const testimonials = await repository.findAllTestimonials();
	return testimonials.map(toTestimonialDTO);
}

export async function createTestimonial(input: CreateTestimonialInput) {
	return toTestimonialDTO(await repository.createTestimonial(input));
}

export async function updateTestimonial(id: string, input: UpdateTestimonialInput) {
	const existing = await repository.findTestimonialById(id);
	if (!existing) throw ApiError.notFound(`Testimonial "${id}" not found`);
	return toTestimonialDTO(await repository.updateTestimonialById(id, input));
}

export async function deleteTestimonial(id: string) {
	const existing = await repository.findTestimonialById(id);
	if (!existing) throw ApiError.notFound(`Testimonial "${id}" not found`);
	await repository.deleteTestimonialById(id);
}
