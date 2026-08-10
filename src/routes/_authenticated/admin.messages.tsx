import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trash2, Mail, Search } from "lucide-react";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import {
  adminListMessages,
  adminUpdateMessageStatus,
  adminDeleteMessage,
} from "@/lib/admin.functions";

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
  const qc = useQueryClient();

  const [filter, setFilter] = useState<Status>("all");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: () => listFn(),
  });

  const upd = useMutation({
    mutationFn: (v: { id: string; status: "new" | "read" | "replied" }) =>
      updFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-messages"] });
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const rows = data ?? [];
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
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
      new: rows.filter((r) => r.status === "new").length,
      read: rows.filter((r) => r.status === "read").length,
      replied: rows.filter((r) => r.status === "replied").length,
    };
  }, [data]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Messages</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Contact-form submissions. Mark messages as read or replied once handled.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
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
        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {!isLoading && filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            No messages.
          </p>
        )}
        {filtered.map((m) => {
          const isOpen = openId === m.id;
          return (
            <div
              key={m.id}
              className="rounded-2xl border border-border bg-background p-4"
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 text-left"
                onClick={() => {
                  setOpenId(isOpen ? null : m.id);
                  if (!isOpen && m.status === "new") {
                    upd.mutate({ id: m.id, status: "read" });
                  }
                }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{m.name}</p>
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
                <div className="mt-4 space-y-3 border-t border-border pt-4">
                  <p className="whitespace-pre-wrap text-sm">{m.message}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${m.email}?subject=${encodeURIComponent(
                        "Re: " + (m.subject || "your message to ndsolotravel"),
                      )}`}
                      onClick={() =>
                        upd.mutate({ id: m.id, status: "replied" })
                      }
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90"
                    >
                      <Mail className="h-3.5 w-3.5" /> Reply by email
                    </a>
                    <select
                      value={m.status}
                      onChange={(e) =>
                        upd.mutate({
                          id: m.id,
                          status: e.target.value as "new" | "read" | "replied",
                        })
                      }
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                    <button
                      onClick={() => {
                        if (confirm("Delete this message?")) del.mutate(m.id);
                      }}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
