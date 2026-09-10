import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ImagePlus, RotateCcw } from "lucide-react";
import { z } from "zod";
import { useState, useEffect } from "react";
import { listPhotoArchive } from "@/lib/photo-archive.functions";
import { getPageHeroConfig } from "@/lib/page-hero.functions";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs, BreadcrumbJsonLd } from "@/components/layout/PageBreadcrumbs";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { CinematicGalleryCarousel } from "@/components/gallery/CinematicGalleryCarousel";
import { GalleryHero } from "@/components/gallery/GalleryHero";

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
      { title: "Gallery — My Visual Diary | ndsolotravel" },
      {
        name: "description",
        content:
          "See the world through my lens: adventures and solo journeys in photographs across the Karakoram, high passes, and remote frontiers.",
      },
      { property: "og:title", content: "Gallery — My Visual Diary | ndsolotravel" },
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
  const { data: heroConfig } = useSuspenseQuery(heroQO);

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

      {/* Hero Image Section (Visual style, spacing, typography & animations matching Homepage Hero) */}
      <GalleryHero config={heroConfig} photoCount={photos.length} />

      {/* Top Breadcrumbs & Gallery Content Anchor */}
      <div id="gallery-content" className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <PageBreadcrumbs items={[{ label: "Gallery" }]} />
      </div>

      {/* 1. Centered Gallery Heading matching design reference */}
      <header className="mx-auto max-w-3xl px-4 pt-3 pb-1 sm:pt-4 sm:pb-2 text-center">
        {/* Small "GALLERY" label */}
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase mb-1 select-none">
          {t("GALLERY")}
        </p>

        {/* Strong Main Title */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {t("My Visual Diary")}
        </h1>

        {/* Short Subtitle */}
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
          {t("See the world through my lens:")}{" "}
          <span className="text-foreground/80">
            {t("adventures in photographs and high-altitude journeys")}
          </span>
        </p>

        {/* 2. Horizontal row of rounded destination or country filter buttons */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-2 px-2 max-w-full sm:flex-wrap sm:justify-center">
            {/* "All" Filter Button */}
            <button
              type="button"
              onClick={() => setCategory(undefined)}
              className={`inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                !activeCategory
                  ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20 scale-[1.02]"
                  : "bg-card text-foreground/80 hover:bg-muted/50 hover:text-foreground border border-border/80"
              }`}
            >
              {t("All")}
            </button>

            {/* Dynamic CMS Destination/Country Filters */}
            {categories.map((cat) => {
              const active = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(active ? undefined : cat.slug)}
                  className={`inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20 scale-[1.02]"
                      : "bg-card text-foreground/80 hover:bg-muted/50 hover:text-foreground border border-border/80"
                  }`}
                >
                  {t(cat.name)}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. Large Cinematic Horizontal Image Carousel */}
      <main className="mt-2 sm:mt-4">
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

      {/* Lightbox Modal (for high-resolution inspection) */}
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
