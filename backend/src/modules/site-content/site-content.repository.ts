import { prisma } from '../../lib/prisma.js';
import type { Prisma } from '@prisma/client';
import type { SiteSectionKey } from './site-content.validation.js';

const SETTINGS_ID = 1;

export function findSettings() {
	return prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
}

export function updateSection(section: SiteSectionKey, value: unknown) {
	const data = { [section]: value } as Prisma.SiteSettingsUpdateInput;
	return prisma.siteSettings.update({ where: { id: SETTINGS_ID }, data });
}

export function upsertSettings(data: Omit<Prisma.SiteSettingsCreateInput, 'id'>) {
	return prisma.siteSettings.upsert({
		where: { id: SETTINGS_ID },
		create: { id: SETTINGS_ID, ...data },
		update: data
	});
}
