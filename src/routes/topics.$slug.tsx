import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { TranslatedMarkdown } from "@/components/common/TranslatedMarkdown";
import { Clock, ArrowLeft, MapPin, BookOpen } from "lucide-react";
import { getTopicCluster, type TopicWithPosts } from "@/lib/topics.functions";
import type { Post } from "@/lib/posts.functions";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { useTranslations } from "@/lib/translate/store";

const topicQO = (slug: string) =>
  queryOptions({
    queryKey: ["topic-cluster", slug],
    queryFn: () => getTopicCluster({ data: { slug } }),
  });

export const Route = createFileRoute("/topics/$slug")({
  head: ({ loaderData }) => {
    const ld = loaderData as { topic: TopicWithPosts } | undefined;
    const t = ld?.topic;
    if (!t) return {};
    const title = `${t.title} — ndsolotravel`;
    return {
      meta: [
        { title },
        { name: "description", content: t.description },
        { property: "og:title", content: title },
        { property: "og:description", content: t.description },
        { property: "og:url", content: `/topics/${t.slug}` },
        ...(t.posts[0]?.cover_image
          ? [{ property: "og:image", content: t.posts[0].cover_image }]
          : []),
      ],
      links: [{ rel: "canonical", href: `/topics/${t.slug}` }],
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
                name: "Topics",
                item: "https://ndsolotravel.com/blog",
              },
              { "@type": "ListItem", position: 3, name: t.title },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: t.title,
            description: t.description,
            url: `https://ndsolotravel.com/topics/${t.slug}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: t.posts
                .slice(0, 10)
                .map((p: { slug: string; title: string }, i: number) => ({
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
    const topic = await context.queryClient.ensureQueryData(topicQO(params.slug));
    if (!topic || topic.posts.length === 0) throw notFound();
    return { topic };
  },
  component: TopicPage,
});

function TopicPage() {
  const t = useTranslations();
  const { topic } = Route.useLoaderData();

  return (
    <article className="min-h-screen">
      {/* Hero */}
      <div className="banner-hover relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        {(() => {
          const img = topic.posts[0]?.cover_image || topic.heroImage || "";
          return img ? (
            <img src={img} alt={topic.title} className="h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 h-full w-full bg-zinc-900" />
          );
        })()}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-12 text-white sm:px-6">
          <PageBreadcrumbs items={[{ label: "Stories", href: "/blog" }, { label: topic.title }]} />
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-accent">{t("Topic Guide")}</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            {t(topic.title)}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/80">{t(topic.description)}</p>
        </div>
      </div>

      {/* Pillar Content */}
      <div className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <div className="prose-blog">
          <TranslatedMarkdown content={topic.pillarContent} />
        </div>

        {/* Clustered Posts */}
        {topic.posts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="h-5 w-5 text-accent" />
              <h2 className="font-display text-2xl font-bold">
                {t("Related Stories")} ({topic.posts.length})
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {topic.posts.map((post: Post, i: number) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="mt-16 mb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t("Back to all stories")}
          </Link>
        </div>
      </div>
    </article>
  );
}
