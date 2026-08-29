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
  "/assets/about.functions-CGRQkjMl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32f2-xy7Mmuxl30nFdoHKWMbsNKiUs6s"',
    "mtime": "2026-08-29T10:21:14.431Z",
    "size": 13042,
    "path": "../public/assets/about.functions-CGRQkjMl.js"
  },
  "/assets/account-WjWKFyi9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-5RMZ3nDwwMOrVF7xQY8+m/6T46I"',
    "mtime": "2026-08-29T10:21:14.426Z",
    "size": 2068,
    "path": "../public/assets/account-WjWKFyi9.js"
  },
  "/assets/admin-ckK756qc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c1-Geq4WCxWZ3ziL4yhwe1YJN+ldkU"',
    "mtime": "2026-08-29T10:21:14.425Z",
    "size": 2497,
    "path": "../public/assets/admin-ckK756qc.js"
  },
  "/assets/admin.categories-CtNDcdMj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5918-eH0VTpePcu8anH2tsO49xVHyjdo"',
    "mtime": "2026-08-29T10:21:14.438Z",
    "size": 22808,
    "path": "../public/assets/admin.categories-CtNDcdMj.js"
  },
  "/assets/admin.about-VZf1NnNZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11376-ddgrsvha+BAlT+nVc8cXP86HOTY"',
    "mtime": "2026-08-29T10:21:14.439Z",
    "size": 70518,
    "path": "../public/assets/admin.about-VZf1NnNZ.js"
  },
  "/assets/admin.comments-B0l7yh-C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-Nd5pa9FCrQJo9wrsiKcwk6Ba9T8"',
    "mtime": "2026-08-29T10:21:14.438Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-B0l7yh-C.js"
  },
  "/assets/admin.destinations-GC6-uLom.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26ba-gx2oZLPFHUPIjjKGMOkvMyBJZDM"',
    "mtime": "2026-08-29T10:21:14.438Z",
    "size": 9914,
    "path": "../public/assets/admin.destinations-GC6-uLom.js"
  },
  "/assets/admin.gallery-DCx-qkDr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56ba-1STdO/+9PQK/oIn9x4kgPESUVHA"',
    "mtime": "2026-08-29T10:21:14.438Z",
    "size": 22202,
    "path": "../public/assets/admin.gallery-DCx-qkDr.js"
  },
  "/assets/admin.homepage-ieNBi6Ci.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c869-nHfx6vXD0i8hvy7keSulJylMmi8"',
    "mtime": "2026-08-29T10:21:14.438Z",
    "size": 51305,
    "path": "../public/assets/admin.homepage-ieNBi6Ci.js"
  },
  "/assets/admin.index-D27ubrc9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-Um3+MHNCrr6c2fECJ/y95vx7BVg"',
    "mtime": "2026-08-29T10:21:14.426Z",
    "size": 4074,
    "path": "../public/assets/admin.index-D27ubrc9.js"
  },
  "/assets/admin.messages-BTKZSFrI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a9-mmIJ6pyVBtCPuAlHtzuichDcqkU"',
    "mtime": "2026-08-29T10:21:14.429Z",
    "size": 4777,
    "path": "../public/assets/admin.messages-BTKZSFrI.js"
  },
  "/assets/admin.legal-BFUcPwiv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397f-QDiw70tZfCikhbv9I9DusHTtz3Y"',
    "mtime": "2026-08-29T10:21:14.429Z",
    "size": 14719,
    "path": "../public/assets/admin.legal-BFUcPwiv.js"
  },
  "/assets/admin.analytics-BX9yWFxh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64266-ztBC4R8+Nh2q+cmiHY9TC0AfTb8"',
    "mtime": "2026-08-29T10:21:14.439Z",
    "size": 410214,
    "path": "../public/assets/admin.analytics-BX9yWFxh.js"
  },
  "/assets/admin.news-C0hh-FVg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86b5-Ty2zgbT0wjsyWMOltCGfqnLexPA"',
    "mtime": "2026-08-29T10:21:14.428Z",
    "size": 34485,
    "path": "../public/assets/admin.news-C0hh-FVg.js"
  },
  "/assets/admin.posts.new-Dm_8AaT9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"320-1r7lMwmjKxXpGJf4X9ycsyM8jh8"',
    "mtime": "2026-08-29T10:21:14.440Z",
    "size": 800,
    "path": "../public/assets/admin.posts.new-Dm_8AaT9.js"
  },
  "/assets/admin.posts.index-BTSHV55O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a3-WWrtvMNwJbdGvhj87iB2O3BkLXY"',
    "mtime": "2026-08-29T10:21:14.439Z",
    "size": 9635,
    "path": "../public/assets/admin.posts.index-BTSHV55O.js"
  },
  "/assets/admin.posts._id-D-gesXSz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"455-zmxpY1PQkzr3Hq8ynXUJSVDifWg"',
    "mtime": "2026-08-29T10:21:14.440Z",
    "size": 1109,
    "path": "../public/assets/admin.posts._id-D-gesXSz.js"
  },
  "/assets/admin.public-message-DzUbjviv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4cad-I5wgAKq2M8lMsKwVlTKgb+LBirY"',
    "mtime": "2026-08-29T10:21:14.428Z",
    "size": 19629,
    "path": "../public/assets/admin.public-message-DzUbjviv.js"
  },
  "/assets/about-BpXPmO_9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"911f3-URF04hnaIAb92zi7o7unacOvYYE"',
    "mtime": "2026-08-29T10:21:14.448Z",
    "size": 594419,
    "path": "../public/assets/about-BpXPmO_9.js"
  },
  "/assets/admin.settings-BOR5zZ68.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dd4-T8yHwQF/8LuqemnUsx6PY5+caIE"',
    "mtime": "2026-08-29T10:21:14.426Z",
    "size": 15828,
    "path": "../public/assets/admin.settings-BOR5zZ68.js"
  },
  "/assets/admin.subscribers-CKHb-CTp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2baf-WiW7yoOkXsOVg/urJAToiH9M3PU"',
    "mtime": "2026-08-29T10:21:14.426Z",
    "size": 11183,
    "path": "../public/assets/admin.subscribers-CKHb-CTp.js"
  },
  "/assets/AdSlot-DTSHXXor.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-T760wtBR23kjruEF016YVMXug/s"',
    "mtime": "2026-08-29T10:21:14.424Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-DTSHXXor.js"
  },
  "/assets/alert-dialog-i1WOmX6F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-h1zSD55WA0MN5kVvBg0uaOiqB1A"',
    "mtime": "2026-08-29T10:21:14.438Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-i1WOmX6F.js"
  },
  "/assets/arrow-left-DJ3ypMFx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-026/6ZonphtPsdttpzS6kmsamC0"',
    "mtime": "2026-08-29T10:21:14.425Z",
    "size": 166,
    "path": "../public/assets/arrow-left-DJ3ypMFx.js"
  },
  "/assets/arrow-up-right-Bhtpcee7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-6gyRTlHt2WMDiAEn5OKycsvqrFs"',
    "mtime": "2026-08-29T10:21:14.433Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-Bhtpcee7.js"
  },
  "/assets/auth-F7GsZId0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-bHuCA0/ei/Ko9XIqVMWNQsBlC/0"',
    "mtime": "2026-08-29T10:21:14.420Z",
    "size": 7644,
    "path": "../public/assets/auth-F7GsZId0.js"
  },
  "/assets/blog-I6ZglYfE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-yJx75ap86m0ojaUqqmLH2TjyrZw"',
    "mtime": "2026-08-29T10:21:14.420Z",
    "size": 103,
    "path": "../public/assets/blog-I6ZglYfE.js"
  },
  "/assets/blog.index-CiVu1R9x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2791-xmZsj1FV+jj15hscOmSGwf+5yiM"',
    "mtime": "2026-08-29T10:21:14.424Z",
    "size": 10129,
    "path": "../public/assets/blog.index-CiVu1R9x.js"
  },
  "/assets/blog._slug-DVYUuGkb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cdc-DAEsl3ojV+kSAWCQ5TKRptYrGeY"',
    "mtime": "2026-08-29T10:21:14.425Z",
    "size": 27868,
    "path": "../public/assets/blog._slug-DVYUuGkb.js"
  },
  "/assets/book-open-CTeoj_2O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-m4lw/upHqMheBTbnVrggA+pVWVM"',
    "mtime": "2026-08-29T10:21:14.423Z",
    "size": 280,
    "path": "../public/assets/book-open-CTeoj_2O.js"
  },
  "/assets/blog._slug-hCYprGPg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-PGzV1y0Ba3bRCdCOLvOWD6WCDdA"',
    "mtime": "2026-08-29T10:21:14.425Z",
    "size": 572,
    "path": "../public/assets/blog._slug-hCYprGPg.js"
  },
  "/assets/calendar-r6CbkEmY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-NPiiOwX+7gM2rMaVJRLjFsd8U7I"',
    "mtime": "2026-08-29T10:21:14.433Z",
    "size": 258,
    "path": "../public/assets/calendar-r6CbkEmY.js"
  },
  "/assets/category._slug-BOqdNbob.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f10-jGf4GBOh+nY75Huz2jqViZzfakE"',
    "mtime": "2026-08-29T10:21:14.423Z",
    "size": 3856,
    "path": "../public/assets/category._slug-BOqdNbob.js"
  },
  "/assets/chart-column-BuOM6hwd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-bLJKkVMy+yEpzKS5hCpLXAyS94g"',
    "mtime": "2026-08-29T10:21:14.433Z",
    "size": 252,
    "path": "../public/assets/chart-column-BuOM6hwd.js"
  },
  "/assets/check-_aYP5Snp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-AMWWN6iz7LmWDVQTCU28d99cMEQ"',
    "mtime": "2026-08-29T10:21:14.434Z",
    "size": 125,
    "path": "../public/assets/check-_aYP5Snp.js"
  },
  "/assets/chevron-right-Cvte2mm2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-nf6ZA12/wc+b1MeCtafEDGbkEdk"',
    "mtime": "2026-08-29T10:21:14.430Z",
    "size": 131,
    "path": "../public/assets/chevron-right-Cvte2mm2.js"
  },
  "/assets/chevron-left-D6RW4BR2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-i/rKPdudqDSXufpBi9sbvlEZum0"',
    "mtime": "2026-08-29T10:21:14.431Z",
    "size": 131,
    "path": "../public/assets/chevron-left-D6RW4BR2.js"
  },
  "/assets/chevron-down-B8r6XR-7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-PU+xAVb3l1c8takQij+a+qKhud4"',
    "mtime": "2026-08-29T10:21:14.434Z",
    "size": 129,
    "path": "../public/assets/chevron-down-B8r6XR-7.js"
  },
  "/assets/clock-ldCA8ozr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-eEmwu8eNixt40QTQZwon1e0qDz4"',
    "mtime": "2026-08-29T10:21:14.431Z",
    "size": 170,
    "path": "../public/assets/clock-ldCA8ozr.js"
  },
  "/assets/circle-check-BSrRb0iI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-YQ2wngGCfN+cdyclMG+81n4qBTM"',
    "mtime": "2026-08-29T10:21:14.430Z",
    "size": 179,
    "path": "../public/assets/circle-check-BSrRb0iI.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-29T10:21:14.437Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-B8o2SyO0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-W/6aBqFxT/LjbMZU+/LYTV8SU3o"',
    "mtime": "2026-08-29T10:21:14.432Z",
    "size": 252,
    "path": "../public/assets/compass-B8o2SyO0.js"
  },
  "/assets/contact-sUxQ0A8A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a0a-zYPEK5IVOivy46F9LftMbJ6J2oY"',
    "mtime": "2026-08-29T10:21:14.420Z",
    "size": 14858,
    "path": "../public/assets/contact-sUxQ0A8A.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T10:21:14.420Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations.index-Br1Fp0iE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1437-WBUHuQleXZ2kAE7+eU3iG3g2sxA"',
    "mtime": "2026-08-29T10:21:14.424Z",
    "size": 5175,
    "path": "../public/assets/destinations.index-Br1Fp0iE.js"
  },
  "/assets/destinations-D9K2YQ50.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-QmS3CpP7X1vRfrgOAu2xsQSf8Vg"',
    "mtime": "2026-08-29T10:21:14.420Z",
    "size": 103,
    "path": "../public/assets/destinations-D9K2YQ50.js"
  },
  "/assets/destinations._slug-cYzg0aX8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cea-9He0NzfSoycVh6iNPPbBJpQWtes"',
    "mtime": "2026-08-29T10:21:14.424Z",
    "size": 7402,
    "path": "../public/assets/destinations._slug-cYzg0aX8.js"
  },
  "/assets/destinations._slug-DZ2w-wsK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-IgPxgmsUkmZPjsuKeW5bZBRN2oE"',
    "mtime": "2026-08-29T10:21:14.424Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DZ2w-wsK.js"
  },
  "/assets/DestinationsMap-BuIBYHjd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f65-JwlNhCoLeAUiUk0fGo9gms1cGTU"',
    "mtime": "2026-08-29T10:21:14.440Z",
    "size": 3941,
    "path": "../public/assets/DestinationsMap-BuIBYHjd.js"
  },
  "/assets/dialog-bbFlCd8_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-/HUihC/qklHmdkyxUdQvgZLqf0E"',
    "mtime": "2026-08-29T10:21:14.429Z",
    "size": 1830,
    "path": "../public/assets/dialog-bbFlCd8_.js"
  },
  "/assets/disclaimer-jeSxEbXt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706-39aFN/qg2Yc/o5mn3JWOoqYr8ME"',
    "mtime": "2026-08-29T10:21:14.420Z",
    "size": 1798,
    "path": "../public/assets/disclaimer-jeSxEbXt.js"
  },
  "/assets/earth-DsbSWNEv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-tqRodOmi6rVHi39MHyxW5u2/PnI"',
    "mtime": "2026-08-29T10:21:14.423Z",
    "size": 394,
    "path": "../public/assets/earth-DsbSWNEv.js"
  },
  "/assets/external-link-Cpto0h4L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-oAd6CwgrESg5TW5AODtpzVjZ7SA"',
    "mtime": "2026-08-29T10:21:14.434Z",
    "size": 252,
    "path": "../public/assets/external-link-Cpto0h4L.js"
  },
  "/assets/eye-off-BnOpXhdP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-86/2wBiWA7qoCOF0CA9/xCYyb+w"',
    "mtime": "2026-08-29T10:21:14.434Z",
    "size": 431,
    "path": "../public/assets/eye-off-BnOpXhdP.js"
  },
  "/assets/eye-CqxhzCGb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-927Reksuh+RO1EHM/8DwTpwifm4"',
    "mtime": "2026-08-29T10:21:14.434Z",
    "size": 257,
    "path": "../public/assets/eye-CqxhzCGb.js"
  },
  "/assets/flame-CD8Fw15M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-/TGKgKH/pzQLU3rQSTOmUaWNxYE"',
    "mtime": "2026-08-29T10:21:14.429Z",
    "size": 200,
    "path": "../public/assets/flame-CD8Fw15M.js"
  },
  "/assets/gallery-MGx7Wxfk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"189a-7htCFasi5/8+2mrcEhcrQc/gjBY"',
    "mtime": "2026-08-29T10:21:14.420Z",
    "size": 6298,
    "path": "../public/assets/gallery-MGx7Wxfk.js"
  },
  "/assets/folder-tree-BjarHOSC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-KqBvT95cDOBYALURtPPbz3m74JI"',
    "mtime": "2026-08-29T10:21:14.435Z",
    "size": 480,
    "path": "../public/assets/folder-tree-BjarHOSC.js"
  },
  "/assets/geocoding.functions-BTvP55Ij.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-Pw6+Ogc4rUGN/1NGPVCMsGYW1NA"',
    "mtime": "2026-08-29T10:21:14.439Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-BTvP55Ij.js"
  },
  "/assets/grip-vertical-But3HXvN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-1Iw7+LIkWBQE19+XaUfXrSpf8AU"',
    "mtime": "2026-08-29T10:21:14.434Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-But3HXvN.js"
  },
  "/assets/image-BFhtXX8j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-Ja2dCr2uLcK2jHTMO8SMu3BtA6s"',
    "mtime": "2026-08-29T10:21:14.435Z",
    "size": 270,
    "path": "../public/assets/image-BFhtXX8j.js"
  },
  "/assets/index-CoWxnUzZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29f0d-3Cz8EFDfHk/+0a/LzxBLzG1ublQ"',
    "mtime": "2026-08-29T10:21:14.422Z",
    "size": 171789,
    "path": "../public/assets/index-CoWxnUzZ.js"
  },
  "/assets/key-round-nyJHNpmp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-SksvfHk5JlNUDX4acuocrKIakz4"',
    "mtime": "2026-08-29T10:21:14.428Z",
    "size": 356,
    "path": "../public/assets/key-round-nyJHNpmp.js"
  },
  "/assets/layout-dashboard-CFkAytJ4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"249-Tok/D7n2I92nw85n3kGRgm5LIDM"',
    "mtime": "2026-08-29T10:21:14.426Z",
    "size": 585,
    "path": "../public/assets/layout-dashboard-CFkAytJ4.js"
  },
  "/assets/index-BOgGOBhy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-eg1jfJk/Pf0hU3KpyqMLubh1fN8"',
    "mtime": "2026-08-29T10:21:14.430Z",
    "size": 290228,
    "path": "../public/assets/index-BOgGOBhy.js"
  },
  "/assets/layers-BBpecyC_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-QxQGZCdDtvuqcQrY6Z3JPE7FNzk"',
    "mtime": "2026-08-29T10:21:14.432Z",
    "size": 422,
    "path": "../public/assets/layers-BBpecyC_.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-29T10:21:14.419Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/leaflet-src-Cu2BHIqQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-i9Z5UCLqkNhSBPzkRF/pxviGDyY"',
    "mtime": "2026-08-29T10:21:14.441Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Cu2BHIqQ.js"
  },
  "/assets/index-CZbik_Xb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f0259-PszFZDFvdzIo546at7KvrobY2vw"',
    "mtime": "2026-08-29T10:21:14.442Z",
    "size": 983641,
    "path": "../public/assets/index-CZbik_Xb.js"
  },
  "/assets/list-D4P2nFOj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-5NDoghQ9TzOaoGX3r1GWzxUZWsk"',
    "mtime": "2026-08-29T10:21:14.435Z",
    "size": 303,
    "path": "../public/assets/list-D4P2nFOj.js"
  },
  "/assets/list-ordered-CE_7IvUG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-pKdzcMHiZ3NjqnKqJ4dFDnvf9Oc"',
    "mtime": "2026-08-29T10:21:14.430Z",
    "size": 644,
    "path": "../public/assets/list-ordered-CE_7IvUG.js"
  },
  "/assets/map-CDUbmC3M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-mEm0SJYzdTsOJ65XR7J6huNmDiM"',
    "mtime": "2026-08-29T10:21:14.424Z",
    "size": 724,
    "path": "../public/assets/map-CDUbmC3M.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T10:21:14.419Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-ByWyVVPr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-ixPN71fPmSIZq5yoxqvWzLe8Uq0"',
    "mtime": "2026-08-29T10:21:14.435Z",
    "size": 239,
    "path": "../public/assets/maximize-2-ByWyVVPr.js"
  },
  "/assets/message-square-Cn8ocknQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-EkPakX2EYbvGF1uduIMnlwc1LkM"',
    "mtime": "2026-08-29T10:21:14.426Z",
    "size": 234,
    "path": "../public/assets/message-square-Cn8ocknQ.js"
  },
  "/assets/mountain-CaOMfdj-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-osPvj9izzuDzrhLOQnjwxEqz/rE"',
    "mtime": "2026-08-29T10:21:14.432Z",
    "size": 377,
    "path": "../public/assets/mountain-CaOMfdj-.js"
  },
  "/assets/navigation-DSjSM9Cf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-5h9jW3Lc/DcHAaJH8zsLdnFghA0"',
    "mtime": "2026-08-29T10:21:14.435Z",
    "size": 149,
    "path": "../public/assets/navigation-DSjSM9Cf.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-29T10:21:14.419Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-29T10:21:14.389Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-DaqCPISU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-Ig8i0Fk77wpgtLgkF8wzBX8KlSQ"',
    "mtime": "2026-08-29T10:21:14.423Z",
    "size": 4524,
    "path": "../public/assets/news._slug-DaqCPISU.js"
  },
  "/assets/news._slug-DPwNtKM2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-BYIjpNBzBuvtTEUi3ZtiNjsXj2o"',
    "mtime": "2026-08-29T10:21:14.423Z",
    "size": 974,
    "path": "../public/assets/news._slug-DPwNtKM2.js"
  },
  "/assets/PageBreadcrumbs-u44gKuuo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-HI58vltNTMGj7tnOSRC8QDyqrlU"',
    "mtime": "2026-08-29T10:21:14.425Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-u44gKuuo.js"
  },
  "/assets/pencil-D7nqDy9Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-26HklEIhgLoI5+2wipndz4xh/So"',
    "mtime": "2026-08-29T10:21:14.435Z",
    "size": 277,
    "path": "../public/assets/pencil-D7nqDy9Y.js"
  },
  "/assets/pen-line-CLMbzd5o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-arokfUt9rO+zX7+ubFJ7Vi6XzrU"',
    "mtime": "2026-08-29T10:21:14.433Z",
    "size": 1022,
    "path": "../public/assets/pen-line-CLMbzd5o.js"
  },
  "/assets/plus-Vv8JwTZo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-rDgS2mRJt7OSDL0u8ZZzA8qLbLs"',
    "mtime": "2026-08-29T10:21:14.435Z",
    "size": 154,
    "path": "../public/assets/plus-Vv8JwTZo.js"
  },
  "/assets/PostCard-CaX4gPvc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-JUC17y8Nc73Rl8CaxxZI9aMB6w4"',
    "mtime": "2026-08-29T10:21:14.425Z",
    "size": 3935,
    "path": "../public/assets/PostCard-CaX4gPvc.js"
  },
  "/assets/PostEditor-TB66HlDc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd2a-oKiFDERSTvTSFffTe4+S+CVzV3Y"',
    "mtime": "2026-08-29T10:21:14.440Z",
    "size": 48426,
    "path": "../public/assets/PostEditor-TB66HlDc.js"
  },
  "/assets/power-BcGBerAb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-JI/k8xyIfLcdbho1ko4se2+3Uus"',
    "mtime": "2026-08-29T10:21:14.428Z",
    "size": 174,
    "path": "../public/assets/power-BcGBerAb.js"
  },
  "/assets/privacy-policy-g7lImKVn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70a-HmalZB4Ri+EvyM/lJZdpUUT92JA"',
    "mtime": "2026-08-29T10:21:14.419Z",
    "size": 1802,
    "path": "../public/assets/privacy-policy-g7lImKVn.js"
  },
  "/assets/quote-C10mZKqN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-XQWWWgibsOJenwsZltlTdLTtmas"',
    "mtime": "2026-08-29T10:21:14.432Z",
    "size": 390,
    "path": "../public/assets/quote-C10mZKqN.js"
  },
  "/assets/radio-BfIkhqvu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-JnwU+fyA2Dn8qH7shkP/wk7xFoU"',
    "mtime": "2026-08-29T10:21:14.429Z",
    "size": 375,
    "path": "../public/assets/radio-BfIkhqvu.js"
  },
  "/assets/refresh-cw-CJXALYe4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-sYA4TwwKH/sdRrBBd+Aq1s5+6/o"',
    "mtime": "2026-08-29T10:21:14.435Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-CJXALYe4.js"
  },
  "/assets/rocket-D_9yFEqb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"75b-gZ5lRhLocCdXt+Dd5l1uLFVcj0w"',
    "mtime": "2026-08-29T10:21:14.433Z",
    "size": 1883,
    "path": "../public/assets/rocket-D_9yFEqb.js"
  },
  "/assets/rotate-ccw-Dw4kId_l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-ac+dz73ar/ia7xyCtj5ZI3ozBrM"',
    "mtime": "2026-08-29T10:21:14.436Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-Dw4kId_l.js"
  },
  "/assets/route-C0C6U6Oz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-2oiBe1pILPVI1ZZghoPAcYXlVhM"',
    "mtime": "2026-08-29T10:21:14.422Z",
    "size": 543,
    "path": "../public/assets/route-C0C6U6Oz.js"
  },
  "/assets/route-W5OEZzrS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-W7zTr3OXZnTj0VECw6sXE9KZNfI"',
    "mtime": "2026-08-29T10:21:14.422Z",
    "size": 95,
    "path": "../public/assets/route-W5OEZzrS.js"
  },
  "/assets/save-ehD1fnZ8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-K0oHlJSYb5R9LqcX69BLjUrOwvc"',
    "mtime": "2026-08-29T10:21:14.436Z",
    "size": 328,
    "path": "../public/assets/save-ehD1fnZ8.js"
  },
  "/assets/scale-B2l8LOf6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-9xJi3zdPsBglY+mSUA6bMRwcYeg"',
    "mtime": "2026-08-29T10:21:14.430Z",
    "size": 333,
    "path": "../public/assets/scale-B2l8LOf6.js"
  },
  "/assets/settings-D8Yt_D36.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-LOOHGdZHe3JDwiYkIuUwuRDHtLQ"',
    "mtime": "2026-08-29T10:21:14.436Z",
    "size": 488,
    "path": "../public/assets/settings-D8Yt_D36.js"
  },
  "/assets/share-2-BLxsqikC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-7IyTg4Y8h2mS0nb7cdZI7CzrKhw"',
    "mtime": "2026-08-29T10:21:14.436Z",
    "size": 358,
    "path": "../public/assets/share-2-BLxsqikC.js"
  },
  "/assets/shield-alert-BbO6cu-E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-AekEZCS8/A2zGXlAvh0IzHueqhM"',
    "mtime": "2026-08-29T10:21:14.420Z",
    "size": 668,
    "path": "../public/assets/shield-alert-BbO6cu-E.js"
  },
  "/assets/shield-BDPmEfkn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-GqBFXH5fE+Po1kM7Q7AN5/Wf8tk"',
    "mtime": "2026-08-29T10:21:14.432Z",
    "size": 273,
    "path": "../public/assets/shield-BDPmEfkn.js"
  },
  "/assets/shield-check-DMEIE9Ov.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-NsJxCOJRM/i2obB9dTIj49F0kYQ"',
    "mtime": "2026-08-29T10:21:14.428Z",
    "size": 321,
    "path": "../public/assets/shield-check-DMEIE9Ov.js"
  },
  "/assets/sliders-horizontal-u2yL-rLH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-eB+Yqlp+4KteDuAyAj9EXydZ3jc"',
    "mtime": "2026-08-29T10:21:14.424Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-u2yL-rLH.js"
  },
  "/assets/star-CIA4-g5-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-dEO8b6N+jeajH7Zu5JyOT6P7Ocg"',
    "mtime": "2026-08-29T10:21:14.436Z",
    "size": 473,
    "path": "../public/assets/star-CIA4-g5-.js"
  },
  "/assets/topics._slug-C0s_rjcP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-Mi44MKxcfuQqsV5+0iloM2wkVFU"',
    "mtime": "2026-08-29T10:21:14.422Z",
    "size": 2165,
    "path": "../public/assets/topics._slug-C0s_rjcP.js"
  },
  "/assets/TranslatedMarkdown-C0ZXe0LY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-Nfw7g1G6qn1KpXPWK04yQXZibqg"',
    "mtime": "2026-08-29T10:21:14.423Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-C0ZXe0LY.js"
  },
  "/assets/styles-BM3VlQYf.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2d1ff-/EZUvjYBQ1K4sikNggtikGyYYYo"',
    "mtime": "2026-08-29T10:21:14.419Z",
    "size": 184831,
    "path": "../public/assets/styles-BM3VlQYf.css"
  },
  "/assets/trash-2-DNyycSF5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-mI8zG41jkvD1sZyTmIVORwbT+T0"',
    "mtime": "2026-08-29T10:21:14.437Z",
    "size": 329,
    "path": "../public/assets/trash-2-DNyycSF5.js"
  },
  "/assets/triangle-alert-cNqA2yVc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-XJsGCjlBVAdAwf7h+Z81E/iW3lY"',
    "mtime": "2026-08-29T10:21:14.433Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-cNqA2yVc.js"
  },
  "/assets/trending-up-CvbwMJJZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-wLJ2OQnmrsJX1oK5CNI3uN8k6Ig"',
    "mtime": "2026-08-29T10:21:14.433Z",
    "size": 932,
    "path": "../public/assets/trending-up-CvbwMJJZ.js"
  },
  "/assets/upload-B61hxKGL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-3EnnRBMU4BToh3IRDCymQyw2YZ0"',
    "mtime": "2026-08-29T10:21:14.436Z",
    "size": 231,
    "path": "../public/assets/upload-B61hxKGL.js"
  },
  "/assets/user-plus-B0FU233B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-J8Was0aN+7aHhPIhNXL/967gSB4"',
    "mtime": "2026-08-29T10:21:14.428Z",
    "size": 311,
    "path": "../public/assets/user-plus-B0FU233B.js"
  },
  "/assets/useMutation-Dvw2nsu2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-mQjrjml3LcEjXFgmzEsBAbUg38g"',
    "mtime": "2026-08-29T10:21:14.437Z",
    "size": 2211,
    "path": "../public/assets/useMutation-Dvw2nsu2.js"
  },
  "/assets/user-x-CqvIr3xV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"412-pqKdkfcOJNVTGAQ/jesQ3hfnjjQ"',
    "mtime": "2026-08-29T10:21:14.426Z",
    "size": 1042,
    "path": "../public/assets/user-x-CqvIr3xV.js"
  },
  "/assets/users-CB_bt055.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-+ic9wthZWo7ChDIiExkqKCj/N5s"',
    "mtime": "2026-08-29T10:21:14.437Z",
    "size": 307,
    "path": "../public/assets/users-CB_bt055.js"
  },
  "/assets/useSuspenseQuery-BqvqpBgk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-jKzL5+j64Qh+ER6gwRtN4+T6iiQ"',
    "mtime": "2026-08-29T10:21:14.425Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-BqvqpBgk.js"
  },
  "/assets/utils-6VkzzPOa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-N2vL7ErPsuRRAXv0IJxMhZpxV7w"',
    "mtime": "2026-08-29T10:21:14.437Z",
    "size": 59982,
    "path": "../public/assets/utils-6VkzzPOa.js"
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
