import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Youtube,
  Twitter,
  Globe2,
  Bike,
  Camera,
  Route as RouteIcon,
} from "lucide-react";
import type { Post } from "@/lib/posts.functions";
import { SITE } from "@/lib/site";
import { useTranslations, useLanguage } from "@/lib/translate/store";
import { resolveMediaUrl } from "@/lib/admin.functions";

interface FeaturedGridProps {
  mainFeatured: Post | null;
  secondaryFeatured: Post[];
  stats: {
    countries: number;
    trips: number;
    photos: number;
    photosSuffix: string;
    kilometres: number;
    kilometresSuffix: string;
  };
}

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function FeaturedGrid({
  mainFeatured,
  secondaryFeatured,
  stats,
}: FeaturedGridProps) {
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 w-full min-w-0">
      {/* 1. Left: Main Featured Story Card - Span 5 */}
      {mainFeatured && (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md lg:col-span-5 w-full min-w-0"
        >
          <Link to="/blog/$slug" params={{ slug: mainFeatured.slug }} className="flex h-full flex-col w-full min-w-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              {mainFeatured.cover_image ? (
                <img
                  src={resolveMediaUrl(mainFeatured.cover_image)}
                  alt={getPostTitle(mainFeatured)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <span className="text-xs text-muted-foreground">No image</span>
                </div>
              )}
              <div className="absolute left-3 top-3 rtl:left-auto rtl:right-3">
                <span className="rounded-full bg-[#FF7A00] px-2.5 py-1 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                  {t(mainFeatured.category || "Featured")}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-4 sm:p-6 w-full min-w-0">
              <div className="w-full min-w-0">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 shrink-0">
                    <Calendar className="h-3 w-3 text-[#FF7A00]/80" />
                    {formatDate(mainFeatured.published_at || mainFeatured.created_at)}
                  </span>
                  <span aria-hidden className="text-muted-foreground/50">·</span>
                  <span className="inline-flex items-center gap-1 shrink-0">
                    <Clock className="h-3 w-3 text-[#FF7A00]/80" />
                    {mainFeatured.reading_minutes} {t("min read")}
                  </span>
                </div>

                <h3 className="mt-2.5 sm:mt-3 font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-foreground transition-colors group-hover:text-[#FF7A00] break-words [overflow-wrap:anywhere]">
                  {getPostTitle(mainFeatured)}
                </h3>

                {getPostExcerpt(mainFeatured) && (
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground line-clamp-3 break-words leading-relaxed">
                    {getPostExcerpt(mainFeatured)}
                  </p>
                )}
              </div>

              <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-border/60">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF7A00]">
                  {t("Read full story")}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
                </span>
              </div>
            </div>
          </Link>
        </motion.article>
      )}

      {/* 2. Middle: 2 Stacked Horizontal Overlay Cards - Span 4 */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-4 w-full min-w-0">
        {secondaryFeatured.slice(0, 2).map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group relative flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md min-h-[160px] sm:min-h-[170px] w-full min-w-0"
          >
            <Link to="/blog/$slug" params={{ slug: post.slug }} className="block h-full w-full">
              {post.cover_image ? (
                <img
                  src={resolveMediaUrl(post.cover_image)}
                  alt={getPostTitle(post)}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 h-full w-full bg-zinc-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

              <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 text-white min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white">
                    {t(post.category || "Featured")}
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/75 shrink-0">
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                </div>

                <div className="mt-3 min-w-0">
                  <h4 className="font-display text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#FF7A00] line-clamp-2 break-words [overflow-wrap:anywhere]">
                    {getPostTitle(post)}
                  </h4>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#FF7A00]">
                    <span>{t("Read story")}</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}

        {secondaryFeatured.length === 0 && (
          <div className="flex h-full min-h-[160px] sm:min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 w-full min-w-0">
            <p className="text-xs text-muted-foreground">{t("More stories coming soon")}</p>
          </div>
        )}
      </div>

      {/* 3. Right: Social Feed & Quick Connect Card - Span 3 */}
      <div className="flex flex-col rounded-2xl border border-border bg-card p-3.5 sm:p-4 shadow-sm lg:col-span-3 w-full min-w-0">
        <div className="mb-3 border-b border-border pb-2.5">
          <span className="rounded-md bg-[#FF7A00]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF7A00]">
            {t("Connect")}
          </span>
          <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">
            {t("Follow the Journey")}
          </h3>
        </div>

        {/* Social channels */}
        <div className="flex flex-col gap-2">
          <a
            href={SITE.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-[#E1306C]/10 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-[#E1306C]/20 min-w-0"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E1306C] text-white">
                <Instagram className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold truncate">{t("Instagram")}</span>
            </div>
            <span className="text-[11px] font-semibold text-[#E1306C] shrink-0">{t("Follow")} →</span>
          </a>

          <a
            href={SITE.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-[#FF0000]/10 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-[#FF0000]/20 min-w-0"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FF0000] text-white">
                <Youtube className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold truncate">{t("YouTube")}</span>
            </div>
            <span className="text-[11px] font-semibold text-[#FF0000] shrink-0">{t("Subscribe")} →</span>
          </a>

          <a
            href={SITE.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-foreground/5 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/10 min-w-0"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
                <Twitter className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold truncate">X (Twitter)</span>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">{t("Follow")} →</span>
          </a>
        </div>

        {/* Travel Highlights mini widget */}
        <div className="mt-4 rounded-xl border border-border/80 bg-muted/40 p-3 w-full min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
            <Globe2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{t("Expedition Stats")}</span>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-background p-2 border border-border/50 min-w-0">
              <div className="font-display text-base sm:text-lg font-bold text-foreground truncate">{stats.countries}</div>
              <div className="text-[10px] text-muted-foreground truncate">{t("Countries")}</div>
            </div>
            <div className="rounded-lg bg-background p-2 border border-border/50 min-w-0">
              <div className="font-display text-base sm:text-lg font-bold text-[#FF7A00] truncate">{stats.trips}</div>
              <div className="text-[10px] text-muted-foreground truncate">{t("Trips")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
