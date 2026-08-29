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
  Mountain,
  Bike,
  Route as RouteIcon,
  Globe,
  Layers,
  Flag,
  Search,
  Settings as SettingsIcon,
  Plus,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Shield,
  Heart,
  Wrench,
  Navigation,
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminGetAboutEditor,
  adminSaveAboutSettings,
  ABOUT_DEFAULTS,
  parseJson,
  DEFAULT_HERO_BADGES,
  DEFAULT_DOSSIER_ITEMS,
  DEFAULT_WHY_TRAVEL_CARDS,
  DEFAULT_MOTORCYCLE_FEATURES,
  DEFAULT_TREKKING_CARDS,
  DEFAULT_PHILOSOPHY_CARDS,
  DEFAULT_NUMBER_STATS,
  DEFAULT_TERRAIN_TAGS,
  DEFAULT_CONTENT_CARDS,
  type AboutHeroBadge,
  type AboutDossierItem,
  type AboutWhyTravelCard,
  type AboutMotorcycleFeature,
  type AboutTrekkingCard,
  type AboutPhilosophyCard,
  type AboutNumberStat,
  type AboutTerrainTag,
  type AboutContentCard,
} from "@/lib/about.functions";
import { adminUploadImage, resolveMediaUrl } from "@/lib/admin.functions";
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

// ---------------------------------------------------------------------------
// Section Definitions for CMS Navigation
// ---------------------------------------------------------------------------
const SECTIONS = [
  { id: "hero", label: "1. Hero Section", icon: Compass },
  { id: "profile", label: "2. Introduction & Profile", icon: User },
  { id: "why-travel", label: "3. Why I Travel", icon: Heart },
  { id: "motorcycle", label: "4. Motorcycle Adventures", icon: Bike },
  { id: "trekking", label: "5. Trekking & High Altitude", icon: Mountain },
  { id: "philosophy", label: "6. Philosophy Quote", icon: Quote },
  { id: "philosophy-cards", label: "7. Philosophy Cards", icon: Shield },
  { id: "numbers", label: "8. Journey in Numbers", icon: Globe },
  { id: "content", label: "9. What You Will Find", icon: Layers },
  { id: "cta", label: "10. Final Call To Action", icon: Flag },
  { id: "seo", label: "11. SEO Management", icon: Search },
  { id: "settings", label: "12. Page Settings", icon: SettingsIcon },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

// Common toggle component
function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
          checked ? "bg-accent" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
      {label && <span className="text-xs font-medium text-foreground">{label}</span>}
    </label>
  );
}

function AdminAboutPage() {
  const getEditorFn = useServerFn(adminGetAboutEditor);
  const saveSettingsFn = useServerFn(adminSaveAboutSettings);
  const uploadFn = useServerFn(adminUploadImage);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-about"],
    queryFn: () => getEditorFn(),
  });

  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [original, setOriginal] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Hidden file inputs for direct uploads
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const motoFileInputRef = useRef<HTMLInputElement>(null);
  const trekFileInputRef = useRef<HTMLInputElement>(null);
  const ogFileInputRef = useRef<HTMLInputElement>(null);

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

  // Image upload handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: string
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
      toast.success("About page saved successfully! All updates are live.");
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
          <p className="text-sm">Loading About Page Management...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Repeatable JSON collections state helpers
  // -------------------------------------------------------------------------
  const heroBadges = parseJson<AboutHeroBadge[]>(
    draft.about_hero_badges,
    DEFAULT_HERO_BADGES
  );
  const dossierItems = parseJson<AboutDossierItem[]>(
    draft.about_profile_dossier,
    DEFAULT_DOSSIER_ITEMS
  );
  const whyTravelCards = parseJson<AboutWhyTravelCard[]>(
    draft.about_why_travel_cards,
    DEFAULT_WHY_TRAVEL_CARDS
  );
  const motorcycleFeatures = parseJson<AboutMotorcycleFeature[]>(
    draft.about_motorcycle_features,
    DEFAULT_MOTORCYCLE_FEATURES
  );
  const trekkingCards = parseJson<AboutTrekkingCard[]>(
    draft.about_trekking_cards,
    DEFAULT_TREKKING_CARDS
  );
  const philosophyCards = parseJson<AboutPhilosophyCard[]>(
    draft.about_philosophy_cards,
    DEFAULT_PHILOSOPHY_CARDS
  );
  const numberStats = parseJson<AboutNumberStat[]>(
    draft.about_numbers_stats,
    DEFAULT_NUMBER_STATS
  );
  const terrainTags = parseJson<AboutTerrainTag[]>(
    draft.about_numbers_tags,
    DEFAULT_TERRAIN_TAGS
  );
  const contentCards = parseJson<AboutContentCard[]>(
    draft.about_content_cards,
    DEFAULT_CONTENT_CARDS
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <User className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              About Page Management
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Complete structured control over all 10 visual sections, SEO, and page visibility.
            </p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs"
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

      {/* Unsaved Changes Banner */}
      {isDirty && (
        <div className="flex items-center justify-between rounded-xl bg-brand/10 border border-brand/20 px-4 py-2.5 text-xs text-brand animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-accent" />
            <span className="font-medium">
              You have unsaved changes. Click &quot;Save Changes&quot; to apply them to the live About page.
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

      {/* Hidden File Inputs */}
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
      <input
        ref={motoFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "about_motorcycle_image")}
      />
      <input
        ref={trekFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "about_trekking_image")}
      />
      <input
        ref={ogFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "about_og_image")}
      />

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border pb-2 scrollbar-thin">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-brand text-white shadow-sm shadow-brand/20 font-semibold"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-accent"}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          SECTION 1: HERO
         ========================================================================= */}
      {activeSection === "hero" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Compass className="h-4 w-4 text-accent" />
                  <span>Section 1: Hero Content</span>
                </h2>
                <ToggleSwitch
                  checked={draft.about_hero_enabled !== "false"}
                  onChange={(val) => updateField("about_hero_enabled", val ? "true" : "false")}
                  label={draft.about_hero_enabled !== "false" ? "Enabled" : "Disabled"}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Hero Eyebrow / Label
                  </label>
                  <input
                    type="text"
                    value={draft.about_hero_label ?? ""}
                    onChange={(e) => updateField("about_hero_label", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={draft.about_hero_headline ?? ""}
                    onChange={(e) => updateField("about_hero_headline", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-display font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Hero Supporting Text / Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about_hero_subtitle ?? ""}
                    onChange={(e) => updateField("about_hero_subtitle", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Hero Image Management */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-accent" />
                  <span>Hero Background Image</span>
                </h3>
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
                  Image URL or Google Drive Link
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
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Hero Image Alt Text
                </label>
                <input
                  type="text"
                  value={draft.about_hero_image_alt ?? ""}
                  onChange={(e) => updateField("about_hero_image_alt", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Hero Adventure Badges Repeatable */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Hero Adventure Badges ({heroBadges.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const newItem: AboutHeroBadge = {
                      id: String(Date.now()),
                      icon: "Compass",
                      label: "New Badge",
                      enabled: true,
                    };
                    updateField("about_hero_badges", JSON.stringify([...heroBadges, newItem]));
                  }}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Badge</span>
                </button>
              </div>

              <div className="space-y-3">
                {heroBadges.map((badge, idx) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/80 bg-background/60"
                  >
                    <input
                      type="text"
                      placeholder="Icon name (e.g. Bike, Mountain, Globe, Camera)"
                      value={badge.icon}
                      onChange={(e) => {
                        const updated = [...heroBadges];
                        updated[idx].icon = e.target.value;
                        updateField("about_hero_badges", JSON.stringify(updated));
                      }}
                      className="w-32 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Badge label"
                      value={badge.label}
                      onChange={(e) => {
                        const updated = [...heroBadges];
                        updated[idx].label = e.target.value;
                        updateField("about_hero_badges", JSON.stringify(updated));
                      }}
                      className="flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-medium"
                    />
                    <ToggleSwitch
                      checked={badge.enabled}
                      onChange={(val) => {
                        const updated = [...heroBadges];
                        updated[idx].enabled = val;
                        updateField("about_hero_badges", JSON.stringify(updated));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = heroBadges.filter((_, i) => i !== idx);
                        updateField("about_hero_badges", JSON.stringify(updated));
                      }}
                      className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Live Preview */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-accent" />
                <span>Hero Preview</span>
              </h3>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
                <img
                  src={resolveMediaUrl(draft.about_hero_image || ABOUT_DEFAULTS.about_hero_image)}
                  alt="Hero preview"
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
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: INTRODUCTION / PROFILE
         ========================================================================= */}
      {activeSection === "profile" && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Portrait & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-accent" />
                  <span>Profile Portrait</span>
                </h2>
                <ToggleSwitch
                  checked={draft.about_profile_enabled !== "false"}
                  onChange={(val) => updateField("about_profile_enabled", val ? "true" : "false")}
                  label={draft.about_profile_enabled !== "false" ? "Enabled" : "Disabled"}
                />
              </div>

              <div className="relative aspect-[4/5] w-full max-w-[260px] mx-auto overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
                <img
                  src={
                    draft.about_profile_image
                      ? resolveMediaUrl(draft.about_profile_image)
                      : aboutPortrait
                  }
                  alt="Portrait preview"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Portrait URL or Google Drive Link
                  </label>
                  <input
                    type="text"
                    value={draft.about_profile_image ?? ""}
                    onChange={(e) => updateField("about_profile_image", e.target.value)}
                    placeholder="https://... or Google Drive link"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => profileFileInputRef.current?.click()}
                  disabled={uploadingField === "about_profile_image"}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {uploadingField === "about_profile_image" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5 text-accent" />
                  )}
                  <span>{draft.about_profile_image ? "Replace Portrait" : "Upload Portrait"}</span>
                </button>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Name</label>
                    <input
                      type="text"
                      value={draft.about_profile_name ?? ""}
                      onChange={(e) => updateField("about_profile_name", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Role</label>
                    <input
                      type="text"
                      value={draft.about_profile_role ?? ""}
                      onChange={(e) => updateField("about_profile_role", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Tagline</label>
                  <input
                    type="text"
                    value={draft.about_profile_tagline ?? ""}
                    onChange={(e) => updateField("about_profile_tagline", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Portrait Alt Text
                  </label>
                  <input
                    type="text"
                    value={draft.about_profile_image_alt ?? ""}
                    onChange={(e) => updateField("about_profile_image_alt", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Expedition Dossier Repeatable */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <span>Expedition Dossier ({dossierItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const newItem: AboutDossierItem = {
                      id: String(Date.now()),
                      label: "New Spec",
                      value: "Spec Value",
                      icon: "MapPin",
                      enabled: true,
                    };
                    updateField("about_profile_dossier", JSON.stringify([...dossierItems, newItem]));
                  }}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Spec</span>
                </button>
              </div>

              <div className="space-y-3">
                {dossierItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-border/80 bg-background/60 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Label"
                        value={item.label}
                        onChange={(e) => {
                          const updated = [...dossierItems];
                          updated[idx].label = e.target.value;
                          updateField("about_profile_dossier", JSON.stringify(updated));
                        }}
                        className="flex-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Icon"
                        value={item.icon}
                        onChange={(e) => {
                          const updated = [...dossierItems];
                          updated[idx].icon = e.target.value;
                          updateField("about_profile_dossier", JSON.stringify(updated));
                        }}
                        className="w-24 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                      />
                      <ToggleSwitch
                        checked={item.enabled}
                        onChange={(val) => {
                          const updated = [...dossierItems];
                          updated[idx].enabled = val;
                          updateField("about_profile_dossier", JSON.stringify(updated));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = dossierItems.filter((_, i) => i !== idx);
                          updateField("about_profile_dossier", JSON.stringify(updated));
                        }}
                        className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Value"
                      value={item.value}
                      onChange={(e) => {
                        const updated = [...dossierItems];
                        updated[idx].value = e.target.value;
                        updateField("about_profile_dossier", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Narrative Story & Engineering Evolution */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" />
                <span>Biography &amp; Narrative</span>
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Section Eyebrow
                    </label>
                    <input
                      type="text"
                      value={draft.about_profile_eyebrow ?? ""}
                      onChange={(e) => updateField("about_profile_eyebrow", e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Biography Title
                    </label>
                    <input
                      type="text"
                      value={draft.about_biography_title ?? ""}
                      onChange={(e) => updateField("about_biography_title", e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Introduction Lead Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about_biography_intro ?? ""}
                    onChange={(e) => updateField("about_biography_intro", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Biography Body Paragraphs (separated by blank lines)
                  </label>
                  <textarea
                    rows={7}
                    value={draft.about_biography_paragraphs ?? ""}
                    onChange={(e) => updateField("about_biography_paragraphs", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed font-mono"
                  />
                </div>

                {/* Highlight Box */}
                <div className="p-4 rounded-xl border border-border/80 bg-muted/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-accent" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Engineering Callout Box
                    </span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Callout Title
                    </label>
                    <input
                      type="text"
                      value={draft.about_profile_highlight_title ?? ""}
                      onChange={(e) => updateField("about_profile_highlight_title", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Callout Description
                    </label>
                    <textarea
                      rows={3}
                      value={draft.about_profile_highlight_text ?? ""}
                      onChange={(e) => updateField("about_profile_highlight_text", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground"
                    />
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2 p-3 rounded-xl border border-border/60">
                    <span className="text-xs font-semibold text-foreground">Primary CTA</span>
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={draft.about_profile_cta_primary_text ?? ""}
                      onChange={(e) => updateField("about_profile_cta_primary_text", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={draft.about_profile_cta_primary_url ?? ""}
                      onChange={(e) => updateField("about_profile_cta_primary_url", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>

                  <div className="space-y-2 p-3 rounded-xl border border-border/60">
                    <span className="text-xs font-semibold text-foreground">Secondary CTA</span>
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={draft.about_profile_cta_secondary_text ?? ""}
                      onChange={(e) => updateField("about_profile_cta_secondary_text", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={draft.about_profile_cta_secondary_url ?? ""}
                      onChange={(e) => updateField("about_profile_cta_secondary_url", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: WHY I TRAVEL
         ========================================================================= */}
      {activeSection === "why-travel" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                <span>Section 3: Why I Travel</span>
              </h2>
              <ToggleSwitch
                checked={draft.about_why_travel_enabled !== "false"}
                onChange={(val) => updateField("about_why_travel_enabled", val ? "true" : "false")}
                label={draft.about_why_travel_enabled !== "false" ? "Enabled" : "Disabled"}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Section Eyebrow
                </label>
                <input
                  type="text"
                  value={draft.about_why_travel_eyebrow ?? ""}
                  onChange={(e) => updateField("about_why_travel_eyebrow", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Section Title
                </label>
                <input
                  type="text"
                  value={draft.about_why_travel_title ?? ""}
                  onChange={(e) => updateField("about_why_travel_title", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Section Description
              </label>
              <textarea
                rows={2}
                value={draft.about_why_travel_description ?? ""}
                onChange={(e) => updateField("about_why_travel_description", e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Repeatable Cards */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Why I Travel Cards ({whyTravelCards.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newCard: AboutWhyTravelCard = {
                    id: String(Date.now()),
                    icon: "Compass",
                    title: "New Travel Principle",
                    description: "Principle description explaining the ethos.",
                    order: whyTravelCards.length + 1,
                    enabled: true,
                  };
                  updateField("about_why_travel_cards", JSON.stringify([...whyTravelCards, newCard]));
                }}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Card</span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {whyTravelCards.map((card, idx) => (
                <div
                  key={card.id}
                  className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Icon (e.g. Compass, Heart, Shield)"
                      value={card.icon}
                      onChange={(e) => {
                        const updated = [...whyTravelCards];
                        updated[idx].icon = e.target.value;
                        updateField("about_why_travel_cards", JSON.stringify(updated));
                      }}
                      className="w-28 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                    />
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        checked={card.enabled}
                        onChange={(val) => {
                          const updated = [...whyTravelCards];
                          updated[idx].enabled = val;
                          updateField("about_why_travel_cards", JSON.stringify(updated));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = whyTravelCards.filter((_, i) => i !== idx);
                          updateField("about_why_travel_cards", JSON.stringify(updated));
                        }}
                        className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...whyTravelCards];
                        updated[idx].title = e.target.value;
                        updateField("about_why_travel_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={card.description}
                      onChange={(e) => {
                        const updated = [...whyTravelCards];
                        updated[idx].description = e.target.value;
                        updateField("about_why_travel_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: SOLO MOTORCYCLE ADVENTURES
         ========================================================================= */}
      {activeSection === "motorcycle" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Bike className="h-4 w-4 text-accent" />
                  <span>Section 4: Motorcycle Adventures</span>
                </h2>
                <ToggleSwitch
                  checked={draft.about_motorcycle_enabled !== "false"}
                  onChange={(val) => updateField("about_motorcycle_enabled", val ? "true" : "false")}
                  label={draft.about_motorcycle_enabled !== "false" ? "Enabled" : "Disabled"}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Eyebrow</label>
                  <input
                    type="text"
                    value={draft.about_motorcycle_eyebrow ?? ""}
                    onChange={(e) => updateField("about_motorcycle_eyebrow", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Image Badge
                  </label>
                  <input
                    type="text"
                    value={draft.about_motorcycle_badge ?? ""}
                    onChange={(e) => updateField("about_motorcycle_badge", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Title</label>
                  <input
                    type="text"
                    value={draft.about_motorcycle_title ?? ""}
                    onChange={(e) => updateField("about_motorcycle_title", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Description</label>
                <textarea
                  rows={3}
                  value={draft.about_motorcycle_description ?? ""}
                  onChange={(e) => updateField("about_motorcycle_description", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">CTA Text</label>
                  <input
                    type="text"
                    value={draft.about_motorcycle_cta_text ?? ""}
                    onChange={(e) => updateField("about_motorcycle_cta_text", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">CTA URL</label>
                  <input
                    type="text"
                    value={draft.about_motorcycle_cta_url ?? ""}
                    onChange={(e) => updateField("about_motorcycle_cta_url", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Motorcycle Image */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-accent" />
                <span>Atmospheric Image</span>
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={draft.about_motorcycle_image ?? ""}
                  onChange={(e) => updateField("about_motorcycle_image", e.target.value)}
                  placeholder="https://... or Google Drive link"
                  className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground"
                />
                <button
                  type="button"
                  onClick={() => motoFileInputRef.current?.click()}
                  disabled={uploadingField === "about_motorcycle_image"}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {uploadingField === "about_motorcycle_image" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5 text-accent" />
                  )}
                  <span>Upload</span>
                </button>
              </div>
              <input
                type="text"
                placeholder="Alt Text"
                value={draft.about_motorcycle_image_alt ?? ""}
                onChange={(e) => updateField("about_motorcycle_image_alt", e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
              />
            </div>

            {/* Repeatable Features */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Motorcycle Feature Points ({motorcycleFeatures.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const newItem: AboutMotorcycleFeature = {
                      id: String(Date.now()),
                      icon: "Route",
                      title: "New Feature Point",
                      description: "Feature description detailing terrain or mechanics.",
                      order: motorcycleFeatures.length + 1,
                      enabled: true,
                    };
                    updateField("about_motorcycle_features", JSON.stringify([...motorcycleFeatures, newItem]));
                  }}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Feature</span>
                </button>
              </div>

              <div className="space-y-3">
                {motorcycleFeatures.map((feat, idx) => (
                  <div
                    key={feat.id}
                    className="p-3.5 rounded-xl border border-border/80 bg-background/60 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Icon (e.g. Route, Wrench)"
                        value={feat.icon}
                        onChange={(e) => {
                          const updated = [...motorcycleFeatures];
                          updated[idx].icon = e.target.value;
                          updateField("about_motorcycle_features", JSON.stringify(updated));
                        }}
                        className="w-28 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Feature Title"
                        value={feat.title}
                        onChange={(e) => {
                          const updated = [...motorcycleFeatures];
                          updated[idx].title = e.target.value;
                          updateField("about_motorcycle_features", JSON.stringify(updated));
                        }}
                        className="flex-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground"
                      />
                      <ToggleSwitch
                        checked={feat.enabled}
                        onChange={(val) => {
                          const updated = [...motorcycleFeatures];
                          updated[idx].enabled = val;
                          updateField("about_motorcycle_features", JSON.stringify(updated));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = motorcycleFeatures.filter((_, i) => i !== idx);
                          updateField("about_motorcycle_features", JSON.stringify(updated));
                        }}
                        className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...motorcycleFeatures];
                        updated[idx].description = e.target.value;
                        updateField("about_motorcycle_features", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Motorcycle Preview */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-accent" />
                <span>Dark Cinematic Preview</span>
              </h3>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
                <img
                  src={resolveMediaUrl(draft.about_motorcycle_image || ABOUT_DEFAULTS.about_motorcycle_image)}
                  alt="Preview"
                  className="h-full w-full object-cover object-[25%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    {draft.about_motorcycle_badge || ABOUT_DEFAULTS.about_motorcycle_badge}
                  </span>
                  <h4 className="font-display text-base font-bold mt-1">
                    {draft.about_motorcycle_title || ABOUT_DEFAULTS.about_motorcycle_title}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 5: TREKKING & HIGH ALTITUDE
         ========================================================================= */}
      {activeSection === "trekking" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-accent" />
                  <span>Section 5: Trekking &amp; High Altitude</span>
                </h2>
                <ToggleSwitch
                  checked={draft.about_trekking_enabled !== "false"}
                  onChange={(val) => updateField("about_trekking_enabled", val ? "true" : "false")}
                  label={draft.about_trekking_enabled !== "false" ? "Enabled" : "Disabled"}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Eyebrow</label>
                  <input
                    type="text"
                    value={draft.about_trekking_eyebrow ?? ""}
                    onChange={(e) => updateField("about_trekking_eyebrow", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Title</label>
                  <input
                    type="text"
                    value={draft.about_trekking_title ?? ""}
                    onChange={(e) => updateField("about_trekking_title", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Description</label>
                <textarea
                  rows={3}
                  value={draft.about_trekking_description ?? ""}
                  onChange={(e) => updateField("about_trekking_description", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed"
                />
              </div>
            </div>

            {/* Trekking Image & Location Caption */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-accent" />
                <span>Mountain Image &amp; Location Overlay</span>
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={draft.about_trekking_image ?? ""}
                  onChange={(e) => updateField("about_trekking_image", e.target.value)}
                  placeholder="https://... or Google Drive link"
                  className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground"
                />
                <button
                  type="button"
                  onClick={() => trekFileInputRef.current?.click()}
                  disabled={uploadingField === "about_trekking_image"}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {uploadingField === "about_trekking_image" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5 text-accent" />
                  )}
                  <span>Upload</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Alt Text"
                  value={draft.about_trekking_image_alt ?? ""}
                  onChange={(e) => updateField("about_trekking_image_alt", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                />
                <input
                  type="text"
                  placeholder="Location Label (e.g. Himalayan Solitude)"
                  value={draft.about_trekking_location_label ?? ""}
                  onChange={(e) => updateField("about_trekking_location_label", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>

              <input
                type="text"
                placeholder="Location Quote (e.g. Against the silence of 8,000-meter giants...)"
                value={draft.about_trekking_location_quote ?? ""}
                onChange={(e) => updateField("about_trekking_location_quote", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
              />
            </div>

            {/* Repeatable Trekking Cards */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Trekking Feature Cards ({trekkingCards.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const newItem: AboutTrekkingCard = {
                      id: String(Date.now()),
                      icon: "CheckCircle2",
                      title: "New High Altitude Trail",
                      description: "Trail specifics, pass altitude, and terrain.",
                      order: trekkingCards.length + 1,
                      enabled: true,
                    };
                    updateField("about_trekking_cards", JSON.stringify([...trekkingCards, newItem]));
                  }}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Trail</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {trekkingCards.map((card, idx) => (
                  <div
                    key={card.id}
                    className="p-3.5 rounded-xl border border-border/80 bg-background/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const updated = [...trekkingCards];
                          updated[idx].title = e.target.value;
                          updateField("about_trekking_cards", JSON.stringify(updated));
                        }}
                        className="flex-1 rounded-lg border border-border bg-background px-2 py-1 text-xs font-semibold text-foreground"
                      />
                      <div className="flex items-center gap-2">
                        <ToggleSwitch
                          checked={card.enabled}
                          onChange={(val) => {
                            const updated = [...trekkingCards];
                            updated[idx].enabled = val;
                            updateField("about_trekking_cards", JSON.stringify(updated));
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = trekkingCards.filter((_, i) => i !== idx);
                            updateField("about_trekking_cards", JSON.stringify(updated));
                          }}
                          className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => {
                        const updated = [...trekkingCards];
                        updated[idx].description = e.target.value;
                        updateField("about_trekking_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trekking Image Preview */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-accent" />
                <span>Alpine Image Preview</span>
              </h3>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
                <img
                  src={resolveMediaUrl(draft.about_trekking_image || ABOUT_DEFAULTS.about_trekking_image)}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    {draft.about_trekking_location_label || ABOUT_DEFAULTS.about_trekking_location_label}
                  </span>
                  <p className="text-xs text-zinc-200 mt-1 line-clamp-2">
                    {draft.about_trekking_location_quote || ABOUT_DEFAULTS.about_trekking_location_quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 6: TRAVEL PHILOSOPHY / QUOTE
         ========================================================================= */}
      {activeSection === "philosophy" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Quote className="h-4 w-4 text-accent" />
                  <span>Section 6: Travel Philosophy Quote Box</span>
                </h2>
                <ToggleSwitch
                  checked={draft.about_philosophy_enabled !== "false"}
                  onChange={(val) => updateField("about_philosophy_enabled", val ? "true" : "false")}
                  label={draft.about_philosophy_enabled !== "false" ? "Enabled" : "Disabled"}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Featured Large Quote
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about_philosophy_quote ?? ""}
                    onChange={(e) => updateField("about_philosophy_quote", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3.5 text-base italic font-serif text-foreground focus:border-accent focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Supporting Philosophy Description
                  </label>
                  <textarea
                    rows={4}
                    value={draft.about_philosophy_description ?? ""}
                    onChange={(e) => updateField("about_philosophy_description", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Preview */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-accent" />
                <span>Quote Box Preview</span>
              </h3>
              <div className="rounded-2xl bg-muted/40 p-6 border border-border/50 shadow-sm space-y-3">
                <blockquote className="text-base italic leading-relaxed text-foreground font-serif">
                  &ldquo;{draft.about_philosophy_quote || ABOUT_DEFAULTS.about_philosophy_quote}&rdquo;
                </blockquote>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {draft.about_philosophy_description || ABOUT_DEFAULTS.about_philosophy_description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 7: TRAVEL PHILOSOPHY CARDS
         ========================================================================= */}
      {activeSection === "philosophy-cards" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <span>Section 7: 4 Pillars of the Travel Ethos</span>
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const nextNum = String(philosophyCards.length + 1).padStart(2, "0");
                    const newCard: AboutPhilosophyCard = {
                      id: String(Date.now()),
                      number: nextNum,
                      title: "New Ethos Pillar",
                      description: "Description of this exploration principle.",
                      order: philosophyCards.length + 1,
                      enabled: true,
                    };
                    updateField("about_philosophy_cards", JSON.stringify([...philosophyCards, newCard]));
                  }}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Pillar</span>
                </button>
                <ToggleSwitch
                  checked={draft.about_philosophy_cards_enabled !== "false"}
                  onChange={(val) => updateField("about_philosophy_cards_enabled", val ? "true" : "false")}
                  label={draft.about_philosophy_cards_enabled !== "false" ? "Enabled" : "Disabled"}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {philosophyCards.map((card, idx) => (
                <div
                  key={card.id}
                  className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="01"
                      value={card.number}
                      onChange={(e) => {
                        const updated = [...philosophyCards];
                        updated[idx].number = e.target.value;
                        updateField("about_philosophy_cards", JSON.stringify(updated));
                      }}
                      className="w-12 rounded-lg border border-border bg-background px-2 py-1 text-xs font-bold text-accent text-center"
                    />
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        checked={card.enabled}
                        onChange={(val) => {
                          const updated = [...philosophyCards];
                          updated[idx].enabled = val;
                          updateField("about_philosophy_cards", JSON.stringify(updated));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = philosophyCards.filter((_, i) => i !== idx);
                          updateField("about_philosophy_cards", JSON.stringify(updated));
                        }}
                        className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...philosophyCards];
                        updated[idx].title = e.target.value;
                        updateField("about_philosophy_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={card.description}
                      onChange={(e) => {
                        const updated = [...philosophyCards];
                        updated[idx].description = e.target.value;
                        updateField("about_philosophy_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 8: JOURNEY IN NUMBERS & TERRAIN TAGS
         ========================================================================= */}
      {activeSection === "numbers" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4 text-accent" />
                <span>Section 8: Journey in Numbers (Milestones)</span>
              </h2>
              <ToggleSwitch
                checked={draft.about_numbers_enabled !== "false"}
                onChange={(val) => updateField("about_numbers_enabled", val ? "true" : "false")}
                label={draft.about_numbers_enabled !== "false" ? "Enabled" : "Disabled"}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={draft.about_numbers_eyebrow ?? ""}
                  onChange={(e) => updateField("about_numbers_eyebrow", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Title</label>
                <input
                  type="text"
                  value={draft.about_numbers_title ?? ""}
                  onChange={(e) => updateField("about_numbers_title", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Description</label>
              <textarea
                rows={2}
                value={draft.about_numbers_description ?? ""}
                onChange={(e) => updateField("about_numbers_description", e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground"
              />
            </div>
          </div>

          {/* Repeatable Statistics */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Key Milestone Statistics ({numberStats.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newStat: AboutNumberStat = {
                    id: String(Date.now()),
                    value: "100+",
                    label: "New Milestone",
                    description: "Independent exploration",
                    order: numberStats.length + 1,
                    enabled: true,
                  };
                  updateField("about_numbers_stats", JSON.stringify([...numberStats, newStat]));
                }}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Stat</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {numberStats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase">
                      Stat #{idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        checked={stat.enabled}
                        onChange={(val) => {
                          const updated = [...numberStats];
                          updated[idx].enabled = val;
                          updateField("about_numbers_stats", JSON.stringify(updated));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = numberStats.filter((_, i) => i !== idx);
                          updateField("about_numbers_stats", JSON.stringify(updated));
                        }}
                        className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Big Number / Value
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...numberStats];
                        updated[idx].value = e.target.value;
                        updateField("about_numbers_stats", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-base font-bold text-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...numberStats];
                        updated[idx].label = e.target.value;
                        updateField("about_numbers_stats", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={stat.description}
                      onChange={(e) => {
                        const updated = [...numberStats];
                        updated[idx].description = e.target.value;
                        updateField("about_numbers_stats", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Repeatable Terrain & Route Tags */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Notable Expeditions &amp; Terrains Explored ({terrainTags.length})
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Dynamically editable badges shown beneath the statistics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newTag: AboutTerrainTag = {
                    id: String(Date.now()),
                    name: "New Expedition Route",
                    order: terrainTags.length + 1,
                    enabled: true,
                  };
                  updateField("about_numbers_tags", JSON.stringify([...terrainTags, newTag]));
                }}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Tag</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Section Headline for Tags
              </label>
              <input
                type="text"
                value={draft.about_numbers_tags_label ?? ""}
                onChange={(e) => updateField("about_numbers_tags_label", e.target.value)}
                className="w-full max-w-md rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground"
              />
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {terrainTags.map((tag, idx) => (
                <div
                  key={tag.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-background text-xs"
                >
                  <input
                    type="text"
                    value={tag.name}
                    onChange={(e) => {
                      const updated = [...terrainTags];
                      updated[idx].name = e.target.value;
                      updateField("about_numbers_tags", JSON.stringify(updated));
                    }}
                    className="bg-transparent border-none focus:outline-none text-xs text-foreground w-40 font-medium"
                  />
                  <ToggleSwitch
                    checked={tag.enabled}
                    onChange={(val) => {
                      const updated = [...terrainTags];
                      updated[idx].enabled = val;
                      updateField("about_numbers_tags", JSON.stringify(updated));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = terrainTags.filter((_, i) => i !== idx);
                      updateField("about_numbers_tags", JSON.stringify(updated));
                    }}
                    className="text-red-500 hover:text-red-600 p-0.5 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 9: WHAT YOU WILL FIND ON NDSOLOTRAVEL
         ========================================================================= */}
      {activeSection === "content" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" />
                <span>Section 9: What You Will Find on NDSOLOTRAVEL</span>
              </h2>
              <ToggleSwitch
                checked={draft.about_content_enabled !== "false"}
                onChange={(val) => updateField("about_content_enabled", val ? "true" : "false")}
                label={draft.about_content_enabled !== "false" ? "Enabled" : "Disabled"}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={draft.about_content_eyebrow ?? ""}
                  onChange={(e) => updateField("about_content_eyebrow", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Title</label>
                <input
                  type="text"
                  value={draft.about_content_title ?? ""}
                  onChange={(e) => updateField("about_content_title", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Description</label>
              <textarea
                rows={2}
                value={draft.about_content_description ?? ""}
                onChange={(e) => updateField("about_content_description", e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground"
              />
            </div>
          </div>

          {/* Repeatable Content Cards */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Content Pillars ({contentCards.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newCard: AboutContentCard = {
                    id: String(Date.now()),
                    icon: "Compass",
                    title: "New Content Pillar",
                    description: "Pillar description detailing resources or stories.",
                    ctaText: "Explore",
                    ctaUrl: "/blog",
                    order: contentCards.length + 1,
                    enabled: true,
                  };
                  updateField("about_content_cards", JSON.stringify([...contentCards, newCard]));
                }}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Pillar</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contentCards.map((card, idx) => (
                <div
                  key={card.id}
                  className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Icon (e.g. Compass, MapPin)"
                      value={card.icon}
                      onChange={(e) => {
                        const updated = [...contentCards];
                        updated[idx].icon = e.target.value;
                        updateField("about_content_cards", JSON.stringify(updated));
                      }}
                      className="w-28 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                    />
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        checked={card.enabled}
                        onChange={(val) => {
                          const updated = [...contentCards];
                          updated[idx].enabled = val;
                          updateField("about_content_cards", JSON.stringify(updated));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = contentCards.filter((_, i) => i !== idx);
                          updateField("about_content_cards", JSON.stringify(updated));
                        }}
                        className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...contentCards];
                        updated[idx].title = e.target.value;
                        updateField("about_content_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={card.description}
                      onChange={(e) => {
                        const updated = [...contentCards];
                        updated[idx].description = e.target.value;
                        updateField("about_content_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="CTA Text"
                      value={card.ctaText}
                      onChange={(e) => {
                        const updated = [...contentCards];
                        updated[idx].ctaText = e.target.value;
                        updateField("about_content_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground"
                    />
                    <input
                      type="text"
                      placeholder="CTA URL"
                      value={card.ctaUrl}
                      onChange={(e) => {
                        const updated = [...contentCards];
                        updated[idx].ctaUrl = e.target.value;
                        updateField("about_content_cards", JSON.stringify(updated));
                      }}
                      className="w-full rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 10: FINAL CTA
         ========================================================================= */}
      {activeSection === "cta" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Flag className="h-4 w-4 text-accent" />
                  <span>Section 10: Final Call To Action</span>
                </h2>
                <ToggleSwitch
                  checked={draft.about_cta_enabled !== "false"}
                  onChange={(val) => updateField("about_cta_enabled", val ? "true" : "false")}
                  label={draft.about_cta_enabled !== "false" ? "Enabled" : "Disabled"}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Eyebrow</label>
                  <input
                    type="text"
                    value={draft.about_cta_eyebrow ?? ""}
                    onChange={(e) => updateField("about_cta_eyebrow", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Title</label>
                  <input
                    type="text"
                    value={draft.about_cta_title ?? ""}
                    onChange={(e) => updateField("about_cta_title", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Description</label>
                <textarea
                  rows={3}
                  value={draft.about_cta_description ?? ""}
                  onChange={(e) => updateField("about_cta_description", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                <div className="space-y-2 p-3 rounded-xl border border-border/60">
                  <span className="text-xs font-semibold text-foreground">Primary Button</span>
                  <input
                    type="text"
                    placeholder="Text"
                    value={draft.about_cta_primary_text ?? ""}
                    onChange={(e) => updateField("about_cta_primary_text", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={draft.about_cta_primary_url ?? ""}
                    onChange={(e) => updateField("about_cta_primary_url", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                  />
                </div>

                <div className="space-y-2 p-3 rounded-xl border border-border/60">
                  <span className="text-xs font-semibold text-foreground">Secondary Button</span>
                  <input
                    type="text"
                    placeholder="Text"
                    value={draft.about_cta_secondary_text ?? ""}
                    onChange={(e) => updateField("about_cta_secondary_text", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={draft.about_cta_secondary_url ?? ""}
                    onChange={(e) => updateField("about_cta_secondary_url", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                  />
                </div>

                <div className="space-y-2 p-3 rounded-xl border border-border/60">
                  <span className="text-xs font-semibold text-foreground">Tertiary Button</span>
                  <input
                    type="text"
                    placeholder="Text"
                    value={draft.about_cta_tertiary_text ?? ""}
                    onChange={(e) => updateField("about_cta_tertiary_text", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={draft.about_cta_tertiary_url ?? ""}
                    onChange={(e) => updateField("about_cta_tertiary_url", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Preview */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-accent" />
                <span>CTA Preview</span>
              </h3>
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 text-white space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  {draft.about_cta_eyebrow || ABOUT_DEFAULTS.about_cta_eyebrow}
                </span>
                <h4 className="font-display text-lg font-bold">
                  {draft.about_cta_title || ABOUT_DEFAULTS.about_cta_title}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {draft.about_cta_description || ABOUT_DEFAULTS.about_cta_description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 11: SEO MANAGEMENT
         ========================================================================= */}
      {activeSection === "seo" && (
        <div className="max-w-3xl space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
              <Search className="h-4 w-4 text-accent" />
              <span>Section 11: SEO &amp; Social Metadata</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Page SEO Title Tag
                </label>
                <input
                  type="text"
                  value={draft.about_seo_title ?? ""}
                  onChange={(e) => updateField("about_seo_title", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={draft.about_seo_description ?? ""}
                  onChange={(e) => updateField("about_seo_description", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Open Graph Title
                  </label>
                  <input
                    type="text"
                    value={draft.about_og_title ?? ""}
                    onChange={(e) => updateField("about_og_title", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    value={draft.about_canonical_url ?? ""}
                    onChange={(e) => updateField("about_canonical_url", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Open Graph Description
                </label>
                <textarea
                  rows={2}
                  value={draft.about_og_description ?? ""}
                  onChange={(e) => updateField("about_og_description", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Open Graph Share Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={draft.about_og_image ?? ""}
                    onChange={(e) => updateField("about_og_image", e.target.value)}
                    placeholder="https://... or upload"
                    className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => ogFileInputRef.current?.click()}
                    disabled={uploadingField === "about_og_image"}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {uploadingField === "about_og_image" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 text-accent" />
                    )}
                    <span>Upload</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 12: PAGE SETTINGS
         ========================================================================= */}
      {activeSection === "settings" && (
        <div className="max-w-3xl space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
              <SettingsIcon className="h-4 w-4 text-accent" />
              <span>Section 12: Page Visibility &amp; Settings</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/80 bg-background/60">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Page Published Status</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Controls whether the public /about page is accessible to visitors.
                  </p>
                </div>
                <ToggleSwitch
                  checked={draft.about_published !== "false"}
                  onChange={(val) => updateField("about_published", val ? "true" : "false")}
                  label={draft.about_published !== "false" ? "Published" : "Draft"}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border/80 bg-background/60">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Page Visibility</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Current visibility mode for search engines and site navigation.
                  </p>
                </div>
                <select
                  value={draft.about_page_visibility ?? "public"}
                  onChange={(e) => updateField("about_page_visibility", e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground font-medium"
                >
                  <option value="public">Public (Indexed)</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="private">Private (Admin only)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
