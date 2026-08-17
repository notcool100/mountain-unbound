import type { Article } from '@prisma/client';
import type { articleSectionSchema } from './journal.validation.js';
import type { z } from 'zod';

export type ArticleSectionDTO = z.infer<typeof articleSectionSchema>;

function toDateOnly(date: Date): string {
	return date.toISOString().slice(0, 10);
}

export function toArticleDTO(article: Article) {
	return {
		slug: article.slug,
		title: article.title,
		excerpt: article.excerpt,
		category: article.category,
		readMinutes: article.readMinutes,
		publishDate: toDateOnly(article.publishDate),
		image: article.image,
		imageAlt: article.imageAlt,
		sections: article.sections as unknown as ArticleSectionDTO[]
	};
}
