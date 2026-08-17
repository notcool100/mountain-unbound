import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendSuccess } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import * as uploadService from './upload.service.js';

export const uploadImageHandler = asyncHandler(async (req: Request, res: Response) => {
	if (!req.file) throw ApiError.badRequest('No file uploaded');
	sendSuccess(res, await uploadService.saveImageUpload(req.file), 201);
});

export const uploadVideoHandler = asyncHandler(async (req: Request, res: Response) => {
	if (!req.file) throw ApiError.badRequest('No file uploaded');
	sendSuccess(res, await uploadService.saveVideoUpload(req.file), 201);
});
