import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { MapPin, SlidersHorizontal, ImagePlus } from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import { listPhotoArchive } from "@/lib/photo-archive.functions";
import { getPageHeroConfig } from "@/lib/page-hero.functions";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs, BreadcrumbJsonLd } from "@/components/layout/PageBreadcrumbs";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

const searchSchema = z.object({
  category: z.string().optional(),
});

const archiveQO = (category?: string) =>
  queryOptions({
    queryKey: ["photo-archive", category ?? "all"],
    queryFn: () => listPhotoArchive({ data: { category } }),
  });

const heroQO = queryOptions({
  queryKey: ["page-hero", "gallery"],
  queryFn: () => getPageHeroConfig({ data: "gallery" }),
});

export const Route = createFileRoute("/gallery")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => search,
  head: () => ({
    meta: [
      { title: "Photography Archive — ndsolotravel" },
      {
        name: "description",
        content:
          "A curated photography archive from the Karakoram, Nanga Parbat, Hunza and beyond — mountains, motorcycles, roads, people, villages, and trekking.",
      },
      { property: "og:title", content: "Photography Archive — ndsolotravel" },
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
  loader: async ({ context, deps }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(archiveQO(deps.category)),
      context.queryClient.ensureQueryData(heroQO),
    ]);
  },
  component: GalleryPage,
});

function GalleryPage() {
  const t = useTranslations();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: data } = useSuspenseQuery(archiveQO(search.category));
  const { data: hero } = useSuspenseQuery(heroQO);

  const photos = data.photos;
  const categories = data.categories;
  const activeCategory = search.category;
  const totalShown = photos.length;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const setCategory = (category?: string) =>
    navigate({ search: (prev) => ({ ...prev, category: category || undefined }) });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <>
      <section className="banner-hover relative h-[45vh] min-h-[280px] w-full overflow-hidden">
        {hero?.image ? (
          <img
            src={hero.image}
            alt="Photographs from the mountains."
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Photography")}</p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("The light, the cold, the patience.")}
            </h1>
            <PageBreadcrumbs items={[{ label: "Gallery" }]} />
            <p className="mt-3 max-w-xl text-sm text-white/80">
              {t("A curated archive of photographs from above 4,000 metres.")}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadcrumbJsonLd items={[{ label: "Gallery", href: "/gallery" }]} />

        {/* Category Browser */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 pb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{t("Browse the archive")}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {totalShown.toLocaleString()} {totalShown === 1 ? t("photograph") : t("photographs")}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
            <button
              type="button"
              onClick={() => setCategory(undefined)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                !activeCategory
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {t("All")}
              <span className={!activeCategory ? "text-background/60" : "text-muted-foreground"}>
                {photos.length}
              </span>
            </button>

            {categories.map((cat) => {
              const active = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(active ? undefined : cat.slug)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {t(cat.name)}
                  <span className={active ? "text-background/60" : "text-muted-foreground"}>
                    {cat.photo_count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Archive Grid */}
        {photos.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center shadow-sm">
            <div className="mx-auto mb-4 w-fit rounded-2xl bg-brand/10 p-3 text-brand">
              <ImagePlus className="h-7 w-7 text-accent" />
            </div>
            <p className="font-display text-xl font-semibold text-foreground">
              {t("No photographs in this category yet")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("Photographs from the archive will appear here once they are curated.")}
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {photos.map((p, index) => (
              <div
                key={p.id}
                className="group mb-8 break-inside-avoid flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative block w-full overflow-hidden rounded-2xl bg-muted transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-accent cursor-pointer shadow-xs hover:shadow-md"
                >
                  <img
                    src={p.image_url}
                    alt={p.alt_text || p.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </button>
                {/* Photo description directly below the picture */}
                {p.title && (
                  <p className="mt-3 text-sm font-medium text-foreground leading-snug">
                    {t(p.title)}
                  </p>
                )}
                {/* Location directly below the description */}
                {p.location && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{t(p.location)}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <GalleryLightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          photos={photos}
          currentIndex={lightboxIndex}
          onNavigate={navigateLightbox}
        />
      </div>
    </>
  );
}
