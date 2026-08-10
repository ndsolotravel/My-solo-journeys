import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { X } from "lucide-react";
import { listGallery, type GalleryItem } from "@/lib/gallery.functions";
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
  const [active, setActive] = useState<GalleryItem | null>(null);

  const t = useTranslator([
    "Photography",
    "The light, the cold, the patience.",
    "A thousand sunrises above 4,000 metres.",
    "Close",
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
          {items.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g)}
              className="mb-4 block w-full overflow-hidden rounded-2xl bg-muted"
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

        {active && (
          <div
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          >
            <button
              type="button"
              aria-label={t("Close")}
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={active.image_url}
              alt={active.caption ?? ""}
              className="max-h-[90vh] max-w-[95vw] rounded-2xl"
            />
            {active.caption && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
                {active.caption}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
