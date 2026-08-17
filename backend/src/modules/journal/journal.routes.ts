import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { createArticleSchema, slugParamSchema, updateArticleSchema } from './journal.validation.js';
import {
	createArticleHandler,
	deleteArticleHandler,
	getArticleHandler,
	listArticlesHandler,
	updateArticleHandler
} from './journal.controller.js';

const router = Router();

router.get('/', listArticlesHandler);
router.get('/:slug', validate({ params: slugParamSchema }), getArticleHandler);

router.post('/', requireAuth, validate({ body: createArticleSchema }), createArticleHandler);
router.put(
	'/:slug',
	requireAuth,
	validate({ params: slugParamSchema, body: updateArticleSchema }),
	updateArticleHandler
);
router.delete('/:slug', requireAuth, validate({ params: slugParamSchema }), deleteArticleHandler);

export default router;
