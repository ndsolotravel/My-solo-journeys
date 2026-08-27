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
  "/assets/about-DrkSBl2d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-PJP8YRNi5kRnTTUWToub77YXs5Q"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 3398,
    "path": "../public/assets/about-DrkSBl2d.js"
  },
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/assets/account-3Ys36HEf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-x2ASbodw5DGNM2y+k6MBhZbvF6k"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 2068,
    "path": "../public/assets/account-3Ys36HEf.js"
  },
  "/assets/admin-BuDgLBXq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-dCUEhkeXVbHaTqXu6f/BNzUNn6k"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 2555,
    "path": "../public/assets/admin-BuDgLBXq.js"
  },
  "/assets/admin.comments-CvnmKgi5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-xxAA8NlLPTAMhwHaw0XUS4fYO5w"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-CvnmKgi5.js"
  },
  "/assets/admin.destinations-DHS_nY0q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-bKa3ryqvQEmCNkReMl9pvN/uwTk"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-DHS_nY0q.js"
  },
  "/assets/admin.categories-CrU29c2k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-uEEQNfbJppWt5UV0b+Cuo6Bbrw0"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-CrU29c2k.js"
  },
  "/assets/admin.gallery-_5GVf-do.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-n0uGoUziCQ0VkNe8I3UC2GgwPBk"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-_5GVf-do.js"
  },
  "/assets/admin.homepage-CoPbcFNC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-9WUAo4n4dXWfrhZMM8Y7l7+4GZo"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-CoPbcFNC.js"
  },
  "/assets/admin.index-DgEojQJF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-86sqr7AlP15FijULYTAV+upkPPw"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 4075,
    "path": "../public/assets/admin.index-DgEojQJF.js"
  },
  "/assets/admin.messages-B3waa7oW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-otpil/hkBrb4b2UoKxzpUprgwsM"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-B3waa7oW.js"
  },
  "/assets/admin.news-C-X6qA2n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-V8viSM0sDpu+ck7HaVlY6s9wG1s"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 34492,
    "path": "../public/assets/admin.news-C-X6qA2n.js"
  },
  "/assets/admin.posts.index-Cbnif2ab.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-kNChs6bK4JGB+Y31LyqrCSZfANk"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-Cbnif2ab.js"
  },
  "/assets/admin.analytics-YDLgmHRK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-q0eZWG89cuCgXdV0QRUJcoHCOHA"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-YDLgmHRK.js"
  },
  "/assets/admin.posts.new-BVnvvblY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-xRqCZzPJhfm3whYIyHola1FBMrw"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-BVnvvblY.js"
  },
  "/assets/admin.posts._id-HXTS0BWO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-Np2kTqX+rEMHzmgWPdhQ7fSB/Ag"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-HXTS0BWO.js"
  },
  "/assets/admin.public-message-CtugM5So.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-7YZJbEm3OTm39gKP1Ay609xgb1Q"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-CtugM5So.js"
  },
  "/assets/admin.settings-BVuRG5LA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3eb7-/SO69xok7z5l6bNs3OSu4MBE4X4"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 16055,
    "path": "../public/assets/admin.settings-BVuRG5LA.js"
  },
  "/assets/admin.subscribers-18Rv_8MB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-lc0Lpdl2JpI1yLm4z4YI4ERGNws"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-18Rv_8MB.js"
  },
  "/assets/AdSlot-BIz7iXGO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-u/8QurQF5Q5UE6nZZ1RPlN5rKyo"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-BIz7iXGO.js"
  },
  "/assets/alert-dialog-CMA8Kt40.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-C1LyrbZRmnHbf31N0PAQa0DRiy0"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-CMA8Kt40.js"
  },
  "/assets/arrow-left-D8BQ-mcp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-ERKB+EO2+ZCXH/X8yvGgGXatxvA"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 166,
    "path": "../public/assets/arrow-left-D8BQ-mcp.js"
  },
  "/assets/arrow-up-right-DoWzOEib.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-a1zcnaYscFoPaFDaDwUrgtu2pGQ"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-DoWzOEib.js"
  },
  "/assets/auth-DmzUwoT3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-T8xPdP6RThu/oYXXqMKN7im+sXQ"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 8188,
    "path": "../public/assets/auth-DmzUwoT3.js"
  },
  "/assets/blog-F5Xo7dEH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-OB7L54BUi0fuIbsnB1dqOZsLRGc"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 103,
    "path": "../public/assets/blog-F5Xo7dEH.js"
  },
  "/assets/blog.index-BxN_Ml9y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"288e-XT6gC5cgGVJUGb0CG9ukghlnkmo"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 10382,
    "path": "../public/assets/blog.index-BxN_Ml9y.js"
  },
  "/assets/blog._slug-DAM6QozO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7095-qJ9OfTe67Lx348b0KKKjClwkfqo"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 28821,
    "path": "../public/assets/blog._slug-DAM6QozO.js"
  },
  "/assets/blog._slug-DYtB-uvM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-IhY8bDjGLK+M2kTlvN+2RdxPLRM"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 572,
    "path": "../public/assets/blog._slug-DYtB-uvM.js"
  },
  "/assets/book-open-jznlxasI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-AqbmQvwsMEX8mUClOay4YMDrd8o"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 280,
    "path": "../public/assets/book-open-jznlxasI.js"
  },
  "/assets/calendar-gZOBY5Rq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-t2rSsPwSr/kzHGSSxMtmNIAuQLE"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 258,
    "path": "../public/assets/calendar-gZOBY5Rq.js"
  },
  "/assets/category._slug-5KtXQatE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-he1MpxCiTp3i5y4NduXSCoiBBdk"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 3842,
    "path": "../public/assets/category._slug-5KtXQatE.js"
  },
  "/assets/chart-column-hDACyWry.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-eqEiNvVWlHmoB0bhg9IAgJCMgr8"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 252,
    "path": "../public/assets/chart-column-hDACyWry.js"
  },
  "/assets/check-D1NSJF5p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-AuSIEaK/gvGdLN4BGquBzMPlTKo"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 125,
    "path": "../public/assets/check-D1NSJF5p.js"
  },
  "/assets/chevron-left-BQJlOkbJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-bVhdHpUG9oLPnYObS6NK68s59pY"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 131,
    "path": "../public/assets/chevron-left-BQJlOkbJ.js"
  },
  "/assets/chevron-right-DGHyC8s_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-VfNZXqwlD2w+VaGRL9aQ0VHldIM"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 131,
    "path": "../public/assets/chevron-right-DGHyC8s_.js"
  },
  "/assets/circle-check-oWZ8_mJ4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-NfYPv7rJ8ti4uS8MQDUYyAt4X4s"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 179,
    "path": "../public/assets/circle-check-oWZ8_mJ4.js"
  },
  "/assets/clock-Cn9YyqcQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-McEk0WMTa2jsPNR0gaLMeNouPhw"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 170,
    "path": "../public/assets/clock-Cn9YyqcQ.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-BjKVXpC1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-l7CuNBGtDKH4vCTFBOwsbvGHLLM"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 14845,
    "path": "../public/assets/contact-BjKVXpC1.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-0rv5klK8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-HJvTj3r2z5DQilNR+mqsuw7yQZs"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 103,
    "path": "../public/assets/destinations-0rv5klK8.js"
  },
  "/assets/destinations.index-5lFOuRM5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-IMTWfpLHOqVai3O058JRTHWznNc"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-5lFOuRM5.js"
  },
  "/assets/destinations._slug-BieOiVCZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-j7eN774tjjc2KDOuYqK5BoTL2gw"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-BieOiVCZ.js"
  },
  "/assets/destinations._slug-l9B3FjMS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-pUBln+j1TE3AGWZiOSKV2Db6Ddk"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-l9B3FjMS.js"
  },
  "/assets/DestinationsMap-Cf3-1cVH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-yb5BUj9kviJ7ATqOUopG42HHlnk"',
    "mtime": "2026-08-27T02:49:59.368Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-Cf3-1cVH.js"
  },
  "/assets/dialog-DQ82goiN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-GQqDD9mYlmS+C1VMJEXVdIw4RQY"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 1830,
    "path": "../public/assets/dialog-DQ82goiN.js"
  },
  "/assets/earth-BSW6FZRL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-63YDwtpXZx7YsLaMrFjxGhabTuA"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 394,
    "path": "../public/assets/earth-BSW6FZRL.js"
  },
  "/assets/external-link-DmoGBr-6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-8hLloIBlXudWZ6QHwo6kEvDV+5k"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 252,
    "path": "../public/assets/external-link-DmoGBr-6.js"
  },
  "/assets/eye-Bdbp1Y4n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-9K3j6LYYLLnnzccKisEL7Xsm2tM"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 257,
    "path": "../public/assets/eye-Bdbp1Y4n.js"
  },
  "/assets/flame-CPMu37Lb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-p7PylgODATa8dpC7SOy8mMogGaA"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 200,
    "path": "../public/assets/flame-CPMu37Lb.js"
  },
  "/assets/folder-tree-CXnvjEB_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-zPPSwDrVD8du+dKpZSKtcAFTjTo"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 480,
    "path": "../public/assets/folder-tree-CXnvjEB_.js"
  },
  "/assets/gallery-Crj0Grt_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-dnPq+ieSFzrf/rUAXmThWeo/hkY"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 6285,
    "path": "../public/assets/gallery-Crj0Grt_.js"
  },
  "/assets/house-CAsoYvJV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-/i//jmU2JEXDYtM10Sbc93vV6g0"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 282,
    "path": "../public/assets/house-CAsoYvJV.js"
  },
  "/assets/geocoding.functions-DJM8OPfh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-QojmX89hkH3pLdjwCe7a7uf1AQE"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-DJM8OPfh.js"
  },
  "/assets/image-CyttnbpD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-Y/S57XdKGHnvvV+41ZlBHHZa2mI"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 270,
    "path": "../public/assets/image-CyttnbpD.js"
  },
  "/assets/key-round-DS1kkePv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-EMWyhjsxsHvPSDfQ2FCtwWHlz88"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 356,
    "path": "../public/assets/key-round-DS1kkePv.js"
  },
  "/assets/layers-CG7MX7QI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-WM2NeGYq5Nko72XN3CsBweu82v0"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 422,
    "path": "../public/assets/layers-CG7MX7QI.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-BheG8dS4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-6GtMREnahgmY9x0j4n8bKnk3EIU"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 290228,
    "path": "../public/assets/index-BheG8dS4.js"
  },
  "/assets/index-vTg4Isx_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-bwgswOcMvlGoN2EYvIbVrZq7PkU"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 172647,
    "path": "../public/assets/index-vTg4Isx_.js"
  },
  "/assets/list-g2xjoUSF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-4BwMNPDpKUjNWUUCaIOMUY8KOOg"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 303,
    "path": "../public/assets/list-g2xjoUSF.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-C5zWvDok.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-jDx+cZLIxshSHpAAVWxBIBpBqX8"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 914,
    "path": "../public/assets/maximize-2-C5zWvDok.js"
  },
  "/assets/leaflet-src-D9S_uPFa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-5h3uAYwndsLYEwVkQ4zbG4/gDKY"',
    "mtime": "2026-08-27T02:49:59.368Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-D9S_uPFa.js"
  },
  "/assets/message-square-NSIWL7zW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-0aYIdzzlTUc9FZlgl405A6/8UzA"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 234,
    "path": "../public/assets/message-square-NSIWL7zW.js"
  },
  "/assets/navigation-C3QcehSn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-r9Xj+pBqAgjD3RoAoW4B+oKBbUY"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 149,
    "path": "../public/assets/navigation-C3QcehSn.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T02:49:59.344Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-B_KkDU25.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-VyWAnk6py2hY9aX2/K4VEsXgJIA"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 974,
    "path": "../public/assets/news._slug-B_KkDU25.js"
  },
  "/assets/news._slug-DXjdggkv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-FAJ7SbQK/zIaSh6hiGOjxAfJRJw"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 4523,
    "path": "../public/assets/news._slug-DXjdggkv.js"
  },
  "/assets/index-UPrX-Ev1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8191-XQvkKK4kat7+8qduv4+2ofF65V4"',
    "mtime": "2026-08-27T02:49:59.368Z",
    "size": 950673,
    "path": "../public/assets/index-UPrX-Ev1.js"
  },
  "/assets/PageBreadcrumbs-BPEwIQ6F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-bRnBPgstgtbO56lXcInIriSPHdA"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-BPEwIQ6F.js"
  },
  "/assets/pencil-CfM6eWKG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-ECe9rQWZSprmKlWk7JsvoyL7uFo"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 277,
    "path": "../public/assets/pencil-CfM6eWKG.js"
  },
  "/assets/plus-7un2J5Xb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-JgbfqxQSXzkHG/YTApURMdZsL20"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 154,
    "path": "../public/assets/plus-7un2J5Xb.js"
  },
  "/assets/PostCard-C1RIo5BG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"da6-gTwPBkXPvNZags2pmIOZMCyCIkU"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 3494,
    "path": "../public/assets/PostCard-C1RIo5BG.js"
  },
  "/assets/PostEditor-DdGqBZVI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b133-Lh0NAV6wo0fUkozra5smbcUZJCs"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 45363,
    "path": "../public/assets/PostEditor-DdGqBZVI.js"
  },
  "/assets/radio-CPlrCNlo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-lmLux9r50OYk7MqoWpLKdK5npGs"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 375,
    "path": "../public/assets/radio-CPlrCNlo.js"
  },
  "/assets/refresh-cw-BNPobYHj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-8b463es8CJJVx7OTunn7bv8AyJk"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-BNPobYHj.js"
  },
  "/assets/route-DFwI_xZh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-I1rgPhl44Mk1fyNbL6m2W2D9N5c"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 95,
    "path": "../public/assets/route-DFwI_xZh.js"
  },
  "/assets/save-CEjcwQkZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-iUSU0AAsgERqQEAqH+HVD6I7D1Q"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 328,
    "path": "../public/assets/save-CEjcwQkZ.js"
  },
  "/assets/settings-DYiqcfvD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-TipWp3VSNil8oGz/sMg7kXWZQZc"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 488,
    "path": "../public/assets/settings-DYiqcfvD.js"
  },
  "/assets/share-2-CxOP1N8t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-RToGx66CDWQE6VdOmQ5uwzJOvu0"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 358,
    "path": "../public/assets/share-2-CxOP1N8t.js"
  },
  "/assets/shield-check-C7GnW56t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-vVtFvGHJLRopNVfUzvO1+ITf2Ss"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 321,
    "path": "../public/assets/shield-check-C7GnW56t.js"
  },
  "/assets/shield-D_nr4a_P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-Fn1RR21M/d19ZbVdEuYjU1ltwfE"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 273,
    "path": "../public/assets/shield-D_nr4a_P.js"
  },
  "/assets/star-Y-fuSn5H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-XDtNrQV3QWH/ILzyany+BxTrjd8"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 473,
    "path": "../public/assets/star-Y-fuSn5H.js"
  },
  "/assets/topics._slug-jt2ZEOfg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-UM91yozwpBG5zSDu3rLEIXNrGh0"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-jt2ZEOfg.js"
  },
  "/assets/trash-2-DRhWZO7u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-nMa10nA2h3Vwuf7ukqYRr9Fvmx8"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 329,
    "path": "../public/assets/trash-2-DRhWZO7u.js"
  },
  "/assets/styles-C0dABRQT.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2a106-2/DYlva+h9VXWpj1M3L8N+TljZk"',
    "mtime": "2026-08-27T02:49:59.363Z",
    "size": 172294,
    "path": "../public/assets/styles-C0dABRQT.css"
  },
  "/assets/triangle-alert-C8ceisru.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-WYAjty7U+wSNL4RvxmXic79vKxM"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-C8ceisru.js"
  },
  "/assets/upload-DBKtREjE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-psHPDx+Blti/I6Nax2b8T8m+75Q"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 231,
    "path": "../public/assets/upload-DBKtREjE.js"
  },
  "/assets/useMutation-DvZ-dat3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-DqIgSpPdDTMGmQGimGH8a0eUFBg"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 2211,
    "path": "../public/assets/useMutation-DvZ-dat3.js"
  },
  "/assets/users-CPQ7yEkh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-fknx7648r2Ksgio79gBNablyN98"',
    "mtime": "2026-08-27T02:49:59.366Z",
    "size": 307,
    "path": "../public/assets/users-CPQ7yEkh.js"
  },
  "/assets/utils-Bg-7ppBS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-Txzql4gwTa5GF/6jzUEFmxmazUo"',
    "mtime": "2026-08-27T02:49:59.365Z",
    "size": 59982,
    "path": "../public/assets/utils-Bg-7ppBS.js"
  },
  "/assets/useSuspenseQuery-9sUS4yF4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-68hpV4MQn2bp8ZqBAjy4jw4+0pw"',
    "mtime": "2026-08-27T02:49:59.364Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-9sUS4yF4.js"
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
