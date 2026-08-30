import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery, u as useQueryClient, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as useServerFn, N as adminListCategories, C as CATEGORIES } from "./router-DF-pQyIn.mjs";
import { f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { x as adminUpsertPost, c as adminUploadImage, l as adminDeleteGalleryImage, k as adminSavePostGallery, m as adminListDestinations, y as adminUpdatePostCoordinates } from "./admin.functions-DiyyO5cG.mjs";
import { g as geocodeFromTitle } from "./geocoding.functions-CuawdWKq.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DsuHXNs6.mjs";
import { a6 as Image, h as LoaderCircle, aq as Upload, aM as FileImage, aN as GripVertical, aG as Maximize2, o as ChevronLeft, n as ChevronRight, an as Trash2, X, G as Globe, U as User, m as MapPin, a7 as Navigation, p as CircleCheck, am as CircleX, N as Calendar, $ as ExternalLink, ap as Save, a2 as BookOpen, b as Sparkles, ay as Bold, az as Italic, aA as Heading2, a5 as List, aD as Link, ax as PenLine, ag as Eye, aV as ChevronDown } from "../_libs/lucide-react.mjs";
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
function makeSnapshot(data) {
  return {
    title: (data.title || "").trim(),
    slug: (data.slug || "").trim(),
    excerpt: (data.excerpt || "").trim(),
    content: data.content || "",
    cover: (data.cover || "").trim(),
    category: data.category || "",
    tags: (data.tags || "").trim(),
    featured: !!data.featured,
    published: !!data.published,
    authorName: (data.authorName || "").trim(),
    authorImageUrl: (data.authorImageUrl || "").trim(),
    locationName: (data.locationName || "").trim(),
    latitude: (data.latitude || "").trim(),
    longitude: (data.longitude || "").trim(),
    scheduledAt: (data.scheduledAt || "").trim(),
    destinationId: (data.destinationId || "").trim(),
    travelDate: (data.travelDate || "").trim(),
    seoTitle: (data.seoTitle || "").trim(),
    seoDescription: (data.seoDescription || "").trim(),
    ogImageUrl: (data.ogImageUrl || "").trim(),
    galleryLength: data.gallery?.length || 0,
    galleryOrder: (data.gallery || []).map((g) => `${g.id || ""}:${g.image_url}:${g.alt_text}:${g.sort_order}`).join("|")
  };
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
  const initialAuthor = initial?.author_name && initial.author_name.trim().toLowerCase() !== "noman" ? initial.author_name : "Hussain";
  const [authorName, setAuthorName] = reactExports.useState(initialAuthor);
  const [authorImageUrl, setAuthorImageUrl] = reactExports.useState(
    initial?.author_image_url ? resolveImageUrl(initial.author_image_url) : ""
  );
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
    const effTitle = initial.title ?? "";
    const effSlug = initial.slug ?? "";
    const effExcerpt = initial.excerpt ?? "";
    const effContent = initial.content ?? "";
    const effCover = initial.cover_image ? resolveImageUrl(initial.cover_image) : "";
    const effCategory = initial.category ?? CATEGORIES[0];
    const effTags = (initial.tags ?? []).join(", ");
    const effFeatured = !!initial.featured;
    const effPublished = !!initial.published;
    const effectiveAuthor = initial.author_name && initial.author_name.trim().toLowerCase() !== "noman" ? initial.author_name : "Hussain";
    const effAuthorImage = initial.author_image_url ? resolveImageUrl(initial.author_image_url) : "";
    const effLocName = initial.location_name ?? "";
    const effLat = initial.latitude != null ? String(initial.latitude) : "";
    const effLng = initial.longitude != null ? String(initial.longitude) : "";
    const effSched = initial.scheduled_at ? toLocalInput(initial.scheduled_at) : "";
    const effDestId = initial.destination_id ?? "";
    const effTravelDate = initial.travel_date ?? "";
    const effSeoTitle = initial.seo_title ?? "";
    const effSeoDesc = initial.seo_description ?? "";
    const effOgImg = initial.og_image_url ? resolveImageUrl(initial.og_image_url) : "";
    setTitle(effTitle);
    setSlug(effSlug);
    setExcerpt(effExcerpt);
    setContent(effContent);
    setCover(effCover);
    setCategory(effCategory);
    setTags(effTags);
    setFeatured(effFeatured);
    setPublished(effPublished);
    setAuthorName(effectiveAuthor);
    setAuthorImageUrl(effAuthorImage);
    setLocationName(effLocName);
    setLatitude(effLat);
    setLongitude(effLng);
    setScheduledAt(effSched);
    setDestinationId(effDestId);
    setTravelDate(effTravelDate);
    setSeoTitle(effSeoTitle);
    setSeoDescription(effSeoDesc);
    setOgImageUrl(effOgImg);
    const effectiveGallery = initial.gallery ?? initial.post_gallery;
    const galList = (effectiveGallery && Array.isArray(effectiveGallery) ? effectiveGallery : []).map((g, idx) => ({
      id: g.id,
      image_url: resolveImageUrl(g.image_url),
      alt_text: g.alt_text ?? "",
      sort_order: g.sort_order ?? idx
    }));
    setGallery(galList);
    setSavedSnapshot(
      makeSnapshot({
        title: effTitle,
        slug: effSlug,
        excerpt: effExcerpt,
        content: effContent,
        cover: effCover,
        category: effCategory,
        tags: effTags,
        featured: effFeatured,
        published: effPublished,
        authorName: effectiveAuthor,
        authorImageUrl: effAuthorImage,
        locationName: effLocName,
        latitude: effLat,
        longitude: effLng,
        scheduledAt: effSched,
        destinationId: effDestId,
        travelDate: effTravelDate,
        seoTitle: effSeoTitle,
        seoDescription: effSeoDesc,
        ogImageUrl: effOgImg,
        gallery: galList
      })
    );
    setSaveStatus("idle");
    setSaveErrorMessage(null);
    setPostCoordStatus("idle");
    setPostCoordErrorMessage(null);
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
  const [saveStatus, setSaveStatus] = reactExports.useState("idle");
  const [saveErrorMessage, setSaveErrorMessage] = reactExports.useState(null);
  const [postCoordStatus, setPostCoordStatus] = reactExports.useState("idle");
  const [postCoordErrorMessage, setPostCoordErrorMessage] = reactExports.useState(null);
  const [savedSnapshot, setSavedSnapshot] = reactExports.useState(() => {
    if (!initial) {
      return makeSnapshot({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        cover: "",
        category: CATEGORIES[0],
        tags: "",
        featured: false,
        published: false,
        authorName: "Hussain",
        authorImageUrl: "",
        locationName: "",
        latitude: "",
        longitude: "",
        scheduledAt: "",
        destinationId: "",
        travelDate: "",
        seoTitle: "",
        seoDescription: "",
        ogImageUrl: "",
        gallery: []
      });
    }
    return null;
  });
  const qc = useQueryClient();
  const updatePostCoordsFn = useServerFn(adminUpdatePostCoordinates);
  const isDirty = reactExports.useMemo(() => {
    if (!savedSnapshot) return false;
    if (!initial?.id) {
      return Boolean(
        title.trim() || content.trim() || cover.trim() || excerpt.trim() || locationName.trim() || latitude.trim() || longitude.trim() || gallery.length > 0
      );
    }
    const current = makeSnapshot({
      title,
      slug,
      excerpt,
      content,
      cover,
      category,
      tags,
      featured,
      published,
      authorName,
      authorImageUrl,
      locationName,
      latitude,
      longitude,
      scheduledAt,
      destinationId,
      travelDate,
      seoTitle,
      seoDescription,
      ogImageUrl,
      gallery
    });
    return current.title !== savedSnapshot.title || current.slug !== savedSnapshot.slug || current.excerpt !== savedSnapshot.excerpt || current.content !== savedSnapshot.content || current.cover !== savedSnapshot.cover || current.category !== savedSnapshot.category || current.tags !== savedSnapshot.tags || current.featured !== savedSnapshot.featured || current.published !== savedSnapshot.published || current.authorName !== savedSnapshot.authorName || current.authorImageUrl !== savedSnapshot.authorImageUrl || current.locationName !== savedSnapshot.locationName || current.latitude !== savedSnapshot.latitude || current.longitude !== savedSnapshot.longitude || current.scheduledAt !== savedSnapshot.scheduledAt || current.destinationId !== savedSnapshot.destinationId || current.travelDate !== savedSnapshot.travelDate || current.seoTitle !== savedSnapshot.seoTitle || current.seoDescription !== savedSnapshot.seoDescription || current.ogImageUrl !== savedSnapshot.ogImageUrl || current.galleryLength !== savedSnapshot.galleryLength || current.galleryOrder !== savedSnapshot.galleryOrder;
  }, [
    savedSnapshot,
    initial?.id,
    title,
    slug,
    excerpt,
    content,
    cover,
    category,
    tags,
    featured,
    published,
    authorName,
    authorImageUrl,
    locationName,
    latitude,
    longitude,
    scheduledAt,
    destinationId,
    travelDate,
    seoTitle,
    seoDescription,
    ogImageUrl,
    gallery
  ]);
  const coverInput = reactExports.useRef(null);
  reactExports.useRef(null);
  const galleryInput = reactExports.useRef(null);
  const authorImageInput = reactExports.useRef(null);
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
        if (saveStatus !== "idle") setSaveStatus("idle");
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
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
      if (initial?.id) {
        qc.invalidateQueries({ queryKey: ["admin-post", initial.id] });
      }
      setSavedSnapshot(
        makeSnapshot({
          title,
          slug,
          excerpt,
          content,
          cover,
          category,
          tags,
          featured,
          published,
          authorName,
          authorImageUrl,
          locationName,
          latitude,
          longitude,
          scheduledAt,
          destinationId,
          travelDate,
          seoTitle,
          seoDescription,
          ogImageUrl,
          gallery
        })
      );
      setSaveStatus("saved");
      setSaveErrorMessage(null);
      toast.success(initial?.id ? "Post updated successfully!" : "Post created successfully!");
      if (!initial?.id && row && typeof row === "object" && "id" in row) {
        navigate({ to: "/admin/posts/$id", params: { id: row.id } });
      }
    },
    onError: (e) => {
      setSaveStatus("error");
      setSaveErrorMessage(e.message || "Database update failed");
      toast.error(e.message || "Failed to save post");
    }
  });
  const updatePostCoordsMutation = useMutation({
    mutationFn: async ({
      id,
      latitude: latitude2,
      longitude: longitude2,
      location_name
    }) => {
      return await updatePostCoordsFn({
        data: { id, latitude: latitude2, longitude: longitude2, location_name }
      });
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
      if (initial?.id) {
        qc.invalidateQueries({ queryKey: ["admin-post", initial.id] });
      }
      if (res?.post) {
        const savedLat = String(res.post.latitude);
        const savedLng = String(res.post.longitude);
        setLatitude(savedLat);
        setLongitude(savedLng);
        setSavedSnapshot(
          (prev) => prev ? {
            ...prev,
            latitude: savedLat,
            longitude: savedLng,
            locationName: res.post.location_name || prev.locationName
          } : prev
        );
      }
      setPostCoordStatus("updated");
      setPostCoordErrorMessage(null);
      toast.success("Coordinates updated successfully!");
    },
    onError: (e) => {
      setPostCoordStatus("error");
      setPostCoordErrorMessage(e.message || "Failed to update coordinates");
      toast.error(e.message || "Failed to update coordinates");
    }
  });
  function handleUpdatePostCoordinates() {
    if (!initial?.id) {
      toast.info("Please save the story first to create the record before updating coordinates.");
      return;
    }
    const latStr = latitude.trim();
    const lngStr = longitude.trim();
    if (!latStr || isNaN(Number(latStr)) || Number(latStr) < -90 || Number(latStr) > 90) {
      toast.error("Please enter a valid Latitude between -90 and 90");
      return;
    }
    if (!lngStr || isNaN(Number(lngStr)) || Number(lngStr) < -180 || Number(lngStr) > 180) {
      toast.error("Please enter a valid Longitude between -180 and 180");
      return;
    }
    updatePostCoordsMutation.mutate({
      id: initial.id,
      latitude: Number(latStr),
      longitude: Number(lngStr),
      location_name: locationName.trim() || null
    });
  }
  async function uploadFile(file, kind) {
    setUploading(kind);
    try {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
      const type = file.type.toLowerCase();
      if (!allowedTypes.includes(type) && !type.startsWith("image/")) {
        throw new Error(`"${file.name}" is not a supported format. Please use JPG, PNG, WebP, or AVIF.`);
      }
      const maxBytes = 8 * 1024 * 1024;
      if (file.size > maxBytes) {
        throw new Error(`"${file.name}" exceeds the 8 MB size limit.`);
      }
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 }
      });
      const resolved = resolveImageUrl(url);
      if (kind === "cover") setCover(resolved);
      else if (kind === "author") setAuthorImageUrl(resolved);
      else if (kind === "inline") setContent((c) => `${c}

![](${resolved})
`);
      toast.success(kind === "author" ? "Author picture uploaded" : "Image uploaded");
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
      author_name: authorName.trim() && authorName.trim().toLowerCase() !== "noman" ? authorName.trim() : "Hussain",
      author_image_url: authorImageUrl.trim() || null,
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
  const body = /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: formId, onSubmit: submit, className: "grid gap-6 lg:grid-cols-[1fr_340px] pb-28 sm:pb-32", children: [
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
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Author Picture", hint: "Profile portrait shown on author bio & story", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          authorImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-border bg-muted/20 p-3 sm:p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: authorImageUrl,
                  alt: authorName || "Author",
                  className: "h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-accent/30 shadow-sm"
                }
              ),
              uploading === "author" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-white" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center sm:items-start text-center sm:text-left gap-1.5 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate max-w-full", children: [
                authorName || "Author",
                " Picture"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Custom profile photo for this story" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => authorImageInput.current?.click(),
                    disabled: uploading === "author",
                    className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent/10 hover:text-accent transition disabled:opacity-50",
                    children: [
                      uploading === "author" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
                      "Replace picture"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAuthorImageUrl(""),
                    disabled: uploading === "author",
                    className: "inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition disabled:opacity-50",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                      "Remove"
                    ]
                  }
                )
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => authorImageInput.current?.click(),
              disabled: uploading === "author",
              className: "group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/50 p-5 text-sm text-muted-foreground shadow-xs transition hover:border-accent hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50",
              children: [
                uploading === "author" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-200 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground group-hover:text-accent", children: "Browse author portrait" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "JPG, PNG, WebP or AVIF (max 8 MB)" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: authorImageInput,
              type: "file",
              accept: "image/jpeg,image/png,image/webp,image/avif",
              className: "hidden",
              onChange: (e) => e.target.files?.[0] && uploadFile(e.target.files[0], "author")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: authorImageUrl,
              onChange: (e) => setAuthorImageUrl(e.target.value),
              placeholder: "…or paste author image URL",
              className: input
            }
          )
        ] }) })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Latitude", hint: "(-90 to 90)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                setPostCoordStatus("idle");
                if (saveStatus !== "idle") setSaveStatus("idle");
              },
              placeholder: "e.g. 35.7444",
              className: input
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Longitude", hint: "(-180 to 180)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                setPostCoordStatus("idle");
                if (saveStatus !== "idle") setSaveStatus("idle");
              },
              placeholder: "e.g. 76.5250",
              className: input
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: updatePostCoordsMutation.isPending || !latitude.trim() || !longitude.trim(),
                onClick: handleUpdatePostCoordinates,
                className: "inline-flex items-center gap-2 rounded-xl bg-[#FF7A00] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#FF7A00]/25 hover:bg-[#FF7A00]/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                children: updatePostCoordsMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Updating Coordinates..." })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Update Coordinates" })
                ] })
              }
            ),
            postCoordStatus === "updated" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-600 animate-fade-in shadow-2xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Coordinates updated" })
            ] }),
            postCoordStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1 text-xs font-semibold text-red-600 animate-fade-in shadow-2xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: postCoordErrorMessage || "Failed to update coordinates" })
            ] })
          ] })
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
  const footerActions = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      initial?.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `/blog/${initial.slug}`,
          target: "_blank",
          rel: "noreferrer",
          className: "inline-flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:border-[#FF7A00] transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 text-[#FF7A00]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View live" })
          ]
        }
      ),
      saveStatus === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 shadow-2xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saved to database" })
      ] }),
      saveStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-2.5 py-0.5 text-xs font-semibold text-red-600 shadow-2xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save failed" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: published,
            onChange: (e) => {
              setPublished(e.target.checked);
              if (saveStatus !== "idle") setSaveStatus("idle");
            },
            className: "h-3.5 w-3.5 rounded border-border text-[#FF7A00] focus:ring-[#FF7A00]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Publish" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: close,
          className: "rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          form: formId,
          disabled: !isDirty || save.isPending,
          className: `inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${!isDirty || save.isPending ? "opacity-50 cursor-not-allowed bg-[#FF7A00]/70 text-white" : "bg-[#FF7A00] text-white shadow-md shadow-[#FF7A00]/25 hover:bg-[#FF7A00]/90 cursor-pointer"}`,
          children: save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Saving…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " Save Post"
          ] })
        }
      )
    ] })
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 relative max-w-7xl mx-auto pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-2xl bg-[#FF7A00]/10 text-[#FF7A00]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground", children: initial?.id ? "Edit Story" : "New Solo Story" }),
            published && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-xs font-semibold text-emerald-600", children: "Live" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mt-0.5", children: initial?.title ? `Editing "${initial.title}"` : "Draft a new solo journey chronicle" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: close,
            className: "rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer",
            children: "Back to Stories"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            form: formId,
            disabled: !isDirty || save.isPending,
            className: `inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${!isDirty || save.isPending ? "opacity-50 cursor-not-allowed bg-[#FF7A00]/70 text-white" : "bg-[#FF7A00] text-white shadow-md shadow-[#FF7A00]/25 hover:bg-[#FF7A00]/90 cursor-pointer"}`,
            children: save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving..." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Post" })
            ] })
          }
        )
      ] })
    ] }),
    body,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 w-full border-t border-border bg-card/95 backdrop-blur-md px-4 sm:px-6 py-3.5 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        initial?.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `/blog/${initial.slug}`,
            target: "_blank",
            rel: "noreferrer",
            className: "hidden md:inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground hover:border-[#FF7A00] transition-colors shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 text-[#FF7A00]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View live" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-bold text-foreground font-display max-w-[200px] lg:max-w-xs", children: title || "Untitled Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: published ? "Will be published live" : "Draft / unpublished" })
        ] }),
        saveStatus === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-600 animate-fade-in shadow-2xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saved to database" })
        ] }),
        saveStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1 text-xs font-semibold text-red-600 animate-fade-in shadow-2xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: saveErrorMessage || "Save failed" })
        ] }),
        saveStatus === "idle" && isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/25 px-3 py-1 text-xs font-semibold text-[#FF7A00] animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Unsaved changes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: published,
              onChange: (e) => {
                setPublished(e.target.checked);
                if (saveStatus !== "idle") setSaveStatus("idle");
              },
              className: "h-3.5 w-3.5 rounded border-border text-[#FF7A00] focus:ring-[#FF7A00]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Published" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: close,
            className: "rounded-xl border border-border bg-card px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            form: formId,
            disabled: !isDirty || save.isPending,
            className: `inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${!isDirty || save.isPending ? "opacity-50 cursor-not-allowed bg-[#FF7A00]/70 text-white" : "bg-[#FF7A00] text-white shadow-md shadow-[#FF7A00]/25 hover:bg-[#FF7A00]/90 cursor-pointer"}`,
            children: save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving..." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Post" })
            ] })
          }
        )
      ] })
    ] }) })
  ] });
}
const input = "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-colors shadow-2xs";
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
