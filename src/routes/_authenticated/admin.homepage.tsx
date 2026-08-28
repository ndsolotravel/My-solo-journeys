import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useRef } from "react";
import {
  Home,
  Save,
  X,
  Loader2,
  CheckCircle2,
  Globe,
  Shield,
  Sparkles,
  ImagePlus,
  Upload,
  Rocket,
  BarChart3,
  BookMarked,
  Maximize2,
  ImageOff,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { adminGetHomepageEditor, adminSaveHomepageSettings } from "@/lib/homepage.functions";
import { adminUploadImage, resolveMediaUrl } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/homepage")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Homepage Management — Admin CMS" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminHomepagePage,
});

type PostOption = {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  cover_image: string | null;
};

type EditorData = {
  settings: Record<string, string>;
  posts: PostOption[];
};

type HeroSlotPreview = {
  slot: number;
  label: string;
  src: string;
  source: "manual" | "auto-post";
  caption: string;
};

function HeroImageTile({
  slot,
  label,
  src,
  caption,
  onOpen,
  aspectClass,
}: {
  slot: number;
  label: string;
  src: string;
  caption: string;
  onOpen: (s: { src: string; label: string }) => void;
  aspectClass: string;
}) {
  const [status, setStatus] = useState<"loading" | "error" | "ok">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setStatus(src ? "loading" : "error");
  }, [src, attempt]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-border bg-zinc-950 ${aspectClass}`}
      >
        {src ? (
          status === "error" ? (
            <button
              type="button"
              onClick={() => setAttempt((a) => a + 1)}
              className="group flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground transition hover:bg-muted/70"
            >
              <ImageOff className="h-6 w-6" />
              <span className="text-xs font-medium">Image unavailable</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/80">
                <RefreshCw className="h-3 w-3" /> Retry
              </span>
            </button>
          ) : status === "loading" ? (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="relative h-full w-full">
              <img
                src={src}
                alt={`${label} preview`}
                className="h-full w-full object-cover"
                onLoad={() => setStatus("ok")}
                onError={() => setStatus("error")}
              />
              <button
                type="button"
                onClick={() => onOpen({ src, label })}
                title="Open full preview"
                className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition hover:bg-black/30 hover:opacity-100"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <Maximize2 className="h-3.5 w-3.5" /> View full image
                </span>
              </button>
            </div>
          )
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground">
            <ImagePlus className="h-6 w-6 opacity-60" />
            <span className="px-4 text-center text-xs">
              No image — default Unsplash slide shown
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-0.5">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <span className="truncate text-[11px] text-muted-foreground">{caption}</span>
      </div>
    </div>
  );
}

function AdminHomepagePage() {
  const getEditorFn = useServerFn(adminGetHomepageEditor);
  const saveSettingsFn = useServerFn(adminSaveHomepageSettings);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-homepage"],
    queryFn: () => getEditorFn(),
  });

  // Draft form state (all editable homepage settings)
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [original, setOriginal] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const heroImageFieldRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  useEffect(() => {
    if (data) {
      const ed = data as EditorData;
      setOriginal(ed.settings);
      setDraft(ed.settings);
      setIsDirty(false);
      setErrors({});
    }
  }, [data]);

  const set = (key: string, value: string) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setIsDirty(true);
    setErrors((e) => {
      const next = { ...e };
      if (next[key]) delete next[key];
      return next;
    });
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const saveMutation = useMutation({
    mutationFn: () => saveSettingsFn({ data: { settings: draft } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-homepage"] });
      qc.invalidateQueries({ queryKey: ["home"] });
      setOriginal(draft);
      setIsDirty(false);
      setErrors({});
      toast.success("Homepage saved successfully! Changes are now live.");
    },
    onError: (err: Error) => {
      toast.error(`Failed to save homepage: ${err.message}`);
    },
  });

  const handleCancel = () => {
    setDraft(original);
    setIsDirty(false);
    setErrors({});
    toast.info("Changes discarded");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for required fields
    const nextErrors: Record<string, string> = {};
    const required: [string, string][] = [
      ["homepage_hero_button_text", "Button text is required"],
      ["homepage_hero_title", "Hero title is required"],
      ["homepage_hero_description", "Hero description is required"],
    ];
    if (draft.homepage_hero_mode === "manual" && !draft.homepage_hero_post_id) {
      nextErrors.homepage_hero_post_id = "Select a blog post when Manual mode is enabled";
    }
    if (draft.homepage_featured_mode === "manual" && !draft.homepage_featured_post_id) {
      nextErrors.homepage_featured_post_id = "Select a blog post when Manual mode is enabled";
    }
    for (const [key, msg] of required) {
      if (!draft[key] || !draft[key].trim()) {
        nextErrors[key] = msg;
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please fix the highlighted fields before saving.");
      return;
    }

    saveMutation.mutate();
  };

  const handleHeroImageUpload = async (file: File, fieldKey: string) => {
    try {
      setUploadingImage(true);
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type || "image/jpeg",
          base64,
        },
      });

      if (res?.url) {
        set(fieldKey, res.url);
        toast.success("Hero image uploaded successfully!");
      }
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
      if (heroImageFieldRefs.current[fieldKey]) {
        heroImageFieldRefs.current[fieldKey]!.value = "";
      }
    }
  };

  const posts: PostOption[] = ((data as EditorData | undefined)?.posts ?? []).filter(
    (p) => p.published,
  );
  const heroImage = draft.homepage_hero_image?.trim()
    ? resolveMediaUrl(draft.homepage_hero_image)
    : "";
  const heroMode = draft.homepage_hero_mode === "manual" ? "manual" : "auto";
  const heroImagesMode = draft.homepage_hero_images_mode === "manual" ? "manual" : "auto";
  const featuredMode = draft.homepage_featured_mode === "manual" ? "manual" : "auto";

  const HERO_IMAGE_FIELDS = [
    { key: "homepage_hero_image", label: "Hero Image 1 URL", slot: 1 },
    { key: "homepage_hero_image_2", label: "Hero Image 2 URL", slot: 2 },
    { key: "homepage_hero_image_3", label: "Hero Image 3 URL", slot: 3 },
  ] as const;

  // Ordered published posts (server returns them sorted by published_at desc).
  const latestPosts = posts.slice(0, 3);

  const heroSlots: HeroSlotPreview[] = HERO_IMAGE_FIELDS.map((field, i) => {
    if (heroImagesMode === "manual") {
      const raw = draft[field.key] ?? "";
      return {
        slot: field.slot,
        label: `Hero Image ${field.slot}`,
        src: raw.trim() ? resolveMediaUrl(raw.trim()) : "",
        source: "manual",
        caption: raw.trim() ? "Manual URL" : "Default slide",
      };
    }
    const post = latestPosts[i];
    const cover = post?.cover_image?.trim() ? resolveMediaUrl(post.cover_image.trim()) : "";
    return {
      slot: field.slot,
      label: `Hero Image ${field.slot}`,
      src: cover,
      source: "auto-post",
      caption: cover ? (post?.title ?? "Latest post") : "Default slide",
    };
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading homepage configuration…
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <Home className="h-4 w-4" /> Homepage Management
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Homepage</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit the hero banner, journey stats and featured post. Changes go live instantly on the
            public homepage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={!isDirty || saveMutation.isPending}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-50 transition cursor-pointer"
          >
            <X className="h-3.5 w-3.5" /> Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || saveMutation.isPending}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background shadow-xs hover:opacity-90 disabled:opacity-50 transition cursor-pointer"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Banner Preview — how the 3 hero images actually appear on the homepage */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <ImagePlus className="h-5 w-5 text-accent" /> Hero Banner Preview
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {heroImagesMode === "auto"
                ? "Auto mode — showing the cover images of the 3 latest published posts exactly as they appear on the homepage."
                : "Manual mode — showing your 3 hero image URLs exactly as they appear on the homepage."}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              heroImagesMode === "auto"
                ? "bg-accent/10 text-accent"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {heroImagesMode === "auto" ? "Auto" : "Manual"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {heroSlots.map((s, i) => (
            <HeroImageTile
              key={s.slot}
              slot={s.slot}
              label={s.label}
              src={s.src}
              caption={s.source === "auto-post" ? latestPosts[i]?.title || s.caption : s.caption}
              onOpen={setLightbox}
              aspectClass="aspect-[4/5] sm:aspect-[3/4]"
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5" /> Click any image for a full-size preview
          </span>
          <span className="hidden h-3 w-px bg-border sm:inline-block" />
          <span>
            {heroImagesMode === "auto"
              ? "Crops use the same object-fit: cover and centering as the live homepage hero."
              : "Empty fields fall back to the default Unsplash slideshow automatically."}
          </span>
        </div>
      </section>

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main form */}
        <div className="space-y-6">
          {/* HERO BANNER */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-accent" /> Hero Banner
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  The full-screen intro at the top of the homepage — background, badge, title,
                  description and call-to-action buttons.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                <Globe className="h-3 w-3" /> Public
              </span>
            </div>

            {/* Hero source mode */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">
                Hero Source Post
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => set("homepage_hero_mode", "auto")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    heroMode === "auto"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Auto</span>
                    <span className="block text-xs text-muted-foreground">
                      Latest published post
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => set("homepage_hero_mode", "manual")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    heroMode === "manual"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <BookMarked className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Manual</span>
                    <span className="block text-xs text-muted-foreground">
                      Pick a specific post
                    </span>
                  </span>
                </button>
              </div>

              {heroMode === "manual" && (
                <div className="space-y-2">
                  <label
                    htmlFor="homepage_hero_post_id"
                    className="block text-xs font-semibold text-foreground"
                  >
                    Select Blog Post
                  </label>
                  <select
                    id="homepage_hero_post_id"
                    value={draft.homepage_hero_post_id ?? ""}
                    onChange={(e) => set("homepage_hero_post_id", e.target.value)}
                    className={`w-full rounded-xl border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                      errors.homepage_hero_post_id ? "border-red-500" : "border-border"
                    }`}
                  >
                    <option value="">— Select a post —</option>
                    {posts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                        {p.featured ? " ★" : ""}
                      </option>
                    ))}
                  </select>
                  {errors.homepage_hero_post_id && (
                    <p className="text-xs text-red-500">{errors.homepage_hero_post_id}</p>
                  )}
                </div>
              )}
            </div>

            {/* Hero images (slideshow) */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">
                Hero Slideshow Images
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => set("homepage_hero_images_mode", "auto")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    heroImagesMode === "auto"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Auto</span>
                    <span className="block text-xs text-muted-foreground">
                      Covers of the 3 latest published posts
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => set("homepage_hero_images_mode", "manual")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    heroImagesMode === "manual"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <ImagePlus className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Manual</span>
                    <span className="block text-xs text-muted-foreground">
                      Set 3 image URLs yourself
                    </span>
                  </span>
                </button>
              </div>

              {heroImagesMode === "manual" && (
                <div className="space-y-4 pt-1">
                  {HERO_IMAGE_FIELDS.map((field) => {
                    const value = draft[field.key] ?? "";
                    const preview = value.trim() ? resolveMediaUrl(value) : "";
                    return (
                      <div
                        key={field.key}
                        className="space-y-2 rounded-xl border border-border p-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <label className="block text-xs font-semibold text-foreground">
                            {field.label}
                          </label>
                          {preview && (
                            <button
                              type="button"
                              onClick={() => set(field.key, "")}
                              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition cursor-pointer"
                            >
                              <X className="h-3 w-3" /> Remove
                            </button>
                          )}
                        </div>
                        {preview ? (
                          <img
                            src={preview}
                            alt={`Hero image ${field.slot} preview`}
                            className="h-32 w-full rounded-lg border border-border object-cover"
                          />
                        ) : (
                          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
                            No image — default slide shown
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            ref={(el) => {
                              heroImageFieldRefs.current[field.key] = el;
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleHeroImageUpload(file, field.key);
                            }}
                          />
                          <button
                            type="button"
                            disabled={uploadingImage}
                            onClick={() => heroImageFieldRefs.current[field.key]?.click()}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
                          >
                            {uploadingImage ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" /> Uploading…
                              </>
                            ) : (
                              <>
                                <Upload className="h-3 w-3" /> Upload Image
                              </>
                            )}
                          </button>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => set(field.key, e.target.value)}
                            placeholder="…or paste an image URL directly"
                            className="flex-1 min-w-40 rounded-xl border border-border bg-background py-2 px-3 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                          />
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-xs text-muted-foreground">
                    Any empty field falls back to the default Unsplash slideshow automatically.
                  </p>
                </div>
              )}
            </div>

            {/* Hero text */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="homepage_hero_badge"
                  className="block text-xs font-semibold text-foreground"
                >
                  Badge Text
                </label>
                <input
                  id="homepage_hero_badge"
                  type="text"
                  value={draft.homepage_hero_badge ?? ""}
                  onChange={(e) => set("homepage_hero_badge", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="homepage_hero_title"
                  className="block text-xs font-semibold text-foreground"
                >
                  Hero Title *
                </label>
                <input
                  id="homepage_hero_title"
                  type="text"
                  value={draft.homepage_hero_title ?? ""}
                  onChange={(e) => set("homepage_hero_title", e.target.value)}
                  className={`w-full rounded-xl border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                    errors.homepage_hero_title ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.homepage_hero_title && (
                  <p className="text-xs text-red-500">{errors.homepage_hero_title}</p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="homepage_hero_title_highlight"
                  className="block text-xs font-semibold text-foreground"
                >
                  Title Accent Highlight
                </label>
                <input
                  id="homepage_hero_title_highlight"
                  type="text"
                  value={draft.homepage_hero_title_highlight ?? ""}
                  onChange={(e) => set("homepage_hero_title_highlight", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
                <p className="text-xs text-muted-foreground">
                  The second sentence of the title, rendered in the accent color.
                </p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="homepage_hero_description"
                  className="block text-xs font-semibold text-foreground"
                >
                  Description *
                </label>
                <textarea
                  id="homepage_hero_description"
                  rows={2}
                  value={draft.homepage_hero_description ?? ""}
                  onChange={(e) => set("homepage_hero_description", e.target.value)}
                  className={`w-full rounded-xl border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none ${
                    errors.homepage_hero_description ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.homepage_hero_description && (
                  <p className="text-xs text-red-500">{errors.homepage_hero_description}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homepage_hero_button_text"
                  className="block text-xs font-semibold text-foreground"
                >
                  Primary Button Text *
                </label>
                <input
                  id="homepage_hero_button_text"
                  type="text"
                  value={draft.homepage_hero_button_text ?? ""}
                  onChange={(e) => set("homepage_hero_button_text", e.target.value)}
                  className={`w-full rounded-xl border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                    errors.homepage_hero_button_text ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.homepage_hero_button_text && (
                  <p className="text-xs text-red-500">{errors.homepage_hero_button_text}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homepage_hero_button_link"
                  className="block text-xs font-semibold text-foreground"
                >
                  Primary Button Link
                </label>
                <input
                  id="homepage_hero_button_link"
                  type="text"
                  value={draft.homepage_hero_button_link ?? ""}
                  onChange={(e) => set("homepage_hero_button_link", e.target.value)}
                  placeholder="/blog or https://…"
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homepage_hero_secondary_button_text"
                  className="block text-xs font-semibold text-foreground"
                >
                  Secondary Button Text
                </label>
                <input
                  id="homepage_hero_secondary_button_text"
                  type="text"
                  value={draft.homepage_hero_secondary_button_text ?? ""}
                  onChange={(e) => set("homepage_hero_secondary_button_text", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homepage_hero_secondary_button_link"
                  className="block text-xs font-semibold text-foreground"
                >
                  Secondary Button Link
                </label>
                <input
                  id="homepage_hero_secondary_button_link"
                  type="text"
                  value={draft.homepage_hero_secondary_button_link ?? ""}
                  onChange={(e) => set("homepage_hero_secondary_button_link", e.target.value)}
                  placeholder="/destinations or https://…"
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>
          </section>

          {/* JOURNEY IN NUMBERS */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" /> Journey in Numbers
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  The stats strip (countries, trips, photos, kilometres, days) above the newsletter.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                <Globe className="h-3 w-3" /> Public
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">
                Countries Visited
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => set("homepage_stat_countries_mode", "auto")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    draft.homepage_stat_countries_mode === "manual"
                      ? "border-border bg-background hover:bg-muted"
                      : "border-accent bg-accent/10 text-accent"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Auto</span>
                    <span className="block text-xs text-muted-foreground">
                      Computed from post locations
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => set("homepage_stat_countries_mode", "manual")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                    draft.homepage_stat_countries_mode === "manual"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <BookMarked className="h-4 w-4" />
                  <span>
                    <span className="block font-semibold">Manual</span>
                    <span className="block text-xs text-muted-foreground">
                      Enter a fixed number
                    </span>
                  </span>
                </button>
              </div>
              {draft.homepage_stat_countries_mode === "manual" && (
                <div className="space-y-2">
                  <label
                    htmlFor="homepage_stat_countries"
                    className="block text-xs font-semibold text-foreground"
                  >
                    Number of Countries
                  </label>
                  <input
                    id="homepage_stat_countries"
                    type="number"
                    min={0}
                    value={draft.homepage_stat_countries ?? ""}
                    onChange={(e) => set("homepage_stat_countries", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="homepage_stat_trips"
                  className="block text-xs font-semibold text-foreground"
                >
                  Solo Motorcycle Trips
                </label>
                <input
                  id="homepage_stat_trips"
                  type="number"
                  min={0}
                  value={draft.homepage_stat_trips ?? ""}
                  onChange={(e) => set("homepage_stat_trips", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homepage_stat_kilometres"
                  className="block text-xs font-semibold text-foreground"
                >
                  Kilometres Travelled
                </label>
                <div className="flex gap-2">
                  <input
                    id="homepage_stat_kilometres"
                    type="number"
                    min={0}
                    value={draft.homepage_stat_kilometres ?? ""}
                    onChange={(e) => set("homepage_stat_kilometres", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <input
                    type="text"
                    value={draft.homepage_stat_kilometres_suffix ?? ""}
                    onChange={(e) => set("homepage_stat_kilometres_suffix", e.target.value)}
                    placeholder=" km"
                    className="w-20 rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium text-center outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homepage_stat_photos"
                  className="block text-xs font-semibold text-foreground"
                >
                  Photos Captured
                </label>
                <div className="flex gap-2">
                  <input
                    id="homepage_stat_photos"
                    type="number"
                    min={0}
                    value={draft.homepage_stat_photos ?? ""}
                    onChange={(e) => set("homepage_stat_photos", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <input
                    type="text"
                    value={draft.homepage_stat_photos_suffix ?? ""}
                    onChange={(e) => set("homepage_stat_photos_suffix", e.target.value)}
                    placeholder="K+"
                    className="w-20 rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium text-center outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homepage_stat_days"
                  className="block text-xs font-semibold text-foreground"
                >
                  Days on the Road
                </label>
                <input
                  id="homepage_stat_days"
                  type="number"
                  min={0}
                  value={draft.homepage_stat_days ?? ""}
                  onChange={(e) => set("homepage_stat_days", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>
          </section>

          {/* FEATURED POST */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-accent" /> Featured / Latest Blog Post
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Controls the “Featured Expedition” section shown on the homepage.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                <Globe className="h-3 w-3" /> Public
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => set("homepage_featured_mode", "auto")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                  featuredMode === "auto"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>
                  <span className="block font-semibold">Auto</span>
                  <span className="block text-xs text-muted-foreground">Latest featured post</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => set("homepage_featured_mode", "manual")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition cursor-pointer ${
                  featuredMode === "manual"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <BookMarked className="h-4 w-4" />
                <span>
                  <span className="block font-semibold">Manual</span>
                  <span className="block text-xs text-muted-foreground">Pick a specific post</span>
                </span>
              </button>
            </div>

            {featuredMode === "manual" && (
              <div className="space-y-2">
                <label
                  htmlFor="homepage_featured_post_id"
                  className="block text-xs font-semibold text-foreground"
                >
                  Select Blog Post
                </label>
                <select
                  id="homepage_featured_post_id"
                  value={draft.homepage_featured_post_id ?? ""}
                  onChange={(e) => set("homepage_featured_post_id", e.target.value)}
                  className={`w-full rounded-xl border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                    errors.homepage_featured_post_id ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">— Select a post —</option>
                  {posts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                      {p.featured ? " ★" : ""}
                    </option>
                  ))}
                </select>
                {errors.homepage_featured_post_id && (
                  <p className="text-xs text-red-500">{errors.homepage_featured_post_id}</p>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Live preview card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <ImagePlus className="h-4 w-4 text-accent" /> Hero Preview
            </div>
            {heroImage ? (
              <div className="relative overflow-hidden rounded-xl border border-border">
                <img src={heroImage} alt="Hero preview" className="h-40 w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-[10px] uppercase tracking-widest text-white/80">
                    {draft.homepage_hero_badge?.trim() || "Badge"}
                  </span>
                  <p className="font-display text-sm font-bold text-white line-clamp-2">
                    {draft.homepage_hero_title?.trim() || "Hero title"}{" "}
                    <span className="text-accent">
                      {draft.homepage_hero_title_highlight?.trim()}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-center text-xs text-muted-foreground">
                Upload a hero image
                <br />
                to preview it here
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {heroMode === "auto"
                ? "Hero story uses the latest published post automatically."
                : "Hero story uses the post you selected manually."}{" "}
              {heroImagesMode === "auto"
                ? "Slideshow images come from the 3 latest posts."
                : "Slideshow images use your 3 manual URLs."}
            </p>
          </div>

          {/* Security card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
            <h3 className="font-display text-sm font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" /> Security & Architecture
            </h3>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Admin Only:</strong> Only authenticated admins
                  and editors can save changes — enforced by RLS and server-side role checks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Instant:</strong> Reuses the existing site
                  settings table — no new schema, changes appear on the homepage immediately after
                  saving.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Safe Defaults:</strong> Primary and secondary
                  CTAs default back to /blog and /destinations if left empty.
                </span>
              </li>
            </ul>
          </div>

          {/* Hints card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3">
            <h3 className="font-display text-sm font-semibold">Tips</h3>
            <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
              <li>Use the Auto mode unless you want to pin a specific story.</li>
              <li>Uploaded hero images are stored in Supabase Storage.</li>
              <li>Hit Cancel to discard unsaved edits and return to the last saved state.</li>
            </ul>
          </div>
        </aside>
      </form>

      {/* Lightbox for full-size image inspection */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="max-h-full max-w-5xl w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
              <span className="text-sm font-semibold text-white">{lightbox.label}</span>
              <a
                href={lightbox.src}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/70 underline-offset-2 hover:underline"
              >
                Open in new tab
              </a>
            </div>
            <img
              src={lightbox.src}
              alt={`${lightbox.label} full preview`}
              className="max-h-[78vh] w-full bg-zinc-950 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
