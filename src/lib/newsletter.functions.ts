import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor } from "@/lib/admin.functions";

type RpcSubscribeResult = {
  id?: string;
  created?: boolean;
};

type SubscriberRow = {
  id: string;
  email: string;
  status: string | null;
  subscribed_at: string;
};

export const subscribe = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const raw =
      input && typeof input === "object" && "data" in input
        ? (input as { data: unknown }).data
        : input;
    const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const email = typeof record.email === "string" ? record.email.trim() : "";
    const sessionId = typeof record.sessionId === "string" ? record.sessionId.trim() : "";
    return z
      .object({
        email: z.string().email("Please enter a valid email address."),
        sessionId: z.string().optional().default(""),
      })
      .parse({ email, sessionId });
  })
  .handler(async ({ data }) => {
    const subscriberEmail = data.email.toLowerCase();
    console.log(`[subscribe] Processing newsletter subscription for: <${subscriberEmail}>`);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rpcRaw, error: dbError } = await supabaseAdmin.rpc("newsletter_subscribe", {
      p_email: subscriberEmail,
    });

    const rpcData = rpcRaw as RpcSubscribeResult | null;

    if (dbError) {
      console.error(`[subscribe] Supabase newsletter_subscribe RPC error: ${dbError.message}`);
      throw new Error(
        "Subscription could not be saved. Please try again later or email us directly at ndsolotravel@gmail.com.",
      );
    }
    if (!rpcData?.id) {
      console.error(`[subscribe] Subscriber insert returned no id (RLS or insert blocked).`);
      throw new Error(
        "Subscription could not be saved. Please try again later or email us directly at ndsolotravel@gmail.com.",
      );
    }

    // Link subscriber_email to current visitor session if sessionId is available
    if (data.sessionId) {
      try {
        await supabaseAdmin
          .from("visitor_sessions")
          .update({ subscriber_email: subscriberEmail })
          .eq("session_id", data.sessionId);
      } catch (err) {
        console.warn(
          `[subscribe] Could not link subscriber email to session <${data.sessionId}>:`,
          err,
        );
      }
    }

    const isNew = rpcData.created !== false;

    if (!isNew) {
      console.log(`[subscribe] Subscriber already exists in Supabase: <${subscriberEmail}>`);
      return {
        ok: true,
        created: false,
        alreadySubscribed: true,
        message: "You are already subscribed.",
      };
    }

    console.log(`[subscribe] New subscriber record saved in Supabase: <${subscriberEmail}>`);
    return {
      ok: true,
      created: true,
      alreadySubscribed: false,
      message: "Subscribed. Welcome aboard.",
    };
  });

export const adminListSubscribers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data: fullData, error: fullError } = await client
      .from("subscribers")
      .select("id, email, status, subscribed_at")
      .order("subscribed_at", { ascending: false });

    if (!fullError && fullData) {
      return (fullData as SubscriberRow[]).map((r) => ({
        id: r.id,
        email: r.email,
        status: (r.status === "unsubscribed" ? "unsubscribed" : "active") as
          | "active"
          | "unsubscribed",
        subscribed_at: r.subscribed_at,
      }));
    }

    const { data: basicData, error: basicError } = await client
      .from("subscribers")
      .select("id, email, subscribed_at")
      .order("subscribed_at", { ascending: false });

    if (basicError) throw new Error(basicError.message);

    return ((basicData as SubscriberRow[]) ?? []).map((r) => ({
      id: r.id,
      email: r.email,
      status: "active" as const,
      subscribed_at: r.subscribed_at,
    }));
  });

export const adminUpdateSubscriberStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => {
    const raw =
      input && typeof input === "object" && "data" in input
        ? (input as { data: unknown }).data
        : input;
    return z
      .object({
        id: z.string().uuid(),
        status: z.enum(["active", "unsubscribed"]),
      })
      .parse(raw);
  })
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { error } = await client
      .from("subscribers")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteSubscriber = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => {
    const raw =
      input && typeof input === "object" && "data" in input
        ? (input as { data: unknown }).data
        : input;
    return z
      .object({
        id: z.string().uuid(),
      })
      .parse(raw);
  })
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { error } = await client.from("subscribers").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1, "Please enter your message.").max(5000),
  // Honeypot — bots fill all fields; humans never see it
  website: z.string().max(0).optional().default(""),
});

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const sendContact = createServerFn({ method: "POST" })
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
    console.log(`[sendContact] Contact submission received from: ${data.name} <${data.email}>`);

    const { supabase } = await import("@/integrations/supabase/client");

    // Rate-limit tracking: compute IP hash
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const subject = data.subject?.trim() || null;

    // 1. Insert record into public.messages table via public anon client (honoring RLS insert-only policy)
    const { error: msgError } = await supabase.from("messages").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      subject: subject,
      message: data.message,
      status: "new",
    });

    if (msgError) {
      console.error(`[sendContact] Database insert failed for messages:`, msgError.message);
      throw new Error(
        "Your message could not be saved. Please try again later or email us directly at ndsolotravel@gmail.com.",
      );
    }

    console.log(
      `[sendContact] Supabase insert successful: Stored message in Supabase messages table.`,
    );

    // 2. Email notification dispatch via Gmail SMTP (independent operation)
    const emailResult = await dispatchContactNotification({
      name: data.name,
      email: data.email,
      subject,
      message: data.message,
    });

    return {
      ok: true,
      emailDelivered: emailResult.sent,
      provider: emailResult.provider,
      messageId: emailResult.id,
      recipient: emailResult.recipient,
      emailReason: emailResult.reason,
      message: emailResult.sent
        ? "Database saved and email sent"
        : "Database saved but email notification failed",
    };
  });

interface ContactNotificationParams {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}

interface NotificationResult {
  sent: boolean;
  provider: "gmail-smtp" | "none";
  id?: string;
  reason?: string;
  recipient: string;
}

async function dispatchContactNotification(
  params: ContactNotificationParams,
): Promise<NotificationResult> {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || "ndsolotravel@gmail.com";

  const cleanName = params.name.replace(/["\\]/g, "").trim();
  const replyTo = `"${cleanName}" <${params.email}>`;
  const emailSubject = `[NDSOLOTRAVEL Contact Form] ${params.subject ? `${params.subject} - ` : ""}Message from ${cleanName}`;

  const escape = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const submissionDate = new Date().toUTCString();

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0B1E36; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">NDSOLOTRAVEL</h1>
        <p style="color: #FA8128; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">NDSOLOTRAVEL Contact Form</p>
      </div>
      <div style="padding: 24px 28px; color: #1e293b; line-height: 1.6;">
        <p style="margin: 0 0 16px 0; font-size: 15px;">A new contact message has been submitted on NDSOLOTRAVEL:</p>
        <div style="background-color: #f8fafc; border-left: 4px solid #FA8128; border-radius: 4px; padding: 16px 18px; margin-bottom: 20px;">
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Visitor Name:</strong> ${escape(cleanName)}</p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Visitor Email:</strong> <a href="mailto:${escape(params.email)}" style="color: #2563eb; text-decoration: none;">${escape(params.email)}</a></p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Subject:</strong> ${params.subject ? escape(params.subject) : "N/A"}</p>
          <p style="margin: 0; font-size: 14px;"><strong>Submission Date and Time:</strong> ${submissionDate}</p>
        </div>
        <div style="margin-bottom: 24px;">
          <strong style="font-size: 14px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message:</strong>
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 15px; color: #0f172a; white-space: pre-wrap; word-break: break-word;">${escape(params.message)}</div>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b;">
          <p style="margin: 0 0 4px 0;"><strong>Reply-To:</strong> Replying to this email will directly reach <a href="mailto:${escape(params.email)}" style="color: #2563eb;">${escape(params.email)}</a>.</p>
          <p style="margin: 0;">Delivered via Gmail SMTP to: <strong>${escape(recipient)}</strong></p>
        </div>
      </div>
    </div>
  `;

  const textContent = `NDSOLOTRAVEL Contact Form

Visitor Name: ${cleanName}
Visitor Email: ${params.email}
Subject: ${params.subject || "N/A"}
Submission Date and Time: ${submissionDate}

Message:
${params.message}

---
Delivered to: ${recipient}
Direct replies will go to: ${params.email}`;

  // Gmail SMTP configuration
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpSecure = process.env.SMTP_SECURE === "true"; // false for port 587 (STARTTLS)
  const smtpUser = process.env.SMTP_USER || "ndsolotravel@gmail.com";
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpFrom = process.env.SMTP_FROM || "NDSOLOTRAVEL <ndsolotravel@gmail.com>";

  if (!smtpPass) {
    const reason =
      "Gmail App Password (SMTP_PASS) is not configured in server environment variables.";
    console.warn(`[sendContact] Email delivery failed: ${reason} (Target: ${recipient})`);
    return {
      sent: false,
      provider: "none",
      reason,
      recipient,
    };
  }

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify SMTP connection before dispatching
    try {
      await transporter.verify();
      console.log(
        `[sendContact] SMTP connection successful: Connected to ${smtpHost}:${smtpPort} as ${smtpUser}`,
      );
    } catch (verifyErr: unknown) {
      const verifyMsg = verifyErr instanceof Error ? verifyErr.message : String(verifyErr);
      console.warn(`[sendContact] SMTP verify notice: ${verifyMsg}`);
    }

    const info = await transporter.sendMail({
      from: smtpFrom,
      to: recipient,
      replyTo,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[sendContact] Email accepted by Gmail SMTP (Message ID: ${info.messageId})`);
    return {
      sent: true,
      provider: "gmail-smtp",
      id: info.messageId,
      recipient,
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    console.error(`[sendContact] Email delivery failed: ${errMessage}`);
    return {
      sent: false,
      provider: "gmail-smtp",
      reason: errMessage,
      recipient,
    };
  }
}

export const sendContactReply = createServerFn({ method: "POST" }).handler(async () => ({
  ok: true,
}));
