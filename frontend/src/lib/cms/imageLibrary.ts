/**
 * Catalog of images already licensed and shipped under static/images/.
 * Frontend-only phase: admin picks from this fixed library rather than
 * uploading arbitrary files. Each entry's `-960.webp` / `-1920.webp`
 * variants must exist on disk.
 */
export type LibraryImage = { base: string; label: string };

export const imageLibrary: LibraryImage[] = [
	{ base: '/images/annapurna-bridge', label: 'Annapurna — suspension bridge' },
	{ base: '/images/annapurna-card', label: 'Annapurna — Thorong La cairns' },
	{ base: '/images/ebc-card', label: 'Everest Base Camp — prayer flags' },
	{ base: '/images/ebc-ridge', label: 'Everest — ridge trail' },
	{ base: '/images/ebc-trail', label: 'Everest — trail signpost' },
	{ base: '/images/hero-poster', label: 'Hero — Khumbu ridge' },
	{ base: '/images/island-peak', label: 'Island Peak — Chukhung valley' },
	{ base: '/images/manaslu-card', label: 'Manaslu — Ro village chorten' },
	{ base: '/images/manaslu-distant', label: 'Manaslu — distant summit' },
	{ base: '/images/manaslu-lake', label: 'Manaslu — glacial lake at dawn' },
	{ base: '/images/poon-hill', label: 'Poon Hill — sunrise panorama' }
];

export type LibraryVideo = { src: string; label: string };

export const videoLibrary: LibraryVideo[] = [
	{ src: '/video/hero-loop.mp4', label: 'Hero — Khumbu ridge timelapse' }
];
