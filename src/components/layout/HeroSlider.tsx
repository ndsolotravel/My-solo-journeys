import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
};

type Props = {
  slides: HeroSlide[];
  intervalMs?: number;
  className?: string;
};

export function HeroSlider({ slides, intervalMs = 10000, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  return (
    <div className={`hero-banner group/hero absolute inset-0 overflow-hidden ${className}`}>
      {slides.map((slide, i) => (
        <img
          key={`${slide.src}-${i}`}
          src={slide.src}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = "true";
              target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80";
            }
          }}
          className={`hero-banner-image absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-1000 ease-in-out animate-ken-burns ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80 pointer-events-none z-10" />

      {count > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
