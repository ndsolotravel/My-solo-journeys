import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as useServerFn } from "./router-B1ksNLyj.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as adminListDestinations, n as adminUpsertDestination, o as adminDeleteDestination, c as adminUploadImage } from "./admin.functions-67-zmleM.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { au as Plus, l as FileText, m as MapPin, $ as ExternalLink, av as Pencil, an as Trash2, X, h as LoaderCircle, ao as Upload } from "../_libs/lucide-react.mjs";
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
function AdminDestinations() {
  const listFn = useServerFn(adminListDestinations);
  const saveFn = useServerFn(adminUpsertDestination);
  const delFn = useServerFn(adminDeleteDestination);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-destinations"],
    queryFn: async () => await listFn()
  });
  const [editing, setEditing] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const save = useMutation({
    mutationFn: (d) => saveFn({
      data: d
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-destinations"]
      });
      setEditing(null);
      toast.success("Destination saved successfully");
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-destinations"]
      });
      toast.success("Destination deleted");
    },
    onError: (e) => toast.error(e.message)
  });
  async function upload(file) {
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
      setEditing((d) => d ? {
        ...d,
        featured_image: url
      } : d);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Destinations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Manage travel regions, countries, and destination guides" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        title: "",
        country: "",
        published: true
      }), className: "inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition cursor-pointer shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New Destination"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: (data ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-accent/40 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video w-full bg-muted overflow-hidden", children: [
          d.featured_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(d.featured_image), alt: d.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center text-muted-foreground text-xs", children: "No featured image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2.5 right-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-semibold text-foreground shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3 text-accent" }),
            d.posts_count ?? 0,
            " ",
            d.posts_count === 1 ? "Story" : "Stories"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-accent flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              d.country,
              d.region ? ` · ${d.region}` : ""
            ] }),
            d.slug && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations/$slug", params: {
              slug: d.slug
            }, target: "_blank", title: "View public destination page", className: "text-muted-foreground hover:text-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1.5 font-display text-base font-semibold", children: d.title }),
          d.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground", children: d.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t border-border/60 pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(d), className: "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          if (d.posts_count > 0) {
            toast.error(`Cannot delete "${d.title}" because ${d.posts_count} story(ies) are currently assigned to it.`);
            return;
          }
          if (confirm(`Delete destination "${d.title}"?`)) del.mutate(d.id);
        }, className: "ml-auto inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
          " Delete"
        ] })
      ] }) })
    ] }, d.id)) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: (e) => e.stopPropagation(), className: "relative flex flex-col w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-4 sm:px-6 shrink-0 bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold", children: editing.id ? "Edit Destination" : "New Destination" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: editing.id ? "Update region details, imagery, and status" : "Add a new travel destination or region" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditing(null), className: "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer", "aria-label": "Close dialog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "destination-form", onSubmit: (e) => {
        e.preventDefault();
        save.mutate(editing);
      }, className: "flex-1 overflow-y-auto p-5 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Destination Title", value: editing.title, onChange: (v) => setEditing({
          ...editing,
          title: v
        }), placeholder: "e.g. Phander Valley", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Country", value: editing.country, onChange: (v) => setEditing({
            ...editing,
            country: v
          }), placeholder: "e.g. Pakistan", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Region / Province (optional)", value: editing.region ?? "", onChange: (v) => setEditing({
            ...editing,
            region: v
          }), placeholder: "e.g. Gilgit-Baltistan" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Slug (optional - auto-generated if blank)", value: editing.slug ?? "", onChange: (v) => setEditing({
          ...editing,
          slug: v
        }), placeholder: "e.g. phander-valley" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, value: editing.description ?? "", onChange: (e) => setEditing({
            ...editing,
            description: e.target.value
          }), placeholder: "Brief overview, terrain notes, and highlights of this destination...", className: "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Featured Image" }),
          editing.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editing.featured_image, alt: editing.title || "Preview", className: "h-full w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditing({
              ...editing,
              featured_image: ""
            }), className: "absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black transition-colors cursor-pointer", title: "Remove image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-col sm:flex-row gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3.5 py-2 text-xs font-medium hover:bg-muted transition-colors w-full sm:w-auto shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => e.target.files?.[0] && upload(e.target.files[0]), className: "hidden" }),
              uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                " Uploading..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
                " Upload File"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.featured_image ?? "", onChange: (e) => setEditing({
              ...editing,
              featured_image: e.target.value
            }), placeholder: "or paste image URL / Google Drive link", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs outline-none focus:border-accent transition-colors" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.published !== false, onChange: (e) => setEditing({
            ...editing,
            published: e.target.checked
          }), className: "h-4 w-4 rounded border-border text-accent focus:ring-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Published on public site" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2.5 border-t border-border px-5 py-3.5 sm:px-6 shrink-0 bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditing(null), className: "rounded-full border border-border bg-background px-4 py-2 text-xs sm:text-sm font-medium hover:bg-muted transition-colors cursor-pointer", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", form: "destination-form", disabled: save.isPending || uploading, className: "rounded-full bg-foreground px-5 py-2 text-xs sm:text-sm font-medium text-background hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-sm", children: save.isPending ? "Saving…" : editing.id ? "Update Destination" : "Save Destination" })
      ] })
    ] }) })
  ] });
}
function Input({
  label,
  value,
  onChange,
  placeholder,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), placeholder, required, className: "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
  ] });
}
export {
  AdminDestinations as component
};
