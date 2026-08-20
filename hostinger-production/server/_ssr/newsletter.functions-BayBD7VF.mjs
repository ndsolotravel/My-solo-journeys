import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn, d as getRequestHeader } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
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
  } = await import("./client.server-Dg1wI_zl.mjs");
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
  } = await import("./client.server-Dg1wI_zl.mjs");
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
  const {
    data: fullData,
    error: fullError
  } = await supabaseAdmin.from("subscribers").select("id, email, status, subscribed_at").order("subscribed_at", {
    ascending: false
  });
  if (!fullError && fullData) {
    return fullData.map((r) => ({
      id: r.id,
      email: r.email,
      status: r.status || "active",
      subscribed_at: r.subscribed_at
    }));
  }
  const {
    data: basicData,
    error: basicError
  } = await supabaseAdmin.from("subscribers").select("id, email, subscribed_at").order("subscribed_at", {
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
  } = await import("./client.server-Dg1wI_zl.mjs");
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
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    error
  } = await supabaseAdmin.from("subscribers").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
function cleanEnvValue(val, expectedVarName) {
  if (!val) return void 0;
  let s = String(val).trim();
  if (s.startsWith('"') && s.endsWith('"') || s.startsWith("'") && s.endsWith("'")) {
    s = s.slice(1, -1).trim();
  }
  if (expectedVarName) {
    const prefixRegex = new RegExp(`^${expectedVarName}\\s*=\\s*`, "i");
    s = s.replace(prefixRegex, "").trim();
  }
  if (s.startsWith('"') && s.endsWith('"') || s.startsWith("'") && s.endsWith("'")) {
    s = s.slice(1, -1).trim();
  }
  return s || void 0;
}
let cachedDiskEnv = null;
function getDiskEnv() {
  if (cachedDiskEnv !== null) return cachedDiskEnv;
  cachedDiskEnv = {};
  try {
    const fs = require("fs");
    const path = require("path");
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      content.split("\n").forEach((line) => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let val = match[2].trim();
          if (val.startsWith('"') && val.endsWith('"') || val.startsWith("'") && val.endsWith("'")) {
            val = val.slice(1, -1).trim();
          }
          cachedDiskEnv[key] = val;
        }
      });
    }
  } catch {
  }
  return cachedDiskEnv;
}
function getEnvVar(...names) {
  for (const name of names) {
    if (process.env[name] !== void 0 && String(process.env[name]).trim() !== "") {
      const cleaned = cleanEnvValue(process.env[name], name);
      if (cleaned) return cleaned;
    }
  }
  const disk = getDiskEnv();
  for (const name of names) {
    if (disk[name] !== void 0 && String(disk[name]).trim() !== "") {
      const cleaned = cleanEnvValue(disk[name], name);
      if (cleaned) return cleaned;
    }
  }
  return void 0;
}
const DEFAULT_RECIPIENT = "contact@ndsolotravel.com";
async function sendNewsletterNotification(subscriberEmail) {
  const recipient = getEnvVar("CONTACT_NOTIFICATION_EMAIL", "NOTIFICATION_EMAIL") || DEFAULT_RECIPIENT;
  const resendApiKey = getEnvVar("RESEND_API_KEY");
  const fromAddress = getEnvVar("RESEND_FROM_EMAIL") || "NDSOLOTRAVEL Newsletter <contact@ndsolotravel.com>";
  if (!resendApiKey) {
    console.warn(`[subscribe] RESEND_API_KEY is not configured in process.env or .env. Notification for subscriber <${subscriberEmail}> was not dispatched.`);
    return {
      sent: false,
      provider: "resend",
      reason: "RESEND_API_KEY is not configured in environment variables."
    };
  }
  const emailSubject = `New Subscriber: ${subscriberEmail}`;
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700;">New Newsletter Subscriber</h2>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Subscriber Email:</strong> <a href="mailto:${subscriberEmail}" style="color: #2563eb;">${subscriberEmail}</a></p>
      <p style="margin: 8px 0; font-size: 14px;"><strong>Subscribed At:</strong> ${(/* @__PURE__ */ new Date()).toISOString()}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 13px; color: #475569; line-height: 1.6;">A new reader has subscribed to the NDSOLOTRAVEL dispatch via the website newsletter form.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Sent via NDSOLOTRAVEL website. Notification recipient: ${recipient}</p>
    </div>
  `;
  const plainText = `New Newsletter Subscriber Notification

Subscriber Email: ${subscriberEmail}
Subscribed At: ${(/* @__PURE__ */ new Date()).toISOString()}

---
Sent via NDSOLOTRAVEL website. Notification recipient: ${recipient}`;
  try {
    console.log(`[subscribe] Initiating Resend API dispatch to ${recipient}...`);
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
        text: plainText,
        html: htmlContent
      })
    });
    const resData = await res.json();
    if (!res.ok) {
      const errMsg = typeof resData?.message === "string" && resData.message || resData?.name || `HTTP ${res.status}`;
      let hint = "";
      if (/not verified|verify.*domain|domain.*verified/i.test(errMsg)) {
        hint = "Resend domain verification is failing for ndsolotravel.com. Add the DNS records at Hostinger and re-verify at https://resend.com/domains";
      } else if (/invalid.*api.*key|unauthorized|401/i.test(errMsg)) {
        hint = "The RESEND_API_KEY appears to be invalid. Generate a new key at https://resend.com/api-keys";
      } else {
        hint = "Check the Resend API key and confirm the sender domain is verified at https://resend.com/domains.";
      }
      console.error(`[subscribe] Resend API rejected email delivery (HTTP ${res.status}): ${errMsg}`, {
        statusCode: resData?.statusCode ?? res.status,
        message: errMsg,
        hint
      });
      return {
        sent: false,
        provider: "resend",
        reason: `Resend API error: ${errMsg}`
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
  } = await import("./client.server-Dg1wI_zl.mjs");
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
    await supabaseAdmin.rpc("send_contact_message", {
      p_name: data.name,
      p_email: data.email.toLowerCase(),
      p_subject: subject,
      p_message: data.message,
      p_ip_hash: ipHash
    });
  } catch {
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
    emailDelivered: emailResult.sent,
    emailReason: emailResult.reason,
    emailDiagnostics: emailResult.diagnostics
  };
});
async function notifyRecipientByEmail(msg) {
  const recipient = getEnvVar("CONTACT_NOTIFICATION_EMAIL", "NOTIFICATION_EMAIL") || DEFAULT_RECIPIENT;
  const resendApiKey = getEnvVar("RESEND_API_KEY");
  const fromAddress = getEnvVar("RESEND_FROM_EMAIL") || "NDSOLOTRAVEL Contact <contact@ndsolotravel.com>";
  console.log(`[sendContact] Runtime env evaluation:`, {
    "RESEND_API_KEY configured": Boolean(resendApiKey),
    "RESEND_FROM_EMAIL configured": Boolean(getEnvVar("RESEND_FROM_EMAIL")),
    "CONTACT_NOTIFICATION_EMAIL configured": Boolean(getEnvVar("CONTACT_NOTIFICATION_EMAIL", "NOTIFICATION_EMAIL")),
    effectiveRecipient: recipient,
    effectiveFrom: fromAddress
  });
  const diagnostics = {
    resendConfigured: Boolean(resendApiKey),
    recipientConfigured: Boolean(recipient),
    effectiveRecipient: recipient,
    effectiveFrom: fromAddress,
    error: null
  };
  if (!resendApiKey) {
    console.warn(`[sendContact] RESEND_API_KEY is not configured in process.env or .env. Notification to ${recipient} was not dispatched.`);
    diagnostics.error = "RESEND_API_KEY is missing from environment variables.";
    return {
      sent: false,
      provider: "resend",
      reason: "RESEND_API_KEY is not configured in Hostinger environment variables.",
      diagnostics
    };
  }
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
  const plainText = `New Contact Form Message

Visitor Name: ${msg.name}
Visitor Email: ${msg.email}
Subject: ${msg.subject || "N/A"}

Message:
${msg.message}

---
Sent via NDSOLOTRAVEL contact form. Recipient: ${recipient}`;
  try {
    console.log(`[sendContact] Initiating Resend API dispatch to ${recipient}...`);
    const cleanVisitorName = msg.name.replace(/["\\]/g, "");
    const replyToHeader = `"${cleanVisitorName}" <${msg.email}>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipient],
        reply_to: replyToHeader,
        subject: emailSubject,
        text: plainText,
        html: htmlContent
      })
    });
    const resData = await res.json();
    if (!res.ok) {
      const errMsg = typeof resData?.message === "string" && resData.message || resData?.name || `HTTP ${res.status}`;
      let hint = "";
      let detailedError = errMsg;
      if (/not verified|verify.*domain|domain.*verified/i.test(errMsg)) {
        hint = `Resend domain verification is failing for ndsolotravel.com. 

TO FIX THIS:
1. Log in to Hostinger and go to DNS Zone Editor for ndsolotravel.com
2. Add these 3 DNS records:

   Record 1 - DKIM TXT:
   Name: resend._domainkey.ndsolotravel.com
   Type: TXT
   Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+VdNkOo65o+tEkWdfU/T4gbAYCthoIBBnVe9rn88lQX/T7VA9mNwcVkqQPnMAA5xpLuStAsonyu8rr8eW+Z1SXvqP4ub0J2gRLv7EHicxNcN0ehDbJHlTg3V6bTc58ZhG5y5fMfWC9qeM+2QRuo6EKbdDsujho2e17TYrogQc5QIDAQAB

   Record 2 - MX:
   Name: send.ndsolotravel.com
   Type: MX
   Value: feedback-smtp.ap-northeast-1.amazonses.com
   Priority: 10

   Record 3 - SPF TXT:
   Name: send.ndsolotravel.com
   Type: TXT
   Value: v=spf1 include:amazonses.com ~all

3. Wait 5-10 minutes for DNS propagation
4. Go to https://resend.com/domains and click "Verify" on ndsolotravel.com
5. The domain status should change from "failed" to "verified"`;
        detailedError = `Domain verification failed: ${errMsg}`;
      } else if (/invalid.*api.*key|unauthorized|401/i.test(errMsg)) {
        hint = "The RESEND_API_KEY appears to be invalid. Generate a new key at https://resend.com/api-keys";
        detailedError = `API key error: ${errMsg}`;
      } else if (/rate.*limit|429/i.test(errMsg)) {
        hint = "Resend rate limit reached. Wait a few minutes before trying again.";
        detailedError = `Rate limit: ${errMsg}`;
      } else {
        hint = "Check the Resend API key and confirm the sender domain is verified at https://resend.com/domains.";
      }
      console.error(`[sendContact] Resend API rejected email delivery (HTTP ${res.status}): ${errMsg}`, {
        statusCode: resData?.statusCode ?? res.status,
        message: errMsg,
        hint,
        fullResponse: resData
      });
      diagnostics.error = `${detailedError} | ${hint}`;
      return {
        sent: false,
        provider: "resend",
        reason: detailedError,
        diagnostics
      };
    }
    console.log(`[sendContact] Resend email ACCEPTED for ${recipient} (ID: ${resData.id})`);
    return {
      sent: true,
      provider: "resend",
      id: resData.id,
      diagnostics
    };
  } catch (err) {
    console.error(`[sendContact] Resend API delivery attempt failed:`, err?.message || err);
    const errMsg = err?.message || "Resend network error";
    diagnostics.error = errMsg;
    return {
      sent: false,
      provider: "resend",
      reason: errMsg,
      diagnostics
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
