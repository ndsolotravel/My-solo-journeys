globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, a as toEventHandler, b as defineLazyEventHandler, c as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/server-7Z2Wk8DL.mjs").then(function(n) {
    return n.i;
  }))
};
globalThis.__nitro_vite_envs__ = services;
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"13a-WkFg/AmDpXwIZNb50wwBw/FeOJo"',
    "mtime": "2026-08-09T22:33:08.491Z",
    "size": 314,
    "path": "../public/manifest.webmanifest"
  },
  "/favicon.svg": {
    "type": "image/svg+xml",
    "etag": '"10f-x37Z27Iot3Yaz1uSBXvbE23MuYs"',
    "mtime": "2026-08-09T19:21:04.027Z",
    "size": 271,
    "path": "../public/favicon.svg"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/assets/account-CExCMm2a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-JoYYtJOB/jMYQKAzgsSSKLfYPls"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 2068,
    "path": "../public/assets/account-CExCMm2a.js"
  },
  "/assets/about-BaoeNtdS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bf8-YUSOVVtuojPImdPjOMu1NEZqzOY"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 3064,
    "path": "../public/assets/about-BaoeNtdS.js"
  },
  "/assets/admin-BectfrlS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a9-NxYHI8TYeBBwdIPR54BVDGeoci4"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 2217,
    "path": "../public/assets/admin-BectfrlS.js"
  },
  "/assets/admin.comments-DsT2v1xO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8dc-7Xz40yO7S68EgaHeskNEIrkX4zA"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 2268,
    "path": "../public/assets/admin.comments-DsT2v1xO.js"
  },
  "/favicon.png": {
    "type": "image/png",
    "etag": '"491-mnU3CPL5fB13KzfG4nVJvCRwZ+0"',
    "mtime": "2026-07-10T12:03:22.000Z",
    "size": 1169,
    "path": "../public/favicon.png"
  },
  "/assets/admin.destinations-m-8F2Qcy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23a6-T8gDaG67GH6Me09Dz9U3LJoSv/M"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 9126,
    "path": "../public/assets/admin.destinations-m-8F2Qcy.js"
  },
  "/assets/admin.index-DaEWjGIP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104b-MHH4dneoFGeSbY+HegS7UeqaFgc"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 4171,
    "path": "../public/assets/admin.index-DaEWjGIP.js"
  },
  "/assets/admin.gallery-NWRHzobJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"57dd-7GXhCE4u0mQnMeaPVGiG1ww5GaI"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 22493,
    "path": "../public/assets/admin.gallery-NWRHzobJ.js"
  },
  "/assets/admin.messages-DyoeMMnP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1309-GTcFQs9LkvwXkrhTC1/NivPiM7I"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 4873,
    "path": "../public/assets/admin.messages-DyoeMMnP.js"
  },
  "/assets/admin.posts.new-DqW2n8n9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27e-sEwIHpnE5V19TsbiLZhL8pg4DV0"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 638,
    "path": "../public/assets/admin.posts.new-DqW2n8n9.js"
  },
  "/assets/admin.analytics-mxYEAiCh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"645ee-gaZ3U8ZiohasFQjaCxWmOGugglE"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 411118,
    "path": "../public/assets/admin.analytics-mxYEAiCh.js"
  },
  "/assets/admin.posts.index-CNEG0LNV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2463-6DgaxL2toEwYH6/oAF4QdiwZxKo"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 9315,
    "path": "../public/assets/admin.posts.index-CNEG0LNV.js"
  },
  "/assets/admin.posts._id-Coq918Fk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b7-yMYy8IKLnpTRHl1kEeMoL0rsSvQ"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 951,
    "path": "../public/assets/admin.posts._id-Coq918Fk.js"
  },
  "/assets/admin.settings-C3hU3xDy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28d6-kHCShHo5vkqCeqxNN8g7eq6EDUI"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 10454,
    "path": "../public/assets/admin.settings-C3hU3xDy.js"
  },
  "/assets/admin.subscribers-BOu7VL8u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f74-1kPdENUoe53gTKCA8c43ZlImJKI"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 12148,
    "path": "../public/assets/admin.subscribers-BOu7VL8u.js"
  },
  "/assets/arrow-left-CJndfcAg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-2oPK/IQn+ry53YWqDE6K72aEbkQ"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 166,
    "path": "../public/assets/arrow-left-CJndfcAg.js"
  },
  "/assets/alert-dialog-iuJ192MD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10249-Z+D1Zrs+oPApyQOhzKCMlTuG0U4"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 66121,
    "path": "../public/assets/alert-dialog-iuJ192MD.js"
  },
  "/assets/arrow-right-CeEkY6Ek.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-CEBGgnyGCR9Ox+MQ0M51LtJ80Eg"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 166,
    "path": "../public/assets/arrow-right-CeEkY6Ek.js"
  },
  "/assets/arrow-up-right-Ck9bvFx4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-Cp0PErWexCnEGe0T3zSnPSnUroA"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-Ck9bvFx4.js"
  },
  "/assets/auth-DiAstF-t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f05-2oWhXuCyDChlRh9fKKHokM2FnAo"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 7941,
    "path": "../public/assets/auth-DiAstF-t.js"
  },
  "/assets/blog-CIce21RK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-vpeHuLPSOY/0yfeImCTYHFr2Exc"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 103,
    "path": "../public/assets/blog-CIce21RK.js"
  },
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/assets/blog.index-DachIrbL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2385-rZHN+SwzTtG2nTl/fLSN0XlqVvs"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 9093,
    "path": "../public/assets/blog.index-DachIrbL.js"
  },
  "/assets/blog._slug-DFCuWnR0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5840-66TBmv8H35Fne//gv2akaiToNB0"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 22592,
    "path": "../public/assets/blog._slug-DFCuWnR0.js"
  },
  "/assets/blog._slug-DXw2W07i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-9reamX/pX3iThQdCHyC2F0u5Ms4"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 572,
    "path": "../public/assets/blog._slug-DXw2W07i.js"
  },
  "/assets/calendar-BAWjU6w9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-ByY+hk9Jhm/0a13DvVHIOrtwPPg"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 258,
    "path": "../public/assets/calendar-BAWjU6w9.js"
  },
  "/assets/chevron-right-DKt3y1Dv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5-Bu9a743oG8uuGdbHTtBMhLjDxgg"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 213,
    "path": "../public/assets/chevron-right-DKt3y1Dv.js"
  },
  "/assets/clock-D0mny8xJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-WuSxb0rKInhp0P5ZSpe4XPbTKQ4"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 170,
    "path": "../public/assets/clock-D0mny8xJ.js"
  },
  "/assets/circle-check-Bdb7yyti.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-aGUHnV2qOUif7nCvbTfzOIRgx/M"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 179,
    "path": "../public/assets/circle-check-Bdb7yyti.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-D8R_C3FW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3304-rcYfIxpO2P9u1HWXunE/InSn0qo"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 13060,
    "path": "../public/assets/contact-D8R_C3FW.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-DtTmtObl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-uboFQ7BmNIuW0IpUrYi2HadypYM"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 103,
    "path": "../public/assets/destinations-DtTmtObl.js"
  },
  "/assets/destinations.index-DGww5XfE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166b-9mWJnsYrnep6QC24bjUETK+5Euo"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 5739,
    "path": "../public/assets/destinations.index-DGww5XfE.js"
  },
  "/assets/destinations._slug-DBN3UTvF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d60-/a/xup5skBxnVRI8OtMOuklyj00"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 7520,
    "path": "../public/assets/destinations._slug-DBN3UTvF.js"
  },
  "/assets/destinations._slug-Di1H0igP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-BFI2jp4T984lWOi6qH6dSizU5WQ"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-Di1H0igP.js"
  },
  "/assets/DestinationsMap-CW-Rv-s1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86f-N0incXg6R9QD1P/9qjPK6iTHUho"',
    "mtime": "2026-08-20T19:29:36.939Z",
    "size": 2159,
    "path": "../public/assets/DestinationsMap-CW-Rv-s1.js"
  },
  "/assets/eye-DPK2bvHa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-ItE3O6JfEmGTr5w23+EV8pOJbDc"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 257,
    "path": "../public/assets/eye-DPK2bvHa.js"
  },
  "/assets/gallery-CzzQezEq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1831-NwpBlzOTTCWaN6GYD+itykdXyZw"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 6193,
    "path": "../public/assets/gallery-CzzQezEq.js"
  },
  "/assets/geocoding.functions-C1YOo3De.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12c-6II3MFlkK+eoBi7zx3lpqmYuLK0"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 300,
    "path": "../public/assets/geocoding.functions-C1YOo3De.js"
  },
  "/assets/image-BgHPCeHc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-vOvt6RGK5c5mRlvaiI9Vts7xcVA"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 270,
    "path": "../public/assets/image-BgHPCeHc.js"
  },
  "/assets/index-C3mSCEWD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cde8-IoXgdP6Zni9Uwxy6q2NGwysegA4"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 118248,
    "path": "../public/assets/index-C3mSCEWD.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-20T19:29:36.933Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-C6BSy9s1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21a29-NUrTWCWIVt1ES/yTleq/7fd3Ytw"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 137769,
    "path": "../public/assets/index-C6BSy9s1.js"
  },
  "/assets/mail-D3SR_MfU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-zuyq3MiW8enqtC3BZb2wujRlQuc"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 214,
    "path": "../public/assets/mail-D3SR_MfU.js"
  },
  "/assets/leaflet-src-DWFB1qrG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-WrkP+LUUET1IGeIx6VgjbPGF0BQ"',
    "mtime": "2026-08-20T19:29:36.939Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-DWFB1qrG.js"
  },
  "/assets/index-BIXT2ygM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d73bf-8SmS61fGe18BZwd4IXjWjynj1k0"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 881599,
    "path": "../public/assets/index-BIXT2ygM.js"
  },
  "/assets/map-CyZVFGbC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-1gHZ2n6mH204yDNooQP0N6pcLDs"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 426,
    "path": "../public/assets/map-CyZVFGbC.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-CeC1cazx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"45d-dsrgxJF6Z1OIoh9pYb99MQr2M3Y"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 1117,
    "path": "../public/assets/maximize-2-CeC1cazx.js"
  },
  "/assets/message-square-DzgVlTk_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b5-U53W2udMEqbMBaHpkDO7AREeDeU"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 437,
    "path": "../public/assets/message-square-DzgVlTk_.js"
  },
  "/assets/navigation-BKBmjUm5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-j9h9nfw1nwJtA/HIFEPk6h3Omcg"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 149,
    "path": "../public/assets/navigation-BKBmjUm5.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-20T19:29:36.933Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-20T19:29:36.917Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-CG2tCluy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-i5bbhcZGSv5qDNbA8Na0nrP//pw"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 154,
    "path": "../public/assets/plus-CG2tCluy.js"
  },
  "/assets/PostCard-V0MP4Sqs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a3e-JvUMnsQxS7RprppTsmTHYYQWGRI"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 2622,
    "path": "../public/assets/PostCard-V0MP4Sqs.js"
  },
  "/assets/PostEditor-C9m4vTfE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8d82-4VpAP01zBlnDDiBGf955McZYODI"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 36226,
    "path": "../public/assets/PostEditor-C9m4vTfE.js"
  },
  "/assets/refresh-cw-tOfKt36j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-xkaoxMZNoePwLFu53FuTM2BvU5I"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-tOfKt36j.js"
  },
  "/assets/route-DDGn5GMc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-Ibj6hpCWzPCUAi0/SF7acDNZKA0"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 95,
    "path": "../public/assets/route-DDGn5GMc.js"
  },
  "/assets/save-B43q3Or9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-ESU4yvD9YHIQpxIHAF138WqWO7I"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 328,
    "path": "../public/assets/save-B43q3Or9.js"
  },
  "/assets/settings-ClK_ncUN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-YJ8TiL+w3Rj9TxcNHOeL39Neqz4"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 488,
    "path": "../public/assets/settings-ClK_ncUN.js"
  },
  "/assets/sparkles-BNWzSiC_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-d4Qyo098gtQ07zKmwCjYZtuluHQ"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 495,
    "path": "../public/assets/sparkles-BNWzSiC_.js"
  },
  "/assets/share-2-n50AMlJI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-nk3c/PoTJtsAlpoWYZiXsqX5v3c"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 358,
    "path": "../public/assets/share-2-n50AMlJI.js"
  },
  "/assets/star-DXCvnlW_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-lxXJHjvsUz7hmxKPmcRJcS+/22o"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 473,
    "path": "../public/assets/star-DXCvnlW_.js"
  },
  "/assets/styles-DnOPAhdu.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"21ac3-LHrLKb54NCUcHHdgXqMt8bqfu1g"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 137923,
    "path": "../public/assets/styles-DnOPAhdu.css"
  },
  "/assets/upload-BBat7w6i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-TrSAFm5ros6QK6bZQMji7EG5lVU"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 231,
    "path": "../public/assets/upload-BBat7w6i.js"
  },
  "/assets/trash-2-C3WDSqnL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-sItBGYyE/qPvWyYqnV74ovGGhzo"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 329,
    "path": "../public/assets/trash-2-C3WDSqnL.js"
  },
  "/assets/useBaseQuery-DJAyaRVj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-bF7XD9vmNhHmRYpdmgNDHn5HHRM"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-DJAyaRVj.js"
  },
  "/assets/useMutation-Kab0QSft.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-j5+pRC1GzHA+73ujPGzkA0SKYCQ"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 2210,
    "path": "../public/assets/useMutation-Kab0QSft.js"
  },
  "/assets/useQuery-B9hhcWSz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-EZAWbfMS6CNcvsqI26gixJke4jM"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 100,
    "path": "../public/assets/useQuery-B9hhcWSz.js"
  },
  "/assets/users-Bs3XhTOQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-e3+A+rDLZaLWED5IYZr944joJ0k"',
    "mtime": "2026-08-20T19:29:36.937Z",
    "size": 307,
    "path": "../public/assets/users-Bs3XhTOQ.js"
  },
  "/assets/useSuspenseQuery-DSFjzOyI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-ItjXORoHwTt9lFsc6IwX6JdLoe0"',
    "mtime": "2026-08-20T19:29:36.935Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-DSFjzOyI.js"
  },
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _fAE3V1 = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_LGfWhZ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_LGfWhZ };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_fAE3V1)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    middleware.push(...h3App["~middleware"]);
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
