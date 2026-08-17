import 'dotenv/config';
import path from 'node:path';
import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.coerce.number().int().positive().default(4000),
	DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
	JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
	JWT_EXPIRES_IN: z.string().default('7d'),
	CORS_ORIGIN: z.string().default('http://localhost:5173'),
	ADMIN_EMAIL: z.string().email().optional(),
	ADMIN_PASSWORD: z.string().min(8).optional(),
	UPLOADS_DIR: z.string().default('uploads'),
	MAX_IMAGE_UPLOAD_MB: z.coerce.number().positive().default(15),
	MAX_VIDEO_UPLOAD_MB: z.coerce.number().positive().default(300)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
	throw new Error('Invalid environment configuration');
}

export const env = {
	...parsed.data,
	isProduction: parsed.data.NODE_ENV === 'production',
	corsOrigins: parsed.data.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
	uploadsDir: path.resolve(process.cwd(), parsed.data.UPLOADS_DIR),
	maxImageUploadBytes: parsed.data.MAX_IMAGE_UPLOAD_MB * 1024 * 1024,
	maxVideoUploadBytes: parsed.data.MAX_VIDEO_UPLOAD_MB * 1024 * 1024
};
