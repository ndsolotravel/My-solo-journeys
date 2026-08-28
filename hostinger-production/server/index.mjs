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
  "/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/author-hussain.jpg"
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
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/images/author-hussain-original.jpg": {
    "type": "image/jpeg",
    "etag": '"23253-0EbOe3DBgnE0F6k8q3PJLw6Gr8g"',
    "mtime": "2026-08-27T03:07:35.496Z",
    "size": 143955,
    "path": "../public/images/author-hussain-original.jpg"
  },
  "/images/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/images/author-hussain.jpg"
  },
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
  },
  "/assets/about.functions-CDLNwm0B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32f2-9bMT84V3cR/bssN38fFR2g1X7NQ"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 13042,
    "path": "../public/assets/about.functions-CDLNwm0B.js"
  },
  "/assets/account-Awgv_7qH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-6wO+0O7kwLzeDEbbzmft1S6KShw"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 2068,
    "path": "../public/assets/account-Awgv_7qH.js"
  },
  "/assets/admin-TCVd8J77.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9e2-O8BOdfNfhlLiSkr5JWpfPkGTiXA"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 2530,
    "path": "../public/assets/admin-TCVd8J77.js"
  },
  "/assets/admin.about-D1LwFjn5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11353-Yc2CHwpdgYGQF3TleeG6dlHkVBU"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 70483,
    "path": "../public/assets/admin.about-D1LwFjn5.js"
  },
  "/assets/admin.categories-HV6khhdi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5918-QtWuXFHnPjvhVLah5p4y/s9hd8Y"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 22808,
    "path": "../public/assets/admin.categories-HV6khhdi.js"
  },
  "/assets/admin.comments-Bm2rbPe2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-NjmSkAA0woQE4eMvk5oLm89CYqY"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-Bm2rbPe2.js"
  },
  "/assets/admin.destinations-BI2434uV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26ba-bvuJOpDypfObpblbQfu9FTZ9Q1Q"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 9914,
    "path": "../public/assets/admin.destinations-BI2434uV.js"
  },
  "/assets/admin.gallery-Cgi6nWXk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5691-VIS4UVlWrJIv+LMQ1Ual/846fQA"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 22161,
    "path": "../public/assets/admin.gallery-Cgi6nWXk.js"
  },
  "/assets/admin.index-Dg8EtTq6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-xarfD2GzuOLzpjM7EX5RcNpPOEI"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 4074,
    "path": "../public/assets/admin.index-Dg8EtTq6.js"
  },
  "/assets/admin.homepage-BN8A1v6i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6b1f-il2oEnaVbfwVjQFNI0FtRI6Nhbc"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 27423,
    "path": "../public/assets/admin.homepage-BN8A1v6i.js"
  },
  "/assets/admin.legal-YRHod25K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397f-BHsi6xG4DonPPiLdqqC2+I3kVtg"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 14719,
    "path": "../public/assets/admin.legal-YRHod25K.js"
  },
  "/assets/admin.analytics-DoxvMkkt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64266-vwlEP6hwC938R8uri9FKlxpSqs0"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 410214,
    "path": "../public/assets/admin.analytics-DoxvMkkt.js"
  },
  "/assets/admin.messages-CWrtpJyS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a9-6oWEFbICpiv6x4mo7eDv2d/LnUo"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 4777,
    "path": "../public/assets/admin.messages-CWrtpJyS.js"
  },
  "/assets/admin.news-BY16d-cN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86b5-xa5E3ObS1HBWx4mh2HFZmZhtYr8"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 34485,
    "path": "../public/assets/admin.news-BY16d-cN.js"
  },
  "/assets/admin.posts.index-ChDzahwn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a3-jmIL8FZT/2geLi0ZFv6kUGypNOM"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 9635,
    "path": "../public/assets/admin.posts.index-ChDzahwn.js"
  },
  "/assets/about-UgHFeILQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91527-LyCjPzlM0EikvSgGWNIy8sZvc48"',
    "mtime": "2026-08-28T21:01:42.509Z",
    "size": 595239,
    "path": "../public/assets/about-UgHFeILQ.js"
  },
  "/assets/admin.posts.new-RakUHSxZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2fc-8CHzUfowpZVv6Y8UzUHvfMZNsZQ"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 764,
    "path": "../public/assets/admin.posts.new-RakUHSxZ.js"
  },
  "/assets/admin.posts._id-Bc2aNgNS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"431-lbvv0KCLjo1xxFoGRhn0bVa6rEI"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 1073,
    "path": "../public/assets/admin.posts._id-Bc2aNgNS.js"
  },
  "/assets/admin.public-message-HTqdyEiN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4cad-6Gfh6VGwjrTciAmZ3I8tLFAup20"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 19629,
    "path": "../public/assets/admin.public-message-HTqdyEiN.js"
  },
  "/assets/admin.settings-C4-JBgEM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dd4-2vvQhzYs1YQ6KOf3MSlsT16P8r0"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 15828,
    "path": "../public/assets/admin.settings-C4-JBgEM.js"
  },
  "/assets/admin.subscribers-BHWiwuce.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2baf-lHYjd/3obOFydOxrjl0VBkQsNG4"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 11183,
    "path": "../public/assets/admin.subscribers-BHWiwuce.js"
  },
  "/assets/AdSlot-Dn7OG7tY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-B8PhjV+vxbSiKJZS6X5uQVSlUa8"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-Dn7OG7tY.js"
  },
  "/assets/alert-dialog-j57-bK_5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-3X4xEwfK45iua+Pge6CN93KdnUI"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-j57-bK_5.js"
  },
  "/assets/arrow-left-DY1_cLVk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-3gMpzQ3tm/N1F3tpiakiqEmTi2w"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 166,
    "path": "../public/assets/arrow-left-DY1_cLVk.js"
  },
  "/assets/arrow-up-right-Cnmu4zkY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-WgX/dpesdR+OV2kRwRmQnuNoltk"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-Cnmu4zkY.js"
  },
  "/assets/auth-DB8hiCm4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-n9FcnDErnHCxaHRbVTx3JqihwQY"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 7644,
    "path": "../public/assets/auth-DB8hiCm4.js"
  },
  "/assets/blog-Blp98Pdh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-AXfYuiTYgNqhxeelnrp/SKNjWEw"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 103,
    "path": "../public/assets/blog-Blp98Pdh.js"
  },
  "/assets/blog.index-K0Axymvm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2791-zzaWcHDHtZXDyGiZYFLLJR+C2gc"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 10129,
    "path": "../public/assets/blog.index-K0Axymvm.js"
  },
  "/assets/blog._slug-BqQ_NHvJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cdc-9PU+yZodqoBUNZrV+P8QLRhvhng"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 27868,
    "path": "../public/assets/blog._slug-BqQ_NHvJ.js"
  },
  "/assets/blog._slug-Dau1E3y4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-hh9gt529u48f2obcUYkISEhk4Jc"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 572,
    "path": "../public/assets/blog._slug-Dau1E3y4.js"
  },
  "/assets/calendar-CG69_w34.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-h2xvs8RzMznrbOr0PsOdUmDYx3M"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 258,
    "path": "../public/assets/calendar-CG69_w34.js"
  },
  "/assets/category._slug-B43HpRi2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f10-NhU+S1GPpZH0+M6WVp0XTcx4Vg4"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 3856,
    "path": "../public/assets/category._slug-B43HpRi2.js"
  },
  "/assets/book-open-DWci1pWY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-H/pA9cyMj3QKEiryuravjzgjjOY"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 280,
    "path": "../public/assets/book-open-DWci1pWY.js"
  },
  "/assets/chart-column-D2Y1fwZh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-kLW7dXhkRVQG4lkw+ei8GMESVDk"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 252,
    "path": "../public/assets/chart-column-D2Y1fwZh.js"
  },
  "/assets/check-16UJEFeI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-o12O4XRWrmvwZcm+e4qB5AeP8gs"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 125,
    "path": "../public/assets/check-16UJEFeI.js"
  },
  "/assets/chevron-down-bYCOm2bT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-5PXzMAX1B75pG02PWH4dkOe6XPE"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 129,
    "path": "../public/assets/chevron-down-bYCOm2bT.js"
  },
  "/assets/chevron-left-B0Gy_Yj6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-t6VB6Kj98dHNs55VZYqqfwVRPXs"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 131,
    "path": "../public/assets/chevron-left-B0Gy_Yj6.js"
  },
  "/assets/chevron-right-CWUELjHs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-SFGChakWlsYgh71BINXGUCHHqjg"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 131,
    "path": "../public/assets/chevron-right-CWUELjHs.js"
  },
  "/assets/circle-check-C22fguEm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-Z+drim0jkdXT2s7AdMpVdbmKmsc"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 179,
    "path": "../public/assets/circle-check-C22fguEm.js"
  },
  "/assets/clock-PFu-FdVZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-9fsKXHPPhHTCE3CEF3y6UI8sp5Y"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 170,
    "path": "../public/assets/clock-PFu-FdVZ.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-nL7m-9-_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a0a-bBJaODlOBBhjZo8GMHq+A1cqCz4"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 14858,
    "path": "../public/assets/contact-nL7m-9-_.js"
  },
  "/assets/destinations-8KEB9TyV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-kbsRc+qSgDfx1p2sKKIuEbXUlXI"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 103,
    "path": "../public/assets/destinations-8KEB9TyV.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations.index-DR4NLXRr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1437-1zpQnN5p5ByVP6qtYTUwBDdk8NU"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 5175,
    "path": "../public/assets/destinations.index-DR4NLXRr.js"
  },
  "/assets/destinations._slug-CGw4080e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-xBkWO8+lknP5diGj7UJ/2xIVAIo"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-CGw4080e.js"
  },
  "/assets/DestinationsMap-BzAxmzVn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f65-PSJesPUOUom5bZ7oT57tYExsBi8"',
    "mtime": "2026-08-28T21:01:42.509Z",
    "size": 3941,
    "path": "../public/assets/DestinationsMap-BzAxmzVn.js"
  },
  "/assets/destinations._slug-klqgchf2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cea-McuJ1ybY63GYSWnOFfZCLdFq2vc"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 7402,
    "path": "../public/assets/destinations._slug-klqgchf2.js"
  },
  "/assets/dialog-DBweHaGO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-WDee8Ae6tTCp/iY27Ygo4LW47Mw"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 1830,
    "path": "../public/assets/dialog-DBweHaGO.js"
  },
  "/assets/disclaimer-CYy2m1P_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706-66OQQK4IlO9oJWfqRPVLWuEM+bA"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 1798,
    "path": "../public/assets/disclaimer-CYy2m1P_.js"
  },
  "/assets/earth-Cop7iUAn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-B991Z9OAF78xsd8bm9w9aqDQecg"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 394,
    "path": "../public/assets/earth-Cop7iUAn.js"
  },
  "/assets/external-link-Dv4QCcHL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-EHcLE/HBdrYtXBbJtRXdtUSzMJw"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 252,
    "path": "../public/assets/external-link-Dv4QCcHL.js"
  },
  "/assets/eye-DVGwU-yL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-to01zqsbk5n0PtGaT6KF84IopG0"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 257,
    "path": "../public/assets/eye-DVGwU-yL.js"
  },
  "/assets/eye-off-C9qJHJOK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-eVJ2yXp16BZmgA9hP3LZpDc9hNM"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 431,
    "path": "../public/assets/eye-off-C9qJHJOK.js"
  },
  "/assets/flame-DNjxLjKH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-Vpm1B01QUUl1m9KF8u5dLJX0KeA"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 200,
    "path": "../public/assets/flame-DNjxLjKH.js"
  },
  "/assets/folder-tree--g7kCu_1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-sl8aflc90clumGBXoTfr8XfH1jc"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 480,
    "path": "../public/assets/folder-tree--g7kCu_1.js"
  },
  "/assets/gallery-CfCVw2f1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"189a-39k61AdQjWDE9bV2L6Euvf0KPSw"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 6298,
    "path": "../public/assets/gallery-CfCVw2f1.js"
  },
  "/assets/geocoding.functions-Bd9KtVTB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-lM1QzVWkTymomgJU9+aonn+xL3M"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-Bd9KtVTB.js"
  },
  "/assets/house-B6xw1mMz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-LSm/n9OyEdecYONsejL6hVAdpmU"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 282,
    "path": "../public/assets/house-B6xw1mMz.js"
  },
  "/assets/image-CQIv6Q3h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-TKcA51Ejx+Y5g826a0L4c3fwms4"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 270,
    "path": "../public/assets/image-CQIv6Q3h.js"
  },
  "/assets/index-CFj0cIAe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29eea-RVIEYd2sxZCFhxWh1bLU+Zk1afI"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 171754,
    "path": "../public/assets/index-CFj0cIAe.js"
  },
  "/assets/key-round-DMnj8hZB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-Dm6oN9NTvMCx7WqvOoV9pQQwCCs"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 356,
    "path": "../public/assets/key-round-DMnj8hZB.js"
  },
  "/assets/layers-HADCvm3q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-ky+9TbNxK/GYZnSTt9g7MVHQ1wQ"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 422,
    "path": "../public/assets/layers-HADCvm3q.js"
  },
  "/assets/index-De46Jbi8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-cMVmU9gmMnblzh7lnkjJMvsIXeY"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 290228,
    "path": "../public/assets/index-De46Jbi8.js"
  },
  "/assets/layout-dashboard-CW-vJw9t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"160-KsRqXEULGbIrjqHeakbqzed0EEo"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 352,
    "path": "../public/assets/layout-dashboard-CW-vJw9t.js"
  },
  "/assets/index-CPHNaySo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f0208-+IsOEcyHRX/SnHARZrgbo9/mock"',
    "mtime": "2026-08-28T21:01:42.509Z",
    "size": 983560,
    "path": "../public/assets/index-CPHNaySo.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-28T21:01:42.504Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-DJIE7HLo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-KoWStzSPYOrZCLkJbxzjtJX3XSo"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 303,
    "path": "../public/assets/list-DJIE7HLo.js"
  },
  "/assets/list-ordered-D_4W-g0d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-VfkmN4tA8Hha6WI0lOs3zYOig4U"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 644,
    "path": "../public/assets/list-ordered-D_4W-g0d.js"
  },
  "/assets/leaflet-src-B7QY_xjk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-MW/lQRcAUwGstd47GhEbrid/h+I"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-B7QY_xjk.js"
  },
  "/assets/map-D-YYVK9N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-YFMOnwR1aybUNkFXBv5EnIlsq7A"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 724,
    "path": "../public/assets/map-D-YYVK9N.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-pRgFHwH1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-YpS/1cbHC36u1lswnrqZ3VpkqYE"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 914,
    "path": "../public/assets/maximize-2-pRgFHwH1.js"
  },
  "/assets/message-square-C0kL7HVY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-9QraDU6FjTZygseeG8Yx0aLtF40"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 234,
    "path": "../public/assets/message-square-C0kL7HVY.js"
  },
  "/assets/mountain-rE6dZB38.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"244-kdmvf9hyqBi/qBo/I1pQhPOnP64"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 580,
    "path": "../public/assets/mountain-rE6dZB38.js"
  },
  "/assets/navigation-D-GlnK3U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-FQqrYTIo0gVcUFlNbA1xniZf/5M"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 149,
    "path": "../public/assets/navigation-D-GlnK3U.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-28T21:01:42.487Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-4OMRI_8w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-MbhYnB8KhfF+LWPyVE4IwsPtejs"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 974,
    "path": "../public/assets/news._slug-4OMRI_8w.js"
  },
  "/assets/news._slug-CWp2du4G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-fPJgbRfjW63So0HDQYI3UFH1wr8"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 4524,
    "path": "../public/assets/news._slug-CWp2du4G.js"
  },
  "/assets/PageBreadcrumbs-BtxmO25S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-MUbzdZm8uk1zs8NCA0+RpLfv/C4"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-BtxmO25S.js"
  },
  "/assets/pen-line-fFCF-zZw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-kzBWv41TOc7gFVL325L742QJ6v8"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 1022,
    "path": "../public/assets/pen-line-fFCF-zZw.js"
  },
  "/assets/pencil-ovx9kGwe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-JuOVdeOQhdlTUjMU4CD+GtJyKGc"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 277,
    "path": "../public/assets/pencil-ovx9kGwe.js"
  },
  "/assets/plus-Bg-qQ9tm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-1ExpJC3k0qPupn9ayl5pl0pmB0c"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 154,
    "path": "../public/assets/plus-Bg-qQ9tm.js"
  },
  "/assets/PostCard-CAshQV8E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-BHCZRssZcML0Q9Ti7ZyA0OqVXAA"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 3935,
    "path": "../public/assets/PostCard-CAshQV8E.js"
  },
  "/assets/power-0MUUp3qi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-vA04dBLRwzAGGd0b2R5Hf3DkPTo"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 174,
    "path": "../public/assets/power-0MUUp3qi.js"
  },
  "/assets/PostEditor-DWpDFxBK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd01-gVJqoDunpiL4UXx2qKvnd0RtJUY"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 48385,
    "path": "../public/assets/PostEditor-DWpDFxBK.js"
  },
  "/assets/privacy-policy-Ciqjoej-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70a-ihDMWOIwcR3es598426otqe1DfU"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 1802,
    "path": "../public/assets/privacy-policy-Ciqjoej-.js"
  },
  "/assets/quote-bz21eTPN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-oPW+b03Kf8NBepxCPRaw6gc4oME"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 390,
    "path": "../public/assets/quote-bz21eTPN.js"
  },
  "/assets/radio-Dm092o9B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-PVmIK/SXo2NiU96g04gV/i8qNlU"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 375,
    "path": "../public/assets/radio-Dm092o9B.js"
  },
  "/assets/refresh-cw-DYS-BXSI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-JzLWDghX1W3+EpzsxNVX6Yq6T3Y"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-DYS-BXSI.js"
  },
  "/assets/rocket-CAJHckCd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3c7-aBpX/8rqxdlCjZYuPcN835If44w"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 967,
    "path": "../public/assets/rocket-CAJHckCd.js"
  },
  "/assets/rotate-ccw-BD_lZZ1A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-qQ58g65Dz6o7O89+UTCO6ZNDfDs"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-BD_lZZ1A.js"
  },
  "/assets/route-BuieUX1N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-/dFl6WRxkC3ODUczuIk0noqxur8"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 95,
    "path": "../public/assets/route-BuieUX1N.js"
  },
  "/assets/save-DPq7ue7h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-jK5RneFdyfz+VRXLGP3bxSbTPBs"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 328,
    "path": "../public/assets/save-DPq7ue7h.js"
  },
  "/assets/route-DQF_u5SK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-EwE+CTHuwMl23YuxQI/nSEz599g"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 543,
    "path": "../public/assets/route-DQF_u5SK.js"
  },
  "/assets/scale-VW6oWCH0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-6E/0MSTFRRqB7NuldxLJxejuwko"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 333,
    "path": "../public/assets/scale-VW6oWCH0.js"
  },
  "/assets/settings-smxQDhnO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-MtOwC8LMsxbXZ5wUswbaYqKwcNQ"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 488,
    "path": "../public/assets/settings-smxQDhnO.js"
  },
  "/assets/share-2-DE51TOqE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-GTMWcmrQ4iZWeMuS8W/w1PbVMgI"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 358,
    "path": "../public/assets/share-2-DE51TOqE.js"
  },
  "/assets/shield-alert-CZoWd84S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-4tsqohXPkVlTeUsh7Uis7RGpKR4"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 668,
    "path": "../public/assets/shield-alert-CZoWd84S.js"
  },
  "/assets/shield-check-UzfAPktU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-g9wAYWOCQjLOh7H7lKUFyTuv2f4"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 321,
    "path": "../public/assets/shield-check-UzfAPktU.js"
  },
  "/assets/shield-COanlvVH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-O7l9TVSeT/2ZrgGOaQLR51U+1Bk"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 273,
    "path": "../public/assets/shield-COanlvVH.js"
  },
  "/assets/sliders-horizontal-CuV_xS5f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-zFtNCjUsSjT+YEqyhpGfefyZ5kE"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-CuV_xS5f.js"
  },
  "/assets/star-CT7v581q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-jHbZmUt+XhlG379K0uMuxX2/1Vk"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 473,
    "path": "../public/assets/star-CT7v581q.js"
  },
  "/assets/styles-Chq4yXpw.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2bd69-LE4PlP2DZ62tpnzXcfoU3/Dolok"',
    "mtime": "2026-08-28T21:01:42.504Z",
    "size": 179561,
    "path": "../public/assets/styles-Chq4yXpw.css"
  },
  "/assets/topics._slug-BQi0ONU1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-aRn1FJ0VcwzH1Wfg67NI3FiSJsc"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 2165,
    "path": "../public/assets/topics._slug-BQi0ONU1.js"
  },
  "/assets/TranslatedMarkdown-_i3svfF1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-egkzBZ7jWM0khkAcX8voW1kryrg"',
    "mtime": "2026-08-28T21:01:42.505Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-_i3svfF1.js"
  },
  "/assets/trash-2-C6SuhlwV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-MynXc4zM5ryEFDTvRD0muYI9H/I"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 329,
    "path": "../public/assets/trash-2-C6SuhlwV.js"
  },
  "/assets/trending-up-CLC_Qe9s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-BWCmJRjA2/MphyY/KU2YgrUnDwI"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 932,
    "path": "../public/assets/trending-up-CLC_Qe9s.js"
  },
  "/assets/triangle-alert-B0LO-vep.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-PfWZUUVHV0d/XeTfOViRlF+bWxU"',
    "mtime": "2026-08-28T21:01:42.507Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-B0LO-vep.js"
  },
  "/assets/upload-B2UgIH-k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-QQbeBndvOQHikMGkXVJRf00H4ag"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 231,
    "path": "../public/assets/upload-B2UgIH-k.js"
  },
  "/assets/useMutation-DVt1ToF9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-hVXpIjVPrjPKGRe5khrq8ubethw"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 2211,
    "path": "../public/assets/useMutation-DVt1ToF9.js"
  },
  "/assets/user-plus-vvDCaKWu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-i8vWZ1X0TZkHufkjRgUAhAPy6wE"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 311,
    "path": "../public/assets/user-plus-vvDCaKWu.js"
  },
  "/assets/user-x-8WFxNNLn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"412-1VQqAbbetP/OCjBStple8yzPl10"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 1042,
    "path": "../public/assets/user-x-8WFxNNLn.js"
  },
  "/assets/users-DynOQ20N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-zuvG+oeIjslYjHv0h51KAcLZMWg"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 307,
    "path": "../public/assets/users-DynOQ20N.js"
  },
  "/assets/useSuspenseQuery-CHdWhXR4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-vhwfg7gAjeN8C9MarLtHyCuJnNU"',
    "mtime": "2026-08-28T21:01:42.506Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-CHdWhXR4.js"
  },
  "/assets/utils-CTP9s2qc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-B99K4EM+kTLPEYbxTSLZ0G1ZjEc"',
    "mtime": "2026-08-28T21:01:42.508Z",
    "size": 59982,
    "path": "../public/assets/utils-CTP9s2qc.js"
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
