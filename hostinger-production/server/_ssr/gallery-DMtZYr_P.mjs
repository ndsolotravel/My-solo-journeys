import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, a as Route$B, b as archiveQO, h as heroQO$2 } from "./router-DTYunwUp.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PageBreadcrumbs, B as BreadcrumbJsonLd } from "./PageBreadcrumbs-COrF2Ecb.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { o as SlidersHorizontal, p as ImagePlus, m as MapPin } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./admin.functions-OVCuV9an.mjs";
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
import "./media-DUkNwMwq.mjs";
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
import "./client-BaIz-VBI.mjs";
import "./categories.functions-D00H7s-R.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function GalleryPage() {
  const t = useTranslations();
  const search = Route$B.useSearch();
  const navigate = Route$B.useNavigate();
  const {
    data
  } = useSuspenseQuery(archiveQO(search.category));
  const {
    data: hero
  } = useSuspenseQuery(heroQO$2);
  const photos = data.photos;
  const categories = data.categories;
  const activeCategory = search.category;
  const totalShown = photos.length;
  const setCategory = (category) => navigate({
    search: (prev) => ({
      ...prev,
      category: category || void 0
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "banner-hover relative h-[45vh] min-h-[280px] w-full overflow-hidden", children: [
      hero?.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hero.image, alt: "Photographs from the mountains.", className: "absolute inset-0 h-full w-full object-cover object-center" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 h-full w-full bg-zinc-900" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Photography") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl", children: t("The light, the cold, the patience.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "Gallery"
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-sm text-white/80", children: t("A curated archive of photographs from above 4,000 metres.") })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbJsonLd, { items: [{
        label: "Gallery",
        href: "/gallery"
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Browse the archive") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            totalShown.toLocaleString(),
            " ",
            totalShown === 1 ? t("photograph") : t("photographs")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setCategory(void 0), className: `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${!activeCategory ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:border-accent hover:text-accent"}`, children: [
            t("All"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: !activeCategory ? "text-background/60" : "text-muted-foreground", children: photos.length })
          ] }),
          categories.map((cat) => {
            const active = activeCategory === cat.slug;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setCategory(active ? void 0 : cat.slug), className: `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${active ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:border-accent hover:text-accent"}`, children: [
              t(cat.name),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: active ? "text-background/60" : "text-muted-foreground", children: cat.photo_count })
            ] }, cat.id);
          })
        ] })
      ] }),
      photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card p-16 text-center shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 w-fit rounded-2xl bg-brand/10 p-3 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-7 w-7 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: t("No photographs in this category yet") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("Photographs from the archive will appear here once they are curated.") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 gap-4 sm:columns-2 lg:columns-3", children: photos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery/$slug", params: {
        slug: p.slug
      }, className: "group relative mb-4 block w-full overflow-hidden rounded-2xl bg-muted transition-transform duration-300 hover:scale-[1.02] focus:outline-hidden focus:ring-2 focus:ring-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: p.alt_text || p.title, loading: "lazy", className: "aspect-[16/10] sm:aspect-auto w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 flex items-end p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
          p.categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm", children: t(p.categories[0].name) }),
          p.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-sm font-semibold text-white", children: t(p.title) }),
          p.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-1 text-[11px] text-white/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: t(p.location) })
          ] })
        ] }) })
      ] }, p.id)) })
    ] })
  ] });
}
export {
  GalleryPage as component
};
