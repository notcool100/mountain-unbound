import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma.js';
import { ApiError } from '../../utils/ApiError.js';
import { signAdminToken } from '../../utils/jwt.js';
import type { LoginInput } from './auth.validation.js';

export async function login({ email, password }: LoginInput) {
	const admin = await prisma.admin.findUnique({ where: { email } });
	if (!admin) throw ApiError.unauthorized('Invalid email or password');

	const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
	if (!passwordMatches) throw ApiError.unauthorized('Invalid email or password');

	const token = signAdminToken({ sub: admin.id, email: admin.email });

	return {
		token,
		admin: { id: admin.id, email: admin.email, name: admin.name }
	};
}

export async function getAdminById(id: string) {
	const admin = await prisma.admin.findUnique({ where: { id } });
	if (!admin) throw ApiError.notFound('Admin not found');
	return { id: admin.id, email: admin.email, name: admin.name };
}
