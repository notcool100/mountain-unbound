import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

export function createApp() {
	const app = express();

	app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
	app.use(
		cors({
			origin: env.corsOrigins,
			credentials: true
		})
	);
	app.use(express.json({ limit: '2mb' }));
	app.use(morgan(env.isProduction ? 'combined' : 'dev'));

	app.get('/health', (_req, res) => {
		res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
	});

	app.use('/uploads', express.static(env.uploadsDir, { maxAge: '30d', immutable: true }));

	app.use('/api/v1', apiRouter);

	app.use(notFound);
	app.use(errorHandler);

	return app;
}
