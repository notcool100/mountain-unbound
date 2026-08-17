import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import trekRoutes from '../modules/treks/trek.routes.js';
import journalRoutes from '../modules/journal/journal.routes.js';
import testimonialRoutes from '../modules/testimonials/testimonial.routes.js';
import faqRoutes from '../modules/faqs/faq.routes.js';
import statRoutes from '../modules/stats/stat.routes.js';
import siteContentRoutes from '../modules/site-content/site-content.routes.js';
import uploadRoutes from '../modules/uploads/upload.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/treks', trekRoutes);
router.use('/journal', journalRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/faqs', faqRoutes);
router.use('/stats', statRoutes);
router.use('/site-content', siteContentRoutes);
router.use('/uploads', uploadRoutes);

export default router;
