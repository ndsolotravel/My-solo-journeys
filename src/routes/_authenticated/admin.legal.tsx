import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useRef } from "react";
import {
  Scale,
  Save,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Shield,
  Eye,
  Edit3,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Clock,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  adminListLegalPages,
  adminUpsertLegalPage,
  type LegalPage,
  DEFAULT_LEGAL_PAGES,
} from "@/lib/legal.functions";

export const Route = createFileRoute("/_authenticated/admin/legal")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Legal Pages — Admin CMS" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminLegalPage,
});

const LEGAL_TABS = [
  { slug: "privacy-policy", title: "Privacy Policy", path: "/privacy-policy" },
  { slug: "disclaimer", title: "Disclaimer", path: "/disclaimer" },
] as const;

function AdminLegalPage() {
  const queryClient = useQueryClient();
  const listLegalPagesFn = useServerFn(adminListLegalPages);
  const upsertLegalPageFn = useServerFn(adminUpsertLegalPage);

  const [activeSlug, setActiveSlug] = useState<string>("privacy-policy");
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [published, setPublished] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch Legal Pages
  const { data: legalPages, isLoading } = useQuery({
    queryKey: ["admin-legal-pages"],
    queryFn: async () => {
      const res = await listLegalPagesFn();
      return res as LegalPage[];
    },
  });

  // Sync state when activeSlug or legalPages change
  useEffect(() => {
    const existing = legalPages?.find((p) => p.slug === activeSlug);
    const defaultData = DEFAULT_LEGAL_PAGES[activeSlug];

    const current = existing || defaultData;
    if (current) {
      setTitle(current.title || "");
      setContent(current.content || "");
      setSeoTitle(current.seo_title || "");
      setSeoDescription(current.seo_description || "");
      setHeroImage(current.hero_image || "");
      setPublished(current.published ?? true);
      setUpdatedAt(existing?.updated_at || null);
      setIsDirty(false);
    }
  }, [activeSlug, legalPages]);

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!title.trim()) throw new Error("Title cannot be empty");
      return await upsertLegalPageFn({
        data: {
          slug: activeSlug,
          title: title.trim(),
          content,
          seo_title: seoTitle.trim() || null,
          seo_description: seoDescription.trim() || null,
          hero_image: heroImage.trim() || null,
          published,
        },
      });
    },
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ["admin-legal-pages"] });
      setUpdatedAt(saved.updated_at || new Date().toISOString());
      setIsDirty(false);
      toast.success(`${title} saved successfully!`);
    },
    onError: (err) => {
      toast.error(`Save failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    },
  });

  // Markdown toolbar insertion helper
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selection = el.value.substring(start, end);
    const replacement = prefix + (selection || "text") + suffix;

    const newContent = el.value.substring(0, start) + replacement + el.value.substring(end);
    setContent(newContent);
    setIsDirty(true);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + (selection.length || 4));
    }, 10);
  };

  const handleReset = () => {
    const existing = legalPages?.find((p) => p.slug === activeSlug);
    const defaultData = DEFAULT_LEGAL_PAGES[activeSlug];
    const current = existing || defaultData;
    if (current) {
      setTitle(current.title || "");
      setContent(current.content || "");
      setSeoTitle(current.seo_title || "");
      setSeoDescription(current.seo_description || "");
      setHeroImage(current.hero_image || "");
      setPublished(current.published ?? true);
      setUpdatedAt(existing?.updated_at || null);
    }
    setIsDirty(false);
    toast.info("Changes reset to last saved state");
  };

  const activeTabMeta = LEGAL_TABS.find((t) => t.slug === activeSlug);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar — sticky action bar */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <Scale className="h-6 w-6 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent">
              Legal & Governance
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Legal Pages CMS</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage, edit, and publish your Privacy Policy and Disclaimer pages with instant public
              updates.
            </p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {updatedAt ? (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> Last saved:{" "}
              {new Date(updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> Seeded from default
            </span>
          )}

          {isDirty && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              Unsaved edits
            </span>
          )}

          {activeTabMeta && (
            <Link
              to={activeTabMeta.path as "/privacy-policy"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs"
            >
              <Eye className="h-3.5 w-3.5 text-accent" />
              <span>View Public Page</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground ml-0.5" />
            </Link>
          )}

          {isDirty && (
            <button
              type="button"
              onClick={handleReset}
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={!isDirty || saveMutation.isPending || isLoading}
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

      {/* Unsaved Changes Alert Banner */}
      {isDirty && (
        <div className="flex items-center justify-between rounded-xl bg-brand/10 border border-brand/20 px-4 py-2.5 text-xs text-brand animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-accent" />
            <span className="font-medium">
              You have unsaved changes. Click &quot;Save Changes&quot; to apply them to the live{" "}
              {title || "page"}.
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

      {/* Tabs Row */}
      <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-border bg-background p-1 text-xs font-medium">
        {LEGAL_TABS.map((tab) => {
          const isActive = activeSlug === tab.slug;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActiveSlug(tab.slug)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-brand text-white font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Shield className="h-3.5 w-3.5" />
              <span>{tab.title}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-border/60 text-muted-foreground"
                }`}
              >
                {tab.path}
              </span>
            </button>
          );
        })}
      </div>

      {/* Editor Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main Content Form */}
        <div className="space-y-6">
          {/* Card: Page Title & URL */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-foreground">
                  <Edit3 className="h-5 w-5 text-accent" />
                  <span>Page Title & URL</span>
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Set the display title and public URL slug for this legal page.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="legalTitle" className="block text-xs font-medium text-foreground">
                  Page Title
                </label>
                <input
                  id="legalTitle"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. Privacy Policy"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">Public URL Slug</label>
                <div className="flex items-center rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-sm text-muted-foreground font-mono">
                  <span>ndsolotravel.com/{activeSlug}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Content Editor */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-foreground">
                  <ImageIcon className="h-5 w-5 text-accent" />
                  Document Body (Markdown & HTML)
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Format headings with ##, lists with - or 1., and bold text with **bold**.
                </p>
              </div>

              {/* Write vs Preview Tabs */}
              <div className="inline-flex items-center rounded-xl border border-border bg-background p-1 text-xs font-medium self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setEditorMode("write")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                    editorMode === "write"
                      ? "bg-brand text-white font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Edit3 className="h-3 w-3" /> Write
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode("preview")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                    editorMode === "preview"
                      ? "bg-brand text-white font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Eye className="h-3 w-3" /> Live Preview
                </button>
              </div>
            </div>

            {/* Markdown Toolbar (Active in write mode) */}
            {editorMode === "write" && (
              <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border/60 bg-muted/20 p-1.5">
                <button
                  type="button"
                  title="Bold"
                  onClick={() => insertFormatting("**", "**")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                >
                  <Bold className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="Italic"
                  onClick={() => insertFormatting("*", "*")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                >
                  <Italic className="h-3.5 w-3.5" />
                </button>
                <div className="h-4 w-px bg-border/60 mx-1" />
                <button
                  type="button"
                  title="Heading 2"
                  onClick={() => insertFormatting("\n## ", "\n")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                >
                  <Heading2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="Heading 3"
                  onClick={() => insertFormatting("\n### ", "\n")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                >
                  <Heading3 className="h-3.5 w-3.5" />
                </button>
                <div className="h-4 w-px bg-border/60 mx-1" />
                <button
                  type="button"
                  title="Bullet List"
                  onClick={() => insertFormatting("\n- ")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                >
                  <List className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="Numbered List"
                  onClick={() => insertFormatting("\n1. ")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                >
                  <ListOrdered className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="Blockquote"
                  onClick={() => insertFormatting("\n> ")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                >
                  <Quote className="h-3.5 w-3.5" />
                </button>
                <div className="h-4 w-px bg-border/60 mx-1" />
                <button
                  type="button"
                  title="Insert Link"
                  onClick={() => insertFormatting("[link text](", ")")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Editor Area */}
            {editorMode === "write" ? (
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setIsDirty(true);
                  }}
                  rows={20}
                  placeholder="Enter page content in markdown format..."
                  className="w-full rounded-xl border border-border bg-background p-4 font-mono text-sm leading-relaxed outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y"
                />
                <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Markdown formatting supported</span>
                  <span>
                    {content.length} characters · {content.split(/\s+/).filter(Boolean).length}{" "}
                    words
                  </span>
                </div>
              </div>
            ) : (
              <div className="min-h-[460px] rounded-xl border border-border/80 bg-background/50 p-6">
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {content || "*No content provided yet.*"}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Publishing Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="font-display text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-accent -mt-0.5" /> Publishing Status
            </h3>

            <label className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border/80 bg-muted/20 cursor-pointer hover:bg-muted/40 transition">
              <div>
                <span className="text-xs font-semibold text-foreground block">Publicly Active</span>
                <span className="text-[11px] text-muted-foreground block">
                  Accessible to visitors at {activeTabMeta?.path}
                </span>
              </div>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => {
                  setPublished(e.target.checked);
                  setIsDirty(true);
                }}
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent cursor-pointer"
              />
            </label>

            <button
              type="button"
              disabled={!isDirty || saveMutation.isPending || isLoading}
              onClick={() => saveMutation.mutate()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              <span>{saveMutation.isPending ? "Saving..." : `Save ${title || "Page"}`}</span>
            </button>
          </div>

          {/* Hero Banner Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="font-display text-sm font-semibold text-foreground">
              <ImageIcon className="h-4 w-4 text-accent -mt-0.5" /> Hero Header Image
            </h3>

            <div className="space-y-2">
              {heroImage && (
                <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border bg-muted">
                  <img src={heroImage} alt="Hero Preview" className="h-full w-full object-cover" />
                </div>
              )}

              <input
                type="text"
                value={heroImage}
                onChange={(e) => {
                  setHeroImage(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Image URL (e.g. https://...)"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
              <p className="text-[11px] text-muted-foreground">
                High-resolution landscape photo for the top hero banner background.
              </p>
            </div>
          </div>

          {/* SEO Metadata Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="font-display text-sm font-semibold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-accent -mt-0.5" /> Search Engine Optimization
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="seoTitle" className="font-medium text-foreground">
                    SEO Meta Title
                  </label>
                  <span
                    className={`text-[10px] ${
                      seoTitle.length > 60
                        ? "text-amber-500 font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {seoTitle.length}/60
                  </span>
                </div>
                <input
                  id="seoTitle"
                  type="text"
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. Privacy Policy — ndsolotravel"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="seoDesc" className="font-medium text-foreground">
                    SEO Meta Description
                  </label>
                  <span
                    className={`text-[10px] ${
                      seoDescription.length > 160
                        ? "text-amber-500 font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {seoDescription.length}/160
                  </span>
                </div>
                <textarea
                  id="seoDesc"
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => {
                    setSeoDescription(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="Concise summary for search engine results..."
                  className="w-full rounded-xl border border-border bg-background py-2 px-3.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
