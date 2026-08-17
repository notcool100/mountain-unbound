export type ArticleSection = {
	heading: string;
	body: string[];
};

export type Article = {
	slug: string;
	title: string;
	excerpt: string;
	category: string;
	readMinutes: number;
	publishDate: string;
	image: string;
	imageAlt: string;
	sections: ArticleSection[];
};

export const articles: Article[] = [
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
					'The Trekkers\' Information Management System card is the baseline registration for almost every trekking route in Nepal. It exists so authorities know roughly how many trekkers are on a given trail, which matters for search and rescue coordination. We handle the application before you land; you just need passport photos and passport details in advance.'
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
					'Manaslu sits close enough to the Tibet border that the route falls under a restricted-area permit, issued directly by Nepal\'s Department of Immigration rather than a park office. It requires a minimum of two trekkers travelling with a registered agency, a licensed guide for the full route, and a higher permit fee that scales with season. This is the main reason Manaslu costs more than Everest Base Camp for a similar number of days: the permit itself, not the trail.',
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
		imageAlt: 'Manaslu\'s sharp summit against a clear sky',
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
					'Every guide carries a pulse oximeter and checks oxygen saturation and pulse daily above 3,000 metres, logging it against how each trekker reports feeling. A guide has the authority to hold a trekker at altitude for an extra acclimatisation day, or send them down with a support crew member, regardless of the group\'s schedule. This is written into our operating procedure, not left to judgement calls under pressure.',
					'Diamox (acetazolamide) can help some trekkers acclimatise, taken as a preventive starting a day before ascending, but it is not a substitute for a sensible ascent rate and it will not mask serious symptoms safely. Talk to a travel medicine doctor before your trip if you are considering it, not your trekking guide on day four.'
				]
			}
		]
	}
];

export function getArticleBySlug(slug: string): Article | undefined {
	return articles.find((article) => article.slug === slug);
}
