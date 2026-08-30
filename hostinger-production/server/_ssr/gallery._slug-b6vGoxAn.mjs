import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useTranslations, w as Route$n, x as listPhotoArchive } from "./router-DbNDlpj2.mjs";
import { B as BreadcrumbJsonLd, P as PageBreadcrumbs } from "./PageBreadcrumbs-DYaHRPNp.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { Z as ChevronLeft, a5 as Tag, m as MapPin, O as Calendar, N as Camera, b as Sparkles, n as ChevronRight } from "../_libs/lucide-react.mjs";
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
function formatDate(value) {
  if (!value) return null;
  const d = /* @__PURE__ */ new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function PhotoDetailPage() {
  const t = useTranslations();
  const {
    photo,
    prev,
    next
  } = Route$n.useLoaderData();
  const primaryCategory = photo.categories[0] ?? null;
  const {
    data: relatedData
  } = useQuery({
    queryKey: ["photo-archive-related", primaryCategory?.slug ?? "none"],
    queryFn: async () => primaryCategory ? await listPhotoArchive({
      data: {
        category: primaryCategory.slug
      }
    }) : {
      photos: [],
      categories: []
    },
    enabled: Boolean(primaryCategory)
  });
  const related = (relatedData?.photos ?? []).filter((p) => p.id !== photo.id).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbJsonLd, { items: [{
      label: "Gallery",
      href: "/gallery"
    }, {
      label: photo.title || "Photograph"
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery", className: "mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 rtl:rotate-180" }),
      " ",
      t("Back to the archive")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group relative overflow-hidden rounded-3xl border border-border bg-zinc-950 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo.image_url, alt: photo.alt_text || photo.title, className: "h-auto max-h-[82vh] w-full object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "Gallery",
          href: "/gallery"
        }, {
          label: photo.title || "Photograph"
        }] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7", children: [
        photo.categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
            " ",
            t("Categories")
          ] }),
          photo.categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", search: {
            category: cat.slug
          }, className: "rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent transition-colors hover:bg-accent hover:text-white", children: t(cat.name) }, cat.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl", children: t(photo.title) }),
        (photo.location || photo.captured_at || photo.camera) && /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-5 space-y-2.5 border-t border-border/60 pt-5 text-sm", children: [
          photo.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "sr-only", children: t("Location") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground", children: t(photo.location) })
          ] }),
          formatDate(photo.captured_at) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "sr-only", children: t("Date") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground", children: t(formatDate(photo.captured_at)) })
          ] }),
          photo.camera && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "sr-only", children: t("Camera") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-muted-foreground", children: t(photo.camera) })
          ] })
        ] }),
        photo.story && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 border-t border-border/60 pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            " ",
            t("The story behind this frame")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line text-sm leading-relaxed text-foreground/85", children: t(photo.story) })
        ] }),
        (prev || next) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3 border-t border-border/60 pt-5", children: [
          prev ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery/$slug", params: {
            slug: prev.slug
          }, className: "group rounded-2xl border border-border bg-background p-3 transition-colors hover:border-accent/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3 w-3 rtl:rotate-180" }),
              " ",
              t("Previous")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: prev.image_url, alt: prev.title, className: "h-10 w-10 shrink-0 rounded-lg object-cover", loading: "lazy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 text-xs font-medium text-foreground group-hover:text-accent", children: t(prev.title) })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          next ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery/$slug", params: {
            slug: next.slug
          }, className: "group rounded-2xl border border-border bg-background p-3 text-right transition-colors hover:border-accent/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-end gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: [
              t("Next"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 rtl:rotate-180" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 text-xs font-medium text-foreground group-hover:text-accent", children: t(next.title) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: next.image_url, alt: next.title, className: "h-10 w-10 shrink-0 rounded-lg object-cover", loading: "lazy" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
        ] })
      ] }) })
    ] }),
    primaryCategory && related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-accent", children: t("More photographs") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-1 mb-5 font-display text-xl font-bold text-foreground", children: [
        t("In"),
        " ",
        t(primaryCategory.name)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery/$slug", params: {
        slug: p.slug
      }, className: "group relative block overflow-hidden rounded-2xl bg-muted transition-transform duration-300 hover:scale-[1.02] focus:outline-hidden focus:ring-2 focus:ring-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: p.alt_text || p.title, loading: "lazy", className: "aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-transparent to-transparent p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-sm font-semibold text-white", children: t(p.title) }) })
      ] }, p.id)) })
    ] })
  ] }) });
}
export {
  PhotoDetailPage as component
};
