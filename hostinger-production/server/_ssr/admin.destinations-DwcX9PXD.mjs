import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, b as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, p as adminListDestinations, r as adminUpsertDestination, t as adminDeleteDestination, v as adminUploadImage } from "./router-C9gfg41F.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a2 as Plus, a3 as Pencil, a1 as Trash2, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
  const save = useMutation({
    mutationFn: (d) => saveFn({
      data: d
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-destinations"]
      });
      setEditing(null);
      toast.success("Saved");
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
      toast.success("Deleted");
    },
    onError: (e) => toast.error(e.message)
  });
  async function upload(file) {
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
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Destinations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        title: "",
        country: "",
        published: true
      }), className: "inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: (data ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border", children: [
      d.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.featured_image, alt: d.title, className: "aspect-video w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          d.country,
          d.region ? ` · ${d.region}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-display font-semibold", children: d.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(d), className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
            " Edit"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            if (confirm("Delete?")) del.mutate(d.id);
          }, className: "ml-auto inline-flex items-center gap-1 text-xs text-red-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
            " Delete"
          ] })
        ] })
      ] })
    ] }, d.id)) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 p-4", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: (e) => e.stopPropagation(), className: "mx-auto mt-10 max-w-xl rounded-2xl bg-background p-6 shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold", children: editing.id ? "Edit destination" : "New destination" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        save.mutate(editing);
      }, className: "mt-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Title", value: editing.title, onChange: (v) => setEditing({
          ...editing,
          title: v
        }), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Country", value: editing.country, onChange: (v) => setEditing({
            ...editing,
            country: v
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Region", value: editing.region ?? "", onChange: (v) => setEditing({
            ...editing,
            region: v
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Slug (optional)", value: editing.slug ?? "", onChange: (v) => setEditing({
          ...editing,
          slug: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, value: editing.description ?? "", onChange: (e) => setEditing({
            ...editing,
            description: e.target.value
          }), className: "mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Featured image" }),
          editing.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editing.featured_image, className: "mt-2 aspect-video w-full rounded-lg object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => e.target.files?.[0] && upload(e.target.files[0]), className: "mt-2 text-xs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.featured_image ?? "", onChange: (e) => setEditing({
            ...editing,
            featured_image: e.target.value
          }), placeholder: "or paste URL", className: "mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.published !== false, onChange: (e) => setEditing({
            ...editing,
            published: e.target.checked
          }) }),
          " Published"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: save.isPending, className: "mt-2 w-full rounded-full bg-foreground py-2.5 text-sm text-background disabled:opacity-50", children: save.isPending ? "Saving…" : "Save" })
      ] })
    ] }) })
  ] });
}
function Input({
  label,
  value,
  onChange,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), required, className: "mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" })
  ] });
}
export {
  AdminDestinations as component
};
