import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Sparkles,
  BookMarked,
  Upload,
  Loader2,
  Save,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ImageOff,
} from "lucide-react";
import { toast } from "sonner";
import { adminUploadImage, resolveMediaUrl } from "@/lib/admin.functions";
import { adminUpdateSetting } from "@/lib/settings.functions";
import { adminGetPageHeroEditor, PAGE_HERO_KEYS, type PageId } from "@/lib/page-hero.functions";
import { listDestinations } from "@/lib/destinations.functions";
import { listGallery } from "@/lib/gallery.functions";

type HeroImageOption = { value: string; label: string; image: string };

type HeroBannerManagerProps = {
  page: PageId;
  title?: string;
  description?: string;
  autoHint?: string;
  manualHint?: string;
  optionsLabel?: string;
};

function DefaultBannerPreview({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-zinc-950 p-4 text-center">
      <ImageOff className="h-6 w-6 text-muted-foreground/50" />
      <p className="text-xs font-medium text-muted-foreground">Default banner</p>
      <p className="text-[11px] leading-relaxed text-muted-foreground/70">{label}</p>
    </div>
  );
}

export function HeroBannerManager({
  page,
  title = "Hero Banner Management",
  description = "Configure the banner image at the top of this page.",
  autoHint = "Automatically uses a suitable image from this page's existing content.",
  manualHint = "Pick an image manually from the CMS content below, upload one, or paste a URL.",
  optionsLabel = "Available CMS Images",
}: HeroBannerManagerProps) {
  const qc = useQueryClient();
  const getEditorFn = useServerFn(adminGetPageHeroEditor);
  const updateSettingFn = useServerFn(adminUpdateSetting);
  const uploadFn = useServerFn(adminUploadImage);

  const keys = PAGE_HERO_KEYS[page];

  const destinationsFn = useServerFn(listDestinations);
  const galleryFn = useServerFn(listGallery);

  const { data: saved } = useQuery<{ mode: "auto" | "manual"; image: string; autoImage: string }>({
    queryKey: ["page-hero-editor", page],
    queryFn: async () => await getEditorFn({ data: page }),
  });

  const { data: options } = useQuery<HeroImageOption[]>({
    queryKey: ["page-hero-options", page],
    queryFn: async () => {
      if (page === "destinations") {
        const rows: any[] = (await destinationsFn()) as any;
        return (rows ?? [])
          .map((d) => ({
            value: d.featured_image || "",
            label: d.title || "Destination",
            image: d.featured_image || "",
          }))
          .filter((o) => Boolean(o.image));
      }
      const items: any[] = (await galleryFn()) as any;
      return (items ?? [])
        .map((g) => ({
          value: g.image_url || "",
          label: g.caption || "Gallery image",
          image: g.image_url || "",
        }))
        .filter((o) => Boolean(o.image));
    },
  });

  const [draftMode, setDraftMode] = useState<"auto" | "manual">("auto");
  const [draftImage, setDraftImage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [txtValue, setTxtValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (saved && !isLoaded) {
      setDraftMode(saved.mode);
      setDraftImage(saved.image);
      setTxtValue(resolveMediaUrl(saved.image));
      setIsLoaded(true);
    }
  }, [saved, isLoaded]);

  const isDirty = useMemo(
    () =>
      isLoaded && (draftMode !== (saved?.mode ?? "auto") || draftImage !== (saved?.image ?? "")),
    [isLoaded, draftMode, draftImage, saved],
  );

  const autoSource = useMemo(() => {
    if (saved?.mode !== "auto") return null;
    if (saved?.autoImage) return saved.autoImage;
    return (options ?? []).find((o) => o.image)?.image ?? "";
  }, [saved, options]);

  const effectiveImage =
    draftMode === "manual"
      ? draftImage.trim()
        ? resolveMediaUrl(draftImage)
        : ""
      : saved?.mode === "auto"
        ? autoSource
        : "";

  const save = useMutation({
    mutationFn: async () => {
      await updateSettingFn({
        data: {
          key: keys.mode,
          value: draftMode,
          description: `Hero banner mode for the ${page} page (auto|manual)`,
        },
      });
      await updateSettingFn({
        data: {
          key: keys.image,
          value: draftImage,
          description: `Manual hero banner image for the ${page} page`,
        },
      });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["page-hero-editor", page] });
      await qc.invalidateQueries({ queryKey: ["page-hero", page] });
      toast.success("Hero banner settings saved!");
    },
    onError: (e: Error) => {
      toast.error(e.message || "Failed to save hero banner settings");
    },
  });

  function handleReset() {
    setDraftMode(saved?.mode ?? "auto");
    setDraftImage(saved?.image ?? "");
    setTxtValue(resolveMediaUrl(saved?.image ?? ""));
  }

  async function upload(file: File) {
    try {
      setUploading(true);
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      setDraftImage(url);
      setTxtValue(resolveMediaUrl(url));
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
      <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-foreground">
            <BookMarked className="h-5 w-5 text-accent" />
            <span>{title}</span>
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
          <Sparkles className="h-3 w-3" /> Public
        </span>
      </div>

      {!isLoaded ? (
        <div className="flex h-32 items-center justify-center text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-accent" />
        </div>
      ) : (
        <>
          {/* Mode toggle */}
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setDraftMode("auto")}
              className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${
                draftMode === "auto"
                  ? "border-accent bg-accent/10 text-accent font-medium shadow-xs"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${draftMode === "auto" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}
              >
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <span className="block font-semibold">Auto Mode</span>
                <span className="block text-xs text-muted-foreground">{autoHint}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDraftMode("manual")}
              className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${
                draftMode === "manual"
                  ? "border-brand bg-brand/10 text-brand font-medium shadow-xs"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${draftMode === "manual" ? "bg-brand/20 text-brand" : "bg-muted text-muted-foreground"}`}
              >
                <BookMarked className="h-4 w-4" />
              </div>
              <div>
                <span className="block font-semibold">Manual Mode</span>
                <span className="block text-xs text-muted-foreground">{manualHint}</span>
              </div>
            </button>
          </div>

          {/* Live preview */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-foreground">Live Preview (16:9)</label>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
              {effectiveImage ? (
                <img
                  src={effectiveImage}
                  alt="Current hero banner preview"
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <DefaultBannerPreview
                  label={
                    draftMode === "manual"
                      ? "No manual image set — the default banner will be shown."
                      : "No suitable image found yet — the default banner will be shown."
                  }
                />
              )}
            </div>
          </div>

          {/* Auto mode info card */}
          {draftMode === "auto" && (
            <div className="rounded-xl border border-accent/25 bg-accent/5 p-4 space-y-2 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span>Automatically Selected From CMS Content</span>
                </span>
                <span className="text-muted-foreground text-[11px]">
                  Updates automatically as content changes
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Switching to Manual preserves this automatic selection in the background — your
                manual choice will be restored whenever you switch back.
              </p>
            </div>
          )}

          {/* Manual mode controls */}
          {draftMode === "manual" && (
            <div className="space-y-4 pt-1">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">{optionsLabel}</label>
                {options && options.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {options.map((option) => {
                      const selected = resolveMediaUrl(draftImage) === option.image;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setDraftImage(option.value);
                            setTxtValue(option.image);
                          }}
                          className={`group overflow-hidden rounded-xl border text-left transition cursor-pointer ${
                            selected
                              ? "border-accent ring-1 ring-accent bg-accent/10"
                              : "border-border bg-background hover:border-accent/50"
                          }`}
                        >
                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                            <img
                              src={option.image}
                              alt={option.label}
                              loading="lazy"
                              className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                            />
                            {selected && (
                              <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-background">
                                <CheckCircle2 className="h-3 w-3" /> Selected
                              </span>
                            )}
                          </div>
                          <p className="truncate px-2 py-1.5 text-[11px] font-medium text-foreground">
                            {option.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground">
                    No images available in CMS content yet. Upload an image or paste a URL below.
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">Image URL</label>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors w-full sm:w-auto shrink-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                      className="hidden"
                    />
                    {uploading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5 text-accent" /> Upload Image
                      </>
                    )}
                  </label>
                  <input
                    value={txtValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTxtValue(val);
                      setDraftImage(val);
                    }}
                    placeholder="or paste/CMS image URL"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                  />
                  {effectiveImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setDraftImage("");
                        setTxtValue("");
                      }}
                      className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition cursor-pointer font-medium shrink-0"
                    >
                      Clear to Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Save bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <div className="flex items-center gap-2">
              {save.isPending && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...
                </span>
              )}
              {save.isSuccess && !isDirty && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-600 animate-fade-in">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Saved to database
                </span>
              )}
              {save.isError && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1 text-xs font-semibold text-red-600 animate-fade-in">
                  <XCircle className="h-3.5 w-3.5" /> Save failed
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={handleReset}
                disabled={!isDirty || save.isPending}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button
                type="button"
                onClick={() => save.mutate()}
                disabled={!isDirty || save.isPending || uploading}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  !isDirty || save.isPending || uploading
                    ? "opacity-50 cursor-not-allowed bg-brand/70 text-white"
                    : "bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand/90"
                }`}
              >
                {save.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Hero Banner</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
