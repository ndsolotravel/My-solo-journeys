import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, o as adminListSubscribers, p as adminUpdateSubscriberStatus, r as adminDeleteSubscriber } from "./router-BLkQFpW7.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a6 as Users, a9 as Download, aa as RefreshCw, ab as UserCheck, v as Calendar, ac as UserX, S as Search, ad as ArrowUpDown, o as CircleCheck, ae as CircleX, af as Trash2 } from "../_libs/lucide-react.mjs";
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
function AdminSubscribersPage() {
  const listFn = useServerFn(adminListSubscribers);
  const updFn = useServerFn(adminUpdateSubscriberStatus);
  const delFn = useServerFn(adminDeleteSubscriber);
  const qc = useQueryClient();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sortOrder, setSortOrder] = reactExports.useState("newest");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["admin-subscribers"],
    queryFn: async () => await listFn(),
    refetchInterval: 15e3
  });
  const updMutation = useMutation({
    mutationFn: (v) => updFn({
      data: v
    }),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: ["admin-subscribers"]
      });
      toast.success(variables.status === "unsubscribed" ? "Subscriber unsubscribed" : "Subscriber marked active");
    },
    onError: (err) => toast.error(err.message || "Failed to update subscriber")
  });
  const delMutation = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-subscribers"]
      });
      toast.success("Subscriber removed");
    },
    onError: (err) => toast.error(err.message || "Failed to delete subscriber")
  });
  const stats = reactExports.useMemo(() => {
    const rows = data ?? [];
    const now = /* @__PURE__ */ new Date();
    const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getTime();
    const active = rows.filter((r) => r.status === "active").length;
    const unsubscribed = rows.filter((r) => r.status === "unsubscribed").length;
    const today = rows.filter((r) => new Date(r.subscribed_at).getTime() >= todayStart).length;
    return {
      total: rows.length,
      active,
      unsubscribed,
      today
    };
  }, [data]);
  const filteredSubscribers = reactExports.useMemo(() => {
    let rows = [...data ?? []];
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      rows = rows.filter((r) => r.email.toLowerCase().includes(q));
    }
    if (statusFilter !== "all") {
      rows = rows.filter((r) => r.status === statusFilter);
    }
    rows.sort((a, b) => {
      const timeA = new Date(a.subscribed_at).getTime();
      const timeB = new Date(b.subscribed_at).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
    return rows;
  }, [data, searchQuery, statusFilter, sortOrder]);
  function exportCSV() {
    if (!filteredSubscribers.length) {
      toast.error("No subscribers to export");
      return;
    }
    const headers = ["ID", "Email", "Status", "Subscribed At (UTC)"];
    const csvRows = [headers.join(","), ...filteredSubscribers.map((s) => [`"${s.id}"`, `"${s.email}"`, `"${s.status}"`, `"${new Date(s.subscribed_at).toISOString()}"`].join(","))];
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ndsolo_subscribers_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredSubscribers.length} subscribers`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Newsletter Subscribers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent border border-accent/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
            stats.active,
            " Active"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Manage your newsletter audience, inspect subscription records, and search subscriber emails." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: exportCSV, disabled: !filteredSubscribers.length, className: "inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90 transition disabled:opacity-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Export CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => void refetch(), disabled: isFetching, className: "inline-flex items-center justify-center rounded-xl border border-border bg-background p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition disabled:opacity-50", title: "Refresh subscriber list", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 ${isFetching ? "animate-spin" : ""}` }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400", children: "Active Subscribers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-4xl font-extrabold text-foreground", children: isLoading ? "—" : stats.active }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Ready for next dispatch" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Total Registered" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-3xl font-bold", children: isLoading ? "—" : stats.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "All subscriber records" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Subscribed Today" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-3xl font-bold", children: isLoading ? "—" : stats.today }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Joined in last 24 hours" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Unsubscribed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-3xl font-bold", children: isLoading ? "—" : stats.unsubscribed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Opted out" })
      ] })
    ] }),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-center text-sm text-destructive", children: [
      "Failed to load subscribers. Please try again.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void refetch(), className: "ml-3 font-semibold underline hover:no-underline", children: "Retry" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2", children: ["all", "active", "unsubscribed"].map((st) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setStatusFilter(st), className: `rounded-full px-3.5 py-1.5 text-xs font-medium transition ${statusFilter === st ? "bg-foreground text-background shadow-xs" : "bg-muted text-muted-foreground hover:bg-muted/70"}`, children: [
        st === "all" ? "All Subscribers" : st === "active" ? "Active" : "Unsubscribed",
        " (",
        st === "all" ? stats.total : st === "active" ? stats.active : stats.unsubscribed,
        ")"
      ] }, st)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search email…", className: "w-44 bg-transparent outline-none placeholder:text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sortOrder, onChange: (e) => setSortOrder(e.target.value), className: "bg-transparent outline-none text-foreground font-medium cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "newest", children: "Newest First" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "oldest", children: "Oldest First" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-background p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold", children: "Subscriber Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold", children: "Subscription Date & Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-semibold text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "py-12 text-center text-muted-foreground", children: "Loading subscriber records…" }) }) : filteredSubscribers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "py-12 text-center text-muted-foreground", children: searchQuery ? "No subscribers match your search query." : "No newsletter subscribers found." }) }) : filteredSubscribers.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 font-medium text-foreground text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${sub.email}`, className: "hover:text-accent font-mono", children: sub.email }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 text-muted-foreground", children: new Date(sub.subscribed_at).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5", children: sub.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
          " Active"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
          " Unsubscribed"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          sub.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updMutation.mutate({
            id: sub.id,
            status: "unsubscribed"
          }), disabled: updMutation.isPending, className: "rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition disabled:opacity-50", title: "Unsubscribe reader", children: "Unsubscribe" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updMutation.mutate({
            id: sub.id,
            status: "active"
          }), disabled: updMutation.isPending, className: "rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-emerald-600 hover:bg-emerald-500/10 transition disabled:opacity-50", title: "Re-activate subscription", children: "Re-activate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            if (confirm(`Remove subscriber <${sub.email}> permanently?`)) {
              delMutation.mutate(sub.id);
            }
          }, disabled: delMutation.isPending, className: "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition disabled:opacity-50", title: "Delete subscriber record", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] }) })
      ] }, sub.id)) })
    ] }) }) })
  ] });
}
export {
  AdminSubscribersPage as component
};
