import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, Layers, Sparkles, FolderTree } from "lucide-react";
import { getCategoryBySlug, type Category } from "@/lib/categories.functions";
import type { Post } from "@/lib/posts.functions";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { useTranslations } from "@/lib/translate/store";
import { resolveMediaUrl } from "@/lib/media";

const categoryQO = (slug: string) =>
  queryOptions({
    queryKey: ["category-page", slug],
    queryFn: () => getCategoryBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/category/$slug")({
  head: ({ loaderData }) => {
    const data = loaderData as { category: Category; posts: Post[] } | undefined;
    const cat = data?.category;
    if (!cat) return {};

    const pageTitle = cat.seo_title || `${cat.name} — Solo Travel Stories & Guides | ndsolotravel`;
    const metaDesc =
      cat.seo_description ||
      cat.description ||
      `Explore solo travel journeys, mountain stories, and guides under ${cat.name}.`;
    const canonicalUrl = `https://ndsolotravel.com/category/${cat.slug}`;
    const rawHeroImg = cat.image_url || data.posts[0]?.cover_image || "";
    const heroImg = resolveMediaUrl(rawHeroImg);

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: metaDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: metaDesc },
        { property: "og:url", content: canonicalUrl },
        ...(heroImg
          ? [
              { property: "og:image", content: heroImg },
              { name: "twitter:image", content: heroImg },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: metaDesc },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
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
                name: "Stories",
                item: "https://ndsolotravel.com/blog",
              },
              { "@type": "ListItem", position: 3, name: cat.name, item: canonicalUrl },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: cat.name,
            description: metaDesc,
            url: canonicalUrl,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: data.posts.length,
              itemListElement: data.posts.slice(0, 20).map((p: Post, i: number) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://ndsolotravel.com/blog/${p.slug}`,
                name: p.title,
              })),
            },
          }),
        },
      ],
    };
  },
  loader: async ({ context, params }) => {
    const res = await context.queryClient.ensureQueryData(categoryQO(params.slug));
    if (!res || !res.category) {
      throw notFound();
    }
    return res;
  },
  component: CategoryPage,
});

function CategoryPage() {
  const t = useTranslations();
  const { category, posts } = Route.useLoaderData();

  const rawHeroImage = category.image_url || posts[0]?.cover_image || "";
  const heroImage = resolveMediaUrl(rawHeroImage);

  return (
    <article className="min-h-screen pb-20">
      {/* Cinematic Hero Banner */}
      <div className="banner-hover relative h-[48vh] min-h-[360px] w-full overflow-hidden bg-zinc-950">
        {heroImage ? (
          <img
            src={heroImage}
            alt={category.name}
            className="h-full w-full object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-10 sm:px-6">
          <PageBreadcrumbs
            items={[{ label: t("Stories"), href: "/blog" }, { label: t(category.name) }]}
          />

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
              <FolderTree className="h-3.5 w-3.5" />
              {t("Category Archive")}
            </span>
            <span className="rounded-full bg-black/60 border border-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
              {posts.length} {posts.length === 1 ? t("story published") : t("stories published")}
            </span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t(category.name)}
          </h1>

          {category.description && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t(category.description)}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
        {posts.length > 0 ? (
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <BookOpen className="h-5 w-5 text-accent" />
                <h2>
                  {t("Published Stories in")} {t(category.name)}
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                {t("Showing")} {posts.length} {posts.length === 1 ? t("story") : t("stories")}
              </span>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any, i: number) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </section>
        ) : (
          <div className="rounded-3xl border border-dashed border-border py-20 text-center bg-card/40">
            <Layers className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
            <h2 className="font-display text-xl font-bold">
              {t("No stories in this category yet")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              {t(
                "We haven't published stories in this category yet. Check back soon or explore other topics from the journey.",
              )}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background hover:opacity-90 transition cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> {t("Explore All Stories")}
              </Link>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t("Back to all stories")}
          </Link>
        </div>
      </div>
    </article>
  );
}
