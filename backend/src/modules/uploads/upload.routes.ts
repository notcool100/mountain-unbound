import { Router } from 'express';
import multer from 'multer';
import { env } from '../../config/env.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { uploadImageHandler, uploadVideoHandler } from './upload.controller.js';

const imageUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: env.maxImageUploadBytes } });
const videoUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: env.maxVideoUploadBytes } });

const router = Router();

router.post('/image', requireAuth, imageUpload.single('file'), uploadImageHandler);
router.post('/video', requireAuth, videoUpload.single('file'), uploadVideoHandler);

export default router;
