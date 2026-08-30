import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as useServerFn } from "./router-CVJpNB8L.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as adminListPosts, t as adminTogglePublish, u as adminDeletePost } from "./admin.functions-DiyyO5cG.mjs";
import { b as batchGeocodePosts } from "./geocoding.functions-CuawdWKq.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DsuHXNs6.mjs";
import { r as resolveMediaUrl } from "./media-DUkNwMwq.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a2 as BookOpen, h as LoaderCircle, a7 as Navigation, av as Plus, S as Search, q as Clock, m as MapPin, i as CircleAlert, a6 as Image, aV as EyeOff, ah as Eye, ao as Trash2 } from "../_libs/lucide-react.mjs";
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
function AdminPostsList() {
  const listFn = useServerFn(adminListPosts);
  const toggleFn = useServerFn(adminTogglePublish);
  const delFn = useServerFn(adminDeletePost);
  const batchGeocodeFn = useServerFn(batchGeocodePosts);
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => await listFn()
  });
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [batchGeocoding, setBatchGeocoding] = reactExports.useState(false);
  const toggle = useMutation({
    mutationFn: (v) => toggleFn({
      data: v
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-posts"]
      });
      toast.success("Updated post status");
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: (_, deletedId) => {
      qc.setQueryData(["admin-posts"], (old) => old ? old.filter((p) => p.id !== deletedId) : []);
      qc.invalidateQueries({
        queryKey: ["admin-posts"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-analytics"]
      });
      qc.invalidateQueries({
        queryKey: ["posts"]
      });
      toast.success("Post deleted successfully");
      setDeleteTarget(null);
    },
    onError: (e) => {
      toast.error(e.message || "Unable to delete this blog post. Please try again.");
      setDeleteTarget(null);
    }
  });
  const batchGeocode = useMutation({
    mutationFn: () => batchGeocodeFn({
      data: {
        dryRun: false
      }
    }),
    onSuccess: (result) => {
      qc.invalidateQueries({
        queryKey: ["admin-posts"]
      });
      toast.success(`Batch geocoding complete: ${result.updated} updated, ${result.flagged} flagged for review`);
      setBatchGeocoding(false);
    },
    onError: (e) => {
      toast.error(e.message || "Batch geocoding failed");
      setBatchGeocoding(false);
    }
  });
  async function handleBatchGeocode() {
    setBatchGeocoding(true);
    batchGeocode.mutate();
  }
  const filteredPosts = reactExports.useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      if (statusFilter === "published" && !p.published) return false;
      if (statusFilter === "draft" && (p.published || p.scheduled_at)) return false;
      if (statusFilter === "scheduled" && (p.published || !p.scheduled_at)) return false;
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSlug = p.slug.toLowerCase().includes(q);
        const matchCategory = p.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchSlug && !matchCategory) return false;
      }
      return true;
    });
  }, [data, search, statusFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-2xl bg-[#FF7A00]/10 text-[#FF7A00]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground", children: "Stories Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-flex items-center rounded-full bg-[#FF7A00]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#FF7A00]", children: data ? `${data.length} Total` : "Posts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mt-0.5", children: "Draft, edit, geocode, and publish your solo journey chronicles" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-wrap shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleBatchGeocode, disabled: batchGeocoding, className: "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-2xs", children: batchGeocoding ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-[#FF7A00]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Geocoding..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4 text-[#FF7A00]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Auto-geocode All" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/posts/new", className: "inline-flex items-center gap-2 rounded-xl bg-[#FF7A00] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#FF7A00]/25 hover:bg-[#FF7A00]/90 transition-all cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New Story"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-2xs", children: ["all", "published", "draft", "scheduled"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStatusFilter(tab), className: `rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${statusFilter === tab ? "bg-[#FF7A00] text-white shadow-xs" : "text-muted-foreground hover:text-foreground"}`, children: tab }, tab)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 sm:max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search stories, category, slug…", className: "w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs sm:text-sm text-foreground focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] focus:outline-none transition-colors shadow-2xs" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Title & Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hidden sm:table-cell font-semibold", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hidden lg:table-cell font-semibold", children: "Map Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hidden md:table-cell font-semibold", children: "Views" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hidden md:table-cell font-semibold", children: "Updated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border/60", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-12 text-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-[#FF7A00]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Loading solo stories…" })
        ] }) }) }),
        filteredPosts.map((p) => {
          const dest = p.destinations;
          const hasCoords = p.latitude != null && p.longitude != null && !isNaN(p.latitude) && !isNaN(p.longitude);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostThumb, { cover: p.cover_image }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/posts/$id", params: {
                id: p.id
              }, className: "font-display font-bold hover:text-[#FF7A00] transition-colors line-clamp-1 text-foreground", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-1 font-mono mt-0.5", children: [
                "/",
                p.slug
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: p.published ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 shadow-2xs", children: "Published" }) : p.scheduled_at ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 text-xs font-semibold text-amber-600 shadow-2xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " Scheduled"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-muted border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground shadow-2xs", children: "Draft" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs space-y-0.5 max-w-[220px]", children: [
              p.location_name && hasCoords ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium truncate", title: `${p.location_name} (${Number(p.latitude).toFixed(4)}, ${Number(p.longitude).toFixed(4)})`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0 text-[#FF7A00]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: p.location_name })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Needs Location" })
              ] }),
              dest?.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground truncate", children: [
                "Destination: ",
                dest.title
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 hidden md:table-cell text-muted-foreground text-xs", children: [
              p.views ?? 0,
              " views"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-muted-foreground text-xs", children: new Date(p.updated_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/gallery", title: "Manage gallery photos", className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-[#FF7A00] transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: p.published ? "Unpublish story" : "Publish now", onClick: () => toggle.mutate({
                id: p.id,
                published: !p.published
              }), className: "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-[#FF7A00] transition-colors cursor-pointer", children: p.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Delete story", onClick: () => setDeleteTarget({
                id: p.id,
                title: p.title
              }), className: "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-red-500 transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }) })
          ] }, p.id);
        }),
        !isLoading && filteredPosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-12 text-center text-muted-foreground text-sm", children: data?.length === 0 ? "No solo stories yet — create your first story above." : "No stories match your active filters or search term." }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteTarget, onOpenChange: (open) => !open && !del.isPending && setDeleteTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-2xl border border-border bg-background shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-lg font-bold text-foreground", children: "Delete story?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "text-xs sm:text-sm text-muted-foreground", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: del.isPending, className: "rounded-xl border border-border bg-card hover:bg-muted cursor-pointer", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center gap-2 cursor-pointer", disabled: del.isPending, onClick: (e) => {
          e.preventDefault();
          if (deleteTarget && !del.isPending) {
            del.mutate(deleteTarget.id);
          }
        }, children: del.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Deleting…"
        ] }) : "Delete" })
      ] })
    ] }) })
  ] });
}
function PostThumb({
  cover
}) {
  const [failed, setFailed] = reactExports.useState(false);
  const src = cover && !failed ? resolveMediaUrl(cover) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/9] w-16 overflow-hidden rounded-xl bg-muted sm:w-20 shadow-2xs", children: src ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", loading: "lazy", referrerPolicy: "no-referrer", onError: () => setFailed(true), className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center gap-1 bg-muted text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-muted-foreground/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-wider font-medium", children: "No Image" })
  ] }) });
}
export {
  AdminPostsList as component
};
