import { z } from 'zod';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected date in YYYY-MM-DD format');

export const articleSectionSchema = z.object({
	heading: z.string().min(1),
	body: z.array(z.string().min(1))
});

export const articleBaseSchema = z.object({
	slug: z
		.string()
		.min(1)
		.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug must be lowercase, kebab-case'),
	title: z.string().min(1),
	excerpt: z.string().min(1),
	category: z.string().min(1),
	readMinutes: z.number().int().positive(),
	publishDate: isoDate,
	image: z.string().min(1),
	imageAlt: z.string().min(1),
	sections: z.array(articleSectionSchema).default([])
});

export const createArticleSchema = articleBaseSchema;
export const updateArticleSchema = articleBaseSchema.omit({ slug: true }).partial();

export const slugParamSchema = z.object({ slug: z.string().min(1) });

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
