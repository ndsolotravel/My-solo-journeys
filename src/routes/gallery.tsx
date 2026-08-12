import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { listGallery } from "@/lib/gallery.functions";
import { useLocalizedGallery } from "@/lib/translate/useLocalized";
import { useTranslator } from "@/lib/translate/store";

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
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(qo),
  component: GalleryPage,
});

function GalleryPage() {
  const { data: rawItems } = useSuspenseQuery(qo);
  const items = useLocalizedGallery(rawItems);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = activeIndex !== null ? items[activeIndex] : null;

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + items.length) % items.length));
  };

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % items.length));
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, items.length]);

  const t = useTranslator([
    "Photography",
    "The light, the cold, the patience.",
    "A thousand sunrises above 4,000 metres.",
    "Close",
    "Previous photo",
    "Next photo",
  ]);

  return (
    <>
      <section className="relative h-[45vh] min-h-[280px] w-full overflow-hidden">
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

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((g, idx) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="mb-4 block w-full overflow-hidden rounded-2xl bg-muted transition-transform duration-300 hover:scale-[1.02] focus:outline-hidden focus:ring-2 focus:ring-accent"
            >
              <img
                src={g.image_url}
                alt={g.caption ?? ""}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </button>
          ))}
        </div>

        {active && activeIndex !== null && (
          <div
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-all duration-300"
          >
            {/* Top Bar: Counter & Close */}
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-[72]">
              <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white/90 border border-white/10 backdrop-blur-md">
                {activeIndex + 1} / {items.length}
              </span>
            </div>

            <button
              type="button"
              aria-label={t("Close")}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-[72] rounded-full bg-white/10 p-2.5 text-white/90 border border-white/10 backdrop-blur-md hover:bg-white/20 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Previous Arrow Button */}
            {items.length > 1 && (
              <button
                type="button"
                aria-label={t("Previous photo")}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-6 md:left-8 z-[72] rounded-full bg-black/60 p-3 sm:p-4 text-white border border-white/20 backdrop-blur-md shadow-2xl hover:bg-black/80 hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            )}

            {/* Active Image */}
            <div
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.image_url}
                alt={active.caption ?? ""}
                className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain select-none"
              />
            </div>

            {/* Next Arrow Button */}
            {items.length > 1 && (
              <button
                type="button"
                aria-label={t("Next photo")}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-6 md:right-8 z-[72] rounded-full bg-black/60 p-3 sm:p-4 text-white border border-white/20 backdrop-blur-md shadow-2xl hover:bg-black/80 hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            )}

            {/* Bottom Caption */}
            {active.caption && (
              <div
                className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[72] max-w-lg w-[90vw] text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="inline-block rounded-2xl bg-black/70 px-5 py-2.5 text-xs sm:text-sm text-white/90 border border-white/10 backdrop-blur-md shadow-lg">
                  {active.caption}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
