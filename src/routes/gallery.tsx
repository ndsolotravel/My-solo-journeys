import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Camera, ImagePlus, RotateCcw } from "lucide-react";
import { z } from "zod";
import { useState, useEffect } from "react";
import { listPhotoArchive } from "@/lib/photo-archive.functions";
import { getPageHeroConfig } from "@/lib/page-hero.functions";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs, BreadcrumbJsonLd } from "@/components/layout/PageBreadcrumbs";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { CinematicGalleryCarousel } from "@/components/gallery/CinematicGalleryCarousel";

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
  const { data } = useSuspenseQuery(archiveQO(search.category));

  const photos = data.photos;
  const categories = data.categories;
  const activeCategory = search.category;

  // Carousel active index state
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Reset carousel index whenever category filter changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);

  // Keep index within bounds if photo count changes
  useEffect(() => {
    if (photos.length > 0 && carouselIndex >= photos.length) {
      setCarouselIndex(0);
    }
  }, [photos.length, carouselIndex]);

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
    <div className="min-h-screen bg-background text-foreground pb-20 sm:pb-28">
      <BreadcrumbJsonLd items={[{ label: "Gallery", href: "/gallery" }]} />

      {/* Top Breadcrumb Navigation */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <PageBreadcrumbs items={[{ label: "Gallery" }]} />
      </div>

      {/* 1. Centered Gallery Heading */}
      <header className="mx-auto max-w-4xl px-4 pt-8 pb-4 sm:pt-12 sm:pb-6 text-center">
        {/* Small "GALLERY" label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/10 border border-brand/25 text-brand text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-xs select-none">
          <Camera className="h-3.5 w-3.5" />
          <span>{t("GALLERY")}</span>
        </div>

        {/* Strong main title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
          {t("The light, the cold, the patience.")}
        </h1>

        {/* Short subtitle */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
          {t("A curated visual journey through the Karakoram, the silence of Nanga Parbat, and high-altitude frontier routes.")}
        </p>

        {/* 2. Horizontal row of rounded destination or country filter buttons */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-2 max-w-full sm:flex-wrap sm:justify-center">
            {/* "All" Filter Button */}
            <button
              type="button"
              onClick={() => setCategory(undefined)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                !activeCategory
                  ? "bg-primary text-primary-foreground shadow-md ring-1 ring-primary/20 scale-[1.02]"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/70 hover:border-border"
              }`}
            >
              <span>{t("All")}</span>
              <span
                className={`text-[11px] rounded-full px-1.5 py-0.5 font-mono ${
                  !activeCategory
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {photos.length}
              </span>
            </button>

            {/* Dynamic CMS Categories */}
            {categories.map((cat) => {
              const active = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(active ? undefined : cat.slug)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md ring-1 ring-primary/20 scale-[1.02]"
                      : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/70 hover:border-border"
                  }`}
                >
                  <span>{t(cat.name)}</span>
                  {cat.photo_count !== undefined && (
                    <span
                      className={`text-[11px] rounded-full px-1.5 py-0.5 font-mono ${
                        active
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {cat.photo_count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. Large Cinematic Horizontal Image Carousel */}
      <main className="mt-4 sm:mt-6">
        {photos.length === 0 ? (
          <div className="mx-auto max-w-xl px-4 py-16 text-center">
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 sm:p-16 shadow-xs">
              <div className="mx-auto mb-4 w-fit rounded-2xl bg-brand/10 p-3.5 text-brand">
                <ImagePlus className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {t("No photographs in this category yet")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t("Photographs from this collection will appear once curated from the field.")}
              </p>
              <button
                type="button"
                onClick={() => setCategory(undefined)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t("View all photographs")}</span>
              </button>
            </div>
          </div>
        ) : (
          <CinematicGalleryCarousel
            photos={photos}
            currentIndex={carouselIndex}
            onChangeIndex={setCarouselIndex}
            onOpenLightbox={openLightbox}
          />
        )}
      </main>

      {/* Lightbox Modal (Retained for high-resolution fullscreen inspection) */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        photos={photos}
        currentIndex={lightboxIndex}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}
