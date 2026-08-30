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
  "/assets/about.functions-CgRoxMbV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31f9-JadttAB2NefWNu15gFmOoFTYpfs"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 12793,
    "path": "../public/assets/about.functions-CgRoxMbV.js"
  },
  "/assets/admin-D5CoS2jV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9ff-2oKidn4ORqj3zga0vCxoMJ1a1pc"',
    "mtime": "2026-08-30T19:26:48.967Z",
    "size": 2559,
    "path": "../public/assets/admin-D5CoS2jV.js"
  },
  "/assets/account-B0BeNLnh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"80f-Vtdc1Y3aWbe5plWT+o3sNS05e24"',
    "mtime": "2026-08-30T19:26:48.967Z",
    "size": 2063,
    "path": "../public/assets/account-B0BeNLnh.js"
  },
  "/assets/admin.about-BKCAQoJU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1139e-94gxsgkdG7Pr204WJe1JuXvHnww"',
    "mtime": "2026-08-30T19:26:48.981Z",
    "size": 70558,
    "path": "../public/assets/admin.about-BKCAQoJU.js"
  },
  "/assets/admin.categories-q0Puy-TQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5de0-WOxt0SY1kl/aNlC47LIfeXugi7g"',
    "mtime": "2026-08-30T19:26:48.981Z",
    "size": 24032,
    "path": "../public/assets/admin.categories-q0Puy-TQ.js"
  },
  "/assets/admin.comments-6SqmTDQR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"94b-aO48vhyqaAyGFjGyRzm8JjvI6Pg"',
    "mtime": "2026-08-30T19:26:48.981Z",
    "size": 2379,
    "path": "../public/assets/admin.comments-6SqmTDQR.js"
  },
  "/assets/admin.contact-7e__HoSR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cb-bpOQd5UQGG/OcjqLDUuqdo6PKjk"',
    "mtime": "2026-08-30T19:26:48.981Z",
    "size": 1739,
    "path": "../public/assets/admin.contact-7e__HoSR.js"
  },
  "/assets/admin.analytics-DHmm3sEZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"642c4-n6LxkpNA3fuJ2/UJdELCf41g/+0"',
    "mtime": "2026-08-30T19:26:48.981Z",
    "size": 410308,
    "path": "../public/assets/admin.analytics-DHmm3sEZ.js"
  },
  "/assets/admin.destinations-CgQAgyKS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f38-FHOalNYL4Tgs2rE0KY3JEgKM/hU"',
    "mtime": "2026-08-30T19:26:48.980Z",
    "size": 20280,
    "path": "../public/assets/admin.destinations-CgQAgyKS.js"
  },
  "/assets/admin.gallery-Ca0VoZY_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5d23-k2Ra18GkI26KMnk5/+uls7xY5o0"',
    "mtime": "2026-08-30T19:26:48.980Z",
    "size": 23843,
    "path": "../public/assets/admin.gallery-Ca0VoZY_.js"
  },
  "/assets/admin.index-B68QS8PO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-2Kld+gwLiGsZLjxzjmW/R5zNKcQ"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 4074,
    "path": "../public/assets/admin.index-B68QS8PO.js"
  },
  "/assets/admin.homepage-Cp4o0K2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d924-fPEElmrmK7nH9vljLAL5IykK7EI"',
    "mtime": "2026-08-30T19:26:48.980Z",
    "size": 55588,
    "path": "../public/assets/admin.homepage-Cp4o0K2U.js"
  },
  "/assets/admin.legal-D6_FIYQ-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39e8-Qn4Pa5puIZFYZNcIhoEGUNVaOyU"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 14824,
    "path": "../public/assets/admin.legal-D6_FIYQ-.js"
  },
  "/assets/admin.messages-CJR1wbt1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137a-q/IDcVWlxvraLCm/rsbI8JfBTD8"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 4986,
    "path": "../public/assets/admin.messages-CJR1wbt1.js"
  },
  "/assets/admin.news-Cd6fjvJd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f0c-VQnniiqO+7CMAT5ZPoOlzBz6dU8"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 36620,
    "path": "../public/assets/admin.news-Cd6fjvJd.js"
  },
  "/assets/about-D6TBpVSg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9121a-wm0ezkRezrDu9ydG9mIOJigSK0E"',
    "mtime": "2026-08-30T19:26:48.986Z",
    "size": 594458,
    "path": "../public/assets/about-D6TBpVSg.js"
  },
  "/assets/admin.posts.new-uVUX3FXs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38d-2ZUfI9+PHRMdj6sdp5wSiiiJwco"',
    "mtime": "2026-08-30T19:26:48.983Z",
    "size": 909,
    "path": "../public/assets/admin.posts.new-uVUX3FXs.js"
  },
  "/assets/admin.posts.index-sXcVLRwE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ec2-Hcsq7B69Zv4ffsv4bxL5q+pMGYc"',
    "mtime": "2026-08-30T19:26:48.981Z",
    "size": 11970,
    "path": "../public/assets/admin.posts.index-sXcVLRwE.js"
  },
  "/assets/admin.posts._id-0M-uJxXA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4b7-xsJQ+zagjuUXFdz0EMAyc2SGlZU"',
    "mtime": "2026-08-30T19:26:48.983Z",
    "size": 1207,
    "path": "../public/assets/admin.posts._id-0M-uJxXA.js"
  },
  "/assets/admin.subscribers-C89mwYqy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c31-0XsDDfY1yPQznxI+rZHYlYIPC5E"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 11313,
    "path": "../public/assets/admin.subscribers-C89mwYqy.js"
  },
  "/assets/admin.public-message-BMHnnY5Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"52fc-Bu18UC0qDgMB+sg02O2iwK722IE"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 21244,
    "path": "../public/assets/admin.public-message-BMHnnY5Z.js"
  },
  "/assets/admin.settings-C9synE0s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"434d-AXrjvOnxcoQEBJOUcC7dzVlP3ng"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 17229,
    "path": "../public/assets/admin.settings-C9synE0s.js"
  },
  "/assets/AdSlot-C4UTpZ8G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-iuOLjh8M9hx2CvZuC+xzgwKRKag"',
    "mtime": "2026-08-30T19:26:48.963Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-C4UTpZ8G.js"
  },
  "/assets/alert-dialog-CYp9cgkK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-1Heb4B5ckThZsjneSHfRs5o8LSo"',
    "mtime": "2026-08-30T19:26:48.979Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-CYp9cgkK.js"
  },
  "/assets/arrow-left-D9T91Bg6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-ei7wQn/N/oTIVkTz+AUBE9i5rU4"',
    "mtime": "2026-08-30T19:26:48.967Z",
    "size": 166,
    "path": "../public/assets/arrow-left-D9T91Bg6.js"
  },
  "/assets/arrow-up-right-CMRwlL7o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-/x2UodePu3c8zhVM3sh21KjK0Gc"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-CMRwlL7o.js"
  },
  "/assets/auth-BpeDC4c-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-/JFc8Lx9oQ67PAzxJGbZXCwWwBE"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 7644,
    "path": "../public/assets/auth-BpeDC4c-.js"
  },
  "/assets/blog-2pgnu8vM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-OL86e/rUDVFKl9o8dSmHsgarAjk"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 103,
    "path": "../public/assets/blog-2pgnu8vM.js"
  },
  "/assets/blog._slug-CLGum3k9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf3-oqePc3aH8RXhItsaB/a2rQzBS1g"',
    "mtime": "2026-08-30T19:26:48.967Z",
    "size": 27635,
    "path": "../public/assets/blog._slug-CLGum3k9.js"
  },
  "/assets/blog._slug-fyA8jaKp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-RC27PsIeOdSwZ7UvzkSTretaV74"',
    "mtime": "2026-08-30T19:26:48.965Z",
    "size": 572,
    "path": "../public/assets/blog._slug-fyA8jaKp.js"
  },
  "/assets/blog.index-BnB-7KtB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27ee-2LQyPVTKGbv4DbuLq3dbzrocSdI"',
    "mtime": "2026-08-30T19:26:48.964Z",
    "size": 10222,
    "path": "../public/assets/blog.index-BnB-7KtB.js"
  },
  "/assets/calendar-BEeied9m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-+PAPW6xqnc6CyDGMzujq4FWxYR8"',
    "mtime": "2026-08-30T19:26:48.975Z",
    "size": 258,
    "path": "../public/assets/calendar-BEeied9m.js"
  },
  "/assets/book-open-BaE-vwyS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-E/XbXE+q3aXxVrQr2l/HB0okhSQ"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 280,
    "path": "../public/assets/book-open-BaE-vwyS.js"
  },
  "/assets/category._slug-CUKUmwFb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-H2wRPiAc04oW/VQ6kX0vMNkx07o"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 3842,
    "path": "../public/assets/category._slug-CUKUmwFb.js"
  },
  "/assets/chart-column-gs89SAlV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-QH1uxCseWX3ALhe+1lxnQpLRK0A"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 252,
    "path": "../public/assets/chart-column-gs89SAlV.js"
  },
  "/assets/chevron-down-C_5WLB4c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-1utLQhWAy8Jc8IiVhtNEZrIo6pw"',
    "mtime": "2026-08-30T19:26:48.975Z",
    "size": 129,
    "path": "../public/assets/chevron-down-C_5WLB4c.js"
  },
  "/assets/check-CcUJ7Kex.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-N+dXgKoPxeo5DvmBVALSWnppvzs"',
    "mtime": "2026-08-30T19:26:48.975Z",
    "size": 125,
    "path": "../public/assets/check-CcUJ7Kex.js"
  },
  "/assets/chevron-left-NsQfsELg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-a0v88QXmgOxqCYup56NbMlpu7B8"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 131,
    "path": "../public/assets/chevron-left-NsQfsELg.js"
  },
  "/assets/chevron-right-DlN9kwMG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-l/jLX71owjYhvqm6jgoCnK0FKtg"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 131,
    "path": "../public/assets/chevron-right-DlN9kwMG.js"
  },
  "/assets/circle-check-BTM8Z9zM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-GJzWggzahr17WJy2aHcBUXIUFaM"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 179,
    "path": "../public/assets/circle-check-BTM8Z9zM.js"
  },
  "/assets/circle-x-CfeLhkbS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0-IKPIUdFbduILo1ME4eWm55ggz1c"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 208,
    "path": "../public/assets/circle-x-CfeLhkbS.js"
  },
  "/assets/clock-BN4XGbdZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-T0Wo/gn9S4YoAccf8yjSfTX/txc"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 170,
    "path": "../public/assets/clock-BN4XGbdZ.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-30T19:26:48.979Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-Cxov0QFM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-meogdarmCeIZ9Jfdn5Xnxoxnu10"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 252,
    "path": "../public/assets/compass-Cxov0QFM.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/contact-DX6OI1Nb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a78-+/1PKkumDt83K4xFmf3S35Hufm0"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 14968,
    "path": "../public/assets/contact-DX6OI1Nb.js"
  },
  "/assets/destinations-DcVUlfQA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-lWl517E5Si0fHtlWdRS5wCw4Mws"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 103,
    "path": "../public/assets/destinations-DcVUlfQA.js"
  },
  "/assets/destinations.index-gnKObPuI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14f3-9qR2v5LNtsp49uVdCFV/VqPmM/Q"',
    "mtime": "2026-08-30T19:26:48.963Z",
    "size": 5363,
    "path": "../public/assets/destinations.index-gnKObPuI.js"
  },
  "/assets/destinations._slug-TVUdqIIU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c66-G46F0HAYkqZGOGl0Oeo2RgIkKkQ"',
    "mtime": "2026-08-30T19:26:48.963Z",
    "size": 7270,
    "path": "../public/assets/destinations._slug-TVUdqIIU.js"
  },
  "/assets/destinations._slug-ZpFBV78a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26c-im87uVlXBuxEILIwkd96mFTBNkw"',
    "mtime": "2026-08-30T19:26:48.964Z",
    "size": 620,
    "path": "../public/assets/destinations._slug-ZpFBV78a.js"
  },
  "/assets/DestinationsMap-ohMGsp_C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"124c-y5IGW2nAaR8e4ZMsCLZNbEDVw7Y"',
    "mtime": "2026-08-30T19:26:48.984Z",
    "size": 4684,
    "path": "../public/assets/DestinationsMap-ohMGsp_C.js"
  },
  "/assets/dialog-CrHmL2aY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-Rs+XK+g5nOkjIZb3jHFXIHyB0bM"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 1830,
    "path": "../public/assets/dialog-CrHmL2aY.js"
  },
  "/assets/disclaimer-CRgFwN6D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"71c-4zYKEKFx8ft+N3cVg9O95t7rKL4"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 1820,
    "path": "../public/assets/disclaimer-CRgFwN6D.js"
  },
  "/assets/earth-BEBK2-Mr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-qIuwwoKYtNwUhXO1u2oBw/lFfes"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 394,
    "path": "../public/assets/earth-BEBK2-Mr.js"
  },
  "/assets/external-link-BVWcHjb6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-cyF0bFlwDf04jzXQY5EPokYjfBM"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 252,
    "path": "../public/assets/external-link-BVWcHjb6.js"
  },
  "/assets/eye-BCzXW7pg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-O8d5pbKDX7JZDu4hioSnyZuWVps"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 257,
    "path": "../public/assets/eye-BCzXW7pg.js"
  },
  "/assets/eye-off-B7Gr6s1u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-vm7pRDY3Eyzt74wTLU5BHTw/yhY"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 431,
    "path": "../public/assets/eye-off-B7Gr6s1u.js"
  },
  "/assets/flame-DlEaI5mP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-XN0VkEBm0vqiaL7M3QF2fKXh4/c"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 200,
    "path": "../public/assets/flame-DlEaI5mP.js"
  },
  "/assets/folder-tree-vhLBUWpT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-xKuzAR4rv6j6sfROnaLwzmP1z0M"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 480,
    "path": "../public/assets/folder-tree-vhLBUWpT.js"
  },
  "/assets/gallery-M4p4qwiA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18e5-CvUO1qO178Iy0lLbI4EbvoBvQZ8"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 6373,
    "path": "../public/assets/gallery-M4p4qwiA.js"
  },
  "/assets/geocoding.functions-lPxdCYQ4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-EzcD7d0YWaHUE4+ASpns9Efx7XI"',
    "mtime": "2026-08-30T19:26:48.981Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-lPxdCYQ4.js"
  },
  "/assets/grip-vertical-DUYM8-kZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-2qrRvCaZuKDJEBJN48MGoYZidUg"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-DUYM8-kZ.js"
  },
  "/assets/HeroBannerManager-CA-0s-hO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b55-4005u294soSi1Y7irwJ2pbMu0YU"',
    "mtime": "2026-08-30T19:26:48.980Z",
    "size": 11093,
    "path": "../public/assets/HeroBannerManager-CA-0s-hO.js"
  },
  "/assets/image-C7Q9BTrk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-tfUM2YPcXjZfBYDxT+oVPikHhec"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 270,
    "path": "../public/assets/image-C7Q9BTrk.js"
  },
  "/assets/image-off-BYbMN3nw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29f-afCqRpzf3VRRRk2sRfltU25lRZI"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 671,
    "path": "../public/assets/image-off-BYbMN3nw.js"
  },
  "/assets/index-BxLBWKb5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-OmeyNuVGVBRNSDdnxGcgRMLGItg"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 290228,
    "path": "../public/assets/index-BxLBWKb5.js"
  },
  "/assets/index-Dyf_p-CU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a4a6-zxXN9nZvbqgD6XCWlXeiDNu7OS4"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 173222,
    "path": "../public/assets/index-Dyf_p-CU.js"
  },
  "/assets/layout-dashboard-DUW9j6pO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"368-B09hJdBlJZj1CIdqYqT89wd4x2o"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 872,
    "path": "../public/assets/layout-dashboard-DUW9j6pO.js"
  },
  "/assets/layers-BqtPDD2y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-xhcrD5sYpAIfCfGxwPX5skjQG9g"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 422,
    "path": "../public/assets/layers-BqtPDD2y.js"
  },
  "/assets/key-round-CCVh5nMU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-o5yMkVMwKL8Jjiu0qWmsFz2ZIOo"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 356,
    "path": "../public/assets/key-round-CCVh5nMU.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-30T19:26:48.956Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-BYcMuVXP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-dOgsNN+mtSHhOX3a1HXYKasMrZk"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 303,
    "path": "../public/assets/list-BYcMuVXP.js"
  },
  "/assets/list-ordered-D54qIf6K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-BoagZLql+ccpv+zbbhgROpkRWdY"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 644,
    "path": "../public/assets/list-ordered-D54qIf6K.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/leaflet-src-D_wJGUnD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-/bISCH5X/SnV9e7dafGk8aHy3J4"',
    "mtime": "2026-08-30T19:26:48.983Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-D_wJGUnD.js"
  },
  "/assets/map-HHU7cpXh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-ikDUYCdZp+2XPgknwEYOAdlCi5U"',
    "mtime": "2026-08-30T19:26:48.963Z",
    "size": 724,
    "path": "../public/assets/map-HHU7cpXh.js"
  },
  "/assets/maximize-2-DLuGXF-j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-m6fk+VVmznu5ZPMvLJBdCdDw4rY"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 239,
    "path": "../public/assets/maximize-2-DLuGXF-j.js"
  },
  "/assets/message-square-B_sLGTi5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-jyWQDQLz8VF298LzUixso8dYJoY"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 234,
    "path": "../public/assets/message-square-B_sLGTi5.js"
  },
  "/assets/mountain-DIex877e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-e+gKrdnBIVWFfdNFsU/9am6F7zE"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 377,
    "path": "../public/assets/mountain-DIex877e.js"
  },
  "/assets/navigation-BzMpC_5i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-TnQMBKcEVoejIPcGSlT4X34K1v0"',
    "mtime": "2026-08-30T19:26:48.977Z",
    "size": 149,
    "path": "../public/assets/navigation-BzMpC_5i.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-30T19:26:48.956Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-30T19:26:48.956Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-Bh59Jg14.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-pmWZJ2nWFdZpybCLJvNJGn6SIMY"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 974,
    "path": "../public/assets/news._slug-Bh59Jg14.js"
  },
  "/assets/news._slug-zWhMA0lL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-WwwwNNj8yXhl4V1HxDzuG/Xyitc"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 4524,
    "path": "../public/assets/news._slug-zWhMA0lL.js"
  },
  "/assets/PageBreadcrumbs-Gs9Q_bbb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-Uihvuml1Hke7N1A1DCEmgGvDho4"',
    "mtime": "2026-08-30T19:26:48.967Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-Gs9Q_bbb.js"
  },
  "/assets/pen-line-DMgv5sZe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-Ybr9EFPOXmgwHCJnCwq3qVdyAOI"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 1022,
    "path": "../public/assets/pen-line-DMgv5sZe.js"
  },
  "/assets/pencil-ByvT5zsy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-xigVydm0pdMzMM6A3K3sI0qIziI"',
    "mtime": "2026-08-30T19:26:48.976Z",
    "size": 277,
    "path": "../public/assets/pencil-ByvT5zsy.js"
  },
  "/assets/plus-CHxaOxGC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-dQqe5UDT2t8tbQrOiux8Flzgx74"',
    "mtime": "2026-08-30T19:26:48.977Z",
    "size": 154,
    "path": "../public/assets/plus-CHxaOxGC.js"
  },
  "/assets/PostCard-B2k-xDsc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed1-n/qFC3J1GWLcDs1KBLMZy67t8gA"',
    "mtime": "2026-08-30T19:26:48.967Z",
    "size": 3793,
    "path": "../public/assets/PostCard-B2k-xDsc.js"
  },
  "/assets/index-DpXLCXK1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f0942-rvU/zPAiJGoCFMFZti4lhskEMP0"',
    "mtime": "2026-08-30T19:26:48.986Z",
    "size": 985410,
    "path": "../public/assets/index-DpXLCXK1.js"
  },
  "/assets/PostEditor-C4F5Uh2d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ecd2-npsHQQWeB1d6LsFy4tBlWc+CzqI"',
    "mtime": "2026-08-30T19:26:48.983Z",
    "size": 60626,
    "path": "../public/assets/PostEditor-C4F5Uh2d.js"
  },
  "/assets/power-CGzRZ7nQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-cxsN1CG/xoqYEzap4qeOOCq99FE"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 174,
    "path": "../public/assets/power-CGzRZ7nQ.js"
  },
  "/assets/privacy-policy-CUcg46sB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"720-UkP+Dn973kh7bvIXX6RuFz0cJfk"',
    "mtime": "2026-08-30T19:26:48.959Z",
    "size": 1824,
    "path": "../public/assets/privacy-policy-CUcg46sB.js"
  },
  "/assets/quote-CsMW_ocf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-94J3LaxYiY+BlDewtuFtIa45i4Q"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 390,
    "path": "../public/assets/quote-CsMW_ocf.js"
  },
  "/assets/radio-CLLKw25U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-mbDXC1by6EFXr+lJB7Hm8X2f1FA"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 375,
    "path": "../public/assets/radio-CLLKw25U.js"
  },
  "/assets/refresh-cw-CFYp0-WY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-HtNzKIadwIn31kg0i329/a5Cdoc"',
    "mtime": "2026-08-30T19:26:48.977Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-CFYp0-WY.js"
  },
  "/assets/rocket-C5T9KRG-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4ed-anCSwCa7Bcv2ozaRP8elhogCC08"',
    "mtime": "2026-08-30T19:26:48.975Z",
    "size": 1261,
    "path": "../public/assets/rocket-C5T9KRG-.js"
  },
  "/assets/rotate-ccw-Cqshtnhk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-dvrGBWqEZV8LbMHoIZA+lqeD5Ko"',
    "mtime": "2026-08-30T19:26:48.978Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-Cqshtnhk.js"
  },
  "/assets/route-C3lDUMNq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-ADd3rf3NPM8eb2yncMXeAW8g+zE"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 95,
    "path": "../public/assets/route-C3lDUMNq.js"
  },
  "/assets/route-CGsL56WN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-XpQrSUAll5tkjtsuVo4WJp5dv/M"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 543,
    "path": "../public/assets/route-CGsL56WN.js"
  },
  "/assets/save-CeX2g15F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-opbwtBLA4vcdwgdjiuqu7bV7MJ0"',
    "mtime": "2026-08-30T19:26:48.977Z",
    "size": 328,
    "path": "../public/assets/save-CeX2g15F.js"
  },
  "/assets/scale-O4rWpkUG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-WI5nvKqS0o/zLKeIv+Q0FjjPnYU"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 333,
    "path": "../public/assets/scale-O4rWpkUG.js"
  },
  "/assets/settings-ReZHY2RN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-mbropOa+e4QvZmQKUhcslSd+tRQ"',
    "mtime": "2026-08-30T19:26:48.978Z",
    "size": 488,
    "path": "../public/assets/settings-ReZHY2RN.js"
  },
  "/assets/share-2-9cBJX1oq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-ppypGD4dtmOh7XcxeDFjeHfHIvA"',
    "mtime": "2026-08-30T19:26:48.978Z",
    "size": 358,
    "path": "../public/assets/share-2-9cBJX1oq.js"
  },
  "/assets/shield-alert-DmNZFz8o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-EoiDLmpBnkq8hHOd0XXwbFIFqFs"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 668,
    "path": "../public/assets/shield-alert-DmNZFz8o.js"
  },
  "/assets/shield-check-C2p_5eH6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-+Caa88YFs/ef0x8C7M217yYDDG0"',
    "mtime": "2026-08-30T19:26:48.971Z",
    "size": 321,
    "path": "../public/assets/shield-check-C2p_5eH6.js"
  },
  "/assets/shield-DA5wuNZv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-W+desObL0aGhMYAKgRK22P8QnMc"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 273,
    "path": "../public/assets/shield-DA5wuNZv.js"
  },
  "/assets/sliders-horizontal-aG1PWSI2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-X+ndVlk9BaekH734/uoSkC0kAjo"',
    "mtime": "2026-08-30T19:26:48.964Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-aG1PWSI2.js"
  },
  "/assets/star-z94SyJT_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-tNbxYTjdJC282jT8rFkZJ8YM9zk"',
    "mtime": "2026-08-30T19:26:48.978Z",
    "size": 473,
    "path": "../public/assets/star-z94SyJT_.js"
  },
  "/assets/TranslatedMarkdown-uAigUUES.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-UFXK+P2TfJPB8HbErXLOlQ+/5Mk"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-uAigUUES.js"
  },
  "/assets/topics._slug-Dbkp__cS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f5-d411NSqy7GqBGo1of2K6a2QOOME"',
    "mtime": "2026-08-30T19:26:48.961Z",
    "size": 2293,
    "path": "../public/assets/topics._slug-Dbkp__cS.js"
  },
  "/assets/trash-2-BfjN5YBB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-nIaa+nu9BhfiUdALKGt7iveNjv4"',
    "mtime": "2026-08-30T19:26:48.978Z",
    "size": 329,
    "path": "../public/assets/trash-2-BfjN5YBB.js"
  },
  "/assets/styles-Fi2dbGGl.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2e5c2-vSWPUaPXV68BHzBJj9ON5KaiqY4"',
    "mtime": "2026-08-30T19:26:48.922Z",
    "size": 189890,
    "path": "../public/assets/styles-Fi2dbGGl.css"
  },
  "/assets/trending-up-BctT_V4r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-NiYEbB4/r1KY9v3RXMfQT/xbRXY"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 932,
    "path": "../public/assets/trending-up-BctT_V4r.js"
  },
  "/assets/triangle-alert-CSeIdxV3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-RPdJzekBOFCCi/X1XJzrgfJ3QYQ"',
    "mtime": "2026-08-30T19:26:48.973Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-CSeIdxV3.js"
  },
  "/assets/upload-OTRk1Y9Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-FI20c+TkJxr3F21dKS+a+6PKqRc"',
    "mtime": "2026-08-30T19:26:48.978Z",
    "size": 231,
    "path": "../public/assets/upload-OTRk1Y9Y.js"
  },
  "/assets/useMutation-B3tAVmbq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-X9BFUddmtsecBw+IvVJnWRj0Q80"',
    "mtime": "2026-08-30T19:26:48.980Z",
    "size": 2211,
    "path": "../public/assets/useMutation-B3tAVmbq.js"
  },
  "/assets/user-x-XnLY4Rin.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"373-MEzie4XBlA0v+Rs78AiYftMKodk"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 883,
    "path": "../public/assets/user-x-XnLY4Rin.js"
  },
  "/assets/users-DigjhpNa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-5x1DHQtb5IVYmwZvw55tqZSRgl8"',
    "mtime": "2026-08-30T19:26:48.979Z",
    "size": 307,
    "path": "../public/assets/users-DigjhpNa.js"
  },
  "/assets/user-plus-DZERuPJA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-Qd5f/1BzqyODpYtOzyT7Etb38O8"',
    "mtime": "2026-08-30T19:26:48.969Z",
    "size": 311,
    "path": "../public/assets/user-plus-DZERuPJA.js"
  },
  "/assets/utils-CHstQfGb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-H2FP1yynWrIc4zd5mSdU2jvW2hg"',
    "mtime": "2026-08-30T19:26:48.979Z",
    "size": 59982,
    "path": "../public/assets/utils-CHstQfGb.js"
  },
  "/assets/useSuspenseQuery-DOOCj7g9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-VnpNa3g7ITi7lNMQFKYihYpZIq0"',
    "mtime": "2026-08-30T19:26:48.965Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-DOOCj7g9.js"
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
