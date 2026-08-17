import { z } from 'zod';

export const trekCategorySchema = z.enum(['signature', 'peak-climbing', 'short-treks']);
export const trekDifficultySchema = z.enum(['Moderate', 'Challenging', 'Strenuous']);

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected date in YYYY-MM-DD format');

export const departureSchema = z.object({
	date: isoDate,
	spotsLeft: z.number().int().min(0)
});

export const galleryImageSchema = z.object({
	image: z.string().min(1),
	alt: z.string().min(1)
});

export const itineraryDaySchema = z.object({
	day: z.number().int().positive(),
	title: z.string().min(1),
	location: z.string().min(1),
	elevation: z.string().min(1),
	description: z.string().min(1)
});

export const trekBaseSchema = z.object({
	slug: z
		.string()
		.min(1)
		.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug must be lowercase, kebab-case'),
	category: trekCategorySchema,
	name: z.string().min(1),
	region: z.string().min(1),
	tagline: z.string().min(1),
	summary: z.string().min(1),
	overview: z.string().min(1),
	days: z.number().int().positive(),
	maxAltitude: z.string().min(1),
	difficulty: trekDifficultySchema,
	bestSeasons: z.string().min(1),
	groupSize: z.string().min(1),
	startEnd: z.string().min(1),
	price: z.number().int().nonnegative(),
	priceNote: z.string().min(1),
	image: z.string().min(1),
	imageAlt: z.string().min(1),
	highlights: z.array(z.string().min(1)).default([]),
	includes: z.array(z.string().min(1)).default([]),
	excludes: z.array(z.string().min(1)).default([]),
	gallery: z.array(galleryImageSchema).default([]),
	departures: z.array(departureSchema).default([]),
	itinerary: z.array(itineraryDaySchema).default([])
});

export const createTrekSchema = trekBaseSchema;
export const updateTrekSchema = trekBaseSchema.omit({ slug: true }).partial();

export const replaceItinerarySchema = z.object({
	itinerary: z.array(itineraryDaySchema)
});

export const slugParamSchema = z.object({ slug: z.string().min(1) });

export type CreateTrekInput = z.infer<typeof createTrekSchema>;
export type UpdateTrekInput = z.infer<typeof updateTrekSchema>;
