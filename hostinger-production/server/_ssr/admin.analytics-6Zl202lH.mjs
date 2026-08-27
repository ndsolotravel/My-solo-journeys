import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, L as getAdminAnalyticsDetails } from "./router-D9Nbuboh.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { aa as RefreshCw, aw as Activity, a6 as Users, a8 as Eye, v as Calendar, ax as TrendingUp, G as Globe, k as FileText, J as ArrowUpRight, ay as Laptop, az as Smartphone, aA as Tablet, D as Share2, b as Sparkles, o as CircleCheck, p as Clock } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area } from "../_libs/recharts.mjs";
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
import "./admin.functions-DGJYtjjS.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function AdminAnalyticsPage() {
  const [period, setPeriod] = reactExports.useState("30d");
  const fn = useServerFn(getAdminAnalyticsDetails);
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["admin-analytics-details", period],
    queryFn: async () => await fn({
      data: {
        period
      }
    }),
    refetchInterval: 5e3
    // auto refresh live stats & recent visitors log every 5s
  });
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Live Analytics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })
            ] }),
            "Real-time Active"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Audience statistics, traffic sources, popular pages, and live active session tracking." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-xl border border-border bg-background p-1 text-xs", children: ["7d", "30d", "90d", "all"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setPeriod(p), className: `rounded-lg px-3 py-1.5 font-medium transition-all ${period === p ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground"}`, children: p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : p === "90d" ? "90 Days" : "All Time" }, p)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => void refetch(), disabled: isFetching, className: "inline-flex items-center justify-center rounded-xl border border-border bg-background p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition disabled:opacity-50", title: "Refresh analytics", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 ${isFetching ? "animate-spin" : ""}` }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400", children: "Live Now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 animate-pulse" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-4xl font-extrabold text-foreground", children: isLoading ? "—" : data?.liveNow ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" }),
          "Active within last 5 minutes"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Users, label: "Total Visitors", value: data?.totalVisitors, sub: "Unique session IDs tracked", loading: isLoading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Eye, label: "Total Page Views", value: data?.totalPageViews, sub: "Overall page views recorded", loading: isLoading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Calendar, label: "Today's Visitors", value: data?.todayVisitors, sub: data ? `${data.yesterdayVisitors ?? 0} visitors yesterday` : void 0, loading: isLoading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TrendingUp, label: "Today's Page Views", value: data?.todayPageViews, sub: "Views recorded today", loading: isLoading })
    ] }),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-center text-sm text-destructive", children: [
      "Failed to load analytics data. Please check your database connection or try again.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void refetch(), className: "ml-3 font-semibold underline hover:no-underline", children: "Retry" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-accent" }),
            "Traffic Trends"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Daily breakdown of unique visitors and page views over time." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-foreground font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-accent inline-block" }),
            " Unique Visitors"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-foreground font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-indigo-500 inline-block" }),
            " Page Views"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-[300px] w-full", children: isLoading || !mounted ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-sm text-muted-foreground", children: "Loading chart data..." }) : (data?.trafficOverTime ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-sm text-muted-foreground", children: "No traffic recorded for this period yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: data?.trafficOverTime, margin: {
        top: 10,
        right: 10,
        left: -20,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "visitorsGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#FF7A00", stopOpacity: 0.4 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#FF7A00", stopOpacity: 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "pageViewsGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#6366F1", stopOpacity: 0.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#6366F1", stopOpacity: 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.15, vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tickLine: false, axisLine: false, tick: {
          fontSize: 11
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickLine: false, axisLine: false, tick: {
          fontSize: 11
        }, allowDecimals: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "pageViews", name: "Page Views", stroke: "#6366F1", strokeWidth: 2, fillOpacity: 1, fill: "url(#pageViewsGrad)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "visitors", name: "Unique Visitors", stroke: "#FF7A00", strokeWidth: 2.5, fillOpacity: 1, fill: "url(#visitorsGrad)" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5 text-accent" }),
            "Popular Pages"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Most Visited Paths" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-xs text-muted-foreground", children: "Loading popular pages..." }) : (data?.popularPages ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-xs text-muted-foreground", children: "No page views recorded yet." }) : data?.popularPages.map((page) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground font-semibold truncate max-w-[70%]", children: page.path }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
              page.views.toLocaleString(),
              " views (",
              page.percentage,
              "%)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-accent transition-all duration-500", style: {
            width: `${Math.min(100, Math.max(5, page.percentage))}%`
          } }) })
        ] }, page.path)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-accent" }),
            "Top Blog Posts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/posts", className: "text-xs text-accent hover:underline flex items-center gap-1", children: [
            "Manage Posts ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-xs text-muted-foreground", children: "Loading top blog posts..." }) : (data?.topPosts ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-xs text-muted-foreground", children: "No blog posts available." }) : data?.topPosts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted", children: post.cover_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: {
                slug: post.slug
              }, className: "font-medium text-sm text-foreground hover:text-accent truncate block", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground uppercase tracking-wider", children: post.category })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-foreground bg-muted px-2.5 py-1 rounded-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3 text-muted-foreground" }),
            post.views.toLocaleString()
          ] }) })
        ] }, post.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2 pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Laptop, { className: "h-5 w-5 text-accent" }),
          "Device Breakdown"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceCard, { icon: Laptop, label: "Desktop", percentage: data?.deviceStats.desktop ?? 0, count: data?.deviceStats.counts.desktop ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceCard, { icon: Smartphone, label: "Mobile", percentage: data?.deviceStats.mobile ?? 0, count: data?.deviceStats.counts.mobile ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceCard, { icon: Tablet, label: "Tablet", percentage: data?.deviceStats.tablet ?? 0, count: data?.deviceStats.counts.tablet ?? 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-3 w-full overflow-hidden rounded-full bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-accent transition-all duration-500", style: {
              width: `${data?.deviceStats.desktop ?? 0}%`
            }, title: `Desktop: ${data?.deviceStats.desktop}%` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-indigo-500 transition-all duration-500", style: {
              width: `${data?.deviceStats.mobile ?? 0}%`
            }, title: `Mobile: ${data?.deviceStats.mobile}%` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-500 transition-all duration-500", style: {
              width: `${data?.deviceStats.tablet ?? 0}%`
            }, title: `Tablet: ${data?.deviceStats.tablet}%` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-accent" }),
              " Desktop (",
              data?.deviceStats.desktop,
              "%)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-indigo-500" }),
              " Mobile (",
              data?.deviceStats.mobile,
              "%)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }),
              " Tablet (",
              data?.deviceStats.tablet,
              "%)"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2 pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-5 w-5 text-accent" }),
          "Traffic Sources"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-xs text-muted-foreground", children: "Loading traffic sources..." }) : (data?.trafficSources ?? []).map((src) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: src.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
              src.count.toLocaleString(),
              " visits (",
              src.percentage,
              "%)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-indigo-500 transition-all duration-500", style: {
            width: `${Math.max(3, src.percentage)}%`
          } }) })
        ] }, src.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-accent" }),
          "Recent Visitors Log"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Anonymous active visitor sessions with country geolocation and newsletter subscription status." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold", children: "Visitor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold", children: "Country" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold", children: "Newsletter Subscriber" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold", children: "Device & Environment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold", children: "Entry Page" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold text-right", children: "Last Active" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "py-8 text-center text-muted-foreground", children: "Loading recent visitor sessions..." }) }) : (data?.recentVisitors ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "py-8 text-center text-muted-foreground", children: "No visitor sessions recorded yet." }) }) : data?.recentVisitors.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/50 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 font-mono font-medium text-foreground", children: v.sessionId }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-foreground font-medium flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: v.country }),
            v.countryCode && v.countryCode !== "XX" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground", children: v.countryCode })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: v.isSubscribed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
            " Subscribed"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground", children: "Not Subscribed" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize font-medium text-foreground", children: v.deviceType }),
            " · ",
            v.browser,
            " on ",
            v.os
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 font-mono text-muted-foreground", children: v.entryPage }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-right text-muted-foreground flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            formatRelativeTime(v.lastActiveAt)
          ] })
        ] }, i)) })
      ] }) })
    ] })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-3xl font-bold", children: loading ? "—" : (value ?? 0).toLocaleString() }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: sub })
  ] });
}
function DeviceCard({
  icon: Icon,
  label,
  percentage,
  count
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4 bg-muted/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center text-muted-foreground mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-display text-2xl font-bold", children: [
      percentage,
      "%"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
      count.toLocaleString(),
      " sessions"
    ] })
  ] });
}
function CustomTooltip({
  active,
  payload,
  label
}) {
  if (active && payload && payload.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/95 backdrop-blur p-3 shadow-lg text-xs space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: label }),
      payload.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: {
        color: entry.color
      }, className: "font-medium", children: [
        entry.name,
        ": ",
        entry.value.toLocaleString()
      ] }, entry.name))
    ] });
  }
  return null;
}
function formatRelativeTime(iso) {
  if (!iso) return "Unknown";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
export {
  AdminAnalyticsPage as component
};
