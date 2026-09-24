import { z } from "zod";

export interface ResponsiveValues<T> {
  desktop: T;
  tablet: T;
  mobile: T;
}

export interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  navigationFont: string;
  buttonFont: string;
  headingWeight: string;
  bodyWeight: string;
  bodySize: ResponsiveValues<number>;
  lineHeight: ResponsiveValues<number>;
  letterSpacing: ResponsiveValues<number>;
  headingLetterSpacing: number;
}

export interface GoogleFontOption {
  name: string;
  category: "Serif (Editorial)" | "Sans-Serif (Modern)" | "Adventure & Display";
  weights: number[];
  fallback: string;
  vibe: string;
  recommendedFor: ("heading" | "body" | "navigation" | "button")[];
}

export const CURATED_GOOGLE_FONTS: GoogleFontOption[] = [
  // Editorial Serifs
  {
    name: "Playfair Display",
    category: "Serif (Editorial)",
    weights: [400, 500, 600, 700, 800, 900],
    fallback: 'Georgia, Cambria, "Times New Roman", serif',
    vibe: "High-contrast, timeless magazine editorial elegance (Default)",
    recommendedFor: ["heading"],
  },
  {
    name: "Cinzel",
    category: "Serif (Editorial)",
    weights: [400, 500, 600, 700, 800, 900],
    fallback: '"Times New Roman", Times, serif',
    vibe: "Majestic, classical Roman proportions with cinematic gravitas",
    recommendedFor: ["heading", "button", "navigation"],
  },
  {
    name: "Cormorant Garamond",
    category: "Serif (Editorial)",
    weights: [300, 400, 500, 600, 700],
    fallback: 'Garamond, "Times New Roman", serif',
    vibe: "Refined, poetic, traditional travel essay & literary journals",
    recommendedFor: ["heading", "body"],
  },
  {
    name: "Lora",
    category: "Serif (Editorial)",
    weights: [400, 500, 600, 700],
    fallback: 'Georgia, "Times New Roman", serif',
    vibe: "Warm, calligraphic curves, superb long-form reading comfort",
    recommendedFor: ["heading", "body"],
  },
  {
    name: "Merriweather",
    category: "Serif (Editorial)",
    weights: [300, 400, 700, 900],
    fallback: 'Georgia, "Times New Roman", serif',
    vibe: "Sturdy, highly legible on screens, adventure journalism",
    recommendedFor: ["heading", "body"],
  },
  {
    name: "EB Garamond",
    category: "Serif (Editorial)",
    weights: [400, 500, 600, 700, 800],
    fallback: 'Garamond, "Times New Roman", serif',
    vibe: "Classic humanist masterpiece, historic expeditions & field logs",
    recommendedFor: ["heading", "body"],
  },
  {
    name: "Bodoni Moda",
    category: "Serif (Editorial)",
    weights: [400, 500, 600, 700, 800, 900],
    fallback: '"Didot", "Bodoni MT", serif',
    vibe: "Ultra-luxury fashion & high-end travel aesthetics",
    recommendedFor: ["heading"],
  },
  {
    name: "DM Serif Display",
    category: "Serif (Editorial)",
    weights: [400],
    fallback: 'Georgia, "Times New Roman", serif',
    vibe: "Bold, modern, punchy editorial headlines with delicate serifs",
    recommendedFor: ["heading"],
  },
  {
    name: "Prata",
    category: "Serif (Editorial)",
    weights: [400],
    fallback: '"Didot", "Bodoni MT", serif',
    vibe: "Elegant teardrop terminals, art gallery & photography showcase",
    recommendedFor: ["heading"],
  },
  {
    name: "Newsreader",
    category: "Serif (Editorial)",
    weights: [300, 400, 500, 600, 700, 800],
    fallback: 'Georgia, serif',
    vibe: "Created for continuous editorial longform immersion",
    recommendedFor: ["heading", "body"],
  },
  {
    name: "Castoro",
    category: "Serif (Editorial)",
    weights: [400],
    fallback: 'Georgia, serif',
    vibe: "Rich Dutch-style academic serif with rugged craftsmanship",
    recommendedFor: ["heading", "body"],
  },

  // Modern & Clean Sans-Serifs
  {
    name: "Roboto",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 700, 900],
    fallback: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    vibe: "Clean, geometric-grotesque standard with maximum clarity (Default)",
    recommendedFor: ["body", "navigation", "button", "heading"],
  },
  {
    name: "Inter",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800],
    fallback: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
    vibe: "World-class modern digital UI standard, ultra-crisp tall x-height",
    recommendedFor: ["body", "navigation", "button", "heading"],
  },
  {
    name: "Outfit",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800, 900],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Futuristic, stylish geometric sans inspired by adventurous UI",
    recommendedFor: ["heading", "body", "navigation", "button"],
  },
  {
    name: "Plus Jakarta Sans",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Modern European neo-grotesk with sophisticated clean lines",
    recommendedFor: ["heading", "body", "navigation", "button"],
  },
  {
    name: "Montserrat",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800, 900],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Architectural, bold urban energy, iconic posters and wayfinding",
    recommendedFor: ["heading", "button", "navigation"],
  },
  {
    name: "Space Grotesk",
    category: "Adventure & Display",
    weights: [300, 400, 500, 600, 700],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Technical, adventurous explorer aesthetic with idiosyncratic forms",
    recommendedFor: ["heading", "button", "navigation"],
  },
  {
    name: "Raleway",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800, 900],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Elegant, distinctive art-deco touches with airy letterforms",
    recommendedFor: ["heading", "navigation", "button"],
  },
  {
    name: "Work Sans",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Early grotesk designed specifically for high-density information",
    recommendedFor: ["body", "navigation", "button"],
  },
  {
    name: "DM Sans",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800, 900],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Balanced, geometric, minimal and contemporary",
    recommendedFor: ["body", "navigation", "button"],
  },
  {
    name: "Urbanist",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800, 900],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Geometric low-contrast sans with a clean digital nomad feel",
    recommendedFor: ["heading", "body", "navigation", "button"],
  },
  {
    name: "Barlow",
    category: "Adventure & Display",
    weights: [300, 400, 500, 600, 700, 800],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Slightly rounded California highway & trail marker sign design",
    recommendedFor: ["heading", "navigation", "button"],
  },
  {
    name: "Syne",
    category: "Adventure & Display",
    weights: [400, 500, 600, 700, 800],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Avant-garde, expressive display sans for artistic storytelling",
    recommendedFor: ["heading"],
  },
  {
    name: "Manrope",
    category: "Sans-Serif (Modern)",
    weights: [300, 400, 500, 600, 700, 800],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Open-source semi-grotesque with warm geometric balance",
    recommendedFor: ["body", "navigation", "button", "heading"],
  },
  {
    name: "Oswald",
    category: "Adventure & Display",
    weights: [300, 400, 500, 600, 700],
    fallback: 'ui-sans-serif, system-ui, sans-serif',
    vibe: "Condensed bold headline style, great for rugged adventure banners",
    recommendedFor: ["heading", "button"],
  },
];

export const DEFAULT_TYPOGRAPHY_CONFIG: TypographyConfig = {
  headingFont: "Playfair Display",
  bodyFont: "Roboto",
  navigationFont: "Roboto",
  buttonFont: "Roboto",
  headingWeight: "700",
  bodyWeight: "400",
  bodySize: {
    desktop: 17,
    tablet: 16,
    mobile: 15,
  },
  lineHeight: {
    desktop: 1.7,
    tablet: 1.65,
    mobile: 1.6,
  },
  letterSpacing: {
    desktop: 0,
    tablet: 0,
    mobile: 0,
  },
  headingLetterSpacing: -0.02,
};

export const typographySchema = z.object({
  headingFont: z.string().min(1),
  bodyFont: z.string().min(1),
  navigationFont: z.string().min(1),
  buttonFont: z.string().min(1),
  headingWeight: z.string().min(1),
  bodyWeight: z.string().min(1),
  bodySize: z.object({
    desktop: z.number().min(12).max(28),
    tablet: z.number().min(12).max(26),
    mobile: z.number().min(11).max(24),
  }),
  lineHeight: z.object({
    desktop: z.number().min(1.1).max(2.4),
    tablet: z.number().min(1.1).max(2.4),
    mobile: z.number().min(1.1).max(2.4),
  }),
  letterSpacing: z.object({
    desktop: z.number().min(-0.1).max(0.2),
    tablet: z.number().min(-0.1).max(0.2),
    mobile: z.number().min(-0.1).max(0.2),
  }),
  headingLetterSpacing: z.number().min(-0.1).max(0.2).default(-0.02),
});

export function parseTypographyConfig(raw: unknown): TypographyConfig {
  if (!raw) return DEFAULT_TYPOGRAPHY_CONFIG;
  try {
    let parsed = raw;
    if (typeof raw === "string") {
      parsed = JSON.parse(raw);
    }
    const result = typographySchema.safeParse(parsed);
    if (result.success) {
      return result.data;
    }
    // Partial merge with default
    if (typeof parsed === "object" && parsed !== null) {
      const obj = parsed as Record<string, any>;
      return {
        headingFont: obj.headingFont || DEFAULT_TYPOGRAPHY_CONFIG.headingFont,
        bodyFont: obj.bodyFont || DEFAULT_TYPOGRAPHY_CONFIG.bodyFont,
        navigationFont: obj.navigationFont || DEFAULT_TYPOGRAPHY_CONFIG.navigationFont,
        buttonFont: obj.buttonFont || DEFAULT_TYPOGRAPHY_CONFIG.buttonFont,
        headingWeight: obj.headingWeight || DEFAULT_TYPOGRAPHY_CONFIG.headingWeight,
        bodyWeight: obj.bodyWeight || DEFAULT_TYPOGRAPHY_CONFIG.bodyWeight,
        bodySize: {
          desktop: Number(obj.bodySize?.desktop) || DEFAULT_TYPOGRAPHY_CONFIG.bodySize.desktop,
          tablet: Number(obj.bodySize?.tablet) || DEFAULT_TYPOGRAPHY_CONFIG.bodySize.tablet,
          mobile: Number(obj.bodySize?.mobile) || DEFAULT_TYPOGRAPHY_CONFIG.bodySize.mobile,
        },
        lineHeight: {
          desktop: Number(obj.lineHeight?.desktop) || DEFAULT_TYPOGRAPHY_CONFIG.lineHeight.desktop,
          tablet: Number(obj.lineHeight?.tablet) || DEFAULT_TYPOGRAPHY_CONFIG.lineHeight.tablet,
          mobile: Number(obj.lineHeight?.mobile) || DEFAULT_TYPOGRAPHY_CONFIG.lineHeight.mobile,
        },
        letterSpacing: {
          desktop: Number(obj.letterSpacing?.desktop) || DEFAULT_TYPOGRAPHY_CONFIG.letterSpacing.desktop,
          tablet: Number(obj.letterSpacing?.tablet) || DEFAULT_TYPOGRAPHY_CONFIG.letterSpacing.tablet,
          mobile: Number(obj.letterSpacing?.mobile) || DEFAULT_TYPOGRAPHY_CONFIG.letterSpacing.mobile,
        },
        headingLetterSpacing:
          Number(obj.headingLetterSpacing) !== undefined && !isNaN(Number(obj.headingLetterSpacing))
            ? Number(obj.headingLetterSpacing)
            : DEFAULT_TYPOGRAPHY_CONFIG.headingLetterSpacing,
      };
    }
    return DEFAULT_TYPOGRAPHY_CONFIG;
  } catch {
    return DEFAULT_TYPOGRAPHY_CONFIG;
  }
}

export function getFontFallback(fontName: string): string {
  const found = CURATED_GOOGLE_FONTS.find((f) => f.name.toLowerCase() === fontName.toLowerCase());
  if (found) return found.fallback;
  return 'ui-sans-serif, system-ui, -apple-system, sans-serif';
}

/**
 * Builds an optimized Google Fonts URL loading ONLY the selected fonts
 * and required weights to eliminate unnecessary network payload.
 */
export function generateGoogleFontsUrl(config: TypographyConfig): string | null {
  const selectedFonts = new Set([
    config.headingFont,
    config.bodyFont,
    config.navigationFont,
    config.buttonFont,
  ]);

  const familyParams: string[] = [];

  for (const fontName of selectedFonts) {
    if (!fontName) continue;
    const fontMeta = CURATED_GOOGLE_FONTS.find(
      (f) => f.name.toLowerCase() === fontName.toLowerCase(),
    );

    const weights = new Set<number>();

    // If used as heading
    if (config.headingFont.toLowerCase() === fontName.toLowerCase()) {
      const hw = parseInt(config.headingWeight, 10);
      if (!isNaN(hw)) weights.add(hw);
      weights.add(600);
      weights.add(700);
    }

    // If used as body
    if (config.bodyFont.toLowerCase() === fontName.toLowerCase()) {
      const bw = parseInt(config.bodyWeight, 10);
      if (!isNaN(bw)) weights.add(bw);
      weights.add(400);
      weights.add(500);
      weights.add(600);
    }

    // If used as nav or button
    if (
      config.navigationFont.toLowerCase() === fontName.toLowerCase() ||
      config.buttonFont.toLowerCase() === fontName.toLowerCase()
    ) {
      weights.add(400);
      weights.add(500);
      weights.add(600);
      weights.add(700);
    }

    // Filter available weights according to font definition if known
    let finalWeights = Array.from(weights).sort((a, b) => a - b);
    if (fontMeta && fontMeta.weights.length > 0) {
      const availableSet = new Set(fontMeta.weights);
      const filtered = finalWeights.filter((w) => availableSet.has(w));
      finalWeights = filtered.length > 0 ? filtered : [fontMeta.weights[0]];
    }

    const encodedName = fontName.trim().replace(/\s+/g, "+");
    if (finalWeights.length > 0) {
      familyParams.push(`family=${encodedName}:wght@${finalWeights.join(";")}`);
    } else {
      familyParams.push(`family=${encodedName}`);
    }
  }

  if (familyParams.length === 0) return null;
  return `https://fonts.googleapis.com/css2?${familyParams.join("&")}&display=swap`;
}

/**
 * Generates dynamic CSS variables and centralized bindings for the website.
 */
export function generateTypographyCss(config: TypographyConfig, selector = ":root"): string {
  const headingFallback = getFontFallback(config.headingFont);
  const bodyFallback = getFontFallback(config.bodyFont);
  const navFallback = getFontFallback(config.navigationFont);
  const buttonFallback = getFontFallback(config.buttonFont);

  return `
${selector} {
  --font-display: "Roboto Numbers", "${config.headingFont}", ${headingFallback};
  --font-sans: "${config.bodyFont}", ${bodyFallback};
  --font-nav: "${config.navigationFont}", ${navFallback};
  --font-button: "${config.buttonFont}", ${buttonFallback};
  --font-weight-heading: ${config.headingWeight};
  --font-weight-body: ${config.bodyWeight};
  --font-size-body: ${config.bodySize.desktop}px;
  --line-height-body: ${config.lineHeight.desktop};
  --letter-spacing-body: ${config.letterSpacing.desktop}em;
  --letter-spacing-heading: ${config.headingLetterSpacing}em;
}

@media (max-width: 1024px) {
  ${selector} {
    --font-size-body: ${config.bodySize.tablet}px;
    --line-height-body: ${config.lineHeight.tablet};
    --letter-spacing-body: ${config.letterSpacing.tablet}em;
  }
}

@media (max-width: 640px) {
  ${selector} {
    --font-size-body: ${config.bodySize.mobile}px;
    --line-height-body: ${config.lineHeight.mobile};
    --letter-spacing-body: ${config.letterSpacing.mobile}em;
  }
}
`;
}
