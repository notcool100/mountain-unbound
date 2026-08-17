export type Testimonial = {
	id: string;
	quote: string;
	name: string;
	location: string;
	trek: string;
	image: string;
	imageAlt: string;
};

export const testimonials: Testimonial[] = [
	{
		id: 'testimonial-marit-solberg',
		quote:
			'Our guide Pemba knew every teahouse owner by name from Phakding to Gorak Shep. That kind of welcome, you cannot book on a website.',
		name: 'Marit Solberg',
		location: 'Bergen, Norway',
		trek: 'Everest Base Camp, 2025',
		image: '/images/ebc-trail',
		imageAlt: 'Rocky trail with a signpost above the Khumbu Valley, prayer flags in the distance'
	},
	{
		id: 'testimonial-diego-fernandez-rojas',
		quote:
			'Sixteen days and the group never once felt rushed. Crossing Thorong La at sunrise, above the cloud line, is the clearest my head has ever felt.',
		name: 'Diego Fernandez Rojas',
		location: 'Mendoza, Argentina',
		trek: 'Annapurna Circuit, 2024',
		image: '/images/annapurna-bridge',
		imageAlt: 'Suspension bridge over the glacial Marsyangdi river on the Annapurna Circuit'
	},
	{
		id: 'testimonial-aiko-tanaka',
		quote:
			'Manaslu felt like the Nepal our guide grew up in, not the Nepal on a postcard. Three villages the whole trip, and we were the only trekkers in two of them.',
		name: 'Aiko Tanaka',
		location: 'Sapporo, Japan',
		trek: 'Manaslu Circuit, 2025',
		image: '/images/manaslu-lake',
		imageAlt: 'The Manaslu range at dawn, mirrored in a still glacial lake'
	}
];
