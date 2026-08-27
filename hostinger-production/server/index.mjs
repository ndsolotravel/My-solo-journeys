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
  "/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/author-hussain.jpg"
  },
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
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
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
  "/assets/about-7XvQcuMV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-ye54IFkAeZ21IKf9wyxDvFutkOU"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 3398,
    "path": "../public/assets/about-7XvQcuMV.js"
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
  "/assets/account-CcswBvZL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-BvVy+ISrvr7P7TTjc/x+vm3ZYv8"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 2068,
    "path": "../public/assets/account-CcswBvZL.js"
  },
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
  },
  "/assets/admin-BWhtiSuz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-9RDDd3+jGIppHMuKX+F7WwTAQkI"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 2555,
    "path": "../public/assets/admin-BWhtiSuz.js"
  },
  "/assets/admin.comments-CjTxIA_p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-C8Na6BWScjiCQZnROks7YoHvD2c"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-CjTxIA_p.js"
  },
  "/assets/admin.categories-CEWuggFp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-ThGi+loquK/jei7hi5KqE2mzbDQ"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-CEWuggFp.js"
  },
  "/assets/admin.destinations-D8iYDDEL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-rYu6QvawcUR+PJ+qifuXm4sFWDs"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-D8iYDDEL.js"
  },
  "/assets/admin.gallery-DVq9KL2n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-TfZIj0lLYhsOFgw7Swpm0u1N3fs"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-DVq9KL2n.js"
  },
  "/assets/admin.homepage-DvJu2lJw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-esKj9w7x0pi7En1wYYmPQbnIhMA"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-DvJu2lJw.js"
  },
  "/assets/admin.analytics-WAPfBnYF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-DTQVn5TJPWOtiQz75J3pmO6fr3Y"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-WAPfBnYF.js"
  },
  "/assets/admin.index-HlsUHqV-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-K7ZuJl76+gpsjjm4a1uR1cr34rE"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 4075,
    "path": "../public/assets/admin.index-HlsUHqV-.js"
  },
  "/assets/admin.messages-CEwNZzVe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-c5Z4FfrM8714a3GUZgYLdcrQRy4"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-CEwNZzVe.js"
  },
  "/assets/admin.news-mnbe5eGV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-BiUw+ENTZwxrZBrIWWogdolyfis"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 34492,
    "path": "../public/assets/admin.news-mnbe5eGV.js"
  },
  "/assets/admin.posts.index-DNv7oQ2E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-VbopsF1dr4tKlLOlkzuKyjr8QiM"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-DNv7oQ2E.js"
  },
  "/assets/admin.posts.new-gtPxCV5n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-CabNZ63ahXzCa5tL/iGCdwY9/sU"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-gtPxCV5n.js"
  },
  "/assets/admin.posts._id-DhcKzue9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-CD3jDaQy/VTUtVdEGrtSlow4kYA"',
    "mtime": "2026-08-27T10:27:38.448Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-DhcKzue9.js"
  },
  "/assets/admin.public-message-d5A6fgxr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-jc93U0ee2r6Y7iXQJLYXzDSzO0o"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-d5A6fgxr.js"
  },
  "/assets/admin.settings-eiQZ7ol7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3eb4-nZAyZjSJ9InPZycKTINn0aKAwg0"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 16052,
    "path": "../public/assets/admin.settings-eiQZ7ol7.js"
  },
  "/assets/admin.subscribers-CXraEEBs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-NkSoPD11cM8xzwhgMQzTIvyF4KA"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-CXraEEBs.js"
  },
  "/assets/AdSlot-B2_XJo6f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-R5NbZGag1zdWwZqRtKxOXRm98oU"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-B2_XJo6f.js"
  },
  "/assets/alert-dialog-CEhYS0V8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-Tx/g57XXUrt71PzJ4ZtGSs6cMjU"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-CEhYS0V8.js"
  },
  "/assets/arrow-left-zvrmcFBO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-jnx1oSTx+nBKgi5Esr38l7rWZ1M"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 166,
    "path": "../public/assets/arrow-left-zvrmcFBO.js"
  },
  "/assets/arrow-up-right-D1LALoeP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-3PUv2it/4EiIDzqs5gJWMU8t0YE"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-D1LALoeP.js"
  },
  "/assets/auth-C19KCbcR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-zF6Ltc0UvqMqvkgAeuBpRnpM2lk"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 8188,
    "path": "../public/assets/auth-C19KCbcR.js"
  },
  "/assets/blog-mjcVz1KI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-Nbk0vJPeXlSJQ8wQ1OS3/DcFG48"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 103,
    "path": "../public/assets/blog-mjcVz1KI.js"
  },
  "/assets/blog.index-5nLRGQ79.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28be-gTZMHMHg0lgAZM1X4kkoKdIougw"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 10430,
    "path": "../public/assets/blog.index-5nLRGQ79.js"
  },
  "/assets/blog._slug-BMgxvj0y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-ffmrRPqU8caM6hNf6nCr9rfY40U"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 572,
    "path": "../public/assets/blog._slug-BMgxvj0y.js"
  },
  "/assets/blog._slug-D_BNJW1I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7091-o6xDiEHRvH1TLCcgq3ZT6QtG5z8"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 28817,
    "path": "../public/assets/blog._slug-D_BNJW1I.js"
  },
  "/assets/calendar-RdcqnSZU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-F8Kjt7ZykkI3SAaNow7kM/DhOqw"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 258,
    "path": "../public/assets/calendar-RdcqnSZU.js"
  },
  "/assets/book-open-Dx14IN9q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-OcAizwhfDZuT0E20Ms1sVQyLWRM"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 280,
    "path": "../public/assets/book-open-Dx14IN9q.js"
  },
  "/assets/category._slug-BBSSJInr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-Yr8S0A9BuRkx1CS/T3i8adJ/KrQ"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 3842,
    "path": "../public/assets/category._slug-BBSSJInr.js"
  },
  "/assets/chart-column-CEBYVZYG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-j1/fB9Hu7+yZC1bABjRLXmW+U+U"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 252,
    "path": "../public/assets/chart-column-CEBYVZYG.js"
  },
  "/assets/check-Bx8Ali69.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-61woiBdbx5f5hCp6k2fklOi1Xe0"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 125,
    "path": "../public/assets/check-Bx8Ali69.js"
  },
  "/assets/chevron-left-1RAHn67j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-ONK9dsoRwr0BA8bdQRTfYsiM47U"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 131,
    "path": "../public/assets/chevron-left-1RAHn67j.js"
  },
  "/assets/chevron-right-C_4_ot29.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-LPY3oBJJMWIHh9AfL0M23Y/qR8I"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 131,
    "path": "../public/assets/chevron-right-C_4_ot29.js"
  },
  "/assets/circle-check-n4jcFm6C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-vYKMM8f16bazY5fjEzXKln4Bg/8"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 179,
    "path": "../public/assets/circle-check-n4jcFm6C.js"
  },
  "/assets/clock-Sp7cmFpZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-+VFgx5iGWtCjSO4l5UE/jEirMxQ"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 170,
    "path": "../public/assets/clock-Sp7cmFpZ.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-Zz459fZE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-I0itnF+XlAeTJT529Y+XSK3qDZ8"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 14845,
    "path": "../public/assets/contact-Zz459fZE.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-C7geS_Fh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-7OuDkErwz4EL6oFpdPSPw8y6ZSs"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 103,
    "path": "../public/assets/destinations-C7geS_Fh.js"
  },
  "/assets/destinations.index-DibFd1TL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-sad78nzy6IwgreBLkD3XeKTBaOQ"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-DibFd1TL.js"
  },
  "/assets/destinations._slug-Bzx8vn_c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-7+on+W7s3Hnqs5aCTTY0sdw5A9k"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-Bzx8vn_c.js"
  },
  "/assets/destinations._slug-CSo2RTvB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-cB3s5pDD+TCMalIqY+1mfCHwM6E"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-CSo2RTvB.js"
  },
  "/assets/DestinationsMap-uUp1PLd1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-pQwsxpftkLbx5u7yk5FbSq7xruU"',
    "mtime": "2026-08-27T10:27:38.448Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-uUp1PLd1.js"
  },
  "/assets/dialog-k_4IhboP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-lMLgtWPo4eICDDGD2DMEQK6gu9Y"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 1830,
    "path": "../public/assets/dialog-k_4IhboP.js"
  },
  "/assets/earth-CWcM9gu_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-4Tp0q7gxqVYhyla4zzJ7jczoXig"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 394,
    "path": "../public/assets/earth-CWcM9gu_.js"
  },
  "/assets/external-link-DaIV-LoR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-3k05Z4J8dv+7PKkguiLIR2zD8KI"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 252,
    "path": "../public/assets/external-link-DaIV-LoR.js"
  },
  "/assets/eye-BmgIiZhu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-2vrLFF4eOtXKsvh8Eb5UEpXs404"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 257,
    "path": "../public/assets/eye-BmgIiZhu.js"
  },
  "/assets/flame-db4_oViu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-I1OPYcf9jiL/1cF3lV9aDCQ3pi8"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 200,
    "path": "../public/assets/flame-db4_oViu.js"
  },
  "/assets/folder-tree-DpB4lgQd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-/sMo2tBjGy+tuezhcdnhY+F84W0"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 480,
    "path": "../public/assets/folder-tree-DpB4lgQd.js"
  },
  "/assets/gallery-CqBFwTGg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-+CjqgY+iyiO00gjxP2kMxNbp/Us"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 6285,
    "path": "../public/assets/gallery-CqBFwTGg.js"
  },
  "/assets/geocoding.functions-bxArsepp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-E4tEb8Im98gT5I1khXGD2+o/Tos"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-bxArsepp.js"
  },
  "/assets/house-BpwVEX3w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-KCW04j/O4eiXhFzcH8JAfkOcRIw"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 282,
    "path": "../public/assets/house-BpwVEX3w.js"
  },
  "/assets/image-DQZ8Zhhp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-bPRKLpQllHBHZIZ+RuDGiH+Tz4k"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 270,
    "path": "../public/assets/image-DQZ8Zhhp.js"
  },
  "/assets/key-round-BP_0WToA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-+oIPsKYlezAbLJ6wYKj/pjxkza4"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 356,
    "path": "../public/assets/key-round-BP_0WToA.js"
  },
  "/assets/index-BMCNEXdv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-u0k+xGGU9KHQOfYS+QVlbY4bgDU"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 290228,
    "path": "../public/assets/index-BMCNEXdv.js"
  },
  "/assets/layers-Do5VY0Ut.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-IrsAVj4RHGNBXq4BgOl11yVyiCY"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 422,
    "path": "../public/assets/layers-Do5VY0Ut.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-DcW8Fpvf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-KylhOG14qDjp2tv2p+DiNqKpZ4c"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 172647,
    "path": "../public/assets/index-DcW8Fpvf.js"
  },
  "/assets/list-to4qDnVW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-ya7i1MgVEJtS+H+IZTqe4GZGdtA"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 303,
    "path": "../public/assets/list-to4qDnVW.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-CrC9Sgfm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-sp8Regxrp6fTSpPW72WOKoITO+U"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 914,
    "path": "../public/assets/maximize-2-CrC9Sgfm.js"
  },
  "/assets/leaflet-src-D7QRFVQc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-/iqFR6X0mQk06+nNNnctX1Z0XiY"',
    "mtime": "2026-08-27T10:27:38.449Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-D7QRFVQc.js"
  },
  "/assets/message-square-C-46ZhjO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-nnmk3z1vXSTUvkdPZQn5zO3fBe4"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 234,
    "path": "../public/assets/message-square-C-46ZhjO.js"
  },
  "/assets/navigation-DuHgf3Nv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-QvhhgSYMPnlpMROfnCLC0xBHqgo"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 149,
    "path": "../public/assets/navigation-DuHgf3Nv.js"
  },
  "/assets/index-Bb0Hx_ux.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8195-51gIddNkBY4NmPswE2lGvjhLIro"',
    "mtime": "2026-08-27T10:27:38.448Z",
    "size": 950677,
    "path": "../public/assets/index-Bb0Hx_ux.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-CPUlYZgi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-f3iZ5t8RE9MKOLsgvLML896nadU"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 974,
    "path": "../public/assets/news._slug-CPUlYZgi.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T10:27:38.425Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-CtLADQ13.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-O3rnf6Q/lSE8yMhhFM30QzX4Vt8"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 4523,
    "path": "../public/assets/news._slug-CtLADQ13.js"
  },
  "/assets/PageBreadcrumbs-DepHnh1B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-kcTVNYRMIdgHcfHM8+ek9wlch6I"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-DepHnh1B.js"
  },
  "/assets/pencil-NdFxlvi8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-7kcGkSj8K0bV25vGlLc7ILdi/2U"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 277,
    "path": "../public/assets/pencil-NdFxlvi8.js"
  },
  "/assets/plus-3a-7XqnL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-GmQc9YUWmfxobHdxZZGO1dkZTE8"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 154,
    "path": "../public/assets/plus-3a-7XqnL.js"
  },
  "/assets/PostCard-1lUCv-Tr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f69-XroudV8WlcnO5vqZjmOCVAb/akc"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 3945,
    "path": "../public/assets/PostCard-1lUCv-Tr.js"
  },
  "/assets/PostEditor-DfMV_0XS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c097-2C+gAkupoAwH7b9fmfBjzdbclfk"',
    "mtime": "2026-08-27T10:27:38.448Z",
    "size": 49303,
    "path": "../public/assets/PostEditor-DfMV_0XS.js"
  },
  "/assets/radio-CxKSMOVv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-k7QtnfejlngRzC8HMeLE7E1Gz6w"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 375,
    "path": "../public/assets/radio-CxKSMOVv.js"
  },
  "/assets/refresh-cw-DzHHPN8u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-HF6glg/u/Z5xhTjBv+ky1F2rPRQ"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-DzHHPN8u.js"
  },
  "/assets/route-CEywSiFC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-kQw/9hL2yA8qe0mCnFUp5atbic8"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 95,
    "path": "../public/assets/route-CEywSiFC.js"
  },
  "/assets/save-Bgzi_dAp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-xqFsEcu13uHulunIKey8ZRnNaew"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 328,
    "path": "../public/assets/save-Bgzi_dAp.js"
  },
  "/assets/settings-BmxT5Cn7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-Hyvm2C3sCcI0Bi6X+VR1BYZNNtk"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 488,
    "path": "../public/assets/settings-BmxT5Cn7.js"
  },
  "/assets/share-2-T6ePPsOV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-H5hfcZMW1wtittLlXyTR0z/vE50"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 358,
    "path": "../public/assets/share-2-T6ePPsOV.js"
  },
  "/assets/shield-check-DW-Y4AM2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-sM5nfOqcfvZq2RSB4QNm4BAxvEM"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 321,
    "path": "../public/assets/shield-check-DW-Y4AM2.js"
  },
  "/assets/shield-DcH01Tje.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-oDCstcrQ56B31cmwDfODoTTcseY"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 273,
    "path": "../public/assets/shield-DcH01Tje.js"
  },
  "/assets/star-DVi2r9ZE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-1G7vbUxa6X5KveEynpa4z7/FzjA"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 473,
    "path": "../public/assets/star-DVi2r9ZE.js"
  },
  "/assets/topics._slug-DFgqojvy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-BponAzOOGlt8iT7cQjj01XZvPGQ"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-DFgqojvy.js"
  },
  "/assets/trash-2-Ch53GFDn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-DBZXOSzv8Dv3inPy8R2f0K8SFU4"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 329,
    "path": "../public/assets/trash-2-Ch53GFDn.js"
  },
  "/assets/triangle-alert-CEWl1fJO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-Z42zrJ776jruXN+k61GeomViV1E"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-CEWl1fJO.js"
  },
  "/assets/upload-BtamS1vo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-Qc6ebgQLp1G9v0JFys+xeb9+THk"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 231,
    "path": "../public/assets/upload-BtamS1vo.js"
  },
  "/assets/styles-Dx1XDBPV.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"28c2c-RWEL8iubUuLL+W5UuDFbLd2DocQ"',
    "mtime": "2026-08-27T10:27:38.443Z",
    "size": 166956,
    "path": "../public/assets/styles-Dx1XDBPV.css"
  },
  "/assets/useMutation-RXzrEzL7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-DyaIZjlwTAdXBSfokn9Cf1BbTlo"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 2211,
    "path": "../public/assets/useMutation-RXzrEzL7.js"
  },
  "/assets/users-C0lo2U-x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-4GNz99HVYmlmZlbxyCsyetQiCbk"',
    "mtime": "2026-08-27T10:27:38.447Z",
    "size": 307,
    "path": "../public/assets/users-C0lo2U-x.js"
  },
  "/assets/useSuspenseQuery-BKqAxlO6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-kqIIaxrS5TK9q/DQEYZ/NdUPjdA"',
    "mtime": "2026-08-27T10:27:38.445Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-BKqAxlO6.js"
  },
  "/assets/utils-DXS1TNuC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-wOt00SQWRpV6rm8ULD/DcNvedZ8"',
    "mtime": "2026-08-27T10:27:38.446Z",
    "size": 59982,
    "path": "../public/assets/utils-DXS1TNuC.js"
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
