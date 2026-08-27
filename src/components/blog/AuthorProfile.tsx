import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { MapPin, ExternalLink, Share2, Link2, Check } from "lucide-react";
import { toast } from "sonner";
import { getAuthorProfile, type AuthorProfile as AuthorProfileData } from "@/lib/author.functions";
import { SITE } from "@/lib/site";
import { useTranslations } from "@/lib/translate/store";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram", href: SITE.socials.instagram },
  { key: "youtube", label: "YouTube", href: SITE.socials.youtube },
  { key: "twitter", label: "X / Twitter", href: SITE.socials.twitter },
  { key: "facebook", label: "Facebook", href: SITE.socials.facebook },
  { key: "tiktok", label: "TikTok", href: SITE.socials.tiktok },
] as const;

export function AuthorProfile({
  authorName,
  postTitle,
}: {
  authorName: string;
  postTitle?: string;
}) {
  const t = useTranslations();
  const fetchProfile = useServerFn(getAuthorProfile);
  const [profile, setProfile] = useState<AuthorProfileData | null>(null);
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    fetchProfile({ data: { name: authorName } }).then(setProfile);
  }, [authorName, fetchProfile]);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = async (text: string, successMessage = t("Link copied")) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success(successMessage);
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
      copiedTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      toast.error(t("Failed to copy link"));
    }
  };

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    copyToClipboard(url, t("Link copied"));
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
        copyToClipboard(url, t("Link copied"));
      }
    } else {
      copyToClipboard(url, t("Link copied"));
    }
  };

  const name = profile?.username || authorName;
  const bio = profile?.bio;
  const avatar = profile?.avatar_url;
  const initials = getInitials(name);

  return (
    <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-accent/20"
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

          {/* Mobile Actions: Only Share & Copy Link on mobile (individual social platform links hidden) */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 w-full max-w-xs mx-auto sm:hidden">
            <button
              type="button"
              onClick={handleShare}
              aria-label={t("Share")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs font-semibold text-foreground hover:bg-accent/10 hover:border-accent/40 active:scale-95 transition-all shadow-xs min-h-[42px] cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5 text-accent shrink-0" />
              <span className="truncate">{t("Share")}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              aria-label={copied ? t("Link copied") : t("Copy link")}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all shadow-xs min-h-[42px] cursor-pointer active:scale-95 ${
                copied
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-border bg-background/80 text-foreground hover:bg-accent/10 hover:border-accent/40"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{t("Link copied")}</span>
                </>
              ) : (
                <>
                  <Link2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="truncate">{t("Copy link")}</span>
                </>
              )}
            </button>
          </div>

          {/* Desktop Social links */}
          <div className="mt-3 hidden sm:flex items-center sm:justify-start gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
