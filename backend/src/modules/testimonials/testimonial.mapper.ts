import type { Testimonial } from '@prisma/client';

export function toTestimonialDTO(testimonial: Testimonial) {
	return {
		id: testimonial.id,
		quote: testimonial.quote,
		name: testimonial.name,
		location: testimonial.location,
		trek: testimonial.trek,
		image: testimonial.image,
		imageAlt: testimonial.imageAlt,
		order: testimonial.order
	};
}
