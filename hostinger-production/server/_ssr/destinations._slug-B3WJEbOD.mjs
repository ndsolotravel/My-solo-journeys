import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PostCard } from "./PostCard-BvrvpJFO.mjs";
import { v as Route$m, u as useTranslations } from "./router-oW7Y7AUy.mjs";
import { r as resolveMediaUrl } from "./media-DUkNwMwq.mjs";
import { P as PageBreadcrumbs } from "./PageBreadcrumbs-Ca-umX2_.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { G as Globe, m as MapPin, f as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./admin.functions-DiyyO5cG.mjs";
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
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./client-BaIz-VBI.mjs";
function DestinationPage() {
  const {
    destination: d,
    allDestinations
  } = Route$m.useLoaderData();
  const t = useTranslations();
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const posts = d.posts ?? [];
  const guidePosts = reactExports.useMemo(() => posts.filter((p) => ["Travel Tips", "Travel Gear", "Budget Travel", "Pakistan Tourism"].includes(p.category)), [posts]);
  const expeditionPosts = reactExports.useMemo(() => posts.filter((p) => !["Travel Tips", "Travel Gear", "Budget Travel", "Pakistan Tourism"].includes(p.category)), [posts]);
  const displayedPosts = reactExports.useMemo(() => {
    if (activeTab === "guides") return guidePosts;
    if (activeTab === "expeditions") return expeditionPosts;
    return posts;
  }, [activeTab, posts, guidePosts, expeditionPosts]);
  const otherDestinations = reactExports.useMemo(() => (allDestinations ?? []).filter((item) => item.id !== d.id).slice(0, 3), [allDestinations, d.id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "banner-hover relative h-[65vh] min-h-[440px] w-full overflow-hidden", children: [
      d.featured_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(d.featured_image), alt: d.title, className: "h-full w-full object-cover object-center" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 h-full w-full bg-zinc-900" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/85" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 text-white sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "Destinations",
          href: "/destinations"
        }, {
          label: d.title
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
            " ",
            t(d.country)
          ] }),
          d.region && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            " ",
            t(d.region)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl", children: t(d.title) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: t("Country") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-lg font-bold text-foreground", children: t(d.country) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: t("Region") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-lg font-bold text-foreground", children: d.region ? t(d.region) : "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: t("Stories & Guides") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-lg font-bold text-foreground", children: posts.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: t("Expedition Style") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-lg font-bold text-accent", children: t("Solo · Slow") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 py-16 sm:px-6", children: d.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl leading-relaxed text-muted-foreground font-display", children: t(d.description) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-muted/20 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-accent", children: t("Field Notes") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: [
            t("Exploration dispatches from"),
            " ",
            t(d.title)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-full border border-border bg-card p-1 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveTab("all"), className: `rounded-full px-4 py-1.5 font-medium transition-colors ${activeTab === "all" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: [
            t("All"),
            " (",
            posts.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveTab("expeditions"), className: `rounded-full px-4 py-1.5 font-medium transition-colors ${activeTab === "expeditions" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: [
            t("Expeditions"),
            " (",
            expeditionPosts.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveTab("guides"), className: `rounded-full px-4 py-1.5 font-medium transition-colors ${activeTab === "guides" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: [
            t("Travel Guides"),
            " (",
            guidePosts.length,
            ")"
          ] })
        ] })
      ] }),
      displayedPosts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: displayedPosts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p, index: i }, p.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: t("No stories under this category yet.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveTab("all"), className: "mt-4 text-xs font-medium text-accent hover:underline cursor-pointer", children: [
          t("View all stories for"),
          " ",
          d.title
        ] })
      ] })
    ] }) }),
    otherDestinations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Continue exploring") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: t("Other destinations in the atlas") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations", className: "text-sm text-muted-foreground hover:text-foreground", children: [
          t("All destinations"),
          " →"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-3", children: otherDestinations.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations/$slug", params: {
        slug: item.slug
      }, className: "group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border", children: [
        item.featured_image ? (() => {
          const img = resolveMediaUrl(item.featured_image);
          return img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: item.title, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 h-full w-full bg-zinc-900" });
        })() : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-5 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-white/70", children: t(item.country) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-1 font-display text-xl font-semibold group-hover:text-amber-300 transition-colors flex items-center justify-between", children: [
            t(item.title),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" })
          ] })
        ] })
      ] }, item.id)) })
    ] })
  ] });
}
export {
  DestinationPage as component
};
