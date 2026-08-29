import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useRef } from "react";
import {
  Settings,
  User,
  Save,
  Loader2,
  CheckCircle2,
  Globe,
  Shield,
  Sparkles,
  Image as ImageIcon,
  Upload,
  UserPlus,
  Users,
  KeyRound,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { adminGetSettings, adminUpdateSetting } from "@/lib/settings.functions";
import {
  adminUploadImage,
  resolveMediaUrl,
  adminCreateAdminUser,
  adminListStaffUsers,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({
    meta: [{ title: "Settings — Admin CMS" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const getSettingsFn = useServerFn(adminGetSettings);
  const updateSettingFn = useServerFn(adminUpdateSetting);
  const uploadFn = useServerFn(adminUploadImage);
  const createStaffFn = useServerFn(adminCreateAdminUser);
  const listStaffFn = useServerFn(adminListStaffUsers);
  const qc = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => getSettingsFn(),
  });

  const { data: staffUsers, isLoading: staffLoading } = useQuery({
    queryKey: ["admin-staff-users"],
    queryFn: () => listStaffFn(),
  });

  const [blogAuthorName, setBlogAuthorName] = useState("Hussain");
  const [aboutImageUrl, setAboutImageUrl] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New staff admin registration state
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "editor">("admin");

  useEffect(() => {
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
    mutationFn: async (payload: { authorName: string; aboutImg: string }) => {
      await updateSettingFn({
        data: {
          key: "blog_author_name",
          value: payload.authorName.trim() || "Hussain",
          description: "Global author name displayed on blog stories and listings",
        },
      });
      await updateSettingFn({
        data: {
          key: "about_image_url",
          value: payload.aboutImg.trim(),
          description: "About page portrait image URL or Supabase storage path",
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["blog-author-name"] });
      qc.invalidateQueries({ queryKey: ["public-site-settings"] });
      qc.invalidateQueries({ queryKey: ["gallery"] });
      setIsDirty(false);
      toast.success("Settings saved successfully!");
    },
    onError: (err: Error) => {
      toast.error(`Failed to save settings: ${err.message}`);
    },
  });

  const createStaffMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string; role: "admin" | "editor" }) => {
      return await createStaffFn({
        data: payload,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-staff-users"] });
      setNewEmail("");
      setNewPassword("");
      toast.success("Administrator account registered successfully!");
    },
    onError: (err: Error) => {
      toast.error(`Failed to register account: ${err.message}`);
    },
  });

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type || "image/jpeg",
          base64,
        },
      });

      if (res?.url) {
        setAboutImageUrl(res.url);
        setIsDirty(true);
        toast.success("Portrait uploaded successfully!");
      }
    } catch (err: unknown) {
      toast.error(`Upload failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({ authorName: blogAuthorName, aboutImg: aboutImageUrl });
  };

  const handleReset = () => {
    if (settings && Array.isArray(settings)) {
      const authorSetting = settings.find((s) => s.key === "blog_author_name");
      setBlogAuthorName(authorSetting?.value || "Hussain");
      const aboutSetting = settings.find((s) => s.key === "about_image_url");
      setAboutImageUrl(aboutSetting?.value || "");
    }
    setIsDirty(false);
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return toast.error("Please enter an email address");
    if (!newPassword || newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");

    createStaffMutation.mutate({
      email: newEmail.trim(),
      password: newPassword,
      role: newRole,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar — matching Homepage Visual Hierarchy & Sticky Pattern */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <Settings className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              CMS Settings
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Global website configuration, author metadata, portrait sync, and admin accounts.
            </p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {isDirty && (
            <button
              type="button"
              onClick={handleReset}
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="submit"
            form="settings-form"
            disabled={!isDirty || saveMutation.isPending || isLoading || uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main Settings Column */}
        <div className="space-y-6">
          <form id="settings-form" onSubmit={handleSave} className="space-y-6">
            {/* Author Name */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                  <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-accent" /> Blog Author Configuration
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Controls the author name shown across all public articles, stories, and
                    expedition dispatches.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  <Globe className="h-3 w-3" /> Publicly Visible
                </span>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="blogAuthorName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Blog Author Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    id="blogAuthorName"
                    type="text"
                    value={blogAuthorName}
                    onChange={(e) => {
                      setBlogAuthorName(e.target.value);
                      setIsDirty(true);
                    }}
                    disabled={isLoading}
                    placeholder="e.g. Hussain"
                    maxLength={100}
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This name is automatically rendered after{" "}
                  <span className="font-semibold text-foreground">“By”</span> on every blog post,
                  featured dispatch card, and SEO Article schema.
                </p>
              </div>

              {/* Live Interactive Preview Box */}
              <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-accent">
                    <Sparkles className="h-3.5 w-3.5" /> Live Story Header Preview
                  </span>
                  <span>Public View</span>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/80 p-3.5 shadow-2xs">
                  <p className="text-xs uppercase tracking-widest text-accent font-semibold">
                    Solo Travel
                  </p>
                  <p className="font-display text-base font-bold text-foreground mt-1 line-clamp-1">
                    Phander Valley: A Symphony of Autumn Colors
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border/40 pt-2">
                    <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                      <User className="h-3.5 w-3.5 text-accent" /> By{" "}
                      {blogAuthorName.trim() || "Hussain"} · ndsolotravel
                    </span>
                    <span aria-hidden>·</span>
                    <span>Nov 18, 2025</span>
                    <span aria-hidden>·</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Page Picture Configuration */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                  <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-accent" /> About Page Picture
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Controls the portrait photo displayed on the public About page and synced to the
                    public Gallery.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  <Globe className="h-3 w-3" /> Auto Synced to Gallery
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted">
                    <img
                      src={aboutImageUrl ? resolveMediaUrl(aboutImageUrl) : "/assets/nd-about.jpg"}
                      alt="About Portrait Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <label
                      htmlFor="aboutImageUrl"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Image URL / Storage Path
                    </label>
                    <input
                      id="aboutImageUrl"
                      type="text"
                      value={aboutImageUrl}
                      onChange={(e) => {
                        setAboutImageUrl(e.target.value);
                        setIsDirty(true);
                      }}
                      placeholder="e.g. https://... or blog-media/... (leave empty for default)"
                      className="w-full rounded-xl border border-border bg-background py-2 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                      />
                      <button
                        type="button"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-3 w-3" /> Upload Picture
                          </>
                        )}
                      </button>
                      {aboutImageUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setAboutImageUrl("");
                            setIsDirty(true);
                          }}
                          className="text-xs text-muted-foreground hover:text-red-500 transition cursor-pointer"
                        >
                          Reset to default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <span className="text-xs text-muted-foreground">
                  {isDirty ? "Unsaved changes" : "All changes saved"}
                </span>
                <button
                  type="submit"
                  disabled={saveMutation.isPending || isLoading || uploading}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background shadow-xs hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Administrator & Team Provisioning Section */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-accent" /> Administrator Account Provisioning
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Sign up and authorize new administrator or editor team accounts with CMS access.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 self-start sm:self-auto">
                <ShieldCheck className="h-3.5 w-3.5" /> Protected Admin Area
              </span>
            </div>

            <form onSubmit={handleCreateStaff} className="grid gap-4 sm:grid-cols-3 items-end">
              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  New Admin Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@ndsolotravel.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password (min 6 chars)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div className="flex gap-2 sm:col-span-1">
                <div className="flex-1 space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Role
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as "admin" | "editor")}
                    className="w-full rounded-xl border border-border bg-background py-2 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  >
                    <option value="admin">Admin (Full)</option>
                    <option value="editor">Editor (Content)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={createStaffMutation.isPending}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90 disabled:opacity-50 transition cursor-pointer self-end h-[38px]"
                >
                  {createStaffMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <UserPlus className="h-3.5 w-3.5" /> Sign Up Admin
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Existing Staff Listing */}
            <div className="border-t border-border/40 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> Authorized Team Accounts (
                {staffUsers?.length ?? 0})
              </h3>
              <div className="divide-y divide-border/40 rounded-xl border border-border/60 overflow-hidden bg-background/50">
                {staffLoading ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    Loading accounts...
                  </div>
                ) : !staffUsers || staffUsers.length === 0 ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    No administrator accounts registered yet.
                  </div>
                ) : (
                  staffUsers.map(
                    (user: { id: string; userId: string; role: string; username: string }) => (
                      <div key={user.id} className="flex items-center justify-between p-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center text-[11px]">
                            {user.username?.slice(0, 1).toUpperCase() || "A"}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{user.username}</p>
                            <p className="text-[11px] text-muted-foreground font-mono">
                              ID: {user.userId?.slice(0, 14)}...
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            user.role === "admin"
                              ? "bg-accent/15 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <KeyRound className="h-3 w-3" /> {user.role}
                        </span>
                      </div>
                    ),
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info & Architecture Card */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
            <h3 className="font-display text-sm font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" /> Security & Architecture
            </h3>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Private Registration:</strong> Account
                  creation is strictly restricted to authenticated administrators inside this panel.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">No Public Sign-Up:</strong> The public login
                  interface at <code className="font-mono bg-muted px-1 py-0.5 rounded">/auth</code>{" "}
                  is sign-in only.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Role-Based Access:</strong> Only users with{" "}
                  <code className="font-mono bg-muted px-1 py-0.5 rounded">admin</code> or{" "}
                  <code className="font-mono bg-muted px-1 py-0.5 rounded">editor</code> roles in{" "}
                  <code className="font-mono bg-muted px-1 py-0.5 rounded">user_roles</code> can
                  access the CMS.
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
