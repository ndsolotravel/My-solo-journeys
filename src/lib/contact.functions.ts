import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor } from "@/lib/admin.functions";

// ────────────────────────────────────────────────────────────────────────────
// Validation Schemas
// ────────────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1, "Please enter your message.").max(5000),
  /** Honeypot — bots fill all fields; humans never see this */
  website: z.string().max(0).optional().default(""),
});

const replySchema = z.object({
  messageId: z.string().uuid(),
  replyBody: z.string().trim().min(1, "Reply body is required.").max(10000),
});

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    };
    return contactSchema.parse(payload);
  })
  .handler(async ({ data }) => {
    // Honeypot: silently drop bot submissions
    if (data.website && data.website.length > 0) {
      return { ok: true, message: "Message sent successfully." };
    }

    console.log(`[contact] Submission received from: ${data.name} <${data.email}>`);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // ── Rate limiting via IP hash ───────────────────────────────────────
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const ipHash = await sha256(ip + (process.env.RATE_LIMIT_SALT || "ndsolotravel-salt"));

    const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();
    const { count: recentCount } = await supabaseAdmin
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneMinuteAgo);

    if ((recentCount ?? 0) >= 3) {
      console.warn(`[contact] Rate limit hit for IP hash: ${ipHash.slice(0, 8)}…`);
      throw new Error("Too many messages. Please wait a minute before trying again.");
    }

    // ── Insert into public.messages via service role ────────────────────
    const subject = data.subject?.trim() || null;

    const { error: insertError } = await supabaseAdmin.from("messages").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      subject,
      message: data.message,
      status: "new",
      ip_hash: ipHash,
    });

    if (insertError) {
      console.error(`[contact] DB insert failed:`, insertError.message);
      throw new Error(
        "Your message could not be saved. Please try again later or email us directly at ndsolotravel@gmail.com.",
      );
    }

    console.log(`[contact] Message stored in Supabase messages table.`);

    // ── Email notification (independent — never blocks success) ─────────
    const emailResult = await dispatchContactNotification({
      name: data.name,
      email: data.email,
      subject,
      message: data.message,
    });

    return {
      ok: true,
      emailDelivered: emailResult.sent,
      message: emailResult.sent
        ? "Message saved and notification sent."
        : "Message saved (email notification could not be delivered).",
    };
  });

// ────────────────────────────────────────────────────────────────────────────
// 2. ADMIN: List Messages
// ────────────────────────────────────────────────────────────────────────────

type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string | null;
  is_read: boolean | null;
  created_at: string;
  updated_at: string | null;
};

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data: msgData, error: msgError } = await client
      .from("messages")
      .select("id,name,email,subject,message,status,is_read,created_at,updated_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (msgError) throw new Error(msgError.message);

    return ((msgData as unknown as MessageRow[]) ?? []).map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      status: m.status || (m.is_read ? "read" : "new"),
      is_read: Boolean(m.is_read || m.status === "read" || m.status === "replied"),
      created_at: m.created_at,
      updated_at: m.updated_at || m.created_at,
    }));
  });

// ────────────────────────────────────────────────────────────────────────────
// 3. ADMIN: Update Message Status
// ────────────────────────────────────────────────────────────────────────────

export const adminUpdateMessageStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "read", "replied"]).optional(),
        is_read: z.boolean().optional(),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const status =
      data.status || (typeof data.is_read === "boolean" ? (data.is_read ? "read" : "new") : "read");

    const { error } = await client
      .from("messages")
      .update({
        status,
        is_read: status === "read" || status === "replied",
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────────────
// 4. ADMIN: Delete Message
// ────────────────────────────────────────────────────────────────────────────

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { error } = await client.from("messages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────────────
// 5. ADMIN: Reply To Message (SMTP)
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

    // Fetch the original message
    const { data: msg, error: fetchErr } = await client
      .from("messages")
      .select("id,name,email,subject")
      .eq("id", data.messageId)
      .single();

    if (fetchErr || !msg) throw new Error("Message not found.");

    // Send reply email via SMTP
    const result = await dispatchContactReply({
      recipientName: (msg as MessageRow).name,
      recipientEmail: (msg as MessageRow).email,
      originalSubject: (msg as MessageRow).subject,
      replyBody: data.replyBody,
    });

    if (!result.sent) {
      throw new Error(result.reason || "Failed to send reply email.");
    }

    // Mark message as replied
    await client
      .from("messages")
      .update({
        status: "replied",
        is_read: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.messageId);

    console.log(`[contact] Reply sent to ${(msg as MessageRow).email} (Message ID: ${data.messageId})`);
    return { ok: true, emailId: result.id };
  });

// ────────────────────────────────────────────────────────────────────────────
// SMTP: Contact Notification (new message → admin inbox)
// ────────────────────────────────────────────────────────────────────────────

interface ContactNotificationParams {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}

interface SmtpResult {
  sent: boolean;
  id?: string;
  reason?: string;
}

async function dispatchContactNotification(params: ContactNotificationParams): Promise<SmtpResult> {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || "ndsolotravel@gmail.com";
  const cleanName = params.name.replace(/["\\]/g, "").trim();
  const replyTo = `"${cleanName}" <${params.email}>`;
  const emailSubject = `[NDSOLOTRAVEL Contact Form] ${params.subject ? `${params.subject} - ` : ""}Message from ${cleanName}`;
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
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Subject:</strong> ${params.subject ? escapeHtml(params.subject) : "N/A"}</p>
          <p style="margin: 0; font-size: 14px;"><strong>Submission Date and Time:</strong> ${submissionDate}</p>
        </div>
        <div style="margin-bottom: 24px;">
          <strong style="font-size: 14px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message:</strong>
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 15px; color: #0f172a; white-space: pre-wrap; word-break: break-word;">${escapeHtml(params.message)}</div>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b;">
          <p style="margin: 0 0 4px 0;"><strong>Reply-To:</strong> Replying to this email will directly reach <a href="mailto:${escapeHtml(params.email)}" style="color: #2563eb;">${escapeHtml(params.email)}</a>.</p>
          <p style="margin: 0;">Delivered via Gmail SMTP to: <strong>${escapeHtml(recipient)}</strong></p>
        </div>
      </div>
    </div>
  `;

  const textContent = `NDSOLOTRAVEL Contact Form\n\nVisitor Name: ${cleanName}\nVisitor Email: ${params.email}\nSubject: ${params.subject || "N/A"}\nSubmission Date and Time: ${submissionDate}\n\nMessage:\n${params.message}\n\n---\nDelivered to: ${recipient}\nDirect replies will go to: ${params.email}`;

  return sendSmtpEmail({
    to: recipient,
    replyTo,
    subject: emailSubject,
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
  const emailSubject = `Re: ${params.originalSubject || "Your message to ndsolotravel"}`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0B1E36; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">NDSOLOTRAVEL</h1>
        <p style="color: #FA8128; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Message Reply</p>
      </div>
      <div style="padding: 24px 28px; color: #1e293b; line-height: 1.6;">
        <p style="margin: 0 0 16px 0; font-size: 15px;">Hi ${escapeHtml(params.recipientName)},</p>
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
    subject: emailSubject,
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
    const reason = "Gmail App Password (SMTP_PASS) is not configured in server environment variables.";
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

    // Verify connection
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
