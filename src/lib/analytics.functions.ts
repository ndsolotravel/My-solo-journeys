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

function formatCountry(code: string | null | undefined): string {
  if (!code || code === "Unknown" || code === "XX") return "Unknown";
  const upper = code.toUpperCase();
  return COUNTRY_NAMES[upper] || upper;
}

/** Server function to ping session heartbeat and optionally record a page view. */
export const recordPageViewAndPing = createServerFn({ method: "POST" })
  .inputValidator((input) =>
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
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Extract country from proxy/CDN headers
    let rawCountry: string | null = null;
    try {
      rawCountry =
        getRequestHeader("cf-ipcountry") ||
        getRequestHeader("x-country-code") ||
        getRequestHeader("x-vercel-ip-country") ||
        null;
    } catch {
      // Header extraction unavailable or client-side context
    }
    const country = formatCountry(rawCountry);
    const nowIso = new Date().toISOString();

    // 1. Check if visitor session exists
    const { data: existingSession } = await supabaseAdmin
      .from("visitor_sessions")
      .select("session_id")
      .eq("session_id", data.sessionId)
      .maybeSingle();

    if (!existingSession) {
      // Insert brand new visitor session
      await supabaseAdmin.from("visitor_sessions").insert({
        session_id: data.sessionId,
        last_active_at: nowIso,
        created_at: nowIso,
        device_type: data.deviceType,
        browser: data.browser,
        os: data.os,
        country: country,
        referrer_source: data.referrerSource,
        entry_page: data.path,
      });
    } else {
      // Update last_active_at timestamp for heartbeat
      await supabaseAdmin
        .from("visitor_sessions")
        .update({
          last_active_at: nowIso,
          ...(country !== "Unknown" ? { country } : {}),
          ...(data.deviceType ? { device_type: data.deviceType } : {}),
          ...(data.browser && data.browser !== "Unknown" ? { browser: data.browser } : {}),
          ...(data.os && data.os !== "Unknown" ? { os: data.os } : {}),
        })
        .eq("session_id", data.sessionId);
    }

    // 2. Insert page view record if this is a distinct page view event
    if (data.isNewPageView) {
      await supabaseAdmin.from("page_views").insert({
        session_id: data.sessionId,
        path: data.path,
        title: data.title || data.path,
        referrer: data.referrer || "",
        created_at: nowIso,
      });
    }

    // 3. Lazy cleanup of obsolete sessions older than 365 days
    try {
      await supabaseAdmin.rpc("cleanup_stale_visitor_sessions");
    } catch {
      // ignore function absence on unmigrated db
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
  .inputValidator((input) =>
    z
      .object({
        period: z.enum(["7d", "30d", "90d", "all"]).optional().default("30d"),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ context, data }) => {
    await assertEditorRole(context.userId, context.supabase);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

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
      // 1. Live Now
      supabaseAdmin
        .from("visitor_sessions")
        .select("session_id", { count: "exact", head: true })
        .gte("last_active_at", cutoff5m),

      // 2. Total Visitors
      supabaseAdmin.from("visitor_sessions").select("session_id", { count: "exact", head: true }),

      // 3. Total Page Views
      supabaseAdmin.from("page_views").select("id", { count: "exact", head: true }),

      // 4. Today Visitors
      supabaseAdmin
        .from("visitor_sessions")
        .select("session_id", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString()),

      // 5. Today Page Views
      supabaseAdmin
        .from("page_views")
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString()),

      // 6. Yesterday Visitors
      supabaseAdmin
        .from("visitor_sessions")
        .select("session_id", { count: "exact", head: true })
        .gte("created_at", yesterdayStart.toISOString())
        .lt("created_at", todayStart.toISOString()),

      // 7. Page Views in period
      supabaseAdmin
        .from("page_views")
        .select("created_at, path, title")
        .gte("created_at", periodStart.toISOString())
        .order("created_at", { ascending: true }),

      // 8. Sessions in period
      supabaseAdmin
        .from("visitor_sessions")
        .select("session_id, created_at, device_type, referrer_source, country")
        .gte("created_at", periodStart.toISOString())
        .order("created_at", { ascending: true }),

      // 9. Device & Source distribution from visitor_sessions
      supabaseAdmin
        .from("visitor_sessions")
        .select("device_type, referrer_source, country")
        .limit(2000),

      // 10. Popular pages overall
      supabaseAdmin
        .from("page_views")
        .select("path, title")
        .limit(5000),

      // 11. Top Blog Posts
      supabaseAdmin
        .from("posts")
        .select("id, title, slug, category, cover_image, views")
        .eq("published", true)
        .order("views", { ascending: false })
        .limit(5),

      // 12. Recent Visitors Log
      supabaseAdmin
        .from("visitor_sessions")
        .select("session_id, country, device_type, browser, os, entry_page, last_active_at")
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

    // Recent Visitors Anonymization
    const recentVisitors = (recentVisitorsRes.data ?? []).map((v) => ({
      sessionId: `v-${v.session_id.slice(0, 6)}...`,
      country: v.country || "Unknown",
      deviceType: v.device_type || "desktop",
      browser: v.browser || "Unknown",
      os: v.os || "Unknown",
      entryPage: v.entry_page || "/",
      lastActiveAt: v.last_active_at,
    }));

    return {
      liveNow,
      totalVisitors,
      totalPageViews,
      todayVisitors,
      todayPageViews,
      yesterdayVisitors,
      trafficOverTime,
      popularPages,
      topPosts: topPostsRes.data ?? [],
      deviceStats,
      trafficSources,
      recentVisitors,
    };
  });
