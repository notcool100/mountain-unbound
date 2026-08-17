import { ApiError } from '../../utils/ApiError.js';
import * as repository from './stat.repository.js';
import { toStatDTO } from './stat.mapper.js';
import type { CreateStatInput, UpdateStatInput } from './stat.validation.js';

export async function listStats() {
	const stats = await repository.findAllStats();
	return stats.map(toStatDTO);
}

export async function createStat(input: CreateStatInput) {
	return toStatDTO(await repository.createStat(input));
}

export async function updateStat(id: string, input: UpdateStatInput) {
	const existing = await repository.findStatById(id);
	if (!existing) throw ApiError.notFound(`Stat "${id}" not found`);
	return toStatDTO(await repository.updateStatById(id, input));
}

export async function deleteStat(id: string) {
	const existing = await repository.findStatById(id);
	if (!existing) throw ApiError.notFound(`Stat "${id}" not found`);
	await repository.deleteStatById(id);
}
