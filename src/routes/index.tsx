import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  ArrowRight,
  Compass,
  Mountain,
  Camera,
  Bike,
  Map as MapIcon,
  Globe2,
  Route as RouteIcon,
  Calendar,
  Clock,
  ArrowUpRight,
  LayoutGrid,
} from "lucide-react";
import { listPosts, type Post } from "../lib/posts.functions";
import { listDestinations } from "../lib/destinations.functions";
import { listGallery } from "../lib/gallery.functions";
import { getHomepageConfig } from "../lib/homepage.functions";
import { listActiveTopics, type ActiveTopic } from "../lib/topics.functions";
import { listActiveBreakingNews } from "../lib/news.functions";
import { slugify } from "../lib/categories.functions";
import { CountUp } from "../components/dashboard/CountUp";
import { useGsapReveal } from "../hooks/use-gsap-reveal";
import { DestinationCardSkeleton } from "../components/blog/Skeletons";
import { NewsletterForm } from "../components/layout/NewsletterForm";
import { HeroSlider } from "../components/layout/HeroSlider";
import { SectionHeading } from "../components/home/SectionHeading";
import { TrendingStories } from "../components/home/TrendingStories";
import { FeaturedGrid } from "../components/home/FeaturedGrid";
import { BreakingNewsSection } from "../components/home/BreakingNewsSection";
import { AdSlot } from "../components/ads/AdSlot";
import { CATEGORIES } from "../lib/site";
import { useTranslations, useLanguage } from "@/lib/translate/store";
import { resolveMediaUrl, getOptimizedImageUrl, getImageSrcSet } from "@/lib/media";

const DestinationsMap = lazy(() =>
  import("@/components/destinations/DestinationsMap").then((m) => ({
    default: m.DestinationsMap,
  })),
);

const DEFAULT_HERO_SLIDES = [
  {
    src: "",
    alt: "Nanga Parbat at sunrise",
  },
  {
    src: "",
    alt: "Mountain road at dusk",
  },
  {
    src: "",
    alt: "Trekker on alpine ridge",
  },
];

const postsQO = queryOptions({
  queryKey: ["home", "posts"],
  queryFn: () => listPosts({ data: { limit: 24 } }),
});
const featuredQO = queryOptions({
  queryKey: ["home", "featured"],
  queryFn: () => listPosts({ data: { limit: 4, featuredOnly: true } }),
});
const destQO = queryOptions({
  queryKey: ["home", "destinations"],
  queryFn: () => listDestinations(),
});
const galleryQO = queryOptions({
  queryKey: ["home", "gallery"],
  queryFn: () => listGallery(),
});
const homepageQO = queryOptions({
  queryKey: ["home", "homepage-config"],
  queryFn: () => getHomepageConfig(),
});
const topicsQO = queryOptions({
  queryKey: ["home", "active-topics"],
  queryFn: () => listActiveTopics(),
});
const breakingNewsQO = queryOptions({
  queryKey: ["home", "breaking-news"],
  queryFn: () => listActiveBreakingNews(),
});

export const Route = createFileRoute("/")({
  head: ({ loaderData }: any) => {
    const heroLcp = loaderData?.heroLcpImage;
    return {
      meta: [
        { title: "Solo Travel in Pakistan, Karakoram Treks & Motorcycle Adventures | NDSOLOTRAVEL" },
        {
          name: "description",
          content:
            "Independent solo travel guide and dispatches across Pakistan and the Karakoram. Expedition itineraries, motorcycle tours, K2 Base Camp, Concordia, and high-altitude trekking.",
        },
        { property: "og:title", content: "Solo Travel in Pakistan, Karakoram Treks & Motorcycle Adventures | NDSOLOTRAVEL" },
        { property: "og:description", content: "Independent solo travel guide, motorcycle expeditions, and trekking diaries from Pakistan and the Karakoram." },
        { property: "og:url", content: "https://ndsolotravel.com/" },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: "https://ndsolotravel.com/" },
        ...(heroLcp
          ? [
              {
                rel: "preload" as const,
                as: "image" as const,
                href: getOptimizedImageUrl(heroLcp, 1600),
                imageSrcSet: getImageSrcSet(heroLcp, [640, 1024, 1600, 2048]) || undefined,
                imageSizes: "100vw",
                fetchPriority: "high" as const,
              },
            ]
          : []),
      ],
    };
  },
  loader: async ({ context }) => {
    const [, , , , hpConfig] = await Promise.all([
      context.queryClient.ensureQueryData(postsQO),
      context.queryClient.ensureQueryData(featuredQO),
      context.queryClient.ensureQueryData(destQO),
      context.queryClient.ensureQueryData(galleryQO),
      context.queryClient.ensureQueryData(homepageQO),
      context.queryClient.ensureQueryData(topicsQO),
      context.queryClient.ensureQueryData(breakingNewsQO),
    ]);

    const s = hpConfig?.settings ?? {};
    const mode = s.homepage_hero_images_mode === "manual" ? "manual" : "auto";
    let lcpSrc = "";
    if (mode === "manual") {
      lcpSrc = s.homepage_hero_image?.trim() || "";
    } else {
      lcpSrc = hpConfig?.heroImagePosts?.[0]?.cover_image || "";
    }

    return {
      heroLcpImage: lcpSrc ? resolveMediaUrl(lcpSrc) : "",
    };
  },
  component: HomePage,
});

function getTopicIcon(topic: ActiveTopic) {
  const text =
    `${topic.slug} ${topic.title} ${topic.categories.join(" ")} ${topic.tags.join(" ")}`.toLowerCase();
  if (text.includes("motorcycle") || text.includes("bike") || text.includes("ride")) return Bike;
  if (text.includes("trek") || text.includes("hike") || text.includes("mountain")) return Mountain;
  if (text.includes("photo") || text.includes("camera")) return Camera;
  if (text.includes("island") || text.includes("beach") || text.includes("ocean") || text.includes("seychelles"))
    return Compass;
  if (text.includes("guide") || text.includes("tourism") || text.includes("pakistan"))
    return Globe2;
  return Compass;
}

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CategorySection({ title, posts, linkTo, t, getPostTitle }: any) {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">{t(title)}</h2>
          <Link
            to={linkTo}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("Explore")} <ArrowRight className="inline-block ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-sm mb-5 bg-muted">
                {post.cover_image ? (
                  <img
                    src={getOptimizedImageUrl(post.cover_image, 600)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900" />
                )}
              </div>
              <h3 className="font-display text-xl font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">
                {getPostTitle(post)}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const t = useTranslations();
  const { lang } = useLanguage();
  const { data: postsData } = useSuspenseQuery(postsQO);
  const { data: destinationsData } = useSuspenseQuery(destQO);
  const { data: galleryData } = useSuspenseQuery(galleryQO);
  const { data: homepageConfig } = useSuspenseQuery(homepageQO);
  const { data: breakingNews } = useSuspenseQuery(breakingNewsQO);

  const allPosts = postsData.posts ?? [];
  const destinations = destinationsData ?? [];
  const featuredDestinations = useMemo(
    () => destinations.filter((d) => Boolean(d.featured)),
    [destinations],
  );
  const gallery = galleryData ?? [];
  const heroSettings = homepageConfig?.settings ?? {};

  // Hero slideshow images
  const heroImagesMode = heroSettings.homepage_hero_images_mode === "manual" ? "manual" : "auto";
  const heroImagePosts = homepageConfig?.heroImagePosts ?? [];
  const manualHeroImageUrls = [
    heroSettings.homepage_hero_image,
    heroSettings.homepage_hero_image_2,
    heroSettings.homepage_hero_image_3,
  ];
  const heroSlides = Array.from({ length: 3 }, (_, i) => {
    let src: string | null = null;
    let alt = DEFAULT_HERO_SLIDES[i].alt;
    if (heroImagesMode === "manual") {
      src = manualHeroImageUrls[i]?.trim() || null;
      alt = `Hero background ${i + 1}`;
    } else {
      const p = heroImagePosts[i];
      src = p?.cover_image ?? null;
      alt = p?.title || DEFAULT_HERO_SLIDES[i].alt;
    }
    const resolved = src ? resolveMediaUrl(src) : "";
    return resolved ? { src: resolved, alt } : null;
  }).filter((s): s is { src: string; alt: string } => Boolean(s));

  // Extract sections from all posts
  const latestExpedition = allPosts[0] || null;
  const latestStories = allPosts.slice(1, 7);

  // Group by categories
  const motorcyclePosts = allPosts
    .filter((p) => p.category === "Motorcycle Journeys" || p.category === "Motorcycle Adventure Travel")
    .slice(0, 3);
  const trekkingPosts = allPosts
    .filter((p) => p.category === "Trekking" || p.category === "Adventure")
    .slice(0, 3);
  const guidePosts = allPosts
    .filter((p) => p.category === "Travel Guides" || p.category === "Budget Travel")
    .slice(0, 3);

  const heroPrimaryTo = heroSettings.homepage_hero_button_link?.trim() || "/blog";

  const getPostTitle = (p: any) => {
    if (lang !== "en" && "post_translations" in p && p.post_translations) {
      const trans = p.post_translations.find((x: any) => x.language_code === lang);
      if (trans?.title) return trans.title;
    }
    return t(p.title);
  };

  const isExternal = (link?: string) => {
    const target = (link || "").trim().toLowerCase();
    return target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:");
  };

  return (
    <div className="w-full bg-background min-w-0 flex flex-col selection:bg-accent/30 selection:text-foreground">
      {/* 1. Cinematic Hero */}
      <section className="relative h-[85vh] sm:h-[95vh] min-h-[600px] w-full flex flex-col justify-center overflow-hidden bg-zinc-950">
        <HeroSlider slides={heroSlides} />
        {/* Elegant overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />

        <div className="absolute top-0 left-0 right-0 z-30 pt-24 px-4 sm:px-6 pointer-events-auto">
          <BreakingNewsSection items={breakingNews ?? []} />
        </div>

        <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 w-full max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-white/80 mb-6"
          >
            {t(heroSettings.homepage_hero_badge || "Solo · Slow · Cinematic")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-bold tracking-tight text-white max-w-4xl balance-text drop-shadow-sm"
          >
            {t(heroSettings.homepage_hero_title_highlight || "Stories from the high places.")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="mt-6 sm:mt-8 text-base sm:text-xl text-white/80 max-w-2xl font-light leading-relaxed balance-text"
          >
            {t(
              heroSettings.homepage_hero_description ||
                "Welcome to NDSOLOTRAVEL, a personal travel journal covering solo travel, motorcycle adventures, and mountain treks across Pakistan, the Karakoram, and around the world."
            )}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="mt-10 sm:mt-12 pointer-events-auto"
          >
            {isExternal(heroPrimaryTo) ? (
              <a
                href={heroPrimaryTo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-b border-white/40 pb-1.5 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-white hover:text-white/70 hover:border-white/70 transition-all duration-300"
              >
                {t(heroSettings.homepage_hero_button_text || "Read the stories")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <Link
                to={heroPrimaryTo as any}
                className="group inline-flex items-center gap-3 border-b border-white/40 pb-1.5 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-white hover:text-white/70 hover:border-white/70 transition-all duration-300"
              >
                {t(heroSettings.homepage_hero_button_text || "Read the stories")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. Latest Expedition Spotlight */}
      {latestExpedition && (
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
            <div className="w-full md:w-7/12 lg:w-3/5">
              <Link
                to="/blog/$slug"
                params={{ slug: latestExpedition.slug }}
                className="group block overflow-hidden rounded-sm bg-muted relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] shadow-md"
              >
                {latestExpedition.cover_image && (
                  <img
                    src={getOptimizedImageUrl(latestExpedition.cover_image, 1200)}
                    alt={latestExpedition.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                )}
              </Link>
            </div>
            <div className="w-full md:w-5/12 lg:w-2/5 space-y-5 sm:space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                {t("Latest Expedition")}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] hover:text-accent transition-colors">
                <Link to="/blog/$slug" params={{ slug: latestExpedition.slug }}>
                  {getPostTitle(latestExpedition)}
                </Link>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg line-clamp-4">
                {latestExpedition.excerpt}
              </p>
              <Link
                to="/blog/$slug"
                params={{ slug: latestExpedition.slug }}
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-accent transition-colors border-b border-foreground/20 pb-1 hover:border-accent mt-2"
              >
                {t("Read the full story")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. Featured Destinations */}
      <section className="py-24 sm:py-32 bg-muted/20 border-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
              {t("Where to go")}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              {t("Featured Destinations")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredDestinations.slice(0, 4).map((d) => (
              <Link
                key={d.id}
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-zinc-900 shadow-sm hover:shadow-lg transition-all"
              >
                {d.featured_image && (
                  <img
                    src={getOptimizedImageUrl(d.featured_image, 800)}
                    alt={d.title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 p-6 sm:p-8 text-white w-full">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-2 truncate">
                    {t(d.country)}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight group-hover:text-white/80 transition-colors">
                    {t(d.title)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] border border-border bg-background px-6 py-3 rounded-full hover:bg-muted hover:border-foreground/20 transition-all"
            >
              {t("View all destinations")}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Latest Stories (Editorial Grid) */}
      <section className="py-24 sm:py-32 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-14 sm:mb-20 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              {t("Latest Stories")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("Recent dispatches from the trail.")}
            </p>
          </div>
          <Link
            to="/blog"
            className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("View the archive")} <ArrowRight className="inline-block ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {latestStories.map((post) => (
            <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-sm mb-6 bg-muted shadow-sm">
                {post.cover_image && (
                  <img
                    src={getOptimizedImageUrl(post.cover_image, 800)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-3 truncate">
                {t(post.category || "Story")}
              </p>
              <h3 className="font-display text-2xl font-bold leading-tight mb-3 group-hover:text-accent transition-colors line-clamp-2">
                {getPostTitle(post)}
              </h3>
              <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5, 6, 7. Dedicated Category Sections */}
      {motorcyclePosts.length > 0 && (
        <CategorySection
          title="Motorcycle Journeys"
          posts={motorcyclePosts}
          linkTo="/category/motorcycle-journeys"
          t={t}
          getPostTitle={getPostTitle}
        />
      )}
      {trekkingPosts.length > 0 && (
        <CategorySection
          title="Trekking"
          posts={trekkingPosts}
          linkTo="/category/trekking"
          t={t}
          getPostTitle={getPostTitle}
        />
      )}
      {guidePosts.length > 0 && (
        <CategorySection
          title="Travel Guides"
          posts={guidePosts}
          linkTo="/category/travel-guides"
          t={t}
          getPostTitle={getPostTitle}
        />
      )}

      {/* 8. Field Notes / Photography (Asymmetric / Masonry vibe) */}
      {gallery.length > 0 && (
        <section className="py-24 sm:py-32 bg-zinc-950 text-zinc-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-4">
                {t("Visual Journal")}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
                {t("Field Notes")}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {gallery.slice(0, 6).map((item, idx) => (
                <Link
                  key={item.id}
                  to="/gallery"
                  className={`group block overflow-hidden rounded-sm relative bg-zinc-900 ${
                    idx === 0 || idx === 3 ? "lg:col-span-2 aspect-[16/9]" : "aspect-square sm:aspect-[4/3]"
                  }`}
                >
                  <img
                    src={getOptimizedImageUrl(item.image_url, 1200)}
                    alt={item.caption || "Photography"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:p-8">
                    {item.caption && (
                      <p className="text-sm sm:text-base font-medium text-white max-w-lg leading-relaxed">
                        {t(item.caption)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-14 sm:mt-20 text-center">
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:text-white/70 transition-colors border-b border-white/30 pb-1.5 hover:border-white"
              >
                {t("View Full Gallery")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 9. Newsletter Dispatch */}
      <section className="py-24 sm:py-32 max-w-3xl mx-auto px-4 sm:px-6 text-center w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
          {t("Join the Journey")}
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
          {t("Get the next dispatch")}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
          {t(
            "One email when a new expedition story drops. No spam, no algorithm noise. Just stories from the road."
          )}
        </p>
        <div className="mx-auto w-full max-w-md bg-card border border-border p-6 rounded-2xl shadow-sm">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}

