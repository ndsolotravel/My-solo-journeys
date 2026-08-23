import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, MapPin } from "lucide-react";
import { useMemo } from "react";
import type { Post } from "@/lib/posts.functions";
import { useTranslations, useLanguage } from "@/lib/translate/store";

import { resolveMediaUrl } from "@/lib/admin.functions";

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const t = useTranslations();
  const { lang } = useLanguage();

  const localizedPost = useMemo(() => {
    if (lang === "en") return post;
    const translation = post.post_translations?.find((x) => x.language_code === lang);
    if (translation) {
      return {
        ...post,
        title: translation.title || post.title,
        excerpt: translation.excerpt || post.excerpt,
      };
    }
    return {
      ...post,
      title: t(post.title),
      excerpt: post.excerpt ? t(post.excerpt) : post.excerpt,
    };
  }, [post, lang, t]);

  const coverUrl = useMemo(() => {
    const raw = localizedPost.cover_image || post.cover_image;
    return raw ? resolveMediaUrl(raw) : "";
  }, [localizedPost.cover_image, post.cover_image]);

  const destination = post.destinations as { id?: string; title: string; slug: string } | null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group"
    >
      <div className="block">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="block h-full w-full">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={localizedPost.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes("unsplash.com")) {
                    target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
                  }
                }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <span className="text-xs uppercase tracking-wider">{t("No Image")}</span>
              </div>
            )}
          </Link>

          {/* Badges Overlay */}
          <div className="absolute left-3 top-3 rtl:left-auto rtl:right-3 flex flex-wrap items-center gap-1.5 pointer-events-auto">
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-xs shadow-xs">
              {t(localizedPost.category)}
            </span>
            {destination && (
              <Link
                to="/destinations/$slug"
                params={{ slug: destination.slug }}
                className="inline-flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-medium text-white shadow-xs hover:bg-accent transition-colors backdrop-blur-xs"
              >
                <MapPin className="h-3 w-3" />
                <span>{t(destination.title)}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDate(localizedPost.published_at ?? localizedPost.created_at)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {localizedPost.reading_minutes} {t("min read")}
          </span>
          {destination && (
            <>
              <span aria-hidden>·</span>
              <Link
                to="/destinations/$slug"
                params={{ slug: destination.slug }}
                className="inline-flex items-center gap-1 text-accent hover:underline font-medium"
              >
                <MapPin className="h-3 w-3" />
                {t(destination.title)}
              </Link>
            </>
          )}
        </div>

        <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
          <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug group-hover:text-accent transition-colors">
            {localizedPost.title}
          </h3>
          {localizedPost.excerpt && (
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{localizedPost.excerpt}</p>
          )}
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-foreground">
            {t("Read story")}
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]" />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

