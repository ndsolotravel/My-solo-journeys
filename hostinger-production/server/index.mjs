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
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/assets/about-DgLtPHVU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f2f-saS+EGOKIu/wS1Ad8DzjjyzjORM"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 3887,
    "path": "../public/assets/about-DgLtPHVU.js"
  },
  "/assets/account-DdNYJ5A9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-V4tQOFB6I1ueB9aMXdsAaueyEl8"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 2068,
    "path": "../public/assets/account-DdNYJ5A9.js"
  },
  "/assets/admin-BP4Pu-gP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7f7-Ciy7dy7pMyHQBaX+tnkpftSF3rc"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 2039,
    "path": "../public/assets/admin-BP4Pu-gP.js"
  },
  "/assets/admin.comments-CGuqoDtG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8dc-zkwXmuFRWu9TlV0NgRlUCFGx0GE"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 2268,
    "path": "../public/assets/admin.comments-CGuqoDtG.js"
  },
  "/assets/admin.destinations-C8_lNpJN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"145a-+7wpPPr9iaWC0TUp/ckuQ2DJyFM"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 5210,
    "path": "../public/assets/admin.destinations-C8_lNpJN.js"
  },
  "/assets/admin.index-DsdAtMbN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e48-n5ieMpd34VefMWOy6pZ1B4+nNLg"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 3656,
    "path": "../public/assets/admin.index-DsdAtMbN.js"
  },
  "/assets/admin.messages-BLbyU3bD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1309-s8/+KIGzDGQxJ7cctZFWxT7QkXg"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 4873,
    "path": "../public/assets/admin.messages-BLbyU3bD.js"
  },
  "/assets/admin.analytics-BFILg3fa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"645ed-tv8l/u79B64ATOTCrihVYIdKiTQ"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 411117,
    "path": "../public/assets/admin.analytics-BFILg3fa.js"
  },
  "/assets/admin.posts.new-B3FkxpFl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-+RettHX6eIpY+P9/qEmj89ff9s8"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-B3FkxpFl.js"
  },
  "/assets/admin.posts.index-DhZmQoLj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11cf9-sg3hKNSDDPe3w+bIz7uvN1wdkZU"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 72953,
    "path": "../public/assets/admin.posts.index-DhZmQoLj.js"
  },
  "/assets/admin.posts._id-mDRfN5vx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-mZrAqVHiORIyYPhU8Fqid4q74Lc"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-mDRfN5vx.js"
  },
  "/assets/admin.subscribers-BILKBWUA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f71-UiS6uoiubAcjlczGFBCLEOwaUtg"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 12145,
    "path": "../public/assets/admin.subscribers-BILKBWUA.js"
  },
  "/assets/arrow-left-UpVHVS7b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-r0q+hqhD0S56HldNN1n/PQJUrzo"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 166,
    "path": "../public/assets/arrow-left-UpVHVS7b.js"
  },
  "/assets/arrow-right-GrxNCdCl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-VF285BBisH1n+XbjxY0tGSvCzxY"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 166,
    "path": "../public/assets/arrow-right-GrxNCdCl.js"
  },
  "/assets/arrow-up-right-SAsmNVNS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-hG+Qk2Qbv2HVohk4zMB7FcOwNDY"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-SAsmNVNS.js"
  },
  "/assets/auth-DYGYkqlH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f05-XL9wqzy4ozuxTvpmVQZmIllEQRA"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 7941,
    "path": "../public/assets/auth-DYGYkqlH.js"
  },
  "/assets/blog-DXFJCJeN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-6KIj+He9dYUBbwnS7zYqQoJWW0Y"',
    "mtime": "2026-08-16T19:03:31.773Z",
    "size": 103,
    "path": "../public/assets/blog-DXFJCJeN.js"
  },
  "/assets/blog.index-C-Q5OF6b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2327-RPFRbvd5bzjBU+LQsoVnhrrgWcU"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 8999,
    "path": "../public/assets/blog.index-C-Q5OF6b.js"
  },
  "/assets/blog._slug-Br6AaZiQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4bb4-LBHmYEhHQ03+hIST7YxRNO3KOBE"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 19380,
    "path": "../public/assets/blog._slug-Br6AaZiQ.js"
  },
  "/assets/blog._slug-DpdqrlhK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"237-aXgz7ajjwT9/VZuM1l+S9crvd6k"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 567,
    "path": "../public/assets/blog._slug-DpdqrlhK.js"
  },
  "/assets/calendar-DiYpMuS-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-iaQsvw3Mt2Y5wfHLVKwBpzbWoAY"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 258,
    "path": "../public/assets/calendar-DiYpMuS-.js"
  },
  "/assets/chevron-right-BFKhTG8z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5-e4W8uJ2T7ubxuX/imzuI/IlbeS8"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 213,
    "path": "../public/assets/chevron-right-BFKhTG8z.js"
  },
  "/assets/clock-D-DfEmP2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-EHIn8IrexnFryXhOFxBtogR0UPQ"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 165,
    "path": "../public/assets/clock-D-DfEmP2.js"
  },
  "/assets/circle-check-N-k5tx2F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-RH4TnNGWfbwaUXWcweHD7RZaGZQ"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 174,
    "path": "../public/assets/circle-check-N-k5tx2F.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-B0-7QWek.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17da-VWq8yWF6Ot9oq6YQ8m37skxscTA"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 6106,
    "path": "../public/assets/contact-B0-7QWek.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-16T19:03:31.773Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-Dp5Cpe3m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-ZzsRC9wcVdO7rPek9FQOqWDEN5o"',
    "mtime": "2026-08-16T19:03:31.773Z",
    "size": 103,
    "path": "../public/assets/destinations-Dp5Cpe3m.js"
  },
  "/assets/destinations.index-C6RZcpJ1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"162b-Br1e5ChxKhobyRAmFqqQ9GBSp6M"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 5675,
    "path": "../public/assets/destinations.index-C6RZcpJ1.js"
  },
  "/assets/destinations._slug-BWlU6VBV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-UjKmqXsVP4tLogeAf1GLv0MwrEI"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-BWlU6VBV.js"
  },
  "/assets/destinations._slug-okNx-Mka.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c23-ZYIyxB2hLDyZZ0xTEZRsLtqjs+E"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 7203,
    "path": "../public/assets/destinations._slug-okNx-Mka.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-16T19:03:31.773Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/DestinationsMap-NsXBW-gK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-Csohx87ih59u1GU5MrpYt1KM6LU"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-NsXBW-gK.js"
  },
  "/assets/eye-DyedbXp5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-KP+zsHl1lZpRnaxZR0Npz2MUxHE"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 252,
    "path": "../public/assets/eye-DyedbXp5.js"
  },
  "/assets/gallery--myzcbLd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1831-yEA1BO5X/ijVo0OHV2T1cB7paiM"',
    "mtime": "2026-08-16T19:03:31.773Z",
    "size": 6193,
    "path": "../public/assets/gallery--myzcbLd.js"
  },
  "/assets/index-DXqEv_-U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21d04-aeZYAqQGHgbA5t05dupOMP9hjB4"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 138500,
    "path": "../public/assets/index-DXqEv_-U.js"
  },
  "/assets/mail-C8Bw494g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-DIKpQ8wMPCkZ2U4OmcV28kaLAFk"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 214,
    "path": "../public/assets/mail-C8Bw494g.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-16T19:03:31.773Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/map-NxCGhsjw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-JgR1b87kb1BhFQoIfAGoSnkgalI"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 426,
    "path": "../public/assets/map-NxCGhsjw.js"
  },
  "/assets/index-L7Z2wDwi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ceca-UOnMyUOGFKvJ4oVgVWPFBLNwiw4"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 118474,
    "path": "../public/assets/index-L7Z2wDwi.js"
  },
  "/assets/message-square-5QiSc3P1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b5-qUN1S5ovxolrhp4t11mM4b1Sc0c"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 437,
    "path": "../public/assets/message-square-5QiSc3P1.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-16T19:03:31.752Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/leaflet-src-DSnH8MIV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-7dGKO10A+Su1i3KgkbWj/EUbXso"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-DSnH8MIV.js"
  },
  "/assets/plus-3jsPH2o1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-bZ4q0TJZs+r/1JAktdMQx0eBxdA"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 154,
    "path": "../public/assets/plus-3jsPH2o1.js"
  },
  "/assets/PostCard-Bj7f8wam.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"88b-Y1ueCRtYhOVDi5CJmVh18d25+Bs"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 2187,
    "path": "../public/assets/PostCard-Bj7f8wam.js"
  },
  "/assets/index-BOm8LCqY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d52ef-PWpMUr/Q39ZYGzDJDunp2Seg4fU"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 873199,
    "path": "../public/assets/index-BOm8LCqY.js"
  },
  "/assets/PostEditor-Dleh6uga.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5030-8yYHe+UD1B+gtQ3kP0xiPQGUN08"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 20528,
    "path": "../public/assets/PostEditor-Dleh6uga.js"
  },
  "/assets/refresh-cw-B2jUHMv-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-CXGKRKVgkZxLThOQAi4I5SXPzLY"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-B2jUHMv-.js"
  },
  "/assets/route-DLNrD3HY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-GD5Njqrz41Smt+Mia1nCBFUeYac"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 95,
    "path": "../public/assets/route-DLNrD3HY.js"
  },
  "/assets/share-2-DKvYxK6h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"161-NhVkQ4Jf7VfbqLWC1MibLgZ7a10"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 353,
    "path": "../public/assets/share-2-DKvYxK6h.js"
  },
  "/assets/sparkles-CX1rgnQ5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-rc804g/BP4p8zOY0LxhqEtyPXU8"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 495,
    "path": "../public/assets/sparkles-CX1rgnQ5.js"
  },
  "/assets/star-BimR4O-C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-pZ36sABCa+aD1B1lEv3SdZwtb3A"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 473,
    "path": "../public/assets/star-BimR4O-C.js"
  },
  "/assets/styles-BvGnUz3z.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1ec8f-Azj6+17XkS6x6V31WR+Jtm2OlTI"',
    "mtime": "2026-08-16T19:03:31.773Z",
    "size": 126095,
    "path": "../public/assets/styles-BvGnUz3z.css"
  },
  "/assets/trash-2-DGDfIg0H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-fJcE+5G8V5xJl2r/V9vRGpOCTLo"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 329,
    "path": "../public/assets/trash-2-DGDfIg0H.js"
  },
  "/assets/useBaseQuery-BsxiPeZS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-dpZxPw3fYiAAcA9g5N7Q/yn28Q8"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-BsxiPeZS.js"
  },
  "/assets/useMutation-D5wUnfEa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-oquSV1+y0l6TO2kOOnRuuMlhaio"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 2210,
    "path": "../public/assets/useMutation-D5wUnfEa.js"
  },
  "/assets/useQuery-CBsvs4fE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-HKVkGY4wKZgnukVJXNqzvUZkRzs"',
    "mtime": "2026-08-16T19:03:31.775Z",
    "size": 100,
    "path": "../public/assets/useQuery-CBsvs4fE.js"
  },
  "/assets/users-9rfnZsPu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-w8DZwCS1Z3Chh+qwMh3XiVx5n5E"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 307,
    "path": "../public/assets/users-9rfnZsPu.js"
  },
  "/assets/useSuspenseQuery-BmICjIup.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-5mpYCCU0Dz5mGlnrkIC0sy2qYkA"',
    "mtime": "2026-08-16T19:03:31.774Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-BmICjIup.js"
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
