import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
  MapPin,
  Clock,
  ArrowUpRight,
  LayoutGrid,
} from "lucide-react";
import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { listPosts, getJourneyStats, type Post } from "../lib/posts.functions";
import { listDestinations } from "../lib/destinations.functions";
import { listGallery } from "../lib/gallery.functions";
import { getHomepageConfig } from "../lib/homepage.functions";
import { listActiveTopics, type ActiveTopic } from "../lib/topics.functions";
import { CountUp } from "../components/dashboard/CountUp";
import { useGsapReveal } from "../hooks/use-gsap-reveal";
import { DestinationCardSkeleton } from "../components/blog/Skeletons";
import { NewsletterForm } from "../components/layout/NewsletterForm";
import { HeroSlider } from "../components/layout/HeroSlider";
import { SectionHeading } from "../components/home/SectionHeading";
import { TrendingStories } from "../components/home/TrendingStories";
import { FeaturedGrid } from "../components/home/FeaturedGrid";
import { CATEGORIES } from "../lib/site";
import { useTranslations, useLanguage } from "@/lib/translate/store";
import { resolveMediaUrl } from "@/lib/admin.functions";

const DestinationsMap = lazy(() =>
  import("@/components/destinations/DestinationsMap").then((m) => ({
    default: m.DestinationsMap,
  })),
);

const postsQO = queryOptions({
  queryKey: ["home", "posts"],
  queryFn: () => listPosts({ data: { limit: 12 } }),
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
const motoQO = queryOptions({
  queryKey: ["home", "moto"],
  queryFn: () =>
    listPosts({
      data: { limit: 1, categories: ["Motorcycle Adventure Travel"] },
    }),
});
const journeyStatsQO = queryOptions({
  queryKey: ["home", "journey-stats"],
  queryFn: () => getJourneyStats(),
});
const homepageQO = queryOptions({
  queryKey: ["home", "homepage-config"],
  queryFn: () => getHomepageConfig(),
});
const topicsQO = queryOptions({
  queryKey: ["home", "active-topics"],
  queryFn: () => listActiveTopics(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ndsolotravel — Solo travel, mountains & motorcycles" },
      {
        name: "description",
        content:
          "Cinematic solo travel stories. Trekking Nanga Parbat, riding the Karakoram, photographing the Himalaya.",
      },
      { property: "og:title", content: "ndsolotravel" },
      { property: "og:description", content: "Solo travel stories from the Karakoram and beyond." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(postsQO),
      context.queryClient.ensureQueryData(featuredQO),
      context.queryClient.ensureQueryData(destQO),
      context.queryClient.ensureQueryData(galleryQO),
      context.queryClient.ensureQueryData(motoQO),
      context.queryClient.ensureQueryData(journeyStatsQO),
      context.queryClient.ensureQueryData(homepageQO),
      context.queryClient.ensureQueryData(topicsQO),
    ]);
  },
  component: HomePage,
});

function getTopicIcon(topic: ActiveTopic) {
  const text = `${topic.slug} ${topic.title} ${topic.categories.join(" ")} ${topic.tags.join(" ")}`.toLowerCase();
  if (text.includes("motorcycle") || text.includes("bike") || text.includes("ride")) return Bike;
  if (text.includes("trek") || text.includes("hike") || text.includes("mountain")) return Mountain;
  if (text.includes("photo") || text.includes("camera")) return Camera;
  if (text.includes("guide") || text.includes("tourism") || text.includes("pakistan")) return Globe2;
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

function HomePage() {
  const t = useTranslations();
  const { lang } = useLanguage();
  const { data: postsData } = useSuspenseQuery(postsQO);
  const { data: featuredData } = useSuspenseQuery(featuredQO);
  const { data: destinationsData } = useSuspenseQuery(destQO);
  const { data: activeTopicsData } = useSuspenseQuery(topicsQO);
  const { data: galleryData } = useSuspenseQuery(galleryQO);
  const { data: motoData } = useSuspenseQuery(motoQO);
  const { data: journeyStats } = useSuspenseQuery(journeyStatsQO);
  const { data: homepageConfig } = useSuspenseQuery(homepageQO);

  const activeTopics = activeTopicsData ?? [];
  const allPosts = postsData.posts ?? [];
  const featuredPosts = featuredData.posts ?? [];
  const destinations = destinationsData ?? [];
  const gallery = galleryData ?? [];

  const heroSettings = homepageConfig?.settings ?? {};
  const heroMode = heroSettings.homepage_hero_mode === "manual" ? "manual" : "auto";
  const heroSource = homepageConfig?.heroPost ?? null;

  // Primary Hero story
  const heroPost = heroMode === "manual" && heroSource ? heroSource : allPosts[0] ?? null;

  // Floating preview cards in hero (2nd and 3rd latest stories)
  const heroFloatingPosts = allPosts.slice(1, 3);

  // Trending / Latest Stories section data:
  // Left: primary story (allPosts[0] or next in line)
  // Middle: 3 secondary stories
  const trendingPrimary = allPosts[0] ?? null;
  const trendingSecondary = allPosts.slice(1, 4);

  // Category list with counts for sidebar
  const categoryMap = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of allPosts) {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    }
    // Also include active topics
    const cats = Object.entries(counts).map(([name, count]) => {
      const matchedTopic = activeTopics.find((t) =>
        t.categories.some((c) => c.toLowerCase() === name.toLowerCase()),
      );
      return {
        name,
        count,
        image: matchedTopic?.previewImage || undefined,
        linkTo: `/blog`,
      };
    });

    if (cats.length === 0) {
      return CATEGORIES.slice(0, 5).map((name) => ({
        name,
        count: 1,
        linkTo: "/blog",
      }));
    }
    return cats.slice(0, 5);
  }, [allPosts, activeTopics]);

  // Featured Section data:
  // Left: main featured
  // Middle: secondary featured (2 cards)
  const featuredMode = heroSettings.homepage_featured_mode === "manual" ? "manual" : "auto";
  const mainFeatured: Post | null =
    (featuredMode === "manual" ? (homepageConfig?.featuredPost as any) : featuredPosts[0]) ||
    featuredPosts[0] ||
    allPosts[0] ||
    null;

  const secondaryFeatured = featuredPosts.filter((p) => p.id !== mainFeatured?.id).slice(0, 2);
  if (secondaryFeatured.length < 2) {
    const fillers = allPosts.filter(
      (p) => p.id !== mainFeatured?.id && !secondaryFeatured.some((sf) => sf.id === p.id),
    );
    secondaryFeatured.push(...fillers.slice(0, 2 - secondaryFeatured.length));
  }

  const motoPosts = motoData?.posts ?? [];
  const latestMoto = motoPosts[0] ?? null;
  const latestDest = destinations[0] ?? null;
  const latestPhoto = gallery[0] ?? null;
  const latestPhotoCaption = latestPhoto?.caption || "";

  const [destView, setDestView] = useState<"grid" | "map">("grid");
  const navigate = useNavigate();

  // Smooth-scroll to hash targets when arriving via redirect or direct link.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash === "interactive-map" || hash === "map") {
      setDestView("map");
      requestAnimationFrame(() =>
        document
          .getElementById("interactive-map")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } else if (hash === "journey-in-numbers") {
      requestAnimationFrame(() =>
        document
          .getElementById("journey-in-numbers")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, []);

  // Derived stats — Countries Visited automatically calculated from published blog post locations
  const calculatedCountries = journeyStats?.countriesCount ?? 1;
  const countriesMode = heroSettings.homepage_stat_countries_mode === "manual" ? "manual" : "auto";
  const countries =
    countriesMode === "manual"
      ? Number(heroSettings.homepage_stat_countries) || 1
      : calculatedCountries;

  const stats = [
    {
      icon: Globe2,
      label: t("Countries Visited"),
      value: countries,
      suffix: "",
      featured: false,
    },
    {
      icon: Bike,
      label: t("Solo Motorcycle Trips"),
      value: Number(heroSettings.homepage_stat_trips) || 102,
      suffix: "",
      featured: false,
    },
    {
      icon: Camera,
      label: t("Photos Captured"),
      value: Number(heroSettings.homepage_stat_photos) || 200,
      suffix: heroSettings.homepage_stat_photos_suffix || "K+",
      featured: false,
    },
    {
      icon: RouteIcon,
      label: t("Kilometres Travelled"),
      value: Number(heroSettings.homepage_stat_kilometres) || 18420,
      suffix: heroSettings.homepage_stat_kilometres_suffix || " km",
      featured: true,
    },
    {
      icon: Calendar,
      label: t("Days on the Road"),
      value: Number(heroSettings.homepage_stat_days) || 142,
      suffix: "",
      featured: false,
    },
  ];
  const journeyRef = useGsapReveal<HTMLDivElement>();

  const isExternal = (link?: string) => {
    const target = (link || "").trim().toLowerCase();
    return target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:");
  };
  const heroPrimaryTo = heroSettings.homepage_hero_button_link?.trim() || "/blog";
  const heroSecondaryTo = heroSettings.homepage_hero_secondary_button_link?.trim() || "/destinations";

  const getPostTitle = (p: Post | { title: string; post_translations?: any[] }) => {
    if (lang !== "en" && "post_translations" in p && p.post_translations) {
      const trans = p.post_translations.find((x: any) => x.language_code === lang);
      if (trans?.title) return trans.title;
    }
    return t(p.title);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER (Cinematic + 2 Floating Story Preview Cards)               */}
      {/* ========================================================================= */}
      <section className="relative min-h-[max(100svh,620px)] overflow-hidden">
        <HeroSlider
          slides={
            heroSettings.homepage_hero_image
              ? [{ src: resolveMediaUrl(heroSettings.homepage_hero_image), alt: "Custom hero background" }]
              : heroMode === "manual" && heroSource?.cover_image
                ? [{ src: heroSource.cover_image, alt: heroSource.title }]
                : heroPost?.cover_image
                  ? [
                      {
                        src: resolveMediaUrl(heroPost.cover_image),
                        alt: heroPost.title,
                      },
                      {
                        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80",
                        alt: "Nanga Parbat at sunrise",
                      },
                      {
                        src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80",
                        alt: "Mountain road at dusk",
                      },
                    ]
                  : [
                      {
                        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80",
                        alt: "Nanga Parbat at sunrise",
                      },
                      {
                        src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80",
                        alt: "Mountain road at dusk",
                      },
                      {
                        src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80",
                        alt: "Trekker on alpine ridge",
                      },
                    ]
          }
        />

        <div className="pointer-events-none relative mx-auto flex min-h-[max(100svh,620px)] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            {/* Left: Main Hero Content */}
            <div className="lg:col-span-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md"
              >
                {t(heroSettings.homepage_hero_badge || "Solo · Slow · Cinematic")}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
              >
                {t(heroSettings.homepage_hero_title || "Stories from the high places")}{" "}
                <span className="text-[#FF7A00]">
                  {t(heroSettings.homepage_hero_title_highlight || "most people only fly over.")}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 max-w-2xl text-sm text-white/85 sm:text-base lg:text-lg"
              >
                {t(
                  heroSettings.homepage_hero_description ||
                    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.",
                )}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="pointer-events-auto mt-8 flex flex-wrap gap-3"
              >
                {isExternal(heroPrimaryTo) ? (
                  <a
                    href={heroPrimaryTo}
                    target={heroPrimaryTo.startsWith("http") ? "_blank" : undefined}
                    rel={heroPrimaryTo.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF7A00]/90 transition-colors shadow-md"
                  >
                    {t(heroSettings.homepage_hero_button_text || "Read the stories")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </a>
                ) : (
                  <Link
                    to={heroPrimaryTo as any}
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF7A00]/90 transition-colors shadow-md"
                  >
                    {t(heroSettings.homepage_hero_button_text || "Read the stories")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                )}
                {isExternal(heroSecondaryTo) ? (
                  <a
                    href={heroSecondaryTo}
                    target={heroSecondaryTo.startsWith("http") ? "_blank" : undefined}
                    rel={heroSecondaryTo.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                  >
                    {t(heroSettings.homepage_hero_secondary_button_text || "Explore destinations")}
                  </a>
                ) : (
                  <Link
                    to={heroSecondaryTo as any}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                  >
                    {t(heroSettings.homepage_hero_secondary_button_text || "Explore destinations")}
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Right: Floating Recent Story Cards (Reference Screenshot style) */}
            <div className="pointer-events-auto hidden lg:col-span-4 lg:flex lg:flex-col lg:gap-3 lg:justify-end">
              {heroFloatingPosts.map((hp) => (
                <Link
                  key={hp.id}
                  to="/blog/$slug"
                  params={{ slug: hp.slug }}
                  className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#FF7A00]/60 hover:bg-black/70 shadow-lg"
                >
                  <div className="relative h-14 w-18 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={
                        hp.cover_image
                          ? resolveMediaUrl(hp.cover_image)
                          : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=75"
                      }
                      alt={getPostTitle(hp)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                      <Calendar className="h-2.5 w-2.5 text-[#FF7A00]" />
                      <span>{formatDate(hp.published_at || hp.created_at)}</span>
                    </div>
                    <h4 className="mt-0.5 line-clamp-2 font-display text-xs font-bold leading-snug text-white transition-colors group-hover:text-[#FF7A00]">
                      {getPostTitle(hp)}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TRENDING / LATEST STORIES SECTION                                      */}
        {/* ========================================================================= */}
        <section aria-labelledby="trending-stories-heading">
          <SectionHeading
            title="Latest Stories"
            badge="Trending"
            subtitle="Fresh dispatches from the high passes, trails, and solitary highways."
            linkText="View all stories"
            linkTo="/blog"
          />
          <TrendingStories
            primaryPost={trendingPrimary}
            secondaryPosts={trendingSecondary}
            categories={categoryMap}
          />
        </section>

        {/* ========================================================================= */}
        {/* 3. FEATURED SECTION                                                       */}
        {/* ========================================================================= */}
        <section aria-labelledby="featured-stories-heading">
          <SectionHeading
            title="Featured Expeditions"
            badge="Curated"
            subtitle="Handpicked long-form stories and remote trail guides."
            linkText="All expeditions"
            linkTo="/blog"
          />
          <FeaturedGrid
            mainFeatured={mainFeatured}
            secondaryFeatured={secondaryFeatured}
            stats={{
              countries,
              trips: Number(heroSettings.homepage_stat_trips) || 102,
              photos: Number(heroSettings.homepage_stat_photos) || 200,
              photosSuffix: heroSettings.homepage_stat_photos_suffix || "K+",
              kilometres: Number(heroSettings.homepage_stat_kilometres) || 18420,
              kilometresSuffix: heroSettings.homepage_stat_kilometres_suffix || " km",
            }}
          />
        </section>

        {/* ========================================================================= */}
        {/* 4. EXPLORE TOPICS / CATEGORIES (Editorial Mosaic Grid)                    */}
        {/* ========================================================================= */}
        {activeTopics.length > 0 && (
          <section aria-labelledby="explore-topics-heading">
            <SectionHeading
              title="Explore Topics"
              badge="Journeys"
              subtitle="Deep dives and curated journeys into the wild — each backed by published stories and route guides."
              linkText="All topics"
              linkTo="/blog"
            />

            {/* Mosaic Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature Topic (Topic 0) - Large / Tall Card */}
              {activeTopics[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="md:col-span-2 lg:col-span-1 lg:row-span-2"
                >
                  <Link
                    to="/topics/$slug"
                    params={{ slug: activeTopics[0].slug }}
                    className="group relative flex h-full min-h-[380px] lg:min-h-[460px] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-lg"
                  >
                    <img
                      src={activeTopics[0].previewImage || activeTopics[0].heroImage}
                      alt={activeTopics[0].title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                    <div className="relative p-6 text-white">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm mb-3">
                        {(() => {
                          const Icon = getTopicIcon(activeTopics[0]);
                          return <Icon className="h-3 w-3" />;
                        })()}
                        <span>
                          {activeTopics[0].postCount}{" "}
                          {activeTopics[0].postCount === 1 ? t("story") : t("stories")}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold leading-tight text-white transition-colors group-hover:text-[#FF7A00] sm:text-3xl">
                        {t(activeTopics[0].title)}
                      </h3>
                      <p className="mt-2 text-sm text-white/80 line-clamp-3">
                        {t(activeTopics[0].subtitle || activeTopics[0].description)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
                        {t("Explore Topic")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Supporting Topics (Topics 1 to 4) */}
              {activeTopics.slice(1, 5).map((topic, idx) => {
                const Icon = getTopicIcon(topic);
                return (
                  <motion.div
                    key={topic.slug}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <Link
                      to="/topics/$slug"
                      params={{ slug: topic.slug }}
                      className="group relative flex h-full min-h-[210px] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md"
                    >
                      <img
                        src={topic.previewImage || topic.heroImage}
                        alt={topic.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="relative p-5 text-white">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10 mb-2">
                          <Icon className="h-3 w-3" />
                          <span>
                            {topic.postCount}{" "}
                            {topic.postCount === 1 ? t("story") : t("stories")}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold leading-tight text-white transition-colors group-hover:text-[#FF7A00]">
                          {t(topic.title)}
                        </h3>
                        <p className="mt-1 text-xs text-white/75 line-clamp-1">
                          {t(topic.subtitle || topic.description)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. JOURNEY IN NUMBERS (Compact Integrated Stats Bar)                      */}
      {/* ========================================================================= */}
      <section
        id="journey-in-numbers"
        aria-labelledby="journey-numbers-heading"
        className="scroll-mt-24 border-y border-border bg-muted/20 py-14 sm:py-16"
      >
        <div ref={journeyRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p data-reveal="heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00]">
                {t("By the numbers")}
              </p>
              <h2
                data-reveal="heading"
                id="journey-numbers-heading"
                className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                {t("Journey in numbers")}
              </h2>
            </div>
            <p data-reveal="heading" className="max-w-md text-xs text-muted-foreground sm:text-sm">
              {t("A quiet tally of countries crossed, trips ridden and photographs made along the way.")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div
                key={s.label}
                data-reveal={s.featured ? "featured" : "card"}
                className={`jin-card rounded-2xl border border-border bg-card p-4.5 transition-all duration-300 hover:border-[#FF7A00]/40 ${
                  s.featured ? "jin-featured" : ""
                }`}
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]">
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="mt-3 font-display text-2xl font-bold sm:text-3xl text-foreground">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Compact Travel Summary Highlights */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latestMoto && (
              <Link
                data-reveal="info"
                to="/blog/$slug"
                params={{ slug: latestMoto.slug }}
                className="jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[150px]"
              >
                <img
                  src={
                    latestMoto.cover_image ||
                    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=75"
                  }
                  alt={latestMoto.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="relative flex h-full flex-col justify-between p-4 text-white">
                  <div className="inline-flex w-fit items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10">
                    <Bike className="h-3 w-3" /> {t("Latest trip")}
                  </div>
                  <h3 className="line-clamp-2 font-display text-sm font-semibold text-white group-hover:text-[#FF7A00] transition-colors">
                    {latestMoto.title}
                  </h3>
                </div>
              </Link>
            )}

            {latestDest && (
              <Link
                data-reveal="info"
                to="/destinations/$slug"
                params={{ slug: latestDest.slug }}
                className="jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[150px]"
              >
                <img
                  src={
                    latestDest.featured_image ||
                    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=75"
                  }
                  alt={latestDest.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="relative flex h-full flex-col justify-between p-4 text-white">
                  <div className="inline-flex w-fit items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10">
                    <MapPin className="h-3 w-3" /> {t("Recent destination")}
                  </div>
                  <div>
                    <h3 className="line-clamp-2 font-display text-sm font-semibold text-white group-hover:text-[#FF7A00] transition-colors">
                      {latestDest.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-white/70">
                      {latestDest.country}
                      {latestDest.region ? ` · ${latestDest.region}` : ""}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            <Link
              data-reveal="info"
              to="/destinations"
              hash="interactive-map"
              className="jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[150px]"
            >
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=75"
                alt="Karakoram Highway"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              <div className="relative flex h-full flex-col justify-between p-4 text-white">
                <div className="inline-flex w-fit items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10">
                  <RouteIcon className="h-3 w-3" /> {t("Longest journey")}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-white group-hover:text-[#FF7A00] transition-colors">
                    Karakoram Highway
                  </h3>
                  <p className="mt-0.5 text-[11px] text-white/70">1,840 km · Solo Route</p>
                </div>
              </div>
            </Link>

            {latestPhoto && (
              <Link
                data-reveal="info"
                to="/gallery"
                className="jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[150px]"
              >
                <img
                  src={
                    latestPhoto.image_url ||
                    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=75"
                  }
                  alt={latestPhotoCaption || "Gallery photo"}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="relative flex h-full flex-col justify-between p-4 text-white">
                  <div className="inline-flex w-fit items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10">
                    <Camera className="h-3 w-3" /> {t("Latest photo")}
                  </div>
                  <h3 className="line-clamp-2 font-display text-sm font-semibold text-white group-hover:text-[#FF7A00] transition-colors">
                    {latestPhotoCaption || "From the gallery"}
                  </h3>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Container 2 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        {/* ========================================================================= */}
        {/* 6. FEATURED DESTINATIONS (4-Column Editorial Grid)                        */}
        {/* ========================================================================= */}
        <section id="interactive-map" aria-labelledby="featured-destinations-heading" className="scroll-mt-24">
          <SectionHeading
            title="Featured Destinations"
            badge="Where to Go"
            subtitle="Iconic base camps, alpine valleys, and high-altitude highways."
            linkText="All destinations"
            linkTo="/destinations"
            rightElement={
              <div
                role="tablist"
                aria-label={t("View destinations as map or grid")}
                className="inline-flex items-center rounded-full border border-border bg-background p-1 text-xs"
              >
                <button
                  role="tab"
                  aria-selected={destView === "grid"}
                  onClick={() => setDestView("grid")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                    destView === "grid"
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>{t("Grid")}</span>
                </button>
                <button
                  role="tab"
                  aria-selected={destView === "map"}
                  onClick={() => setDestView("map")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                    destView === "map"
                      ? "bg-[#FF7A00] text-white font-medium shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <MapIcon className="h-3.5 w-3.5" />
                  <span>{t("Map")}</span>
                </button>
              </div>
            }
          />

          {destView === "map" ? (
            <Suspense
              fallback={
                <div className="h-[380px] sm:h-[440px] lg:h-[480px] w-full animate-pulse rounded-2xl border border-border bg-muted/30" />
              }
            >
              <DestinationsMap destinations={destinations} />
            </Suspense>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.length === 0
                ? Array.from({ length: 4 }).map((_, i) => <DestinationCardSkeleton key={i} />)
                : destinations.slice(0, 8).map((d, i) => (
                    <motion.article
                      key={d.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md"
                    >
                      <Link to="/destinations/$slug" params={{ slug: d.slug }} className="block">
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          <img
                            src={
                              d.featured_image ||
                              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
                            }
                            alt={d.title}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              if (!target.src.includes("unsplash.com")) {
                                target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
                              }
                            }}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF7A00]">
                              {t(d.country)}
                              {d.region ? ` · ${t(d.region)}` : ""}
                            </p>
                            <h3 className="mt-0.5 font-display text-lg font-bold leading-tight group-hover:text-[#FF7A00] transition-colors">
                              {t(d.title)}
                            </h3>
                          </div>
                        </div>
                        {d.description && (
                          <div className="p-3.5">
                            <p className="line-clamp-2 text-xs text-muted-foreground">
                              {t(d.description)}
                            </p>
                          </div>
                        )}
                      </Link>
                    </motion.article>
                  ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 7. FIELD NOTES & PHOTOGRAPHY (Editorial Asymmetric Gallery Grid)          */}
        {/* ========================================================================= */}
        {gallery.length > 0 && (
          <section aria-labelledby="field-notes-heading">
            <SectionHeading
              title="Field Notes & Photography"
              badge="Visual Journal"
              subtitle="Moments captured in silence above 4,000 metres across the Karakoram and Himalaya."
              linkText="Full gallery"
              linkTo="/gallery"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Spotlight image (first item - large span 2) */}
              {gallery[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
                >
                  <Link
                    to="/gallery"
                    className="group relative block aspect-[16/10] sm:aspect-auto sm:h-full min-h-[260px] lg:min-h-[360px] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
                  >
                    <img
                      src={gallery[0].image_url}
                      alt={gallery[0].caption || "Expedition photograph"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-5">
                      <div>
                        <span className="rounded-full bg-[#FF7A00] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          {t("Spotlight")}
                        </span>
                        {gallery[0].caption && (
                          <p className="mt-2 font-display text-base font-bold text-white line-clamp-2">
                            {t(gallery[0].caption)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Supporting gallery items */}
              {gallery.slice(1, 5).map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Link
                    to="/gallery"
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
                  >
                    <img
                      src={item.image_url}
                      alt={item.caption || "Expedition photograph"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3.5">
                      {item.caption && (
                        <p className="text-xs font-medium text-white line-clamp-2">
                          {t(item.caption)}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 8. NEWSLETTER DISPATCH SIGNUP                                             */}
        {/* ========================================================================= */}
        <section aria-labelledby="newsletter-heading" className="pb-8">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-muted/50 p-8 text-center sm:p-12 shadow-sm">
            <div className="mx-auto max-w-2xl">
              <span className="rounded-full bg-[#FF7A00]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">
                {t("Join the Journey")}
              </span>
              <h2
                id="newsletter-heading"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {t("Get the next dispatch")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                {t(
                  "One email when a new expedition story drops. No spam, no algorithm noise.",
                )}
              </p>
              <div className="mx-auto mt-6 max-w-md">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
