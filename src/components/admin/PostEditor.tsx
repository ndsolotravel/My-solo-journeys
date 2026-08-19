import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import {
  Upload,
  Loader2,
  Save,
  ExternalLink,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Globe,
  MapPin,
  Calendar,
  Image as ImageIcon,
  GripVertical,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileImage,
  User,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";
import { MarkdownEditor } from "./MarkdownEditor";
import { DraggableDialog } from "./DraggableDialog";
import {
  adminUpsertPost,
  adminUploadImage,
  adminListDestinations,
  adminDeleteGalleryImage,
  adminSavePostGallery,
} from "@/lib/admin.functions";
import { geocodeFromTitle } from "@/lib/geocoding.functions";
import { CATEGORIES } from "@/lib/site";
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

export type GalleryItemState = {
  id?: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
};

const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";

function resolveImageUrl(urlOrPath: string | null | undefined): string {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  const trimmed = urlOrPath.trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  let cleanPath = trimmed.replace(/^\/+/, "");
  if (cleanPath.startsWith("blog-media/")) {
    cleanPath = cleanPath.slice("blog-media/".length);
  }
  const baseUrl =
    (typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
      : "") || DEFAULT_SUPABASE_URL;
  return `${baseUrl.replace(/\/+$/, "")}/storage/v1/object/public/blog-media/${cleanPath}`;
}

type Post = {
  id?: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  cover_image?: string | null;
  category?: string | null;
  tags?: string[] | null;
  featured?: boolean | null;
  published?: boolean | null;
  author_name?: string | null;
  location_name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  scheduled_at?: string | null;
  destination_id?: string | null;
  travel_date?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image_url?: string | null;
  gallery?: GalleryItemState[] | null;
};

export function PostEditor({
  initial,
  asDialog = !initial,
}: {
  initial?: Post | null;
  asDialog?: boolean;
}) {
  const navigate = useNavigate();
  const upsertFn = useServerFn(adminUpsertPost);
  const uploadFn = useServerFn(adminUploadImage);
  const delGalleryImageFn = useServerFn(adminDeleteGalleryImage);
  const saveGalleryFn = useServerFn(adminSavePostGallery);
  const listDestinationsFn = useServerFn(adminListDestinations);

  const { data: destinations } = useQuery({
    queryKey: ["admin-destinations"],
    queryFn: () => listDestinationsFn(),
  });

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [cover, setCover] = useState(initial?.cover_image ? resolveImageUrl(initial.cover_image) : "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [featured, setFeatured] = useState(!!initial?.featured);
  const [published, setPublished] = useState(!!initial?.published);
  const [authorName, setAuthorName] = useState(initial?.author_name ?? "Noman");
  const [locationName, setLocationName] = useState(initial?.location_name ?? "");
  const [latitude, setLatitude] = useState<string>(initial?.latitude != null ? String(initial.latitude) : "");
  const [longitude, setLongitude] = useState<string>(initial?.longitude != null ? String(initial.longitude) : "");
  const [scheduledAt, setScheduledAt] = useState<string>(
    initial?.scheduled_at ? toLocalInput(initial.scheduled_at) : "",
  );
  const [destinationId, setDestinationId] = useState(initial?.destination_id ?? "");
  const [travelDate, setTravelDate] = useState(initial?.travel_date ?? "");
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seo_description ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(initial?.og_image_url ? resolveImageUrl(initial.og_image_url) : "");

  const [gallery, setGallery] = useState<GalleryItemState[]>(
    (initial?.gallery ?? []).map((g, idx) => ({
      id: g.id,
      image_url: resolveImageUrl(g.image_url),
      alt_text: g.alt_text ?? "",
      sort_order: g.sort_order ?? idx,
    })),
  );

  // Sync state automatically when `initial` data loads or changes
  useEffect(() => {
    if (!initial) return;
    setTitle(initial.title ?? "");
    setSlug(initial.slug ?? "");
    setExcerpt(initial.excerpt ?? "");
    setContent(initial.content ?? "");
    setCover(initial.cover_image ? resolveImageUrl(initial.cover_image) : "");
    setCategory(initial.category ?? CATEGORIES[0]);
    setTags((initial.tags ?? []).join(", "));
    setFeatured(!!initial.featured);
    setPublished(!!initial.published);
    setAuthorName(initial.author_name ?? "Noman");
    setLocationName(initial.location_name ?? "");
    setLatitude(initial.latitude != null ? String(initial.latitude) : "");
    setLongitude(initial.longitude != null ? String(initial.longitude) : "");
    setScheduledAt(initial.scheduled_at ? toLocalInput(initial.scheduled_at) : "");
    setDestinationId(initial.destination_id ?? "");
    setTravelDate(initial.travel_date ?? "");
    setSeoTitle(initial.seo_title ?? "");
    setSeoDescription(initial.seo_description ?? "");
    setOgImageUrl(initial.og_image_url ? resolveImageUrl(initial.og_image_url) : "");

    if (initial.gallery && Array.isArray(initial.gallery)) {
      setGallery(
        initial.gallery.map((g, idx) => ({
          id: g.id,
          image_url: resolveImageUrl(g.image_url),
          alt_text: g.alt_text ?? "",
          sort_order: g.sort_order ?? idx,
        })),
      );
    }
  }, [initial]);

  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [uploading, setUploading] = useState<"cover" | "inline" | "gallery" | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);

  // Drag-and-drop state for reordering
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  // Lightbox preview state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Deletion confirmation state
  const [deleteTarget, setDeleteTarget] = useState<{ index: number; item: GalleryItemState } | null>(null);

  // Auto-detect location state
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [autoDetectResult, setAutoDetectResult] = useState<string | null>(null);

  const coverInput = useRef<HTMLInputElement>(null);
  const inlineInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);
  const formId = "post-editor-form";

  const geocodeFn = useServerFn(geocodeFromTitle);

  // Auto-detect location from title
  async function handleAutoDetectLocation() {
    if (!title.trim()) {
      toast.error("Please enter a title first");
      return;
    }

    setAutoDetecting(true);
    setAutoDetectResult(null);

    try {
      const result = await geocodeFn({
        data: {
          title: title.trim(),
          existingLocation: locationName || undefined,
        },
      });

      if (result.success && result.result) {
        setLocationName(result.result.locationName);
        setLatitude(String(result.result.latitude));
        setLongitude(String(result.result.longitude));
        setAutoDetectResult(`Detected: ${result.result.displayName}`);
        toast.success(`Location detected: ${result.result.locationName}`);
      } else {
        setAutoDetectResult(result.message || "Could not detect location");
        toast.info(result.message || "Could not detect location from title");
      }
    } catch (error) {
      console.error("[AutoDetect] Error:", error);
      toast.error("Failed to detect location. Please try again.");
      setAutoDetectResult("Detection failed");
    } finally {
      setAutoDetecting(false);
    }
  }

  const save = useMutation({
    mutationFn: (payload: Record<string, unknown>) => upsertFn({ data: payload as never }),
    onSuccess: (row) => {
      toast.success(initial?.id ? "Post updated" : "Post created");
      if (!initial?.id && row && typeof row === "object" && "id" in row) {
        navigate({ to: "/admin/posts/$id", params: { id: (row as { id: string }).id } });
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  // Single file uploader for cover and inline
  async function uploadFile(file: File, kind: "cover" | "inline") {
    setUploading(kind);
    try {
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      const resolved = resolveImageUrl(url);
      if (kind === "cover") setCover(resolved);
      else if (kind === "inline") setContent((c) => `${c}\n\n![](${resolved})\n`);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(null);
    }
  }

  // Multi-file batch uploader for gallery
  async function uploadGalleryFiles(files: FileList | File[]) {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
    const maxBytes = 8 * 1024 * 1024; // 8 MB

    const validFiles: File[] = [];
    for (const f of fileArray) {
      const type = f.type.toLowerCase();
      if (!allowedTypes.includes(type) && !type.startsWith("image/")) {
        toast.error(`"${f.name}" is not a supported format. Please use JPG, PNG, WebP, or AVIF.`);
        continue;
      }
      if (f.size > maxBytes) {
        toast.error(`"${f.name}" exceeds the 8 MB size limit.`);
        continue;
      }
      validFiles.push(f);
    }

    if (validFiles.length === 0) return;

    setUploading("gallery");
    let successCount = 0;

    try {
      const newItems: GalleryItemState[] = [...gallery];
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadProgress({ current: i + 1, total: validFiles.length });
        const buf = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        const { url } = await uploadFn({
          data: { filename: file.name, contentType: file.type, base64 },
        });
        const resolved = resolveImageUrl(url);
        newItems.push({
          image_url: resolved,
          alt_text: "",
          sort_order: newItems.length,
        });
        successCount++;
      }

      setGallery(newItems);

      // If this is an existing post, immediately persist gallery records to post_gallery table
      if (initial?.id) {
        try {
          await saveGalleryFn({
            data: {
              postId: initial.id,
              gallery: newItems.map((g, idx) => ({
                id: g.id,
                image_url: g.image_url,
                alt_text: g.alt_text || null,
                sort_order: idx,
              })),
            },
          });
        } catch (saveErr) {
          console.warn("[PostEditor] Automatic gallery sync note:", saveErr);
        }
      }

      toast.success(`Successfully uploaded and saved ${successCount} photo${successCount > 1 ? "s" : ""} to gallery`);
    } catch (e) {
      toast.error(`Upload error: ${(e as Error).message}`);
    } finally {
      setUploading(null);
      setUploadProgress(null);
      if (galleryInput.current) galleryInput.current.value = "";
    }
  }

  async function addGalleryUrl() {
    if (!galleryUrlInput.trim()) return;
    const resolved = resolveImageUrl(galleryUrlInput.trim());
    const nextGallery = [
      ...gallery,
      { image_url: resolved, alt_text: "", sort_order: gallery.length },
    ];
    setGallery(nextGallery);
    setGalleryUrlInput("");

    if (initial?.id) {
      try {
        await saveGalleryFn({
          data: {
            postId: initial.id,
            gallery: nextGallery.map((g, idx) => ({
              id: g.id,
              image_url: g.image_url,
              alt_text: g.alt_text || null,
              sort_order: idx,
            })),
          },
        });
      } catch (err) {
        console.warn("[PostEditor] Add URL sync warning:", err);
      }
    }

    toast.success("Gallery image added");
  }

  async function moveGalleryItem(index: number, direction: "prev" | "next") {
    const next = [...gallery];
    const targetIndex = direction === "prev" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    const reordered = next.map((item, idx) => ({ ...item, sort_order: idx }));
    setGallery(reordered);

    if (initial?.id) {
      try {
        await saveGalleryFn({
          data: {
            postId: initial.id,
            gallery: reordered.map((g, idx) => ({
              id: g.id,
              image_url: g.image_url,
              alt_text: g.alt_text || null,
              sort_order: idx,
            })),
          },
        });
      } catch (err) {
        console.warn("[PostEditor] Reorder sync warning:", err);
      }
    }
  }

  function handleDragStart(e: React.DragEvent, index: number) {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${index}`);
  }

  function handleDragOverItem(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  }

  async function handleDropOnItem(e: React.DragEvent, targetIndex: number) {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIndex) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }
    const next = [...gallery];
    const [moved] = next.splice(draggedIdx, 1);
    next.splice(targetIndex, 0, moved);
    const reordered = next.map((item, idx) => ({ ...item, sort_order: idx }));
    setGallery(reordered);
    setDraggedIdx(null);
    setDragOverIdx(null);

    if (initial?.id) {
      try {
        await saveGalleryFn({
          data: {
            postId: initial.id,
            gallery: reordered.map((g, idx) => ({
              id: g.id,
              image_url: g.image_url,
              alt_text: g.alt_text || null,
              sort_order: idx,
            })),
          },
        });
      } catch (err) {
        console.warn("[PostEditor] Drag drop sync warning:", err);
      }
    }

    toast.success("Gallery order updated");
  }

  async function confirmRemoveGalleryItem() {
    if (!deleteTarget) return;
    const { index, item } = deleteTarget;
    const nextGallery = gallery
      .filter((_, idx) => idx !== index)
      .map((g, idx) => ({ ...g, sort_order: idx }));

    setGallery(nextGallery);

    // If existing post and item has a saved URL, clean up backend post_gallery and Supabase storage
    if (initial?.id && item.image_url) {
      try {
        await delGalleryImageFn({
          data: {
            postId: initial.id,
            galleryId: item.id,
            imageUrl: item.image_url,
          },
        });
        await saveGalleryFn({
          data: {
            postId: initial.id,
            gallery: nextGallery.map((g, idx) => ({
              id: g.id,
              image_url: g.image_url,
              alt_text: g.alt_text || null,
              sort_order: idx,
            })),
          },
        });
      } catch (err) {
        console.warn("[PostEditor] Gallery image deletion notice:", err);
      }
    }

    toast.success("Picture removed from gallery");
    if (lightboxIndex === index) setLightboxIndex(null);
    setDeleteTarget(null);
  }


  function updateGalleryAltText(index: number, alt_text: string) {
    setGallery((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, alt_text } : item)),
    );
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && gallery.length > 1) {
        setLightboxIndex((curr) => (curr !== null ? (curr - 1 + gallery.length) % gallery.length : null));
      } else if (e.key === "ArrowRight" && gallery.length > 1) {
        setLightboxIndex((curr) => (curr !== null ? (curr + 1) % gallery.length : null));
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, gallery.length]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");

    const parsedLat = latitude.trim() !== "" ? parseFloat(latitude.trim()) : null;
    const parsedLng = longitude.trim() !== "" ? parseFloat(longitude.trim()) : null;

    if (parsedLat !== null && (isNaN(parsedLat) || parsedLat < -90 || parsedLat > 90)) {
      return toast.error("Latitude must be a valid number between -90 and 90");
    }
    if (parsedLng !== null && (isNaN(parsedLng) || parsedLng < -180 || parsedLng > 180)) {
      return toast.error("Longitude must be a valid number between -180 and 180");
    }

    save.mutate({
      id: initial?.id,
      title,
      slug: slug || undefined,
      excerpt,
      content,
      cover_image: cover || null,
      category,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
      published,
      author_name: authorName.trim() || "Noman",
      location_name: locationName.trim() || null,
      latitude: parsedLat,
      longitude: parsedLng,
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      destination_id: destinationId || null,
      travel_date: travelDate || null,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      og_image_url: ogImageUrl || null,
      gallery,
    });
  }

  function close() {
    navigate({ to: "/admin/posts" });
  }

  const activeLightboxItem = lightboxIndex !== null && gallery[lightboxIndex] ? gallery[lightboxIndex] : null;

  const body = (
    <form id={formId} onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <Field label="Title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
            className={input}
            placeholder="Story title…"
          />
        </Field>
        <Field label="Slug" hint="Auto-generated from title if blank">
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            maxLength={200}
            placeholder="my-story"
            className={input}
          />
        </Field>
        <Field label="Excerpt" hint="Shown in cards and default meta description">
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            maxLength={500}
            className={input + " resize-y"}
            placeholder="Brief summary of your travel story…"
          />
        </Field>

        <Field label="Content">
          <MarkdownEditor
            value={content}
            onChange={setContent}
            onInsertImage={() => inlineInput.current?.click()}
          />
          <input
            ref={inlineInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "inline")}
          />
          {uploading === "inline" && (
            <p className="mt-1 text-xs text-muted-foreground">
              <Loader2 className="inline h-3 w-3 animate-spin" /> Uploading image to content…
            </p>
          )}
        </Field>

        {/* ================= POST PHOTO GALLERY SECTION ================= */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base font-semibold flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-accent" /> Post Photo Gallery
                </h3>
                {gallery.length > 0 && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                    {gallery.length} {gallery.length === 1 ? "picture" : "pictures"}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Upload pictures from your computer or add external image URLs. Drag to reorder.
              </p>
            </div>
            <button
              type="button"
              onClick={() => galleryInput.current?.click()}
              disabled={uploading === "gallery"}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {uploading === "gallery" ? (
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

          <input
            ref={galleryInput}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => e.target.files && uploadGalleryFiles(e.target.files)}
          />

          {/* Drag & Drop Upload Dropzone Area */}
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
                uploadGalleryFiles(e.dataTransfer.files);
              }
            }}
            onClick={() => galleryInput.current?.click()}
            className={`group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              isDropzoneActive
                ? "border-accent bg-accent/10 text-accent scale-[1.01]"
                : "border-border bg-background hover:border-accent hover:bg-accent/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            {uploading === "gallery" ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="h-7 w-7 animate-spin text-accent" />
                <p className="text-sm font-medium text-foreground">
                  Uploading picture {uploadProgress?.current ?? 1} of {uploadProgress?.total ?? 1}…
                </p>
                <p className="text-xs text-muted-foreground">Please wait while files are processed and optimized</p>
              </div>
            ) : (
              <>
                <div className="rounded-full bg-muted/60 p-3 text-foreground group-hover:bg-accent/15 group-hover:text-accent transition-colors">
                  <FileImage className="h-6 w-6" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">
                    Drag & drop pictures here, or <span className="text-accent underline underline-offset-2">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG, WebP, AVIF up to 8 MB each · Select multiple files
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Paste Image URL Input */}
          <div className="flex items-center gap-2">
            <input
              value={galleryUrlInput}
              onChange={(e) => setGalleryUrlInput(e.target.value)}
              placeholder="…or paste image web URL (https://…)"
              className={input + " text-xs py-2"}
            />
            <button
              type="button"
              onClick={addGalleryUrl}
              className="rounded-xl border border-border px-3.5 py-2 text-xs font-medium hover:bg-muted whitespace-nowrap transition-colors"
            >
              Add URL
            </button>
          </div>

          {/* Gallery Pictures Grid with Drag-and-Drop */}
          {gallery.length > 0 ? (
            <div className="pt-2">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Hold and drag cards to reorder sequence</span>
                <span>{gallery.length} {gallery.length === 1 ? "item" : "items"}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {gallery.map((item, idx) => {
                  const isDragging = draggedIdx === idx;
                  const isDragOver = dragOverIdx === idx && draggedIdx !== idx;

                  return (
                    <div
                      key={item.id || item.image_url + idx}
                      draggable={uploading !== "gallery"}
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOverItem(e, idx)}
                      onDrop={(e) => handleDropOnItem(e, idx)}
                      onDragEnd={() => {
                        setDraggedIdx(null);
                        setDragOverIdx(null);
                      }}
                      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-background transition-all select-none shadow-xs ${
                        isDragging ? "opacity-40 scale-95 border-dashed border-accent" : ""
                      } ${
                        isDragOver
                          ? "border-accent ring-2 ring-accent/30 scale-[1.02]"
                          : "border-border hover:border-accent/60 hover:shadow-md"
                      }`}
                    >
                      {/* Thumbnail with overlay controls */}
                      <div className="relative aspect-4/3 w-full bg-muted/40 overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.alt_text || `Gallery item ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Position Pill */}
                        <div className="absolute left-2 top-2 z-10">
                          <span className="rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Drag Handle Icon */}
                        <div className="absolute right-2 top-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                          <div className="rounded-md bg-black/75 p-1 text-white shadow-xs backdrop-blur-xs cursor-grab active:cursor-grabbing">
                            <GripVertical className="h-3.5 w-3.5" />
                          </div>
                        </div>

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
                          <button
                            type="button"
                            title="Move left / up"
                            disabled={idx === 0}
                            onClick={() => moveGalleryItem(idx, "prev")}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Move right / down"
                            disabled={idx === gallery.length - 1}
                            onClick={() => moveGalleryItem(idx, "next")}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Remove picture"
                            onClick={() => setDeleteTarget({ index: idx, item })}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-transform hover:scale-110 shadow-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Caption / Alt Text Input */}
                      <div className="p-2.5 bg-card border-t border-border">
                        <input
                          value={item.alt_text}
                          onChange={(e) => updateGalleryAltText(idx, e.target.value)}
                          placeholder="Caption / Alt text…"
                          className="w-full text-[11px] rounded-lg border border-border/80 bg-background px-2 py-1 outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
              <ImageIcon className="mx-auto h-8 w-8 opacity-40 mb-2" />
              <p>No gallery pictures added yet.</p>
              <p className="text-[11px] mt-0.5">Upload multiple photos above to showcase visual moments from your story.</p>
            </div>
          )}
        </div>

        {/* Confirmation Dialog for Image Removal */}
        <AlertDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove picture from gallery?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove picture <span className="font-semibold text-foreground">#{deleteTarget ? deleteTarget.index + 1 : ""}</span>?
                This will remove the picture from this post's gallery.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={confirmRemoveGalleryItem}
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
                Photo {lightboxIndex + 1} of {gallery.length}
              </span>
            </div>

            <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteTarget({ index: lightboxIndex, item: activeLightboxItem });
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
              {gallery.length > 1 && (
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((curr) => (curr !== null ? (curr - 1 + gallery.length) % gallery.length : null));
                  }}
                  className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Next Button */}
              {gallery.length > 1 && (
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((curr) => (curr !== null ? (curr + 1) % gallery.length : null));
                  }}
                  className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption Editor */}
            <div
              className="absolute bottom-4 sm:bottom-6 inset-x-4 max-w-xl mx-auto z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl bg-black/80 p-3 border border-white/20 backdrop-blur-md shadow-xl flex items-center gap-2">
                <input
                  value={activeLightboxItem.alt_text}
                  onChange={(e) => updateGalleryAltText(lightboxIndex, e.target.value)}
                  placeholder="Add caption / alt text for this photo…"
                  className="flex-1 rounded-xl bg-white/10 border border-white/20 px-3.5 py-1.5 text-xs text-white placeholder:text-white/50 outline-none focus:border-white/60"
                />
              </div>
            </div>
          </div>
        )}

        {/* SEO Metadata Section */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <div>
            <h3 className="font-display text-base font-semibold flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" /> SEO & Social Metadata
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Customize how this post appears in search engines and social shares.
            </p>
          </div>

          <Field label="SEO Meta Title" hint="Defaults to post title if empty">
            <input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              maxLength={200}
              placeholder={title || "SEO Page Title"}
              className={input}
            />
          </Field>

          <Field label="SEO Meta Description" hint="Defaults to excerpt if empty">
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={2}
              maxLength={500}
              placeholder={excerpt || "Search engine description snippet…"}
              className={input + " resize-y"}
            />
          </Field>

          <Field label="Open Graph (Social) Image URL" hint="Defaults to cover image if empty">
            <input
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              placeholder={cover || "https://example.com/og-image.jpg"}
              className={input}
            />
          </Field>
        </div>
      </div>

      <aside className="space-y-6">
        {/* Publish Options */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Publish Status
          </p>
          <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => {
                setPublished(e.target.checked);
                if (e.target.checked) setScheduledAt("");
              }}
              className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            Published immediately
          </label>

          <Field label="Schedule Publish" hint="Auto-publishes at this date/time">
            <input
              type="datetime-local"
              disabled={published}
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className={input + " disabled:opacity-50"}
            />
          </Field>

          <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            Featured on Homepage
          </label>
        </div>

        {/* Author & Attribution */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-accent" /> Author & Attribution
          </p>

          <Field label="Author Name" hint="Displayed after 'By' on public story">
            <input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Noman"
              maxLength={100}
              className={input}
            />
          </Field>
        </div>

        {/* Map Location */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" /> Map Location
            </p>
            <button
              type="button"
              onClick={handleAutoDetectLocation}
              disabled={autoDetecting || !title.trim()}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {autoDetecting ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" /> Detecting...
                </>
              ) : (
                <>
                  <Navigation className="h-3 w-3" /> Auto Detect
                </>
              )}
            </button>
          </div>

          {autoDetectResult && (
            <p className={`text-xs ${autoDetectResult.startsWith("Detected") ? "text-green-600" : "text-muted-foreground"}`}>
              {autoDetectResult}
            </p>
          )}

          <Field label="Location Name" hint="e.g. Phander Valley, Ghizer, Gilgit Baltistan, Pakistan">
            <input
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Phander Valley, Ghizer, Gilgit Baltistan, Pakistan"
              maxLength={200}
              className={input}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Latitude" hint="e.g. 36.179 (-90 to 90)">
              <input
                type="number"
                step="any"
                min="-90"
                max="90"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="36.179"
                className={input}
              />
            </Field>

            <Field label="Longitude" hint="e.g. 73.751 (-180 to 180)">
              <input
                type="number"
                step="any"
                min="-180"
                max="180"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="73.751"
                className={input}
              />
            </Field>
          </div>

          <p className="text-[10px] text-muted-foreground">
            Enter location manually or use Auto Detect to suggest from title. Coordinates are validated before saving.
          </p>
        </div>

        {/* Date & Destination */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent" /> Date & Destination
          </p>

          <Field label="Travel Date" hint="Date of the actual trip">
            <div className="relative">
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className={input}
              />
            </div>
          </Field>

          <Field label="Link Destination">
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className={input}
            >
              <option value="">-- No destination link --</option>
              {(destinations ?? []).map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.country})
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Cover Image
          </p>
          <div className="min-h-[140px]">
            {cover ? (
              <div className="relative">
                <img
                  src={cover}
                  alt="Cover preview"
                  className="max-h-48 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCover("")}
                  className="mt-2 text-xs text-muted-foreground transition hover:text-red-500"
                >
                  Remove cover
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInput.current?.click()}
                className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background p-6 text-sm text-muted-foreground shadow-xs transition hover:border-accent hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {uploading === "cover" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                )}
                <span>Browse cover image</span>
              </button>
            )}
          </div>
          <input
            ref={coverInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "cover")}
          />
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="…or paste image URL"
            className={input}
          />
        </div>

        {/* Category & Tags */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <Field label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={input}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tags" hint="Comma-separated">
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="trekking, karakoram, motorcycling"
              className={input}
            />
          </Field>
        </div>
      </aside>
    </form>
  );

  const footerActions = (
    <>
      {initial?.slug && (
        <a
          href={`/blog/${initial.slug}`}
          target="_blank"
          rel="noreferrer"
          className="mr-auto inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-accent"
        >
          <ExternalLink className="h-3 w-3" /> View live
        </a>
      )}
      <label className="mr-2 hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Publish
      </label>
      <button
        type="button"
        onClick={close}
        className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
      >
        Cancel
      </button>
      <button
        type="submit"
        form={formId}
        disabled={save.isPending}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background shadow-sm transition hover:shadow-md disabled:opacity-50"
      >
        {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{" "}
        Save Post
      </button>
    </>
  );

  if (asDialog) {
    return (
      <DraggableDialog
        open
        onClose={close}
        title={initial?.id ? "Edit post" : "New post"}
        footer={footerActions}
      >
        {body}
      </DraggableDialog>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold">
          {initial?.id ? "Edit post" : "New post"}
        </h1>
        <div className="flex items-center gap-2">{footerActions}</div>
      </div>
      {body}
    </div>
  );
}

const input =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60_000);
  return local.toISOString().slice(0, 16);
}

