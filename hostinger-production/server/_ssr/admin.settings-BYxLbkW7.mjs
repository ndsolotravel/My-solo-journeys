import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, t as adminGetSettings, v as adminUpdateSetting } from "./router-DEcStQI4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as adminUploadImage, d as adminCreateAdminUser, e as adminListStaffUsers, r as resolveMediaUrl } from "./admin.functions-CnC9mk6Y.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a7 as Settings, U as User, G as Globe, b as Sparkles, $ as Image, g as LoaderCircle, ag as Upload, ah as Save, ai as UserPlus, aj as ShieldCheck, a6 as Users, K as KeyRound, ak as Shield, o as CircleCheck } from "../_libs/lucide-react.mjs";
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
function AdminSettingsPage() {
  const getSettingsFn = useServerFn(adminGetSettings);
  const updateSettingFn = useServerFn(adminUpdateSetting);
  const uploadFn = useServerFn(adminUploadImage);
  const createStaffFn = useServerFn(adminCreateAdminUser);
  const listStaffFn = useServerFn(adminListStaffUsers);
  const qc = useQueryClient();
  const {
    data: settings,
    isLoading
  } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => getSettingsFn()
  });
  const {
    data: staffUsers,
    isLoading: staffLoading
  } = useQuery({
    queryKey: ["admin-staff-users"],
    queryFn: () => listStaffFn()
  });
  const [blogAuthorName, setBlogAuthorName] = reactExports.useState("Hussain");
  const [aboutImageUrl, setAboutImageUrl] = reactExports.useState("");
  const [isDirty, setIsDirty] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [newEmail, setNewEmail] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [newRole, setNewRole] = reactExports.useState("admin");
  reactExports.useEffect(() => {
    if (settings && Array.isArray(settings)) {
      const authorSetting = settings.find((s) => s.key === "blog_author_name");
      if (authorSetting?.value) {
        setBlogAuthorName(authorSetting.value);
      }
      const aboutSetting = settings.find((s) => s.key === "about_image_url");
      if (aboutSetting?.value) {
        setAboutImageUrl(aboutSetting.value);
      }
    }
  }, [settings]);
  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      await updateSettingFn({
        data: {
          key: "blog_author_name",
          value: payload.authorName.trim() || "Hussain",
          description: "Global author name displayed on blog stories and listings"
        }
      });
      await updateSettingFn({
        data: {
          key: "about_image_url",
          value: payload.aboutImg.trim(),
          description: "About page portrait image URL or Supabase storage path"
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-settings"]
      });
      qc.invalidateQueries({
        queryKey: ["blog-author-name"]
      });
      qc.invalidateQueries({
        queryKey: ["public-site-settings"]
      });
      qc.invalidateQueries({
        queryKey: ["gallery"]
      });
      setIsDirty(false);
      toast.success("Settings saved successfully!");
    },
    onError: (err) => {
      toast.error(`Failed to save settings: ${err.message}`);
    }
  });
  const createStaffMutation = useMutation({
    mutationFn: async (payload) => {
      return await createStaffFn({
        data: payload
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-staff-users"]
      });
      setNewEmail("");
      setNewPassword("");
      toast.success("Administrator account registered successfully!");
    },
    onError: (err) => {
      toast.error(`Failed to register account: ${err.message}`);
    }
  });
  const handleFileUpload = async (file) => {
    try {
      setUploading(true);
      const reader = new FileReader();
      const base64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type || "image/jpeg",
          base64
        }
      });
      if (res?.url) {
        setAboutImageUrl(res.url);
        setIsDirty(true);
        toast.success("Portrait uploaded successfully!");
      }
    } catch (err) {
      toast.error(`Upload failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    saveMutation.mutate({
      authorName: blogAuthorName,
      aboutImg: aboutImageUrl
    });
  };
  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return toast.error("Please enter an email address");
    if (!newPassword || newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    createStaffMutation.mutate({
      email: newEmail.trim(),
      password: newPassword,
      role: newRole
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
        " Global Configuration"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-3xl font-bold tracking-tight", children: "CMS Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Manage global website parameters, author attributions, About page portrait, and administrator accounts." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-accent" }),
                  " Blog Author Configuration"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Controls the author name shown across all public articles, stories, and expedition dispatches." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
                " Publicly Visible"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "blogAuthorName", className: "block text-sm font-semibold text-foreground", children: "Blog Author Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "blogAuthorName", type: "text", value: blogAuthorName, onChange: (e) => {
                  setBlogAuthorName(e.target.value);
                  setIsDirty(true);
                }, disabled: isLoading, placeholder: "e.g. Hussain", maxLength: 100, className: "w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "This name is automatically rendered after",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "“By”" }),
                " on every blog post, featured dispatch card, and SEO Article schema."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-accent", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
                  " Live Story Header Preview"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Public View" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-background/80 p-3.5 shadow-2xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-accent font-semibold", children: "Solo Travel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-bold text-foreground mt-1 line-clamp-1", children: "Phander Valley: A Symphony of Autumn Colors" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border/40 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 font-semibold text-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-accent" }),
                    " By",
                    " ",
                    blogAuthorName.trim() || "Hussain",
                    " · ndsolotravel"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Nov 18, 2025" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "5 min read" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-accent" }),
                  " About Page Picture"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Controls the portrait photo displayed on the public About page and synced to the public Gallery." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
                " Auto Synced to Gallery"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aboutImageUrl ? resolveMediaUrl(aboutImageUrl) : "/assets/nd-about.jpg", alt: "About Portrait Preview", className: "h-full w-full object-cover" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "aboutImageUrl", className: "block text-xs font-semibold text-foreground", children: "Image URL / Storage Path" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "aboutImageUrl", type: "text", value: aboutImageUrl, onChange: (e) => {
                  setAboutImageUrl(e.target.value);
                  setIsDirty(true);
                }, placeholder: "e.g. https://... or blog-media/... (leave empty for default)", className: "w-full rounded-xl border border-border bg-background py-2 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: uploading, onClick: () => fileInputRef.current?.click(), className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer", children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
                    " Uploading..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3" }),
                    " Upload Picture"
                  ] }) }),
                  aboutImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                    setAboutImageUrl("");
                    setIsDirty(true);
                  }, className: "text-xs text-muted-foreground hover:text-red-500 transition cursor-pointer", children: "Reset to default" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: isDirty ? "Unsaved changes" : "All changes saved" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saveMutation.isPending || isLoading || uploading, className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background shadow-xs hover:opacity-90 transition disabled:opacity-50 cursor-pointer", children: saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                " Saving…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
                " Save Changes"
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5 text-accent" }),
                " Administrator Account Provisioning"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Sign up and authorize new administrator or editor team accounts with CMS access." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 self-start sm:self-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
              " Protected Admin Area"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateStaff, className: "grid gap-4 sm:grid-cols-3 items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "New Admin Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "admin@ndsolotravel.com", value: newEmail, onChange: (e) => setNewEmail(e.target.value), className: "w-full rounded-xl border border-border bg-background py-2 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Password (min 6 chars)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, placeholder: "••••••••", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full rounded-xl border border-border bg-background py-2 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 sm:col-span-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newRole, onChange: (e) => setNewRole(e.target.value), className: "w-full rounded-xl border border-border bg-background py-2 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admin (Full)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "editor", children: "Editor (Content)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: createStaffMutation.isPending, className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90 disabled:opacity-50 transition cursor-pointer self-end h-[38px]", children: createStaffMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5" }),
                " Sign Up Admin"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              " Authorized Team Accounts (",
              staffUsers?.length ?? 0,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40 rounded-xl border border-border/60 overflow-hidden bg-background/50", children: staffLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-xs text-muted-foreground", children: "Loading accounts..." }) : !staffUsers || staffUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-xs text-muted-foreground", children: "No administrator accounts registered yet." }) : staffUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center text-[11px]", children: user.username?.slice(0, 1).toUpperCase() || "A" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: user.username }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground font-mono", children: [
                    "ID: ",
                    user.userId?.slice(0, 14),
                    "..."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${user.role === "admin" ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3 w-3" }),
                " ",
                user.role
              ] })
            ] }, user.id)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-accent" }),
          " Security & Architecture"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Private Registration:" }),
              " Account creation is strictly restricted to authenticated administrators inside this panel."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "No Public Sign-Up:" }),
              " The public login interface at ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-muted px-1 py-0.5 rounded", children: "/auth" }),
              " ",
              "is sign-in only."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Role-Based Access:" }),
              " Only users with",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-muted px-1 py-0.5 rounded", children: "admin" }),
              " or",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-muted px-1 py-0.5 rounded", children: "editor" }),
              " roles in",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-muted px-1 py-0.5 rounded", children: "user_roles" }),
              " can access the CMS."
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminSettingsPage as component
};
