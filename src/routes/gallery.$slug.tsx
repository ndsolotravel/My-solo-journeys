import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Tag,
  Sparkles,
} from "lucide-react";
import { getPhotoArchiveItem, listPhotoArchive } from "@/lib/photo-archive.functions";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs, BreadcrumbJsonLd } from "@/components/layout/PageBreadcrumbs";
import { useContentTranslation } from "@/lib/translate/contentTranslation";
import { useLanguage } from "@/lib/translate/store";

const photoQO = (slug: string) =>
  queryOptions({
    queryKey: ["photo-archive-item", slug],
    queryFn: () => getPhotoArchiveItem({ data: { slug } }),
  });

export const Route = createFileRoute("/gallery/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(photoQO(params.slug));
    if (!data.photo) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    const photo = loaderData?.photo;
    if (!photo) {
      return {
        meta: [{ title: "Photograph — ndsolotravel" }],
      };
    }
    const title = `${photo.title || "Untitled photograph"} — ndsolotravel`;
    const description =
      photo.story ||
      photo.alt_text ||
      `A photograph${photo.location ? ` from ${photo.location}` : ""}.`;
    const image = photo.image_url;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/gallery/${params.slug}` },
        ...(image ? [{ property: "og:image", content: image }] : []),
        ...(image ? [{ name: "twitter:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: `/gallery/${params.slug}` },
        ...["id", "ms"].map((l) => ({
          rel: "alternate",
          hrefLang: l,
          href: `https://ndsolotravel.com/${l}/gallery/${params.slug}`,
        })),
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: `https://ndsolotravel.com/gallery/${params.slug}`,
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Gallery",
                item: "https://ndsolotravel.com/gallery",
              },
              { "@type": "ListItem", position: 3, name: photo.title || "Photograph" },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Photograph",
            headline: photo.title,
            description,
            image: image ?? undefined,
            contentLocation: photo.location ?? undefined,
            dateCreated: photo.captured_at ?? undefined,
            ...(photo.camera ? { contributor: { "@type": "Person", name: photo.camera } } : {}),
          }),
        },
      ],
    };
  },
  component: PhotoDetailPage,
  notFoundComponent: PhotoNotFound,
});

function PhotoNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Photograph not found</h1>
      <p className="mt-2 text-muted-foreground">
        This photograph may have been removed from the archive.
      </p>
      <Link
        to="/gallery"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to the archive
      </Link>
    </div>
  );
}

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function PhotoDetailPage() {
  const t = useTranslations();
  const { lang } = useLanguage();
  const { photo, prev, next } = Route.useLoaderData();

  const localizedPhoto = useContentTranslation({
    contentType: "gallery",
    contentId: photo?.id ?? "",
    englishFields: {
      title: photo?.title ?? "",
      story: photo?.story ?? "",
      alt_text: photo?.alt_text ?? "",
      location: photo?.location ?? "",
      camera: photo?.camera ?? "",
    },
    targetLang: lang,
  });

  const primaryCategory = photo.categories[0] ?? null;
  const { data: relatedData } = useQuery({
    queryKey: ["photo-archive-related", primaryCategory?.slug ?? "none"],
    queryFn: async () =>
      primaryCategory
        ? await listPhotoArchive({ data: { category: primaryCategory.slug } })
        : { photos: [], categories: [] },
    enabled: Boolean(primaryCategory),
  });
  const related = (relatedData?.photos ?? []).filter((p) => p.id !== photo.id).slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <BreadcrumbJsonLd
          items={[
            { label: "Gallery", href: "/gallery" },
            { label: localizedPhoto.title || "Photograph" },
          ]}
        />

        <Link
          to="/gallery"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> {t("Back to the archive")}
        </Link>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-zinc-950 shadow-lg">
              <img
                src={photo.image_url}
                alt={localizedPhoto.alt_text || localizedPhoto.title}
                className="h-auto max-h-[82vh] w-full object-contain"
              />
            </div>
            <PageBreadcrumbs
              items={[
                { label: "Gallery", href: "/gallery" },
                { label: localizedPhoto.title || "Photograph" },
              ]}
            />
          </div>

          {/* Metadata */}
          <aside className="lg:col-span-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
              {photo.categories.length > 0 && (
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    <Tag className="h-3 w-3" /> {t("Categories")}
                  </span>
                  {photo.categories.map((cat: { id: string; name: string; slug: string }) => (
                    <Link
                      key={cat.id}
                      to="/gallery"
                      search={{ category: cat.slug }}
                      className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent transition-colors hover:bg-accent hover:text-white"
                    >
                      {t(cat.name)}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {localizedPhoto.title}
              </h1>

              {(photo.location || photo.captured_at || photo.camera) && (
                <dl className="mt-5 space-y-2.5 border-t border-border/60 pt-5 text-sm">
                  {localizedPhoto.location && (
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <dt className="sr-only">{t("Location")}</dt>
                      <dd className="text-foreground">{localizedPhoto.location}</dd>
                    </div>
                  )}
                  {formatDate(photo.captured_at) && (
                    <div className="flex items-start gap-2.5">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <dt className="sr-only">{t("Date")}</dt>
                      <dd className="text-foreground">{t(formatDate(photo.captured_at)!)}</dd>
                    </div>
                  )}
                  {photo.camera && (
                    <div className="flex items-start gap-2.5">
                      <Camera className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <dt className="sr-only">{t("Camera")}</dt>
                      <dd className="text-muted-foreground">{localizedPhoto.camera}</dd>
                    </div>
                  )}
                </dl>
              )}

              {localizedPhoto.story && (
                <div className="mt-5 border-t border-border/60 pt-5">
                  <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    <Sparkles className="h-3 w-3" /> {t("The story behind this frame")}
                  </h2>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                    {localizedPhoto.story}
                  </p>
                </div>
              )}

              {/* Archive navigation */}
              {(prev || next) && (
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border/60 pt-5">
                  {prev ? (
                    <Link
                      to="/gallery/$slug"
                      params={{ slug: prev.slug }}
                      className="group rounded-2xl border border-border bg-background p-3 transition-colors hover:border-accent/50"
                    >
                      <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        <ChevronLeft className="h-3 w-3 rtl:rotate-180" /> {t("Previous")}
                      </span>
                      <div className="mt-1.5 flex items-center gap-2">
                        <img
                          src={prev.image_url}
                          alt={prev.title}
                          className="h-10 w-10 shrink-0 rounded-lg object-cover"
                          loading="lazy"
                        />
                        <span className="line-clamp-2 text-xs font-medium text-foreground group-hover:text-accent">
                          {t(prev.title)}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      to="/gallery/$slug"
                      params={{ slug: next.slug }}
                      className="group rounded-2xl border border-border bg-background p-3 text-right transition-colors hover:border-accent/50"
                    >
                      <span className="flex items-center justify-end gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("Next")} <ChevronRight className="h-3 w-3 rtl:rotate-180" />
                      </span>
                      <div className="mt-1.5 flex items-center justify-end gap-2">
                        <span className="line-clamp-2 text-xs font-medium text-foreground group-hover:text-accent">
                          {t(next.title)}
                        </span>
                        <img
                          src={next.image_url}
                          alt={next.title}
                          className="h-10 w-10 shrink-0 rounded-lg object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Related photographs */}
        {primaryCategory && related.length > 0 && (
          <section className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("More photographs")}
            </p>
            <h2 className="mt-1 mb-5 font-display text-xl font-bold text-foreground">
              {t("In")} {t(primaryCategory.name)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to="/gallery/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block overflow-hidden rounded-2xl bg-muted transition-transform duration-300 hover:scale-[1.02] focus:outline-hidden focus:ring-2 focus:ring-accent"
                >
                  <img
                    src={p.image_url}
                    alt={p.alt_text || p.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-transparent to-transparent p-4">
                    <p className="line-clamp-1 text-sm font-semibold text-white">{t(p.title)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
