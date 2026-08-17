import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { loginSchema } from './auth.validation.js';
import { loginHandler, meHandler } from './auth.controller.js';

const router = Router();

router.post('/login', validate({ body: loginSchema }), loginHandler);
router.get('/me', requireAuth, meHandler);

export default router;
