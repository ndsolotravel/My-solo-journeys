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

