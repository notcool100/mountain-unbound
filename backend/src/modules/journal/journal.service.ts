import { ApiError } from '../../utils/ApiError.js';
import * as journalRepository from './journal.repository.js';
import { toArticleDTO } from './journal.mapper.js';
import type { CreateArticleInput, UpdateArticleInput } from './journal.validation.js';

export async function listArticles() {
	const articles = await journalRepository.findAllArticles();
	return articles.map(toArticleDTO);
}

export async function getArticleBySlug(slug: string) {
	const article = await journalRepository.findArticleBySlug(slug);
	if (!article) throw ApiError.notFound(`Article "${slug}" not found`);
	return toArticleDTO(article);
}

export async function createArticle(input: CreateArticleInput) {
	const article = await journalRepository.createArticle({
		...input,
		publishDate: new Date(input.publishDate)
	});
	return toArticleDTO(article);
}

export async function updateArticle(slug: string, input: UpdateArticleInput) {
	const existing = await journalRepository.findArticleBySlug(slug);
	if (!existing) throw ApiError.notFound(`Article "${slug}" not found`);

	const article = await journalRepository.updateArticleBySlug(slug, {
		...input,
		...(input.publishDate !== undefined && { publishDate: new Date(input.publishDate) })
	});
	return toArticleDTO(article);
}

export async function deleteArticle(slug: string) {
	const existing = await journalRepository.findArticleBySlug(slug);
	if (!existing) throw ApiError.notFound(`Article "${slug}" not found`);
	await journalRepository.deleteArticleBySlug(slug);
}
