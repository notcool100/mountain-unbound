import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendSuccess } from '../../utils/ApiResponse.js';
import * as faqService from './faq.service.js';

export const listFaqsHandler = asyncHandler(async (_req: Request, res: Response) => {
	sendSuccess(res, await faqService.listFaqs());
});

export const createFaqHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await faqService.createFaq(req.body), 201);
});

export const updateFaqHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await faqService.updateFaq(req.params.id, req.body));
});

export const deleteFaqHandler = asyncHandler(async (req: Request, res: Response) => {
	await faqService.deleteFaq(req.params.id);
	res.status(204).send();
});
