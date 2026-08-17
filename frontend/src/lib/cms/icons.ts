import {
	MapPinned,
	HeartPulse,
	Wallet,
	Users,
	HandHeart,
	CalendarCheck,
	ShieldCheck,
	Mountain,
	Compass,
	Star
} from '@lucide/svelte';

export const iconRegistry = {
	'map-pinned': MapPinned,
	'heart-pulse': HeartPulse,
	wallet: Wallet,
	users: Users,
	'hand-heart': HandHeart,
	'calendar-check': CalendarCheck,
	'shield-check': ShieldCheck,
	mountain: Mountain,
	compass: Compass,
	star: Star
} as const;

export type IconKey = keyof typeof iconRegistry;
export const iconKeys = Object.keys(iconRegistry) as IconKey[];

export function getIcon(key: string) {
	return iconRegistry[key as IconKey] ?? Compass;
}
