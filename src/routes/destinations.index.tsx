import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion, MotionConfig } from "framer-motion";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { ArrowUpRight, BookOpen, Globe2, MountainSnow, Route as RouteIcon } from "lucide-react";
import { listDestinations } from "../lib/destinations.functions";
import type { Destination } from "../lib/destinations.functions";
import { getPageHeroConfig } from "../lib/page-hero.functions";
import { AdSlot } from "@/components/ads/AdSlot";
import { useTranslations } from "@/lib/translate/store";
import { AtlasHero } from "@/components/destinations/AtlasHero";
import { ExpeditionTile } from "@/components/destinations/ExpeditionTile";
import { FeaturedExpedition } from "@/components/destinations/FeaturedExpedition";

const DestinationsMap = lazy(() =>
  import("@/components/destinations/DestinationsMap").then((m) => ({ default: m.DestinationsMap })),
);

const destQO = queryOptions({
  queryKey: ["destinations"],
  queryFn: () => listDestinations(),
});

const heroQO = queryOptions({
  queryKey: ["page-hero", "destinations"],
  queryFn: () => getPageHeroConfig({ data: "destinations" }),
});

const CATEGORIES = [
  "Mountains",
  "Motorcycle Journeys",
  "Trekking",
  "Adventure",
  "Cultural Experiences",
];

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations — ndsolotravel" },
      {
        name: "description",
        content:
          "Country and region guides: Pakistan, Karakoram, Nanga Parbat, Hunza and trekking routes.",
      },
      { property: "og:title", content: "Destinations — ndsolotravel" },
      { property: "og:description", content: "Country and region guides for solo travellers." },
      { property: "og:url", content: "/destinations" },
    ],
    links: [{ rel: "canonical", href: "/destinations" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
            { "@type": "ListItem", position: 2, name: "Destinations" },
          ],
        }),
      },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(destQO),
      context.queryClient.ensureQueryData(heroQO),
    ]).then(() => undefined),
  component: DestinationsPage,
});

const EASE = [0.16, 1, 0.3, 1] as const;

function DestinationsPage() {
  const t = useTranslations();
  const { data: destinations } = useSuspenseQuery(destQO);
  const { data: hero } = useSuspenseQuery(heroQO);

  const featuredDest = useMemo(() => destinations.find((d) => d.featured), [destinations]);

  const chapters = useMemo(() => {
    const cats: { cat: string; items: Destination[]; startIndex: number }[] = [];
    CATEGORIES.forEach((cat) => {
      const items = destinations.filter((d) => d.category === cat);
      if (items.length > 0) cats.push({ cat, items, startIndex: 0 });
    });
    const uncategorized = destinations.filter(
      (d) => !d.category || !CATEGORIES.includes(d.category),
    );
    if (uncategorized.length > 0)
      cats.push({ cat: "Other Destinations", items: uncategorized, startIndex: 0 });
    let n = 0;
    return cats.map((c) => {
      const start = n;
      n += c.items.length;
      return { ...c, startIndex: start };
    });
  }, [destinations]);

  const stats = useMemo(() => {
    const countries = new Set(destinations.map((d) => d.country));
    const journeyTypes = new Set(destinations.map((d) => d.category).filter(Boolean));
    const stories = destinations.reduce((acc, d) => acc + (d.posts?.length ?? 0), 0);
    return [
      { icon: MountainSnow, label: t("Destinations charted"), value: String(destinations.length) },
      { icon: Globe2, label: t("Countries in the log"), value: String(countries.size) },
      { icon: RouteIcon, label: t("Journeys mapped"), value: String(journeyTypes.size) },
      { icon: BookOpen, label: t("Stories from the road"), value: String(stories) },
    ];
  }, [destinations, t]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.location.hash.replace("#", "");
    const target = ["interactive-map", "map", "chapters", "featured"].includes(raw) ? raw : null;
    if (!target) return;
    requestAnimationFrame(() => {
      document
        .getElementById(target === "map" ? "interactive-map" : target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AtlasHero image={hero?.image} />

      {/* Floating expedition ledger */}
      <div className="atlas-canvas relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 46 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="atlas-ledger -mt-24 rounded-3xl px-6 py-8 sm:px-10 sm:py-9 lg:-mt-32"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00] ring-1 ring-[#FF7A00]/20">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="atlas-ledger-value font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <main className="atlas-canvas mt-16 lg:mt-20">
        <AdSlot className="mt-2" label={t("Sponsored")} heightClass="h-24" />

        {/* The Route Atlas — map + index */}
        <section
          id="interactive-map"
          aria-labelledby="atlas-map-heading"
          className="mt-20 scroll-mt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#FF7A00]">
                {t("The Route Atlas")}
              </p>
              <h2
                id="atlas-map-heading"
                className="atlas-section-title mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
              >
                {t("Every place, mapped.")}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t(
                  "Trailheads, river valleys and border crossings I've fielded so far — pinned from the field log, not from a database of dreams.",
                )}
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[#FF7A00]" />
              {destinations.length} {t("marked")}
            </span>
          </motion.div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <Suspense
                fallback={
                  <div className="h-[380px] w-full animate-pulse rounded-2xl border border-border bg-muted/30 sm:h-[440px] lg:h-[480px]" />
                }
              >
                <DestinationsMap destinations={destinations} />
              </Suspense>
            </motion.div>

            {/* Atlas index — scan-friendly ledger */}
            <motion.aside
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              aria-label={t("Atlas index of destinations")}
            >
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.24em]">
                  {t("Atlas Index")}
                </h3>
                <span className="text-xs font-medium text-muted-foreground">
                  {String(destinations.length).padStart(2, "0")}
                </span>
              </div>
              <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {destinations.map((d, i) => (
                  <li key={d.id}>
                    <Link
                      to="/destinations/$slug"
                      params={{ slug: d.slug }}
                      className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/60"
                    >
                      <span className="atlas-ghost atlas-ghost-dark w-8 shrink-0 font-display text-lg font-extrabold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-sm font-semibold transition-colors group-hover:text-[#FF7A00]">
                          {t(d.title)}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {t(d.country)}
                          {d.category ? ` · ${t(d.category)}` : ""}
                        </span>
                      </span>
                      {d.latitude && d.longitude && (
                        <span className="hidden font-mono text-[10px] font-medium tracking-wide text-muted-foreground/70 xl:inline-block">
                          {Number(d.latitude).toFixed(2)}, {Number(d.longitude).toFixed(2)}
                        </span>
                      )}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF7A00]" />
                    </Link>
                  </li>
                ))}
              </ol>
            </motion.aside>
          </div>
        </section>

        {/* Featured expedition spotlight */}
        {featuredDest && (
          <div className="mt-24">
            <FeaturedExpedition destination={featuredDest} />
          </div>
        )}

        {/* Category chapters */}
        <section id="chapters" aria-labelledby="chapters-heading" className="mt-24 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#FF7A00]">
              {t("The Chapters")}
            </p>
            <h2
              id="chapters-heading"
              className="atlas-section-title mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              {t("Expeditions, by journey.")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t(
                "Each chapter is a mode of travel — the terrain changes, the pace changes, the light changes.",
              )}
            </p>
          </motion.div>

          {destinations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 rounded-2xl border border-border py-24 text-center"
            >
              <p className="font-display text-lg font-semibold">
                {t("The atlas is being compiled.")}
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {t("New expeditions are being logged. Check back soon.")}
              </p>
            </motion.div>
          ) : (
            <div className="mt-16 space-y-24">
              {chapters.map((chapter, cIdx) => (
                <motion.section
                  key={chapter.cat}
                  initial={{ opacity: 0, y: 44 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  aria-labelledby={`chapter-${cIdx}`}
                >
                  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
                    <div className="flex items-center gap-5 sm:gap-7">
                      <span
                        aria-hidden="true"
                        className="atlas-ghost atlas-ghost-dark atlas-chapter-num shrink-0 text-6xl sm:text-7xl"
                      >
                        {String(cIdx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3
                          id={`chapter-${cIdx}`}
                          className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                          {t(chapter.cat)}
                        </h3>
                        <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {chapter.items.length}{" "}
                          {chapter.items.length === 1
                            ? t("expedition fielded")
                            : t("expeditions fielded")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground lg:max-w-sm lg:text-right">
                      {t(
                        "Fielded images, routes and stories under this journey — every tile opens the full field report.",
                      )}
                    </p>
                  </div>
                  <hr className="atlas-rule mt-8" />

                  {/* Chapter layouts */}
                  {chapter.items.length === 1 && (
                    <div className="mt-10">
                      <ExpeditionTile
                        preferred
                        tall
                        index={chapter.startIndex}
                        destination={chapter.items[0]}
                      />
                    </div>
                  )}

                  {chapter.items.length === 2 && (
                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                      {chapter.items.map((d, idx) => (
                        <ExpeditionTile
                          key={d.id}
                          index={chapter.startIndex + idx}
                          motionDelay={idx * 0.1}
                          destination={d}
                        />
                      ))}
                    </div>
                  )}

                  {chapter.items.length >= 3 && (
                    <div className="mt-10 grid gap-8 lg:grid-cols-2">
                      <ExpeditionTile
                        preferred
                        tall
                        className="lg:col-span-2"
                        index={chapter.startIndex}
                        destination={chapter.items[0]}
                      />
                      {chapter.items.slice(1).map((d, idx) => (
                        <ExpeditionTile
                          key={d.id}
                          index={chapter.startIndex + 1 + idx}
                          motionDelay={idx * 0.08}
                          destination={d}
                        />
                      ))}
                    </div>
                  )}
                </motion.section>
              ))}
            </div>
          )}
        </section>

        {/* More to discover */}
        <section className="mt-28 scroll-mt-24">
          <div className="section-divider mb-16" />
          <div className="text-center">
            <h2 className="atlas-section-title font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {t("More to Discover")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground sm:text-base">
              {t("Every route tells a story. Every summit has a voice. Keep exploring.")}
            </p>
          </div>
          <div className="mt-12">
            <AdSlot className="mx-auto" label={t("Advertisement")} heightClass="h-28 sm:h-32" />
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
