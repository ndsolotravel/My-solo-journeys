import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useRef } from "react";
import {
  User,
  Compass,
  Quote,
  Save,
  RotateCcw,
  Loader2,
  ExternalLink,
  Sparkles,
  Upload,
  Trash2,
  Eye,
  FileText,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { adminGetAboutEditor, adminSaveAboutSettings, ABOUT_DEFAULTS } from "@/lib/about.functions";
import { adminUploadImage } from "@/lib/admin.functions";
import { resolveMediaUrl } from "@/lib/media";
import aboutPortrait from "@/assets/nd-about.jpg";

export const Route = createFileRoute("/_authenticated/admin/about")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "About Page Management — Admin CMS" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminAboutPage,
});

type TabType = "hero" | "profile" | "philosophy";

function AdminAboutPage() {
  const getEditorFn = useServerFn(adminGetAboutEditor);
  const saveSettingsFn = useServerFn(adminSaveAboutSettings);
  const uploadFn = useServerFn(adminUploadImage);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-about"],
    queryFn: () => getEditorFn(),
  });

  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [original, setOriginal] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.settings) {
      setOriginal(data.settings);
      setDraft(data.settings);
      setIsDirty(false);
    }
  }, [data]);

  const updateField = (key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleReset = () => {
    setDraft(original);
    setIsDirty(false);
    toast.info("Changes reset to last saved state");
  };

  // Image upload handler using adminUploadImage
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: "about_hero_image" | "about_profile_image"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPEG, PNG, WebP)");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image file must be smaller than 8MB");
      return;
    }

    const toastId = toast.loading(`Uploading ${file.name}...`);
    setUploadingField(fieldKey);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await uploadFn({
            data: {
              dataUrl: base64Data,
              filename: `about-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
              folder: "about",
            },
          });

          if (res?.url) {
            updateField(fieldKey, res.url);
            toast.success("Image uploaded and set successfully!", { id: toastId });
          } else {
            throw new Error("Upload did not return a valid URL");
          }
        } catch (err: any) {
          toast.error(err.message || "Failed to upload image", { id: toastId });
        } finally {
          setUploadingField(null);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      toast.error(err.message || "Failed to process image file", { id: toastId });
      setUploadingField(null);
    } finally {
      e.target.value = "";
    }
  };

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      return await saveSettingsFn({ data: { settings: draft } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-about"] });
      queryClient.invalidateQueries({ queryKey: ["public-site-settings"] });
      setOriginal(draft);
      setIsDirty(false);
      toast.success("About page saved successfully! Changes are live.");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to save about page changes");
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm">Loading About Page data...</p>
        </div>
      </div>
    );
  }

  const heroImageVal = draft.about_hero_image || ABOUT_DEFAULTS.about_hero_image;
  const profileImageVal = draft.about_profile_image;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand/10 text-brand">
              <User className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                About Page Management
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage hero banner, portrait, biography, and travel philosophy for the About page.
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Eye className="h-3.5 w-3.5 text-accent" />
            <span>View Live Page</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground ml-0.5" />
          </Link>

          {isDirty && (
            <button
              type="button"
              onClick={handleReset}
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={!isDirty || saveMutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {saveMutation.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>{saveMutation.isPending ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Dirty Indicator Banner */}
      {isDirty && (
        <div className="flex items-center justify-between rounded-xl bg-brand/10 border border-brand/20 px-4 py-2.5 text-xs text-brand animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-accent" />
            <span className="font-medium">
              You have unsaved changes. Click &quot;Save Changes&quot; to update the live About page.
            </span>
          </div>
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="font-bold underline hover:opacity-80 cursor-pointer"
          >
            Save now
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border pb-px scrollbar-none">
        {[
          { id: "hero", label: "Hero Section", icon: Compass },
          { id: "profile", label: "Profile & Biography", icon: User },
          { id: "philosophy", label: "Travel Philosophy", icon: Quote },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "border-accent text-accent font-semibold"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hidden File Inputs for Storage Uploads */}
      <input
        ref={heroFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "about_hero_image")}
      />
      <input
        ref={profileFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "about_profile_image")}
      />

      {/* -------------------------------------------------------------
          TAB 1: HERO SECTION
         ------------------------------------------------------------- */}
      {activeTab === "hero" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Compass className="h-4 w-4 text-accent" />
                <span>Hero Content &amp; Headlines</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Hero Badge Label
                  </label>
                  <input
                    type="text"
                    value={draft.about_hero_label ?? ""}
                    onChange={(e) => updateField("about_hero_label", e.target.value)}
                    placeholder="e.g. The Story Behind NDSOLOTRAVEL"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Small uppercase pill badge displayed above the main headline.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={draft.about_hero_headline ?? ""}
                    onChange={(e) => updateField("about_hero_headline", e.target.value)}
                    placeholder="e.g. Solo, slow, and almost always uphill."
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-display font-bold"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    The primary H1 title displayed on the hero banner.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Hero Image Alt Text
                  </label>
                  <input
                    type="text"
                    value={draft.about_hero_image_alt ?? ""}
                    onChange={(e) => updateField("about_hero_image_alt", e.target.value)}
                    placeholder="e.g. Karakoram mountain pass and solo road"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Hero Image Management */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-accent" />
                  <span>Hero Background Image</span>
                </h2>
                {draft.about_hero_image && (
                  <button
                    type="button"
                    onClick={() => updateField("about_hero_image", "")}
                    className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Reset to Default</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Hero Image URL or Google Drive Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={draft.about_hero_image ?? ""}
                    onChange={(e) => updateField("about_hero_image", e.target.value)}
                    placeholder="https://... or Google Drive link"
                    className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => heroFileInputRef.current?.click()}
                    disabled={uploadingField === "about_hero_image"}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {uploadingField === "about_hero_image" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 text-accent" />
                    )}
                    <span>{draft.about_hero_image ? "Replace" : "Upload"}</span>
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Supports Google Drive view links, direct URLs, or direct image file uploads.
                </p>
              </div>
            </div>
          </div>

          {/* Hero Live Preview Card */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-accent" />
                <span>Hero Banner Preview</span>
              </h3>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
                <img
                  src={resolveMediaUrl(heroImageVal)}
                  alt={draft.about_hero_image_alt || "Hero preview"}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                    {draft.about_hero_label || ABOUT_DEFAULTS.about_hero_label}
                  </span>
                  <h4 className="font-display text-base font-bold leading-tight mt-1 line-clamp-2">
                    {draft.about_hero_headline || ABOUT_DEFAULTS.about_hero_headline}
                  </h4>
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-3 text-[11px] text-muted-foreground space-y-1">
                <p>
                  <strong>Dimensions:</strong> High resolution horizontal imagery (1920x1080 recommended).
                </p>
                <p>
                  <strong>Display:</strong> Rendered with atmospheric gradient overlay to preserve typography contrast.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: PROFILE & BIOGRAPHY
         ------------------------------------------------------------- */}
      {activeTab === "profile" && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column: Portrait Upload & Settings */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-accent" />
                  <span>Profile Portrait</span>
                </h2>
                {draft.about_profile_image && (
                  <button
                    type="button"
                    onClick={() => updateField("about_profile_image", "")}
                    className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Reset to Default</span>
                  </button>
                )}
              </div>

              <div className="relative aspect-[4/5] w-full max-w-[280px] mx-auto overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
                <img
                  src={profileImageVal ? resolveMediaUrl(profileImageVal) : aboutPortrait}
                  alt={draft.about_profile_image_alt || "Portrait preview"}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Portrait Image URL or Google Drive Link
                  </label>
                  <input
                    type="text"
                    value={draft.about_profile_image ?? ""}
                    onChange={(e) => updateField("about_profile_image", e.target.value)}
                    placeholder="https://... or Google Drive link"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => profileFileInputRef.current?.click()}
                    disabled={uploadingField === "about_profile_image"}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {uploadingField === "about_profile_image" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 text-accent" />
                    )}
                    <span>{draft.about_profile_image ? "Replace Portrait" : "Upload Portrait"}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Portrait Alt Text
                  </label>
                  <input
                    type="text"
                    value={draft.about_profile_image_alt ?? ""}
                    onChange={(e) => updateField("about_profile_image_alt", e.target.value)}
                    placeholder="e.g. Hussain — Solo explorer behind NDSOLOTRAVEL"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Biography Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" />
                <span>Biography &amp; Narrative</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Biography Section Title
                  </label>
                  <input
                    type="text"
                    value={draft.about_biography_title ?? ""}
                    onChange={(e) => updateField("about_biography_title", e.target.value)}
                    placeholder="e.g. From Engineering Problem-Solving to the Freedom of the Open Road"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Introduction Lead Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={draft.about_biography_intro ?? ""}
                    onChange={(e) => updateField("about_biography_intro", e.target.value)}
                    placeholder="Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world..."
                    className="w-full rounded-xl border border-border bg-background p-3.5 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed resize-y"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Prominent opening lead paragraph displayed in bold font weight next to the portrait.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 3: TRAVEL PHILOSOPHY
         ------------------------------------------------------------- */}
      {activeTab === "philosophy" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Quote className="h-4 w-4 text-accent" />
                <span>Travel Philosophy Card</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={draft.about_philosophy_title ?? ""}
                    onChange={(e) => updateField("about_philosophy_title", e.target.value)}
                    placeholder="e.g. Travel Philosophy"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Featured Quote
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about_philosophy_quote ?? ""}
                    onChange={(e) => updateField("about_philosophy_quote", e.target.value)}
                    placeholder="e.g. Solo travel is where the journey becomes the destination."
                    className="w-full rounded-xl border border-border bg-background p-3.5 text-base italic text-foreground focus:border-accent focus:outline-none leading-relaxed"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    The core featured quote displayed in large italic typography.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Supporting Description
                  </label>
                  <textarea
                    rows={4}
                    value={draft.about_philosophy_description ?? ""}
                    onChange={(e) => updateField("about_philosophy_description", e.target.value)}
                    placeholder="You do not need a tour operator, a large budget, or a 100-page itinerary to discover the world..."
                    className="w-full rounded-xl border border-border bg-background p-3.5 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Accompanying narrative detailing the exploration ethos and solo travel mindset.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Live Preview */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-accent" />
                <span>Philosophy Card Preview</span>
              </h3>

              <div className="rounded-2xl bg-muted/40 p-6 border border-border/50 shadow-sm space-y-3">
                <h4 className="font-display text-lg font-bold text-foreground">
                  {draft.about_philosophy_title || ABOUT_DEFAULTS.about_philosophy_title}
                </h4>
                <blockquote className="text-base italic leading-relaxed text-foreground/90 font-medium">
                  &quot;{draft.about_philosophy_quote || ABOUT_DEFAULTS.about_philosophy_quote}&quot;
                </blockquote>
                {draft.about_philosophy_description && (
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {draft.about_philosophy_description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
