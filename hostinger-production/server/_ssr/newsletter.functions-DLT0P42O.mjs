import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn, d as getRequestHeader } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { a as assertEditor } from "./admin.functions-OVCuV9an.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./media-DUkNwMwq.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const subscribe_createServerFn_handler = createServerRpc({
  id: "47788b7666be982aca3ef5f15a2fcc6897f28fce0ebb29e9fb1da0ab79c42b13",
  name: "subscribe",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => subscribe.__executeServer(opts));
const subscribe = createServerFn({
  method: "POST"
}).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  const record = raw && typeof raw === "object" ? raw : {};
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const sessionId = typeof record.sessionId === "string" ? record.sessionId.trim() : "";
  return objectType({
    email: stringType().email("Please enter a valid email address."),
    sessionId: stringType().optional().default("")
  }).parse({
    email,
    sessionId
  });
}).handler(subscribe_createServerFn_handler, async ({
  data
}) => {
  const subscriberEmail = data.email.toLowerCase();
  console.log(`[subscribe] Processing newsletter subscription for: <${subscriberEmail}>`);
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    data: rpcRaw,
    error: dbError
  } = await supabaseAdmin.rpc("newsletter_subscribe", {
    p_email: subscriberEmail
  });
  const rpcData = rpcRaw;
  if (dbError) {
    console.error(`[subscribe] Supabase newsletter_subscribe RPC error: ${dbError.message}`);
    throw new Error("Subscription could not be saved. Please try again later or email us directly at ndsolotravel@gmail.com.");
  }
  if (!rpcData?.id) {
    console.error(`[subscribe] Subscriber insert returned no id (RLS or insert blocked).`);
    throw new Error("Subscription could not be saved. Please try again later or email us directly at ndsolotravel@gmail.com.");
  }
  if (data.sessionId) {
    try {
      await supabaseAdmin.from("visitor_sessions").update({
        subscriber_email: subscriberEmail
      }).eq("session_id", data.sessionId);
    } catch (err) {
      console.warn(`[subscribe] Could not link subscriber email to session <${data.sessionId}>:`, err);
    }
  }
  const isNew = rpcData.created !== false;
  if (!isNew) {
    console.log(`[subscribe] Subscriber already exists in Supabase: <${subscriberEmail}>`);
    return {
      ok: true,
      created: false,
      alreadySubscribed: true,
      message: "You are already subscribed."
    };
  }
  console.log(`[subscribe] New subscriber record saved in Supabase: <${subscriberEmail}>`);
  return {
    ok: true,
    created: true,
    alreadySubscribed: false,
    message: "Subscribed. Welcome aboard."
  };
});
const adminListSubscribers_createServerFn_handler = createServerRpc({
  id: "720444115414c1dc4c9ac4ddd501401a50a0fce2886ec398bcb73b9ac5519a3f",
  name: "adminListSubscribers",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => adminListSubscribers.__executeServer(opts));
const adminListSubscribers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListSubscribers_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: fullData,
    error: fullError
  } = await client.from("subscribers").select("id, email, status, subscribed_at").order("subscribed_at", {
    ascending: false
  });
  if (!fullError && fullData) {
    return fullData.map((r) => ({
      id: r.id,
      email: r.email,
      status: r.status === "unsubscribed" ? "unsubscribed" : "active",
      subscribed_at: r.subscribed_at
    }));
  }
  const {
    data: basicData,
    error: basicError
  } = await client.from("subscribers").select("id, email, subscribed_at").order("subscribed_at", {
    ascending: false
  });
  if (basicError) throw new Error(basicError.message);
  return (basicData ?? []).map((r) => ({
    id: r.id,
    email: r.email,
    status: "active",
    subscribed_at: r.subscribed_at
  }));
});
const adminUpdateSubscriberStatus_createServerFn_handler = createServerRpc({
  id: "36147828ec7f00cb3fa62463e9b7c81359c52057f31406b51e60ec2e09cd0023",
  name: "adminUpdateSubscriberStatus",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => adminUpdateSubscriberStatus.__executeServer(opts));
const adminUpdateSubscriberStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  return objectType({
    id: stringType().uuid(),
    status: enumType(["active", "unsubscribed"])
  }).parse(raw);
}).handler(adminUpdateSubscriberStatus_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    error
  } = await client.from("subscribers").update({
    status: data.status
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminDeleteSubscriber_createServerFn_handler = createServerRpc({
  id: "75c289fbf36a05cdded0534cf68c668e0d9e882b0f80347e2e9541902a86093e",
  name: "adminDeleteSubscriber",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => adminDeleteSubscriber.__executeServer(opts));
const adminDeleteSubscriber = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  return objectType({
    id: stringType().uuid()
  }).parse(raw);
}).handler(adminDeleteSubscriber_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    error
  } = await client.from("subscribers").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const contactSchema = objectType({
  name: stringType().trim().min(1, "Please enter your name.").max(120),
  email: stringType().trim().email("Please enter a valid email address.").max(320),
  subject: stringType().trim().max(200).optional().default(""),
  message: stringType().trim().min(1, "Please enter your message.").max(5e3),
  // Honeypot — bots fill all fields; humans never see it
  website: stringType().max(0).optional().default("")
});
const sendContact_createServerFn_handler = createServerRpc({
  id: "ca369ea727ea5123aa5fee3fbc329cf735853eecfa76d8574d642a4ea46deb77",
  name: "sendContact",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => sendContact.__executeServer(opts));
const sendContact = createServerFn({
  method: "POST"
}).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  const record = raw && typeof raw === "object" ? raw : {};
  const payload = {
    name: typeof record.name === "string" ? record.name.trim() : "",
    email: typeof record.email === "string" ? record.email.trim() : "",
    subject: typeof record.subject === "string" ? record.subject.trim() : "",
    message: typeof record.message === "string" ? record.message.trim() : "",
    website: typeof record.website === "string" ? record.website.trim() : ""
  };
  return contactSchema.parse(payload);
}).handler(sendContact_createServerFn_handler, async ({
  data
}) => {
  if (data.website && data.website.length > 0) {
    return {
      ok: true,
      message: "Message sent successfully."
    };
  }
  console.log(`[sendContact] Contact submission received from: ${data.name} <${data.email}>`);
  const {
    supabase
  } = await import("./client-BaIz-VBI.mjs");
  getRequestHeader("cf-connecting-ip") || getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const subject = data.subject?.trim() || null;
  const {
    error: msgError
  } = await supabase.from("messages").insert({
    name: data.name,
    email: data.email.toLowerCase(),
    subject,
    message: data.message,
    status: "new"
  });
  if (msgError) {
    console.error(`[sendContact] Database insert failed for messages:`, msgError.message);
    throw new Error("Your message could not be saved. Please try again later or email us directly at ndsolotravel@gmail.com.");
  }
  console.log(`[sendContact] Supabase insert successful: Stored message in Supabase messages table.`);
  const emailResult = await dispatchContactNotification({
    name: data.name,
    email: data.email,
    subject,
    message: data.message
  });
  return {
    ok: true,
    emailDelivered: emailResult.sent,
    provider: emailResult.provider,
    messageId: emailResult.id,
    recipient: emailResult.recipient,
    emailReason: emailResult.reason,
    message: emailResult.sent ? "Database saved and email sent" : "Database saved but email notification failed"
  };
});
async function dispatchContactNotification(params) {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || "ndsolotravel@gmail.com";
  const cleanName = params.name.replace(/["\\]/g, "").trim();
  const replyTo = `"${cleanName}" <${params.email}>`;
  const emailSubject = `[NDSOLOTRAVEL Contact Form] ${params.subject ? `${params.subject} - ` : ""}Message from ${cleanName}`;
  const escape = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  const submissionDate = (/* @__PURE__ */ new Date()).toUTCString();
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
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER || "ndsolotravel@gmail.com";
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpFrom = process.env.SMTP_FROM || "NDSOLOTRAVEL <ndsolotravel@gmail.com>";
  if (!smtpPass) {
    const reason = "Gmail App Password (SMTP_PASS) is not configured in server environment variables.";
    console.warn(`[sendContact] Email delivery failed: ${reason} (Target: ${recipient})`);
    return {
      sent: false,
      provider: "none",
      reason,
      recipient
    };
  }
  try {
    const nodemailer = (await import("../_libs/nodemailer.mjs").then(function(n) {
      return n.n;
    })).default;
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });
    try {
      await transporter.verify();
      console.log(`[sendContact] SMTP connection successful: Connected to ${smtpHost}:${smtpPort} as ${smtpUser}`);
    } catch (verifyErr) {
      const verifyMsg = verifyErr instanceof Error ? verifyErr.message : String(verifyErr);
      console.warn(`[sendContact] SMTP verify notice: ${verifyMsg}`);
    }
    const info = await transporter.sendMail({
      from: smtpFrom,
      to: recipient,
      replyTo,
      subject: emailSubject,
      text: textContent,
      html: htmlContent
    });
    console.log(`[sendContact] Email accepted by Gmail SMTP (Message ID: ${info.messageId})`);
    return {
      sent: true,
      provider: "gmail-smtp",
      id: info.messageId,
      recipient
    };
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    console.error(`[sendContact] Email delivery failed: ${errMessage}`);
    return {
      sent: false,
      provider: "gmail-smtp",
      reason: errMessage,
      recipient
    };
  }
}
const sendContactReply_createServerFn_handler = createServerRpc({
  id: "2c4583f12bce21ae798f1680d431270090538471e946cd081e4b8d8460ec2b1a",
  name: "sendContactReply",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => sendContactReply.__executeServer(opts));
const sendContactReply = createServerFn({
  method: "POST"
}).handler(sendContactReply_createServerFn_handler, async () => ({
  ok: true
}));
export {
  adminDeleteSubscriber_createServerFn_handler,
  adminListSubscribers_createServerFn_handler,
  adminUpdateSubscriberStatus_createServerFn_handler,
  sendContactReply_createServerFn_handler,
  sendContact_createServerFn_handler,
  subscribe_createServerFn_handler
};
