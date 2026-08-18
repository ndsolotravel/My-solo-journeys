import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Plus,
  Trash2,
  Pencil,
  Search,
  MapPin,
  Globe,
  ExternalLink,
  Upload,
  Loader2,
  Image as ImageIcon,
  X,
  FileText,
  Compass,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminListDestinations,
  adminUpsertDestination,
  adminDeleteDestination,
  adminUploadImage,
} from "@/lib/admin.functions";
import { DraggableDialog } from "@/components/admin/DraggableDialog";
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

export const Route = createFileRoute("/_authenticated/admin/destinations")({
  head: () => ({
    meta: [{ title: "Destinations CMS — ndsolotravel" }],
  }),
  component: AdminDestinations,
});

type DestinationRecord = {
  id?: string;
  title: string;
  slug?: string;
  location?: string | null;
  country?: string | null;
  region?: string | null;
  description?: string | null;
  featured_image?: string | null;
  published?: boolean;
  postsCount?: number;
  created_at?: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

function AdminDestinations() {
  const listFn = useServerFn(adminListDestinations);
  const saveFn = useServerFn(adminUpsertDestination);
  const delFn = useServerFn(adminDeleteDestination);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();

  const { data: destinations = [], isLoading } = useQuery<DestinationRecord[]>({
    queryKey: ["admin-destinations"],
    queryFn: async () => (await listFn()) as DestinationRecord[],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "published" | "draft">("all");
  const [editing, setEditing] = useState<DestinationRecord | null>(null);
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DestinationRecord | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveMutation = useMutation({
    mutationFn: (d: DestinationRecord) => saveFn({ data: d as never }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-destinations"] });
      qc.invalidateQueries({ queryKey: ["destinations"] });
      setEditing(null);
      setIsCustomSlug(false);
      toast.success("Destination saved successfully");
    },
    onError: (e: Error) => toast.error(`Error saving destination: ${e.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-destinations"] });
      qc.invalidateQueries({ queryKey: ["destinations"] });
      setDeleteTarget(null);
      toast.success("Destination deleted successfully");
    },
    onError: (e: Error) => toast.error(`Error deleting destination: ${e.message}`),
  });

  async function handleFileUpload(file: File) {
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
    if (!allowedTypes.includes(file.type.toLowerCase()) && !file.type.startsWith("image/")) {
      toast.error("Please upload a JPG, PNG, WebP, or AVIF image");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image file exceeds 8 MB size limit");
      return;
    }

    setIsUploading(true);
    try {
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      setEditing((curr) => (curr ? { ...curr, featured_image: url } : curr));
      toast.success("Featured image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function openCreateModal() {
    setIsCustomSlug(false);
    setEditing({
      title: "",
      slug: "",
      location: "",
      country: "Pakistan",
      region: "",
      description: "",
      featured_image: "",
      published: true,
    });
  }

  function openEditModal(d: DestinationRecord) {
    setIsCustomSlug(true);
    setEditing({
      id: d.id,
      title: d.title,
      slug: d.slug || slugify(d.title),
      location: d.location || (d.region ? `${d.region}, ${d.country}` : d.country || ""),
      country: d.country || "Pakistan",
      region: d.region || "",
      description: d.description || "",
      featured_image: d.featured_image || "",
      published: d.published !== false,
    });
  }

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        d.title.toLowerCase().includes(query) ||
        (d.slug && d.slug.toLowerCase().includes(query)) ||
        (d.location && d.location.toLowerCase().includes(query)) ||
        (d.country && d.country.toLowerCase().includes(query)) ||
        (d.region && d.region.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      if (filterTab === "published") return d.published !== false;
      if (filterTab === "draft") return d.published === false;
      return true;
    });
  }, [destinations, searchQuery, filterTab]);

  const totalCount = destinations.length;
  const publishedCount = destinations.filter((d) => d.published !== false).length;
  const draftCount = totalCount - publishedCount;

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl font-bold tracking-tight">Destinations</h1>
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {totalCount} {totalCount === 1 ? "region" : "regions"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Create, curate, and link atlas destinations to blog stories and travel guides.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
        >
          <Plus className="h-4 w-4" /> New Destination
        </button>
      </div>

      {/* Search Bar & Status Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by destination name, location, or slug…"
            className="w-full rounded-xl border border-border bg-background pl-10 pr-9 py-2 text-sm outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/70"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="inline-flex items-center rounded-xl border border-border bg-card p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filterTab === "all"
                ? "bg-foreground text-background shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("published")}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filterTab === "published"
                ? "bg-foreground text-background shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("draft")}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filterTab === "draft"
                ? "bg-foreground text-background shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>
      </div>

      {/* Destinations Grid */}
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 animate-pulse rounded-2xl border border-border bg-muted/40" />
          ))}
        </div>
      ) : filteredDestinations.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-3">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-semibold">No destinations found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No destinations match "${searchQuery}". Try a different search term or clear the filter.`
              : "Start by creating your first destination to link to your travel dispatches."}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted"
              >
                Clear Search
              </button>
            )}
            <button
              type="button"
              onClick={openCreateModal}
              className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
            >
              <Plus className="inline h-3.5 w-3.5 mr-1" /> Create Destination
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((d) => {
            const hasImage = Boolean(d.featured_image);
            const isPublished = d.published !== false;
            const displayLocation = d.location || (d.region ? `${d.region}, ${d.country}` : d.country || "");

            return (
              <div
                key={d.id || d.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs hover:border-accent/50 hover:shadow-md transition-all"
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-16/9 w-full bg-muted/50 overflow-hidden">
                  {hasImage ? (
                    <img
                      src={d.featured_image!}
                      alt={d.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-muted-foreground/60 bg-muted/20">
                      <ImageIcon className="h-8 w-8" />
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Status Pill */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md shadow-xs ${
                        isPublished
                          ? "bg-emerald-500/90 text-white"
                          : "bg-amber-500/90 text-white"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      {isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  {/* Stories Count Pill */}
                  <div className="absolute right-3 top-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-md border border-white/10">
                      <FileText className="h-3 w-3 text-amber-300" />
                      {d.postsCount ?? 0} {(d.postsCount === 1 ? "story" : "stories")}
                    </span>
                  </div>

                  {/* Destination Slug Badge */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="truncate font-mono text-[11px] text-white/90 drop-shadow-xs">
                      /destinations/{d.slug}
                    </span>
                    {d.slug && (
                      <a
                        href={`/destinations/${d.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View live destination page"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 hover:text-amber-200 transition-colors shrink-0"
                      >
                        <ExternalLink className="h-3 w-3" /> View
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {displayLocation && (
                      <p className="flex items-center gap-1 text-xs text-accent font-medium line-clamp-1 mb-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {displayLocation}
                      </p>
                    )}
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                      {d.title}
                    </h3>
                    {d.description && (
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {d.description}
                      </p>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(d)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(d)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Destination Create / Edit Modal Dialog */}
      {editing && (
        <DraggableDialog
          open={Boolean(editing)}
          onClose={() => setEditing(null)}
          title={editing.id ? `Edit: ${editing.title}` : "Create New Destination"}
          width={680}
          footer={
            <>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="destination-form"
                disabled={saveMutation.isPending || isUploading}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" /> Save Destination
                  </>
                )}
              </button>
            </>
          }
        >
          <form
            id="destination-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!editing.title.trim()) {
                toast.error("Destination name is required");
                return;
              }
              const slug = slugify(editing.slug || editing.title);
              saveMutation.mutate({
                ...editing,
                title: editing.title.trim(),
                slug,
                location: editing.location ? editing.location.trim() : null,
              });
            }}
            className="space-y-4"
          >
            {/* Destination Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Destination Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={editing.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditing((curr) => {
                    if (!curr) return null;
                    const updated = { ...curr, title: val };
                    if (!isCustomSlug) {
                      updated.slug = slugify(val);
                    }
                    return updated;
                  });
                }}
                placeholder="e.g. Phander Valley"
                maxLength={200}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/60"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                The primary display name shown across the website, stories, and dropdowns.
              </p>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Slug <span className="text-muted-foreground font-normal lowercase">(auto-generated from name)</span>
              </label>
              <div className="flex items-center rounded-xl border border-border bg-background overflow-hidden focus-within:border-accent transition-colors">
                <span className="bg-muted/60 px-3 py-2 text-xs font-mono text-muted-foreground select-none border-r border-border">
                  /destinations/
                </span>
                <input
                  type="text"
                  value={editing.slug ?? ""}
                  onChange={(e) => {
                    setIsCustomSlug(true);
                    setEditing({ ...editing, slug: slugify(e.target.value) });
                  }}
                  placeholder="phander-valley"
                  maxLength={200}
                  className="flex-1 bg-transparent px-3 py-2 text-sm font-mono outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-accent" /> Location
              </label>
              <input
                type="text"
                value={editing.location ?? ""}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                placeholder="e.g. Ghizer District, Gilgit Baltistan, Pakistan"
                maxLength={300}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/60"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Full location hierarchy e.g. District, Province/State, Country.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Description <span className="text-muted-foreground font-normal lowercase">(optional overview)</span>
              </label>
              <textarea
                rows={3}
                value={editing.description ?? ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                placeholder="Overview, landscape notes, and travel highlights for this destination…"
                maxLength={4000}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/60 resize-y"
              />
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5 text-accent" /> Featured Image
                </label>
                {editing.featured_image && (
                  <button
                    type="button"
                    onClick={() => setEditing({ ...editing, featured_image: "" })}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {/* Thumbnail Preview if exists */}
              {editing.featured_image && (
                <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden border border-border bg-black/40">
                  <img
                    src={editing.featured_image}
                    alt="Featured preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Upload Dropzone / Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium hover:bg-muted hover:border-accent transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading…
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5" /> Upload File
                    </>
                  )}
                </button>
                <input
                  type="text"
                  value={editing.featured_image ?? ""}
                  onChange={(e) => setEditing({ ...editing, featured_image: e.target.value })}
                  placeholder="…or paste image URL (https://…)"
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/60"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Uploaded files are stored in Supabase storage (`blog-media` bucket). Supports JPG, PNG, WebP, AVIF up to 8 MB.
              </p>
            </div>

            {/* Published Status Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={editing.published !== false}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <span>Published in public Atlas & Destination guides</span>
              </label>
            </div>
          </form>
        </DraggableDialog>
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Destination?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">"{deleteTarget?.title}"</span>?
              <br />
              <span className="mt-2 block text-xs text-muted-foreground">
                Any blog posts currently linked to this destination will have their destination reference unlinked safely. The blog posts themselves will not be deleted.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
              onClick={() => deleteTarget?.id && deleteMutation.mutate(deleteTarget.id)}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete Destination"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
