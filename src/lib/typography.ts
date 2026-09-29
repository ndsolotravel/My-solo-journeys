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

  // Independent Script Font Settings (for Home Hero headline & editorial accents)
  scriptFont: string;
  scriptWeight: string;
  scriptSize: ResponsiveValues<number>;
  scriptLineHeight: ResponsiveValues<number>;
  scriptLetterSpacing: ResponsiveValues<number>;
}

export interface GoogleFontOption {
  name: string;
  category: "Serif (Editorial)" | "Sans-Serif (Modern)" | "Adventure & Display" | "Script & Handwritten";
  weights: number[];
  fallback: string;
  vibe: string;
  recommendedFor: ("heading" | "body" | "navigation" | "button" | "script")[];
}

export interface ScriptFontOption {
  name: string;
  googleFamily: string;
  weights: number[];
  fallback: string;
  description: string;
}

export const CURATED_SCRIPT_FONTS: ScriptFontOption[] = [
  {
    name: "Yuyu Short",
    googleFamily: "Yuyu Short",
    weights: [400],
    fallback: "cursive, sans-serif",
    description: "Slender, stylized handwritten display typeface (Default Hero Headline)",
  },
  {
    name: "Indie Flower",
    googleFamily: "Indie Flower",
    weights: [400],
    fallback: "cursive, sans-serif",
    description: "Carefree, bubbly handwriting with open curves and relaxed charm",
  },
  {
    name: "Gluten",
    googleFamily: "Gluten",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    fallback: "cursive, sans-serif",
    description: "Expressive variable typeface with fluid organic rhythm",
  },
  {
    name: "Playwrite Australia QLD",
    googleFamily: "Playwrite AU QLD",
    weights: [100, 200, 300, 400],
    fallback: "cursive",
    description: "Refined cursive script reflecting Queensland school handwriting tradition",
  },
  {
    name: "Playwrite France Moderne",
    googleFamily: "Playwrite FR Moderne",
    weights: [100, 200, 300, 400],
    fallback: "cursive",
    description: "Modern French cursive style with fluid elegance and poise",
  },
  {
    name: "Edu Australia VIC WA NT Hand",
    googleFamily: "Edu AU VIC WA NT Hand",
    weights: [400, 500, 600, 700],
    fallback: "cursive, sans-serif",
    description: "Authentic Australian handwriting standard with crisp legibility",
  },
  {
    name: "Yellowtail",
    googleFamily: "Yellowtail",
    weights: [400],
    fallback: "cursive",
    description: "Medium-weight retro flat brush script with connected letterforms",
  },
  {
    name: "Sue Ellen Francisco",
    googleFamily: "Sue Ellen Francisco",
    weights: [400],
    fallback: "cursive",
    description: "Tall, slender, whimsical handwriting with great personal warmth",
  },
];

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

  // Script & Display Fonts
  {
    name: "Yuyu Short",
    category: "Script & Handwritten",
    weights: [400],
    fallback: "cursive, sans-serif",
    vibe: "Slender, stylized handwritten display font for cinematic hero headlines",
    recommendedFor: ["script", "heading"],
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

  // Independent Script Font defaults (Yuyu Short Hero headline)
  scriptFont: "Yuyu Short",
  scriptWeight: "400",
  scriptSize: {
    desktop: 26,
    tablet: 22,
    mobile: 19,
  },
  scriptLineHeight: {
    desktop: 1.3,
    tablet: 1.25,
    mobile: 1.2,
  },
  scriptLetterSpacing: {
    desktop: 0.01,
    tablet: 0.005,
    mobile: 0,
  },
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

  // Independent Script Font validation
  scriptFont: z.string().min(1).default("Yuyu Short"),
  scriptWeight: z.string().min(1).default("400"),
  scriptSize: z
    .object({
      desktop: z.number().min(12).max(48),
      tablet: z.number().min(12).max(42),
      mobile: z.number().min(11).max(36),
    })
    .default({ desktop: 26, tablet: 22, mobile: 19 }),
  scriptLineHeight: z
    .object({
      desktop: z.number().min(0.9).max(2.4),
      tablet: z.number().min(0.9).max(2.4),
      mobile: z.number().min(0.9).max(2.4),
    })
    .default({ desktop: 1.3, tablet: 1.25, mobile: 1.2 }),
  scriptLetterSpacing: z
    .object({
      desktop: z.number().min(-0.1).max(0.2),
      tablet: z.number().min(-0.1).max(0.2),
      mobile: z.number().min(-0.1).max(0.2),
    })
    .default({ desktop: 0.01, tablet: 0.005, mobile: 0 }),
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
    // Partial merge with defaults
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

        // Script font merge
        scriptFont: obj.scriptFont || DEFAULT_TYPOGRAPHY_CONFIG.scriptFont,
        scriptWeight: obj.scriptWeight || DEFAULT_TYPOGRAPHY_CONFIG.scriptWeight,
        scriptSize: {
          desktop: Number(obj.scriptSize?.desktop) || DEFAULT_TYPOGRAPHY_CONFIG.scriptSize.desktop,
          tablet: Number(obj.scriptSize?.tablet) || DEFAULT_TYPOGRAPHY_CONFIG.scriptSize.tablet,
          mobile: Number(obj.scriptSize?.mobile) || DEFAULT_TYPOGRAPHY_CONFIG.scriptSize.mobile,
        },
        scriptLineHeight: {
          desktop: Number(obj.scriptLineHeight?.desktop) || DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight.desktop,
          tablet: Number(obj.scriptLineHeight?.tablet) || DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight.tablet,
          mobile: Number(obj.scriptLineHeight?.mobile) || DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight.mobile,
        },
        scriptLetterSpacing: {
          desktop:
            Number(obj.scriptLetterSpacing?.desktop) !== undefined &&
            !isNaN(Number(obj.scriptLetterSpacing?.desktop))
              ? Number(obj.scriptLetterSpacing?.desktop)
              : DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing.desktop,
          tablet:
            Number(obj.scriptLetterSpacing?.tablet) !== undefined &&
            !isNaN(Number(obj.scriptLetterSpacing?.tablet))
              ? Number(obj.scriptLetterSpacing?.tablet)
              : DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing.tablet,
          mobile:
            Number(obj.scriptLetterSpacing?.mobile) !== undefined &&
            !isNaN(Number(obj.scriptLetterSpacing?.mobile))
              ? Number(obj.scriptLetterSpacing?.mobile)
              : DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing.mobile,
        },
      };
    }
    return DEFAULT_TYPOGRAPHY_CONFIG;
  } catch {
    return DEFAULT_TYPOGRAPHY_CONFIG;
  }
}

export function getFontFallback(fontName: string): string {
  const foundScript = CURATED_SCRIPT_FONTS.find(
    (f) => f.name.toLowerCase() === fontName.toLowerCase() || f.googleFamily.toLowerCase() === fontName.toLowerCase(),
  );
  if (foundScript) return foundScript.fallback;

  const found = CURATED_GOOGLE_FONTS.find((f) => f.name.toLowerCase() === fontName.toLowerCase());
  if (found) return found.fallback;
  return 'ui-sans-serif, system-ui, -apple-system, sans-serif';
}

export function resolveGoogleFamily(fontName: string): { family: string; weights: number[]; fallback: string } {
  const foundScript = CURATED_SCRIPT_FONTS.find(
    (f) => f.name.toLowerCase() === fontName.toLowerCase() || f.googleFamily.toLowerCase() === fontName.toLowerCase(),
  );
  if (foundScript) {
    return {
      family: foundScript.googleFamily,
      weights: foundScript.weights,
      fallback: foundScript.fallback,
    };
  }

  const found = CURATED_GOOGLE_FONTS.find((f) => f.name.toLowerCase() === fontName.toLowerCase());
  if (found) {
    return {
      family: found.name,
      weights: found.weights,
      fallback: found.fallback,
    };
  }

  return {
    family: fontName,
    weights: [400],
    fallback: "cursive, sans-serif",
  };
}

/**
 * Builds an optimized Google Fonts URL loading ONLY the selected fonts
 * and required weights to eliminate unnecessary network payload.
 */
export function generateGoogleFontsUrl(config: TypographyConfig): string | null {
  // Collect all unique font names
  const fontSlotMap = new Map<string, Set<number>>();

  const addFont = (name: string, requestedWeights: number[]) => {
    if (!name) return;
    const resolved = resolveGoogleFamily(name);
    const existing = fontSlotMap.get(resolved.family) || new Set<number>();

    for (const w of requestedWeights) {
      if (resolved.weights.includes(w)) {
        existing.add(w);
      } else if (resolved.weights.length > 0) {
        existing.add(resolved.weights[0]);
      }
    }
    if (existing.size === 0 && resolved.weights.length > 0) {
      existing.add(resolved.weights[0]);
    }
    fontSlotMap.set(resolved.family, existing);
  };

  // Heading Font
  const hw = parseInt(config.headingWeight, 10);
  addFont(config.headingFont, [!isNaN(hw) ? hw : 700, 600, 700]);

  // Body Font
  const bw = parseInt(config.bodyWeight, 10);
  addFont(config.bodyFont, [!isNaN(bw) ? bw : 400, 400, 500]);

  // Navigation Font
  addFont(config.navigationFont, [400, 500, 600]);

  // Button Font
  addFont(config.buttonFont, [400, 500, 600, 700]);

  // Script Font (specifically for Hero headline & accents)
  const sw = parseInt(config.scriptWeight, 10);
  addFont(config.scriptFont || "Yuyu Short", [!isNaN(sw) ? sw : 400]);

  const familyParams: string[] = [];

  for (const [family, weightsSet] of fontSlotMap.entries()) {
    const weights = Array.from(weightsSet).sort((a, b) => a - b);
    const encodedName = family.trim().replace(/\s+/g, "+");

    // Check if the font has fixed single 400 weight or multiple
    if (weights.length > 0 && !(weights.length === 1 && weights[0] === 400)) {
      familyParams.push(`family=${encodedName}:wght@${weights.join(";")}`);
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

  const scriptInfo = resolveGoogleFamily(config.scriptFont || "Yuyu Short");

  const sSize = config.scriptSize || DEFAULT_TYPOGRAPHY_CONFIG.scriptSize;
  const sLineHeight = config.scriptLineHeight || DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight;
  const sLetterSpacing = config.scriptLetterSpacing || DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing;

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

  /* Independent Script Font Variables (Home Hero Headline & Accents) */
  --font-hero-script: "${scriptInfo.family}", ${scriptInfo.fallback};
  --font-script: var(--font-hero-script);
  --font-weight-script: ${config.scriptWeight || "400"};
  --font-size-hero-script: ${sSize.desktop}px;
  --line-height-hero-script: ${sLineHeight.desktop};
  --letter-spacing-hero-script: ${sLetterSpacing.desktop}em;
}

@media (max-width: 1024px) {
  ${selector} {
    --font-size-body: ${config.bodySize.tablet}px;
    --line-height-body: ${config.lineHeight.tablet};
    --letter-spacing-body: ${config.letterSpacing.tablet}em;
    --font-size-hero-script: ${sSize.tablet}px;
    --line-height-hero-script: ${sLineHeight.tablet};
    --letter-spacing-hero-script: ${sLetterSpacing.tablet}em;
  }
}

@media (max-width: 640px) {
  ${selector} {
    --font-size-body: ${config.bodySize.mobile}px;
    --line-height-body: ${config.lineHeight.mobile};
    --letter-spacing-body: ${config.letterSpacing.mobile}em;
    --font-size-hero-script: ${sSize.mobile}px;
    --line-height-hero-script: ${sLineHeight.mobile};
    --letter-spacing-hero-script: ${sLetterSpacing.mobile}em;
  }
}
`;
}
