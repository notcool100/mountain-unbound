import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendSuccess } from '../../utils/ApiResponse.js';
import * as testimonialService from './testimonial.service.js';

export const listTestimonialsHandler = asyncHandler(async (_req: Request, res: Response) => {
	sendSuccess(res, await testimonialService.listTestimonials());
});

export const createTestimonialHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await testimonialService.createTestimonial(req.body), 201);
});

export const updateTestimonialHandler = asyncHandler(async (req: Request, res: Response) => {
	sendSuccess(res, await testimonialService.updateTestimonial(req.params.id, req.body));
});

export const deleteTestimonialHandler = asyncHandler(async (req: Request, res: Response) => {
	await testimonialService.deleteTestimonial(req.params.id);
	res.status(204).send();
});
