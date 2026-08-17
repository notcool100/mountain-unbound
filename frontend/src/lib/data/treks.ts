export type Departure = {
	date: string;
	spotsLeft: number;
};

export type TrekCategory = 'signature' | 'peak-climbing' | 'short-treks';

export type Trek = {
	slug: string;
	category: TrekCategory;
	name: string;
	region: string;
	tagline: string;
	summary: string;
	overview: string;
	days: number;
	maxAltitude: string;
	difficulty: 'Moderate' | 'Challenging' | 'Strenuous';
	bestSeasons: string;
	groupSize: string;
	startEnd: string;
	price: number;
	priceNote: string;
	/** base path without extension/size suffix, e.g. "/images/ebc-card" -> ebc-card-960.webp / ebc-card-1920.webp */
	image: string;
	imageAlt: string;
	gallery: { image: string; alt: string }[];
	highlights: string[];
	includes: string[];
	excludes: string[];
	departures: Departure[];
};

export const treks: Trek[] = [
	{
		slug: 'everest-base-camp',
		category: 'signature',
		name: 'Everest Base Camp',
		region: 'Khumbu, Solukhumbu District',
		tagline: 'To the foot of the world\'s highest mountain',
		summary:
			'Fly into Lukla, follow the Dudh Kosi through pine forest and Sherpa villages, and climb through Namche and Tengboche to stand on the Khumbu Glacier beneath the South Face.',
		overview:
			'The classic. Thirteen days from Lukla to Kala Patthar and back, built around two proper acclimatisation days so the altitude gain stays honest rather than reckless. You will sleep in family-run teahouses the whole way, cross the Dudh Kosi on the same swaying bridges every EBC trekker photographs, and stand on the Khumbu Glacier itself, beneath the icefall that climbers on summit attempts must pass through before dawn.',
		days: 13,
		maxAltitude: '5,364 m · Kala Patthar',
		difficulty: 'Challenging',
		bestSeasons: 'Mar – May, Sep – Nov',
		groupSize: '2 – 10 trekkers',
		startEnd: 'Kathmandu to Kathmandu (fly Lukla both ways)',
		price: 1450,
		priceNote: 'per person, twin-share teahouse',
		image: '/images/ebc-card',
		imageAlt: 'Prayer flags strung near Everest Base Camp with the Khumbu icefall rising behind',
		gallery: [
			{ image: '/images/ebc-ridge', alt: 'Trekkers climbing a rocky ridge above the Khumbu Valley' },
			{ image: '/images/ebc-trail', alt: 'Trail signpost above the Khumbu Valley with prayer flags in the distance' }
		],
		highlights: [
			'Stand at Everest Base Camp, beneath the Khumbu Icefall',
			'Sunrise over the Everest massif from Kala Patthar, 5,364 m',
			'Sherpa villages, mani walls, and Tengboche monastery',
			'Two built-in acclimatisation days, not rushed for a schedule'
		],
		includes: [
			'Airport pickup and drop-off in Kathmandu',
			'Kathmandu to Lukla flights, both directions',
			'Sagarmatha National Park permit and TIMS card',
			'Teahouse accommodation for the full trek',
			'Three meals a day while on the trail',
			'A licensed English-speaking guide and porters (1 porter per 2 trekkers)',
			'Guide and porter wages, insurance, and equipment',
			'First-aid kit carried by your guide'
		],
		excludes: [
			'International airfare to and from Kathmandu',
			'Nepal entry visa fee (available on arrival)',
			'Travel and evacuation insurance',
			'Personal trekking gear',
			'Meals in Kathmandu outside the welcome dinner',
			'Hot showers, WiFi, and battery charging on the trail',
			'Tips for your guide and porters'
		],
		departures: [
			{ date: '2026-09-06', spotsLeft: 4 },
			{ date: '2026-10-04', spotsLeft: 2 },
			{ date: '2026-11-01', spotsLeft: 7 },
			{ date: '2027-03-07', spotsLeft: 9 }
		]
	},
	{
		slug: 'annapurna-circuit',
		category: 'signature',
		name: 'Annapurna Circuit',
		region: 'Manang & Mustang Districts',
		tagline: 'A full circle around the Annapurna massif',
		summary:
			'Cross from subtropical rice terraces to the high Tibetan plateau, over the Thorong La at 5,416 metres, descending through Muktinath into the Kali Gandaki, the deepest gorge on earth.',
		overview:
			'Sixteen days that change landscape almost daily: rice terraces and waterfalls in the low villages, pine forest into Manang, then the bare, wind-scoured approach to Thorong La itself. The pass crossing is long and cold, usually started before dawn, and it drops you into Mustang\'s high desert on the other side, a different country in every way but the passport. Natural hot springs at Tatopani take the edge off the descent.',
		days: 16,
		maxAltitude: '5,416 m · Thorong La Pass',
		difficulty: 'Strenuous',
		bestSeasons: 'Mar – May, Oct – Nov',
		groupSize: '2 – 12 trekkers',
		startEnd: 'Kathmandu to Kathmandu (drive Besisahar out, fly Jomsom back)',
		price: 1590,
		priceNote: 'per person, twin-share teahouse',
		image: '/images/annapurna-card',
		imageAlt: 'Prayer-flagged cairns atop the Thorong La at 5,416 metres, Annapurna Circuit',
		gallery: [
			{ image: '/images/annapurna-bridge', alt: 'Suspension bridge over the glacial Marsyangdi river' }
		],
		highlights: [
			'Cross the Thorong La at 5,416 metres, above the cloud line',
			'Natural hot springs at Tatopani after the pass',
			'The Kali Gandaki, the deepest gorge on earth',
			'Landscape shifts from jungle to high desert in a week'
		],
		includes: [
			'Airport pickup and drop-off in Kathmandu',
			'Kathmandu to Besisahar transport, Jomsom to Kathmandu flight',
			'Annapurna Conservation Area permit and TIMS card',
			'Teahouse accommodation for the full trek',
			'Three meals a day while on the trail',
			'A licensed English-speaking guide and porters (1 porter per 2 trekkers)',
			'Guide and porter wages, insurance, and equipment',
			'First-aid kit carried by your guide'
		],
		excludes: [
			'International airfare to and from Kathmandu',
			'Nepal entry visa fee (available on arrival)',
			'Travel and evacuation insurance',
			'Personal trekking gear',
			'Meals in Kathmandu outside the welcome dinner',
			'Hot springs entry fee at Tatopani',
			'Tips for your guide and porters'
		],
		departures: [
			{ date: '2026-10-11', spotsLeft: 6 },
			{ date: '2026-11-08', spotsLeft: 3 },
			{ date: '2027-03-14', spotsLeft: 12 },
			{ date: '2027-04-11', spotsLeft: 8 }
		]
	},
	{
		slug: 'manaslu-circuit',
		category: 'signature',
		name: 'Manaslu Circuit',
		region: 'Gorkha District',
		tagline: 'The quiet trail around the eighth-highest peak',
		summary:
			'A restricted-area trek along the old salt-trading route to Tibet, through Gurung and Tibetan villages far removed from the crowds, crossing the Larkya La beneath Manaslu\'s north face.',
		overview:
			'Manaslu requires a restricted-area permit and a minimum of two trekkers travelling with a registered agency, which keeps the trail genuinely quiet. Fourteen days follow the Budhi Gandaki upstream through Gurung villages, then Tibetan-influenced settlements as the valley narrows toward the Larkya La. The pass crossing, beneath Manaslu\'s north face, is the physical and emotional high point before a long descent into the Marsyangdi valley.',
		days: 14,
		maxAltitude: '5,106 m · Larkya La Pass',
		difficulty: 'Strenuous',
		bestSeasons: 'Apr – May, Sep – Oct',
		groupSize: '2 – 8 trekkers',
		startEnd: 'Kathmandu to Kathmandu (drive both ways)',
		price: 2290,
		priceNote: 'per person, twin-share teahouse, permit included',
		image: '/images/manaslu-card',
		imageAlt: 'The gateway chorten at Ro village with Manaslu\'s summit rising behind',
		gallery: [
			{ image: '/images/manaslu-distant', alt: 'Manaslu\'s sharp summit against a clear sky' },
			{ image: '/images/manaslu-lake', alt: 'The Manaslu range at dawn, mirrored in a still glacial lake' }
		],
		highlights: [
			'Restricted-area permit, far fewer trekkers than EBC or Annapurna',
			'Cross the Larkya La beneath Manaslu\'s north face',
			'Tibetan-influenced villages along the old salt-trading route',
			'Close views of Manaslu, the world\'s eighth-highest peak'
		],
		includes: [
			'Airport pickup and drop-off in Kathmandu',
			'Kathmandu to trailhead transport, both directions',
			'Manaslu restricted-area permit, conservation area permit, and TIMS card',
			'Teahouse accommodation for the full trek',
			'Three meals a day while on the trail',
			'A licensed English-speaking guide and porters (1 porter per 2 trekkers)',
			'Guide and porter wages, insurance, and equipment',
			'First-aid kit carried by your guide'
		],
		excludes: [
			'International airfare to and from Kathmandu',
			'Nepal entry visa fee (available on arrival)',
			'Travel and evacuation insurance',
			'Personal trekking gear',
			'Meals in Kathmandu outside the welcome dinner',
			'Hot showers, WiFi, and battery charging on the trail',
			'Tips for your guide and porters'
		],
		departures: [
			{ date: '2026-09-20', spotsLeft: 2 },
			{ date: '2026-10-18', spotsLeft: 5 },
			{ date: '2027-04-18', spotsLeft: 8 }
		]
	},
	{
		slug: 'island-peak-climbing',
		category: 'peak-climbing',
		name: 'Island Peak Climbing',
		region: 'Khumbu, Solukhumbu District',
		tagline: 'Nepal\'s most popular trekking peak, above 6,000 metres',
		summary:
			'Follow the classic Everest Base Camp trail as far as Chukhung, then turn up onto Imja Tse, fixed ropes and all, for a pre-dawn summit above 6,000 metres with Lhotse and Makalu on the skyline.',
		overview:
			'Island Peak (Imja Tse) is the trekking peak most climbers cut their teeth on, and for good reason: the approach follows the same Khumbu trail as our Everest Base Camp trek, so the altitude gain is gradual and the villages are the same Sherpa teahouses. The difference comes at Chukhung, where the route turns up onto glacier and fixed rope. A full day of climbing training at Base Camp covers ascending and descending on jumar and figure-eight before the summit push itself, which starts well before midnight to reach the top by sunrise.',
		days: 19,
		maxAltitude: '6,189 m · Island Peak Summit',
		difficulty: 'Strenuous',
		bestSeasons: 'Mar – May, Sep – Nov',
		groupSize: '2 – 6 climbers',
		startEnd: 'Kathmandu to Kathmandu (fly Lukla both ways)',
		price: 2650,
		priceNote: 'per person, includes climbing permit and technical guide',
		image: '/images/island-peak',
		imageAlt: 'Island Peak rising above the Chukhung valley, Khumbu region',
		gallery: [
			{ image: '/images/ebc-ridge', alt: 'Trekkers climbing a rocky ridge above the Khumbu Valley' }
		],
		highlights: [
			'Summit a genuine 6,000-metre peak with fixed ropes and a qualified climbing guide',
			'Same Khumbu approach as Everest Base Camp, with a full climbing-skills day at Base Camp',
			'Sunrise summit views of Lhotse, Makalu, Baruntse, and Ama Dablam',
			'Small climbing teams, capped at six, with a guide-to-climber ratio built for safety'
		],
		includes: [
			'Airport pickup and drop-off in Kathmandu',
			'Kathmandu to Lukla flights, both directions',
			'Sagarmatha National Park permit, TIMS card, and Island Peak climbing permit',
			'Teahouse accommodation on the approach, tented camp at Island Peak Base Camp',
			'Three meals a day while on the trail and at Base Camp',
			'A licensed climbing guide (1 guide per 2 climbers on summit day) and porters',
			'Group climbing gear: fixed rope, ice screws, snow bars',
			'First-aid kit and basic oxygen carried by your guide'
		],
		excludes: [
			'International airfare to and from Kathmandu',
			'Nepal entry visa fee (available on arrival)',
			'Travel and evacuation insurance (mandatory for climbing permits)',
			'Personal climbing gear rental (harness, crampons, ice axe, boots)',
			'Meals in Kathmandu outside the welcome dinner',
			'Hot showers, WiFi, and battery charging on the trail',
			'Tips for your guide and porters'
		],
		departures: [
			{ date: '2026-10-09', spotsLeft: 3 },
			{ date: '2026-11-06', spotsLeft: 1 },
			{ date: '2027-04-16', spotsLeft: 6 }
		]
	},
	{
		slug: 'ghorepani-poon-hill-trek',
		category: 'short-treks',
		name: 'Ghorepani Poon Hill Trek',
		region: 'Myagdi & Kaski Districts',
		tagline: 'A short, spectacular introduction to the Annapurna foothills',
		summary:
			'A compact week in the Annapurna foothills through rhododendron forest and hillside villages, climbing before dawn to Poon Hill for one of the widest mountain panoramas in Nepal.',
		overview:
			'Eight days is enough to reach real altitude and real views without the commitment of a full circuit. The trail climbs through terraced farmland and, in season, forest solid with blooming rhododendron, staying in Gurung and Magar villages built into the hillside. The pre-dawn climb to Poon Hill is the payoff: Dhaulagiri, Annapurna South, and Machapuchare in one unbroken sweep as the sun comes up. It is our most accessible trek and a common first booking for people deciding whether the Himalaya suits them.',
		days: 8,
		maxAltitude: '3,210 m · Poon Hill',
		difficulty: 'Moderate',
		bestSeasons: 'Mar – May, Sep – Dec',
		groupSize: '2 – 12 trekkers',
		startEnd: 'Kathmandu to Kathmandu (fly or drive via Pokhara)',
		price: 780,
		priceNote: 'per person, twin-share teahouse',
		image: '/images/poon-hill',
		imageAlt: 'Sunrise over the Dhaulagiri and Annapurna range seen from Poon Hill',
		gallery: [
			{ image: '/images/annapurna-bridge', alt: 'Suspension bridge over the glacial Marsyangdi river' }
		],
		highlights: [
			'Sunrise over Dhaulagiri, Annapurna South, and Machapuchare from Poon Hill',
			'Rhododendron forest in full bloom during the spring season',
			'Gurung and Magar hill villages built into terraced slopes',
			'Short enough to pair with a Kathmandu or Pokhara extension'
		],
		includes: [
			'Airport pickup and drop-off in Kathmandu',
			'Kathmandu to Pokhara flight or tourist bus, both directions',
			'Annapurna Conservation Area permit and TIMS card',
			'Teahouse accommodation for the full trek',
			'Three meals a day while on the trail',
			'A licensed English-speaking guide and porters (1 porter per 2 trekkers)',
			'Guide and porter wages, insurance, and equipment',
			'First-aid kit carried by your guide'
		],
		excludes: [
			'International airfare to and from Kathmandu',
			'Nepal entry visa fee (available on arrival)',
			'Travel and evacuation insurance',
			'Personal trekking gear',
			'Meals in Kathmandu and Pokhara outside the welcome dinner',
			'Hot showers, WiFi, and battery charging on the trail',
			'Tips for your guide and porters'
		],
		departures: [
			{ date: '2026-09-13', spotsLeft: 10 },
			{ date: '2026-10-25', spotsLeft: 4 },
			{ date: '2026-12-06', spotsLeft: 11 }
		]
	}
];

export function getTrekBySlug(slug: string): Trek | undefined {
	return treks.find((trek) => trek.slug === slug);
}
