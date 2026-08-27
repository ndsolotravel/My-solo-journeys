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
  "/assets/about-CS7bWmF9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-5hWx5OmTe9H6gXCj9PgxkFdeUdY"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 3398,
    "path": "../public/assets/about-CS7bWmF9.js"
  },
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
  },
  "/assets/account-BNaPraLa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-OXF1d5oZ1/83saM5VsWYoCQ7SiE"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 2068,
    "path": "../public/assets/account-BNaPraLa.js"
  },
  "/assets/admin-CNvvBYEq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-cu/PFMMF2G+3I8ghSPz8rnuw5eA"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 2555,
    "path": "../public/assets/admin-CNvvBYEq.js"
  },
  "/assets/admin.categories-B-_E0gxp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-7hOKAN60ie+S+KSL4fTf4xgGSU8"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-B-_E0gxp.js"
  },
  "/assets/admin.comments-CF5Md6PI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-lw5VNXmsT3umSdTnO4RjtbuJmnI"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-CF5Md6PI.js"
  },
  "/assets/admin.destinations-BP4WHipu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-thHwOEWn6597mnrxRznlWFKbe+Q"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-BP4WHipu.js"
  },
  "/assets/admin.analytics-tCR42Clj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-4uDSe/xhs7Y1iHLHfiiRSxvanHw"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-tCR42Clj.js"
  },
  "/assets/admin.gallery-RqnnI2_r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-mERXwQv45kf8oFneSQTGrZ1t+HA"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-RqnnI2_r.js"
  },
  "/assets/admin.homepage-BrHBOp_n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-04Wn1PV130Os27McwClW8g4Ox/4"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-BrHBOp_n.js"
  },
  "/assets/admin.index-BbQ8zpIS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-/UEnBZRAwrWEKvmOId6sit8eECc"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 4075,
    "path": "../public/assets/admin.index-BbQ8zpIS.js"
  },
  "/assets/admin.messages-BocohmI_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-R2RMB5hCsz2sb0jxAACXqDxV/LY"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-BocohmI_.js"
  },
  "/assets/admin.news-ahuW8GdL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-I4+cgexAFFvUq9QRYIhUxd/AfPM"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 34492,
    "path": "../public/assets/admin.news-ahuW8GdL.js"
  },
  "/assets/admin.posts.index-Dl1yT9zS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-qnwJ2e5T1xjy82F8XMHQtaV2NUQ"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-Dl1yT9zS.js"
  },
  "/assets/admin.posts.new-CgcBTCoZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-p6mUbuo9fFa5iiESglD0U9KJxvo"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-CgcBTCoZ.js"
  },
  "/assets/admin.posts._id-BRQJqczr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-Oa1G/lhyLMUJ6cEvAYp3K/qH3DI"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-BRQJqczr.js"
  },
  "/assets/admin.public-message-Ci-8lbxl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-G2FAzyiBqwmBd70LhDY5Lg99Uyc"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-Ci-8lbxl.js"
  },
  "/assets/admin.subscribers-DGYU2_8v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-+61nPLY7O5oohaUlGJ0Am595aGE"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-DGYU2_8v.js"
  },
  "/assets/AdSlot-BkyRYfVr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-u5cq0avApkcReL+oU8eTJdbXzM4"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-BkyRYfVr.js"
  },
  "/assets/arrow-left-Bm-ETyaz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-dP696kQk7Z7Agd5aWDYBE13ZqSs"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 166,
    "path": "../public/assets/arrow-left-Bm-ETyaz.js"
  },
  "/assets/admin.settings-CBkDzQZd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3eb4-jYcFoLQSf6yI+KpSWJIZrZrTMo4"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 16052,
    "path": "../public/assets/admin.settings-CBkDzQZd.js"
  },
  "/assets/alert-dialog-DiKVqGE-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-LK1dXfKRgc1Ug1w0hVQwnvmB6Xk"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-DiKVqGE-.js"
  },
  "/assets/arrow-up-right-XxdY72CB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-16pKkopAu5ifey7XMaa7vI/hNvM"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-XxdY72CB.js"
  },
  "/assets/auth-B7W2umKZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-ZMrvPhgSaWIKHf41MIUoN0WvTVg"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 8188,
    "path": "../public/assets/auth-B7W2umKZ.js"
  },
  "/assets/blog.index-JqTN0Juj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28be-kpaC33WC1pnLiEOiUuq1vUHv8wc"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 10430,
    "path": "../public/assets/blog.index-JqTN0Juj.js"
  },
  "/assets/blog-DgDAzTeC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-9vbDaY/ftUzdh9zCohrKqBT2L8A"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 103,
    "path": "../public/assets/blog-DgDAzTeC.js"
  },
  "/assets/book-open-CmQLS-e7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-oE0gLUIyTQbGnTyKJ1Y0IXz1eSc"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 280,
    "path": "../public/assets/book-open-CmQLS-e7.js"
  },
  "/assets/calendar-DpN00-Lt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-Kj5kdBsz94kdA/jLZVeG/w0Kq+c"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 258,
    "path": "../public/assets/calendar-DpN00-Lt.js"
  },
  "/assets/blog._slug-DszBu6Bv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-YvG+2ZFO/YdraufdEl/NMnPh+xU"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 572,
    "path": "../public/assets/blog._slug-DszBu6Bv.js"
  },
  "/assets/blog._slug-CrYuOPUY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6c41-q+8BobHD9nI3mkgtsyWA9EwZeyc"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 27713,
    "path": "../public/assets/blog._slug-CrYuOPUY.js"
  },
  "/assets/category._slug-DRNB9ubL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-UaTzAX2uOH9F4ir9BCsgolglkSM"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 3842,
    "path": "../public/assets/category._slug-DRNB9ubL.js"
  },
  "/assets/chart-column-DpkMriUE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-yLasC3m9JkYS3hAj94JGQbuQkbo"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 252,
    "path": "../public/assets/chart-column-DpkMriUE.js"
  },
  "/assets/chevron-left-BYgutTxd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-OWg0IVjfdxTOi4afVR6OmgsT2WA"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 131,
    "path": "../public/assets/chevron-left-BYgutTxd.js"
  },
  "/assets/check-Cyk8Qnls.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-NxqnzA11JYgovvlvvFPneGayFI0"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 125,
    "path": "../public/assets/check-Cyk8Qnls.js"
  },
  "/assets/chevron-right-v8BT9PG8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-3oYISqBT0Vq/50fe69iwXER+d3E"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 131,
    "path": "../public/assets/chevron-right-v8BT9PG8.js"
  },
  "/assets/clock-CM7zjUJp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-hBpXxaL1qMbYCywxgx05zX2u8co"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 170,
    "path": "../public/assets/clock-CM7zjUJp.js"
  },
  "/assets/circle-check-DDeN0Xvc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-SJ9l0e5qzpcsOAgROkA9I/Cic3c"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 179,
    "path": "../public/assets/circle-check-DDeN0Xvc.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-BSQ3yzSy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-ZsSCTSfkb4iLPkwnp6aY1jhGl8A"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 103,
    "path": "../public/assets/destinations-BSQ3yzSy.js"
  },
  "/assets/contact-uFGFKUCc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-2rR0qOdC7NagGVJTqtAETBV5GY0"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 14845,
    "path": "../public/assets/contact-uFGFKUCc.js"
  },
  "/assets/destinations.index-BMIv3nZv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-mMdO9Ch/JscaumhBj+yPQJRpR0g"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-BMIv3nZv.js"
  },
  "/assets/destinations._slug-68PNTAuJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-Y0Rugf2FM2JKqVwWC9g9TQ8tTBQ"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-68PNTAuJ.js"
  },
  "/assets/DestinationsMap-Aj7AEtuv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-Dh6obInCzJMru1owmQ8UUhEdE3E"',
    "mtime": "2026-08-27T11:29:39.701Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-Aj7AEtuv.js"
  },
  "/assets/destinations._slug-Nkul7Z91.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-9LYPyZZfiFOQYgqqBe2t5yVQpsE"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-Nkul7Z91.js"
  },
  "/assets/dialog-0kbU_Pi-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-SFXYI6NbziswPgZ9t0LFnbKR3Yw"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 1830,
    "path": "../public/assets/dialog-0kbU_Pi-.js"
  },
  "/assets/disclaimer-BRBlHwJ6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"130a-1RogbnRUX77IWEpxf/67gfpzd9E"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 4874,
    "path": "../public/assets/disclaimer-BRBlHwJ6.js"
  },
  "/assets/earth-BPUR9exZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-4klFgd7suyVOcE6LCX40QuCru3s"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 394,
    "path": "../public/assets/earth-BPUR9exZ.js"
  },
  "/assets/eye-BRkr7v3S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-1EJfqvMm5+6Qs24bGHt/MVLQOww"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 257,
    "path": "../public/assets/eye-BRkr7v3S.js"
  },
  "/assets/flame-D93inwif.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-iurSJ75W5DfhImjt4z+tmc7Wbro"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 200,
    "path": "../public/assets/flame-D93inwif.js"
  },
  "/assets/external-link-BM0yQ_E_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-vP3o/bNtkw0sPqgbBATu7yYs/bY"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 252,
    "path": "../public/assets/external-link-BM0yQ_E_.js"
  },
  "/assets/folder-tree-6NMaM7Ac.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-RPWhTKLAuJPVu6wl9qneXKrpGSA"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 480,
    "path": "../public/assets/folder-tree-6NMaM7Ac.js"
  },
  "/assets/gallery-wh3iQJGU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-Y6Edp/7D2X9fIyNwJCBZophT2U8"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 6285,
    "path": "../public/assets/gallery-wh3iQJGU.js"
  },
  "/assets/geocoding.functions-Yg0FX9SP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-6gPq9d6SeyC6QZAC54l6qUnt1uA"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-Yg0FX9SP.js"
  },
  "/assets/house-vl-a8hEa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-d4a85HglFyBTuTZHa56UUkYtf2A"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 282,
    "path": "../public/assets/house-vl-a8hEa.js"
  },
  "/assets/image-GJVv0i_b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-KwSfnFiF2oKvSQg120+rbacCX68"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 270,
    "path": "../public/assets/image-GJVv0i_b.js"
  },
  "/assets/key-round-Dca68UCd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-p38foz4I4MXT9gLVNh3rG1BuWhk"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 356,
    "path": "../public/assets/key-round-Dca68UCd.js"
  },
  "/assets/layers-BE9Tu7Ca.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-LzO0KBIwE+IWA0Gsi4N3nMS+ZOg"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 422,
    "path": "../public/assets/layers-BE9Tu7Ca.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T11:29:39.696Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-nTZmHTHD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-WYAGlpjDhxtnyF7mvKPDaPxXrpE"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 172647,
    "path": "../public/assets/index-nTZmHTHD.js"
  },
  "/assets/list-BBu3KaVy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-aL5rUUiAK8by947pMC1Ut67yszo"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 303,
    "path": "../public/assets/list-BBu3KaVy.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T11:29:39.696Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-C2sqSmWu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-TjDJy6JZyYQBTTTIArFoTLxJ4bM"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 914,
    "path": "../public/assets/maximize-2-C2sqSmWu.js"
  },
  "/assets/index-C-AipA-Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-x1JretjVW596iM87CqsNqjC2COg"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 290228,
    "path": "../public/assets/index-C-AipA-Y.js"
  },
  "/assets/message-square-Djn1MOXI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-nkAKAm7h8fRKKyJAPqCirpIjBqU"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 234,
    "path": "../public/assets/message-square-Djn1MOXI.js"
  },
  "/assets/leaflet-src-aGw0A-A2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-EL6zl7w1u7S9TGSDBUkeTmpp0QM"',
    "mtime": "2026-08-27T11:29:39.701Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-aGw0A-A2.js"
  },
  "/assets/index-0GePAnm1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8bb5-c9lmwnS1T/COC9n6b/jxaNiQVbg"',
    "mtime": "2026-08-27T11:29:39.701Z",
    "size": 953269,
    "path": "../public/assets/index-0GePAnm1.js"
  },
  "/assets/navigation-CQU94Q5F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-hnMxVKE9s6xlI8Y73ZbBSknvw2M"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 149,
    "path": "../public/assets/navigation-CQU94Q5F.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T11:29:39.677Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-BFt1uKCO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-si3ARWkMEdmpbz+gl8SbLy5KLrs"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 4523,
    "path": "../public/assets/news._slug-BFt1uKCO.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T11:29:39.696Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-CLvBqLTy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-tGl28OKI8eiQRc6q9xquIMeuW2U"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 974,
    "path": "../public/assets/news._slug-CLvBqLTy.js"
  },
  "/assets/PageBreadcrumbs-DmgAvvey.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-9Zguy37h0nfdnzKq9x323dYEZ4M"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-DmgAvvey.js"
  },
  "/assets/pencil-Bmk3nSmZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-tF9gG61NR8ePT84cqM47QjplPAM"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 277,
    "path": "../public/assets/pencil-Bmk3nSmZ.js"
  },
  "/assets/plus-Bef0ahVx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-TUfdLdrELFwFu8fdnoNT4TWN4nk"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 154,
    "path": "../public/assets/plus-Bef0ahVx.js"
  },
  "/assets/PostCard-B8dOqmQf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f69-UDhnbqwpS7Ju8c6WFtLlWTwQXHE"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 3945,
    "path": "../public/assets/PostCard-B8dOqmQf.js"
  },
  "/assets/privacy-policy-zio6tYn4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149c-hMZhU/sUQJzXer/c1/ce73yMGaw"',
    "mtime": "2026-08-27T11:29:39.696Z",
    "size": 5276,
    "path": "../public/assets/privacy-policy-zio6tYn4.js"
  },
  "/assets/radio-6D0bDSe4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-+oM0NKjBwTqYxY5ky/Yf80Wm3CA"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 375,
    "path": "../public/assets/radio-6D0bDSe4.js"
  },
  "/assets/PostEditor-DFvct5g8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c097-Omqq4AQFU5xfvIbAWz1tONvfhMs"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 49303,
    "path": "../public/assets/PostEditor-DFvct5g8.js"
  },
  "/assets/refresh-cw-vShtju23.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-JFvWR7XVqvPw7jMtFvyZ/32g/KM"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-vShtju23.js"
  },
  "/assets/route-CFbt_Ikv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-B4U2Cf8c2U+v5/vK7UD1iVbxTn8"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 95,
    "path": "../public/assets/route-CFbt_Ikv.js"
  },
  "/assets/save-BYuTjZbD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-tlAlKVMcxfUDbThrTrtJDYLYdKE"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 328,
    "path": "../public/assets/save-BYuTjZbD.js"
  },
  "/assets/share-2-BtlyLycx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-xQuQjPrdg5iJQK0U4AGgHJIqEa4"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 358,
    "path": "../public/assets/share-2-BtlyLycx.js"
  },
  "/assets/settings-DyfDMwlX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-MDdvHhw4ZSc6P5isC6tv850O3AU"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 488,
    "path": "../public/assets/settings-DyfDMwlX.js"
  },
  "/assets/shield-check-BsBVlLrN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-m0euASqcn0PkdTyP2oWrbiOdWqg"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 321,
    "path": "../public/assets/shield-check-BsBVlLrN.js"
  },
  "/assets/shield-CzoVEumY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-IxEV1LF9VvnjDJ2YZkM/b3rMez8"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 273,
    "path": "../public/assets/shield-CzoVEumY.js"
  },
  "/assets/star-CF3BHt9q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-TXTs+4V9WNwBEx+3D4ksLOvKeUA"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 473,
    "path": "../public/assets/star-CF3BHt9q.js"
  },
  "/assets/styles-DgF9oxV8.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"28e11-nBAKB7fC99yo5iHqRziZI2w8lOg"',
    "mtime": "2026-08-27T11:29:39.696Z",
    "size": 167441,
    "path": "../public/assets/styles-DgF9oxV8.css"
  },
  "/assets/topics._slug-2GH3ShgY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-E3zVpXFtbkztEnAzX/NECDeMpOE"',
    "mtime": "2026-08-27T11:29:39.698Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-2GH3ShgY.js"
  },
  "/assets/trash-2-kPQ5lj1J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-tqw7e0U9UUYydjkXfHL8dtsAI5g"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 329,
    "path": "../public/assets/trash-2-kPQ5lj1J.js"
  },
  "/assets/triangle-alert-muhoav1Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-7Y7W6gpl+/cOHajCguv8Pm9e0PA"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-muhoav1Z.js"
  },
  "/assets/upload-DCI1qMTv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-juAz0dR7MJBe64ygYmEu2Ew42Vg"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 231,
    "path": "../public/assets/upload-DCI1qMTv.js"
  },
  "/assets/users-iVvVx8ze.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-o7A/lw/xDa/6MGn29YDRWovGjfw"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 307,
    "path": "../public/assets/users-iVvVx8ze.js"
  },
  "/assets/useMutation-zQn2fZ6Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-gv+X032KrwziTSKsRcrNqa27vz4"',
    "mtime": "2026-08-27T11:29:39.700Z",
    "size": 2211,
    "path": "../public/assets/useMutation-zQn2fZ6Z.js"
  },
  "/assets/useSuspenseQuery-BIOeAO9z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-aq7alJY/fkrHhkTe0cv+poWgPdk"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-BIOeAO9z.js"
  },
  "/assets/utils-C8j38ab3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-+Vy3U9QBQqMPGMwpozokCeNAOI4"',
    "mtime": "2026-08-27T11:29:39.699Z",
    "size": 59982,
    "path": "../public/assets/utils-C8j38ab3.js"
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
