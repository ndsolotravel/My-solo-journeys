import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

export const subscribe = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ email: z.string().email() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("subscribers")
      .insert({ email: data.email.toLowerCase() });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true };
  });

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(5000),
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
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot: silently accept then drop
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
    const { count } = await supabaseAdmin
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);
    if ((count ?? 0) >= 3) {
      throw new Error("Too many messages. Please try again in a few minutes.");
    }

    const subject = data.subject?.trim() || null;
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      subject,
      message: data.message,
      ip_hash: ipHash,
      status: "new",
    });
    if (error) throw new Error(error.message);

    return { ok: true };
  });

export const sendContactReply = createServerFn({ method: "POST" })
  .handler(async () => ({ ok: true }));
