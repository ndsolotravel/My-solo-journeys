import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Radio,
  Plus,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  Flame,
  Search,
  Calendar,
  Clock,
  ExternalLink,
  Upload,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Layers,
  ArrowUpDown,
  Sparkles,
  Zap,
  Globe,
  Share2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminListNews,
  adminUpsertNews,
  adminDeleteNews,
  adminToggleNewsField,
  slugifyNews,
  type NewsItem,
} from "@/lib/news.functions";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/admin/news")({
  component: AdminNewsPage,
});

type NewsFilter = "all" | "breaking" | "published" | "draft" | "active" | "expired";

type NewsFormState = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  status: "draft" | "published";
  is_breaking: boolean;
  is_active: boolean;
  display_order: number;
  published_at: string;
  expires_at: string;
};

const toLocalDatetime = (isoDate?: string | null): string => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return "";
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
};

const fromLocalDatetime = (localDate?: string): string | null => {
  if (!localDate || !localDate.trim()) return null;
  const d = new Date(localDate);
  if (isNaN(d.getTime())) return null;
  return d.toISOString();
};

const getInitialFormState = (item?: NewsItem | null): NewsFormState => {
  if (!item) {
    return {
      title: "",
      slug: "",
      summary: "",
      content: "",
      image_url: "",
      status: "draft",
      is_breaking: true,
      is_active: true,
      display_order: 0,
      published_at: toLocalDatetime(new Date().toISOString()),
      expires_at: "",
    };
  }
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    summary: item.summary || "",
    content: item.content || "",
    image_url: item.image_url || "",
    status: item.status,
    is_breaking: item.is_breaking,
    is_active: item.is_active,
    display_order: item.display_order ?? 0,
    published_at: toLocalDatetime(item.published_at),
    expires_at: toLocalDatetime(item.expires_at),
  };
};

function NewsImagePreviewBox({
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
        <p className="text-xs font-medium text-muted-foreground">No featured image entered</p>
        <p className="text-[11px] text-muted-foreground/70 mt-0.5 max-w-xs">
          Enter an image URL or upload an image to display in the news card & banner.
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/5 py-7 text-center px-4 animate-in fade-in duration-200">
        <AlertTriangle className="h-7 w-7 text-amber-500 mb-2" />
        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
          Unable to load image. Please check the image link.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-black/40 p-2 min-h-[160px] max-h-56 flex items-center justify-center group animate-in fade-in duration-200">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-xs z-10">
          <Loader2 className="h-6 w-6 animate-spin text-[#FF7A00]" />
        </div>
      )}
      <img
        src={resolvedUrl}
        alt="News Featured Preview"
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
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3 right-3 rounded-full bg-background/90 p-1.5 text-muted-foreground shadow-md hover:bg-destructive hover:text-white transition-colors"
        title="Remove image"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function AdminNewsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListNews);
  const upsertFn = useServerFn(adminUpsertNews);
  const deleteFn = useServerFn(adminDeleteNews);
  const toggleFn = useServerFn(adminToggleNewsField);
  const uploadFn = useServerFn(adminUploadImage);

  const { data: newsItems, isLoading } = useQuery<NewsItem[]>({
    queryKey: ["admin-news"],
    queryFn: async () => await listFn(),
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<NewsFilter>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<NewsFormState>(getInitialFormState());
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [editorTab, setEditorTab] = useState<"edit" | "preview">("edit");
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);
  const [previewTarget, setPreviewTarget] = useState<NewsItem | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open modal for new item
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData(getInitialFormState());
    setIsSlugManual(false);
    setEditorTab("edit");
    setIsFormOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData(getInitialFormState(item));
    setIsSlugManual(true);
    setEditorTab("edit");
    setIsFormOpen(true);
  };

  // Mutations
  const upsertMutation = useMutation({
    mutationFn: async (payload: NewsFormState) => {
      const pubIso = fromLocalDatetime(payload.published_at) || new Date().toISOString();
      const expIso = fromLocalDatetime(payload.expires_at);

      return await upsertFn({
        data: {
          id: payload.id,
          title: payload.title,
          slug: payload.slug,
          summary: payload.summary || null,
          content: payload.content || "",
          image_url: payload.image_url || null,
          status: payload.status,
          is_breaking: payload.is_breaking,
          is_active: payload.is_active,
          display_order: Number(payload.display_order) || 0,
          published_at: pubIso,
          expires_at: expIso,
        },
      });
    },
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["admin-news"] });
      qc.invalidateQueries({ queryKey: ["breaking-news"] });
      toast.success(editingItem ? "News item updated successfully" : "News item created successfully");
      setIsFormOpen(false);
      setEditingItem(null);
    },
    onError: (e: Error) => {
      toast.error(e.message || "Failed to save news item");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteFn({ data: { id } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-news"] });
      qc.invalidateQueries({ queryKey: ["breaking-news"] });
      toast.success("News item deleted permanently");
      setDeleteTarget(null);
    },
    onError: (e: Error) => {
      toast.error(e.message || "Failed to delete news item");
      setDeleteTarget(null);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({
      id,
      field,
      value,
    }: {
      id: string;
      field: "status" | "is_breaking" | "is_active";
      value: boolean | "draft" | "published";
    }) => {
      return await toggleFn({ data: { id, field, value } });
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["admin-news"] });
      qc.invalidateQueries({ queryKey: ["breaking-news"] });
      const fieldNames = {
        status: "Publication status",
        is_breaking: "Breaking News setting",
        is_active: "Active status",
      };
      toast.success(`Updated ${fieldNames[vars.field]}`);
    },
    onError: (e: Error) => {
      toast.error(e.message || "Failed to update news status");
    },
  });

  // Handle title changes & auto-slug
  const handleTitleChange = (newTitle: string) => {
    setFormData((prev) => {
      const next = { ...prev, title: newTitle };
      if (!isSlugManual) {
        next.slug = slugifyNews(newTitle);
      }
      return next;
    });
  };

  // Image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image file size must be less than 8MB");
      return;
    }

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = (reader.result as string).split(",")[1];
          const res = await uploadFn({
            data: {
              filename: file.name,
              contentType: file.type,
              base64,
            },
          });
          if (res?.url) {
            setFormData((prev) => ({ ...prev, image_url: res.url }));
            toast.success("Image uploaded successfully");
          }
        } catch (err: any) {
          toast.error(err.message || "Failed to upload image");
        } finally {
          setUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingImage(false);
      toast.error("Error reading image file");
    }
  };

  // Metrics
  const metrics = useMemo(() => {
    const items = newsItems ?? [];
    const now = Date.now();

    const total = items.length;
    const breaking = items.filter(
      (n) =>
        n.is_breaking &&
        n.status === "published" &&
        n.is_active &&
        new Date(n.published_at).getTime() <= now &&
        (!n.expires_at || new Date(n.expires_at).getTime() >= now),
    ).length;
    const published = items.filter((n) => n.status === "published").length;
    const drafts = items.filter((n) => n.status === "draft").length;

    return { total, breaking, published, drafts };
  }, [newsItems]);

  // Filtered news items
  const filteredNews = useMemo(() => {
    if (!newsItems) return [];
    const now = Date.now();

    return newsItems.filter((item) => {
      // Status filter
      if (filter === "breaking" && !item.is_breaking) return false;
      if (filter === "published" && item.status !== "published") return false;
      if (filter === "draft" && item.status !== "draft") return false;
      if (filter === "active" && !item.is_active) return false;
      if (filter === "expired") {
        if (!item.expires_at || new Date(item.expires_at).getTime() > now) return false;
      }

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSummary = (item.summary || "").toLowerCase().includes(q);
        const matchSlug = item.slug.toLowerCase().includes(q);
        if (!matchTitle && !matchSummary && !matchSlug) return false;
      }

      return true;
    });
  }, [newsItems, filter, search]);

  const getExpiryBadge = (item: NewsItem) => {
    if (!item.expires_at) {
      return (
        <span className="text-[11px] text-muted-foreground">Never expires</span>
      );
    }
    const expTime = new Date(item.expires_at).getTime();
    const now = Date.now();
    const isExpired = expTime <= now;

    if (isExpired) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-600 dark:text-red-400">
          <AlertTriangle className="h-3 w-3" /> Expired
        </span>
      );
    }

    const diffHours = Math.round((expTime - now) / (1000 * 60 * 60));
    if (diffHours < 24) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
          <Clock className="h-3 w-3" /> Expires in {diffHours}h
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
        <Clock className="h-3 w-3" /> Expires {new Date(item.expires_at).toLocaleDateString()}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="sticky top-16 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">News Management</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage breaking dispatches, travel alerts, and homepage news bulletins
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#FF7A00]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> New News Item
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-background p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Total News</span>
            <Radio className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-bold">{metrics.total}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">All entries created</p>
        </div>

        <div className="rounded-2xl border border-[#FF7A00]/30 bg-[#FF7A00]/5 p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#FF7A00]">
            <span className="text-xs font-medium uppercase tracking-wider">Active Breaking</span>
            <Flame className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#FF7A00]">{metrics.breaking}</p>
          <p className="text-[11px] text-[#FF7A00]/80 mt-0.5">Live on homepage ticker</p>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-medium uppercase tracking-wider">Published</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.published}</p>
          <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">Published status</p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Drafts</span>
            <FileText className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-bold">{metrics.drafts}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Unpublished</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-muted/20 p-1">
          {(
            [
              { id: "all", label: "All" },
              { id: "breaking", label: "Breaking", icon: Flame },
              { id: "published", label: "Published" },
              { id: "draft", label: "Drafts" },
              { id: "active", label: "Active" },
              { id: "expired", label: "Expired" },
            ] as const
          ).map((tab) => {
            const Icon = "icon" in tab ? tab.icon : null;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as NewsFilter)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filter === tab.id
                    ? "bg-background text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {Icon && <Icon className="h-3 w-3 text-[#FF7A00]" />}
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search headline, summary, slug…"
            className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:border-[#FF7A00] transition-colors"
          />
        </div>
      </div>

      {/* News Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3.5">Headline & Summary</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5 text-center">Breaking</th>
                <th className="px-4 py-3.5 text-center">Active</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Publish & Expiry</th>
                <th className="px-4 py-3.5 hidden sm:table-cell text-center">Order</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[#FF7A00]" />
                    Loading news items…
                  </td>
                </tr>
              )}

              {filteredNews.map((item) => {
                const isPublished = item.status === "published";
                const isLive =
                  isPublished &&
                  item.is_active &&
                  item.is_breaking &&
                  new Date(item.published_at).getTime() <= Date.now() &&
                  (!item.expires_at || new Date(item.expires_at).getTime() >= Date.now());

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    {/* Headline & Summary */}
                    <td className="px-4 py-3.5 min-w-[240px] max-w-md">
                      <div className="flex items-start gap-3">
                        {item.image_url ? (
                          <img
                            src={resolveMediaUrl(item.image_url)}
                            alt=""
                            className="h-11 w-11 shrink-0 rounded-lg object-cover bg-muted"
                          />
                        ) : (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
                            <Radio className="h-5 w-5" />
                          </div>
                        )}
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-[#FF7A00] transition-colors">
                              {item.title}
                            </h3>
                            {isLive && (
                              <span className="flex h-2 w-2 relative shrink-0" title="Currently Live on Homepage Ticker">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                              </span>
                            )}
                          </div>
                          {item.summary && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {item.summary}
                            </p>
                          )}
                          <p className="text-[11px] text-muted-foreground/80 font-mono mt-0.5">
                            /news/{item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge & Toggle */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          toggleMutation.mutate({
                            id: item.id,
                            field: "status",
                            value: isPublished ? "draft" : "published",
                          })
                        }
                        title={isPublished ? "Click to set Draft" : "Click to Publish"}
                        className="inline-block transition-transform hover:scale-105"
                      >
                        {isPublished ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                            Draft
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Breaking News Toggle */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          toggleMutation.mutate({
                            id: item.id,
                            field: "is_breaking",
                            value: !item.is_breaking,
                          })
                        }
                        title={item.is_breaking ? "Breaking News Enabled (Click to disable)" : "Standard News (Click to enable Breaking)"}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all hover:scale-105 ${
                          item.is_breaking
                            ? "bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 shadow-xs"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Flame className={`h-3.5 w-3.5 ${item.is_breaking ? "text-[#FF7A00] fill-[#FF7A00]/40 animate-pulse" : ""}`} />
                        {item.is_breaking ? "Breaking" : "Standard"}
                      </button>
                    </td>

                    {/* Active Toggle */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          toggleMutation.mutate({
                            id: item.id,
                            field: "is_active",
                            value: !item.is_active,
                          })
                        }
                        title={item.is_active ? "Active (Click to deactivate)" : "Inactive (Click to activate)"}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all hover:scale-105 ${
                          item.is_active
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>

                    {/* Dates */}
                    <td className="px-4 py-3.5 hidden md:table-cell text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-foreground font-medium">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{new Date(item.published_at).toLocaleDateString()}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(item.published_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div>{getExpiryBadge(item)}</div>
                    </td>

                    {/* Order */}
                    <td className="px-4 py-3.5 hidden sm:table-cell text-center text-xs font-mono text-muted-foreground">
                      {item.display_order}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewTarget(item)}
                          title="Preview News"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit News"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-[#FF7A00] transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          title="Delete News"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!isLoading && filteredNews.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    {newsItems?.length === 0
                      ? "No news items yet. Click \"New News Item\" above to create your first dispatch."
                      : "No news items match your current search and filter criteria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CREATE / EDIT NEWS MODAL DIALOG                                           */}
      {/* ========================================================================= */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="font-display text-2xl font-bold">
                  {editingItem ? "Edit News Dispatch" : "Create News Dispatch"}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  Configure headline, summary, breaking status, scheduling, and expiry.
                </DialogDescription>
              </div>
              <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/30 p-1">
                <button
                  type="button"
                  onClick={() => setEditorTab("edit")}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    editorTab === "edit"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab("preview")}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    editorTab === "preview"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Live Preview
                </button>
              </div>
            </div>
          </DialogHeader>

          {editorTab === "edit" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!formData.title.trim()) {
                  toast.error("Please enter a headline");
                  return;
                }
                upsertMutation.mutate(formData);
              }}
              className="mt-6 space-y-6"
            >
              {/* Headline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Headline / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Karakoram Highway reopened after seasonal pass clearance..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium outline-none focus:border-[#FF7A00] transition-colors"
                />
              </div>

              {/* Slug */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    URL Slug
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSlugManual(false);
                      setFormData((p) => ({ ...p, slug: slugifyNews(p.title) }));
                    }}
                    className="text-[11px] text-[#FF7A00] hover:underline font-medium"
                  >
                    Reset from headline
                  </button>
                </div>
                <div className="flex items-center rounded-xl border border-border bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
                  <span className="text-xs text-muted-foreground mr-1">/news/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => {
                      setIsSlugManual(true);
                      setFormData((p) => ({ ...p, slug: slugifyNews(e.target.value) }));
                    }}
                    placeholder="auto-generated-slug"
                    className="w-full bg-transparent text-foreground outline-none font-mono text-xs"
                  />
                </div>
              </div>

              {/* Short Summary */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Short Description / Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData((p) => ({ ...p, summary: e.target.value }))}
                  placeholder="Brief 1-2 sentence overview shown in tickers, previews, and meta summaries..."
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-[#FF7A00] transition-colors resize-y"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Full News Content (Markdown Supported)
                </label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                  placeholder="Detailed news content, route updates, logistics, emergency contacts, or official advisories..."
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm font-mono outline-none focus:border-[#FF7A00] transition-colors resize-y"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Featured Image (Optional)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                    placeholder="Enter image URL (https://...) or upload below"
                    className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:border-[#FF7A00] transition-colors"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingImage}
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#FF7A00]" /> Uploading…
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-[#FF7A00]" /> Upload Image
                      </>
                    )}
                  </button>
                </div>
                <NewsImagePreviewBox
                  imageUrl={formData.image_url}
                  onRemove={() => setFormData((p) => ({ ...p, image_url: "" }))}
                />
              </div>

              {/* Status, Breaking, Active, Order Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl border border-border bg-muted/15">
                {/* Status */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as "draft" | "published" }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium outline-none focus:border-[#FF7A00]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Breaking News Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Breaking News
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, is_breaking: !p.is_breaking }))}
                    className={`w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                      formData.is_breaking
                        ? "border-[#FF7A00]/40 bg-[#FF7A00]/10 text-[#FF7A00]"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Flame className="h-4 w-4" /> {formData.is_breaking ? "Yes (Breaking)" : "No"}
                    </span>
                    <span className={`h-2 w-2 rounded-full ${formData.is_breaking ? "bg-[#FF7A00]" : "bg-muted-foreground"}`} />
                  </button>
                </div>

                {/* Active Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Active
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, is_active: !p.is_active }))}
                    className={`w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                      formData.is_active
                        ? "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <span>{formData.is_active ? "Yes (Active)" : "No (Inactive)"}</span>
                    <span className={`h-2 w-2 rounded-full ${formData.is_active ? "bg-blue-500" : "bg-muted-foreground"}`} />
                  </button>
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData((p) => ({ ...p, display_order: Number(e.target.value) || 0 }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-mono outline-none focus:border-[#FF7A00]"
                  />
                </div>
              </div>

              {/* Publication Date & Expiry Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Published At */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Publication Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.published_at}
                    onChange={(e) => setFormData((p) => ({ ...p, published_at: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[#FF7A00]"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Set a future date to schedule publication automatically.
                  </p>
                </div>

                {/* Expires At */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Expiry Date & Time (Optional)
                    </label>
                    {formData.expires_at && (
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, expires_at: "" }))}
                        className="text-[11px] text-red-500 hover:underline"
                      >
                        Clear Expiry
                      </button>
                    )}
                  </div>
                  <input
                    type="datetime-local"
                    value={formData.expires_at}
                    onChange={(e) => setFormData((p) => ({ ...p, expires_at: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[#FF7A00]"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    News will automatically hide from the homepage after this date.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 pt-3 pb-3 px-6 sm:px-8 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 border-t border-border bg-card/95 backdrop-blur-md shadow-xs">
                <button
                  type="button"
                  disabled={upsertMutation.isPending}
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={upsertMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#FF7A00]/90 transition-all disabled:opacity-50"
                >
                  {upsertMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                    </>
                  ) : editingItem ? (
                    "Save Changes"
                  ) : (
                    "Create News Item"
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Live Preview Tab */
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-border bg-muted/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Homepage Continuous Running Ticker Preview
                </p>
                {/* Mock Breaking News Running Marquee Ticker */}
                <div className="ticker-container relative flex h-10 sm:h-11 w-full items-center overflow-hidden rounded-xl border border-red-500/30 bg-black/80 backdrop-blur-xl shadow-lg">
                  {/* Left Pinned Badge */}
                  <div className="relative z-20 flex shrink-0 items-center gap-2 bg-gradient-to-r from-red-600 via-red-600 to-red-700 px-3 sm:px-4 py-1.5 text-[11px] font-black tracking-wider text-white uppercase shadow-md rounded-l-[11px]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 fill-white" />
                      <span>BREAKING NEWS</span>
                    </span>
                  </div>

                  {/* Left transition shadow */}
                  <div className="pointer-events-none absolute left-[140px] inset-y-0 w-8 bg-gradient-to-r from-black/80 to-transparent z-10" />

                  {/* Running Marquee Track */}
                  <div className="relative flex-1 overflow-hidden h-full flex items-center select-none">
                    <div className="animate-ticker flex items-center shrink-0">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center">
                          <span className="font-display text-xs sm:text-sm font-medium text-neutral-100 tracking-normal">
                            {formData.title || "Headline preview appears here..."}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans text-neutral-400 ml-2">
                            <Clock className="h-3 w-3 text-neutral-500" />
                            {formData.published_at
                              ? new Date(formData.published_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                              : "Just now"}
                          </span>
                          <span className="mx-5 inline-flex items-center gap-1 text-red-500/80 font-bold select-none opacity-80">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse"></span>
                            <span className="text-xs text-red-400/90 font-mono">//</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full News Card Preview */}
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FF7A00]/10 px-2.5 py-0.5 font-bold text-[#FF7A00]">
                    <Flame className="h-3 w-3" /> OFFICIAL DISPATCH
                  </span>
                  <span>·</span>
                  <span>{formData.published_at ? new Date(formData.published_at).toLocaleDateString() : "Today"}</span>
                </div>

                <h2 className="font-display text-2xl font-bold leading-tight">
                  {formData.title || "Untitled Headline"}
                </h2>

                {formData.summary && (
                  <p className="text-base text-muted-foreground leading-relaxed italic border-l-2 border-[#FF7A00] pl-3">
                    {formData.summary}
                  </p>
                )}

                {formData.image_url && (
                  <div className="overflow-hidden rounded-2xl border border-border max-h-72">
                    <img
                      src={resolveMediaUrl(formData.image_url)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {formData.content && (
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm text-foreground/90">
                    {formData.content}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setEditorTab("edit")}
                  className="rounded-full bg-foreground px-6 py-2 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
                >
                  Back to Editor
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* QUICK PREVIEW DIALOG FOR TABLE ROWS                                       */}
      {/* ========================================================================= */}
      <Dialog open={!!previewTarget} onOpenChange={(open) => !open && setPreviewTarget(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          {previewTarget && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FF7A00]/15 px-2.5 py-0.5 font-bold text-[#FF7A00]">
                  <Flame className="h-3.5 w-3.5 fill-[#FF7A00]/30" /> DISPATCH
                </span>
                <span>·</span>
                <span>{new Date(previewTarget.published_at).toLocaleDateString()}</span>
                <span>{new Date(previewTarget.published_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>

              <h2 className="font-display text-2xl font-bold leading-tight">
                {previewTarget.title}
              </h2>

              {previewTarget.summary && (
                <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-[#FF7A00] pl-3">
                  {previewTarget.summary}
                </p>
              )}

              {previewTarget.image_url && (
                <div className="overflow-hidden rounded-2xl border border-border max-h-72">
                  <img
                    src={resolveMediaUrl(previewTarget.image_url)}
                    alt={previewTarget.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {previewTarget.content && (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm text-foreground/90 pt-2">
                  {previewTarget.content}
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-border text-xs text-muted-foreground">
                <div className="space-y-0.5">
                  <p>Status: <span className="font-semibold text-foreground uppercase">{previewTarget.status}</span></p>
                  <p>URL: <span className="font-mono">/news/{previewTarget.slug}</span></p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/news/$slug"
                    params={{ slug: previewTarget.slug }}
                    target="_blank"
                    className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
                  >
                    Open Public Page <ExternalLink className="h-3 w-3" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      const item = previewTarget;
                      setPreviewTarget(null);
                      handleOpenEdit(item);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#FF7A00] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#FF7A00]/90 transition-colors"
                  >
                    Edit Item
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION ALERT DIALOG                                          */}
      {/* ========================================================================= */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && !deleteMutation.isPending && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete news dispatch?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-foreground">"{deleteTarget?.title}"</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center gap-2"
              disabled={deleteMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                if (deleteTarget && !deleteMutation.isPending) {
                  deleteMutation.mutate(deleteTarget.id);
                }
              }}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Deleting…
                </>
              ) : (
                "Delete News"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
