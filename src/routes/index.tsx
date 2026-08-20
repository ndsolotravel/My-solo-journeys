import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Mountain,
  Camera,
  Bike,
  Search,
  Map as MapIcon,
  Globe2,
  Route as RouteIcon,
  Calendar,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { listPosts, getJourneyStats } from "../lib/posts.functions";
import { listDestinations } from "../lib/destinations.functions";
import { listGallery } from "../lib/gallery.functions";
import { getHomepageConfig } from "../lib/homepage.functions";
import { CountUp } from "../components/dashboard/CountUp";
import { useGsapReveal } from "../hooks/use-gsap-reveal";
import { PostCard } from "../components/blog/PostCard";
import { PostCardSkeleton, DestinationCardSkeleton } from "../components/blog/Skeletons";
import { NewsletterForm } from "../components/layout/NewsletterForm";
import { HeroSlider } from "../components/layout/HeroSlider";
import { CATEGORIES } from "../lib/site";
import { useTranslations } from "@/lib/translate/store";
import { resolveMediaUrl } from "@/lib/admin.functions";

const postsQO = queryOptions({
  queryKey: ["home", "posts"],
  queryFn: () => listPosts({ data: { limit: 6 } }),
});
const featuredQO = queryOptions({
  queryKey: ["home", "featured"],
  queryFn: () => listPosts({ data: { limit: 1, featuredOnly: true } }),
});
const destQO = queryOptions({
  queryKey: ["home", "destinations"],
  queryFn: () => listDestinations(),
});
const popularQO = queryOptions({
  queryKey: ["home", "popular"],
  queryFn: () => listPosts({ data: { limit: 3, sort: "popular", sinceDays: 30 } }),
});
const guidesQO = queryOptions({
  queryKey: ["home", "guides"],
  queryFn: () =>
    listPosts({
      data: {
        limit: 3,
        categories: ["Travel Tips", "Travel Gear", "Budget Travel", "Pakistan Tourism"],
      },
    }),
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
      context.queryClient.ensureQueryData(popularQO),
      context.queryClient.ensureQueryData(guidesQO),
      context.queryClient.ensureQueryData(galleryQO),
      context.queryClient.ensureQueryData(motoQO),
      context.queryClient.ensureQueryData(journeyStatsQO),
      context.queryClient.ensureQueryData(homepageQO),
    ]);
  },
  component: HomePage,
});

const CAT_ICONS: Record<string, typeof Mountain> = {
  Trekking: Mountain,
  Mountains: Mountain,
  "Motorcycle Adventure Travel": Bike,
  Photography: Camera,
  "Solo Travel": Compass,
};

const JOURNEY_CARDS = [
  {
    title: "Solo Travel",
    body: "Diaries, lessons and practical notes from travelling alone — the slow way.",
    to: "/blog",
    search: { category: "Solo Travel" as const },
    icon: Compass,
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=70",
  },
  {
    title: "Motorcycle Journeys",
    body: "Karakoram, Deosai and beyond — long rides, route notes and machine prep.",
    to: "/blog",
    search: { category: "Motorcycle Adventure Travel" as const },
    icon: Bike,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=70",
  },
  {
    title: "Trekking Guides",
    body: "Step-by-step trekking guides, gear, altitude advice and trip planning.",
    to: "/blog",
    search: { category: "Trekking" as const },
    icon: Mountain,
    img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=900&q=70",
  },
] as const;

function HomePage() {
  const t = useTranslations();
  const { data: postsData } = useSuspenseQuery(postsQO);
  const { data: featuredData } = useSuspenseQuery(featuredQO);
  const { data: destinationsData } = useSuspenseQuery(destQO);
  const popular = useQuery(popularQO);
  const guides = useQuery(guidesQO);
  const { data: galleryData } = useSuspenseQuery(galleryQO);
  const { data: motoData } = useSuspenseQuery(motoQO);
  const { data: journeyStats } = useSuspenseQuery(journeyStatsQO);
  const { data: homepageConfig } = useSuspenseQuery(homepageQO);

  const featuredList = featuredData.posts;
  const latest = postsData.posts;
  const popularPosts = popular.data?.posts ?? [];
  const guidePosts = guides.data?.posts ?? [];
  const destinations = destinationsData;
  const gallery = galleryData ?? [];

  const heroSettings = homepageConfig?.settings ?? {};
  const heroMode = heroSettings.homepage_hero_mode === "manual" ? "manual" : "auto";
  const featuredMode = heroSettings.homepage_featured_mode === "manual" ? "manual" : "auto";
  const heroSource = homepageConfig?.heroPost ?? null;

  const featured = featuredMode === "manual"
    ? (homepageConfig?.featuredPost ?? featuredList[0] ?? featuredData.posts[0])
    : featuredList[0] ?? featuredData.posts[0];
  const motoPosts = motoData?.posts ?? [];
  const latestMoto = motoPosts[0] ?? null;
  const latestDest = destinations[0];
  const latestPhoto = gallery[0] ?? (galleryData ?? [])[0];
  const latestPhotoCaption = latestPhoto?.caption || "";
  const [heroQuery, setHeroQuery] = useState("");
  const navigate = useNavigate();

  // Smooth-scroll to #journey-in-numbers when arriving via redirect.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#journey-in-numbers") {
      requestAnimationFrame(() =>
        document
          .getElementById("journey-in-numbers")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = heroQuery.trim();
    if (!q) return;
    navigate({ to: "/blog", search: { q } as any });
  };

  // Derived stats — Countries Visited automatically calculated from published blog post locations
  const calculatedCountries = journeyStats?.countriesCount ?? 1;
  const countriesMode = heroSettings.homepage_stat_countries_mode === "manual" ? "manual" : "auto";
  const countries = countriesMode === "manual"
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
    { icon: Calendar, label: t("Days on the Road"), value: Number(heroSettings.homepage_stat_days) || 142, suffix: "", featured: false },
  ];
  const journeyRef = useGsapReveal<HTMLDivElement>();

  const isExternal = (link?: string) => {
    const target = ((link || "").trim()).toLowerCase();
    return target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:");
  };
  const heroPrimaryTo = heroSettings.homepage_hero_button_link?.trim() || "/blog";
  const heroSecondaryTo = heroSettings.homepage_hero_secondary_button_link?.trim() || "/destinations";

  return (
    <div>
      {/* 1. Hero */}
      <section className="relative min-h-[max(100svh,580px)] overflow-hidden">
        <HeroSlider
          slides={
            heroSettings.homepage_hero_image
              ? [{ src: resolveMediaUrl(heroSettings.homepage_hero_image), alt: "Custom hero background" }]
              : (heroMode === "manual" && heroSource?.cover_image)
                ? [{ src: heroSource.cover_image, alt: heroSource.title }]
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
        <div className="pointer-events-none relative mx-auto flex min-h-[max(100svh,580px)] max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 sm:mt-0 inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white backdrop-blur"
          >
            {t(heroSettings.homepage_hero_badge || "Solo · Slow · Cinematic")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            {t(heroSettings.homepage_hero_title || "Stories from the high places")}{" "}
            <span className="text-accent">{t(heroSettings.homepage_hero_title_highlight || "most people only fly over.")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            {t(heroSettings.homepage_hero_description ||
              "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.")}
          </motion.p>

          {/* Hero search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            onSubmit={submitSearch}
            className="pointer-events-auto mt-7 flex w-full max-w-xl items-center gap-2 rounded-full border border-white/30 bg-white/10 px-2 py-1.5 backdrop-blur-md"
          >
            <Search className="ml-3 h-4 w-4 text-white/80" aria-hidden />
            <input
              value={heroQuery}
              onChange={(e) => setHeroQuery(e.target.value)}
              type="search"
              placeholder={t("Search stories, trails and destinations")}
              aria-label={t("Search stories, trails and destinations")}
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-white/70 outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-4 py-2 text-xs font-medium text-foreground hover:bg-white/90 cursor-pointer"
            >
              {t("Search")}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pointer-events-auto mt-6 flex flex-wrap gap-3"
          >
            {isExternal(heroPrimaryTo) ? (
              <a
                href={heroPrimaryTo}
                target={heroPrimaryTo.startsWith("http") ? "_blank" : undefined}
                rel={heroPrimaryTo.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground hover:bg-white/90 transition-colors"
              >
                {t(heroSettings.homepage_hero_button_text || "Read the stories")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            ) : (
              <Link
                to={heroPrimaryTo as "/blog"}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground hover:bg-white/90 transition-colors"
              >
                {t(heroSettings.homepage_hero_button_text || "Read the stories")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            )}
            {isExternal(heroSecondaryTo) ? (
              <a
                href={heroSecondaryTo}
                target={heroSecondaryTo.startsWith("http") ? "_blank" : undefined}
                rel={heroSecondaryTo.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                {t(heroSettings.homepage_hero_secondary_button_text || "Explore destinations")}
              </a>
            ) : (
              <Link
                to={heroSecondaryTo as "/destinations"}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                {t(heroSettings.homepage_hero_secondary_button_text || "Explore destinations")}
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. Choose Your Journey (Start your journey) */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Start here")}</p>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            {t("Choose Your Journey")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("Three pathways into the wild — pick the route that pulls you in.")}
          </p>
        </div>
<div className="grid gap-6 md:grid-cols-3">
          {JOURNEY_CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                search={c.search as any}
                className="group relative block overflow-hidden rounded-2xl border border-border"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="mt-3 font-display text-2xl font-semibold">{t(c.title)}</h3>
                  <p className="mt-2 text-sm text-white/80">{t(c.body)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
                    {t("Explore")}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Expedition */}
      {featured && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Featured")}</p>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                {t("The latest expedition")}
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
              {t("All stories")} →
            </Link>
          </div>
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid gap-8 lg:grid-cols-2 rounded-3xl border border-border bg-card p-4 sm:p-6 transition-all duration-300 hover:border-accent/40 shadow-sm"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              {featured.cover_image && (
                <img
                  src={featured.cover_image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
            </div>
            <div className="flex flex-col justify-center py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-accent">
                {featured.category ? t(featured.category) : ""} · {featured.reading_minutes} {t("min read")}
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl group-hover:text-accent transition-colors">
                {t(featured.title)}
              </h3>
              {featured.excerpt && (
                <p className="mt-4 text-base text-muted-foreground line-clamp-3">{t(featured.excerpt)}</p>
              )}
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                {t("Read the full story")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* 4. Journey in Numbers */}
      <section
        id="journey-in-numbers"
        aria-labelledby="journey-numbers-heading"
        className="scroll-mt-24 border-y border-border bg-muted/20 py-20"
      >
        <div ref={journeyRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p data-reveal="heading" className="text-xs uppercase tracking-[0.2em] text-accent">
              {t("By the numbers")}
            </p>
            <h2
              data-reveal="heading"
              id="journey-numbers-heading"
              className="mt-1 font-display text-3xl font-bold sm:text-4xl"
            >
              {t("Journey in numbers")}
            </h2>
            <p data-reveal="heading" className="mt-3 text-sm text-muted-foreground">
              {t("A quiet tally of countries crossed, trips ridden and photographs made along the way.")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div
                key={s.label}
                data-reveal={s.featured ? "featured" : "card"}
                className={`jin-card rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40 ${s.featured ? "jin-featured" : ""}`}
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]">
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Compact travel summary — Rich Photo Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latestMoto && (
              <Link
                data-reveal="info"
                to="/blog/$slug"
                params={{ slug: latestMoto.slug }}
                className="jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 hover:shadow-md aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[160px]"
              >
                <img
                  src={latestMoto.cover_image || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=75"}
                  alt={latestMoto.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="relative flex h-full flex-col justify-between p-5 text-white">
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur-md border border-white/10">
                    <Bike className="h-3 w-3" /> {t("Latest trip")}
                  </div>
                  <div className="mt-4">
                    <h3 className="line-clamp-2 font-display text-base font-semibold text-white group-hover:text-accent transition-colors">
                      {latestMoto.title}
                    </h3>
                  </div>
                </div>
              </Link>
            )}
            {latestDest && (
              <Link
                data-reveal="info"
                to="/destinations/$slug"
                params={{ slug: latestDest.slug }}
                className="jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 hover:shadow-md aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[160px]"
              >
                <img
                  src={latestDest.featured_image || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=75"}
                  alt={latestDest.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="relative flex h-full flex-col justify-between p-5 text-white">
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur-md border border-white/10">
                    <MapPin className="h-3 w-3" /> {t("Recent destination")}
                  </div>
                  <div className="mt-4">
                    <h3 className="line-clamp-2 font-display text-base font-semibold text-white group-hover:text-accent transition-colors">
                      {latestDest.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/70">
                      {latestDest.country}{latestDest.region ? ` · ${latestDest.region}` : ""}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            <Link
              data-reveal="info"
              to="/destinations"
              hash="interactive-map"
              className="jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 hover:shadow-md aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[160px]"
            >
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=75"
                alt="Karakoram Highway"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              <div className="relative flex h-full flex-col justify-between p-5 text-white">
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur-md border border-white/10">
                  <RouteIcon className="h-3 w-3" /> {t("Longest journey")}
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-base font-semibold text-white group-hover:text-accent transition-colors">
                    Karakoram Highway
                  </h3>
                  <p className="mt-1 text-xs text-white/70">1,840 km · Solo Motorcycle Route</p>
                </div>
              </div>
            </Link>
            {latestPhoto && (
              <Link
                data-reveal="info"
                to="/gallery"
                className="jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 hover:shadow-md aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[160px]"
              >
                <img
                  src={latestPhoto.image_url || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=75"}
                  alt={latestPhotoCaption || "Gallery photo"}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="relative flex h-full flex-col justify-between p-5 text-white">
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur-md border border-white/10">
                    <Camera className="h-3 w-3" /> {t("Latest photo")}
                  </div>
                  <div className="mt-4">
                    <h3 className="line-clamp-2 font-display text-base font-semibold text-white group-hover:text-accent transition-colors">
                      {latestPhotoCaption || "From the gallery"}
                    </h3>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 5. Latest Stories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("From the road")}</p>
            <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              {t("Latest stories")}
            </h2>
          </div>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            {t("View all")} →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <PostCard key={p.id} post={p} index={i} />
          ))}
        </div>
      </section>

      {/* 6. Featured Destinations */}
      <section className="border-t border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
                <MapIcon className="h-3.5 w-3.5" /> {t("Where")}
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                {t("Featured destinations")}
              </h2>
            </div>
            <Link to="/destinations" className="text-sm text-muted-foreground hover:text-foreground">
              {t("All destinations")} →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.length === 0
              ? Array.from({ length: 4 }).map((_, i) => <DestinationCardSkeleton key={i} />)
              : destinations.slice(0, 8).map((d, i) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Link to="/destinations/$slug" params={{ slug: d.slug }} className="group block">
                      <div className="relative aspect-[16/10] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                        <img
                          src={d.featured_image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"}
                          alt={d.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <p className="text-xs uppercase tracking-wider text-white/70">
                            {t(d.country)}
                            {d.region ? ` · ${t(d.region)}` : ""}
                          </p>
                          <h3 className="mt-1 font-display text-xl font-semibold">{t(d.title)}</h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* 7. Photography / Gallery Section */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
                <Camera className="h-3.5 w-3.5" /> {t("Visual journal")}
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                {t("Photography")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("Moments captured in silence above 4,000 metres.")}
              </p>
            </div>
            <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground">
              {t("Full gallery")} →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.slice(0, 6).map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  to="/gallery"
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted"
                >
                  <img
                    src={item.image_url}
                    alt={item.caption || "Expedition photograph"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                    {item.caption && (
                      <p className="text-xs font-medium text-white line-clamp-2">{t(item.caption)}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Newsletter */}
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-8 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          {t("Get the next dispatch")}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {t("One email when a new expedition story drops. No spam, no algorithm noise.")}
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
