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
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/assets/about-BurYGQhK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f2f-LgBix2Uz1vHNzURxWInVWSDezRg"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 3887,
    "path": "../public/assets/about-BurYGQhK.js"
  },
  "/assets/account-BtYM_BpE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-Wm87Q3VJhKevYACZrQ6poKfgwsc"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 2068,
    "path": "../public/assets/account-BtYM_BpE.js"
  },
  "/assets/admin-BK_TTOEc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7f7-rMGjS0eax7P53v0LY9G10Ty3CUE"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 2039,
    "path": "../public/assets/admin-BK_TTOEc.js"
  },
  "/assets/admin.comments-DNWeUOtG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8dc-3K29ybN3aN7oGT1U/ECjbsOkeOc"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 2268,
    "path": "../public/assets/admin.comments-DNWeUOtG.js"
  },
  "/assets/admin.destinations-MEYJ34cy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"145a-x2WU+a8WT+5C1EQhkYNO4qtJpag"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 5210,
    "path": "../public/assets/admin.destinations-MEYJ34cy.js"
  },
  "/assets/admin.index-BZttBO6h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e48-FQW7Eykuj6S2XvfMcaKBU2S04ns"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 3656,
    "path": "../public/assets/admin.index-BZttBO6h.js"
  },
  "/assets/admin.messages-CaSxtmkR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1309-2VOZHbI+0MCzKl9EIB8XLrA4nio"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 4873,
    "path": "../public/assets/admin.messages-CaSxtmkR.js"
  },
  "/assets/admin.posts.new-ca5uT3sL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-kd1Lo228Fi600L/zSa1PqVcTXD0"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-ca5uT3sL.js"
  },
  "/assets/admin.posts.index-DxITJs75.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11cf9-i1SW6RBN6uDydKeDScAKHGfFo2g"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 72953,
    "path": "../public/assets/admin.posts.index-DxITJs75.js"
  },
  "/assets/admin.posts._id-XgI5v-Lm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-xvwWw0xZcDGBTAPY50UIL9f0LV4"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-XgI5v-Lm.js"
  },
  "/assets/admin.subscribers-rsmnYmkc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f71-Vzn1r8xtls6LaenH+gehCYUciLE"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 12145,
    "path": "../public/assets/admin.subscribers-rsmnYmkc.js"
  },
  "/assets/arrow-left-DphNXq-7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-BGrnKc4KuyLuBTQ4+i90kr4a3VY"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 166,
    "path": "../public/assets/arrow-left-DphNXq-7.js"
  },
  "/assets/admin.analytics-CV_JGgwf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"645ed-OdXUbqPYZuPkhTFoiC9FnTWtLUs"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 411117,
    "path": "../public/assets/admin.analytics-CV_JGgwf.js"
  },
  "/assets/arrow-right-BP5MX1aV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-lJEFsd55at6yHPJ/f5Qp/Z4Zbrk"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 166,
    "path": "../public/assets/arrow-right-BP5MX1aV.js"
  },
  "/assets/arrow-up-right-LesDA_64.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-BzrcaomlPOn1yia49oiWn/oqXjY"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-LesDA_64.js"
  },
  "/assets/auth-XWxwMDAD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f05-YdGirkdPwSpNconktch0nN+HPdo"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 7941,
    "path": "../public/assets/auth-XWxwMDAD.js"
  },
  "/assets/blog-DaUEH_oE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-l1Y35RoxSkEetY+pPPmqZa/W+no"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 103,
    "path": "../public/assets/blog-DaUEH_oE.js"
  },
  "/assets/blog.index-CvnTTqdP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2327-pdAqkZLgkJpV6YDMN3leT+MQw+0"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 8999,
    "path": "../public/assets/blog.index-CvnTTqdP.js"
  },
  "/assets/blog._slug-2tmSURHp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4bb4-rcHYhqSGWRunjl+xBtI3N9KOa9M"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 19380,
    "path": "../public/assets/blog._slug-2tmSURHp.js"
  },
  "/assets/blog._slug-GBn--3WW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"237-X7+BF8J4yINPv/lTdUoS0JfEyG0"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 567,
    "path": "../public/assets/blog._slug-GBn--3WW.js"
  },
  "/assets/calendar-DZaInEbP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-CYYTt+3ygg4OlSKcQhWlj542o88"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 258,
    "path": "../public/assets/calendar-DZaInEbP.js"
  },
  "/assets/chevron-right-Drdc3_DG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5-bmpkUTJJRbdMCYyp6zcfgHyLQRM"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 213,
    "path": "../public/assets/chevron-right-Drdc3_DG.js"
  },
  "/assets/circle-check-Bf77kC5O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-Hc93LBqf6bJQcH8TMERmef3Cp7w"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 174,
    "path": "../public/assets/circle-check-Bf77kC5O.js"
  },
  "/assets/clock-BRZC8fXZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-97Kc7Vw5cmglR/frfF9lDPvarGQ"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 165,
    "path": "../public/assets/clock-BRZC8fXZ.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-DPEWQ3L_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17da-hdOUgg0hKffeQQjEB381gU7DdD4"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 6106,
    "path": "../public/assets/contact-DPEWQ3L_.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-BCL1tpIR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-6/VV+tqNah70f3PvIB4OFfQm1tw"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 103,
    "path": "../public/assets/destinations-BCL1tpIR.js"
  },
  "/assets/destinations.index-DKtm_-iL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"162b-cRNhm1gctnF6hnSBdiHOIuBNB5Y"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 5675,
    "path": "../public/assets/destinations.index-DKtm_-iL.js"
  },
  "/assets/destinations._slug-CZUZwutr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c23-7u+LkSDajBvxxwEsuUMIy1OZKDk"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 7203,
    "path": "../public/assets/destinations._slug-CZUZwutr.js"
  },
  "/assets/destinations._slug-DwfOmu2c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-nYbj3JOBAvVYsi87PxurCK3omBk"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DwfOmu2c.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-16T21:15:14.935Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/DestinationsMap-DAjdsI6T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-/lDyhGE2L0bOpkQ70bq7/HLDSbY"',
    "mtime": "2026-08-16T21:15:14.938Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-DAjdsI6T.js"
  },
  "/assets/eye-DzTyLu0v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-ZCGWl9GZ1npM7yboUn0KbH/WbOk"',
    "mtime": "2026-08-16T21:15:14.938Z",
    "size": 252,
    "path": "../public/assets/eye-DzTyLu0v.js"
  },
  "/assets/gallery-Co5YUhSg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1831-GmeqQ5r2NcSobp+XR7iBZE2NwcE"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 6193,
    "path": "../public/assets/gallery-Co5YUhSg.js"
  },
  "/assets/index-Bcjso70N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ceca-DX/q36uG0LLjMY3u8Y0NK9QmLTg"',
    "mtime": "2026-08-16T21:15:14.938Z",
    "size": 118474,
    "path": "../public/assets/index-Bcjso70N.js"
  },
  "/assets/mail-LCPRilod.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-Ae1IUZjEq5XBImBcbi08mrVpnt8"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 214,
    "path": "../public/assets/mail-LCPRilod.js"
  },
  "/assets/map-6pzOCE0P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-UBEAVHIq2Wm814CbzOxxs6gnUvc"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 426,
    "path": "../public/assets/map-6pzOCE0P.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-16T21:15:14.935Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-CvtG0wxm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b5-NCkPyG5PmGSviKPNUSdybi38fUY"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 437,
    "path": "../public/assets/message-square-CvtG0wxm.js"
  },
  "/assets/index-FDvvXpet.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21a19-Y8mMp5cbddPwMYFxPEkctFIoVtA"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 137753,
    "path": "../public/assets/index-FDvvXpet.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-16T21:15:14.928Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-BR96kwbt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-3C+3LCjUC4aCeD7N3To/nvGpFzM"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 154,
    "path": "../public/assets/plus-BR96kwbt.js"
  },
  "/assets/PostCard-AQKwB8DU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"88b-upmfT9tA0zlyRoebWlCeBnxuT2A"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 2187,
    "path": "../public/assets/PostCard-AQKwB8DU.js"
  },
  "/assets/leaflet-src-Bv4ATY6M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-RpuL44u3KYfytkSTJxJEvnZZm5Y"',
    "mtime": "2026-08-16T21:15:14.939Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Bv4ATY6M.js"
  },
  "/assets/index-C15Dp4b5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d52ed-sNnBdhYLSdt/Q347C0/1n7x5CgE"',
    "mtime": "2026-08-16T21:15:14.938Z",
    "size": 873197,
    "path": "../public/assets/index-C15Dp4b5.js"
  },
  "/assets/refresh-cw-Ca4Hhavt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-ti2GlvdI8EAU0kAYLrgfeGCpf78"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-Ca4Hhavt.js"
  },
  "/assets/PostEditor-CejW0BOp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5030-lbypPBm7BtMM4GEJoIQF8L7oT1c"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 20528,
    "path": "../public/assets/PostEditor-CejW0BOp.js"
  },
  "/assets/route-DtQrNf5d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-XMetTrpnoP3WqX9bTSjte630p6k"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 95,
    "path": "../public/assets/route-DtQrNf5d.js"
  },
  "/assets/share-2-MMEuZ806.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"161-8X2coOQAxKE/LmCqv3+1xp/A4vA"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 353,
    "path": "../public/assets/share-2-MMEuZ806.js"
  },
  "/assets/sparkles-CzhVHjdS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-5PbJEI0zs/wOyfIdnNrCjAUXYnk"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 495,
    "path": "../public/assets/sparkles-CzhVHjdS.js"
  },
  "/assets/star-BgiKiLCc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-SnkcBAEAcJDTnW2j3G3l7enqKdk"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 473,
    "path": "../public/assets/star-BgiKiLCc.js"
  },
  "/assets/trash-2-Cmuq_jWK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-HpNumr4oRGkbI7kwwLc2wd7D8bY"',
    "mtime": "2026-08-16T21:15:14.938Z",
    "size": 329,
    "path": "../public/assets/trash-2-Cmuq_jWK.js"
  },
  "/assets/useBaseQuery-Cz2N5nBt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-dvp73eOnYWrvSqC++8DVD6seADY"',
    "mtime": "2026-08-16T21:15:14.938Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-Cz2N5nBt.js"
  },
  "/assets/styles-C8S9TD4h.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1ec63-Dbci9Ki/FMVk2r2HqOYcf+b0A5c"',
    "mtime": "2026-08-16T21:15:14.935Z",
    "size": 126051,
    "path": "../public/assets/styles-C8S9TD4h.css"
  },
  "/assets/useMutation-D3L_kOQO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-io434UOBclwrpKKWzyEQEV64kwM"',
    "mtime": "2026-08-16T21:15:14.938Z",
    "size": 2210,
    "path": "../public/assets/useMutation-D3L_kOQO.js"
  },
  "/assets/useQuery-Cp7rlRoG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-NxHM0Mno02ICPli3msU7wjYENgU"',
    "mtime": "2026-08-16T21:15:14.938Z",
    "size": 100,
    "path": "../public/assets/useQuery-Cp7rlRoG.js"
  },
  "/assets/users-Nves7Pct.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-fkZmMQNRGB+dg9iecMLYBIdLGLw"',
    "mtime": "2026-08-16T21:15:14.937Z",
    "size": 307,
    "path": "../public/assets/users-Nves7Pct.js"
  },
  "/assets/useSuspenseQuery-CgjY6hF2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-cKalcnEuv7gcJsOwvtT8BEuV/J0"',
    "mtime": "2026-08-16T21:15:14.936Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-CgjY6hF2.js"
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
