import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { f as useServerFn, V as adminListPhotoArchiveEditor, W as adminSavePhotoArchive } from "./router-DTYunwUp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as adminUploadImage } from "./admin.functions-OVCuV9an.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DsuHXNs6.mjs";
import { H as HeroBannerManager } from "./HeroBannerManager-CKJu-xSa.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a8 as Image, ar as RotateCcw, h as LoaderCircle, as as Save, q as CircleCheck, at as Upload, D as Layers, b as Sparkles, az as TriangleAlert, S as Search, aO as FileImage, ax as Plus, aP as EyeOff, aI as Maximize2, ay as Pencil, Z as ChevronLeft, n as ChevronRight, aq as Trash2, m as MapPin, X, a1 as ExternalLink, O as Calendar, N as Camera } from "../_libs/lucide-react.mjs";
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
import "./categories.functions-D00H7s-R.mjs";
import "../_libs/zod.mjs";
import "./media-DUkNwMwq.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
function toDraft(p) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    image_url: p.image_url,
    location: p.location ?? "",
    captured_at: p.captured_at,
    story: p.story ?? "",
    camera: p.camera ?? "",
    alt_text: p.alt_text,
    category_ids: p.category_ids,
    sort_order: p.sort_order,
    published: p.published
  };
}
function AdminGalleryPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListPhotoArchiveEditor);
  const saveFn = useServerFn(adminSavePhotoArchive);
  const uploadFn = useServerFn(adminUploadImage);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-photo-archive"],
    queryFn: async () => await listFn()
  });
  const [drafts, setDrafts] = reactExports.useState(null);
  const [resetSnapshot, setResetSnapshot] = reactExports.useState(null);
  const [deletedIds, setDeletedIds] = reactExports.useState([]);
  const [filterCat, setFilterCat] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [urlInput, setUrlInput] = reactExports.useState("");
  const [editing, setEditing] = reactExports.useState(null);
  const [deleteTargetId, setDeleteTargetId] = reactExports.useState(null);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const [validationErrorIds, setValidationErrorIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [isDropzoneActive, setIsDropzoneActive] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const newIdRef = reactExports.useRef(0);
  const categories = data?.categories ?? [];
  const catBySlug = reactExports.useMemo(() => new Map(categories.map((c) => [c.slug, c])), [categories]);
  const catById = reactExports.useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
  const initializeFromServer = (photos) => {
    const next = photos.map(toDraft);
    setDrafts(next);
    setResetSnapshot(JSON.stringify({
      photos: next,
      deletedIds: []
    }));
    setDeletedIds([]);
    setValidationErrorIds(/* @__PURE__ */ new Set());
  };
  reactExports.useEffect(() => {
    if (data && drafts === null) initializeFromServer(data.photos);
  }, [data]);
  const isDirty = reactExports.useMemo(() => {
    if (!drafts || resetSnapshot === null) return false;
    return JSON.stringify({
      photos: drafts,
      deletedIds
    }) !== resetSnapshot;
  }, [drafts, deletedIds, resetSnapshot]);
  const pendingNewCount = drafts?.filter((d) => d.id.startsWith("new-")).length ?? 0;
  const draftCount = drafts?.filter((d) => !d.published).length ?? 0;
  const displayed = reactExports.useMemo(() => {
    if (!drafts) return [];
    let list = drafts;
    if (filterCat !== "all") {
      const wantId = catBySlug.get(filterCat)?.id;
      if (wantId) list = list.filter((d) => d.category_ids.includes(wantId));
    }
    if (statusFilter === "published") list = list.filter((d) => d.published);
    if (statusFilter === "draft") list = list.filter((d) => !d.published);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((d) => [d.title, d.location, d.story, d.alt_text, d.captured_at].filter(Boolean).some((v) => v.toLowerCase().includes(q)));
    }
    return [...list].sort((a, b) => a.sort_order - b.sort_order);
  }, [drafts, filterCat, statusFilter, search, catBySlug]);
  const addDraft = (image_url, publish = true) => ({
    id: `new-${++newIdRef.current}`,
    title: "",
    image_url,
    location: "",
    captured_at: null,
    story: "",
    camera: "",
    alt_text: "",
    category_ids: [],
    sort_order: drafts?.length ?? 0,
    published: publish
  });
  function openEditor(d) {
    setEditing({
      ...d
    });
  }
  function closeEditor() {
    setEditing(null);
  }
  function applyEdit() {
    if (!editing) return;
    setDrafts((prev) => prev?.map((p) => p.id === editing.id ? {
      ...editing
    } : p) ?? [editing]);
    closeEditor();
  }
  function updateEdit(patch) {
    setEditing((prev) => prev ? {
      ...prev,
      ...patch
    } : prev);
  }
  function toggleCategory(categoryId) {
    setEditing((prev) => {
      if (!prev) return prev;
      const has = prev.category_ids.includes(categoryId);
      return {
        ...prev,
        category_ids: has ? prev.category_ids.filter((id) => id !== categoryId) : [...prev.category_ids, categoryId]
      };
    });
  }
  function movePhoto(id, dir) {
    setDrafts((prev) => {
      if (!prev) return prev;
      const idx = prev.findIndex((d) => d.id === id);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next.map((d, i) => ({
        ...d,
        sort_order: i
      }));
    });
  }
  async function handleUploadFiles(files) {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
    const maxBytes = 8 * 1024 * 1024;
    const validFiles = [];
    for (const f of fileArray) {
      const type = f.type.toLowerCase();
      if (!allowedTypes.includes(type) && !type.startsWith("image/")) {
        toast.error(`"${f.name}" is not a supported format (JPG, PNG, WebP, AVIF).`);
        continue;
      }
      if (f.size > maxBytes) {
        toast.error(`"${f.name}" exceeds the 8 MB size limit.`);
        continue;
      }
      validFiles.push(f);
    }
    if (validFiles.length === 0) return;
    setUploading(true);
    let successCount = 0;
    let firstNew = null;
    try {
      const newRecs = [];
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadProgress({
          current: i + 1,
          total: validFiles.length
        });
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
        const rec = addDraft(url);
        newRecs.push(rec);
        if (!firstNew) firstNew = rec;
        successCount++;
      }
      setDrafts((prev) => [...prev ?? [], ...newRecs]);
      toast.success(`Uploaded ${successCount} photograph${successCount > 1 ? "s" : ""} — add a title and alt text before saving.`);
      if (firstNew) openEditor(firstNew);
    } catch (e) {
      toast.error(`Upload failed: ${e.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }
  function handleAddUrl() {
    if (!urlInput.trim()) return;
    const rec = addDraft(urlInput.trim());
    setDrafts((prev) => [...prev ?? [], rec]);
    setUrlInput("");
    openEditor(rec);
  }
  function confirmDelete() {
    if (!deleteTargetId) return;
    const target = drafts?.find((d) => d.id === deleteTargetId);
    if (!target) {
      setDeleteTargetId(null);
      return;
    }
    setDrafts((prev) => prev?.filter((p) => p.id !== deleteTargetId) ?? []);
    if (!target.id.startsWith("new-")) {
      setDeletedIds((prev) => prev.includes(target.id) ? prev : [...prev, target.id]);
    }
    if (lightboxIndex !== null) setLightboxIndex(null);
    setValidationErrorIds((prev) => {
      const next = new Set(prev);
      next.delete(deleteTargetId);
      return next;
    });
    setDeleteTargetId(null);
    toast.info("Photograph staged for removal — save to apply.");
  }
  function handleReset() {
    if (resetSnapshot === null) return;
    const parsed = JSON.parse(resetSnapshot);
    setDrafts(parsed.photos.map((p) => ({
      ...p
    })));
    setDeletedIds([]);
    setValidationErrorIds(/* @__PURE__ */ new Set());
    setEditing(null);
    toast.info("Unsaved changes discarded.");
  }
  function validateDrafts() {
    if (!drafts) return false;
    const errors = /* @__PURE__ */ new Set();
    for (const d of drafts) {
      if (!d.title.trim() || !d.alt_text.trim()) errors.add(d.id);
    }
    setValidationErrorIds(errors);
    if (errors.size > 0) {
      toast.error(`${errors.size} photograph${errors.size > 1 ? "s" : ""} still need a title & alt text.`);
      return false;
    }
    return true;
  }
  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        photos: (drafts ?? []).map((d) => ({
          id: d.id.startsWith("new-") ? void 0 : d.id,
          title: d.title,
          image_url: d.image_url,
          location: d.location || null,
          captured_at: d.captured_at,
          story: d.story || null,
          camera: d.camera || null,
          alt_text: d.alt_text,
          category_ids: d.category_ids,
          sort_order: d.sort_order,
          published: d.published
        })),
        deletedIds
      };
      const res = await saveFn({
        data: payload
      });
      return res;
    },
    onSuccess: async () => {
      toast.success("Photography archive saved.");
      const fresh = await listFn();
      initializeFromServer(fresh.photos);
      qc.invalidateQueries({
        queryKey: ["admin-photo-archive"]
      });
      qc.invalidateQueries({
        queryKey: ["photo-archive"]
      });
      qc.invalidateQueries({
        queryKey: ["gallery"]
      });
      qc.invalidateQueries({
        queryKey: ["page-hero"]
      });
    },
    onError: (e) => toast.error(`Save failed: ${e.message}`)
  });
  function handleSave() {
    if (!validateDrafts()) return;
    saveMutation.mutate();
  }
  const incompleteIds = reactExports.useMemo(() => {
    const set = new Set(validationErrorIds);
    for (const d of drafts ?? []) {
      if (!d.title.trim() || !d.alt_text.trim()) set.add(d.id);
    }
    return set;
  }, [drafts, validationErrorIds]);
  const activeLightboxItem = lightboxIndex !== null ? displayed[lightboxIndex] : null;
  reactExports.useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && displayed.length > 1) {
        setLightboxIndex((curr) => curr !== null ? (curr - 1 + displayed.length) % displayed.length : null);
      } else if (e.key === "ArrowRight" && displayed.length > 1) {
        setLightboxIndex((curr) => curr !== null ? (curr + 1) % displayed.length : null);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, displayed.length]);
  const editingPreviewInvalid = editing ? !editing.title.trim() || !editing.alt_text.trim() : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-16 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-2xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Photography Archive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Curate the public gallery — titles, locations, camera details, stories, and categories." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleReset, disabled: saveMutation.isPending, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs cursor-pointer disabled:opacity-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reset" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSave, disabled: saveMutation.isPending, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer", children: saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving…" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Changes" })
          ] }) })
        ] }),
        !isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 text-xs font-semibold text-emerald-600 shadow-2xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Up to date" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => fileInputRef.current?.click(), disabled: uploading, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer", children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upload Photographs" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp,image/avif", className: "hidden", onChange: (e) => e.target.files && handleUploadFiles(e.target.files) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBannerManager, { page: "gallery", autoHint: "Automatically uses a curated photograph from the archive.", manualHint: "Pick an archive photograph below, upload one, or paste a URL.", optionsLabel: "Archive Photographs" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total Photographs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-bold", children: isLoading ? "—" : (drafts?.length ?? 0).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Curated frames in the archive" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-bold", children: categories.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Mountains, motorcycles, roads & more" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Pending Work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-bold", children: pendingNewCount + draftCount + deletedIds.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "New, hidden, or staged-for-removal photographs" })
      ] })
    ] }),
    isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3.5 shadow-xs animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-amber-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium", children: [
          pendingNewCount > 0 && `${pendingNewCount} new · `,
          draftCount > 0 && `${draftCount} hidden · `,
          deletedIds.length > 0 && `${deletedIds.length} staged deletion${deletedIds.length > 1 ? "s" : ""}`.replace(/^· $/, ""),
          " ",
          "— not yet on the public site."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleSave, disabled: saveMutation.isPending, className: "inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
        " Publish Now"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFilterCat("all"), className: `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${filterCat === "all" ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:border-accent hover:text-accent"}`, children: [
          "All",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: (drafts?.length ?? 0).toLocaleString() })
        ] }),
        categories.map((cat) => {
          const count = drafts?.filter((d) => d.category_ids.includes(cat.id)).length ?? cat.photo_count;
          const active = filterCat === cat.slug;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFilterCat(active ? "all" : cat.slug), className: `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${active ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:border-accent hover:text-accent"}`, children: [
            cat.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: active ? "text-background/60" : "text-muted-foreground", children: count })
          ] }, cat.id);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-2xs", children: ["all", "published", "draft"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStatusFilter(mode), className: `rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${statusFilter === mode ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: mode === "all" ? "All" : mode === "published" ? "Public" : "Hidden" }, mode)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 sm:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search titles, locations, stories…", className: "w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-semibold flex items-center gap-2 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add photographs to the archive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Uploads are staged as drafts — every photograph needs a title and alt text before it can be published." })
        ] }),
        isDirty && pendingNewCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent border border-accent/20", children: [
          pendingNewCount,
          " new draft",
          pendingNewCount > 1 ? "s" : "",
          " waiting"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onDragOver: (e) => {
        e.preventDefault();
        setIsDropzoneActive(true);
      }, onDragLeave: () => setIsDropzoneActive(false), onDrop: (e) => {
        e.preventDefault();
        setIsDropzoneActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleUploadFiles(e.dataTransfer.files);
        }
      }, onClick: () => fileInputRef.current?.click(), className: `group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${isDropzoneActive ? "border-accent bg-accent/10 text-accent scale-[1.01]" : "border-border bg-background hover:border-accent hover:bg-accent/5 text-muted-foreground hover:text-foreground"}`, children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-7 w-7 animate-spin text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
          "Uploading photograph ",
          uploadProgress?.current ?? 1,
          " of ",
          uploadProgress?.total ?? 1,
          "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Processing into Supabase Storage…" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted/60 p-3 text-foreground group-hover:bg-accent/15 group-hover:text-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
            "Drag & drop photographs here, or ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent underline underline-offset-2", children: "browse computer" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Supports JPG, PNG, WebP, AVIF up to 8 MB each · Select multiple files at once" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: urlInput, onChange: (e) => setUrlInput(e.target.value), placeholder: "…or paste direct image web URL (https://…)", className: "flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleAddUrl, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs cursor-pointer whitespace-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 text-accent" }),
          " Add URL"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        displayed.length,
        " ",
        displayed.length === 1 ? "photograph" : "photographs",
        isDirty && deletedIds.length > 0 && ` · ${deletedIds.length} staged for removal`
      ] }) }),
      displayed.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5", children: displayed.map((item, idx) => {
        const incomplete = incompleteIds.has(item.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card transition-all select-none shadow-xs ${incomplete ? "border-amber-400 ring-2 ring-amber-400/30" : "border-border hover:border-accent/60 hover:shadow-md"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-4/3 w-full bg-muted/40 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image_url, alt: item.alt_text || item.title || `Photograph ${idx + 1}`, className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2 top-2 z-10 flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs", children: [
              "#",
              item.sort_order + 1
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-2 top-2 z-10 flex items-center gap-1", children: [
              !item.published && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-zinc-800/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-200 shadow-xs backdrop-blur-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3 w-3" }),
                " Hidden"
              ] }),
              item.id.startsWith("new-") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-accent/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs", children: "NEW" })
            ] }),
            incomplete && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-amber-500/95 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs", children: "Needs title & alt text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Inspect / Preview", onClick: () => setLightboxIndex(idx), className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Edit metadata", onClick: () => openEditor(item), className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Move earlier", disabled: idx === 0, onClick: () => movePhoto(item.id, -1), className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Move later", disabled: idx === displayed.length - 1, onClick: () => movePhoto(item.id, 1), className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Remove from archive", onClick: () => setDeleteTargetId(item.id), className: "flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-card border-t border-border space-y-1.5", children: [
            item.category_ids.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              item.category_ids.slice(0, 2).map((cid) => {
                const cat = catById.get(cid);
                return cat && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent", children: cat.name }, cid);
              }),
              item.category_ids.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground", children: [
                "+",
                item.category_ids.length - 2
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-foreground truncate", title: item.title, children: item.title || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground", children: "Untitled" }) }),
            (item.location || item.captured_at || item.camera) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-[10px] text-muted-foreground truncate", children: [
              item.location && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2.5 w-2.5 shrink-0 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.location })
              ] }),
              item.captured_at && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-50", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.captured_at.slice(0, 4) })
              ] })
            ] })
          ] })
        ] }, item.id);
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border py-12 text-center text-xs text-muted-foreground bg-card shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-brand/10 text-brand mx-auto mb-3 w-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: "No photographs found." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Try a different filter or upload photographs using the area above." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: isDirty ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Unsaved changes",
          pendingNewCount > 0 && ` · ${pendingNewCount} new`,
          draftCount > 0 && ` · ${draftCount} hidden`,
          deletedIds.length > 0 && ` · ${deletedIds.length} to delete`
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All changes are live on the archive" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleReset, disabled: saveMutation.isPending, className: "rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer disabled:opacity-50", children: "Reset" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSave, disabled: saveMutation.isPending || !isDirty, className: `inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-semibold transition-all ${saveMutation.isPending || !isDirty ? "opacity-50 cursor-not-allowed bg-brand/70 text-white" : "bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand/90 cursor-pointer"}`, children: saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving…" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Changes" })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteTargetId, onOpenChange: (open) => !open && setDeleteTargetId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl border border-border bg-card shadow-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-lg font-bold text-foreground", children: "Remove photograph from the archive?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "text-xs text-muted-foreground mt-1", children: [
          "The photograph will be removed from the public gallery and its image file cleaned up from Supabase Storage. Deletions are staged until you press",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Save Changes" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-4 flex items-center justify-end gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-red-700 transition-all cursor-pointer", onClick: confirmDelete, children: "Remove Photograph" })
      ] })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto", onClick: closeEditor, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-4xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: editing.id.startsWith("new-") ? "New Photograph" : "Photograph Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Title and alt text are required before this can be published." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Close", onClick: closeEditor, className: "flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 p-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editing.image_url, alt: editing.title || "Photograph preview", className: "h-full w-full object-cover" }),
            editing.id.startsWith("new-") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 top-2 rounded-md bg-accent/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs", children: "NEW — not published yet" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-2 flex items-center gap-1.5 text-xs font-medium text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5 text-accent" }),
              " Categories (select all that apply)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((cat) => {
              const active = editing.category_ids.includes(cat.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleCategory(cat.id), className: `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${active ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-3 w-3 items-center justify-center rounded-full border text-[8px] ${active ? "border-accent bg-accent text-white" : "border-border"}`, children: active ? "✓" : "" }),
                cat.name
              ] }, cat.id);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.published, onChange: (e) => updateEdit({
              published: e.target.checked
            }), className: "h-4 w-4 rounded border-border text-accent focus:ring-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Published on the public gallery" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center justify-between text-xs font-medium text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                "Title ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              editing.title && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery/$slug", params: {
                slug: editing.slug ?? ""
              }, target: "_blank", className: "inline-flex items-center gap-1 text-[11px] text-accent hover:underline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
                " View live"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editing.title, onChange: (e) => updateEdit({
              title: e.target.value
            }), placeholder: "e.g. Morning light on Nanga Parbat", className: `w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors ${!editing.title.trim() ? "border-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400" : "border-border focus:border-accent focus:ring-1 focus:ring-accent"}` }),
            !editing.title.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-amber-600", children: "A title is required." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-xs font-medium text-foreground", children: [
              "Alt text ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editing.alt_text, onChange: (e) => updateEdit({
              alt_text: e.target.value
            }), placeholder: "Describe the photograph for screen readers and search engines", className: `w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors ${!editing.alt_text.trim() ? "border-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400" : "border-border focus:border-accent focus:ring-1 focus:ring-accent"}` }),
            !editing.alt_text.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-amber-600", children: "Alt text is required." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1 text-xs font-medium text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-accent" }),
                " Location"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editing.location, onChange: (e) => updateEdit({
                location: e.target.value
              }), placeholder: "e.g. Rakaposhi viewpoint, Karakoram", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1 text-xs font-medium text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 text-accent" }),
                " Date taken"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: editing.captured_at ?? "", onChange: (e) => updateEdit({
                captured_at: e.target.value || null
              }), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1 text-xs font-medium text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3 text-accent" }),
              " Camera & settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editing.camera, onChange: (e) => updateEdit({
              camera: e.target.value
            }), placeholder: "e.g. Sony A7III · 70-200mm f/4 · 1/500s", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-medium text-foreground", children: "The story behind this frame" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, value: editing.story, onChange: (e) => updateEdit({
              story: e.target.value
            }), placeholder: "The cold at sunrise, the long approach, why this frame matters…", className: "w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors leading-relaxed resize-y" })
          ] })
        ] })
      ] }),
      editingPreviewInvalid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-6 mb-4 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-amber-700", children: "This photograph is incomplete — save will be blocked until title and alt text are filled in." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-3.5 shrink-0 bg-card/95 backdrop-blur-md shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDeleteTargetId(editing.id), className: "inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-500/20 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " ",
          editing.id.startsWith("new-") ? "Discard" : "Delete"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: closeEditor, className: "rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: applyEdit, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Details" })
          ] })
        ] })
      ] })
    ] }) }),
    activeLightboxItem && lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-all duration-300", onClick: () => setLightboxIndex(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-4 top-4 sm:left-6 sm:top-6 z-50 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg", children: [
          "Photograph ",
          lightboxIndex + 1,
          " of ",
          displayed.length
        ] }),
        !activeLightboxItem.published && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-zinc-800/80 px-3 py-1 text-xs text-zinc-300 border border-white/10 backdrop-blur-md", children: "Hidden" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: (e) => {
          e.stopPropagation();
          openEditor(activeLightboxItem);
          setLightboxIndex(null);
        }, className: "flex h-10 px-3 items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-900 text-xs font-medium shadow-lg transition-all cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Close", onClick: (e) => {
          e.stopPropagation();
          setLightboxIndex(null);
        }, className: "flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md hover:bg-black transition-all hover:scale-105 cursor-pointer shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex max-h-[82vh] max-w-[min(1200px,92vw)] items-center justify-center", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeLightboxItem.image_url, alt: activeLightboxItem.alt_text || activeLightboxItem.title || "Archived photograph", className: "max-h-[62vh] max-w-full rounded-2xl object-contain shadow-2xl" }),
        displayed.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Previous photograph", onClick: (e) => {
            e.stopPropagation();
            setLightboxIndex((curr) => curr !== null ? (curr - 1 + displayed.length) % displayed.length : null);
          }, className: "absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Next photograph", onClick: (e) => {
            e.stopPropagation();
            setLightboxIndex((curr) => curr !== null ? (curr + 1) % displayed.length : null);
          }, className: "absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 sm:bottom-6 inset-x-4 max-w-lg mx-auto z-50", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-black/80 p-4 border border-white/20 backdrop-blur-md shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white", children: activeLightboxItem.title || "Untitled" }),
        (activeLightboxItem.location || activeLightboxItem.captured_at || activeLightboxItem.camera) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/70", children: [
          activeLightboxItem.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            " ",
            activeLightboxItem.location
          ] }),
          activeLightboxItem.captured_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
            " ",
            activeLightboxItem.captured_at
          ] }),
          activeLightboxItem.camera && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3" }),
            " ",
            activeLightboxItem.camera
          ] })
        ] }),
        activeLightboxItem.story && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 border-t border-white/10 pt-2 text-xs leading-relaxed text-white/60 line-clamp-3", children: activeLightboxItem.story })
      ] }) })
    ] })
  ] });
}
export {
  AdminGalleryPage as component
};
