import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GsapRevealOptions {
  start?: string;
  once?: boolean;
  scrubParallax?: boolean;
  stagger?: number;
  duration?: number;
}

/**
 * Joby-Inspired Cinematic Scroll Reveal hook.
 * Orchestrates:
 * - kinetic-title / heading: masked or fluid upward fade with power3.out
 * - divider: elegant scaleX wipe from 0 -> 1
 * - card: scale 0.98 -> 1, y 28 -> 0, opacity 0 -> 1 with staggered rhythm
 * - featured: hero story card reveal with subtle elevation
 * - info / badge: secondary detail reveal
 * - [data-parallax-img]: smooth scrubbed parallax depth effect
 * Respects prefers-reduced-motion.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  options: GsapRevealOptions = {}
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const headings = root.querySelectorAll<HTMLElement>('[data-reveal="heading"]');
      const kineticTitles = root.querySelectorAll<HTMLElement>('[data-reveal="kinetic-title"]');
      const dividers = root.querySelectorAll<HTMLElement>('[data-reveal="divider"]');
      const cards = root.querySelectorAll<HTMLElement>('[data-reveal="card"]');
      const featured = root.querySelectorAll<HTMLElement>('[data-reveal="featured"]');
      const info = root.querySelectorAll<HTMLElement>('[data-reveal="info"]');
      const parallaxImgs = root.querySelectorAll<HTMLElement>('[data-parallax-img]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: options.start || "top 85%",
          once: options.once !== undefined ? options.once : true,
        },
      });

      if (headings.length > 0) {
        tl.from(headings, {
          opacity: 0,
          y: 28,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
        });
      }

      if (kineticTitles.length > 0) {
        tl.from(
          kineticTitles,
          {
            opacity: 0,
            y: 35,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.7"
        );
      }

      if (dividers.length > 0) {
        tl.from(
          dividers,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }

      if (featured.length > 0) {
        tl.from(
          featured,
          {
            opacity: 0,
            y: 30,
            scale: 0.98,
            duration: 0.9,
            ease: "power3.out",
            onStart: () => {
              featured.forEach((el) => el.classList.add("is-glowing"));
            },
          },
          "-=0.5"
        );
      }

      if (cards.length > 0) {
        tl.from(
          cards,
          {
            opacity: 0,
            y: 28,
            scale: 0.985,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
          },
          "-=0.6"
        );
      }

      if (info.length > 0) {
        tl.from(
          info,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
          },
          "-=0.5"
        );
      }

      // Smooth scroll scrubbed parallax for background or editorial images
      if (parallaxImgs.length > 0 && options.scrubParallax !== false) {
        parallaxImgs.forEach((img) => {
          const speed = parseFloat(img.getAttribute("data-parallax-speed") || "10");
          gsap.fromTo(
            img,
            { yPercent: -speed },
            {
              yPercent: speed,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement || img,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });
      }
    }, root);

    return () => ctx.revert();
  }, [options.start, options.once, options.scrubParallax]);

  return ref;
}
