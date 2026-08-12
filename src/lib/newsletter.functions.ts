import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

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

    if (error) throw new Error(error.message);

    // Dispatch email notification to recipient (ndsolotravel@gmail.com)
    await notifyRecipientByEmail({
      name: data.name,
      email: data.email,
      subject,
      message: data.message,
    });

    return { ok: true };
  });

const DEFAULT_RECIPIENT = "ndsolotravel@gmail.com";

async function notifyRecipientByEmail(msg: {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}) {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailSubject = `New Contact Message from ${msg.name}${msg.subject ? `: ${msg.subject}` : ""}`;

  if (resendApiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ndsolotravel Contact <onboarding@resend.dev>",
          to: [recipient],
          reply_to: msg.email,
          subject: emailSubject,
          html: `
            <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
              <h2 style="color: #0f172a; margin-bottom: 16px;">New Contact Message Received</h2>
              <p><strong>From:</strong> ${msg.name} (&lt;${msg.email}&gt;)</p>
              <p><strong>Subject:</strong> ${msg.subject || "N/A"}</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="white-space: pre-wrap; font-size: 15px;">${msg.message}</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #64748b;">Submitted via ndsolotravel contact form and stored in Supabase contact_messages.</p>
            </div>
          `,
        }),
      });
    } catch (err) {
      console.error("[sendContact] Email notification error:", err);
    }
  } else {
    console.log(`[sendContact] Notification queued for ${recipient}. Saved to Supabase contact_messages.`);
  }
}

export const sendContactReply = createServerFn({ method: "POST" })
  .handler(async () => ({ ok: true }));
