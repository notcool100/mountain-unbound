import { z } from 'zod';

export const statBaseSchema = z.object({
	value: z.number(),
	prefix: z.string().optional(),
	suffix: z.string().optional(),
	label: z.string().min(1),
	order: z.number().int().nonnegative().default(0)
});

export const createStatSchema = statBaseSchema;
export const updateStatSchema = statBaseSchema.partial();
export const idParamSchema = z.object({ id: z.string().min(1) });

export type CreateStatInput = z.infer<typeof createStatSchema>;
export type UpdateStatInput = z.infer<typeof updateStatSchema>;
