import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Trash2,
  Mail,
  Search,
  Send,
  Loader2,
  Archive,
  CheckCircle2,
  MessageSquare,
  Reply,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Inbox,
  ShieldCheck,
  TriangleAlert,
  Globe,
  User,
  Clock,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useMemo, useState, useCallback } from "react";
import {
  adminListMessages,
  adminUpdateMessageStatus,
  adminDeleteMessage,
  adminReplyToMessage,
  adminGetMessage,
  type MessageStatus,
} from "@/lib/contact.functions";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: AdminMessages,
});

type StatusFilter = "all" | "new" | "read" | "replied" | "archived" | "email-failed" | "spam";

type SortOrder = "newest" | "oldest";

type MessageListItem = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: MessageStatus;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  read_at: string | null;
  replied_at: string | null;
  archived_at: string | null;
  email_delivery_status: string;
  email_delivery_error: string | null;
  spam_status: string;
  spam_score: number;
  ip_hash: string | null;
  user_agent: string | null;
  country: string | null;
};

const STATUS_LABEL: Record<MessageStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  archived: "Archived",
};

const STATUS_CLASS: Record<MessageStatus, string> = {
  new: "bg-accent/15 text-accent",
  read: "bg-muted text-foreground",
  replied: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  archived: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
};

function DeliveryBadge({ status }: { status: string | null }) {
  const s = status || "pending";
  if (s === "sent") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        <CheckCheck className="h-3 w-3" /> Email sent
      </span>
    );
  }
  if (s === "failed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
        <TriangleAlert className="h-3 w-3" /> Email failed
      </span>
    );
  }
  if (s === "pending") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Clock className="h-3 w-3" /> Pending
      </span>
    );
  }
  return null;
}

function SpamBadge({ status, score }: { status: string | null; score: number }) {
  const s = status || "clean";
  if (s !== "spam" && s !== "suspected") return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        s === "spam"
          ? "bg-red-500/15 text-red-600 dark:text-red-400"
          : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
      }`}
      title={`Spam score: ${score}/100`}
    >
      <ShieldCheck className="h-3 w-3" /> {s}
    </span>
  );
}

const PAGE_SIZE = 25;

function AdminMessages() {
  const listFn = useServerFn(adminListMessages);
  const getFn = useServerFn(adminGetMessage);
  const updFn = useServerFn(adminUpdateMessageStatus);
  const delFn = useServerFn(adminDeleteMessage);
  const replyFn = useServerFn(adminReplyToMessage);
  const qc = useQueryClient();

  const [filter, setFilter] = useState<StatusFilter>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);

  // Detail view state
  const [detailId, setDetailId] = useState<string | null>(null);
  const [detail, setDetail] = useState<MessageListItem | null>(null);

  // Reply state
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const { data, isLoading } = useQuery<{ items: MessageListItem[]; total: number }>({
    queryKey: ["admin-messages"],
    queryFn: async () => await listFn({ data: { limit: 500, offset: 0 } }),
  });

  const rows = useMemo(() => data?.items ?? [], [data]);

  const refresh = useCallback(
    (keys: string[]) => {
      for (const k of keys) qc.invalidateQueries({ queryKey: [k] });
    },
    [qc],
  );

  const upd = useMutation({
    mutationFn: (v: { id: string; status: MessageStatus }) => updFn({ data: v }),
    onSuccess: () => {
      refresh(["admin-messages", "admin-messages-unread"]);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      setDetailId(null);
      setDetail(null);
      refresh(["admin-messages", "admin-messages-unread"]);
      toast.success("Message deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reply = useMutation({
    mutationFn: (v: { messageId: string; replyBody: string }) => replyFn({ data: v }),
    onSuccess: () => {
      refresh(["admin-messages", "admin-messages-unread"]);
      toast.success("Reply sent via email");
      setReplyingTo(null);
      setReplyText("");
      if (detailId) openDetail(detailId);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function openDetail(id: string) {
    setDetailId(id);
    try {
      const row = await getFn({ data: { id } });
      setDetail(row);
      // Auto-mark new → read happens server-side; invalidate list
      refresh(["admin-messages", "admin-messages-unread"]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load message.");
    }
  }

  const counts = useMemo(() => {
    const r = rows;
    return {
      all: r.length,
      new: r.filter((m) => m.status === "new").length,
      read: r.filter((m) => m.status === "read").length,
      replied: r.filter((m) => m.status === "replied").length,
      archived: r.filter((m) => m.status === "archived").length,
      "email-failed": r.filter((m) => m.email_delivery_status === "failed").length,
      spam: r.filter((m) => m.spam_status === "spam" || m.spam_status === "suspected").length,
    } as Record<StatusFilter, number>;
  }, [rows]);

  const filtered = useMemo(() => {
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
      out = out.filter((m) =>
        [m.name, m.email, m.subject, m.message]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(term)),
      );
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

  const filterTabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "read", label: "Read" },
    { key: "replied", label: "Replied" },
    { key: "archived", label: "Archived" },
    { key: "email-failed", label: "Email Failed" },
    { key: "spam", label: "Spam" },
  ];

  // ── Detail view ──
  if (detailId) {
    return (
      <div className="space-y-6">
        <div className="sticky top-16 z-20 flex flex-col gap-3 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setDetailId(null);
                  setDetail(null);
                  setReplyingTo(null);
                  setReplyText("");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back to Inbox
              </button>
              <h1 className="font-display text-xl sm:text-2xl font-bold">Message Detail</h1>
            </div>
          </div>
        </div>

        {detail ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            {/* Main message content */}
            <div className="space-y-6 min-w-0">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-bold text-foreground break-words">
                      {detail.subject || "No subject"}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                          STATUS_CLASS[detail.status as MessageStatus] ?? STATUS_CLASS.new
                        }`}
                      >
                        {STATUS_LABEL[detail.status as MessageStatus] ?? detail.status}
                      </span>
                      <DeliveryBadge status={detail.email_delivery_status} />
                      <SpamBadge status={detail.spam_status} score={detail.spam_score} />
                    </div>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <User className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Sender
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">{detail.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${detail.email}`}
                      className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand/80 hover:underline break-all"
                    >
                      <Mail className="h-3.5 w-3.5" /> {detail.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Received
                    </p>
                    <p className="mt-0.5 text-sm text-foreground">
                      {new Date(detail.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Updated
                    </p>
                    <p className="mt-0.5 text-sm text-foreground">
                      {new Date(detail.updated_at || detail.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-6 whitespace-pre-wrap rounded-xl bg-muted/40 p-4 text-sm text-foreground/90 leading-relaxed"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {detail.message}
                </div>

                {detail.email_delivery_status === "failed" && detail.email_delivery_error && (
                  <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/5 px-4 py-3 text-xs text-red-600 dark:text-red-400">
                    <p className="font-semibold flex items-center gap-1.5">
                      <TriangleAlert className="h-3.5 w-3.5" /> Notification email failed
                    </p>
                    <p className="mt-0.5 text-muted-foreground">
                      The message was saved successfully, but the notification email could not be
                      delivered. {detail.email_delivery_error}
                    </p>
                  </div>
                )}
              </div>

              {/* Reply composer */}
              {replyingTo === detail.id ? (
                <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Reply className="h-4 w-4 text-brand" />
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Reply to {detail.name} ({detail.email})
                    </p>
                  </div>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here. This will be sent as an email."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-border bg-muted/20 p-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText("");
                      }}
                      className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                      disabled={reply.isPending}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!replyText.trim()) return toast.error("Reply cannot be empty");
                        reply.mutate({
                          messageId: detail.id,
                          replyBody: replyText.trim(),
                        });
                      }}
                      disabled={reply.isPending || !replyText.trim()}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground hover:bg-brand/90 disabled:opacity-50 cursor-pointer"
                    >
                      {reply.isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Send className="h-3.5 w-3.5" />
                      )}
                      Send Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-4">
                  <button
                    onClick={() => setReplyingTo(detail.id)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:opacity-90 transition cursor-pointer"
                  >
                    <Mail className="h-3.5 w-3.5" /> Reply from CMS
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar: actions + metadata */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Actions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {detail.status !== "replied" && (
                    <button
                      onClick={() => upd.mutate({ id: detail.id, status: "replied" })}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition-colors cursor-pointer"
                    >
                      <Reply className="h-3.5 w-3.5" /> Mark Replied
                    </button>
                  )}
                  {detail.status !== "read" && detail.status !== "replied" && (
                    <button
                      onClick={() => upd.mutate({ id: detail.id, status: "read" })}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent/15 px-3 py-2 text-xs font-semibold text-accent hover:bg-accent/25 transition-colors cursor-pointer"
                    >
                      <CheckCheck className="h-3.5 w-3.5" /> Mark Read
                    </button>
                  )}
                  {detail.status !== "archived" ? (
                    <button
                      onClick={() => upd.mutate({ id: detail.id, status: "archived" })}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-500/15 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-500/25 transition-colors cursor-pointer"
                    >
                      <Archive className="h-3.5 w-3.5" /> Archive
                    </button>
                  ) : (
                    <button
                      onClick={() => upd.mutate({ id: detail.id, status: "read" })}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-500/15 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-500/25 transition-colors cursor-pointer"
                    >
                      <Inbox className="h-3.5 w-3.5" /> Unarchive
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm("Delete this message permanently? This cannot be undone.")) {
                        del.mutate(detail.id);
                      }
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Details
                </p>
                {detail.status === "replied" && detail.replied_at && (
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Replied</p>
                      <p className="text-muted-foreground">
                        {new Date(detail.replied_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                {detail.read_at && (
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCheck className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">First read</p>
                      <p className="text-muted-foreground">
                        {new Date(detail.read_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                {detail.archived_at && (
                  <div className="flex items-start gap-2 text-xs">
                    <Archive className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Archived</p>
                      <p className="text-muted-foreground">
                        {new Date(detail.archived_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2 text-xs">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Delivery status</p>
                    <p className="text-muted-foreground capitalize">
                      {detail.email_delivery_status || "pending"}
                    </p>
                  </div>
                </div>
                {detail.spam_score !== undefined && (
                  <div className="flex items-start gap-2 text-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Spam</p>
                      <p className="text-muted-foreground">
                        {(detail.spam_status || "clean").replace("_", " ")} ({detail.spam_score}
                        /100)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Device / metadata (secondary) */}
              {(detail.user_agent || detail.ip_hash) && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Request Metadata
                  </p>
                  {detail.user_agent && (
                    <div className="text-xs text-muted-foreground break-words">
                      <span className="font-semibold text-foreground">User Agent:</span>{" "}
                      {detail.user_agent}
                    </div>
                  )}
                  {detail.ip_hash && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">IP (hashed):</span>{" "}
                      {detail.ip_hash}
                    </div>
                  )}
                  {detail.country && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Country:</span>{" "}
                      {detail.country}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            Loading message...
          </p>
        )}
      </div>
    );
  }

  // ── Inbox list view ──
  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-20 flex flex-col gap-3 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2">
            Messages
            {counts.new > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {counts.new}
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage contact form submissions. Click a message to open and manage it.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {filterTabs.map((ft) => (
          <button
            key={ft.key}
            onClick={() => {
              setFilter(ft.key);
              setPage(1);
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              filter === ft.key
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {ft.label} ({counts[ft.key]})
          </button>
        ))}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, subject, message…"
              className="w-44 bg-transparent text-xs outline-none placeholder:text-muted-foreground sm:w-56"
            />
          </div>
          <button
            onClick={() => setSort(sort === "newest" ? "oldest" : "newest")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition cursor-pointer"
            title="Toggle sort order"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            {sort === "newest" ? "Newest first" : "Oldest first"}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-6 space-y-3">
        {isLoading && (
          <p className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading messages…
          </p>
        )}
        {!isLoading && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-12 text-center">
            <Inbox className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">No messages found.</p>
          </div>
        )}
        {pageItems.map((m) => {
          const unread = m.status === "new";
          return (
            <div
              key={m.id}
              className={`rounded-2xl border transition-colors ${
                unread
                  ? "border-brand/30 bg-card shadow-sm"
                  : "border-border bg-background hover:border-brand/20"
              } p-4 cursor-pointer`}
              onClick={() => openDetail(m.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openDetail(m.id);
                }
              }}
            >
              <div className="flex w-full items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className={`truncate text-sm ${
                        unread ? "font-bold text-foreground" : "font-medium text-foreground/80"
                      }`}
                    >
                      {m.name}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        STATUS_CLASS[m.status as MessageStatus] ?? STATUS_CLASS.new
                      }`}
                    >
                      {STATUS_LABEL[m.status as MessageStatus] ?? m.status}
                    </span>
                    {m.email_delivery_status === "failed" && <DeliveryBadge status="failed" />}
                    <SpamBadge status={m.spam_status} score={m.spam_score} />
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {m.email} · {new Date(m.created_at).toLocaleString()}
                  </p>
                  {m.subject && <p className="mt-1 truncate text-sm font-medium">{m.subject}</p>}
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{m.message}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Pagination */}
        {!isLoading && filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setPage(Math.max(1, safePage - 1))}
              disabled={safePage <= 1}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>
            <span className="text-xs text-muted-foreground">
              Page {safePage} of {totalPages} · {filtered.length} messages
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage >= totalPages}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 transition cursor-pointer"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
