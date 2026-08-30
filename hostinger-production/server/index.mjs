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
  "/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/author-hussain.jpg"
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
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
  },
  "/assets/about.functions-DYIePXpV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31f9-kqR4UFehC7NrFHTx9L6rInQxBQo"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 12793,
    "path": "../public/assets/about.functions-DYIePXpV.js"
  },
  "/assets/account-B3Qx7_8P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"80f-lgsu+ZxjJ8BhsFefgt6iRyThvZc"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 2063,
    "path": "../public/assets/account-B3Qx7_8P.js"
  },
  "/assets/admin-zCuPuAv5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c6-YIpRSZhjkbCgqmPwvttNzuZi1fc"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 2502,
    "path": "../public/assets/admin-zCuPuAv5.js"
  },
  "/assets/admin.categories-9cxiMGzw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5de0-VlgcGymOH7+jJgf1WDmJIJWOlQE"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 24032,
    "path": "../public/assets/admin.categories-9cxiMGzw.js"
  },
  "/assets/admin.destinations-CjxAm-9Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4de5-m3zoBRZD1AuIa+1w4kmRJKFSRfo"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 19941,
    "path": "../public/assets/admin.destinations-CjxAm-9Y.js"
  },
  "/assets/admin.comments-CwojFcTh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"94b-fbPw+/SxcXTN4ykGzHwgtsOnmTk"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 2379,
    "path": "../public/assets/admin.comments-CwojFcTh.js"
  },
  "/assets/admin.gallery-Coa8BiwU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5b5a-rlPEp2ozcckm2CaEmAzCE6uQeXo"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 23386,
    "path": "../public/assets/admin.gallery-Coa8BiwU.js"
  },
  "/assets/admin.homepage-DDFjfHX-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d8ff-79S9R1T6+eK/UA5JwLsQ5GIqjVs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 55551,
    "path": "../public/assets/admin.homepage-DDFjfHX-.js"
  },
  "/assets/admin.index-vOidYVOc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fe5-KQb/+DXpbTdP/gR0fxq7r3Me8Es"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 4069,
    "path": "../public/assets/admin.index-vOidYVOc.js"
  },
  "/assets/admin.about-7eCphMHP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1139e-Twgs1NEqezF78/ChmtxyfkHxYz0"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 70558,
    "path": "../public/assets/admin.about-7eCphMHP.js"
  },
  "/assets/admin.legal-CLmVjJP3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39e8-1uwzjmxV0AjTVo3yfuMdmer6R3k"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 14824,
    "path": "../public/assets/admin.legal-CLmVjJP3.js"
  },
  "/assets/admin.news-LSQ6CgfL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f0c-Nn5aJFEjXW1aPOJrSXHsqyatag0"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 36620,
    "path": "../public/assets/admin.news-LSQ6CgfL.js"
  },
  "/assets/admin.messages-CEgwN9s2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137a-+jRYrngFOSGhNiorhyMGwMo6HeM"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 4986,
    "path": "../public/assets/admin.messages-CEgwN9s2.js"
  },
  "/assets/admin.analytics-sfGYX09q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"642c4-dWZK8WTHo+BEBTDV5UvDUKeb91Y"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 410308,
    "path": "../public/assets/admin.analytics-sfGYX09q.js"
  },
  "/assets/admin.posts.index-Drb0SHn_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ec2-ILrFiyDtMY92MwN3SvsAKmZ/NG4"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 11970,
    "path": "../public/assets/admin.posts.index-Drb0SHn_.js"
  },
  "/assets/about-CgHsey7G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91308-9ZZH/dDfe0ndXwnppJiyP/VrLVQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 594696,
    "path": "../public/assets/about-CgHsey7G.js"
  },
  "/assets/admin.posts.new-BSnWWxQ6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38d-SggC2sfz2/Tgai7W8d2yoOXZzhU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 909,
    "path": "../public/assets/admin.posts.new-BSnWWxQ6.js"
  },
  "/assets/admin.posts._id-DexfzGRp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4b7-LtPZ17R42w+9vQRmm/sOiwD5lys"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 1207,
    "path": "../public/assets/admin.posts._id-DexfzGRp.js"
  },
  "/assets/admin.settings-CXqK1apZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"434d-Y4g82i4JkTk9Nhv3XYUXg0D1L3w"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 17229,
    "path": "../public/assets/admin.settings-CXqK1apZ.js"
  },
  "/assets/admin.public-message-BTgU8t0f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"52fc-nKWdx+v5g+oBiKMD+Y1AyFFKDCs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 21244,
    "path": "../public/assets/admin.public-message-BTgU8t0f.js"
  },
  "/assets/AdSlot-BZq_x2jJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-spYGjam/YkjRIxA3etPOwe1NWUY"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-BZq_x2jJ.js"
  },
  "/assets/admin.subscribers-BgHxh8Fc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c31-Vwn0KCBj8r/0+VrhgdKI1xiFzbM"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 11313,
    "path": "../public/assets/admin.subscribers-BgHxh8Fc.js"
  },
  "/assets/alert-dialog-D63pyyeu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-eBQl3HV1FkBPsZnKduT6tx4NUzg"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-D63pyyeu.js"
  },
  "/assets/arrow-left-D1kKjswK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-df7FRKloPzV9YX2v7Ca+2arlDE4"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 166,
    "path": "../public/assets/arrow-left-D1kKjswK.js"
  },
  "/assets/blog-DRxICgwF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-WFmKBbfPiTqBcVkP70NszRKRNa4"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 103,
    "path": "../public/assets/blog-DRxICgwF.js"
  },
  "/assets/arrow-up-right-CqvL61GC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-BqmMxb92AnOXfeUHc/SFLi5SVxE"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-CqvL61GC.js"
  },
  "/assets/auth-C4pO4hG-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-is/6Wnk8uORm9e4oBRiaoJDk2dw"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 7644,
    "path": "../public/assets/auth-C4pO4hG-.js"
  },
  "/assets/blog.index-C3vFyDsz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27f3-jcvs/O7bQ1vcSY8ex9M60KoDBXI"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 10227,
    "path": "../public/assets/blog.index-C3vFyDsz.js"
  },
  "/assets/book-open-Bdv1mYrS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-59K0uSEm2UF8AXVoryKbXgq9bn0"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 280,
    "path": "../public/assets/book-open-Bdv1mYrS.js"
  },
  "/assets/blog._slug-DAXyNYs8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf8-fv1AfUHfjgA+PC/3xh8lOfUdrAw"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 27640,
    "path": "../public/assets/blog._slug-DAXyNYs8.js"
  },
  "/assets/blog._slug-DfyKGiLX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-Vl9p6zXVYcBldXXTcdOj/jBU7ls"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 572,
    "path": "../public/assets/blog._slug-DfyKGiLX.js"
  },
  "/assets/calendar-BMHdGcap.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-nexorLNz79yJdAW9OuegZuzbDsY"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 258,
    "path": "../public/assets/calendar-BMHdGcap.js"
  },
  "/assets/category._slug-D3ONIH3g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-Czno0JHOoqndIXB8DpBnMljJhOs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 3842,
    "path": "../public/assets/category._slug-D3ONIH3g.js"
  },
  "/assets/check-CoDYMxN8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-KdH7ozAj7mxU7LwOuYCxBHh9VB8"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 125,
    "path": "../public/assets/check-CoDYMxN8.js"
  },
  "/assets/chart-column-DUaLR54N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-8mOn+PaQAhR7jkq1E/CR5C8mw40"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 252,
    "path": "../public/assets/chart-column-DUaLR54N.js"
  },
  "/assets/chevron-down--U8tn7dt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-yjgLwgQFqPaBCjWNBzVow2r8pxc"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 129,
    "path": "../public/assets/chevron-down--U8tn7dt.js"
  },
  "/assets/chevron-left-BZOFA6fh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-QraAbowvbxjlIisQkJF4Jqd46eQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 131,
    "path": "../public/assets/chevron-left-BZOFA6fh.js"
  },
  "/assets/circle-check-DTwayYDB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-A0DVpDbF6T0tKEV2rNidAusG7rA"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 179,
    "path": "../public/assets/circle-check-DTwayYDB.js"
  },
  "/assets/chevron-right-CYjXejvd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-sgFxhMmWTcr0GIRFLUSeG92MFIw"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 131,
    "path": "../public/assets/chevron-right-CYjXejvd.js"
  },
  "/assets/circle-x-DsTm3QGx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0-361Qs1fesVw8W2XPsRgTvWsFmHE"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 208,
    "path": "../public/assets/circle-x-DsTm3QGx.js"
  },
  "/assets/clock-DDvWdfNT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-7DDYyfb5nI50X+sIcoO9DyMZI/c"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 170,
    "path": "../public/assets/clock-DDvWdfNT.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-316Dxtcp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"399c-GdWU71YKv/6j7I7tTyRZ2sCT+j0"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 14748,
    "path": "../public/assets/contact-316Dxtcp.js"
  },
  "/assets/compass-vrRILgid.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-178hgOYKh+lbnEH7wLsDs+Xss9A"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 252,
    "path": "../public/assets/compass-vrRILgid.js"
  },
  "/assets/destinations-H5zThgR1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-z6OX3xsJNEeBZNZIvRuGJazxz20"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 103,
    "path": "../public/assets/destinations-H5zThgR1.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations.index-DxQZIKrr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1443-DEDOWbU/DNEC3zjQwlXvn5XJCiQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 5187,
    "path": "../public/assets/destinations.index-DxQZIKrr.js"
  },
  "/assets/destinations._slug-Chf2TSG3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c66-luOtJHiYZGzrw81/RtKLuaTpzeA"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 7270,
    "path": "../public/assets/destinations._slug-Chf2TSG3.js"
  },
  "/assets/destinations._slug-DAPgITbF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-tysO04iiADaJJHYsLNJGd5y6zaY"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DAPgITbF.js"
  },
  "/assets/DestinationsMap-DA2e1Y1i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"124c-fspUGgUfJeRsSsanAHe7qvqRPjQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 4684,
    "path": "../public/assets/DestinationsMap-DA2e1Y1i.js"
  },
  "/assets/dialog-CVRAF8ZZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-qneC2PChovTDDpPLhtPR6bUXbno"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 1830,
    "path": "../public/assets/dialog-CVRAF8ZZ.js"
  },
  "/assets/disclaimer-k4aczEJ8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"71c-8yvg6GGEYHPSKTdBc7oe1Lz9dQ8"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 1820,
    "path": "../public/assets/disclaimer-k4aczEJ8.js"
  },
  "/assets/earth-_oOT4MD5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-25KDBKnk7ZFwjXkrYtGEeLotSPU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 394,
    "path": "../public/assets/earth-_oOT4MD5.js"
  },
  "/assets/external-link-D2CV8aOk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-OjJl1FQmXQIx6zjgEkMuAKkmnPs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 252,
    "path": "../public/assets/external-link-D2CV8aOk.js"
  },
  "/assets/eye-B5ECcS9c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-w06PXo4tszDWftjpfclFPSfW2mg"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 257,
    "path": "../public/assets/eye-B5ECcS9c.js"
  },
  "/assets/eye-off-BerlcHVC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-Qph/OUpoIy215iYXPvAVjzO9sR4"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 431,
    "path": "../public/assets/eye-off-BerlcHVC.js"
  },
  "/assets/flame-DZ8iucgL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-eCFvjie5ksfDetfGWhdqD4svTPA"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 200,
    "path": "../public/assets/flame-DZ8iucgL.js"
  },
  "/assets/folder-tree-CGyHYQuG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-kr+tO9sg/uvp7/pzZUJ12rCdsHg"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 480,
    "path": "../public/assets/folder-tree-CGyHYQuG.js"
  },
  "/assets/geocoding.functions-DYvqSvoZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-GdW0o/JmvWzWMedLSazSW0ollws"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-DYvqSvoZ.js"
  },
  "/assets/gallery-7nBe-85V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1839-b7U4GOybd1lYlqAvU8CIthV4hhc"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 6201,
    "path": "../public/assets/gallery-7nBe-85V.js"
  },
  "/assets/grip-vertical-D6tHt3u2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-Ho4UGtRMyRk0opxSvv78DlYgoiI"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-D6tHt3u2.js"
  },
  "/assets/image-BMa1wxFt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-4ZGY0kqnncZ/t+lX8W61LydOabU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 270,
    "path": "../public/assets/image-BMa1wxFt.js"
  },
  "/assets/index-B_58RN7i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-xQOsrtkVQIMySP10TV5KFB7WZl8"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 290228,
    "path": "../public/assets/index-B_58RN7i.js"
  },
  "/assets/index-DZGwBbHX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a4a4-M1ArdfTNYOK2aMlWK+1YJuqUpqQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 173220,
    "path": "../public/assets/index-DZGwBbHX.js"
  },
  "/assets/key-round-COgcRatB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-U9/P63+5+KCc22SDPGSbwh8KcBU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 356,
    "path": "../public/assets/key-round-COgcRatB.js"
  },
  "/assets/index-COKgYsYp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f03bc-DSmbrYEF9BOxhZLQCI0o+2sg0nY"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 983996,
    "path": "../public/assets/index-COKgYsYp.js"
  },
  "/assets/layers-Bmlx_hy6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-nWANn+84ngIf7rXtbjqxjt2jCsA"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 422,
    "path": "../public/assets/layers-Bmlx_hy6.js"
  },
  "/assets/layout-dashboard-FNtMhQ5C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"249-ya0BRVEgjJq1SZBagoVZ2PJkGy0"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 585,
    "path": "../public/assets/layout-dashboard-FNtMhQ5C.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-DV-pAjX8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-7z/xPU11eoeP8j6XoOHyCiiqfHw"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 303,
    "path": "../public/assets/list-DV-pAjX8.js"
  },
  "/assets/list-ordered-Ch2H6mLT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-oZgEXFKBb+JdoXtgf17RxVXPJAQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 644,
    "path": "../public/assets/list-ordered-Ch2H6mLT.js"
  },
  "/assets/map-78L8oGvq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-uxlE4oCDJWxbV0Na5eIBfa2QcMQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 724,
    "path": "../public/assets/map-78L8oGvq.js"
  },
  "/assets/leaflet-src-Cj9Uikg7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-zFIOJelAbPOWkK4swlsVdVvr6PE"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Cj9Uikg7.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-Bpyh8BGE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-enPBQRID0G6Be2gqgVBxJKf2ydU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 239,
    "path": "../public/assets/maximize-2-Bpyh8BGE.js"
  },
  "/assets/message-square-CH1t7Ivm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-z6KDajNCFnHb9+SsErMB8HekhRk"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 234,
    "path": "../public/assets/message-square-CH1t7Ivm.js"
  },
  "/assets/mountain-Bd6mSjB9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-ZsANLgyVNzJFWnvuPnIqFMKFn6E"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 377,
    "path": "../public/assets/mountain-Bd6mSjB9.js"
  },
  "/assets/navigation-CO7XHGVh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-Dsrah9460zU3x4l8rqmbcYwmn9U"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 149,
    "path": "../public/assets/navigation-CO7XHGVh.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-BKHuecca.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-s3ImSkP0miv7L7WMNQTu9GfWCAg"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 974,
    "path": "../public/assets/news._slug-BKHuecca.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-C9vGUtXZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-meRdVq/EOccx9GjQ6lM0l+2nJQ4"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 4524,
    "path": "../public/assets/news._slug-C9vGUtXZ.js"
  },
  "/assets/PageBreadcrumbs-lfCYdiJI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-26ZctEWQ9ZummwRR71XCDslwPEs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-lfCYdiJI.js"
  },
  "/assets/pen-line-TPtVa6WB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-jaTNkGMd2LIai1k9qfIyWLp9FF0"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 1022,
    "path": "../public/assets/pen-line-TPtVa6WB.js"
  },
  "/assets/pencil-1DFy0vyd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-MFvDiEzSi5kAc51lqzRhkuIvmLI"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 277,
    "path": "../public/assets/pencil-1DFy0vyd.js"
  },
  "/assets/plus-DxaYYlME.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-4gMStUN2uHZ+woq02mf6hi/qEh8"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 154,
    "path": "../public/assets/plus-DxaYYlME.js"
  },
  "/assets/PostCard-DjFawn_T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed1-1rDJM/fEi4jP2P2Y6zQ3jdjYE00"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 3793,
    "path": "../public/assets/PostCard-DjFawn_T.js"
  },
  "/assets/PostEditor-Cbs7Apr4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ecd2-9vewS56BqqfmQ5HuhaSLUKtvDvQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 60626,
    "path": "../public/assets/PostEditor-Cbs7Apr4.js"
  },
  "/assets/power-C6Krcv39.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-Utx61ktSBHx2CbT727GT3JvZGV4"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 174,
    "path": "../public/assets/power-C6Krcv39.js"
  },
  "/assets/quote-CGFOdHhL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-ZNb1mfOv3kpB4vvZP3uUewZ3jok"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 390,
    "path": "../public/assets/quote-CGFOdHhL.js"
  },
  "/assets/privacy-policy-CgL4lyey.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"720-Ks40c2meTbm4Abu2XI5RpxEtbtc"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 1824,
    "path": "../public/assets/privacy-policy-CgL4lyey.js"
  },
  "/assets/radio-MrMIfag2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-93F0silMNrF8L4qkq4Q424ZUgFU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 375,
    "path": "../public/assets/radio-MrMIfag2.js"
  },
  "/assets/refresh-cw-C5geIquk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-ZSrK0v2EAPuFniDhqHwb5D6D0IE"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-C5geIquk.js"
  },
  "/assets/rocket-B_Y4C83H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"75b-F6CYqOZQAIn+MoawOtA8PheZNg8"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 1883,
    "path": "../public/assets/rocket-B_Y4C83H.js"
  },
  "/assets/rotate-ccw-gqDvW3kQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-L8wV1ySm0RpwnVcwxMih/pNYXbs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-gqDvW3kQ.js"
  },
  "/assets/route-c_6rHr1R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-a49ZGjw+XmEp6OV76Ceo0qCi6fw"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 95,
    "path": "../public/assets/route-c_6rHr1R.js"
  },
  "/assets/route-FiMGpNi5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-0iWmPGxVeV4Fo0z55mVgrUIRiUo"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 543,
    "path": "../public/assets/route-FiMGpNi5.js"
  },
  "/assets/save-CJtje0n7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-LPSSCpRIxTkbjnyulqLCMKQY86M"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 328,
    "path": "../public/assets/save-CJtje0n7.js"
  },
  "/assets/scale-aNHxve5G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-+lzVxwfTuI+SwYe7zi5VrByly5k"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 333,
    "path": "../public/assets/scale-aNHxve5G.js"
  },
  "/assets/settings-9i4kUNCF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-ezmP2fKMcs3Nvi1tnSC9VEJL7Do"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 488,
    "path": "../public/assets/settings-9i4kUNCF.js"
  },
  "/assets/share-2-D65jzZc4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-yKfZFL0/uUUMnKFCvNbxQUh8VQU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 358,
    "path": "../public/assets/share-2-D65jzZc4.js"
  },
  "/assets/shield-alert-BimOMlMA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-z4MGPC579Z8nxIt7aAk2Eljuvmg"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 668,
    "path": "../public/assets/shield-alert-BimOMlMA.js"
  },
  "/assets/shield-check-tUcWzPk3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-syTUF5AKW1sOOiElNmOR/TcDXek"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 321,
    "path": "../public/assets/shield-check-tUcWzPk3.js"
  },
  "/assets/shield-DFw7Eblt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-RCpo+aShyNm8iEtG8DsyzXj9Kvs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 273,
    "path": "../public/assets/shield-DFw7Eblt.js"
  },
  "/assets/sliders-horizontal-DpIV5nfy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-eH2lxmNcL4B7BjIHP8etN5dbynk"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-DpIV5nfy.js"
  },
  "/assets/star-DTMvdb5c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-r4O+w788IRU9KodK+Wk42LCIXgs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 473,
    "path": "../public/assets/star-DTMvdb5c.js"
  },
  "/assets/topics._slug-obc5yJtc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f5-5Hu0i2HDNm+VL96HqzQXevAI3RU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 2293,
    "path": "../public/assets/topics._slug-obc5yJtc.js"
  },
  "/assets/TranslatedMarkdown-CuanzLev.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-ZlzvwzgxWMXHcrdXr+dVodHN3EM"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-CuanzLev.js"
  },
  "/assets/styles-H80djlO0.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2ea3c-4HWALosNJFahMiz+lY/tLtnZ9uc"',
    "mtime": "2026-08-30T17:33:18.056Z",
    "size": 191036,
    "path": "../public/assets/styles-H80djlO0.css"
  },
  "/assets/trash-2-B853ZM-7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-bBTWZLKpLWyPSzOZ5zoHzzhsteo"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 329,
    "path": "../public/assets/trash-2-B853ZM-7.js"
  },
  "/assets/trending-up-D3xj-B4J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-FITr57htzIJMD7WqTCpAsXiwhEo"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 932,
    "path": "../public/assets/trending-up-D3xj-B4J.js"
  },
  "/assets/triangle-alert-C3RIWtZB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-OEmUMigZ1GwdFr7XkwbfR0xwMWs"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-C3RIWtZB.js"
  },
  "/assets/upload-D3LLt_bH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-6bsl5zXCwGGkDxPLb0gdRGppXIA"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 231,
    "path": "../public/assets/upload-D3LLt_bH.js"
  },
  "/assets/useMutation-CHIRVDv1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-16AT0wkc1dXLIWFaxYNXRTTSDTE"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 2211,
    "path": "../public/assets/useMutation-CHIRVDv1.js"
  },
  "/assets/user-plus-SAezWdEm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-ryPh6WliVWJtwODqT3+ywpNYAgo"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 311,
    "path": "../public/assets/user-plus-SAezWdEm.js"
  },
  "/assets/user-x-DzS_cV-3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"373-hoNl099vx7zka2WZ9sTkKdg2XCQ"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 883,
    "path": "../public/assets/user-x-DzS_cV-3.js"
  },
  "/assets/users-hXWjoySd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-i2yY8xmBn8Trg3o83avmLdZL0E8"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 307,
    "path": "../public/assets/users-hXWjoySd.js"
  },
  "/assets/useSuspenseQuery-imtlSgUv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-SJ+DE9g3M6MjHM9AdBKSNl+gpSU"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-imtlSgUv.js"
  },
  "/assets/utils-BRwVymqk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-lQsYRWYAo/i6srpIyzM7AxBA474"',
    "mtime": "2026-08-30T17:33:18.093Z",
    "size": 59982,
    "path": "../public/assets/utils-BRwVymqk.js"
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
