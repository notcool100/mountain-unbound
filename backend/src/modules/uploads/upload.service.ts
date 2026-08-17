import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/ApiError.js';

const ALLOWED_IMAGE_MIMETYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const ALLOWED_VIDEO_MIMETYPES: Record<string, string> = {
	'video/mp4': 'mp4',
	'video/webm': 'webm'
};

export async function saveImageUpload(file: Express.Multer.File) {
	if (!ALLOWED_IMAGE_MIMETYPES.has(file.mimetype)) {
		throw ApiError.badRequest('Unsupported image type. Use JPEG, PNG, WebP, or GIF.');
	}

	const dir = path.join(env.uploadsDir, 'images');
	await mkdir(dir, { recursive: true });

	const id = randomUUID();
	await Promise.all([
		sharp(file.buffer)
			.resize({ width: 960, withoutEnlargement: true })
			.webp()
			.toFile(path.join(dir, `${id}-960.webp`)),
		sharp(file.buffer)
			.resize({ width: 1920, withoutEnlargement: true })
			.webp()
			.toFile(path.join(dir, `${id}-1920.webp`))
	]);

	return { base: `/uploads/images/${id}` };
}

export async function saveVideoUpload(file: Express.Multer.File) {
	const ext = ALLOWED_VIDEO_MIMETYPES[file.mimetype];
	if (!ext) {
		throw ApiError.badRequest('Unsupported video type. Use MP4 or WebM.');
	}

	const dir = path.join(env.uploadsDir, 'videos');
	await mkdir(dir, { recursive: true });

	const id = randomUUID();
	const filename = `${id}.${ext}`;
	await writeFile(path.join(dir, filename), file.buffer);

	return { url: `/uploads/videos/${filename}` };
}
