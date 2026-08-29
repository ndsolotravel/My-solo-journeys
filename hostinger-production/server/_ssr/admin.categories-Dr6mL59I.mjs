import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as useServerFn, N as adminListCategories, O as adminUpsertCategory, P as adminDeleteCategory, Q as slugify } from "./router-DZuDuyqb.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as adminUploadImage } from "./admin.functions-67-zmleM.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DsuHXNs6.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a4 as FolderTree, au as Plus, S as Search, X, h as LoaderCircle, z as Layers, $ as ExternalLink, l as FileText, av as Pencil, an as Trash2, b as Sparkles, ao as Upload, G as Globe, aw as TriangleAlert, a6 as Image } from "../_libs/lucide-react.mjs";
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
import "./client-BaIz-VBI.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
const emptyCategory = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  status: "active",
  display_order: 0,
  seo_title: "",
  seo_description: ""
};
function CategoryImagePreviewBox({
  imageUrl,
  onRemove
}) {
  const [loadError, setLoadError] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const cleanUrl = imageUrl.trim();
  const resolvedUrl = reactExports.useMemo(() => resolveMediaUrl(cleanUrl), [cleanUrl]);
  reactExports.useEffect(() => {
    if (!cleanUrl) {
      setLoadError(false);
      setIsLoading(false);
      return;
    }
    setLoadError(false);
    setIsLoading(true);
  }, [cleanUrl]);
  if (!cleanUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-8 text-center px-4 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 text-muted-foreground/40 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "No image URL entered" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70 mt-0.5 max-w-xs", children: "Enter an image URL above or upload a picture (JPG, JPEG, PNG, WEBP, GIF) to see live preview." })
    ] });
  }
  if (loadError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/5 py-7 text-center px-4 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-7 w-7 text-amber-500 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-600 dark:text-amber-400", children: "Unable to load image. Please check the image URL." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 max-w-sm", children: "Make sure the link is publicly accessible and points to a valid image format (JPG, PNG, WEBP, GIF)." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-black/40 p-2 min-h-[160px] max-h-56 flex items-center justify-center group animate-in fade-in duration-200", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-xs z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-accent" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolvedUrl, alt: "Category Preview", onLoad: () => {
      setIsLoading(false);
      setLoadError(false);
    }, onError: () => {
      setIsLoading(false);
      setLoadError(true);
    }, className: `max-h-52 max-w-full rounded-xl object-contain shadow-xs transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}` }),
    !isLoading && !loadError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: resolvedUrl, target: "_blank", rel: "noreferrer", title: "Open full image in new tab", className: "flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition cursor-pointer shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onRemove, title: "Remove image", className: "flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white hover:bg-red-600 transition cursor-pointer shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
    ] })
  ] });
}
function AdminCategoriesPage() {
  const listFn = useServerFn(adminListCategories);
  const saveFn = useServerFn(adminUpsertCategory);
  const delFn = useServerFn(adminDeleteCategory);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();
  const {
    data: categories = [],
    isLoading
  } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => await listFn()
  });
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [editing, setEditing] = reactExports.useState(null);
  const [isAutoSlug, setIsAutoSlug] = reactExports.useState(true);
  const [uploading, setUploading] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const saveMutation = useMutation({
    mutationFn: (form) => saveFn({
      data: {
        id: form.id,
        name: form.name,
        slug: form.slug || void 0,
        description: form.description || null,
        image_url: form.image_url || null,
        status: form.status,
        display_order: Number(form.display_order) || 0,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-categories"]
      });
      setEditing(null);
      toast.success("Category saved successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to save category");
    }
  });
  const delMutation = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: (res) => {
      qc.invalidateQueries({
        queryKey: ["admin-categories"]
      });
      setDeleteTarget(null);
      toast.success(res.message || "Category deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete category");
    }
  });
  const filteredCategories = reactExports.useMemo(() => {
    return categories.filter((c) => {
      const matchSearch = search.trim() === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.slug.toLowerCase().includes(search.toLowerCase()) || (c.description || "").toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [categories, search, statusFilter]);
  async function handleImageUpload(file) {
    try {
      setUploading(true);
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const {
        url
      } = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type,
          base64
        }
      });
      setEditing((prev) => prev ? {
        ...prev,
        image_url: url
      } : prev);
      toast.success("Category image uploaded");
    } catch (err) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }
  function openCreateModal() {
    setIsAutoSlug(true);
    setEditing({
      ...emptyCategory,
      display_order: categories.length + 1
    });
  }
  function openEditModal(c) {
    setIsAutoSlug(false);
    setEditing({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      image_url: c.image_url || "",
      status: c.status,
      display_order: c.display_order ?? 0,
      seo_title: c.seo_title || "",
      seo_description: c.seo_description || ""
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderTree, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight sm:text-3xl", children: "Category Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Create, organize, and manage blog categories with auto-slugs and post associations." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: openCreateModal, className: "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition cursor-pointer shadow-sm self-start sm:self-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add Category"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-4 shadow-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search categories by name, slug or description…", className: "w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors" }),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSearch(""), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-xl border border-border bg-background p-1 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setStatusFilter("all"), className: `rounded-lg px-3 py-1.5 font-medium transition ${statusFilter === "all" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: [
          "All (",
          categories.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setStatusFilter("active"), className: `rounded-lg px-3 py-1.5 font-medium transition ${statusFilter === "active" ? "bg-emerald-600 text-white" : "text-muted-foreground hover:text-foreground"}`, children: [
          "Active (",
          categories.filter((c) => c.status === "active").length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setStatusFilter("inactive"), className: `rounded-lg px-3 py-1.5 font-medium transition ${statusFilter === "inactive" ? "bg-zinc-700 text-white" : "text-muted-foreground hover:text-foreground"}`, children: [
          "Inactive (",
          categories.filter((c) => c.status === "inactive").length,
          ")"
        ] })
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-accent mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading categories…" })
    ] }) : filteredCategories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderTree, { className: "mx-auto h-12 w-12 text-muted-foreground/40 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "No categories found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-sm mx-auto", children: search ? "No categories match your search terms." : "Start by adding your first travel blog category." }),
      !search && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: openCreateModal, className: "mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        " Create Category"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 w-14 text-center", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 min-w-[220px]", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 min-w-[160px]", children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 min-w-[240px]", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 text-center", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 text-center", children: "Posts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 text-right w-28", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filteredCategories.map((c) => {
        const postCount = c.post_count ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group hover:bg-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-center font-mono text-xs text-muted-foreground", children: c.display_order }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            c.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(c.image_url), alt: c.name, onError: (e) => {
              e.currentTarget.style.display = "none";
            }, className: "h-10 w-10 shrink-0 rounded-lg object-cover border border-border shadow-xs" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 opacity-60" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground group-hover:text-accent transition-colors", children: c.name }),
              c.seo_title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground line-clamp-1", children: c.seo_title })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground/80", children: [
              "/",
              c.slug
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: {
              slug: c.slug
            }, target: "_blank", title: "View public category page", className: "text-muted-foreground hover:text-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-xs text-muted-foreground line-clamp-2 max-w-xs", children: c.description || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground/50", children: "No description" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.status === "active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${c.status === "active" ? "bg-emerald-500" : "bg-zinc-400"}` }),
            c.status === "active" ? "Active" : "Inactive"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/posts", title: "View posts in this category", className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition ${postCount > 0 ? "bg-accent/10 text-accent hover:bg-accent/20" : "bg-muted text-muted-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              postCount,
              " ",
              postCount === 1 ? "story" : "stories"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Edit Category", onClick: () => openEditModal(c), className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Delete Category", onClick: () => setDeleteTarget(c), className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-600 transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, c.id);
      }) })
    ] }) }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-6 py-4 bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderTree, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: editing.id ? "Edit Category" : "Create New Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: editing.id ? `Updating "${editing.name}"` : "Define category attributes, slug, and SEO settings" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditing(null), className: "flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        if (!editing.name.trim()) return toast.error("Category name is required");
        saveMutation.mutate(editing);
      }, className: "max-h-[75vh] overflow-y-auto p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5", children: [
              "Category Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, maxLength: 100, value: editing.name, onChange: (e) => {
              const newName = e.target.value;
              setEditing((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  name: newName,
                  slug: isAutoSlug ? slugify(newName) : prev.slug
                };
              });
            }, placeholder: "e.g. Motorcycle Journeys", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
                "URL Slug ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
                setIsAutoSlug(true);
                setEditing((prev) => prev ? {
                  ...prev,
                  slug: slugify(prev.name)
                } : prev);
              }, className: "text-[11px] text-accent hover:underline flex items-center gap-1 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
                " Auto-sync"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, maxLength: 100, value: editing.slug, onChange: (e) => {
              setIsAutoSlug(false);
              setEditing((prev) => prev ? {
                ...prev,
                slug: slugify(e.target.value)
              } : prev);
            }, placeholder: "e.g. motorcycle-journeys", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-mono outline-none focus:border-accent transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1", children: [
              "Public URL: ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                "/category/",
                editing.slug || "slug"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, maxLength: 500, value: editing.description, onChange: (e) => setEditing((prev) => prev ? {
            ...prev,
            description: e.target.value
          } : prev), placeholder: "Brief summary of what stories belong to this category…", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-y" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editing.status, onChange: (e) => setEditing((prev) => prev ? {
              ...prev,
              status: e.target.value
            } : prev), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active (Visible publicly)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Inactive (Hidden from public navigation)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Display Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 999, value: editing.display_order, onChange: (e) => setEditing((prev) => prev ? {
              ...prev,
              display_order: parseInt(e.target.value) || 0
            } : prev), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "Lower numbers appear first in lists and menus." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Category Image URL" }),
            editing.image_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setEditing((prev) => prev ? {
              ...prev,
              image_url: ""
            } : prev), className: "text-[11px] text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
              " Clear URL"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editing.image_url, onChange: (e) => setEditing((prev) => prev ? {
              ...prev,
              image_url: e.target.value
            } : prev), placeholder: "https://images.unsplash.com/photo-… or storage URL", className: "flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted/80 transition cursor-pointer shrink-0", children: [
              uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upload" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && handleImageUpload(e.target.files[0]) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1.5", children: "Live Image Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryImagePreviewBox, { imageUrl: editing.image_url, onRemove: () => setEditing((prev) => prev ? {
              ...prev,
              image_url: ""
            } : prev) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/20 p-4 space-y-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-accent" }),
            " Search Engine Optimization (SEO)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "SEO Meta Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", maxLength: 200, value: editing.seo_title, onChange: (e) => setEditing((prev) => prev ? {
              ...prev,
              seo_title: e.target.value
            } : prev), placeholder: `${editing.name || "Category"} — ndsolotravel`, className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "SEO Meta Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, maxLength: 500, value: editing.seo_description, onChange: (e) => setEditing((prev) => prev ? {
              ...prev,
              seo_description: e.target.value
            } : prev), placeholder: editing.description || "Search snippet description displayed in Google results…", className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent transition-colors resize-y" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pt-3 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditing(null), className: "rounded-full px-5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saveMutation.isPending, className: "inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-medium text-background hover:opacity-90 transition disabled:opacity-50 cursor-pointer shadow-sm", children: saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
            " Saving…"
          ] }) : "Save Category" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteTarget, onOpenChange: (open) => !open && setDeleteTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: deleteTarget && (deleteTarget.post_count ?? 0) > 0 ? "Cannot Delete Category" : "Delete Category?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-sm space-y-2 mt-2", children: deleteTarget && (deleteTarget.post_count ?? 0) > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Category",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
              '"',
              deleteTarget.name,
              '"'
            ] }),
            " is currently assigned to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-amber-500", children: [
              deleteTarget.post_count,
              " blog",
              " ",
              deleteTarget.post_count === 1 ? "post" : "posts"
            ] }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "To prevent breaking blog post relationships, you must first edit those posts and reassign them to a different category before this category can be removed." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Are you sure you want to delete category",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
            '"',
            deleteTarget?.name,
            '"'
          ] }),
          "? This action cannot be undone."
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full cursor-pointer", children: deleteTarget && (deleteTarget.post_count ?? 0) > 0 ? "Understood" : "Cancel" }),
        deleteTarget && (deleteTarget.post_count ?? 0) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { disabled: delMutation.isPending, className: "rounded-full bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-sm", onClick: () => deleteTarget && delMutation.mutate(deleteTarget.id), children: delMutation.isPending ? "Deleting…" : "Delete Category" })
      ] })
    ] }) })
  ] });
}
export {
  AdminCategoriesPage as component
};
