import { prisma } from '../../lib/prisma.js';
import type { Prisma } from '@prisma/client';

export function findAllArticles() {
	return prisma.article.findMany({ orderBy: { publishDate: 'desc' } });
}

export function findArticleBySlug(slug: string) {
	return prisma.article.findUnique({ where: { slug } });
}

export function createArticle(data: Prisma.ArticleCreateInput) {
	return prisma.article.create({ data });
}

export function updateArticleBySlug(slug: string, data: Prisma.ArticleUpdateInput) {
	return prisma.article.update({ where: { slug }, data });
}

export function deleteArticleBySlug(slug: string) {
	return prisma.article.delete({ where: { slug } });
}
