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
  "/assets/account-yklMMzpy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-OpllKLd3Q6VbzVJ9kvqUQ6m6ODM"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 2068,
    "path": "../public/assets/account-yklMMzpy.js"
  },
  "/assets/about-HzZyTHTX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b75-GG2lGF5+SZJc8wmu+ji8N2IvPIA"',
    "mtime": "2026-08-16T21:58:09.720Z",
    "size": 2933,
    "path": "../public/assets/about-HzZyTHTX.js"
  },
  "/assets/admin-DRkYbIMK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7f7-M5e+xg2M2KDLaxtbphXBQeLmiMA"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 2039,
    "path": "../public/assets/admin-DRkYbIMK.js"
  },
  "/assets/admin.comments-Db_G2l8C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8dc-x+LSLW2HLlbBKhQJrbPeJ5+CSHg"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 2268,
    "path": "../public/assets/admin.comments-Db_G2l8C.js"
  },
  "/assets/admin.destinations-Gn4wV-0K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"145a-tqDSKSUVF+YSxF4SC9TDtW2Bs94"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 5210,
    "path": "../public/assets/admin.destinations-Gn4wV-0K.js"
  },
  "/assets/admin.index-Ricu5jVH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e48-4QgVdJKPIEBuiFiF9qcL8zHCt5M"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 3656,
    "path": "../public/assets/admin.index-Ricu5jVH.js"
  },
  "/assets/admin.messages-CxQzmxJx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1309-DlPwXMvq4Ts1W1e9fGOfLcHlx8E"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 4873,
    "path": "../public/assets/admin.messages-CxQzmxJx.js"
  },
  "/assets/admin.posts.index-CZQFxWfv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11cf9-JhGYvZMsX6QtcYcILnGv/ruoOVY"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 72953,
    "path": "../public/assets/admin.posts.index-CZQFxWfv.js"
  },
  "/assets/admin.posts.new-DsL4iUjp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-fSnBp8rdIEhp8vF6AOBHlVT/qX0"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-DsL4iUjp.js"
  },
  "/assets/admin.posts._id-CpvaR38X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-6KioATB/clPkuC8EgGtJjHcNd1I"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-CpvaR38X.js"
  },
  "/assets/admin.analytics-Dyetn-Sv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"645ed-TWWDkWigB1IO6ssef+NwwmuNtJE"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 411117,
    "path": "../public/assets/admin.analytics-Dyetn-Sv.js"
  },
  "/assets/admin.subscribers-VZmWyIbu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f71-oyYRPp/O2J5rzKeuJNEeH8JuMi4"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 12145,
    "path": "../public/assets/admin.subscribers-VZmWyIbu.js"
  },
  "/assets/arrow-left-3iGYySOt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-Fysk126V+pJ9M9TZxHcSpxHC6qo"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 166,
    "path": "../public/assets/arrow-left-3iGYySOt.js"
  },
  "/assets/arrow-right-B9E-zh0N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-qBSwL085FdC16KrqjdOOUGh05ac"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 166,
    "path": "../public/assets/arrow-right-B9E-zh0N.js"
  },
  "/assets/arrow-up-right-CXQ-tVwv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-ryL3MuUhvd3RkxrDIwfK/+etw+g"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-CXQ-tVwv.js"
  },
  "/assets/auth-DBkrTf_b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f05-NgHj219FBmwO0GTBAMLjaj9kqp0"',
    "mtime": "2026-08-16T21:58:09.720Z",
    "size": 7941,
    "path": "../public/assets/auth-DBkrTf_b.js"
  },
  "/assets/blog-BGtf3_q1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-qulOwF7Cy0BpnGtNUM14RjzgfVw"',
    "mtime": "2026-08-16T21:58:09.720Z",
    "size": 103,
    "path": "../public/assets/blog-BGtf3_q1.js"
  },
  "/assets/blog.index-F_M_2StJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2327-Av/bu+Hq2npyded4qW4W7WrT0Y4"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 8999,
    "path": "../public/assets/blog.index-F_M_2StJ.js"
  },
  "/assets/blog._slug-BQa6-peP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"237-6/xucQ4Jd/yGnHn4Xr00D6R31pk"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 567,
    "path": "../public/assets/blog._slug-BQa6-peP.js"
  },
  "/assets/blog._slug-DsdthnjY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4bb4-XpvHKqtbFjr/wnGSalRNkjtMaJk"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 19380,
    "path": "../public/assets/blog._slug-DsdthnjY.js"
  },
  "/assets/calendar-0Z5LXVX-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-XfKHGMkUX3GT1Y01ntGVTD4EoE4"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 258,
    "path": "../public/assets/calendar-0Z5LXVX-.js"
  },
  "/assets/chevron-right-DhqukNSp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5-r93jnHWZLs7ogYJUw4m+CuQt42A"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 213,
    "path": "../public/assets/chevron-right-DhqukNSp.js"
  },
  "/assets/circle-check-C0wOM1nc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-xtkDiqIXXjDBDznQiB9crLnH2HY"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 174,
    "path": "../public/assets/circle-check-C0wOM1nc.js"
  },
  "/assets/clock-BBHDpshi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-hhr5QlKT+fegJ1aOHfD+2KZHRE0"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 165,
    "path": "../public/assets/clock-BBHDpshi.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-COonaEgY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17da-ZPfdBPckefh71WsYZzKb+yaJpXc"',
    "mtime": "2026-08-16T21:58:09.720Z",
    "size": 6106,
    "path": "../public/assets/contact-COonaEgY.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-16T21:58:09.720Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-pbIyV7TM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-lQK4Kq3f5zjHeMuJXo8xMkdhInM"',
    "mtime": "2026-08-16T21:58:09.719Z",
    "size": 103,
    "path": "../public/assets/destinations-pbIyV7TM.js"
  },
  "/assets/destinations.index-CMPstP7O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"162b-VCVaTqb1HrSTU/itGfxL+A1mrjU"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 5675,
    "path": "../public/assets/destinations.index-CMPstP7O.js"
  },
  "/assets/destinations._slug-7b5fYxbz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-SeG4ehqitaveYZW2xvxx0Sk4O8Y"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-7b5fYxbz.js"
  },
  "/assets/destinations._slug-CNreLi9X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c23-mZ44SFMZcMSt7tzm/JBrJ6DEqaY"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 7203,
    "path": "../public/assets/destinations._slug-CNreLi9X.js"
  },
  "/assets/DestinationsMap-BbaCBMFW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-Xzc5RnXxNhd4HaXP/SZPLyKLN1k"',
    "mtime": "2026-08-16T21:58:09.723Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-BbaCBMFW.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-16T21:58:09.719Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/eye-B6hSXbEi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-b8JNtr8jR+ytTR6Iz4BmQDpFRTM"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 252,
    "path": "../public/assets/eye-B6hSXbEi.js"
  },
  "/assets/gallery-BZNcudph.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1831-d95SFFrssRgqFCjr8Z/UHQzPGGs"',
    "mtime": "2026-08-16T21:58:09.719Z",
    "size": 6193,
    "path": "../public/assets/gallery-BZNcudph.js"
  },
  "/assets/index-nKbw8MTb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ceca-10jRXcHiyv591zP3wow1NgtWwZM"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 118474,
    "path": "../public/assets/index-nKbw8MTb.js"
  },
  "/assets/index-uKgRT7Ce.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21a19-ogbAK4ljqHF87SltQp8pW4J13A0"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 137753,
    "path": "../public/assets/index-uKgRT7Ce.js"
  },
  "/assets/mail-C-lisS3n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-Dg0l3iroeFoPtfbzh03j79kdNaw"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 214,
    "path": "../public/assets/mail-C-lisS3n.js"
  },
  "/assets/leaflet-src-BQb1bTPa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-2UgR+tiGEN+8mhXWlQ/DWeMHZ+k"',
    "mtime": "2026-08-16T21:58:09.723Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-BQb1bTPa.js"
  },
  "/assets/map-BQ1yqRb1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-rfJBa6vrtY9LJpPp9euJokwf7RU"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 426,
    "path": "../public/assets/map-BQ1yqRb1.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-16T21:58:09.719Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-Do1leqaX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b5-A4lDpKsacQJqTIVSqetVK6hziD0"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 437,
    "path": "../public/assets/message-square-Do1leqaX.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:58:09.719Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-16T21:58:09.710Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/index-UV7JQgnJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d530a-Fm2GQrn+JmjfJ3fpdEdvgxZe7Ho"',
    "mtime": "2026-08-16T21:58:09.723Z",
    "size": 873226,
    "path": "../public/assets/index-UV7JQgnJ.js"
  },
  "/assets/plus-B7gZKfX_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-PpCqhFyeCv6r1xfNCNEuWyVCjic"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 154,
    "path": "../public/assets/plus-B7gZKfX_.js"
  },
  "/assets/PostCard-CX2murbU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"88b-x+Uz5yTyOMAAr5y2CiPXhkYNnQI"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 2187,
    "path": "../public/assets/PostCard-CX2murbU.js"
  },
  "/assets/refresh-cw-CgnREVT-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-Vpktnda7LuwL+VI+Zz0PDxVoWGc"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-CgnREVT-.js"
  },
  "/assets/PostEditor-CTtV4rGC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5030-Hqc18HxuOVOcY1lHAvftpqjkoNE"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 20528,
    "path": "../public/assets/PostEditor-CTtV4rGC.js"
  },
  "/assets/route-jV60lHKK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-AkLr1xy+SS9ylvfXaweuaKaJeyg"',
    "mtime": "2026-08-16T21:58:09.720Z",
    "size": 95,
    "path": "../public/assets/route-jV60lHKK.js"
  },
  "/assets/share-2-c5N1HuBT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"161-n/gVzjZDlJCy3XgkdzJLbllYL7o"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 353,
    "path": "../public/assets/share-2-c5N1HuBT.js"
  },
  "/assets/sparkles-00l5-EWe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-7AB62Ar6LxjK9d2g8VWtc1ICx+0"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 495,
    "path": "../public/assets/sparkles-00l5-EWe.js"
  },
  "/assets/star-C43Ve37R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-xUuDEp98TASHA16pp+u3NLZR8K8"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 473,
    "path": "../public/assets/star-C43Ve37R.js"
  },
  "/assets/trash-2-BXpQmMVp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-rLDaDCXyTOqIOJswVGYjXIKZcMQ"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 329,
    "path": "../public/assets/trash-2-BXpQmMVp.js"
  },
  "/assets/styles-C1g6EmUF.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1eac8-6u0KhbMmBQJMlBK0VeJsMUpn61I"',
    "mtime": "2026-08-16T21:58:09.719Z",
    "size": 125640,
    "path": "../public/assets/styles-C1g6EmUF.css"
  },
  "/assets/useBaseQuery-DgUfBnxS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-gQsaAlfd1tTASmsQDnB5VfeUurg"',
    "mtime": "2026-08-16T21:58:09.723Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-DgUfBnxS.js"
  },
  "/assets/useMutation-dBv5M8Ss.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-Q8beGrX7v4ZlcmYfjC/1d6ZJFD8"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 2210,
    "path": "../public/assets/useMutation-dBv5M8Ss.js"
  },
  "/assets/useQuery-B99a5bBn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-tBxQJUNQb7gSFQc6wvE2cfwh/k8"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 100,
    "path": "../public/assets/useQuery-B99a5bBn.js"
  },
  "/assets/users-CIddPiBQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-dUIjJNEu+9Qoq1m8cXEPsoaMzhk"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 307,
    "path": "../public/assets/users-CIddPiBQ.js"
  },
  "/assets/useSuspenseQuery-DlKE3XyP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-ga602gG++gCCUkJbkvIxoKhoym0"',
    "mtime": "2026-08-16T21:58:09.721Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-DlKE3XyP.js"
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
