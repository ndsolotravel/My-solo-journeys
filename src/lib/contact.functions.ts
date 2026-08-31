import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor } from "@/lib/admin.functions";

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────

const MAX_NAME = 120;
const MAX_EMAIL = 320;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW_MS = 5 * 60_000;

const ContactStatus = z.enum(["new", "read", "replied", "archived"]);

// ────────────────────────────────────────────────────────────────────────────
// Validation Schemas
// ────────────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(MAX_NAME, `Name must be ${MAX_NAME} characters or fewer.`),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "Please enter a valid email address.")
    .refine((v) => v.length <= MAX_EMAIL, `Email must be ${MAX_EMAIL} characters or fewer.`),
  subject: z.string().trim().max(MAX_SUBJECT).optional().default(""),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your message.")
    .max(MAX_MESSAGE, `Message must be ${MAX_MESSAGE} characters or fewer.`),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().max(2048).optional().default(""),
});

const replySchema = z.object({
  messageId: z.string().uuid(),
  replyBody: z.string().trim().min(1, "Reply body is required.").max(10000),
});

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export type MessageStatus = "new" | "read" | "replied" | "archived";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: MessageStatus;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  read_at: string | null;
  replied_at: string | null;
  archived_at: string | null;
  email_delivery_status: "pending" | "sent" | "failed";
  email_delivery_error: string | null;
  spam_status: "clean" | "suspected" | "spam";
  spam_score: number;
  ip_hash: string | null;
  user_agent: string | null;
  country: string | null;
};

export type ContactFormConfig = {
  enabled: boolean;
  title: string;
  description: string;
  name_label: string;
  name_placeholder: string;
  name_required: boolean;
  email_label: string;
  email_placeholder: string;
  email_required: boolean;
  subject_label: string;
  subject_placeholder: string;
  subject_required: boolean;
  message_label: string;
  message_placeholder: string;
  message_required: boolean;
  submit_button_text: string;
  success_message: string;
  error_message: string;
  notification_email_enabled: boolean;
  confirmation_email_enabled: boolean;
  notification_email: string;
  max_name: number;
  max_email: number;
  max_subject: number;
  max_message: number;
};

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Escape user-supplied values for safe insertion into HTML. */
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Sanitize a value for safe plain-text display (strip newlines/control in single-line fields). */
function sanitizeLine(value: string, max: number): string {
  return value
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);
}

/** Get the client's IP address from request headers. */
function getClientIp(): string {
  return (
    getRequestHeader("cf-connecting-ip") ||
    getRequestHeader("x-real-ip") ||
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

type AnyClient = any;

/** Load the public-facing contact form configuration from site_settings. */
export const getPublicContactSettings = createServerFn({ method: "GET" }).handler(async () => {
  const defaults: ContactFormConfig = {
    enabled: true,
    title: "Send a Message",
    description:
      "Got a destination to discover, a story to share, or an adventure in mind? Whether it's a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.",
    name_label: "Your Name",
    name_placeholder: "John Doe",
    name_required: true,
    email_label: "Email Address",
    email_placeholder: "john@example.com",
    email_required: true,
    subject_label: "Subject",
    subject_placeholder: "Collaboration, query, or trail notes...",
    subject_required: false,
    message_label: "Your Message",
    message_placeholder: "Write your message here...",
    message_required: true,
    submit_button_text: "Send Message",
    success_message: "Message sent successfully. I'll reply when I'm back from the trail.",
    error_message: "Your message could not be sent. Please try again.",
    notification_email_enabled: true,
    confirmation_email_enabled: false,
    notification_email: process.env.CONTACT_NOTIFICATION_EMAIL || "ndsolotravel@gmail.com",
    max_name: MAX_NAME,
    max_email: MAX_EMAIL,
    max_subject: MAX_SUBJECT,
    max_message: MAX_MESSAGE,
  };

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const keys = [
      "contact_form_enabled",
      "contact_title",
      "contact_description",
      "contact_name_label",
      "contact_name_placeholder",
      "contact_name_required",
      "contact_email_label",
      "contact_email_placeholder",
      "contact_email_required",
      "contact_subject_label",
      "contact_subject_placeholder",
      "contact_subject_required",
      "contact_message_label",
      "contact_message_placeholder",
      "contact_message_required",
      "contact_submit_button_text",
      "contact_success_message",
      "contact_error_message",
      "contact_notification_email_enabled",
      "contact_confirmation_email_enabled",
    ];
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("key, value")
      .in("key", keys);
    if (error || !data) return defaults;

    const map: Record<string, string> = {};
    for (const s of data) map[s.key] = s.value;

    const boolOf = (v: string | undefined, def: boolean) =>
      v === undefined ? def : v === "true" || v === "1";

    return {
      ...defaults,
      enabled: boolOf(map["contact_form_enabled"], true),
      title: map["contact_title"] ?? defaults.title,
      description: map["contact_description"] ?? defaults.description,
      name_label: map["contact_name_label"] ?? defaults.name_label,
      name_placeholder: map["contact_name_placeholder"] ?? defaults.name_placeholder,
      name_required: boolOf(map["contact_name_required"], true),
      email_label: map["contact_email_label"] ?? defaults.email_label,
      email_placeholder: map["contact_email_placeholder"] ?? defaults.email_placeholder,
      email_required: boolOf(map["contact_email_required"], true),
      subject_label: map["contact_subject_label"] ?? defaults.subject_label,
      subject_placeholder: map["contact_subject_placeholder"] ?? defaults.subject_placeholder,
      subject_required: boolOf(map["contact_subject_required"], true),
      message_label: map["contact_message_label"] ?? defaults.message_label,
      message_placeholder: map["contact_message_placeholder"] ?? defaults.message_placeholder,
      message_required: boolOf(map["contact_message_required"], true),
      submit_button_text: map["contact_submit_button_text"] ?? defaults.submit_button_text,
      success_message: map["contact_success_message"] ?? defaults.success_message,
      error_message: map["contact_error_message"] ?? defaults.error_message,
      notification_email_enabled: boolOf(map["contact_notification_email_enabled"], true),
      confirmation_email_enabled: boolOf(map["contact_confirmation_email_enabled"], false),
    } satisfies ContactFormConfig;
  } catch {
    return defaults;
  }
});

// ────────────────────────────────────────────────────────────────────────────
// Turnstile Validation
// ────────────────────────────────────────────────────────────────────────────

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    // Turnstile not configured — gracefully allow (degraded mode).
    return true;
  }
  if (!token) return false;

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Spam Scoring
// ────────────────────────────────────────────────────────────────────────────

/** Compute a simple heuristic spam score (0 - 100). */
function computeSpamScore(name: string, email: string, subject: string, message: string): number {
  let score = 0;
  const text = `${name} ${email} ${subject} ${message}`.toLowerCase();

  // Excessive links
  const links = (text.match(/https?:\/\//g) || []).length;
  if (links >= 3) score += 25;
  else if (links >= 1) score += 10;

  // URL-only messages (no words)
  if (links > 0 && text.replace(/https?:\/\/[^\s]+/g, "").trim().length < 20) score += 30;

  // Excessive caps
  const caps = (message.match(/[A-Z]/g) || []).length;
  if (message.length > 0 && caps / message.length > 0.6 && message.length > 30) score += 15;

  // Repeated characters (spam typing pattern theatre)
  if (/(.)\1{5,}/.test(message)) score += 15;

  // Common spam keywords
  const spamWords = [
    "viagra",
    "casino",
    "lottery",
    "prize",
    "winner",
    "bitcoin",
    "crypto",
    "cryptocurrency",
    "free money",
    "get rich",
    "cialis",
    "loan",
    "mortgage",
    "click here",
    "click this link",
    "invest now",
    "make money fast",
  ];
  for (const w of spamWords) {
    if (text.includes(w)) {
      score += 20;
      break;
    }
  }

  return Math.min(100, score);
}

// ────────────────────────────────────────────────────────────────────────────
// 1. PUBLIC: Submit Contact Message
// ────────────────────────────────────────────────────────────────────────────

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const raw =
      input && typeof input === "object" && "data" in input
        ? (input as { data: unknown }).data
        : input;
    const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const payload = {
      name: typeof record.name === "string" ? record.name.trim() : "",
      email: typeof record.email === "string" ? record.email.trim() : "",
      subject: typeof record.subject === "string" ? record.subject.trim() : "",
      message: typeof record.message === "string" ? record.message.trim() : "",
      website: typeof record.website === "string" ? record.website.trim() : "",
      turnstileToken: typeof record.turnstileToken === "string" ? record.turnstileToken : "",
    };
    return contactSchema.parse(payload);
  })
  .handler(async ({ data }) => {
    // ── Honeypot: silently accept but drop bot submissions ────────────────
    if (data.website && data.website.length > 0) {
      console.log("[contact] Honeypot triggered — dropping submission.");
      return {
        ok: true,
        message: "Thanks! Your message is on its way.",
        emailDelivered: false,
        saved: false,
      };
    }

    // ── Turnstile validation (server-side) ────────────────────────────────
    const turnstileOk = await verifyTurnstile(data.turnstileToken);
    if (!turnstileOk) {
      console.warn("[contact] Turnstile validation failed.");
      return {
        ok: false,
        message: "Security check failed. Please try again.",
        emailDelivered: false,
        saved: false,
        code: "TURNSTILE_FAILED",
      };
    }

    console.log(`[contact] Submission received from: ${data.name} <${data.email}>`);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // ── Resolve IP + user agent ───────────────────────────────────────────
    const ip = getClientIp();
    const ipHash = await sha256(ip + (process.env.RATE_LIMIT_SALT || "ndsolotravel-salt"));
    const userAgent = getRequestHeader("user-agent")?.slice(0, 512) || null;

    // ── Rate limiting via IP hash ─────────────────────────────────────────
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count: recentCount } = await supabaseAdmin
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", windowStart);

    if ((recentCount ?? 0) >= RATE_LIMIT_MAX) {
      console.warn(`[contact] Rate limit hit for IP hash: ${ipHash.slice(0, 8)}…`);
      return {
        ok: false,
        message: "Please wait a moment before sending another message.",
        emailDelivered: false,
        saved: false,
        code: "RATE_LIMITED",
      };
    }

    // ── Duplicate submission protection ───────────────────────────────────
    const dupWindowStart = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();
    const { data: recentDup } = await supabaseAdmin
      .from("messages")
      .select("id")
      .eq("email", data.email)
      .eq("message", data.message)
      .gte("created_at", dupWindowStart)
      .limit(1);

    if (recentDup && recentDup.length > 0) {
      console.log("[contact] Duplicate submission detected — dropping.");
      return {
        ok: true,
        message: "Thanks! Your message is on its way.",
        emailDelivered: false,
        saved: false,
      };
    }

    // ── Compute spam score ────────────────────────────────────────────────
    const subject = data.subject?.trim() || null;
    const spamScore = computeSpamScore(data.name, data.email, subject || "", data.message);
    const spamStatus = spamScore >= 70 ? "spam" : spamScore >= 40 ? "suspected" : "clean";

    // ── Insert into public.messages via service role ──────────────────────
    const record: Record<string, unknown> = {
      name: data.name,
      email: data.email.toLowerCase(),
      subject,
      message: data.message,
      status: "new",
      is_read: false,
      ip_hash: ipHash,
      user_agent: userAgent,
      country: null,
      spam_status: spamStatus,
      spam_score: spamScore,
      email_delivery_status: "pending",
      email_delivery_error: null,
    };

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("messages")
      .insert(record)
      .select("id")
      .single();

    if (insertError) {
      console.error(`[contact] DB insert failed:`, insertError.message);
      return {
        ok: false,
        message:
          "Your message could not be saved. Please try again later or email us directly at ndsolotravel@gmail.com.",
        emailDelivered: false,
        saved: false,
        code: "DB_ERROR",
      };
    }

    const messageId = inserted?.id as string | undefined;
    console.log(`[contact] Message stored in Supabase messages table (id: ${messageId}).`);

    // ── Email notification (independent — never blocks success) ───────────
    let deliveryStatus: "pending" | "sent" | "failed" = "pending";
    let deliveryError: string | null = null;

    const config = await getPublicContactSettings();
    const notifyEnabled = config.notification_email_enabled !== false;

    if (notifyEnabled) {
      const emailResult = await dispatchContactNotification({
        name: data.name,
        email: data.email,
        subject,
        message: data.message,
        messageId,
      });
      deliveryStatus = emailResult.sent ? "sent" : "failed";
      deliveryError = emailResult.sent ? null : (emailResult.reason ?? null);
    }

    // ── Record email delivery status ──────────────────────────────────────
    if (messageId) {
      await supabaseAdmin
        .from("messages")
        .update({
          email_delivery_status: deliveryStatus,
          email_delivery_error: deliveryError,
        })
        .eq("id", messageId);
    }

    // ── Optional visitor confirmation email ───────────────────────────────
    if (config.confirmation_email_enabled !== false && data.email) {
      await dispatchContactConfirmation({
        name: data.name,
        email: data.email,
        subject,
      });
    }

    return {
      ok: true,
      emailDelivered: deliveryStatus === "sent",
      saved: true,
      message:
        deliveryStatus === "sent" ? "Message saved and notification sent." : "Message saved.",
    };
  });

// ────────────────────────────────────────────────────────────────────────────
// 2. ADMIN: List Messages (with search/filter/sort)
// ────────────────────────────────────────────────────────────────────────────

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) =>
    z
      .object({
        limit: z.number().int().min(1).max(500).optional().default(500),
        offset: z.number().int().min(0).optional().default(0),
      })
      .parse(i ?? {}),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const {
      data: msgData,
      error: msgError,
      count,
    } = await client
      .from("messages")
      .select(
        "id,name,email,subject,message,status,is_read,created_at,updated_at,read_at,replied_at,archived_at,email_delivery_status,email_delivery_error,spam_status,spam_score,ip_hash,user_agent,country",
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .range(data.offset, data.offset + data.limit - 1);

    if (msgError) throw new Error(msgError.message);

    const rows = (msgData as unknown as ContactMessage[] | null) ?? [];

    return {
      items: rows.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        status: (m.status || (m.is_read ? "read" : "new")) as MessageStatus,
        is_read: Boolean(m.is_read || m.status === "read" || m.status === "replied"),
        created_at: m.created_at,
        updated_at: m.updated_at || m.created_at,
        read_at: m.read_at,
        replied_at: m.replied_at,
        archived_at: m.archived_at,
        email_delivery_status: m.email_delivery_status || "pending",
        email_delivery_error: m.email_delivery_error,
        spam_status: m.spam_status || "clean",
        spam_score: m.spam_score ?? 0,
        ip_hash: m.ip_hash ? `${m.ip_hash.slice(0, 8)}…` : null,
        user_agent: m.user_agent,
        country: m.country,
      })),
      total: count ?? rows.length,
    };
  });

// ────────────────────────────────────────────────────────────────────────────
// 3. ADMIN: Get single message (and auto-mark as read if new)
// ────────────────────────────────────────────────────────────────────────────

export const adminGetMessage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data: row, error } = await client
      .from("messages")
      .select(
        "id,name,email,subject,message,status,is_read,created_at,updated_at,read_at,replied_at,archived_at,email_delivery_status,email_delivery_error,spam_status,spam_score,ip_hash,user_agent,country",
      )
      .eq("id", data.id)
      .single();

    if (error) throw new Error("Message not found.");
    const m = row as unknown as ContactMessage;

    // Auto-mark new → read (do not change replied/archived)
    if (m.status === "new") {
      await client
        .from("messages")
        .update({ status: "read", is_read: true, read_at: new Date().toISOString() })
        .eq("id", data.id);
      m.status = "read";
      m.is_read = true;
      m.read_at = new Date().toISOString();
    }

    return {
      id: m.id,
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      status: m.status as MessageStatus,
      is_read: m.is_read,
      created_at: m.created_at,
      updated_at: m.updated_at || m.created_at,
      read_at: m.read_at,
      replied_at: m.replied_at,
      archived_at: m.archived_at,
      email_delivery_status: m.email_delivery_status || "pending",
      email_delivery_error: m.email_delivery_error,
      spam_status: m.spam_status || "clean",
      spam_score: m.spam_score ?? 0,
      ip_hash: m.ip_hash ? `${m.ip_hash.slice(0, 8)}…` : null,
      user_agent: m.user_agent,
      country: m.country,
    };
  });

// ────────────────────────────────────────────────────────────────────────────
// 4. ADMIN: Update Message Status
// ────────────────────────────────────────────────────────────────────────────

export const adminUpdateMessageStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: ContactStatus.optional(),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    if (!data.status) return { ok: true };

    const now = new Date().toISOString();
    const patch: Record<string, unknown> = {
      status: data.status,
      is_read: data.status === "read" || data.status === "replied" || data.status === "archived",
      updated_at: now,
    };

    if (data.status === "read") patch.read_at = now;
    if (data.status === "replied") patch.replied_at = now;
    if (data.status === "archived") patch.archived_at = now;

    const { error } = await client.from("messages").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────────────
// 5. ADMIN: Delete Message
// ────────────────────────────────────────────────────────────────────────────

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { error } = await client.from("messages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────────────
// 6. ADMIN: Reply To Message (SMTP)
// ────────────────────────────────────────────────────────────────────────────

export const adminReplyToMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => {
    const raw =
      input && typeof input === "object" && "data" in input
        ? (input as { data: unknown }).data
        : input;
    return replySchema.parse(raw);
  })
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data: msg, error: fetchErr } = await client
      .from("messages")
      .select("id,name,email,subject,email_delivery_status")
      .eq("id", data.messageId)
      .single();

    if (fetchErr || !msg) throw new Error("Message not found.");
    const m = msg as unknown as ContactMessage;

    const result = await dispatchContactReply({
      recipientName: m.name,
      recipientEmail: m.email,
      originalSubject: m.subject,
      replyBody: data.replyBody,
    });

    if (!result.sent) {
      throw new Error(result.reason || "Failed to send reply email.");
    }

    const now = new Date().toISOString();
    await client
      .from("messages")
      .update({
        status: "replied",
        is_read: true,
        replied_at: now,
        updated_at: now,
      })
      .eq("id", data.messageId);

    console.log(`[contact] Reply sent to ${m.email} (Message ID: ${data.messageId})`);
    return { ok: true, emailId: result.id };
  });

// ────────────────────────────────────────────────────────────────────────────
// 7. ADMIN: Unread count (for CMS navigation badge)
// ────────────────────────────────────────────────────────────────────────────

export const adminGetUnreadCount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { count } = await client
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new");
    return count ?? 0;
  });

// ────────────────────────────────────────────────────────────────────────────
// 8. ADMIN: Contact form settings (full)
// ────────────────────────────────────────────────────────────────────────────

async function loadContactSettings(client: AnyClient): Promise<Record<string, string>> {
  const { data, error } = await client
    .from("site_settings")
    .select("key, value")
    .like("key", "contact_%");
  if (error || !data) return {};
  const map: Record<string, string> = {};
  for (const s of data) map[s.key] = s.value;
  return map;
}

export const adminGetContactSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    return loadContactSettings(client);
  });

export const adminSaveContactSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => {
    const raw =
      input && typeof input === "object" && "data" in input
        ? (input as { data: unknown }).data
        : input;
    const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const settings =
      record && typeof (record as Record<string, unknown>).settings === "object"
        ? (record as Record<string, unknown>).settings
        : record;
    return z
      .object({
        settings: z.record(z.string()),
      })
      .parse({ settings });
  })
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    // Only allow persist of known contact_ prefixed keys (prevent arbitrary writes)
    const allowedPrefix = "contact_";
    const safeEntries = Object.entries(data.settings).filter(([key]) =>
      key.startsWith(allowedPrefix),
    );

    if (safeEntries.length === 0) return { ok: true, saved: 0 };

    const now = new Date().toISOString();
    const rows = safeEntries.map(([key, value]) => ({
      key,
      value: String(value).trim(),
      updated_at: now,
    }));

    const { error } = await client.from("site_settings").upsert(rows, { onConflict: "key" });

    if (error) throw new Error(error.message);
    return { ok: true, saved: rows.length };
  });

// ────────────────────────────────────────────────────────────────────────────
// SMTP: Contact Notification (new message → admin inbox)
// ────────────────────────────────────────────────────────────────────────────

interface ContactNotificationParams {
  name: string;
  email: string;
  subject: string | null;
  message: string;
  messageId?: string;
}

interface SmtpResult {
  sent: boolean;
  id?: string;
  reason?: string;
}

async function dispatchContactNotification(params: ContactNotificationParams): Promise<SmtpResult> {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || "ndsolotravel@gmail.com";
  const cleanName = sanitizeLine(params.name.replace(/["\\]/g, ""), 120);
  const replyTo = `"${cleanName}" <${sanitizeLine(params.email, 320)}>`;
  const subjectLine = sanitizeLine(
    `[NDSOLOTRAVEL Contact Form] ${params.subject ? `${params.subject} - ` : ""}Message from ${cleanName}`,
    200,
  );
  const submissionDate = new Date().toUTCString();

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0B1E36; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">NDSOLOTRAVEL</h1>
        <p style="color: #FA8128; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">New Contact Form Message</p>
      </div>
      <div style="padding: 24px 28px; color: #1e293b; line-height: 1.6;">
        <p style="margin: 0 0 16px 0; font-size: 15px;">A new contact message has been submitted on NDSOLOTRAVEL:</p>
        <div style="background-color: #f8fafc; border-left: 4px solid #FA8128; border-radius: 4px; padding: 16px 18px; margin-bottom: 20px;">
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Visitor Name:</strong> ${escapeHtml(cleanName)}</p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Visitor Email:</strong> <a href="mailto:${escapeHtml(params.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(params.email)}</a></p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Subject:</strong> ${params.subject ? escapeHtml(sanitizeLine(params.subject, 200)) : "N/A"}</p>
          <p style="margin: 0; font-size: 14px;"><strong>Submission Date and Time:</strong> ${submissionDate}</p>
        </div>
        <div style="margin-bottom: 24px;">
          <strong style="font-size: 14px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message:</strong>
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 15px; color: #0f172a; white-space: pre-wrap; word-break: break-word;">${escapeHtml(params.message)}</div>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b;">
          <p style="margin: 0 0 4px 0;"><strong>Reply-To:</strong> Replying to this email will directly reach <a href="mailto:${escapeHtml(params.email)}" style="color: #2563eb;">${escapeHtml(params.email)}</a>.</p>
          <p style="margin: 0;">Delivered to: <strong>${escapeHtml(recipient)}</strong>${params.messageId ? ` · Message ID: ${params.messageId}` : ""}</p>
        </div>
      </div>
    </div>
  `;

  const textContent = `NDSOLOTRAVEL Contact Form\n\nVisitor Name: ${cleanName}\nVisitor Email: ${params.email}\nSubject: ${params.subject || "N/A"}\nSubmission Date and Time: ${submissionDate}\n\nMessage:\n${params.message}\n\n---\nDelivered to: ${recipient}\nDirect replies will go to: ${params.email}`;

  return sendSmtpEmail({
    to: recipient,
    replyTo,
    subject: subjectLine,
    html: htmlContent,
    text: textContent,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// SMTP: Visitor Confirmation (optional)
// ────────────────────────────────────────────────────────────────────────────

interface ContactConfirmationParams {
  name: string;
  email: string;
  subject: string | null;
}

async function dispatchContactConfirmation(params: ContactConfirmationParams): Promise<SmtpResult> {
  const cleanName = sanitizeLine(params.name.replace(/["\\]/g, ""), 120);
  const subjectLine = sanitizeLine(
    params.subject ? `Re: ${params.subject}` : "Thank you for contacting NDSOLOTRAVEL",
    200,
  );

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0B1E36; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">NDSOLOTRAVEL</h1>
        <p style="color: #FA8128; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Message Received</p>
      </div>
      <div style="padding: 24px 28px; color: #1e293b; line-height: 1.6;">
        <p style="margin: 0 0 16px 0; font-size: 15px;">Hi ${escapeHtml(cleanName)},</p>
        <p style="margin: 0 0 16px 0; font-size: 15px;">Thank you for reaching out to NDSOLOTRAVEL. Your message has been received, and I'll get back to you as soon as possible — typically within 24-48 hours.</p>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">— NDSOLOTRAVEL Team</p>
          <p style="margin: 4px 0 0 0;">Visit us at <a href="https://ndsolotravel.com" style="color: #2563eb; text-decoration: none;">ndsolotravel.com</a></p>
        </div>
      </div>
    </div>
  `;

  const textContent = `Hi ${cleanName},\n\nThank you for reaching out to NDSOLOTRAVEL. Your message has been received, and I'll get back to you as soon as possible — typically within 24-48 hours.\n\n— NDSOLOTRAVEL Team\nVisit us at https://ndsolotravel.com`;

  return sendSmtpEmail({
    to: params.email,
    subject: subjectLine,
    html: htmlContent,
    text: textContent,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// SMTP: Contact Reply (admin → visitor)
// ────────────────────────────────────────────────────────────────────────────

interface ContactReplyParams {
  recipientName: string;
  recipientEmail: string;
  originalSubject: string | null;
  replyBody: string;
}

async function dispatchContactReply(params: ContactReplyParams): Promise<SmtpResult> {
  const senderName = "NDSOLOTRAVEL";
  const subjectLine = sanitizeLine(
    `Re: ${params.originalSubject || "Your message to ndsolotravel"}`,
    200,
  );

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0B1E36; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">NDSOLOTRAVEL</h1>
        <p style="color: #FA8128; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Message Reply</p>
      </div>
      <div style="padding: 24px 28px; color: #1e293b; line-height: 1.6;">
        <p style="margin: 0 0 16px 0; font-size: 15px;">Hi ${escapeHtml(sanitizeLine(params.recipientName, 120))},</p>
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px; font-size: 15px; color: #0f172a; white-space: pre-wrap; word-break: break-word;">${escapeHtml(params.replyBody)}</div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">— ${senderName} Team</p>
          <p style="margin: 4px 0 0 0;">Visit us at <a href="https://ndsolotravel.com" style="color: #2563eb; text-decoration: none;">ndsolotravel.com</a></p>
        </div>
      </div>
    </div>
  `;

  const textContent = `Hi ${params.recipientName},\n\n${params.replyBody}\n\n— ${senderName} Team\nVisit us at https://ndsolotravel.com`;

  return sendSmtpEmail({
    to: params.recipientEmail,
    subject: subjectLine,
    html: htmlContent,
    text: textContent,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// SMTP: Shared Transporter
// ────────────────────────────────────────────────────────────────────────────

interface SmtpEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

async function sendSmtpEmail(params: SmtpEmailParams): Promise<SmtpResult> {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER || "ndsolotravel@gmail.com";
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpFrom = process.env.SMTP_FROM || "NDSOLOTRAVEL <ndsolotravel@gmail.com>";

  if (!smtpPass) {
    const reason =
      "Gmail App Password (SMTP_PASS) is not configured in server environment variables.";
    console.warn(`[contact] SMTP skipped: ${reason}`);
    return { sent: false, reason };
  }

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass },
    });

    try {
      await transporter.verify();
      console.log(`[contact] SMTP connected: ${smtpHost}:${smtpPort}`);
    } catch (verifyErr: unknown) {
      const msg = verifyErr instanceof Error ? verifyErr.message : String(verifyErr);
      console.warn(`[contact] SMTP verify notice: ${msg}`);
    }

    const mailOptions: Record<string, string> = {
      from: smtpFrom,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
    };
    if (params.replyTo) mailOptions.replyTo = params.replyTo;

    const info = await transporter.sendMail(mailOptions);
    console.log(`[contact] Email sent (ID: ${info.messageId})`);
    return { sent: true, id: info.messageId };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[contact] Email delivery failed: ${errMsg}`);
    return { sent: false, reason: errMsg };
  }
}
