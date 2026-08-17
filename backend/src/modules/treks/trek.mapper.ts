import type { ItineraryDay, Trek, TrekCategory, TrekDeparture, TrekDifficulty, TrekGalleryImage } from '@prisma/client';

export type TrekCategoryDTO = 'signature' | 'peak-climbing' | 'short-treks';
export type TrekDifficultyDTO = 'Moderate' | 'Challenging' | 'Strenuous';

const CATEGORY_TO_DTO: Record<TrekCategory, TrekCategoryDTO> = {
	SIGNATURE: 'signature',
	PEAK_CLIMBING: 'peak-climbing',
	SHORT_TREKS: 'short-treks'
};

const CATEGORY_FROM_DTO: Record<TrekCategoryDTO, TrekCategory> = {
	signature: 'SIGNATURE',
	'peak-climbing': 'PEAK_CLIMBING',
	'short-treks': 'SHORT_TREKS'
};

const DIFFICULTY_TO_DTO: Record<TrekDifficulty, TrekDifficultyDTO> = {
	MODERATE: 'Moderate',
	CHALLENGING: 'Challenging',
	STRENUOUS: 'Strenuous'
};

const DIFFICULTY_FROM_DTO: Record<TrekDifficultyDTO, TrekDifficulty> = {
	Moderate: 'MODERATE',
	Challenging: 'CHALLENGING',
	Strenuous: 'STRENUOUS'
};

export function categoryToDTO(category: TrekCategory): TrekCategoryDTO {
	return CATEGORY_TO_DTO[category];
}

export function categoryFromDTO(category: TrekCategoryDTO): TrekCategory {
	return CATEGORY_FROM_DTO[category];
}

export function difficultyToDTO(difficulty: TrekDifficulty): TrekDifficultyDTO {
	return DIFFICULTY_TO_DTO[difficulty];
}

export function difficultyFromDTO(difficulty: TrekDifficultyDTO): TrekDifficulty {
	return DIFFICULTY_FROM_DTO[difficulty];
}

function toDateOnly(date: Date): string {
	return date.toISOString().slice(0, 10);
}

type TrekWithRelations = Trek & {
	gallery: TrekGalleryImage[];
	departures: TrekDeparture[];
};

export function toTrekDTO(trek: TrekWithRelations) {
	return {
		slug: trek.slug,
		category: categoryToDTO(trek.category),
		name: trek.name,
		region: trek.region,
		tagline: trek.tagline,
		summary: trek.summary,
		overview: trek.overview,
		days: trek.days,
		maxAltitude: trek.maxAltitude,
		difficulty: difficultyToDTO(trek.difficulty),
		bestSeasons: trek.bestSeasons,
		groupSize: trek.groupSize,
		startEnd: trek.startEnd,
		price: trek.price,
		priceNote: trek.priceNote,
		image: trek.image,
		imageAlt: trek.imageAlt,
		gallery: trek.gallery
			.sort((a, b) => a.order - b.order)
			.map((g) => ({ image: g.image, alt: g.alt })),
		highlights: trek.highlights,
		includes: trek.includes,
		excludes: trek.excludes,
		departures: trek.departures.map((d) => ({ date: toDateOnly(d.date), spotsLeft: d.spotsLeft }))
	};
}

export function toItineraryDayDTO(day: ItineraryDay) {
	return {
		day: day.day,
		title: day.title,
		location: day.location,
		elevation: day.elevation,
		description: day.description
	};
}
