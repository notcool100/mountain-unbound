import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import {
	createTrekSchema,
	replaceItinerarySchema,
	slugParamSchema,
	updateTrekSchema
} from './trek.validation.js';
import {
	createTrekHandler,
	deleteTrekHandler,
	getTrekHandler,
	getTrekItineraryHandler,
	listTreksHandler,
	replaceTrekItineraryHandler,
	updateTrekHandler
} from './trek.controller.js';

const router = Router();

router.get('/', listTreksHandler);
router.get('/:slug', validate({ params: slugParamSchema }), getTrekHandler);
router.get('/:slug/itinerary', validate({ params: slugParamSchema }), getTrekItineraryHandler);

router.post('/', requireAuth, validate({ body: createTrekSchema }), createTrekHandler);
router.put(
	'/:slug',
	requireAuth,
	validate({ params: slugParamSchema, body: updateTrekSchema }),
	updateTrekHandler
);
router.put(
	'/:slug/itinerary',
	requireAuth,
	validate({ params: slugParamSchema, body: replaceItinerarySchema }),
	replaceTrekItineraryHandler
);
router.delete('/:slug', requireAuth, validate({ params: slugParamSchema }), deleteTrekHandler);

export default router;
