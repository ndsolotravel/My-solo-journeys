import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const ACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes cutoff for Live Now

const MAX_STRING_LEN = 500;

// Helper to convert 2-letter country code to human readable country name
const COUNTRY_NAMES: Record<string, string> = {
  PK: "Pakistan",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  DE: "Germany",
  FR: "France",
  AU: "Australia",
  IN: "India",
  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  TR: "Turkey",
  NL: "Netherlands",
  SE: "Sweden",
  CH: "Switzerland",
  IT: "Italy",
  ES: "Spain",
  BR: "Brazil",
  JP: "Japan",
  CN: "China",
  SG: "Singapore",
  MY: "Malaysia",
  TH: "Thailand",
};

// In-memory IP Geolocation Cache: IP string -> { country: string; countryCode: string }
const IP_COUNTRY_CACHE = new Map<string, { country: string; countryCode: string }>();

/** Convert 2-letter country code to human readable country name */
function getCountryNameFromCode(code: string | null | undefined): { country: string; countryCode: string } {
  if (!code || code === "Unknown" || code === "XX") {
    return { country: "Unknown", countryCode: "XX" };
  }
  const upper = code.trim().toUpperCase();
  if (upper === "LOCAL") {
    return { country: "Localhost", countryCode: "LOCAL" };
  }
  if (COUNTRY_NAMES[upper]) {
    return { country: COUNTRY_NAMES[upper], countryCode: upper };
  }
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    const name = regionNames.of(upper);
    if (name) return { country: name, countryCode: upper };
  } catch {
    // Ignore display names error
  }
  return { country: upper, countryCode: upper };
}

/** Check if IP address is localhost or private range */
function isPrivateOrLocalIp(ip: string): boolean {
  if (!ip) return true;
  const clean = ip.trim().toLowerCase();
  if (
    clean === "127.0.0.1" ||
    clean === "::1" ||
    clean === "::ffff:127.0.0.1" ||
    clean === "localhost" ||
    clean.startsWith("10.") ||
    clean.startsWith("192.168.") ||
    clean.startsWith("fe80:") ||
    clean.startsWith("fc00:") ||
    clean.startsWith("127.")
  ) {
    return true;
  }
  if (clean.startsWith("172.")) {
    const parts = clean.split(".");
    if (parts.length >= 2) {
      const secondOctet = parseInt(parts[1], 10);
      if (secondOctet >= 16 && secondOctet <= 31) return true;
    }
  }
  return false;
}

/** Extract real public client IP from server request headers */
function getClientIp(): string {
  try {
    const cfConnecting = getRequestHeader("cf-connecting-ip");
    if (cfConnecting) return cfConnecting.trim();

    const xForwardedFor = getRequestHeader("x-forwarded-for");
    if (xForwardedFor) {
      const clientIp = xForwardedFor.split(",")[0].trim();
      if (clientIp) return clientIp;
    }

    const xRealIp = getRequestHeader("x-real-ip");
    if (xRealIp) return xRealIp.trim();

    const fastlyIp = getRequestHeader("fastly-client-ip");
    if (fastlyIp) return fastlyIp.trim();

    const trueClientIp = getRequestHeader("true-client-ip");
    if (trueClientIp) return trueClientIp.trim();
  } catch {
    // Header extraction context unavailable
  }
  return "";
}

/** Geolocation resolver: CDN header check -> Local IP check -> Memory Cache -> Server IP API */
async function resolveVisitorCountry(): Promise<{ country: string; countryCode: string }> {
  // 1. Check Proxy / CDN Geolocation headers (0ms overhead)
  try {
    const headerCode =
      getRequestHeader("cf-ipcountry") ||
      getRequestHeader("x-country-code") ||
      getRequestHeader("x-vercel-ip-country") ||
      getRequestHeader("cloudfront-viewer-country") ||
      null;

    if (headerCode && headerCode.trim() && headerCode !== "XX" && headerCode !== "T1") {
      return getCountryNameFromCode(headerCode);
    }
  } catch {
    // Ignore header extraction errors
  }

  // 2. Extract Client IP
  const clientIp = getClientIp();
  if (!clientIp || isPrivateOrLocalIp(clientIp)) {
    return { country: "Localhost", countryCode: "LOCAL" };
  }

  // 3. Check In-Memory Cache
  if (IP_COUNTRY_CACHE.has(clientIp)) {
    return IP_COUNTRY_CACHE.get(clientIp)!;
  }

  // 4. Server-Side IP Geolocation Lookup (api.country.is)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`https://api.country.is/${encodeURIComponent(clientIp)}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const payload = (await res.json()) as { country?: string };
      if (payload && typeof payload.country === "string" && payload.country.length === 2) {
        const resolved = getCountryNameFromCode(payload.country);
        IP_COUNTRY_CACHE.set(clientIp, resolved);
        return resolved;
      }
    }
  } catch (err) {
    console.warn(`[analytics] IP geolocation fallback warning for <${clientIp}>:`, err);
  }

  return { country: "Unknown", countryCode: "XX" };
}

/** Helper to extract payload whether wrapped as { data: ... } or direct object */
function unwrapInput(input: any) {
  if (input && typeof input === "object" && "data" in input && input.data !== undefined) {
    return input.data;
  }
  return input ?? {};
}

/** Server function to ping session heartbeat and optionally record a page view. */
export const recordPageViewAndPing = createServerFn({ method: "POST" })
  .validator((input: any) =>
    z
      .object({
        sessionId: z.string().min(1).max(128),
        path: z.string().min(1).max(MAX_STRING_LEN),
        title: z.string().max(MAX_STRING_LEN).optional().nullable(),
        referrer: z.string().max(MAX_STRING_LEN).optional().nullable(),
        deviceType: z.enum(["desktop", "mobile", "tablet"]).optional().default("desktop"),
        browser: z.string().max(100).optional().default("Unknown"),
        os: z.string().max(100).optional().default("Unknown"),
        referrerSource: z.string().max(100).optional().default("Direct"),
        isNewPageView: z.boolean().optional().default(false),
      })
      .parse(unwrapInput(input)),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Perform non-blocking server-side IP geolocation
    const { country, countryCode } = await resolveVisitorCountry();
    const nowIso = new Date().toISOString();

    // 1. Try atomic PostgreSQL RPC execution first
    try {
      const { error: rpcErr } = await supabaseAdmin.rpc("upsert_visitor_session", {
        p_session_id: data.sessionId,
        p_path: data.path,
        p_device_type: data.deviceType || "desktop",
        p_browser: data.browser || "Unknown",
        p_os: data.os || "Unknown",
        p_country: country,
        p_country_code: countryCode,
        p_referrer_source: data.referrerSource || "Direct",
        p_is_new_page_view: Boolean(data.isNewPageView),
        p_title: data.title || data.path,
        p_referrer: data.referrer || "",
        p_subscriber_email: null,
      });

      if (!rpcErr) {
        return { ok: true };
      }
      console.warn(`[analytics] upsert_visitor_session RPC notice (falling back to direct queries):`, rpcErr.message);
    } catch (err) {
      console.warn(`[analytics] upsert_visitor_session RPC exception (falling back to direct queries):`, err);
    }

    // 2. Fallback upsert logic
    const { data: existingSession } = await supabaseAdmin
      .from("visitor_sessions")
      .select("session_id")
      .eq("session_id", data.sessionId)
      .maybeSingle();

    if (!existingSession) {
      await supabaseAdmin.from("visitor_sessions").insert({
        session_id: data.sessionId,
        last_active_at: nowIso,
        created_at: nowIso,
        device_type: data.deviceType,
        browser: data.browser,
        os: data.os,
        country: country,
        country_code: countryCode,
        referrer_source: data.referrerSource,
        entry_page: data.path,
      });
    } else {
      await supabaseAdmin
        .from("visitor_sessions")
        .update({
          last_active_at: nowIso,
          ...(country !== "Unknown" ? { country, country_code: countryCode } : {}),
          ...(data.deviceType ? { device_type: data.deviceType } : {}),
          ...(data.browser && data.browser !== "Unknown" ? { browser: data.browser } : {}),
          ...(data.os && data.os !== "Unknown" ? { os: data.os } : {}),
        })
        .eq("session_id", data.sessionId);
    }

    if (data.isNewPageView) {
      await supabaseAdmin.from("page_views").insert({
        session_id: data.sessionId,
        path: data.path,
        title: data.title || data.path,
        referrer: data.referrer || "",
        created_at: nowIso,
      });
    }

    return { ok: true };
  });

async function assertEditorRole(userId: string, client?: any) {
  let roles: string[] = [];

  if (client && typeof client.from === "function") {
    const { data } = await client.from("user_roles").select("role").eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r: { role: string }) => r.role);
    }
  }

  if (roles.length === 0) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    roles = (rows ?? []).map((r) => r.role);
  }

  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden");
  }
}

export type PeriodOption = "7d" | "30d" | "90d" | "all";

/** Server function to fetch complete Analytics Dashboard data for Admin panel. */
export const getAdminAnalyticsDetails = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((input: any) =>
    z
      .object({
        period: z.enum(["7d", "30d", "90d", "all"]).optional().default("30d"),
      })
      .parse(unwrapInput(input)),
  )
  .handler(async ({ context, data }) => {
    await assertEditorRole(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const now = new Date();
    const cutoff5m = new Date(now.getTime() - ACTIVITY_TIMEOUT_MS).toISOString();

    // Start of Today UTC
    const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);

    // Determine period cutoff date
    let periodDays = 30;
    if (data.period === "7d") periodDays = 7;
    else if (data.period === "90d") periodDays = 90;
    else if (data.period === "all") periodDays = 365;

    const periodStart = new Date(todayStart.getTime() - (periodDays - 1) * 24 * 60 * 60 * 1000);

    // Parallel Supabase Queries for Maximum Performance
    const [
      liveCountRes,
      totalSessionsRes,
      totalViewsRes,
      todaySessionsRes,
      todayViewsRes,
      yesterdaySessionsRes,
      periodPageViewsRes,
      periodSessionsRes,
      allSessionsRes,
      allPageViewsRes,
      topPostsRes,
      recentVisitorsRes,
    ] = await Promise.all([
      // 1. Live Now - strictly active within 5-minute window
      client
        .from("visitor_sessions")
        .select("session_id", { count: "exact", head: true })
        .gte("last_active_at", cutoff5m),

      // 2. Total Visitors
      client.from("visitor_sessions").select("session_id", { count: "exact", head: true }),

      // 3. Total Page Views
      client.from("page_views").select("id", { count: "exact", head: true }),

      // 4. Today Visitors
      client
        .from("visitor_sessions")
        .select("session_id", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString()),

      // 5. Today Page Views
      client
        .from("page_views")
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString()),

      // 6. Yesterday Visitors
      client
        .from("visitor_sessions")
        .select("session_id", { count: "exact", head: true })
        .gte("created_at", yesterdayStart.toISOString())
        .lt("created_at", todayStart.toISOString()),

      // 7. Page Views in period
      client
        .from("page_views")
        .select("created_at, path, title")
        .gte("created_at", periodStart.toISOString())
        .order("created_at", { ascending: true }),

      // 8. Sessions in period
      client
        .from("visitor_sessions")
        .select("session_id, created_at, device_type, referrer_source, country")
        .gte("created_at", periodStart.toISOString())
        .order("created_at", { ascending: true }),

      // 9. Device & Source distribution from visitor_sessions
      client
        .from("visitor_sessions")
        .select("device_type, referrer_source, country")
        .limit(2000),

      // 10. Popular pages overall
      client
        .from("page_views")
        .select("path, title")
        .limit(5000),

      // 11. Top Blog Posts
      client
        .from("posts")
        .select("id, title, slug, category, cover_image, views")
        .eq("published", true)
        .order("views", { ascending: false })
        .limit(5),

      // 12. Recent Visitors Log
      client
        .from("visitor_sessions")
        .select("session_id, country, country_code, device_type, browser, os, entry_page, last_active_at, subscriber_email")
        .order("last_active_at", { ascending: false })
        .limit(15),
    ]);

    const liveNow = liveCountRes.count ?? 0;
    const totalVisitors = totalSessionsRes.count ?? 0;
    const totalPageViews = totalViewsRes.count ?? 0;
    const todayVisitors = todaySessionsRes.count ?? 0;
    const todayPageViews = todayViewsRes.count ?? 0;
    const yesterdayVisitors = yesterdaySessionsRes.count ?? 0;

    // Build Daily Chart Data over the period
    const chartMap = new Map<string, { date: string; fullDate: string; visitors: number; pageViews: number }>();

    for (let i = 0; i < periodDays; i++) {
      const d = new Date(periodStart.getTime() + i * 24 * 60 * 60 * 1000);
      const isoKey = d.toISOString().split("T")[0];
      const shortLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      chartMap.set(isoKey, { date: shortLabel, fullDate: isoKey, visitors: 0, pageViews: 0 });
    }

    const sessionDayTracker = new Map<string, Set<string>>(); // isoKey -> Set of sessionIds

    (periodSessionsRes.data ?? []).forEach((s) => {
      const dayKey = new Date(s.created_at).toISOString().split("T")[0];
      if (chartMap.has(dayKey)) {
        if (!sessionDayTracker.has(dayKey)) {
          sessionDayTracker.set(dayKey, new Set());
        }
        sessionDayTracker.get(dayKey)?.add(s.session_id);
      }
    });

    sessionDayTracker.forEach((set, dayKey) => {
      const entry = chartMap.get(dayKey);
      if (entry) {
        entry.visitors = set.size;
      }
    });

    (periodPageViewsRes.data ?? []).forEach((pv) => {
      const dayKey = new Date(pv.created_at).toISOString().split("T")[0];
      const entry = chartMap.get(dayKey);
      if (entry) {
        entry.pageViews += 1;
      }
    });

    const trafficOverTime = Array.from(chartMap.values());

    // Popular Pages Aggregation
    const pageCounts = new Map<string, { path: string; title: string; views: number }>();
    let totalTrackedViews = 0;

    (allPageViewsRes.data ?? []).forEach((pv) => {
      totalTrackedViews += 1;
      const existing = pageCounts.get(pv.path);
      if (existing) {
        existing.views += 1;
        if (!existing.title && pv.title) existing.title = pv.title;
      } else {
        pageCounts.set(pv.path, {
          path: pv.path,
          title: pv.title || pv.path,
          views: 1,
        });
      }
    });

    const popularPages = Array.from(pageCounts.values())
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
      .map((p) => ({
        ...p,
        percentage: totalTrackedViews > 0 ? Math.round((p.views / totalTrackedViews) * 1000) / 10 : 0,
      }));

    // Device Statistics Breakdown
    const deviceCounts: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
    let deviceTotal = 0;

    (allSessionsRes.data ?? []).forEach((s) => {
      const dev = (s.device_type || "desktop").toLowerCase();
      if (dev in deviceCounts) {
        deviceCounts[dev] += 1;
      } else {
        deviceCounts.desktop += 1;
      }
      deviceTotal += 1;
    });

    const deviceStats = {
      desktop: deviceTotal > 0 ? Math.round((deviceCounts.desktop / deviceTotal) * 100) : 70,
      mobile: deviceTotal > 0 ? Math.round((deviceCounts.mobile / deviceTotal) * 100) : 25,
      tablet: deviceTotal > 0 ? Math.round((deviceCounts.tablet / deviceTotal) * 100) : 5,
      counts: deviceCounts,
    };

    // Traffic Sources Breakdown
    const sourceCounts: Record<string, number> = {
      Direct: 0,
      "Search Engines": 0,
      "Social Media": 0,
      "Referring Websites": 0,
    };
    let sourceTotal = 0;

    (allSessionsRes.data ?? []).forEach((s) => {
      const src = s.referrer_source || "Direct";
      if (src in sourceCounts) {
        sourceCounts[src] += 1;
      } else {
        sourceCounts["Referring Websites"] += 1;
      }
      sourceTotal += 1;
    });

    const trafficSources = Object.entries(sourceCounts).map(([name, count]) => ({
      name,
      count,
      percentage: sourceTotal > 0 ? Math.round((count / sourceTotal) * 100) : 0,
    }));

    // Verify subscriber status against public.subscribers (single source of truth)
    const rawVisitorRows = recentVisitorsRes.data ?? [];
    const emailsToVerify = Array.from(
      new Set(
        rawVisitorRows
          .map((v: any) => v.subscriber_email)
          .filter((e: any): e is string => typeof e === "string" && e.trim().length > 0)
      )
    );

    const activeSubscribers = new Set<string>();
    if (emailsToVerify.length > 0) {
      const { data: subRows } = await client
        .from("subscribers")
        .select("email, status")
        .in("email", emailsToVerify as any);

      (subRows ?? []).forEach((s: any) => {
        if (!s.status || s.status === "active") {
          activeSubscribers.add(s.email.toLowerCase());
        }
      });
    }

    const recentVisitors = rawVisitorRows.map((v: any) => {
      const email = v.subscriber_email ? String(v.subscriber_email).toLowerCase() : "";
      const isSubscribed = Boolean(email && activeSubscribers.has(email));
      return {
        sessionId: `v-${v.session_id.slice(0, 6)}...`,
        country: v.country || "Unknown",
        countryCode: v.country_code || "XX",
        deviceType: v.device_type || "desktop",
        browser: v.browser || "Unknown",
        os: v.os || "Unknown",
        entryPage: v.entry_page || "/",
        lastActiveAt: v.last_active_at,
        isSubscribed,
        subscriberStatus: isSubscribed ? "Subscribed" : "Not Subscribed",
      };
    });

    return {
      liveNow,
      totalVisitors,
      totalPageViews,
      todayVisitors,
      todayPageViews,
      yesterdayVisitors,
      trafficOverTime,
      popularPages,
      topPosts: (topPostsRes.data ?? []) as any[],
      deviceStats,
      trafficSources,
      recentVisitors,
    };
  });
