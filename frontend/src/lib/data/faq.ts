export type FaqItem = {
	id: string;
	question: string;
	answer: string;
};

export const faqs: FaqItem[] = [
	{
		id: 'faq-previous-experience',
		question: 'Do I need previous trekking experience?',
		answer:
			'No, but you need a real base of fitness. If you can comfortably hike five to six hours over consecutive days with a light daypack, you can handle Everest Base Camp or the Annapurna Circuit. Peak climbing treks like Island Peak ask more: some prior experience with crampons or a via ferrata helps, and we cover technique on a dedicated training day regardless.'
	},
	{
		id: 'faq-permits-paperwork',
		question: 'Who handles the permits and paperwork?',
		answer:
			'We do. TIMS cards, national park entry, conservation area permits, and restricted-area permits for Manaslu are all arranged before you land, and the cost is built into your trek price. You bring a passport, passport photos, and your Nepal visa, sorted separately on arrival.'
	},
	{
		id: 'faq-altitude-sickness-risk',
		question: 'How real is the risk of altitude sickness?',
		answer:
			'Real enough that we plan around it rather than hope around it. Every itinerary includes dedicated acclimatisation days at the altitudes where AMS typically starts, our guides carry pulse oximeters and check readings daily, and every guide is trained to descend a trekker immediately if symptoms don\'t improve. Rushing the schedule is the single biggest cause of altitude sickness, so we don\'t.'
	},
	{
		id: 'faq-what-to-pack',
		question: 'What should I pack?',
		answer:
			'Less than you think, layered well. We send a full kit list once you book, tailored to your specific trek and season, and can arrange down jacket and sleeping bag rental in Kathmandu if you\'d rather not fly with them. Our packing guide in the journal covers the full list trek by trek.'
	},
	{
		id: 'faq-solo-traveller',
		question: 'Can I join as a solo traveller?',
		answer:
			'Yes, most of our departures are solo trekkers joining a small group, and we don\'t charge a single supplement for the trek itself, only for a private room if you want one. If a fixed date doesn\'t suit you, we also arrange private departures for one.'
	},
	{
		id: 'faq-best-time-to-trek',
		question: 'When is the best time to trek in Nepal?',
		answer:
			'Pre-monsoon (March to May) and post-monsoon (late September to November) are the reliable windows, with clear skies and stable trails. Spring brings rhododendron blooms below 3,000 metres; autumn tends to have the sharpest mountain views. Winter is possible on lower routes like Poon Hill but passes above 5,000 metres get genuinely cold.'
	},
	{
		id: 'faq-not-included',
		question: 'What isn\'t included in the trek price?',
		answer:
			'International flights, your Nepal visa, travel and evacuation insurance, personal gear, and discretionary extras on the trail like hot showers, WiFi, or bottled drinks. Each trek page has the full included and excluded list broken out so nothing is a surprise at checkout.'
	}
];
