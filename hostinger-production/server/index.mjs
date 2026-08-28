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
  "/assets/about.functions-BKW8rOXF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32f2-DeiLXqKmuRvbLPz1uZVbrZHwm48"',
    "mtime": "2026-08-28T21:58:48.656Z",
    "size": 13042,
    "path": "../public/assets/about.functions-BKW8rOXF.js"
  },
  "/assets/account-B2e0d0hf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-zqISSrQIv6ThbQB5fasDIuZxy8Q"',
    "mtime": "2026-08-28T21:58:48.650Z",
    "size": 2068,
    "path": "../public/assets/account-B2e0d0hf.js"
  },
  "/assets/admin.about-B4jGa-n0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11353-FjBP+3ZbkJSS7qhmYJigMJ0MY3I"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 70483,
    "path": "../public/assets/admin.about-B4jGa-n0.js"
  },
  "/assets/admin-sEXCDqXC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9e2-gL5oZQQzAuk4Lfvsk+vxauFqXC4"',
    "mtime": "2026-08-28T21:58:48.648Z",
    "size": 2530,
    "path": "../public/assets/admin-sEXCDqXC.js"
  },
  "/assets/admin.analytics-s4fYXbpJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64266-evHJgONSx4HPEfxJWiXweun9xJQ"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 410214,
    "path": "../public/assets/admin.analytics-s4fYXbpJ.js"
  },
  "/assets/admin.categories-CN9PGpbB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5918-e6b3DJIqfoADkYtU1H2bjaCTJpQ"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 22808,
    "path": "../public/assets/admin.categories-CN9PGpbB.js"
  },
  "/assets/admin.destinations-C-okf0Pt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26ba-nV1NLqZQINf5WNBGj1OY1A7XJ9c"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 9914,
    "path": "../public/assets/admin.destinations-C-okf0Pt.js"
  },
  "/assets/admin.gallery-Da_7QkGG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56ba-83IRU/9mlh0A+2pOconpPXZc3Wk"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 22202,
    "path": "../public/assets/admin.gallery-Da_7QkGG.js"
  },
  "/assets/admin.homepage-Ed9I1Tb-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"813d-suFMJfgHJOeuKlNtDIwQCweN2VU"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 33085,
    "path": "../public/assets/admin.homepage-Ed9I1Tb-.js"
  },
  "/assets/admin.comments-DrxTIemq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-/ElcrCYx2zjqBOrT4WuYuR75y+s"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-DrxTIemq.js"
  },
  "/assets/admin.index-1v5lUY3J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-hoszo11yyhHwR5kXEnvvJ0oy5z8"',
    "mtime": "2026-08-28T21:58:48.651Z",
    "size": 4074,
    "path": "../public/assets/admin.index-1v5lUY3J.js"
  },
  "/assets/admin.legal-brAzNwl6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397f-w7X9lsBAxjdgELhX0doRwQ3iR6w"',
    "mtime": "2026-08-28T21:58:48.654Z",
    "size": 14719,
    "path": "../public/assets/admin.legal-brAzNwl6.js"
  },
  "/assets/admin.news-C4GI6tcj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86b5-244VEJHJlHBejNNmTmZwjZ6B/uE"',
    "mtime": "2026-08-28T21:58:48.653Z",
    "size": 34485,
    "path": "../public/assets/admin.news-C4GI6tcj.js"
  },
  "/assets/admin.messages-DthDJeYp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a9-rOuHYqJKXtBSmI53g6K8PSlP9gU"',
    "mtime": "2026-08-28T21:58:48.654Z",
    "size": 4777,
    "path": "../public/assets/admin.messages-DthDJeYp.js"
  },
  "/assets/admin.posts.index-BQSeYrnh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a3-3KcyYYo1f1jpQa2YsTF2vUOGo88"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 9635,
    "path": "../public/assets/admin.posts.index-BQSeYrnh.js"
  },
  "/images/author-hussain-original.jpg": {
    "type": "image/jpeg",
    "etag": '"23253-0EbOe3DBgnE0F6k8q3PJLw6Gr8g"',
    "mtime": "2026-08-27T03:07:35.496Z",
    "size": 143955,
    "path": "../public/images/author-hussain-original.jpg"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"13a-WkFg/AmDpXwIZNb50wwBw/FeOJo"',
    "mtime": "2026-08-09T22:33:08.491Z",
    "size": 314,
    "path": "../public/manifest.webmanifest"
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
  "/assets/about-DK1i_ksv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"913b5-qRz+20YNgvNOMcnWuq0V1IWlRzQ"',
    "mtime": "2026-08-28T21:58:48.679Z",
    "size": 594869,
    "path": "../public/assets/about-DK1i_ksv.js"
  },
  "/assets/admin.posts.new-D2Dz1VxK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"320-edGzAu/ie018IZjzKqUiGwb1lZo"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 800,
    "path": "../public/assets/admin.posts.new-D2Dz1VxK.js"
  },
  "/assets/admin.posts._id-CRUzHpay.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"455-UZPS5dun0H5ALw6aAhlT5QBggyQ"',
    "mtime": "2026-08-28T21:58:48.667Z",
    "size": 1109,
    "path": "../public/assets/admin.posts._id-CRUzHpay.js"
  },
  "/assets/admin.public-message-3q-a8lhE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4cad-YCdp5B2B7zwES7/TVbnC0fXYTqs"',
    "mtime": "2026-08-28T21:58:48.652Z",
    "size": 19629,
    "path": "../public/assets/admin.public-message-3q-a8lhE.js"
  },
  "/assets/admin.settings-AkOCGppr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dd4-f5CXIWfrgk5G0bXHGbG2/3GNIWE"',
    "mtime": "2026-08-28T21:58:48.652Z",
    "size": 15828,
    "path": "../public/assets/admin.settings-AkOCGppr.js"
  },
  "/assets/admin.subscribers-CDK_y8B6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2baf-u7KseBxWp7k+ox2DMzrrq1UUiAg"',
    "mtime": "2026-08-28T21:58:48.652Z",
    "size": 11183,
    "path": "../public/assets/admin.subscribers-CDK_y8B6.js"
  },
  "/assets/AdSlot-CBszkOXq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-Sdhg0Fpv/NGBdHCL+K4E+Z4Tuf8"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-CBszkOXq.js"
  },
  "/assets/alert-dialog-CkLbCi9E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-SPvM+y73m1eQDXxNMvIWSFL2Pw4"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-CkLbCi9E.js"
  },
  "/assets/arrow-left-ocxt8-Uq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-Lpqs5Bt0M/lkPzRy9R3AC3MDf2M"',
    "mtime": "2026-08-28T21:58:48.649Z",
    "size": 166,
    "path": "../public/assets/arrow-left-ocxt8-Uq.js"
  },
  "/assets/arrow-up-right-Bj3FVP4D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-NNEyxELJVNSBIGF2wJ+4w01Bo48"',
    "mtime": "2026-08-28T21:58:48.659Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-Bj3FVP4D.js"
  },
  "/assets/auth-B9tdGk6N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-3FhXj0eBF4pil1hy2Is0/gi1OqM"',
    "mtime": "2026-08-28T21:58:48.642Z",
    "size": 7644,
    "path": "../public/assets/auth-B9tdGk6N.js"
  },
  "/assets/blog-CLQV4Y9W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-Vc3JXBRTnPVjSIZIt/mPwqKnsy8"',
    "mtime": "2026-08-28T21:58:48.642Z",
    "size": 103,
    "path": "../public/assets/blog-CLQV4Y9W.js"
  },
  "/assets/blog.index-Bs3rrXyf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2791-Fmb5GhdACZZotrAtdgvxBq790qM"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 10129,
    "path": "../public/assets/blog.index-Bs3rrXyf.js"
  },
  "/assets/blog._slug-BHkOkbh4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cdc-vHfYN8K8lYpsESe91QD6yj+2ezo"',
    "mtime": "2026-08-28T21:58:48.647Z",
    "size": 27868,
    "path": "../public/assets/blog._slug-BHkOkbh4.js"
  },
  "/assets/blog._slug-Dk-nNtir.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-GseoRZYTa7mQriXFhll6Eror17o"',
    "mtime": "2026-08-28T21:58:48.647Z",
    "size": 572,
    "path": "../public/assets/blog._slug-Dk-nNtir.js"
  },
  "/assets/book-open-Bidcm7r4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-0WeDHMQURV3Iuh+R7TnDaRMZQ9M"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 280,
    "path": "../public/assets/book-open-Bidcm7r4.js"
  },
  "/assets/calendar-DjVZp79F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-8ouuuGBQmlonbrU6te35bnUtOMM"',
    "mtime": "2026-08-28T21:58:48.659Z",
    "size": 258,
    "path": "../public/assets/calendar-DjVZp79F.js"
  },
  "/assets/category._slug-ZgUywoD5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f10-x19Alt8kZUp0hm/tqG676BivVus"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 3856,
    "path": "../public/assets/category._slug-ZgUywoD5.js"
  },
  "/assets/chart-column-BdsVZ1YD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-emVpVFD0nUegA9jjsithVhXgIcM"',
    "mtime": "2026-08-28T21:58:48.658Z",
    "size": 252,
    "path": "../public/assets/chart-column-BdsVZ1YD.js"
  },
  "/assets/check-bOj1Ebg2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-rVs0OPDv7A+pkvxG9dgvi+al91g"',
    "mtime": "2026-08-28T21:58:48.648Z",
    "size": 125,
    "path": "../public/assets/check-bOj1Ebg2.js"
  },
  "/assets/chevron-down-Brs90Vv9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-A6QLMh7IKs3cri26Jfa1ozf/jxo"',
    "mtime": "2026-08-28T21:58:48.659Z",
    "size": 129,
    "path": "../public/assets/chevron-down-Brs90Vv9.js"
  },
  "/assets/chevron-left-Cw8ze4nM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-TgW+8ESyTaiAVBs0BDCIdOGQi+0"',
    "mtime": "2026-08-28T21:58:48.655Z",
    "size": 131,
    "path": "../public/assets/chevron-left-Cw8ze4nM.js"
  },
  "/assets/chevron-right-DuV2GAgu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-x/GOvgJpLarg6+wilvWFy09je1I"',
    "mtime": "2026-08-28T21:58:48.655Z",
    "size": 131,
    "path": "../public/assets/chevron-right-DuV2GAgu.js"
  },
  "/assets/circle-check-IK7BQpxn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-e5TYX6IEemhPMqypoR2A4X3jfMQ"',
    "mtime": "2026-08-28T21:58:48.655Z",
    "size": 179,
    "path": "../public/assets/circle-check-IK7BQpxn.js"
  },
  "/assets/clock-ClsAPD5R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-Du79YxvF4+PS9vWMor79w5wT3oE"',
    "mtime": "2026-08-28T21:58:48.655Z",
    "size": 170,
    "path": "../public/assets/clock-ClsAPD5R.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-f8d_fDD4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a0a-fgVuphKK7KimhFsxi9+aWvvCvxk"',
    "mtime": "2026-08-28T21:58:48.641Z",
    "size": 14858,
    "path": "../public/assets/contact-f8d_fDD4.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-28T21:58:48.641Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-BrqxM5TT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-Vi47G24H7R2r0C86R3H2OJp6xbI"',
    "mtime": "2026-08-28T21:58:48.641Z",
    "size": 103,
    "path": "../public/assets/destinations-BrqxM5TT.js"
  },
  "/assets/destinations.index-CIOcYwyy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1437-k2uLiZWuVFsktPpzoCnsaiWL3K8"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 5175,
    "path": "../public/assets/destinations.index-CIOcYwyy.js"
  },
  "/assets/destinations._slug-B8NirNeD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-c1NYhIbqEHjI0An8zduPnezNP3k"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-B8NirNeD.js"
  },
  "/assets/destinations._slug-Bv2oVUSC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cea-G32vAfHBNUWG0RDS56wk6A0xfp0"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 7402,
    "path": "../public/assets/destinations._slug-Bv2oVUSC.js"
  },
  "/assets/DestinationsMap-CvtZIi9g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f65-dmBcqm+OhN+G0rjEcVPUj+D9ULY"',
    "mtime": "2026-08-28T21:58:48.667Z",
    "size": 3941,
    "path": "../public/assets/DestinationsMap-CvtZIi9g.js"
  },
  "/assets/dialog-CuKug9rc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-XEmrq9lqz6SYJKmPPRXQwXFcae0"',
    "mtime": "2026-08-28T21:58:48.654Z",
    "size": 1830,
    "path": "../public/assets/dialog-CuKug9rc.js"
  },
  "/assets/disclaimer-CTAER9k9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706-tFgaumuHoW6cJDj97taqh/14uZ8"',
    "mtime": "2026-08-28T21:58:48.640Z",
    "size": 1798,
    "path": "../public/assets/disclaimer-CTAER9k9.js"
  },
  "/assets/earth-BPn8BQyW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-3hjVCXbDqFxlh2qeAnBVZ10P3nE"',
    "mtime": "2026-08-28T21:58:48.644Z",
    "size": 394,
    "path": "../public/assets/earth-BPn8BQyW.js"
  },
  "/assets/external-link-7QHzGuUw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-cLGeLf3rBWqxqCkQcb4CX8nJINk"',
    "mtime": "2026-08-28T21:58:48.659Z",
    "size": 252,
    "path": "../public/assets/external-link-7QHzGuUw.js"
  },
  "/assets/eye-off-D5APiAOH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-SwEf757Yp9CtPbw5KDy8jXjV5oI"',
    "mtime": "2026-08-28T21:58:48.659Z",
    "size": 431,
    "path": "../public/assets/eye-off-D5APiAOH.js"
  },
  "/assets/eye-qX73APu9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-0sMVMlusTKiBrnJKbZTM/oVNdis"',
    "mtime": "2026-08-28T21:58:48.661Z",
    "size": 257,
    "path": "../public/assets/eye-qX73APu9.js"
  },
  "/assets/flame-B3ksv6Oc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-XytUMf/oAQJMcGjGRWL3HdaDdYk"',
    "mtime": "2026-08-28T21:58:48.654Z",
    "size": 200,
    "path": "../public/assets/flame-B3ksv6Oc.js"
  },
  "/assets/folder-tree-B8VXKbhJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-Qx1rIbDG+zqFNETYPjWK4YndokA"',
    "mtime": "2026-08-28T21:58:48.661Z",
    "size": 480,
    "path": "../public/assets/folder-tree-B8VXKbhJ.js"
  },
  "/assets/gallery-ejCr629B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"189a-k+y4h5fAmaMzTH7mxZGL5kODAek"',
    "mtime": "2026-08-28T21:58:48.640Z",
    "size": 6298,
    "path": "../public/assets/gallery-ejCr629B.js"
  },
  "/assets/geocoding.functions-DLRdKasf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-LUwR+6hbfZ8yFMH645kzIYT21fI"',
    "mtime": "2026-08-28T21:58:48.665Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-DLRdKasf.js"
  },
  "/assets/grip-vertical-CRaQaz4v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-93bdr9KD44OifWx3Zx5yfVcHTMY"',
    "mtime": "2026-08-28T21:58:48.661Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-CRaQaz4v.js"
  },
  "/assets/house-DaD83YiB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-H/20E6yYz3OYc6PEVIM0J8RzWSI"',
    "mtime": "2026-08-28T21:58:48.658Z",
    "size": 282,
    "path": "../public/assets/house-DaD83YiB.js"
  },
  "/assets/image-BwkK5vpj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-OAt6JvKn56hyoQ+EvXjBDn+rQQA"',
    "mtime": "2026-08-28T21:58:48.661Z",
    "size": 270,
    "path": "../public/assets/image-BwkK5vpj.js"
  },
  "/assets/index-C8M_IvyR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29eea-4DTtGKBxsPN/mM1lbE/E8icdM4Q"',
    "mtime": "2026-08-28T21:58:48.643Z",
    "size": 171754,
    "path": "../public/assets/index-C8M_IvyR.js"
  },
  "/assets/key-round-Ddrxj51A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-+P6shbUb4WOgMXBTVwsq+KX89/U"',
    "mtime": "2026-08-28T21:58:48.652Z",
    "size": 356,
    "path": "../public/assets/key-round-Ddrxj51A.js"
  },
  "/assets/index-_0qF6wWq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-RPv2jNPvv0Pk/fB3KsxDZjtZiK4"',
    "mtime": "2026-08-28T21:58:48.655Z",
    "size": 290228,
    "path": "../public/assets/index-_0qF6wWq.js"
  },
  "/assets/layers-DJS27Y_I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-mS8GA2kr4XHvBP939Zz9/fn3+20"',
    "mtime": "2026-08-28T21:58:48.657Z",
    "size": 422,
    "path": "../public/assets/layers-DJS27Y_I.js"
  },
  "/assets/index-BOjDgE_7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f023e-wxQendxYFwivWb54BdzEL0H1VN4"',
    "mtime": "2026-08-28T21:58:48.667Z",
    "size": 983614,
    "path": "../public/assets/index-BOjDgE_7.js"
  },
  "/assets/layout-dashboard-D8-EqVL7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"160-0yDifCL9LpH0XzO9+fWNmIUwkB0"',
    "mtime": "2026-08-28T21:58:48.649Z",
    "size": 352,
    "path": "../public/assets/layout-dashboard-D8-EqVL7.js"
  },
  "/assets/list-DHZnt2QX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-g8aOCI9fSaJWYIFIbHrYESQXNAY"',
    "mtime": "2026-08-28T21:58:48.661Z",
    "size": 303,
    "path": "../public/assets/list-DHZnt2QX.js"
  },
  "/assets/list-ordered-sVh9og9Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-Q1YSWumgjslcC1YCglloGHzbERA"',
    "mtime": "2026-08-28T21:58:48.655Z",
    "size": 644,
    "path": "../public/assets/list-ordered-sVh9og9Z.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-28T21:58:48.639Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-28T21:58:48.640Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/map-BGBS3XJa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-11I5usDNY7e2mb0UmMlNKl5D6RU"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 724,
    "path": "../public/assets/map-BGBS3XJa.js"
  },
  "/assets/maximize-2-DSkT1ds0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-u/pZmjVmXWnMbevfLY02BC6YhUs"',
    "mtime": "2026-08-28T21:58:48.661Z",
    "size": 239,
    "path": "../public/assets/maximize-2-DSkT1ds0.js"
  },
  "/assets/leaflet-src-p0husuH5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-3AooW50aFyzSSA4URmkV+mhhQS4"',
    "mtime": "2026-08-28T21:58:48.667Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-p0husuH5.js"
  },
  "/assets/message-square-BOIkqaNk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-bfZg/uHnRU34PNF+ljpl/qY8b2Q"',
    "mtime": "2026-08-28T21:58:48.652Z",
    "size": 234,
    "path": "../public/assets/message-square-BOIkqaNk.js"
  },
  "/assets/mountain-WkKqA71a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"244-KQk+aHcNN4V2x2gf4Xav3CCRc+A"',
    "mtime": "2026-08-28T21:58:48.656Z",
    "size": 580,
    "path": "../public/assets/mountain-WkKqA71a.js"
  },
  "/assets/navigation-DApCCc7E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-ZvV2CRhdbO7rTIzq45l68pDCNgI"',
    "mtime": "2026-08-28T21:58:48.661Z",
    "size": 149,
    "path": "../public/assets/navigation-DApCCc7E.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-28T21:58:48.589Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-7teCAxAF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-NlR16FAgW/FiLOh6Mj1nU/ITisA"',
    "mtime": "2026-08-28T21:58:48.644Z",
    "size": 4524,
    "path": "../public/assets/news._slug-7teCAxAF.js"
  },
  "/assets/news._slug-DAmK4lo4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-BMOPCym0G+gtghHif795bJdH3KQ"',
    "mtime": "2026-08-28T21:58:48.644Z",
    "size": 974,
    "path": "../public/assets/news._slug-DAmK4lo4.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-28T21:58:48.638Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/PageBreadcrumbs-DK6p4sOq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-ToDVpwrzw5fiSYpjOTk9CRZKNpA"',
    "mtime": "2026-08-28T21:58:48.648Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-DK6p4sOq.js"
  },
  "/assets/pen-line-CenK0Vd3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-BVoDQvnHVtEzhfSt2m+fXI5gyLk"',
    "mtime": "2026-08-28T21:58:48.658Z",
    "size": 1022,
    "path": "../public/assets/pen-line-CenK0Vd3.js"
  },
  "/assets/pencil-0CH8t_nP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-hRT8EYQE1TDfDZqCW8qykvwhTHo"',
    "mtime": "2026-08-28T21:58:48.661Z",
    "size": 277,
    "path": "../public/assets/pencil-0CH8t_nP.js"
  },
  "/assets/plus-84ChR4T_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-FwEC1G6FfHeOXIhwaLk2gEUaU/8"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 154,
    "path": "../public/assets/plus-84ChR4T_.js"
  },
  "/assets/PostCard-BTuDBJ8G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-E7Y5cwtIfktXfp7Iv6+lrchQxKM"',
    "mtime": "2026-08-28T21:58:48.648Z",
    "size": 3935,
    "path": "../public/assets/PostCard-BTuDBJ8G.js"
  },
  "/assets/power-CQASvgf-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-X2pKwXGkIjox8PQ7pVW2vxXrHeE"',
    "mtime": "2026-08-28T21:58:48.653Z",
    "size": 174,
    "path": "../public/assets/power-CQASvgf-.js"
  },
  "/assets/PostEditor-BS9Ng8To.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd2a-OvRS5Og6DNOqPdRaykATKho95ls"',
    "mtime": "2026-08-28T21:58:48.667Z",
    "size": 48426,
    "path": "../public/assets/PostEditor-BS9Ng8To.js"
  },
  "/assets/privacy-policy-DVlwXSD1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70a-XP4XFBngPw2g9IFBp9Vzd+OZWEQ"',
    "mtime": "2026-08-28T21:58:48.639Z",
    "size": 1802,
    "path": "../public/assets/privacy-policy-DVlwXSD1.js"
  },
  "/assets/quote-5Yfj2Txu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-c7toUHACpZO7qU+JD8e4hGmVIYM"',
    "mtime": "2026-08-28T21:58:48.656Z",
    "size": 390,
    "path": "../public/assets/quote-5Yfj2Txu.js"
  },
  "/assets/radio-B8lF5ph9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-mOAOEgp7FR9hup3VWB9PPnixNco"',
    "mtime": "2026-08-28T21:58:48.654Z",
    "size": 375,
    "path": "../public/assets/radio-B8lF5ph9.js"
  },
  "/assets/refresh-cw-BZn5FcSk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-/6x9sjpANJNFb81HJ7dkfPZJHfw"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-BZn5FcSk.js"
  },
  "/assets/rocket-BmrmiLbH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56e-DFy691lPbfEYKgTcnmXLS2IzJis"',
    "mtime": "2026-08-28T21:58:48.659Z",
    "size": 1390,
    "path": "../public/assets/rocket-BmrmiLbH.js"
  },
  "/assets/rotate-ccw-DNrk_Sr9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-aerrytyyTyYt7PyGf+Pn107ktWY"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-DNrk_Sr9.js"
  },
  "/assets/route-djMptMBI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-a5UJhzm9qnwktrHr4OGdOZRXyUQ"',
    "mtime": "2026-08-28T21:58:48.643Z",
    "size": 543,
    "path": "../public/assets/route-djMptMBI.js"
  },
  "/assets/route-yb4Jni0t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-t8V4bkOyRH6BLo0C3H85X8H49hU"',
    "mtime": "2026-08-28T21:58:48.643Z",
    "size": 95,
    "path": "../public/assets/route-yb4Jni0t.js"
  },
  "/assets/scale-CSoLTbx2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-4GvxTnYVgEHjscYZ0VVqtG+MfwM"',
    "mtime": "2026-08-28T21:58:48.655Z",
    "size": 333,
    "path": "../public/assets/scale-CSoLTbx2.js"
  },
  "/assets/save-aK1epNOJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-ecDd80MZw91Fo3b221ybH7qwDjE"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 328,
    "path": "../public/assets/save-aK1epNOJ.js"
  },
  "/assets/settings-dmM4MRZu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-Gp4J/UMKFsMFcmElg9rIguKiIZ0"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 488,
    "path": "../public/assets/settings-dmM4MRZu.js"
  },
  "/assets/share-2-CahLKKLZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-oGWstQvoJF6IjqKAdnnKzkuhyzo"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 358,
    "path": "../public/assets/share-2-CahLKKLZ.js"
  },
  "/assets/shield-alert-DvmEqodU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-4GD4CQ3HEdG4ufkvWn2Et2z0v/8"',
    "mtime": "2026-08-28T21:58:48.643Z",
    "size": 668,
    "path": "../public/assets/shield-alert-DvmEqodU.js"
  },
  "/assets/shield-BWyGzcxU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-XMLxes3PBKstOeDqgkv/2Wmh650"',
    "mtime": "2026-08-28T21:58:48.656Z",
    "size": 273,
    "path": "../public/assets/shield-BWyGzcxU.js"
  },
  "/assets/shield-check-D7VzG3iB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-N6fyY30zmlm1prdWSHUbWXSFM5M"',
    "mtime": "2026-08-28T21:58:48.653Z",
    "size": 321,
    "path": "../public/assets/shield-check-D7VzG3iB.js"
  },
  "/assets/sliders-horizontal-DOTJ0dQo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-S3LgcKDsKUDn4gw7K6FPzihFCe4"',
    "mtime": "2026-08-28T21:58:48.645Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-DOTJ0dQo.js"
  },
  "/assets/star-B4BVLGa9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-Lhz05j4w3po22M2Ookw+zx4GN3M"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 473,
    "path": "../public/assets/star-B4BVLGa9.js"
  },
  "/assets/topics._slug-BYGFosUi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-QRY6YUHBJfcQmqpe64DVUEn4rW8"',
    "mtime": "2026-08-28T21:58:48.644Z",
    "size": 2165,
    "path": "../public/assets/topics._slug-BYGFosUi.js"
  },
  "/assets/TranslatedMarkdown-AxVGjpOR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-ZKtP7j+qyClPxOn3q6NZRu1+8Dk"',
    "mtime": "2026-08-28T21:58:48.644Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-AxVGjpOR.js"
  },
  "/assets/trash-2-BCwaySqV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-YSbAUXfgJL2vqUzPDp2vrVH+Hw8"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 329,
    "path": "../public/assets/trash-2-BCwaySqV.js"
  },
  "/assets/styles-B5iX4Xdx.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2bf25-acquWC0pQT0xceSTvtiAONTzGKw"',
    "mtime": "2026-08-28T21:58:48.638Z",
    "size": 180005,
    "path": "../public/assets/styles-B5iX4Xdx.css"
  },
  "/assets/trending-up-C4-oJ_74.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-CNwWwl4DTp+bzavWe4HwxB2hWpc"',
    "mtime": "2026-08-28T21:58:48.659Z",
    "size": 932,
    "path": "../public/assets/trending-up-C4-oJ_74.js"
  },
  "/assets/triangle-alert-0AWrGNX3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-IquW6rACvXnW9mVo0iu2izIoGEQ"',
    "mtime": "2026-08-28T21:58:48.658Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-0AWrGNX3.js"
  },
  "/assets/upload-C_ACDkxV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-Na2UODI+Ut2dLGlZ0TyBLSKZPNY"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 231,
    "path": "../public/assets/upload-C_ACDkxV.js"
  },
  "/assets/useMutation-CsLvg7jN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-TKk1slh6TwCB29S5xEVGz6+tHu0"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 2211,
    "path": "../public/assets/useMutation-CsLvg7jN.js"
  },
  "/assets/user-plus-YNq-4VO_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-+9bfTkB3kW07nJSa6H43Jx2JhPg"',
    "mtime": "2026-08-28T21:58:48.652Z",
    "size": 311,
    "path": "../public/assets/user-plus-YNq-4VO_.js"
  },
  "/assets/user-x-B9FMM0L_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"412-rSqMulKdQgdSmXivBU0439MNSN0"',
    "mtime": "2026-08-28T21:58:48.652Z",
    "size": 1042,
    "path": "../public/assets/user-x-B9FMM0L_.js"
  },
  "/assets/users-BwqsNeG5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-yfmGhA5/VT/aj8vb4tAQLXHvOXo"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 307,
    "path": "../public/assets/users-BwqsNeG5.js"
  },
  "/assets/useSuspenseQuery-DKh_6Y86.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-kRxVmsH3YvMEoUppeWcoJmd62hg"',
    "mtime": "2026-08-28T21:58:48.647Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-DKh_6Y86.js"
  },
  "/assets/utils-DP4QBjNM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-23kIwnfBOm0lq9oI/83umKo9TlE"',
    "mtime": "2026-08-28T21:58:48.663Z",
    "size": 59982,
    "path": "../public/assets/utils-DP4QBjNM.js"
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
