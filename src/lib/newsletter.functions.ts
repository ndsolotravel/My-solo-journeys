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
  .inputValidator((input: unknown) => {
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
  .inputValidator((input: unknown) => {
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
  .inputValidator((input: unknown) => {
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
  .inputValidator((input: unknown) => {
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

    console.log(`[sendContact] Processing submission from: ${data.name} <${data.email}>`);

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
      `[sendContact] Database insert successful: Stored message in Supabase messages table.`,
    );

    // 2. Email notification dispatch (independent operation)
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
      message: emailResult.sent ? "Message sent successfully." : "Message saved successfully.",
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
  provider: "smtp" | "resend" | "webhook" | "none";
  id?: string;
  reason?: string;
  recipient: string;
}

async function dispatchContactNotification(
  params: ContactNotificationParams,
): Promise<NotificationResult> {
  const recipient =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.NOTIFICATION_EMAIL ||
    process.env.RESEND_TO ||
    "ndsolotravel@gmail.com";

  const cleanName = params.name.replace(/["\\]/g, "").trim();
  const replyTo = `"${cleanName}" <${params.email}>`;
  const emailSubject = `[NDSOLOTRAVEL Contact] ${params.subject ? `${params.subject} - ` : ""}Message from ${cleanName}`;

  const escape = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0B1E36; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">NDSOLOTRAVEL</h1>
        <p style="color: #FA8128; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">New Contact Submission</p>
      </div>
      <div style="padding: 24px 28px; color: #1e293b; line-height: 1.6;">
        <p style="margin: 0 0 16px 0; font-size: 15px;">A new message was submitted via the NDSOLOTRAVEL website contact form.</p>
        <div style="background-color: #f8fafc; border-left: 4px solid #FA8128; border-radius: 4px; padding: 14px 18px; margin-bottom: 20px;">
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>From:</strong> ${escape(cleanName)} (&lt;<a href="mailto:${escape(params.email)}" style="color: #2563eb; text-decoration: none;">${escape(params.email)}</a>&gt;)</p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Subject:</strong> ${params.subject ? escape(params.subject) : "N/A"}</p>
          <p style="margin: 0; font-size: 14px;"><strong>Submitted At:</strong> ${new Date().toUTCString()}</p>
        </div>
        <div style="margin-bottom: 24px;">
          <strong style="font-size: 14px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</strong>
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 15px; color: #0f172a; white-space: pre-wrap; word-break: break-word;">${escape(params.message)}</div>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b;">
          <p style="margin: 0 0 4px 0;"><strong>Reply-To:</strong> Directly reply to this email to respond to <a href="mailto:${escape(params.email)}" style="color: #2563eb;">${escape(params.email)}</a>.</p>
          <p style="margin: 0;">Delivered to configured notification recipient: <strong>${escape(recipient)}</strong></p>
        </div>
      </div>
    </div>
  `;

  const textContent = `New Contact Form Message on NDSOLOTRAVEL

From: ${cleanName} <${params.email}>
Subject: ${params.subject || "N/A"}
Date: ${new Date().toUTCString()}

Message:
${params.message}

---
Delivered to: ${recipient}
Direct replies will go to: ${params.email}`;

  let lastError: string | undefined;

  // -------------------------------------------------------------
  // Provider 1: SMTP Delivery (e.g. Hostinger SMTP / Custom SMTP)
  // -------------------------------------------------------------
  const smtpHost = process.env.SMTP_HOST || process.env.SMTP_SERVER;
  const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpFrom =
    process.env.SMTP_FROM ||
    (smtpUser
      ? `NDSOLOTRAVEL Contact <${smtpUser}>`
      : `NDSOLOTRAVEL Contact <contact@ndsolotravel.com>`);

  if (smtpHost && smtpUser && smtpPass) {
    console.log(
      `[sendContact] Email notification attempted: Provider: SMTP (Host: ${smtpHost}, Port: ${smtpPort}) -> ${recipient}`,
    );
    try {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        replyTo,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });

      console.log(
        `[sendContact] Email provider accepted message: SMTP (Message ID: ${info.messageId})`,
      );
      return {
        sent: true,
        provider: "smtp",
        id: info.messageId,
        recipient,
      };
    } catch (smtpErr: unknown) {
      const errMessage = smtpErr instanceof Error ? smtpErr.message : String(smtpErr);
      console.error(`[sendContact] Email notification failed: SMTP error: ${errMessage}`);
      lastError = `SMTP error: ${errMessage}`;
    }
  }

  // -------------------------------------------------------------
  // Provider 2: Resend REST API (https://resend.com)
  // -------------------------------------------------------------
  const resendApiKey = process.env.RESEND_API_KEY;
  const defaultResendFrom =
    process.env.RESEND_FROM ||
    process.env.RESEND_FROM_EMAIL ||
    "NDSOLOTRAVEL Contact <contact@ndsolotravel.com>";

  if (resendApiKey) {
    console.log(`[sendContact] Email notification attempted: Provider: Resend API -> ${recipient}`);
    try {
      let activeFrom = defaultResendFrom;
      let res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: activeFrom,
          to: [recipient],
          reply_to: replyTo,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        }),
      });

      let resData = (await res.json().catch(() => null)) as {
        id?: string;
        message?: string;
        name?: string;
      } | null;

      // Handle unverified domain fallback
      if (
        !res.ok &&
        activeFrom.includes("@ndsolotravel.com") &&
        JSON.stringify(resData).toLowerCase().includes("not verified")
      ) {
        console.warn(
          `[sendContact] Resend rejected custom domain (${activeFrom}). Retrying with onboarding@resend.dev...`,
        );
        activeFrom = "NDSOLOTRAVEL Contact <onboarding@resend.dev>";
        res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: activeFrom,
            to: [recipient],
            reply_to: replyTo,
            subject: emailSubject,
            text: textContent,
            html: htmlContent,
          }),
        });
        resData = (await res.json().catch(() => null)) as {
          id?: string;
          message?: string;
          name?: string;
        } | null;
      }

      if (!res.ok) {
        const errMsg = resData?.message || `HTTP ${res.status}`;
        console.error(`[sendContact] Email notification failed: Resend API error: ${errMsg}`);
        lastError = `Resend error: ${errMsg}`;
      } else if (resData?.id) {
        console.log(
          `[sendContact] Email provider accepted message: Resend (Message ID: ${resData.id})`,
        );
        return {
          sent: true,
          provider: "resend",
          id: resData.id,
          recipient,
        };
      }
    } catch (resendErr: unknown) {
      const errMessage = resendErr instanceof Error ? resendErr.message : String(resendErr);
      console.error(`[sendContact] Email notification failed: Resend error: ${errMessage}`);
      lastError = `Resend connection error: ${errMessage}`;
    }
  }

  // -------------------------------------------------------------
  // Provider 3: Webhook (if NOTIFICATION_WEBHOOK_URL is configured)
  // -------------------------------------------------------------
  if (process.env.NOTIFICATION_WEBHOOK_URL) {
    console.log(`[sendContact] Email notification attempted: Provider: Webhook -> ${recipient}`);
    try {
      await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact_submission",
          name: cleanName,
          email: params.email,
          subject: params.subject,
          message: params.message,
          recipient,
        }),
      });
      console.log(`[sendContact] Email provider accepted message: Webhook successfully called.`);
      return {
        sent: true,
        provider: "webhook",
        recipient,
      };
    } catch (whErr: unknown) {
      const errMessage = whErr instanceof Error ? whErr.message : String(whErr);
      console.error(`[sendContact] Email notification failed: Webhook error: ${errMessage}`);
      lastError = `Webhook error: ${errMessage}`;
    }
  }

  // -------------------------------------------------------------
  // If no providers are configured in the environment
  // -------------------------------------------------------------
  if (!smtpHost && !resendApiKey && !process.env.NOTIFICATION_WEBHOOK_URL) {
    const notice =
      "No email provider credentials configured in environment variables. To receive email notifications at ndsolotravel@gmail.com, configure Hostinger SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS) or Resend (RESEND_API_KEY) in your environment settings.";
    console.warn(`[sendContact] Email notification failed: ${notice} (Target: ${recipient})`);
    return {
      sent: false,
      provider: "none",
      reason: notice,
      recipient,
    };
  }

  return {
    sent: false,
    provider: "none",
    reason: lastError || "Email notification delivery could not be completed.",
    recipient,
  };
}

export const sendContactReply = createServerFn({ method: "POST" }).handler(async () => ({
  ok: true,
}));
