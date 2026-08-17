import type { Stat } from '@prisma/client';

export function toStatDTO(stat: Stat) {
	return {
		id: stat.id,
		value: stat.value,
		prefix: stat.prefix ?? '',
		suffix: stat.suffix ?? '',
		label: stat.label,
		order: stat.order
	};
}
