import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Flame,
  Clock,
  Calendar,
  ArrowLeft,
  Share2,
  Check,
  Globe2,
  Radio,
  ExternalLink,
} from "lucide-react";
import { getNewsBySlug, type NewsItem } from "@/lib/news.functions";
import { resolveMediaUrl } from "@/lib/media";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const item = await getNewsBySlug({ data: { slug: params.slug } });
    if (!item) {
      throw notFound();
    }
    return { newsItem: item };
  },
  head: ({ loaderData }) => {
    const item = loaderData?.newsItem;
    if (!item) {
      return { meta: [{ title: "News Dispatch Not Found — ndsolotravel" }] };
    }
    return {
      meta: [
        { title: `${item.title} — ndsolotravel News` },
        {
          name: "description",
          content: item.summary || item.title,
        },
        { property: "og:title", content: item.title },
        { property: "og:description", content: item.summary || item.title },
        { property: "og:type", content: "article" },
        ...(item.image_url ? [{ property: "og:image", content: resolveMediaUrl(item.image_url) }] : []),
      ],
      links: [{ rel: "canonical", href: `/news/${item.slug}` }],
    };
  },
  component: NewsDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
        <Radio className="h-8 w-8" />
      </div>
      <h1 className="font-display text-3xl font-bold">News Dispatch Not Found</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        This news dispatch may have expired, been archived, or the link may be incorrect.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  ),
});

function NewsDetailPage() {
  const { newsItem } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.summary || newsItem.title,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const publishDate = new Date(newsItem.published_at);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Breadcrumb / Back Link */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied Link!
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" /> Share Dispatch
            </>
          )}
        </button>
      </div>

      {/* Header Badges */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
        {newsItem.is_breaking ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/10 border border-red-600/20 px-3 py-1 font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
            <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
            Breaking News Dispatch
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 px-3 py-1 font-bold text-[#FF7A00] uppercase tracking-wider">
            <Radio className="h-3.5 w-3.5" />
            Official Bulletin
          </span>
        )}

        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>
            {publishDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {publishDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
        {newsItem.title}
      </h1>

      {/* Short Summary Lead */}
      {newsItem.summary && (
        <div className="mt-6 rounded-2xl border-l-4 border-[#FF7A00] bg-[#FF7A00]/5 p-5 text-base sm:text-lg font-medium text-foreground/90 leading-relaxed italic">
          {newsItem.summary}
        </div>
      )}

      {/* Featured Cover Image */}
      {newsItem.image_url && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-xl">
          <img
            src={resolveMediaUrl(newsItem.image_url)}
            alt={newsItem.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Full Content Body */}
      {newsItem.content && (
        <div className="mt-10 prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed font-sans">
          {newsItem.content}
        </div>
      )}

      {/* Article Footer */}
      <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Globe2 className="h-5 w-5 text-[#FF7A00]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">NDSOLOTRAVEL Dispatches</p>
            <p className="text-xs text-muted-foreground">Real-time alerts, routes, and mountain updates</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold hover:bg-muted transition-colors"
          >
            Explore Stories
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-5 py-2 text-xs font-semibold text-white hover:bg-[#FF7A00]/90 transition-colors shadow-sm"
          >
            Home
          </Link>
        </div>
      </div>
    </article>
  );
}
