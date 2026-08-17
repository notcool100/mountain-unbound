import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendSuccess } from '../../utils/ApiResponse.js';
import * as journalService from './journal.service.js';

export const listArticlesHandler = asyncHandler(async (_req: Request, res: Response) => {
	sendSuccess(res, await journalService.listArticles());
});

export const getArticleHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await journalService.getArticleBySlug(req.params.slug));
});

export const createArticleHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await journalService.createArticle(req.body), 201);
});

export const updateArticleHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await journalService.updateArticle(req.params.slug, req.body));
});

export const deleteArticleHandler = asyncHandler(async (req: Request, res: Response) => {
	await journalService.deleteArticle(req.params.slug);
	res.status(204).send();
});
