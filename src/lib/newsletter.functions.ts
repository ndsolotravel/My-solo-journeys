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
      console.error("[sendContact] Database storage error:", error.message);
    } else {
      console.log(`[sendContact] Saved visitor message from ${data.name} <${data.email}> to Supabase contact_messages.`);
    }

    // ALWAYS dispatch email notification to recipient (ndsolotravel@gmail.com)
    const emailResult = await notifyRecipientByEmail({
      name: data.name,
      email: data.email,
      subject,
      message: data.message,
    });

    if (error && emailResult?.provider === "none") {
      throw new Error(`Message delivery error: ${error.message}`);
    }

    return { ok: true, emailStatus: emailResult?.provider };
  });

const DEFAULT_RECIPIENT = "ndsolotravel@gmail.com";

async function notifyRecipientByEmail(msg: {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}) {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
  const emailSubject = `New Contact Message from ${msg.name}${msg.subject ? `: ${msg.subject}` : ""}`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700;">New Contact Form Message</h2>
      <p style="margin: 8px 0; font-size: 14px;"><strong>From:</strong> ${msg.name} (&lt;<a href="mailto:${msg.email}" style="color: #2563eb;">${msg.email}</a>&gt;)</p>
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
  const smtpFrom = process.env.SMTP_FROM || (smtpUser ? `NDSOLOTRAVEL <${smtpUser}>` : `NDSOLOTRAVEL <${recipient}>`);

  if (smtpHost && smtpUser && smtpPass) {
    try {
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

      console.log(`[sendContact] SMTP email successfully delivered to ${recipient} (Message ID: ${info.messageId})`);
      return { ok: true, provider: "smtp", messageId: info.messageId };
    } catch (err: any) {
      console.error(`[sendContact] SMTP delivery to ${recipient} failed:`, err?.message || err);
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
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
        console.error(`[sendContact] Resend API rejected email:`, resData);
        throw new Error(`Resend API error: ${resData.message || JSON.stringify(resData)}`);
      }

      console.log(`[sendContact] Resend email accepted for ${recipient} (ID: ${resData.id})`);
      return { ok: true, provider: "resend", id: resData.id };
    } catch (err: any) {
      console.error(`[sendContact] Resend delivery to ${recipient} failed:`, err?.message || err);
      throw err;
    }
  }

  // 3. If no email provider env vars set: log explicit notice
  console.warn(
    `[sendContact] Visitor message from ${msg.name} (${msg.email}) saved to Supabase. To deliver email notifications directly to ${recipient}, please set Hostinger SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS) or RESEND_API_KEY in Hostinger environment variable settings.`
  );
  return { ok: true, provider: "none" };
}

export const sendContactReply = createServerFn({ method: "POST" })
  .handler(async () => ({ ok: true }));
