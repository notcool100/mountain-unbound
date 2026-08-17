import { prisma } from '../../lib/prisma.js';
import type { Prisma } from '@prisma/client';

export function findAllFaqs() {
	return prisma.faqItem.findMany({ orderBy: { order: 'asc' } });
}

export function findFaqById(id: string) {
	return prisma.faqItem.findUnique({ where: { id } });
}

export function createFaq(data: Prisma.FaqItemCreateInput) {
	return prisma.faqItem.create({ data });
}

export function updateFaqById(id: string, data: Prisma.FaqItemUpdateInput) {
	return prisma.faqItem.update({ where: { id }, data });
}

export function deleteFaqById(id: string) {
	return prisma.faqItem.delete({ where: { id } });
}
