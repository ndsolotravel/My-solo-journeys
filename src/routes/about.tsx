import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  Compass,
  Mountain,
  Bike,
  Camera,
  MapPin,
  Globe,
  Quote,
  Shield,
  Heart,
  Wrench,
  Navigation,
  ArrowRight,
  Sparkles,
  Route as RouteIcon,
  CheckCircle2,
  Calendar,
  Layers,
  Send,
  Flag,
} from "lucide-react";
import aboutPortrait from "@/assets/nd-about.jpg";
import { useTranslations } from "@/lib/translate/store";
import { getPublicSiteSettings } from "@/lib/settings.functions";
import { resolveMediaUrl } from "@/lib/media";
import { PageBreadcrumbs, BreadcrumbJsonLd } from "@/components/layout/PageBreadcrumbs";
import {
  parseJson,
  ABOUT_DEFAULTS,
  DEFAULT_HERO_BADGES,
  DEFAULT_DOSSIER_ITEMS,
  DEFAULT_WHY_TRAVEL_CARDS,
  DEFAULT_MOTORCYCLE_FEATURES,
  DEFAULT_TREKKING_CARDS,
  DEFAULT_PHILOSOPHY_CARDS,
  DEFAULT_NUMBER_STATS,
  DEFAULT_TERRAIN_TAGS,
  DEFAULT_CONTENT_CARDS,
  type AboutHeroBadge,
  type AboutDossierItem,
  type AboutWhyTravelCard,
  type AboutMotorcycleFeature,
  type AboutTrekkingCard,
  type AboutPhilosophyCard,
  type AboutNumberStat,
  type AboutTerrainTag,
  type AboutContentCard,
} from "@/lib/about.functions";

export const settingsQO = queryOptions({
  queryKey: ["public-site-settings"],
  queryFn: () => getPublicSiteSettings(),
});

export const Route = createFileRoute("/about")({
  head: ({ loaderData }: any) => {
    const title =
      loaderData?.about_seo_title ||
      "About Hussain & NDSOLOTRAVEL — Solo Motorcycle Adventure Travel";
    const description =
      loaderData?.about_seo_description ||
      "Meet Hussain, the engineer and solo explorer behind NDSOLOTRAVEL. Documenting raw motorcycle expeditions, high-altitude Himalayan treks, and stories across 27 countries.";
    const ogTitle = loaderData?.about_og_title || title;
    const ogDesc = loaderData?.about_og_description || description;
    const ogImg = loaderData?.about_og_image
      ? resolveMediaUrl(loaderData.about_og_image)
      : undefined;
    const canonical = loaderData?.about_canonical_url || "/about";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: ogDesc },
        ...(ogImg ? [{ property: "og:image", content: ogImg }] : []),
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
              { "@type": "ListItem", position: 2, name: "About" },
            ],
          }),
        },
      ],
    };
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQO),
  component: AboutPage,
});

// Helper component for dynamic Lucide icons
function DynamicIcon({
  name,
  className,
  fallback: FallbackIcon,
}: {
  name: string;
  className?: string;
  fallback?: any;
}) {
  const IconComponent = (LucideIcons as any)[name] || FallbackIcon || Compass;
  return <IconComponent className={className} />;
}

function AboutPage() {
  const t = useTranslations();
  const { data: settings } = useSuspenseQuery(settingsQO);

  // -------------------------------------------------------------------------
  // SECTION 1: HERO
  // -------------------------------------------------------------------------
  const heroEnabled = settings?.about_hero_enabled !== "false";
  const heroImage = settings?.about_hero_image
    ? resolveMediaUrl(settings.about_hero_image)
    : "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&auto=format";
  const heroImageAlt =
    settings?.about_hero_image_alt || "Karakoram mountain pass and solo road";
  const heroLabel =
    settings?.about_hero_label || ABOUT_DEFAULTS.about_hero_label;
  const heroHeadline =
    settings?.about_hero_headline || ABOUT_DEFAULTS.about_hero_headline;
  const heroSubtitle =
    settings?.about_hero_subtitle || ABOUT_DEFAULTS.about_hero_subtitle;
  const heroBadges = parseJson<AboutHeroBadge[]>(
    settings?.about_hero_badges,
    DEFAULT_HERO_BADGES
  ).filter((b) => b.enabled);

  // -------------------------------------------------------------------------
  // SECTION 2: INTRODUCTION / PROFILE
  // -------------------------------------------------------------------------
  const profileEnabled = settings?.about_profile_enabled !== "false";
  const portraitSrc = settings?.about_profile_image
    ? resolveMediaUrl(settings.about_profile_image)
    : settings?.about_image_url
      ? resolveMediaUrl(settings.about_image_url)
      : aboutPortrait;
  const profileImageAlt =
    settings?.about_profile_image_alt || "Hussain — Solo explorer behind NDSOLOTRAVEL";
  const profileName =
    settings?.about_profile_name || ABOUT_DEFAULTS.about_profile_name;
  const profileRole =
    settings?.about_profile_role || ABOUT_DEFAULTS.about_profile_role;
  const profileTagline =
    settings?.about_profile_tagline || ABOUT_DEFAULTS.about_profile_tagline;
  const profileEyebrow =
    settings?.about_profile_eyebrow || ABOUT_DEFAULTS.about_profile_eyebrow;
  const biographyTitle =
    settings?.about_biography_title || ABOUT_DEFAULTS.about_biography_title;
  const biographyIntro =
    settings?.about_biography_intro || ABOUT_DEFAULTS.about_biography_intro;
  const biographyParagraphs = (
    settings?.about_biography_paragraphs || ABOUT_DEFAULTS.about_biography_paragraphs
  ).split("\n\n").filter(Boolean);

  const profileHighlightTitle =
    settings?.about_profile_highlight_title || ABOUT_DEFAULTS.about_profile_highlight_title;
  const profileHighlightText =
    settings?.about_profile_highlight_text || ABOUT_DEFAULTS.about_profile_highlight_text;
  const dossierItems = parseJson<AboutDossierItem[]>(
    settings?.about_profile_dossier,
    DEFAULT_DOSSIER_ITEMS
  ).filter((d) => d.enabled);

  const profileCtaPrimaryText =
    settings?.about_profile_cta_primary_text || ABOUT_DEFAULTS.about_profile_cta_primary_text;
  const profileCtaPrimaryUrl =
    settings?.about_profile_cta_primary_url || ABOUT_DEFAULTS.about_profile_cta_primary_url;
  const profileCtaSecondaryText =
    settings?.about_profile_cta_secondary_text || ABOUT_DEFAULTS.about_profile_cta_secondary_text;
  const profileCtaSecondaryUrl =
    settings?.about_profile_cta_secondary_url || ABOUT_DEFAULTS.about_profile_cta_secondary_url;

  // -------------------------------------------------------------------------
  // SECTION 3: WHY I TRAVEL
  // -------------------------------------------------------------------------
  const whyTravelEnabled = settings?.about_why_travel_enabled !== "false";
  const whyTravelEyebrow =
    settings?.about_why_travel_eyebrow || ABOUT_DEFAULTS.about_why_travel_eyebrow;
  const whyTravelTitle =
    settings?.about_why_travel_title || ABOUT_DEFAULTS.about_why_travel_title;
  const whyTravelDescription =
    settings?.about_why_travel_description || ABOUT_DEFAULTS.about_why_travel_description;
  const whyTravelCards = parseJson<AboutWhyTravelCard[]>(
    settings?.about_why_travel_cards,
    DEFAULT_WHY_TRAVEL_CARDS
  )
    .filter((c) => c.enabled)
    .sort((a, b) => a.order - b.order);

  // -------------------------------------------------------------------------
  // SECTION 4: SOLO MOTORCYCLE ADVENTURES
  // -------------------------------------------------------------------------
  const motorcycleEnabled = settings?.about_motorcycle_enabled !== "false";
  const motorcycleEyebrow =
    settings?.about_motorcycle_eyebrow || ABOUT_DEFAULTS.about_motorcycle_eyebrow;
  const motorcycleBadge =
    settings?.about_motorcycle_badge || ABOUT_DEFAULTS.about_motorcycle_badge;
  const motorcycleTitle =
    settings?.about_motorcycle_title || ABOUT_DEFAULTS.about_motorcycle_title;
  const motorcycleDescription =
    settings?.about_motorcycle_description || ABOUT_DEFAULTS.about_motorcycle_description;
  const motorcycleImage = settings?.about_motorcycle_image
    ? resolveMediaUrl(settings.about_motorcycle_image)
    : ABOUT_DEFAULTS.about_motorcycle_image;
  const motorcycleImageAlt =
    settings?.about_motorcycle_image_alt || ABOUT_DEFAULTS.about_motorcycle_image_alt;
  const motorcycleFeatures = parseJson<AboutMotorcycleFeature[]>(
    settings?.about_motorcycle_features,
    DEFAULT_MOTORCYCLE_FEATURES
  )
    .filter((f) => f.enabled)
    .sort((a, b) => a.order - b.order);
  const motorcycleCtaText =
    settings?.about_motorcycle_cta_text || ABOUT_DEFAULTS.about_motorcycle_cta_text;
  const motorcycleCtaUrl =
    settings?.about_motorcycle_cta_url || ABOUT_DEFAULTS.about_motorcycle_cta_url;

  // -------------------------------------------------------------------------
  // SECTION 5: TREKKING & HIGH ALTITUDE
  // -------------------------------------------------------------------------
  const trekkingEnabled = settings?.about_trekking_enabled !== "false";
  const trekkingEyebrow =
    settings?.about_trekking_eyebrow || ABOUT_DEFAULTS.about_trekking_eyebrow;
  const trekkingTitle =
    settings?.about_trekking_title || ABOUT_DEFAULTS.about_trekking_title;
  const trekkingDescription =
    settings?.about_trekking_description || ABOUT_DEFAULTS.about_trekking_description;
  const trekkingImage = settings?.about_trekking_image
    ? resolveMediaUrl(settings.about_trekking_image)
    : ABOUT_DEFAULTS.about_trekking_image;
  const trekkingImageAlt =
    settings?.about_trekking_image_alt || ABOUT_DEFAULTS.about_trekking_image_alt;
  const trekkingLocationLabel =
    settings?.about_trekking_location_label || ABOUT_DEFAULTS.about_trekking_location_label;
  const trekkingLocationQuote =
    settings?.about_trekking_location_quote || ABOUT_DEFAULTS.about_trekking_location_quote;
  const trekkingCards = parseJson<AboutTrekkingCard[]>(
    settings?.about_trekking_cards,
    DEFAULT_TREKKING_CARDS
  )
    .filter((c) => c.enabled)
    .sort((a, b) => a.order - b.order);

  // -------------------------------------------------------------------------
  // SECTION 6: TRAVEL PHILOSOPHY / QUOTE
  // -------------------------------------------------------------------------
  const philosophyEnabled = settings?.about_philosophy_enabled !== "false";
  const philosophyEyebrow =
    settings?.about_philosophy_eyebrow || ABOUT_DEFAULTS.about_philosophy_eyebrow;
  const philosophyQuote =
    settings?.about_philosophy_quote || ABOUT_DEFAULTS.about_philosophy_quote;
  const philosophyDescription =
    settings?.about_philosophy_description || ABOUT_DEFAULTS.about_philosophy_description;

  // -------------------------------------------------------------------------
  // SECTION 7: TRAVEL PHILOSOPHY CARDS
  // -------------------------------------------------------------------------
  const philosophyCardsEnabled = settings?.about_philosophy_cards_enabled !== "false";
  const philosophyCards = parseJson<AboutPhilosophyCard[]>(
    settings?.about_philosophy_cards,
    DEFAULT_PHILOSOPHY_CARDS
  )
    .filter((c) => c.enabled)
    .sort((a, b) => a.order - b.order);

  // -------------------------------------------------------------------------
  // SECTION 8: JOURNEY IN NUMBERS
  // -------------------------------------------------------------------------
  const numbersEnabled = settings?.about_numbers_enabled !== "false";
  const numbersEyebrow =
    settings?.about_numbers_eyebrow || ABOUT_DEFAULTS.about_numbers_eyebrow;
  const numbersTitle =
    settings?.about_numbers_title || ABOUT_DEFAULTS.about_numbers_title;
  const numbersDescription =
    settings?.about_numbers_description || ABOUT_DEFAULTS.about_numbers_description;
  const numbersStats = parseJson<AboutNumberStat[]>(
    settings?.about_numbers_stats,
    DEFAULT_NUMBER_STATS
  )
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);
  const numbersTagsLabel =
    settings?.about_numbers_tags_label || ABOUT_DEFAULTS.about_numbers_tags_label;
  const numbersTags = parseJson<AboutTerrainTag[]>(
    settings?.about_numbers_tags,
    DEFAULT_TERRAIN_TAGS
  )
    .filter((tItem) => tItem.enabled)
    .sort((a, b) => a.order - b.order);

  // -------------------------------------------------------------------------
  // SECTION 9: WHAT YOU WILL FIND ON NDSOLOTRAVEL
  // -------------------------------------------------------------------------
  const contentEnabled = settings?.about_content_enabled !== "false";
  const contentEyebrow =
    settings?.about_content_eyebrow || ABOUT_DEFAULTS.about_content_eyebrow;
  const contentTitle =
    settings?.about_content_title || ABOUT_DEFAULTS.about_content_title;
  const contentDescription =
    settings?.about_content_description || ABOUT_DEFAULTS.about_content_description;
  const contentCards = parseJson<AboutContentCard[]>(
    settings?.about_content_cards,
    DEFAULT_CONTENT_CARDS
  )
    .filter((c) => c.enabled)
    .sort((a, b) => a.order - b.order);

  // -------------------------------------------------------------------------
  // SECTION 10: FINAL CTA
  // -------------------------------------------------------------------------
  const ctaEnabled = settings?.about_cta_enabled !== "false";
  const ctaEyebrow = settings?.about_cta_eyebrow || ABOUT_DEFAULTS.about_cta_eyebrow;
  const ctaTitle = settings?.about_cta_title || ABOUT_DEFAULTS.about_cta_title;
  const ctaDescription =
    settings?.about_cta_description || ABOUT_DEFAULTS.about_cta_description;
  const ctaPrimaryText =
    settings?.about_cta_primary_text || ABOUT_DEFAULTS.about_cta_primary_text;
  const ctaPrimaryUrl =
    settings?.about_cta_primary_url || ABOUT_DEFAULTS.about_cta_primary_url;
  const ctaSecondaryText =
    settings?.about_cta_secondary_text || ABOUT_DEFAULTS.about_cta_secondary_text;
  const ctaSecondaryUrl =
    settings?.about_cta_secondary_url || ABOUT_DEFAULTS.about_cta_secondary_url;
  const ctaTertiaryText =
    settings?.about_cta_tertiary_text || ABOUT_DEFAULTS.about_cta_tertiary_text;
  const ctaTertiaryUrl =
    settings?.about_cta_tertiary_url || ABOUT_DEFAULTS.about_cta_tertiary_url;

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-background text-foreground selection:bg-brand/20 selection:text-brand">
      <BreadcrumbJsonLd items={[{ label: "About" }]} />

      {/* -------------------------------------------------------------
          1. CINEMATIC HERO SECTION
         ------------------------------------------------------------- */}
      {heroEnabled && (
        <section className="relative min-h-[65vh] lg:min-h-[75vh] w-full flex items-end overflow-hidden bg-zinc-950">
          {/* Background Image with Cinematic Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={heroImage}
              alt={heroImageAlt}
              loading="eager"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&auto=format";
              }}
              className="h-full w-full object-cover object-center transform motion-safe:animate-fade-in duration-1000"
            />
            {/* Gradients for depth and legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />
            <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.7)_100%)]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12 pt-28 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              {/* Tag Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              >
                <Compass className="w-3.5 h-3.5 text-accent animate-pulse" />
                <span>{t(heroLabel)}</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
              >
                {t(heroHeadline)}
              </motion.h1>

              {/* Sub-headline */}
              {heroSubtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl font-light"
                >
                  {t(heroSubtitle)}
                </motion.p>
              )}

              {/* Key Adventure Badges */}
              {heroBadges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-2.5 pt-2"
                >
                  {heroBadges.map((badge) => (
                    <span
                      key={badge.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-white/90 backdrop-blur-sm"
                    >
                      <DynamicIcon
                        name={badge.icon}
                        className="w-3.5 h-3.5 text-accent"
                        fallback={Compass}
                      />
                      {t(badge.label)}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Breadcrumb Navigation */}
              <div className="pt-2">
                <PageBreadcrumbs items={[{ label: "About" }]} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
        {/* -------------------------------------------------------------
            2. PROFILE SECTION — HUSSAIN & THE ENGINEERING BACKGROUND
           ------------------------------------------------------------- */}
        {profileEnabled && (
          <section className="relative">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left: Professional Editorial Portrait & Expedition Specs */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative group">
                  {/* Visual Ambient Glow */}
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand/30 via-accent/20 to-transparent rounded-[2.5rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-700" />

                  {/* Portrait Card */}
                  <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-2xl">
                    <img
                      src={portraitSrc}
                      alt={profileImageAlt}
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = aboutPortrait;
                      }}
                      className="w-full aspect-[4/5] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Overlay Badge */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white">
                        {t(profileRole)}
                      </span>
                      <span className="p-1.5 rounded-full bg-brand text-white shadow-lg">
                        <Sparkles className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Gradient bottom overlay on image */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                      <p className="text-xs uppercase tracking-widest font-semibold text-accent mb-1">
                        {t("NDSOLOTRAVEL")}
                      </p>
                      <h3 className="font-display text-2xl font-bold">{t(profileName)}</h3>
                      {profileTagline && (
                        <p className="text-sm text-zinc-300 font-light">
                          {t(profileTagline)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expedition Dossier / Quick Specs */}
                {dossierItems.length > 0 && (
                  <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-border/60">
                      <Shield className="w-4 h-4 text-accent" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {t("Expedition Dossier")}
                      </h4>
                    </div>

                    <dl className="grid grid-cols-2 gap-4 text-sm">
                      {dossierItems.map((item) => (
                        <div key={item.id}>
                          <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                            {t(item.label)}
                          </dt>
                          <dd className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
                            <DynamicIcon
                              name={item.icon}
                              className="w-3.5 h-3.5 text-accent shrink-0"
                              fallback={MapPin}
                            />
                            <span>{t(item.value)}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              {/* Right: Narrative Story & Engineering Evolution */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    <span className="h-px w-6 bg-accent" />
                    <span>{t(profileEyebrow)}</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                    {t(biographyTitle)}
                  </h2>
                </div>

                {/* Core Bio Paragraphs */}
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-5 leading-relaxed">
                  {biographyIntro && (
                    <p className="text-foreground/90 font-medium text-lg leading-relaxed">
                      {t(biographyIntro)}
                    </p>
                  )}

                  {biographyParagraphs.map((para, idx) => {
                    // Render highlighted box after 1st paragraph if present
                    if (idx === 1 && profileHighlightTitle) {
                      return (
                        <div key={idx} className="space-y-5">
                          <p>{t(para)}</p>
                          <div className="p-6 rounded-2xl bg-muted/40 border-l-4 border-accent my-6 space-y-2">
                            <div className="flex items-center gap-2 text-foreground font-semibold text-base">
                              <Wrench className="w-4 h-4 text-accent" />
                              <span>{t(profileHighlightTitle)}</span>
                            </div>
                            {profileHighlightText && (
                              <p className="text-sm text-muted-foreground leading-relaxed m-0">
                                {t(profileHighlightText)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return <p key={idx}>{t(para)}</p>;
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {profileCtaPrimaryText && (
                    <Link
                      to={profileCtaPrimaryUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/90 transition-colors shadow-md shadow-brand/20"
                    >
                      <span>{t(profileCtaPrimaryText)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  {profileCtaSecondaryText && (
                    <Link
                      to={profileCtaSecondaryUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted border border-border text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors"
                    >
                      <Send className="w-4 h-4 text-accent" />
                      <span>{t(profileCtaSecondaryText)}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            3. WHY I TRAVEL (INTENTIONAL DISCOMFORT & MEANINGFUL CONNECTIONS)
           ------------------------------------------------------------- */}
        {whyTravelEnabled && (
          <section className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <Compass className="w-3.5 h-3.5 text-accent" />
                <span>{t(whyTravelEyebrow)}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {t(whyTravelTitle)}
              </h2>
              {whyTravelDescription && (
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {t(whyTravelDescription)}
                </p>
              )}
            </div>

            {whyTravelCards.length > 0 && (
              <div className="grid md:grid-cols-3 gap-8">
                {whyTravelCards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm hover:shadow-md transition-shadow space-y-4 relative overflow-hidden group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <DynamicIcon
                        name={card.icon}
                        className="w-6 h-6 text-accent"
                        fallback={Compass}
                      />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {t(card.title)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(card.description)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* -------------------------------------------------------------
            4. SOLO MOTORCYCLE ADVENTURES (TWO WHEELS & OPEN HORIZONS)
           ------------------------------------------------------------- */}
        {motorcycleEnabled && (
          <section className="rounded-3xl border border-border/80 bg-zinc-950 text-white overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-12 items-center">
              {/* Left: Atmospheric Image */}
              <div className="lg:col-span-6 relative h-[360px] lg:h-[540px] w-full overflow-hidden">
                <img
                  src={motorcycleImage}
                  alt={motorcycleImageAlt}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
                {motorcycleBadge && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent">
                      <Bike className="w-3.5 h-3.5" />
                      <span>{t(motorcycleBadge)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Text & Motorcycle Identity */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {t(motorcycleEyebrow)}
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {t(motorcycleTitle)}
                  </h2>
                </div>

                {motorcycleDescription && (
                  <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                    {t(motorcycleDescription)}
                  </p>
                )}

                {motorcycleFeatures.length > 0 && (
                  <div className="space-y-4 pt-2">
                    {motorcycleFeatures.map((feat) => (
                      <div key={feat.id} className="flex items-start gap-3.5">
                        <div className="p-2 rounded-xl bg-white/10 text-accent shrink-0 mt-0.5">
                          <DynamicIcon
                            name={feat.icon}
                            className="w-4 h-4"
                            fallback={RouteIcon}
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {t(feat.title)}
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 leading-relaxed">
                            {t(feat.description)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {motorcycleCtaText && (
                  <div className="pt-2">
                    <Link
                      to={motorcycleCtaUrl}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                    >
                      <span>{t(motorcycleCtaText)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            5. TREKKING AND EXPLORATION (HIGH ALTITUDE WILDERNESS)
           ------------------------------------------------------------- */}
        {trekkingEnabled && (
          <section className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  <Mountain className="w-3.5 h-3.5" />
                  <span>{t(trekkingEyebrow)}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                  {t(trekkingTitle)}
                </h2>
              </div>

              {trekkingDescription && (
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {t(trekkingDescription)}
                </p>
              )}

              {trekkingCards.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {trekkingCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-5 rounded-2xl border border-border/80 bg-card space-y-2"
                    >
                      <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                        <DynamicIcon
                          name={card.icon}
                          className="w-4 h-4 text-accent"
                          fallback={CheckCircle2}
                        />
                        <span>{t(card.title)}</span>
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t(card.description)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
                <img
                  src={trekkingImage}
                  alt={trekkingImageAlt}
                  className="w-full aspect-[4/3] object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  {trekkingLocationLabel && (
                    <p className="text-xs uppercase font-semibold tracking-wider text-accent">
                      {t(trekkingLocationLabel)}
                    </p>
                  )}
                  {trekkingLocationQuote && (
                    <p className="text-sm text-zinc-200 mt-1 font-light">
                      {t(trekkingLocationQuote)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            6. TRAVEL PHILOSOPHY (CORE ETHOS)
           ------------------------------------------------------------- */}
        {philosophyEnabled && (
          <section className="space-y-12">
            {/* Quote Callout Box */}
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-card via-muted/30 to-card border border-border/80 p-8 sm:p-12 lg:p-16 text-center shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <div className="inline-flex p-3 rounded-2xl bg-brand/10 text-brand mx-auto">
                  <Quote className="w-8 h-8 text-accent" />
                </div>

                <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                  &ldquo;{t(philosophyQuote)}&rdquo;
                </blockquote>

                {philosophyDescription && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                    {t(philosophyDescription)}
                  </p>
                )}
              </div>
            </div>

            {/* 4 Pillars of the NDSOLOTRAVEL Ethos */}
            {philosophyCardsEnabled && philosophyCards.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {philosophyCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-6 rounded-2xl border border-border/80 bg-card space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-accent">
                      {card.number}
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground">
                      {t(card.title)}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t(card.description)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* -------------------------------------------------------------
            7. 27 COUNTRIES & 3 CONTINENTS (EXPEDITION MILESTONES)
           ------------------------------------------------------------- */}
        {numbersEnabled && (
          <section className="rounded-3xl border border-border/80 bg-muted/30 p-8 sm:p-12 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/60">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  <Globe className="w-3.5 h-3.5 text-accent" />
                  <span>{t(numbersEyebrow)}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {t(numbersTitle)}
                </h2>
              </div>
              {numbersDescription && (
                <p className="text-muted-foreground text-sm max-w-md">
                  {t(numbersDescription)}
                </p>
              )}
            </div>

            {/* Stats Grid */}
            {numbersStats.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {numbersStats.map((stat) => (
                  <div
                    key={stat.id}
                    className="p-6 rounded-2xl bg-card border border-border/80 space-y-1"
                  >
                    <p className="font-display text-4xl sm:text-5xl font-black text-brand tracking-tight">
                      {stat.value}
                    </p>
                    <h4 className="text-sm font-bold text-foreground">{t(stat.label)}</h4>
                    {stat.description && (
                      <p className="text-xs text-muted-foreground">{t(stat.description)}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Terrain & Route Badges */}
            {numbersTags.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t(numbersTagsLabel)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {numbersTags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium text-foreground/90 shadow-2xs hover:border-accent/40 transition-colors"
                    >
                      {t(tag.name)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* -------------------------------------------------------------
            8. WHAT YOU WILL FIND ON NDSOLOTRAVEL
           ------------------------------------------------------------- */}
        {contentEnabled && (
          <section className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>{t(contentEyebrow)}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {t(contentTitle)}
              </h2>
              {contentDescription && (
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {t(contentDescription)}
                </p>
              )}
            </div>

            {contentCards.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contentCards.map((card) => (
                  <Link
                    key={card.id}
                    to={card.ctaUrl}
                    className="group p-6 rounded-3xl border border-border/80 bg-card hover:border-brand/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                        <DynamicIcon
                          name={card.icon}
                          className="w-6 h-6 text-accent"
                          fallback={Compass}
                        />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                        {t(card.title)}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {t(card.description)}
                      </p>
                    </div>
                    <div className="pt-6 flex items-center text-xs font-semibold text-accent gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{t(card.ctaText)}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* -------------------------------------------------------------
            9. CALL TO ACTION / CONNECT
           ------------------------------------------------------------- */}
        {ctaEnabled && (
          <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-8 sm:p-14 lg:p-16 border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent">
                <Flag className="w-3.5 h-3.5" />
                <span>{t(ctaEyebrow)}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t(ctaTitle)}
              </h2>

              {ctaDescription && (
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                  {t(ctaDescription)}
                </p>
              )}

              <div className="flex flex-wrap gap-4 pt-2">
                {ctaPrimaryText && (
                  <Link
                    to={ctaPrimaryUrl}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20"
                  >
                    <span>{t(ctaPrimaryText)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {ctaSecondaryText && (
                  <Link
                    to={ctaSecondaryUrl}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    <span>{t(ctaSecondaryText)}</span>
                  </Link>
                )}
                {ctaTertiaryText && (
                  <Link
                    to={ctaTertiaryUrl}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-white/20 text-white/90 font-semibold text-sm hover:text-white hover:border-white/40 transition-colors"
                  >
                    <Send className="w-4 h-4 text-accent" />
                    <span>{t(ctaTertiaryText)}</span>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
