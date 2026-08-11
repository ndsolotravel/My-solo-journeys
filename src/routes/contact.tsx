import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Mail, Instagram, Youtube, Facebook, Linkedin } from "lucide-react";
import { sendContact } from "@/lib/newsletter.functions";
import { toast } from "sonner";
import { SITE } from "@/lib/site";
import { useTranslator } from "@/lib/translate/store";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ndsolotravel" },
      {
        name: "description",
        content: "Get in touch with ndsolotravel for collaborations, questions, or just to say hi.",
      },
      { property: "og:title", content: "Contact — ndsolotravel" },
      { property: "og:description", content: "Get in touch with ndsolotravel." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const sendFn = useServerFn(sendContact);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);

  const t = useTranslator([
    "Contact",
    "Say hello.",
    "Got a destination to discover, a story to share, or an adventure in mind? Whether it’s a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.",
    "Name",
    "Email",
    "Subject (optional)",
    "Your message…",
    "Sending…",
    "Send message",
    "Elsewhere",
    "Instagram",
    "YouTube",
    "Facebook",
    "LinkedIn",
    "TikTok",
    "Message sent. I'll reply when I'm back from the trail.",
    "Could not send. Try again.",
    "Please enter your name.",
    "Please enter a valid email address.",
    "Please enter your message.",
  ]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();
    const website = form.website.trim();

    if (!name) {
      toast.error(t("Please enter your name."));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error(t("Please enter a valid email address."));
      return;
    }

    if (!message) {
      toast.error(t("Please enter your message."));
      return;
    }

    setLoading(true);
    try {
      await sendFn({
        data: {
          name,
          email,
          subject,
          message,
          website,
        },
      });
      toast.success(t("Message sent. I'll reply when I'm back from the trail."));
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err: any) {
      let errorMsg = t("Could not send. Try again.");
      if (err instanceof Error && err.message) {
        try {
          const parsed = JSON.parse(err.message);
          if (Array.isArray(parsed) && parsed[0]?.message) {
            errorMsg = parsed[0].message;
          } else {
            errorMsg = err.message;
          }
        } catch {
          errorMsg = err.message;
        }
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const inp =
    "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent";

  return (
    <>
      <section className="relative h-[45vh] min-h-[280px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80"
          alt="Open mountain landscape"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("Contact")}</p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("Say hello.")}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/80">
              {t(
                "Got a destination to discover, a story to share, or an adventure in mind? Whether it’s a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.",
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="sr-only">{t("Say hello.")}</h2>

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  {t("Name")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  maxLength={120}
                  placeholder={t("Name")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inp}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  {t("Email")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  required
                  type="email"
                  maxLength={320}
                  placeholder={t("Email")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inp}
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="sr-only">
                {t("Subject (optional)")}
              </label>
              <input
                id="contact-subject"
                name="subject"
                maxLength={200}
                placeholder={t("Subject (optional)")}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inp}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                {t("Your message…")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                maxLength={5000}
                placeholder={t("Your message…")}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inp}
              />
            </div>
            {/* Honeypot — hidden from humans, bots fill it */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
            >
              {loading ? t("Sending…") : t("Send message")}
            </button>
          </form>

          <aside className="space-y-4 rounded-3xl bg-muted/40 p-6">
            <h2 className="font-display text-lg font-bold">{t("Elsewhere")}</h2>
            <a
              href="mailto:contact@ndsolotravel.com"
              className="flex items-center gap-3 text-sm hover:text-accent"
            >
              <Mail className="h-4 w-4" /> contact@ndsolotravel.com
            </a>
            <a
              href={SITE.socials.instagram}
              className="flex items-center gap-3 text-sm hover:text-accent"
            >
              <Instagram className="h-4 w-4" /> {t("Instagram")}
            </a>
            <a
              href={SITE.socials.youtube}
              className="flex items-center gap-3 text-sm hover:text-accent"
            >
              <Youtube className="h-4 w-4" /> {t("YouTube")}
            </a>
            <a
              href={SITE.socials.facebook}
              className="flex items-center gap-3 text-sm hover:text-accent"
            >
              <Facebook className="h-4 w-4" /> {t("Facebook")}
            </a>
            <a
              href={SITE.socials.linkedin}
              className="flex items-center gap-3 text-sm hover:text-accent"
            >
              <Linkedin className="h-4 w-4" /> {t("LinkedIn")}
            </a>
            <a
              href={SITE.socials.tiktok}
              className="flex items-center gap-3 text-sm hover:text-accent"
            >
              <TikTokIcon className="h-4 w-4" /> {t("TikTok")}
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
