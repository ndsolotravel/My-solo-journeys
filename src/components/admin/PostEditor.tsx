import { useState, useRef } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { MarkdownEditor } from "./MarkdownEditor";
import { DraggableDialog } from "./DraggableDialog";
import {
  adminUpsertPost,
  adminUploadImage,
  adminListDestinations,
} from "@/lib/admin.functions";
import { CATEGORIES } from "@/lib/site";

export type GalleryItemState = {
  id?: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
};

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
  const listDestinationsFn = useServerFn(adminListDestinations);

  const { data: destinations } = useQuery({
    queryKey: ["admin-destinations"],
    queryFn: () => listDestinationsFn(),
  });

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [cover, setCover] = useState(initial?.cover_image ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [featured, setFeatured] = useState(!!initial?.featured);
  const [published, setPublished] = useState(!!initial?.published);
  const [scheduledAt, setScheduledAt] = useState<string>(
    initial?.scheduled_at ? toLocalInput(initial.scheduled_at) : "",
  );
  const [destinationId, setDestinationId] = useState(initial?.destination_id ?? "");
  const [travelDate, setTravelDate] = useState(initial?.travel_date ?? "");
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seo_description ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(initial?.og_image_url ?? "");

  const [gallery, setGallery] = useState<GalleryItemState[]>(
    (initial?.gallery ?? []).map((g, idx) => ({
      id: g.id,
      image_url: g.image_url,
      alt_text: g.alt_text ?? "",
      sort_order: g.sort_order ?? idx,
    })),
  );

  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [uploading, setUploading] = useState<"cover" | "inline" | "gallery" | null>(null);

  const coverInput = useRef<HTMLInputElement>(null);
  const inlineInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);
  const formId = "post-editor-form";

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

  async function uploadFile(file: File, kind: "cover" | "inline" | "gallery") {
    setUploading(kind);
    try {
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      if (kind === "cover") setCover(url);
      else if (kind === "inline") setContent((c) => `${c}\n\n![](${url})\n`);
      else if (kind === "gallery") {
        setGallery((prev) => [
          ...prev,
          { image_url: url, alt_text: "", sort_order: prev.length },
        ]);
      }
      toast.success("Image uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(null);
    }
  }

  function addGalleryUrl() {
    if (!galleryUrlInput.trim()) return;
    setGallery((prev) => [
      ...prev,
      { image_url: galleryUrlInput.trim(), alt_text: "", sort_order: prev.length },
    ]);
    setGalleryUrlInput("");
    toast.success("Gallery image added");
  }

  function moveGalleryItem(index: number, direction: "up" | "down") {
    setGallery((prev) => {
      const next = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next.map((item, idx) => ({ ...item, sort_order: idx }));
    });
  }

  function removeGalleryItem(index: number) {
    setGallery((prev) =>
      prev.filter((_, idx) => idx !== index).map((item, idx) => ({ ...item, sort_order: idx })),
    );
  }

  function updateGalleryAltText(index: number, alt_text: string) {
    setGallery((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, alt_text } : item)),
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");
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

        {/* Per-Post Photo Gallery Section */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-accent" /> Post Photo Gallery
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Upload photos specific to this story. Drag/reorder to change sequence.
              </p>
            </div>
            <button
              type="button"
              onClick={() => galleryInput.current?.click()}
              disabled={uploading === "gallery"}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              {uploading === "gallery" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              Add Photo
            </button>
          </div>

          <input
            ref={galleryInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "gallery")}
          />

          <div className="flex items-center gap-2">
            <input
              value={galleryUrlInput}
              onChange={(e) => setGalleryUrlInput(e.target.value)}
              placeholder="…or paste photo URL"
              className={input + " text-xs py-2"}
            />
            <button
              type="button"
              onClick={addGalleryUrl}
              className="rounded-xl border border-border px-3 py-2 text-xs font-medium hover:bg-muted whitespace-nowrap"
            >
              Add URL
            </button>
          </div>

          {gallery.length > 0 ? (
            <div className="space-y-3 pt-2">
              {gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-border/80 bg-background p-3 shadow-xs"
                >
                  <img
                    src={item.image_url}
                    alt={item.alt_text || `Gallery photo ${idx + 1}`}
                    className="h-14 w-14 rounded-lg object-cover bg-muted shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <input
                      value={item.alt_text}
                      onChange={(e) => updateGalleryAltText(idx, e.target.value)}
                      placeholder="Alt text / description…"
                      className="w-full text-xs rounded-lg border border-border bg-muted/20 px-2.5 py-1.5 outline-none focus:border-accent"
                    />
                    <p className="text-[10px] text-muted-foreground truncate">{item.image_url}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveGalleryItem(idx, "up")}
                      className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-muted disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === gallery.length - 1}
                      onClick={() => moveGalleryItem(idx, "down")}
                      className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-muted disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(idx)}
                      className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                      title="Remove photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-center py-4 text-muted-foreground border border-dashed border-border rounded-xl">
              No gallery photos added yet.
            </p>
          )}
        </div>

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

        {/* Destination & Travel Info */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" /> Location & Date
          </p>

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

