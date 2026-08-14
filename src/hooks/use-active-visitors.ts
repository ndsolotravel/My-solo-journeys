import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getLiveVisitorCount, pingVisitor, ACTIVITY_TIMEOUT_MS } from "@/lib/live.functions";

const SESSION_KEY = "ndsolo:visitor-session";
const HEARTBEAT_INTERVAL_MS = 30_000; // 30s heartbeat
const POLL_INTERVAL_MS = 15_000; // refresh live count every 15s

/**
 * Shared session id for this browser (persisted in localStorage). All tabs of
 * the same browser reuse the SAME id so a single visitor is counted once even
 * with many tabs open.
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

/**
 * Real-time "Live Now" count of active visitors.
 * - Registers this browser as an active session (heartbeat).
 * - Polls Supabase for the count every 15s.
 * - Pings + re-polls immediately when the tab regains focus/visibility.
 * - Multiple tabs share one session id, so opening more tabs does not inflate the count.
 */
export function useActiveVisitors(): number {
  const [count, setCount] = useState(0);
  const sessionIdRef = useRef<string | null>(null);
  const mountedRef = useRef(true);

  const pingFn = useServerFn(pingVisitor);
  const getCountFn = useServerFn(getLiveVisitorCount);

  const ping = useCallback(async () => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;
    try {
      await pingFn({ data: { sessionId } });
    } catch {
      // offline / transient — retry on next tick
    }
  }, [pingFn]);

  const poll = useCallback(async () => {
    try {
      const res = await getCountFn();
      if (mountedRef.current && typeof res?.count === "number") {
        setCount(res.count);
      }
    } catch {
      // keep last known value; retry on next tick
    }
  }, [getCountFn]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionIdRef.current = getVisitorSessionId();
    mountedRef.current = true;

    // Register + first count immediately
    void ping();
    void poll();

    const heartbeatTimer = window.setInterval(() => void ping(), HEARTBEAT_INTERVAL_MS);
    const pollTimer = window.setInterval(() => void poll(), POLL_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void ping();
        void poll();
      }
    };
    const onFocus = () => {
      void ping();
      void poll();
    };

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);

    return () => {
      mountedRef.current = false;
      window.clearInterval(heartbeatTimer);
      window.clearInterval(pollTimer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
    };
  }, [ping, poll]);

  return count;
}
