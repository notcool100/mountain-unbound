-- CreateEnum
CREATE TYPE "trek_category" AS ENUM ('SIGNATURE', 'PEAK_CLIMBING', 'SHORT_TREKS');

-- CreateEnum
CREATE TYPE "trek_difficulty" AS ENUM ('MODERATE', 'CHALLENGING', 'STRENUOUS');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treks" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "trek_category" NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "maxAltitude" TEXT NOT NULL,
    "difficulty" "trek_difficulty" NOT NULL,
    "bestSeasons" TEXT NOT NULL,
    "groupSize" TEXT NOT NULL,
    "startEnd" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceNote" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "highlights" TEXT[],
    "includes" TEXT[],
    "excludes" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "treks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trek_gallery_images" (
    "id" TEXT NOT NULL,
    "trekId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "trek_gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trek_departures" (
    "id" TEXT NOT NULL,
    "trekId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "spotsLeft" INTEGER NOT NULL,

    CONSTRAINT "trek_departures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_days" (
    "id" TEXT NOT NULL,
    "trekId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "elevation" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "itinerary_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "readMinutes" INTEGER NOT NULL,
    "publishDate" DATE NOT NULL,
    "image" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "sections" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "trek" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_items" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "prefix" TEXT,
    "suffix" TEXT,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "seo" JSONB NOT NULL,
    "nav" JSONB NOT NULL,
    "footer" JSONB NOT NULL,
    "hero" JSONB NOT NULL,
    "statsSection" JSONB NOT NULL,
    "whyGrid" JSONB NOT NULL,
    "regions" JSONB NOT NULL,
    "activities" JSONB NOT NULL,
    "trailStory" JSONB NOT NULL,
    "ebcTiers" JSONB NOT NULL,
    "planYourTrek" JSONB NOT NULL,
    "about" JSONB NOT NULL,
    "contact" JSONB NOT NULL,
    "treksPage" JSONB NOT NULL,
    "journalPage" JSONB NOT NULL,
    "trekDetailLabels" JSONB NOT NULL,
    "journalDetailLabels" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "treks_slug_key" ON "treks"("slug");

-- CreateIndex
CREATE INDEX "trek_gallery_images_trekId_idx" ON "trek_gallery_images"("trekId");

-- CreateIndex
CREATE INDEX "trek_departures_trekId_idx" ON "trek_departures"("trekId");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_days_trekId_day_key" ON "itinerary_days"("trekId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- AddForeignKey
ALTER TABLE "trek_gallery_images" ADD CONSTRAINT "trek_gallery_images_trekId_fkey" FOREIGN KEY ("trekId") REFERENCES "treks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trek_departures" ADD CONSTRAINT "trek_departures_trekId_fkey" FOREIGN KEY ("trekId") REFERENCES "treks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_days" ADD CONSTRAINT "itinerary_days_trekId_fkey" FOREIGN KEY ("trekId") REFERENCES "treks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
