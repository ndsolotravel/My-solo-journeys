import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as useServerFn, O as adminGetHomepageEditor, P as adminSaveHomepageSettings } from "./router-oW7Y7AUy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as adminUploadImage } from "./admin.functions-DiyyO5cG.mjs";
import { r as resolveMediaUrl } from "./media-DUkNwMwq.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { h as LoaderCircle, v as Compass, ah as Eye, $ as ExternalLink, ap as RotateCcw, aq as Save, b as Sparkles, aF as ImagePlus, z as Layers, aG as Rocket, aH as Maximize2, G as Globe, aI as BookMarked, X, a6 as Image, ar as Upload, aa as ChartColumn, w as Shield, p as CircleCheck, aJ as ImageOff, aj as RefreshCw, f as ArrowRight, o as ChevronLeft, n as ChevronRight, aK as Pause, aL as Play, Z as Check, aM as Copy } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./client-BaIz-VBI.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
const DEFAULT_HERO_SLIDES = [{
  src: "",
  alt: "Nanga Parbat at sunrise"
}, {
  src: "",
  alt: "Mountain road at dusk"
}, {
  src: "",
  alt: "Trekker on alpine ridge"
}];
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
  onUploadClick
}) {
  const [status, setStatus] = reactExports.useState("loading");
  const [attempt, setAttempt] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setStatus(src ? "loading" : "error");
  }, [src, attempt]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col rounded-2xl border border-border/80 bg-background/50 p-4 shadow-2xs hover:border-accent/40 hover:shadow-sm transition-all space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand/10 text-brand text-[11px] font-bold", children: slot }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground", children: label })
      ] }),
      source === "auto-post" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent", children: [
        "Auto · Post ",
        slot
      ] }) : src ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400", children: "Custom URL" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400", children: "Default Slide" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950 shadow-inner", children: src ? status === "error" ? (
      /* Clean graceful fallback state on error (no broken image icon) */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center gap-2.5 bg-zinc-900/90 p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-red-500/10 p-2.5 text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Image unavailable" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
            "The URL failed to load. The live Homepage will display Default Slide ",
            slot,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setAttempt((a) => a + 1), className: "inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
            " Retry"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onOpen(slot - 1), className: "inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer", children: "Inspect details" })
        ] })
      ] })
    ) : (
      /* Valid image loaded or loading */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full", children: [
        status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-muted/80 backdrop-blur-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Loading preview…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `${label} preview`, className: "h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105", onLoad: () => setStatus("ok"), onError: () => setStatus("error") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/80 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-white pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[10px] font-semibold uppercase tracking-wider text-accent/90", children: [
              "Slide ",
              slot,
              " of 3"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-xs sm:text-sm font-semibold text-white/95", children: postTitle || caption || `Hero Background ${slot}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-xs", children: "16:9 • cover" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onOpen(slot - 1), title: "Inspect full-size image", className: "absolute inset-0 z-20 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-transform duration-200 hover:scale-105", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Inspect Full Image" })
        ] }) })
      ] })
    ) : (
      /* Clean graceful fallback state when no URL is entered or post has no cover */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center gap-2.5 bg-zinc-900/60 p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted/60 p-3 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6 opacity-75" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: source === "auto-post" ? "Post has no cover image" : "No custom image specified" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground max-w-xs", children: [
            "The live Homepage will proceed with a dark hero background when no image is set for position ",
            slot,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onOpen(slot - 1), className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Preview Default Slide" })
          ] }),
          onUploadClick && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onUploadClick, className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upload Image" })
          ] })
        ] })
      ] })
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 px-0.5 text-[11px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground font-medium", title: postTitle || caption, children: postTitle ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-3 w-3 shrink-0 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: postTitle })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: caption }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onOpen(slot - 1), className: "shrink-0 text-accent hover:underline font-semibold cursor-pointer", children: "View full" })
    ] })
  ] });
}
function LiveHeroSimulator({
  slots,
  draft,
  onOpenLightbox
}) {
  const [activeSlide, setActiveSlide] = reactExports.useState(0);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const currentSlot = slots[activeSlide] ?? slots[0];
  const activeImage = currentSlot.src || currentSlot.defaultSrc;
  reactExports.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slots.length);
    }, 5e3);
    return () => clearInterval(interval);
  }, [isPlaying, slots.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-zinc-950 shadow-md", children: [
      activeImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeImage, alt: currentSlot.label, className: "absolute inset-0 h-full w-full object-cover object-center animate-fade-in transition-all duration-700" }, activeSlide) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 h-full w-full bg-zinc-900" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/85 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: draft.homepage_hero_badge || "Solo · Slow · Cinematic" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-md", children: [
            "Slide ",
            activeSlide + 1,
            " of 3: ",
            currentSlot.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onOpenLightbox(activeSlide), className: "inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3 w-3 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Full size" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-4 bottom-14 sm:bottom-16 max-w-2xl text-white space-y-2 pointer-events-none z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg sm:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: draft.homepage_hero_title || "Stories from the high places" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FF7A00]", children: draft.homepage_hero_title_highlight || "Most people only fly over." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-white/85 line-clamp-2 leading-relaxed drop-shadow-sm max-w-xl", children: draft.homepage_hero_description || "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md", children: [
            draft.homepage_hero_button_text || "Read the stories",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] }),
          draft.homepage_hero_secondary_button_text && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-xs", children: draft.homepage_hero_secondary_button_text })
        ] })
      ] }),
      slots.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          setActiveSlide((prev) => (prev - 1 + slots.length) % slots.length);
          setIsPlaying(false);
        }, "aria-label": "Previous Hero image", className: "hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/85 backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:text-white hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer pointer-events-auto group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          setActiveSlide((prev) => (prev + 1) % slots.length);
          setIsPlaying(false);
        }, "aria-label": "Next Hero image", className: "hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/85 backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:text-white hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer pointer-events-auto group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15 pointer-events-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsPlaying((p) => !p), title: isPlaying ? "Pause slideshow preview" : "Auto-play slideshow preview", className: "text-white/80 hover:text-white mr-1 cursor-pointer", children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }) }),
        slots.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          setActiveSlide(i);
          setIsPlaying(false);
        }, "aria-label": `Preview Slide ${i + 1}`, className: `h-2 rounded-full transition-all cursor-pointer ${i === activeSlide ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"}` }, s.slot))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Showing ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: currentSlot.label }),
        " (",
        currentSlot.caption,
        ") with live typography and aspect ratio."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: slots.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
        setActiveSlide(i);
        setIsPlaying(false);
      }, className: `rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${i === activeSlide ? "bg-brand text-white shadow-2xs" : "bg-muted text-muted-foreground hover:text-foreground"}`, children: [
        "Hero Image ",
        i + 1
      ] }, s.slot)) })
    ] })
  ] });
}
function HeroLightbox({
  index,
  slots,
  onClose,
  onSelectIndex
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const currentSlot = slots[index] ?? slots[0];
  const activeSrc = currentSlot.src || currentSlot.defaultSrc;
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
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
    setTimeout(() => setCopied(false), 2e3);
    toast.success("Image URL copied to clipboard");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md animate-fade-in", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-h-[92vh] max-w-6xl w-full flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 bg-black/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 rounded-lg bg-brand/20 border border-brand/30 px-2.5 py-1 text-xs font-bold text-white", children: currentSlot.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm font-semibold text-white/90 truncate max-w-md", children: currentSlot.postTitle || currentSlot.caption })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/60 mr-1 hidden sm:inline", children: "Switch:" }),
        slots.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onSelectIndex(i), className: `h-7 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${i === index ? "bg-brand text-white shadow-sm" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"}`, children: s.slot }, s.slot))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleCopyUrl, className: "inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer", title: "Copy image URL", children: [
          copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: copied ? "Copied" : "Copy URL" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: activeSrc, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Open in new tab" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer", "aria-label": "Close preview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 flex items-center justify-center bg-zinc-950 p-4 sm:p-6 min-h-[40vh] max-h-[72vh] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onSelectIndex((index - 1 + slots.length) % slots.length), "aria-label": "Previous hero image", className: "absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      activeSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeSrc, alt: `${currentSlot.label} full inspection`, className: "max-h-[68vh] max-w-full rounded-lg object-contain shadow-2xl mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[40vh] w-full items-center justify-center text-sm text-white/60", children: "No image configured for this slide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onSelectIndex((index + 1) % slots.length), "aria-label": "Next hero image", className: "absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3 bg-black/60 text-xs text-white/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 truncate max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: "Source:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: currentSlot.source === "auto-post" ? `Latest published post: "${currentSlot.postTitle || "Post"}"` : currentSlot.src ? "Custom Manual URL" : "No default slide" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-[11px] text-white/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline", children: "Live Homepage uses 16:9 widescreen crop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Use ← / → keys to switch slides, Esc to close" })
      ] })
    ] })
  ] }) });
}
function AdminHomepagePage() {
  const getEditorFn = useServerFn(adminGetHomepageEditor);
  const saveSettingsFn = useServerFn(adminSaveHomepageSettings);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-homepage"],
    queryFn: () => getEditorFn()
  });
  const [draft, setDraft] = reactExports.useState({});
  const [original, setOriginal] = reactExports.useState({});
  const [isDirty, setIsDirty] = reactExports.useState(false);
  const [uploadingImageField, setUploadingImageField] = reactExports.useState(null);
  const [errors, setErrors] = reactExports.useState({});
  const heroImageFieldRefs = reactExports.useRef({});
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const [previewTab, setPreviewTab] = reactExports.useState("grid");
  reactExports.useEffect(() => {
    if (data) {
      const ed = data;
      setOriginal(ed.settings);
      setDraft(ed.settings);
      setIsDirty(false);
      setErrors({});
    }
  }, [data]);
  const set = (key, value) => {
    setDraft((d) => ({
      ...d,
      [key]: value
    }));
    setIsDirty(true);
    setErrors((e) => {
      const next = {
        ...e
      };
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
    mutationFn: () => saveSettingsFn({
      data: {
        settings: draft
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-homepage"]
      });
      qc.invalidateQueries({
        queryKey: ["home"]
      });
      setOriginal(draft);
      setIsDirty(false);
      setErrors({});
      toast.success("Homepage saved successfully! Changes are now live.");
    },
    onError: (err) => {
      toast.error(`Failed to save homepage: ${err.message}`);
    }
  });
  const handleSave = (e) => {
    if (e) e.preventDefault();
    const nextErrors = {};
    const required = [["homepage_hero_button_text", "Button text is required"], ["homepage_hero_title", "Hero title is required"], ["homepage_hero_description", "Hero description is required"]];
    if (draft.homepage_hero_mode === "manual" && !draft.homepage_hero_post_id) {
      nextErrors.homepage_hero_post_id = "Select a blog post when Manual mode is enabled";
    }
    if (draft.homepage_featured_mode === "manual" && !draft.homepage_featured_post_id) {
      nextErrors.homepage_featured_post_id = "Select a blog post when Manual mode is enabled";
    }
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
  const handleHeroImageUpload = async (file, fieldKey) => {
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
      const base64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type || "image/jpeg",
          base64
        }
      });
      if (res?.url) {
        set(fieldKey, res.url);
        toast.success("Hero image uploaded and set successfully!", {
          id: toastId
        });
      } else {
        throw new Error("Upload did not return a valid URL");
      }
    } catch (err) {
      toast.error(err.message || "Failed to upload image", {
        id: toastId
      });
    } finally {
      setUploadingImageField(null);
      if (heroImageFieldRefs.current[fieldKey]) {
        heroImageFieldRefs.current[fieldKey].value = "";
      }
    }
  };
  const posts = (data?.posts ?? []).filter((p) => p.published);
  const heroMode = draft.homepage_hero_mode === "manual" ? "manual" : "auto";
  const heroImagesMode = draft.homepage_hero_images_mode === "manual" ? "manual" : "auto";
  const featuredMode = draft.homepage_featured_mode === "manual" ? "manual" : "auto";
  const HERO_IMAGE_FIELDS = [{
    key: "homepage_hero_image",
    label: "Hero Image 1",
    slot: 1
  }, {
    key: "homepage_hero_image_2",
    label: "Hero Image 2",
    slot: 2
  }, {
    key: "homepage_hero_image_3",
    label: "Hero Image 3",
    slot: 3
  }];
  const postsWithCover = posts.filter((p) => p.cover_image && p.cover_image.trim());
  const autoPosts = postsWithCover.length >= 3 ? postsWithCover.slice(0, 3) : posts.slice(0, 3);
  const heroSlots = HERO_IMAGE_FIELDS.map((field, i) => {
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
        caption: raw.trim() ? "Custom Manual URL" : "No image set"
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
      caption: cover ? post?.title ?? "Latest post" : post ? `${post.title} (no cover image — no slide)` : "No image set",
      postTitle: post?.title,
      postSlug: post?.slug
    };
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[50vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading Homepage Management…" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-2xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-6 w-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Homepage Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Structured control over the Hero Banner slideshow, Journey in Numbers stats, and Featured Stories." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View Live Page" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 text-muted-foreground ml-0.5" })
        ] }),
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleCancel, disabled: saveMutation.isPending, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reset" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => handleSave(), disabled: !isDirty || saveMutation.isPending, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer", children: [
          saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: saveMutation.isPending ? "Saving..." : "Save Changes" })
        ] })
      ] })
    ] }),
    isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-brand/10 border border-brand/20 px-4 py-2.5 text-xs text-brand animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 shrink-0 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: 'You have unsaved changes. Click "Save Changes" to apply them to the live homepage.' })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleSave(), disabled: saveMutation.isPending, className: "font-bold underline hover:opacity-80 cursor-pointer", children: "Save now" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-5 w-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hero Banner Preview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-2xl", children: heroImagesMode === "auto" ? "Auto mode active — displaying the cover images of the 3 latest published posts with true 16:9 widescreen cropping, object-fit: cover, and gradient lighting." : "Manual mode active — displaying your 3 custom hero image URLs with true 16:9 widescreen cropping, object-fit: cover, and gradient lighting." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${heroImagesMode === "auto" ? "bg-accent/15 text-accent border border-accent/30" : "bg-brand/10 text-brand border border-brand/20"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: heroImagesMode === "auto" ? "Auto Mode (3 Latest Posts)" : "Manual Mode (Custom URLs)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-xl border border-border bg-background p-1 text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setPreviewTab("grid"), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${previewTab === "grid" ? "bg-brand text-white font-semibold shadow-2xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3-Image Grid" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setPreviewTab("simulator"), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${previewTab === "simulator" ? "bg-brand text-white font-semibold shadow-2xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Live Hero Simulator" })
            ] })
          ] })
        ] })
      ] }),
      previewTab === "grid" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: heroSlots.map((slotData, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HeroImageTile, { slot: slotData.slot, label: slotData.label, src: slotData.src, defaultSrc: slotData.defaultSrc, defaultAlt: slotData.defaultAlt, source: slotData.source, caption: slotData.caption, postTitle: slotData.postTitle, onOpen: (idx) => setLightboxIndex(idx), onUploadClick: heroImagesMode === "manual" ? () => heroImageFieldRefs.current[HERO_IMAGE_FIELDS[i].key]?.click() : void 0 }, slotData.slot)) }),
      previewTab === "simulator" && /* @__PURE__ */ jsxRuntimeExports.jsx(LiveHeroSimulator, { slots: heroSlots, draft, onOpenLightbox: (idx) => setLightboxIndex(idx) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-muted/30 p-3.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-medium text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3.5 w-3.5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Click any image to inspect full uncropped resolution in the lightbox." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden h-3 w-px bg-border sm:inline-block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "All previews use ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "16:9 cinematic widescreen aspect ratio" }),
            " with ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "object-fit: cover" }),
            " and ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "object-position: center" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground/80", children: heroImagesMode === "manual" ? "Tip: Image inputs update the preview instantly as you type." : "Tip: Covers change automatically as new posts are published." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "grid gap-6 lg:grid-cols-[1fr_340px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-5 w-5 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hero Banner Settings" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Configure the full-screen intro at the top of the homepage — background mode, titles, and buttons." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
              " Public"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground", children: "Hero Source Post" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("homepage_hero_mode", "auto"), className: `flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${heroMode === "auto" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-background hover:bg-muted"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Auto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Latest published post" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("homepage_hero_mode", "manual"), className: `flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${heroMode === "manual" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-background hover:bg-muted"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Manual" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Pick a specific post" })
                ] })
              ] })
            ] }),
            heroMode === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_post_id", className: "block text-xs font-medium text-foreground", children: "Select Blog Post" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "homepage_hero_post_id", value: draft.homepage_hero_post_id ?? "", onChange: (e) => set("homepage_hero_post_id", e.target.value), className: `w-full rounded-xl border bg-background py-2.5 px-3.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${errors.homepage_hero_post_id ? "border-red-500" : "border-border"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select a post —" }),
                posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
                  p.title,
                  p.featured ? " ★" : ""
                ] }, p.id))
              ] }),
              errors.homepage_hero_post_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: errors.homepage_hero_post_id })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground", children: "Hero Slideshow Images Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${heroImagesMode === "auto" ? "bg-accent/15 text-accent border border-accent/30" : "bg-brand/10 text-brand border border-brand/25"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${heroImagesMode === "auto" ? "bg-accent animate-pulse" : "bg-brand"}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Mode: ",
                  heroImagesMode === "auto" ? "Auto (3 Latest Posts)" : "Manual (Custom URLs)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2.5 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("homepage_hero_images_mode", "auto"), className: `flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${heroImagesMode === "auto" ? "border-accent bg-accent/10 text-accent font-medium shadow-xs" : "border-border bg-background hover:bg-muted"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg ${heroImagesMode === "auto" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Auto Mode" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Cover images from the 3 latest published posts" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("homepage_hero_images_mode", "manual"), className: `flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${heroImagesMode === "manual" ? "border-brand bg-brand/10 text-brand font-medium shadow-xs" : "border-border bg-background hover:bg-muted"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg ${heroImagesMode === "manual" ? "bg-brand/20 text-brand" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Manual Mode" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Configure 3 separate custom image URLs" })
                ] })
              ] })
            ] }),
            heroImagesMode === "auto" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-accent/25 bg-accent/5 p-4 space-y-3 animate-fade-in", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3 Latest Published Posts Selected Automatically" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[11px]", children: "Updates automatically as new posts are published" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-3 text-xs", children: autoPosts.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/80 bg-card p-2.5 space-y-1 shadow-2xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                    "Hero Image ",
                    idx + 1
                  ] }),
                  p.cover_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]", children: "Has cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-600 dark:text-amber-400 font-semibold text-[10px]", children: "Default slide" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium text-foreground text-[11px]", title: p.title, children: p.title })
              ] }, p.id || idx)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Note: Your manually entered image URLs are safely preserved in the background and will be restored if you switch back to Manual mode." })
            ] }),
            heroImagesMode === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
              HERO_IMAGE_FIELDS.map((field) => {
                const value = draft[field.key] ?? "";
                const preview = value.trim() ? resolveMediaUrl(value) : "";
                const isUploading = uploadingImageField === field.key;
                const fieldError = errors[field.key];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-3 rounded-xl border bg-background/50 p-4 shadow-2xs transition-colors ${fieldError ? "border-red-500/80" : "border-border/80"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold text-foreground", children: [
                      field.label,
                      " URL"
                    ] }),
                    preview && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set(field.key, ""), className: "inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition cursor-pointer font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                      " Clear to Default"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/9] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-zinc-950", children: preview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: `${field.label} thumbnail`, className: "h-full w-full object-cover object-center" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setLightboxIndex(field.slot - 1), className: "inline-flex items-center gap-1 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3 w-3 text-accent" }),
                      " Full view"
                    ] }) })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center gap-1.5 p-3 text-center text-xs text-muted-foreground bg-muted/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 opacity-60" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No custom image — default slide shown" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: (el) => {
                      heroImageFieldRefs.current[field.key] = el;
                    }, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
                      const file = e.target.files?.[0];
                      if (file) handleHeroImageUpload(file, field.key);
                    } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: isUploading, onClick: () => heroImageFieldRefs.current[field.key]?.click(), className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3.5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer", children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" })
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 text-accent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value.trim() ? "Replace Image" : "Upload Image" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value, onChange: (e) => set(field.key, e.target.value), placeholder: "…or paste image URL directly (e.g. https://... or /assets/...)", className: `flex-1 min-w-48 rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-1 transition-colors ${fieldError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-accent focus:ring-accent"}` })
                  ] }),
                  fieldError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500 font-medium", children: fieldError })
                ] }, field.key);
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tip: Any empty slot shows a dark hero background on the live site. Add a cover image or URL to show a photo." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_badge", className: "block text-xs font-medium text-foreground", children: "Badge Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_hero_badge", type: "text", value: draft.homepage_hero_badge ?? "", onChange: (e) => set("homepage_hero_badge", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_title", className: "block text-xs font-medium text-foreground", children: "Hero Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_hero_title", type: "text", value: draft.homepage_hero_title ?? "", onChange: (e) => set("homepage_hero_title", e.target.value), className: `w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${errors.homepage_hero_title ? "border-red-500" : "border-border"}` }),
              errors.homepage_hero_title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: errors.homepage_hero_title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_title_highlight", className: "block text-xs font-medium text-foreground", children: "Title Accent Highlight" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_hero_title_highlight", type: "text", value: draft.homepage_hero_title_highlight ?? "", onChange: (e) => set("homepage_hero_title_highlight", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The second phrase of the title, highlighted in orange (#FF7A00)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_description", className: "block text-xs font-medium text-foreground", children: "Description *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "homepage_hero_description", rows: 2, value: draft.homepage_hero_description ?? "", onChange: (e) => set("homepage_hero_description", e.target.value), className: `w-full rounded-xl border bg-background p-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none leading-relaxed ${errors.homepage_hero_description ? "border-red-500" : "border-border"}` }),
              errors.homepage_hero_description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: errors.homepage_hero_description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_button_text", className: "block text-xs font-medium text-foreground", children: "Primary Button Text *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_hero_button_text", type: "text", value: draft.homepage_hero_button_text ?? "", onChange: (e) => set("homepage_hero_button_text", e.target.value), className: `w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${errors.homepage_hero_button_text ? "border-red-500" : "border-border"}` }),
              errors.homepage_hero_button_text && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: errors.homepage_hero_button_text })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_button_link", className: "block text-xs font-medium text-foreground", children: "Primary Button Link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_hero_button_link", type: "text", value: draft.homepage_hero_button_link ?? "", onChange: (e) => set("homepage_hero_button_link", e.target.value), placeholder: "/blog or https://…", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_secondary_button_text", className: "block text-xs font-medium text-foreground", children: "Secondary Button Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_hero_secondary_button_text", type: "text", value: draft.homepage_hero_secondary_button_text ?? "", onChange: (e) => set("homepage_hero_secondary_button_text", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_hero_secondary_button_link", className: "block text-xs font-medium text-foreground", children: "Secondary Button Link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_hero_secondary_button_link", type: "text", value: draft.homepage_hero_secondary_button_link ?? "", onChange: (e) => set("homepage_hero_secondary_button_link", e.target.value), placeholder: "/destinations or https://…", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Journey in Numbers" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "The stats strip (countries, trips, photos, kilometres, days) above the newsletter." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
              " Public"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground", children: "Countries Visited" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("homepage_stat_countries_mode", "auto"), className: `flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${draft.homepage_stat_countries_mode === "manual" ? "border-border bg-background hover:bg-muted" : "border-accent bg-accent/10 text-accent font-medium"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Auto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Computed from post locations" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("homepage_stat_countries_mode", "manual"), className: `flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${draft.homepage_stat_countries_mode === "manual" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-background hover:bg-muted"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Manual" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Enter a fixed number" })
                ] })
              ] })
            ] }),
            draft.homepage_stat_countries_mode === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_stat_countries", className: "block text-xs font-medium text-foreground", children: "Number of Countries" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_stat_countries", type: "number", min: 0, value: draft.homepage_stat_countries ?? "", onChange: (e) => set("homepage_stat_countries", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_stat_trips", className: "block text-xs font-medium text-foreground", children: "Solo Motorcycle Trips" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_stat_trips", type: "number", min: 0, value: draft.homepage_stat_trips ?? "", onChange: (e) => set("homepage_stat_trips", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_stat_kilometres", className: "block text-xs font-medium text-foreground", children: "Kilometres Travelled" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_stat_kilometres", type: "number", min: 0, value: draft.homepage_stat_kilometres ?? "", onChange: (e) => set("homepage_stat_kilometres", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.homepage_stat_kilometres_suffix ?? "", onChange: (e) => set("homepage_stat_kilometres_suffix", e.target.value), placeholder: " km", className: "w-20 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-center outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_stat_photos", className: "block text-xs font-medium text-foreground", children: "Photos Captured" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_stat_photos", type: "number", min: 0, value: draft.homepage_stat_photos ?? "", onChange: (e) => set("homepage_stat_photos", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.homepage_stat_photos_suffix ?? "", onChange: (e) => set("homepage_stat_photos_suffix", e.target.value), placeholder: "K+", className: "w-20 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-center outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_stat_days", className: "block text-xs font-medium text-foreground", children: "Days on the Road" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "homepage_stat_days", type: "number", min: 0, value: draft.homepage_stat_days ?? "", onChange: (e) => set("homepage_stat_days", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-5 w-5 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Featured / Latest Blog Post" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Controls the “Featured Expedition” section shown on the homepage." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
              " Public"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("homepage_featured_mode", "auto"), className: `flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${featuredMode === "auto" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-background hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Auto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Latest featured post" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("homepage_featured_mode", "manual"), className: `flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${featuredMode === "manual" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-background hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Manual" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Pick a specific post" })
              ] })
            ] })
          ] }),
          featuredMode === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "homepage_featured_post_id", className: "block text-xs font-medium text-foreground", children: "Select Blog Post" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "homepage_featured_post_id", value: draft.homepage_featured_post_id ?? "", onChange: (e) => set("homepage_featured_post_id", e.target.value), className: `w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${errors.homepage_featured_post_id ? "border-red-500" : "border-border"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select a post —" }),
              posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
                p.title,
                p.featured ? " ★" : ""
              ] }, p.id))
            ] }),
            errors.homepage_featured_post_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: errors.homepage_featured_post_id })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Active Hero Slide 1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightboxIndex(0), className: "text-[11px] text-accent hover:underline font-semibold cursor-pointer", children: "Inspect" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroSlots[0]?.src || heroSlots[0]?.defaultSrc, alt: "Active hero slide preview", className: "h-full w-full object-cover object-center" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 flex flex-col justify-end p-3 text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-accent", children: draft.homepage_hero_badge || "Solo · Slow · Cinematic" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-display text-xs sm:text-sm font-bold leading-tight mt-0.5 line-clamp-2", children: [
                draft.homepage_hero_title || "Stories from the high places",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FF7A00]", children: draft.homepage_hero_title_highlight || "Most people only fly over." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
            heroMode === "auto" ? "Hero story uses the latest published post automatically." : "Hero story uses the post you selected manually.",
            " ",
            heroImagesMode === "auto" ? "Slideshow images are sourced from the 3 latest published posts." : "Slideshow images use your 3 custom URLs."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold flex items-center gap-2 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Security & Architecture" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Admin Only:" }),
                " Only authenticated admins and editors can save changes — enforced by RLS and server-side role checks."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Instant Live:" }),
                " Reuses the existing site settings table — changes appear on the homepage immediately after saving."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Safe Defaults:" }),
                " Empty images or links automatically fall back to default assets with no broken layouts."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground", children: "CMS Tips" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-xs text-muted-foreground list-disc pl-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Use ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Auto mode" }),
              " for slideshow images to keep the homepage freshly updated as you publish."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "In ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Manual mode" }),
              ", images preview immediately when you paste a valid image URL."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Click any preview image or thumbnail to inspect full high-resolution details in the lightbox." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Click ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reset" }),
              " to discard unsaved edits and restore the last saved state."
            ] })
          ] })
        ] })
      ] })
    ] }),
    lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(HeroLightbox, { index: lightboxIndex, slots: heroSlots, onClose: () => setLightboxIndex(null), onSelectIndex: (idx) => setLightboxIndex(idx) })
  ] });
}
export {
  AdminHomepagePage as component
};
