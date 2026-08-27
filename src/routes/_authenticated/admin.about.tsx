import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useRef } from "react";
import {
  User,
  Save,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Eye,
  Edit3,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Upload,
  RotateCcw,
  Sparkles,
  ImageIcon,
  Trash2,
  Compass,
  FileText,
  Search,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  adminGetAboutPageEditor,
  adminSaveAboutPage,
  type AboutPageData,
  DEFAULT_ABOUT_PAGE,
} from "@/lib/about.functions";
import { adminUploadImage } from "@/lib/admin.functions";

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

type TabType = "hero" | "profile" | "philosophy" | "seo" | "settings";

function AdminAboutPage() {
  const queryClient = useQueryClient();
  const getEditorFn = useServerFn(adminGetAboutPageEditor);
  const saveAboutPageFn = useServerFn(adminSaveAboutPage);
  const uploadImageFn = useServerFn(adminUploadImage);

  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");

  // Form State
  const [form, setForm] = useState<AboutPageData>(DEFAULT_ABOUT_PAGE);
  const [original, setOriginal] = useState<AboutPageData>(DEFAULT_ABOUT_PAGE);
  const [isDirty, setIsDirty] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const bioTextareaRef = useRef<HTMLTextAreaElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const ogFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch published / current data
  const { data, isLoading } = useQuery({
    queryKey: ["admin-about-page"],
    queryFn: async () => {
      const res = await getEditorFn();
      return res as AboutPageData;
    },
  });

  useEffect(() => {
    if (data) {
      setForm(data);
      setOriginal(data);
      setIsDirty(false);
    }
  }, [data]);

  const updateField = <K extends keyof AboutPageData>(key: K, value: AboutPageData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleReset = () => {
    setForm(original);
    setIsDirty(false);
    toast.info("Changes reset to loaded version");
  };

  // Image Upload Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: "hero_image" | "profile_image" | "og_image"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image file must be under 8MB");
      return;
    }

    setUploadingField(fieldKey);
    const toastId = toast.loading(`Uploading ${file.name}...`);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = (reader.result as string).split(",")[1];
          const result = await uploadImageFn({
            data: {
              filename: file.name,
              contentType: file.type,
              base64: base64Data,
            },
          });

          const publicUrl = (result as any)?.publicUrl || (result as any)?.path;
          if (publicUrl) {
            updateField(fieldKey, publicUrl);
            toast.success("Image uploaded successfully", { id: toastId });
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
      // Clear file input
      e.target.value = "";
    }
  };

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      return await saveAboutPageFn({ data: form });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-about-page"] });
      queryClient.invalidateQueries({ queryKey: ["public-about-page"] });
      queryClient.invalidateQueries({ queryKey: ["public-site-settings"] });
      setOriginal(form);
      setIsDirty(false);
      toast.success("About page saved successfully!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to save about page changes");
    },
  });

  // Markdown formatting shortcuts
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = bioTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = form.biography_content;
    const selectedText = currentText.substring(start, end);

    const replacement = prefix + selectedText + suffix;
    const nextContent =
      currentText.substring(0, start) + replacement + currentText.substring(end);

    updateField("biography_content", nextContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 10);
  };

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
                Manage hero, portrait, biography, travel philosophy, and SEO metadata.
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
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all"
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
            className="font-bold underline hover:opacity-80"
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
          { id: "seo", label: "SEO & Social", icon: Globe },
          { id: "settings", label: "Page Settings", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-all whitespace-nowrap ${
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
        onChange={(e) => handleFileUpload(e, "hero_image")}
      />
      <input
        ref={profileFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "profile_image")}
      />
      <input
        ref={ogFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "og_image")}
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
                    Hero Label
                  </label>
                  <input
                    type="text"
                    value={form.hero_label}
                    onChange={(e) => updateField("hero_label", e.target.value)}
                    placeholder="e.g. About"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Small uppercase badge displayed above the main headline.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={form.hero_headline}
                    onChange={(e) => updateField("hero_headline", e.target.value)}
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
                    value={form.hero_image_alt}
                    onChange={(e) => updateField("hero_image_alt", e.target.value)}
                    placeholder="e.g. Traveller on a mountain ridge"
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
                {form.hero_image && (
                  <button
                    type="button"
                    onClick={() => updateField("hero_image", "")}
                    className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Hero Image URL or Storage Path
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.hero_image}
                    onChange={(e) => updateField("hero_image", e.target.value)}
                    placeholder="https://... or Supabase storage path"
                    className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => heroFileInputRef.current?.click()}
                    disabled={uploadingField === "hero_image"}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors"
                  >
                    {uploadingField === "hero_image" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 text-accent" />
                    )}
                    <span>{form.hero_image ? "Replace" : "Upload"}</span>
                  </button>
                </div>
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
                {form.hero_image ? (
                  <img
                    src={form.hero_image}
                    alt={form.hero_image_alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                    No image set
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                    {form.hero_label || "About"}
                  </span>
                  <h4 className="font-display text-base font-bold leading-tight mt-1 line-clamp-2">
                    {form.hero_headline || "Solo, slow, and almost always uphill."}
                  </h4>
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-3 text-[11px] text-muted-foreground space-y-1">
                <p>
                  <strong>Dimensions:</strong> High resolution horizontal imagery (1920x1080 or wider recommended).
                </p>
                <p>
                  <strong>Display:</strong> Hero renders with dark atmospheric gradient overlay to preserve typography contrast.
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
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-accent" />
                  <span>Profile Portrait</span>
                </h2>
                {form.profile_image && (
                  <button
                    type="button"
                    onClick={() => updateField("profile_image", "")}
                    className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
                {form.profile_image ? (
                  <img
                    src={form.profile_image}
                    alt={form.profile_image_alt}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    No portrait uploaded
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Portrait Image URL
                  </label>
                  <input
                    type="text"
                    value={form.profile_image}
                    onChange={(e) => updateField("profile_image", e.target.value)}
                    placeholder="/assets/... or https://..."
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => profileFileInputRef.current?.click()}
                    disabled={uploadingField === "profile_image"}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors"
                  >
                    {uploadingField === "profile_image" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 text-accent" />
                    )}
                    <span>{form.profile_image ? "Replace Portrait" : "Upload Portrait"}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Portrait Alt Text
                  </label>
                  <input
                    type="text"
                    value={form.profile_image_alt}
                    onChange={(e) => updateField("profile_image_alt", e.target.value)}
                    placeholder="e.g. ndsolotravel portrait"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Biography Content & Markdown Editor */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" />
                <span>Biography &amp; Narrative</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Section Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.biography_title}
                    onChange={(e) => updateField("biography_title", e.target.value)}
                    placeholder="e.g. From Engineering to Exploration"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Introduction Lead Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={form.biography_intro}
                    onChange={(e) => updateField("biography_intro", e.target.value)}
                    placeholder="Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world..."
                    className="w-full rounded-xl border border-border bg-background p-3.5 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed resize-y"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Prominent opening lead paragraph displayed in bold font weight.
                  </p>
                </div>

                {/* Biography Paragraphs Rich Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-foreground">
                      Biography Paragraphs (Rich Markdown)
                    </label>

                    {/* Mode Toggle */}
                    <div className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5">
                      <button
                        type="button"
                        onClick={() => setEditorMode("write")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          editorMode === "write"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Write</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorMode("preview")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          editorMode === "preview"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Eye className="h-3 w-3" />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>

                  {editorMode === "write" ? (
                    <div className="space-y-2">
                      {/* Markdown Toolbar */}
                      <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-muted/40 p-1.5 text-muted-foreground">
                        <button
                          type="button"
                          onClick={() => insertMarkdown("**", "**")}
                          title="Bold"
                          className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <Bold className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("*", "*")}
                          title="Italic"
                          className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <Italic className="h-3.5 w-3.5" />
                        </button>
                        <span className="h-4 w-px bg-border mx-1" />
                        <button
                          type="button"
                          onClick={() => insertMarkdown("## ")}
                          title="Heading 2"
                          className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <Heading2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("### ")}
                          title="Heading 3"
                          className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <Heading3 className="h-3.5 w-3.5" />
                        </button>
                        <span className="h-4 w-px bg-border mx-1" />
                        <button
                          type="button"
                          onClick={() => insertMarkdown("> ")}
                          title="Blockquote"
                          className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <Quote className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("- ")}
                          title="Bullet List"
                          className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <List className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("1. ")}
                          title="Numbered List"
                          className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <ListOrdered className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <textarea
                        ref={bioTextareaRef}
                        rows={12}
                        value={form.biography_content}
                        onChange={(e) => updateField("biography_content", e.target.value)}
                        placeholder="Write biography paragraphs..."
                        className="w-full rounded-xl border border-border bg-background p-4 font-mono text-xs text-foreground focus:border-accent focus:outline-none leading-relaxed resize-y"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border bg-background p-5 min-h-[300px]">
                      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4 leading-relaxed">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                          {form.biography_content || "*No biography content written yet.*"}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}

                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    Separate paragraphs with a blank line. Markdown formatting will be dynamically translated into all 14 site languages.
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
                    value={form.philosophy_title}
                    onChange={(e) => updateField("philosophy_title", e.target.value)}
                    placeholder="e.g. Travel philosophy"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Philosophy Quote
                  </label>
                  <textarea
                    rows={3}
                    value={form.philosophy_quote}
                    onChange={(e) => updateField("philosophy_quote", e.target.value)}
                    placeholder="e.g. Solo travel is where the journey becomes the destination"
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
                    rows={3}
                    value={form.philosophy_description}
                    onChange={(e) => updateField("philosophy_description", e.target.value)}
                    placeholder="Cinematic stories from solo journeys across Pakistan, the Karakoram, Nanga Parbat, and beyond..."
                    className="w-full rounded-xl border border-border bg-background p-3.5 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Accompanying narrative detailing guides, motorcycle adventures, and photography.
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
                  {form.philosophy_title || "Travel philosophy"}
                </h4>
                <blockquote className="text-base italic leading-relaxed text-foreground/90 font-medium">
                  &quot;{form.philosophy_quote || "Solo travel is where the journey becomes the destination"}&quot;
                </blockquote>
                {form.philosophy_description && (
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {form.philosophy_description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 4: SEO & OPEN GRAPH
         ------------------------------------------------------------- */}
      {activeTab === "seo" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Search className="h-4 w-4 text-accent" />
              <span>Search Engine Optimization</span>
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-medium text-foreground">SEO Title</label>
                  <span className="text-[10px] text-muted-foreground">
                    {form.seo_title?.length || 0} / 60
                  </span>
                </div>
                <input
                  type="text"
                  value={form.seo_title}
                  onChange={(e) => updateField("seo_title", e.target.value)}
                  placeholder="About — ndsolotravel"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-medium text-foreground">SEO Meta Description</label>
                  <span className="text-[10px] text-muted-foreground">
                    {form.seo_description?.length || 0} / 160
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={form.seo_description}
                  onChange={(e) => updateField("seo_description", e.target.value)}
                  placeholder="About ndsolotravel — solo adventure traveller, motorcyclist..."
                  className="w-full rounded-xl border border-border bg-background p-3.5 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" />
              <span>Open Graph &amp; Social Sharing</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Social Sharing Image (OG Image)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.og_image}
                    onChange={(e) => updateField("og_image", e.target.value)}
                    placeholder="https://... or Supabase storage path"
                    className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => ogFileInputRef.current?.click()}
                    disabled={uploadingField === "og_image"}
                    className="inline-flex items-center gap-1 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors"
                  >
                    {uploadingField === "og_image" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 text-accent" />
                    )}
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Social Title (og:title)
                </label>
                <input
                  type="text"
                  value={form.og_title}
                  onChange={(e) => updateField("og_title", e.target.value)}
                  placeholder="About — ndsolotravel"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Social Description (og:description)
                </label>
                <textarea
                  rows={2}
                  value={form.og_description}
                  onChange={(e) => updateField("og_description", e.target.value)}
                  placeholder="About the solo traveller behind ndsolotravel."
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-accent focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 5: PAGE SETTINGS
         ------------------------------------------------------------- */}
      {activeTab === "settings" && (
        <div className="max-w-2xl space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              <span>Publication Status</span>
            </h2>

            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
              <div>
                <span className="text-sm font-semibold text-foreground">
                  Published Status
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  When enabled, the About page is accessible to public visitors. When unpublished, only authenticated administrators can preview.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => updateField("published", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Current State:</span>
              {form.published ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-3 w-3" />
                  Published (Live)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-semibold">
                  Draft / Unpublished
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
