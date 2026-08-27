import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn } from "./router-BLkQFpW7.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as adminListPosts, t as adminTogglePublish, u as adminDeletePost } from "./admin.functions-DGJYtjjS.mjs";
import { b as batchGeocodePosts } from "./geocoding.functions-DaqX6nmG.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DsuHXNs6.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { g as LoaderCircle, a0 as Navigation, an as Plus, S as Search, p as Clock, l as MapPin, h as CircleAlert, $ as Image, aB as EyeOff, a8 as Eye, af as Trash2 } from "../_libs/lucide-react.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Posts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage and publish your solo travel stories" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleBatchGeocode, disabled: batchGeocoding, className: "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: batchGeocoding ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Geocoding..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4" }),
          " Auto-geocode All Posts"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/posts/new", className: "inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New post"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 rounded-xl border border-border bg-muted/20 p-1", children: ["all", "published", "draft", "scheduled"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStatusFilter(tab), className: `rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${statusFilter === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: tab }, tab)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 sm:max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by title, slug, category…", className: "w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:border-accent" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-hidden rounded-2xl border border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hidden sm:table-cell", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hidden lg:table-cell", children: "Map Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hidden md:table-cell", children: "Views" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hidden md:table-cell", children: "Updated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-4 py-8 text-center text-muted-foreground", children: "Loading posts…" }) }),
        filteredPosts.map((p) => {
          const dest = p.destinations;
          const hasCoords = p.latitude != null && p.longitude != null && !isNaN(p.latitude) && !isNaN(p.longitude);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/posts/$id", params: {
                id: p.id
              }, className: "font-medium hover:text-accent line-clamp-1", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-1", children: [
                "/",
                p.slug
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: p.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "green", children: "Published" }) : p.scheduled_at ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "amber", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " Scheduled"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "gray", children: "Draft" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs space-y-0.5 max-w-[200px]", children: [
              p.location_name && hasCoords ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium truncate", title: `${p.location_name} (${p.latitude}, ${p.longitude})`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: p.location_name })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Needs Location" })
              ] }),
              dest?.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground truncate", children: [
                "Link: ",
                dest.title
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-muted-foreground", children: p.views ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-muted-foreground text-xs", children: new Date(p.updated_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/gallery", title: "Manage gallery photos", className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { title: p.published ? "Unpublish" : "Publish now", onClick: () => toggle.mutate({
                id: p.id,
                published: !p.published
              }), children: p.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { title: "Delete post", onClick: () => setDeleteTarget({
                id: p.id,
                title: p.title
              }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-red-500" }) })
            ] }) })
          ] }, p.id);
        }),
        !isLoading && filteredPosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-4 py-12 text-center text-muted-foreground", children: data?.length === 0 ? "No posts yet — create your first story." : "No posts match your active filters." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteTarget, onOpenChange: (open) => !open && !del.isPending && setDeleteTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete post?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to delete ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            '"',
            deleteTarget?.title,
            '"'
          ] }),
          "? This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: del.isPending, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center gap-2", disabled: del.isPending, onClick: (e) => {
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
function Badge({
  children,
  tone
}) {
  const cls = {
    green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    gray: "bg-muted text-muted-foreground"
  }[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs ${cls}`, children });
}
function IconBtn({
  children,
  title,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title, onClick, className: "inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors", children });
}
export {
  AdminPostsList as component
};
