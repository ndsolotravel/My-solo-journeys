import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/posts.functions";
import type { ActiveTopic } from "@/lib/topics.functions";
import { useTranslations, useLanguage } from "@/lib/translate/store";
import { resolveMediaUrl } from "@/lib/admin.functions";

interface TrendingStoriesProps {
  primaryPost: Post | null;
  secondaryPosts: Post[];
  categories: { name: string; count: number; image?: string; linkTo: string }[];
}

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function TrendingStories({
  primaryPost,
  secondaryPosts,
  categories,
}: TrendingStoriesProps) {
  const t = useTranslations();
  const { lang } = useLanguage();

  const getPostTitle = (p: Post) => {
    if (lang !== "en" && p.post_translations) {
      const trans = p.post_translations.find((x) => x.language_code === lang);
      if (trans?.title) return trans.title;
    }
    return t(p.title);
  };

  const getPostExcerpt = (p: Post) => {
    if (lang !== "en" && p.post_translations) {
      const trans = p.post_translations.find((x) => x.language_code === lang);
      if (trans?.excerpt) return trans.excerpt;
    }
    return p.excerpt ? t(p.excerpt) : null;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* 1. Left Column: Primary Story (Large Card) - Span 5 */}
      {primaryPost ? (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md lg:col-span-5"
        >
          <Link to="/blog/$slug" params={{ slug: primaryPost.slug }} className="flex h-full flex-col">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted sm:aspect-[16/10]">
              <img
                src={
                  primaryPost.cover_image
                    ? resolveMediaUrl(primaryPost.cover_image)
                    : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
                }
                alt={getPostTitle(primaryPost)}
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes("unsplash.com")) {
                    target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
                  }
                }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 rtl:left-auto rtl:right-3">
                <span className="rounded-full bg-[#FF7A00] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                  {t(primaryPost.category || "Story")}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(primaryPost.published_at || primaryPost.created_at)}
                  </span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {primaryPost.reading_minutes} {t("min read")}
                  </span>
                  {primaryPost.destinations ? (
                    <>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1 text-[#FF7A00] font-medium">
                        <MapPin className="h-3 w-3" />
                        {t(primaryPost.destinations.title)}
                      </span>
                    </>
                  ) : primaryPost.location_name ? (
                    <>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-[#FF7A00]" />
                        {primaryPost.location_name}
                      </span>
                    </>
                  ) : null}
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-[#FF7A00] sm:text-3xl">
                  {getPostTitle(primaryPost)}
                </h3>

                {getPostExcerpt(primaryPost) && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                    {getPostExcerpt(primaryPost)}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-border/60">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7A00]">
                  {t("Read full story")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
                </span>
              </div>
            </div>
          </Link>
        </motion.article>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 lg:col-span-5">
          <p className="text-sm text-muted-foreground">{t("No stories available")}</p>
        </div>
      )}

      {/* 2. Middle Column: 3 Stacked Secondary Stories - Span 4 */}
      <div className="flex flex-col gap-4 lg:col-span-4">
        {secondaryPosts.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="group flex flex-1 flex-col justify-center rounded-2xl border border-border bg-card p-3.5 shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md sm:p-4"
          >
            <Link to="/blog/$slug" params={{ slug: post.slug }} className="flex gap-4">
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-32">
                <img
                  src={
                    post.cover_image
                      ? resolveMediaUrl(post.cover_image)
                      : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=75"
                  }
                  alt={getPostTitle(post)}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes("unsplash.com")) {
                      target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=75";
                    }
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-semibold uppercase tracking-wider text-[#FF7A00]">
                      {t(post.category || "Story")}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                  </div>

                  <h4 className="mt-1.5 font-display text-base font-bold leading-snug text-foreground transition-colors group-hover:text-[#FF7A00] line-clamp-2">
                    {getPostTitle(post)}
                  </h4>
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  <span>{t("Read story")}</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* 3. Right Column: Categories Sidebar List - Span 3 */}
      <div className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm lg:col-span-3">
        <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
            {t("Categories")}
          </h3>
          <Link
            to="/blog"
            className="text-xs font-medium text-muted-foreground hover:text-[#FF7A00]"
          >
            {t("View all")} →
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          {categories.map((cat, idx) => (
            <Link
              key={cat.name}
              to={cat.linkTo as any}
              className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-2.5 transition-all duration-200 hover:border-[#FF7A00]/40 hover:bg-muted"
            >
              {cat.image && (
                <img
                  src={resolveMediaUrl(cat.image)}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                />
              )}
              <div className="relative z-10 flex items-center gap-2.5">
                <span className="font-display text-sm font-semibold text-foreground group-hover:text-[#FF7A00] transition-colors">
                  {t(cat.name)}
                </span>
              </div>
              <span className="relative z-10 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-background/80 px-1.5 text-[10px] font-bold text-muted-foreground shadow-xs group-hover:bg-[#FF7A00] group-hover:text-white transition-colors">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
