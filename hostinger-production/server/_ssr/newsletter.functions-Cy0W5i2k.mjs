import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn, b as getRequestHeader } from "./server-7Z2Wk8DL.mjs";
import { n as nodemailer } from "../_libs/nodemailer.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CKFEJwfb.mjs";
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
import "fs";
import "dns";
import "os";
import "path";
import "child_process";
import "events";
import "url";
import "http";
import "https";
import "zlib";
import "net";
import "tls";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "buffer";
const subscribe_createServerFn_handler = createServerRpc({
  id: "47788b7666be982aca3ef5f15a2fcc6897f28fce0ebb29e9fb1da0ab79c42b13",
  name: "subscribe",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => subscribe.__executeServer(opts));
const subscribe = createServerFn({
  method: "POST"
}).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  const email = typeof raw?.email === "string" ? raw.email.trim() : "";
  const sessionId = typeof raw?.sessionId === "string" ? raw.sessionId.trim() : "";
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
  } = await import("./client.server-DgxrFlIS.mjs");
  const {
    data: rpcData,
    error: dbError
  } = await supabaseAdmin.rpc("newsletter_subscribe", {
    p_email: subscriberEmail
  });
  if (dbError) {
    console.error(`[subscribe] Supabase newsletter_subscribe RPC error: ${dbError.message}`);
    throw new Error("Subscription could not be saved. Please try again later or email us directly at contact@ndsolotravel.com.");
  }
  if (!rpcData?.id) {
    console.error(`[subscribe] Subscriber insert returned no id (RLS or insert blocked).`);
    throw new Error("Subscription could not be saved. Please try again later or email us directly at contact@ndsolotravel.com.");
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
  const isNew = rpcData?.created !== false;
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
  const {
    supabaseAdmin
  } = await import("./client.server-DgxrFlIS.mjs");
  let roles = [];
  if (context.supabase) {
    const {
      data
    } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
    roles = (data ?? []).map((r) => r.role);
  }
  if (roles.length === 0) {
    const {
      data
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId);
    roles = (data ?? []).map((r) => r.role);
  }
  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden");
  }
  let res = await supabaseAdmin.from("subscribers").select("id, email, status, subscribed_at").order("subscribed_at", {
    ascending: false
  });
  if (res.error) {
    res = await supabaseAdmin.from("subscribers").select("id, email, subscribed_at").order("subscribed_at", {
      ascending: false
    });
  }
  if (res.error) throw new Error(res.error.message);
  return (res.data ?? []).map((r) => ({
    id: r.id,
    email: r.email,
    status: r.status || "active",
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
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  return objectType({
    id: stringType().uuid(),
    status: enumType(["active", "unsubscribed"])
  }).parse(raw);
}).handler(adminUpdateSubscriberStatus_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-DgxrFlIS.mjs");
  const {
    error
  } = await supabaseAdmin.from("subscribers").update({
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
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  return objectType({
    id: stringType().uuid()
  }).parse(raw);
}).handler(adminDeleteSubscriber_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-DgxrFlIS.mjs");
  const {
    error
  } = await supabaseAdmin.from("subscribers").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
async function sendNewsletterNotification(subscriberEmail) {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
  const emailSubject = `New Newsletter Subscriber: ${subscriberEmail}`;
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700;">New Newsletter Subscription</h2>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Subscriber Email:</strong> <a href="mailto:${subscriberEmail}" style="color: #2563eb;">${subscriberEmail}</a></p>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Subscribed At:</strong> ${(/* @__PURE__ */ new Date()).toISOString()}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 13px; color: #475569; line-height: 1.6;">A new reader has subscribed to the NDSOLOTRAVEL dispatch via the website newsletter form.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Sent via NDSOLOTRAVEL website. Notification recipient: ${recipient}</p>
    </div>
  `;
  const smtpHost = process.env.SMTP_HOST || process.env.SMTP_SERVER;
  const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpFrom = process.env.SMTP_FROM || (smtpUser ? `NDSOLOTRAVEL <${smtpUser}>` : `NDSOLOTRAVEL <contact@ndsolotravel.com>`);
  if (smtpHost && smtpUser && smtpPass) {
    try {
      console.log(`[subscribe] Initiating SMTP connection to ${smtpHost}:${smtpPort}...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        replyTo: subscriberEmail,
        subject: emailSubject,
        html: htmlContent
      });
      console.log(`[subscribe] SMTP email ACCEPTED for ${recipient} (Message ID: ${info.messageId})`);
      return {
        sent: true,
        provider: "smtp",
        id: info.messageId
      };
    } catch (err) {
      console.error(`[subscribe] SMTP delivery attempt failed:`, err?.message || err);
    }
  }
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      console.log(`[subscribe] Initiating Resend API dispatch to ${recipient}...`);
      const fromAddress = process.env.RESEND_FROM_EMAIL || "NDSOLOTRAVEL Newsletter <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [recipient],
          reply_to: subscriberEmail,
          subject: emailSubject,
          html: htmlContent
        })
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(`[subscribe] Resend API rejected email delivery:`, resData);
        return {
          sent: false,
          provider: "resend",
          reason: `Resend API error: ${resData.message || JSON.stringify(resData)}`
        };
      }
      console.log(`[subscribe] Resend email ACCEPTED for ${recipient} (ID: ${resData.id})`);
      return {
        sent: true,
        provider: "resend",
        id: resData.id
      };
    } catch (err) {
      console.error(`[subscribe] Resend API delivery attempt failed:`, err?.message || err);
      return {
        sent: false,
        provider: "resend",
        reason: err?.message || "Resend network error"
      };
    }
  }
  console.warn(`[subscribe] No active email provider configured (SMTP_HOST/SMTP_USER/SMTP_PASS or RESEND_API_KEY missing). Notification for subscriber ${subscriberEmail} was not dispatched.`);
  return {
    sent: false,
    provider: "none",
    reason: "No email credentials or API key configured in Hostinger environment variables (SMTP_HOST or RESEND_API_KEY)"
  };
}
const contactSchema = objectType({
  name: stringType().trim().min(1, "Please enter your name.").max(120),
  email: stringType().trim().email("Please enter a valid email address.").max(320),
  subject: stringType().trim().max(200).optional().default(""),
  message: stringType().trim().min(1, "Please enter your message.").max(5e3),
  // Honeypot — bots fill all fields; humans never see it
  website: stringType().max(0).optional().default("")
});
async function sha256(input) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
const sendContact_createServerFn_handler = createServerRpc({
  id: "ca369ea727ea5123aa5fee3fbc329cf735853eecfa76d8574d642a4ea46deb77",
  name: "sendContact",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => sendContact.__executeServer(opts));
const sendContact = createServerFn({
  method: "POST"
}).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  const payload = {
    name: typeof raw?.name === "string" ? raw.name.trim() : "",
    email: typeof raw?.email === "string" ? raw.email.trim() : "",
    subject: typeof raw?.subject === "string" ? raw.subject.trim() : "",
    message: typeof raw?.message === "string" ? raw.message.trim() : "",
    website: typeof raw?.website === "string" ? raw.website.trim() : ""
  };
  return contactSchema.parse(payload);
}).handler(sendContact_createServerFn_handler, async ({
  data
}) => {
  if (data.website && data.website.length > 0) {
    return {
      ok: true
    };
  }
  console.log(`[sendContact] Processing submission from: ${data.name} <${data.email}>`);
  const {
    supabaseAdmin
  } = await import("./client.server-DgxrFlIS.mjs");
  const ip = getRequestHeader("cf-connecting-ip") || getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = await sha256(`ndsolo:${ip}`);
  const subject = data.subject?.trim() || null;
  const {
    error: dbError,
    status
  } = await supabaseAdmin.from("messages").insert({
    name: data.name,
    email: data.email.toLowerCase(),
    subject,
    message: data.message,
    is_read: false
  });
  if (dbError || status !== 200 && status !== 201 && status !== 204) {
    console.error(`[sendContact] Supabase public.messages insert failed:`, dbError?.message || `HTTP ${status}`);
    throw new Error("Your message could not be saved. Please try again later or email us directly at contact@ndsolotravel.com.");
  }
  console.log(`[sendContact] Successfully stored message in Supabase public.messages table.`);
  try {
    await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      subject,
      message: data.message,
      ip_hash: ipHash,
      status: "new"
    });
  } catch {
  }
  const emailResult = await notifyRecipientByEmail({
    name: data.name,
    email: data.email,
    subject,
    message: data.message
  });
  if (!emailResult.sent) {
    console.error(`[sendContact] Email delivery failed (message still saved): ${emailResult.reason}`);
  }
  console.log(`[sendContact] Complete contact flow SUCCESS via ${emailResult.provider} (ID: ${emailResult.id})`);
  return {
    ok: true,
    provider: emailResult.provider,
    messageId: emailResult.id,
    emailDelivered: emailResult.sent
  };
});
const DEFAULT_RECIPIENT = "contact@ndsolotravel.com";
async function notifyRecipientByEmail(msg) {
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
          pass: smtpPass
        }
      });
      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        replyTo: msg.email,
        subject: emailSubject,
        html: htmlContent
      });
      console.log(`[sendContact] SMTP email ACCEPTED for ${recipient} (Message ID: ${info.messageId})`);
      return {
        sent: true,
        provider: "smtp",
        id: info.messageId
      };
    } catch (err) {
      console.error(`[sendContact] SMTP delivery attempt failed:`, err?.message || err);
    }
  }
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      console.log(`[sendContact] Initiating Resend API dispatch to ${recipient}...`);
      const fromAddress = process.env.RESEND_FROM_EMAIL || "NDSOLOTRAVEL Contact <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [recipient],
          reply_to: msg.email,
          subject: emailSubject,
          html: htmlContent
        })
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(`[sendContact] Resend API rejected email delivery:`, resData);
        return {
          sent: false,
          provider: "resend",
          reason: `Resend API error: ${resData.message || JSON.stringify(resData)}`
        };
      }
      console.log(`[sendContact] Resend email ACCEPTED for ${recipient} (ID: ${resData.id})`);
      return {
        sent: true,
        provider: "resend",
        id: resData.id
      };
    } catch (err) {
      console.error(`[sendContact] Resend API delivery attempt failed:`, err?.message || err);
      return {
        sent: false,
        provider: "resend",
        reason: err?.message || "Resend network error"
      };
    }
  }
  console.warn(`[sendContact] No active email provider configured (SMTP_HOST/SMTP_USER/SMTP_PASS or RESEND_API_KEY missing). Notification to ${recipient} was not dispatched.`);
  return {
    sent: false,
    provider: "none",
    reason: "No email server credentials or API key configured in Hostinger environment variables (SMTP_HOST or RESEND_API_KEY)"
  };
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
