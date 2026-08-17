export type ItineraryDay = {
	day: number;
	title: string;
	location: string;
	elevation: string;
	description: string;
};

const ebcItinerary: ItineraryDay[] = [
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
			'Bare, wind-scoured terrain past the Thukla memorials for climbers lost on Everest, then along the Khumbu Glacier\'s lateral moraine to Lobuche.'
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
			'A pre-dawn climb to Kala Patthar for the clearest possible view of Everest\'s summit pyramid, then a long descent back down the valley to Pheriche.'
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
			'A morning flight back over the foothills, with a free afternoon in the capital to rest, shower properly, and mark the trek\'s end.'
	},
	{
		day: 13,
		title: 'Departure',
		location: 'Kathmandu',
		elevation: '1,400 m',
		description: 'International departure, or the start of an extension. Airport transfer included regardless of flight time.'
	}
];

const annapurnaItinerary: ItineraryDay[] = [
	{
		day: 1,
		title: 'Drive to the trailhead',
		location: 'Kathmandu → Syange',
		elevation: '1,400 m → 1,100 m',
		description:
			'A long, scenic drive along the Trisuli and Marsyangdi rivers to Syange, where the road ends and the trail begins.'
	},
	{
		day: 2,
		title: 'Into the Manang valley',
		location: 'Syange → Dharapani',
		elevation: '1,100 m → 1,960 m',
		description:
			'Waterfalls and rice terraces give way to pine as the valley narrows, entering the Manang district proper.'
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
		description:
			'A side hike up to the Gangapurna viewpoint or Ice Lake, high enough to matter, low enough to sleep safely afterward.'
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
		description: 'A steep, exposed climb to the staging point for tomorrow\'s crossing, with an early dinner and an early night.'
	},
	{
		day: 9,
		title: 'Crossing the Thorong La',
		location: 'Thorong Phedi → Thorong La → Muktinath',
		elevation: '4,525 m → 5,416 m → 3,760 m',
		description:
			'A pre-dawn start for the pass itself, the trek\'s high point in every sense, then a long knee-testing descent into Mustang and the pilgrimage town of Muktinath.'
	},
	{
		day: 10,
		title: 'Into Mustang\'s high desert',
		location: 'Muktinath → Jomsom',
		elevation: '3,760 m → 2,720 m',
		description:
			'Wind-carved cliffs and a completely different palette, following the Kali Gandaki downstream past Kagbeni\'s medieval alleys.'
	},
	{
		day: 11,
		title: 'Down the gorge',
		location: 'Jomsom → Kalopani',
		elevation: '2,720 m → 2,530 m',
		description:
			'Following the Kali Gandaki, the deepest gorge on earth, with Dhaulagiri and Annapurna I visible on either bank.'
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
		description: 'The trek\'s steepest sustained climb, through forest that turns solid red and pink when the rhododendron blooms.'
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
		description: 'The last trekking morning ends at the Nayapul trailhead, with a short drive to Pokhara\'s lakeside for a proper rest.'
	},
	{
		day: 16,
		title: 'Return to Kathmandu',
		location: 'Pokhara → Kathmandu',
		elevation: '950 m → 1,400 m',
		description: 'A short flight or scenic drive back to the capital, with the afternoon free before your onward journey.'
	}
];

const manasluItinerary: ItineraryDay[] = [
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
		description: 'A short day by design, ending at a village with the trek\'s first uninterrupted view of Manaslu itself.'
	},
	{
		day: 6,
		title: 'To the foot of the mountain',
		location: 'Lho → Samagaon',
		elevation: '3,180 m → 3,530 m',
		description: 'Samagaon sits almost beneath Manaslu\'s south face, a Tibetan-influenced village that anchors two rest days.'
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
		description: 'A short day to the high camp, saving strength for tomorrow\'s crossing of the Larkya La.'
	},
	{
		day: 10,
		title: 'Crossing the Larkya La',
		location: 'Dharamsala → Larkya La → Bimthang',
		elevation: '4,460 m → 5,106 m → 3,720 m',
		description:
			'A long, cold, pre-dawn crossing beneath Manaslu\'s north face, the trek\'s high point, descending into the Marsyangdi valley on the far side.'
	},
	{
		day: 11,
		title: 'Down into the forest',
		location: 'Bimthang → Dharapani',
		elevation: '3,720 m → 1,960 m',
		description: 'A long descent through pine and rhododendron, rejoining the Annapurna Circuit\'s lower trail network.'
	},
	{
		day: 12,
		title: 'Drive back to Kathmandu',
		location: 'Dharapani → Kathmandu',
		elevation: '1,960 m → 1,400 m',
		description: 'A full day\'s drive back to the capital, following the same river valleys in reverse.'
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
];

const islandPeakItinerary: ItineraryDay[] = [
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
];

const poonHillItinerary: ItineraryDay[] = [
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
		description: 'The trek\'s steepest day, a long stone staircase through forest that turns solid red and pink in bloom season.'
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
		description: 'A shorter day ending at natural hot springs above the Modi Khola, the trek\'s reward before the final descent.'
	},
	{
		day: 6,
		title: 'Back to Pokhara',
		location: 'Jhinu Danda → Nayapul → Pokhara',
		elevation: '1,780 m → 820 m',
		description: 'The last trekking morning ends at Nayapul, with a short drive back to Pokhara\'s lakeside for a proper rest.'
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
];

export const itineraries: Record<string, ItineraryDay[]> = {
	'everest-base-camp': ebcItinerary,
	'annapurna-circuit': annapurnaItinerary,
	'manaslu-circuit': manasluItinerary,
	'island-peak-climbing': islandPeakItinerary,
	'ghorepani-poon-hill-trek': poonHillItinerary
};
