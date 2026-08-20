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
  "/assets/about-n4CJg-l2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bf8-zlAgjcXzd/E8GoGi9WKQUxtePKc"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 3064,
    "path": "../public/assets/about-n4CJg-l2.js"
  },
  "/assets/account-BAT8H8g0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-Mrxr6iEruFlEJpiBaFnXB3Kg9cs"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 2068,
    "path": "../public/assets/account-BAT8H8g0.js"
  },
  "/assets/admin-Ipfg_mTx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a8-7PM4xQXSPYT+A0WQVOpWcCxoZr4"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 2216,
    "path": "../public/assets/admin-Ipfg_mTx.js"
  },
  "/assets/admin.comments-HJsJO2ce.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8dc-k4boiicOgWyrgjrhm73NvjezN+4"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 2268,
    "path": "../public/assets/admin.comments-HJsJO2ce.js"
  },
  "/assets/admin.destinations-BpdTpLY4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23a6-Z8rz5fDgyuR6m5syGnrTW65lYFk"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 9126,
    "path": "../public/assets/admin.destinations-BpdTpLY4.js"
  },
  "/assets/admin.gallery-DoLXk2ZK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"57de-2YF52iSNQLC9ZJWvB+l3P94e5Nc"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 22494,
    "path": "../public/assets/admin.gallery-DoLXk2ZK.js"
  },
  "/assets/admin.index-CbdKuQ9s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104b-8JR9jTXUbJi9K9QB1Vmb3P/z4Eo"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 4171,
    "path": "../public/assets/admin.index-CbdKuQ9s.js"
  },
  "/assets/admin.messages-CfIcoX0_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1309-BRqYKFdZwvHNN+KzHLgs/vSatzc"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 4873,
    "path": "../public/assets/admin.messages-CfIcoX0_.js"
  },
  "/assets/admin.posts.index-CJ8hr-f-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2463-WrKSCEwb8J7KUUhrf975rDauKwc"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 9315,
    "path": "../public/assets/admin.posts.index-CJ8hr-f-.js"
  },
  "/assets/admin.posts.new-lrxZRXsu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27e-AkgEge8MqnWFAzDT41TuzRlCrO0"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 638,
    "path": "../public/assets/admin.posts.new-lrxZRXsu.js"
  },
  "/assets/admin.posts._id-CbGP3YRx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b7-Z9JsdO1CHEzjjf47+DByIj1Viq8"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 951,
    "path": "../public/assets/admin.posts._id-CbGP3YRx.js"
  },
  "/assets/admin.settings-BVg1udAV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28d7-puvkajiHwrdFvcqVaEg7V4rwsoo"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 10455,
    "path": "../public/assets/admin.settings-BVg1udAV.js"
  },
  "/assets/admin.subscribers-CDB-A27a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f74-Ndh9Cv8E5AxTOnnqMxIEhF0hgrA"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 12148,
    "path": "../public/assets/admin.subscribers-CDB-A27a.js"
  },
  "/assets/alert-dialog-M8VO-OEd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10249-9znzKoKZuhSgBGK8JL7VKSD5vdY"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 66121,
    "path": "../public/assets/alert-dialog-M8VO-OEd.js"
  },
  "/assets/arrow-left-sKmR-fE6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-vke08hDzoGJk0vP/ZL+r1OUzAvY"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 166,
    "path": "../public/assets/arrow-left-sKmR-fE6.js"
  },
  "/assets/arrow-right-ZqpWR9x7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-ZSpsIow6afe1tgHCCe4Vl6j1tLU"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 166,
    "path": "../public/assets/arrow-right-ZqpWR9x7.js"
  },
  "/assets/arrow-up-right-Dz0chdLQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-ArbKinyaczTsuELCwk5VCYmveIU"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-Dz0chdLQ.js"
  },
  "/assets/auth-Hf8h6sev.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f05-I+CyV9RUeB10tWFh4N1KMXP+pB4"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 7941,
    "path": "../public/assets/auth-Hf8h6sev.js"
  },
  "/assets/blog-CqhzSrYj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-c/Ve94e5PxXJvNVbfqoFGpJgGYY"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 103,
    "path": "../public/assets/blog-CqhzSrYj.js"
  },
  "/assets/admin.analytics-bWeL_Idp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"645ee-uesIsT4jIKU04vMeB2yQwZNVjZ0"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 411118,
    "path": "../public/assets/admin.analytics-bWeL_Idp.js"
  },
  "/favicon.png": {
    "type": "image/png",
    "etag": '"491-mnU3CPL5fB13KzfG4nVJvCRwZ+0"',
    "mtime": "2026-07-10T12:03:22.000Z",
    "size": 1169,
    "path": "../public/favicon.png"
  },
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/assets/blog._slug-B1Ttyqj8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-yrWRKv8XG2vKSjdFUv2cxMrW6Is"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 572,
    "path": "../public/assets/blog._slug-B1Ttyqj8.js"
  },
  "/assets/blog.index-Cp2lJ158.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2385-PU5KykUhzyCwTUiXGI8gJ3cWfYU"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 9093,
    "path": "../public/assets/blog.index-Cp2lJ158.js"
  },
  "/assets/blog._slug-DjhSKazf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5840-9FSoYWNmxsK2ddKd9AaKNMPr940"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 22592,
    "path": "../public/assets/blog._slug-DjhSKazf.js"
  },
  "/assets/circle-check-DaeLeCby.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-GvcnascEzhiNrsw/us+xIMVoRzg"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 179,
    "path": "../public/assets/circle-check-DaeLeCby.js"
  },
  "/assets/calendar-BcLVHAFx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-Mtx+KFA8APHABA1GJsfe6sVxqCg"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 258,
    "path": "../public/assets/calendar-BcLVHAFx.js"
  },
  "/assets/chevron-right-DV7tj9io.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5-2ozssefSCYLENuoLUavNr5MMGlw"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 213,
    "path": "../public/assets/chevron-right-DV7tj9io.js"
  },
  "/assets/clock-CuhP-01J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-HNEqsRWqEE5sRg72/gVychne0O4"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 170,
    "path": "../public/assets/clock-CuhP-01J.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-jC055zO0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3304-x8PxS0NPEja75lX2PLzEhmCYB64"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 13060,
    "path": "../public/assets/contact-jC055zO0.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-DtI7KYwG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-9EWkjLSwxvkaS674QxV40PfySP8"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 103,
    "path": "../public/assets/destinations-DtI7KYwG.js"
  },
  "/assets/destinations.index-ClszCuQX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166b-/re4Ey5B7kmY7qTw2p4FDWqWi+o"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 5739,
    "path": "../public/assets/destinations.index-ClszCuQX.js"
  },
  "/assets/destinations._slug-BgdH1pgV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c23-PUQGvsxXmZN9IcRvA3jY0Gr+bFU"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 7203,
    "path": "../public/assets/destinations._slug-BgdH1pgV.js"
  },
  "/assets/destinations._slug-CGq1FzUL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-56Hh29R/xI7Fokj4I2a+8PzkddA"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-CGq1FzUL.js"
  },
  "/assets/DestinationsMap-azmCfu3z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86f-KRfrkNw/5YxSe4u9YD+TzQx9KeY"',
    "mtime": "2026-08-20T18:20:59.531Z",
    "size": 2159,
    "path": "../public/assets/DestinationsMap-azmCfu3z.js"
  },
  "/assets/eye-BWeudnht.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-sXi8reWfgyo6nqA3lBtJArV91qQ"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 257,
    "path": "../public/assets/eye-BWeudnht.js"
  },
  "/assets/gallery-BRd6yyU9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1831-PwWMAJh3HMPWvUc3V0W6acGkMaE"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 6193,
    "path": "../public/assets/gallery-BRd6yyU9.js"
  },
  "/assets/geocoding.functions-CmZrnVsR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12c-Xiuu9pUah1ebPjiz8FcOP0lviTE"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 300,
    "path": "../public/assets/geocoding.functions-CmZrnVsR.js"
  },
  "/assets/image-CNYonWE1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-9DkFZozL6JoMESW1npzKu0Cprec"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 270,
    "path": "../public/assets/image-CNYonWE1.js"
  },
  "/assets/index-DefjmPkI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cde8-nAvl6uOE9cNiXBGaqLayjKyV+Bg"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 118248,
    "path": "../public/assets/index-DefjmPkI.js"
  },
  "/assets/index-DmJE1F0C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21a29-JBTSNKIDs8pAb5L0EzQJHQ1U03M"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 137769,
    "path": "../public/assets/index-DmJE1F0C.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/leaflet-src-5KXFyhSe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-k57txvYjSErghi1+f/qy0R2kAAE"',
    "mtime": "2026-08-20T18:20:59.531Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-5KXFyhSe.js"
  },
  "/assets/mail-BviwJTjW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-KaZoQHTRP8A4UrksCsnCMbEEX4Q"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 214,
    "path": "../public/assets/mail-BviwJTjW.js"
  },
  "/assets/index-CBmTtNMm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d73bf-C6Dh4DGc9S+DfPzXOk3/hFmqxNQ"',
    "mtime": "2026-08-20T18:20:59.531Z",
    "size": 881599,
    "path": "../public/assets/index-CBmTtNMm.js"
  },
  "/assets/maximize-2-BDwdFrCs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"45d-XCANNVijlL7I7lulhy6hk3fKGQ4"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 1117,
    "path": "../public/assets/maximize-2-BDwdFrCs.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-Czzt31XH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b5-C0V2iwhShf4hRmrhbRK18NpOvyc"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 437,
    "path": "../public/assets/message-square-Czzt31XH.js"
  },
  "/assets/map-OYvaFrlk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-94YCi/Sqh2f+5NcsMGDhUhN9jRg"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 426,
    "path": "../public/assets/map-OYvaFrlk.js"
  },
  "/assets/navigation-zoQA7l7Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-utvBtmhxA8JmaoIIKy5dJxjdHP8"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 149,
    "path": "../public/assets/navigation-zoQA7l7Q.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-20T18:20:59.512Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-CHfKhJgp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-5QjGR7i5IcfZP+QsCrgCpL8SXgk"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 154,
    "path": "../public/assets/plus-CHfKhJgp.js"
  },
  "/assets/PostCard-By3Gbm9w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"88b-6L84S+7pi0Rp8kGbvkte2vwBijE"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 2187,
    "path": "../public/assets/PostCard-By3Gbm9w.js"
  },
  "/assets/PostEditor-B3znF6gE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8d82-82i1OX9pzL38D2xZp+/5fFn4wJE"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 36226,
    "path": "../public/assets/PostEditor-B3znF6gE.js"
  },
  "/assets/refresh-cw-DvnPiLOJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-jgBhC9eflGpeUnjDT+ZLG+QnFwk"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-DvnPiLOJ.js"
  },
  "/assets/route-DGp0KEYt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-jNDIp7lNRVMNXM6oZwsB1Q91frI"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 95,
    "path": "../public/assets/route-DGp0KEYt.js"
  },
  "/assets/save-D9mPUs9p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-Q7ev9hN8WPasfGgmuBzE2Pe4Xms"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 328,
    "path": "../public/assets/save-D9mPUs9p.js"
  },
  "/assets/share-2-xH9M-_Ry.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-XEUFvzwOLUczY76uSPE6pgIkI9A"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 358,
    "path": "../public/assets/share-2-xH9M-_Ry.js"
  },
  "/assets/settings-CtGsi4B7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-3nUNASlg6gsglDR6enCRGJNGzgE"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 488,
    "path": "../public/assets/settings-CtGsi4B7.js"
  },
  "/assets/sparkles-ZvW_2l60.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-ZJgb0uTL6SzItz/ofZBtjPmWQEM"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 495,
    "path": "../public/assets/sparkles-ZvW_2l60.js"
  },
  "/assets/star-D4Y8nUWS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-XSKZPDc1LMOZm9LYmd9EGMtUVy0"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 473,
    "path": "../public/assets/star-D4Y8nUWS.js"
  },
  "/assets/trash-2-BzGfMLMe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-UU4m5ONSiA5rEieYVikFBiKlqpo"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 329,
    "path": "../public/assets/trash-2-BzGfMLMe.js"
  },
  "/assets/styles-DnOPAhdu.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"21ac3-LHrLKb54NCUcHHdgXqMt8bqfu1g"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 137923,
    "path": "../public/assets/styles-DnOPAhdu.css"
  },
  "/assets/upload-1UCahbwS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-FsqiLMHzZn+9uUhl6G4dRZZQIJc"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 231,
    "path": "../public/assets/upload-1UCahbwS.js"
  },
  "/assets/useBaseQuery-UHjLEjur.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-Ye5ybg2Dr+kpyyBO5V7Jq+XW/So"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-UHjLEjur.js"
  },
  "/assets/useMutation-DML1x0_X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-CDSzpeLthA50FWisS51uLviAMoE"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 2210,
    "path": "../public/assets/useMutation-DML1x0_X.js"
  },
  "/assets/useQuery-CvX-M6Oj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-i+AsIYD5Gp9QXBq4WAWj39rRrlI"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 100,
    "path": "../public/assets/useQuery-CvX-M6Oj.js"
  },
  "/assets/users-BVGUQFOa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-Z0ut9HIm5lVbD413nlCc5lUz3pU"',
    "mtime": "2026-08-20T18:20:59.530Z",
    "size": 307,
    "path": "../public/assets/users-BVGUQFOa.js"
  },
  "/assets/useSuspenseQuery-CBx94QzY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-UEoSmir4QH1V35zMqhJfKWIMYUQ"',
    "mtime": "2026-08-20T18:20:59.528Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-CBx94QzY.js"
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
