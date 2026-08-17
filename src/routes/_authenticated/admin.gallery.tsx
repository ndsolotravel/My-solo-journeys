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
  GripVertical,
  Loader2,
  Search,
  ExternalLink,
  FileImage,
  Layers,
  Sparkles,
  Save,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminListGalleries,
  adminSavePostGallery,
  adminDeleteGalleryImage,
  adminUploadImage,
} from "@/lib/admin.functions";
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

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: AdminGalleryPage,
});

type GalleryItem = {
  id?: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  post_id?: string;
  post_title?: string;
  post_slug?: string;
};

type PostWithGallery = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  published: boolean;
  gallery: GalleryItem[];
  galleryCount: number;
};

function AdminGalleryPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListGalleries);
  const saveGalleryFn = useServerFn(adminSavePostGallery);
  const delImageFn = useServerFn(adminDeleteGalleryImage);
  const uploadFn = useServerFn(adminUploadImage);

  const { data: posts, isLoading } = useQuery<PostWithGallery[]>({
    queryKey: ["admin-galleries"],
    queryFn: async () => (await listFn()) as PostWithGallery[],
  });

  const [selectedPostId, setSelectedPostId] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);

  // Reordering drag state
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Deletion confirmation state
  const [deleteTarget, setDeleteTarget] = useState<{ item: GalleryItem; postId: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Currently active post if one is selected
  const activePost = useMemo(() => {
    if (!posts || selectedPostId === "all") return null;
    return posts.find((p) => p.id === selectedPostId) ?? null;
  }, [posts, selectedPostId]);

  // Overall Statistics
  const stats = useMemo(() => {
    if (!posts) return { totalPhotos: 0, postsWithGallery: 0, totalPosts: 0 };
    const totalPhotos = posts.reduce((sum, p) => sum + (p.galleryCount || 0), 0);
    const postsWithGallery = posts.filter((p) => (p.galleryCount || 0) > 0).length;
    return {
      totalPhotos,
      postsWithGallery,
      totalPosts: posts.length,
    };
  }, [posts]);

  // Active gallery items list based on selection and search
  const displayedItems = useMemo(() => {
    if (!posts) return [];

    let items: GalleryItem[] = [];

    if (activePost) {
      items = activePost.gallery.map((g, idx) => ({
        ...g,
        sort_order: g.sort_order ?? idx,
        post_id: activePost.id,
        post_title: activePost.title,
        post_slug: activePost.slug,
      }));
    } else {
      // All posts combined
      posts.forEach((p) => {
        (p.gallery || []).forEach((g, idx) => {
          items.push({
            ...g,
            sort_order: g.sort_order ?? idx,
            post_id: p.id,
            post_title: p.title,
            post_slug: p.slug,
          });
        });
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.alt_text?.toLowerCase().includes(q) ||
          item.post_title?.toLowerCase().includes(q) ||
          item.post_slug?.toLowerCase().includes(q),
      );
    }

    return items;
  }, [posts, activePost, search]);

  // Multi-file uploader
  async function handleUploadFiles(files: FileList | File[]) {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    // Determine target post
    let targetPostId = selectedPostId;
    if (targetPostId === "all") {
      if (!posts || posts.length === 0) {
        toast.error("Please create a blog post first before uploading gallery pictures.");
        return;
      }
      targetPostId = posts[0].id;
      setSelectedPostId(targetPostId);
    }

    const currentPost = posts?.find((p) => p.id === targetPostId);
    if (!currentPost) {
      toast.error("Target post not found.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
    const maxBytes = 8 * 1024 * 1024; // 8 MB

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

    try {
      const newItems: GalleryItem[] = [...currentPost.gallery];

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadProgress({ current: i + 1, total: validFiles.length });
        const buf = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        const { url } = await uploadFn({
          data: { filename: file.name, contentType: file.type, base64 },
        });

        newItems.push({
          image_url: url,
          alt_text: "",
          sort_order: newItems.length,
          post_id: targetPostId,
        });
        successCount++;
      }

      // Persist to database
      await saveGalleryFn({
        data: {
          postId: targetPostId,
          gallery: newItems.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx,
          })),
        },
      });

      qc.invalidateQueries({ queryKey: ["admin-galleries"] });
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success(`Successfully added ${successCount} photo${successCount > 1 ? "s" : ""} to "${currentPost.title}"`);
    } catch (e) {
      toast.error(`Upload failed: ${(e as Error).message}`);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // Add Photo by URL
  async function handleAddUrl() {
    if (!galleryUrlInput.trim()) return;

    let targetPostId = selectedPostId;
    if (targetPostId === "all") {
      if (!posts || posts.length === 0) {
        toast.error("Please create a blog post first.");
        return;
      }
      targetPostId = posts[0].id;
      setSelectedPostId(targetPostId);
    }

    const currentPost = posts?.find((p) => p.id === targetPostId);
    if (!currentPost) return;

    const newItems = [
      ...currentPost.gallery,
      {
        image_url: galleryUrlInput.trim(),
        alt_text: "",
        sort_order: currentPost.gallery.length,
        post_id: targetPostId,
      },
    ];

    try {
      await saveGalleryFn({
        data: {
          postId: targetPostId,
          gallery: newItems.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx,
          })),
        },
      });
      qc.invalidateQueries({ queryKey: ["admin-galleries"] });
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      setGalleryUrlInput("");
      toast.success("Photo added to gallery");
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  // Drag-and-drop Reordering within a selected post
  function handleDragStart(e: React.DragEvent, index: number) {
    if (selectedPostId === "all") return;
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${index}`);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    if (selectedPostId === "all") return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== index) setDragOverIdx(index);
  }

  async function handleDrop(e: React.DragEvent, targetIndex: number) {
    if (selectedPostId === "all" || !activePost) return;
    e.preventDefault();

    if (draggedIdx === null || draggedIdx === targetIndex) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }

    const next = [...activePost.gallery];
    const [moved] = next.splice(draggedIdx, 1);
    next.splice(targetIndex, 0, moved);

    const reordered = next.map((item, idx) => ({ ...item, sort_order: idx }));

    // Optimistic UI update
    qc.setQueryData<PostWithGallery[]>(["admin-galleries"], (old) =>
      old
        ? old.map((p) => (p.id === activePost.id ? { ...p, gallery: reordered } : p))
        : [],
    );

    setDraggedIdx(null);
    setDragOverIdx(null);

    try {
      await saveGalleryFn({
        data: {
          postId: activePost.id,
          gallery: reordered.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx,
          })),
        },
      });
      qc.invalidateQueries({ queryKey: ["admin-galleries"] });
      toast.success("Gallery sequence saved");
    } catch (e) {
      toast.error((e as Error).message);
      qc.invalidateQueries({ queryKey: ["admin-galleries"] });
    }
  }

  // Arrow button reordering
  async function moveItem(index: number, direction: "prev" | "next") {
    if (!activePost) return;
    const next = [...activePost.gallery];
    const targetIndex = direction === "prev" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) return;

    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;

    const reordered = next.map((item, idx) => ({ ...item, sort_order: idx }));

    qc.setQueryData<PostWithGallery[]>(["admin-galleries"], (old) =>
      old
        ? old.map((p) => (p.id === activePost.id ? { ...p, gallery: reordered } : p))
        : [],
    );

    try {
      await saveGalleryFn({
        data: {
          postId: activePost.id,
          gallery: reordered.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx,
          })),
        },
      });
      qc.invalidateQueries({ queryKey: ["admin-galleries"] });
      toast.success("Order updated");
    } catch (e) {
      toast.error((e as Error).message);
      qc.invalidateQueries({ queryKey: ["admin-galleries"] });
    }
  }

  // Update Alt Text
  async function updateAltText(postId: string, itemIndex: number, newAlt: string) {
    const post = posts?.find((p) => p.id === postId);
    if (!post) return;

    const next = [...post.gallery];
    if (!next[itemIndex]) return;
    next[itemIndex] = { ...next[itemIndex], alt_text: newAlt };

    try {
      await saveGalleryFn({
        data: {
          postId,
          gallery: next.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx,
          })),
        },
      });
      qc.invalidateQueries({ queryKey: ["admin-galleries"] });
      toast.success("Caption saved");
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  // Confirm Remove
  async function confirmRemove() {
    if (!deleteTarget) return;
    const { item, postId } = deleteTarget;

    try {
      await delImageFn({
        data: {
          postId,
          galleryId: item.id,
          imageUrl: item.image_url,
        },
      });

      qc.invalidateQueries({ queryKey: ["admin-galleries"] });
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Picture removed from gallery");
      if (lightboxIndex !== null) setLightboxIndex(null);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setDeleteTarget(null);
    }
  }

  const activeLightboxItem =
    lightboxIndex !== null && displayedItems[lightboxIndex]
      ? displayedItems[lightboxIndex]
      : null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && displayedItems.length > 1) {
        setLightboxIndex((curr) =>
          curr !== null ? (curr - 1 + displayedItems.length) % displayedItems.length : null,
        );
      } else if (e.key === "ArrowRight" && displayedItems.length > 1) {
        setLightboxIndex((curr) =>
          curr !== null ? (curr + 1) % displayedItems.length : null,
        );
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, displayedItems.length]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-accent/15 p-2 text-accent">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h1 className="font-display text-3xl font-bold">Gallery Management</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, inspect, reorder, and remove photo galleries across your solo travel stories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activePost && (
            <Link
              to="/admin/posts/$id"
              params={{ id: activePost.id }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium hover:bg-muted transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Edit Full Story
            </Link>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {uploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading…
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" /> Upload Pictures
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

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Gallery Photos</p>
            <ImageIcon className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold">
            {isLoading ? "—" : stats.totalPhotos.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Photos active across all stories</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Stories with Galleries</p>
            <Layers className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold">
            {isLoading ? "—" : stats.postsWithGallery.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Out of {stats.totalPosts} total stories</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Avg Photos / Gallery</p>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold">
            {isLoading || stats.postsWithGallery === 0
              ? "0"
              : (stats.totalPhotos / stats.postsWithGallery).toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Visual depth per story</p>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Story Selector */}
        <div className="flex items-center gap-2 flex-1 sm:max-w-md">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
            Filter Story:
          </label>
          <select
            value={selectedPostId}
            onChange={(e) => setSelectedPostId(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent font-medium"
          >
            <option value="all">-- All Stories ({stats.totalPhotos} photos) --</option>
            {(posts ?? []).map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.galleryCount} {p.galleryCount === 1 ? "photo" : "photos"})
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search photos & captions…"
            className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Upload Dropzone Area */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-sm font-semibold flex items-center gap-2">
              <Upload className="h-4 w-4 text-accent" /> Upload to {activePost ? `"${activePost.title}"` : "Gallery"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activePost
                ? `Upload new pictures directly into this story's photo gallery.`
                : `Select a story above or drop files here to upload to the latest story.`}
            </p>
          </div>
          {activePost && (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {activePost.galleryCount} {activePost.galleryCount === 1 ? "picture" : "pictures"} in story
            </span>
          )}
        </div>

        {/* Dropzone */}
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
                Uploading picture {uploadProgress?.current ?? 1} of {uploadProgress?.total ?? 1}…
              </p>
              <p className="text-xs text-muted-foreground">Processing and saving into Supabase Storage…</p>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-muted/60 p-3 text-foreground group-hover:bg-accent/15 group-hover:text-accent transition-colors">
                <FileImage className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">
                  Drag & drop multiple pictures here, or <span className="text-accent underline underline-offset-2">browse computer</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, WebP, AVIF up to 8 MB each · Select multiple files at once
                </p>
              </div>
            </>
          )}
        </div>

        {/* URL Input */}
        <div className="flex items-center gap-2">
          <input
            value={galleryUrlInput}
            onChange={(e) => setGalleryUrlInput(e.target.value)}
            placeholder="…or paste direct image web URL (https://…)"
            className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="rounded-xl border border-border px-3.5 py-2 text-xs font-medium hover:bg-muted whitespace-nowrap transition-colors"
          >
            Add URL
          </button>
        </div>
      </div>

      {/* Gallery Pictures Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {selectedPostId !== "all"
              ? "Hold and drag cards to reorder story sequence"
              : "Showing all gallery photos across stories (Select a story above to reorder)"}
          </span>
          <span>{displayedItems.length} {displayedItems.length === 1 ? "picture" : "pictures"}</span>
        </div>

        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {displayedItems.map((item, idx) => {
              const isDragging = draggedIdx === idx;
              const isDragOver = dragOverIdx === idx && draggedIdx !== idx;
              const isReorderable = selectedPostId !== "all";

              return (
                <div
                  key={item.id || item.image_url + idx}
                  draggable={isReorderable && !uploading}
                  onDragStart={(e) => isReorderable && handleDragStart(e, idx)}
                  onDragOver={(e) => isReorderable && handleDragOver(e, idx)}
                  onDrop={(e) => isReorderable && handleDrop(e, idx)}
                  onDragEnd={() => {
                    setDraggedIdx(null);
                    setDragOverIdx(null);
                  }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card transition-all select-none shadow-xs ${
                    isDragging ? "opacity-40 scale-95 border-dashed border-accent" : ""
                  } ${
                    isDragOver
                      ? "border-accent ring-2 ring-accent/30 scale-[1.02]"
                      : "border-border hover:border-accent/60 hover:shadow-md"
                  }`}
                >
                  {/* Thumbnail Card */}
                  <div className="relative aspect-4/3 w-full bg-muted/40 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.alt_text || `Gallery photo ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Position Pill */}
                    <div className="absolute left-2 top-2 z-10">
                      <span className="rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Drag Handle Indicator */}
                    {isReorderable && (
                      <div className="absolute right-2 top-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className="rounded-md bg-black/75 p-1 text-white shadow-xs backdrop-blur-xs cursor-grab active:cursor-grabbing">
                          <GripVertical className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    )}

                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                      <button
                        type="button"
                        title="Inspect / Preview"
                        onClick={() => setLightboxIndex(idx)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white transition-transform hover:scale-110 shadow-md"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>

                      {isReorderable && (
                        <>
                          <button
                            type="button"
                            title="Move left"
                            disabled={idx === 0}
                            onClick={() => moveItem(idx, "prev")}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Move right"
                            disabled={idx === displayedItems.length - 1}
                            onClick={() => moveItem(idx, "next")}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        title="Remove picture"
                        onClick={() => setDeleteTarget({ item, postId: item.post_id || selectedPostId })}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-transform hover:scale-110 shadow-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Caption & Post Info */}
                  <div className="p-2.5 bg-card border-t border-border space-y-1">
                    {selectedPostId === "all" && item.post_title && (
                      <p className="text-[10px] font-semibold text-accent truncate" title={item.post_title}>
                        {item.post_title}
                      </p>
                    )}
                    <input
                      defaultValue={item.alt_text}
                      placeholder="Caption / Alt text…"
                      onBlur={(e) => {
                        if (item.post_id && e.target.value !== item.alt_text) {
                          updateAltText(item.post_id, idx, e.target.value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && item.post_id) {
                          e.currentTarget.blur();
                        }
                      }}
                      className="w-full text-[11px] rounded-lg border border-border/80 bg-background px-2 py-1 outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-12 text-center text-xs text-muted-foreground bg-card">
            <ImageIcon className="mx-auto h-10 w-10 opacity-30 mb-2" />
            <p className="font-medium text-foreground text-sm">No gallery pictures found.</p>
            <p className="mt-1">Upload photos using the dropzone above to build your story's photo gallery.</p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Removal */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove picture from gallery?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this picture from{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.item.post_title || "this story"}
              </span>?
              The image file will be removed from the gallery and cleaned up from Supabase Storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmRemove}
            >
              Remove Picture
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Lightbox Modal Preview */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-all duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-50 flex items-center gap-3">
            <span className="rounded-full bg-black/75 px-3.5 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg">
              Photo {lightboxIndex + 1} of {displayedItems.length}
            </span>
            {activeLightboxItem.post_title && (
              <span className="hidden sm:inline-block rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 border border-white/10 backdrop-blur-md">
                {activeLightboxItem.post_title}
              </span>
            )}
          </div>

          <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTarget({
                  item: activeLightboxItem,
                  postId: activeLightboxItem.post_id || selectedPostId,
                });
              }}
              className="flex h-10 px-3 items-center gap-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-medium border border-red-500/40 backdrop-blur-md transition-all shadow-lg cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
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

          {/* Main Preview */}
          <div
            className="relative flex max-h-[80vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxItem.image_url}
              alt={activeLightboxItem.alt_text || `Gallery photo ${lightboxIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />

            {/* Prev Button */}
            {displayedItems.length > 1 && (
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((curr) =>
                    curr !== null ? (curr - 1 + displayedItems.length) % displayedItems.length : null,
                  );
                }}
                className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Next Button */}
            {displayedItems.length > 1 && (
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((curr) =>
                    curr !== null ? (curr + 1) % displayedItems.length : null,
                  );
                }}
                className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption Input */}
          <div
            className="absolute bottom-4 sm:bottom-6 inset-x-4 max-w-xl mx-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl bg-black/80 p-3 border border-white/20 backdrop-blur-md shadow-xl flex items-center gap-2">
              <input
                defaultValue={activeLightboxItem.alt_text}
                placeholder="Add caption / alt text for this photo…"
                onBlur={(e) => {
                  if (activeLightboxItem.post_id && e.target.value !== activeLightboxItem.alt_text) {
                    updateAltText(activeLightboxItem.post_id, lightboxIndex, e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && activeLightboxItem.post_id) {
                    e.currentTarget.blur();
                  }
                }}
                className="flex-1 rounded-xl bg-white/10 border border-white/20 px-3.5 py-1.5 text-xs text-white placeholder:text-white/50 outline-none focus:border-white/60"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
