import { prisma } from '../../lib/prisma.js';
import type { Prisma } from '@prisma/client';

export function findAllStats() {
	return prisma.stat.findMany({ orderBy: { order: 'asc' } });
}

export function findStatById(id: string) {
	return prisma.stat.findUnique({ where: { id } });
}

export function createStat(data: Prisma.StatCreateInput) {
	return prisma.stat.create({ data });
}

export function updateStatById(id: string, data: Prisma.StatUpdateInput) {
	return prisma.stat.update({ where: { id }, data });
}

export function deleteStatById(id: string) {
	return prisma.stat.delete({ where: { id } });
}
