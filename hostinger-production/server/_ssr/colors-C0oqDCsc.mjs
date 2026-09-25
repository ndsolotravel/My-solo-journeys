import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const COLOR_FIELDS = [
  // Brand & Accent
  {
    key: "primaryColor",
    label: "Primary Color",
    description: "Dominant primary brand shade used for key highlights and solid structures",
    category: "Brand & Accent",
    default: "#0F172A"
  },
  {
    key: "secondaryColor",
    label: "Secondary Color",
    description: "Secondary background tone for headers, badges, and contrasting blocks",
    category: "Brand & Accent",
    default: "#1E293B"
  },
  {
    key: "accentColor",
    label: "Accent Color",
    description: "Primary energetic brand accent (#4085FF) for highlights, indicators, and focus rings",
    category: "Brand & Accent",
    default: "#4085FF"
  },
  // Typography
  {
    key: "headingColor",
    label: "Heading Text Color",
    description: "High-contrast color applied to page titles, hero headings, and section headers",
    category: "Typography",
    default: "#0F172A"
  },
  {
    key: "bodyTextColor",
    label: "Body Text Color",
    description: "Primary readable color for paragraphs, descriptions, and story text",
    category: "Typography",
    default: "#334155"
  },
  {
    key: "mutedTextColor",
    label: "Muted Text Color",
    description: "Subtle secondary text color for dates, captions, metadata, and breadcrumbs",
    category: "Typography",
    default: "#64748B"
  },
  // Links & Navigation
  {
    key: "linkColor",
    label: "Link Color",
    description: "Standard hyperlinked text color across editorial articles and content",
    category: "Links & Navigation",
    default: "#4085FF"
  },
  {
    key: "linkHoverColor",
    label: "Link Hover Color",
    description: "Interactive hover color for links and inline clickable text",
    category: "Links & Navigation",
    default: "#2563EB"
  },
  {
    key: "navTextColor",
    label: "Navigation Text Color",
    description: "Menu link color in the main top header and mobile navigation",
    category: "Links & Navigation",
    default: "#E2E8F0"
  },
  {
    key: "navHoverColor",
    label: "Navigation Hover Color",
    description: "Highlighted hover state for top header and drawer navigation links",
    category: "Links & Navigation",
    default: "#4085FF"
  },
  // Buttons
  {
    key: "buttonBgColor",
    label: "Button Background Color",
    description: "Solid background fill for primary call-to-action buttons",
    category: "Buttons",
    default: "#4085FF"
  },
  {
    key: "buttonTextColor",
    label: "Button Text Color",
    description: "Contrasting foreground text and icon color for solid buttons",
    category: "Buttons",
    default: "#FFFFFF"
  },
  {
    key: "buttonHoverColor",
    label: "Button Hover Color",
    description: "Active hover and pressed background color for call-to-action buttons",
    category: "Buttons",
    default: "#2563EB"
  },
  // Surfaces & Layout
  {
    key: "cardBgColor",
    label: "Card Background Color",
    description: "Background container fill for blog cards, destination cards, and content tiles",
    category: "Surfaces & Layout",
    default: "#FFFFFF"
  },
  {
    key: "sectionBgColor",
    label: "Section Background Color",
    description: "Atmospheric dark canvas tone for cinematic sections and content blocks",
    category: "Surfaces & Layout",
    default: "#0B0F17"
  },
  {
    key: "borderColor",
    label: "Border Color",
    description: "Structural divider and outline border color for cards, inputs, and lines",
    category: "Surfaces & Layout",
    default: "#E2E8F0"
  },
  {
    key: "heroOverlayColor",
    label: "Hero Overlay Color",
    description: "Darkening tint layered over cinematic hero photography for text legibility",
    category: "Surfaces & Layout",
    default: "rgba(0, 0, 0, 0.65)"
  },
  {
    key: "footerBgColor",
    label: "Footer Background Color",
    description: "Base background color of the global website footer",
    category: "Surfaces & Layout",
    default: "#0B0F17"
  },
  {
    key: "footerTextColor",
    label: "Footer Text Color",
    description: "Readable text, copyright, and social link color inside the website footer",
    category: "Surfaces & Layout",
    default: "#94A3B8"
  }
];
const DEFAULT_COLOR_CONFIG = {
  primaryColor: "#0F172A",
  secondaryColor: "#1E293B",
  accentColor: "#4085FF",
  // Brand accent default replaced to #4085FF
  headingColor: "#0F172A",
  bodyTextColor: "#334155",
  mutedTextColor: "#64748B",
  linkColor: "#4085FF",
  linkHoverColor: "#2563EB",
  buttonBgColor: "#4085FF",
  buttonTextColor: "#FFFFFF",
  buttonHoverColor: "#2563EB",
  cardBgColor: "#FFFFFF",
  sectionBgColor: "#0B0F17",
  borderColor: "#E2E8F0",
  navTextColor: "#E2E8F0",
  navHoverColor: "#4085FF",
  heroOverlayColor: "rgba(0, 0, 0, 0.65)",
  footerBgColor: "#0B0F17",
  footerTextColor: "#94A3B8"
};
const colorSchema = objectType({
  primaryColor: stringType().min(1),
  secondaryColor: stringType().min(1),
  accentColor: stringType().min(1),
  headingColor: stringType().min(1),
  bodyTextColor: stringType().min(1),
  mutedTextColor: stringType().min(1),
  linkColor: stringType().min(1),
  linkHoverColor: stringType().min(1),
  buttonBgColor: stringType().min(1),
  buttonTextColor: stringType().min(1),
  buttonHoverColor: stringType().min(1),
  cardBgColor: stringType().min(1),
  sectionBgColor: stringType().min(1),
  borderColor: stringType().min(1),
  navTextColor: stringType().min(1),
  navHoverColor: stringType().min(1),
  heroOverlayColor: stringType().min(1),
  footerBgColor: stringType().min(1),
  footerTextColor: stringType().min(1)
});
function normalizeToHex6(colorStr) {
  if (!colorStr) return "#000000";
  const trimmed = colorStr.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const r = trimmed[1];
    const g = trimmed[2];
    const b = trimmed[3];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  const rgbMatch = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10).toString(16).padStart(2, "0");
    const g = parseInt(rgbMatch[2], 10).toString(16).padStart(2, "0");
    const b = parseInt(rgbMatch[3], 10).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`.toLowerCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(trimmed)) {
    return `#${trimmed}`.toLowerCase();
  }
  return "#4085ff";
}
function parseColorConfig(raw) {
  if (!raw) return { ...DEFAULT_COLOR_CONFIG };
  let data = raw;
  if (typeof raw === "string") {
    try {
      data = JSON.parse(raw);
    } catch {
      return { ...DEFAULT_COLOR_CONFIG };
    }
  }
  if (typeof data !== "object" || data === null) {
    return { ...DEFAULT_COLOR_CONFIG };
  }
  const d = data;
  return {
    primaryColor: typeof d.primaryColor === "string" ? d.primaryColor : DEFAULT_COLOR_CONFIG.primaryColor,
    secondaryColor: typeof d.secondaryColor === "string" ? d.secondaryColor : DEFAULT_COLOR_CONFIG.secondaryColor,
    accentColor: typeof d.accentColor === "string" ? d.accentColor : DEFAULT_COLOR_CONFIG.accentColor,
    headingColor: typeof d.headingColor === "string" ? d.headingColor : DEFAULT_COLOR_CONFIG.headingColor,
    bodyTextColor: typeof d.bodyTextColor === "string" ? d.bodyTextColor : DEFAULT_COLOR_CONFIG.bodyTextColor,
    mutedTextColor: typeof d.mutedTextColor === "string" ? d.mutedTextColor : DEFAULT_COLOR_CONFIG.mutedTextColor,
    linkColor: typeof d.linkColor === "string" ? d.linkColor : DEFAULT_COLOR_CONFIG.linkColor,
    linkHoverColor: typeof d.linkHoverColor === "string" ? d.linkHoverColor : DEFAULT_COLOR_CONFIG.linkHoverColor,
    buttonBgColor: typeof d.buttonBgColor === "string" ? d.buttonBgColor : DEFAULT_COLOR_CONFIG.buttonBgColor,
    buttonTextColor: typeof d.buttonTextColor === "string" ? d.buttonTextColor : DEFAULT_COLOR_CONFIG.buttonTextColor,
    buttonHoverColor: typeof d.buttonHoverColor === "string" ? d.buttonHoverColor : DEFAULT_COLOR_CONFIG.buttonHoverColor,
    cardBgColor: typeof d.cardBgColor === "string" ? d.cardBgColor : DEFAULT_COLOR_CONFIG.cardBgColor,
    sectionBgColor: typeof d.sectionBgColor === "string" ? d.sectionBgColor : DEFAULT_COLOR_CONFIG.sectionBgColor,
    borderColor: typeof d.borderColor === "string" ? d.borderColor : DEFAULT_COLOR_CONFIG.borderColor,
    navTextColor: typeof d.navTextColor === "string" ? d.navTextColor : DEFAULT_COLOR_CONFIG.navTextColor,
    navHoverColor: typeof d.navHoverColor === "string" ? d.navHoverColor : DEFAULT_COLOR_CONFIG.navHoverColor,
    heroOverlayColor: typeof d.heroOverlayColor === "string" ? d.heroOverlayColor : DEFAULT_COLOR_CONFIG.heroOverlayColor,
    footerBgColor: typeof d.footerBgColor === "string" ? d.footerBgColor : DEFAULT_COLOR_CONFIG.footerBgColor,
    footerTextColor: typeof d.footerTextColor === "string" ? d.footerTextColor : DEFAULT_COLOR_CONFIG.footerTextColor
  };
}
function generateColorCss(config, selector = ":root, .dark") {
  return `
${selector} {
  --primary: ${config.primaryColor};
  --secondary: ${config.secondaryColor};
  --brand: ${config.accentColor};
  --accent: ${config.accentColor};
  --ring: ${config.accentColor};

  --color-heading: ${config.headingColor};
  --heading-color: ${config.headingColor};

  --color-body-text: ${config.bodyTextColor};
  --body-text-color: ${config.bodyTextColor};

  --color-muted-text: ${config.mutedTextColor};
  --muted-text-color: ${config.mutedTextColor};

  --color-link: ${config.linkColor};
  --link-color: ${config.linkColor};

  --color-link-hover: ${config.linkHoverColor};
  --link-hover-color: ${config.linkHoverColor};

  --btn-bg: ${config.buttonBgColor};
  --color-btn-bg: ${config.buttonBgColor};
  --btn-text: ${config.buttonTextColor};
  --color-btn-text: ${config.buttonTextColor};
  --btn-hover: ${config.buttonHoverColor};
  --color-btn-hover: ${config.buttonHoverColor};

  --card-bg: ${config.cardBgColor};
  --color-card-bg: ${config.cardBgColor};
  --section-bg: ${config.sectionBgColor};
  --color-section-bg: ${config.sectionBgColor};
  --border-color: ${config.borderColor};
  --border: ${config.borderColor};

  --nav-text: ${config.navTextColor};
  --color-nav-text: ${config.navTextColor};
  --nav-hover: ${config.navHoverColor};
  --color-nav-hover: ${config.navHoverColor};

  --hero-overlay: ${config.heroOverlayColor};

  --footer-bg: ${config.footerBgColor};
  --color-footer-bg: ${config.footerBgColor};
  --footer-text: ${config.footerTextColor};
  --color-footer-text: ${config.footerTextColor};
}
`;
}
export {
  COLOR_FIELDS as C,
  DEFAULT_COLOR_CONFIG as D,
  colorSchema as c,
  generateColorCss as g,
  normalizeToHex6 as n,
  parseColorConfig as p
};
