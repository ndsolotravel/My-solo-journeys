import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn } from "./router-DsXLCRa2.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as adminListGalleries, h as adminSavePostGallery, i as adminDeleteGalleryImage, b as adminUploadImage, r as resolveMediaUrl } from "./admin.functions-DwpNeojB.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BN-TPJM-.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { z as Image, a7 as ExternalLink, b as LoaderCircle, a4 as Upload, a8 as Layers, v as Sparkles, S as Search, a9 as FileImage, aa as GripVertical, ab as Maximize2, g as ChevronLeft, h as ChevronRight, a3 as Trash2, X } from "../_libs/lucide-react.mjs";
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
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
function AdminGalleryPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListGalleries);
  const saveGalleryFn = useServerFn(adminSavePostGallery);
  const delImageFn = useServerFn(adminDeleteGalleryImage);
  const uploadFn = useServerFn(adminUploadImage);
  const {
    data: posts,
    isLoading
  } = useQuery({
    queryKey: ["admin-galleries"],
    queryFn: async () => await listFn()
  });
  const [selectedPostId, setSelectedPostId] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [galleryUrlInput, setGalleryUrlInput] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [isDropzoneActive, setIsDropzoneActive] = reactExports.useState(false);
  const [draggedIdx, setDraggedIdx] = reactExports.useState(null);
  const [dragOverIdx, setDragOverIdx] = reactExports.useState(null);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const activePost = reactExports.useMemo(() => {
    if (!posts || selectedPostId === "all") return null;
    return posts.find((p) => p.id === selectedPostId) ?? null;
  }, [posts, selectedPostId]);
  const stats = reactExports.useMemo(() => {
    if (!posts) return {
      totalPhotos: 0,
      postsWithGallery: 0,
      totalPosts: 0
    };
    const totalPhotos = posts.reduce((sum, p) => sum + (p.galleryCount || 0), 0);
    const postsWithGallery = posts.filter((p) => (p.galleryCount || 0) > 0).length;
    return {
      totalPhotos,
      postsWithGallery,
      totalPosts: posts.length
    };
  }, [posts]);
  const displayedItems = reactExports.useMemo(() => {
    if (!posts) return [];
    let items = [];
    if (activePost) {
      items = activePost.gallery.map((g, idx) => ({
        ...g,
        sort_order: g.sort_order ?? idx,
        post_id: activePost.id,
        post_title: activePost.title,
        post_slug: activePost.slug
      }));
    } else {
      posts.forEach((p) => {
        (p.gallery || []).forEach((g, idx) => {
          items.push({
            ...g,
            sort_order: g.sort_order ?? idx,
            post_id: p.id,
            post_title: p.title,
            post_slug: p.slug
          });
        });
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter((item) => item.alt_text?.toLowerCase().includes(q) || item.post_title?.toLowerCase().includes(q) || item.post_slug?.toLowerCase().includes(q));
    }
    return items;
  }, [posts, activePost, search]);
  async function handleUploadFiles(files) {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;
    let targetPostId = selectedPostId;
    if (targetPostId === "all") {
      if (!posts || posts.length === 0) {
        toast.error("Please create a blog post first before uploading gallery pictures.");
        return;
      }
      targetPostId = posts[0].id;
      setSelectedPostId(targetPostId);
    }
    const currentPost = posts?.find((p) => p.id === targetPostId);
    if (!currentPost) {
      toast.error("Target post not found.");
      return;
    }
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
    try {
      const newItems = [...currentPost.gallery];
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
        newItems.push({
          image_url: url,
          alt_text: "",
          sort_order: newItems.length,
          post_id: targetPostId
        });
        successCount++;
      }
      await saveGalleryFn({
        data: {
          postId: targetPostId,
          gallery: newItems.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx
          }))
        }
      });
      qc.invalidateQueries({
        queryKey: ["admin-galleries"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-posts"]
      });
      toast.success(`Successfully added ${successCount} photo${successCount > 1 ? "s" : ""} to "${currentPost.title}"`);
    } catch (e) {
      toast.error(`Upload failed: ${e.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }
  async function handleAddUrl() {
    if (!galleryUrlInput.trim()) return;
    let targetPostId = selectedPostId;
    if (targetPostId === "all") {
      if (!posts || posts.length === 0) {
        toast.error("Please create a blog post first.");
        return;
      }
      targetPostId = posts[0].id;
      setSelectedPostId(targetPostId);
    }
    const currentPost = posts?.find((p) => p.id === targetPostId);
    if (!currentPost) return;
    const newItems = [...currentPost.gallery, {
      image_url: galleryUrlInput.trim(),
      alt_text: "",
      sort_order: currentPost.gallery.length,
      post_id: targetPostId
    }];
    try {
      await saveGalleryFn({
        data: {
          postId: targetPostId,
          gallery: newItems.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx
          }))
        }
      });
      qc.invalidateQueries({
        queryKey: ["admin-galleries"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-posts"]
      });
      setGalleryUrlInput("");
      toast.success("Photo added to gallery");
    } catch (e) {
      toast.error(e.message);
    }
  }
  function handleDragStart(e, index) {
    if (selectedPostId === "all") return;
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${index}`);
  }
  function handleDragOver(e, index) {
    if (selectedPostId === "all") return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== index) setDragOverIdx(index);
  }
  async function handleDrop(e, targetIndex) {
    if (selectedPostId === "all" || !activePost) return;
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIndex) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }
    const next = [...activePost.gallery];
    const [moved] = next.splice(draggedIdx, 1);
    next.splice(targetIndex, 0, moved);
    const reordered = next.map((item, idx) => ({
      ...item,
      sort_order: idx
    }));
    qc.setQueryData(["admin-galleries"], (old) => old ? old.map((p) => p.id === activePost.id ? {
      ...p,
      gallery: reordered
    } : p) : []);
    setDraggedIdx(null);
    setDragOverIdx(null);
    try {
      await saveGalleryFn({
        data: {
          postId: activePost.id,
          gallery: reordered.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx
          }))
        }
      });
      qc.invalidateQueries({
        queryKey: ["admin-galleries"]
      });
      toast.success("Gallery sequence saved");
    } catch (e2) {
      toast.error(e2.message);
      qc.invalidateQueries({
        queryKey: ["admin-galleries"]
      });
    }
  }
  async function moveItem(index, direction) {
    if (!activePost) return;
    const next = [...activePost.gallery];
    const targetIndex = direction === "prev" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    const reordered = next.map((item, idx) => ({
      ...item,
      sort_order: idx
    }));
    qc.setQueryData(["admin-galleries"], (old) => old ? old.map((p) => p.id === activePost.id ? {
      ...p,
      gallery: reordered
    } : p) : []);
    try {
      await saveGalleryFn({
        data: {
          postId: activePost.id,
          gallery: reordered.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx
          }))
        }
      });
      qc.invalidateQueries({
        queryKey: ["admin-galleries"]
      });
      toast.success("Order updated");
    } catch (e) {
      toast.error(e.message);
      qc.invalidateQueries({
        queryKey: ["admin-galleries"]
      });
    }
  }
  async function updateAltText(postId, targetItem, newAlt) {
    const post = posts?.find((p) => p.id === postId);
    if (!post) return;
    const itemIdx = post.gallery.findIndex((g) => targetItem.id && g.id === targetItem.id || g.image_url === targetItem.image_url);
    if (itemIdx === -1) return;
    const next = [...post.gallery];
    next[itemIdx] = {
      ...next[itemIdx],
      alt_text: newAlt
    };
    try {
      await saveGalleryFn({
        data: {
          postId,
          gallery: next.map((g, idx) => ({
            id: g.id,
            image_url: g.image_url,
            alt_text: g.alt_text || null,
            sort_order: idx
          }))
        }
      });
      qc.invalidateQueries({
        queryKey: ["admin-galleries"]
      });
      toast.success("Caption saved");
    } catch (e) {
      toast.error(e.message);
    }
  }
  async function confirmRemove() {
    if (!deleteTarget) return;
    const {
      item,
      postId
    } = deleteTarget;
    const effectivePostId = postId !== "all" ? postId : item.post_id;
    try {
      await delImageFn({
        data: {
          postId: effectivePostId,
          galleryId: item.id,
          imageUrl: item.image_url
        }
      });
      qc.invalidateQueries({
        queryKey: ["admin-galleries"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-posts"]
      });
      toast.success("Picture removed from gallery");
      if (lightboxIndex !== null) setLightboxIndex(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleteTarget(null);
    }
  }
  const activeLightboxItem = lightboxIndex !== null && displayedItems[lightboxIndex] ? displayedItems[lightboxIndex] : null;
  reactExports.useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && displayedItems.length > 1) {
        setLightboxIndex((curr) => curr !== null ? (curr - 1 + displayedItems.length) % displayedItems.length : null);
      } else if (e.key === "ArrowRight" && displayedItems.length > 1) {
        setLightboxIndex((curr) => curr !== null ? (curr + 1) % displayedItems.length : null);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, displayedItems.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-accent/15 p-2 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Gallery Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Add, inspect, reorder, and remove photo galleries across your solo travel stories." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        activePost && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/posts/$id", params: {
          id: activePost.id
        }, className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium hover:bg-muted transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
          " Edit Full Story"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => fileInputRef.current?.click(), disabled: uploading, className: "inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs", children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
          " Uploading…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
          " Upload Pictures"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp,image/avif", className: "hidden", onChange: (e) => e.target.files && handleUploadFiles(e.target.files) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total Gallery Photos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-bold", children: isLoading ? "—" : stats.totalPhotos.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Photos active across all stories" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Stories with Galleries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-bold", children: isLoading ? "—" : stats.postsWithGallery.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          "Out of ",
          stats.totalPosts,
          " total stories"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Avg Photos / Gallery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-bold", children: isLoading || stats.postsWithGallery === 0 ? "0" : (stats.totalPhotos / stats.postsWithGallery).toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Visual depth per story" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 sm:max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap", children: "Filter Story:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedPostId, onChange: (e) => setSelectedPostId(e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "all", children: [
            "-- All Stories (",
            stats.totalPhotos,
            " photos) --"
          ] }),
          (posts ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
            p.title,
            " (",
            p.galleryCount,
            " ",
            p.galleryCount === 1 ? "photo" : "photos",
            ")"
          ] }, p.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 sm:max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search photos & captions…", className: "w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs outline-none focus:border-accent" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-accent" }),
            " Upload to ",
            activePost ? `"${activePost.title}"` : "Gallery"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: activePost ? `Upload new pictures directly into this story's photo gallery.` : `Select a story above or drop files here to upload to the latest story.` })
        ] }),
        activePost && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent", children: [
          activePost.galleryCount,
          " ",
          activePost.galleryCount === 1 ? "picture" : "pictures",
          " in story"
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
          "Uploading picture ",
          uploadProgress?.current ?? 1,
          " of ",
          uploadProgress?.total ?? 1,
          "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Processing and saving into Supabase Storage…" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted/60 p-3 text-foreground group-hover:bg-accent/15 group-hover:text-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
            "Drag & drop multiple pictures here, or ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent underline underline-offset-2", children: "browse computer" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Supports JPG, PNG, WebP, AVIF up to 8 MB each · Select multiple files at once" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: galleryUrlInput, onChange: (e) => setGalleryUrlInput(e.target.value), placeholder: "…or paste direct image web URL (https://…)", className: "flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleAddUrl, className: "rounded-xl border border-border px-3.5 py-2 text-xs font-medium hover:bg-muted whitespace-nowrap transition-colors", children: "Add URL" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedPostId !== "all" ? "Hold and drag cards to reorder story sequence" : "Showing all gallery photos across stories (Select a story above to reorder)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          displayedItems.length,
          " ",
          displayedItems.length === 1 ? "picture" : "pictures"
        ] })
      ] }),
      displayedItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5", children: displayedItems.map((item, idx) => {
        const isDragging = draggedIdx === idx;
        const isDragOver = dragOverIdx === idx && draggedIdx !== idx;
        const isReorderable = selectedPostId !== "all";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { draggable: isReorderable && !uploading, onDragStart: (e) => isReorderable && handleDragStart(e, idx), onDragOver: (e) => isReorderable && handleDragOver(e, idx), onDrop: (e) => isReorderable && handleDrop(e, idx), onDragEnd: () => {
          setDraggedIdx(null);
          setDragOverIdx(null);
        }, className: `group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card transition-all select-none shadow-xs ${isDragging ? "opacity-40 scale-95 border-dashed border-accent" : ""} ${isDragOver ? "border-accent ring-2 ring-accent/30 scale-[1.02]" : "border-border hover:border-accent/60 hover:shadow-md"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-4/3 w-full bg-muted/40 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(item.image_url), alt: item.alt_text || `Gallery photo ${idx + 1}`, className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2 top-2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs", children: [
              "#",
              idx + 1
            ] }) }),
            isReorderable && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md bg-black/75 p-1 text-white shadow-xs backdrop-blur-xs cursor-grab active:cursor-grabbing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-3.5 w-3.5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Inspect / Preview", onClick: () => setLightboxIndex(idx), className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }) }),
              isReorderable && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Move left", disabled: idx === 0, onClick: () => moveItem(idx, "prev"), className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Move right", disabled: idx === displayedItems.length - 1, onClick: () => moveItem(idx, "next"), className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white disabled:opacity-40 disabled:hover:scale-100 transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Remove picture", onClick: () => setDeleteTarget({
                item,
                postId: item.post_id || selectedPostId
              }), className: "flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-transform hover:scale-110 shadow-md cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-card border-t border-border space-y-1", children: [
            selectedPostId === "all" && item.post_title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-accent truncate", title: item.post_title, children: item.post_title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: item.alt_text, placeholder: "Caption / Alt text…", onBlur: (e) => {
                if (item.post_id && e.target.value !== item.alt_text) {
                  updateAltText(item.post_id, item, e.target.value);
                }
              }, onKeyDown: (e) => {
                if (e.key === "Enter" && item.post_id) {
                  e.currentTarget.blur();
                }
              }, className: "flex-1 min-w-0 text-[11px] rounded-lg border border-border/80 bg-background px-2 py-1 outline-none focus:border-accent transition-colors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Delete photo", onClick: () => setDeleteTarget({
                item,
                postId: item.post_id || selectedPostId
              }), className: "p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] })
        ] }, item.id || item.image_url + idx);
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border py-12 text-center text-xs text-muted-foreground bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "mx-auto h-10 w-10 opacity-30 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: "No gallery pictures found." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Upload photos using the dropzone above to build your story's photo gallery." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteTarget, onOpenChange: (open) => !open && setDeleteTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove picture from gallery?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to remove this picture from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: deleteTarget?.item.post_title || "this story" }),
          "? The image file will be removed from the gallery and cleaned up from Supabase Storage."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: confirmRemove, children: "Remove Picture" })
      ] })
    ] }) }),
    activeLightboxItem && lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-all duration-300", onClick: () => setLightboxIndex(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-4 top-4 sm:left-6 sm:top-6 z-50 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-black/75 px-3.5 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg", children: [
          "Photo ",
          lightboxIndex + 1,
          " of ",
          displayedItems.length
        ] }),
        activeLightboxItem.post_title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-block rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 border border-white/10 backdrop-blur-md", children: activeLightboxItem.post_title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: (e) => {
          e.stopPropagation();
          setDeleteTarget({
            item: activeLightboxItem,
            postId: activeLightboxItem.post_id || selectedPostId
          });
        }, className: "flex h-10 px-3 items-center gap-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-medium border border-red-500/40 backdrop-blur-md transition-all shadow-lg cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " Remove"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Close", onClick: (e) => {
          e.stopPropagation();
          setLightboxIndex(null);
        }, className: "flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md hover:bg-black transition-all hover:scale-105 cursor-pointer shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex max-h-[80vh] max-w-[90vw] items-center justify-center", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeLightboxItem.image_url, alt: activeLightboxItem.alt_text || `Gallery photo ${lightboxIndex + 1}`, className: "max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" }),
        displayedItems.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Previous photo", onClick: (e) => {
          e.stopPropagation();
          setLightboxIndex((curr) => curr !== null ? (curr - 1 + displayedItems.length) % displayedItems.length : null);
        }, className: "absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" }) }),
        displayedItems.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Next photo", onClick: (e) => {
          e.stopPropagation();
          setLightboxIndex((curr) => curr !== null ? (curr + 1) % displayedItems.length : null);
        }, className: "absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/30 shadow-xl transition-transform hover:scale-110 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 sm:bottom-6 inset-x-4 max-w-xl mx-auto z-50", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-black/80 p-3 border border-white/20 backdrop-blur-md shadow-xl flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: activeLightboxItem.alt_text, placeholder: "Add caption / alt text for this photo…", onBlur: (e) => {
        if (activeLightboxItem.post_id && e.target.value !== activeLightboxItem.alt_text) {
          updateAltText(activeLightboxItem.post_id, activeLightboxItem, e.target.value);
        }
      }, onKeyDown: (e) => {
        if (e.key === "Enter" && activeLightboxItem.post_id) {
          e.currentTarget.blur();
        }
      }, className: "flex-1 rounded-xl bg-white/10 border border-white/20 px-3.5 py-1.5 text-xs text-white placeholder:text-white/50 outline-none focus:border-white/60" }) }) })
    ] })
  ] });
}
export {
  AdminGalleryPage as component
};
