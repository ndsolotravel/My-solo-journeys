import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { listGallery } from "@/lib/gallery.functions";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs, BreadcrumbJsonLd } from "@/components/layout/PageBreadcrumbs";

const qo = queryOptions({ queryKey: ["gallery"], queryFn: () => listGallery() });

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ndsolotravel" },
      {
        name: "description",
        content: "Travel photography from the Karakoram, Nanga Parbat, Hunza and beyond.",
      },
      { property: "og:title", content: "Gallery — ndsolotravel" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
            { "@type": "ListItem", position: 2, name: "Gallery" },
          ],
        }),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(qo),
  component: GalleryPage,
});

const pageTurnVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 70 : -70,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -70 : 70,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  }),
};

function GalleryPage() {
  const t = useTranslations();
  const { data: rawItems } = useSuspenseQuery(qo);
  const items = rawItems;
  const [[activeIndex, direction], setActiveState] = useState<[number | null, number]>([null, 0]);


  const active = activeIndex !== null ? items[activeIndex] : null;

  const handlePrev = () => {
    if (activeIndex === null || items.length === 0) return;
    setActiveState(([curr]) => (curr === null ? [null, 0] : [(curr - 1 + items.length) % items.length, -1]));
  };

  const handleNext = () => {
    if (activeIndex === null || items.length === 0) return;
    setActiveState(([curr]) => (curr === null ? [null, 0] : [(curr + 1) % items.length, 1]));
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setActiveState([null, 0]);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, items.length]);

  return (
    <>
      <section className="banner-hover relative h-[45vh] min-h-[280px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2000&q=80"
          alt="Yosemite valley golden hour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Photography")}</p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("The light, the cold, the patience.")}
            </h1>
            <PageBreadcrumbs items={[{ label: "Gallery" }]} />
            <p className="mt-3 max-w-xl text-sm text-white/80">
              {t("A thousand sunrises above 4,000 metres.")}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="max-w-3xl sr-only">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Photography")}</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {t("The light, the cold, the patience.")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("A thousand sunrises above 4,000 metres.")}
          </p>
        </header>

        {/* Gallery Grid */}
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((g, idx) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActiveState([idx, 0])}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl bg-muted transition-transform duration-300 hover:scale-[1.02] focus:outline-hidden focus:ring-2 focus:ring-accent"
            >
              <img
                src={g.image_url}
                alt={g.caption ?? ""}
                loading="lazy"
                className="aspect-[16/10] sm:aspect-auto w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                {g.caption && (
                  <span className="text-xs font-medium text-white line-clamp-1">{t(g.caption)}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Modal Lightbox */}
        {active && activeIndex !== null && (
          <div
            onClick={() => setActiveState([null, 0])}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-md transition-all duration-300"
          >
            {/* Top Bar: Counter & Close */}
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-[102]">
              <span className="rounded-full bg-black/75 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg">
                {activeIndex + 1} / {items.length}
              </span>
            </div>

            <button
              type="button"
              aria-label={t("Close")}
              onClick={(e) => {
                e.stopPropagation();
                setActiveState([null, 0]);
              }}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-[102] flex h-11 w-11 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md hover:bg-black/95 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Active Image Container with 3D Page Turn Animation */}
            <div
              className="relative flex max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40 [perspective:1200px]"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={active.id || activeIndex}
                  src={active.image_url}
                  alt={active.caption ?? ""}
                  custom={direction}
                  variants={pageTurnVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] rounded-2xl object-contain select-none shadow-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                />
              </AnimatePresence>

              {/* Left Arrow Button - OVER THE IMAGE */}
              {items.length > 1 && (
                <button
                  type="button"
                  aria-label={t("Previous photo")}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white border-2 border-white/40 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent"
                >
                  <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-md rtl:rotate-180" />
                </button>
              )}

              {/* Right Arrow Button - OVER THE IMAGE */}
              {items.length > 1 && (
                <button
                  type="button"
                  aria-label={t("Next photo")}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white border-2 border-white/40 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent"
                >
                  <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-md rtl:rotate-180" />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            {active.caption && (
              <div
                className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[102] max-w-lg w-[90vw] text-center pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="inline-block rounded-2xl bg-black/80 px-5 py-2.5 text-xs sm:text-sm font-medium text-white border border-white/20 backdrop-blur-md shadow-xl">
                  {t(active.caption)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
