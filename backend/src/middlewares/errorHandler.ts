import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../lib/logger.js';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
			details: err.details
		});
	}

	if (err instanceof ZodError) {
		return res.status(400).json({
			success: false,
			message: 'Validation failed',
			details: err.flatten()
		});
	}

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === 'P2002') {
			return res.status(409).json({
				success: false,
				message: `A record with this ${(err.meta?.target as string[] | undefined)?.join(', ') ?? 'value'} already exists`
			});
		}
		if (err.code === 'P2025') {
			return res.status(404).json({ success: false, message: 'Record not found' });
		}
	}

	logger.error({ err, path: req.path, method: req.method }, 'Unhandled error');

	return res.status(500).json({ success: false, message: 'Internal server error' });
}
