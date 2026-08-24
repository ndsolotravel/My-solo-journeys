import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Flame,
  Clock,
  ExternalLink,
  Share2,
  Check,
} from "lucide-react";
import { type NewsItem } from "@/lib/news.functions";
import { resolveMediaUrl } from "@/lib/admin.functions";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface BreakingNewsSectionProps {
  items: NewsItem[];
  className?: string;
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 5) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function BreakingNewsSection({ items, className }: BreakingNewsSectionProps) {
  // If no items, completely hide the section (no empty container or layout shift)
  if (!items || items.length === 0) {
    return null;
  }

  const [activeModalItem, setActiveModalItem] = useState<NewsItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate a continuous stream of repeated items so the loop is always seamless
  const repeatedItems = useMemo(() => {
    if (items.length === 1) {
      return Array(6).fill(items[0]);
    }
    if (items.length === 2) {
      return [...items, ...items, ...items, ...items];
    }
    if (items.length <= 4) {
      return [...items, ...items, ...items];
    }
    return [...items, ...items];
  }, [items]);

  const handleCopyShare = (slug: string) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/news/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  return (
    <>
      <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className || ""}`}>
        <div
          className="ticker-container group relative flex h-10 sm:h-11 w-full items-center overflow-hidden rounded-xl border border-red-500/30 bg-black/80 sm:bg-black/70 backdrop-blur-xl shadow-lg shadow-black/40 transition-all duration-300 hover:border-red-500/50 hover:bg-black/90"
        >
          {/* Subtle background ambient pulse glow */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-28 w-28 rounded-full bg-red-600/25 blur-2xl opacity-70 transition-opacity group-hover:opacity-100" />
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-28 w-28 rounded-full bg-[#FF7A00]/20 blur-2xl opacity-50" />

          {/* Left Pinned BREAKING NEWS Badge */}
          <div className="relative z-20 flex shrink-0 items-center gap-2 bg-gradient-to-r from-red-600 via-red-600 to-red-700 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black tracking-wider text-white uppercase shadow-md shadow-red-950/60 select-none rounded-l-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 fill-white" />
              <span className="hidden sm:inline">BREAKING NEWS</span>
              <span className="inline sm:hidden">BREAKING</span>
            </span>
          </div>

          {/* Left transition shadow so text glides seamlessly behind the badge */}
          <div className="pointer-events-none absolute left-[102px] sm:left-[148px] inset-y-0 w-8 sm:w-12 bg-gradient-to-r from-black/90 sm:from-black/80 to-transparent z-10" />

          {/* Right edge fade mask */}
          <div className="pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-black/90 sm:from-black/80 to-transparent z-10" />

          {/* Continuous Running Marquee Viewport */}
          <div className="relative flex-1 overflow-hidden h-full flex items-center select-none">
            {/* Track 1 (Primary track) */}
            <div className="animate-ticker flex items-center shrink-0">
              {repeatedItems.map((item, idx) => (
                <div key={`t1-${item.id}-${idx}`} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="group/item inline-flex items-center gap-2 text-left cursor-pointer transition-colors focus:outline-none"
                  >
                    <span className="font-display text-xs sm:text-sm font-medium text-neutral-100 group-hover/item:text-[#FF7A00] transition-colors tracking-normal">
                      {item.title}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans text-neutral-400 group-hover/item:text-neutral-300">
                      <Clock className="h-3 w-3 text-neutral-500" />
                      {formatRelativeTime(item.published_at)}
                    </span>
                  </button>

                  {/* Visually Distinct Separator */}
                  <span className="mx-4 sm:mx-6 inline-flex items-center gap-1 text-red-500/80 font-bold select-none opacity-80" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse"></span>
                    <span className="text-xs text-red-400/90 font-mono">//</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate track for seamless 100% infinite gapless loop) */}
            <div className="animate-ticker flex items-center shrink-0" aria-hidden="true">
              {repeatedItems.map((item, idx) => (
                <div key={`t2-${item.id}-${idx}`} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    tabIndex={-1}
                    className="group/item inline-flex items-center gap-2 text-left cursor-pointer transition-colors focus:outline-none"
                  >
                    <span className="font-display text-xs sm:text-sm font-medium text-neutral-100 group-hover/item:text-[#FF7A00] transition-colors tracking-normal">
                      {item.title}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans text-neutral-400 group-hover/item:text-neutral-300">
                      <Clock className="h-3 w-3 text-neutral-500" />
                      {formatRelativeTime(item.published_at)}
                    </span>
                  </button>

                  {/* Visually Distinct Separator */}
                  <span className="mx-4 sm:mx-6 inline-flex items-center gap-1 text-red-500/80 font-bold select-none opacity-80" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse"></span>
                    <span className="text-xs text-red-400/90 font-mono">//</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE BREAKING NEWS DETAIL MODAL                                    */}
      {/* ========================================================================= */}
      <Dialog open={!!activeModalItem} onOpenChange={(open) => !open && setActiveModalItem(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 bg-background border border-border">
          {activeModalItem && (
            <div className="space-y-6">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/10 border border-red-600/20 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                    <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
                    Breaking News Dispatch
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(activeModalItem.published_at).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                  <Clock className="h-3 w-3" />
                  {new Date(activeModalItem.published_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
                {activeModalItem.title}
              </h2>

              {/* Short Summary (if provided) */}
              {activeModalItem.summary && (
                <div className="rounded-2xl border-l-4 border-[#FF7A00] bg-[#FF7A00]/5 p-4 text-sm sm:text-base font-medium text-foreground/90 leading-relaxed">
                  {activeModalItem.summary}
                </div>
              )}

              {/* Featured Image (if available) */}
              {activeModalItem.image_url && (
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-md max-h-80">
                  <img
                    src={resolveMediaUrl(activeModalItem.image_url)}
                    alt={activeModalItem.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Full Content (Markdown / Text) */}
              {activeModalItem.content && (
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed pt-2">
                  {activeModalItem.content}
                </div>
              )}

              {/* Footer with Share & Permalink */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border text-xs">
                <button
                  type="button"
                  onClick={() => handleCopyShare(activeModalItem.slug)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied Link!
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" /> Share Dispatch
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to="/news/$slug"
                    params={{ slug: activeModalItem.slug }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity"
                  >
                    <span>Full Article Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
