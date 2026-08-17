import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Search, Filter, ArrowRight, Clock, MapPin, Sparkles, SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { listPosts } from "@/lib/posts.functions";
import { listDestinations } from "@/lib/destinations.functions";
import { getBlogAuthorName } from "@/lib/settings.functions";
import { PostCard } from "@/components/blog/PostCard";
import { PostCardSkeleton } from "@/components/blog/Skeletons";
import { CATEGORIES } from "@/lib/site";
import { useTranslations } from "@/lib/translate/store";

const searchSchema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(["latest", "popular"]).optional(),
  destination: z.string().optional(),
});

const blogQO = (params: { category?: string; tag?: string; search?: string; sort?: "latest" | "popular" }) =>
  queryOptions({
    queryKey: ["blog", params],
    queryFn: () => listPosts({ data: { limit: 50, sort: params.sort ?? "latest", category: params.category, tag: params.tag, search: params.search } }),
  });

const destQO = queryOptions({
  queryKey: ["destinations-list"],
  queryFn: () => listDestinations(),
});

const authorNameQO = queryOptions({
  queryKey: ["blog-author-name"],
  queryFn: () => getBlogAuthorName(),
});

export const Route = createFileRoute("/blog/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => search,
  head: () => ({
    meta: [
      { title: "Expedition Stories & Field Journal — ndsolotravel" },
      {
        name: "description",
        content:
          "Solo travel stories, trekking journals, motorcycle adventures and travel guides from Pakistan and high-altitude remote borders.",
      },
      { property: "og:title", content: "Expedition Stories — ndsolotravel" },
      { property: "og:description", content: "Solo travel, motorcycle journeys, and alpine trekking journals." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  loader: async ({ context, deps }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(
        blogQO({ category: deps.category, tag: deps.tag, search: deps.q, sort: deps.sort }),
      ),
      context.queryClient.ensureQueryData(destQO),
      context.queryClient.ensureQueryData(authorNameQO),
    ]);
  },
  component: BlogIndex,
});

const POPULAR_TAGS = ["Karakoram", "Nanga Parbat", "Solo Ride", "Camping", "Passes", "Gear"];

function BlogIndex() {
  const t = useTranslations();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data } = useSuspenseQuery(
    blogQO({ category: search.category, tag: search.tag, search: search.q, sort: search.sort }),
  );
  const { data: destinations } = useSuspenseQuery(destQO);

  const { data: globalAuthor } = useQuery(authorNameQO);
  const authorName = globalAuthor || "Noman";

  let posts = data.posts;
  if (search.destination) {
    posts = posts.filter((p) => p.destinations?.slug === search.destination || p.destination_id === search.destination);
  }

  const [q, setQ] = useState(search.q ?? "");
  const featuredPost = useMemo(() => {
    if (search.category || search.tag || search.q || search.destination) return null;
    return posts.find((p) => p.featured) || posts[0];
  }, [posts, search]);

  const gridPosts = useMemo(() => {
    if (!featuredPost) return posts;
    return posts.filter((p) => p.id !== featuredPost.id);
  }, [posts, featuredPost]);

  const hasActiveFilters = Boolean(search.category || search.tag || search.q || search.destination || search.sort);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80"
          alt="Expedition trail at sunrise"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/85" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              <Sparkles className="h-3 w-3" /> {t("Expedition Journal")}
            </span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t("Stories from the road, the trail, and the saddle.")}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/80">
              {data.total} {data.total === 1 ? t("story") : t("stories")} {t("published from remote borders and high mountain passes.")}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Editorial Featured Story Hero Card */}
        {featuredPost && (
          <div className="mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Featured Dispatch")}
            </p>
            <Link
              to="/blog/$slug"
              params={{ slug: featuredPost.slug }}
              className="group grid gap-8 overflow-hidden rounded-3xl border border-border bg-card p-4 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-xl lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                {featuredPost.cover_image && (
                  <img
                    src={featuredPost.cover_image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {featuredPost.destinations?.title && (
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-md">
                    <MapPin className="h-3 w-3" /> {t(featuredPost.destinations.title)}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-medium text-accent">
                  <span className="uppercase tracking-wider">{t(featuredPost.category)}</span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" /> {featuredPost.reading_minutes} {t("min read")}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold leading-snug sm:text-4xl group-hover:text-accent transition-colors">
                  {t(featuredPost.title)}
                </h2>
                {featuredPost.excerpt && (
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                    {t(featuredPost.excerpt)}
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="text-xs text-muted-foreground">
                    By {authorName} · {new Date(featuredPost.published_at ?? featuredPost.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
                    {t("Read story")} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="mb-10 space-y-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({
                  search: (prev: Record<string, unknown>) => ({ ...prev, q: q || undefined }),
                });
              }}
              className="relative flex-1"
            >
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("Search stories, trails, passes…")}
                className="w-full rounded-full border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none focus:border-accent"
              />
            </form>

            <div className="flex flex-wrap items-center gap-3">
              {/* Destination Filter */}
              <div className="relative">
                <select
                  value={search.destination ?? ""}
                  onChange={(e) =>
                    navigate({
                      search: (prev: Record<string, unknown>) => ({
                        ...prev,
                        destination: e.target.value || undefined,
                      }),
                    })
                  }
                  aria-label={t("Filter by destination")}
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground outline-none focus:border-accent cursor-pointer pr-8"
                >
                  <option value="">{t("All Destinations")}</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.slug}>
                      {d.title} ({d.country})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting Toggle */}
              <div className="inline-flex rounded-full border border-border bg-background p-1 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    navigate({
                      search: (prev: Record<string, unknown>) => ({ ...prev, sort: undefined }),
                    })
                  }
                  className={`rounded-full px-3 py-1 transition-colors ${!search.sort || search.sort === "latest"
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {t("Newest")}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigate({
                      search: (prev: Record<string, unknown>) => ({ ...prev, sort: "popular" }),
                    })
                  }
                  className={`rounded-full px-3 py-1 transition-colors ${search.sort === "popular"
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {t("Most Popular")}
                </button>
              </div>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <span className="mr-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3 text-accent" /> {t("Categories")}
            </span>
            <Link
              to="/blog"
              search={(prev: any) => ({ ...prev, category: undefined })}
              className={`rounded-full border px-3.5 py-1 text-xs transition-colors ${!search.category ? "border-foreground bg-foreground text-background font-medium" : "border-border hover:border-accent"
                }`}
            >
              {t("All")}
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                to="/blog"
                search={(prev: any) => ({ ...prev, category: c })}
                className={`rounded-full border px-3.5 py-1 text-xs transition-colors ${search.category === c ? "border-foreground bg-foreground text-background font-medium" : "border-border hover:border-accent"
                  }`}
              >
                {t(c)}
              </Link>
            ))}
          </div>

          {/* Popular Tag Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="mr-2 text-[11px] text-muted-foreground uppercase tracking-wider">{t("Topics")}:</span>
            {POPULAR_TAGS.map((tag) => (
              <Link
                key={tag}
                to="/blog"
                search={(prev: any) => ({ ...prev, tag: search.tag === tag ? undefined : tag })}
                className={`rounded-md border px-2.5 py-0.5 text-[11px] transition-colors ${search.tag === tag ? "border-accent bg-accent/10 text-accent font-medium" : "border-border/60 text-muted-foreground hover:border-accent"
                  }`}
              >
                #{tag}
              </Link>
            ))}
            {hasActiveFilters && (
              <Link
                to="/blog"
                search={{}}
                className="ml-auto text-xs text-accent hover:underline font-medium"
              >
                {t("Clear all filters")}
              </Link>
            )}
          </div>
        </div>

        {/* Stories Grid */}
        {gridPosts.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-16 text-center shadow-sm">
            <p className="font-display text-xl font-semibold text-foreground">{t("No expedition stories found")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("Try adjusting your search criteria or clearing filters.")}</p>
            <Link
              to="/blog"
              search={{}}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background hover:opacity-90"
            >
              {t("View all stories")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

