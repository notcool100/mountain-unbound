import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendSuccess } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as authService from './auth.service.js';

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
	const result = await authService.login(req.body);
	sendSuccess(res, result);
});

export const meHandler = asyncHandler(async (req: Request, res: Response) => {
	if (!req.admin) throw ApiError.unauthorized();
	const admin = await authService.getAdminById(req.admin.sub);
	sendSuccess(res, admin);
});
