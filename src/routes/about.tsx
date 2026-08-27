import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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

const settingsQO = queryOptions({
  queryKey: ["public-site-settings"],
  queryFn: () => getPublicSiteSettings(),
});

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Hussain & NDSOLOTRAVEL — Solo Motorcycle Adventure Travel" },
      {
        name: "description",
        content:
          "Meet Hussain, the engineer and solo explorer behind NDSOLOTRAVEL. Documenting raw motorcycle expeditions, high-altitude Himalayan treks, and stories across 27 countries.",
      },
      { property: "og:title", content: "About Hussain & NDSOLOTRAVEL — Solo Adventure Travel" },
      {
        property: "og:description",
        content:
          "Solo motorcycle journeys, high-altitude trekking, and honest field notes from 27 countries and 3 continents.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
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
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQO),
  component: AboutPage,
});

function AboutPage() {
  const t = useTranslations();
  const { data: settings } = useSuspenseQuery(settingsQO);
  const portraitSrc = settings?.about_image_url
    ? resolveMediaUrl(settings.about_image_url)
    : aboutPortrait;

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-background text-foreground selection:bg-brand/20 selection:text-brand">
      <BreadcrumbJsonLd items={[{ label: "About" }]} />

      {/* -------------------------------------------------------------
          1. CINEMATIC HERO SECTION
         ------------------------------------------------------------- */}
      <section className="relative min-h-[65vh] lg:min-h-[75vh] w-full flex items-end overflow-hidden bg-zinc-950">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&auto=format"
            alt="Karakoram mountain pass and solo road"
            className="h-full w-full object-cover object-center transform motion-safe:animate-fade-in duration-1000"
          />
          {/* Gradients for depth and legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/70" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/80" />
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
              <span>{t("The Story Behind NDSOLOTRAVEL")}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              {t("Solo, slow, and almost always uphill.")}
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl font-light"
            >
              {t(
                "From engineering blueprints to remote mountain passes, unpaved tracks, and high Himalayan ridges. Documenting authentic exploration on two wheels and on foot."
              )}
            </motion.p>

            {/* Key Adventure Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5 pt-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-white/90 backdrop-blur-sm">
                <Bike className="w-3.5 h-3.5 text-accent" />
                {t("Solo Motorcycling")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-white/90 backdrop-blur-sm">
                <Mountain className="w-3.5 h-3.5 text-accent" />
                {t("High-Altitude Trekking")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-white/90 backdrop-blur-sm">
                <Globe className="w-3.5 h-3.5 text-accent" />
                {t("27 Countries & 3 Continents")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-white/90 backdrop-blur-sm">
                <Camera className="w-3.5 h-3.5 text-accent" />
                {t("Documentary Photography")}
              </span>
            </motion.div>

            {/* Breadcrumb Navigation */}
            <div className="pt-2">
              <PageBreadcrumbs items={[{ label: "About" }]} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
        {/* -------------------------------------------------------------
            2. PROFILE SECTION — HUSSAIN & THE ENGINEERING BACKGROUND
           ------------------------------------------------------------- */}
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
                    alt="Hussain — Solo explorer behind NDSOLOTRAVEL"
                    className="w-full aspect-[4/5] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {/* Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white">
                      {t("Founder & Solo Traveler")}
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
                    <h3 className="font-display text-2xl font-bold">Hussain</h3>
                    <p className="text-sm text-zinc-300 font-light">
                      {t("Engineer · Motorcycle Nomad · Himalayan Trekker")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expedition Dossier / Quick Specs */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-border/60">
                  <Shield className="w-4 h-4 text-accent" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    {t("Expedition Dossier")}
                  </h4>
                </div>

                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      {t("Primary Base")}
                    </dt>
                    <dd className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      Lahore & Karakoram
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      {t("Travel Rig")}
                    </dt>
                    <dd className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
                      <Bike className="w-3.5 h-3.5 text-accent shrink-0" />
                      Dual-Sport Motorcycle
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      {t("Highest Pass")}
                    </dt>
                    <dd className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
                      <Mountain className="w-3.5 h-3.5 text-accent shrink-0" />
                      Khunjerab (4,693m)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      {t("Mode")}
                    </dt>
                    <dd className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-accent shrink-0" />
                      100% Solo & Independent
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Right: Narrative Story & Engineering Evolution */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  <span className="h-px w-6 bg-accent" />
                  <span>{t("Introduction")}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                  {t("From Engineering Problem-Solving to the Freedom of the Open Road")}
                </h2>
              </div>

              {/* Core Bio Paragraphs */}
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-5 leading-relaxed">
                <p className="text-foreground/90 font-medium text-lg leading-relaxed">
                  {t(
                    "Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world, discovering new places, and experiencing the freedom of traveling solo."
                  )}
                </p>

                <p>
                  {t(
                    "I am a solo traveler and an Engineer by profession. While engineering has shaped the way I think, solve problems, and plan, traveling has taught me to be curious, adaptable, independent, and open to the unexpected."
                  )}
                </p>

                <div className="p-6 rounded-2xl bg-muted/40 border-l-4 border-accent my-6 space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-semibold text-base">
                    <Wrench className="w-4 h-4 text-accent" />
                    <span>{t("The Intersection of Engineering & Solo Exploration")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed m-0">
                    {t(
                      "Engineering teaches you to evaluate risk, study mechanical systems, and calculate solutions when variables fail. When you are alone on a mountain pass 4,000 meters above sea level with no cell reception, that analytical discipline keeps you calm. You calculate fuel consumption across dead zones, repair trailside breakdowns with simple tools, and navigate glacial terrain with methodical focus."
                    )}
                  </p>
                </div>

                <p>
                  {t(
                    "For me, solo travel is more than simply visiting new destinations. It is about getting away from the familiar, riding unfamiliar roads, hiking through remote landscapes, meeting people from different backgrounds, and creating experiences that stay with you long after the journey ends."
                  )}
                </p>

                <p>
                  {t(
                    "Through NDSOLOTRAVEL, I share my journeys, motorcycle adventures, hiking experiences, destinations, travel stories, photographs, and the lessons I discover along the way."
                  )}
                </p>

                <p>
                  {t(
                    "I believe you do not always need a group, a perfect plan, or a luxury itinerary to explore the world. Sometimes, all you need is the courage to start, an open mind, and the willingness to take the road less travelled."
                  )}
                </p>

                <p className="font-medium text-foreground">
                  {t(
                    "Travel is my way of discovering the world, challenging myself, and continuing to learn beyond the boundaries of everyday life."
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/90 transition-colors shadow-md shadow-brand/20"
                >
                  <span>{t("Read Expedition Stories")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted border border-border text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors"
                >
                  <Send className="w-4 h-4 text-accent" />
                  <span>{t("Get in Touch")}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            3. WHY I TRAVEL (INTENTIONAL DISCOMFORT & MEANINGFUL CONNECTIONS)
           ------------------------------------------------------------- */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Compass className="w-3.5 h-3.5 text-accent" />
              <span>{t("Purpose & Meaning")}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t("Why I Travel")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {t(
                "Travel is not about accumulating passport stamps or taking postcard selfies. It is a deliberate practice of curiosity, resilience, and personal discovery."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm hover:shadow-md transition-shadow space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {t("Stepping Away from the Familiar")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  "Routine creates comfort, but unfamiliarity creates growth. By removing the safety net of home, solo travel forces you to observe closely, think independently, and adapt to unpredictable circumstances with confidence."
                )}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm hover:shadow-md transition-shadow space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {t("Genuine Human Connection")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  "When you travel alone, you are never truly isolated. You are open to the world. A cup of salted tea shared with mountain shepherds, an impromptu dinner with roadside mechanics, and silent camaraderie in remote villages reveal our shared humanity."
                )}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm hover:shadow-md transition-shadow space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {t("Self-Reliance & Resilience")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  "Navigating unexpected roadblocks, landslides, sudden blizzards, and mechanical issues builds a quiet inner strength. Real adventure begins the moment the original plan falls apart."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            4. SOLO MOTORCYCLE ADVENTURES (TWO WHEELS & OPEN HORIZONS)
           ------------------------------------------------------------- */}
        <section className="rounded-3xl border border-border/80 bg-zinc-950 text-white overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-12 items-center">
            {/* Left: Atmospheric Image */}
            <div className="lg:col-span-6 relative h-[360px] lg:h-[540px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80&auto=format"
                alt="Solo adventure motorcycle on remote mountain road"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Bike className="w-3.5 h-3.5" />
                  <span>{t("Two Wheels, Zero Boundaries")}</span>
                </div>
              </div>
            </div>

            {/* Right: Text & Motorcycle Identity */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  {t("The Medium of Truth")}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {t("Solo Motorcycle Adventures")}
                </h2>
              </div>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                {t(
                  "On a motorcycle, there are no frames, windows, or sound barriers. You are directly inside the elements. You feel the temperature plummet as you climb a 4,000m pass, smell the alpine pine after mountain rain, and taste the dust of remote riverbeds."
                )}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-white/10 text-accent shrink-0 mt-0.5">
                    <RouteIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {t("The Karakoram & Mountain Passes")}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 leading-relaxed">
                      {t(
                        "Navigating the eighth wonder of the world, gravel spurs into Shimshal, the sheer drops of the Indus Gorge, and the remote valleys of Gilgit-Baltistan."
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-white/10 text-accent shrink-0 mt-0.5">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {t("Trailside Self-Sufficiency")}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 leading-relaxed">
                      {t(
                        "Carrying spare tubes, fuel cans, brake pads, and zip-ties. Knowing your machine inside and out so you can ride with calm confidence anywhere."
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  <span>{t("Explore Motorcycle Destination Guides")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            5. TREKKING AND EXPLORATION (HIGH ALTITUDE WILDERNESS)
           ------------------------------------------------------------- */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <Mountain className="w-3.5 h-3.5" />
                <span>{t("Where Roads End")}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {t("Trekking & High-Altitude Exploration")}
              </h2>
            </div>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {t(
                "When the track terminates and the wheels can go no further, exploration continues on foot. Trekking high into the Karakoram and Himalayas is an exercise in absolute humility."
              )}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-2">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {t("K2 Base Camp & Concordia")}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(
                    "Walking the legendary Baltoro Glacier beneath the Trango Towers to the throne room of the mountain gods."
                  )}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-2">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {t("Nanga Parbat & Fairy Meadows")}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(
                    "Witnessing the sheer 4,500-meter vertical rise of the Rupal and Raikot faces in raw mountain isolation."
                  )}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-2">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {t("Deosai High Plateau")}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(
                    "Traversing the second highest plateau on earth, where rolling meadows meet endless snowline peaks."
                  )}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-2">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {t("Self-Carried Expeditions")}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(
                    "Carrying tent, food, and camera gear through freezing nights and altitude acclimatization."
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format"
                alt="High altitude mountain peak and glacier"
                className="w-full aspect-[4/3] object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase font-semibold tracking-wider text-accent">
                  {t("Himalayan Solitude")}
                </p>
                <p className="text-sm text-zinc-200 mt-1 font-light">
                  {t("Against the silence of 8,000-meter giants, the ego evaporates.")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            6. TRAVEL PHILOSOPHY (CORE ETHOS)
           ------------------------------------------------------------- */}
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
                "{t("Solo travel is where the journey becomes the destination.")}"
              </blockquote>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                {t(
                  "You do not need a tour operator, a large budget, or a 100-page itinerary to discover the world. You simply need the curiosity to listen, the humility to respect local cultures, and the bravery to take that first solo step."
                )}
              </p>
            </div>
          </div>

          {/* 4 Pillars of the NDSOLOTRAVEL Ethos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-accent">
                01
              </div>
              <h3 className="font-display font-bold text-base text-foreground">
                {t("Courage Over Perfection")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  "Waiting for the perfect conditions means you will never leave. Embrace the incomplete plan and let the road teach you."
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-accent">
                02
              </div>
              <h3 className="font-display font-bold text-base text-foreground">
                {t("Slow & Immersive")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  "Linger in roadside dhabas, walk through quiet morning alleys, and observe life unfolding without rushing to the next spot."
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-accent">
                03
              </div>
              <h3 className="font-display font-bold text-base text-foreground">
                {t("Leave No Trace")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  "Extreme alpine environments are deeply fragile. Respect wildlife, pack out all waste, and tread with environmental humility."
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-accent">
                04
              </div>
              <h3 className="font-display font-bold text-base text-foreground">
                {t("Humility & Gratitude")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  "As travellers, we are guests in other people's homes and sacred landscapes. Treat every host and stranger with honor."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            7. 27 COUNTRIES & 3 CONTINENTS (EXPEDITION MILESTONES)
           ------------------------------------------------------------- */}
        <section className="rounded-3xl border border-border/80 bg-muted/30 p-8 sm:p-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/60">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <Globe className="w-3.5 h-3.5 text-accent" />
                <span>{t("Global Footprint")}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {t("27 Countries and 3 Continents")}
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              {t(
                "A continuous journey of overland motorcycle crossings, mountain passes, and desert horizons across Asia, Europe, and beyond."
              )}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-1">
              <p className="font-display text-4xl sm:text-5xl font-black text-brand tracking-tight">
                27
              </p>
              <h4 className="text-sm font-bold text-foreground">{t("Countries Explored")}</h4>
              <p className="text-xs text-muted-foreground">
                {t("Independent overland & solo travel")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-1">
              <p className="font-display text-4xl sm:text-5xl font-black text-brand tracking-tight">
                3
              </p>
              <h4 className="text-sm font-bold text-foreground">{t("Continents Traversed")}</h4>
              <p className="text-xs text-muted-foreground">
                {t("From Central Asia to Europe")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-1">
              <p className="font-display text-4xl sm:text-5xl font-black text-brand tracking-tight">
                5,000m+
              </p>
              <h4 className="text-sm font-bold text-foreground">{t("Highest Alpine Altitude")}</h4>
              <p className="text-xs text-muted-foreground">
                {t("Himalayan & Karakoram passes")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-1">
              <p className="font-display text-4xl sm:text-5xl font-black text-brand tracking-tight">
                50,000+
              </p>
              <h4 className="text-sm font-bold text-foreground">{t("Kilometers Ridden")}</h4>
              <p className="text-xs text-muted-foreground">{t("Autonomous motorcycle routes")}</p>
            </div>
          </div>

          {/* Terrain & Route Badges */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("Notable Expeditions & Terrains Explored:")}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Karakoram Highway",
                "Baltoro Glacier & K2 Base Camp",
                "Fairy Meadows & Nanga Parbat",
                "Deosai High Plains",
                "Khunjerab Pass (Pakistan-China)",
                "Hunza & Nagar Valleys",
                "Phander & Shandur Pass",
                "Hindu Kush Trails",
                "Silk Road Mountain Passes",
                "European Alpine Passes",
                "Mediterranean Coastal Highways",
                "Middle Eastern Deserts",
              ].map((loc) => (
                <span
                  key={loc}
                  className="px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium text-foreground/90 shadow-2xs hover:border-accent/40 transition-colors"
                >
                  {t(loc)}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            8. WHAT YOU WILL FIND ON NDSOLOTRAVEL
           ------------------------------------------------------------- */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>{t("Content & Community")}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t("What You Will Find on NDSOLOTRAVEL")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {t(
                "A collection of unfiltered stories, practical logistics, and visual essays designed to inspire your own independent journeys."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Stories */}
            <Link
              to="/blog"
              className="group p-6 rounded-3xl border border-border/80 bg-card hover:border-brand/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                  {t("Expedition Stories")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t(
                    "Long-form field journals written from mountain tents and roadside stops. Real challenges, honest reflections, and unfiltered adventure."
                  )}
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-accent gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t("Read Stories")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Card 2: Destinations */}
            <Link
              to="/destinations"
              className="group p-6 rounded-3xl border border-border/80 bg-card hover:border-brand/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                  {t("Destination Guides")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t(
                    "Actionable motorcycle routes, high-altitude trail itineraries, road condition updates, permit advice, and solo safety notes."
                  )}
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-accent gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t("Explore Guides")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Card 3: Gallery */}
            <Link
              to="/gallery"
              className="group p-6 rounded-3xl border border-border/80 bg-card hover:border-brand/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                  {t("Visual Gallery")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t(
                    "Curated landscape and documentary photographs capturing golden hours on mountain peaks, nomadic faces, and rugged terrain."
                  )}
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-accent gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t("View Gallery")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Card 4: Interactive Map */}
            <Link
              to="/map"
              className="group p-6 rounded-3xl border border-border/80 bg-card hover:border-brand/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Navigation className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                  {t("Interactive Map")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t(
                    "Interactive geographical tracking of expedition waypoints, high-altitude passes, camp coordinates, and travel milestones."
                  )}
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-accent gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t("Open Map")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* -------------------------------------------------------------
            9. CALL TO ACTION / CONNECT
           ------------------------------------------------------------- */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-8 sm:p-14 lg:p-16 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent">
              <Flag className="w-3.5 h-3.5" />
              <span>{t("Join The Journey")}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t("The Road Is Always Calling.")}
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
              {t(
                "Whether you are planning your first solo motorcycle journey, preparing for a high-altitude trek, or simply looking for honest advice on routes and gear, I am always glad to connect with fellow travellers."
              )}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20"
              >
                <span>{t("Explore Stories")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <span>{t("View Destinations")}</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-white/20 text-white/90 font-semibold text-sm hover:text-white hover:border-white/40 transition-colors"
              >
                <Send className="w-4 h-4 text-accent" />
                <span>{t("Send a Message")}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
