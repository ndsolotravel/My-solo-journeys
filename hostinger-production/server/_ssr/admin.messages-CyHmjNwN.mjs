import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as useServerFn } from "./router-CFyxGYDP.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as adminListMessages, h as adminUpdateMessageStatus, i as adminDeleteMessage } from "./admin.functions-67-zmleM.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { S as Search, c as Mail, an as Trash2 } from "../_libs/lucide-react.mjs";
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
const STATUS_LABEL = {
  new: "New",
  read: "Read",
  replied: "Replied"
};
const STATUS_CLASS = {
  new: "bg-accent/15 text-accent",
  read: "bg-muted text-foreground",
  replied: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
};
function AdminMessages() {
  const listFn = useServerFn(adminListMessages);
  const updFn = useServerFn(adminUpdateMessageStatus);
  const delFn = useServerFn(adminDeleteMessage);
  const qc = useQueryClient();
  const [filter, setFilter] = reactExports.useState("all");
  const [q, setQ] = reactExports.useState("");
  const [openId, setOpenId] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => await listFn()
  });
  const upd = useMutation({
    mutationFn: (v) => updFn({
      data: v
    }),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["admin-messages"]
    }),
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-messages"]
      });
      toast.success("Deleted");
    },
    onError: (e) => toast.error(e.message)
  });
  const filtered = reactExports.useMemo(() => {
    const rows = data ?? [];
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!term) return true;
      return r.name?.toLowerCase().includes(term) || r.email?.toLowerCase().includes(term) || (r.subject ?? "").toLowerCase().includes(term) || r.message?.toLowerCase().includes(term);
    });
  }, [data, q, filter]);
  const counts = reactExports.useMemo(() => {
    const rows = data ?? [];
    return {
      all: rows.length,
      new: rows.filter((r) => r.status === "new").length,
      read: rows.filter((r) => r.status === "read").length,
      replied: rows.filter((r) => r.status === "replied").length
    };
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Messages" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Contact-form submissions. Mark messages as read or replied once handled." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-2", children: [
      ["all", "new", "read", "replied"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(s), className: `rounded-full px-3 py-1.5 text-xs font-medium transition ${filter === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/70"}`, children: [
        s === "all" ? "All" : STATUS_LABEL[s],
        " (",
        counts[s],
        ")"
      ] }, s)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search…", className: "w-40 bg-transparent text-xs outline-none placeholder:text-muted-foreground" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading…" }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground", children: "No messages." }),
      filtered.map((m) => {
        const isOpen = openId === m.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "flex w-full items-start justify-between gap-3 text-left", onClick: () => {
            setOpenId(isOpen ? null : m.id);
            if (!isOpen && m.status === "new") {
              upd.mutate({
                id: m.id,
                status: "read"
              });
            }
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: m.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_CLASS[m.status] ?? STATUS_CLASS.new}`, children: STATUS_LABEL[m.status] ?? m.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: [
              m.email,
              " · ",
              new Date(m.created_at).toLocaleString()
            ] }),
            m.subject && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-sm font-medium", children: m.subject }),
            !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-1 text-sm text-muted-foreground", children: m.message })
          ] }) }),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-sm", children: m.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "your message to ndsolotravel"))}`, onClick: () => upd.mutate({
                id: m.id,
                status: "replied"
              }), className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
                " Reply by email"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: m.status, onChange: (e) => upd.mutate({
                id: m.id,
                status: e.target.value
              }), className: "rounded-full border border-border bg-background px-3 py-1.5 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "New" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "read", children: "Read" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "replied", children: "Replied" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                if (confirm("Delete this message?")) del.mutate(m.id);
              }, className: "ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                " Delete"
              ] })
            ] })
          ] })
        ] }, m.id);
      })
    ] })
  ] });
}
export {
  AdminMessages as component
};
