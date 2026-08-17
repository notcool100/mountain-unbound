import type { FaqItem } from '@prisma/client';

export function toFaqDTO(faq: FaqItem) {
	return { id: faq.id, question: faq.question, answer: faq.answer, order: faq.order };
}
