import { ApiError } from '../../utils/ApiError.js';
import * as siteContentRepository from './site-content.repository.js';
import * as trekService from '../treks/trek.service.js';
import * as journalService from '../journal/journal.service.js';
import * as testimonialService from '../testimonials/testimonial.service.js';
import * as faqService from '../faqs/faq.service.js';
import * as statService from '../stats/stat.service.js';
import type { SiteSectionKey } from './site-content.validation.js';

/**
 * Assembles the full site-content payload in the shape of the frontend's
 * `SiteContent` type (src/lib/cms/schema.ts): section copy from the
 * SiteSettings singleton, plus the relational collections (treks,
 * itineraries, journal, testimonials, faqs) and stats folded into
 * statsSection.
 */
export async function getSiteContent() {
	const settings = await siteContentRepository.findSettings();
	if (!settings) {
		throw ApiError.notFound('Site settings have not been initialized yet — run the seed script');
	}

	const [treks, itineraries, journal, testimonials, faqs, stats] = await Promise.all([
		trekService.listTreks(),
		trekService.getAllItinerariesBySlug(),
		journalService.listArticles(),
		testimonialService.listTestimonials(),
		faqService.listFaqs(),
		statService.listStats()
	]);

	const { id, updatedAt, statsSection, ...sections } = settings;
	void id;
	void updatedAt;

	return {
		...sections,
		statsSection: { ...(statsSection as Record<string, unknown>), stats },
		treks,
		itineraries,
		journal,
		testimonials,
		faqs
	};
}

export async function updateSection(section: SiteSectionKey, value: unknown) {
	const settings = await siteContentRepository.findSettings();
	if (!settings) {
		throw ApiError.notFound('Site settings have not been initialized yet — run the seed script');
	}

	const updated = await siteContentRepository.updateSection(section, value);
	return updated[section];
}
