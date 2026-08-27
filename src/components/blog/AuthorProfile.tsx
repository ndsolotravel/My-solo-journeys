import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { MapPin, Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { getAuthorProfile, type AuthorProfile as AuthorProfileData } from "@/lib/author.functions";
import { useTranslations } from "@/lib/translate/store";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function AuthorProfile({
  authorName,
  postTitle,
  authorImage,
}: {
  authorName: string;
  postTitle?: string;
  authorImage?: string | null;
}) {
  const t = useTranslations();
  const fetchProfile = useServerFn(getAuthorProfile);
  const [profile, setProfile] = useState<AuthorProfileData | null>(null);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    fetchProfile({ data: { name: authorName } })
      .then(setProfile)
      .catch(() => {});
  }, [authorName, fetchProfile]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const fallbackCopy = async (url: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success(t("Link copied"));
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      toast.error(t("Failed to copy link"));
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareTitle =
      postTitle ||
      (typeof document !== "undefined" ? document.title : "") ||
      "ndsolotravel";

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: shareTitle,
          url: url,
        });
      } catch (err: any) {
        if (err?.name === "AbortError") {
          return;
        }
        await fallbackCopy(url);
      }
    } else {
      await fallbackCopy(url);
    }
  };

  const isHussain =
    (profile?.username && profile.username.trim().toLowerCase() === "hussain") ||
    authorName.trim().toLowerCase() === "hussain" ||
    authorName.trim().toLowerCase() === "noman";

  const name = profile?.username || (isHussain ? "Hussain" : authorName);
  const bio =
    profile?.bio ||
    (isHussain
      ? "Solo traveler, motorcyclist, and explorer capturing the wild landscapes and hidden roads of the Himalayas, Karakoram, and beyond."
      : null);
  const avatar = authorImage?.trim() || (isHussain ? "/images/author-hussain.jpg" : profile?.avatar_url);
  const initials = getInitials(name);

  return (
    <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-accent/20 shadow-sm"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent/10 ring-2 ring-accent/20">
            <span className="font-display text-2xl font-bold text-accent">
              {initials}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h3 className="font-display text-lg font-bold text-foreground">
              {t(name)}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent uppercase tracking-wider">
              <MapPin className="h-2.5 w-2.5" />
              {t("Author")}
            </span>
          </div>

          {bio && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-lg">
              {t(bio)}
            </p>
          )}

          {/* Single Share Action across all devices (Mobile, Tablet, Laptop, Desktop) */}
          <div className="mt-3.5 flex items-center justify-center sm:justify-start">
            <button
              type="button"
              onClick={handleShare}
              aria-label={copied ? t("Link copied") : t("Share")}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95 min-h-[34px] ${
                copied
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-border bg-background/80 hover:bg-accent/10 hover:border-accent/40 text-foreground"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>{t("Link copied")}</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>{t("Share")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
