import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, r as destQO$1 } from "./router-50q_1crC.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { s as Map, u as LayoutGrid } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./admin.functions-DwpNeojB.mjs";
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
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./client-BqBvvzI9.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function AdSlot({ label = "Advertisement", className = "", heightClass = "h-24" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": true,
      className: `relative w-full ${heightClass} overflow-hidden rounded-md border border-dashed border-border/70 bg-muted/30 ${className}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70", children: label }) })
    }
  );
}
const DestinationsMap = reactExports.lazy(() => import("./DestinationsMap-nAB09Txi.mjs").then((m) => ({
  default: m.DestinationsMap
})));
function DestinationsPage() {
  const t = useTranslations();
  const {
    data: destinationsData
  } = useSuspenseQuery(destQO$1);
  const destinations = destinationsData;
  const [view, setView] = reactExports.useState("grid");
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash === "interactive-map" || hash === "map") {
      setView("map");
      requestAnimationFrame(() => {
        document.getElementById("interactive-map")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[45vh] min-h-[280px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80", alt: "Mountain peaks at golden hour", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Destinations") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl", children: t("Where the road runs out.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-sm text-white/80", children: t("Honest country guides, trekking routes and the maps I wish I'd had before I left.") })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { className: "mt-2", label: t("Sponsored"), heightClass: "h-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "interactive-map", "aria-labelledby": "explore-heading", className: "mt-12 scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Explore") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "explore-heading", className: "mt-2 font-display text-3xl font-bold sm:text-4xl", children: t("Explore the Journey") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm text-muted-foreground", children: t("Discover visited destinations, motorcycle routes and stories from the road.") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "tablist", "aria-label": t("View destinations as map or grid"), className: "inline-flex w-fit items-center rounded-full border border-border bg-background p-1 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { role: "tab", "aria-selected": view === "map", onClick: () => setView("map"), className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${view === "map" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-3.5 w-3.5" }),
              " ",
              t("Map View")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { role: "tab", "aria-selected": view === "grid", onClick: () => setView("grid"), className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${view === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
              " ",
              t("Grid View")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: view === "map" ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[480px] w-full animate-pulse rounded-2xl border border-border bg-muted/30" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full overflow-hidden rounded-2xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationsMap, { destinations }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: destinations.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.5,
          delay: i * 0.05
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations/$slug", params: {
          slug: d.slug
        }, className: "group block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] sm:aspect-[4/5] overflow-hidden rounded-3xl bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.featured_image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80", alt: d.title, loading: "lazy", className: "h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-6 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-wider text-white/70", children: [
              t(d.country),
              d.region ? ` · ${t(d.region)}` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-2xl font-semibold", children: t(d.title) }),
            d.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-2 text-sm text-white/80", children: t(d.description) })
          ] })
        ] }) }) }, d.id)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { className: "mt-12", label: t("Advertisement"), heightClass: "h-28 sm:h-32" })
    ] })
  ] });
}
export {
  DestinationsPage as component
};
