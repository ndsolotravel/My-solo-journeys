import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useServerFn, L as adminListMessages, M as adminGetMessage, N as adminUpdateMessageStatus, O as adminDeleteMessage, P as adminReplyToMessage } from "./router-B5b4WQf1.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { u as ChevronLeft, U as User, c as Mail, aE as TriangleAlert, aF as Reply, h as LoaderCircle, J as Send, aG as CheckCheck, aH as Archive, au as Inbox, aw as Trash2, v as CircleCheck, G as Globe, aA as ShieldCheck, S as Search, at as ArrowUpDown, n as ChevronRight, w as Clock } from "../_libs/lucide-react.mjs";
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
import "./createSsrRpc-BLJWJFkS.mjs";
import "./client-BqBvvzI9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DFv8buKs.mjs";
import "./posts.functions-BpiszHs6.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./categories.functions-BG32lH_N.mjs";
import "./topics-T4Y39Ysn.mjs";
import "./media-DKXRUyGU.mjs";
import "./admin.functions-DqDOVcL1.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const STATUS_LABEL = {
  new: "New",
  read: "Read",
  replied: "Replied",
  archived: "Archived"
};
const STATUS_CLASS = {
  new: "bg-accent/15 text-accent",
  read: "bg-muted text-foreground",
  replied: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  archived: "bg-slate-500/15 text-slate-600 dark:text-slate-400"
};
function DeliveryBadge({
  status
}) {
  const s = status || "pending";
  if (s === "sent") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3 w-3" }),
      " Email sent"
    ] });
  }
  if (s === "failed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
      " Email failed"
    ] });
  }
  if (s === "pending") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
      " Pending"
    ] });
  }
  return null;
}
function SpamBadge({
  status,
  score
}) {
  const s = status || "clean";
  if (s !== "spam" && s !== "suspected") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s === "spam" ? "bg-red-500/15 text-red-600 dark:text-red-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"}`, title: `Spam score: ${score}/100`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }),
    " ",
    s
  ] });
}
const PAGE_SIZE = 25;
function AdminMessages() {
  const listFn = useServerFn(adminListMessages);
  const getFn = useServerFn(adminGetMessage);
  const updFn = useServerFn(adminUpdateMessageStatus);
  const delFn = useServerFn(adminDeleteMessage);
  const replyFn = useServerFn(adminReplyToMessage);
  const qc = useQueryClient();
  const [filter, setFilter] = reactExports.useState("all");
  const [q, setQ] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("newest");
  const [page, setPage] = reactExports.useState(1);
  const [detailId, setDetailId] = reactExports.useState(null);
  const [detail, setDetail] = reactExports.useState(null);
  const [replyText, setReplyText] = reactExports.useState("");
  const [replyingTo, setReplyingTo] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => await listFn({
      data: {
        limit: 500,
        offset: 0
      }
    })
  });
  const rows = reactExports.useMemo(() => data?.items ?? [], [data]);
  const refresh = reactExports.useCallback((keys) => {
    for (const k of keys) qc.invalidateQueries({
      queryKey: [k]
    });
  }, [qc]);
  const upd = useMutation({
    mutationFn: (v) => updFn({
      data: v
    }),
    onSuccess: () => {
      refresh(["admin-messages", "admin-messages-unread"]);
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      setDetailId(null);
      setDetail(null);
      refresh(["admin-messages", "admin-messages-unread"]);
      toast.success("Message deleted");
    },
    onError: (e) => toast.error(e.message)
  });
  const reply = useMutation({
    mutationFn: (v) => replyFn({
      data: v
    }),
    onSuccess: () => {
      refresh(["admin-messages", "admin-messages-unread"]);
      toast.success("Reply sent via email");
      setReplyingTo(null);
      setReplyText("");
      if (detailId) openDetail(detailId);
    },
    onError: (e) => toast.error(e.message)
  });
  async function openDetail(id) {
    setDetailId(id);
    try {
      const row = await getFn({
        data: {
          id
        }
      });
      setDetail(row);
      refresh(["admin-messages", "admin-messages-unread"]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load message.");
    }
  }
  const counts = reactExports.useMemo(() => {
    const r = rows;
    return {
      all: r.length,
      new: r.filter((m) => m.status === "new").length,
      read: r.filter((m) => m.status === "read").length,
      replied: r.filter((m) => m.status === "replied").length,
      archived: r.filter((m) => m.status === "archived").length,
      "email-failed": r.filter((m) => m.email_delivery_status === "failed").length,
      spam: r.filter((m) => m.spam_status === "spam" || m.spam_status === "suspected").length
    };
  }, [rows]);
  const filtered = reactExports.useMemo(() => {
    let out = rows;
    if (filter === "email-failed") {
      out = out.filter((m) => m.email_delivery_status === "failed");
    } else if (filter === "spam") {
      out = out.filter((m) => m.spam_status === "spam" || m.spam_status === "suspected");
    } else if (filter !== "all") {
      out = out.filter((m) => m.status === filter);
    }
    const term = q.trim().toLowerCase();
    if (term) {
      out = out.filter((m) => [m.name, m.email, m.subject, m.message].filter(Boolean).some((v) => String(v).toLowerCase().includes(term)));
    }
    out = [...out].sort((a, b) => {
      const ta = new Date(a.created_at).getTime();
      const tb = new Date(b.created_at).getTime();
      return sort === "newest" ? tb - ta : ta - tb;
    });
    return out;
  }, [rows, filter, q, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const filterTabs = [{
    key: "all",
    label: "All"
  }, {
    key: "new",
    label: "New"
  }, {
    key: "read",
    label: "Read"
  }, {
    key: "replied",
    label: "Replied"
  }, {
    key: "archived",
    label: "Archived"
  }, {
    key: "email-failed",
    label: "Email Failed"
  }, {
    key: "spam",
    label: "Spam"
  }];
  if (detailId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-16 z-20 flex flex-col gap-3 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          setDetailId(null);
          setDetail(null);
          setReplyingTo(null);
          setReplyText("");
        }, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
          " Back to Inbox"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl sm:text-2xl font-bold", children: "Message Detail" })
      ] }) }) }),
      detail ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_340px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground break-words", children: detail.subject || "No subject" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${STATUS_CLASS[detail.status] ?? STATUS_CLASS.new}`, children: STATUS_LABEL[detail.status] ?? detail.status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryBadge, { status: detail.email_delivery_status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SpamBadge, { status: detail.spam_status, score: detail.spam_score })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Sender" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm font-semibold text-foreground", children: detail.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${detail.email}`, className: "mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand/80 hover:underline break-all", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
                  " ",
                  detail.email
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Received" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-foreground", children: new Date(detail.created_at).toLocaleString() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Updated" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-foreground", children: new Date(detail.updated_at || detail.created_at).toLocaleString() })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 whitespace-pre-wrap rounded-xl bg-muted/40 p-4 text-sm text-foreground/90 leading-relaxed", style: {
              overflowWrap: "anywhere"
            }, children: detail.message }),
            detail.email_delivery_status === "failed" && detail.email_delivery_error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-red-400/30 bg-red-500/5 px-4 py-3 text-xs text-red-600 dark:text-red-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
                " Notification email failed"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-muted-foreground", children: [
                "The message was saved successfully, but the notification email could not be delivered. ",
                detail.email_delivery_error
              ] })
            ] })
          ] }),
          replyingTo === detail.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-2xl border border-border bg-card p-5 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "h-4 w-4 text-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
                "Reply to ",
                detail.name,
                " (",
                detail.email,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: replyText, onChange: (e) => setReplyText(e.target.value), placeholder: "Type your reply here. This will be sent as an email.", rows: 5, className: "w-full resize-none rounded-xl border border-border bg-muted/20 p-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                setReplyingTo(null);
                setReplyText("");
              }, className: "rounded-full px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer", disabled: reply.isPending, children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                if (!replyText.trim()) return toast.error("Reply cannot be empty");
                reply.mutate({
                  messageId: detail.id,
                  replyBody: replyText.trim()
                });
              }, disabled: reply.isPending || !replyText.trim(), className: "inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground hover:bg-brand/90 disabled:opacity-50 cursor-pointer", children: [
                reply.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
                "Send Reply"
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setReplyingTo(detail.id), className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:opacity-90 transition cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
            " Reply from CMS"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              detail.status !== "replied" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => upd.mutate({
                id: detail.id,
                status: "replied"
              }), className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "h-3.5 w-3.5" }),
                " Mark Replied"
              ] }),
              detail.status !== "read" && detail.status !== "replied" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => upd.mutate({
                id: detail.id,
                status: "read"
              }), className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent/15 px-3 py-2 text-xs font-semibold text-accent hover:bg-accent/25 transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3.5 w-3.5" }),
                " Mark Read"
              ] }),
              detail.status !== "archived" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => upd.mutate({
                id: detail.id,
                status: "archived"
              }), className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-500/15 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-500/25 transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-3.5 w-3.5" }),
                " Archive"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => upd.mutate({
                id: detail.id,
                status: "read"
              }), className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-500/15 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-500/25 transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-3.5 w-3.5" }),
                " Unarchive"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                if (confirm("Delete this message permanently? This cannot be undone.")) {
                  del.mutate(detail.id);
                }
              }, className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                " Delete"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Details" }),
            detail.status === "replied" && detail.replied_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Replied" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: new Date(detail.replied_at).toLocaleString() })
              ] })
            ] }),
            detail.read_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "First read" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: new Date(detail.read_at).toLocaleString() })
              ] })
            ] }),
            detail.archived_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Archived" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: new Date(detail.archived_at).toLocaleString() })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Delivery status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground capitalize", children: detail.email_delivery_status || "pending" })
              ] })
            ] }),
            detail.spam_score !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Spam" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  (detail.spam_status || "clean").replace("_", " "),
                  " (",
                  detail.spam_score,
                  "/100)"
                ] })
              ] })
            ] })
          ] }),
          (detail.user_agent || detail.ip_hash) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Request Metadata" }),
            detail.user_agent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground break-words", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "User Agent:" }),
              " ",
              detail.user_agent
            ] }),
            detail.ip_hash && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "IP (hashed):" }),
              " ",
              detail.ip_hash
            ] }),
            detail.country && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Country:" }),
              " ",
              detail.country
            ] })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground", children: "Loading message..." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-16 z-20 flex flex-col gap-3 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl sm:text-3xl font-bold flex items-center gap-2", children: [
        "Messages",
        counts.new > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground", children: counts.new })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Manage contact form submissions. Click a message to open and manage it." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      filterTabs.map((ft) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setFilter(ft.key);
        setPage(1);
      }, className: `rounded-full px-3 py-1.5 text-xs font-medium transition ${filter === ft.key ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/70"}`, children: [
        ft.label,
        " (",
        counts[ft.key],
        ")"
      ] }, ft.key)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => {
            setQ(e.target.value);
            setPage(1);
          }, placeholder: "Search name, email, subject, message…", className: "w-44 bg-transparent text-xs outline-none placeholder:text-muted-foreground sm:w-56" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSort(sort === "newest" ? "oldest" : "newest"), className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition cursor-pointer", title: "Toggle sort order", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3.5 w-3.5" }),
          sort === "newest" ? "Newest first" : "Oldest first"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Loading messages…"
      ] }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "mx-auto h-8 w-8 text-muted-foreground/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "No messages found." })
      ] }),
      pageItems.map((m) => {
        const unread = m.status === "new";
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-2xl border transition-colors ${unread ? "border-brand/30 bg-card shadow-sm" : "border-border bg-background hover:border-brand/20"} p-4 cursor-pointer`, onClick: () => openDetail(m.id), role: "button", tabIndex: 0, onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openDetail(m.id);
          }
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `truncate text-sm ${unread ? "font-bold text-foreground" : "font-medium text-foreground/80"}`, children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_CLASS[m.status] ?? STATUS_CLASS.new}`, children: STATUS_LABEL[m.status] ?? m.status }),
            m.email_delivery_status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryBadge, { status: "failed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SpamBadge, { status: m.spam_status, score: m.spam_score })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: [
            m.email,
            " · ",
            new Date(m.created_at).toLocaleString()
          ] }),
          m.subject && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-sm font-medium", children: m.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-1 text-sm text-muted-foreground", children: m.message })
        ] }) }) }, m.id);
      }),
      !isLoading && filtered.length > PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPage(Math.max(1, safePage - 1)), disabled: safePage <= 1, className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 transition cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
          " Prev"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Page ",
          safePage,
          " of ",
          totalPages,
          " · ",
          filtered.length,
          " messages"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPage(Math.min(totalPages, safePage + 1)), disabled: safePage >= totalPages, className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 transition cursor-pointer", children: [
          "Next ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminMessages as component
};
