import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import nodemailer from "nodemailer";

export const subscribe = createServerFn({ method: "POST" })
  .inputValidator((input: any) => {
    const raw = input?.data ? input.data : input;
    const email = typeof raw?.email === "string" ? raw.email.trim() : "";
    return z.object({ email: z.string().email("Please enter a valid email address.") }).parse({ email });
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("subscribers")
      .insert({ email: data.email.toLowerCase() });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
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
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();

    try {
      const { count, error: countError } = await supabaseAdmin
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since);

      if (!countError && (count ?? 0) >= 3) {
        throw new Error("Too many messages. Please try again in a few minutes.");
      }
    } catch (err: any) {
      if (err?.message?.includes("Too many messages")) {
        throw err;
      }
    }

    const subject = data.subject?.trim() || null;
    const fullPayload: Record<string, any> = {
      name: data.name,
      email: data.email.toLowerCase(),
      subject,
      message: data.message,
      ip_hash: ipHash,
      status: "new",
    };

    let { error } = await supabaseAdmin.from("contact_messages").insert(fullPayload);

    // Fallback: If PostgREST returns schema error (PGRST204) for missing optional columns before migration
    if (error && (error.code === "PGRST204" || error.message?.includes("schema cache"))) {
      const fallbackPayload: Record<string, any> = {
        name: data.name,
        email: data.email.toLowerCase(),
        message: data.message,
      };
      if (subject && !error.message?.includes("subject")) {
        fallbackPayload.subject = subject;
      }
      const retry = await supabaseAdmin.from("contact_messages").insert(fallbackPayload);
      error = retry.error;
    }

    if (error) {
      console.error("[sendContact] Supabase contact_messages insert notice:", error.message);
    } else {
      console.log(`[sendContact] Successfully stored message in Supabase contact_messages.`);
    }

    // ALWAYS dispatch email notification to recipient (contact@ndsolotravel.com)
    const emailResult = await notifyRecipientByEmail({
      name: data.name,
      email: data.email,
      subject,
      message: data.message,
    });

    if (!emailResult.sent) {
      console.error(`[sendContact] Email delivery failed: ${emailResult.reason}`);
      throw new Error(
        `Your message was received and saved, but email notification could not be delivered to contact@ndsolotravel.com (${emailResult.reason}). Please try again later or email us directly at contact@ndsolotravel.com.`
      );
    }

    console.log(`[sendContact] Complete contact flow SUCCESS via ${emailResult.provider} (ID: ${emailResult.id})`);
    return { ok: true, provider: emailResult.provider, messageId: emailResult.id };
  });

const DEFAULT_RECIPIENT = "contact@ndsolotravel.com";

async function notifyRecipientByEmail(msg: {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}): Promise<{ sent: boolean; provider: string; id?: string; reason?: string }> {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
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

  // 1. Try Hostinger / Custom SMTP (via Nodemailer) if credentials configured
  const smtpHost = process.env.SMTP_HOST || process.env.SMTP_SERVER;
  const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpFrom = process.env.SMTP_FROM || (smtpUser ? `NDSOLOTRAVEL <${smtpUser}>` : `NDSOLOTRAVEL <contact@ndsolotravel.com>`);

  if (smtpHost && smtpUser && smtpPass) {
    try {
      console.log(`[sendContact] Initiating SMTP connection to ${smtpHost}:${smtpPort}...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        replyTo: msg.email,
        subject: emailSubject,
        html: htmlContent,
      });

      console.log(`[sendContact] SMTP email ACCEPTED for ${recipient} (Message ID: ${info.messageId})`);
      return { sent: true, provider: "smtp", id: info.messageId };
    } catch (err: any) {
      console.error(`[sendContact] SMTP delivery attempt failed:`, err?.message || err);
      // Fall through to test API provider if available
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      console.log(`[sendContact] Initiating Resend API dispatch to ${recipient}...`);
      const fromAddress = process.env.RESEND_FROM_EMAIL || "NDSOLOTRAVEL Contact <onboarding@resend.dev>";
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
    `[sendContact] No active email provider configured (SMTP_HOST/SMTP_USER/SMTP_PASS or RESEND_API_KEY missing). Notification to ${recipient} was not dispatched.`
  );
  return {
    sent: false,
    provider: "none",
    reason: "No email server credentials or API key configured in Hostinger environment variables (SMTP_HOST or RESEND_API_KEY)",
  };
}

export const sendContactReply = createServerFn({ method: "POST" })
  .handler(async () => ({ ok: true }));
