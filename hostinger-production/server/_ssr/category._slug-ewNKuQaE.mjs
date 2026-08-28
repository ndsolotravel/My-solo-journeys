import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageBreadcrumbs } from "./PageBreadcrumbs-Cdr65Svs.mjs";
import { P as PostCard } from "./PostCard-N_pwtKX9.mjs";
import { u as useTranslations, r as Route$k } from "./router-B1ksNLyj.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a4 as FolderTree, a2 as BookOpen, z as Layers, s as ArrowLeft } from "../_libs/lucide-react.mjs";
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
function CategoryPage() {
  const t = useTranslations();
  const {
    category,
    posts
  } = Route$k.useLoaderData();
  const rawHeroImage = category.image_url || posts[0]?.cover_image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
  const heroImage = resolveMediaUrl(rawHeroImage);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "min-h-screen pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "banner-hover relative h-[48vh] min-h-[360px] w-full overflow-hidden bg-zinc-950", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: category.name, className: "h-full w-full object-cover opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-10 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: t("Stories"),
          href: "/blog"
        }, {
          label: t(category.name)
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderTree, { className: "h-3.5 w-3.5" }),
            t("Category Archive")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-black/60 border border-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md", children: [
            posts.length,
            " ",
            posts.length === 1 ? t("story published") : t("stories published")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl", children: t(category.name) }),
        category.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base", children: t(category.description) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-10 max-w-5xl px-4 sm:px-6", children: [
      posts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
              t("Published Stories in"),
              " ",
              t(category.name)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            t("Showing"),
            " ",
            posts.length,
            " ",
            posts.length === 1 ? t("story") : t("stories")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post, index: i }, post.id)) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border py-20 text-center bg-card/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "mx-auto h-12 w-12 text-muted-foreground/40 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold", children: t("No stories in this category yet") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-md mx-auto", children: t("We haven't published stories in this category yet. Check back soon or explore other topics from the journey.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background hover:opacity-90 transition cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          " ",
          t("Explore All Stories")
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 border-t border-border pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " ",
        t("Back to all stories")
      ] }) })
    ] })
  ] });
}
export {
  CategoryPage as component
};
