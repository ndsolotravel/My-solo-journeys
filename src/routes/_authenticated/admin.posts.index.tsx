import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Eye, EyeOff, Trash2, Clock, Search, MapPin, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { adminListPosts, adminTogglePublish, adminDeletePost } from "@/lib/admin.functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/admin/posts/")({
  component: AdminPostsList,
});

type StatusFilter = "all" | "published" | "draft" | "scheduled";

function AdminPostsList() {
  const listFn = useServerFn(adminListPosts);
  const toggleFn = useServerFn(adminTogglePublish);
  const delFn = useServerFn(adminDeletePost);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<any>({ queryKey: ["admin-posts"], queryFn: async () => await listFn() });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const toggle = useMutation({
    mutationFn: (v: { id: string; published: boolean }) => toggleFn({ data: v }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Updated post status");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: (_, deletedId) => {
      qc.setQueryData<any[]>(["admin-posts"], (old) =>
        old ? old.filter((p) => p.id !== deletedId) : []
      );
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["admin-analytics"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
      setDeleteTarget(null);
    },
    onError: (e: Error) => {
      toast.error(e.message || "Unable to delete this blog post. Please try again.");
      setDeleteTarget(null);
    },
  });

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    return data.filter((p: any) => {
      // Status filter
      if (statusFilter === "published" && !p.published) return false;
      if (statusFilter === "draft" && (p.published || p.scheduled_at)) return false;
      if (statusFilter === "scheduled" && (p.published || !p.scheduled_at)) return false;

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSlug = p.slug.toLowerCase().includes(q);
        const matchCategory = p.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchSlug && !matchCategory) return false;
      }

      return true;
    });
  }, [data, search, statusFilter]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and publish your solo travel stories</p>
        </div>
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/20 p-1">
          {(["all", "published", "draft", "scheduled"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                statusFilter === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, slug, category…"
            className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3 hidden sm:table-cell">Status</th>
              <th className="px-4 py-3 hidden lg:table-cell">Destination</th>
              <th className="px-4 py-3 hidden md:table-cell">Views</th>
              <th className="px-4 py-3 hidden md:table-cell">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Loading posts…
                </td>
              </tr>
            )}
            {filteredPosts.map((p: any) => {
              const dest = (p as Record<string, unknown>).destinations as { title?: string } | null;
              return (
                <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link
                      to="/admin/posts/$id"
                      params={{ id: p.id }}
                      className="font-medium hover:text-accent line-clamp-1"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-1">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {p.published ? (
                      <Badge tone="green">Published</Badge>
                    ) : p.scheduled_at ? (
                      <Badge tone="amber">
                        <Clock className="h-3 w-3" /> Scheduled
                      </Badge>
                    ) : (
                      <Badge tone="gray">Draft</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                    {dest?.title ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-accent" /> {dest.title}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {p.views ?? 0}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to="/admin/gallery"
                        title="Manage gallery photos"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-accent transition-colors"
                      >
                        <ImageIcon className="h-4 w-4 text-accent" />
                      </Link>
                      <IconBtn
                        title={p.published ? "Unpublish" : "Publish now"}
                        onClick={() => toggle.mutate({ id: p.id, published: !p.published })}
                      >
                        {p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </IconBtn>
                      <IconBtn
                        title="Delete post"
                        onClick={() => setDeleteTarget({ id: p.id, title: p.title })}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!isLoading && filteredPosts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  {data?.length === 0
                    ? "No posts yet — create your first story."
                    : "No posts match your active filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Accessible Confirmation Modal Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && !del.isPending && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold text-foreground">"{deleteTarget?.title}"</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={del.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center gap-2"
              disabled={del.isPending}
              onClick={(e) => {
                e.preventDefault();
                if (deleteTarget && !del.isPending) {
                  del.mutate(deleteTarget.id);
                }
              }}
            >
              {del.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Deleting…
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "amber" | "gray";
}) {
  const cls = {
    green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    gray: "bg-muted text-muted-foreground",
  }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs ${cls}`}>{children}</span>;
}

function IconBtn({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
    >
      {children}
    </button>
  );
}
