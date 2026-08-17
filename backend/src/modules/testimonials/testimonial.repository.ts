import { prisma } from '../../lib/prisma.js';
import type { Prisma } from '@prisma/client';

export function findAllTestimonials() {
	return prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
}

export function findTestimonialById(id: string) {
	return prisma.testimonial.findUnique({ where: { id } });
}

export function createTestimonial(data: Prisma.TestimonialCreateInput) {
	return prisma.testimonial.create({ data });
}

export function updateTestimonialById(id: string, data: Prisma.TestimonialUpdateInput) {
	return prisma.testimonial.update({ where: { id }, data });
}

export function deleteTestimonialById(id: string) {
	return prisma.testimonial.delete({ where: { id } });
}
