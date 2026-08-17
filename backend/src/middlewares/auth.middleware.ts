import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { verifyAdminToken } from '../utils/jwt.js';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
	const header = req.headers.authorization;
	if (!header?.startsWith('Bearer ')) {
		throw ApiError.unauthorized('Missing bearer token');
	}

	const token = header.slice('Bearer '.length);

	try {
		req.admin = verifyAdminToken(token);
	} catch {
		throw ApiError.unauthorized('Invalid or expired token');
	}

	next();
}
