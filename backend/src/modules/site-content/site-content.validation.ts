import { z } from 'zod';

export const siteSectionKeys = [
	'seo',
	'nav',
	'footer',
	'hero',
	'statsSection',
	'whyGrid',
	'regions',
	'activities',
	'trailStory',
	'ebcTiers',
	'planYourTrek',
	'about',
	'contact',
	'treksPage',
	'journalPage',
	'trekDetailLabels',
	'journalDetailLabels'
] as const;

export type SiteSectionKey = (typeof siteSectionKeys)[number];

export const sectionParamSchema = z.object({ section: z.enum(siteSectionKeys) });

/** Each section's shape mirrors the frontend's own `SiteContent` section types
 *  (src/lib/cms/schema.ts), which change independently of this API — kept as
 *  a validated JSON object here rather than duplicating every field. */
export const sectionBodySchema = z.record(z.string(), z.unknown());
