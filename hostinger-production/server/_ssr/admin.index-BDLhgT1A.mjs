import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as useServerFn } from "./router-CFyxGYDP.mjs";
import { b as adminAnalytics } from "./admin.functions-67-zmleM.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { aa as ChartColumn, f as ArrowRight, l as FileText, ag as Eye, ad as MessageSquare, ae as Users, c as Mail, a6 as Image } from "../_libs/lucide-react.mjs";
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
import "./media-fm7scLsn.mjs";
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
function AdminDashboard() {
  const fn = useServerFn(adminAnalytics);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => await fn()
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Overview of your content and audience." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/analytics", className: "inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground hover:opacity-90 transition shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
        " Live Analytics Dashboard ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: FileText, label: "Posts", value: data?.posts, sub: `${data?.published ?? 0} published`, loading: isLoading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Eye, label: "Total views", value: data?.totalViews, loading: isLoading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: MessageSquare, label: "Comments", value: data?.comments, sub: data?.avgRating ? `★ ${data.avgRating} avg` : void 0, loading: isLoading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/subscribers", className: "block transition hover:opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Users, label: "Subscribers", value: data?.subscribers, sub: "Manage subscribers →", loading: isLoading }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmallStat, { label: "Drafts", value: data?.drafts }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmallStat, { label: "Scheduled", value: data?.scheduled }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmallStat, { label: "Messages", value: data?.messages, icon: Mail }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/gallery", className: "block transition hover:opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-4 hover:border-accent transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3.5 w-3.5 text-accent" }),
          " Photo Gallery"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold text-accent", children: "Manage galleries →" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Most viewed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/posts", className: "text-xs text-accent hover:underline", children: "All posts →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 divide-y divide-border", children: [
        (data?.topPosts ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: {
            slug: p.slug
          }, className: "hover:text-accent line-clamp-1", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
            " ",
            p.views
          ] })
        ] }, p.id)),
        data?.topPosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-sm text-muted-foreground", children: "No published posts yet." })
      ] })
    ] })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value,
  sub,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-bold", children: loading ? "—" : (value ?? 0).toLocaleString() }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: sub })
  ] });
}
function SmallStat({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground inline-flex items-center gap-1.5", children: [
      Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-semibold", children: (value ?? 0).toLocaleString() })
  ] });
}
export {
  AdminDashboard as component
};
