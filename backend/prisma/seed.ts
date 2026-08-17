import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@windhorseexpeditions.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'windhorse-admin';

async function seedAdmin() {
	const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
	await prisma.admin.upsert({
		where: { email: ADMIN_EMAIL },
		create: { email: ADMIN_EMAIL, passwordHash, name: 'Site Admin' },
		update: { passwordHash }
	});
	console.log(`Admin ready: ${ADMIN_EMAIL}`);
}

async function seedSiteSettings() {
	const data: Omit<Prisma.SiteSettingsCreateInput, 'id'> = {
		seo: {
			title: 'Windhorse Expeditions | Himalayan Trekking & Expeditions, Nepal',
			description:
				'Small-group Himalayan trekking to Everest Base Camp, Annapurna Circuit, and Manaslu Circuit. Nepali-owned, permit-licensed, guide-led since 2009.'
		},
		nav: {
			brand: 'Windhorse',
			brandBadge: 'EXPEDITIONS',
			links: [
				{ href: '/treks', label: 'Treks' },
				{ href: '/about', label: 'About' },
				{ href: '/journal', label: 'Journal' },
				{ href: '/contact', label: 'Contact' }
			],
			ctaText: 'Plan Your Trek'
		},
		footer: {
			tagline:
				'A Nepali-owned trekking and expedition agency guiding small groups through the Khumbu, Annapurna, and Manaslu regions since 2009.',
			credentials: ['TAAN Member Agency', 'NTB Licensed', 'Govt. of Nepal Registered'],
			exploreLinks: [
				{ href: '/treks', label: 'Treks & Pricing' },
				{ href: '/treks/everest-base-camp', label: 'Everest Base Camp' },
				{ href: '/treks/annapurna-circuit', label: 'Annapurna Circuit' },
				{ href: '/treks/manaslu-circuit', label: 'Manaslu Circuit' },
				{ href: '/about', label: 'About Us' },
				{ href: '/journal', label: 'Journal' },
				{ href: '/contact', label: 'Contact' }
			],
			email: 'plan@windhorseexpeditions.com',
			address: 'Thamel, Kathmandu, Nepal',
			newsletterLabel: 'Trail dispatch, twice a year. No spam.',
			newsletterPlaceholder: 'you@example.com',
			newsletterButton: 'Subscribe',
			newsletterSuccess: "You're on the list. See you on the trail.",
			photoCredit:
				'Mountain photography and trail footage courtesy of Wikimedia Commons contributors and Amit Haware, used under CC BY-SA / CC BY 3.0.'
		},
		hero: {
			headlineLine1: 'Walk Among',
			headlineLine2: 'Giants',
			subhead:
				'Small-group treks to Everest, Annapurna, and Manaslu, guided by the Sherpa and Gurung families who call these trails home.',
			ctaText: 'Explore Treks',
			ctaHref: '#treks',
			posterImage: '/images/hero-poster',
			posterAlt: 'Snow-laden Himalayan ridge above the Khumbu Valley, clouds moving across the summit',
			videoSrc: '/video/hero-loop.mp4'
		},
		statsSection: {
			heading: 'Small teams. Real accountability.',
			body: 'Every guide on staff is Nepali, licensed, and trained in high-altitude rescue. We keep groups small enough that nobody gets left behind.',
			backgroundImage: '/images/ebc-trail'
		},
		whyGrid: {
			heading: 'Why Windhorse?',
			body: 'We have guided small groups through the Nepal Himalaya since 2009, and we are glad to detail our safety record to anyone who asks before booking.',
			items: [
				{
					icon: 'map-pinned',
					title: 'Local Himalayan Guides',
					body: 'Every lead guide grew up in the district they lead, from Khumbu to Manaslu, not flown in from Kathmandu for the season.'
				},
				{
					icon: 'heart-pulse',
					title: 'Safety-First on Every Trek',
					body: 'Guides carry pulse oximeters, check altitude symptoms daily, and hold the authority to turn a group back if it matters more than the schedule.'
				},
				{
					icon: 'wallet',
					title: 'Honest, All-In Pricing',
					body: 'What you see on the trek page is what you pay. Includes and excludes are listed in full before you book, not buried in fine print.'
				},
				{
					icon: 'users',
					title: 'Small-Group Standard',
					body: 'Most departures cap well under industry norms, some as low as six trekkers, so mornings move at a human pace.'
				},
				{
					icon: 'hand-heart',
					title: 'Fair-Wage Commitment',
					body: 'Guides and porters are paid above the TAAN minimum and insured for altitude work, not just for the trailhead.'
				},
				{
					icon: 'calendar-check',
					title: 'Guaranteed Departures',
					body: 'Once your seat is confirmed, the trek runs as planned, regardless of how many others sign up.'
				}
			]
		},
		regions: {
			heading: 'Three Regions,',
			headingAccent: 'One Range',
			body: "From the Khumbu icefall to Manaslu's restricted valleys, every trek we run stays inside Nepal's own Himalaya.",
			regions: [
				{
					name: 'Khumbu',
					trekCount: '2 Treks',
					href: '/treks/everest-base-camp',
					image: '/images/ebc-card',
					imageAlt: 'Prayer flags near Everest Base Camp with the Khumbu icefall behind'
				},
				{
					name: 'Annapurna',
					trekCount: '2 Treks',
					href: '/treks/annapurna-circuit',
					image: '/images/annapurna-card',
					imageAlt: 'Prayer-flagged cairns atop the Thorong La, Annapurna Circuit'
				},
				{
					name: 'Manaslu',
					trekCount: '1 Trek',
					href: '/treks/manaslu-circuit',
					image: '/images/manaslu-card',
					imageAlt: "The gateway chorten at Ro village with Manaslu's summit rising behind"
				}
			]
		},
		activities: {
			heading: 'Activities We Offer',
			body: 'Every route below is led by a guide who specialises in exactly that kind of trip.',
			activities: [
				{
					title: 'Trekking in Nepal',
					badge: '4 Treks',
					href: '/treks',
					image: '/images/ebc-ridge',
					imageAlt: 'Trekkers climbing a rocky ridge above the Khumbu Valley'
				},
				{
					title: 'Peak Climbing',
					badge: '1 Climb',
					href: '/treks/island-peak-climbing',
					image: '/images/island-peak',
					imageAlt: 'Island Peak rising above the Chukhung valley, Khumbu region'
				},
				{
					title: 'Short Treks',
					badge: '1 Trek',
					href: '/treks/ghorepani-poon-hill-trek',
					image: '/images/poon-hill',
					imageAlt: 'Sunrise over the Dhaulagiri and Annapurna range seen from Poon Hill'
				},
				{
					title: 'Custom & Private Departures',
					badge: 'Tailor-Made',
					href: '/contact',
					image: '/images/annapurna-bridge',
					imageAlt: 'Suspension bridge over the glacial Marsyangdi river'
				}
			]
		},
		trailStory: {
			headlineLine1: 'Run from Thamel,',
			headlineLine2: 'not a franchise abroad.',
			body: 'Windhorse has guided small groups through the Khumbu, Annapurna, and Manaslu regions since 2009, with a guiding team that grew up on these trails.',
			ctaText: 'Our story',
			ctaHref: '/about',
			backgroundImage: '/images/manaslu-distant',
			backgroundAlt: "Manaslu's sharp summit against a clear sky, seen from a distance",
			midImage: '/images/ebc-ridge',
			midAlt: 'Trekkers climbing a rocky ridge silhouetted against the sky, Khumbu region',
			foregroundImage: '/images/ebc-card',
			foregroundAlt: 'Prayer flags in the foreground with a glaciated peak beyond'
		},
		ebcTiers: {
			heading: 'Everest Base Camp, Your Way',
			body: 'Three ways to reach Base Camp, from classic teahouse trekking to full comfort with a helicopter return.',
			tiers: [
				{
					badge: 'Classic',
					name: 'Everest Base Camp Trek',
					days: 13,
					price: 1450,
					description:
						'Our original itinerary: teahouse lodging the full way in and out, ideal for anyone comfortable with the extra two days on foot.',
					features: [
						{ label: '3-star hotel in Kathmandu', included: true },
						{ label: 'Standard teahouse lodging', included: true },
						{ label: 'Electric blankets', included: false },
						{ label: 'WiFi & charging', included: false },
						{ label: 'Helicopter return', included: false }
					],
					href: '/treks/everest-base-camp',
					cta: 'View Itinerary'
				},
				{
					badge: 'Comfort',
					name: 'EBC with Helicopter Return',
					days: 11,
					price: 2350,
					description:
						'The full walk in, then skip the two-day walk out with a scenic helicopter flight straight back to Kathmandu.',
					features: [
						{ label: '3-star hotel in Kathmandu', included: true },
						{ label: 'Standard teahouse lodging', included: true },
						{ label: 'Electric blankets', included: false },
						{ label: 'WiFi & charging', included: false },
						{ label: 'Helicopter return', included: true }
					],
					href: '/contact',
					cta: 'Enquire About This Option'
				},
				{
					badge: 'Luxury',
					name: 'EBC Private & Luxury Trek',
					days: 13,
					price: 3250,
					description:
						'Same route, upgraded comfort: better lodges, private rooms, and small luxuries that matter at altitude.',
					features: [
						{ label: '5-star hotel in Kathmandu', included: true },
						{ label: 'Upgraded lodges', included: true },
						{ label: 'Electric blankets', included: true },
						{ label: 'WiFi & charging', included: true },
						{ label: 'Helicopter return (optional)', included: true }
					],
					href: '/contact',
					cta: 'Enquire About This Option'
				}
			]
		},
		planYourTrek: {
			heading: 'Ready to walk among giants?',
			body: 'Tell us which trek and which season. A guide, not a call centre, will write back within two working days.',
			email: 'plan@windhorseexpeditions.com',
			phone: '+977 98-0123-4567'
		},
		about: {
			seo: {
				title: 'About Us | Windhorse Expeditions',
				description:
					'Windhorse Expeditions is a Nepali-owned trekking and expedition agency guiding small groups through the Khumbu, Annapurna, and Manaslu regions since 2009.'
			},
			banner: {
				image: '/images/manaslu-card',
				imageAlt: "The gateway chorten at Ro village with Manaslu's summit rising behind",
				eyebrow: 'About Us',
				title: 'Run from Thamel, not a franchise abroad',
				subtitle:
					'Windhorse Expeditions has guided small groups through the Nepal Himalaya since 2009. Here is how we actually operate.'
			},
			introParagraphs: [
				'Windhorse started with three guides and a single Everest Base Camp departure a year. The agency grew because those first groups sent their friends, not because of an advertising budget. Seventeen years later, the model has not changed: guides who grew up in the regions they lead, groups small enough to move at a human pace, and an office that answers the phone in Kathmandu, not a call centre three time zones away.',
				'We run a short, deliberate list of treks and climbs, and turn away work that would mean cutting corners on permits, insurance, or acclimatisation days. If a date is full, we say so.'
			],
			values: [
				{
					icon: 'shield-check',
					title: 'Safety before schedule',
					body: 'Every itinerary is built around real acclimatisation days, not the minimum a brochure can get away with. Guides carry the authority to turn a group back.'
				},
				{
					icon: 'hand-heart',
					title: 'Fair wages, always',
					body: 'Guides and porters are paid above the TAAN minimum, insured, and equipped properly for altitude. Nobody on our payroll carries more than the load limit.'
				},
				{
					icon: 'users',
					title: 'Small groups, on purpose',
					body: 'We cap most departures well under industry norms. It means slower mornings and a guide who knows your name by day two.'
				},
				{
					icon: 'mountain',
					title: 'Nepali-owned and run',
					body: 'Windhorse is not a foreign brand subcontracting to a local operator. The office in Thamel is the only office.'
				}
			],
			teamHeading: 'The guiding team',
			teamBody:
				'Thirty-four licensed guides on staff, all Nepali, all trained in Wilderness First Responder protocols and high-altitude rescue. Most lead treks in the districts they grew up in. Every group travels with one guide and porters at a ratio of one porter per two trekkers, never a single guide stretched across a crowd.',
			guides: [
				{
					name: 'Pemba Sherpa',
					role: 'Lead Guide, Everest Region',
					years: 14,
					bio: 'Grew up in Namche Bazaar, where his family has run a teahouse for three generations. Certified Wilderness First Responder.'
				},
				{
					name: 'Kumar Gurung',
					role: 'Lead Guide, Annapurna Region',
					years: 11,
					bio: 'Born in Ghandruk, in the hills below Annapurna South. Speaks Nepali, Gurung, and English.'
				},
				{
					name: 'Tenzin Lama',
					role: 'Lead Guide, Manaslu & Restricted Areas',
					years: 9,
					bio: 'Holds the restricted-area certification Manaslu requires, and grew up along the same old salt-trading route the trek now follows.'
				},
				{
					name: 'Nima Sherpa',
					role: 'Climbing Guide, Peak Climbing',
					years: 16,
					bio: 'Summited Island Peak more than sixty times. Has trained climbers on fixed rope and glacier travel since 2010.'
				}
			],
			credentialsHeading: 'Credentials on file',
			credentialsBody: 'Every credential below is renewed annually and available on request before you book.',
			credentials: [
				{
					name: 'TAAN Member Agency',
					body: 'Registered with the Trekking Agencies Association of Nepal, the trade body that sets guiding and porter-welfare standards.'
				},
				{
					name: 'NTB Licensed',
					body: 'Holds an active trekking and expedition licence from the Nepal Tourism Board, renewed annually.'
				},
				{
					name: 'Govt. of Nepal Registered',
					body: 'Incorporated and tax-registered as a Nepali company under the Company Act, not a foreign-owned pass-through.'
				}
			]
		},
		contact: {
			seo: {
				title: 'Contact | Windhorse Expeditions',
				description:
					'Get in touch with Windhorse Expeditions to plan your Everest Base Camp, Annapurna Circuit, or Manaslu Circuit trek.'
			},
			banner: {
				image: '/images/ebc-trail',
				imageAlt: 'Trail signpost above the Khumbu Valley with prayer flags in the distance',
				eyebrow: 'Contact',
				title: "Let's plan your trek",
				subtitle:
					'Tell us which route and which season. A guide, not a call centre, will write back within two working days.'
			},
			email: 'plan@windhorseexpeditions.com',
			phone: '+977 98-0123-4567',
			address: 'Thamel, Kathmandu, Nepal',
			hours: 'Sun – Fri, 9:00 – 18:00 NPT',
			sendNote: 'Sending opens your email app with this message pre-filled to plan@windhorseexpeditions.com.',
			nextStepsHeading: 'What happens next',
			nextStepsBody:
				'A guide who has led your trek before replies within two working days, usually with a couple of questions about your fitness and travel dates before confirming a spot.'
		},
		treksPage: {
			seo: {
				title: 'Treks & Pricing | Windhorse Expeditions',
				description:
					'Compare our Himalayan treks and climbs: signature circuits, peak climbing, and short treks. Duration, difficulty, and per-person pricing.'
			},
			banner: {
				image: '/images/annapurna-card',
				imageAlt: 'Prayer-flagged cairns atop the Thorong La, Annapurna Circuit',
				eyebrow: 'Treks &amp; Expeditions',
				title: 'Routes into the high Himalaya',
				subtitle:
					'Every departure is guide-led, permit-licensed, and capped in size. Pick a trek below for the full day-by-day itinerary and pricing.'
			}
		},
		journalPage: {
			seo: {
				title: 'Journal | Windhorse Expeditions',
				description:
					'Practical trip-planning notes from Windhorse Expeditions: packing lists, permit explainers, and altitude safety guidance for Nepal treks.'
			},
			banner: {
				image: '/images/ebc-trail',
				imageAlt: 'Trail signpost above the Khumbu Valley with prayer flags in the distance',
				eyebrow: 'Journal',
				title: 'Notes from the trail',
				subtitle: 'Practical planning guidance, written by the people who run these treks, not repurposed marketing copy.'
			}
		},
		trekDetailLabels: {
			highlightsHeading: 'Trip highlights',
			costHeading: "Cost & what's included",
			includedHeading: 'Included',
			notIncludedHeading: 'Not included',
			departuresHeading: 'Upcoming departures',
			privateDeparturesNote: "Don't see a date that works? We also arrange private departures for groups of 2 or more.",
			itineraryHeading: 'The route, day by day',
			itineraryDescriptionTemplate:
				'This is the exact itinerary our {trekName} groups follow, built around real acclimatisation, not a rushed schedule.'
		},
		journalDetailLabels: {
			moreHeading: 'More from the journal'
		}
	};

	await prisma.siteSettings.upsert({
		where: { id: 1 },
		create: { id: 1, ...data },
		update: data
	});
	console.log('Site settings seeded');
}

type SeedItineraryDay = {
	day: number;
	title: string;
	location: string;
	elevation: string;
	description: string;
};

type SeedTrek = {
	slug: string;
	category: 'SIGNATURE' | 'PEAK_CLIMBING' | 'SHORT_TREKS';
	name: string;
	region: string;
	tagline: string;
	summary: string;
	overview: string;
	days: number;
	maxAltitude: string;
	difficulty: 'MODERATE' | 'CHALLENGING' | 'STRENUOUS';
	bestSeasons: string;
	groupSize: string;
	startEnd: string;
	price: number;
	priceNote: string;
	image: string;
	imageAlt: string;
	gallery: { image: string; alt: string }[];
	highlights: string[];
	includes: string[];
	excludes: string[];
	departures: { date: string; spotsLeft: number }[];
	itinerary: SeedItineraryDay[];
};

const treks: SeedTrek[] = [
	{
		slug: 'everest-base-camp',
		category: 'SIGNATURE',
		name: 'Everest Base Camp',
		region: 'Khumbu, Solukhumbu District',
		tagline: "To the foot of the world's highest mountain",
		summary:
			'Fly into Lukla, follow the Dudh Kosi through pine forest and Sherpa villages, and climb through Namche and Tengboche to stand on the Khumbu Glacier beneath the South Face.',
		overview:
			'The classic. Thirteen days from Lukla to Kala Patthar and back, built around two proper acclimatisation days so the altitude gain stays honest rather than reckless. You will sleep in family-run teahouses the whole way, cross the Dudh Kosi on the same swaying bridges every EBC trekker photographs, and stand on the Khumbu Glacier itself, beneath the icefall that climbers on summit attempts must pass through before dawn.',
		days: 13,
		maxAltitude: '5,364 m · Kala Patthar',
		difficulty: 'CHALLENGING',
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
		],
		itinerary: [
			{
				day: 1,
				title: 'Fly to Lukla, trek to Phakding',
				location: 'Lukla → Phakding',
				elevation: '2,610 m → 2,610 m',
				description:
					'A short, dramatic flight into Tenzing-Hillary Airport, then an easy afternoon descent along the Dudh Kosi to Phakding to acclimatise.'
			},
			{
				day: 2,
				title: 'Into the Sagarmatha park',
				location: 'Phakding → Namche Bazaar',
				elevation: '2,610 m → 3,440 m',
				description:
					'A long climb through pine forest and suspension bridges over the Dudh Kosi, entering Sagarmatha National Park before the final switchback push into Namche.'
			},
			{
				day: 3,
				title: 'Acclimatisation day',
				location: 'Namche Bazaar',
				elevation: '3,440 m',
				description:
					'A rest day with a purpose: a walk up to the Everest View Hotel for a first sight of Everest, Lhotse, and Ama Dablam before returning to sleep low.'
			},
			{
				day: 4,
				title: 'Along the Khumbu wall',
				location: 'Namche Bazaar → Tengboche',
				elevation: '3,440 m → 3,860 m',
				description:
					'A ridge-line trail with the first full views of Ama Dablam, descending to the Imja Khola before the climb to Tengboche monastery in time for evening prayer.'
			},
			{
				day: 5,
				title: 'Toward the Amphu range',
				location: 'Tengboche → Dingboche',
				elevation: '3,860 m → 4,410 m',
				description:
					'Through rhododendron forest and past mani walls into the wide Imja Valley, with the terrain opening out beneath Lhotse and Island Peak.'
			},
			{
				day: 6,
				title: 'Second acclimatisation day',
				location: 'Dingboche',
				elevation: '4,410 m',
				description:
					'An optional climb to Nangkartshang viewpoint at 5,083 metres, the last major altitude gain before Base Camp, then a slow afternoon in the village.'
			},
			{
				day: 7,
				title: 'Above the tree line',
				location: 'Dingboche → Lobuche',
				elevation: '4,410 m → 4,940 m',
				description:
					"Bare, wind-scoured terrain past the Thukla memorials for climbers lost on Everest, then along the Khumbu Glacier's lateral moraine to Lobuche."
			},
			{
				day: 8,
				title: 'To the foot of Everest',
				location: 'Lobuche → Gorak Shep → Everest Base Camp',
				elevation: '4,940 m → 5,364 m → 5,180 m',
				description:
					'Onto the glacier itself, weaving between ice pinnacles to reach Base Camp beneath the Khumbu Icefall, then back to Gorak Shep for the night.'
			},
			{
				day: 9,
				title: 'Sunrise from Kala Patthar',
				location: 'Gorak Shep → Kala Patthar → Pheriche',
				elevation: '5,364 m → 4,240 m',
				description:
					"A pre-dawn climb to Kala Patthar for the clearest possible view of Everest's summit pyramid, then a long descent back down the valley to Pheriche."
			},
			{
				day: 10,
				title: 'Back through the forest',
				location: 'Pheriche → Namche Bazaar',
				elevation: '4,240 m → 3,440 m',
				description:
					'Retracing the trail through Tengboche and the Imja Khola gorge, with the descent noticeably easier on lungs already adjusted to thinner air.'
			},
			{
				day: 11,
				title: 'Down to the Dudh Kosi',
				location: 'Namche Bazaar → Lukla',
				elevation: '3,440 m → 2,860 m',
				description:
					'A final full day of trekking, retracing the suspension bridges and pine forest back to Lukla for a last night in the mountains.'
			},
			{
				day: 12,
				title: 'Fly to Kathmandu',
				location: 'Lukla → Kathmandu',
				elevation: '2,860 m → 1,400 m',
				description:
					"A morning flight back over the foothills, with a free afternoon in the capital to rest, shower properly, and mark the trek's end."
			},
			{
				day: 13,
				title: 'Departure',
				location: 'Kathmandu',
				elevation: '1,400 m',
				description: 'International departure, or the start of an extension. Airport transfer included regardless of flight time.'
			}
		]
	},
	{
		slug: 'annapurna-circuit',
		category: 'SIGNATURE',
		name: 'Annapurna Circuit',
		region: 'Manang & Mustang Districts',
		tagline: 'A full circle around the Annapurna massif',
		summary:
			'Cross from subtropical rice terraces to the high Tibetan plateau, over the Thorong La at 5,416 metres, descending through Muktinath into the Kali Gandaki, the deepest gorge on earth.',
		overview:
			"Sixteen days that change landscape almost daily: rice terraces and waterfalls in the low villages, pine forest into Manang, then the bare, wind-scoured approach to Thorong La itself. The pass crossing is long and cold, usually started before dawn, and it drops you into Mustang's high desert on the other side, a different country in every way but the passport. Natural hot springs at Tatopani take the edge off the descent.",
		days: 16,
		maxAltitude: '5,416 m · Thorong La Pass',
		difficulty: 'STRENUOUS',
		bestSeasons: 'Mar – May, Oct – Nov',
		groupSize: '2 – 12 trekkers',
		startEnd: 'Kathmandu to Kathmandu (drive Besisahar out, fly Jomsom back)',
		price: 1590,
		priceNote: 'per person, twin-share teahouse',
		image: '/images/annapurna-card',
		imageAlt: 'Prayer-flagged cairns atop the Thorong La at 5,416 metres, Annapurna Circuit',
		gallery: [{ image: '/images/annapurna-bridge', alt: 'Suspension bridge over the glacial Marsyangdi river' }],
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
		],
		itinerary: [
			{
				day: 1,
				title: 'Drive to the trailhead',
				location: 'Kathmandu → Syange',
				elevation: '1,400 m → 1,100 m',
				description: 'A long, scenic drive along the Trisuli and Marsyangdi rivers to Syange, where the road ends and the trail begins.'
			},
			{
				day: 2,
				title: 'Into the Manang valley',
				location: 'Syange → Dharapani',
				elevation: '1,100 m → 1,960 m',
				description: 'Waterfalls and rice terraces give way to pine as the valley narrows, entering the Manang district proper.'
			},
			{
				day: 3,
				title: 'Toward the high villages',
				location: 'Dharapani → Chame',
				elevation: '1,960 m → 2,710 m',
				description: 'A forested climb with the first real views of Annapurna II, ending in Chame, the district headquarters.'
			},
			{
				day: 4,
				title: 'The Paungda Danda rock face',
				location: 'Chame → Pisang',
				elevation: '2,710 m → 3,300 m',
				description: 'Apple orchards and a dramatic curved rock wall mark the approach into Pisang, the valley opening wide.'
			},
			{
				day: 5,
				title: 'The high route to Manang',
				location: 'Pisang → Manang',
				elevation: '3,300 m → 3,540 m',
				description:
					'The upper trail via Ghyaru and Ngawal, slower but far better for acclimatisation, with constant views of Annapurna III and Gangapurna.'
			},
			{
				day: 6,
				title: 'Acclimatisation day',
				location: 'Manang',
				elevation: '3,540 m',
				description: 'A side hike up to the Gangapurna viewpoint or Ice Lake, high enough to matter, low enough to sleep safely afterward.'
			},
			{
				day: 7,
				title: 'Above the tree line',
				location: 'Manang → Yak Kharka',
				elevation: '3,540 m → 4,050 m',
				description: 'A short, deliberately easy day, the trees thinning out completely as the valley turns to scrub and rock.'
			},
			{
				day: 8,
				title: 'To the foot of the pass',
				location: 'Yak Kharka → Thorong Phedi',
				elevation: '4,050 m → 4,525 m',
				description: "A steep, exposed climb to the staging point for tomorrow's crossing, with an early dinner and an early night."
			},
			{
				day: 9,
				title: 'Crossing the Thorong La',
				location: 'Thorong Phedi → Thorong La → Muktinath',
				elevation: '4,525 m → 5,416 m → 3,760 m',
				description:
					"A pre-dawn start for the pass itself, the trek's high point in every sense, then a long knee-testing descent into Mustang and the pilgrimage town of Muktinath."
			},
			{
				day: 10,
				title: "Into Mustang's high desert",
				location: 'Muktinath → Jomsom',
				elevation: '3,760 m → 2,720 m',
				description: "Wind-carved cliffs and a completely different palette, following the Kali Gandaki downstream past Kagbeni's medieval alleys."
			},
			{
				day: 11,
				title: 'Down the gorge',
				location: 'Jomsom → Kalopani',
				elevation: '2,720 m → 2,530 m',
				description: 'Following the Kali Gandaki, the deepest gorge on earth, with Dhaulagiri and Annapurna I visible on either bank.'
			},
			{
				day: 12,
				title: 'Hot springs at Tatopani',
				location: 'Kalopani → Tatopani',
				elevation: '2,530 m → 1,190 m',
				description: 'A long descent rewarded by natural hot springs, the first real chance to soak tired legs since Syange.'
			},
			{
				day: 13,
				title: 'Into the rhododendron forest',
				location: 'Tatopani → Ghorepani',
				elevation: '1,190 m → 2,860 m',
				description: "The trek's steepest sustained climb, through forest that turns solid red and pink when the rhododendron blooms."
			},
			{
				day: 14,
				title: 'Sunrise from Poon Hill',
				location: 'Ghorepani → Poon Hill → Tikhedhunga',
				elevation: '2,860 m → 3,210 m → 1,540 m',
				description:
					'A pre-dawn climb for the classic panorama of Dhaulagiri and the Annapurna range, then a long final descent through terraced farmland.'
			},
			{
				day: 15,
				title: 'To Pokhara',
				location: 'Tikhedhunga → Nayapul → Pokhara',
				elevation: '1,540 m → 950 m',
				description: "The last trekking morning ends at the Nayapul trailhead, with a short drive to Pokhara's lakeside for a proper rest."
			},
			{
				day: 16,
				title: 'Return to Kathmandu',
				location: 'Pokhara → Kathmandu',
				elevation: '950 m → 1,400 m',
				description: 'A short flight or scenic drive back to the capital, with the afternoon free before your onward journey.'
			}
		]
	},
	{
		slug: 'manaslu-circuit',
		category: 'SIGNATURE',
		name: 'Manaslu Circuit',
		region: 'Gorkha District',
		tagline: 'The quiet trail around the eighth-highest peak',
		summary:
			"A restricted-area trek along the old salt-trading route to Tibet, through Gurung and Tibetan villages far removed from the crowds, crossing the Larkya La beneath Manaslu's north face.",
		overview:
			"Manaslu requires a restricted-area permit and a minimum of two trekkers travelling with a registered agency, which keeps the trail genuinely quiet. Fourteen days follow the Budhi Gandaki upstream through Gurung villages, then Tibetan-influenced settlements as the valley narrows toward the Larkya La. The pass crossing, beneath Manaslu's north face, is the physical and emotional high point before a long descent into the Marsyangdi valley.",
		days: 14,
		maxAltitude: '5,106 m · Larkya La Pass',
		difficulty: 'STRENUOUS',
		bestSeasons: 'Apr – May, Sep – Oct',
		groupSize: '2 – 8 trekkers',
		startEnd: 'Kathmandu to Kathmandu (drive both ways)',
		price: 2290,
		priceNote: 'per person, twin-share teahouse, permit included',
		image: '/images/manaslu-card',
		imageAlt: "The gateway chorten at Ro village with Manaslu's summit rising behind",
		gallery: [
			{ image: '/images/manaslu-distant', alt: "Manaslu's sharp summit against a clear sky" },
			{ image: '/images/manaslu-lake', alt: 'The Manaslu range at dawn, mirrored in a still glacial lake' }
		],
		highlights: [
			'Restricted-area permit, far fewer trekkers than EBC or Annapurna',
			"Cross the Larkya La beneath Manaslu's north face",
			'Tibetan-influenced villages along the old salt-trading route',
			"Close views of Manaslu, the world's eighth-highest peak"
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
		],
		itinerary: [
			{
				day: 1,
				title: 'Drive to the trailhead',
				location: 'Kathmandu → Machha Khola',
				elevation: '1,400 m → 930 m',
				description: 'A rough, scenic drive along the Budhi Gandaki to the roadhead village where the trek begins.'
			},
			{
				day: 2,
				title: 'Upriver into the gorge',
				location: 'Machha Khola → Jagat',
				elevation: '930 m → 1,340 m',
				description: 'The trail follows the Budhi Gandaki through landslide-cut cliffs and small Gurung settlements.'
			},
			{
				day: 3,
				title: 'The permit checkpoint',
				location: 'Jagat → Deng',
				elevation: '1,340 m → 1,860 m',
				description: 'Restricted-area permits are checked at Jagat before the valley narrows further, entering genuinely quiet trail.'
			},
			{
				day: 4,
				title: 'Into Tibetan-influenced country',
				location: 'Deng → Namrung',
				elevation: '1,860 m → 2,630 m',
				description: 'The architecture and prayer flags shift noticeably as the valley climbs toward the Tibetan plateau.'
			},
			{
				day: 5,
				title: 'First views of Manaslu',
				location: 'Namrung → Lho',
				elevation: '2,630 m → 3,180 m',
				description: "A short day by design, ending at a village with the trek's first uninterrupted view of Manaslu itself."
			},
			{
				day: 6,
				title: 'To the foot of the mountain',
				location: 'Lho → Samagaon',
				elevation: '3,180 m → 3,530 m',
				description: "Samagaon sits almost beneath Manaslu's south face, a Tibetan-influenced village that anchors two rest days."
			},
			{
				day: 7,
				title: 'Acclimatisation day',
				location: 'Samagaon',
				elevation: '3,530 m',
				description: 'A side hike to Manaslu Base Camp or Birendra Lake, both high enough to aid acclimatisation before Samdo.'
			},
			{
				day: 8,
				title: 'Toward the Tibet border',
				location: 'Samagaon → Samdo',
				elevation: '3,530 m → 3,860 m',
				description: 'A short climb to the last permanent village before the pass, close enough to Tibet to trade with it historically.'
			},
			{
				day: 9,
				title: 'Staging for the pass',
				location: 'Samdo → Dharamsala (Larke Phedi)',
				elevation: '3,860 m → 4,460 m',
				description: "A short day to the high camp, saving strength for tomorrow's crossing of the Larkya La."
			},
			{
				day: 10,
				title: 'Crossing the Larkya La',
				location: 'Dharamsala → Larkya La → Bimthang',
				elevation: '4,460 m → 5,106 m → 3,720 m',
				description:
					"A long, cold, pre-dawn crossing beneath Manaslu's north face, the trek's high point, descending into the Marsyangdi valley on the far side."
			},
			{
				day: 11,
				title: 'Down into the forest',
				location: 'Bimthang → Dharapani',
				elevation: '3,720 m → 1,960 m',
				description: "A long descent through pine and rhododendron, rejoining the Annapurna Circuit's lower trail network."
			},
			{
				day: 12,
				title: 'Drive back to Kathmandu',
				location: 'Dharapani → Kathmandu',
				elevation: '1,960 m → 1,400 m',
				description: "A full day's drive back to the capital, following the same river valleys in reverse."
			},
			{
				day: 13,
				title: 'Contingency day',
				location: 'Kathmandu',
				elevation: '1,400 m',
				description: 'A built-in buffer for flight delays earlier in the trip, or simply a free day to rest before departure.'
			},
			{
				day: 14,
				title: 'Departure',
				location: 'Kathmandu',
				elevation: '1,400 m',
				description: 'International departure. Airport transfer included regardless of flight time.'
			}
		]
	},
	{
		slug: 'island-peak-climbing',
		category: 'PEAK_CLIMBING',
		name: 'Island Peak Climbing',
		region: 'Khumbu, Solukhumbu District',
		tagline: "Nepal's most popular trekking peak, above 6,000 metres",
		summary:
			'Follow the classic Everest Base Camp trail as far as Chukhung, then turn up onto Imja Tse, fixed ropes and all, for a pre-dawn summit above 6,000 metres with Lhotse and Makalu on the skyline.',
		overview:
			'Island Peak (Imja Tse) is the trekking peak most climbers cut their teeth on, and for good reason: the approach follows the same Khumbu trail as our Everest Base Camp trek, so the altitude gain is gradual and the villages are the same Sherpa teahouses. The difference comes at Chukhung, where the route turns up onto glacier and fixed rope. A full day of climbing training at Base Camp covers ascending and descending on jumar and figure-eight before the summit push itself, which starts well before midnight to reach the top by sunrise.',
		days: 19,
		maxAltitude: '6,189 m · Island Peak Summit',
		difficulty: 'STRENUOUS',
		bestSeasons: 'Mar – May, Sep – Nov',
		groupSize: '2 – 6 climbers',
		startEnd: 'Kathmandu to Kathmandu (fly Lukla both ways)',
		price: 2650,
		priceNote: 'per person, includes climbing permit and technical guide',
		image: '/images/island-peak',
		imageAlt: 'Island Peak rising above the Chukhung valley, Khumbu region',
		gallery: [{ image: '/images/ebc-ridge', alt: 'Trekkers climbing a rocky ridge above the Khumbu Valley' }],
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
		],
		itinerary: [
			{
				day: 1,
				title: 'Fly to Lukla, trek to Phakding',
				location: 'Lukla → Phakding',
				elevation: '2,610 m → 2,610 m',
				description: 'The same first steps as our Everest Base Camp trek, an easy afternoon down the Dudh Kosi to acclimatise.'
			},
			{
				day: 2,
				title: 'Into the Sagarmatha park',
				location: 'Phakding → Namche Bazaar',
				elevation: '2,610 m → 3,440 m',
				description: 'A long climb through pine forest and suspension bridges, entering Sagarmatha National Park before Namche.'
			},
			{
				day: 3,
				title: 'Acclimatisation day',
				location: 'Namche Bazaar',
				elevation: '3,440 m',
				description: 'A walk up to the Everest View Hotel for a first sight of Everest, Lhotse, and Ama Dablam before sleeping low.'
			},
			{
				day: 4,
				title: 'Along the Khumbu wall',
				location: 'Namche Bazaar → Tengboche',
				elevation: '3,440 m → 3,860 m',
				description: 'A ridge-line trail with full views of Ama Dablam, climbing to Tengboche monastery by evening.'
			},
			{
				day: 5,
				title: 'Into the Imja Valley',
				location: 'Tengboche → Dingboche',
				elevation: '3,860 m → 4,410 m',
				description: 'Through rhododendron forest and mani walls into the wide valley beneath Lhotse and Island Peak itself.'
			},
			{
				day: 6,
				title: 'Second acclimatisation day',
				location: 'Dingboche',
				elevation: '4,410 m',
				description: 'An optional climb to Nangkartshang viewpoint at 5,083 metres, the last major altitude gain before Chukhung.'
			},
			{
				day: 7,
				title: 'Toward the climbing valley',
				location: 'Dingboche → Chukhung',
				elevation: '4,410 m → 4,730 m',
				description: 'A short day up the side valley that ends at Chukhung, the last village before Island Peak Base Camp.'
			},
			{
				day: 8,
				title: 'To Island Peak Base Camp',
				location: 'Chukhung → Island Peak Base Camp',
				elevation: '4,730 m → 5,087 m',
				description: 'Onto moraine and scree above the tree line, making camp within sight of the route up Imja Tse.'
			},
			{
				day: 9,
				title: 'Climbing training day',
				location: 'Island Peak Base Camp',
				elevation: '5,087 m',
				description: 'A full day on the training slope with your climbing guide: ascending and descending on jumar, fixed rope, and crampon technique.'
			},
			{
				day: 10,
				title: 'To High Camp',
				location: 'Base Camp → High Camp',
				elevation: '5,087 m → 5,600 m',
				description: 'A short, steep climb to an exposed high camp, with an early dinner ahead of a pre-midnight start.'
			},
			{
				day: 11,
				title: 'Summit day',
				location: 'High Camp → Island Peak Summit → Chukhung',
				elevation: '5,600 m → 6,189 m → 4,730 m',
				description: 'A pre-dawn climb on fixed rope to the summit ridge, with Lhotse and Makalu on the skyline, then a long descent back to Chukhung.'
			},
			{
				day: 12,
				title: 'Weather contingency day',
				location: 'Chukhung',
				elevation: '4,730 m',
				description: 'A built-in buffer for summit-day weather delays, or simply a rest day if the climb went to plan.'
			},
			{
				day: 13,
				title: 'Back through the valley',
				location: 'Chukhung → Dingboche → Pheriche',
				elevation: '4,730 m → 4,240 m',
				description: 'Retracing the trail down the Imja Valley, the descent noticeably easier on lungs adjusted to thinner air.'
			},
			{
				day: 14,
				title: 'Through the forest',
				location: 'Pheriche → Namche Bazaar',
				elevation: '4,240 m → 3,440 m',
				description: 'Back through Tengboche and the Imja Khola gorge to Namche for a last proper shower.'
			},
			{
				day: 15,
				title: 'Down to the Dudh Kosi',
				location: 'Namche Bazaar → Lukla',
				elevation: '3,440 m → 2,860 m',
				description: 'A final full trekking day, retracing the suspension bridges and pine forest back to Lukla.'
			},
			{
				day: 16,
				title: 'Fly to Kathmandu',
				location: 'Lukla → Kathmandu',
				elevation: '2,860 m → 1,400 m',
				description: 'A morning flight back over the foothills, with a well-earned rest in the capital.'
			},
			{
				day: 17,
				title: 'Flight contingency day',
				location: 'Kathmandu',
				elevation: '1,400 m',
				description: 'A buffer for Lukla flight delays, common enough in the Khumbu that we build it in as standard.'
			},
			{
				day: 18,
				title: 'Free day in Kathmandu',
				location: 'Kathmandu',
				elevation: '1,400 m',
				description: 'A free day to explore Kathmandu, with a farewell dinner to mark the climb.'
			},
			{
				day: 19,
				title: 'Departure',
				location: 'Kathmandu',
				elevation: '1,400 m',
				description: 'International departure. Airport transfer included regardless of flight time.'
			}
		]
	},
	{
		slug: 'ghorepani-poon-hill-trek',
		category: 'SHORT_TREKS',
		name: 'Ghorepani Poon Hill Trek',
		region: 'Myagdi & Kaski Districts',
		tagline: 'A short, spectacular introduction to the Annapurna foothills',
		summary:
			'A compact week in the Annapurna foothills through rhododendron forest and hillside villages, climbing before dawn to Poon Hill for one of the widest mountain panoramas in Nepal.',
		overview:
			'Eight days is enough to reach real altitude and real views without the commitment of a full circuit. The trail climbs through terraced farmland and, in season, forest solid with blooming rhododendron, staying in Gurung and Magar villages built into the hillside. The pre-dawn climb to Poon Hill is the payoff: Dhaulagiri, Annapurna South, and Machapuchare in one unbroken sweep as the sun comes up. It is our most accessible trek and a common first booking for people deciding whether the Himalaya suits them.',
		days: 8,
		maxAltitude: '3,210 m · Poon Hill',
		difficulty: 'MODERATE',
		bestSeasons: 'Mar – May, Sep – Dec',
		groupSize: '2 – 12 trekkers',
		startEnd: 'Kathmandu to Kathmandu (fly or drive via Pokhara)',
		price: 780,
		priceNote: 'per person, twin-share teahouse',
		image: '/images/poon-hill',
		imageAlt: 'Sunrise over the Dhaulagiri and Annapurna range seen from Poon Hill',
		gallery: [{ image: '/images/annapurna-bridge', alt: 'Suspension bridge over the glacial Marsyangdi river' }],
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
		],
		itinerary: [
			{
				day: 1,
				title: 'To the trailhead',
				location: 'Kathmandu → Pokhara → Nayapul → Tikhedhunga',
				elevation: '1,400 m → 820 m → 1,540 m',
				description: 'A flight or drive to Pokhara, then a short transfer to Nayapul where the trail begins, climbing gently to Tikhedhunga.'
			},
			{
				day: 2,
				title: 'Into the rhododendron forest',
				location: 'Tikhedhunga → Ghorepani',
				elevation: '1,540 m → 2,860 m',
				description: "The trek's steepest day, a long stone staircase through forest that turns solid red and pink in bloom season."
			},
			{
				day: 3,
				title: 'Sunrise from Poon Hill',
				location: 'Ghorepani → Poon Hill → Tadapani',
				elevation: '2,860 m → 3,210 m → 2,630 m',
				description: 'A pre-dawn climb for the classic panorama of Dhaulagiri, Annapurna South, and Machapuchare, then on to Tadapani.'
			},
			{
				day: 4,
				title: 'Down to the Gurung villages',
				location: 'Tadapani → Ghandruk',
				elevation: '2,630 m → 1,940 m',
				description: 'A forested descent into Ghandruk, one of the best-preserved Gurung villages in the Annapurna foothills.'
			},
			{
				day: 5,
				title: 'Hot springs at Jhinu Danda',
				location: 'Ghandruk → Jhinu Danda',
				elevation: '1,940 m → 1,780 m',
				description: "A shorter day ending at natural hot springs above the Modi Khola, the trek's reward before the final descent."
			},
			{
				day: 6,
				title: 'Back to Pokhara',
				location: 'Jhinu Danda → Nayapul → Pokhara',
				elevation: '1,780 m → 820 m',
				description: "The last trekking morning ends at Nayapul, with a short drive back to Pokhara's lakeside for a proper rest."
			},
			{
				day: 7,
				title: 'Return to Kathmandu',
				location: 'Pokhara → Kathmandu',
				elevation: '820 m → 1,400 m',
				description: 'A short flight or scenic drive back to the capital, with the afternoon free before your onward journey.'
			},
			{
				day: 8,
				title: 'Departure',
				location: 'Kathmandu',
				elevation: '1,400 m',
				description: 'International departure. Airport transfer included regardless of flight time.'
			}
		]
	}
];

async function seedTreks() {
	for (const [index, trek] of treks.entries()) {
		const { gallery, departures, itinerary, ...trekFields } = trek;
		await prisma.trek.upsert({
			where: { slug: trek.slug },
			create: {
				...trekFields,
				order: index,
				gallery: { create: gallery.map((g, order) => ({ ...g, order })) },
				departures: { create: departures.map((d) => ({ ...d, date: new Date(d.date) })) },
				itinerary: { create: itinerary }
			},
			update: {
				...trekFields,
				order: index,
				gallery: { deleteMany: {}, create: gallery.map((g, order) => ({ ...g, order })) },
				departures: { deleteMany: {}, create: departures.map((d) => ({ ...d, date: new Date(d.date) })) },
				itinerary: { deleteMany: {}, create: itinerary }
			}
		});
	}
	console.log(`Seeded ${treks.length} treks`);
}

const articles = [
	{
		slug: 'what-to-pack-for-everest-base-camp',
		title: 'What to pack for Everest Base Camp',
		excerpt:
			'A trek-tested layering system and gear list for the EBC trail, built around what actually gets used between Lukla and Kala Patthar.',
		category: 'Packing',
		readMinutes: 7,
		publishDate: '2026-02-11',
		image: '/images/ebc-ridge',
		imageAlt: 'Trekkers climbing a rocky ridge above the Khumbu Valley',
		sections: [
			{
				heading: 'Layer for a 40-degree swing',
				body: [
					'Namche sits around 3,440 metres and Kala Patthar is above 5,300. You will move through spring-jacket weather and well below freezing on the same trek, sometimes the same day. Three light-to-mid layers beat one heavy one: a base layer that manages sweat, an insulating mid layer, and a wind and waterproof shell. Add a down jacket for evenings and summit mornings.',
					'Skip cotton entirely. It holds moisture against your skin at altitude, which is exactly what you do not want on a cold morning at 5,000 metres.'
				]
			},
			{
				heading: 'Footwear is not the place to save weight',
				body: [
					'Broken-in, waterproof trekking boots with ankle support are non-negotiable. Buy them at least a month out and put real miles on them before you fly. Bring one pair of camp shoes or sandals for teahouse evenings, both to rest your feet and to keep boots dry overnight.',
					'Pack two pairs of proper trekking socks plus a thin liner sock for each. Blisters, not altitude, end more treks in the first three days than anything else.'
				]
			},
			{
				heading: 'Sleep system',
				body: [
					'Teahouses provide a bed and a blanket, not always enough for the altitude. A sleeping bag rated to at least minus 15 Celsius covers the Everest Base Camp route in any season we run it. If you would rather not fly with one, we arrange rental in Kathmandu for a small daily fee, quality-checked before it leaves our office.'
				]
			},
			{
				heading: 'The short list of things people forget',
				body: [
					'A headlamp with spare batteries, since batteries drain fast in the cold. Sunglasses rated for glacier glare, not ordinary sunglasses. Water purification tablets or a filter, since bottled water gets both expensive and wasteful above Namche. A basic first-aid kit with blister plasters and any personal medication, doubled up in case a bag goes missing on the Lukla flight.',
					'Your guide carries a full trek first-aid kit and a pulse oximeter, but the small personal items above are yours to bring.'
				]
			}
		]
	},
	{
		slug: 'nepal-trekking-permits-explained',
		title: 'Trekking permits in Nepal, explained',
		excerpt:
			'What a TIMS card, conservation area permit, and restricted-area permit actually cover, and why Manaslu costs more to enter than Everest or Annapurna.',
		category: 'Planning',
		readMinutes: 6,
		publishDate: '2026-01-22',
		image: '/images/ebc-trail',
		imageAlt: 'Trail signpost above the Khumbu Valley with prayer flags in the distance',
		sections: [
			{
				heading: 'TIMS: the baseline card',
				body: [
					"The Trekkers' Information Management System card is the baseline registration for almost every trekking route in Nepal. It exists so authorities know roughly how many trekkers are on a given trail, which matters for search and rescue coordination. We handle the application before you land; you just need passport photos and passport details in advance."
				]
			},
			{
				heading: 'National park and conservation area permits',
				body: [
					'Routes through Sagarmatha National Park (Everest region) or the Annapurna Conservation Area carry their own entry permit, priced per trek and funding park maintenance and ranger staff. These are checked at physical gates on the trail, so we carry printed copies for the whole group, not just digital records.'
				]
			},
			{
				heading: 'Restricted areas: why Manaslu costs more',
				body: [
					"Manaslu sits close enough to the Tibet border that the route falls under a restricted-area permit, issued directly by Nepal's Department of Immigration rather than a park office. It requires a minimum of two trekkers travelling with a registered agency, a licensed guide for the full route, and a higher permit fee that scales with season. This is the main reason Manaslu costs more than Everest Base Camp for a similar number of days: the permit itself, not the trail.",
					'The upside is real. Restricted-area status keeps trekker numbers low, which is most of why Manaslu still feels quiet compared to the Khumbu.'
				]
			},
			{
				heading: 'What you actually need to bring',
				body: [
					'A passport valid for at least six months past your travel dates, four to six passport photos, and your Nepal visa (available on arrival at Kathmandu airport for most nationalities, or in advance). Everything else, we file.'
				]
			}
		]
	},
	{
		slug: 'altitude-sickness-what-actually-helps',
		title: 'Altitude sickness: what actually helps',
		excerpt:
			'The difference between normal breathlessness and real Acute Mountain Sickness, and the acclimatisation pattern that keeps groups moving safely.',
		category: 'Safety',
		readMinutes: 8,
		publishDate: '2025-12-04',
		image: '/images/manaslu-distant',
		imageAlt: "Manaslu's sharp summit against a clear sky",
		sections: [
			{
				heading: 'Breathlessness is normal. These symptoms are not',
				body: [
					'Above 3,000 metres, feeling short of breath on a climb is expected. A persistent headache that does not respond to water and rest, nausea, loss of appetite, disturbed sleep, or a feeling of mental fog are early signs of Acute Mountain Sickness (AMS), and worth telling your guide about immediately, even if they feel minor.',
					'The warning signs that mean stop ascending entirely: confusion, loss of coordination, a cough producing pink or frothy fluid, or severe breathlessness at rest. These can indicate High Altitude Pulmonary or Cerebral Oedema, both medical emergencies that require immediate descent, not medication and a wait-and-see approach.'
				]
			},
			{
				heading: 'Why our itineraries build in extra days',
				body: [
					'The most reliable prevention is a slow ascent rate, roughly 300 to 500 metres of net sleeping-altitude gain per day above 3,000 metres, with a rest day roughly every 900 to 1,000 metres. This is why the Everest Base Camp itinerary has dedicated acclimatisation days at Namche and Dingboche rather than a straight climb. Shortening these days is the single most common cause of AMS we see in trekkers who have joined us after a cancelled trip elsewhere.',
					'"Climb high, sleep low" is the practical version of this: a day hike to a higher point followed by a return to sleep lower helps the body adapt faster than staying flat at one altitude.'
				]
			},
			{
				heading: 'What we actually do about it',
				body: [
					"Every guide carries a pulse oximeter and checks oxygen saturation and pulse daily above 3,000 metres, logging it against how each trekker reports feeling. A guide has the authority to hold a trekker at altitude for an extra acclimatisation day, or send them down with a support crew member, regardless of the group's schedule. This is written into our operating procedure, not left to judgement calls under pressure.",
					'Diamox (acetazolamide) can help some trekkers acclimatise, taken as a preventive starting a day before ascending, but it is not a substitute for a sensible ascent rate and it will not mask serious symptoms safely. Talk to a travel medicine doctor before your trip if you are considering it, not your trekking guide on day four.'
				]
			}
		]
	}
];

async function seedArticles() {
	for (const article of articles) {
		const { sections, publishDate, ...rest } = article;
		await prisma.article.upsert({
			where: { slug: article.slug },
			create: { ...rest, publishDate: new Date(publishDate), sections },
			update: { ...rest, publishDate: new Date(publishDate), sections }
		});
	}
	console.log(`Seeded ${articles.length} articles`);
}

const testimonials = [
	{
		quote:
			'Our guide Pemba knew every teahouse owner by name from Phakding to Gorak Shep. That kind of welcome, you cannot book on a website.',
		name: 'Marit Solberg',
		location: 'Bergen, Norway',
		trek: 'Everest Base Camp, 2025',
		image: '/images/ebc-trail',
		imageAlt: 'Rocky trail with a signpost above the Khumbu Valley, prayer flags in the distance'
	},
	{
		quote:
			'Sixteen days and the group never once felt rushed. Crossing Thorong La at sunrise, above the cloud line, is the clearest my head has ever felt.',
		name: 'Diego Fernandez Rojas',
		location: 'Mendoza, Argentina',
		trek: 'Annapurna Circuit, 2024',
		image: '/images/annapurna-bridge',
		imageAlt: 'Suspension bridge over the glacial Marsyangdi river on the Annapurna Circuit'
	},
	{
		quote:
			'Manaslu felt like the Nepal our guide grew up in, not the Nepal on a postcard. Three villages the whole trip, and we were the only trekkers in two of them.',
		name: 'Aiko Tanaka',
		location: 'Sapporo, Japan',
		trek: 'Manaslu Circuit, 2025',
		image: '/images/manaslu-lake',
		imageAlt: 'The Manaslu range at dawn, mirrored in a still glacial lake'
	}
];

async function seedTestimonials() {
	const count = await prisma.testimonial.count();
	if (count > 0) {
		console.log('Testimonials already seeded, skipping');
		return;
	}
	await prisma.testimonial.createMany({
		data: testimonials.map((t, order) => ({ ...t, order }))
	});
	console.log(`Seeded ${testimonials.length} testimonials`);
}

const faqs = [
	{
		question: 'Do I need previous trekking experience?',
		answer:
			'No, but you need a real base of fitness. If you can comfortably hike five to six hours over consecutive days with a light daypack, you can handle Everest Base Camp or the Annapurna Circuit. Peak climbing treks like Island Peak ask more: some prior experience with crampons or a via ferrata helps, and we cover technique on a dedicated training day regardless.'
	},
	{
		question: 'Who handles the permits and paperwork?',
		answer:
			'We do. TIMS cards, national park entry, conservation area permits, and restricted-area permits for Manaslu are all arranged before you land, and the cost is built into your trek price. You bring a passport, passport photos, and your Nepal visa, sorted separately on arrival.'
	},
	{
		question: 'How real is the risk of altitude sickness?',
		answer:
			"Real enough that we plan around it rather than hope around it. Every itinerary includes dedicated acclimatisation days at the altitudes where AMS typically starts, our guides carry pulse oximeters and check readings daily, and every guide is trained to descend a trekker immediately if symptoms don't improve. Rushing the schedule is the single biggest cause of altitude sickness, so we don't."
	},
	{
		question: 'What should I pack?',
		answer:
			"Less than you think, layered well. We send a full kit list once you book, tailored to your specific trek and season, and can arrange down jacket and sleeping bag rental in Kathmandu if you'd rather not fly with them. Our packing guide in the journal covers the full list trek by trek."
	},
	{
		question: 'Can I join as a solo traveller?',
		answer:
			"Yes, most of our departures are solo trekkers joining a small group, and we don't charge a single supplement for the trek itself, only for a private room if you want one. If a fixed date doesn't suit you, we also arrange private departures for one."
	},
	{
		question: 'When is the best time to trek in Nepal?',
		answer:
			'Pre-monsoon (March to May) and post-monsoon (late September to November) are the reliable windows, with clear skies and stable trails. Spring brings rhododendron blooms below 3,000 metres; autumn tends to have the sharpest mountain views. Winter is possible on lower routes like Poon Hill but passes above 5,000 metres get genuinely cold.'
	},
	{
		question: "What isn't included in the trek price?",
		answer:
			'International flights, your Nepal visa, travel and evacuation insurance, personal gear, and discretionary extras on the trail like hot showers, WiFi, or bottled drinks. Each trek page has the full included and excluded list broken out so nothing is a surprise at checkout.'
	}
];

async function seedFaqs() {
	const count = await prisma.faqItem.count();
	if (count > 0) {
		console.log('FAQs already seeded, skipping');
		return;
	}
	await prisma.faqItem.createMany({
		data: faqs.map((f, order) => ({ ...f, order }))
	});
	console.log(`Seeded ${faqs.length} FAQs`);
}

const stats = [
	{ value: 17, suffix: ' yrs', label: 'Guiding treks in the Nepal Himalaya' },
	{ value: 34, label: 'Licensed climbing and trekking guides on staff' },
	{ value: 812, label: 'Trekking permits and TIMS cards handled last year' },
	{ value: 98.4, suffix: '%', label: "Of trekkers who reach their trek's highest point" }
];

async function seedStats() {
	const count = await prisma.stat.count();
	if (count > 0) {
		console.log('Stats already seeded, skipping');
		return;
	}
	await prisma.stat.createMany({
		data: stats.map((s, order) => ({ ...s, order }))
	});
	console.log(`Seeded ${stats.length} stats`);
}

async function main() {
	await seedAdmin();
	await seedSiteSettings();
	await seedTreks();
	await seedArticles();
	await seedTestimonials();
	await seedFaqs();
	await seedStats();
}

main()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
