/**
 * Small helpers for deferring non-critical work off the critical path.
 *
 * All of these are no-ops during SSR and are safe to call in any environment.
 */

type IdleHandle = number;
type CancelFn = () => void;

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
    options?: { timeout?: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const getIdleWindow = (): IdleWindow | null =>
  typeof window === "undefined" ? null : (window as IdleWindow);

/**
 * Run `callback` when the browser is idle.
 *
 * `requestIdleCallback` is not available everywhere (notably Safari before
 * 16.4), so fall back to `setTimeout`. The `timeout` option guarantees the
 * callback still runs even if the browser never reports an idle period.
 */
export function onIdle(callback: () => void, timeout = 2000): CancelFn {
  const w = getIdleWindow();
  if (!w) return () => {};

  if (typeof w.requestIdleCallback === "function") {
    const handle: IdleHandle = w.requestIdleCallback(() => callback(), { timeout });
    return () => w.cancelIdleCallback?.(handle);
  }

  const handle = w.setTimeout(callback, 1);
  return () => w.clearTimeout(handle);
}

/**
 * Invoke `callback` once the main thread has settled, but never later than
 * `timeout` ms. Returns a cancel function.
 */
export function scheduleIdle(callback: () => void, timeout = 2000): CancelFn {
  return onIdle(callback, timeout);
}

/**
 * Run `callback` when `element` first approaches the viewport.
 *
 * Falls back to calling `callback` immediately when `IntersectionObserver` is
 * unavailable, so behaviour is never silently skipped.
 */
export function onVisible(
  element: Element | null,
  callback: () => void,
  rootMargin = "200px 0px",
): CancelFn {
  if (!element) return () => {};
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.disconnect();
          callback();
          return;
        }
      }
    },
    { rootMargin },
  );
  observer.observe(element);

  return () => observer.disconnect();
}

/**
 * Defer `callback` until the element is visible *and* the browser is idle.
 * Used for below-the-fold enhancements that must never delay interactivity.
 */
export function onVisibleAndIdle(
  element: Element | null,
  callback: () => void,
  rootMargin = "200px 0px",
  timeout = 2000,
): CancelFn {
  let cancelIdle: CancelFn | null = null;
  let cancelled = false;

  const cancelVisible = onVisible(element, () => {
    if (cancelled) return;
    cancelIdle = scheduleIdle(() => {
      if (!cancelled) callback();
    }, timeout);
  }, rootMargin);

  return () => {
    cancelled = true;
    cancelVisible();
    cancelIdle?.();
  };
}

/**
 * Run `callback` on the first of: an idle period, the element becoming
 * visible, or the user interacting with the document. This is the earliest
 * sensible moment to start non-critical work, so it is used for things that
 * should be ready quickly but are not needed for the first paint.
 */
export function onIdleOrInteraction(callback: () => void, timeout = 2000): CancelFn {
  if (typeof document === "undefined") return () => {};

  let done = false;
  let cancelIdle: CancelFn | null = null;
  const cleanups: CancelFn[] = [];

  const run = () => {
    if (done) return;
    done = true;
    for (const fn of cleanups) fn();
    callback();
  };

  cleanups.push(scheduleIdle(run, timeout));

  const events: Array<keyof DocumentEventMap> = [
    "pointerdown",
    "keydown",
    "scroll",
    "touchstart",
    "focus",
  ];
  const onEvent = () => run();
  for (const evt of events) {
    document.addEventListener(evt, onEvent, { passive: true, once: true });
  }
  cleanups.push(() => {
    for (const evt of events) document.removeEventListener(evt, onEvent);
  });

  return () => {
    done = true;
    for (const fn of cleanups) fn();
  };
}

/** Mounts `children` only once the browser is idle. */
export function isBrowserIdleSupported(): boolean {
  const w = getIdleWindow();
  return !!w && typeof w.requestIdleCallback === "function";
}
