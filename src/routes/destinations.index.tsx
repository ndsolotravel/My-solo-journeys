import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { Map as MapIcon, LayoutGrid } from "lucide-react";
import { listDestinations } from "../lib/destinations.functions";
import { getPageHeroConfig } from "../lib/page-hero.functions";
import { AdSlot } from "@/components/ads/AdSlot";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs, BreadcrumbJsonLd } from "@/components/layout/PageBreadcrumbs";

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

function DestinationsPage() {
  const t = useTranslations();
  const { data: destinationsData } = useSuspenseQuery(destQO);
  const { data: hero } = useSuspenseQuery(heroQO);
  const destinations = destinationsData;
  const [view, setView] = useState<"map" | "grid">("grid");


  // Smooth-scroll to the interactive map anchor when arriving with that hash.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash === "interactive-map" || hash === "map") {
      setView("map");
      requestAnimationFrame(() => {
        document
          .getElementById("interactive-map")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <>
      <section className="banner-hover relative h-[45vh] min-h-[280px] w-full overflow-hidden">
        {hero?.image ? (
          <img
            src={hero.image}
            alt="Your destinations in one beautiful image."
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Destinations")}</p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("Where the road runs out.")}
            </h1>
            <PageBreadcrumbs items={[{ label: "Destinations" }]} />
            <p className="mt-3 max-w-xl text-sm text-white/80">
              {t(
                "Honest country guides, trekking routes and the maps I wish I'd had before I left.",
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top-of-page Ad slot (below navigation) */}
        <AdSlot className="mt-2" label={t("Sponsored")} heightClass="h-24" />

        {/* Explore the Journey — interactive map / grid */}
        <section
          id="interactive-map"
          aria-labelledby="explore-heading"
          className="mt-12 scroll-mt-24"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Explore")}</p>
              <h2 id="explore-heading" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                {t("Explore the Journey")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                {t("Discover visited destinations, motorcycle routes and stories from the road.")}
              </p>
            </div>
            <div
              role="tablist"
              aria-label={t("View destinations as map or grid")}
              className="inline-flex w-fit items-center rounded-full border border-border bg-background p-1 text-xs"
            >
              <button
                role="tab"
                aria-selected={view === "map"}
                onClick={() => setView("map")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                  view === "map"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapIcon className="h-3.5 w-3.5" /> {t("Map View")}
              </button>
              <button
                role="tab"
                aria-selected={view === "grid"}
                onClick={() => setView("grid")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                  view === "grid"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> {t("Grid View")}
              </button>
            </div>
          </div>

          <div className="mt-6">
            {view === "map" ? (
              <Suspense
                fallback={
                  <div className="h-[480px] w-full animate-pulse rounded-2xl border border-border bg-muted/30" />
                }
              >
                <div className="w-full overflow-hidden rounded-2xl border border-border">
                  <DestinationsMap destinations={destinations} />
                </div>
              </Suspense>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((d, i) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Link
                      to="/destinations/$slug"
                      params={{ slug: d.slug }}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] sm:aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
                        {d.featured_image ? (
                          <img
                            src={d.featured_image}
                            alt={d.title}
                            loading="lazy"
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <span className="text-xs text-muted-foreground">No image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                          <p className="text-xs uppercase tracking-wider text-white/70">
                            {t(d.country)}
                            {d.region ? ` · ${t(d.region)}` : ""}
                          </p>
                          <h2 className="mt-2 font-display text-2xl font-semibold">{t(d.title)}</h2>
                          {d.description && (
                            <p className="mt-2 line-clamp-2 text-sm text-white/80">
                              {t(d.description)}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Between-content responsive ad */}
        <AdSlot className="mt-12" label={t("Advertisement")} heightClass="h-28 sm:h-32" />
      </div>
    </>
  );
}
