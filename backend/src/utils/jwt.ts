import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type AdminTokenPayload = {
	sub: string;
	email: string;
};

export function signAdminToken(payload: AdminTokenPayload): string {
	return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
}

export function verifyAdminToken(token: string): AdminTokenPayload {
	return jwt.verify(token, env.JWT_SECRET) as AdminTokenPayload;
}
