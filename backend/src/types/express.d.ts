import type { AdminTokenPayload } from '../utils/jwt.js';

declare global {
	namespace Express {
		interface Request {
			admin?: AdminTokenPayload;
		}
	}
}

export {};
