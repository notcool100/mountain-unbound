import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { createStatSchema, idParamSchema, updateStatSchema } from './stat.validation.js';
import { createStatHandler, deleteStatHandler, listStatsHandler, updateStatHandler } from './stat.controller.js';

const router = Router();

router.get('/', listStatsHandler);
router.post('/', requireAuth, validate({ body: createStatSchema }), createStatHandler);
router.put('/:id', requireAuth, validate({ params: idParamSchema, body: updateStatSchema }), updateStatHandler);
router.delete('/:id', requireAuth, validate({ params: idParamSchema }), deleteStatHandler);

export default router;
