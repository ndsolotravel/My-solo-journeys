import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribe } from "@/lib/newsletter.functions";
import { toast } from "sonner";
import { useTranslations } from "@/lib/translate/store";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const t = useTranslations();
  const subscribeFn = useServerFn(subscribe);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await subscribeFn({ data: { email } });
      toast.success(t("Subscribed. Welcome aboard."));
      setEmail("");
    } catch (err: any) {
      let msg = t("Could not subscribe. Try again.");
      if (err instanceof Error && err.message) {
        msg = err.message;
      }
      toast.error(msg);
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
        placeholder={t("Enter your email")}
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

