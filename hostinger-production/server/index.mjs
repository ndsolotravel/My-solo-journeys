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
  "/favicon.png": {
    "type": "image/png",
    "etag": '"491-mnU3CPL5fB13KzfG4nVJvCRwZ+0"',
    "mtime": "2026-07-10T12:03:22.000Z",
    "size": 1169,
    "path": "../public/favicon.png"
  },
  "/favicon.svg": {
    "type": "image/svg+xml",
    "etag": '"10f-x37Z27Iot3Yaz1uSBXvbE23MuYs"',
    "mtime": "2026-08-09T19:21:04.027Z",
    "size": 271,
    "path": "../public/favicon.svg"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"13a-WkFg/AmDpXwIZNb50wwBw/FeOJo"',
    "mtime": "2026-08-09T22:33:08.491Z",
    "size": 314,
    "path": "../public/manifest.webmanifest"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/assets/about-DV4sHoYH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f2f-FUBtTZ1lZ6dO+rWyr7H8X//6yqM"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 3887,
    "path": "../public/assets/about-DV4sHoYH.js"
  },
  "/assets/account-Bbb5gEQh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-LV9d0I6xuKnJl0EZlS8f6zQ2i74"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 2068,
    "path": "../public/assets/account-Bbb5gEQh.js"
  },
  "/assets/admin-B3BbOB5k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7f7-7F3QjVIjU+j/99z2b3sMLYvRTJE"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 2039,
    "path": "../public/assets/admin-B3BbOB5k.js"
  },
  "/assets/admin.comments-CAtJOQHb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8dc-jtNDgkEDWXpNEKfutqZ3Aay4MVE"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 2268,
    "path": "../public/assets/admin.comments-CAtJOQHb.js"
  },
  "/assets/admin.destinations-BjXB9pWE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"145a-TAX8adu99ODHRR3SGpxT8p2KUE0"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 5210,
    "path": "../public/assets/admin.destinations-BjXB9pWE.js"
  },
  "/assets/admin.index-A4ljdc4o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e48-vQs3QDTimNXwRwmOafalESjNyPs"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 3656,
    "path": "../public/assets/admin.index-A4ljdc4o.js"
  },
  "/assets/admin.messages-sZVoZ6fn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1309-2N8FgHp3mYalQNiy4HpDWfG+drM"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 4873,
    "path": "../public/assets/admin.messages-sZVoZ6fn.js"
  },
  "/assets/admin.analytics-BhZhLY9V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"645ed-8etfPbitdCPOiqjzRrprR950dl0"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 411117,
    "path": "../public/assets/admin.analytics-BhZhLY9V.js"
  },
  "/assets/admin.posts.index-B5jmkM_H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11cf9-yHtaQZBlLo23D3oZkSy5wY56/Go"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 72953,
    "path": "../public/assets/admin.posts.index-B5jmkM_H.js"
  },
  "/assets/admin.posts.new-DgISevvt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-30jk4rFOay8G+4rWm22nCyTkRSQ"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-DgISevvt.js"
  },
  "/assets/admin.posts._id-BgiX0zXW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-P8i+Hk+4q8H/uZXvnc6wKHYN+t8"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-BgiX0zXW.js"
  },
  "/assets/admin.subscribers-UIsB0IcQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f71-lBNFzLqGtzQeFewQLTD1/10U2TM"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 12145,
    "path": "../public/assets/admin.subscribers-UIsB0IcQ.js"
  },
  "/assets/arrow-left-BqUGU7Bv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-xeDjl4vRalbPp00AQ78U2XR2TNU"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 166,
    "path": "../public/assets/arrow-left-BqUGU7Bv.js"
  },
  "/assets/arrow-right-Zawe6i_1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-7++nxCkhQqWD8qTFF6YoJk6Q2t0"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 166,
    "path": "../public/assets/arrow-right-Zawe6i_1.js"
  },
  "/assets/arrow-up-right-D1LdUryQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-eXjjbZ6Np9gI4IEdFWH55qr2QIs"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-D1LdUryQ.js"
  },
  "/assets/auth-CXqiW1u9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f05-rM51gZTKUKBMWU+CRGCqHHbE1S0"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 7941,
    "path": "../public/assets/auth-CXqiW1u9.js"
  },
  "/assets/blog-Cj7qaWUD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-EFIcz+GPfku5fO7239BINYhuq/o"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 103,
    "path": "../public/assets/blog-Cj7qaWUD.js"
  },
  "/assets/blog.index-DOeE3srL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2327-47gpvvyQKDpbRs1ikQUaZV/4ddQ"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 8999,
    "path": "../public/assets/blog.index-DOeE3srL.js"
  },
  "/assets/blog._slug-8BZ3QQsZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"237-6SkC9GuJYy/7K9Z6S01rlXksoio"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 567,
    "path": "../public/assets/blog._slug-8BZ3QQsZ.js"
  },
  "/assets/blog._slug-Bt3x-2CE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4bb4-kdQuoPrcpPrb8IQ4F97Ms0/TMXk"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 19380,
    "path": "../public/assets/blog._slug-Bt3x-2CE.js"
  },
  "/assets/calendar-62RyTVu7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-cmxg0E3Zg7P52sNEF94AV8WGmTA"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 258,
    "path": "../public/assets/calendar-62RyTVu7.js"
  },
  "/assets/chevron-right-5WD5yONa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5-GmD7GBgAJ9t3q/ljTCEK93t7WOk"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 213,
    "path": "../public/assets/chevron-right-5WD5yONa.js"
  },
  "/assets/circle-check-BElWeAYC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-GmTGxWMGq8KzHfIkJ5xPfCu5+4g"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 174,
    "path": "../public/assets/circle-check-BElWeAYC.js"
  },
  "/assets/clock-DQc_8GTt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-8LEEOv9s5H1xrO0Nj8XFSz763GU"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 165,
    "path": "../public/assets/clock-DQc_8GTt.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-CZUuE03R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16cf-mIRdBIbgXGfHe9rCtAKpEq/m2WQ"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 5839,
    "path": "../public/assets/contact-CZUuE03R.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-ThFzy2i9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-BDW84jklem9n7RfHWEt/IRDxvgc"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 103,
    "path": "../public/assets/destinations-ThFzy2i9.js"
  },
  "/assets/destinations.index-BuxHIwj0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"162b-ldhK1hxgSJxTyI7yqO5v5+jkMXQ"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 5675,
    "path": "../public/assets/destinations.index-BuxHIwj0.js"
  },
  "/assets/destinations._slug-B-JO8jOo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c23-xGjnt4ddAJe7C+79mp/qKiRg30A"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 7203,
    "path": "../public/assets/destinations._slug-B-JO8jOo.js"
  },
  "/assets/destinations._slug-uAcP0YHg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-GCmIkuPc50DTzy5+wh8xzxvMhZE"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-uAcP0YHg.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/DestinationsMap-DvJ0d3m-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-XxNNGMdFKNRCvp432bObdeiMN8Q"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-DvJ0d3m-.js"
  },
  "/assets/eye-CBU2_Li1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-FK4mmF40h00JR1Unz4UxnrWdwNU"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 252,
    "path": "../public/assets/eye-CBU2_Li1.js"
  },
  "/assets/gallery-DGhRrW8E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1831-dIncRdG6WEaKLjUBAIG+OwNZWoQ"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 6193,
    "path": "../public/assets/gallery-DGhRrW8E.js"
  },
  "/assets/index-BKTiPudb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ceca-Qxg5PFFDeLdHBpg/dl00+vWTsBY"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 118474,
    "path": "../public/assets/index-BKTiPudb.js"
  },
  "/assets/mail-DxQ8GXvO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-gE95T5ObydpqE8ZPOtvkFFBXqpY"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 214,
    "path": "../public/assets/mail-DxQ8GXvO.js"
  },
  "/assets/index-zsIVUjKH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21d04-QMsiXXaWjXzmJoQebtpgdYRHKaE"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 138500,
    "path": "../public/assets/index-zsIVUjKH.js"
  },
  "/assets/map-D6pfGXPq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-BcU4cuRivLESEpntraRR3dk/IdU"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 426,
    "path": "../public/assets/map-D6pfGXPq.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-DwDGIw9O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b5-jJDcM3gjyEQcS8ZzDzUHs926Ow8"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 437,
    "path": "../public/assets/message-square-DwDGIw9O.js"
  },
  "/assets/leaflet-src-v8jnXmTG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-THWxuocOBypwXQm8n4LaRGDG5lU"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-v8jnXmTG.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-15T19:45:31.676Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-Dz3afpCG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-Nt115NkLg+cbTQLiVLz//voZbjk"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 154,
    "path": "../public/assets/plus-Dz3afpCG.js"
  },
  "/assets/PostCard-Bkatlyew.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"88b-qusnfSv04kfm8AlB+KjVTs4qcGs"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 2187,
    "path": "../public/assets/PostCard-Bkatlyew.js"
  },
  "/assets/index-DSjdR-fM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5315-d5jiYmzPA20qwNOWapZ+T5u9yP4"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 873237,
    "path": "../public/assets/index-DSjdR-fM.js"
  },
  "/assets/PostEditor-0g95JGg6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5030-RLFBtMBzMRXIEcJHTjSWxNqHUr4"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 20528,
    "path": "../public/assets/PostEditor-0g95JGg6.js"
  },
  "/assets/refresh-cw-p62lmZO_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-i7ORade8AyFMOpagow1DTmddV7g"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-p62lmZO_.js"
  },
  "/assets/route-DQzI8VaM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-bgd2sW1kR6Acz7xbjyHybwI3vuA"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 95,
    "path": "../public/assets/route-DQzI8VaM.js"
  },
  "/assets/share-2-uv7s_mjr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"161-yuCUsejZL+JZP9EkNZvHECF7FXw"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 353,
    "path": "../public/assets/share-2-uv7s_mjr.js"
  },
  "/assets/sparkles-eNSS2PFo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-qNOkC2masvgxB6m4uoHDBGy61b0"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 495,
    "path": "../public/assets/sparkles-eNSS2PFo.js"
  },
  "/assets/star-BIqMWBhq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-5bJ4m9C7Lcq8/X/q4Al0Q3EofxQ"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 473,
    "path": "../public/assets/star-BIqMWBhq.js"
  },
  "/assets/trash-2-DWGxS6RW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-dIcs6/3Uhq4vNF7XuKJSozF0aHY"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 329,
    "path": "../public/assets/trash-2-DWGxS6RW.js"
  },
  "/assets/useBaseQuery-B7q1uyOK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-KF0qE/sdpV5yvEvnTXnF/3i7UIw"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-B7q1uyOK.js"
  },
  "/assets/useMutation-B4K-85Ou.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-jF/TXdMlk57zA004+LtQNmBbrQY"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 2210,
    "path": "../public/assets/useMutation-B4K-85Ou.js"
  },
  "/assets/styles-DNoG_Xua.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1f0cc-D+2YRqzNLXE2mA+LE4iHselV2uw"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 127180,
    "path": "../public/assets/styles-DNoG_Xua.css"
  },
  "/assets/useQuery-CaXd4QSV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-FOlKt+tgmhTt3QL7UdTLf7UrTRY"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 100,
    "path": "../public/assets/useQuery-CaXd4QSV.js"
  },
  "/assets/users-CLMSa9xz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-IueJuIVOPlWyHWWtNFexqv/6S6A"',
    "mtime": "2026-08-15T19:45:31.693Z",
    "size": 307,
    "path": "../public/assets/users-CLMSa9xz.js"
  },
  "/assets/useSuspenseQuery-50WbdcLc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-X9A2toXNTaUGQ2ZfOLIyvfwRhd4"',
    "mtime": "2026-08-15T19:45:31.689Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-50WbdcLc.js"
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
