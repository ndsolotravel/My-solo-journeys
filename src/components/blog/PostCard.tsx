import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import type { Post } from "@/lib/posts.functions";
import { useTranslations, useLanguage } from "@/lib/translate/store";

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
    if (!translation) return post;
    return {
      ...post,
      title: translation.title || post.title,
      excerpt: translation.excerpt || post.excerpt,
    };
  }, [post, lang]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group"
    >
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          {localizedPost.cover_image && (
            <img
              src={localizedPost.cover_image}
              alt={localizedPost.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute left-3 top-3 rtl:left-auto rtl:right-3">
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
              {t(localizedPost.category)}
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(localizedPost.published_at ?? localizedPost.created_at)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {localizedPost.reading_minutes} {t("min read")}
          </span>
        </div>
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
    </motion.article>
  );
}

