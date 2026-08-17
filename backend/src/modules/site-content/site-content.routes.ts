import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { sectionBodySchema, sectionParamSchema } from './site-content.validation.js';
import { getSiteContentHandler, updateSectionHandler } from './site-content.controller.js';

const router = Router();

router.get('/', getSiteContentHandler);
router.patch(
	'/:section',
	requireAuth,
	validate({ params: sectionParamSchema, body: sectionBodySchema }),
	updateSectionHandler
);

export default router;
