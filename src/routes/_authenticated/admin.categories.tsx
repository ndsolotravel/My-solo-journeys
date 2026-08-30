import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  FolderTree,
  Search,
  ExternalLink,
  FileText,
  AlertTriangle,
  Globe,
  Image as ImageIcon,
  Upload,
  Loader2,
  Layers,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminListCategories,
  adminUpsertCategory,
  adminDeleteCategory,
  slugify,
  type Category,
} from "@/lib/categories.functions";
import { adminUploadImage, resolveMediaUrl } from "@/lib/admin.functions";
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

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: AdminCategoriesPage,
});

type CategoryFormState = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  status: "active" | "inactive";
  display_order: number;
  seo_title: string;
  seo_description: string;
};

const emptyCategory: CategoryFormState = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  status: "active",
  display_order: 0,
  seo_title: "",
  seo_description: "",
};

function CategoryImagePreviewBox({
  imageUrl,
  onRemove,
}: {
  imageUrl: string;
  onRemove: () => void;
}) {
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cleanUrl = imageUrl.trim();
  const resolvedUrl = useMemo(() => resolveMediaUrl(cleanUrl), [cleanUrl]);

  // When image URL changes, reset error state and trigger loading
  useEffect(() => {
    if (!cleanUrl) {
      setLoadError(false);
      setIsLoading(false);
      return;
    }
    setLoadError(false);
    setIsLoading(true);
  }, [cleanUrl]);

  if (!cleanUrl) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-8 text-center px-4 transition-all">
        <ImageIcon className="h-8 w-8 text-muted-foreground/40 mb-2" />
        <p className="text-xs font-medium text-muted-foreground">No image URL entered</p>
        <p className="text-[11px] text-muted-foreground/70 mt-0.5 max-w-xs">
          Enter an image URL above or upload a picture (JPG, JPEG, PNG, WEBP, GIF) to see live preview.
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/5 py-7 text-center px-4 animate-in fade-in duration-200">
        <AlertTriangle className="h-7 w-7 text-amber-500 mb-2" />
        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
          Unable to load image. Please check the image URL.
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 max-w-sm">
          Make sure the link is publicly accessible and points to a valid image format (JPG, PNG, WEBP, GIF).
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-black/40 p-2 min-h-[160px] max-h-56 flex items-center justify-center group animate-in fade-in duration-200">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-xs z-10">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      )}
      <img
        src={resolvedUrl}
        alt="Category Preview"
        onLoad={() => {
          setIsLoading(false);
          setLoadError(false);
        }}
        onError={() => {
          setIsLoading(false);
          setLoadError(true);
        }}
        className={`max-h-52 max-w-full rounded-xl object-contain shadow-xs transition-opacity duration-200 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
      {!isLoading && !loadError && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <a
            href={resolvedUrl}
            target="_blank"
            rel="noreferrer"
            title="Open full image in new tab"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition cursor-pointer shadow-sm"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={onRemove}
            title="Remove image"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white hover:bg-red-600 transition cursor-pointer shadow-sm"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

function AdminCategoriesPage() {
  const listFn = useServerFn(adminListCategories);
  const saveFn = useServerFn(adminUpsertCategory);
  const delFn = useServerFn(adminDeleteCategory);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["admin-categories"],
    queryFn: async () => await listFn(),
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [editing, setEditing] = useState<CategoryFormState | null>(null);
  const [isAutoSlug, setIsAutoSlug] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: (form: CategoryFormState) =>
      saveFn({
        data: {
          id: form.id,
          name: form.name,
          slug: form.slug || undefined,
          description: form.description || null,
          image_url: form.image_url || null,
          status: form.status,
          display_order: Number(form.display_order) || 0,
          seo_title: form.seo_title || null,
          seo_description: form.seo_description || null,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      setEditing(null);
      toast.success("Category saved successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to save category");
    },
  });

  // Delete mutation
  const delMutation = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      setDeleteTarget(null);
      toast.success(res.message || "Category deleted");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete category");
    },
  });

  // Filtered & searched categories
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchSearch =
        search.trim() === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.slug.toLowerCase().includes(search.toLowerCase()) ||
        (c.description || "").toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || c.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [categories, search, statusFilter]);

  async function handleImageUpload(file: File) {
    try {
      setUploading(true);
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      setEditing((prev) => (prev ? { ...prev, image_url: url } : prev));
      toast.success("Category image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  function openCreateModal() {
    setIsAutoSlug(true);
    setEditing({
      ...emptyCategory,
      display_order: categories.length + 1,
    });
  }

  function openEditModal(c: Category) {
    setIsAutoSlug(false);
    setEditing({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      image_url: c.image_url || "",
      status: c.status,
      display_order: c.display_order ?? 0,
      seo_title: c.seo_title || "",
      seo_description: c.seo_description || "",
    });
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <FolderTree className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Category Management
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Create, organize, and manage blog categories with auto-slugs and post associations.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories by name, slug or description…"
            className="w-full rounded-xl border border-border bg-background pl-9 pr-8 py-2 text-xs font-medium placeholder:text-muted-foreground/60 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl border border-border bg-background p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-brand text-white font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              All ({categories.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("active")}
              className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                statusFilter === "active"
                  ? "bg-brand text-white font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Active ({categories.filter((c) => c.status === "active").length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("inactive")}
              className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                statusFilter === "inactive"
                  ? "bg-brand text-white font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Inactive ({categories.filter((c) => c.status === "inactive").length})
            </button>
          </div>
        </div>
      </div>

      {/* Categories Table / Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-accent mb-3" />
          <p className="text-sm">Loading categories…</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-12 text-center bg-card shadow-xs">
          <div className="p-3 rounded-2xl bg-brand/10 text-brand mx-auto mb-3 w-fit">
            <FolderTree className="h-6 w-6 text-accent" />
          </div>
          <h3 className="font-display text-base font-semibold text-foreground">No categories found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            {search
              ? "No categories match your search terms."
              : "Start by adding your first travel blog category."}
          </p>
          {!search && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Create Category
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <tr>
                  <th className="px-4 py-3.5 w-14 text-center">#</th>
                  <th className="px-4 py-3.5 min-w-[220px]">Category</th>
                  <th className="px-4 py-3.5 min-w-[160px]">Slug</th>
                  <th className="px-4 py-3.5 min-w-[240px]">Description</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-center">Posts</th>
                  <th className="px-4 py-3.5 text-right w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCategories.map((c) => {
                  const postCount = c.post_count ?? 0;
                  return (
                    <tr
                      key={c.id}
                      className="group hover:bg-muted/30 transition-colors"
                    >
                      {/* Order */}
                      <td className="px-4 py-3.5 text-center font-mono text-xs text-muted-foreground">
                        {c.display_order}
                      </td>

                      {/* Name & Preview */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          {c.image_url ? (
                            <img
                              src={resolveMediaUrl(c.image_url)}
                              alt={c.name}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                              }}
                              className="h-10 w-10 shrink-0 rounded-lg object-cover border border-border shadow-xs"
                            />
                          ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-border">
                              <Layers className="h-5 w-5 opacity-60" />
                            </div>
                          )}
                          <div>
                            <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
                              {c.name}
                            </span>
                            {c.seo_title && (
                              <p className="text-[11px] text-muted-foreground line-clamp-1">
                                {c.seo_title}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground/80">
                            /{c.slug}
                          </code>
                          <Link
                            to="/category/$slug"
                            params={{ slug: c.slug }}
                            target="_blank"
                            title="View public category page"
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-4 py-3.5 text-xs text-muted-foreground line-clamp-2 max-w-xs">
                        {c.description || (
                          <span className="italic text-muted-foreground/50">No description</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            c.status === "active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25"
                              : "bg-muted text-muted-foreground border border-border/60"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              c.status === "active" ? "bg-emerald-500" : "bg-zinc-400"
                            }`}
                          />
                          {c.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Post Count */}
                      <td className="px-4 py-3.5 text-center">
                        <Link
                          to="/admin/posts"
                          title="View posts in this category"
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                            postCount > 0
                              ? "bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20"
                              : "bg-muted text-muted-foreground border border-border/60"
                          }`}
                        >
                          <FileText className="h-3 w-3" />
                          <span>
                            {postCount} {postCount === 1 ? "story" : "stories"}
                          </span>
                        </Link>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            title="Edit Category"
                            onClick={() => openEditModal(c)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Delete Category"
                            onClick={() => setDeleteTarget(c)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-600 transition cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= CREATE / EDIT CATEGORY MODAL ================= */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/20">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FolderTree className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold">
                    {editing.id ? "Edit Category" : "Create New Category"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {editing.id
                      ? `Updating "${editing.name}"`
                      : "Define category attributes, slug, and SEO settings"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editing.name.trim()) return toast.error("Category name is required");
                saveMutation.mutate(editing);
              }}
              className="max-h-[75vh] overflow-y-auto p-6 space-y-5"
            >
              {/* Category Name & Slug */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={editing.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          name: newName,
                          slug: isAutoSlug ? slugify(newName) : prev.slug,
                        };
                      });
                    }}
                    placeholder="e.g. Motorcycle Journeys"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      URL Slug <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAutoSlug(true);
                        setEditing((prev) =>
                          prev ? { ...prev, slug: slugify(prev.name) } : prev,
                        );
                      }}
                      className="text-[11px] text-accent hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Sparkles className="h-3 w-3" /> Auto-sync
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={editing.slug}
                    onChange={(e) => {
                      setIsAutoSlug(false);
                      setEditing((prev) => (prev ? { ...prev, slug: slugify(e.target.value) } : prev));
                    }}
                    placeholder="e.g. motorcycle-journeys"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-mono outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Public URL: <span className="font-mono text-foreground">/category/{editing.slug || "slug"}</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  maxLength={500}
                  value={editing.description}
                  onChange={(e) =>
                    setEditing((prev) => (prev ? { ...prev, description: e.target.value } : prev))
                  }
                  placeholder="Brief summary of what stories belong to this category…"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y"
                />
              </div>

              {/* Status & Display Order */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Status
                  </label>
                  <select
                    value={editing.status}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev
                           ? { ...prev, status: e.target.value as "active" | "inactive" }
                          : prev,
                      )
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  >
                    <option value="active">Active (Visible publicly)</option>
                    <option value="inactive">Inactive (Hidden from public navigation)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={999}
                    value={editing.display_order}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev ? { ...prev, display_order: parseInt(e.target.value) || 0 } : prev,
                      )
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Lower numbers appear first in lists and menus.
                  </p>
                </div>
              </div>

              {/* Cover Image / Icon */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category Image URL
                  </label>
                  {editing.image_url && (
                    <button
                      type="button"
                      onClick={() => setEditing((prev) => (prev ? { ...prev, image_url: "" } : prev))}
                      className="text-[11px] text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <X className="h-3 w-3" /> Clear URL
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editing.image_url}
                    onChange={(e) =>
                      setEditing((prev) => (prev ? { ...prev, image_url: e.target.value } : prev))
                    }
                    placeholder="https://… or storage URL"
                    className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <label className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors cursor-pointer shrink-0 shadow-2xs">
                    {uploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    />
                  </label>
                </div>

                {/* Live Image Preview Container */}
                <div className="pt-1">
                  <label className="block text-[11px] font-medium text-muted-foreground mb-1.5">
                    Live Image Preview
                  </label>
                  <CategoryImagePreviewBox
                    imageUrl={editing.image_url}
                    onRemove={() =>
                      setEditing((prev) => (prev ? { ...prev, image_url: "" } : prev))
                    }
                  />
                </div>
              </div>

              {/* SEO & Metadata Section */}
              <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Globe className="h-4 w-4 text-accent" /> Search Engine Optimization (SEO)
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    maxLength={200}
                    value={editing.seo_title}
                    onChange={(e) =>
                      setEditing((prev) => (prev ? { ...prev, seo_title: e.target.value } : prev))
                    }
                    placeholder={`${editing.name || "Category"} — ndsolotravel`}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    maxLength={500}
                    value={editing.seo_description}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev ? { ...prev, seo_description: e.target.value } : prev,
                      )
                    }
                    placeholder={
                      editing.description ||
                      "Search snippet description displayed in Google results…"
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 pt-3 pb-3 px-6 -mx-6 -mb-6 border-t border-border bg-card/95 backdrop-blur-md shadow-xs">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
                    </>
                  ) : (
                    "Save Category"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE CATEGORY SAFETY CONFIRMATION DIALOG ================= */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="rounded-3xl border border-border bg-card shadow-2xl p-6">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
              <AlertDialogTitle className="font-display text-lg font-bold text-foreground">
                {deleteTarget && (deleteTarget.post_count ?? 0) > 0
                  ? "Cannot Delete Category"
                  : "Delete Category?"}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-xs text-muted-foreground space-y-2 mt-2">
              {deleteTarget && (deleteTarget.post_count ?? 0) > 0 ? (
                <>
                  <p>
                    Category{" "}
                    <strong className="text-foreground">"{deleteTarget.name}"</strong> is
                    currently assigned to{" "}
                    <span className="font-semibold text-amber-500">
                      {deleteTarget.post_count} blog{" "}
                      {deleteTarget.post_count === 1 ? "post" : "posts"}
                    </span>
                    .
                  </p>
                  <p className="text-xs text-muted-foreground">
                    To prevent breaking blog post relationships, you must first edit those posts and
                    reassign them to a different category before this category can be removed.
                  </p>
                </>
              ) : (
                <p>
                  Are you sure you want to delete category{" "}
                  <strong className="text-foreground">"{deleteTarget?.name}"</strong>?
                  This action cannot be undone.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 flex items-center justify-end gap-2.5">
            <AlertDialogCancel className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer">
              {deleteTarget && (deleteTarget.post_count ?? 0) > 0 ? "Understood" : "Cancel"}
            </AlertDialogCancel>
            {deleteTarget && (deleteTarget.post_count ?? 0) === 0 && (
              <AlertDialogAction
                disabled={delMutation.isPending}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-red-700 disabled:opacity-50 transition-all cursor-pointer"
                onClick={() => deleteTarget && delMutation.mutate(deleteTarget.id)}
              >
                {delMutation.isPending ? "Deleting…" : "Delete Category"}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
