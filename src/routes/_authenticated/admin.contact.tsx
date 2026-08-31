import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import {
  Mail,
  ExternalLink,
  Save,
  Loader2,
  RotateCcw,
  Settings2,
  MessageSquare,
  BellRing,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { HeroBannerManager } from "@/components/admin/HeroBannerManager";
import { adminGetContactSettings, adminSaveContactSettings } from "@/lib/contact.functions";

export const Route = createFileRoute("/_authenticated/admin/contact")({
  head: () => ({
    meta: [{ title: "Contact Page — Admin CMS" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminContactPage,
});

const SETTING_KEYS = [
  "contact_form_enabled",
  "contact_title",
  "contact_description",
  "contact_name_label",
  "contact_name_placeholder",
  "contact_name_required",
  "contact_email_label",
  "contact_email_placeholder",
  "contact_email_required",
  "contact_subject_label",
  "contact_subject_placeholder",
  "contact_subject_required",
  "contact_message_label",
  "contact_message_placeholder",
  "contact_message_required",
  "contact_submit_button_text",
  "contact_success_message",
  "contact_error_message",
  "contact_notification_email_enabled",
  "contact_confirmation_email_enabled",
] as const;

const DEFAULTS: Record<string, string> = {
  contact_form_enabled: "true",
  contact_title: "Send a Message",
  contact_description:
    "Got a destination to discover, a story to share, or an adventure in mind? Whether it's a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.",
  contact_name_label: "Your Name",
  contact_name_placeholder: "John Doe",
  contact_name_required: "true",
  contact_email_label: "Email Address",
  contact_email_placeholder: "john@example.com",
  contact_email_required: "true",
  contact_subject_label: "Subject",
  contact_subject_placeholder: "Collaboration, query, or trail notes...",
  contact_subject_required: "false",
  contact_message_label: "Your Message",
  contact_message_placeholder: "Write your message here...",
  contact_message_required: "true",
  contact_submit_button_text: "Send Message",
  contact_success_message: "Message sent successfully. I'll reply when I'm back from the trail.",
  contact_error_message: "Your message could not be sent. Please try again.",
  contact_notification_email_enabled: "true",
  contact_confirmation_email_enabled: "false",
};

// Field descriptor for the CMS editor
type FieldKey = (typeof SETTING_KEYS)[number];

function AdminContactPage() {
  const getFn = useServerFn(adminGetContactSettings);
  const saveFn = useServerFn(adminSaveContactSettings);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery<Record<string, string>>({
    queryKey: ["admin-contact-settings"],
    queryFn: () => getFn(),
  });

  const [values, setValues] = useState<Record<string, string>>({ ...DEFAULTS });
  const [original, setOriginal] = useState<Record<string, string>>({ ...DEFAULTS });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (data && typeof data === "object") {
      const merged: Record<string, string> = { ...DEFAULTS };
      for (const key of SETTING_KEYS) {
        const v = data[key];
        if (v !== undefined && v !== null) merged[key] = String(v);
      }
      setValues(merged);
      setOriginal(merged);
      setIsDirty(false);
    }
  }, [data]);

  const setField = (key: FieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const saveMutation = useMutation({
    mutationFn: () => saveFn({ data: { settings: values } }),
    onSuccess: () => {
      setOriginal(values);
      setIsDirty(false);
      qc.invalidateQueries({ queryKey: ["admin-contact-settings"] });
      qc.invalidateQueries({ queryKey: ["public-contact-settings"] });
      toast.success("Contact settings saved successfully!", {
        description: "The public contact form will use these new settings immediately.",
      });
    },
    onError: (err: Error) => {
      toast.error(`Failed to save contact settings: ${err.message}`, {
        description: "Your changes were not saved. Please try again.",
      });
    },
  });

  const handleReset = () => {
    setValues(original);
    setIsDirty(false);
    toast.info("Changes discarded.");
  };

  const isSaving = saveMutation.isPending;

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50";

  const labelCls =
    "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2";

  const boolVal = (key: FieldKey) => values[key] === "true" || values[key] === "1";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar matching other CMS pages */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <Mail className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Contact Page Management
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage the contact form fields, email notifications, and hero banner.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/contact"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer shadow-2xs shrink-0"
          >
            <ExternalLink className="h-3.5 w-3.5 text-accent" />
            <span>View Contact Page</span>
          </Link>

          {isDirty && (
            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={!isDirty || isSaving || isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>{isDirty ? "Save Changes" : "Saved"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isDirty && (
        <div className="flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2.5 text-xs font-medium text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          You have unsaved changes. Click "Save Changes" to apply them.
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading contact settings...
        </div>
      ) : (
        <div className="space-y-6">
          {/* ── Contact Form Settings ── */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand/10 text-brand">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold">Contact Form Settings</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Configure the labels, placeholders, validation and messages used by the public
                    contact form.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent shrink-0">
                <Globe className="h-3 w-3" /> Publicly Visible
              </span>
            </div>

            {/* Enable toggle */}
            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Enable Contact Form</p>
                <p className="text-xs text-muted-foreground">
                  Turn the public contact form on or off.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={boolVal("contact_form_enabled")}
                aria-label="Enable contact form"
                onClick={() =>
                  setField(
                    "contact_form_enabled",
                    boolVal("contact_form_enabled") ? "false" : "true",
                  )
                }
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  boolVal("contact_form_enabled") ? "bg-brand" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    boolVal("contact_form_enabled") ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelCls}>Form Title</label>
                <input
                  className={inputCls}
                  value={values.contact_title}
                  maxLength={120}
                  onChange={(e) => setField("contact_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Submit Button Text</label>
                <input
                  className={inputCls}
                  value={values.contact_submit_button_text}
                  maxLength={60}
                  onChange={(e) => setField("contact_submit_button_text", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className={labelCls}>Form Description</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={values.contact_description}
                  maxLength={1000}
                  onChange={(e) => setField("contact_description", e.target.value)}
                />
              </div>
            </div>

            {/* Field configs */}
            {(["name", "email", "subject", "message"] as const).map((field) => (
              <div
                key={field}
                className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-4"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {field === "name"
                    ? "Name Field"
                    : field === "email"
                      ? "Email Field"
                      : field === "subject"
                        ? "Subject Field"
                        : "Message Field"}
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <label className={labelCls}>Label</label>
                    <input
                      className={inputCls}
                      value={values[`contact_${field}_label`]}
                      maxLength={80}
                      onChange={(e) => setField(`contact_${field}_label`, e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelCls}>Placeholder</label>
                    <input
                      className={inputCls}
                      value={values[`contact_${field}_placeholder`]}
                      maxLength={120}
                      onChange={(e) => setField(`contact_${field}_placeholder`, e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelCls}>Required / Optional</label>
                    <select
                      className={inputCls}
                      value={values[`contact_${field}_required`] === "true" ? "true" : "false"}
                      onChange={(e) => setField(`contact_${field}_required`, e.target.value)}
                    >
                      <option value="true">Required</option>
                      <option value="false">Optional</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelCls}>Success Message (shown after submission)</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={values.contact_success_message}
                  maxLength={500}
                  onChange={(e) => setField("contact_success_message", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Error Message (shown on failure)</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={values.contact_error_message}
                  maxLength={500}
                  onChange={(e) => setField("contact_error_message", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* ── Email Settings ── */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand/10 text-brand">
                  <BellRing className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold">Email Notifications</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Control when email notifications are sent for new contact messages.
                  </p>
                </div>
              </div>
              <Settings2 className="h-5 w-5 text-muted-foreground shrink-0" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Admin Notification Email</p>
                  <p className="text-xs text-muted-foreground">
                    Send an email to the admin inbox when a new message arrives.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={boolVal("contact_notification_email_enabled")}
                  aria-label="Admin notification email"
                  onClick={() =>
                    setField(
                      "contact_notification_email_enabled",
                      boolVal("contact_notification_email_enabled") ? "false" : "true",
                    )
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    boolVal("contact_notification_email_enabled")
                      ? "bg-brand"
                      : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      boolVal("contact_notification_email_enabled")
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Visitor Confirmation Email
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Send a thank-you confirmation to the visitor after a successful submission.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={boolVal("contact_confirmation_email_enabled")}
                  aria-label="Visitor confirmation email"
                  onClick={() =>
                    setField(
                      "contact_confirmation_email_enabled",
                      boolVal("contact_confirmation_email_enabled") ? "false" : "true",
                    )
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    boolVal("contact_confirmation_email_enabled")
                      ? "bg-brand"
                      : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      boolVal("contact_confirmation_email_enabled")
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-700 dark:text-amber-400">
              Email credentials (SMTP password, API keys, service role key, Turnstile secret) are
              stored exclusively in server environment variables and are never exposed here.
            </p>
          </section>

          {/* ── Hero Banner Management ── */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-semibold">Contact Hero Banner</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Control the banner image at the top of the public contact page.
                </p>
              </div>
            </div>
            <HeroBannerManager
              page="contact"
              autoHint="Automatically uses a suitable image from the site's available photo content."
              manualHint="Pick an image from the site's available photos below, upload one, or paste a URL."
              optionsLabel="Available Site Images"
            />
          </section>
        </div>
      )}
    </div>
  );
}
