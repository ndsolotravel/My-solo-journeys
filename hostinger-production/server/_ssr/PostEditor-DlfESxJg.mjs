import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, F as adminUpsertPost, v as adminUploadImage, p as adminListDestinations, C as CATEGORIES } from "./router-DLAQ89cm.mjs";
import { f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as LoaderCircle, z as Image, a2 as Plus, A as ArrowUp, aa as ArrowDown, a1 as Trash2, G as Globe, f as MapPin, ab as Upload, ac as ExternalLink, ad as Save, ae as Bold, af as Italic, ag as Heading2, y as List, ah as Link, ai as PenLine, Q as Eye, X } from "../_libs/lucide-react.mjs";
import { M as Markdown } from "../_libs/react-markdown.mjs";
function MarkdownEditor({ value, onChange, onInsertImage }) {
  const [mode, setMode] = reactExports.useState("split");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: () => wrap("**"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-4 w-4" }), label: "Bold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: () => wrap("*"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-4 w-4" }), label: "Italic" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: () => wrap("\n## ", ""), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading2, { className: "h-4 w-4" }), label: "Heading" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: () => wrap("\n- ", ""), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }), label: "List" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: () => wrap("[", "](https://)"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-4 w-4" }), label: "Link" }),
      onInsertImage && /* @__PURE__ */ jsxRuntimeExports.jsx(Tool, { onClick: onInsertImage, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }), label: "Image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto inline-flex rounded-lg border border-border bg-background p-0.5 text-xs", children: ["write", "split", "preview"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setMode(m),
          className: `rounded-md px-2 py-1 capitalize transition ${mode === m ? "bg-foreground text-background" : "text-muted-foreground"}`,
          children: m === "write" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" }) : m === "preview" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }) : "Split"
        },
        m
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid ${mode === "split" ? "md:grid-cols-2" : "grid-cols-1"}`, children: [
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
      mode !== "write" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[480px] max-h-[800px] overflow-y-auto border-l border-border p-4 prose-blog text-sm", children: value.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { children: value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Preview will appear here…" }) })
    ] })
  ] });
}
function Tool({ onClick, icon, label }) {
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
function PostEditor({
  initial,
  asDialog = !initial
}) {
  const navigate = useNavigate();
  const upsertFn = useServerFn(adminUpsertPost);
  const uploadFn = useServerFn(adminUploadImage);
  const listDestinationsFn = useServerFn(adminListDestinations);
  const { data: destinations } = useQuery({
    queryKey: ["admin-destinations"],
    queryFn: () => listDestinationsFn()
  });
  const [title, setTitle] = reactExports.useState(initial?.title ?? "");
  const [slug, setSlug] = reactExports.useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = reactExports.useState(initial?.excerpt ?? "");
  const [content, setContent] = reactExports.useState(initial?.content ?? "");
  const [cover, setCover] = reactExports.useState(initial?.cover_image ?? "");
  const [category, setCategory] = reactExports.useState(initial?.category ?? CATEGORIES[0]);
  const [tags, setTags] = reactExports.useState((initial?.tags ?? []).join(", "));
  const [featured, setFeatured] = reactExports.useState(!!initial?.featured);
  const [published, setPublished] = reactExports.useState(!!initial?.published);
  const [scheduledAt, setScheduledAt] = reactExports.useState(
    initial?.scheduled_at ? toLocalInput(initial.scheduled_at) : ""
  );
  const [destinationId, setDestinationId] = reactExports.useState(initial?.destination_id ?? "");
  const [travelDate, setTravelDate] = reactExports.useState(initial?.travel_date ?? "");
  const [seoTitle, setSeoTitle] = reactExports.useState(initial?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = reactExports.useState(initial?.seo_description ?? "");
  const [ogImageUrl, setOgImageUrl] = reactExports.useState(initial?.og_image_url ?? "");
  const [gallery, setGallery] = reactExports.useState(
    (initial?.gallery ?? []).map((g, idx) => ({
      id: g.id,
      image_url: g.image_url,
      alt_text: g.alt_text ?? "",
      sort_order: g.sort_order ?? idx
    }))
  );
  const [galleryUrlInput, setGalleryUrlInput] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(null);
  const coverInput = reactExports.useRef(null);
  const inlineInput = reactExports.useRef(null);
  const galleryInput = reactExports.useRef(null);
  const formId = "post-editor-form";
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
      if (kind === "cover") setCover(url);
      else if (kind === "inline") setContent((c) => `${c}

![](${url})
`);
      else if (kind === "gallery") {
        setGallery((prev) => [
          ...prev,
          { image_url: url, alt_text: "", sort_order: prev.length }
        ]);
      }
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(null);
    }
  }
  function addGalleryUrl() {
    if (!galleryUrlInput.trim()) return;
    setGallery((prev) => [
      ...prev,
      { image_url: galleryUrlInput.trim(), alt_text: "", sort_order: prev.length }
    ]);
    setGalleryUrlInput("");
    toast.success("Gallery image added");
  }
  function moveGalleryItem(index, direction) {
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
  function removeGalleryItem(index) {
    setGallery(
      (prev) => prev.filter((_, idx) => idx !== index).map((item, idx) => ({ ...item, sort_order: idx }))
    );
  }
  function updateGalleryAltText(index, alt_text) {
    setGallery(
      (prev) => prev.map((item, idx) => idx === index ? { ...item, alt_text } : item)
    );
  }
  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MarkdownEditor,
          {
            value: content,
            onChange: setContent,
            onInsertImage: () => inlineInput.current?.click()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inlineInput,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => e.target.files?.[0] && uploadFile(e.target.files[0], "inline")
          }
        ),
        uploading === "inline" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "inline h-3 w-3 animate-spin" }),
          " Uploading image to content…"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent" }),
              " Post Photo Gallery"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Upload photos specific to this story. Drag/reorder to change sequence." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => galleryInput.current?.click(),
              disabled: uploading === "gallery",
              className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors disabled:opacity-50",
              children: [
                uploading === "gallery" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                "Add Photo"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: galleryInput,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => e.target.files?.[0] && uploadFile(e.target.files[0], "gallery")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: galleryUrlInput,
              onChange: (e) => setGalleryUrlInput(e.target.value),
              placeholder: "…or paste photo URL",
              className: input + " text-xs py-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: addGalleryUrl,
              className: "rounded-xl border border-border px-3 py-2 text-xs font-medium hover:bg-muted whitespace-nowrap",
              children: "Add URL"
            }
          )
        ] }),
        gallery.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pt-2", children: gallery.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 rounded-xl border border-border/80 bg-background p-3 shadow-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.image_url,
                  alt: item.alt_text || `Gallery photo ${idx + 1}`,
                  className: "h-14 w-14 rounded-lg object-cover bg-muted shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: item.alt_text,
                    onChange: (e) => updateGalleryAltText(idx, e.target.value),
                    placeholder: "Alt text / description…",
                    className: "w-full text-xs rounded-lg border border-border bg-muted/20 px-2.5 py-1.5 outline-none focus:border-accent"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: item.image_url })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    disabled: idx === 0,
                    onClick: () => moveGalleryItem(idx, "up"),
                    className: "h-7 w-7 inline-flex items-center justify-center rounded hover:bg-muted disabled:opacity-30",
                    title: "Move up",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    disabled: idx === gallery.length - 1,
                    onClick: () => moveGalleryItem(idx, "down"),
                    className: "h-7 w-7 inline-flex items-center justify-center rounded hover:bg-muted disabled:opacity-30",
                    title: "Move down",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeGalleryItem(idx),
                    className: "h-7 w-7 inline-flex items-center justify-center rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500",
                    title: "Remove photo",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                  }
                )
              ] })
            ]
          },
          idx
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center py-4 text-muted-foreground border border-dashed border-border rounded-xl", children: "No gallery photos added yet." })
      ] }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-accent" }),
          " Location & Date"
        ] }),
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
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Travel Date", hint: "Date of the actual trip", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: travelDate,
            onChange: (e) => setTravelDate(e.target.value),
            className: input
          }
        ) }) })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: category,
            onChange: (e) => setCategory(e.target.value),
            className: input,
            children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
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
