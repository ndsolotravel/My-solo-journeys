import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useServerFn, Q as adminListLegalPages, T as adminUpsertLegalPage, U as DEFAULT_LEGAL_PAGES } from "./router-BuJVAroo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { al as Scale, w as Clock, ap as Eye, E as ExternalLink, R as RotateCcw, h as LoaderCircle, ax as Save, b as Sparkles, H as Shield, aI as PenLine, ae as Image, aJ as Bold, aK as Italic, aL as Heading2, aM as Heading3, ad as List, aN as ListOrdered, Q as Quote, aO as Link$1, v as CircleCheck } from "../_libs/lucide-react.mjs";
import { M as Markdown } from "../_libs/react-markdown.mjs";
import { r as rehypeRaw } from "../_libs/rehype-raw.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./createSsrRpc-BLJWJFkS.mjs";
import "./client-BqBvvzI9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DFv8buKs.mjs";
import "./posts.functions-S458rgU7.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./categories.functions-BG32lH_N.mjs";
import "./topics-T4Y39Ysn.mjs";
import "./media-DKXRUyGU.mjs";
import "./admin.functions-MvZQXaGD.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/devlop.mjs";
import "../_libs/unified.mjs";
import "../_libs/bail.mjs";
import "../_libs/extend.mjs";
import "../_libs/is-plain-obj.mjs";
import "../_libs/trough.mjs";
import "../_libs/vfile.mjs";
import "../_libs/vfile-message.mjs";
import "../_libs/unist-util-stringify-position.mjs";
import "node:process";
import "node:path";
import "node:url";
import "../_libs/remark-parse.mjs";
import "../_libs/mdast-util-from-markdown.mjs";
import "../_libs/micromark-util-decode-numeric-character-reference+[...].mjs";
import "../_libs/micromark-util-decode-string.mjs";
import "../_libs/decode-named-character-reference+[...].mjs";
import "../_libs/character-entities.mjs";
import "../_libs/micromark-util-normalize-identifier+[...].mjs";
import "../_libs/micromark.mjs";
import "../_libs/micromark-util-combine-extensions+[...].mjs";
import "../_libs/micromark-util-chunked.mjs";
import "../_libs/micromark-factory-space.mjs";
import "../_libs/micromark-util-character.mjs";
import "../_libs/micromark-core-commonmark.mjs";
import "../_libs/micromark-util-classify-character+[...].mjs";
import "../_libs/micromark-util-resolve-all.mjs";
import "../_libs/micromark-util-subtokenize.mjs";
import "../_libs/micromark-factory-destination.mjs";
import "../_libs/micromark-factory-label.mjs";
import "../_libs/micromark-factory-title.mjs";
import "../_libs/micromark-factory-whitespace.mjs";
import "../_libs/micromark-util-html-tag-name.mjs";
import "../_libs/mdast-util-to-string.mjs";
import "../_libs/remark-rehype.mjs";
import "../_libs/mdast-util-to-hast.mjs";
import "../_libs/ungap__structured-clone.mjs";
import "../_libs/micromark-util-sanitize-uri.mjs";
import "../_libs/unist-util-position.mjs";
import "../_libs/trim-lines.mjs";
import "../_libs/unist-util-visit.mjs";
import "../_libs/unist-util-visit-parents.mjs";
import "../_libs/unist-util-is.mjs";
import "../_libs/hast-util-to-jsx-runtime.mjs";
import "../_libs/comma-separated-tokens.mjs";
import "../_libs/property-information.mjs";
import "../_libs/space-separated-tokens.mjs";
import "../_libs/style-to-js.mjs";
import "../_libs/style-to-object.mjs";
import "../_libs/inline-style-parser.mjs";
import "../_libs/hast-util-whitespace.mjs";
import "../_libs/estree-util-is-identifier-name.mjs";
import "../_libs/html-url-attributes.mjs";
import "../_libs/hast-util-raw.mjs";
import "../_libs/html-void-elements.mjs";
import "../_libs/parse5.mjs";
import "../_libs/entities.mjs";
import "../_libs/web-namespaces.mjs";
import "../_libs/zwitch.mjs";
import "../_libs/hast-util-from-parse5.mjs";
import "../_libs/hastscript.mjs";
import "../_libs/hast-util-parse-selector.mjs";
import "../_libs/vfile-location.mjs";
import "../_libs/hast-util-to-parse5.mjs";
const LEGAL_TABS = [{
  slug: "privacy-policy",
  title: "Privacy Policy",
  path: "/privacy-policy"
}, {
  slug: "disclaimer",
  title: "Disclaimer",
  path: "/disclaimer"
}];
function AdminLegalPage() {
  const queryClient = useQueryClient();
  const listLegalPagesFn = useServerFn(adminListLegalPages);
  const upsertLegalPageFn = useServerFn(adminUpsertLegalPage);
  const [activeSlug, setActiveSlug] = reactExports.useState("privacy-policy");
  const [editorMode, setEditorMode] = reactExports.useState("write");
  const [title, setTitle] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [seoTitle, setSeoTitle] = reactExports.useState("");
  const [seoDescription, setSeoDescription] = reactExports.useState("");
  const [heroImage, setHeroImage] = reactExports.useState("");
  const [published, setPublished] = reactExports.useState(true);
  const [updatedAt, setUpdatedAt] = reactExports.useState(null);
  const [isDirty, setIsDirty] = reactExports.useState(false);
  const textareaRef = reactExports.useRef(null);
  const {
    data: legalPages,
    isLoading
  } = useQuery({
    queryKey: ["admin-legal-pages"],
    queryFn: async () => {
      const res = await listLegalPagesFn();
      return res;
    }
  });
  reactExports.useEffect(() => {
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
          published
        }
      });
    },
    onSuccess: (saved) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-legal-pages"]
      });
      setUpdatedAt(saved.updated_at || (/* @__PURE__ */ new Date()).toISOString());
      setIsDirty(false);
      toast.success(`${title} saved successfully!`);
    },
    onError: (err) => {
      toast.error(`Save failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  });
  const insertFormatting = (prefix, suffix = "") => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-2xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-6 w-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent", children: "Legal & Governance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Legal Pages CMS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage, edit, and publish your Privacy Policy and Disclaimer pages with instant public updates." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
        updatedAt ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          " Last saved:",
          " ",
          new Date(updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          " Seeded from default"
        ] }),
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400", children: "Unsaved edits" }),
        activeTabMeta && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: activeTabMeta.path, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View Public Page" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 text-muted-foreground ml-0.5" })
        ] }),
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleReset, disabled: saveMutation.isPending, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reset" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => saveMutation.mutate(), disabled: !isDirty || saveMutation.isPending || isLoading, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer", children: [
          saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: saveMutation.isPending ? "Saving..." : "Save Changes" })
        ] })
      ] })
    ] }),
    isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-brand/10 border border-brand/20 px-4 py-2.5 text-xs text-brand animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 shrink-0 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          'You have unsaved changes. Click "Save Changes" to apply them to the live',
          " ",
          title || "page",
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => saveMutation.mutate(), disabled: saveMutation.isPending, className: "font-bold underline hover:opacity-80 cursor-pointer", children: "Save now" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex flex-wrap items-center gap-1 rounded-xl border border-border bg-background p-1 text-xs font-medium", children: LEGAL_TABS.map((tab) => {
      const isActive = activeSlug === tab.slug;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveSlug(tab.slug), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${isActive ? "bg-brand text-white font-semibold shadow-2xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-mono ${isActive ? "bg-white/20 text-white" : "bg-border/60 text-muted-foreground"}`, children: tab.path })
      ] }, tab.slug);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_340px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-5 w-5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Page Title & URL" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Set the display title and public URL slug for this legal page." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "legalTitle", className: "block text-xs font-medium text-foreground", children: "Page Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "legalTitle", type: "text", value: title, onChange: (e) => {
                setTitle(e.target.value);
                setIsDirty(true);
              }, placeholder: "e.g. Privacy Policy", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground", children: "Public URL Slug" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-sm text-muted-foreground font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "ndsolotravel.com/",
                activeSlug
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-accent" }),
                "Document Body (Markdown & HTML)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Format headings with ##, lists with - or 1., and bold text with **bold**." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center rounded-xl border border-border bg-background p-1 text-xs font-medium self-start sm:self-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setEditorMode("write"), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${editorMode === "write" ? "bg-brand text-white font-semibold shadow-2xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3 w-3" }),
                " Write"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setEditorMode("preview"), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${editorMode === "preview" ? "bg-brand text-white font-semibold shadow-2xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                " Live Preview"
              ] })
            ] })
          ] }),
          editorMode === "write" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1 rounded-xl border border-border/60 bg-muted/20 p-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Bold", onClick: () => insertFormatting("**", "**"), className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Italic", onClick: () => insertFormatting("*", "*"), className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border/60 mx-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Heading 2", onClick: () => insertFormatting("\n## ", "\n"), className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading2, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Heading 3", onClick: () => insertFormatting("\n### ", "\n"), className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading3, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border/60 mx-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Bullet List", onClick: () => insertFormatting("\n- "), className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Numbered List", onClick: () => insertFormatting("\n1. "), className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Blockquote", onClick: () => insertFormatting("\n> "), className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border/60 mx-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Insert Link", onClick: () => insertFormatting("[link text](", ")"), className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { className: "h-3.5 w-3.5" }) })
          ] }),
          editorMode === "write" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ref: textareaRef, value: content, onChange: (e) => {
              setContent(e.target.value);
              setIsDirty(true);
            }, rows: 20, placeholder: "Enter page content in markdown format...", className: "w-full rounded-xl border border-border bg-background p-4 font-mono text-sm leading-relaxed outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Markdown formatting supported" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                content.length,
                " characters · ",
                content.split(/\s+/).filter(Boolean).length,
                " ",
                "words"
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[460px] rounded-xl border border-border/80 bg-background/50 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-gray dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { rehypePlugins: [rehypeRaw], children: content || "*No content provided yet.*" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-accent -mt-0.5" }),
            " Publishing Status"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between gap-3 p-3 rounded-xl border border-border/80 bg-muted/20 cursor-pointer hover:bg-muted/40 transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground block", children: "Publicly Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground block", children: [
                "Accessible to visitors at ",
                activeTabMeta?.path
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: published, onChange: (e) => {
              setPublished(e.target.checked);
              setIsDirty(true);
            }, className: "h-4 w-4 rounded border-border text-accent focus:ring-accent cursor-pointer" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: !isDirty || saveMutation.isPending || isLoading, onClick: () => saveMutation.mutate(), className: "w-full flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer", children: [
            saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: saveMutation.isPending ? "Saving..." : `Save ${title || "Page"}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent -mt-0.5" }),
            " Hero Header Image"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            heroImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-28 w-full overflow-hidden rounded-xl border border-border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: "Hero Preview", className: "h-full w-full object-cover" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: heroImage, onChange: (e) => {
              setHeroImage(e.target.value);
              setIsDirty(true);
            }, placeholder: "Image URL (e.g. https://...)", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "High-resolution landscape photo for the top hero banner background." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-accent -mt-0.5" }),
            " Search Engine Optimization"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "seoTitle", className: "font-medium text-foreground", children: "SEO Meta Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[10px] ${seoTitle.length > 60 ? "text-amber-500 font-semibold" : "text-muted-foreground"}`, children: [
                  seoTitle.length,
                  "/60"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "seoTitle", type: "text", value: seoTitle, onChange: (e) => {
                setSeoTitle(e.target.value);
                setIsDirty(true);
              }, placeholder: "e.g. Privacy Policy — ndsolotravel", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "seoDesc", className: "font-medium text-foreground", children: "SEO Meta Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[10px] ${seoDescription.length > 160 ? "text-amber-500 font-semibold" : "text-muted-foreground"}`, children: [
                  seoDescription.length,
                  "/160"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "seoDesc", rows: 3, value: seoDescription, onChange: (e) => {
                setSeoDescription(e.target.value);
                setIsDirty(true);
              }, placeholder: "Concise summary for search engine results...", className: "w-full rounded-xl border border-border bg-background py-2 px-3.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminLegalPage as component
};
