import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useRef } from "react";
import {
  Home,
  Save,
  X,
  Loader2,
  CheckCircle2,
  Globe,
  Shield,
  Sparkles,
  ImagePlus,
  Upload,
  Rocket,
  BarChart3,
  BookMarked,
  Maximize2,
  ImageOff,
  RefreshCw,
  Eye,
  ExternalLink,
  RotateCcw,
  Compass,
  ChevronLeft,
  ChevronRight,
  Layers,
  Play,
  Pause,
  Copy,
  Check,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { adminGetHomepageEditor, adminSaveHomepageSettings } from "@/lib/homepage.functions";
import { adminUploadImage, resolveMediaUrl } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/homepage")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Homepage Management — Admin CMS" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminHomepagePage,
});

const DEFAULT_HERO_SLIDES = [
  {
    src: "",
    alt: "Nanga Parbat at sunrise",
  },
  {
    src: "",
    alt: "Mountain road at dusk",
  },
  {
    src: "",
    alt: "Trekker on alpine ridge",
  },
];

type PostOption = {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  cover_image: string | null;
};

type EditorData = {
  settings: Record<string, string>;
  posts: PostOption[];
};

type HeroSlotPreview = {
  slot: number;
  label: string;
  src: string;
  defaultSrc: string;
  defaultAlt: string;
  source: "manual" | "auto-post";
  caption: string;
  postTitle?: string;
  postSlug?: string;
};

/**
 * Individual Hero Banner preview card for the 3-image grid.
 * Matches the actual Homepage Hero aspect ratio (16:9), object-fit: cover,
 * object positioning (center), and gradient overlay.
 */
function HeroImageTile({
  slot,
  label,
  src,
  defaultSrc,
  defaultAlt,
  source,
  caption,
  postTitle,
  onOpen,
  onUploadClick,
}: {
  slot: number;
  label: string;
  src: string;
  defaultSrc: string;
  defaultAlt: string;
  source: "manual" | "auto-post";
  caption: string;
  postTitle?: string;
  onOpen: (slotIndex: number) => void;
  onUploadClick?: () => void;
}) {
  const [status, setStatus] = useState<"loading" | "error" | "ok">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setStatus(src ? "loading" : "error");
  }, [src, attempt]);

  const activeSrc = src || defaultSrc;
  const isUsingDefault = !src;

  return (
    <div className="group flex flex-col rounded-2xl border border-border/80 bg-background/50 p-4 shadow-2xs hover:border-accent/40 hover:shadow-sm transition-all space-y-3">
      {/* Tile Header: Slot label & Source pill */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand/10 text-brand text-[11px] font-bold">
            {slot}
          </span>
          <span className="text-xs font-bold text-foreground">{label}</span>
        </div>

        {source === "auto-post" ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
            Auto · Post {slot}
          </span>
        ) : src ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            Custom URL
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
            Default Slide
          </span>
        )}
      </div>

      {/* 16:9 Aspect Ratio Frame — identical to the Homepage cinematic hero */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950 shadow-inner">
        {src ? (
          status === "error" ? (
            /* Clean graceful fallback state on error (no broken image icon) */
            <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 bg-zinc-900/90 p-4 text-center">
              <div className="rounded-full bg-red-500/10 p-2.5 text-red-400">
                <ImageOff className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">Image unavailable</p>
                <p className="text-[11px] text-muted-foreground">
                  The URL failed to load. The live Homepage will display Default Slide {slot}.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setAttempt((a) => a + 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" /> Retry
                </button>
                <button
                  type="button"
                  onClick={() => onOpen(slot - 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  Inspect details
                </button>
              </div>
            </div>
          ) : (
            /* Valid image loaded or loading */
            <div className="relative h-full w-full">
              {status === "loading" && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-muted/80 backdrop-blur-xs">
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Loading preview…
                  </span>
                </div>
              )}

              <img
                src={src}
                alt={`${label} preview`}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                onLoad={() => setStatus("ok")}
                onError={() => setStatus("error")}
              />

              {/* Homepage Hero Gradient Overlay (mirroring actual homepage hero) */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/80 pointer-events-none" />

              {/* Sub-overlay with title & aspect label */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-white pointer-events-none">
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent/90">
                    Slide {slot} of 3
                  </span>
                  <p className="truncate font-display text-xs sm:text-sm font-semibold text-white/95">
                    {postTitle || caption || `Hero Background ${slot}`}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-xs">
                  16:9 • cover
                </span>
              </div>

              {/* Hover overlay with Inspect Button */}
              <button
                type="button"
                onClick={() => onOpen(slot - 1)}
                title="Inspect full-size image"
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100 cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-transform duration-200 hover:scale-105">
                  <Maximize2 className="h-3.5 w-3.5 text-accent" />
                  <span>Inspect Full Image</span>
                </span>
              </button>
            </div>
          )
        ) : (
          /* Clean graceful fallback state when no URL is entered or post has no cover */
          <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 bg-zinc-900/60 p-4 text-center">
            <div className="rounded-full bg-muted/60 p-3 text-muted-foreground">
              <ImageIcon className="h-6 w-6 opacity-75" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-foreground">
                {source === "auto-post" ? "Post has no cover image" : "No custom image specified"}
              </p>
              <p className="text-[11px] text-muted-foreground max-w-xs">
                The live Homepage will proceed with a dark hero background when no image is set for
                position {slot}.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onOpen(slot - 1)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <Eye className="h-3 w-3 text-accent" />
                <span>Preview Default Slide</span>
              </button>
              {onUploadClick && (
                <button
                  type="button"
                  onClick={onUploadClick}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <Upload className="h-3 w-3" />
                  <span>Upload Image</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Metadata and post title or URL caption */}
      <div className="flex items-center justify-between gap-2 px-0.5 text-[11px]">
        <span className="truncate text-muted-foreground font-medium" title={postTitle || caption}>
          {postTitle ? (
            <span className="flex items-center gap-1">
              <BookMarked className="h-3 w-3 shrink-0 text-accent" />
              <span className="truncate">{postTitle}</span>
            </span>
          ) : (
            <span className="truncate">{caption}</span>
          )}
        </span>
        <button
          type="button"
          onClick={() => onOpen(slot - 1)}
          className="shrink-0 text-accent hover:underline font-semibold cursor-pointer"
        >
          View full
        </button>
      </div>
    </div>
  );
}

/**
 * Live Hero Simulator:
 * Renders the actual live Homepage Hero banner with the active slide,
 * exact gradient overlays, live badge, title, accent highlight, description,
 * CTA buttons, and interactive slide switcher dots.
 */
function LiveHeroSimulator({
  slots,
  draft,
  onOpenLightbox,
}: {
  slots: HeroSlotPreview[];
  draft: Record<string, string>;
  onOpenLightbox: (index: number) => void;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSlot = slots[activeSlide] ?? slots[0];
  const activeImage = currentSlot.src || currentSlot.defaultSrc;

  // Optional auto-cycling simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, slots.length]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-zinc-950 shadow-md">
        {/* Background Image with Ken Burns / cover effect */}
        {activeImage ? (
          <img
            key={activeSlide}
            src={activeImage}
            alt={currentSlot.label}
            className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full bg-zinc-900" />
        )}

        {/* Authentic Homepage Hero Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/85 pointer-events-none" />

        {/* Live Hero Header Badge & Simulation Watermark */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-accent" />
            <span>{draft.homepage_hero_badge || "Solo · Slow · Cinematic"}</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-md">
              Slide {activeSlide + 1} of 3: {currentSlot.label}
            </span>
            <button
              type="button"
              onClick={() => onOpenLightbox(activeSlide)}
              className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer"
            >
              <Maximize2 className="h-3 w-3 text-accent" />
              <span>Full size</span>
            </button>
          </div>
        </div>

        {/* Live Hero Text & CTA Overlay (simulating live index.tsx) */}
        <div className="absolute inset-x-4 bottom-14 sm:bottom-16 max-w-2xl text-white space-y-2 pointer-events-none z-10">
          <h3 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-md">
            <span>{draft.homepage_hero_title || "Stories from the high places"}</span>{" "}
            <span className="text-[#FF7A00]">
              {draft.homepage_hero_title_highlight || "Most people only fly over."}
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-white/85 line-clamp-2 leading-relaxed drop-shadow-sm max-w-xl">
            {draft.homepage_hero_description ||
              "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders."}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md">
              {draft.homepage_hero_button_text || "Read the stories"}
              <ArrowRight className="h-3 w-3" />
            </span>
            {draft.homepage_hero_secondary_button_text && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
                {draft.homepage_hero_secondary_button_text}
              </span>
            )}
          </div>
        </div>

        {/* Navigation Arrows in Simulator (Desktop & Tablet only, hidden on mobile) */}
        {slots.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => {
                setActiveSlide((prev) => (prev - 1 + slots.length) % slots.length);
                setIsPlaying(false);
              }}
              aria-label="Previous Hero image"
              className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/85 backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:text-white hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer pointer-events-auto group"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSlide((prev) => (prev + 1) % slots.length);
                setIsPlaying(false);
              }}
              aria-label="Next Hero image"
              className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/85 backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:text-white hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer pointer-events-auto group"
            >
              <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </>
        )}

        {/* Live Slide Navigation Dots (replicating Homepage HeroSlider dots) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            title={isPlaying ? "Pause slideshow preview" : "Auto-play slideshow preview"}
            className="text-white/80 hover:text-white mr-1 cursor-pointer"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>

          {slots.map((s, i) => (
            <button
              key={s.slot}
              type="button"
              onClick={() => {
                setActiveSlide(i);
                setIsPlaying(false);
              }}
              aria-label={`Preview Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === activeSlide ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Simulator Control Description */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground px-1">
        <span>
          Showing <strong>{currentSlot.label}</strong> ({currentSlot.caption}) with live typography
          and aspect ratio.
        </span>
        <div className="flex items-center gap-2">
          {slots.map((s, i) => (
            <button
              key={s.slot}
              type="button"
              onClick={() => {
                setActiveSlide(i);
                setIsPlaying(false);
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                i === activeSlide
                  ? "bg-brand text-white shadow-2xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Hero Image {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Enhanced Lightbox Modal for inspecting the Hero images in full resolution.
 * Allows slide navigation (Prev / Next, [1] [2] [3]), keyboard controls (Escape, ArrowLeft, ArrowRight),
 * URL copying, and full uncropped inspection.
 */
function HeroLightbox({
  index,
  slots,
  onClose,
  onSelectIndex,
}: {
  index: number;
  slots: HeroSlotPreview[];
  onClose: () => void;
  onSelectIndex: (i: number) => void;
}) {
  const [copied, setCopied] = useState(false);
  const currentSlot = slots[index] ?? slots[0];
  const activeSrc = currentSlot.src || currentSlot.defaultSrc;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onSelectIndex((index - 1 + slots.length) % slots.length);
      } else if (e.key === "ArrowRight") {
        onSelectIndex((index + 1) % slots.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, slots.length, onClose, onSelectIndex]);

  const handleCopyUrl = () => {
    if (!activeSrc) return;
    navigator.clipboard.writeText(activeSrc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Image URL copied to clipboard");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] max-w-6xl w-full flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lightbox Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 bg-black/60">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand/20 border border-brand/30 px-2.5 py-1 text-xs font-bold text-white">
              {currentSlot.label}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white/90 truncate max-w-md">
              {currentSlot.postTitle || currentSlot.caption}
            </span>
          </div>

          {/* Quick Slide Switcher in Lightbox */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-white/60 mr-1 hidden sm:inline">Switch:</span>
            {slots.map((s, i) => (
              <button
                key={s.slot}
                type="button"
                onClick={() => onSelectIndex(i)}
                className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  i === index
                    ? "bg-brand text-white shadow-sm"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {s.slot}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              title="Copy image URL"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy URL"}</span>
            </button>

            <a
              href={activeSrc}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Open in new tab</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Lightbox Body: Image + Chevrons */}
        <div className="relative flex-1 flex items-center justify-center bg-zinc-950 p-4 sm:p-6 min-h-[40vh] max-h-[72vh] overflow-hidden">
          {/* Previous Slide Button */}
          <button
            type="button"
            onClick={() => onSelectIndex((index - 1 + slots.length) % slots.length)}
            aria-label="Previous hero image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Full uncropped image display */}
          {activeSrc ? (
            <img
              src={activeSrc}
              alt={`${currentSlot.label} full inspection`}
              className="max-h-[68vh] max-w-full rounded-lg object-contain shadow-2xl mx-auto"
            />
          ) : (
            <div className="flex min-h-[40vh] w-full items-center justify-center text-sm text-white/60">
              No image configured for this slide
            </div>
          )}

          {/* Next Slide Button */}
          <button
            type="button"
            onClick={() => onSelectIndex((index + 1) % slots.length)}
            aria-label="Next hero image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Lightbox Footer Details */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3 bg-black/60 text-xs text-white/70">
          <div className="flex items-center gap-2 truncate max-w-md">
            <span className="font-semibold text-white">Source:</span>
            <span className="truncate">
              {currentSlot.source === "auto-post"
                ? `Latest published post: "${currentSlot.postTitle || "Post"}"`
                : currentSlot.src
                  ? "Custom Manual URL"
                  : "No default slide"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-white/60">
            <span className="hidden md:inline">Live Homepage uses 16:9 widescreen crop</span>
            <span>Use ← / → keys to switch slides, Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminHomepagePage() {
  const getEditorFn = useServerFn(adminGetHomepageEditor);
  const saveSettingsFn = useServerFn(adminSaveHomepageSettings);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-homepage"],
    queryFn: () => getEditorFn(),
  });

  // Draft form state (all editable homepage settings)
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [original, setOriginal] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [uploadingImageField, setUploadingImageField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const heroImageFieldRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [previewTab, setPreviewTab] = useState<"grid" | "simulator">("grid");

  useEffect(() => {
    if (data) {
      const ed = data as EditorData;
      setOriginal(ed.settings);
      setDraft(ed.settings);
      setIsDirty(false);
      setErrors({});
    }
  }, [data]);

  const set = (key: string, value: string) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setIsDirty(true);
    setErrors((e) => {
      const next = { ...e };
      if (next[key]) delete next[key];
      return next;
    });
  };

  const handleCancel = () => {
    setDraft(original);
    setIsDirty(false);
    setErrors({});
    toast.info("Changes reset to last saved state");
  };

  const saveMutation = useMutation({
    mutationFn: () => saveSettingsFn({ data: { settings: draft } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-homepage"] });
      qc.invalidateQueries({ queryKey: ["home"] });
      setOriginal(draft);
      setIsDirty(false);
      setErrors({});
      toast.success("Homepage saved successfully! Changes are now live.");
    },
    onError: (err: Error) => {
      toast.error(`Failed to save homepage: ${err.message}`);
    },
  });

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validation for required fields
    const nextErrors: Record<string, string> = {};
    const required: [string, string][] = [
      ["homepage_hero_button_text", "Button text is required"],
      ["homepage_hero_title", "Hero title is required"],
      ["homepage_hero_description", "Hero description is required"],
    ];
    if (draft.homepage_hero_mode === "manual" && !draft.homepage_hero_post_id) {
      nextErrors.homepage_hero_post_id = "Select a blog post when Manual mode is enabled";
    }
    if (draft.homepage_featured_mode === "manual" && !draft.homepage_featured_post_id) {
      nextErrors.homepage_featured_post_id = "Select a blog post when Manual mode is enabled";
    }
    // Validation for Manual mode image URLs (if provided)
    if (draft.homepage_hero_images_mode === "manual") {
      const urlPattern = /^(https?:\/\/|\/|data:image\/)/i;
      for (const field of HERO_IMAGE_FIELDS) {
        const val = draft[field.key]?.trim();
        if (val && !urlPattern.test(val)) {
          nextErrors[field.key] = "Please enter a valid URL (starting with https:// or /)";
        }
      }
    }

    for (const [key, msg] of required) {
      if (!draft[key] || !draft[key].trim()) {
        nextErrors[key] = msg;
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please fix the highlighted fields before saving.");
      return;
    }

    saveMutation.mutate();
  };

  const handleHeroImageUpload = async (file: File, fieldKey: string) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPEG, PNG, WebP)");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image file must be smaller than 8MB");
      return;
    }

    const toastId = toast.loading(`Uploading ${file.name}...`);
    setUploadingImageField(fieldKey);

    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type || "image/jpeg",
          base64,
        },
      });

      if (res?.url) {
        set(fieldKey, res.url);
        toast.success("Hero image uploaded and set successfully!", { id: toastId });
      } else {
        throw new Error("Upload did not return a valid URL");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image", { id: toastId });
    } finally {
      setUploadingImageField(null);
      if (heroImageFieldRefs.current[fieldKey]) {
        heroImageFieldRefs.current[fieldKey]!.value = "";
      }
    }
  };

  const posts: PostOption[] = ((data as EditorData | undefined)?.posts ?? []).filter(
    (p) => p.published,
  );
  const heroMode = draft.homepage_hero_mode === "manual" ? "manual" : "auto";
  const heroImagesMode = draft.homepage_hero_images_mode === "manual" ? "manual" : "auto";
  const featuredMode = draft.homepage_featured_mode === "manual" ? "manual" : "auto";

  const HERO_IMAGE_FIELDS = [
    { key: "homepage_hero_image", label: "Hero Image 1", slot: 1 },
    { key: "homepage_hero_image_2", label: "Hero Image 2", slot: 2 },
    { key: "homepage_hero_image_3", label: "Hero Image 3", slot: 3 },
  ] as const;

  // Ordered published posts (server returns them sorted by published_at desc).
  // In Auto mode: prioritize published posts with cover images, matching resolveLatestPosts
  const postsWithCover = posts.filter((p) => p.cover_image && p.cover_image.trim());
  const autoPosts = postsWithCover.length >= 3 ? postsWithCover.slice(0, 3) : posts.slice(0, 3);

  // Resolved Hero Slots Preview (matches actual homepage Hero logic)
  const heroSlots: HeroSlotPreview[] = HERO_IMAGE_FIELDS.map((field, i) => {
    const defaultSlide = DEFAULT_HERO_SLIDES[i];
    if (heroImagesMode === "manual") {
      const raw = draft[field.key] ?? "";
      return {
        slot: field.slot,
        label: `Hero Image ${field.slot}`,
        src: raw.trim() ? resolveMediaUrl(raw.trim()) : "",
        defaultSrc: defaultSlide.src,
        defaultAlt: defaultSlide.alt,
        source: "manual",
        caption: raw.trim() ? "Custom Manual URL" : "No image set",
      };
    }
    const post = autoPosts[i];
    const cover = post?.cover_image?.trim() ? resolveMediaUrl(post.cover_image.trim()) : "";
    return {
      slot: field.slot,
      label: `Hero Image ${field.slot}`,
      src: cover,
      defaultSrc: defaultSlide.src,
      defaultAlt: defaultSlide.alt,
      source: "auto-post",
      caption: cover
        ? (post?.title ?? "Latest post")
        : post
          ? `${post.title} (no cover image — no slide)`
          : "No image set",
      postTitle: post?.title,
      postSlug: post?.slug,
    };
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm">Loading Homepage Management…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar — sticky action bar */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <Compass className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Homepage Management</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Structured control over the Hero Banner slideshow, Journey in Numbers stats, and
              Featured Stories.
            </p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs"
          >
            <Eye className="h-3.5 w-3.5 text-accent" />
            <span>View Live Page</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground ml-0.5" />
          </Link>

          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={!isDirty || saveMutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {saveMutation.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>{saveMutation.isPending ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Unsaved Changes Alert Banner */}
      {isDirty && (
        <div className="flex items-center justify-between rounded-xl bg-brand/10 border border-brand/20 px-4 py-2.5 text-xs text-brand animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-accent" />
            <span className="font-medium">
              You have unsaved changes. Click &quot;Save Changes&quot; to apply them to the live
              homepage.
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saveMutation.isPending}
            className="font-bold underline hover:opacity-80 cursor-pointer"
          >
            Save now
          </button>
        </div>
      )}

      {/* =========================================================================
          HERO BANNER PREVIEW AREA (Large, 16:9 Widescreen, Responsive, Accurate Cropping)
         ========================================================================= */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-4">
          <div className="space-y-1">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-foreground">
              <ImagePlus className="h-5 w-5 text-accent" />
              <span>Hero Banner Preview</span>
            </h2>
            <p className="text-xs text-muted-foreground max-w-2xl">
              {heroImagesMode === "auto"
                ? "Auto mode active — displaying the cover images of the 3 latest published posts with true 16:9 widescreen cropping, object-fit: cover, and gradient lighting."
                : "Manual mode active — displaying your 3 custom hero image URLs with true 16:9 widescreen cropping, object-fit: cover, and gradient lighting."}
            </p>
          </div>

          {/* Mode Pill & View Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                heroImagesMode === "auto"
                  ? "bg-accent/15 text-accent border border-accent/30"
                  : "bg-brand/10 text-brand border border-brand/20"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>
                {heroImagesMode === "auto"
                  ? "Auto Mode (3 Latest Posts)"
                  : "Manual Mode (Custom URLs)"}
              </span>
            </span>

            {/* Switch between 3-Image Grid and Live Simulator */}
            <div className="inline-flex rounded-xl border border-border bg-background p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setPreviewTab("grid")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  previewTab === "grid"
                    ? "bg-brand text-white font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>3-Image Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab("simulator")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  previewTab === "simulator"
                    ? "bg-brand text-white font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Rocket className="h-3.5 w-3.5" />
                <span>Live Hero Simulator</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: 3-Image Grid */}
        {previewTab === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {heroSlots.map((slotData, i) => (
              <HeroImageTile
                key={slotData.slot}
                slot={slotData.slot}
                label={slotData.label}
                src={slotData.src}
                defaultSrc={slotData.defaultSrc}
                defaultAlt={slotData.defaultAlt}
                source={slotData.source}
                caption={slotData.caption}
                postTitle={slotData.postTitle}
                onOpen={(idx) => setLightboxIndex(idx)}
                onUploadClick={
                  heroImagesMode === "manual"
                    ? () => heroImageFieldRefs.current[HERO_IMAGE_FIELDS[i].key]?.click()
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {/* View Mode 2: Live Hero Simulator */}
        {previewTab === "simulator" && (
          <LiveHeroSimulator
            slots={heroSlots}
            draft={draft}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />
        )}

        {/* Aspect Ratio & Cropping Helper Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-muted/30 p-3.5 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <Maximize2 className="h-3.5 w-3.5 text-accent" />
              <span>Click any image to inspect full uncropped resolution in the lightbox.</span>
            </span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span>
              All previews use <strong>16:9 cinematic widescreen aspect ratio</strong> with{" "}
              <strong>object-fit: cover</strong> and <strong>object-position: center</strong>.
            </span>
          </div>

          <span className="text-[11px] text-muted-foreground/80">
            {heroImagesMode === "manual"
              ? "Tip: Image inputs update the preview instantly as you type."
              : "Tip: Covers change automatically as new posts are published."}
          </span>
        </div>
      </section>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* HERO BANNER SETTINGS */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-foreground">
                  <Rocket className="h-5 w-5 text-accent" />
                  <span>Hero Banner Settings</span>
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Configure the full-screen intro at the top of the homepage — background mode,
                  titles, and buttons.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                <Globe className="h-3 w-3" /> Public
              </span>
            </div>

            {/* Hero source mode */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-foreground">Hero Source Post</label>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => set("homepage_hero_mode", "auto")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    heroMode === "auto"
                      ? "border-accent bg-accent/10 text-accent font-medium"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Auto</span>
                    <span className="block text-xs text-muted-foreground">
                      Latest published post
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => set("homepage_hero_mode", "manual")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    heroMode === "manual"
                      ? "border-accent bg-accent/10 text-accent font-medium"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <BookMarked className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Manual</span>
                    <span className="block text-xs text-muted-foreground">
                      Pick a specific post
                    </span>
                  </span>
                </button>
              </div>

              {heroMode === "manual" && (
                <div className="space-y-1.5 pt-1">
                  <label
                    htmlFor="homepage_hero_post_id"
                    className="block text-xs font-medium text-foreground"
                  >
                    Select Blog Post
                  </label>
                  <select
                    id="homepage_hero_post_id"
                    value={draft.homepage_hero_post_id ?? ""}
                    onChange={(e) => set("homepage_hero_post_id", e.target.value)}
                    className={`w-full rounded-xl border bg-background py-2.5 px-3.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                      errors.homepage_hero_post_id ? "border-red-500" : "border-border"
                    }`}
                  >
                    <option value="">— Select a post —</option>
                    {posts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                        {p.featured ? " ★" : ""}
                      </option>
                    ))}
                  </select>
                  {errors.homepage_hero_post_id && (
                    <p className="text-xs text-red-500">{errors.homepage_hero_post_id}</p>
                  )}
                </div>
              )}
            </div>

            {/* Hero slideshow images mode */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="block text-xs font-medium text-foreground">
                  Hero Slideshow Images Mode
                </label>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    heroImagesMode === "auto"
                      ? "bg-accent/15 text-accent border border-accent/30"
                      : "bg-brand/10 text-brand border border-brand/25"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      heroImagesMode === "auto" ? "bg-accent animate-pulse" : "bg-brand"
                    }`}
                  />
                  <span>
                    Mode:{" "}
                    {heroImagesMode === "auto" ? "Auto (3 Latest Posts)" : "Manual (Custom URLs)"}
                  </span>
                </span>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => set("homepage_hero_images_mode", "auto")}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${
                    heroImagesMode === "auto"
                      ? "border-accent bg-accent/10 text-accent font-medium shadow-xs"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      heroImagesMode === "auto"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-semibold">Auto Mode</span>
                    <span className="block text-xs text-muted-foreground">
                      Cover images from the 3 latest published posts
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => set("homepage_hero_images_mode", "manual")}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${
                    heroImagesMode === "manual"
                      ? "border-brand bg-brand/10 text-brand font-medium shadow-xs"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      heroImagesMode === "manual"
                        ? "bg-brand/20 text-brand"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <ImagePlus className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-semibold">Manual Mode</span>
                    <span className="block text-xs text-muted-foreground">
                      Configure 3 separate custom image URLs
                    </span>
                  </div>
                </button>
              </div>

              {/* Auto Mode Info Card */}
              {heroImagesMode === "auto" && (
                <div className="rounded-xl border border-accent/25 bg-accent/5 p-4 space-y-3 animate-fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      <span>3 Latest Published Posts Selected Automatically</span>
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      Updates automatically as new posts are published
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3 text-xs">
                    {autoPosts.map((p, idx) => (
                      <div
                        key={p.id || idx}
                        className="rounded-lg border border-border/80 bg-card p-2.5 space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-foreground">
                            Hero Image {idx + 1}
                          </span>
                          {p.cover_image ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                              Has cover
                            </span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-400 font-semibold text-[10px]">
                              Default slide
                            </span>
                          )}
                        </div>
                        <p
                          className="truncate font-medium text-foreground text-[11px]"
                          title={p.title}
                        >
                          {p.title}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Note: Your manually entered image URLs are safely preserved in the background
                    and will be restored if you switch back to Manual mode.
                  </p>
                </div>
              )}

              {/* Manual Mode Fields with 16:9 thumbnails and immediate reactive preview */}
              {heroImagesMode === "manual" && (
                <div className="space-y-4 pt-2">
                  {HERO_IMAGE_FIELDS.map((field) => {
                    const value = draft[field.key] ?? "";
                    const preview = value.trim() ? resolveMediaUrl(value) : "";
                    const isUploading = uploadingImageField === field.key;
                    const fieldError = errors[field.key];
                    return (
                      <div
                        key={field.key}
                        className={`space-y-3 rounded-xl border bg-background/50 p-4 shadow-2xs transition-colors ${
                          fieldError ? "border-red-500/80" : "border-border/80"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <label className="block text-xs font-semibold text-foreground">
                            {field.label} URL
                          </label>
                          {preview && (
                            <button
                              type="button"
                              onClick={() => set(field.key, "")}
                              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition cursor-pointer font-medium"
                            >
                              <X className="h-3.5 w-3.5" /> Clear to Default
                            </button>
                          )}
                        </div>

                        {/* 16:9 Thumbnail preview in form */}
                        <div className="relative aspect-[16/9] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-zinc-950">
                          {preview ? (
                            <div className="relative h-full w-full group">
                              <img
                                src={preview}
                                alt={`${field.label} thumbnail`}
                                className="h-full w-full object-cover object-center"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => setLightboxIndex(field.slot - 1)}
                                  className="inline-flex items-center gap-1 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs"
                                >
                                  <Maximize2 className="h-3 w-3 text-accent" /> Full view
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-3 text-center text-xs text-muted-foreground bg-muted/30">
                              <ImageIcon className="h-5 w-5 opacity-60" />
                              <span>No custom image — default slide shown</span>
                            </div>
                          )}
                        </div>

                        {/* Upload & Direct URL Input */}
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            ref={(el) => {
                              heroImageFieldRefs.current[field.key] = el;
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleHeroImageUpload(file, field.key);
                            }}
                          />
                          <button
                            type="button"
                            disabled={isUploading}
                            onClick={() => heroImageFieldRefs.current[field.key]?.click()}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3.5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer"
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                <span>Uploading…</span>
                              </>
                            ) : (
                              <>
                                <Upload className="h-3.5 w-3.5 text-accent" />
                                <span>{value.trim() ? "Replace Image" : "Upload Image"}</span>
                              </>
                            )}
                          </button>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => set(field.key, e.target.value)}
                            placeholder="…or paste image URL directly (e.g. https://... or /assets/...)"
                            className={`flex-1 min-w-48 rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-1 transition-colors ${
                              fieldError
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-border focus:border-accent focus:ring-accent"
                            }`}
                          />
                        </div>

                        {fieldError && (
                          <p className="text-xs text-red-500 font-medium">{fieldError}</p>
                        )}
                      </div>
                    );
                  })}
                  <p className="text-xs text-muted-foreground">
                    Tip: Any empty slot shows a dark hero background on the live site. Add a cover
                    image or URL to show a photo.
                  </p>
                </div>
              )}
            </div>

            {/* Hero text fields */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="homepage_hero_badge"
                  className="block text-xs font-medium text-foreground"
                >
                  Badge Text
                </label>
                <input
                  id="homepage_hero_badge"
                  type="text"
                  value={draft.homepage_hero_badge ?? ""}
                  onChange={(e) => set("homepage_hero_badge", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="homepage_hero_title"
                  className="block text-xs font-medium text-foreground"
                >
                  Hero Title *
                </label>
                <input
                  id="homepage_hero_title"
                  type="text"
                  value={draft.homepage_hero_title ?? ""}
                  onChange={(e) => set("homepage_hero_title", e.target.value)}
                  className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                    errors.homepage_hero_title ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.homepage_hero_title && (
                  <p className="text-xs text-red-500">{errors.homepage_hero_title}</p>
                )}
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="homepage_hero_title_highlight"
                  className="block text-xs font-medium text-foreground"
                >
                  Title Accent Highlight
                </label>
                <input
                  id="homepage_hero_title_highlight"
                  type="text"
                  value={draft.homepage_hero_title_highlight ?? ""}
                  onChange={(e) => set("homepage_hero_title_highlight", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
                <p className="text-xs text-muted-foreground">
                  The second phrase of the title, highlighted in orange (#FF7A00).
                </p>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="homepage_hero_description"
                  className="block text-xs font-medium text-foreground"
                >
                  Description *
                </label>
                <textarea
                  id="homepage_hero_description"
                  rows={2}
                  value={draft.homepage_hero_description ?? ""}
                  onChange={(e) => set("homepage_hero_description", e.target.value)}
                  className={`w-full rounded-xl border bg-background p-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none leading-relaxed ${
                    errors.homepage_hero_description ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.homepage_hero_description && (
                  <p className="text-xs text-red-500">{errors.homepage_hero_description}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="homepage_hero_button_text"
                  className="block text-xs font-medium text-foreground"
                >
                  Primary Button Text *
                </label>
                <input
                  id="homepage_hero_button_text"
                  type="text"
                  value={draft.homepage_hero_button_text ?? ""}
                  onChange={(e) => set("homepage_hero_button_text", e.target.value)}
                  className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                    errors.homepage_hero_button_text ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.homepage_hero_button_text && (
                  <p className="text-xs text-red-500">{errors.homepage_hero_button_text}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="homepage_hero_button_link"
                  className="block text-xs font-medium text-foreground"
                >
                  Primary Button Link
                </label>
                <input
                  id="homepage_hero_button_link"
                  type="text"
                  value={draft.homepage_hero_button_link ?? ""}
                  onChange={(e) => set("homepage_hero_button_link", e.target.value)}
                  placeholder="/blog or https://…"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="homepage_hero_secondary_button_text"
                  className="block text-xs font-medium text-foreground"
                >
                  Secondary Button Text
                </label>
                <input
                  id="homepage_hero_secondary_button_text"
                  type="text"
                  value={draft.homepage_hero_secondary_button_text ?? ""}
                  onChange={(e) => set("homepage_hero_secondary_button_text", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="homepage_hero_secondary_button_link"
                  className="block text-xs font-medium text-foreground"
                >
                  Secondary Button Link
                </label>
                <input
                  id="homepage_hero_secondary_button_link"
                  type="text"
                  value={draft.homepage_hero_secondary_button_link ?? ""}
                  onChange={(e) => set("homepage_hero_secondary_button_link", e.target.value)}
                  placeholder="/destinations or https://…"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>
          </section>

          {/* JOURNEY IN NUMBERS */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-foreground">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  <span>Journey in Numbers</span>
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  The stats strip (countries, trips, photos, kilometres, days) above the newsletter.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                <Globe className="h-3 w-3" /> Public
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-foreground">Countries Visited</label>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => set("homepage_stat_countries_mode", "auto")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    draft.homepage_stat_countries_mode === "manual"
                      ? "border-border bg-background hover:bg-muted"
                      : "border-accent bg-accent/10 text-accent font-medium"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Auto</span>
                    <span className="block text-xs text-muted-foreground">
                      Computed from post locations
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => set("homepage_stat_countries_mode", "manual")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    draft.homepage_stat_countries_mode === "manual"
                      ? "border-accent bg-accent/10 text-accent font-medium"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <BookMarked className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Manual</span>
                    <span className="block text-xs text-muted-foreground">
                      Enter a fixed number
                    </span>
                  </span>
                </button>
              </div>
              {draft.homepage_stat_countries_mode === "manual" && (
                <div className="space-y-1.5 pt-1">
                  <label
                    htmlFor="homepage_stat_countries"
                    className="block text-xs font-medium text-foreground"
                  >
                    Number of Countries
                  </label>
                  <input
                    id="homepage_stat_countries"
                    type="number"
                    min={0}
                    value={draft.homepage_stat_countries ?? ""}
                    onChange={(e) => set("homepage_stat_countries", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="homepage_stat_trips"
                  className="block text-xs font-medium text-foreground"
                >
                  Solo Motorcycle Trips
                </label>
                <input
                  id="homepage_stat_trips"
                  type="number"
                  min={0}
                  value={draft.homepage_stat_trips ?? ""}
                  onChange={(e) => set("homepage_stat_trips", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="homepage_stat_kilometres"
                  className="block text-xs font-medium text-foreground"
                >
                  Kilometres Travelled
                </label>
                <div className="flex gap-2">
                  <input
                    id="homepage_stat_kilometres"
                    type="number"
                    min={0}
                    value={draft.homepage_stat_kilometres ?? ""}
                    onChange={(e) => set("homepage_stat_kilometres", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <input
                    type="text"
                    value={draft.homepage_stat_kilometres_suffix ?? ""}
                    onChange={(e) => set("homepage_stat_kilometres_suffix", e.target.value)}
                    placeholder=" km"
                    className="w-20 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-center outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="homepage_stat_photos"
                  className="block text-xs font-medium text-foreground"
                >
                  Photos Captured
                </label>
                <div className="flex gap-2">
                  <input
                    id="homepage_stat_photos"
                    type="number"
                    min={0}
                    value={draft.homepage_stat_photos ?? ""}
                    onChange={(e) => set("homepage_stat_photos", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <input
                    type="text"
                    value={draft.homepage_stat_photos_suffix ?? ""}
                    onChange={(e) => set("homepage_stat_photos_suffix", e.target.value)}
                    placeholder="K+"
                    className="w-20 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-center outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="homepage_stat_days"
                  className="block text-xs font-medium text-foreground"
                >
                  Days on the Road
                </label>
                <input
                  id="homepage_stat_days"
                  type="number"
                  min={0}
                  value={draft.homepage_stat_days ?? ""}
                  onChange={(e) => set("homepage_stat_days", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>
          </section>

          {/* FEATURED POST */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-foreground">
                  <BookMarked className="h-5 w-5 text-accent" />
                  <span>Featured / Latest Blog Post</span>
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Controls the “Featured Expedition” section shown on the homepage.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                <Globe className="h-3 w-3" /> Public
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => set("homepage_featured_mode", "auto")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                  featuredMode === "auto"
                    ? "border-accent bg-accent/10 text-accent font-medium"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>
                  <span className="block font-semibold">Auto</span>
                  <span className="block text-xs text-muted-foreground">Latest featured post</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => set("homepage_featured_mode", "manual")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                  featuredMode === "manual"
                    ? "border-accent bg-accent/10 text-accent font-medium"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <BookMarked className="h-4 w-4" />
                <span>
                  <span className="block font-semibold">Manual</span>
                  <span className="block text-xs text-muted-foreground">Pick a specific post</span>
                </span>
              </button>
            </div>

            {featuredMode === "manual" && (
              <div className="space-y-1.5 pt-1">
                <label
                  htmlFor="homepage_featured_post_id"
                  className="block text-xs font-medium text-foreground"
                >
                  Select Blog Post
                </label>
                <select
                  id="homepage_featured_post_id"
                  value={draft.homepage_featured_post_id ?? ""}
                  onChange={(e) => set("homepage_featured_post_id", e.target.value)}
                  className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                    errors.homepage_featured_post_id ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">— Select a post —</option>
                  {posts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                      {p.featured ? " ★" : ""}
                    </option>
                  ))}
                </select>
                {errors.homepage_featured_post_id && (
                  <p className="text-xs text-red-500">{errors.homepage_featured_post_id}</p>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Active Hero Preview card (16:9) */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Eye className="h-3.5 w-3.5 text-accent" />
                <span>Active Hero Slide 1</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="text-[11px] text-accent hover:underline font-semibold cursor-pointer"
              >
                Inspect
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
              <img
                src={heroSlots[0]?.src || heroSlots[0]?.defaultSrc}
                alt="Active hero slide preview"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  {draft.homepage_hero_badge || "Solo · Slow · Cinematic"}
                </span>
                <h4 className="font-display text-xs sm:text-sm font-bold leading-tight mt-0.5 line-clamp-2">
                  {draft.homepage_hero_title || "Stories from the high places"}{" "}
                  <span className="text-[#FF7A00]">
                    {draft.homepage_hero_title_highlight || "Most people only fly over."}
                  </span>
                </h4>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground">
              {heroMode === "auto"
                ? "Hero story uses the latest published post automatically."
                : "Hero story uses the post you selected manually."}{" "}
              {heroImagesMode === "auto"
                ? "Slideshow images are sourced from the 3 latest published posts."
                : "Slideshow images use your 3 custom URLs."}
            </p>
          </div>

          {/* Security & Architecture card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="font-display text-sm font-semibold flex items-center gap-2 text-foreground">
              <Shield className="h-4 w-4 text-accent" />
              <span>Security & Architecture</span>
            </h3>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Admin Only:</strong> Only authenticated admins
                  and editors can save changes — enforced by RLS and server-side role checks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Instant Live:</strong> Reuses the existing
                  site settings table — changes appear on the homepage immediately after saving.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Safe Defaults:</strong> Empty images or links
                  automatically fall back to default assets with no broken layouts.
                </span>
              </li>
            </ul>
          </div>

          {/* Tips card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
            <h3 className="font-display text-sm font-semibold text-foreground">CMS Tips</h3>
            <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
              <li>
                Use <strong>Auto mode</strong> for slideshow images to keep the homepage freshly
                updated as you publish.
              </li>
              <li>
                In <strong>Manual mode</strong>, images preview immediately when you paste a valid
                image URL.
              </li>
              <li>
                Click any preview image or thumbnail to inspect full high-resolution details in the
                lightbox.
              </li>
              <li>
                Click <strong>Reset</strong> to discard unsaved edits and restore the last saved
                state.
              </li>
            </ul>
          </div>
        </aside>
      </form>

      {/* Lightbox for full-size image inspection */}
      {lightboxIndex !== null && (
        <HeroLightbox
          index={lightboxIndex}
          slots={heroSlots}
          onClose={() => setLightboxIndex(null)}
          onSelectIndex={(idx) => setLightboxIndex(idx)}
        />
      )}
    </div>
  );
}
