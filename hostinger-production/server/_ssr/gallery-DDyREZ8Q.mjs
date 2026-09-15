import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, a5 as Route$B, a6 as archiveQO, a7 as heroQO$2 } from "./router-CPQnAHT3.mjs";
import { b as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { B as BreadcrumbJsonLd, P as PageBreadcrumbs } from "./PageBreadcrumbs-DaZP2Mu8.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { o as ImagePlus, R as RotateCcw, b as Sparkles, p as Camera, q as ArrowDown, r as Maximize2, s as ArrowLeft, f as ArrowRight, m as MapPin, t as Calendar, E as ExternalLink, D as Download, X, u as ChevronLeft, n as ChevronRight } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./createSsrRpc-BLJWJFkS.mjs";
import "./client-BqBvvzI9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DFv8buKs.mjs";
import "./posts.functions-S458rgU7.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./categories.functions-BG32lH_N.mjs";
import "./topics-T4Y39Ysn.mjs";
import "./media-DKXRUyGU.mjs";
import "./admin.functions-MvZQXaGD.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function GalleryLightbox({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate
}) {
  const photo = photos[currentIndex];
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % photos.length);
      }
    },
    [isOpen, onClose, photos.length, currentIndex, onNavigate]
  );
  reactExports.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);
  if (!isOpen || !photo) return null;
  const formatDate = (value) => {
    if (!value) return null;
    const d = /* @__PURE__ */ new Date(`${value}T00:00:00`);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };
  const handleImageLoad = () => {
  };
  const handleImageError = () => {
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-6 backdrop-blur-md animate-fade-in",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Photo lightbox",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative max-h-[92vh] max-w-[95vw] w-full flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 bg-black/60 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-lg bg-brand/20 border border-brand/30 px-2.5 py-1 text-xs font-bold text-white", children: [
                  currentIndex + 1,
                  " / ",
                  photos.length
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm font-semibold text-white/90 truncate max-w-md", children: photo.title || "Untitled" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      const link = document.createElement("a");
                      link.href = photo.image_url;
                      link.download = photo.title ?? "photograph.jpg";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    },
                    className: "inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer",
                    title: "Download image",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Download" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onClose();
                    },
                    className: "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer",
                    "aria-label": "Close lightbox",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 flex items-center justify-center bg-zinc-950 p-4 sm:p-6 min-h-[40vh] max-h-[72vh] overflow-hidden", children: [
              photos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    onNavigate((currentIndex - 1 + photos.length) % photos.length);
                  },
                  "aria-label": "Previous photo",
                  className: "absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: photo.image_url,
                  alt: photo.alt_text || photo.title || `Photo ${currentIndex + 1}`,
                  className: "max-h-[68vh] max-w-full rounded-lg object-contain shadow-2xl mx-auto",
                  onLoad: handleImageLoad,
                  onError: handleImageError
                }
              ),
              photos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    onNavigate((currentIndex + 1) % photos.length);
                  },
                  "aria-label": "Next photo",
                  className: "absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 px-5 py-3 bg-black/60 text-xs text-white/70 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 truncate max-w-md", children: [
                photo.categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm", children: photo.categories[0].name }),
                photo.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-white/80", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline line-clamp-1", children: photo.location })
                ] }),
                formatDate(photo.captured_at ?? null) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-white/70", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(photo.captured_at) })
                ] }),
                photo.camera && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-white/70", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: photo.camera })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 text-[11px] text-white/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Use ← / → keys to navigate, Esc to close" }) })
            ] })
          ]
        }
      )
    }
  );
}
function CinematicGalleryCarousel({
  photos,
  currentIndex,
  onChangeIndex,
  onOpenLightbox
}) {
  const t = useTranslations();
  const [touchStartX, setTouchStartX] = reactExports.useState(null);
  const [touchDeltaX, setTouchDeltaX] = reactExports.useState(0);
  const total = photos.length;
  const activePhoto = photos[currentIndex];
  const goToPrev = reactExports.useCallback(() => {
    if (total <= 1) return;
    onChangeIndex((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onChangeIndex]);
  const goToNext = reactExports.useCallback(() => {
    if (total <= 1) return;
    onChangeIndex((currentIndex + 1) % total);
  }, [currentIndex, total, onChangeIndex]);
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };
  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX < -40) {
        goToNext();
      } else if (touchDeltaX > 40) {
        goToPrev();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);
  const slideStates = reactExports.useMemo(() => {
    if (total === 0) return [];
    return photos.map((photo, index) => {
      const rawDiff = index - currentIndex;
      let diff = rawDiff;
      if (total > 2) {
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
      }
      return {
        photo,
        index,
        diff,
        isCenter: diff === 0,
        isImmediateLeft: diff === -1,
        isImmediateRight: diff === 1,
        isFarLeft: diff === -2,
        isFarRight: diff === 2,
        isVisible: Math.abs(diff) <= 2
      };
    });
  }, [photos, currentIndex, total]);
  if (total === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[1720px] mx-auto select-none px-2 sm:px-4 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative w-full overflow-hidden flex items-center justify-center py-6 sm:py-8 h-[460px] sm:h-[540px] md:h-[600px] lg:h-[650px] xl:h-[700px]",
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: slideStates.map(
          ({
            photo,
            index,
            diff,
            isCenter,
            isImmediateLeft,
            isImmediateRight,
            isFarLeft,
            isFarRight,
            isVisible
          }) => {
            let offsetPercent = 0;
            let scale = 1;
            let opacity = 1;
            let brightness = 1;
            let zIndex = 30;
            let pointerEvents = "auto";
            if (isCenter) {
              offsetPercent = 0;
              scale = 1.05;
              opacity = 1;
              brightness = 1;
              zIndex = 30;
            } else if (isImmediateLeft) {
              offsetPercent = -62;
              scale = 0.88;
              opacity = 0.8;
              brightness = 0.88;
              zIndex = 20;
            } else if (isImmediateRight) {
              offsetPercent = 62;
              scale = 0.88;
              opacity = 0.8;
              brightness = 0.88;
              zIndex = 20;
            } else if (isFarLeft) {
              offsetPercent = -118;
              scale = 0.76;
              opacity = 0.45;
              brightness = 0.72;
              zIndex = 10;
            } else if (isFarRight) {
              offsetPercent = 118;
              scale = 0.76;
              opacity = 0.45;
              brightness = 0.72;
              zIndex = 10;
            } else {
              offsetPercent = diff > 0 ? 160 : -160;
              scale = 0.65;
              opacity = 0;
              brightness = 0.5;
              zIndex = 5;
              pointerEvents = "none";
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                onClick: () => {
                  if (isCenter) {
                    onOpenLightbox(index);
                  } else if (isVisible) {
                    onChangeIndex(index);
                  }
                },
                style: {
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${offsetPercent}%), -50%) scale(${scale})`,
                  opacity,
                  filter: `brightness(${brightness})`,
                  zIndex,
                  pointerEvents
                },
                className: `absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group ${isCenter ? "cursor-zoom-in" : "cursor-pointer hover:opacity-95 hover:filter hover:brightness-95"}
                /* Elegant portrait aspect card dimensions matching reference screenshot */
                w-[74vw] max-w-[300px] h-[400px]
                sm:w-[46vw] sm:max-w-[360px] sm:h-[470px]
                md:w-[36vw] md:max-w-[400px] md:h-[530px]
                lg:w-[30vw] lg:max-w-[440px] lg:h-[580px]
                xl:w-[26vw] xl:max-w-[480px] xl:h-[630px]
                2xl:w-[24vw] 2xl:max-w-[510px] 2xl:h-[660px]
                `,
                "aria-label": isCenter ? `Featured image: ${photo.title}` : `Select photograph: ${photo.title}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `relative w-full h-full rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden bg-zinc-950 border transition-all duration-300 ${isCenter ? "border-white/20 dark:border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/5" : "border-border/40 shadow-xl"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: photo.image_url,
                          alt: photo.alt_text || photo.title,
                          loading: isCenter ? "eager" : "lazy",
                          draggable: false,
                          className: "w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.02]"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" }),
                      isCenter && photo.categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 text-white/95 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-md", children: t(photo.categories[0].name) }) }),
                      isCenter && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: (e) => {
                            e.stopPropagation();
                            onOpenLightbox(index);
                          },
                          className: "absolute top-4 right-4 z-10 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95",
                          title: t("View fullscreen high-res"),
                          "aria-label": t("View fullscreen high-res"),
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" })
                        }
                      )
                    ]
                  }
                )
              },
              photo.id || index
            );
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 sm:mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: goToPrev,
          disabled: total <= 1,
          className: "h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-border/80 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground shadow-xs transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand disabled:opacity-30 disabled:cursor-not-allowed",
          "aria-label": t("Previous photograph"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 transition-transform group-hover:-translate-x-0.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: goToNext,
          disabled: total <= 1,
          className: "h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-border/80 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground shadow-xs transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand disabled:opacity-30 disabled:cursor-not-allowed",
          "aria-label": t("Next photograph"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
        }
      )
    ] }),
    activePhoto && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 sm:mt-8 max-w-2xl mx-auto px-4 text-center transition-all duration-500 animate-fade-in", children: [
      activePhoto.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand tracking-wide mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(activePhoto.location) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg sm:text-xl md:text-2xl font-semibold text-foreground leading-snug tracking-tight", children: t(activePhoto.title) }),
      activePhoto.story && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed italic max-w-lg mx-auto", children: t(activePhoto.story) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-muted-foreground", children: [
        activePhoto.captured_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md border border-border/40 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activePhoto.captured_at })
        ] }),
        activePhoto.camera && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md border border-border/40 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activePhoto.camera })
        ] }),
        activePhoto.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/gallery/$slug",
            params: { slug: activePhoto.slug },
            className: "inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("View full story") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function GalleryHero({ config, photoCount }) {
  const t = useTranslations();
  const image = config?.image || "";
  const badge = config?.badge || "Visual Archive · High Frontiers";
  const title = config?.title || "Moments Frozen in the Wild";
  const titleHighlight = config?.titleHighlight || "High passes, silent valleys, raw frontiers.";
  const description = config?.description || "An intimate visual log of solo expeditions across Pakistan, the Karakoram, and high-altitude Himalayan trails.";
  const buttonText = config?.buttonText || "Browse Photographs";
  const overlayMode = (config?.overlay || "cinematic").toLowerCase().trim();
  const scrollToContent = () => {
    const el = document.getElementById("gallery-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const renderOverlay = () => {
    switch (overlayMode) {
      case "dark":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40" })
        ] });
      case "medium":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/75" });
      case "subtle":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/50" });
      case "cinematic":
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" })
        ] });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      "aria-label": t("Gallery Hero Banner"),
      className: "relative min-h-[220px] sm:min-h-[250px] md:min-h-[270px] lg:min-h-[300px] w-full overflow-hidden flex flex-col justify-center",
      children: [
        image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: image,
            alt: title,
            loading: "eager",
            fetchPriority: "high",
            decoding: "async",
            className: "absolute inset-0 h-full w-full object-cover object-center animate-ken-burns scale-105 transition-transform duration-1000"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" }),
        renderOverlay(),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 15 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "flex items-center gap-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md shadow-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#FF7A00]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(badge) })
                ] }),
                typeof photoCount === "number" && photoCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1.5 text-xs text-white/70", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3.5 w-3.5 text-white/60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    photoCount,
                    " ",
                    t("photographs")
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.1 },
              className: "mt-2 sm:mt-2.5 max-w-4xl font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight sm:leading-[1.15] text-white tracking-tight break-words [overflow-wrap:anywhere]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: t(title) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[#FF7A00] mt-0.5 sm:mt-1 font-bold", children: t(titleHighlight) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "mt-1.5 sm:mt-2 max-w-2xl text-xs sm:text-sm lg:text-base text-white/85 leading-relaxed",
              children: t(description)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.3 },
              className: "mt-3 sm:mt-4 flex flex-wrap items-center gap-3",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: scrollToContent,
                  className: "group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7A00] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#FF7A00]/90 transition-all duration-200 shadow-md shadow-[#FF7A00]/25 cursor-pointer hover:gap-2.5 active:scale-[0.98]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(buttonText) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-y-0.5" })
                  ]
                }
              )
            }
          )
        ] }) })
      ]
    }
  );
}
function GalleryPage() {
  const t = useTranslations();
  const search = Route$B.useSearch();
  const navigate = Route$B.useNavigate();
  const {
    data
  } = useSuspenseQuery(archiveQO(search.category));
  const {
    data: heroConfig
  } = useSuspenseQuery(heroQO$2);
  const photos = data.photos;
  const categories = data.categories;
  const activeCategory = search.category;
  const [carouselIndex, setCarouselIndex] = reactExports.useState(0);
  const [lightboxOpen, setLightboxOpen] = reactExports.useState(false);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);
  reactExports.useEffect(() => {
    if (photos.length > 0 && carouselIndex >= photos.length) {
      setCarouselIndex(0);
    }
  }, [photos.length, carouselIndex]);
  const setCategory = (category) => navigate({
    search: (prev) => ({
      ...prev,
      category: category || void 0
    })
  });
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  const navigateLightbox = (index) => {
    setLightboxIndex(index);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground pb-20 sm:pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbJsonLd, { items: [{
      label: "Gallery",
      href: "/gallery"
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryHero, { config: heroConfig, photoCount: photos.length }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "gallery-content", className: "mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
      label: "Gallery"
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto max-w-3xl px-4 pt-3 pb-1 sm:pt-4 sm:pb-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase mb-1 select-none", children: t("GALLERY") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight", children: t("My Visual Diary") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto", children: [
        t("See the world through my lens:"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: t("adventures in photographs and high-altitude journeys") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 sm:mt-5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-2 px-2 max-w-full sm:flex-wrap sm:justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCategory(void 0), className: `inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${!activeCategory ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20 scale-[1.02]" : "bg-card text-foreground/80 hover:bg-muted/50 hover:text-foreground border border-border/80"}`, children: t("All") }),
        categories.map((cat) => {
          const active = activeCategory === cat.slug;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCategory(active ? void 0 : cat.slug), className: `inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${active ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20 scale-[1.02]" : "bg-card text-foreground/80 hover:bg-muted/50 hover:text-foreground border border-border/80"}`, children: t(cat.name) }, cat.id);
        })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mt-2 sm:mt-4", children: photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-xl px-4 py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card p-12 sm:p-16 shadow-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 w-fit rounded-2xl bg-brand/10 p-3.5 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-8 w-8 text-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: t("No photographs in this category yet") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: t("Photographs from this collection will appear once curated from the field.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setCategory(void 0), className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("View all photographs") })
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CinematicGalleryCarousel, { photos, currentIndex: carouselIndex, onChangeIndex: setCarouselIndex, onOpenLightbox: openLightbox }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryLightbox, { isOpen: lightboxOpen, onClose: closeLightbox, photos, currentIndex: lightboxIndex, onNavigate: navigateLightbox })
  ] });
}
export {
  GalleryPage as component
};
