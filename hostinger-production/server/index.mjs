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
  "/assets/about-QJ_4ZhSW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-OLxi0C6RkuviZc+XTNIESTmPRqs"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 3398,
    "path": "../public/assets/about-QJ_4ZhSW.js"
  },
  "/assets/account-DqD-nLyV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-JdAlsMewCpde2zin/TH5uoV8Q9w"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 2068,
    "path": "../public/assets/account-DqD-nLyV.js"
  },
  "/assets/admin-2J8xKS_f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-IDfIx2JkG+ekBz6oYsa4xp44USc"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 2555,
    "path": "../public/assets/admin-2J8xKS_f.js"
  },
  "/assets/admin.categories-BRJzw1Ox.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-45fKJ8JvYid12NgDOk6FER/0UsY"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-BRJzw1Ox.js"
  },
  "/assets/admin.comments-CRGV9gxC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-lkme0UabGJ5a7PB965Pt8aNPn4M"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-CRGV9gxC.js"
  },
  "/assets/admin.destinations-m4OGexVC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-gNGza+mU+mX+dkeIm9ibyGc5voE"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-m4OGexVC.js"
  },
  "/assets/admin.gallery-Cvz3NY6c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-Kp/E8xRInp2GHNIVlDNNp0jmRxU"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-Cvz3NY6c.js"
  },
  "/assets/admin.analytics-BZjhOeuS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-BvPTxcpkaYBmjjn17mpHGYO4GOI"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-BZjhOeuS.js"
  },
  "/assets/admin.homepage-f2Ww4qcZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-7x5u4+fGJKavDcOrWNpb82CzjOc"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-f2Ww4qcZ.js"
  },
  "/assets/admin.index-rEsTf7-W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-PoT9SjlsrQXsUYkUevDkbiPKmGg"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 4075,
    "path": "../public/assets/admin.index-rEsTf7-W.js"
  },
  "/assets/admin.messages-Delh4ejr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-WK6SJT7uqGjnpPObEVq0sTRFsT0"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-Delh4ejr.js"
  },
  "/assets/admin.news-CxjLzLsg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-s2Vw06KdRVD5dCwN7wMXmKhNfUc"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 34492,
    "path": "../public/assets/admin.news-CxjLzLsg.js"
  },
  "/assets/admin.posts.index-BZSja4r1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-aru7yOqZrQx1fNoB1XsNZTQMiqE"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-BZSja4r1.js"
  },
  "/assets/admin.posts.new-Be2ZDHWn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-LJcefrmZ9gARFj9VgKz8kil2ROw"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-Be2ZDHWn.js"
  },
  "/assets/admin.posts._id-JyFWbomy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-rsJ/KpEJtqiE0Ky6j+l3iGN0jVA"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-JyFWbomy.js"
  },
  "/assets/admin.public-message-exSeriWF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-MKp9MpmQKd05r79xQXGYqw5qxR8"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-exSeriWF.js"
  },
  "/assets/admin.settings-Cj7Qy6rv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ebd-0oWgctK6D3auOJ/0uMM8W6ab2UI"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 16061,
    "path": "../public/assets/admin.settings-Cj7Qy6rv.js"
  },
  "/assets/admin.subscribers-F0Du-GAm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-2RNm+iHyQHTEJ57ZjOTuEw7HISM"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-F0Du-GAm.js"
  },
  "/assets/AdSlot-CCM4tW9H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-ohREbO7qz2Jpczqt/7k/20hrc34"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-CCM4tW9H.js"
  },
  "/assets/alert-dialog-D90reBAo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-liX9xUYhYyCHnyz0NHv6OfhrrxE"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-D90reBAo.js"
  },
  "/assets/arrow-left-C0bcXLNR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-R8VWkEr7G8Fgt9cqjZRdBfGOyWI"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 166,
    "path": "../public/assets/arrow-left-C0bcXLNR.js"
  },
  "/assets/arrow-up-right-AgoZp48Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-zUSrg2W7VgfsJTQsHCfIHm/kIXg"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-AgoZp48Z.js"
  },
  "/assets/auth-BY8VG_Yz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-EKVu+9B5vbRjYQ2BUIF7d7jfUVw"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 8188,
    "path": "../public/assets/auth-BY8VG_Yz.js"
  },
  "/assets/blog-CiX6M42J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-qAkSIPV81dlBN8wQlnu9yhkMkNE"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 103,
    "path": "../public/assets/blog-CiX6M42J.js"
  },
  "/assets/blog.index-CEyR7DSz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28be-+N4U6DjUosGxhsZaSJvUh6TpxVw"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 10430,
    "path": "../public/assets/blog.index-CEyR7DSz.js"
  },
  "/assets/blog._slug-C6uJ5jla.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-ujmQGwb8RIJ7SEFGRiYGmERpMOo"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 572,
    "path": "../public/assets/blog._slug-C6uJ5jla.js"
  },
  "/assets/blog._slug-D9ebDvOk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"73d0-k/rovIO1S/CSgasmyp1u7YS/3RE"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 29648,
    "path": "../public/assets/blog._slug-D9ebDvOk.js"
  },
  "/assets/book-open-VIMK4uAs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-Zx8y9f7JEtGohS3SxKhckGQT3lQ"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 280,
    "path": "../public/assets/book-open-VIMK4uAs.js"
  },
  "/assets/calendar-B5rEsSDq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-DsF4zUHkc2OKOF81U5r8IB5kbFo"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 258,
    "path": "../public/assets/calendar-B5rEsSDq.js"
  },
  "/assets/category._slug-W5h1dvQK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-7ZyLYELdq2JYyAWQAhhHTxb5d10"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 3842,
    "path": "../public/assets/category._slug-W5h1dvQK.js"
  },
  "/assets/chart-column-C10p6Atk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-wO0z7uKSZgkIQ9otp1/llysH19M"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 252,
    "path": "../public/assets/chart-column-C10p6Atk.js"
  },
  "/assets/check-Dg-tQoXu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-s9Rf1fv39zNpfygAirBnyvK3VpA"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 125,
    "path": "../public/assets/check-Dg-tQoXu.js"
  },
  "/assets/chevron-left-BepRt_tl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-S2giRyrLl/cUKmP8Wuau6UK8P9o"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 131,
    "path": "../public/assets/chevron-left-BepRt_tl.js"
  },
  "/assets/chevron-right-D2VtrCXT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-8mjlItS0tGr4uIt4IMcj1IFgwTc"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 131,
    "path": "../public/assets/chevron-right-D2VtrCXT.js"
  },
  "/assets/circle-check-BYWiPLuk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-edcG329MN9N31X2R4/Msh8gh0BI"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 179,
    "path": "../public/assets/circle-check-BYWiPLuk.js"
  },
  "/assets/clock-PXbF51Lh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-gHcll7MaiXS+REJzMqMdm6t6haQ"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 170,
    "path": "../public/assets/clock-PXbF51Lh.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-yCjDnBy7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-yMSP0PUYTCHRfS6uw2IMiMt8rDE"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 14845,
    "path": "../public/assets/contact-yCjDnBy7.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-CIoU53OL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-+u18/l/GLKwO6cEqKdaROI+BOdU"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 103,
    "path": "../public/assets/destinations-CIoU53OL.js"
  },
  "/assets/destinations.index-Satfpo4w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-nC9BKxtHh9vmzTGyOtrjLQF53dM"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-Satfpo4w.js"
  },
  "/assets/destinations._slug-CXdFgu_v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-ZjGZTTAEdEOY3owoJCybM4V+DZ8"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-CXdFgu_v.js"
  },
  "/assets/destinations._slug-oQrvhb9Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-HRHO1gvvpj/QctsaISO406Bo8x4"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-oQrvhb9Y.js"
  },
  "/assets/DestinationsMap-0mCV3jvP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-lFuChdVBeEYxHEf+ztG7EyDlIjI"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-0mCV3jvP.js"
  },
  "/assets/dialog-ZFRZmrOi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-7r89XsBAN/Lu6HSyq4KoAiRvG3k"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 1830,
    "path": "../public/assets/dialog-ZFRZmrOi.js"
  },
  "/assets/earth-DAF1fmGV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-SQzP/kygCA5AIb7EDj2FO2SV/y8"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 394,
    "path": "../public/assets/earth-DAF1fmGV.js"
  },
  "/assets/external-link-BlKGC-vW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-+v3Sp9tvpwTEE3T+6ERs6QvCpb0"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 252,
    "path": "../public/assets/external-link-BlKGC-vW.js"
  },
  "/assets/eye-DCrEs1V-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-W+8c5zN9R+IUQ0Uc3yAz8K8Yla8"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 257,
    "path": "../public/assets/eye-DCrEs1V-.js"
  },
  "/assets/flame-Ztx21csx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-NL63qj95R/wCFySR6/7slQJjOew"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 200,
    "path": "../public/assets/flame-Ztx21csx.js"
  },
  "/assets/folder-tree-D4rASKB-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-zU87KkeOo7hxHmoApP/5v6+sZ4g"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 480,
    "path": "../public/assets/folder-tree-D4rASKB-.js"
  },
  "/assets/geocoding.functions-Bhcl2dn1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-kkmpgsqMmE4NvXTusnguZJSpn+E"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-Bhcl2dn1.js"
  },
  "/assets/house-JJuFIymO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-cxTlIyoCNQAqUofJKpHssrXGYt0"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 282,
    "path": "../public/assets/house-JJuFIymO.js"
  },
  "/assets/gallery-BdsyWgbR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-B23ZG0CINuIJzRPOQsAknlahWc4"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 6285,
    "path": "../public/assets/gallery-BdsyWgbR.js"
  },
  "/assets/image-DDcOeQRU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-SM2T36/shGopXqrjO3dlrGVF2z8"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 270,
    "path": "../public/assets/image-DDcOeQRU.js"
  },
  "/assets/index-CSYaTqOk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-+Zxmva55OOwOGBvPYlI5SIl6AK4"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 172647,
    "path": "../public/assets/index-CSYaTqOk.js"
  },
  "/assets/key-round-Cxrmmmxy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-r1kS4fqhXlNSHEF7dwr/qFYIwP8"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 356,
    "path": "../public/assets/key-round-Cxrmmmxy.js"
  },
  "/assets/layers-BxnvZPSe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-xywrkQqZLnhJ7kr/lZQSO9CZt5g"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 422,
    "path": "../public/assets/layers-BxnvZPSe.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-Czhc7OR8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-Zh5s6FqSqzYh5QweZwsp/XYMyj4"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 290228,
    "path": "../public/assets/index-Czhc7OR8.js"
  },
  "/assets/list-CnoCxHNp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-NjK8foNHunOLZyIN17idyJLnuTw"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 303,
    "path": "../public/assets/list-CnoCxHNp.js"
  },
  "/assets/leaflet-src-DaNTBawV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-e/6isiYrXafMXfSzbPsCEx4PnXk"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-DaNTBawV.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-DeRe5YF4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-sdKG0nkR5DcyFh9UVhbOIunuN0w"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 914,
    "path": "../public/assets/maximize-2-DeRe5YF4.js"
  },
  "/assets/message-square-et-SRIHO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-cRgoKLtusd/M1rxBfNpi0Kfc/O4"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 234,
    "path": "../public/assets/message-square-et-SRIHO.js"
  },
  "/assets/navigation-_4ErN421.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-TMm48et6gvsLpLh2E7Fz0m0SDb0"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 149,
    "path": "../public/assets/navigation-_4ErN421.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T04:28:51.123Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T04:28:51.094Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-BpGSKwEQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-UOmV5636dl7jfXr0Uz841Jr76+Q"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 974,
    "path": "../public/assets/news._slug-BpGSKwEQ.js"
  },
  "/assets/index-DZiXULYa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8195-XE4r0cqd7EJlNJfCoOffhoxhZ9U"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 950677,
    "path": "../public/assets/index-DZiXULYa.js"
  },
  "/assets/news._slug-Dl2arli4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-ffVVQn0aEOSkh37k4HVjyD2Efgc"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 4523,
    "path": "../public/assets/news._slug-Dl2arli4.js"
  },
  "/assets/PageBreadcrumbs-neqyNxPb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-vKLqP/Fi6w3LPZJoVIIb0lpxEzk"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-neqyNxPb.js"
  },
  "/assets/pencil-UgDe9wZ5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-LGelk6a8m9yH4CTLYmKeqjs8dCU"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 277,
    "path": "../public/assets/pencil-UgDe9wZ5.js"
  },
  "/assets/plus-DaSzXR7r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-ryWOGpHd+4HdPPh26NLgNX+7t1Y"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 154,
    "path": "../public/assets/plus-DaSzXR7r.js"
  },
  "/assets/PostCard-BoEE-7CB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f69-WiQneTlv7wtsAXbChpehk3CkTmA"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 3945,
    "path": "../public/assets/PostCard-BoEE-7CB.js"
  },
  "/assets/PostEditor-Ds9GgIZa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b13b-YLOkMgNUWo4t7EpOUKFoNuHYNEk"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 45371,
    "path": "../public/assets/PostEditor-Ds9GgIZa.js"
  },
  "/assets/radio-BwTmC5Az.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-20Rv8S+cOuv2uW4RSEIixLzY2Ss"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 375,
    "path": "../public/assets/radio-BwTmC5Az.js"
  },
  "/assets/refresh-cw-BZw5y-pi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-0qYu8s73s28QthZiO+7I9ftnRQM"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-BZw5y-pi.js"
  },
  "/assets/route-kDrVMsKC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-DRimDWuBQkTp5GL7U5ytsufdUNU"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 95,
    "path": "../public/assets/route-kDrVMsKC.js"
  },
  "/assets/save-RGQG1TOb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-th0XUFUfQh6R724M1LiK/iVT0CY"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 328,
    "path": "../public/assets/save-RGQG1TOb.js"
  },
  "/assets/settings-Cb5uOr5A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-C8OcA4vHRQUH99nfogBiye2goSU"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 488,
    "path": "../public/assets/settings-Cb5uOr5A.js"
  },
  "/assets/share-2-BXRRLAh-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-lTajTUC9NOC+n/yTDmtwRyiUDow"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 358,
    "path": "../public/assets/share-2-BXRRLAh-.js"
  },
  "/assets/shield-B6QSW_F9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-hRiY7/T8YwEwjBjIi0OYr6UqnUc"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 273,
    "path": "../public/assets/shield-B6QSW_F9.js"
  },
  "/assets/shield-check-BW_Cr82F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-QCxaMEt1SoqPGxfOqIn7i+8ipBM"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 321,
    "path": "../public/assets/shield-check-BW_Cr82F.js"
  },
  "/assets/star-ClrHy6Oh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-6rNCpvelUCNcEX0m2i9DhetIBUY"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 473,
    "path": "../public/assets/star-ClrHy6Oh.js"
  },
  "/assets/topics._slug-B0Bmsd99.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-uhPpQxuvs7mPoevIOZHLHVR7dgs"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-B0Bmsd99.js"
  },
  "/assets/trash-2-D2yJ7p59.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-3xpNKCIDegXi6k9VwWa44kwc28M"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 329,
    "path": "../public/assets/trash-2-D2yJ7p59.js"
  },
  "/assets/styles-DTOQa7QP.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"28c66-SSgux0TqABMBtwhCM5SB121PAAk"',
    "mtime": "2026-08-27T04:28:51.123Z",
    "size": 167014,
    "path": "../public/assets/styles-DTOQa7QP.css"
  },
  "/assets/triangle-alert-DBoWKdIV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-ZRc3AlooRJxw1vnkRkdvj34K8yw"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-DBoWKdIV.js"
  },
  "/assets/upload-C6Ey_8kN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-tpdKNOjKebIfBotawsbUfFsNOdw"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 231,
    "path": "../public/assets/upload-C6Ey_8kN.js"
  },
  "/assets/useMutation-BNlKdmMu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-xHZ1Xq9Yrl9k4bNrAIHsPJCXzl0"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 2211,
    "path": "../public/assets/useMutation-BNlKdmMu.js"
  },
  "/assets/users-BRDjRNdQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-Q+DPE2u3MKxgky4IjfLuvzxtugM"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 307,
    "path": "../public/assets/users-BRDjRNdQ.js"
  },
  "/assets/useSuspenseQuery-BULAIGXp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-k3c5YbtDifJ8liY0rm09yeH30T4"',
    "mtime": "2026-08-27T04:28:51.125Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-BULAIGXp.js"
  },
  "/assets/utils-CHn9XKAI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-Jbx33RBpz657un0orpTDa5XO/k0"',
    "mtime": "2026-08-27T04:28:51.128Z",
    "size": 59982,
    "path": "../public/assets/utils-CHn9XKAI.js"
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
