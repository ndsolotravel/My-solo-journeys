import { u as createSsrRpc } from "./admin.functions-67-zmleM.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { o as objectType, r as recordType, s as stringType } from "../_libs/zod.mjs";
const aboutPortrait = "/assets/nd-about-CHpXGkDQ.jpg";
const DEFAULT_HERO_BADGES = [{
  id: "1",
  icon: "Bike",
  label: "Solo Motorcycling",
  enabled: true
}, {
  id: "2",
  icon: "Mountain",
  label: "High-Altitude Trekking",
  enabled: true
}, {
  id: "3",
  icon: "Globe",
  label: "27 Countries & 3 Continents",
  enabled: true
}, {
  id: "4",
  icon: "Camera",
  label: "Documentary Photography",
  enabled: true
}];
const DEFAULT_DOSSIER_ITEMS = [{
  id: "1",
  label: "Primary Base",
  value: "Lahore & Karakoram",
  icon: "MapPin",
  enabled: true
}, {
  id: "2",
  label: "Travel Rig",
  value: "Dual-Sport Motorcycle",
  icon: "Bike",
  enabled: true
}, {
  id: "3",
  label: "Highest Pass",
  value: "Khunjerab (4,693m)",
  icon: "Mountain",
  enabled: true
}, {
  id: "4",
  label: "Mode",
  value: "100% Solo & Independent",
  icon: "Navigation",
  enabled: true
}];
const DEFAULT_WHY_TRAVEL_CARDS = [{
  id: "1",
  icon: "Compass",
  title: "Stepping Away from the Familiar",
  description: "Routine creates comfort, but unfamiliarity creates growth. By removing the safety net of home, solo travel forces you to observe closely, think independently, and adapt to unpredictable circumstances with confidence.",
  order: 1,
  enabled: true
}, {
  id: "2",
  icon: "Heart",
  title: "Genuine Human Connection",
  description: "When you travel alone, you are never truly isolated. You are open to the world. A cup of salted tea shared with mountain shepherds, an impromptu dinner with roadside mechanics, and silent camaraderie in remote villages reveal our shared humanity.",
  order: 2,
  enabled: true
}, {
  id: "3",
  icon: "Shield",
  title: "Self-Reliance & Resilience",
  description: "Navigating unexpected roadblocks, landslides, sudden blizzards, and mechanical issues builds a quiet inner strength. Real adventure begins the moment the original plan falls apart.",
  order: 3,
  enabled: true
}];
const DEFAULT_MOTORCYCLE_FEATURES = [{
  id: "1",
  icon: "Route",
  title: "The Karakoram & Mountain Passes",
  description: "Navigating the eighth wonder of the world, gravel spurs into Shimshal, the sheer drops of the Indus Gorge, and the remote valleys of Gilgit-Baltistan.",
  order: 1,
  enabled: true
}, {
  id: "2",
  icon: "Wrench",
  title: "Trailside Self-Sufficiency",
  description: "Carrying spare tubes, fuel cans, brake pads, and zip-ties. Knowing your machine inside and out so you can ride with calm confidence anywhere.",
  order: 2,
  enabled: true
}];
const DEFAULT_TREKKING_CARDS = [{
  id: "1",
  icon: "CheckCircle2",
  title: "K2 Base Camp & Concordia",
  description: "Walking the legendary Baltoro Glacier beneath the Trango Towers to the throne room of the mountain gods.",
  order: 1,
  enabled: true
}, {
  id: "2",
  icon: "CheckCircle2",
  title: "Nanga Parbat & Fairy Meadows",
  description: "Witnessing the sheer 4,500-meter vertical rise of the Rupal and Raikot faces in raw mountain isolation.",
  order: 2,
  enabled: true
}, {
  id: "3",
  icon: "CheckCircle2",
  title: "Deosai High Plateau",
  description: "Traversing the second highest plateau on earth, where rolling meadows meet endless snowline peaks.",
  order: 3,
  enabled: true
}, {
  id: "4",
  icon: "CheckCircle2",
  title: "Self-Carried Expeditions",
  description: "Carrying tent, food, and camera gear through freezing nights and altitude acclimatization.",
  order: 4,
  enabled: true
}];
const DEFAULT_PHILOSOPHY_CARDS = [{
  id: "1",
  number: "01",
  title: "Courage Over Perfection",
  description: "Waiting for the perfect conditions means you will never leave. Embrace the incomplete plan and let the road teach you.",
  order: 1,
  enabled: true
}, {
  id: "2",
  number: "02",
  title: "Slow & Immersive",
  description: "Linger in roadside dhabas, walk through quiet morning alleys, and observe life unfolding without rushing to the next spot.",
  order: 2,
  enabled: true
}, {
  id: "3",
  number: "03",
  title: "Leave No Trace",
  description: "Extreme alpine environments are deeply fragile. Respect wildlife, pack out all waste, and tread with environmental humility.",
  order: 3,
  enabled: true
}, {
  id: "4",
  number: "04",
  title: "Humility & Gratitude",
  description: "As travellers, we are guests in other people's homes and sacred landscapes. Treat every host and stranger with honor.",
  order: 4,
  enabled: true
}];
const DEFAULT_NUMBER_STATS = [{
  id: "1",
  value: "27",
  label: "Countries Explored",
  description: "Independent overland & solo travel",
  order: 1,
  enabled: true
}, {
  id: "2",
  value: "3",
  label: "Continents Traversed",
  description: "From Central Asia to Europe",
  order: 2,
  enabled: true
}, {
  id: "3",
  value: "5,000m+",
  label: "Highest Alpine Altitude",
  description: "Himalayan & Karakoram passes",
  order: 3,
  enabled: true
}, {
  id: "4",
  value: "50,000+",
  label: "Kilometers Ridden",
  description: "Autonomous motorcycle routes",
  order: 4,
  enabled: true
}];
const DEFAULT_TERRAIN_TAGS = [{
  id: "1",
  name: "Karakoram Highway",
  order: 1,
  enabled: true
}, {
  id: "2",
  name: "Baltoro Glacier & K2 Base Camp",
  order: 2,
  enabled: true
}, {
  id: "3",
  name: "Fairy Meadows & Nanga Parbat",
  order: 3,
  enabled: true
}, {
  id: "4",
  name: "Deosai High Plains",
  order: 4,
  enabled: true
}, {
  id: "5",
  name: "Khunjerab Pass (Pakistan-China)",
  order: 5,
  enabled: true
}, {
  id: "6",
  name: "Hunza & Nagar Valleys",
  order: 6,
  enabled: true
}, {
  id: "7",
  name: "Phander & Shandur Pass",
  order: 7,
  enabled: true
}, {
  id: "8",
  name: "Hindu Kush Trails",
  order: 8,
  enabled: true
}, {
  id: "9",
  name: "Silk Road Mountain Passes",
  order: 9,
  enabled: true
}, {
  id: "10",
  name: "European Alpine Passes",
  order: 10,
  enabled: true
}, {
  id: "11",
  name: "Mediterranean Coastal Highways",
  order: 11,
  enabled: true
}, {
  id: "12",
  name: "Middle Eastern Deserts",
  order: 12,
  enabled: true
}];
const DEFAULT_CONTENT_CARDS = [{
  id: "1",
  icon: "Compass",
  title: "Expedition Stories",
  description: "Long-form field journals written from mountain tents and roadside stops. Real challenges, honest reflections, and unfiltered adventure.",
  ctaText: "Read Stories",
  ctaUrl: "/blog",
  order: 1,
  enabled: true
}, {
  id: "2",
  icon: "MapPin",
  title: "Destination Guides",
  description: "Actionable motorcycle routes, high-altitude trail itineraries, road condition updates, permit advice, and solo safety notes.",
  ctaText: "Explore Guides",
  ctaUrl: "/destinations",
  order: 2,
  enabled: true
}, {
  id: "3",
  icon: "Camera",
  title: "Visual Gallery",
  description: "Curated landscape and documentary photographs capturing golden hours on mountain peaks, nomadic faces, and rugged terrain.",
  ctaText: "View Gallery",
  ctaUrl: "/gallery",
  order: 3,
  enabled: true
}, {
  id: "4",
  icon: "Navigation",
  title: "Interactive Map",
  description: "Interactive geographical tracking of expedition waypoints, high-altitude passes, camp coordinates, and travel milestones.",
  ctaText: "Open Map",
  ctaUrl: "/map",
  order: 4,
  enabled: true
}];
const ABOUT_DEFAULTS = {
  about_hero_label: "The Story Behind NDSOLOTRAVEL",
  about_hero_headline: "Solo, slow, and almost always uphill.",
  about_hero_subtitle: "From engineering blueprints to remote mountain passes, unpaved tracks, and high Himalayan ridges. Documenting authentic exploration on two wheels and on foot.",
  about_hero_image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&auto=format",
  about_hero_badges: JSON.stringify(DEFAULT_HERO_BADGES),
  about_profile_name: "Hussain",
  about_profile_role: "Founder & Solo Traveler",
  about_profile_tagline: "Engineer · Motorcycle Nomad · Himalayan Trekker",
  about_profile_eyebrow: "Introduction",
  about_biography_title: "From Engineering Problem-Solving to the Freedom of the Open Road",
  about_biography_intro: "Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world, discovering new places, and experiencing the freedom of traveling solo.",
  about_biography_paragraphs: "I am a solo traveler and an Engineer by profession. While engineering has shaped the way I think, solve problems, and plan, traveling has taught me to be curious, adaptable, independent, and open to the unexpected.\n\nFor me, solo travel is more than simply visiting new destinations. It is about getting away from the familiar, riding unfamiliar roads, hiking through remote landscapes, meeting people from different backgrounds, and creating experiences that stay with you long after the journey ends.\n\nThrough NDSOLOTRAVEL, I share my journeys, motorcycle adventures, hiking experiences, destinations, travel stories, photographs, and the lessons I discover along the way.\n\nI believe you do not always need a group, a perfect plan, or a luxury itinerary to explore the world. Sometimes, all you need is the courage to start, an open mind, and the willingness to take the road less travelled.\n\nTravel is my way of discovering the world, challenging myself, and continuing to learn beyond the boundaries of everyday life.",
  about_profile_highlight_title: "The Intersection of Engineering & Solo Exploration",
  about_profile_highlight_text: "Engineering teaches you to evaluate risk, study mechanical systems, and calculate solutions when variables fail. When you are alone on a mountain pass 4,000 meters above sea level with no cell reception, that analytical discipline keeps you calm. You calculate fuel consumption across dead zones, repair trailside breakdowns with simple tools, and navigate glacial terrain with methodical focus.",
  about_profile_dossier: JSON.stringify(DEFAULT_DOSSIER_ITEMS),
  about_profile_cta_primary_text: "Read Expedition Stories",
  about_profile_cta_primary_url: "/blog",
  about_profile_cta_secondary_text: "Get in Touch",
  about_profile_cta_secondary_url: "/contact",
  about_why_travel_eyebrow: "Purpose & Meaning",
  about_why_travel_title: "Why I Travel",
  about_why_travel_description: "Travel is not about accumulating passport stamps or taking postcard selfies. It is a deliberate practice of curiosity, resilience, and personal discovery.",
  about_why_travel_cards: JSON.stringify(DEFAULT_WHY_TRAVEL_CARDS),
  about_motorcycle_eyebrow: "The Medium of Truth",
  about_motorcycle_badge: "Two Wheels, Zero Boundaries",
  about_motorcycle_title: "Solo Motorcycle Adventures",
  about_motorcycle_description: "On a motorcycle, there are no frames, windows, or sound barriers. You are directly inside the elements. You feel the temperature plummet as you climb a 4,000m pass, smell the alpine pine after mountain rain, and taste the dust of remote riverbeds.",
  about_motorcycle_image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80&auto=format",
  about_motorcycle_image_alt: "Solo adventure motorcycle on remote mountain road",
  about_motorcycle_features: JSON.stringify(DEFAULT_MOTORCYCLE_FEATURES),
  about_motorcycle_cta_text: "Explore Motorcycle Destination Guides",
  about_motorcycle_cta_url: "/destinations",
  about_trekking_eyebrow: "Where Roads End",
  about_trekking_title: "Trekking & High-Altitude Exploration",
  about_trekking_description: "When the track terminates and the wheels can go no further, exploration continues on foot. Trekking high into the Karakoram and Himalayas is an exercise in absolute humility.",
  about_trekking_image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format",
  about_trekking_image_alt: "High altitude mountain peak and glacier",
  about_trekking_location_label: "Himalayan Solitude",
  about_trekking_location_quote: "Against the silence of 8,000-meter giants, the ego evaporates.",
  about_trekking_cards: JSON.stringify(DEFAULT_TREKKING_CARDS),
  about_philosophy_eyebrow: "Travel Philosophy",
  about_philosophy_quote: "Solo travel is where the journey becomes the destination.",
  about_philosophy_description: "You do not need a tour operator, a large budget, or a 100-page itinerary to discover the world. You simply need the curiosity to listen, the humility to respect local cultures, and the bravery to take that first solo step.",
  about_philosophy_cards: JSON.stringify(DEFAULT_PHILOSOPHY_CARDS),
  about_numbers_eyebrow: "Global Footprint",
  about_numbers_title: "27 Countries and 3 Continents",
  about_numbers_description: "A continuous journey of overland motorcycle crossings, mountain passes, and desert horizons across Asia, Europe, and beyond.",
  about_numbers_stats: JSON.stringify(DEFAULT_NUMBER_STATS),
  about_numbers_tags_label: "Notable Expeditions & Terrains Explored:",
  about_numbers_tags: JSON.stringify(DEFAULT_TERRAIN_TAGS),
  about_content_eyebrow: "Content & Community",
  about_content_title: "What You Will Find on NDSOLOTRAVEL",
  about_content_description: "A collection of unfiltered stories, practical logistics, and visual essays designed to inspire your own independent journeys.",
  about_content_cards: JSON.stringify(DEFAULT_CONTENT_CARDS),
  about_cta_eyebrow: "Join The Journey",
  about_cta_title: "The Road Is Always Calling.",
  about_cta_description: "Whether you are planning your first solo motorcycle journey, preparing for a high-altitude trek, or simply looking for honest advice on routes and gear, I am always glad to connect with fellow travellers.",
  about_cta_primary_text: "Explore Stories",
  about_cta_primary_url: "/blog",
  about_cta_secondary_text: "View Destinations",
  about_cta_secondary_url: "/destinations",
  about_cta_tertiary_text: "Send a Message",
  about_cta_tertiary_url: "/contact"
};
function parseJson(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed !== void 0 && parsed !== null ? parsed : fallback;
  } catch {
    return fallback;
  }
}
const adminGetAboutEditor = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("14a5f2da7be60dd7371c795a0d155a8d64fe7f0f70cfc6b669d6c624dd941cd1"));
const adminSaveAboutSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => {
  return objectType({
    settings: recordType(stringType())
  }).parse(d);
}).handler(createSsrRpc("46e91631002081989b72bdedfecbf910ff9f8a3dd454b304205425730e6377da"));
export {
  ABOUT_DEFAULTS as A,
  DEFAULT_HERO_BADGES as D,
  aboutPortrait as a,
  DEFAULT_DOSSIER_ITEMS as b,
  DEFAULT_WHY_TRAVEL_CARDS as c,
  DEFAULT_MOTORCYCLE_FEATURES as d,
  DEFAULT_TREKKING_CARDS as e,
  DEFAULT_PHILOSOPHY_CARDS as f,
  DEFAULT_NUMBER_STATS as g,
  DEFAULT_TERRAIN_TAGS as h,
  DEFAULT_CONTENT_CARDS as i,
  adminGetAboutEditor as j,
  adminSaveAboutSettings as k,
  parseJson as p
};
