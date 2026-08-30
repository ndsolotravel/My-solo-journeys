import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
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
const DEFAULT_LEGAL_PAGES = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: `*Last updated: August 2026*

## 1. Information We Collect
When you visit ndsolotravel.com, we may automatically collect certain information about your device, including your web browser, IP address, time zone, and some cookies. We also collect information about how you interact with our site, including pages viewed and links clicked.

If you subscribe to our newsletter, comment on a post, or contact us, we may collect your name, email address, and any information you voluntarily provide.

## 2. How We Use Your Information
We use the information we collect to:
- Operate and maintain the ndsolotravel website
- Send newsletters and updates if you have subscribed
- Respond to your messages and comments
- Improve our content and user experience
- Monitor and analyze usage patterns and trends
- Protect against unauthorized access and ensure site security

## 3. Cookies
ndsolotravel uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our site. You can control cookies through your browser settings. Disabling cookies may affect site functionality.

## 4. Third-Party Services
We may use third-party services such as analytics providers, email marketing platforms, and content delivery networks. These services may collect information about your interactions with our site. We do not sell your personal information to third parties.

## 5. Data Retention
We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.

## 6. Your Rights
You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).

## 7. Changes to This Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.

## 8. Contact Us
If you have any questions about this Privacy Policy, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).`,
    seo_title: "Privacy Policy — ndsolotravel",
    seo_description: "Privacy Policy for ndsolotravel. Learn how we collect, use, and protect your personal information.",
    hero_image: "",
    published: true
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    content: `*Last updated: August 2026*

## General Information
The information provided on ndsolotravel.com is for general informational and educational purposes only. All content is published in good faith and for general information purposes. While we strive to keep information accurate and up to date, we make no warranties about the completeness, reliability, or suitability of this information.

## Travel Advice
Travel involves inherent risks. The travel stories, guides, tips, and recommendations shared on ndsolotravel are based on personal experiences and are intended for informational purposes only. Travel conditions, regulations, weather, and safety situations can change rapidly and without notice.

Always conduct your own research and exercise personal judgment before undertaking any travel. We recommend consulting official travel advisories, local authorities, and qualified professionals for the most current information regarding safety, health, and entry requirements for any destination.

## External Links
ndsolotravel may contain links to external websites that are not operated or maintained by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

## Professional Advice
Content on ndsolotravel should not be construed as professional advice of any kind, including but not limited to medical, legal, or financial advice. Always seek the guidance of qualified professionals with any questions you may have regarding travel safety, health precautions, or other matters.

## Photos and Media
All photographs and media content on ndsolotravel are the property of ndsolotravel unless otherwise noted. Unauthorized use, reproduction, or distribution without written permission is prohibited.

## Consent
By using our website, you hereby consent to our disclaimer and agree to its terms. If you do not agree with any part of this disclaimer, please discontinue use of our website.

## Contact Us
If you have any questions about this Disclaimer, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).`,
    seo_title: "Disclaimer — ndsolotravel",
    seo_description: "Disclaimer for ndsolotravel. Read about the terms and conditions for using our travel content and resources.",
    hero_image: "",
    published: true
  }
};
async function assertEditor(userId, client) {
  let roles = [];
  if (client && typeof client.from === "function") {
    const {
      data
    } = await client.from("user_roles").select("role").eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r) => r.role);
    }
  }
  if (roles.length === 0) {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      data: rows
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
    roles = (rows ?? []).map((r) => r.role);
  }
  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden: Editor or admin access required");
  }
  return roles;
}
const getLegalPageBySlug_createServerFn_handler = createServerRpc({
  id: "778ec9633cb0adcb3eb8cb30c2a7968a85e3490a27fccb0807eaacfbd6dd15b2",
  name: "getLegalPageBySlug",
  filename: "src/lib/legal.functions.ts"
}, (opts) => getLegalPageBySlug.__executeServer(opts));
const getLegalPageBySlug = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(getLegalPageBySlug_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      data: page,
      error
    } = await supabaseAdmin.from("legal_pages").select("*").eq("slug", data.slug).eq("published", true).maybeSingle();
    if (page && !error) {
      return {
        legalPage: page
      };
    }
    const fallback = DEFAULT_LEGAL_PAGES[data.slug];
    return {
      legalPage: fallback ?? null
    };
  } catch {
    const fallback = DEFAULT_LEGAL_PAGES[data.slug];
    return {
      legalPage: fallback ?? null
    };
  }
});
const adminListLegalPages_createServerFn_handler = createServerRpc({
  id: "56452cb7e711caee85d85482cc59588f72ad00e02c519971992aaf7576ba8ef3",
  name: "adminListLegalPages",
  filename: "src/lib/legal.functions.ts"
}, (opts) => adminListLegalPages.__executeServer(opts));
const adminListLegalPages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListLegalPages_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data,
    error
  } = await client.from("legal_pages").select("*").order("title", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const adminGetLegalPage_createServerFn_handler = createServerRpc({
  id: "0cba286ad598fb5f9554cd4673826fb7d9646b907528efe28484beb04f47758c",
  name: "adminGetLegalPage",
  filename: "src/lib/legal.functions.ts"
}, (opts) => adminGetLegalPage.__executeServer(opts));
const adminGetLegalPage = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(adminGetLegalPage_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: page,
    error
  } = await client.from("legal_pages").select("*").eq("slug", data.slug).maybeSingle();
  if (error) throw new Error(error.message);
  if (!page) {
    return DEFAULT_LEGAL_PAGES[data.slug] ?? null;
  }
  return page;
});
const adminUpsertLegalPage_createServerFn_handler = createServerRpc({
  id: "937009e7484166943d38c7957e6d738ecb9686e3d926481b72569119f35d5c81",
  name: "adminUpsertLegalPage",
  filename: "src/lib/legal.functions.ts"
}, (opts) => adminUpsertLegalPage.__executeServer(opts));
const adminUpsertLegalPage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  slug: stringType().min(1),
  title: stringType().min(1),
  content: stringType(),
  seo_title: stringType().nullable().optional(),
  seo_description: stringType().nullable().optional(),
  hero_image: stringType().nullable().optional(),
  published: booleanType().default(true)
}).parse(input)).handler(adminUpsertLegalPage_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const payload = {
    slug: data.slug.trim(),
    title: data.title.trim(),
    content: data.content,
    seo_title: data.seo_title?.trim() || null,
    seo_description: data.seo_description?.trim() || null,
    hero_image: data.hero_image?.trim() || null,
    published: data.published,
    updated_at: now
  };
  const {
    data: updated,
    error
  } = await client.from("legal_pages").upsert(payload, {
    onConflict: "slug"
  }).select().single();
  if (error) throw new Error(error.message);
  return updated;
});
export {
  adminGetLegalPage_createServerFn_handler,
  adminListLegalPages_createServerFn_handler,
  adminUpsertLegalPage_createServerFn_handler,
  getLegalPageBySlug_createServerFn_handler
};
