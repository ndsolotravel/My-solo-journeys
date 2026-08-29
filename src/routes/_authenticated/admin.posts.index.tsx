import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Clock,
  Search,
  MapPin,
  Loader2,
  Image as ImageIcon,
  Navigation,
  AlertCircle,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminListPosts,
  adminTogglePublish,
  adminDeletePost,
  resolveMediaUrl,
} from "@/lib/admin.functions";
import { batchGeocodePosts } from "@/lib/geocoding.functions";
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
  const batchGeocodeFn = useServerFn(batchGeocodePosts);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<any>({
    queryKey: ["admin-posts"],
    queryFn: async () => await listFn(),
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [batchGeocoding, setBatchGeocoding] = useState(false);

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
        old ? old.filter((p) => p.id !== deletedId) : [],
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

  const batchGeocode = useMutation({
    mutationFn: () => batchGeocodeFn({ data: { dryRun: false } }),
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success(
        `Batch geocoding complete: ${result.updated} updated, ${result.flagged} flagged for review`,
      );
      setBatchGeocoding(false);
    },
    onError: (e: Error) => {
      toast.error(e.message || "Batch geocoding failed");
      setBatchGeocoding(false);
    },
  });

  async function handleBatchGeocode() {
    setBatchGeocoding(true);
    batchGeocode.mutate();
  }

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
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar matching Homepage Visual Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#FF7A00]/10 text-[#FF7A00]">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Stories Management
              </h1>
              <span className="hidden sm:inline-flex items-center rounded-full bg-[#FF7A00]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#FF7A00]">
                {data ? `${data.length} Total` : "Posts"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Draft, edit, geocode, and publish your solo journey chronicles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            type="button"
            onClick={handleBatchGeocode}
            disabled={batchGeocoding}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
          >
            {batchGeocoding ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#FF7A00]" />
                <span>Geocoding...</span>
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4 text-[#FF7A00]" />
                <span>Auto-geocode All</span>
              </>
            )}
          </button>
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF7A00] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#FF7A00]/25 hover:bg-[#FF7A00]/90 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" /> New Story
          </Link>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-2xs">
          {(["all", "published", "draft", "scheduled"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === tab
                  ? "bg-[#FF7A00] text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stories, category, slug…"
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs sm:text-sm text-foreground focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] focus:outline-none transition-colors shadow-2xs"
          />
        </div>
      </div>

      {/* Posts Table Card Container */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-semibold">Cover</th>
                <th className="px-4 py-3 font-semibold">Title & Slug</th>
                <th className="px-4 py-3 hidden sm:table-cell font-semibold">Status</th>
                <th className="px-4 py-3 hidden lg:table-cell font-semibold">Map Location</th>
                <th className="px-4 py-3 hidden md:table-cell font-semibold">Views</th>
                <th className="px-4 py-3 hidden md:table-cell font-semibold">Updated</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-[#FF7A00]" />
                      <p className="text-xs">Loading solo stories…</p>
                    </div>
                  </td>
                </tr>
              )}
              {filteredPosts.map((p: any) => {
                const dest = (p as Record<string, unknown>).destinations as {
                  title?: string;
                } | null;
                const hasCoords =
                  p.latitude != null &&
                  p.longitude != null &&
                  !isNaN(p.latitude) &&
                  !isNaN(p.longitude);

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <PostThumb cover={p.cover_image} />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to="/admin/posts/$id"
                        params={{ id: p.id }}
                        className="font-display font-bold hover:text-[#FF7A00] transition-colors line-clamp-1 text-foreground"
                      >
                        {p.title}
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-1 font-mono mt-0.5">
                        /{p.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {p.published ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 shadow-2xs">
                          Published
                        </span>
                      ) : p.scheduled_at ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 text-xs font-semibold text-amber-600 shadow-2xs">
                          <Clock className="h-3 w-3" /> Scheduled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground shadow-2xs">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs space-y-0.5 max-w-[220px]">
                      {p.location_name && hasCoords ? (
                        <div
                          className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium truncate"
                          title={`${p.location_name} (${Number(p.latitude).toFixed(4)}, ${Number(p.longitude).toFixed(4)})`}
                        >
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FF7A00]" />
                          <span className="truncate">{p.location_name}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium text-xs">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>Needs Location</span>
                        </div>
                      )}
                      {dest?.title && (
                        <p className="text-[11px] text-muted-foreground truncate">
                          Destination: {dest.title}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                      {p.views ?? 0} views
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                      {new Date(p.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to="/admin/gallery"
                          title="Manage gallery photos"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-[#FF7A00] transition-colors"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          title={p.published ? "Unpublish story" : "Publish now"}
                          onClick={() => toggle.mutate({ id: p.id, published: !p.published })}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-[#FF7A00] transition-colors cursor-pointer"
                        >
                          {p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          type="button"
                          title="Delete story"
                          onClick={() => setDeleteTarget({ id: p.id, title: p.title })}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!isLoading && filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground text-sm">
                    {data?.length === 0
                      ? "No solo stories yet — create your first story above."
                      : "No stories match your active filters or search term."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessible Confirmation Modal Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && !del.isPending && setDeleteTarget(null)}
      >
        <AlertDialogContent className="rounded-2xl border border-border bg-background shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-lg font-bold text-foreground">
              Delete story?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-foreground">&quot;{deleteTarget?.title}&quot;</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              disabled={del.isPending}
              className="rounded-xl border border-border bg-card hover:bg-muted cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center gap-2 cursor-pointer"
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

function PostThumb({ cover }: { cover: string | null | undefined }) {
  const [failed, setFailed] = useState(false);
  const src = cover && !failed ? resolveMediaUrl(cover) : "";
  return (
    <div className="relative aspect-[16/9] w-16 overflow-hidden rounded-xl bg-muted sm:w-20 shadow-2xs">
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-muted text-muted-foreground">
          <ImageIcon className="h-4 w-4 text-muted-foreground/60" />
          <span className="text-[9px] uppercase tracking-wider font-medium">No Image</span>
        </div>
      )}
    </div>
  );
}
