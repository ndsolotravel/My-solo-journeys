import { createFileRoute } from "@tanstack/react-router";
import portraitAsset from "@/assets/ndsolotravel-portrait.jpeg.asset.json";
import { useMemo } from "react";
import { useTranslator } from "@/lib/translate/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ndsolotravel" },
      {
        name: "description",
        content:
          "About ndsolotravel — solo adventure traveller, motorcyclist, photographer, mountain person.",
      },
      { property: "og:title", content: "About — ndsolotravel" },
      { property: "og:description", content: "About the solo traveller behind ndsolotravel." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { year: "2017", text: "First solo motorcycle ride across the Karakoram Highway." },
  { year: "2019", text: "Trek to Concordia and K2 Base Camp." },
  { year: "2021", text: "Three weeks alone at Nanga Parbat Base Camp." },
  { year: "2023", text: "Crossed five borders by bike — Pakistan to Central Asia." },
  { year: "2025", text: "Started ndsolotravel to share what the road taught me." },
];

const ABOUT_TEXTS = [
  "About",
  "Solo, slow, and almost always uphill.",
  "The journey so far",
  "Travel philosophy",
  "Solo travel is where the journey becomes the destination",
] as const;

const BIO = [
  "Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world, discovering new places, and experiencing the freedom of traveling solo.",
  "I am a solo traveler and an Engineer by profession. While engineering has shaped the way I think, solve problems, and plan, traveling has taught me to be curious, adaptable, independent, and open to the unexpected.",
  "For me, solo travel is more than simply visiting new destinations. It is about getting away from the familiar, riding unfamiliar roads, hiking through remote landscapes, meeting people from different backgrounds, and creating experiences that stay with you long after the journey ends.",
  "Through NDSOLOTRAVEL, I share my journeys, motorcycle adventures, hiking experiences, destinations, travel stories, photographs, and the lessons I discover along the way.",
  "I believe you do not always need a group, a perfect plan, or a luxury itinerary to explore the world. Sometimes, all you need is the courage to start, an open mind, and the willingness to take the road less travelled.",
  "Travel is my way of discovering the world, challenging myself, and continuing to learn beyond the boundaries of everyday life.",
];

function AboutPage() {
  const texts = useMemo(() => [...ABOUT_TEXTS, ...BIO, ...TIMELINE.map((t) => t.text)], []);
  const t = useTranslator(texts);
  return (
    <>
      <section className="relative h-[45vh] min-h-[280px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80"
          alt="Traveller on a mountain ridge"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("About")}</p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("Solo, slow, and almost always uphill.")}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="sr-only">{t("Solo, slow, and almost always uphill.")}</h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_2fr]">
          <img
            src={portraitAsset.url}
            alt="ndsolotravel portrait"
            className="aspect-[3/4] w-full rounded-3xl object-cover"
          />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            {BIO.map((p) => (
              <p key={p}>{t(p)}</p>
            ))}
          </div>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold">{t("The journey so far")}</h2>
          <ol className="mt-8 space-y-6 border-l-2 border-border pl-6">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-accent" />
                <p className="font-display text-sm font-bold text-accent">{item.year}</p>
                <p className="mt-1 text-muted-foreground">{t(item.text)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 rounded-3xl bg-muted/40 p-8">
          <h2 className="font-display text-2xl font-bold">{t("Travel philosophy")}</h2>
          <p className="mt-4 text-lg italic leading-relaxed text-muted-foreground">
            {t("Solo travel is where the journey becomes the destination")}
          </p>
        </section>
      </div>
    </>
  );
}
