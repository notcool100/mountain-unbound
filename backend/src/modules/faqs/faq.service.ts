import { ApiError } from '../../utils/ApiError.js';
import * as repository from './faq.repository.js';
import { toFaqDTO } from './faq.mapper.js';
import type { CreateFaqInput, UpdateFaqInput } from './faq.validation.js';

export async function listFaqs() {
	const faqs = await repository.findAllFaqs();
	return faqs.map(toFaqDTO);
}

export async function createFaq(input: CreateFaqInput) {
	return toFaqDTO(await repository.createFaq(input));
}

export async function updateFaq(id: string, input: UpdateFaqInput) {
	const existing = await repository.findFaqById(id);
	if (!existing) throw ApiError.notFound(`FAQ "${id}" not found`);
	return toFaqDTO(await repository.updateFaqById(id, input));
}

export async function deleteFaq(id: string) {
	const existing = await repository.findFaqById(id);
	if (!existing) throw ApiError.notFound(`FAQ "${id}" not found`);
	await repository.deleteFaqById(id);
}
