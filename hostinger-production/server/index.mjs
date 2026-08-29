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
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/images/author-hussain-original.jpg": {
    "type": "image/jpeg",
    "etag": '"23253-0EbOe3DBgnE0F6k8q3PJLw6Gr8g"',
    "mtime": "2026-08-27T03:07:35.496Z",
    "size": 143955,
    "path": "../public/images/author-hussain-original.jpg"
  },
  "/assets/about.functions-D5-Hl64P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32f2-ThoC6OHhmoiP343b2IIgMv3Jfs0"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 13042,
    "path": "../public/assets/about.functions-D5-Hl64P.js"
  },
  "/assets/account-CWJ8O4K2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-rZH5M2C9DSTT9q0Hu41M2EX/GvQ"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 2068,
    "path": "../public/assets/account-CWJ8O4K2.js"
  },
  "/assets/admin-BITHady5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c1-blf3yP72mKNbRudGqwGkoqWV1Y4"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 2497,
    "path": "../public/assets/admin-BITHady5.js"
  },
  "/assets/admin.about-COX_2sus.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1138a-kCT+Dcq6emx+CG+qEbD33G1/5sY"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 70538,
    "path": "../public/assets/admin.about-COX_2sus.js"
  },
  "/assets/admin.categories-CORVIY_N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5918-J2hVVhrkFrorfaFTWvg1DGY9Njo"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 22808,
    "path": "../public/assets/admin.categories-CORVIY_N.js"
  },
  "/assets/admin.comments-xmDs3V0j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-kB2erW4tWDzERW1s2xZzfHaJP8I"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-xmDs3V0j.js"
  },
  "/assets/admin.destinations-DAvSab2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26ba-dn5FH3KqgbBW7Aggjq0k7aSB3QU"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 9914,
    "path": "../public/assets/admin.destinations-DAvSab2U.js"
  },
  "/assets/admin.gallery-Dj7YlUUz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56ba-LFNHsXh2CEM/mLviV8DZyB6SqZc"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 22202,
    "path": "../public/assets/admin.gallery-Dj7YlUUz.js"
  },
  "/assets/admin.homepage-BOXUVw2v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d8f2-I/Ui341wK3yKHzMKNpXqx1TW3lI"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 55538,
    "path": "../public/assets/admin.homepage-BOXUVw2v.js"
  },
  "/assets/admin.index-DHhXmybR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-GCrAeHldOZGpflhXHh7kWWs6tHM"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 4074,
    "path": "../public/assets/admin.index-DHhXmybR.js"
  },
  "/assets/admin.legal-dBN-6MYt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397f-Hlmd70oo1SKDQUWyOkI4qLGjnvs"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 14719,
    "path": "../public/assets/admin.legal-dBN-6MYt.js"
  },
  "/assets/admin.messages-DI2PlwBl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a9-lUgWDZkCywxB5NqYFCHfE5yh5Oc"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 4777,
    "path": "../public/assets/admin.messages-DI2PlwBl.js"
  },
  "/assets/admin.news-6SKpK_lB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86b5-fJLi+lIdDZq878rc88Qza8ibIk4"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 34485,
    "path": "../public/assets/admin.news-6SKpK_lB.js"
  },
  "/assets/admin.posts.index-DyYbz3t1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a3-/KmsnCeMOQxXwUaSfhVRqX9PhK4"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 9635,
    "path": "../public/assets/admin.posts.index-DyYbz3t1.js"
  },
  "/assets/admin.analytics-BxJ85BnT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64266-49m4dCaKchdbON/itNmXqh9tFTE"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 410214,
    "path": "../public/assets/admin.analytics-BxJ85BnT.js"
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
  "/assets/about-CsfmpzlU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9131e-zWw1usfuuy1JFOAub3N+ntbDEbs"',
    "mtime": "2026-08-29T20:58:12.815Z",
    "size": 594718,
    "path": "../public/assets/about-CsfmpzlU.js"
  },
  "/assets/admin.posts.new-B_DjyJx7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"320-iVcQtTonXu+LSrxBOZnifQzPXlw"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 800,
    "path": "../public/assets/admin.posts.new-B_DjyJx7.js"
  },
  "/assets/admin.public-message-CBvPM_tT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4cad-Uj8Le/IBAY1vgMfkilXWn1pS8e4"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 19629,
    "path": "../public/assets/admin.public-message-CBvPM_tT.js"
  },
  "/assets/admin.posts._id-Bq0xMI2j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"455-yV/DjwCxidV6yea08eWY5hRhtes"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 1109,
    "path": "../public/assets/admin.posts._id-Bq0xMI2j.js"
  },
  "/assets/admin.settings-dBWZpIV6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dd4-iovWGIuA+eqmZMn97yVnKmPNdzI"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 15828,
    "path": "../public/assets/admin.settings-dBWZpIV6.js"
  },
  "/assets/admin.subscribers-DQcz2XBN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2baf-Lse03b95V/zsNWqYHl+Ye7mlkZ8"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 11183,
    "path": "../public/assets/admin.subscribers-DQcz2XBN.js"
  },
  "/assets/AdSlot-Di3C8qKk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-9oAI64YpqQehGDG6audsSmWZzbg"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-Di3C8qKk.js"
  },
  "/assets/arrow-up-right-W-284mIv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-F526BtEWBzytcvrE53r3FQMLzcc"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-W-284mIv.js"
  },
  "/assets/alert-dialog-DXVu7cfG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-d0ckAbi2c3YI1d20mXPUka09808"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-DXVu7cfG.js"
  },
  "/assets/arrow-left-YdWFvQn7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-GWgcBwtZY09or96PI4ofClTdhFI"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 166,
    "path": "../public/assets/arrow-left-YdWFvQn7.js"
  },
  "/assets/auth-BMz0ZODn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-Pbz+n7yvSAG6/hkZ0I1TDGfqkyU"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 7644,
    "path": "../public/assets/auth-BMz0ZODn.js"
  },
  "/assets/blog-DrMILUk3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-bxKEo7QCSIue7mQB40bFOtQHK40"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 103,
    "path": "../public/assets/blog-DrMILUk3.js"
  },
  "/assets/blog.index-CCqK-SOT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2791-IcJQssr+4Aq3s8jFoe5/uIkcqWQ"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 10129,
    "path": "../public/assets/blog.index-CCqK-SOT.js"
  },
  "/assets/blog._slug-CFcDO5oL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-V+DMvnmArMPTzoZh15YcaPfGUdQ"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 572,
    "path": "../public/assets/blog._slug-CFcDO5oL.js"
  },
  "/assets/blog._slug-DBfcG5aO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf8-ZZKKMinKO4+LkxmFvq53BR4wCmc"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 27640,
    "path": "../public/assets/blog._slug-DBfcG5aO.js"
  },
  "/assets/book-open-DbLZBUbC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-HgYwmlOzwnN7+WXbd+2p52znRSI"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 280,
    "path": "../public/assets/book-open-DbLZBUbC.js"
  },
  "/assets/calendar-DsbVS-1t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-/b9NIwu2VagVqmjApLqmx8S6K5w"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 258,
    "path": "../public/assets/calendar-DsbVS-1t.js"
  },
  "/assets/category._slug-BDyihYVO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f10-PbAFtW+UPVSB/+KTbHm0YZC8gKM"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 3856,
    "path": "../public/assets/category._slug-BDyihYVO.js"
  },
  "/assets/chart-column-BfTVVKtN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-nL9VXpRMYhM726YzRpQpjM019xw"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 252,
    "path": "../public/assets/chart-column-BfTVVKtN.js"
  },
  "/assets/check-rIftsKD2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-T2mKq26l4k5H76WHcKh5QYnL3Sc"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 125,
    "path": "../public/assets/check-rIftsKD2.js"
  },
  "/assets/chevron-down-Cerhiu8A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-SIGtlV16f6x3Q154GISoPF3moYQ"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 129,
    "path": "../public/assets/chevron-down-Cerhiu8A.js"
  },
  "/assets/chevron-left-Cv2gP5gx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-AflAWOSL6OtJY+Lp4fi4zHiZniE"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 131,
    "path": "../public/assets/chevron-left-Cv2gP5gx.js"
  },
  "/assets/chevron-right-CWHBJC7l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-F/fEQq6a3egnsFIvvbeniEGsxpU"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 131,
    "path": "../public/assets/chevron-right-CWHBJC7l.js"
  },
  "/assets/circle-check-ChQtMn4r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-foSoLuxWz1OQHqLxvBSsh0UMFdA"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 179,
    "path": "../public/assets/circle-check-ChQtMn4r.js"
  },
  "/assets/clock-DBNxbc9X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-Zz/xYuhCPw/DS9dJl2OWm7J6lrs"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 170,
    "path": "../public/assets/clock-DBNxbc9X.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-D57xJmhR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-Tyyxkv9cSlKPvDjNqjM+cX95LEM"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 252,
    "path": "../public/assets/compass-D57xJmhR.js"
  },
  "/assets/contact-BLk5Nj3b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a0a-uUnDONmUpgfoaJMpArRKDbbqclQ"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 14858,
    "path": "../public/assets/contact-BLk5Nj3b.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-Bw9byzUM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-bB6nLtDYouOQseALoIXoUc5dhCo"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 103,
    "path": "../public/assets/destinations-Bw9byzUM.js"
  },
  "/assets/destinations.index-DDYXzB3W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1437-bHugbnhcD47G3E859rLL81aU230"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 5175,
    "path": "../public/assets/destinations.index-DDYXzB3W.js"
  },
  "/assets/destinations._slug-Bv-_caNZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-hPZQ1MJZOPmGFonW4CZF4Y/PSNo"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-Bv-_caNZ.js"
  },
  "/assets/destinations._slug-CTOT22m3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cea-OgdpFflOHtYf/Nkw9Wv9ZwhH/6g"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 7402,
    "path": "../public/assets/destinations._slug-CTOT22m3.js"
  },
  "/assets/DestinationsMap-DLE04mpI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102d-V7jBsqZDfJcLBtKdA7rI5e0g0fo"',
    "mtime": "2026-08-29T20:58:12.815Z",
    "size": 4141,
    "path": "../public/assets/DestinationsMap-DLE04mpI.js"
  },
  "/assets/dialog-BoeYHeHH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-OsttPO257GGniTFvqBY9bdaz0Vg"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 1830,
    "path": "../public/assets/dialog-BoeYHeHH.js"
  },
  "/assets/disclaimer-CWwDgxa0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706-EB7bsti6xq0UEM7OdI63OuyYVDI"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 1798,
    "path": "../public/assets/disclaimer-CWwDgxa0.js"
  },
  "/assets/earth-fA8jRCmB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-ZIYo+hTJe+RXkNZRzCG9gpdRXyE"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 394,
    "path": "../public/assets/earth-fA8jRCmB.js"
  },
  "/assets/external-link-B-PzVPCp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-rrxH3z/yXJdo1/QQLYAForzohUc"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 252,
    "path": "../public/assets/external-link-B-PzVPCp.js"
  },
  "/assets/eye-off-Pd1oKgD7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-IcdvY/gCbXzj8wvOkUEvIzsDc4g"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 431,
    "path": "../public/assets/eye-off-Pd1oKgD7.js"
  },
  "/assets/eye-Tn5V3RBa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-r/U/Hae/gXDFcUipf992hoTKz74"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 257,
    "path": "../public/assets/eye-Tn5V3RBa.js"
  },
  "/assets/flame-BQtnbw0x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-kjtA1poU2hJSkSE+zCxKewyV4Ow"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 200,
    "path": "../public/assets/flame-BQtnbw0x.js"
  },
  "/assets/folder-tree-o0MB-KP0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-gz5dVVrOamfvmeJu2hiS5TR49uE"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 480,
    "path": "../public/assets/folder-tree-o0MB-KP0.js"
  },
  "/assets/gallery-BFqoo-5W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"189a-t0hsnY/O/wdqNFlwVTJkxjODNbc"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 6298,
    "path": "../public/assets/gallery-BFqoo-5W.js"
  },
  "/assets/geocoding.functions-_DvZjn-E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-zuzgVRb41ktMB3NRw3YCGJTHsNg"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-_DvZjn-E.js"
  },
  "/assets/grip-vertical-DQ1NmZPI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-BP4sCM7rKRQN5XWLDMuFQ/fPCWk"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-DQ1NmZPI.js"
  },
  "/assets/image-D22n6ihN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-J1elsc2Xtzl+PmXXwJoF/NPVH50"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 270,
    "path": "../public/assets/image-D22n6ihN.js"
  },
  "/assets/index-CjFjMiEt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a536-aS2SJ4JRpVgjls1l6gpP00Hp+Qw"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 173366,
    "path": "../public/assets/index-CjFjMiEt.js"
  },
  "/assets/index-DvE4crc9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-k1I14JjF5lrnYJfepD/BlFlj6c0"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 290228,
    "path": "../public/assets/index-DvE4crc9.js"
  },
  "/assets/key-round-DDvH8ZvM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-k3fVOSyEnmHaFZ3GARv9MXc5v3E"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 356,
    "path": "../public/assets/key-round-DDvH8ZvM.js"
  },
  "/assets/layers-C-KXPIFY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-rOlqqhRt3Cmx5dPYN+RbCIjlq/g"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 422,
    "path": "../public/assets/layers-C-KXPIFY.js"
  },
  "/assets/index-BHAEJ5Gn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02d2-JtudkDfLEzc1BSoIJmUxcdcctnY"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 983762,
    "path": "../public/assets/index-BHAEJ5Gn.js"
  },
  "/assets/layout-dashboard-DO_fMHft.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"249-3D9emvfCLihKkQX6cyd5jAla78s"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 585,
    "path": "../public/assets/layout-dashboard-DO_fMHft.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-29T20:58:12.809Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-ei5om1BM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-7fsHNE1vMAQDzWSdMt2fULtRfeQ"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 303,
    "path": "../public/assets/list-ei5om1BM.js"
  },
  "/assets/list-ordered-BD5nnsEH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-z75Hec683TLwk2milWOM+WnsKuc"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 644,
    "path": "../public/assets/list-ordered-BD5nnsEH.js"
  },
  "/assets/map-BTucf58j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-5rpfVUkziv+EkD4CSjCio47ovvE"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 724,
    "path": "../public/assets/map-BTucf58j.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/leaflet-src-Cz33_NZ6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-tAO1YrDGe3z6QPJscXfypJ1OaQM"',
    "mtime": "2026-08-29T20:58:12.815Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Cz33_NZ6.js"
  },
  "/assets/maximize-2-2JcgV3Wj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-xndpUmBOXMBuFmgEAvBQMz++isE"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 239,
    "path": "../public/assets/maximize-2-2JcgV3Wj.js"
  },
  "/assets/message-square-DOBm046P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-83RDLIP3A3Q9dK0r/a294x/bzrE"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 234,
    "path": "../public/assets/message-square-DOBm046P.js"
  },
  "/assets/mountain-B6UnOsna.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-7hJHUf7gVFDkqjts8dDZzzj4ZyQ"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 377,
    "path": "../public/assets/mountain-B6UnOsna.js"
  },
  "/assets/navigation-BsX4Zmls.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-94PFlXWSWbF4rMqHiOLW8d8qgjw"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 149,
    "path": "../public/assets/navigation-BsX4Zmls.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-29T20:58:12.785Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-CdLmFctI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-2kTq9+F+xKGC3OvmFtnoA9WxJ6A"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 974,
    "path": "../public/assets/news._slug-CdLmFctI.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-29T20:58:12.809Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-D-wpi9wu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-XvVI1iKBcVNmumC1ndmJN4i4+as"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 4524,
    "path": "../public/assets/news._slug-D-wpi9wu.js"
  },
  "/assets/PageBreadcrumbs-BnSRzjad.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-BMpg5zXtBlJg2bO2p3bsVv4g26c"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-BnSRzjad.js"
  },
  "/assets/pen-line-ctCpsy4s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-ZbPhi0bYMq6VK5aRAO247cHngwU"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 1022,
    "path": "../public/assets/pen-line-ctCpsy4s.js"
  },
  "/assets/pencil-VJzC_UQZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-LwOKG9H/4GnynIR5PRlLwyxVhJE"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 277,
    "path": "../public/assets/pencil-VJzC_UQZ.js"
  },
  "/assets/plus-DxpV9Y6d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-30tzTPsgYpGkFMKyVF73S/fKw2A"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 154,
    "path": "../public/assets/plus-DxpV9Y6d.js"
  },
  "/assets/PostCard-BobaxE8U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-mUvBLtkTyet/2kn+scujEml0yiU"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 3935,
    "path": "../public/assets/PostCard-BobaxE8U.js"
  },
  "/assets/PostEditor-BdQAeyz2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd2a-0/ozdtkVbqLuXbizyOk4G7bpMxA"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 48426,
    "path": "../public/assets/PostEditor-BdQAeyz2.js"
  },
  "/assets/power-CYGkZFaB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-fp7ujS8yW4Xu8ZTy6FBQRexb9h8"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 174,
    "path": "../public/assets/power-CYGkZFaB.js"
  },
  "/assets/privacy-policy-BGXPsk65.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70a-1dhd6hW/euxn1J46NqqJX76jM4Q"',
    "mtime": "2026-08-29T20:58:12.809Z",
    "size": 1802,
    "path": "../public/assets/privacy-policy-BGXPsk65.js"
  },
  "/assets/quote-GvDmI54X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-bjidZLXQBaM87Y+pN/mXCKlQhE4"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 390,
    "path": "../public/assets/quote-GvDmI54X.js"
  },
  "/assets/radio-CffZX-2Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-Ry6Sz+KO+zMgOp8sFes9TK6OBVA"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 375,
    "path": "../public/assets/radio-CffZX-2Q.js"
  },
  "/assets/refresh-cw-CO-fXejT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-hUgxm9EeW0MEKF7fFQT1M1bKnTk"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-CO-fXejT.js"
  },
  "/assets/rocket-DbSPsfw7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"75b-vSVyyno7n0ykVIbDcBDK/YJpqvs"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 1883,
    "path": "../public/assets/rocket-DbSPsfw7.js"
  },
  "/assets/rotate-ccw-Cb6MNJNs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-n0l1Y971GXjTN6Dim6icK2a1+1A"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-Cb6MNJNs.js"
  },
  "/assets/route-Du0sXk0z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-TzlNaOHQ54HjjiqRh72+krSInKc"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 95,
    "path": "../public/assets/route-Du0sXk0z.js"
  },
  "/assets/route-JvMZFSCQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-wA6Rlouq49nskmOvVC8K7Cy67M8"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 543,
    "path": "../public/assets/route-JvMZFSCQ.js"
  },
  "/assets/save-CStlvb2R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-lPQrcfVMjM1bLM+4nPWKSz5jDWI"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 328,
    "path": "../public/assets/save-CStlvb2R.js"
  },
  "/assets/scale-X_38zLht.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-dEmab94eAWVagXRR+OIuw05DxE8"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 333,
    "path": "../public/assets/scale-X_38zLht.js"
  },
  "/assets/settings-DJ6XiYZH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-eQxcXsy7/uHY11mPPQW7i7xMQ0U"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 488,
    "path": "../public/assets/settings-DJ6XiYZH.js"
  },
  "/assets/shield-alert-1EhXv-oS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-1qEWuJ54Vcddd30557ATERxolA8"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 668,
    "path": "../public/assets/shield-alert-1EhXv-oS.js"
  },
  "/assets/share-2-BQx4Nb_r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-lwQ47X7WCy0Z2ZerpXYXoNEcLK0"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 358,
    "path": "../public/assets/share-2-BQx4Nb_r.js"
  },
  "/assets/shield-BLpXJuSj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-5+YlrbH8Afm5EQkkcxWRbEb7o5U"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 273,
    "path": "../public/assets/shield-BLpXJuSj.js"
  },
  "/assets/shield-check-RE3zxbFi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-/XgA6NZp6ZjT4/PCP2bU1op88Ow"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 321,
    "path": "../public/assets/shield-check-RE3zxbFi.js"
  },
  "/assets/sliders-horizontal-CGxh48Aa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-U53y8vkudON/JLk0lCVoIqCal1M"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-CGxh48Aa.js"
  },
  "/assets/star-Z-Ld_DJe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-B99t2AEZiOowQQY4ViWmEmDTA5g"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 473,
    "path": "../public/assets/star-Z-Ld_DJe.js"
  },
  "/assets/topics._slug-l6iEU4Ip.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-d4GMHFppSv+0ghqTrTX9Mg34clc"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 2165,
    "path": "../public/assets/topics._slug-l6iEU4Ip.js"
  },
  "/assets/TranslatedMarkdown-Ct4pBF4b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-3gnNuNnwr7jyFTdsQkeOipVx6ME"',
    "mtime": "2026-08-29T20:58:12.810Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-Ct4pBF4b.js"
  },
  "/assets/styles-B9l-mFW_.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2db92-BcAvbQMeQT6dBVqUVILhVJafpJ0"',
    "mtime": "2026-08-29T20:58:12.809Z",
    "size": 187282,
    "path": "../public/assets/styles-B9l-mFW_.css"
  },
  "/assets/trash-2-TQaJQYib.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-EAPys8Upwe52uzkS9pbggWfL+mc"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 329,
    "path": "../public/assets/trash-2-TQaJQYib.js"
  },
  "/assets/trending-up-JUF9EiS0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-P/oO5+BTBTQ2ZPMmc1G2ZSglJ7w"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 932,
    "path": "../public/assets/trending-up-JUF9EiS0.js"
  },
  "/assets/triangle-alert-DymeO8QS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-ufyKEUglwTtFqrUfEAA80Y9gBBM"',
    "mtime": "2026-08-29T20:58:12.813Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-DymeO8QS.js"
  },
  "/assets/upload-aIvmfVeh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-MS82XxxIOJ10OyAgmkmEByIvTqI"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 231,
    "path": "../public/assets/upload-aIvmfVeh.js"
  },
  "/assets/useMutation-BkbvuLNm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-3lDYyBkOb2PkPUacfFfVONcdC0w"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 2211,
    "path": "../public/assets/useMutation-BkbvuLNm.js"
  },
  "/assets/user-plus-BGg3GkOe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-xWqPXmEGJr+aPV5ysVB8MZlD8k0"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 311,
    "path": "../public/assets/user-plus-BGg3GkOe.js"
  },
  "/assets/user-x-D1HMzhLv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"412-MQHrFtd4j25r4b0NnrUc2b6esZI"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 1042,
    "path": "../public/assets/user-x-D1HMzhLv.js"
  },
  "/assets/users-C4Zyi91W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-Tau0i4Dh0CWq0fOyFd4bYYTL4yY"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 307,
    "path": "../public/assets/users-C4Zyi91W.js"
  },
  "/assets/useSuspenseQuery-DWpWUWTw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-luqqYSygnqM39FDV7rdb35AGGwo"',
    "mtime": "2026-08-29T20:58:12.811Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-DWpWUWTw.js"
  },
  "/assets/utils-C05gpEm3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-tEqsMqrCzb6e/uqCU7z4LGf0j/U"',
    "mtime": "2026-08-29T20:58:12.814Z",
    "size": 59982,
    "path": "../public/assets/utils-C05gpEm3.js"
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
