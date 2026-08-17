import type { Trek, TrekCategory, Departure } from '$lib/data/treks';
import type { ItineraryDay } from '$lib/data/itinerary';
import type { Article, ArticleSection } from '$lib/data/journal';
import type { Testimonial } from '$lib/data/testimonials';
import type { Stat } from '$lib/data/stats';
import type { FaqItem } from '$lib/data/faq';
import type { IconKey } from './icons';

export type { Trek, TrekCategory, Departure, ItineraryDay, Article, ArticleSection, Testimonial, Stat, FaqItem };

export type PageBannerContent = {
	image: string;
	imageAlt: string;
	eyebrow?: string;
	title: string;
	subtitle?: string;
};

export type SeoContent = { title: string; description: string };

export type HeroContent = {
	headlineLine1: string;
	headlineLine2: string;
	subhead: string;
	ctaText: string;
	ctaHref: string;
	posterImage: string;
	posterAlt: string;
	videoSrc: string;
};

export type StatsSectionContent = {
	heading: string;
	body: string;
	backgroundImage: string;
	stats: Stat[];
};

export type WhyGridItem = { icon: IconKey; title: string; body: string };
export type WhyGridContent = { heading: string; body: string; items: WhyGridItem[] };

export type TrailStoryContent = {
	headlineLine1: string;
	headlineLine2: string;
	body: string;
	ctaText: string;
	ctaHref: string;
	backgroundImage: string;
	backgroundAlt: string;
	midImage: string;
	midAlt: string;
	foregroundImage: string;
	foregroundAlt: string;
};

export type RegionCard = { name: string; trekCount: string; href: string; image: string; imageAlt: string };
export type RegionsContent = { heading: string; headingAccent: string; body: string; regions: RegionCard[] };

export type ActivityCard = { title: string; badge: string; href: string; image: string; imageAlt: string };
export type ActivitiesContent = { heading: string; body: string; activities: ActivityCard[] };

export type TierFeature = { label: string; included: boolean };
export type PricingTier = {
	badge: string;
	name: string;
	days: number;
	price: number;
	description: string;
	features: TierFeature[];
	href: string;
	cta: string;
};
export type EbcTiersContent = { heading: string; body: string; tiers: PricingTier[] };

export type PlanYourTrekContent = { heading: string; body: string; email: string; phone: string };

export type NavLink = { href: string; label: string };
export type NavContent = { brand: string; brandBadge: string; links: NavLink[]; ctaText: string };

export type FooterContent = {
	tagline: string;
	credentials: string[];
	exploreLinks: NavLink[];
	email: string;
	address: string;
	newsletterLabel: string;
	newsletterPlaceholder: string;
	newsletterButton: string;
	newsletterSuccess: string;
	photoCredit: string;
};

export type ValueCard = { icon: IconKey; title: string; body: string };
export type GuideCard = { name: string; role: string; years: number; bio: string };
export type CredentialCard = { name: string; body: string };
export type AboutPageContent = {
	seo: SeoContent;
	banner: PageBannerContent;
	introParagraphs: string[];
	values: ValueCard[];
	teamHeading: string;
	teamBody: string;
	guides: GuideCard[];
	credentialsHeading: string;
	credentialsBody: string;
	credentials: CredentialCard[];
};

export type ContactPageContent = {
	seo: SeoContent;
	banner: PageBannerContent;
	email: string;
	phone: string;
	address: string;
	hours: string;
	sendNote: string;
	nextStepsHeading: string;
	nextStepsBody: string;
};

export type TreksPageContent = { seo: SeoContent; banner: PageBannerContent };
export type JournalPageContent = { seo: SeoContent; banner: PageBannerContent };

export type TrekDetailLabels = {
	highlightsHeading: string;
	costHeading: string;
	includedHeading: string;
	notIncludedHeading: string;
	departuresHeading: string;
	privateDeparturesNote: string;
	itineraryHeading: string;
	/** Supports a `{trekName}` token, substituted at render time. */
	itineraryDescriptionTemplate: string;
};

export type JournalDetailLabels = { moreHeading: string };

export type BrandingContent = { logoUrl: string; faviconUrl: string };

export type SiteContent = {
	seo: SeoContent;
	nav: NavContent;
	branding: BrandingContent;
	footer: FooterContent;
	hero: HeroContent;
	statsSection: StatsSectionContent;
	whyGrid: WhyGridContent;
	regions: RegionsContent;
	activities: ActivitiesContent;
	trailStory: TrailStoryContent;
	ebcTiers: EbcTiersContent;
	planYourTrek: PlanYourTrekContent;
	about: AboutPageContent;
	contact: ContactPageContent;
	treksPage: TreksPageContent;
	journalPage: JournalPageContent;
	trekDetailLabels: TrekDetailLabels;
	journalDetailLabels: JournalDetailLabels;
	treks: Trek[];
	itineraries: Record<string, ItineraryDay[]>;
	journal: Article[];
	testimonials: Testimonial[];
	faqs: FaqItem[];
};
