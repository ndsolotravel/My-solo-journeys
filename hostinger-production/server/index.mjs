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
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/images/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/images/author-hussain.jpg"
  },
  "/images/author-hussain-original.jpg": {
    "type": "image/jpeg",
    "etag": '"23253-0EbOe3DBgnE0F6k8q3PJLw6Gr8g"',
    "mtime": "2026-08-27T03:07:35.496Z",
    "size": 143955,
    "path": "../public/images/author-hussain-original.jpg"
  },
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
  },
  "/assets/account-MB6_rqgh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-+sej5cYzgDxuOKT6MvyIPIGt7wM"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 2068,
    "path": "../public/assets/account-MB6_rqgh.js"
  },
  "/assets/about-BZOSQvXG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-zNt5x47CBMxJsLa4VR4G7WGa/rs"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 3398,
    "path": "../public/assets/about-BZOSQvXG.js"
  },
  "/assets/admin-B-JEqq4T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a4d-eVTPi6cSRIRuNpp+LUKB3j8NiQk"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 2637,
    "path": "../public/assets/admin-B-JEqq4T.js"
  },
  "/assets/admin.categories-DH5pRY89.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591a-iaw+m/9EzY/4SflBN33E+NKr4m4"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 22810,
    "path": "../public/assets/admin.categories-DH5pRY89.js"
  },
  "/assets/admin.comments-Dsb-V-57.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-+0cSi+uA5he8wmiYK5MrzudziV8"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-Dsb-V-57.js"
  },
  "/assets/admin.destinations-CelEt3Pd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-jBPnWLbkZlEtXY68cs/Wc/yH9Ig"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-CelEt3Pd.js"
  },
  "/assets/admin.gallery-DqekiCFZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-lGavcNTPnMoZGpAsG4QlBMrPs68"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-DqekiCFZ.js"
  },
  "/assets/admin.analytics-BrjpIZ0V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-N+FNZvHCwyKWB28QXU/Kr/DZAas"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-BrjpIZ0V.js"
  },
  "/assets/admin.homepage-DmFQUgjQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-Akk10HMAoxJh9WAHhBxLcKv3cns"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-DmFQUgjQ.js"
  },
  "/assets/admin.index-DpBdRDkK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-mZGHTDXvK15S8tMuka3qgoDj2so"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 4075,
    "path": "../public/assets/admin.index-DpBdRDkK.js"
  },
  "/assets/admin.legal-D24Ex2dJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3cbe-FCnmsCT4IrFNVu7bLlivBjymkmc"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 15550,
    "path": "../public/assets/admin.legal-D24Ex2dJ.js"
  },
  "/assets/admin.news-CyJJhnFV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-qobZ/kZTImjiSWaHy9J4WDRkqHQ"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 34492,
    "path": "../public/assets/admin.news-CyJJhnFV.js"
  },
  "/assets/admin.messages-uL4fJjOl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12aa-KwrlGZfNzqtUj0lpQUHYTyu7cXY"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 4778,
    "path": "../public/assets/admin.messages-uL4fJjOl.js"
  },
  "/assets/admin.posts.index-DECLxwBe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-DUwgC8n/WrO9TZAHc8dyhemnWuI"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-DECLxwBe.js"
  },
  "/assets/admin.posts.new-Cf6MJcfO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d9-La4j/kaIqUB2b+0vxDhCBRA0Dkc"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 729,
    "path": "../public/assets/admin.posts.new-Cf6MJcfO.js"
  },
  "/assets/admin.posts._id-CVNvBxxO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"40e-f2xN+dfoU2B1lvwGr574ndFoKsQ"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 1038,
    "path": "../public/assets/admin.posts._id-CVNvBxxO.js"
  },
  "/assets/admin.public-message-DlbY811F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-11ScrloZ5GpmM+GhhpnMAm+XH9w"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-DlbY811F.js"
  },
  "/assets/admin.subscribers-CmAUFa0Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-31CKw0P17JLOvraUdzKfAYxszXM"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-CmAUFa0Y.js"
  },
  "/assets/alert-dialog-HFTS_z7f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-lf2H4I7yjGhnRWToMEZ84tz61pc"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-HFTS_z7f.js"
  },
  "/assets/AdSlot-BlCUwwZU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8bb-5Qf0Xjy2DE8u4k5MGiKuLsFcbYQ"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 2235,
    "path": "../public/assets/AdSlot-BlCUwwZU.js"
  },
  "/assets/admin.settings-LwjDdJOO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3eb4-u2naYZdXLH+FVSJ1bBnJPnuIZaw"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 16052,
    "path": "../public/assets/admin.settings-LwjDdJOO.js"
  },
  "/assets/arrow-left-wVG7Ityp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a1-XYHYaAX7KJgCZxBVGJcuTT1pxRQ"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 161,
    "path": "../public/assets/arrow-left-wVG7Ityp.js"
  },
  "/assets/arrow-up-right-DuY2gZPN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-Ct7i+tdBVxyvcyU7uKbGB+SBF2o"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-DuY2gZPN.js"
  },
  "/assets/auth-CgwurubI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-ZIeKiqKck3x593+SFXClm55V/Y8"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 8188,
    "path": "../public/assets/auth-CgwurubI.js"
  },
  "/assets/blog-ZFRYDLEk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-tRygor+BBzpZj7PUqm8hUQFjrU0"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 103,
    "path": "../public/assets/blog-ZFRYDLEk.js"
  },
  "/assets/blog.index-9UTpwloW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28c0-T/tYXlpCU6KIuALexA+bAkzMvUY"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 10432,
    "path": "../public/assets/blog.index-9UTpwloW.js"
  },
  "/assets/blog._slug-ByyYf72v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-XeNmrwwSLtmRtFRHwC5N/14ByO4"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 572,
    "path": "../public/assets/blog._slug-ByyYf72v.js"
  },
  "/assets/book-open-CzvxYY6N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-PUXAJH08clE32WnMAgFpLZLJSfg"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 280,
    "path": "../public/assets/book-open-CzvxYY6N.js"
  },
  "/assets/blog._slug-Bw-cAd6x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cce-w2x8yZpGv6nYjZEjDbCyqjSkVjk"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 27854,
    "path": "../public/assets/blog._slug-Bw-cAd6x.js"
  },
  "/assets/calendar-CTjgzcoe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-JJm/K42+SFAGYHgSs0mMB8VGXcI"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 253,
    "path": "../public/assets/calendar-CTjgzcoe.js"
  },
  "/assets/category._slug-DWoDSsQY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-lrMq29jFAdPT7vs//+iem6ylXA4"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 3842,
    "path": "../public/assets/category._slug-DWoDSsQY.js"
  },
  "/assets/chart-column-CBOqNM1i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-EnuB3crTjgS9PzECbwsOKA53Lew"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 252,
    "path": "../public/assets/chart-column-CBOqNM1i.js"
  },
  "/assets/check-BXX0B2Zk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-jTtdbsDWg69Y6ry2x8+MRo2XLso"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 125,
    "path": "../public/assets/check-BXX0B2Zk.js"
  },
  "/assets/chevron-left-BAz-jbh0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7e-49jWh/DCDw0DE4UU3SbKDj4RYj8"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 126,
    "path": "../public/assets/chevron-left-BAz-jbh0.js"
  },
  "/assets/chevron-right-nzBVtXv5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-DF1WKGEXKj4LKi758Cvcvah/whk"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 131,
    "path": "../public/assets/chevron-right-nzBVtXv5.js"
  },
  "/assets/circle-check-BVxkp5b3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-1LYmESW+IzyrZSZBnIJMXlhfS4E"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 179,
    "path": "../public/assets/circle-check-BVxkp5b3.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/clock-DP8gPOZS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-K6Yp5ZPlDk5qlgPdpUJYd3TGLHY"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 170,
    "path": "../public/assets/clock-DP8gPOZS.js"
  },
  "/assets/contact-BSFNiADG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-hb2P7PlhPDtVPVZvgTu5hZn3/lM"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 14845,
    "path": "../public/assets/contact-BSFNiADG.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-2sJ_bj0g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-rKZI/xsCHMDl7Bp+NjyrXhuFGGU"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 103,
    "path": "../public/assets/destinations-2sJ_bj0g.js"
  },
  "/assets/destinations._slug-BB8rCP-_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-X1JITuG9hHouKKEBumWVQel9ov4"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-BB8rCP-_.js"
  },
  "/assets/destinations.index-jzsggXAk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-nNsb+fevWrMNAlncj6BduOiMuPs"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-jzsggXAk.js"
  },
  "/assets/destinations._slug-BL0N7WYi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd7-GGcysd3qgtq2p9v2eb3/CgjL7Q4"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 7383,
    "path": "../public/assets/destinations._slug-BL0N7WYi.js"
  },
  "/assets/DestinationsMap-mRYMmwAE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-OYbqonXXlmmzkNf2YVoSVz5OebM"',
    "mtime": "2026-08-27T11:54:50.845Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-mRYMmwAE.js"
  },
  "/assets/dialog-2c6c_hU8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-D0UfZb3jQA7b6KZ+/54+D2MOggU"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 1830,
    "path": "../public/assets/dialog-2c6c_hU8.js"
  },
  "/assets/disclaimer-BLqVhkmb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6f9-92jMJcwFJj9SPiuSs8bCAKiWrac"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 1785,
    "path": "../public/assets/disclaimer-BLqVhkmb.js"
  },
  "/assets/earth-MnNEydXd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-SOn25L3FHeP+Q77p3t3UoqPi1ww"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 394,
    "path": "../public/assets/earth-MnNEydXd.js"
  },
  "/assets/eye-CroBPqYb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-VQlkqIDWfmM7rc3EXJy2a6k0DHY"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 257,
    "path": "../public/assets/eye-CroBPqYb.js"
  },
  "/assets/external-link-CAwSB61m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-mDmncCb0RcsVisOfgJsIi5r8Zoo"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 252,
    "path": "../public/assets/external-link-CAwSB61m.js"
  },
  "/assets/flame-B_EZiOsy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c3-GGHkn4iWYASqbT8KgBNT67yCrpI"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 195,
    "path": "../public/assets/flame-B_EZiOsy.js"
  },
  "/assets/folder-tree-BxpUUBFg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-dLVcPCGbunXpRu+QU6+pPR3skag"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 480,
    "path": "../public/assets/folder-tree-BxpUUBFg.js"
  },
  "/assets/gallery-rEsjxhVV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-3pjR8yW1hL1Mh3G3cMOcZNyXGzk"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 6285,
    "path": "../public/assets/gallery-rEsjxhVV.js"
  },
  "/assets/geocoding.functions-D47OXnVJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-L4C9zzrOfWS7fht4fhfT4Q8l+aI"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-D47OXnVJ.js"
  },
  "/assets/house-DH8JkU1Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-dmD2SBDnCEei2vqxckOBvGqGnD8"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 282,
    "path": "../public/assets/house-DH8JkU1Z.js"
  },
  "/assets/image-DqnkBjjf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"109-pS3+JLBkBjoEMGMXgG4A74WV8E0"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 265,
    "path": "../public/assets/image-DqnkBjjf.js"
  },
  "/assets/index-BS8LaVwq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-t5XQU5J7Q7LA35KemKnOWhclYIM"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 172647,
    "path": "../public/assets/index-BS8LaVwq.js"
  },
  "/assets/index-DeHBwZok.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-q2AfODjVqZ6Fn3O+n/Rb5ZQkqUs"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 290228,
    "path": "../public/assets/index-DeHBwZok.js"
  },
  "/assets/layers-DlHDPtnr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-XorfJwYXy0m0KjNp9/BTiLY6xos"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 422,
    "path": "../public/assets/layers-DlHDPtnr.js"
  },
  "/assets/key-round-DMZAiX4s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15f-0Rw+wg2XJ8WrfRzFVcj24F98XUw"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 351,
    "path": "../public/assets/key-round-DMZAiX4s.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-8IQGjwZU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-LVJbHD2s9VK0SohDMgVHFJeOoaE"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 303,
    "path": "../public/assets/list-8IQGjwZU.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/leaflet-src-Cy-y6roZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-Pnak6lS2HjgE/pGT+5ElLU98wZo"',
    "mtime": "2026-08-27T11:54:50.845Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Cy-y6roZ.js"
  },
  "/assets/maximize-2-CmabbDbM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-P8Nc4pyr8Rd29dLua3sjspwXj0I"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 914,
    "path": "../public/assets/maximize-2-CmabbDbM.js"
  },
  "/assets/index-DT-1mctZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"edb33-LyFsmlUBjCYnG5BZLrCv57Hk9m8"',
    "mtime": "2026-08-27T11:54:50.845Z",
    "size": 973619,
    "path": "../public/assets/index-DT-1mctZ.js"
  },
  "/assets/message-square-DigDZI3K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e5-qC49WzAkF75WgKuUX0rOaH4m/uA"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 229,
    "path": "../public/assets/message-square-DigDZI3K.js"
  },
  "/assets/navigation-Dv_yZNNk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-+4rmKRNtwarAlveFy3I416ca/u0"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 149,
    "path": "../public/assets/navigation-Dv_yZNNk.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T11:54:50.824Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-CPpJk-Rp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-aTT9FvfvpubkSAW6LvnPIH3UuuQ"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 974,
    "path": "../public/assets/news._slug-CPpJk-Rp.js"
  },
  "/assets/news._slug-CO_CARfv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-aPwX6kssqPtjOd70gmpY7jb/NDc"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 4523,
    "path": "../public/assets/news._slug-CO_CARfv.js"
  },
  "/assets/PageBreadcrumbs-Cdsyf-oK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-jVCdokKqOWWZnhdSfzf1qfJQMZI"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-Cdsyf-oK.js"
  },
  "/assets/pen-line-dSvVL4Ja.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-XVIMUx0bVpD+feelG1/zq90vwqI"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 1022,
    "path": "../public/assets/pen-line-dSvVL4Ja.js"
  },
  "/assets/pencil-CJnfUV5n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-Q2Wl324jP2mqDgeM04HJ3VG/6hA"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 277,
    "path": "../public/assets/pencil-CJnfUV5n.js"
  },
  "/assets/plus-Dz91LjEg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-jaFXPPAHkwv7baC6Xv9B4Jnku3c"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 149,
    "path": "../public/assets/plus-Dz91LjEg.js"
  },
  "/assets/PostCard-C7Prtj1c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-i1OcYrkiPyECrO4joyjGHIGm3a8"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 3935,
    "path": "../public/assets/PostCard-C7Prtj1c.js"
  },
  "/assets/PostEditor-CUHczRAn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd26-0IhDlqwtD6N8QTqkf5bAKskcclw"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 48422,
    "path": "../public/assets/PostEditor-CUHczRAn.js"
  },
  "/assets/radio-DkW1tO8E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-IRE7gxY82SK7/s1DH2dF7n2SjX8"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 375,
    "path": "../public/assets/radio-DkW1tO8E.js"
  },
  "/assets/privacy-policy-g1BdbCYy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6fd-0RfZhfYqJYUJibF79yKWl7wtwIk"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 1789,
    "path": "../public/assets/privacy-policy-g1BdbCYy.js"
  },
  "/assets/refresh-cw-LUOiXa0p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13d-Nh0GSYZQCZoW6H52M2nVkdzQ0jc"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 317,
    "path": "../public/assets/refresh-cw-LUOiXa0p.js"
  },
  "/assets/route-DMvWoyiE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-c4pfog8/QRZoxV8qtv4QE67klgE"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 95,
    "path": "../public/assets/route-DMvWoyiE.js"
  },
  "/assets/save-CG7zrz0M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-WpCjSiLNrRtbRaQchhzR6eGk6xQ"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 328,
    "path": "../public/assets/save-CG7zrz0M.js"
  },
  "/assets/scale-CDbrb2t4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-iPNs7kxk0OcTY8HkYKPUkL4O0qw"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 333,
    "path": "../public/assets/scale-CDbrb2t4.js"
  },
  "/assets/settings-BDLSGnJu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e3-AdbPfv1Jf1t8q+f3As3QQpc76LI"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 483,
    "path": "../public/assets/settings-BDLSGnJu.js"
  },
  "/assets/share-2-DmzL4i2q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-i0JTe0qmJm0DkYfbe7eySY7XzGQ"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 358,
    "path": "../public/assets/share-2-DmzL4i2q.js"
  },
  "/assets/shield-C2W4IiAw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10c-a2NHt/oSbGjUUNeLueI5KYmKxWM"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 268,
    "path": "../public/assets/shield-C2W4IiAw.js"
  },
  "/assets/shield-check-B5k1hjI6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13c-WP7Twch+AsZlpcWuzhyNqTlxtXk"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 316,
    "path": "../public/assets/shield-check-B5k1hjI6.js"
  },
  "/assets/star-BhSmDAlc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-T//phu/90ij/TfobXuKETpdZu60"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 473,
    "path": "../public/assets/star-BhSmDAlc.js"
  },
  "/assets/styles-EoqEBTWo.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"28f75-NmaE7KGSb8OU7tD45g4vMFcpObg"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 167797,
    "path": "../public/assets/styles-EoqEBTWo.css"
  },
  "/assets/topics._slug-zUgLlEFk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"867-ST2eFdHYMU3ti8Whdgu+J20sO1Y"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 2151,
    "path": "../public/assets/topics._slug-zUgLlEFk.js"
  },
  "/assets/trash-2-ME9Y_Yny.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-L+GP4r0kHdQ1ksrjRydTahqDoTc"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 329,
    "path": "../public/assets/trash-2-ME9Y_Yny.js"
  },
  "/assets/TranslatedMarkdown-DSc-Ps0z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-stfWyqpK9lqKXo3MNZ3kzx5Fq8w"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-DSc-Ps0z.js"
  },
  "/assets/triangle-alert-C8k2ErG2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"105-BMWejlH4tpThKNRLl3jdmG9mSCw"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 261,
    "path": "../public/assets/triangle-alert-C8k2ErG2.js"
  },
  "/assets/upload-CijoeG7k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-1fGN2XaDN7J7fEIx8+zWc0pZxZ0"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 231,
    "path": "../public/assets/upload-CijoeG7k.js"
  },
  "/assets/useMutation-hcEI9IYC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-G6jDmQ5lXrQqjZ29w2IEBQMU9E0"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 2211,
    "path": "../public/assets/useMutation-hcEI9IYC.js"
  },
  "/assets/users-CM3bT6rt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-cMzrKtFX6oL8LVIseXLTgXIvvfw"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 302,
    "path": "../public/assets/users-CM3bT6rt.js"
  },
  "/assets/useSuspenseQuery-C2lpvu39.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-gO2kpWKNRV50CQGMAulPwf4gP6Y"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-C2lpvu39.js"
  },
  "/assets/utils-DoeY0Hx_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-X8pvb37qjkPNZ5xtzi0PIG/KJDo"',
    "mtime": "2026-08-27T11:54:50.837Z",
    "size": 59982,
    "path": "../public/assets/utils-DoeY0Hx_.js"
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
