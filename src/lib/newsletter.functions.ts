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
        "Subscription could not be saved. Please try again later or email us directly at contact@ndsolotravel.com.",
      );
    }
    if (!rpcData?.id) {
      console.error(`[subscribe] Subscriber insert returned no id (RLS or insert blocked).`);
      throw new Error(
        "Subscription could not be saved. Please try again later or email us directly at contact@ndsolotravel.com.",
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
        "Your message could not be saved. Please try again later or email us directly at contact@ndsolotravel.com.",
      );
    }

    console.log(`[sendContact] Successfully stored contact message in messages table.`);

    // 2. Email notification dispatch (if configured)
    let emailSent = true;
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "contact@ndsolotravel.com";

    // If an external email provider webhook or SMTP is configured in the future, dispatch here
    // Database insert remains completely independent of email delivery
    try {
      if (process.env.NOTIFICATION_WEBHOOK_URL) {
        await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact_submission",
            name: data.name,
            email: data.email,
            subject,
            message: data.message,
            recipient: notificationEmail,
          }),
        });
      }
    } catch (emailErr) {
      console.warn(`[sendContact] Email notification delivery failed:`, emailErr);
      emailSent = false;
    }

    return {
      ok: true,
      emailSent,
      message: emailSent ? "Message sent successfully." : "Message saved successfully.",
    };
  });

export const sendContactReply = createServerFn({ method: "POST" }).handler(async () => ({
  ok: true,
}));
