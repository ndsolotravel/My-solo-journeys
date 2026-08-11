import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as Route$b, c as blogQO, u as useTranslator, C as CATEGORIES } from "./router-Pb4k1ggT.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PostCard } from "./PostCard-BAPeSPfi.mjs";
import { a as useLocalizedPosts } from "./useLocalized-cp7Zp1YA.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import { S as Search } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./client-BaX1TKIB.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-7J1GkVFt.mjs";
import "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function BlogIndex() {
  const search = Route$b.useSearch();
  const navigate = Route$b.useNavigate();
  const {
    data
  } = useSuspenseQuery(blogQO({
    category: search.category,
    tag: search.tag,
    search: search.q
  }));
  const posts = useLocalizedPosts(data.posts);
  const [q, setQ] = reactExports.useState(search.q ?? "");
  const t = useTranslator(["The Journal", "Stories from the road, the trail, and the saddle.", "Search stories…", "All", "No stories match that filter yet.", "story", "stories", "published so far."]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[45vh] min-h-[280px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80", alt: "Mountain road at sunrise", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("The Journal") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl", children: t("Stories from the road, the trail, and the saddle.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-xl text-sm text-white/80", children: [
          data.total,
          " ",
          data.total === 1 ? t("story") : t("stories"),
          " ",
          t("published so far.")
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10 max-w-3xl sr-only", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("The Journal") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl", children: t("Stories from the road, the trail, and the saddle.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 flex flex-col gap-4 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        navigate({
          search: (prev) => ({
            ...prev,
            q: q || void 0
          })
        });
      }, className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: t("Search stories…"), className: "w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:border-accent" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", search: {}, className: `rounded-full border px-4 py-1.5 text-xs ${!search.category ? "border-foreground bg-foreground text-background" : "border-border hover:border-accent"}`, children: "All" }),
        CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", search: {
          category: c
        }, className: `rounded-full border px-4 py-1.5 text-xs ${search.category === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-accent"}`, children: t(c) }, c))
      ] }),
      posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-20", children: t("No stories match that filter yet.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: posts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p, index: i }, p.id)) })
    ] })
  ] });
}
export {
  BlogIndex as component
};
