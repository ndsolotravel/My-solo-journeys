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
  "/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/author-hussain.jpg"
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
  "/assets/account-C0h73wfT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-otrlch3CggsSrQYolVkJFQIzv9c"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 2068,
    "path": "../public/assets/account-C0h73wfT.js"
  },
  "/assets/about-CK1051-9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-f3up8nBc09JY4/lIPng3iuluCjo"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 3398,
    "path": "../public/assets/about-CK1051-9.js"
  },
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
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
  "/assets/admin-BTYhMrkI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-QmR+TLQFZHqKMKIJQRUSSCbcXUk"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 2555,
    "path": "../public/assets/admin-BTYhMrkI.js"
  },
  "/assets/admin.categories-DXrhO7T7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-2EvijmDL034u9qMhJoRrEMbGKqo"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-DXrhO7T7.js"
  },
  "/assets/admin.comments-DrjnQDdw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-+Oa6aIk2xgen3CS6VMP5MP6U7Sk"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-DrjnQDdw.js"
  },
  "/assets/admin.destinations-B9tnz02v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-+tpmcebn/SpuIlACzHWVXD+2rZ0"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-B9tnz02v.js"
  },
  "/assets/admin.gallery-XPJhn86T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-l+FmwAopsdI1t1eby1vgxgNUuFs"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-XPJhn86T.js"
  },
  "/assets/admin.homepage-f_erZ5Nf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-geN+vTa5LHJG7CfpzIg2Gx/cZbQ"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-f_erZ5Nf.js"
  },
  "/assets/admin.index-Db6Z86K6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-Bb+ZQc9Co9y2srXILNm8aL6yghw"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 4075,
    "path": "../public/assets/admin.index-Db6Z86K6.js"
  },
  "/assets/admin.messages-LNaW9UYC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-i4F7m1n2ApbWJdQO3PRGVNOow6Q"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-LNaW9UYC.js"
  },
  "/assets/admin.posts.index-BIqhMNTG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-o2f5sdZQV95FPwUkmjCPNOm4N3w"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-BIqhMNTG.js"
  },
  "/assets/admin.news-DroOeR1N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-JnwN65mhxnPNCSboPmpRrriBTWs"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 34492,
    "path": "../public/assets/admin.news-DroOeR1N.js"
  },
  "/assets/admin.posts.new-C8e0LAfU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-XVKIVo+Mi8mIp+id3KhaEsLM8X0"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-C8e0LAfU.js"
  },
  "/assets/admin.posts._id-CtJCxfwV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-z2JvLGl/1W1MZ+6SYTDLWu5IS8o"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-CtJCxfwV.js"
  },
  "/assets/admin.public-message-CQX8hHqe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-CNA8x3p+faQic/vwOofLsSw2ZwU"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-CQX8hHqe.js"
  },
  "/assets/admin.analytics-Bwrk-Ucl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-8I8GUj6rDhDcc6uk+TjRLwPJExA"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-Bwrk-Ucl.js"
  },
  "/assets/admin.settings-BGQ5HJ9Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3eb4-tx03qOeibcxYoVpChYhTuboOMBI"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 16052,
    "path": "../public/assets/admin.settings-BGQ5HJ9Q.js"
  },
  "/assets/admin.subscribers-BNZA-WVU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-PtnU8A2pmLa2j64r4r+RJLD2Etc"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-BNZA-WVU.js"
  },
  "/assets/AdSlot-DrA1kjiV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-sfyhEk/bqAchkyls4TsDDSOIKtY"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-DrA1kjiV.js"
  },
  "/assets/alert-dialog-DEEfPnZ5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-CvoqPECRHPWCYd6sgia6mITRIG0"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-DEEfPnZ5.js"
  },
  "/assets/arrow-up-right-BXN5CNyo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-rj0Uznx8le3eTfughOkeZT275nE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-BXN5CNyo.js"
  },
  "/assets/arrow-left-jG74_DWg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-byUkx7gOVPnaOGvF548R9nK6eCE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 166,
    "path": "../public/assets/arrow-left-jG74_DWg.js"
  },
  "/assets/auth-D0TY-B_-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-J8o4IqRDH1HTqkuPNx4Ni02/+Z8"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 8188,
    "path": "../public/assets/auth-D0TY-B_-.js"
  },
  "/assets/blog-H9CgHiqL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-HAbbq0lOKsbpxW26TiUhW964GEQ"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 103,
    "path": "../public/assets/blog-H9CgHiqL.js"
  },
  "/assets/blog.index-DOm0mq6Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28be-g8upkh9/9WPA5yft4uHOxuCH3Ek"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 10430,
    "path": "../public/assets/blog.index-DOm0mq6Z.js"
  },
  "/assets/blog._slug-B5VugALu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6c41-hWteJYs1UNDX5NxicQGJZJgpnWY"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 27713,
    "path": "../public/assets/blog._slug-B5VugALu.js"
  },
  "/assets/blog._slug-NvA6jOHI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-tRxuHNqUq0eyAHIebslENEeGnDo"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 572,
    "path": "../public/assets/blog._slug-NvA6jOHI.js"
  },
  "/assets/book-open-BQLXT0Q9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-2FpyYMJKSJmCLKtDemJQp2nDiJc"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 280,
    "path": "../public/assets/book-open-BQLXT0Q9.js"
  },
  "/assets/calendar-D0b4k6G-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-0BGmQNz6S/zEts239E8XAL1Xfcc"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 258,
    "path": "../public/assets/calendar-D0b4k6G-.js"
  },
  "/assets/category._slug-Dc_sDAWu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-Lr9bBJwvLTtsExLR8rTh8feByR4"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 3842,
    "path": "../public/assets/category._slug-Dc_sDAWu.js"
  },
  "/assets/chart-column-C-EBc9xx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-6SrXlGR/xxj71SD2VRkQWRizYmY"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 252,
    "path": "../public/assets/chart-column-C-EBc9xx.js"
  },
  "/assets/check-HHGmiA1o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-qpfSew2+aa7G75P3nLu2U0C1PvU"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 125,
    "path": "../public/assets/check-HHGmiA1o.js"
  },
  "/assets/chevron-left-KBI6APCK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-yLiOpEB0zt04N3P6a/Lhk6ewf5c"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 131,
    "path": "../public/assets/chevron-left-KBI6APCK.js"
  },
  "/assets/chevron-right-7YGZWO04.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-8Z4rdqozsgM6fx7npUvpEBVHjzI"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 131,
    "path": "../public/assets/chevron-right-7YGZWO04.js"
  },
  "/assets/circle-check-CKABA9oq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-skqLd2Dg5Dd6u2IbySoi9jEjM4Y"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 179,
    "path": "../public/assets/circle-check-CKABA9oq.js"
  },
  "/assets/clock-BDM_D01G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-r9fo+KLfYSYTO7kT7/16Lpccf4g"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 170,
    "path": "../public/assets/clock-BDM_D01G.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-d8aaRQVM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-+C68JD10Jlca2wf1/fVHX39WXgE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 14845,
    "path": "../public/assets/contact-d8aaRQVM.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-DJFH97bl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-da5vwc882IDV5aNI6I9nTU6cNMw"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 103,
    "path": "../public/assets/destinations-DJFH97bl.js"
  },
  "/assets/destinations.index-DSuagWoT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-V3yGJQGDSL1yqBDiaeEQUD1fLQk"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-DSuagWoT.js"
  },
  "/assets/destinations._slug-C-IKks9C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-kPJ2MCs+ZU4nnLj7sPWn52DiZAY"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-C-IKks9C.js"
  },
  "/assets/destinations._slug-CoSJTLfs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-Xz9/oT6fD8pRZUsi6ALImf8eSX8"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-CoSJTLfs.js"
  },
  "/assets/DestinationsMap-DrAGrMIL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-3c4BOPdfNbNM4YOSO5I73BRedMA"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-DrAGrMIL.js"
  },
  "/assets/dialog-Crrj4oh_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-p+CTugiN+FIxiZcQUHidpzLfqLo"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 1830,
    "path": "../public/assets/dialog-Crrj4oh_.js"
  },
  "/assets/earth-Ep81-zr_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-5T8JUZ0IX/HhQ2MKEoq5ue2RKbA"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 394,
    "path": "../public/assets/earth-Ep81-zr_.js"
  },
  "/assets/external-link-bDPOnFQq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-nnlINV2z1xUQFZBjwSbAmB3wUXU"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 252,
    "path": "../public/assets/external-link-bDPOnFQq.js"
  },
  "/assets/eye-DYk2gC2C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-A0SzcvscyilNc+6FQbKDLMSdgyA"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 257,
    "path": "../public/assets/eye-DYk2gC2C.js"
  },
  "/assets/flame-BqgbyaiK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-9KSe8FEam+RhkHghmzf3GNzUCLk"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 200,
    "path": "../public/assets/flame-BqgbyaiK.js"
  },
  "/assets/folder-tree-D5QMnbnK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-fFsIh4amYPrmfy0pufArr6ivQWY"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 480,
    "path": "../public/assets/folder-tree-D5QMnbnK.js"
  },
  "/assets/gallery-A_qTE30Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-FL1vhch24GBIa2rU4pX1656NZOE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 6285,
    "path": "../public/assets/gallery-A_qTE30Q.js"
  },
  "/assets/geocoding.functions-By7XRays.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-b4MwT2ihfZ51oM1FOTrYt0s0wkE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-By7XRays.js"
  },
  "/assets/house-Dom9qV4i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-Tshqj+wMHEWMlSEdBahc6vOUg0s"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 282,
    "path": "../public/assets/house-Dom9qV4i.js"
  },
  "/assets/image-BQHCh9hb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-J33fIE7pJ1fXx6UXlbHUQnRx6ZM"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 270,
    "path": "../public/assets/image-BQHCh9hb.js"
  },
  "/assets/index-DycKUgKo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-ZFXaP0t7GDot2c36G4qZ7XEgD68"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 172647,
    "path": "../public/assets/index-DycKUgKo.js"
  },
  "/assets/key-round-Dq_TjlFj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-JOvmptMpwiut2eMJy4h2Kmk1UHs"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 356,
    "path": "../public/assets/key-round-Dq_TjlFj.js"
  },
  "/assets/index-CW7bBJEB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-Q+QO8O8Qtbydbg+A/eUG0pj2xnE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 290228,
    "path": "../public/assets/index-CW7bBJEB.js"
  },
  "/assets/layers-CBHXECBl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-gdQyRh6BnTIAIWSvAGhyGwXNXus"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 422,
    "path": "../public/assets/layers-CBHXECBl.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-Vq9ckh_g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-PTEzb1NDjXM3AOCRkmKydmv8xeE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 303,
    "path": "../public/assets/list-Vq9ckh_g.js"
  },
  "/assets/leaflet-src-KEkqcqUM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-MxWebfbo81aOauIvq4sHXCKXjLE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-KEkqcqUM.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-DRv5yNHm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-HyKFGoN55WQOFpap6H7p5hTyPKA"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 914,
    "path": "../public/assets/maximize-2-DRv5yNHm.js"
  },
  "/assets/message-square-Bd-hx77t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-6Vx+YuvpKsYYzewv3hd4Wc853wY"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 234,
    "path": "../public/assets/message-square-Bd-hx77t.js"
  },
  "/assets/navigation-tHN2pkjC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-wKpUQVcl0eh3a61npVTpb0iI9yE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 149,
    "path": "../public/assets/navigation-tHN2pkjC.js"
  },
  "/assets/index-MMKy20QZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8195-sY9uo9LwUeIdKAvyM2ZQOMxs4oc"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 950677,
    "path": "../public/assets/index-MMKy20QZ.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/PageBreadcrumbs-CeXvYSpV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-GuTsS2EVV3y9kjIOQoMAnPY/3yA"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-CeXvYSpV.js"
  },
  "/assets/news._slug-ChSEQApe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-6vhU382Vm11iyuy1eHZQWHpZzOs"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 974,
    "path": "../public/assets/news._slug-ChSEQApe.js"
  },
  "/assets/news._slug-DDhOTEKB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-nMIGZM6+11RS4AU06Ek4EsrxpBw"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 4523,
    "path": "../public/assets/news._slug-DDhOTEKB.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T10:45:05.061Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/plus-Ct4qPWDj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-zJs0EpvAM8jrlq54MdiPloN+8s0"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 154,
    "path": "../public/assets/plus-Ct4qPWDj.js"
  },
  "/assets/pencil-CBTY9M4G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-5bAoUiLzYULW808x/1lWewS0u18"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 277,
    "path": "../public/assets/pencil-CBTY9M4G.js"
  },
  "/assets/PostCard-BFZIBqf0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f69-n82CgLjfNlaWfapt/pSjBYYSO4c"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 3945,
    "path": "../public/assets/PostCard-BFZIBqf0.js"
  },
  "/assets/radio-B0Zdb7EB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-B7epoZWChVMFNm9wmHcxWrRG46M"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 375,
    "path": "../public/assets/radio-B0Zdb7EB.js"
  },
  "/assets/PostEditor-DmjWSCtE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c097-tlxfPRd/JHXKQ39c6IRf+wwDCjE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 49303,
    "path": "../public/assets/PostEditor-DmjWSCtE.js"
  },
  "/assets/route-BZZQml_g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-Z1GWIw4kLqSMlhPkVvWQR3uncJU"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 95,
    "path": "../public/assets/route-BZZQml_g.js"
  },
  "/assets/refresh-cw-Dw-RiGj6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-B67/3/lNlW23v8sRlBqNW3TEf24"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-Dw-RiGj6.js"
  },
  "/assets/save-D8NPdfOh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-kcG4PtDzwPKP6IWwnXZZG4O1/Xo"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 328,
    "path": "../public/assets/save-D8NPdfOh.js"
  },
  "/assets/settings-DeHnRY39.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-CDRRewJfREw5/cWZBCys2f7HgoQ"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 488,
    "path": "../public/assets/settings-DeHnRY39.js"
  },
  "/assets/share-2-C3HE0TIL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-e6Vzf/Si3UbUfYFM4lzVCGB05r4"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 358,
    "path": "../public/assets/share-2-C3HE0TIL.js"
  },
  "/assets/shield-BD0173Iq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-FiSpCdh/m5xO9ywdyD43C8HszF4"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 273,
    "path": "../public/assets/shield-BD0173Iq.js"
  },
  "/assets/shield-check-2UUHznGi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-fZ0EJ9vUsoBs9tLHtEdJokeG0sc"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 321,
    "path": "../public/assets/shield-check-2UUHznGi.js"
  },
  "/assets/star-OeP3XmUR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-EEC8mGE85sPOPFb4K1+BXl/QzRY"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 473,
    "path": "../public/assets/star-OeP3XmUR.js"
  },
  "/assets/topics._slug-CaGskn3Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-AtOjJPNj9El9fiQQbfDePltZVZU"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-CaGskn3Z.js"
  },
  "/assets/styles-Dx1XDBPV.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"28c2c-RWEL8iubUuLL+W5UuDFbLd2DocQ"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 166956,
    "path": "../public/assets/styles-Dx1XDBPV.css"
  },
  "/assets/triangle-alert-PKbjVh_N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-UT7tHm2tCJnH6a2AOKI0T22P7KU"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-PKbjVh_N.js"
  },
  "/assets/trash-2-D6TvISwq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-jlFq+T6r7BQvgdFpaQUPXOE82mI"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 329,
    "path": "../public/assets/trash-2-D6TvISwq.js"
  },
  "/assets/upload-CBkkxsEo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-O+ykkXR4fUOCYUctuBa7IMIRj8c"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 231,
    "path": "../public/assets/upload-CBkkxsEo.js"
  },
  "/assets/useMutation-Cgje6DAf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-VBz3eZ2E741uEeMhHgYo9mKeCRE"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 2211,
    "path": "../public/assets/useMutation-Cgje6DAf.js"
  },
  "/assets/users-B4ha1fGu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-ybmT/l/11owCHzTF7zRHNlZcUDU"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 307,
    "path": "../public/assets/users-B4ha1fGu.js"
  },
  "/assets/useSuspenseQuery-CWFHvjw6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-ssEpwEV1FWe9oNjGuTOL7df08nQ"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-CWFHvjw6.js"
  },
  "/assets/utils-CSgeqhip.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-MA5qVvRMovef6d7Yp4t1SPvx5/w"',
    "mtime": "2026-08-27T10:45:05.079Z",
    "size": 59982,
    "path": "../public/assets/utils-CSgeqhip.js"
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
