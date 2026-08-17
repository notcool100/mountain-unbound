export type Stat = {
	id: string;
	value: number;
	prefix?: string;
	suffix?: string;
	label: string;
};

export const stats: Stat[] = [
	{ id: 'stat-years-guiding', value: 17, suffix: ' yrs', label: 'Guiding treks in the Nepal Himalaya' },
	{ id: 'stat-guides-on-staff', value: 34, label: 'Licensed climbing and trekking guides on staff' },
	{ id: 'stat-permits-handled', value: 812, label: 'Trekking permits and TIMS cards handled last year' },
	{ id: 'stat-summit-rate', value: 98.4, suffix: '%', label: 'Of trekkers who reach their trek\'s highest point' }
];
