import { useState, useMemo, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Search,
  FileImage,
  Layers,
  Sparkles,
  Save,
  CheckCircle2,
  Pencil,
  MapPin,
  Calendar,
  Camera,
  RotateCcw,
  AlertTriangle,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { adminUploadImage } from "@/lib/admin.functions";
import {
  adminListPhotoArchiveEditor,
  adminSavePhotoArchive,
  type PhotoCategory,
} from "@/lib/photo-archive.functions";
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
import { HeroBannerManager } from "@/components/admin/HeroBannerManager";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: AdminGalleryPage,
});

type DraftPhoto = {
  id: string;
  slug?: string;
  title: string;
  image_url: string;
  location: string;
  captured_at: string | null;
  story: string;
  camera: string;
  alt_text: string;
  category_ids: string[];
  sort_order: number;
  published: boolean;
};

type ServerPhoto = {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  location: string | null;
  captured_at: string | null;
  story: string | null;
  camera: string | null;
  alt_text: string;
  category_ids: string[];
  sort_order: number;
  published: boolean;
};

function toDraft(p: ServerPhoto): DraftPhoto {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    image_url: p.image_url,
    location: p.location ?? "",
    captured_at: p.captured_at,
    story: p.story ?? "",
    camera: p.camera ?? "",
    alt_text: p.alt_text,
    category_ids: p.category_ids,
    sort_order: p.sort_order,
    published: p.published,
  };
}

function AdminGalleryPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListPhotoArchiveEditor);
  const saveFn = useServerFn(adminSavePhotoArchive);
  const uploadFn = useServerFn(adminUploadImage);

  const { data, isLoading } = useQuery<{ photos: ServerPhoto[]; categories: PhotoCategory[] }>({
    queryKey: ["admin-photo-archive"],
    queryFn: async () => (await listFn()) as { photos: ServerPhoto[]; categories: PhotoCategory[] },
  });

  const [drafts, setDrafts] = useState<DraftPhoto[] | null>(null);
  const [resetSnapshot, setResetSnapshot] = useState<string | null>(null);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const [filterCat, setFilterCat] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [search, setSearch] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const [editing, setEditing] = useState<DraftPhoto | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [validationErrorIds, setValidationErrorIds] = useState<Set<string>>(new Set());

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(
    null,
  );
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newIdRef = useRef(0);

  const categories = data?.categories ?? [];
  const catBySlug = useMemo(() => new Map(categories.map((c) => [c.slug, c])), [categories]);
  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);

  const initializeFromServer = (photos: ServerPhoto[]) => {
    const next = photos.map(toDraft);
    setDrafts(next);
    setResetSnapshot(JSON.stringify({ photos: next, deletedIds: [] }));
    setDeletedIds([]);
    setValidationErrorIds(new Set());
  };

  useEffect(() => {
    if (data && drafts === null) initializeFromServer(data.photos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const isDirty = useMemo(() => {
    if (!drafts || resetSnapshot === null) return false;
    return JSON.stringify({ photos: drafts, deletedIds }) !== resetSnapshot;
  }, [drafts, deletedIds, resetSnapshot]);

  const pendingNewCount = drafts?.filter((d) => d.id.startsWith("new-")).length ?? 0;
  const draftCount = drafts?.filter((d) => !d.published).length ?? 0;

  const displayed = useMemo(() => {
    if (!drafts) return [];
    let list = drafts;
    if (filterCat !== "all") {
      const wantId = catBySlug.get(filterCat)?.id;
      if (wantId) list = list.filter((d) => d.category_ids.includes(wantId));
    }
    if (statusFilter === "published") list = list.filter((d) => d.published);
    if (statusFilter === "draft") list = list.filter((d) => !d.published);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((d) =>
        [d.title, d.location, d.story, d.alt_text, d.captured_at]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(q)),
      );
    }
    return [...list].sort((a, b) => a.sort_order - b.sort_order);
  }, [drafts, filterCat, statusFilter, search, catBySlug]);

  const addDraft = (image_url: string, publish: boolean = true): DraftPhoto => ({
    id: `new-${++newIdRef.current}`,
    title: "",
    image_url,
    location: "",
    captured_at: null,
    story: "",
    camera: "",
    alt_text: "",
    category_ids: [],
    sort_order: drafts?.length ?? 0,
    published: publish,
  });

  function openEditor(d: DraftPhoto) {
    setEditing({ ...d });
  }

  function closeEditor() {
    setEditing(null);
  }

  function applyEdit() {
    if (!editing) return;
    setDrafts((prev) => prev?.map((p) => (p.id === editing.id ? { ...editing } : p)) ?? [editing]);
    closeEditor();
  }

  function updateEdit(patch: Partial<DraftPhoto>) {
    setEditing((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  function toggleCategory(categoryId: string) {
    setEditing((prev) => {
      if (!prev) return prev;
      const has = prev.category_ids.includes(categoryId);
      return {
        ...prev,
        category_ids: has
          ? prev.category_ids.filter((id) => id !== categoryId)
          : [...prev.category_ids, categoryId],
      };
    });
  }

  function movePhoto(id: string, dir: -1 | 1) {
    setDrafts((prev) => {
      if (!prev) return prev;
      const idx = prev.findIndex((d) => d.id === id);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next.map((d, i) => ({ ...d, sort_order: i }));
    });
  }

  async function handleUploadFiles(files: FileList | File[]) {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
    const maxBytes = 8 * 1024 * 1024;

    const validFiles: File[] = [];
    for (const f of fileArray) {
      const type = f.type.toLowerCase();
      if (!allowedTypes.includes(type) && !type.startsWith("image/")) {
        toast.error(`"${f.name}" is not a supported format (JPG, PNG, WebP, AVIF).`);
        continue;
      }
      if (f.size > maxBytes) {
        toast.error(`"${f.name}" exceeds the 8 MB size limit.`);
        continue;
      }
      validFiles.push(f);
    }
    if (validFiles.length === 0) return;

    setUploading(true);
    let successCount = 0;
    let firstNew: DraftPhoto | null = null;

    try {
      const newRecs: DraftPhoto[] = [];
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadProgress({ current: i + 1, total: validFiles.length });
        const buf = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        const { url } = await uploadFn({
          data: { filename: file.name, contentType: file.type, base64 },
        });
        const rec = addDraft(url);
        newRecs.push(rec);
        if (!firstNew) firstNew = rec;
        successCount++;
      }
      setDrafts((prev) => [...(prev ?? []), ...newRecs]);
      toast.success(
        `Uploaded ${successCount} photograph${successCount > 1 ? "s" : ""} — add a title and alt text before saving.`,
      );
      if (firstNew) openEditor(firstNew);
    } catch (e) {
      toast.error(`Upload failed: ${(e as Error).message}`);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleAddUrl() {
    if (!urlInput.trim()) return;
    const rec = addDraft(urlInput.trim());
    setDrafts((prev) => [...(prev ?? []), rec]);
    setUrlInput("");
    openEditor(rec);
  }

  function confirmDelete() {
    if (!deleteTargetId) return;
    const target = drafts?.find((d) => d.id === deleteTargetId);
    if (!target) {
      setDeleteTargetId(null);
      return;
    }
    setDrafts((prev) => prev?.filter((p) => p.id !== deleteTargetId) ?? []);
    if (!target.id.startsWith("new-")) {
      setDeletedIds((prev) => (prev.includes(target.id) ? prev : [...prev, target.id]));
    }
    if (lightboxIndex !== null) setLightboxIndex(null);
    setValidationErrorIds((prev) => {
      const next = new Set(prev);
      next.delete(deleteTargetId);
      return next;
    });
    setDeleteTargetId(null);
    toast.info("Photograph staged for removal — save to apply.");
  }

  function handleReset() {
    if (resetSnapshot === null) return;
    const parsed = JSON.parse(resetSnapshot) as { photos: DraftPhoto[] };
    setDrafts(parsed.photos.map((p) => ({ ...p })));
    setDeletedIds([]);
    setValidationErrorIds(new Set());
    setEditing(null);
    toast.info("Unsaved changes discarded.");
  }

  function validateDrafts(): boolean {
    if (!drafts) return false;
    const errors = new Set<string>();
    for (const d of drafts) {
      if (!d.title.trim() || !d.alt_text.trim()) errors.add(d.id);
    }
    setValidationErrorIds(errors);
    if (errors.size > 0) {
      toast.error(
        `${errors.size} photograph${errors.size > 1 ? "s" : ""} still need a title & alt text.`,
      );
      return false;
    }
    return true;
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        photos: (drafts ?? []).map((d) => ({
          id: d.id.startsWith("new-") ? undefined : d.id,
          title: d.title,
          image_url: d.image_url,
          location: d.location || null,
          captured_at: d.captured_at,
          story: d.story || null,
          camera: d.camera || null,
          alt_text: d.alt_text,
          category_ids: d.category_ids,
          sort_order: d.sort_order,
          published: d.published,
        })),
        deletedIds,
      };
      const res = await saveFn({ data: payload });
      return res;
    },
    onSuccess: async () => {
      toast.success("Photography archive saved.");
      const fresh = (await listFn()) as { photos: ServerPhoto[]; categories: PhotoCategory[] };
      initializeFromServer(fresh.photos);
      qc.invalidateQueries({ queryKey: ["admin-photo-archive"] });
      qc.invalidateQueries({ queryKey: ["photo-archive"] });
      qc.invalidateQueries({ queryKey: ["gallery"] });
      qc.invalidateQueries({ queryKey: ["page-hero"] });
    },
    onError: (e) => toast.error(`Save failed: ${(e as Error).message}`),
  });

  function handleSave() {
    if (!validateDrafts()) return;
    saveMutation.mutate();
  }

  const incompleteIds = useMemo(() => {
    const set = new Set(validationErrorIds);
    for (const d of drafts ?? []) {
      if (!d.title.trim() || !d.alt_text.trim()) set.add(d.id);
    }
    return set;
  }, [drafts, validationErrorIds]);

  const activeLightboxItem = lightboxIndex !== null ? displayed[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && displayed.length > 1) {
        setLightboxIndex((curr) =>
          curr !== null ? (curr - 1 + displayed.length) % displayed.length : null,
        );
      } else if (e.key === "ArrowRight" && displayed.length > 1) {
        setLightboxIndex((curr) => (curr !== null ? (curr + 1) % displayed.length : null));
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, displayed.length]);

  const editingPreviewInvalid = editing ? !editing.title.trim() || !editing.alt_text.trim() : false;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      {/* Header bar — sticky action bar */}
      <div className="sticky top-16 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <ImageIcon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Photography Archive</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Curate the public gallery — titles, locations, camera details, stories, and
              categories.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {isDirty && (
            <>
              <button
                type="button"
                onClick={handleReset}
                disabled={saveMutation.isPending}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="h-3.5 w-3.5 text-accent" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Saving…</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </>
          )}
          {!isDirty && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 text-xs font-semibold text-emerald-600 shadow-2xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Up to date</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Uploading…</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Photographs</span>
              </>
            )}
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => e.target.files && handleUploadFiles(e.target.files)}
      />

      <HeroBannerManager
        page="gallery"
        autoHint="Automatically uses a curated photograph from the archive."
        manualHint="Pick an archive photograph below, upload one, or paste a URL."
        optionsLabel="Archive Photographs"
      />

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Total Photographs
            </p>
            <ImageIcon className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold">
            {isLoading ? "—" : (drafts?.length ?? 0).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Curated frames in the archive</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Categories</p>
            <Layers className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold">{categories.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">Mountains, motorcycles, roads & more</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Pending Work</p>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold">
            {pendingNewCount + draftCount + deletedIds.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            New, hidden, or staged-for-removal photographs
          </p>
        </div>
      </div>

      {/* Unsaved changes banner */}
      {isDirty && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3.5 shadow-xs animate-fade-in">
          <div className="flex items-center gap-2.5 text-amber-700">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-xs font-medium">
              {pendingNewCount > 0 && `${pendingNewCount} new · `}
              {draftCount > 0 && `${draftCount} hidden · `}
              {deletedIds.length > 0 &&
                `${deletedIds.length} staged deletion${deletedIds.length > 1 ? "s" : ""}`.replace(
                  /^· $/,
                  "",
                )}{" "}
              — not yet on the public site.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" /> Publish Now
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterCat("all")}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterCat === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-accent hover:text-accent"
            }`}
          >
            All
            <span className="text-muted-foreground">{(drafts?.length ?? 0).toLocaleString()}</span>
          </button>
          {categories.map((cat) => {
            const count =
              drafts?.filter((d) => d.category_ids.includes(cat.id)).length ?? cat.photo_count;
            const active = filterCat === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCat(active ? "all" : cat.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {cat.name}
                <span className={active ? "text-background/60" : "text-muted-foreground"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-2xs">
            {(["all", "published", "draft"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setStatusFilter(mode)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  statusFilter === mode
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === "all" ? "All" : mode === "published" ? "Public" : "Hidden"}
              </button>
            ))}
          </div>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search titles, locations, stories…"
              className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Upload area */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h3 className="font-display text-base font-semibold flex items-center gap-2 text-foreground">
              <Upload className="h-5 w-5 text-accent" />
              <span>Add photographs to the archive</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Uploads are staged as drafts — every photograph needs a title and alt text before it
              can be published.
            </p>
          </div>
          {isDirty && pendingNewCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent border border-accent/20">
              {pendingNewCount} new draft{pendingNewCount > 1 ? "s" : ""} waiting
            </span>
          )}
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDropzoneActive(true);
          }}
          onDragLeave={() => setIsDropzoneActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDropzoneActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              handleUploadFiles(e.dataTransfer.files);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${
            isDropzoneActive
              ? "border-accent bg-accent/10 text-accent scale-[1.01]"
              : "border-border bg-background hover:border-accent hover:bg-accent/5 text-muted-foreground hover:text-foreground"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="h-7 w-7 animate-spin text-accent" />
              <p className="text-sm font-medium text-foreground">
                Uploading photograph {uploadProgress?.current ?? 1} of {uploadProgress?.total ?? 1}…
              </p>
              <p className="text-xs text-muted-foreground">Processing into Supabase Storage…</p>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-muted/60 p-3 text-foreground group-hover:bg-accent/15 group-hover:text-accent transition-colors">
                <FileImage className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">
                  Drag & drop photographs here, or{" "}
                  <span className="text-accent underline underline-offset-2">browse computer</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, WebP, AVIF up to 8 MB each · Select multiple files at once
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="…or paste direct image web URL (https://…)"
            className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <Plus className="h-3.5 w-3.5 text-accent" /> Add URL
          </button>
        </div>
      </div>

      {/* Archive grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {displayed.length} {displayed.length === 1 ? "photograph" : "photographs"}
            {isDirty && deletedIds.length > 0 && ` · ${deletedIds.length} staged for removal`}
          </span>
        </div>

        {displayed.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {displayed.map((item, idx) => {
              const incomplete = incompleteIds.has(item.id);
              return (
                <div
                  key={item.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card transition-all select-none shadow-xs ${
                    incomplete
                      ? "border-amber-400 ring-2 ring-amber-400/30"
                      : "border-border hover:border-accent/60 hover:shadow-md"
                  }`}
                >
                  <div className="relative aspect-4/3 w-full bg-muted/40 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.alt_text || item.title || `Photograph ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute left-2 top-2 z-10 flex items-center gap-1">
                      <span className="rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                        #{item.sort_order + 1}
                      </span>
                    </div>

                    <div className="absolute right-2 top-2 z-10 flex items-center gap-1">
                      {!item.published && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-200 shadow-xs backdrop-blur-xs">
                          <EyeOff className="h-3 w-3" /> Hidden
                        </span>
                      )}
                      {item.id.startsWith("new-") && (
                        <span className="rounded-md bg-accent/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                          NEW
                        </span>
                      )}
                    </div>

                    {incomplete && (
                      <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-amber-500/95 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                        Needs title & alt text
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                      <button
                        type="button"
                        title="Inspect / Preview"
                        onClick={() => setLightboxIndex(idx)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white transition-transform hover:scale-110 shadow-md cursor-pointer"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Edit metadata"
                        onClick={() => openEditor(item)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white transition-transform hover:scale-110 shadow-md cursor-pointer"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Move earlier"
                        disabled={idx === 0}
                        onClick={() => movePhoto(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Move later"
                        disabled={idx === displayed.length - 1}
                        onClick={() => movePhoto(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Remove from archive"
                        onClick={() => setDeleteTargetId(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-transform hover:scale-110 shadow-md cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 bg-card border-t border-border space-y-1.5">
                    {item.category_ids.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.category_ids.slice(0, 2).map((cid) => {
                          const cat = catById.get(cid);
                          return (
                            cat && (
                              <span
                                key={cid}
                                className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
                              >
                                {cat.name}
                              </span>
                            )
                          );
                        })}
                        {item.category_ids.length > 2 && (
                          <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            +{item.category_ids.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    <p
                      className="text-[11px] font-semibold text-foreground truncate"
                      title={item.title}
                    >
                      {item.title || <span className="italic text-muted-foreground">Untitled</span>}
                    </p>
                    {(item.location || item.captured_at || item.camera) && (
                      <p className="flex items-center gap-1 text-[10px] text-muted-foreground truncate">
                        {item.location && (
                          <>
                            <MapPin className="h-2.5 w-2.5 shrink-0 text-accent" />
                            <span className="truncate">{item.location}</span>
                          </>
                        )}
                        {item.captured_at && (
                          <>
                            <span className="opacity-50">·</span>
                            <span>{item.captured_at.slice(0, 4)}</span>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-12 text-center text-xs text-muted-foreground bg-card shadow-xs">
            <div className="p-3 rounded-2xl bg-brand/10 text-brand mx-auto mb-3 w-fit">
              <ImageIcon className="h-6 w-6 text-accent" />
            </div>
            <p className="font-medium text-foreground text-sm">No photographs found.</p>
            <p className="mt-1">
              Try a different filter or upload photographs using the area above.
            </p>
          </div>
        )}
      </div>

      {/* Save bar — sticky bottom */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {isDirty ? (
              <>
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                <span>
                  Unsaved changes
                  {pendingNewCount > 0 && ` · ${pendingNewCount} new`}
                  {draftCount > 0 && ` · ${draftCount} hidden`}
                  {deletedIds.length > 0 && ` · ${deletedIds.length} to delete`}
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>All changes are live on the archive</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            {isDirty && (
              <button
                type="button"
                onClick={handleReset}
                disabled={saveMutation.isPending}
                className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer disabled:opacity-50"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saveMutation.isPending || !isDirty}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-semibold transition-all ${
                saveMutation.isPending || !isDirty
                  ? "opacity-50 cursor-not-allowed bg-brand/70 text-white"
                  : "bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand/90 cursor-pointer"
              }`}
            >
              {saveMutation.isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Saving…</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTargetId}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent className="rounded-3xl border border-border bg-card shadow-2xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-lg font-bold text-foreground">
              Remove photograph from the archive?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground mt-1">
              The photograph will be removed from the public gallery and its image file cleaned up
              from Supabase Storage. Deletions are staged until you press{" "}
              <span className="font-semibold text-foreground">Save Changes</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 flex items-center justify-end gap-2.5">
            <AlertDialogCancel className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-red-700 transition-all cursor-pointer"
              onClick={confirmDelete}
            >
              Remove Photograph
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Editor Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto"
          onClick={closeEditor}
        >
          <div
            className="w-full max-w-4xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editing.id.startsWith("new-") ? "New Photograph" : "Photograph Details"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Title and alt text are required before this can be published.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={closeEditor}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <div>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-muted">
                  <img
                    src={editing.image_url}
                    alt={editing.title || "Photograph preview"}
                    className="h-full w-full object-cover"
                  />
                  {editing.id.startsWith("new-") && (
                    <span className="absolute left-2 top-2 rounded-md bg-accent/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                      NEW — not published yet
                    </span>
                  )}
                </div>

                {/* Categories */}
                <div className="mt-4">
                  <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-foreground">
                    <Layers className="h-3.5 w-3.5 text-accent" /> Categories (select all that
                    apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const active = editing.category_ids.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                            active
                              ? "border-accent bg-accent/15 text-accent"
                              : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`flex h-3 w-3 items-center justify-center rounded-full border text-[8px] ${
                              active ? "border-accent bg-accent text-white" : "border-border"
                            }`}
                          >
                            {active ? "✓" : ""}
                          </span>
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Published toggle */}
                <label className="mt-4 inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-foreground">
                  <input
                    type="checkbox"
                    checked={editing.published}
                    onChange={(e) => updateEdit({ published: e.target.checked })}
                    className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span>Published on the public gallery</span>
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-foreground">
                    <span className="inline-flex items-center gap-1">
                      Title <span className="text-red-500">*</span>
                    </span>
                    {editing.title && (
                      <Link
                        to="/gallery/$slug"
                        params={{ slug: editing.slug ?? "" }}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> View live
                      </Link>
                    )}
                  </label>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) => updateEdit({ title: e.target.value })}
                    placeholder="e.g. Morning light on Nanga Parbat"
                    className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors ${
                      !editing.title.trim()
                        ? "border-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                        : "border-border focus:border-accent focus:ring-1 focus:ring-accent"
                    }`}
                  />
                  {!editing.title.trim() && (
                    <p className="mt-1 text-[11px] text-amber-600">A title is required.</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Alt text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editing.alt_text}
                    onChange={(e) => updateEdit({ alt_text: e.target.value })}
                    placeholder="Describe the photograph for screen readers and search engines"
                    className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors ${
                      !editing.alt_text.trim()
                        ? "border-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                        : "border-border focus:border-accent focus:ring-1 focus:ring-accent"
                    }`}
                  />
                  {!editing.alt_text.trim() && (
                    <p className="mt-1 text-[11px] text-amber-600">Alt text is required.</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-foreground">
                      <MapPin className="h-3 w-3 text-accent" /> Location
                    </label>
                    <input
                      type="text"
                      value={editing.location}
                      onChange={(e) => updateEdit({ location: e.target.value })}
                      placeholder="e.g. Rakaposhi viewpoint, Karakoram"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-foreground">
                      <Calendar className="h-3 w-3 text-accent" /> Date taken
                    </label>
                    <input
                      type="date"
                      value={editing.captured_at ?? ""}
                      onChange={(e) => updateEdit({ captured_at: e.target.value || null })}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-foreground">
                    <Camera className="h-3 w-3 text-accent" /> Camera & settings
                  </label>
                  <input
                    type="text"
                    value={editing.camera}
                    onChange={(e) => updateEdit({ camera: e.target.value })}
                    placeholder="e.g. Sony A7III · 70-200mm f/4 · 1/500s"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    The story behind this frame
                  </label>
                  <textarea
                    rows={5}
                    value={editing.story}
                    onChange={(e) => updateEdit({ story: e.target.value })}
                    placeholder="The cold at sunrise, the long approach, why this frame matters…"
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors leading-relaxed resize-y"
                  />
                </div>
              </div>
            </div>

            {editingPreviewInvalid && (
              <div className="mx-6 mb-4 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                <p className="text-xs font-medium text-amber-700">
                  This photograph is incomplete — save will be blocked until title and alt text are
                  filled in.
                </p>
              </div>
            )}

            <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-3.5 shrink-0 bg-card/95 backdrop-blur-md shadow-xs">
              <button
                type="button"
                onClick={() => setDeleteTargetId(editing.id)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />{" "}
                {editing.id.startsWith("new-") ? "Discard" : "Delete"}
              </button>
              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={applyEdit}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Save Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal Preview */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-all duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-50 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg">
              Photograph {lightboxIndex + 1} of {displayed.length}
            </span>
            {!activeLightboxItem.published && (
              <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs text-zinc-300 border border-white/10 backdrop-blur-md">
                Hidden
              </span>
            )}
          </div>

          <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openEditor(activeLightboxItem);
                setLightboxIndex(null);
              }}
              className="flex h-10 px-3 items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-900 text-xs font-medium shadow-lg transition-all cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md hover:bg-black transition-all hover:scale-105 cursor-pointer shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex max-h-[82vh] max-w-[min(1200px,92vw)] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxItem.image_url}
              alt={activeLightboxItem.alt_text || activeLightboxItem.title || "Archived photograph"}
              className="max-h-[62vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />

            {displayed.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photograph"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((curr) =>
                      curr !== null ? (curr - 1 + displayed.length) % displayed.length : null,
                    );
                  }}
                  className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next photograph"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((curr) =>
                      curr !== null ? (curr + 1) % displayed.length : null,
                    );
                  }}
                  className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div
            className="absolute bottom-4 sm:bottom-6 inset-x-4 max-w-lg mx-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl bg-black/80 p-4 border border-white/20 backdrop-blur-md shadow-xl">
              <p className="text-sm font-semibold text-white">
                {activeLightboxItem.title || "Untitled"}
              </p>
              {(activeLightboxItem.location ||
                activeLightboxItem.captured_at ||
                activeLightboxItem.camera) && (
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/70">
                  {activeLightboxItem.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {activeLightboxItem.location}
                    </span>
                  )}
                  {activeLightboxItem.captured_at && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {activeLightboxItem.captured_at}
                    </span>
                  )}
                  {activeLightboxItem.camera && (
                    <span className="inline-flex items-center gap-1">
                      <Camera className="h-3 w-3" /> {activeLightboxItem.camera}
                    </span>
                  )}
                </p>
              )}
              {activeLightboxItem.story && (
                <p className="mt-2 border-t border-white/10 pt-2 text-xs leading-relaxed text-white/60 line-clamp-3">
                  {activeLightboxItem.story}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
