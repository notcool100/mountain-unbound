import { z } from 'zod';

export const faqBaseSchema = z.object({
	question: z.string().min(1),
	answer: z.string().min(1),
	order: z.number().int().nonnegative().default(0)
});

export const createFaqSchema = faqBaseSchema;
export const updateFaqSchema = faqBaseSchema.partial();
export const idParamSchema = z.object({ id: z.string().min(1) });

export type CreateFaqInput = z.infer<typeof createFaqSchema>;
export type UpdateFaqInput = z.infer<typeof updateFaqSchema>;
