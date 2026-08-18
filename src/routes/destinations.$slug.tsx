import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { ArrowLeft, MapPin, Compass, BookOpen, Camera, Globe, ArrowRight } from "lucide-react";
import { getDestinationBySlug, listDestinations, type Destination } from "@/lib/destinations.functions";
import type { Post } from "@/lib/posts.functions";
import { PostCard } from "@/components/blog/PostCard";
import { useTranslations } from "@/lib/translate/store";

const qo = (slug: string) =>
  queryOptions({
    queryKey: ["destination", slug],
    queryFn: () => getDestinationBySlug({ data: { slug } }),
  });

const allDestQO = queryOptions({
  queryKey: ["destinations-all"],
  queryFn: () => listDestinations(),
});

export const Route = createFileRoute("/destinations/$slug")({
  loader: async ({ params, context }) => {
    const [d, all] = await Promise.all([
      context.queryClient.ensureQueryData(qo(params.slug)),
      context.queryClient.ensureQueryData(allDestQO),
    ]);
    if (!d) throw notFound();
    return { destination: d, allDestinations: all };
  },
  head: ({ loaderData, params }) => {
    const d = loaderData?.destination;
    return {
      meta: [
        { title: d ? `${d.title} Travel Guide & Stories — ndsolotravel` : "Destination — ndsolotravel" },
        { name: "description", content: d?.description ?? "Country and region travel guide." },
        { property: "og:title", content: d?.title ?? "Destination" },
        { property: "og:description", content: d?.description ?? "" },
        { property: "og:url", content: `/destinations/${params.slug}` },
        ...(d?.featured_image ? [{ property: "og:image", content: d.featured_image }] : []),
      ],
      links: [{ rel: "canonical", href: `/destinations/${params.slug}` }],
    };
  },
  notFoundComponent: DestinationNotFound,
  component: DestinationPage,
});

function DestinationNotFound() {
  const t = useTranslations();
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">{t("Destination not found")}</h1>
      <p className="mt-2 text-muted-foreground">{t("This region isn't mapped yet.")}</p>
      <Link to="/destinations" className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("Back to destinations atlas")}
      </Link>
    </div>
  );
}

function DestinationPage() {
  const { destination: d, allDestinations } = Route.useLoaderData();
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"all" | "expeditions" | "guides">("all");

  const posts = d.posts ?? [];
  const guidePosts = useMemo(
    () => posts.filter((p: Post) => ["Travel Tips", "Travel Gear", "Budget Travel", "Pakistan Tourism"].includes(p.category)),
    [posts],
  );
  const expeditionPosts = useMemo(
    () => posts.filter((p: Post) => !["Travel Tips", "Travel Gear", "Budget Travel", "Pakistan Tourism"].includes(p.category)),
    [posts],
  );

  const displayedPosts = useMemo(() => {
    if (activeTab === "guides") return guidePosts;
    if (activeTab === "expeditions") return expeditionPosts;
    return posts;
  }, [activeTab, posts, guidePosts, expeditionPosts]);

  const otherDestinations = useMemo(
    () => (allDestinations ?? []).filter((item: Destination) => item.id !== d.id).slice(0, 3),
    [allDestinations, d.id],
  );

  return (
    <article className="min-h-screen">
      {/* Cover Header */}
      <div className="relative h-[65vh] min-h-[440px] w-full overflow-hidden">
        {d.featured_image && (
          <img
            src={d.featured_image}
            alt={d.title}
            className="h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/85" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 text-white sm:px-6 lg:px-8">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" /> {t("Travel Atlas")}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {d.location ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold tracking-wider text-amber-300 backdrop-blur-md">
                <MapPin className="h-3 w-3" /> {t(d.location)}
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                  <Globe className="h-3 w-3" /> {t(d.country)}
                </span>
                {d.region && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                    <MapPin className="h-3 w-3" /> {t(d.region)}
                  </span>
                )}
              </>
            )}
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            {t(d.title)}
          </h1>
        </div>
      </div>

      {/* Atlas Overview Stats */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-lg">
          <div className="p-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{t("Location")}</p>
            <p className="mt-1 font-display text-sm sm:text-base font-bold text-foreground truncate" title={d.location || d.country}>
              {t(d.location || d.country)}
            </p>
          </div>
          <div className="p-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{t("Region / Country")}</p>
            <p className="mt-1 font-display text-sm sm:text-base font-bold text-foreground">
              {d.region ? `${t(d.region)}, ${t(d.country)}` : t(d.country)}
            </p>
          </div>
          <div className="p-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{t("Field Notes")}</p>
            <p className="mt-1 font-display text-lg font-bold text-foreground">{posts.length}</p>
          </div>
          <div className="p-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{t("Expedition Style")}</p>
            <p className="mt-1 font-display text-lg font-bold text-accent">{t("Solo · Slow")}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {d.description && (
          <p className="text-xl leading-relaxed text-muted-foreground font-display">
            {t(d.description)}
          </p>
        )}
      </div>

      {/* Field Notes Section */}
      <section className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {t("Destination Dispatches")}
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                {t("Field Notes")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("Stories and exploration guides from")} {t(d.title)}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex rounded-full border border-border bg-card p-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                  activeTab === "all" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("All")} ({posts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("expeditions")}
                className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                  activeTab === "expeditions" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("Expeditions")} ({expeditionPosts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("guides")}
                className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                  activeTab === "guides" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("Travel Guides")} ({guidePosts.length})
              </button>
            </div>
          </div>

          {displayedPosts.length > 0 ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayedPosts.map((p: Post, i: number) => (
                <PostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
              <p className="font-display text-lg font-semibold">{t("No Field Notes published for this destination yet.")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("Check back soon for stories and dispatches from")} {t(d.title)}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Internal Linking: Explore Neighboring & Featured Destinations */}
      {otherDestinations.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Continue exploring")}</p>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                {t("Other destinations in the atlas")}
              </h2>
            </div>
            <Link to="/destinations" className="text-sm text-muted-foreground hover:text-foreground">
              {t("All destinations")} →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {otherDestinations.map((item: Destination) => (
              <Link
                key={item.id}
                to="/destinations/$slug"
                params={{ slug: item.slug }}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border"
              >
                {item.featured_image && (
                  <img
                    src={item.featured_image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs uppercase tracking-wider text-white/70">{t(item.country)}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold group-hover:text-amber-300 transition-colors flex items-center justify-between">
                    {t(item.title)} <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

