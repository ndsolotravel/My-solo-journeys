export type CookieConsentStatus = "accepted" | "rejected" | null;

export const COOKIE_CONSENT_KEY = "ndsolo_cookie_consent";
export const COOKIE_CONSENT_DISMISSED_KEY = "ndsolo_cookie_consent_dismissed";
export const COOKIE_CONSENT_DATE_KEY = "ndsolo_cookie_consent_date";

/**
 * Retrieve current persistent cookie consent preference if set.
 * Returns "accepted", "rejected", or null if not yet determined.
 */
export function getCookieConsent(): CookieConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const val = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (val === "accepted" || val === "rejected") {
      return val;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if the user has dismissed the popup for the current session (via "Close" button or Esc).
 */
export function isConsentDismissedThisSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(COOKIE_CONSENT_DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Synchronize consent preference with Google Consent Mode v2 and Google Tag Manager/DataLayer.
 * Fails gracefully and silently if Google tags are not active.
 */
export function syncGoogleConsentMode(status: "accepted" | "rejected") {
  if (typeof window === "undefined") return;

  const isGranted = status === "accepted";
  const consentState = isGranted ? "granted" : "denied";

  try {
    // Google Consent Mode v2 standard parameters
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: consentState,
        ad_storage: consentState,
        ad_user_data: consentState,
        ad_personalization: consentState,
      });
    }

    // Google Tag Manager / dataLayer push
    if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: "cookie_consent_update",
        cookie_consent: status,
      });
    }
  } catch {
    // Ignore any tracking initialization errors
  }
}

/**
 * Accept all cookies (essential, functionality, analytics, performance).
 * Persists choice in localStorage and updates Google Consent Mode.
 */
export function acceptCookies() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    window.localStorage.setItem(COOKIE_CONSENT_DATE_KEY, new Date().toISOString());
    // Clear session dismissal flag once a permanent choice is made
    window.sessionStorage.removeItem(COOKIE_CONSENT_DISMISSED_KEY);
  } catch {}

  syncGoogleConsentMode("accepted");

  try {
    window.dispatchEvent(
      new CustomEvent("cookie_consent_updated", { detail: { consent: "accepted" } })
    );
  } catch {}
}

/**
 * Reject non-essential cookies (keeps essential cookies for core functionality like theme/language).
 * Persists choice in localStorage and denies non-essential consent.
 */
export function rejectCookies() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    window.localStorage.setItem(COOKIE_CONSENT_DATE_KEY, new Date().toISOString());
    // Clear session dismissal flag once a permanent choice is made
    window.sessionStorage.removeItem(COOKIE_CONSENT_DISMISSED_KEY);
  } catch {}

  syncGoogleConsentMode("rejected");

  try {
    window.dispatchEvent(
      new CustomEvent("cookie_consent_updated", { detail: { consent: "rejected" } })
    );
  } catch {}
}

/**
 * Dismiss the popup for the current session without saving a permanent preference.
 * The popup will not show on page refresh or route navigation during this session,
 * but will reappear in future browser sessions until the user chooses Accept or Reject.
 */
export function dismissCookieForSession() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(COOKIE_CONSENT_DISMISSED_KEY, "1");
  } catch {}

  try {
    window.dispatchEvent(
      new CustomEvent("cookie_consent_updated", { detail: { consent: "dismissed_session" } })
    );
  } catch {}
}

/**
 * Helper to programmatically reopen the cookie consent popup (e.g. from the Footer).
 */
export function openCookieConsentModal() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("open_cookie_consent"));
  } catch {}
}
