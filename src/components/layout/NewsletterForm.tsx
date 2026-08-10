import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribe } from "@/lib/newsletter.functions";
import { toast } from "sonner";
import { useTranslator } from "@/lib/translate/store";

const NEWSLETTER_TEXTS = [
  "you@summit.com",
  "Subscribe",
  "Subscribed. Welcome aboard.",
  "Could not subscribe. Try again.",
] as const;

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const subscribeFn = useServerFn(subscribe);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslator([...NEWSLETTER_TEXTS]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await subscribeFn({ data: { email } });
      toast.success(t("Subscribed. Welcome aboard."));
      setEmail("");
    } catch {
      toast.error(t("Could not subscribe. Try again."));
    } finally {
      setLoading(false);
    }
  }

  const base =
    "flex-1 rounded-full px-4 py-2.5 text-sm outline-none border transition focus:border-accent";
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        placeholder={t("you@summit.com")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`${base} ${
          dark
            ? "bg-white/5 border-white/15 text-secondary-foreground placeholder:text-secondary-foreground/40"
            : "bg-background border-border placeholder:text-muted-foreground"
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "…" : t("Subscribe")}
      </button>
    </form>
  );
}
