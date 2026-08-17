import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendSuccess } from '../../utils/ApiResponse.js';
import * as trekService from './trek.service.js';

export const listTreksHandler = asyncHandler(async (_req: Request, res: Response) => {
	sendSuccess(res, await trekService.listTreks());
});

export const getTrekHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await trekService.getTrekBySlug(req.params.slug));
});

export const getTrekItineraryHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await trekService.getTrekItinerary(req.params.slug));
});

export const replaceTrekItineraryHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await trekService.replaceItinerary(req.params.slug, req.body.itinerary));
});

export const createTrekHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await trekService.createTrek(req.body), 201);
});

export const updateTrekHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await trekService.updateTrek(req.params.slug, req.body));
});

export const deleteTrekHandler = asyncHandler(async (req: Request, res: Response) => {
	await trekService.deleteTrek(req.params.slug);
	res.status(204).send();
});
