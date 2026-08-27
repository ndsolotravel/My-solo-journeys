import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, H as adminListCategories, C as CATEGORIES } from "./router-kn1dHUrL.mjs";
import { f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { x as adminUpsertPost, c as adminUploadImage, l as adminDeleteGalleryImage, k as adminSavePostGallery, m as adminListDestinations } from "./admin.functions-DGJYtjjS.mjs";
import { g as geocodeFromTitle } from "./geocoding.functions-DaqX6nmG.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DsuHXNs6.mjs";
import { $ as Image, g as LoaderCircle, ag as Upload, at as FileImage, au as GripVertical, av as Maximize2, m as ChevronLeft, n as ChevronRight, af as Trash2, X, G as Globe, U as User, l as MapPin, a0 as Navigation, v as Calendar, H as ExternalLink, ah as Save, aC as Bold, aD as Italic, aE as Heading2, _ as List, aF as Link, aG as PenLine, a8 as Eye, aH as ChevronDown } from "../_libs/lucide-react.mjs";
import { M as Markdown } from "../_libs/react-markdown.mjs";
import { r as rehypeRaw } from "../_libs/rehype-raw.mjs";
function resolveImageUrl$1(urlOrPath) {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  const trimmed = urlOrPath.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }
  let cleanPath = trimmed.replace(/^\/+/, "");
  if (cleanPath.startsWith("blog-media/")) {
    cleanPath = cleanPath.slice("blog-media/".length);
  }
  return `https://mqoybarqgzzvillignbr.supabase.co/storage/v1/object/public/blog-media/${cleanPath}`;
}
function ImageCaptionDialog({ open, onClose, onInsert }) {
  const uploadFn = useServerFn(adminUploadImage);
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [altText, setAltText] = reactExports.useState("");
  const [caption, setCaption] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  const fileInput = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (open) {
      setImageUrl("");
      setAltText("");
      setCaption("");
    }
  }, [open]);
  if (!open) return null;
  async function handleFileUpload(file) {
    setUploading(true);
    try {
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 }
      });
      setImageUrl(resolveImageUrl$1(url));
      if (!altText) setAltText(file.name.replace(/\.[^.]+$/, ""));
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }
  function buildHtml() {
    const src = imageUrl.trim();
    if (!src) return "";
    const alt = altText.trim();
    const cap = caption.trim();
    if (cap) {
      return `
<figure>
<img src="${src}" alt="${alt}" />
<figcaption>${cap}</figcaption>
</figure>
`;
    }
    return `
![${alt}](${src})
`;
  }
  function handleInsert() {
    const html = buildHtml();
    if (!html) {
      toast.error("Please add an image URL");
      return;
    }
    onInsert(html);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        className: "relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden border border-border bg-background shadow-2xl sm:rounded-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border bg-card/60 px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-display text-lg font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-5 w-5 text-accent" }),
              " Insert Image"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Close",
                className: "rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-5 py-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInput,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  disabled: uploading,
                  onClick: () => fileInput.current?.click(),
                  className: "inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition cursor-pointer disabled:opacity-50",
                  children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                    " Uploading…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                    " Upload Image"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "or paste a URL below" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cap-img-url", className: "block text-xs font-semibold text-foreground mb-1.5", children: "Image URL *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "cap-img-url",
                  type: "text",
                  value: imageUrl,
                  onChange: (e) => setImageUrl(e.target.value),
                  placeholder: "https://... or blog-media/...",
                  className: "w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cap-alt", className: "block text-xs font-semibold text-foreground mb-1.5", children: "Alt Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "cap-alt",
                  type: "text",
                  value: altText,
                  onChange: (e) => setAltText(e.target.value),
                  placeholder: "Describe the image",
                  className: "w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cap-caption", className: "block text-xs font-semibold text-foreground mb-1.5", children: "Photo Caption" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "cap-caption",
                  type: "text",
                  value: caption,
                  onChange: (e) => setCaption(e.target.value),
                  placeholder: "Optional caption displayed below the image",
                  className: "w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Leave empty to insert without a caption" })
            ] }),
            imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold", children: "Preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "m-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: imageUrl,
                    alt: altText,
                    className: "w-full max-h-48 object-cover rounded-lg"
                  }
                ),
                caption && /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-2 text-center text-xs text-muted-foreground italic", children: caption })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 z-10 flex items-center justify-end gap-2 border-t border-border bg-background/95 px-5 py-3 backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleInsert,
                disabled: !imageUrl.trim(),
                className: "rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background hover:opacity-90 transition disabled:opacity-50 cursor-pointer",
                children: "Insert"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function parseImages(content) {
  const entries = [];
  const figureRegex = /<figure>\s*<img\s+[^>]*src="([^"]*)"[^>]*(?:alt="([^"]*)")?[^>]*\/?\s*>\s*(?:<figcaption>([^<]*)<\/figcaption>)?\s*<\/figure>/gi;
  let match;
  while ((match = figureRegex.exec(content)) !== null) {
    entries.push({
      index: match.index,
      src: match[1] || "",
      alt: match[2] || "",
      caption: match[3] || "",
      isFigure: true,
      raw: match[0]
    });
  }
  const mdRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  while ((match = mdRegex.exec(content)) !== null) {
    const pos = match.index;
    const alreadyCaptured = entries.some(
      (e) => pos >= e.index && pos < e.index + e.raw.length
    );
    if (!alreadyCaptured) {
      entries.push({
        index: pos,
        src: match[2] || "",
        alt: match[1] || "",
        caption: "",
        isFigure: false,
        raw: match[0]
      });
    }
  }
  entries.sort((a, b) => a.index - b.index);
  return entries;
}
function MarkdownEditor({ value, onChange }) {
  const [mode, setMode] = reactExports.useState("split");
  const [captionDialogOpen, setCaptionDialogOpen] = reactExports.useState(false);
  const [captionsOpen, setCaptionsOpen] = reactExports.useState(false);
  const [editingIdx, setEditingIdx] = reactExports.useState(null);
  const [editCaption, setEditCaption] = reactExports.useState("");
  const images = reactExports.useMemo(() => parseImages(value), [value]);
  const wrap = (before, after = before) => {
    const ta = document.getElementById("md-textarea");
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = end + before.length;
    }, 0);
  };
  function handleInsertImage(html) {
    const ta = document.getElementById("md-textarea");
    if (ta) {
      const start = ta.selectionStart;
      const next = value.slice(0, start) + html + value.slice(start);
      onChange(next);
    } else {
      onChange(value + html);
    }
  }
  function handleUpdateCaption(imgIndex, newCaption) {
    const img = images[imgIndex];
    if (!img) return;
    let replacement;
    if (newCaption.trim()) {
      replacement = `<figure>
<img src="${img.src}" alt="${img.alt}" />
<figcaption>${newCaption}</figcaption>
</figure>`;
    } else if (img.isFigure) {
      replacement = `![${img.alt}](${img.src})`;
    } else {
      return;
    }
    const before = value.slice(0, img.index);
    const after = value.slice(img.index + img.raw.length);
    onChange(before + replacement + after);
    setEditingIdx(null);
    setEditCaption("");
  }
  function handleRemoveCaption(imgIndex) {
    const img = images[imgIndex];
    if (!img || !img.isFigure) return;
    const replacement = `![${img.alt}](${img.src})`;
    const before = value.slice(0, img.index);
    const after = value.slice(img.index + img.raw.length);
    onChange(before + replacement + after);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: () => wrap("**"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-4 w-4" }), label: "Bold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: () => wrap("*"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-4 w-4" }), label: "Italic" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tool,
        {
          onClick: () => wrap("\n## ", ""),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading2, { className: "h-4 w-4" }),
          label: "Heading"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: () => wrap("\n- ", ""), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }), label: "List" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tool,
        {
          onClick: () => wrap("[", "](https://)"),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-4 w-4" }),
          label: "Link"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tool,
        {
          onClick: () => setCaptionDialogOpen(true),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-4 w-4" }),
          label: "Image with Caption"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto inline-flex rounded-lg border border-border bg-background p-0.5 text-xs", children: ["write", "split", "preview"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setMode(m),
          className: `rounded-md px-2 py-1 capitalize transition cursor-pointer ${mode === m ? "bg-foreground text-background" : "text-muted-foreground"}`,
          children: m === "write" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" }) : m === "preview" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }) : "Split"
        },
        m
      )) })
    ] }),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setCaptionsOpen(!captionsOpen),
          className: "flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted/40 transition cursor-pointer",
          children: [
            captionsOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-3.5 w-3.5 text-accent" }),
            images.length,
            " ",
            images.length === 1 ? "image" : "images",
            " — manage captions"
          ]
        }
      ),
      captionsOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 space-y-2", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: img.src,
                alt: img.alt,
                className: "h-14 w-14 shrink-0 rounded-lg object-cover border border-border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: editingIdx === i ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: editCaption,
                  onChange: (e) => setEditCaption(e.target.value),
                  placeholder: "Enter caption…",
                  className: "flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent",
                  autoFocus: true,
                  onKeyDown: (e) => {
                    if (e.key === "Enter")
                      handleUpdateCaption(i, editCaption);
                    if (e.key === "Escape") {
                      setEditingIdx(null);
                      setEditCaption("");
                    }
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleUpdateCaption(i, editCaption),
                  className: "shrink-0 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background hover:opacity-90 cursor-pointer",
                  children: "Save"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setEditingIdx(null);
                    setEditCaption("");
                  },
                  className: "shrink-0 rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer",
                  children: "Cancel"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-foreground", children: img.caption || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground", children: "No caption" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setEditingIdx(i);
                    setEditCaption(img.caption);
                  },
                  className: "shrink-0 text-xs text-accent hover:underline cursor-pointer",
                  children: img.caption ? "Edit" : "Add caption"
                }
              ),
              img.isFigure && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleRemoveCaption(i),
                  className: "shrink-0 text-xs text-red-500 hover:underline cursor-pointer",
                  children: "Remove"
                }
              )
            ] }) })
          ]
        },
        `${img.src}-${i}`
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `grid ${mode === "split" ? "md:grid-cols-2" : "grid-cols-1"}`,
        children: [
          mode !== "preview" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "md-textarea",
              value,
              onChange: (e) => onChange(e.target.value),
              placeholder: "Write your story in Markdown…",
              className: "min-h-[480px] w-full resize-y border-0 bg-background p-4 font-mono text-sm outline-none"
            }
          ),
          mode !== "write" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[480px] max-h-[800px] overflow-y-auto border-l border-border p-4 prose-blog text-sm", children: value.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { rehypePlugins: [rehypeRaw], children: value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Preview will appear here…" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageCaptionDialog,
      {
        open: captionDialogOpen,
        onClose: () => setCaptionDialogOpen(false),
        onInsert: handleInsertImage
      }
    )
  ] });
}
function Tool({
  onClick,
  icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      title: label,
      "aria-label": label,
      className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground",
      children: icon
    }
  );
}
function DraggableDialog({ open, onClose, title, children, footer, width = 1100 }) {
  const dialogRef = reactExports.useRef(null);
  const [pos, setPos] = reactExports.useState(null);
  const [isDesktop, setIsDesktop] = reactExports.useState(true);
  const dragState = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  function onHeaderPointerDown(e) {
    if (!isDesktop) return;
    const target = e.target;
    if (target.closest("button, input, a, [data-no-drag]")) return;
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos?.x ?? rect.left,
      origY: pos?.y ?? rect.top
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onHeaderPointerMove(e) {
    if (!dragState.current || !dialogRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    const rect = dialogRef.current.getBoundingClientRect();
    const margin = 40;
    const maxX = window.innerWidth - margin;
    const maxY = window.innerHeight - margin;
    const minX = margin - rect.width;
    const minY = 0;
    setPos({
      x: Math.min(maxX, Math.max(minX, dragState.current.origX + dx)),
      y: Math.min(maxY, Math.max(minY, dragState.current.origY + dy))
    });
  }
  function onHeaderPointerUp(e) {
    dragState.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
    }
  }
  if (!open) return null;
  const positioned = isDesktop && pos;
  const style = positioned ? { left: pos.x, top: pos.y, width, maxWidth: "calc(100vw - 32px)" } : isDesktop ? { width, maxWidth: "calc(100vw - 32px)" } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: dialogRef,
        role: "dialog",
        "aria-modal": "true",
        className: `relative flex max-h-[100dvh] w-full flex-col overflow-hidden border border-border bg-background shadow-2xl sm:max-h-[90vh] sm:rounded-2xl ${positioned ? "absolute" : ""}`,
        style,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onPointerDown: onHeaderPointerDown,
              onPointerMove: onHeaderPointerMove,
              onPointerUp: onHeaderPointerUp,
              onPointerCancel: onHeaderPointerUp,
              className: `flex items-center justify-between gap-3 border-b border-border bg-card/60 px-5 py-3 ${isDesktop ? "cursor-move select-none" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1 truncate font-display text-lg font-semibold", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "data-no-drag": true,
                    "aria-label": "Close dialog",
                    className: "rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto px-5 py-5", children }),
          footer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky bottom-0 z-10 flex items-center justify-end gap-2 border-t border-border bg-background/95 px-5 py-3 backdrop-blur", children: footer })
        ]
      }
    )
  ] });
}
const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
function resolveImageUrl(urlOrPath) {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  const trimmed = urlOrPath.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }
  let cleanPath = trimmed.replace(/^\/+/, "");
  if (cleanPath.startsWith("blog-media/")) {
    cleanPath = cleanPath.slice("blog-media/".length);
  }
  const baseUrl = (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL : "") || DEFAULT_SUPABASE_URL;
  return `${baseUrl.replace(/\/+$/, "")}/storage/v1/object/public/blog-media/${cleanPath}`;
}
function PostEditor({
  initial,
  asDialog = !initial
}) {
  const navigate = useNavigate();
  const upsertFn = useServerFn(adminUpsertPost);
  const uploadFn = useServerFn(adminUploadImage);
  const delGalleryImageFn = useServerFn(adminDeleteGalleryImage);
  const saveGalleryFn = useServerFn(adminSavePostGallery);
  const listDestinationsFn = useServerFn(adminListDestinations);
  const listCategoriesFn = useServerFn(adminListCategories);
  const { data: destinations } = useQuery({
    queryKey: ["admin-destinations"],
    queryFn: () => listDestinationsFn()
  });
  const { data: dbCategories } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => listCategoriesFn()
  });
  const categoryOptions = reactExports.useMemo(() => {
    const fromDb = (dbCategories ?? []).map((c) => c.name);
    const combined = [
      ...new Set([...fromDb, ...CATEGORIES, initial?.category].filter(Boolean))
    ];
    return combined;
  }, [dbCategories, initial?.category]);
  const [title, setTitle] = reactExports.useState(initial?.title ?? "");
  const [slug, setSlug] = reactExports.useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = reactExports.useState(initial?.excerpt ?? "");
  const [content, setContent] = reactExports.useState(initial?.content ?? "");
  const [cover, setCover] = reactExports.useState(initial?.cover_image ? resolveImageUrl(initial.cover_image) : "");
  const [category, setCategory] = reactExports.useState(initial?.category ?? CATEGORIES[0]);
  const [tags, setTags] = reactExports.useState((initial?.tags ?? []).join(", "));
  const [featured, setFeatured] = reactExports.useState(!!initial?.featured);
  const [published, setPublished] = reactExports.useState(!!initial?.published);
  const [authorName, setAuthorName] = reactExports.useState(initial?.author_name ?? "Hussain");
  const [locationName, setLocationName] = reactExports.useState(initial?.location_name ?? "");
  const [latitude, setLatitude] = reactExports.useState(initial?.latitude != null ? String(initial.latitude) : "");
  const [longitude, setLongitude] = reactExports.useState(initial?.longitude != null ? String(initial.longitude) : "");
  const [scheduledAt, setScheduledAt] = reactExports.useState(
    initial?.scheduled_at ? toLocalInput(initial.scheduled_at) : ""
  );
  const [destinationId, setDestinationId] = reactExports.useState(initial?.destination_id ?? "");
  const [travelDate, setTravelDate] = reactExports.useState(initial?.travel_date ?? "");
  const [seoTitle, setSeoTitle] = reactExports.useState(initial?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = reactExports.useState(initial?.seo_description ?? "");
  const [ogImageUrl, setOgImageUrl] = reactExports.useState(initial?.og_image_url ? resolveImageUrl(initial.og_image_url) : "");
  const initialGal = initial?.gallery ?? initial?.post_gallery ?? [];
  const [gallery, setGallery] = reactExports.useState(
    initialGal.map((g, idx) => ({
      id: g.id,
      image_url: resolveImageUrl(g.image_url),
      alt_text: g.alt_text ?? "",
      sort_order: g.sort_order ?? idx
    }))
  );
  reactExports.useEffect(() => {
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
    setAuthorName(initial.author_name ?? "Hussain");
    setLocationName(initial.location_name ?? "");
    setLatitude(initial.latitude != null ? String(initial.latitude) : "");
    setLongitude(initial.longitude != null ? String(initial.longitude) : "");
    setScheduledAt(initial.scheduled_at ? toLocalInput(initial.scheduled_at) : "");
    setDestinationId(initial.destination_id ?? "");
    setTravelDate(initial.travel_date ?? "");
    setSeoTitle(initial.seo_title ?? "");
    setSeoDescription(initial.seo_description ?? "");
    setOgImageUrl(initial.og_image_url ? resolveImageUrl(initial.og_image_url) : "");
    const effectiveGallery = initial.gallery ?? initial.post_gallery;
    if (effectiveGallery && Array.isArray(effectiveGallery)) {
      setGallery(
        effectiveGallery.map((g, idx) => ({
          id: g.id,
          image_url: resolveImageUrl(g.image_url),
          alt_text: g.alt_text ?? "",
          sort_order: g.sort_order ?? idx
        }))
      );
    }
  }, [initial]);
  const [galleryUrlInput, setGalleryUrlInput] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [isDropzoneActive, setIsDropzoneActive] = reactExports.useState(false);
  const [draggedIdx, setDraggedIdx] = reactExports.useState(null);
  const [dragOverIdx, setDragOverIdx] = reactExports.useState(null);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [autoDetecting, setAutoDetecting] = reactExports.useState(false);
  const [autoDetectResult, setAutoDetectResult] = reactExports.useState(null);
  const coverInput = reactExports.useRef(null);
  reactExports.useRef(null);
  const galleryInput = reactExports.useRef(null);
  const formId = "post-editor-form";
  const geocodeFn = useServerFn(geocodeFromTitle);
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
          existingLocation: locationName || void 0,
          override: true
        }
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
    mutationFn: (payload) => upsertFn({ data: payload }),
    onSuccess: (row) => {
      toast.success(initial?.id ? "Post updated" : "Post created");
      if (!initial?.id && row && typeof row === "object" && "id" in row) {
        navigate({ to: "/admin/posts/$id", params: { id: row.id } });
      }
    },
    onError: (e) => toast.error(e.message)
  });
  async function uploadFile(file, kind) {
    setUploading(kind);
    try {
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 }
      });
      const resolved = resolveImageUrl(url);
      if (kind === "cover") setCover(resolved);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(null);
    }
  }
  async function uploadGalleryFiles(files) {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
    const maxBytes = 8 * 1024 * 1024;
    const validFiles = [];
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
      const newItems = [...gallery];
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadProgress({ current: i + 1, total: validFiles.length });
        const buf = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        const { url } = await uploadFn({
          data: { filename: file.name, contentType: file.type, base64 }
        });
        const resolved = resolveImageUrl(url);
        newItems.push({
          image_url: resolved,
          alt_text: "",
          sort_order: newItems.length
        });
        successCount++;
      }
      setGallery(newItems);
      if (initial?.id) {
        try {
          await saveGalleryFn({
            data: {
              postId: initial.id,
              gallery: newItems.map((g, idx) => ({
                id: g.id,
                image_url: g.image_url,
                alt_text: g.alt_text || null,
                sort_order: idx
              }))
            }
          });
        } catch (saveErr) {
          console.warn("[PostEditor] Automatic gallery sync note:", saveErr);
        }
      }
      toast.success(`Successfully uploaded and saved ${successCount} photo${successCount > 1 ? "s" : ""} to gallery`);
    } catch (e) {
      toast.error(`Upload error: ${e.message}`);
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
      { image_url: resolved, alt_text: "", sort_order: gallery.length }
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
              sort_order: idx
            }))
          }
        });
      } catch (err) {
        console.warn("[PostEditor] Add URL sync warning:", err);
      }
    }
    toast.success("Gallery image added");
  }
  async function moveGalleryItem(index, direction) {
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
              sort_order: idx
            }))
          }
        });
      } catch (err) {
        console.warn("[PostEditor] Reorder sync warning:", err);
      }
    }
  }
  function handleDragStart(e, index) {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${index}`);
  }
  function handleDragOverItem(e, index) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  }
  async function handleDropOnItem(e, targetIndex) {
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
              sort_order: idx
            }))
          }
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
    const nextGallery = gallery.filter((_, idx) => idx !== index).map((g, idx) => ({ ...g, sort_order: idx }));
    setGallery(nextGallery);
    if (initial?.id && item.image_url) {
      try {
        await delGalleryImageFn({
          data: {
            postId: initial.id,
            galleryId: item.id,
            imageUrl: item.image_url
          }
        });
        await saveGalleryFn({
          data: {
            postId: initial.id,
            gallery: nextGallery.map((g, idx) => ({
              id: g.id,
              image_url: g.image_url,
              alt_text: g.alt_text || null,
              sort_order: idx
            }))
          }
        });
      } catch (err) {
        console.warn("[PostEditor] Gallery image deletion notice:", err);
      }
    }
    toast.success("Picture removed from gallery");
    if (lightboxIndex === index) setLightboxIndex(null);
    setDeleteTarget(null);
  }
  function updateGalleryAltText(index, alt_text) {
    setGallery(
      (prev) => prev.map((item, idx) => idx === index ? { ...item, alt_text } : item)
    );
  }
  reactExports.useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && gallery.length > 1) {
        setLightboxIndex((curr) => curr !== null ? (curr - 1 + gallery.length) % gallery.length : null);
      } else if (e.key === "ArrowRight" && gallery.length > 1) {
        setLightboxIndex((curr) => curr !== null ? (curr + 1) % gallery.length : null);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, gallery.length]);
  function submit(e) {
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
      slug: slug || void 0,
      excerpt,
      content,
      cover_image: cover || null,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      featured,
      published,
      author_name: authorName.trim() || "Hussain",
      location_name: locationName.trim() || null,
      latitude: parsedLat,
      longitude: parsedLng,
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      destination_id: destinationId || null,
      travel_date: travelDate || null,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      og_image_url: ogImageUrl || null,
      gallery
    });
  }
  function close() {
    navigate({ to: "/admin/posts" });
  }
  const activeLightboxItem = lightboxIndex !== null && gallery[lightboxIndex] ? gallery[lightboxIndex] : null;
  const body = /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: formId, onSubmit: submit, className: "grid gap-6 lg:grid-cols-[1fr_340px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: title,
          onChange: (e) => setTitle(e.target.value),
          required: true,
          maxLength: 200,
          className: input,
          placeholder: "Story title…"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug", hint: "Auto-generated from title if blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: slug,
          onChange: (e) => setSlug(e.target.value),
          maxLength: 200,
          placeholder: "my-story",
          className: input
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Excerpt", hint: "Shown in cards and default meta description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: excerpt,
          onChange: (e) => setExcerpt(e.target.value),
          rows: 3,
          maxLength: 500,
          className: input + " resize-y",
          placeholder: "Brief summary of your travel story…"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MarkdownEditor,
        {
          value: content,
          onChange: setContent
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-accent" }),
                " Post Photo Gallery"
              ] }),
              gallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent", children: [
                gallery.length,
                " ",
                gallery.length === 1 ? "picture" : "pictures"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Upload pictures from your computer or add external image URLs. Drag to reorder." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => galleryInput.current?.click(),
              disabled: uploading === "gallery",
              className: "inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs",
              children: uploading === "gallery" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                " Uploading…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
                " Upload Pictures"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: galleryInput,
            type: "file",
            multiple: true,
            accept: "image/jpeg,image/png,image/webp,image/avif",
            className: "hidden",
            onChange: (e) => e.target.files && uploadGalleryFiles(e.target.files)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            onDragOver: (e) => {
              e.preventDefault();
              setIsDropzoneActive(true);
            },
            onDragLeave: () => setIsDropzoneActive(false),
            onDrop: (e) => {
              e.preventDefault();
              setIsDropzoneActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                uploadGalleryFiles(e.dataTransfer.files);
              }
            },
            onClick: () => galleryInput.current?.click(),
            className: `group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${isDropzoneActive ? "border-accent bg-accent/10 text-accent scale-[1.01]" : "border-border bg-background hover:border-accent hover:bg-accent/5 text-muted-foreground hover:text-foreground"}`,
            children: uploading === "gallery" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-7 w-7 animate-spin text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                "Uploading picture ",
                uploadProgress?.current ?? 1,
                " of ",
                uploadProgress?.total ?? 1,
                "…"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Please wait while files are processed and optimized" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted/60 p-3 text-foreground group-hover:bg-accent/15 group-hover:text-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                  "Drag & drop pictures here, or ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent underline underline-offset-2", children: "browse" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Supports JPG, PNG, WebP, AVIF up to 8 MB each · Select multiple files" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: galleryUrlInput,
              onChange: (e) => setGalleryUrlInput(e.target.value),
              placeholder: "…or paste image web URL (https://…)",
              className: input + " text-xs py-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: addGalleryUrl,
              className: "rounded-xl border border-border px-3.5 py-2 text-xs font-medium hover:bg-muted whitespace-nowrap transition-colors",
              children: "Add URL"
            }
          )
        ] }),
        gallery.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hold and drag cards to reorder sequence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              gallery.length,
              " ",
              gallery.length === 1 ? "item" : "items"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5", children: gallery.map((item, idx) => {
            const isDragging = draggedIdx === idx;
            const isDragOver = dragOverIdx === idx && draggedIdx !== idx;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                draggable: uploading !== "gallery",
                onDragStart: (e) => handleDragStart(e, idx),
                onDragOver: (e) => handleDragOverItem(e, idx),
                onDrop: (e) => handleDropOnItem(e, idx),
                onDragEnd: () => {
                  setDraggedIdx(null);
                  setDragOverIdx(null);
                },
                className: `group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-background transition-all select-none shadow-xs ${isDragging ? "opacity-40 scale-95 border-dashed border-accent" : ""} ${isDragOver ? "border-accent ring-2 ring-accent/30 scale-[1.02]" : "border-border hover:border-accent/60 hover:shadow-md"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-4/3 w-full bg-muted/40 overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.image_url,
                        alt: item.alt_text || `Gallery item ${idx + 1}`,
                        className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
                        loading: "lazy"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2 top-2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs", children: [
                      "#",
                      idx + 1
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md bg-black/75 p-1 text-white shadow-xs backdrop-blur-xs cursor-grab active:cursor-grabbing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-3.5 w-3.5" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: "Inspect / Preview",
                          onClick: () => setLightboxIndex(idx),
                          className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white transition-transform hover:scale-110 shadow-md",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: "Move left / up",
                          disabled: idx === 0,
                          onClick: () => moveGalleryItem(idx, "prev"),
                          className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: "Move right / down",
                          disabled: idx === gallery.length - 1,
                          onClick: () => moveGalleryItem(idx, "next"),
                          className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: "Remove picture",
                          onClick: () => setDeleteTarget({ index: idx, item }),
                          className: "flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-transform hover:scale-110 shadow-md",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-card border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      value: item.alt_text,
                      onChange: (e) => updateGalleryAltText(idx, e.target.value),
                      placeholder: "Caption / Alt text…",
                      className: "w-full text-[11px] rounded-lg border border-border/80 bg-background px-2 py-1 outline-none focus:border-accent transition-colors"
                    }
                  ) })
                ]
              },
              item.id || item.image_url + idx
            );
          }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border py-8 text-center text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "mx-auto h-8 w-8 opacity-40 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No gallery pictures added yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] mt-0.5", children: "Upload multiple photos above to showcase visual moments from your story." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialog,
        {
          open: !!deleteTarget,
          onOpenChange: (open) => !open && setDeleteTarget(null),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove picture from gallery?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                "Are you sure you want to remove picture ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  "#",
                  deleteTarget ? deleteTarget.index + 1 : ""
                ] }),
                "? This will remove the picture from this post's gallery."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AlertDialogAction,
                {
                  className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                  onClick: confirmRemoveGalleryItem,
                  children: "Remove Picture"
                }
              )
            ] })
          ] })
        }
      ),
      activeLightboxItem && lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-all duration-300",
          onClick: () => setLightboxIndex(null),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-4 sm:left-6 sm:top-6 z-50 flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-black/75 px-3.5 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg", children: [
              "Photo ",
              lightboxIndex + 1,
              " of ",
              gallery.length
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    setDeleteTarget({ index: lightboxIndex, item: activeLightboxItem });
                  },
                  className: "flex h-10 px-3 items-center gap-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-medium border border-red-500/40 backdrop-blur-md transition-all shadow-lg cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                    " Remove"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Close",
                  onClick: (e) => {
                    e.stopPropagation();
                    setLightboxIndex(null);
                  },
                  className: "flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md hover:bg-black transition-all hover:scale-105 cursor-pointer shadow-lg",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative flex max-h-[80vh] max-w-[90vw] items-center justify-center",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: activeLightboxItem.image_url,
                      alt: activeLightboxItem.alt_text || `Gallery photo ${lightboxIndex + 1}`,
                      className: "max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
                    }
                  ),
                  gallery.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Previous photo",
                      onClick: (e) => {
                        e.stopPropagation();
                        setLightboxIndex((curr) => curr !== null ? (curr - 1 + gallery.length) % gallery.length : null);
                      },
                      className: "absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" })
                    }
                  ),
                  gallery.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Next photo",
                      onClick: (e) => {
                        e.stopPropagation();
                        setLightboxIndex((curr) => curr !== null ? (curr + 1) % gallery.length : null);
                      },
                      className: "absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bottom-4 sm:bottom-6 inset-x-4 max-w-xl mx-auto z-50",
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-black/80 p-3 border border-white/20 backdrop-blur-md shadow-xl flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: activeLightboxItem.alt_text,
                    onChange: (e) => updateGalleryAltText(lightboxIndex, e.target.value),
                    placeholder: "Add caption / alt text for this photo…",
                    className: "flex-1 rounded-xl bg-white/10 border border-white/20 px-3.5 py-1.5 text-xs text-white placeholder:text-white/50 outline-none focus:border-white/60"
                  }
                ) })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-accent" }),
            " SEO & Social Metadata"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Customize how this post appears in search engines and social shares." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "SEO Meta Title", hint: "Defaults to post title if empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: seoTitle,
            onChange: (e) => setSeoTitle(e.target.value),
            maxLength: 200,
            placeholder: title || "SEO Page Title",
            className: input
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "SEO Meta Description", hint: "Defaults to excerpt if empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: seoDescription,
            onChange: (e) => setSeoDescription(e.target.value),
            rows: 2,
            maxLength: 500,
            placeholder: excerpt || "Search engine description snippet…",
            className: input + " resize-y"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Open Graph (Social) Image URL", hint: "Defaults to cover image if empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: ogImageUrl,
            onChange: (e) => setOgImageUrl(e.target.value),
            placeholder: cover || "https://example.com/og-image.jpg",
            className: input
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Publish Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2.5 text-sm font-medium cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: published,
              onChange: (e) => {
                setPublished(e.target.checked);
                if (e.target.checked) setScheduledAt("");
              },
              className: "h-4 w-4 rounded border-border text-accent focus:ring-accent"
            }
          ),
          "Published immediately"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Schedule Publish", hint: "Auto-publishes at this date/time", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "datetime-local",
            disabled: published,
            value: scheduledAt,
            onChange: (e) => setScheduledAt(e.target.value),
            className: input + " disabled:opacity-50"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2.5 text-sm font-medium cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: featured,
              onChange: (e) => setFeatured(e.target.checked),
              className: "h-4 w-4 rounded border-border text-accent focus:ring-accent"
            }
          ),
          "Featured on Homepage"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-accent" }),
          " Author & Attribution"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Author Name", hint: "Displayed after 'By' on public story", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: authorName,
            onChange: (e) => setAuthorName(e.target.value),
            placeholder: "Hussain",
            maxLength: 100,
            className: input
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-sky-500" }),
            " Map Location"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleAutoDetectLocation,
              disabled: autoDetecting || !title.trim(),
              className: "inline-flex items-center gap-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 border border-sky-200/80 dark:border-sky-800/80 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs",
              children: autoDetecting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                " Detecting..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5" }),
                " Auto Detect"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: autoDetectResult ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: autoDetectResult.startsWith("Detected") ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-amber-600 dark:text-amber-400 font-medium", children: autoDetectResult }) : locationName ? "Location already exists. Use 'Auto Detect' to override." : "Enter location manually or use Auto Detect to suggest from title." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location Name", hint: "e.g. Phander Valley, Ghizer, Gilgit Baltistan, Pakistan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: locationName,
            onChange: (e) => {
              setLocationName(e.target.value);
              setAutoDetectResult(null);
            },
            placeholder: "e.g. Phander Valley, Ghizer, Gilgit Baltistan, Pakistan",
            maxLength: 200,
            className: input
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Latitude", hint: "e.g. 36.179 (-90 to 90)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              step: "any",
              min: "-90",
              max: "90",
              value: latitude,
              onChange: (e) => {
                setLatitude(e.target.value);
                setAutoDetectResult(null);
              },
              placeholder: "36.179",
              className: input
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Longitude", hint: "e.g. 73.751 (-180 to 180)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              step: "any",
              min: "-180",
              max: "180",
              value: longitude,
              onChange: (e) => {
                setLongitude(e.target.value);
                setAutoDetectResult(null);
              },
              placeholder: "73.751",
              className: input
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Enter location manually or use Auto Detect to suggest from title. Coordinates are validated before saving." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-accent" }),
          " Date & Destination"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Travel Date", hint: "Date of the actual trip", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: travelDate,
            onChange: (e) => setTravelDate(e.target.value),
            className: input
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Link Destination", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: destinationId,
            onChange: (e) => setDestinationId(e.target.value),
            className: input,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- No destination link --" }),
              (destinations ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d.id, children: [
                d.title,
                " (",
                d.country,
                ")"
              ] }, d.id))
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Cover Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[140px]", children: cover ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: cover,
              alt: "Cover preview",
              className: "max-h-48 w-full rounded-lg object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCover(""),
              className: "mt-2 text-xs text-muted-foreground transition hover:text-red-500",
              children: "Remove cover"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => coverInput.current?.click(),
            className: "group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background p-6 text-sm text-muted-foreground shadow-xs transition hover:border-accent hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            children: [
              uploading === "cover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Browse cover image" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: coverInput,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => e.target.files?.[0] && uploadFile(e.target.files[0], "cover")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: cover,
            onChange: (e) => setCover(e.target.value),
            placeholder: "…or paste image URL",
            className: input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Category & Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/admin/categories",
              target: "_blank",
              rel: "noreferrer",
              className: "text-[11px] text-accent hover:underline flex items-center gap-1",
              children: "Manage categories"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: category,
            onChange: (e) => setCategory(e.target.value),
            className: input,
            children: categoryOptions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tags", hint: "Comma-separated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: tags,
            onChange: (e) => setTags(e.target.value),
            placeholder: "trekking, karakoram, motorcycling",
            className: input
          }
        ) })
      ] })
    ] })
  ] });
  const footerActions = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    initial?.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: `/blog/${initial.slug}`,
        target: "_blank",
        rel: "noreferrer",
        className: "mr-auto inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-accent",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
          " View live"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mr-2 hidden items-center gap-2 text-xs text-muted-foreground sm:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: published,
          onChange: (e) => setPublished(e.target.checked)
        }
      ),
      "Publish"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: close,
        className: "inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted",
        children: "Cancel"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "submit",
        form: formId,
        disabled: save.isPending,
        className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background shadow-sm transition hover:shadow-md disabled:opacity-50",
        children: [
          save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " ",
          "Save Post"
        ]
      }
    )
  ] });
  if (asDialog) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DraggableDialog,
      {
        open: true,
        onClose: close,
        title: initial?.id ? "Edit post" : "New post",
        footer: footerActions,
        children: body
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: initial?.id ? "Edit post" : "New post" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: footerActions })
    ] }),
    body
  ] });
}
const input = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent";
function Field({
  label,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: hint })
    ] }),
    children
  ] });
}
function toLocalInput(iso) {
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 6e4);
  return local.toISOString().slice(0, 16);
}
export {
  PostEditor as P
};
