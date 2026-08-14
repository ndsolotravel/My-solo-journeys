import { useCallback, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { recordPageViewAndPing } from "@/lib/analytics.functions";

const SESSION_KEY = "ndsolo:visitor-session";
const HEARTBEAT_INTERVAL_MS = 30_000; // 30 seconds heartbeat for responsive Live Now tracking

/**
 * Retrieve or generate persistent anonymous Visitor Session ID.
 * Stored in localStorage so all tabs in the same browser share 1 session ID.
 */
export function getVisitorSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID?.() ?? `v-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

/** Parse client user agent to identify device category. */
export function getDeviceType(ua: string): "desktop" | "mobile" | "tablet" {
  if (!ua) return "desktop";
  if (/ipad|tablet|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|windows phone/i.test(ua)) return "mobile";
  return "desktop";
}

/** Parse browser name from user agent string. */
export function getBrowserName(ua: string): string {
  if (!ua) return "Unknown";
  if (/edg/i.test(ua)) return "Edge";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/opera|opr/i.test(ua)) return "Opera";
  return "Other";
}

/** Parse Operating System from user agent string. */
export function getOSName(ua: string): string {
  if (!ua) return "Unknown";
  if (/win/i.test(ua)) return "Windows";
  if (/mac/i.test(ua) && !/iphone|ipad/i.test(ua)) return "macOS";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

/** Categorize document referrer URL into direct, search, social, or referral. */
export function getReferrerSource(referrer: string): string {
  if (!referrer || typeof window === "undefined") return "Direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    const currentHost = window.location.hostname.toLowerCase();
    if (host === currentHost || host.endsWith(`.${currentHost}`)) return "Direct";

    if (/google|bing|duckduckgo|yahoo|baidu|ecosia|yandex/.test(host)) return "Search Engines";
    if (/twitter|t\.co|x\.com|facebook|instagram|linkedin|reddit|pinterest|t\.me|youtube/.test(host))
      return "Social Media";

    return "Referring Websites";
  } catch {
    return "Direct";
  }
}

/**
 * Global lightweight analytics tracker hook.
 * Logs page views on navigation and maintains visitor heartbeat.
 */
export function usePageAnalytics(pathname: string) {
  const lastPathRef = useRef<string | null>(null);
  const trackFn = useServerFn(recordPageViewAndPing);

  const track = useCallback(
    async (isNewPage: boolean) => {
      if (typeof window === "undefined") return;
      const sessionId = getVisitorSessionId();
      if (!sessionId) return;

      const ua = navigator.userAgent || "";
      const deviceType = getDeviceType(ua);
      const browser = getBrowserName(ua);
      const os = getOSName(ua);
      const referrer = document.referrer || "";
      const referrerSource = getReferrerSource(referrer);
      const title = document.title || pathname;

      try {
        await trackFn({
          data: {
            sessionId,
            path: pathname,
            title,
            referrer,
            deviceType,
            browser,
            os,
            referrerSource,
            isNewPageView: isNewPage,
          },
        });
      } catch {
        // Swallowed silently so network interruptions never disrupt user experience
      }
    },
    [pathname, trackFn],
  );

  // Record page view on path change and manage heartbeat
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isNew = lastPathRef.current !== pathname;
    lastPathRef.current = pathname;

    void track(isNew);

    const heartbeatTimer = window.setInterval(() => void track(false), HEARTBEAT_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void track(false);
      } else if (document.visibilityState === "hidden") {
        void track(false);
      }
    };

    const onFocus = () => void track(false);
    const onPageHide = () => void track(false);

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.clearInterval(heartbeatTimer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname, track]);
}
