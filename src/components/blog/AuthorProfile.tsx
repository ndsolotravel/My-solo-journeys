import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { getAuthorProfile, type AuthorProfile } from "@/lib/author.functions";
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

export function AuthorProfile({ authorName }: { authorName: string }) {
  const t = useTranslations();
  const fetchProfile = useServerFn(getAuthorProfile);
  const [profile, setProfile] = useState<AuthorProfile | null>(null);

  useEffect(() => {
    fetchProfile({ data: { name: authorName } }).then(setProfile);
  }, [authorName, fetchProfile]);

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

          {/* Social links */}
          <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
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
