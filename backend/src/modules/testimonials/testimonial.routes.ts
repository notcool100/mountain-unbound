import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { createTestimonialSchema, idParamSchema, updateTestimonialSchema } from './testimonial.validation.js';
import {
	createTestimonialHandler,
	deleteTestimonialHandler,
	listTestimonialsHandler,
	updateTestimonialHandler
} from './testimonial.controller.js';

const router = Router();

router.get('/', listTestimonialsHandler);
router.post('/', requireAuth, validate({ body: createTestimonialSchema }), createTestimonialHandler);
router.put(
	'/:id',
	requireAuth,
	validate({ params: idParamSchema, body: updateTestimonialSchema }),
	updateTestimonialHandler
);
router.delete('/:id', requireAuth, validate({ params: idParamSchema }), deleteTestimonialHandler);

export default router;
