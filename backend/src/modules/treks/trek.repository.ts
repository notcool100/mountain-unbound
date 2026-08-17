import { prisma } from '../../lib/prisma.js';
import type { Prisma } from '@prisma/client';

const trekWithRelations = {
	gallery: { orderBy: { order: 'asc' } },
	departures: { orderBy: { date: 'asc' } }
} satisfies Prisma.TrekInclude;

const trekWithItinerary = {
	itinerary: { orderBy: { day: 'asc' } }
} satisfies Prisma.TrekInclude;

export function findAllTreks() {
	return prisma.trek.findMany({ include: trekWithRelations, orderBy: { order: 'asc' } });
}

export function findTrekBySlug(slug: string) {
	return prisma.trek.findUnique({ where: { slug }, include: trekWithRelations });
}

export function findTrekItinerary(slug: string) {
	return prisma.trek.findUnique({ where: { slug }, include: trekWithItinerary });
}

export function findAllItineraries() {
	return prisma.trek.findMany({
		select: { slug: true, itinerary: { orderBy: { day: 'asc' } } }
	});
}

export function createTrek(data: Prisma.TrekCreateInput) {
	return prisma.trek.create({ data, include: trekWithRelations });
}

export function updateTrekBySlug(slug: string, data: Prisma.TrekUpdateInput) {
	return prisma.trek.update({ where: { slug }, data, include: trekWithRelations });
}

export function deleteTrekBySlug(slug: string) {
	return prisma.trek.delete({ where: { slug } });
}

export function replaceTrekItinerary(trekId: string, days: Prisma.ItineraryDayCreateManyInput[]) {
	return prisma.$transaction([
		prisma.itineraryDay.deleteMany({ where: { trekId } }),
		prisma.itineraryDay.createMany({ data: days })
	]);
}
