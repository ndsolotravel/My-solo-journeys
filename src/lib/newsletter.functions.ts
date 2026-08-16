import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const subscribe = createServerFn({ method: "POST" })
  .inputValidator((input: any) => {
    const raw = input?.data ? input.data : input;
    const email = typeof raw?.email === "string" ? raw.email.trim() : "";
    const sessionId = typeof raw?.sessionId === "string" ? raw.sessionId.trim() : "";
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
    const { data: rpcData, error: dbError } = await supabaseAdmin.rpc("newsletter_subscribe", {
      p_email: subscriberEmail,
    });

    if (dbError) {
      console.error(`[subscribe] Supabase newsletter_subscribe RPC error: ${dbError.message}`);
      throw new Error(
        "Subscription could not be saved. Please try again later or email us directly at contact@ndsolotravel.com."
      );
    }
    if (!(rpcData as any)?.id) {
      console.error(`[subscribe] Subscriber insert returned no id (RLS or insert blocked).`);
      throw new Error(
        "Subscription could not be saved. Please try again later or email us directly at contact@ndsolotravel.com."
      );
    }

    // Link subscriber_email to current visitor session if sessionId is available
    if (data.sessionId) {
      try {
        await (supabaseAdmin
          .from("visitor_sessions") as any)
          .update({ subscriber_email: subscriberEmail })
          .eq("session_id", data.sessionId);
      } catch (err) {
        console.warn(`[subscribe] Could not link subscriber email to session <${data.sessionId}>:`, err);
      }
    }

    const isNew = (rpcData as any)?.created !== false;

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

    // Dispatch email notification to recipient (contact@ndsolotravel.com)
    // Email is a side-channel; the subscription itself has already succeeded in DB.
    const emailResult = await sendNewsletterNotification(subscriberEmail);

    if (!emailResult.sent) {
      console.error(`[subscribe] Newsletter email dispatch failed (subscription still saved): ${emailResult.reason}`);
    }

    console.log(`[subscribe] Complete newsletter flow SUCCESS via ${emailResult.provider} (ID: ${emailResult.id})`);
    return {
      ok: true,
      created: true,
      alreadySubscribed: false,
      provider: emailResult.provider,
      messageId: emailResult.id,
      emailDelivered: emailResult.sent,
      message: "Subscribed. Welcome aboard.",
    };
  });

export const adminListSubscribers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let roles: string[] = [];
    if (context.supabase) {
      const { data } = await (context.supabase as any).from("user_roles").select("role").eq("user_id", context.userId);
      roles = (data ?? []).map((r: any) => r.role);
    }
    if (roles.length === 0) {
      const { data } = await (supabaseAdmin as any).from("user_roles").select("role").eq("user_id", context.userId);
      roles = (data ?? []).map((r: any) => r.role);
    }
    if (!roles.includes("admin") && !roles.includes("editor")) {
      throw new Error("Forbidden");
    }

    const { data: fullData, error: fullError } = await supabaseAdmin
      .from("subscribers")
      .select("id, email, status, subscribed_at")
      .order("subscribed_at", { ascending: false });

    if (!fullError && fullData) {
      return fullData.map((r: any) => ({
        id: r.id,
        email: r.email,
        status: r.status || "active",
        subscribed_at: r.subscribed_at,
      }));
    }

    const { data: basicData, error: basicError } = await supabaseAdmin
      .from("subscribers")
      .select("id, email, subscribed_at")
      .order("subscribed_at", { ascending: false });

    if (basicError) throw new Error(basicError.message);

    return (basicData ?? []).map((r: any) => ({
      id: r.id,
      email: r.email,
      status: "active",
      subscribed_at: r.subscribed_at,
    }));
  });

export const adminUpdateSubscriberStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: any) => {
    const raw = input?.data ? input.data : input;
    return z
      .object({
        id: z.string().uuid(),
        status: z.enum(["active", "unsubscribed"]),
      })
      .parse(raw);
  })
  .handler(async ({ context, data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await (supabaseAdmin
      .from("subscribers") as any)
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteSubscriber = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: any) => {
    const raw = input?.data ? input.data : input;
    return z
      .object({
        id: z.string().uuid(),
      })
      .parse(raw);
  })
  .handler(async ({ context, data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await (supabaseAdmin
      .from("subscribers") as any)
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

async function sendNewsletterNotification(
  subscriberEmail: string
): Promise<{ sent: boolean; provider: string; id?: string; reason?: string }> {
  const recipient = cleanEnv(process.env.CONTACT_NOTIFICATION_EMAIL) || cleanEnv(process.env.NOTIFICATION_EMAIL) || DEFAULT_RECIPIENT;
  const emailSubject = `New Subscriber: ${subscriberEmail}`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700;">New Newsletter Subscriber</h2>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Subscriber Email:</strong> <a href="mailto:${subscriberEmail}" style="color: #2563eb;">${subscriberEmail}</a></p>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Subscribed At:</strong> ${new Date().toISOString()}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 13px; color: #475569; line-height: 1.6;">A new reader has subscribed to the NDSOLOTRAVEL dispatch via the website newsletter form.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Sent via NDSOLOTRAVEL website. Notification recipient: ${recipient}</p>
    </div>
  `;

  const plainText = `New Newsletter Subscriber Notification\n\nSubscriber Email: ${subscriberEmail}\nSubscribed At: ${new Date().toISOString()}\n\n---\nSent via NDSOLOTRAVEL website. Notification recipient: ${recipient}`;

  // 1. Try Hostinger / Custom SMTP (via Nodemailer) if credentials configured
  const smtpHost = cleanEnv(process.env.SMTP_HOST) || cleanEnv(process.env.SMTP_SERVER);
  const smtpUser = cleanEnv(process.env.SMTP_USER) || cleanEnv(process.env.SMTP_USERNAME);
  const smtpPass = cleanEnv(process.env.SMTP_PASS) || cleanEnv(process.env.SMTP_PASSWORD);
  const smtpPort = Number(cleanEnv(process.env.SMTP_PORT)) || 465;
  const smtpFrom = cleanEnv(process.env.SMTP_FROM) || (smtpUser ? `NDSOLOTRAVEL <${smtpUser}>` : `NDSOLOTRAVEL <contact@ndsolotravel.com>`);

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const isSecure = smtpPort === 465;
      console.log(`[subscribe] Connecting to SMTP ${smtpHost}:${smtpPort} (secure=${isSecure})...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        requireTLS: !isSecure && smtpPort === 587,
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
        tls: {
          rejectUnauthorized: false,
          minVersion: "TLSv1.2",
        },
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        replyTo: subscriberEmail,
        subject: emailSubject,
        text: plainText,
        html: htmlContent,
      });

      console.log(`[subscribe] SMTP delivery SUCCESS: Message ID: ${info.messageId} | Response: ${info.response}`);
      return { sent: true, provider: "smtp", id: info.messageId };
    } catch (err: any) {
      console.error(`[subscribe] SMTP delivery ERROR:`, {
        code: err?.code,
        command: err?.command,
        response: err?.response,
        message: err?.message,
      });
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  const resendApiKey = cleanEnv(process.env.RESEND_API_KEY);
  if (resendApiKey) {
    try {
      console.log(`[subscribe] Initiating Resend API dispatch to ${recipient}...`);
      const fromAddress = cleanEnv(process.env.RESEND_FROM_EMAIL) || "NDSOLOTRAVEL Newsletter <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [recipient],
          reply_to: subscriberEmail,
          subject: emailSubject,
          text: plainText,
          html: htmlContent,
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        console.error(`[subscribe] Resend API rejected email delivery:`, resData);
        return { sent: false, provider: "resend", reason: `Resend API error: ${resData.message || JSON.stringify(resData)}` };
      }

      console.log(`[subscribe] Resend email ACCEPTED for ${recipient} (ID: ${resData.id})`);
      return { sent: true, provider: "resend", id: resData.id };
    } catch (err: any) {
      console.error(`[subscribe] Resend API delivery attempt failed:`, err?.message || err);
      return { sent: false, provider: "resend", reason: err?.message || "Resend network error" };
    }
  }

  // 3. If no email provider env vars set
  console.warn(
    `[subscribe] No active email provider credentials detected in process.env (SMTP_HOST/SMTP_USER/SMTP_PASS or RESEND_API_KEY missing). Notification for subscriber ${subscriberEmail} was not dispatched.`
  );
  return {
    sent: false,
    provider: "none",
    reason: "No email credentials or API key configured in Hostinger environment variables (SMTP_HOST or RESEND_API_KEY)",
  };
}

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
  .inputValidator((input: any) => {
    const raw = input?.data ? input.data : input;
    const payload = {
      name: typeof raw?.name === "string" ? raw.name.trim() : "",
      email: typeof raw?.email === "string" ? raw.email.trim() : "",
      subject: typeof raw?.subject === "string" ? raw.subject.trim() : "",
      message: typeof raw?.message === "string" ? raw.message.trim() : "",
      website: typeof raw?.website === "string" ? raw.website.trim() : "",
    };
    return contactSchema.parse(payload);
  })
  .handler(async ({ data }) => {
    // Honeypot: silently accept then drop bot submissions
    if (data.website && data.website.length > 0) {
      return { ok: true };
    }

    console.log(`[sendContact] Processing submission from: ${data.name} <${data.email}>`);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Rate-limit by IP hash: max 3 submissions per 10 minutes
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const ipHash = await sha256(`ndsolo:${ip}`);
    const subject = data.subject?.trim() || null;

    // 1. Insert into public.messages table
    const { error: dbError, status } = await (supabaseAdmin
      .from("messages") as any)
      .insert({
        name: data.name,
        email: data.email.toLowerCase(),
        subject: subject,
        message: data.message,
        is_read: false,
      });

    if (dbError || (status !== 200 && status !== 201 && status !== 204)) {
      console.error(`[sendContact] Supabase public.messages insert failed:`, dbError?.message || `HTTP ${status}`);
      throw new Error(
        "Your message could not be saved. Please try again later or email us directly at contact@ndsolotravel.com."
      );
    }
    console.log(`[sendContact] Successfully stored message in Supabase public.messages table.`);

    // 2. Synchronize to contact_messages table via security-definer RPC if available
    try {
      await (supabaseAdmin.rpc as any)("send_contact_message", {
        p_name: data.name,
        p_email: data.email.toLowerCase(),
        p_subject: subject,
        p_message: data.message,
        p_ip_hash: ipHash,
      });
    } catch {
      try {
        await (supabaseAdmin.from("contact_messages") as any).insert({
          name: data.name,
          email: data.email.toLowerCase(),
          subject: subject,
          message: data.message,
          ip_hash: ipHash,
          status: "new",
        });
      } catch {
        // Non-blocking fallback
      }
    }

    // ALWAYS dispatch email notification to recipient (contact@ndsolotravel.com)
    // Email is a side-channel; the message itself has already been stored in DB.
    const emailResult = await notifyRecipientByEmail({
      name: data.name,
      email: data.email,
      subject,
      message: data.message,
    });

    if (!emailResult.sent) {
      console.error(`[sendContact] Email delivery failed (message still saved): ${emailResult.reason}`);
    }

    console.log(`[sendContact] Complete contact flow SUCCESS via ${emailResult.provider} (ID: ${emailResult.id})`);
    return {
      ok: true,
      provider: emailResult.provider,
      messageId: emailResult.id,
      emailDelivered: emailResult.sent,
    };
  });

function cleanEnv(val: string | undefined): string | undefined {
  if (!val) return undefined;
  let s = val.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s || undefined;
}

const DEFAULT_RECIPIENT = "contact@ndsolotravel.com";

async function notifyRecipientByEmail(msg: {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}): Promise<{ sent: boolean; provider: string; id?: string; reason?: string }> {
  const recipient = cleanEnv(process.env.CONTACT_NOTIFICATION_EMAIL) || cleanEnv(process.env.NOTIFICATION_EMAIL) || DEFAULT_RECIPIENT;
  const emailSubject = `New Contact Message from ${msg.name}${msg.subject ? `: ${msg.subject}` : ""}`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700;">New Contact Form Message</h2>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Visitor Name:</strong> ${msg.name}</p>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Visitor Email:</strong> <a href="mailto:${msg.email}" style="color: #2563eb;">${msg.email}</a></p>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Subject:</strong> ${msg.subject || "N/A"}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; font-size: 15px; white-space: pre-wrap; line-height: 1.6; color: #334155;">${msg.message}</div>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Sent via NDSOLOTRAVEL contact form. Recipient: ${recipient}</p>
    </div>
  `;

  const plainText = `New Contact Form Message\n\nVisitor Name: ${msg.name}\nVisitor Email: ${msg.email}\nSubject: ${msg.subject || "N/A"}\n\nMessage:\n${msg.message}\n\n---\nSent via NDSOLOTRAVEL contact form. Recipient: ${recipient}`;

  // 1. Try Hostinger / Custom SMTP (via Nodemailer) if credentials configured
  const smtpHost = cleanEnv(process.env.SMTP_HOST) || cleanEnv(process.env.SMTP_SERVER);
  const smtpUser = cleanEnv(process.env.SMTP_USER) || cleanEnv(process.env.SMTP_USERNAME);
  const smtpPass = cleanEnv(process.env.SMTP_PASS) || cleanEnv(process.env.SMTP_PASSWORD);
  const smtpPort = Number(cleanEnv(process.env.SMTP_PORT)) || 465;
  const smtpFrom = cleanEnv(process.env.SMTP_FROM) || (smtpUser ? `NDSOLOTRAVEL Contact <${smtpUser}>` : `NDSOLOTRAVEL Contact <contact@ndsolotravel.com>`);

  console.log(`[sendContact] Evaluation: recipient=<${recipient}>, smtpHost=${smtpHost ? `'${smtpHost}'` : 'undefined'}, smtpUser=${smtpUser ? `'${smtpUser}'` : 'undefined'}, smtpPass=${smtpPass ? '[CONFIGURED]' : 'undefined'}, smtpPort=${smtpPort}`);

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const isSecure = smtpPort === 465;
      console.log(`[sendContact] Connecting to SMTP ${smtpHost}:${smtpPort} (secure=${isSecure})...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        requireTLS: !isSecure && smtpPort === 587,
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
        tls: {
          rejectUnauthorized: false,
          minVersion: "TLSv1.2",
        },
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        replyTo: msg.email,
        subject: emailSubject,
        text: plainText,
        html: htmlContent,
      });

      console.log(`[sendContact] SMTP delivery SUCCESS: Message ID: ${info.messageId} | Response: ${info.response} | Accepted: ${JSON.stringify(info.accepted)}`);
      return { sent: true, provider: "smtp", id: info.messageId };
    } catch (err: any) {
      console.error(`[sendContact] SMTP delivery ERROR:`, {
        code: err?.code,
        command: err?.command,
        response: err?.response,
        responseCode: err?.responseCode,
        message: err?.message,
      });
      // Fall through to test API provider if available
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  const resendApiKey = cleanEnv(process.env.RESEND_API_KEY);
  if (resendApiKey) {
    try {
      console.log(`[sendContact] Initiating Resend API dispatch to ${recipient}...`);
      const fromAddress = cleanEnv(process.env.RESEND_FROM_EMAIL) || "NDSOLOTRAVEL Contact <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [recipient],
          reply_to: msg.email,
          subject: emailSubject,
          text: plainText,
          html: htmlContent,
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        console.error(`[sendContact] Resend API rejected email delivery:`, resData);
        return { sent: false, provider: "resend", reason: `Resend API error: ${resData.message || JSON.stringify(resData)}` };
      }

      console.log(`[sendContact] Resend email ACCEPTED for ${recipient} (ID: ${resData.id})`);
      return { sent: true, provider: "resend", id: resData.id };
    } catch (err: any) {
      console.error(`[sendContact] Resend API delivery attempt failed:`, err?.message || err);
      return { sent: false, provider: "resend", reason: err?.message || "Resend network error" };
    }
  }

  // 3. If no email provider env vars set
  console.warn(
    `[sendContact] No active email provider credentials detected in process.env (SMTP_HOST/SMTP_USER/SMTP_PASS or RESEND_API_KEY missing). Notification to ${recipient} was not dispatched.`
  );
  return {
    sent: false,
    provider: "none",
    reason: "No email server credentials or API key configured in Hostinger environment variables (SMTP_HOST or RESEND_API_KEY)",
  };
}

export const sendContactReply = createServerFn({ method: "POST" })
  .handler(async () => ({ ok: true }));
