import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as useServerFn, B as adminListNews, E as adminUpsertNews, F as adminDeleteNews, G as adminToggleNewsField, H as slugifyNews } from "./router-CFyxGYDP.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as adminUploadImage } from "./admin.functions-67-zmleM.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DsuHXNs6.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-DcfalasJ.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a3 as Radio, au as Plus, V as Flame, p as CircleCheck, l as FileText, S as Search, h as LoaderCircle, N as Calendar, ag as Eye, av as Pencil, an as Trash2, ao as Upload, q as Clock, $ as ExternalLink, aw as TriangleAlert, a6 as Image, X } from "../_libs/lucide-react.mjs";
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
const toLocalDatetime = (isoDate) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return "";
  const offset = d.getTimezoneOffset() * 6e4;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
};
const fromLocalDatetime = (localDate) => {
  if (!localDate || !localDate.trim()) return null;
  const d = new Date(localDate);
  if (isNaN(d.getTime())) return null;
  return d.toISOString();
};
const getInitialFormState = (item) => {
  if (!item) {
    return {
      title: "",
      slug: "",
      summary: "",
      content: "",
      image_url: "",
      status: "draft",
      is_breaking: true,
      is_active: true,
      display_order: 0,
      published_at: toLocalDatetime((/* @__PURE__ */ new Date()).toISOString()),
      expires_at: ""
    };
  }
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    summary: item.summary || "",
    content: item.content || "",
    image_url: item.image_url || "",
    status: item.status,
    is_breaking: item.is_breaking,
    is_active: item.is_active,
    display_order: item.display_order ?? 0,
    published_at: toLocalDatetime(item.published_at),
    expires_at: toLocalDatetime(item.expires_at)
  };
};
function NewsImagePreviewBox({
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "No featured image entered" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70 mt-0.5 max-w-xs", children: "Enter an image URL or upload an image to display in the news card & banner." })
    ] });
  }
  if (loadError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/5 py-7 text-center px-4 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-7 w-7 text-amber-500 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-600 dark:text-amber-400", children: "Unable to load image. Please check the image link." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-black/40 p-2 min-h-[160px] max-h-56 flex items-center justify-center group animate-in fade-in duration-200", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-xs z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-[#FF7A00]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolvedUrl, alt: "News Featured Preview", onLoad: () => {
      setIsLoading(false);
      setLoadError(false);
    }, onError: () => {
      setIsLoading(false);
      setLoadError(true);
    }, className: `max-h-52 max-w-full rounded-xl object-contain shadow-xs transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onRemove, className: "absolute top-3 right-3 rounded-full bg-background/90 p-1.5 text-muted-foreground shadow-md hover:bg-destructive hover:text-white transition-colors", title: "Remove image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
  ] });
}
function AdminNewsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListNews);
  const upsertFn = useServerFn(adminUpsertNews);
  const deleteFn = useServerFn(adminDeleteNews);
  const toggleFn = useServerFn(adminToggleNewsField);
  const uploadFn = useServerFn(adminUploadImage);
  const {
    data: newsItems,
    isLoading
  } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => await listFn()
  });
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [isFormOpen, setIsFormOpen] = reactExports.useState(false);
  const [editingItem, setEditingItem] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState(getInitialFormState());
  const [isSlugManual, setIsSlugManual] = reactExports.useState(false);
  const [editorTab, setEditorTab] = reactExports.useState("edit");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [previewTarget, setPreviewTarget] = reactExports.useState(null);
  const [uploadingImage, setUploadingImage] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData(getInitialFormState());
    setIsSlugManual(false);
    setEditorTab("edit");
    setIsFormOpen(true);
  };
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData(getInitialFormState(item));
    setIsSlugManual(true);
    setEditorTab("edit");
    setIsFormOpen(true);
  };
  const upsertMutation = useMutation({
    mutationFn: async (payload) => {
      const pubIso = fromLocalDatetime(payload.published_at) || (/* @__PURE__ */ new Date()).toISOString();
      const expIso = fromLocalDatetime(payload.expires_at);
      return await upsertFn({
        data: {
          id: payload.id,
          title: payload.title,
          slug: payload.slug,
          summary: payload.summary || null,
          content: payload.content || "",
          image_url: payload.image_url || null,
          status: payload.status,
          is_breaking: payload.is_breaking,
          is_active: payload.is_active,
          display_order: Number(payload.display_order) || 0,
          published_at: pubIso,
          expires_at: expIso
        }
      });
    },
    onSuccess: (result) => {
      qc.invalidateQueries({
        queryKey: ["admin-news"]
      });
      qc.invalidateQueries({
        queryKey: ["breaking-news"]
      });
      toast.success(editingItem ? "News item updated successfully" : "News item created successfully");
      setIsFormOpen(false);
      setEditingItem(null);
    },
    onError: (e) => {
      toast.error(e.message || "Failed to save news item");
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteFn({
        data: {
          id
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-news"]
      });
      qc.invalidateQueries({
        queryKey: ["breaking-news"]
      });
      toast.success("News item deleted permanently");
      setDeleteTarget(null);
    },
    onError: (e) => {
      toast.error(e.message || "Failed to delete news item");
      setDeleteTarget(null);
    }
  });
  const toggleMutation = useMutation({
    mutationFn: async ({
      id,
      field,
      value
    }) => {
      return await toggleFn({
        data: {
          id,
          field,
          value
        }
      });
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["admin-news"]
      });
      qc.invalidateQueries({
        queryKey: ["breaking-news"]
      });
      const fieldNames = {
        status: "Publication status",
        is_breaking: "Breaking News setting",
        is_active: "Active status"
      };
      toast.success(`Updated ${fieldNames[vars.field]}`);
    },
    onError: (e) => {
      toast.error(e.message || "Failed to update news status");
    }
  });
  const handleTitleChange = (newTitle) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        title: newTitle
      };
      if (!isSlugManual) {
        next.slug = slugifyNews(newTitle);
      }
      return next;
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image file size must be less than 8MB");
      return;
    }
    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result.split(",")[1];
          const res = await uploadFn({
            data: {
              filename: file.name,
              contentType: file.type,
              base64
            }
          });
          if (res?.url) {
            setFormData((prev) => ({
              ...prev,
              image_url: res.url
            }));
            toast.success("Image uploaded successfully");
          }
        } catch (err) {
          toast.error(err.message || "Failed to upload image");
        } finally {
          setUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingImage(false);
      toast.error("Error reading image file");
    }
  };
  const metrics = reactExports.useMemo(() => {
    const items = newsItems ?? [];
    const now = Date.now();
    const total = items.length;
    const breaking = items.filter((n) => n.is_breaking && n.status === "published" && n.is_active && new Date(n.published_at).getTime() <= now && (!n.expires_at || new Date(n.expires_at).getTime() >= now)).length;
    const published = items.filter((n) => n.status === "published").length;
    const drafts = items.filter((n) => n.status === "draft").length;
    return {
      total,
      breaking,
      published,
      drafts
    };
  }, [newsItems]);
  const filteredNews = reactExports.useMemo(() => {
    if (!newsItems) return [];
    const now = Date.now();
    return newsItems.filter((item) => {
      if (filter === "breaking" && !item.is_breaking) return false;
      if (filter === "published" && item.status !== "published") return false;
      if (filter === "draft" && item.status !== "draft") return false;
      if (filter === "active" && !item.is_active) return false;
      if (filter === "expired") {
        if (!item.expires_at || new Date(item.expires_at).getTime() > now) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSummary = (item.summary || "").toLowerCase().includes(q);
        const matchSlug = item.slug.toLowerCase().includes(q);
        if (!matchTitle && !matchSummary && !matchSlug) return false;
      }
      return true;
    });
  }, [newsItems, filter, search]);
  const getExpiryBadge = (item) => {
    if (!item.expires_at) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Never expires" });
    }
    const expTime = new Date(item.expires_at).getTime();
    const now = Date.now();
    const isExpired = expTime <= now;
    if (isExpired) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-600 dark:text-red-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
        " Expired"
      ] });
    }
    const diffHours = Math.round((expTime - now) / (1e3 * 60 * 60));
    if (diffHours < 24) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
        " Expires in ",
        diffHours,
        "h"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
      " Expires ",
      new Date(item.expires_at).toLocaleDateString()
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-5 w-5 animate-pulse" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "News Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage breaking dispatches, travel alerts, and homepage news bulletins" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleOpenCreate, className: "inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#FF7A00]/90 transition-all hover:scale-[1.02] active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New News Item"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-4 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider", children: "Total News" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold", children: metrics.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "All entries created" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[#FF7A00]/30 bg-[#FF7A00]/5 p-4 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[#FF7A00]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider", children: "Active Breaking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-[#FF7A00]", children: metrics.breaking }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[#FF7A00]/80 mt-0.5", children: "Live on homepage ticker" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-emerald-600 dark:text-emerald-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider", children: "Published" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400", children: metrics.published }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5", children: "Published status" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-4 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider", children: "Drafts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold", children: metrics.drafts }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Unpublished" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-1 rounded-xl border border-border bg-muted/20 p-1", children: [{
        id: "all",
        label: "All"
      }, {
        id: "breaking",
        label: "Breaking",
        icon: Flame
      }, {
        id: "published",
        label: "Published"
      }, {
        id: "draft",
        label: "Drafts"
      }, {
        id: "active",
        label: "Active"
      }, {
        id: "expired",
        label: "Expired"
      }].map((tab) => {
        const Icon = "icon" in tab ? tab.icon : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFilter(tab.id), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${filter === tab.id ? "bg-background text-foreground shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: [
          Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3 text-[#FF7A00]" }),
          tab.label
        ] }, tab.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 sm:max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search headline, summary, slug…", className: "w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:border-[#FF7A00] transition-colors" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-background shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5", children: "Headline & Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 text-center", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 text-center", children: "Breaking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 text-center", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 hidden md:table-cell", children: "Publish & Expiry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 hidden sm:table-cell text-center", children: "Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 7, className: "px-4 py-12 text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin mx-auto mb-2 text-[#FF7A00]" }),
          "Loading news items…"
        ] }) }),
        filteredNews.map((item) => {
          const isPublished = item.status === "published";
          const isLive = isPublished && item.is_active && item.is_breaking && new Date(item.published_at).getTime() <= Date.now() && (!item.expires_at || new Date(item.expires_at).getTime() >= Date.now());
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition-colors group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 min-w-[240px] max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              item.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(item.image_url), alt: "", className: "h-11 w-11 shrink-0 rounded-lg object-cover bg-muted" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground line-clamp-1 group-hover:text-[#FF7A00] transition-colors", children: item.title }),
                  isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex h-2 w-2 relative shrink-0", title: "Currently Live on Homepage Ticker", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-red-500" })
                  ] })
                ] }),
                item.summary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 mt-0.5", children: item.summary }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground/80 font-mono mt-0.5", children: [
                  "/news/",
                  item.slug
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toggleMutation.mutate({
              id: item.id,
              field: "status",
              value: isPublished ? "draft" : "published"
            }), title: isPublished ? "Click to set Draft" : "Click to Publish", className: "inline-block transition-transform hover:scale-105", children: isPublished ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
              " Published"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground", children: "Draft" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleMutation.mutate({
              id: item.id,
              field: "is_breaking",
              value: !item.is_breaking
            }), title: item.is_breaking ? "Breaking News Enabled (Click to disable)" : "Standard News (Click to enable Breaking)", className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all hover:scale-105 ${item.is_breaking ? "bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 shadow-xs" : "bg-muted text-muted-foreground"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: `h-3.5 w-3.5 ${item.is_breaking ? "text-[#FF7A00] fill-[#FF7A00]/40 animate-pulse" : ""}` }),
              item.is_breaking ? "Breaking" : "Standard"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toggleMutation.mutate({
              id: item.id,
              field: "is_active",
              value: !item.is_active
            }), title: item.is_active ? "Active (Click to deactivate)" : "Inactive (Click to activate)", className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all hover:scale-105 ${item.is_active ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-red-500/10 text-red-600 dark:text-red-400"}`, children: item.is_active ? "Active" : "Inactive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3.5 hidden md:table-cell text-xs space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-foreground font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(item.published_at).toLocaleDateString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: new Date(item.published_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: getExpiryBadge(item) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 hidden sm:table-cell text-center text-xs font-mono text-muted-foreground", children: item.display_order }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setPreviewTarget(item), title: "Preview News", className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleOpenEdit(item), title: "Edit News", className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-[#FF7A00] transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDeleteTarget(item), title: "Delete News", className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-600 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }) })
          ] }, item.id);
        }),
        !isLoading && filteredNews.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-12 text-center text-muted-foreground", children: newsItems?.length === 0 ? 'No news items yet. Click "New News Item" above to create your first dispatch.' : "No news items match your current search and filter criteria." }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isFormOpen, onOpenChange: setIsFormOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl font-bold", children: editingItem ? "Edit News Dispatch" : "Create News Dispatch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-sm text-muted-foreground mt-1", children: "Configure headline, summary, breaking status, scheduling, and expiry." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-xl border border-border bg-muted/30 p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditorTab("edit"), className: `rounded-lg px-3 py-1 text-xs font-medium transition-colors ${editorTab === "edit" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: "Editor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditorTab("preview"), className: `rounded-lg px-3 py-1 text-xs font-medium transition-colors ${editorTab === "preview" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: "Live Preview" })
        ] })
      ] }) }),
      editorTab === "edit" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
          toast.error("Please enter a headline");
          return;
        }
        upsertMutation.mutate(formData);
      }, className: "mt-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: [
            "Headline / Title ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: formData.title, onChange: (e) => handleTitleChange(e.target.value), placeholder: "e.g. Karakoram Highway reopened after seasonal pass clearance...", className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium outline-none focus:border-[#FF7A00] transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "URL Slug" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              setIsSlugManual(false);
              setFormData((p) => ({
                ...p,
                slug: slugifyNews(p.title)
              }));
            }, className: "text-[11px] text-[#FF7A00] hover:underline font-medium", children: "Reset from headline" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-xl border border-border bg-muted/20 px-3 py-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mr-1", children: "/news/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.slug, onChange: (e) => {
              setIsSlugManual(true);
              setFormData((p) => ({
                ...p,
                slug: slugifyNews(e.target.value)
              }));
            }, placeholder: "auto-generated-slug", className: "w-full bg-transparent text-foreground outline-none font-mono text-xs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Short Description / Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: formData.summary, onChange: (e) => setFormData((p) => ({
            ...p,
            summary: e.target.value
          })), placeholder: "Brief 1-2 sentence overview shown in tickers, previews, and meta summaries...", className: "w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-[#FF7A00] transition-colors resize-y" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Full News Content (Markdown Supported)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 6, value: formData.content, onChange: (e) => setFormData((p) => ({
            ...p,
            content: e.target.value
          })), placeholder: "Detailed news content, route updates, logistics, emergency contacts, or official advisories...", className: "w-full rounded-xl border border-border bg-background p-3 text-sm font-mono outline-none focus:border-[#FF7A00] transition-colors resize-y" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Featured Image (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.image_url, onChange: (e) => setFormData((p) => ({
              ...p,
              image_url: e.target.value
            })), placeholder: "Enter image URL (https://...) or upload below", className: "flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:border-[#FF7A00] transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileUpload, accept: "image/jpeg,image/png,image/webp,image/avif,image/gif", className: "hidden" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: uploadingImage, onClick: () => fileInputRef.current?.click(), className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50", children: uploadingImage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-[#FF7A00]" }),
              " Uploading…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-[#FF7A00]" }),
              " Upload Image"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NewsImagePreviewBox, { imageUrl: formData.image_url, onRemove: () => setFormData((p) => ({
            ...p,
            image_url: ""
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl border border-border bg-muted/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: formData.status, onChange: (e) => setFormData((p) => ({
              ...p,
              status: e.target.value
            })), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium outline-none focus:border-[#FF7A00]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "draft", children: "Draft" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "published", children: "Published" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Breaking News" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFormData((p) => ({
              ...p,
              is_breaking: !p.is_breaking
            })), className: `w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${formData.is_breaking ? "border-[#FF7A00]/40 bg-[#FF7A00]/10 text-[#FF7A00]" : "border-border bg-background text-muted-foreground"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" }),
                " ",
                formData.is_breaking ? "Yes (Breaking)" : "No"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${formData.is_breaking ? "bg-[#FF7A00]" : "bg-muted-foreground"}` })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFormData((p) => ({
              ...p,
              is_active: !p.is_active
            })), className: `w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${formData.is_active ? "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400" : "border-border bg-background text-muted-foreground"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formData.is_active ? "Yes (Active)" : "No (Inactive)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${formData.is_active ? "bg-blue-500" : "bg-muted-foreground"}` })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Display Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: formData.display_order, onChange: (e) => setFormData((p) => ({
              ...p,
              display_order: Number(e.target.value) || 0
            })), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-mono outline-none focus:border-[#FF7A00]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Publication Date & Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "datetime-local", value: formData.published_at, onChange: (e) => setFormData((p) => ({
              ...p,
              published_at: e.target.value
            })), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[#FF7A00]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "Set a future date to schedule publication automatically." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Expiry Date & Time (Optional)" }),
              formData.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFormData((p) => ({
                ...p,
                expires_at: ""
              })), className: "text-[11px] text-red-500 hover:underline", children: "Clear Expiry" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "datetime-local", value: formData.expires_at, onChange: (e) => setFormData((p) => ({
              ...p,
              expires_at: e.target.value
            })), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[#FF7A00]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "News will automatically hide from the homepage after this date." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: upsertMutation.isPending, onClick: () => setIsFormOpen(false), className: "rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: upsertMutation.isPending, className: "inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#FF7A00]/90 transition-all disabled:opacity-50", children: upsertMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Saving…"
          ] }) : editingItem ? "Save Changes" : "Create News Item" })
        ] })
      ] }) : (
        /* Live Preview Tab */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/10 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Homepage Continuous Running Ticker Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticker-container relative flex h-10 sm:h-11 w-full items-center overflow-hidden rounded-xl border border-red-500/30 bg-black/80 backdrop-blur-xl shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex shrink-0 items-center gap-2 bg-gradient-to-r from-red-600 via-red-600 to-red-700 px-3 sm:px-4 py-1.5 text-[11px] font-black tracking-wider text-white uppercase shadow-md rounded-l-[11px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 fill-white" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BREAKING NEWS" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-[140px] inset-y-0 w-8 bg-gradient-to-r from-black/80 to-transparent z-10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 overflow-hidden h-full flex items-center select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-ticker flex items-center shrink-0", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs sm:text-sm font-medium text-neutral-100 tracking-normal", children: formData.title || "Headline preview appears here..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-sans text-neutral-400 ml-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-neutral-500" }),
                  formData.published_at ? new Date(formData.published_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  }) : "Just now"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mx-5 inline-flex items-center gap-1 text-red-500/80 font-bold select-none opacity-80", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-red-400/90 font-mono", children: "//" })
                ] })
              ] }, i)) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-6 shadow-sm space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-[#FF7A00]/10 px-2.5 py-0.5 font-bold text-[#FF7A00]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3" }),
                " OFFICIAL DISPATCH"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formData.published_at ? new Date(formData.published_at).toLocaleDateString() : "Today" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold leading-tight", children: formData.title || "Untitled Headline" }),
            formData.summary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground leading-relaxed italic border-l-2 border-[#FF7A00] pl-3", children: formData.summary }),
            formData.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border max-h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(formData.image_url), alt: "", className: "w-full h-full object-cover" }) }),
            formData.content && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm text-foreground/90", children: formData.content })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditorTab("edit"), className: "rounded-full bg-foreground px-6 py-2 text-sm font-semibold text-background hover:opacity-90 transition-opacity", children: "Back to Editor" }) })
        ] })
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!previewTarget, onOpenChange: (open) => !open && setPreviewTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8", children: previewTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-[#FF7A00]/15 px-2.5 py-0.5 font-bold text-[#FF7A00]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 fill-[#FF7A00]/30" }),
          " DISPATCH"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(previewTarget.published_at).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(previewTarget.published_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold leading-tight", children: previewTarget.title }),
      previewTarget.summary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed italic border-l-2 border-[#FF7A00] pl-3", children: previewTarget.summary }),
      previewTarget.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border max-h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(previewTarget.image_url), alt: previewTarget.title, className: "w-full h-full object-cover" }) }),
      previewTarget.content && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm text-foreground/90 pt-2", children: previewTarget.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-6 border-t border-border text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Status: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground uppercase", children: previewTarget.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "URL: ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              "/news/",
              previewTarget.slug
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/news/$slug", params: {
            slug: previewTarget.slug
          }, target: "_blank", className: "inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors", children: [
            "Open Public Page ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            const item = previewTarget;
            setPreviewTarget(null);
            handleOpenEdit(item);
          }, className: "inline-flex items-center gap-1 rounded-lg bg-[#FF7A00] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#FF7A00]/90 transition-colors", children: "Edit Item" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteTarget, onOpenChange: (open) => !open && !deleteMutation.isPending && setDeleteTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete news dispatch?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to permanently delete",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            '"',
            deleteTarget?.title,
            '"'
          ] }),
          "? This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleteMutation.isPending, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center gap-2", disabled: deleteMutation.isPending, onClick: (e) => {
          e.preventDefault();
          if (deleteTarget && !deleteMutation.isPending) {
            deleteMutation.mutate(deleteTarget.id);
          }
        }, children: deleteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Deleting…"
        ] }) : "Delete News" })
      ] })
    ] }) })
  ] });
}
export {
  AdminNewsPage as component
};
