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
  "/assets/about-BT3i2wif.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"eee-+hCd42GUJex+4d4Crq00aoESIbI"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 3822,
    "path": "../public/assets/about-BT3i2wif.js"
  },
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/assets/account-BthkStPB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-mfeA9b/DShP8pKGobKSKHjNTtsg"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 2068,
    "path": "../public/assets/account-BthkStPB.js"
  },
  "/assets/admin-BPBOj94Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7f7-t4Kwu8LD5sDxnG6LUFBiaNbFaXQ"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 2039,
    "path": "../public/assets/admin-BPBOj94Q.js"
  },
  "/assets/admin.comments-DysuvnqH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8dc-ppk/Y4Pk+joK+YjUU4K+dlzfEqM"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 2268,
    "path": "../public/assets/admin.comments-DysuvnqH.js"
  },
  "/assets/admin.destinations-HL-A3_H6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"145a-eaeTBG3Kov5yPBzkvJUWELqHQDA"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 5210,
    "path": "../public/assets/admin.destinations-HL-A3_H6.js"
  },
  "/assets/admin.index-5AC-19zJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e48-QMib7F8PJMXWJomTmisbytGA+7Y"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 3656,
    "path": "../public/assets/admin.index-5AC-19zJ.js"
  },
  "/assets/admin.messages-DvI9bODd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1309-22qrsgVGIBa/OaqtFEt2SAzIKSI"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 4873,
    "path": "../public/assets/admin.messages-DvI9bODd.js"
  },
  "/assets/admin.posts.index-DkfxhU_E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11cf9-hMueewW/94bN+y3Da6kXO3jQqrU"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 72953,
    "path": "../public/assets/admin.posts.index-DkfxhU_E.js"
  },
  "/assets/admin.posts.new-PL1EFB40.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-WKI6lqbvdpPkNb+P8QbA/3h6k3g"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-PL1EFB40.js"
  },
  "/assets/admin.analytics-CmPM1mT4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"645ed-TSNtp6G4zYNMZRJTo1TVxwHlWpQ"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 411117,
    "path": "../public/assets/admin.analytics-CmPM1mT4.js"
  },
  "/assets/admin.posts._id-3N9lOUyN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-Ok8LoRul3+cy83myXK0cThPUr/w"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-3N9lOUyN.js"
  },
  "/assets/admin.subscribers-D4y6V-Bk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f71-KfKAAf/qpPkXBNm2kBs8HWSxYUg"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 12145,
    "path": "../public/assets/admin.subscribers-D4y6V-Bk.js"
  },
  "/assets/arrow-left-D_8zTE6M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-83Akc4RfnfhtOFSI4cBtjr2W3hY"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 166,
    "path": "../public/assets/arrow-left-D_8zTE6M.js"
  },
  "/assets/arrow-right-CNmOLs3h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-K30axeQpoYedZA9R8qAJEVUQP54"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 166,
    "path": "../public/assets/arrow-right-CNmOLs3h.js"
  },
  "/assets/auth-icO0IDTz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f05-O2XTbW6Tws824hmoMPFS8smmXFw"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 7941,
    "path": "../public/assets/auth-icO0IDTz.js"
  },
  "/assets/arrow-up-right-B7pOFOw8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-n061q0sFtR3aDQ2i/gwcm/+VXeU"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-B7pOFOw8.js"
  },
  "/assets/blog-BNHn8-TW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-DQEbLtqdaPevOliRC+wDbeADW38"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 103,
    "path": "../public/assets/blog-BNHn8-TW.js"
  },
  "/assets/blog.index-CwRol9a8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2327-s8IhtOu/4ocUIdIeRkETg94V7rQ"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 8999,
    "path": "../public/assets/blog.index-CwRol9a8.js"
  },
  "/assets/blog._slug-Bw1n94Dh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4bb4-Bg2oZnotELZQf88/ablezXTZWlo"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 19380,
    "path": "../public/assets/blog._slug-Bw1n94Dh.js"
  },
  "/assets/blog._slug-M9HddqE0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"237-qqQLOyagQWjevrfBfg8ZtANjroY"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 567,
    "path": "../public/assets/blog._slug-M9HddqE0.js"
  },
  "/assets/chevron-right-DoSjo010.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5-SXF3Xgrow9iav5fB3OZ4y11VzGE"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 213,
    "path": "../public/assets/chevron-right-DoSjo010.js"
  },
  "/assets/calendar-CK9XRz5F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-RoNA4GoDGzwXJToYk7mcHFLRplg"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 258,
    "path": "../public/assets/calendar-CK9XRz5F.js"
  },
  "/assets/circle-check-B6Xs3EPr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-qSaBf1ARBVOjA3g/EUf0tZtIiCE"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 174,
    "path": "../public/assets/circle-check-B6Xs3EPr.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/clock-DDmgNQkp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-QZWQhjszbli23BQ7F6wDYk59Cfs"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 165,
    "path": "../public/assets/clock-DDmgNQkp.js"
  },
  "/assets/contact-DjOj3l5O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17da-vrjhqjXfNMwDnt2FEoMgL5w90EI"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 6106,
    "path": "../public/assets/contact-DjOj3l5O.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-DA7m9664.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-P++tEcYHyPyw9HPtQPWXRz/zi/0"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 103,
    "path": "../public/assets/destinations-DA7m9664.js"
  },
  "/assets/destinations.index-YQY0Oxpk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"162b-tgV7cUAzG8Qr+rMAMr36JGGJJqY"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 5675,
    "path": "../public/assets/destinations.index-YQY0Oxpk.js"
  },
  "/assets/destinations._slug-BbQJPDeo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c23-d/xGGHKSutooeVIw2Su2hpRWhSQ"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 7203,
    "path": "../public/assets/destinations._slug-BbQJPDeo.js"
  },
  "/assets/destinations._slug-DrDEhRmV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-RUj1HjA8Ai/luvMgpFrv6QeWIXA"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DrDEhRmV.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/DestinationsMap-DjIwKZh1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-WtXgSzzRhwDgwgdA/qTHl5A7vzc"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-DjIwKZh1.js"
  },
  "/assets/eye-BgbyqK60.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-lxuVU7Lu+o7vZ8/P89XR9ksav9U"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 252,
    "path": "../public/assets/eye-BgbyqK60.js"
  },
  "/assets/gallery-D2TzBNr2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1831-95b4Xbt61VdbVTdXepHYSqzn2Nw"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 6193,
    "path": "../public/assets/gallery-D2TzBNr2.js"
  },
  "/assets/index-CszEfEku.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ceca-LcQ0K69cHMyznCrOavzxtJ6mZ2k"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 118474,
    "path": "../public/assets/index-CszEfEku.js"
  },
  "/assets/index-BVB48CjM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21a19-J+CRb58F8AnveZU+QBvr7KGWOr4"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 137753,
    "path": "../public/assets/index-BVB48CjM.js"
  },
  "/assets/mail-C8bqnuLz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-YV1FhFG+pbKFeDkM+a1aakbj060"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 214,
    "path": "../public/assets/mail-C8bqnuLz.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/map-oo8kX6PF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-nZNwvfpWywk84cLWSsqwjuAy4uw"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 426,
    "path": "../public/assets/map-oo8kX6PF.js"
  },
  "/assets/message-square-BfNu7z54.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b5-PWPmD75sjH8UTnRYD0++33KJS+Y"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 437,
    "path": "../public/assets/message-square-BfNu7z54.js"
  },
  "/assets/leaflet-src-HI4rAsJ5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-3DBNq9TgGdivECN7MpuMxpY7t1k"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-HI4rAsJ5.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:52:14.235Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/index-SnS3Bgg3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d530a-4v4uemdnduUAPaIOLshY9q3ZXIA"',
    "mtime": "2026-08-16T21:52:14.254Z",
    "size": 873226,
    "path": "../public/assets/index-SnS3Bgg3.js"
  },
  "/assets/plus-zgnX9Tbp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-09n5VSRPOLW6/fjiNlFnbMwymds"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 154,
    "path": "../public/assets/plus-zgnX9Tbp.js"
  },
  "/assets/PostCard-BAxoxK9H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"88b-dJ4yCu+XCT/UGiu5LM3Ke4pUoE0"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 2187,
    "path": "../public/assets/PostCard-BAxoxK9H.js"
  },
  "/assets/PostEditor-7M1DTyrs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5030-8clSgD2e0PKCt73ytwxkhQCwZBc"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 20528,
    "path": "../public/assets/PostEditor-7M1DTyrs.js"
  },
  "/assets/refresh-cw-B0QyS8k-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-xjFulFmk1C31BNBLkhZdMcMATNQ"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-B0QyS8k-.js"
  },
  "/assets/route-CEdJWAWK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-7Q45ZcfalE+HDMfMmSZn1brPPgU"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 95,
    "path": "../public/assets/route-CEdJWAWK.js"
  },
  "/assets/share-2-pzMc_5Tx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"161-eGJI3umEj+BZBmgm5lD2yQ7O6GQ"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 353,
    "path": "../public/assets/share-2-pzMc_5Tx.js"
  },
  "/assets/sparkles-CZ4V6p1L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-vWdbi8YyC81owecCscaNua6H6LI"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 495,
    "path": "../public/assets/sparkles-CZ4V6p1L.js"
  },
  "/assets/star-DMO5BQUJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-WV+/6urpwWU2guU8T5/ydrhMM8o"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 473,
    "path": "../public/assets/star-DMO5BQUJ.js"
  },
  "/assets/trash-2-DnF5taxc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-1w+WYeOPrIjOvcyL9A13bSV6Yh8"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 329,
    "path": "../public/assets/trash-2-DnF5taxc.js"
  },
  "/assets/styles-fufiV_yo.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1ea9c-AdNNsJDmLoOwQFmBac9fQECr5F8"',
    "mtime": "2026-08-16T21:52:14.249Z",
    "size": 125596,
    "path": "../public/assets/styles-fufiV_yo.css"
  },
  "/assets/useBaseQuery-DPzjJi94.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-WoRDJJEr9acSFON3MFQe8SSNI6k"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-DPzjJi94.js"
  },
  "/assets/useMutation-eY5msNdx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-I66/tTwWWBbRIi1TK1VvpI5fED4"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 2210,
    "path": "../public/assets/useMutation-eY5msNdx.js"
  },
  "/assets/useQuery-CYR8zq5c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-Uhwo3mkZBwByCbCBxsxrVYLOLxU"',
    "mtime": "2026-08-16T21:52:14.253Z",
    "size": 100,
    "path": "../public/assets/useQuery-CYR8zq5c.js"
  },
  "/assets/users-CMF14-7R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-b/iPpRIopgI4Tm5FgKvdY5Ogp1k"',
    "mtime": "2026-08-16T21:52:14.252Z",
    "size": 307,
    "path": "../public/assets/users-CMF14-7R.js"
  },
  "/assets/useSuspenseQuery-C2SgsAWM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-fRXaCzEEsUhyYPVzEcofSZJHIQI"',
    "mtime": "2026-08-16T21:52:14.251Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-C2SgsAWM.js"
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
