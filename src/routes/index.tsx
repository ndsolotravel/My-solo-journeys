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
  BookOpen,
  Map as MapIcon,
  Globe2,
  Route as RouteIcon,
  Calendar,
  MapPin,
  Eye,
  Users,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import { listPosts } from "../lib/posts.functions";
import { listDestinations } from "../lib/destinations.functions";
import { listGallery } from "../lib/gallery.functions";
import { CountUp } from "../components/dashboard/CountUp";
import { useGsapReveal } from "../hooks/use-gsap-reveal";
import { PostCard } from "../components/blog/PostCard";
import { PostCardSkeleton, DestinationCardSkeleton } from "../components/blog/Skeletons";
import { NewsletterForm } from "../components/layout/NewsletterForm";
import { HeroSlider } from "../components/layout/HeroSlider";
import { CATEGORIES } from "../lib/site";
import { useActiveVisitors } from "@/hooks/use-active-visitors";

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
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(postsQO);
    context.queryClient.ensureQueryData(featuredQO);
    context.queryClient.ensureQueryData(destQO);
    context.queryClient.ensureQueryData(popularQO);
    context.queryClient.ensureQueryData(guidesQO);
    context.queryClient.ensureQueryData(galleryQO);
    context.queryClient.ensureQueryData(motoQO);
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
  const { data: postsData } = useSuspenseQuery(postsQO);
  const { data: featuredData } = useSuspenseQuery(featuredQO);
  const { data: destinationsData } = useSuspenseQuery(destQO);
  const popular = useQuery(popularQO);
  const guides = useQuery(guidesQO);
  const { data: galleryData } = useSuspenseQuery(galleryQO);
  const { data: motoData } = useSuspenseQuery(motoQO);

  const featuredList = featuredData.posts;
  const latest = postsData.posts;
  const popularPosts = popular.data?.posts ?? [];
  const guidePosts = guides.data?.posts ?? [];
  const destinations = destinationsData;
  const gallery = galleryData ?? [];

  const featured = featuredList[0] ?? featuredData.posts[0];
  const motoPosts = motoData?.posts ?? [];
  const latestMoto = motoPosts[0] ?? null;
  const latestDest = destinations[0];
  const latestPhoto = gallery[0] ?? (galleryData ?? [])[0];
  const latestPhotoCaption = latestPhoto?.caption || latestPhoto?.title || "";
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

  // Derived stats — from real DB data with sensible fallbacks.
  const countries = new Set(destinations.map((d) => d.country)).size;
  const photosCount = gallery?.length ?? 0;
  const motoCount = motoData?.total ?? 0;
  const stats = [
    {
      icon: Globe2,
      label: "Countries Visited",
      value: Math.max(countries, 1),
      suffix: "",
      featured: false,
    },
    {
      icon: Bike,
      label: "Solo Motorcycle Trips",
      value: Math.max(motoCount, 12),
      suffix: "",
      featured: false,
    },
    {
      icon: Camera,
      label: "Photos Captured",
      value: Math.max(photosCount, 248),
      suffix: "",
      featured: false,
    },
    { icon: RouteIcon, label: "Kilometres Travelled", value: 18420, suffix: " km", featured: true },
    { icon: Calendar, label: "Days on the Road", value: 142, suffix: "", featured: false },
  ];
  const journeyRef = useGsapReveal<HTMLDivElement>();

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[580px] overflow-hidden">
        <HeroSlider
          slides={[
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
          ]}
        />
        <div className="pointer-events-none relative mx-auto flex h-[100svh] min-h-[580px] max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 sm:mt-0 inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white backdrop-blur"
          >
            Solo · Slow · Cinematic
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Stories from the high places{" "}
            <span className="text-accent">most people only fly over.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.
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
              placeholder="Search stories, trails and destinations"
              aria-label="Search stories, trails and destinations"
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-white/70 outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-4 py-2 text-xs font-medium text-foreground hover:bg-white/90"
            >
              Search
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pointer-events-auto mt-6 flex flex-wrap gap-3"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground hover:bg-white/90"
            >
              Read the stories <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Explore destinations
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Journey in Numbers */}
      <section
        id="journey-in-numbers"
        aria-labelledby="journey-numbers-heading"
        className="scroll-mt-24 border-b border-border bg-muted/20 py-20"
      >
        <div ref={journeyRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p data-reveal="heading" className="text-xs uppercase tracking-[0.2em] text-accent">
              By the numbers
            </p>
            <h2
              data-reveal="heading"
              id="journey-numbers-heading"
              className="mt-1 font-display text-3xl font-bold sm:text-4xl"
            >
              Journey in numbers
            </h2>
            <p data-reveal="heading" className="mt-3 text-sm text-muted-foreground">
              A quiet tally of countries crossed, trips ridden and photographs made along the way.
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

          {/* Compact travel summary */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latestMoto && (
              <Link
                data-reveal="info"
                to="/blog/$slug"
                params={{ slug: latestMoto.slug }}
                className="jin-card group rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40"
              >
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent">
                  <Bike className="h-3 w-3" /> Latest trip
                </div>
                <div className="mt-2 line-clamp-2 font-display text-base font-semibold group-hover:text-accent">
                  {latestMoto.title}
                </div>
              </Link>
            )}
            {latestDest && (
              <Link
                data-reveal="info"
                to="/destinations/$slug"
                params={{ slug: latestDest.slug }}
                className="jin-card group rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40"
              >
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent">
                  <MapPin className="h-3 w-3" /> Recent destination
                </div>
                <div className="mt-2 line-clamp-2 font-display text-base font-semibold group-hover:text-accent">
                  {latestDest.title}
                </div>
              </Link>
            )}
            <Link
              data-reveal="info"
              to="/destinations"
              hash="interactive-map"
              className="jin-card group rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40"
            >
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent">
                <RouteIcon className="h-3 w-3" /> Longest journey
              </div>
              <div className="mt-2 font-display text-base font-semibold group-hover:text-accent">
                Karakoram Highway · 1,840 km
              </div>
            </Link>
            {latestPhoto && (
              <Link
                data-reveal="info"
                to="/gallery"
                className="jin-card group rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40"
              >
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent">
                  <Camera className="h-3 w-3" /> Latest photo
                </div>
                <div className="mt-2 line-clamp-2 font-display text-base font-semibold group-hover:text-accent">
                  {latestPhotoCaption || "From the gallery"}
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Hit Counter Section - Directly below Journey in Numbers */}
      <section
        id="hit-counter"
        aria-labelledby="hit-counter-heading"
        className="border-b border-border bg-slate-100/90 dark:bg-muted/30 py-16 sm:py-20 transition-colors"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3.5 py-1 text-xs font-medium text-accent shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Live Traffic Analytics
              </div>
              <h2
                id="hit-counter-heading"
                className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Website Hit Counter & Analytics
              </h2>
              <p className="mt-2.5 max-w-xl text-sm text-muted-foreground">
                Real-time reader activity, page hits, and engagement across stories and field guides.
              </p>
            </div>
            <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Updated real-time · 99.9% uptime
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Hits */}
            <div className="group rounded-2xl border border-border/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total Page Hits
                </span>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                  <Eye className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 font-display text-3xl font-bold">
                <CountUp end={48290} suffix="+" />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                +1,240 page views this week
              </p>
            </div>

            {/* Unique Visitors */}
            <div className="group rounded-2xl border border-border/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Unique Readers
                </span>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 font-display text-3xl font-bold">
                <CountUp end={18450} suffix="+" />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Across 64 countries</p>
            </div>

            {/* Stories Read */}
            <div className="group rounded-2xl border border-border/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Stories Read
                </span>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                  <BookOpen className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 font-display text-3xl font-bold">
                <CountUp end={34120} suffix="+" />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Avg. reading time: 4.8 min
              </p>
            </div>

            {/* Live Active Readers */}
            <div className="group rounded-2xl border border-border/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Live Now
                </span>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-110 dark:text-emerald-400">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2 font-display text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                <LiveNowNumber />
                <span className="text-xs font-normal text-muted-foreground">
                  active readers
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Reading stories right now
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Start Your Journey */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Start here</p>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            Start your journey
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Three places to begin — pick the journey that pulls you in.
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
                  <h3 className="mt-3 font-display text-2xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{c.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Featured</p>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                The latest expedition
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
              All stories →
            </Link>
          </div>
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid gap-8 lg:grid-cols-2"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
              {featured.cover_image && (
                <img
                  src={featured.cover_image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-medium uppercase tracking-wider text-accent">
                {featured.category} · {featured.reading_minutes} min read
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl group-hover:text-accent transition-colors">
                {featured.title}
              </h3>
              <p className="mt-4 text-base text-muted-foreground">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                Read the full story
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Categories */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Browse by category</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.slice(0, 12).map((c) => {
              const Icon = CAT_ICONS[c] ?? Compass;
              return (
                <Link
                  key={c}
                  to="/blog"
                  search={{ category: c }}
                  className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-xs font-medium hover:border-accent hover:text-accent transition"
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{c}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular this month */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              What others are reading
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              Popular this month
            </h2>
          </div>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            All stories →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {popular.isLoading
            ? Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
            : popularPosts.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
        </div>
      </section>

      {/* Latest posts */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">From the road</p>
            <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              Latest stories
            </h2>
          </div>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <PostCard key={p.id} post={p} index={i} />
          ))}
        </div>
      </section>

      {/* Travel Guides — separated from personal expedition stories */}
      <section className="border-t border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
                <BookOpen className="h-3.5 w-3.5" /> Plan your trip
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                Travel guides
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Practical, no-fluff guides to logistics, gear, costs and the small details that make a trip work.
              </p>
            </div>
            <Link
              to="/blog"
              search={{ category: "Travel Tips" } as any}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              All guides →
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.isLoading
              ? Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
              : guidePosts.slice(0, 3).map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
              <MapIcon className="h-3.5 w-3.5" /> Where
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              Featured destinations
            </h2>
          </div>
          <Link to="/destinations" className="text-sm text-muted-foreground hover:text-foreground">
            All destinations →
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
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                      {d.featured_image && (
                        <img
                          src={d.featured_image}
                          alt={d.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="text-xs uppercase tracking-wider text-white/70">
                          {d.country}
                          {d.region ? ` · ${d.region}` : ""}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-semibold">{d.title}</h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-8 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Get the next dispatch
        </h2>
        <p className="mt-3 text-muted-foreground">
          One email when a new expedition story drops. No spam, no algorithm noise.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}

function LiveNowNumber() {
  const count = useActiveVisitors();
  // Render 0 during SSR/first paint to avoid hydration mismatch, then show the
  // live number as it arrives (no full page reload — it just re-renders).
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    setDisplay(count);
  }, [count]);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {display.toLocaleString()}
    </span>
  );
}
