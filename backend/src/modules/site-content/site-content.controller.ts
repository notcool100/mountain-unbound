import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendSuccess } from '../../utils/ApiResponse.js';
import * as siteContentService from './site-content.service.js';
import type { SiteSectionKey } from './site-content.validation.js';

export const getSiteContentHandler = asyncHandler(async (_req: Request, res: Response) => {
	sendSuccess(res, await siteContentService.getSiteContent());
});

export const updateSectionHandler = asyncHandler(async (req: Request, res: Response) => {
	const section = req.params.section as SiteSectionKey;
	sendSuccess(res, await siteContentService.updateSection(section, req.body));
});
