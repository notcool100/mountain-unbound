import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendSuccess } from '../../utils/ApiResponse.js';
import * as statService from './stat.service.js';

export const listStatsHandler = asyncHandler(async (_req: Request, res: Response) => {
	sendSuccess(res, await statService.listStats());
});

export const createStatHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await statService.createStat(req.body), 201);
});

export const updateStatHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await statService.updateStat(req.params.id, req.body));
});

export const deleteStatHandler = asyncHandler(async (req: Request, res: Response) => {
	await statService.deleteStat(req.params.id);
	res.status(204).send();
});
