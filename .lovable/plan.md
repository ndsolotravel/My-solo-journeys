This is a very large request (header, homepage, stories, destinations, destination detail guides, article tools, AI reading tools, gallery, accounts, contact, newsletter, admin, SEO, performance). Rather than attempting all of it in one pass — which would risk breaking the existing cinematic identity and is too large to deliver reliably in a single turn — I'll deliver it in approved phases. Each phase is shippable on its own.

## Phase 1 — Global Header + Homepage polish
- Sticky header: transparent over hero, blurred solid after scroll (IntersectionObserver on hero sentinel).
- Replace language list with globe-icon dropdown (keep existing 9 languages + Urdu Roman behavior).
- Add search icon → opens command-palette style search across posts (title, content, tags, category) and destinations.
- Mobile slide-out sheet with nav, language, search, account.
- Active route highlighting.
- Homepage: hero search field, "Start Your Journey" 3 cards (Solo / Motorcycle / Trekking), "Popular This Month" (by views), "Travel Guides" section, story-card hover polish, skeleton loaders.

## Phase 2 — Stories + Destinations list pages
- Remove duplicated headings/intros.
- Stories: search, scrollable category chips, filters (destination/type/difficulty/reading time/date), sort, result count, Load More, empty state, fully-clickable cards.
- Destinations: search + filters (country/region/activity/season/difficulty), grid/map toggle, richer cards (region, season, activity, duration, difficulty).

## Phase 3 — Destination detail guide
- Quick facts panel, route map placeholder, sections for getting there / transport / permits / accommodation / food / connectivity / weather / packing / safety / health / emergency / cost / itinerary, download itinerary, related stories/gallery/nearby, sticky mobile action bar.
- Requires DB additions: extend `destinations` with structured guide fields (quick_facts jsonb, itinerary jsonb, sections jsonb, gpx_url, etc.).

## Phase 4 — Article detail + AI Reading Tools
- Reading progress bar, auto TOC (sticky desktop / collapsible mobile), bookmark, TTS listen + duration, font-size, light/dark/distraction-free, pull quotes, captions, author box, updated date, related, prev/next, share + copy confirmation, report, comments with replies + reactions, sign-in prompts, accurate reading time.
- Reading Tools popover: Summarize / Explain / Translate / Listen / Ask — backed by Lovable AI Gateway server functions; "Ask" grounded only on article content.
- DB additions: `bookmarks`, `reading_history`, `collections`, `reactions`, `reports`, comment `parent_id`.

## Phase 5 — Gallery, Account dashboard, Contact, Newsletter
- Gallery: masonry, lightbox with keyboard+swipe, captions/location/date/EXIF, category filters, link-to-story, conditional download, lazy load. Extend gallery table.
- Account dashboard at `/account`: saved stories, saved guides, history, comments, collections, preferences, profile. Avatar replaces "Sign in".
- Contact: dedup, structured form with enquiry type, validation, states, spam honeypot.
- Newsletter: validation, states, duplicate handling, interest selection. Remove duplicate placements.

## Phase 6 — Admin, SEO, Performance/Accessibility
- Admin: drafts/scheduling, destinations CRUD, gallery upload/organize, categories/tags, moderation, feature toggles, subscribers, analytics, SEO fields, preview.
- SEO: per-page meta, canonical, OG/Twitter, JSON-LD (Article, Breadcrumb, Person, Place), sitemap, breadcrumbs UI.
- Perf/a11y: responsive images, lazy-load, preload hero only, focus states, alt text audit, prefers-reduced-motion, contrast pass.

## Technical notes
- All new server logic via `createServerFn` (no Edge Functions).
- New tables get RLS + GRANTs in the same migration.
- AI features via Lovable AI Gateway (`google/gemini-2.5-flash` for chat, `openai/gpt-4o-mini-tts` for TTS).
- Preserve existing tokens in `src/styles.css`, existing components, existing copy. No new color system, no glassmorphism beyond the header blur.

## What I need from you
1. **Approve the phased approach** (vs. trying everything at once).
2. **Confirm Phase 1 first** — I'll ship it end-to-end (header + homepage), verify, then move to Phase 2 on your go-ahead.
3. Any phase you'd rather prioritize or drop? (e.g. skip admin if you manage content directly in the DB.)