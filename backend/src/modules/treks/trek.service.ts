import type { Prisma } from '@prisma/client';
import { ApiError } from '../../utils/ApiError.js';
import * as trekRepository from './trek.repository.js';
import {
	categoryFromDTO,
	difficultyFromDTO,
	toItineraryDayDTO,
	toTrekDTO
} from './trek.mapper.js';
import type { CreateTrekInput, UpdateTrekInput } from './trek.validation.js';

export async function listTreks() {
	const treks = await trekRepository.findAllTreks();
	return treks.map(toTrekDTO);
}

export async function getTrekBySlug(slug: string) {
	const trek = await trekRepository.findTrekBySlug(slug);
	if (!trek) throw ApiError.notFound(`Trek "${slug}" not found`);
	return toTrekDTO(trek);
}

export async function getTrekItinerary(slug: string) {
	const trek = await trekRepository.findTrekItinerary(slug);
	if (!trek) throw ApiError.notFound(`Trek "${slug}" not found`);
	return trek.itinerary.map(toItineraryDayDTO);
}

/** Keyed by slug, matching the frontend's `SiteContent.itineraries` shape. */
export async function getAllItinerariesBySlug() {
	const treks = await trekRepository.findAllItineraries();
	return Object.fromEntries(treks.map((trek) => [trek.slug, trek.itinerary.map(toItineraryDayDTO)]));
}

export async function createTrek(input: CreateTrekInput) {
	const data: Prisma.TrekCreateInput = {
		slug: input.slug,
		category: categoryFromDTO(input.category),
		name: input.name,
		region: input.region,
		tagline: input.tagline,
		summary: input.summary,
		overview: input.overview,
		days: input.days,
		maxAltitude: input.maxAltitude,
		difficulty: difficultyFromDTO(input.difficulty),
		bestSeasons: input.bestSeasons,
		groupSize: input.groupSize,
		startEnd: input.startEnd,
		price: input.price,
		priceNote: input.priceNote,
		image: input.image,
		imageAlt: input.imageAlt,
		highlights: input.highlights,
		includes: input.includes,
		excludes: input.excludes,
		gallery: { create: input.gallery.map((g, order) => ({ ...g, order })) },
		departures: { create: input.departures.map((d) => ({ ...d, date: new Date(d.date) })) },
		itinerary: { create: input.itinerary }
	};

	const trek = await trekRepository.createTrek(data);
	return toTrekDTO(trek);
}

export async function updateTrek(slug: string, input: UpdateTrekInput) {
	const existing = await trekRepository.findTrekBySlug(slug);
	if (!existing) throw ApiError.notFound(`Trek "${slug}" not found`);

	const data: Prisma.TrekUpdateInput = {
		...(input.category !== undefined && { category: categoryFromDTO(input.category) }),
		...(input.name !== undefined && { name: input.name }),
		...(input.region !== undefined && { region: input.region }),
		...(input.tagline !== undefined && { tagline: input.tagline }),
		...(input.summary !== undefined && { summary: input.summary }),
		...(input.overview !== undefined && { overview: input.overview }),
		...(input.days !== undefined && { days: input.days }),
		...(input.maxAltitude !== undefined && { maxAltitude: input.maxAltitude }),
		...(input.difficulty !== undefined && { difficulty: difficultyFromDTO(input.difficulty) }),
		...(input.bestSeasons !== undefined && { bestSeasons: input.bestSeasons }),
		...(input.groupSize !== undefined && { groupSize: input.groupSize }),
		...(input.startEnd !== undefined && { startEnd: input.startEnd }),
		...(input.price !== undefined && { price: input.price }),
		...(input.priceNote !== undefined && { priceNote: input.priceNote }),
		...(input.image !== undefined && { image: input.image }),
		...(input.imageAlt !== undefined && { imageAlt: input.imageAlt }),
		...(input.highlights !== undefined && { highlights: input.highlights }),
		...(input.includes !== undefined && { includes: input.includes }),
		...(input.excludes !== undefined && { excludes: input.excludes }),
		...(input.gallery !== undefined && {
			gallery: {
				deleteMany: {},
				create: input.gallery.map((g, order) => ({ ...g, order }))
			}
		}),
		...(input.departures !== undefined && {
			departures: {
				deleteMany: {},
				create: input.departures.map((d) => ({ ...d, date: new Date(d.date) }))
			}
		})
	};

	const trek = await trekRepository.updateTrekBySlug(slug, data);

	if (input.itinerary !== undefined) {
		await trekRepository.replaceTrekItinerary(
			trek.id,
			input.itinerary.map((day) => ({ ...day, trekId: trek.id }))
		);
	}

	return toTrekDTO(trek);
}

export async function replaceItinerary(slug: string, itinerary: UpdateTrekInput['itinerary']) {
	const trek = await trekRepository.findTrekBySlug(slug);
	if (!trek) throw ApiError.notFound(`Trek "${slug}" not found`);

	await trekRepository.replaceTrekItinerary(
		trek.id,
		(itinerary ?? []).map((day) => ({ ...day, trekId: trek.id }))
	);

	return getTrekItinerary(slug);
}

export async function deleteTrek(slug: string) {
	const existing = await trekRepository.findTrekBySlug(slug);
	if (!existing) throw ApiError.notFound(`Trek "${slug}" not found`);
	await trekRepository.deleteTrekBySlug(slug);
}
