import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trash2, Mail, Search, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import {
  adminListMessages,
  adminUpdateMessageStatus,
  adminDeleteMessage,
  adminReplyToMessage,
} from "@/lib/contact.functions";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: AdminMessages,
});

type Status = "all" | "new" | "read" | "replied";

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

const STATUS_CLASS: Record<string, string> = {
  new: "bg-accent/15 text-accent",
  read: "bg-muted text-foreground",
  replied: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
};

function AdminMessages() {
  const listFn = useServerFn(adminListMessages);
  const updFn = useServerFn(adminUpdateMessageStatus);
  const delFn = useServerFn(adminDeleteMessage);
  const replyFn = useServerFn(adminReplyToMessage);
  const qc = useQueryClient();

  const [filter, setFilter] = useState<Status>("all");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  // Reply state
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const { data, isLoading } = useQuery<any>({
    queryKey: ["admin-messages"],
    queryFn: async () => await listFn(),
  });

  const upd = useMutation({
    mutationFn: (v: { id: string; status?: "new" | "read" | "replied"; is_read?: boolean }) =>
      updFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-messages"] });
      toast.success("Message deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reply = useMutation({
    mutationFn: (v: { messageId: string; replyBody: string }) => replyFn({ data: v }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-messages"] });
      toast.success("Reply sent via email");
      setReplyingTo(null);
      setReplyText("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const rows = data ?? [];
    const term = q.trim().toLowerCase();
    return rows.filter((r: any) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!term) return true;
      return (
        r.name?.toLowerCase().includes(term) ||
        r.email?.toLowerCase().includes(term) ||
        (r.subject ?? "").toLowerCase().includes(term) ||
        r.message?.toLowerCase().includes(term)
      );
    });
  }, [data, q, filter]);

  const counts = useMemo(() => {
    const rows = data ?? [];
    return {
      all: rows.length,
      new: rows.filter((r: any) => r.status === "new").length,
      read: rows.filter((r: any) => r.status === "read").length,
      replied: rows.filter((r: any) => r.status === "replied").length,
    };
  }, [data]);

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
            Manage contact form submissions. Reply directly to send an email to the visitor.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["all", "new", "read", "replied"] as Status[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              filter === s
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {s === "all" ? "All" : STATUS_LABEL[s]} ({counts[s]})
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="w-40 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {isLoading && <p className="text-muted-foreground">Loading messages…</p>}
        {!isLoading && filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            No messages found.
          </p>
        )}
        {filtered.map((m: any) => {
          const isOpen = openId === m.id;
          const isReplying = replyingTo === m.id;

          return (
            <div
              key={m.id}
              className={`rounded-2xl border transition-colors ${
                isOpen ? "border-brand/30 bg-card shadow-sm" : "border-border bg-background hover:border-brand/20"
              } p-4`}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 text-left"
                onClick={() => {
                  setOpenId(isOpen ? null : m.id);
                  if (!isOpen && m.status === "new") {
                    upd.mutate({ id: m.id, status: "read" });
                  }
                  if (isOpen) {
                    setReplyingTo(null);
                    setReplyText("");
                  }
                }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`truncate text-sm ${m.status === "new" ? "font-bold text-foreground" : "font-medium text-foreground/80"}`}>
                      {m.name}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        STATUS_CLASS[m.status] ?? STATUS_CLASS.new
                      }`}
                    >
                      {STATUS_LABEL[m.status] ?? m.status}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {m.email} · {new Date(m.created_at).toLocaleString()}
                  </p>
                  {m.subject && (
                    <p className="mt-1 truncate text-sm font-medium">{m.subject}</p>
                  )}
                  {!isOpen && (
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {m.message}
                    </p>
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  <div className="rounded-xl bg-muted/40 p-4">
                    <p className="whitespace-pre-wrap text-sm text-foreground/90">{m.message}</p>
                  </div>
                  
                  {isReplying ? (
                    <div className="space-y-3 rounded-xl border border-border bg-background p-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Reply to {m.name} ({m.email})
                      </label>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here. This will be sent as an email."
                        rows={5}
                        className="w-full resize-none rounded-lg border border-border bg-muted/20 p-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                          className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
                          disabled={reply.isPending}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (!replyText.trim()) return toast.error("Reply cannot be empty");
                            reply.mutate({ messageId: m.id, replyBody: replyText.trim() });
                          }}
                          disabled={reply.isPending || !replyText.trim()}
                          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground hover:bg-brand/90 disabled:opacity-50"
                        >
                          {reply.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                          Send Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setReplyingTo(m.id)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:opacity-90"
                      >
                        <Mail className="h-3.5 w-3.5" /> Reply from CMS
                      </button>
                      <select
                        value={m.status}
                        onChange={(e) =>
                          upd.mutate({
                            id: m.id,
                            status: e.target.value as "new" | "read" | "replied",
                          })
                        }
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs outline-none"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      <button
                        onClick={() => {
                          if (confirm("Delete this message forever?")) del.mutate(m.id);
                        }}
                        className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
