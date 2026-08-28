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
  "/assets/about.functions-NhwoCg0S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32f2-1t2ygtHHaKz5TKoolOLBfLcnPoc"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 13042,
    "path": "../public/assets/about.functions-NhwoCg0S.js"
  },
  "/assets/account-CtOvbdp4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-4IihzBplAVq1oHqOaPHOJXLhMjs"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 2068,
    "path": "../public/assets/account-CtOvbdp4.js"
  },
  "/assets/admin-Bkdngv4r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9e2-q8oA32fYWZTRAa6oMmxfBPVLFeU"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 2530,
    "path": "../public/assets/admin-Bkdngv4r.js"
  },
  "/assets/admin.about-otI4XpU2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11353-2rdy7KTz2ZrE3q50BE3kS5o8zEQ"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 70483,
    "path": "../public/assets/admin.about-otI4XpU2.js"
  },
  "/assets/admin.analytics-WqIBJC4j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64266-lbsDh6j125hBWe2OINUjhnNE1hY"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 410214,
    "path": "../public/assets/admin.analytics-WqIBJC4j.js"
  },
  "/assets/admin.categories-fxc4PiVo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5918-SsEZo9E8nS7IeIUZHVmejYyCE70"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 22808,
    "path": "../public/assets/admin.categories-fxc4PiVo.js"
  },
  "/images/author-hussain-original.jpg": {
    "type": "image/jpeg",
    "etag": '"23253-0EbOe3DBgnE0F6k8q3PJLw6Gr8g"',
    "mtime": "2026-08-27T03:07:35.496Z",
    "size": 143955,
    "path": "../public/images/author-hussain-original.jpg"
  },
  "/assets/admin.destinations-BoTFPgUV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26ba-WiYRyA9KwbfYoYcOkYAh6TtZr0E"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 9914,
    "path": "../public/assets/admin.destinations-BoTFPgUV.js"
  },
  "/assets/admin.comments-isQ9oFE9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-S+5ztLzzfP0MAHzWL3DvrUc0XZE"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-isQ9oFE9.js"
  },
  "/assets/admin.gallery-DW-8yCrS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5691-tkCrIf6XmlNmmKshBd67jCADT7g"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 22161,
    "path": "../public/assets/admin.gallery-DW-8yCrS.js"
  },
  "/assets/admin.index-D7MXRKmq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-8e/wwKMaFQJjUOzSepZ8ZYRSxDs"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 4074,
    "path": "../public/assets/admin.index-D7MXRKmq.js"
  },
  "/assets/admin.homepage-CWp1UEg8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"63bf-BpVu1MR7m+nq4JAd06Rc59iUbKE"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 25535,
    "path": "../public/assets/admin.homepage-CWp1UEg8.js"
  },
  "/assets/admin.legal-DonYK7BF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397f-ZJkqYVgme9vfWUlsn52a4PoY77Q"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 14719,
    "path": "../public/assets/admin.legal-DonYK7BF.js"
  },
  "/assets/admin.messages-uvptFzhi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a9-OJq0UqVZuBh7mAfpZqnTktohJ44"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 4777,
    "path": "../public/assets/admin.messages-uvptFzhi.js"
  },
  "/assets/admin.news-DdE3wLc1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86b5-Z4vKp3FKUgp7lDk1xP4guOHIrn8"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 34485,
    "path": "../public/assets/admin.news-DdE3wLc1.js"
  },
  "/assets/admin.posts.index-CLw6O-wJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a3-xgZc4BXaJ4JMgxV41SUfBIFxYHw"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 9635,
    "path": "../public/assets/admin.posts.index-CLw6O-wJ.js"
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
  "/assets/about-22RoRSll.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91527-kNR/xcRfwtjiiThHmazIlsgszlw"',
    "mtime": "2026-08-28T19:17:16.348Z",
    "size": 595239,
    "path": "../public/assets/about-22RoRSll.js"
  },
  "/assets/admin.posts._id-CtLFOmUi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"431-m/m7KU06pRUpjFelNKqbpH4YZZc"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 1073,
    "path": "../public/assets/admin.posts._id-CtLFOmUi.js"
  },
  "/assets/admin.posts.new-dha5oTZk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2fc-99s6ja2Whbj9hnPcJwJsQwZcjEg"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 764,
    "path": "../public/assets/admin.posts.new-dha5oTZk.js"
  },
  "/assets/admin.public-message-BtHnbxRQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4cad-PW6JQLaxnCJAIU3lVDlHIjMQXWU"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 19629,
    "path": "../public/assets/admin.public-message-BtHnbxRQ.js"
  },
  "/assets/admin.settings-B_5vtK2O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dd4-aegGhkAVlWtNlNV2z61jpayL8Q8"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 15828,
    "path": "../public/assets/admin.settings-B_5vtK2O.js"
  },
  "/assets/admin.subscribers-Ck5zB7Gw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2baf-O/hVbGY9JllfA5aO/nAMPQPanSI"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 11183,
    "path": "../public/assets/admin.subscribers-Ck5zB7Gw.js"
  },
  "/assets/AdSlot-BnSYLrcV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-rBYZXMnGOPiA/sovgxGp+IZi2DE"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-BnSYLrcV.js"
  },
  "/assets/alert-dialog-DPoSBSJP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-xAoO8aui551/odXU6R+i8QGHUHU"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-DPoSBSJP.js"
  },
  "/assets/arrow-left-BDFMpy0i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-BIrOUnc/Lia9ek3HMIXAQh4aC4Y"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 166,
    "path": "../public/assets/arrow-left-BDFMpy0i.js"
  },
  "/assets/arrow-up-right-DIRukrxo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-rHoDwtb3pJ/Kk/3ixQOH2nLvb0s"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-DIRukrxo.js"
  },
  "/assets/auth-BDsRYbsV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-cv2TOgRnFaodqke+znPERhtWxcw"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 7644,
    "path": "../public/assets/auth-BDsRYbsV.js"
  },
  "/assets/blog-Dj07qBot.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-jelv3a+WsZxrtDRzyK+eF4NBqJA"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 103,
    "path": "../public/assets/blog-Dj07qBot.js"
  },
  "/assets/blog.index-DeTAwu45.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2791-k9OBu2CiV6FESn0dZBnTODMp9Ek"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 10129,
    "path": "../public/assets/blog.index-DeTAwu45.js"
  },
  "/assets/blog._slug-BGkACB6T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cdc-4eBkEcRCTqoPNe7k4n8IA6pkIl4"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 27868,
    "path": "../public/assets/blog._slug-BGkACB6T.js"
  },
  "/assets/blog._slug-xhWT9I7m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-hugpWKzCLmpzFC9Z2a2xdTb5a8c"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 572,
    "path": "../public/assets/blog._slug-xhWT9I7m.js"
  },
  "/assets/book-open-BB9zcfkV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-jHHutifZMizzqnhHyfDraDwOY5E"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 280,
    "path": "../public/assets/book-open-BB9zcfkV.js"
  },
  "/assets/calendar-D7WVUsA9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-l9eYA9sifh8dyG7a/kLH8V/IXcg"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 258,
    "path": "../public/assets/calendar-D7WVUsA9.js"
  },
  "/assets/category._slug-bBjY0twT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f10-vWFtjf0xhF1loxzYj+OkOwEhmps"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 3856,
    "path": "../public/assets/category._slug-bBjY0twT.js"
  },
  "/assets/chart-column-B5IqPbC_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-n4JLtpJBFTLYCjkJWKNLuQy91ZQ"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 252,
    "path": "../public/assets/chart-column-B5IqPbC_.js"
  },
  "/assets/check-v8xiNjkv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-DjaW+Nr0WpMcrZp2YxiIt766JO8"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 125,
    "path": "../public/assets/check-v8xiNjkv.js"
  },
  "/assets/chevron-down-me4o93MW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-iQd9br8vBaToKlX6jkh4XDXKGyk"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 129,
    "path": "../public/assets/chevron-down-me4o93MW.js"
  },
  "/assets/chevron-left-iWtUQJ2T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-EA43gjR3I85Oy1kpwlr037am2C8"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 131,
    "path": "../public/assets/chevron-left-iWtUQJ2T.js"
  },
  "/assets/chevron-right-cppkVpNQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-KVsCrAtzicDzjWK3uoqcnKuQlhs"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 131,
    "path": "../public/assets/chevron-right-cppkVpNQ.js"
  },
  "/assets/circle-check-ElLN-MEB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-QqsB1vj0t0+3I0uT+g4qz7suUFw"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 179,
    "path": "../public/assets/circle-check-ElLN-MEB.js"
  },
  "/assets/clock-BkoimDNT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-Uu0bdYjR5vAOje59c/+M7lcFhK4"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 170,
    "path": "../public/assets/clock-BkoimDNT.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-CQf-cP85.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a0a-GA0z1LVa47z9oryZTbY6o6tUJE4"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 14858,
    "path": "../public/assets/contact-CQf-cP85.js"
  },
  "/assets/destinations-C6crjCDk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-KVY6MzxbRP0RQit6N9dDTWdGPD0"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 103,
    "path": "../public/assets/destinations-C6crjCDk.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations.index-ClF7KPOf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1437-uVXIoiwtGEz3v80BUFeemm9r3L8"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 5175,
    "path": "../public/assets/destinations.index-ClF7KPOf.js"
  },
  "/assets/destinations._slug-B65JHw2j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-6K66lzLRtqnFbHsTA3be7eE8DG8"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-B65JHw2j.js"
  },
  "/assets/destinations._slug-Ce-fk2xS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cea-o93X3PEQu27TNvPvcVi6avH6ktI"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 7402,
    "path": "../public/assets/destinations._slug-Ce-fk2xS.js"
  },
  "/assets/DestinationsMap-BV-i9oEG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f65-W3+13ehSfgJ0lheHZ0MKQKw7brM"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 3941,
    "path": "../public/assets/DestinationsMap-BV-i9oEG.js"
  },
  "/assets/dialog-u1bzJHqL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-Ws1y6zDMpuXU9hq1goxBnaWF4s0"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 1830,
    "path": "../public/assets/dialog-u1bzJHqL.js"
  },
  "/assets/disclaimer-Dl5-Ha4a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706-yjb5j9lxxtBOozvYWTr9xaqSlo4"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 1798,
    "path": "../public/assets/disclaimer-Dl5-Ha4a.js"
  },
  "/assets/earth-BdeJZphp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-J3bvbKPJWBr7WjFJ9Cd2wqvRtRI"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 394,
    "path": "../public/assets/earth-BdeJZphp.js"
  },
  "/assets/external-link-Ct4l7YcS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-Sy1X9wg/dliiVXpz3hr1GKh69Zc"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 252,
    "path": "../public/assets/external-link-Ct4l7YcS.js"
  },
  "/assets/eye-off-DfPWZPGL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-6JLHQjVJbES5tWy/uRI0C2CLnps"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 431,
    "path": "../public/assets/eye-off-DfPWZPGL.js"
  },
  "/assets/eye-SwJKnkW3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-r2kjvCluqap1ydfrEJJEZ4kQB6I"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 257,
    "path": "../public/assets/eye-SwJKnkW3.js"
  },
  "/assets/flame-B00h7Syy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-xB52PsAEG5IS+6nj3XSqPjthekY"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 200,
    "path": "../public/assets/flame-B00h7Syy.js"
  },
  "/assets/gallery-BDqXghW9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"189a-mVfrX6igtVdsMwz8DQ6+rwKWIkk"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 6298,
    "path": "../public/assets/gallery-BDqXghW9.js"
  },
  "/assets/folder-tree-B-4FLMIL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-jFCE1a4YC6F0BBxXcSEyYUAFcgo"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 480,
    "path": "../public/assets/folder-tree-B-4FLMIL.js"
  },
  "/assets/house-CytxjBJQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-QHJBYKvkNwL8sCAVcUpAPjAb1UY"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 282,
    "path": "../public/assets/house-CytxjBJQ.js"
  },
  "/assets/geocoding.functions-E8GGY54N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-bxX/mzNDD+9FuUJBa4J3JBEiPFg"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-E8GGY54N.js"
  },
  "/assets/image-DnYFSFsp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-Q2s70GQsRpiQIRKi2kBDfV+N3Wk"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 270,
    "path": "../public/assets/image-DnYFSFsp.js"
  },
  "/assets/index-efMIhf5I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29f01-/L7G2U3AKL0SiHhnuOhZM/6t/w4"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 171777,
    "path": "../public/assets/index-efMIhf5I.js"
  },
  "/assets/index-C4Q_Ym93.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-WFvV+bnkOeNysk8fDajC8mhKsRw"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 290228,
    "path": "../public/assets/index-C4Q_Ym93.js"
  },
  "/assets/key-round-B9UB8if7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-GFafhsZTPk6mXLn7IfNmq1hv4KU"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 356,
    "path": "../public/assets/key-round-B9UB8if7.js"
  },
  "/assets/layers-CRnf6gBd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-k/B2fPeBCJNPhdIHXbXbgTXLOVI"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 422,
    "path": "../public/assets/layers-CRnf6gBd.js"
  },
  "/assets/layout-dashboard-BTKj_vRK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"160-/XN9fNvmdP8gcuck1DV8eSSgHOE"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 352,
    "path": "../public/assets/layout-dashboard-BTKj_vRK.js"
  },
  "/assets/index-iGuAe0zW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f0208-Hs+1tNAlNDgPQLtRDVdOs0b3OFo"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 983560,
    "path": "../public/assets/index-iGuAe0zW.js"
  },
  "/assets/list-Cd9g9cDX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-+yMG8+7DD+dvR9+SqBtAJojprjo"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 303,
    "path": "../public/assets/list-Cd9g9cDX.js"
  },
  "/assets/list-ordered-DnrLakW7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-BL2lOp4RAwI6RpZjMTylquR5dSg"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 644,
    "path": "../public/assets/list-ordered-DnrLakW7.js"
  },
  "/assets/leaflet-src-Dg-fxHHK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-LsOdbYjGz7/9WYclpz5KL014sPg"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Dg-fxHHK.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/map-aY8NnMLN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-QZ7snMhw/YfPWavvUtoImDsEKXo"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 724,
    "path": "../public/assets/map-aY8NnMLN.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-w0sMyiJ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-Wli5Vp2zHhj1W9gvdzwZv6rP5Ac"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 914,
    "path": "../public/assets/maximize-2-w0sMyiJ7.js"
  },
  "/assets/message-square-DnlpFS5C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-kEvr/nfEOUcg51kZ6GgPE5YB23s"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 234,
    "path": "../public/assets/message-square-DnlpFS5C.js"
  },
  "/assets/navigation-BsgFzkLr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-QewpXEdfgFJzFALcxDEElX7GGdM"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 149,
    "path": "../public/assets/navigation-BsgFzkLr.js"
  },
  "/assets/mountain-zb9ExFop.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"244-DoMYpSq6KM9RrnV0rNFwZS23Iyc"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 580,
    "path": "../public/assets/mountain-zb9ExFop.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-28T19:17:16.342Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-28T19:17:16.305Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-Ci2lxKyY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-zlpd4bCksRYc3egKME8x9EnDQp0"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 4524,
    "path": "../public/assets/news._slug-Ci2lxKyY.js"
  },
  "/assets/news._slug-CP7TXt_L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-ryel632wD0hde6nGgkxbLyK/Ks4"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 974,
    "path": "../public/assets/news._slug-CP7TXt_L.js"
  },
  "/assets/PageBreadcrumbs-CBSItLWE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-8+ERuFNcGPLxqLZ+pPL/T+13A5k"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-CBSItLWE.js"
  },
  "/assets/pen-line-CFLzAw-J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-bsUSt0AB/vltLt7fDQFcg773vIs"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 1022,
    "path": "../public/assets/pen-line-CFLzAw-J.js"
  },
  "/assets/pencil-Cj8Bw9Fd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-W0g0LcPNjthG4UZAGRGGnCx1GHE"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 277,
    "path": "../public/assets/pencil-Cj8Bw9Fd.js"
  },
  "/assets/plus-C_5SrwNr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-mC65W2Ly3IUPnp/0E8PWxMk6HD0"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 154,
    "path": "../public/assets/plus-C_5SrwNr.js"
  },
  "/assets/PostCard-PGPO1-zf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-PDxiMQ2xSx5/tKtPHlZjZDWHJzs"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 3935,
    "path": "../public/assets/PostCard-PGPO1-zf.js"
  },
  "/assets/PostEditor-DXWZFYFS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd01-0EWlnyQBvt1DCYl+bGQ+tI6z+ZQ"',
    "mtime": "2026-08-28T19:17:16.347Z",
    "size": 48385,
    "path": "../public/assets/PostEditor-DXWZFYFS.js"
  },
  "/assets/power-Dgsulwpk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-EZ0ZB8OKQby7UqqGcR1i1p/jD3A"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 174,
    "path": "../public/assets/power-Dgsulwpk.js"
  },
  "/assets/privacy-policy-TV2yUzqW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70a-juI3WWTDtNxyHYZa+0V7xNBb+LI"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 1802,
    "path": "../public/assets/privacy-policy-TV2yUzqW.js"
  },
  "/assets/quote-D19NNemx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-ZMB7NBmg8FltiSXERelZWo5sHw0"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 390,
    "path": "../public/assets/quote-D19NNemx.js"
  },
  "/assets/radio-DQX5rhhp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-8ua/bhmqlS3hqX9o9rGKc/BWjxQ"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 375,
    "path": "../public/assets/radio-DQX5rhhp.js"
  },
  "/assets/refresh-cw-k9vnVw4S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-X1MQLCsKkmVUxFKedqS58tOJA5I"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-k9vnVw4S.js"
  },
  "/assets/rocket-5biVTVeE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3c7-LqY61A2/AsmWWzyZNg5aUJIoRWE"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 967,
    "path": "../public/assets/rocket-5biVTVeE.js"
  },
  "/assets/rotate-ccw-C6X8Dhkm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-Y4049s7EEl4qEFVxp1sddotfCwA"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-C6X8Dhkm.js"
  },
  "/assets/route-Ch0fmR3h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-hsZ8x1eWpVMllpfwlg1222efW1o"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 95,
    "path": "../public/assets/route-Ch0fmR3h.js"
  },
  "/assets/route-Deo_ZnKC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-weKMohf3ZsJd6EGXtKiGfFqljAQ"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 543,
    "path": "../public/assets/route-Deo_ZnKC.js"
  },
  "/assets/save-CA3zu4a8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-6fhGjwmyjWJH4QF/tK8DW4XXGHM"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 328,
    "path": "../public/assets/save-CA3zu4a8.js"
  },
  "/assets/settings-BMcI-Pqj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-7XUMYJIXi18smXNkuD3vtD16KJ8"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 488,
    "path": "../public/assets/settings-BMcI-Pqj.js"
  },
  "/assets/scale-9z3uX0-z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-ZsjG0I7kQu3SOsz82DMkx1LeKpM"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 333,
    "path": "../public/assets/scale-9z3uX0-z.js"
  },
  "/assets/share-2-BvZs9Xsi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-cM1m+mPvuipu4atcI3zN0TN8fyY"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 358,
    "path": "../public/assets/share-2-BvZs9Xsi.js"
  },
  "/assets/shield-3V5mpdd-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-D/FdDrAK25HQMkYsgHBgvbCxOxA"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 273,
    "path": "../public/assets/shield-3V5mpdd-.js"
  },
  "/assets/shield-check-DLJ-CH70.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-tztLgbwRO9c5yrfEpfdB0zCtD1A"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 321,
    "path": "../public/assets/shield-check-DLJ-CH70.js"
  },
  "/assets/shield-alert-_JoIOzbZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-GN2dPK7GCC8CppRK72KGK9gCvY0"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 668,
    "path": "../public/assets/shield-alert-_JoIOzbZ.js"
  },
  "/assets/sliders-horizontal-BO_l7JaX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-jU1DrYb+oRoBnXQPI0cRnuVRHak"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-BO_l7JaX.js"
  },
  "/assets/star-D5MoRPYq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-SST5CqjrEsiOI6Jz1/8VU1d44m4"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 473,
    "path": "../public/assets/star-D5MoRPYq.js"
  },
  "/assets/styles-Cs3GnJr0.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2bcc1-Oc6rFqDjwt/t3oZCU1ADZMPVWM0"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 179393,
    "path": "../public/assets/styles-Cs3GnJr0.css"
  },
  "/assets/topics._slug-Ct8nY_8H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-bmO7KTm7h1JwSu1RxYgW0nrPNMU"',
    "mtime": "2026-08-28T19:17:16.343Z",
    "size": 2165,
    "path": "../public/assets/topics._slug-Ct8nY_8H.js"
  },
  "/assets/TranslatedMarkdown-D71-gofj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-bARhr1f3SeAkSE5rOu6JtEJJ7O0"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-D71-gofj.js"
  },
  "/assets/trash-2-DAJo8WZe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-ZFCZXAXz31CONp0yhQx678hsQ+A"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 329,
    "path": "../public/assets/trash-2-DAJo8WZe.js"
  },
  "/assets/trending-up-_89yZ-dO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-PvJmlsYit2673SPEEC5x6fa+Ks0"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 932,
    "path": "../public/assets/trending-up-_89yZ-dO.js"
  },
  "/assets/triangle-alert-CAH41Aly.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-lseHbISf0T8D1efg69H4AvzGey0"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-CAH41Aly.js"
  },
  "/assets/upload-DRDde3X-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-3Yzc8huHJTsGLKiSK2BxgmYjiyw"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 231,
    "path": "../public/assets/upload-DRDde3X-.js"
  },
  "/assets/useMutation-DvgMd_iE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-LLQ4xy9I90AxLAFjZz0GpntyK+Y"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 2211,
    "path": "../public/assets/useMutation-DvgMd_iE.js"
  },
  "/assets/user-plus-DVV2psno.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-e76wBlVg6QSyeKqn/tUalr9MQTQ"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 311,
    "path": "../public/assets/user-plus-DVV2psno.js"
  },
  "/assets/user-x-DsBxZlw_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"412-Z0/BM7rU3rYsyQL2O+FCo3CwuwQ"',
    "mtime": "2026-08-28T19:17:16.345Z",
    "size": 1042,
    "path": "../public/assets/user-x-DsBxZlw_.js"
  },
  "/assets/users-DzMQWThT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-RrrtrwPW29mgzESETepQIWFujpI"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 307,
    "path": "../public/assets/users-DzMQWThT.js"
  },
  "/assets/useSuspenseQuery-DjQnvZcm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-rgGxeoB6FWWtQ4rPE3cQjE9Az0Q"',
    "mtime": "2026-08-28T19:17:16.344Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-DjQnvZcm.js"
  },
  "/assets/utils-DLzA67L5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-/4XdgReKxLWDb86UL3JxHTxA/4g"',
    "mtime": "2026-08-28T19:17:16.346Z",
    "size": 59982,
    "path": "../public/assets/utils-DLzA67L5.js"
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
