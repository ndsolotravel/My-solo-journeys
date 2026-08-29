import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, q as qo$1 } from "./router-DZuDuyqb.mjs";
import { b as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PageBreadcrumbs } from "./PageBreadcrumbs-nt-tvWpB.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { X, o as ChevronLeft, n as ChevronRight } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./admin.functions-67-zmleM.mjs";
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./media-fm7scLsn.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./client-BaIz-VBI.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const pageTurnVariants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 70 : -70,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: (direction) => ({
    rotateY: direction > 0 ? -70 : 70,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0]
    }
  })
};
function GalleryPage() {
  const t = useTranslations();
  const {
    data: rawItems
  } = useSuspenseQuery(qo$1);
  const items = rawItems;
  const [[activeIndex, direction], setActiveState] = reactExports.useState([null, 0]);
  const active = activeIndex !== null ? items[activeIndex] : null;
  const handlePrev = () => {
    if (activeIndex === null || items.length === 0) return;
    setActiveState(([curr]) => curr === null ? [null, 0] : [(curr - 1 + items.length) % items.length, -1]);
  };
  const handleNext = () => {
    if (activeIndex === null || items.length === 0) return;
    setActiveState(([curr]) => curr === null ? [null, 0] : [(curr + 1) % items.length, 1]);
  };
  reactExports.useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setActiveState([null, 0]);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, items.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "banner-hover relative h-[45vh] min-h-[280px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2000&q=80", alt: "Yosemite valley golden hour", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Photography") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl", children: t("The light, the cold, the patience.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "Gallery"
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-sm text-white/80", children: t("A thousand sunrises above 4,000 metres.") })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-3xl sr-only", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Photography") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl", children: t("The light, the cold, the patience.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: t("A thousand sunrises above 4,000 metres.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3", children: items.map((g, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveState([idx, 0]), className: "group relative mb-4 block w-full overflow-hidden rounded-2xl bg-muted transition-transform duration-300 hover:scale-[1.02] focus:outline-hidden focus:ring-2 focus:ring-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: g.image_url, alt: g.caption ?? "", loading: "lazy", className: "aspect-[16/10] sm:aspect-auto w-full object-cover object-center transition-transform duration-700 hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4", children: g.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white line-clamp-1", children: t(g.caption) }) })
      ] }, g.id)) }),
      active && activeIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setActiveState([null, 0]), className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-md transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-4 sm:left-6 sm:top-6 z-[102]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-black/75 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg", children: [
          activeIndex + 1,
          " / ",
          items.length
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": t("Close"), onClick: (e) => {
          e.stopPropagation();
          setActiveState([null, 0]);
        }, className: "absolute right-4 top-4 sm:right-6 sm:top-6 z-[102] flex h-11 w-11 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md hover:bg-black/95 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40 [perspective:1200px]", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, custom: direction, mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: active.image_url, alt: active.caption ?? "", custom: direction, variants: pageTurnVariants, initial: "enter", animate: "center", exit: "exit", className: "max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] rounded-2xl object-contain select-none shadow-2xl", style: {
            backfaceVisibility: "hidden"
          } }, active.id || activeIndex) }),
          items.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": t("Previous photo"), onClick: (e) => {
            e.stopPropagation();
            handlePrev();
          }, className: "absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white border-2 border-white/40 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-md rtl:rotate-180" }) }),
          items.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": t("Next photo"), onClick: (e) => {
            e.stopPropagation();
            handleNext();
          }, className: "absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white border-2 border-white/40 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-md rtl:rotate-180" }) })
        ] }),
        active.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[102] max-w-lg w-[90vw] text-center pointer-events-none", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "inline-block rounded-2xl bg-black/80 px-5 py-2.5 text-xs sm:text-sm font-medium text-white border border-white/20 backdrop-blur-md shadow-xl", children: t(active.caption) }) })
      ] })
    ] })
  ] });
}
export {
  GalleryPage as component
};
