import { treks } from '$lib/data/treks';
import { itineraries } from '$lib/data/itinerary';
import { articles } from '$lib/data/journal';
import { testimonials } from '$lib/data/testimonials';
import { stats } from '$lib/data/stats';
import { faqs } from '$lib/data/faq';
import type { SiteContent } from './schema';

/**
 * Canonical seed content for the site. This is what every page shows until an
 * admin edit overrides it via the CMS store (src/lib/cms/store.svelte.ts).
 * treks/itinerary/journal/testimonials/stats/faq are re-exported straight from
 * the original static data files rather than duplicated here.
 */
export const defaults: SiteContent = {
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

	branding: {
		logoUrl: '',
		faviconUrl: ''
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
		backgroundImage: '/images/ebc-trail',
		// prefix/suffix normalized to '' (never undefined) so admin text fields can bind directly.
		stats: stats.map((s) => ({ ...s, prefix: s.prefix ?? '', suffix: s.suffix ?? '' }))
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
			// NOTE: previously hardcoded as '/images/ebc-way', a base path with no matching
			// files under static/images/ (would 404). Repointed to the closest thematic match.
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
		itineraryDescriptionTemplate: 'This is the exact itinerary our {trekName} groups follow, built around real acclimatisation, not a rushed schedule.'
	},

	journalDetailLabels: {
		moreHeading: 'More from the journal'
	},

	treks,
	itineraries,
	journal: articles,
	testimonials,
	faqs
};
