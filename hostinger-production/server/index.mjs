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
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/assets/about-5PmvKeMd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-OLDFlLbDjWfztXeELYMBQlFacew"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 3398,
    "path": "../public/assets/about-5PmvKeMd.js"
  },
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/assets/account-BQDPYBDW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-JX9VujZVNbpCOBgXE5N1PiRLCdA"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 2068,
    "path": "../public/assets/account-BQDPYBDW.js"
  },
  "/assets/admin-Ce2qd7QY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-vUVVn0HXgcdkPdl9v3ZVPmsDO9A"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 2555,
    "path": "../public/assets/admin-Ce2qd7QY.js"
  },
  "/assets/admin.categories-DI65mops.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-wX+0rs8E0VXNpkNaE6FnpPFsMmE"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-DI65mops.js"
  },
  "/assets/admin.comments-gJIVZneU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-PeDd2aiQ7q65QU6JlWpPB3RwJ20"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-gJIVZneU.js"
  },
  "/assets/admin.destinations-CUx7qAUn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-LU0O9l+B87lCe+1VGxEUQtA1m98"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-CUx7qAUn.js"
  },
  "/assets/admin.gallery--YlYYeJ3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-SXPDb6bqrbB4NGgwChgLxeWDdfI"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery--YlYYeJ3.js"
  },
  "/assets/admin.homepage-jvSS9m7I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-hAnP6lH2J+NZhL0z0x4aPzUZ7gQ"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-jvSS9m7I.js"
  },
  "/assets/admin.index-Bpls0sF_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-Sxz6TTK5+4xU/bGwDxWuHShkIms"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 4075,
    "path": "../public/assets/admin.index-Bpls0sF_.js"
  },
  "/assets/admin.messages-CwPU7ne-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-Tf1QCjD2i/g+jzn3La6wt2DP5vM"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-CwPU7ne-.js"
  },
  "/assets/admin.analytics-BpaT41WR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-6zAVGO5hZI5Vz79gJh/7FgBstm4"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-BpaT41WR.js"
  },
  "/assets/admin.news-Kr1EF-md.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-5vXtaVpLLuKENEtAJUwAdZrInR4"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 34492,
    "path": "../public/assets/admin.news-Kr1EF-md.js"
  },
  "/assets/admin.posts.index-CIqAzS3Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-43OClkRxwvwms5pBWofJtcWrpz0"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-CIqAzS3Z.js"
  },
  "/assets/admin.posts.new-Cpc4HB8_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-ekO62Dav90WT8HsaH3HKIE67aoc"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-Cpc4HB8_.js"
  },
  "/assets/admin.posts._id-CMKMPBGv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-6IR+LAJRrrYxVU9ZSnJAa82073g"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-CMKMPBGv.js"
  },
  "/assets/admin.public-message-BYaxl5M_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-D4TMQImKlyy0RkHD7bQrVhFlL3w"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-BYaxl5M_.js"
  },
  "/assets/admin.settings-DmGXPt36.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ebd-h/LOQDZT2sKOqzu4meKTRofRa8U"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 16061,
    "path": "../public/assets/admin.settings-DmGXPt36.js"
  },
  "/assets/admin.subscribers-DULhItxr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-pxPjMS+hm2fX18VT8Up5jnRc3YA"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-DULhItxr.js"
  },
  "/assets/AdSlot-D4hKKDTM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-9wjy5DYtMeiqZw9yI/2UwLkOEq8"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-D4hKKDTM.js"
  },
  "/assets/alert-dialog-Cy6CBw51.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-hXB/nY4/Kuu3DDaRAk857jFbhh8"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-Cy6CBw51.js"
  },
  "/assets/arrow-left-VZKkvF0V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-UK88yVyJNfxLz/so9zp2cPzCdr8"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 166,
    "path": "../public/assets/arrow-left-VZKkvF0V.js"
  },
  "/assets/auth-BuDQyIhd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-qiMcLDHMXdFRLxBlXD5xr8DJq5k"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 8188,
    "path": "../public/assets/auth-BuDQyIhd.js"
  },
  "/assets/arrow-up-right-DyP1F-B4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-IEer/f+AgQS7XnOA2IbPa+C2/GU"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-DyP1F-B4.js"
  },
  "/assets/blog-DWXANgXI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-9bSx4ykylNoYRVFlOx0TltqXKag"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 103,
    "path": "../public/assets/blog-DWXANgXI.js"
  },
  "/assets/blog.index-5NbW78vY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28be-whUZd/slVvmY1LaZ1dffLNJx4sc"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 10430,
    "path": "../public/assets/blog.index-5NbW78vY.js"
  },
  "/assets/blog._slug-Cqr5j84z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"72e0-qDs1LwwEuOMz1rIe9CL2FVuaGFI"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 29408,
    "path": "../public/assets/blog._slug-Cqr5j84z.js"
  },
  "/assets/blog._slug-6V0Ql_U4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-M0ZS6CVc3D2tP2s4f0zp1PUZqMY"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 572,
    "path": "../public/assets/blog._slug-6V0Ql_U4.js"
  },
  "/assets/calendar-AHtyr6Ja.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-8kx4NiZYDlA2vccuqz5p2pOnPBA"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 258,
    "path": "../public/assets/calendar-AHtyr6Ja.js"
  },
  "/assets/book-open-C7q46s8s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-QcWkV7NmlOkfyHVOdwS2LOEL3+Q"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 280,
    "path": "../public/assets/book-open-C7q46s8s.js"
  },
  "/assets/category._slug-C9s9FH_x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-qm9GoiS9G2lKvdkroZNCsocVWIQ"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 3842,
    "path": "../public/assets/category._slug-C9s9FH_x.js"
  },
  "/assets/chart-column-UtB15EqX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-pHZgpauTzWDSkFwcb1ANaMIclr8"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 252,
    "path": "../public/assets/chart-column-UtB15EqX.js"
  },
  "/assets/check-cXhJJHR1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-5A9yrl3jA1yRvouy8uPnfT7MYVU"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 125,
    "path": "../public/assets/check-cXhJJHR1.js"
  },
  "/assets/chevron-left-BzNyLOKm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-DxTcD2D7X8RiQYTXf5cK854gpaM"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 131,
    "path": "../public/assets/chevron-left-BzNyLOKm.js"
  },
  "/assets/chevron-right-CKzBRkxT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-oYYDIP11b1CchiXtBSKGpBVugq8"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 131,
    "path": "../public/assets/chevron-right-CKzBRkxT.js"
  },
  "/assets/circle-check-B1RzP8Qn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-nhph4bTaF2Lp3QDlwp//qUKrHEE"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 179,
    "path": "../public/assets/circle-check-B1RzP8Qn.js"
  },
  "/assets/clock-BYXzmfXC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-YJrEOw707XrSV+xST0s2/pzIaqw"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 170,
    "path": "../public/assets/clock-BYXzmfXC.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-BsdxQXxm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-5kgYJV9+e2LE9g8LS4yDPDsSx74"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 14845,
    "path": "../public/assets/contact-BsdxQXxm.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-CUnbIAop.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-BPBSYjvReLOixXUOXG2sGhdtC44"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 103,
    "path": "../public/assets/destinations-CUnbIAop.js"
  },
  "/assets/destinations.index-DvMa0w4u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-79QwUGkVHhT4eR9tBBfLANkC67U"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-DvMa0w4u.js"
  },
  "/assets/destinations._slug-CgnV_jHh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-nG1cz8kSiOcOECc6ceuqvC6NTIA"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-CgnV_jHh.js"
  },
  "/assets/destinations._slug-CNexO1QI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-syjUu4d/Vnu9h9IVyffiN6a8ubs"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-CNexO1QI.js"
  },
  "/assets/DestinationsMap-DrLPy2fk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-DVqv31jyrCEd1B69RkZFLql6E6s"',
    "mtime": "2026-08-27T04:13:07.998Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-DrLPy2fk.js"
  },
  "/assets/dialog-CmovuzQX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-YDIB74auHHiSbOmuNlf52pw1gPg"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 1830,
    "path": "../public/assets/dialog-CmovuzQX.js"
  },
  "/assets/earth-jYW-o4aQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-M6MoP8UDZH3mMI0bBfvxffqS2r4"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 394,
    "path": "../public/assets/earth-jYW-o4aQ.js"
  },
  "/assets/external-link-D7J26eqF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-n+4SfgfO5B/isDZhI7QrFdGROp0"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 252,
    "path": "../public/assets/external-link-D7J26eqF.js"
  },
  "/assets/eye-BHNtFBpY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-d15qYsuvR/avga2Nqn7r8hHr6Dw"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 257,
    "path": "../public/assets/eye-BHNtFBpY.js"
  },
  "/assets/flame-CzZ7pxxU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-QDzjd9e6LKziS7TER6A42fzRdLo"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 200,
    "path": "../public/assets/flame-CzZ7pxxU.js"
  },
  "/assets/folder-tree-BIL1kJXl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-ISXNqG3Ym9xPtquKYMeejJPjYJw"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 480,
    "path": "../public/assets/folder-tree-BIL1kJXl.js"
  },
  "/assets/gallery-PCHbrPTu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-McKJSDxUQjnXnaMRwDoaJ98RvPQ"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 6285,
    "path": "../public/assets/gallery-PCHbrPTu.js"
  },
  "/assets/geocoding.functions-nD9p5Dhs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-CuaE6/3udyL+yOx54RQ4OpZTrWw"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-nD9p5Dhs.js"
  },
  "/assets/house-yHYVg3pS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-AgLdsvuAJxVbBGcmvpHDgLcg6pw"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 282,
    "path": "../public/assets/house-yHYVg3pS.js"
  },
  "/assets/image-po6diHVz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-prRH+H/RmzXtRD86oPMi1rqCkMs"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 270,
    "path": "../public/assets/image-po6diHVz.js"
  },
  "/assets/index-DbAgSm-y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-GaucBrc/o9qjaUabiT2hkRzJzqo"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 172647,
    "path": "../public/assets/index-DbAgSm-y.js"
  },
  "/assets/key-round-CkoEWXlA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-XpX9DrGdzgvhUwSJ22+ci6xZ3MM"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 356,
    "path": "../public/assets/key-round-CkoEWXlA.js"
  },
  "/assets/layers-B4Cq-8Sc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-uIAMXKPLMNCExcwiYHHF85ujrWQ"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 422,
    "path": "../public/assets/layers-B4Cq-8Sc.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-AOw84KGm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-byDjODLeFM/Lrizhxapck+T+y2o"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 303,
    "path": "../public/assets/list-AOw84KGm.js"
  },
  "/assets/leaflet-src-BQwQx9M9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-WknJLcy7t13rgvO3tlpYGYjy/dw"',
    "mtime": "2026-08-27T04:13:07.998Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-BQwQx9M9.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-DSdRm9KJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-Via6tkyxH9sQ6SuCQaYGsF30Y4I"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 914,
    "path": "../public/assets/maximize-2-DSdRm9KJ.js"
  },
  "/assets/message-square-DOGC9GJc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-zF+Tu15DZxvLcGKQKUmgZtXJxHc"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 234,
    "path": "../public/assets/message-square-DOGC9GJc.js"
  },
  "/assets/index-etKjtCJi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-RWP70xo/6oYyYFHNHj5yD851t+U"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 290228,
    "path": "../public/assets/index-etKjtCJi.js"
  },
  "/assets/navigation-D9TAQA9K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-XT5bd1Xvvq9hSP5o8m5xR+yKG9w"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 149,
    "path": "../public/assets/navigation-D9TAQA9K.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T04:13:07.977Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-C445YAZj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-iBcwQWypHyzCU6B87z2i7XyQb1U"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 4523,
    "path": "../public/assets/news._slug-C445YAZj.js"
  },
  "/assets/index-BdrIuzkY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8195-jvy6BhEcih/HPaIu0fcoU6trmy8"',
    "mtime": "2026-08-27T04:13:07.998Z",
    "size": 950677,
    "path": "../public/assets/index-BdrIuzkY.js"
  },
  "/assets/news._slug-W5TL4erB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-c+sfasP28JDzc2aEZrd+yAEurbk"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 974,
    "path": "../public/assets/news._slug-W5TL4erB.js"
  },
  "/assets/PageBreadcrumbs-C0cj7xad.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-jUHOAbuqb2uRhEhT91ZcQJJfwPs"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-C0cj7xad.js"
  },
  "/assets/pencil-XFUFAzex.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-+Izhe0EA+ezfY2zgZGmJ1knSy/s"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 277,
    "path": "../public/assets/pencil-XFUFAzex.js"
  },
  "/assets/plus-E8fRlUP4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-NU/z9onPYVJWHOeKf5UC0/GPAvs"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 154,
    "path": "../public/assets/plus-E8fRlUP4.js"
  },
  "/assets/PostCard-Dw4sOj-r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f69-GMv8Iv9yGJatPagBL9Fix0peF0M"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 3945,
    "path": "../public/assets/PostCard-Dw4sOj-r.js"
  },
  "/assets/PostEditor-CZnA3aG5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b13b-yPQEU1HD72l3qH92IcjNpREDPDs"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 45371,
    "path": "../public/assets/PostEditor-CZnA3aG5.js"
  },
  "/assets/radio-t40CNzYv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-a/ZTT8N2hSALPBWMi/otLrxmlcw"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 375,
    "path": "../public/assets/radio-t40CNzYv.js"
  },
  "/assets/refresh-cw-DqayRCB7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-fvgb4+4R5Lh/IZSGE2qvkdRuuCY"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-DqayRCB7.js"
  },
  "/assets/route-CdzsxbkE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-um2SjUJKRiUDKLKIKWPb6g2hvjY"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 95,
    "path": "../public/assets/route-CdzsxbkE.js"
  },
  "/assets/save-BySTFyTx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-IyHE3z3CERwm83GGdFw4uSg4rpA"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 328,
    "path": "../public/assets/save-BySTFyTx.js"
  },
  "/assets/settings-C-Vp9czz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-rk6qbZi6mydaUkT9QHEbnKycqSc"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 488,
    "path": "../public/assets/settings-C-Vp9czz.js"
  },
  "/assets/share-2-C-mPrdwh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-d7yZ2yo+MiJFhcfQIv3Svfmro5Q"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 358,
    "path": "../public/assets/share-2-C-mPrdwh.js"
  },
  "/assets/shield-check-BlT6DzYR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-RQFiumwlImfFxwtlkQkRW32CqQ0"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 321,
    "path": "../public/assets/shield-check-BlT6DzYR.js"
  },
  "/assets/shield-DuMK2k96.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-896e8tRsudeUuGfyrcUGNzc73z4"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 273,
    "path": "../public/assets/shield-DuMK2k96.js"
  },
  "/assets/star-6uLoS2Iy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-+PMSWV6w5UxgY9NExl9M7hg63Vc"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 473,
    "path": "../public/assets/star-6uLoS2Iy.js"
  },
  "/assets/topics._slug-DFF7y25s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-c4prXkahx9jKv1ZLHPNuPVWP2Tk"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-DFF7y25s.js"
  },
  "/assets/styles-C0dABRQT.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2a106-2/DYlva+h9VXWpj1M3L8N+TljZk"',
    "mtime": "2026-08-27T04:13:07.994Z",
    "size": 172294,
    "path": "../public/assets/styles-C0dABRQT.css"
  },
  "/assets/trash-2-Fxq24GCy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-oQ+Ta9BUDl4+f0LhJ5eR7fYLCT8"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 329,
    "path": "../public/assets/trash-2-Fxq24GCy.js"
  },
  "/assets/triangle-alert-D2B06lRn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-I/6US+ZBUJcJSRTumgWLY8G2Do4"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-D2B06lRn.js"
  },
  "/assets/upload-C-JoGT9A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-eeHh2O1hFBo+GGVrj3duXSlBIEA"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 231,
    "path": "../public/assets/upload-C-JoGT9A.js"
  },
  "/assets/useMutation-le2iWRo6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-bTEFhfx1VlEhAM0VG3J7BuF/eUo"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 2211,
    "path": "../public/assets/useMutation-le2iWRo6.js"
  },
  "/assets/users-CDcvwv3g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-VdKUW9j+WJtdp/wBmgT/IsEz6t8"',
    "mtime": "2026-08-27T04:13:07.997Z",
    "size": 307,
    "path": "../public/assets/users-CDcvwv3g.js"
  },
  "/assets/useSuspenseQuery-CAMx0mmW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-qMeYlVdpqyRSnGaNnaAmSVZrkTg"',
    "mtime": "2026-08-27T04:13:07.995Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-CAMx0mmW.js"
  },
  "/assets/utils-Dhkz-BUs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-fnTl1s9E/WF6GHx6dDz5BzS5siY"',
    "mtime": "2026-08-27T04:13:07.996Z",
    "size": 59982,
    "path": "../public/assets/utils-Dhkz-BUs.js"
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
