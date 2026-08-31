import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Trash2,
  UserCheck,
  UserX,
  Download,
  Calendar,
  RefreshCw,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Loader2,
  Mail,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminListSubscribers,
  adminUpdateSubscriberStatus,
  adminDeleteSubscriber,
} from "@/lib/newsletter.functions";

export const Route = createFileRoute("/_authenticated/admin/subscribers")({
  head: () => ({
    meta: [
      { title: "Newsletter Subscribers — Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminSubscribersPage,
});

type StatusFilter = "all" | "active" | "unsubscribed";
type SortOrder = "newest" | "oldest";

interface SubscriberItem {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  subscribed_at: string;
}

function AdminSubscribersPage() {
  const listFn = useServerFn(adminListSubscribers);
  const updFn = useServerFn(adminUpdateSubscriberStatus);
  const delFn = useServerFn(adminDeleteSubscriber);
  const qc = useQueryClient();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch, isFetching } = useQuery<SubscriberItem[]>({
    queryKey: ["admin-subscribers"],
    queryFn: async () => await listFn(),
    refetchInterval: 15_000,
  });

  const updMutation = useMutation({
    mutationFn: (v: { id: string; status: "active" | "unsubscribed" }) => updFn({ data: v }),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["admin-subscribers"] });
      toast.success(
        variables.status === "unsubscribed"
          ? "Subscriber unsubscribed"
          : "Subscriber marked active",
      );
    },
    onError: (err: Error) => toast.error(err.message || "Failed to update subscriber"),
  });

  const delMutation = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-subscribers"] });
      toast.success("Subscriber removed");
    },
    onError: (err: Error) => toast.error(err.message || "Failed to delete subscriber"),
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const rows = data ?? [];
    const now = new Date();
    const todayStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    ).getTime();

    const active = rows.filter((r) => r.status === "active").length;
    const unsubscribed = rows.filter((r) => r.status === "unsubscribed").length;
    const today = rows.filter((r) => new Date(r.subscribed_at).getTime() >= todayStart).length;

    return {
      total: rows.length,
      active,
      unsubscribed,
      today,
    };
  }, [data]);

  // Filter and sort subscribers
  const filteredSubscribers = useMemo(() => {
    let rows = [...(data ?? [])];
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
    const csvRows = [
      headers.join(","),
      ...filteredSubscribers.map((s) =>
        [
          `"${s.id}"`,
          `"${s.email}"`,
          `"${s.status}"`,
          `"${new Date(s.subscribed_at).toISOString()}"`,
        ].join(","),
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `ndsolo_subscribers_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredSubscribers.length} subscribers`);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm">Loading Subscribers…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar — sticky action bar */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <Users className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Newsletter Subscribers
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage your newsletter audience, inspect subscription records, and search subscriber
              emails.
            </p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent border border-accent/20">
            <UserCheck className="h-3.5 w-3.5" />
            {stats.active} Active
          </span>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition disabled:opacity-50 shadow-2xs cursor-pointer"
            title="Refresh subscriber list"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={exportCSV}
            disabled={!filteredSubscribers.length}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Active Subscribers */}
        <div className="rounded-2xl border border-emerald-500/30 bg-card p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Active Subscribers
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-4xl font-extrabold text-foreground">
            {stats.active}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Ready for next dispatch</p>
        </div>

        {/* Total Subscribers Overall */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Total Registered
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-foreground">{stats.total}</p>
          <p className="mt-1 text-xs text-muted-foreground">All subscriber records</p>
        </div>

        {/* Today's New Subscribers */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Subscribed Today
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-foreground">{stats.today}</p>
          <p className="mt-1 text-xs text-muted-foreground">Joined in last 24 hours</p>
        </div>

        {/* Unsubscribed */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Unsubscribed
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <UserX className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-foreground">
            {stats.unsubscribed}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Opted out</p>
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-center text-sm text-destructive">
          Failed to load subscribers. Please try again.
          <button
            onClick={() => void refetch()}
            className="ml-3 font-semibold underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Controls & Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "active", "unsubscribed"] as StatusFilter[]).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                statusFilter === st
                  ? "bg-foreground text-background shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {st === "all" ? "All Subscribers" : st === "active" ? "Active" : "Unsubscribed"} (
              {st === "all" ? stats.total : st === "active" ? stats.active : stats.unsubscribed})
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search email…"
              className="w-44 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="bg-transparent outline-none text-foreground font-medium cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase tracking-wider">
                <th className="pb-3 font-semibold">Subscriber Email</th>
                <th className="pb-3 font-semibold">Subscription Date & Time</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Inbox className="h-8 w-8 text-muted-foreground/50" />
                      <p>
                        {searchQuery
                          ? "No subscribers match your search query."
                          : "No newsletter subscribers found."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-muted/40 transition">
                    <td className="py-3.5 font-medium text-foreground text-sm">
                      <a
                        href={`mailto:${sub.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span className="font-mono">{sub.email}</span>
                      </a>
                    </td>
                    <td className="py-3.5 text-muted-foreground">
                      {new Date(sub.subscribed_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5">
                      {sub.status === "active" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                          <XCircle className="h-3 w-3" /> Unsubscribed
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {sub.status === "active" ? (
                          <button
                            type="button"
                            onClick={() =>
                              updMutation.mutate({ id: sub.id, status: "unsubscribed" })
                            }
                            disabled={updMutation.isPending}
                            className="rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition disabled:opacity-50 cursor-pointer"
                            title="Unsubscribe reader"
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => updMutation.mutate({ id: sub.id, status: "active" })}
                            disabled={updMutation.isPending}
                            className="rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-emerald-600 hover:bg-emerald-500/10 transition disabled:opacity-50 cursor-pointer"
                            title="Re-activate subscription"
                          >
                            Re-activate
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove subscriber <${sub.email}> permanently?`)) {
                              delMutation.mutate(sub.id);
                            }
                          }}
                          disabled={delMutation.isPending}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition disabled:opacity-50 cursor-pointer"
                          title="Delete subscriber record"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
