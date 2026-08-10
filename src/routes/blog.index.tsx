import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { listPosts } from "@/lib/posts.functions";
import { PostCard } from "@/components/blog/PostCard";
import { useLocalizedPosts } from "@/lib/translate/useLocalized";
import { useTranslator } from "@/lib/translate/store";
import { CATEGORIES } from "@/lib/site";

const searchSchema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  q: z.string().optional(),
});

const blogQO = (params: { category?: string; tag?: string; search?: string }) =>
  queryOptions({
    queryKey: ["blog", params],
    queryFn: () => listPosts({ data: { limit: 50, ...params } }),
  });

export const Route = createFileRoute("/blog/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => search,
  head: () => ({
    meta: [
      { title: "Stories — ndsolotravel" },
      {
        name: "description",
        content:
          "Solo travel stories, trekking journals, motorcycle adventures and photography essays.",
      },
      { property: "og:title", content: "Stories — ndsolotravel" },
      { property: "og:description", content: "Solo travel and adventure stories." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  loader: ({ context, deps }) => {
    context.queryClient.ensureQueryData(
      blogQO({ category: deps.category, tag: deps.tag, search: deps.q }),
    );
  },
  component: BlogIndex,
});

function BlogIndex() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(
    blogQO({ category: search.category, tag: search.tag, search: search.q }),
  );
  const posts = useLocalizedPosts(data.posts);
  const [q, setQ] = useState(search.q ?? "");

  const t = useTranslator([
    "The Journal",
    "Stories from the road, the trail, and the saddle.",
    "Search stories…",
    "All",
    "No stories match that filter yet.",
    "story",
    "stories",
    "published so far.",
  ]);

  return (
    <>
      <section className="relative h-[45vh] min-h-[280px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80"
          alt="Mountain road at sunrise"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("The Journal")}</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("Stories from the road, the trail, and the saddle.")}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/80">
              {data.total} {data.total === 1 ? t("story") : t("stories")} {t("published so far.")}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl sr-only">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("The Journal")}</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {t("Stories from the road, the trail, and the saddle.")}
          </h1>
        </header>

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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
              placeholder={t("Search stories…")}
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:border-accent"
            />
          </form>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          <Link
            to="/blog"
            search={{}}
            className={`rounded-full border px-4 py-1.5 text-xs ${!search.category ? "border-foreground bg-foreground text-background" : "border-border hover:border-accent"}`}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/blog"
              search={{ category: c }}
              className={`rounded-full border px-4 py-1.5 text-xs ${search.category === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-accent"}`}
            >
              {t(c)}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            {t("No stories match that filter yet.")}
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
