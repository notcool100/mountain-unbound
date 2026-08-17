import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { createFaqSchema, idParamSchema, updateFaqSchema } from './faq.validation.js';
import { createFaqHandler, deleteFaqHandler, listFaqsHandler, updateFaqHandler } from './faq.controller.js';

const router = Router();

router.get('/', listFaqsHandler);
router.post('/', requireAuth, validate({ body: createFaqSchema }), createFaqHandler);
router.put('/:id', requireAuth, validate({ params: idParamSchema, body: updateFaqSchema }), updateFaqHandler);
router.delete('/:id', requireAuth, validate({ params: idParamSchema }), deleteFaqHandler);

export default router;
