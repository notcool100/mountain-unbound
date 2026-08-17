import { z } from 'zod';

export const testimonialBaseSchema = z.object({
	quote: z.string().min(1),
	name: z.string().min(1),
	location: z.string().min(1),
	trek: z.string().min(1),
	image: z.string().min(1),
	imageAlt: z.string().min(1),
	order: z.number().int().nonnegative().default(0)
});

export const createTestimonialSchema = testimonialBaseSchema;
export const updateTestimonialSchema = testimonialBaseSchema.partial();
export const idParamSchema = z.object({ id: z.string().min(1) });

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
