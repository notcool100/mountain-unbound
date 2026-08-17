<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import WhyWindhorse from '$lib/components/WhyWindhorse.svelte';
	import TripShowcase from '$lib/components/TripShowcase.svelte';
	import WhereWeTrek from '$lib/components/WhereWeTrek.svelte';
	import ActivitiesOffered from '$lib/components/ActivitiesOffered.svelte';
	import TrailStory from '$lib/components/TrailStory.svelte';
	import EbcTierOptions from '$lib/components/EbcTierOptions.svelte';
	import WhyTrekWithUs from '$lib/components/WhyTrekWithUs.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import PlanYourTrek from '$lib/components/PlanYourTrek.svelte';
	import { content } from '$lib/cms/store.svelte';
</script>

<svelte:head>
	<title>{content.seo.title}</title>
	<meta name="description" content={content.seo.description} />
</svelte:head>

<Hero />
<WhyWindhorse />
<TripShowcase />
<WhereWeTrek />
<ActivitiesOffered />
<TrailStory />
<EbcTierOptions />
<WhyTrekWithUs />
<Testimonials />
<Faq />
<PlanYourTrek />
