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
  "/assets/about-UMal8rM_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-CIQNIrIc8Pxu6p5nERkpdGZS1qI"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 3398,
    "path": "../public/assets/about-UMal8rM_.js"
  },
  "/images/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/images/author-hussain.jpg"
  },
  "/images/author-hussain-original.jpg": {
    "type": "image/jpeg",
    "etag": '"23253-0EbOe3DBgnE0F6k8q3PJLw6Gr8g"',
    "mtime": "2026-08-27T03:07:35.496Z",
    "size": 143955,
    "path": "../public/images/author-hussain-original.jpg"
  },
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
  },
  "/assets/account-Cq627z8Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-Qvkf9l8HYVBD81TYnpHUR+9wF8E"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 2068,
    "path": "../public/assets/account-Cq627z8Z.js"
  },
  "/assets/admin-anYfamDs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-S/zs0GNrQgaaBr+GQ0BBMfDuu4w"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 2555,
    "path": "../public/assets/admin-anYfamDs.js"
  },
  "/assets/admin.categories-Btv1gUNj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-VDrwe7Kg+gu3WBqZvuuAxqX2J+Q"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-Btv1gUNj.js"
  },
  "/assets/admin.comments-C9BQNc3i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-48wLAzSkGbYot7y8qwGrSJiq9GQ"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-C9BQNc3i.js"
  },
  "/assets/admin.destinations-unTB-PIy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-TbTPUMTCuhkv0LNp2X9PFzJugD0"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-unTB-PIy.js"
  },
  "/assets/admin.gallery-Sg1lC5Az.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-p6hClWPTM8NHSNlVhx2MlZGE4Eo"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-Sg1lC5Az.js"
  },
  "/assets/admin.homepage-CmMyshrJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-VYemQDUHmiGtiNlRjH1sT9mVt5Y"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-CmMyshrJ.js"
  },
  "/assets/admin.index-BZDJeHKn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-NZHPxrGy0kT21BLsmi1VnFzZUkI"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 4075,
    "path": "../public/assets/admin.index-BZDJeHKn.js"
  },
  "/assets/admin.messages-bpZ2AgeW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-1DalG2G9YdaAOVumiwdO/2lt+o8"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-bpZ2AgeW.js"
  },
  "/assets/admin.news-Akc7qfHa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-0H2mVZa2CUgjoCjVrS8zqOyyY4g"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 34492,
    "path": "../public/assets/admin.news-Akc7qfHa.js"
  },
  "/assets/admin.analytics-FRq-CY_7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-zi3ib4YF4sgwyWbD/UPHaZFAikY"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-FRq-CY_7.js"
  },
  "/assets/admin.posts.new-BkDM0ivy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-ZCJTWWcyr+h3B8Mju6sRBGLOVMQ"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-BkDM0ivy.js"
  },
  "/assets/admin.posts.index-Bobt3mri.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-1p62yTenEp/W7QoruAJppF1f0lM"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-Bobt3mri.js"
  },
  "/assets/admin.posts._id-DxCtZabw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-4RgR0bP0qGKx2WbhFsSpsjbxn10"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-DxCtZabw.js"
  },
  "/assets/admin.public-message-CNeEuYLb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-sgTnel8l7mUMOvLOqwSuxc65l18"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-CNeEuYLb.js"
  },
  "/assets/admin.settings-DVrRQ3Tb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ebd-t3NsX4vhPZf2oWZGHU1ubqIX+2A"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 16061,
    "path": "../public/assets/admin.settings-DVrRQ3Tb.js"
  },
  "/assets/admin.subscribers-Dwe2Fbso.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-y05d8aMMgcggYb0saHLIqGqvFNg"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-Dwe2Fbso.js"
  },
  "/assets/AdSlot-DSuMHuYL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-k/1gMYFv5nRCl8vdPLZMqa0mHcs"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-DSuMHuYL.js"
  },
  "/assets/alert-dialog-09IQxZJb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-1skI9p0aQTju0Iz2kkDl9Tpl0lE"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-09IQxZJb.js"
  },
  "/assets/arrow-left-CRv6s2eQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-ulvDmwIN5cj5Lxko4MU7XwdAvNs"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 166,
    "path": "../public/assets/arrow-left-CRv6s2eQ.js"
  },
  "/assets/auth-D1gfhgWq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-vzln/5RolA3g1NyN+JQjUw6jmNk"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 8188,
    "path": "../public/assets/auth-D1gfhgWq.js"
  },
  "/assets/arrow-up-right-QEUdU5Ms.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-k9sl0NoZeu06/8MtknZzR2PHW20"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-QEUdU5Ms.js"
  },
  "/assets/blog-DtdglzbB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-RqtCyOan+zb43wK73hc3LfHYqqM"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 103,
    "path": "../public/assets/blog-DtdglzbB.js"
  },
  "/assets/blog.index-HMzEpj58.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28be-0Z0Bi2NmcSkuaaDnjAmpfwE4OCI"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 10430,
    "path": "../public/assets/blog.index-HMzEpj58.js"
  },
  "/assets/blog._slug-DSUGZqXC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-HmHYHH/xluNeVu5deK17qmJmp+Q"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 572,
    "path": "../public/assets/blog._slug-DSUGZqXC.js"
  },
  "/assets/blog._slug-gLqdxQpy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6fb2-+4zHslPNOrwrvzyn02hRG2MW6Ew"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 28594,
    "path": "../public/assets/blog._slug-gLqdxQpy.js"
  },
  "/assets/book-open-BwJ4YDcA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-agZPywp/h1iEYTWq+LGuYPw0YaQ"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 280,
    "path": "../public/assets/book-open-BwJ4YDcA.js"
  },
  "/assets/calendar-Cn8R_ONH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-mL1txhImaHdN1zPH0M3zG528qjg"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 258,
    "path": "../public/assets/calendar-Cn8R_ONH.js"
  },
  "/assets/category._slug-BYzbfDPH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-JMdQfPF+HACmAg2MVAOvnunu+Ic"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 3842,
    "path": "../public/assets/category._slug-BYzbfDPH.js"
  },
  "/assets/chart-column-CA39l98M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-c6zmuOsIi460VsoPxPXWyuTJvB4"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 252,
    "path": "../public/assets/chart-column-CA39l98M.js"
  },
  "/assets/check-BVoPGnsH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-s3gUBtzwIkrr1jXaJyv8xVR1/mo"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 125,
    "path": "../public/assets/check-BVoPGnsH.js"
  },
  "/assets/chevron-left-B4c_5Exx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-X0nAazVUTuHLGKsblZCpAt4jepA"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 131,
    "path": "../public/assets/chevron-left-B4c_5Exx.js"
  },
  "/assets/chevron-right-IpMPwyR3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-yWNs/rrowMy6I/OkRfVPChX8APc"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 131,
    "path": "../public/assets/chevron-right-IpMPwyR3.js"
  },
  "/assets/circle-check-_bCWAc3_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-hzdUDArZTdzutIzaZQH2/ZqTF/g"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 179,
    "path": "../public/assets/circle-check-_bCWAc3_.js"
  },
  "/assets/clock-B0Htgr_b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-Z4aI+ZPHToR83vkUM4LJQJTm77A"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 170,
    "path": "../public/assets/clock-B0Htgr_b.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/contact--jlpA5ac.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-PidC3H4n5tnHCRd1WZSiUc1XDKs"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 14845,
    "path": "../public/assets/contact--jlpA5ac.js"
  },
  "/assets/destinations.index-DrYnIb-T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-tVXdi9c4ZwHJsSmFxuWNjlXWA04"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-DrYnIb-T.js"
  },
  "/assets/destinations-cov2Zsbv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-WE1DAMl5csZ6JxZzMo2HmE4Nx78"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 103,
    "path": "../public/assets/destinations-cov2Zsbv.js"
  },
  "/assets/destinations._slug-DmtWN9Ik.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-Jk6Kr30fV49kbaAUs+wXv1KBS1c"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DmtWN9Ik.js"
  },
  "/assets/dialog-C992GKht.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-zCGLysqIDdezztPk0YNtxsFLvbw"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 1830,
    "path": "../public/assets/dialog-C992GKht.js"
  },
  "/assets/destinations._slug-DVmVVLWn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-f5vK4A3prVu8qX7aNjwelqc3C00"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-DVmVVLWn.js"
  },
  "/assets/earth-D6quc1Qc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-qixkfUJFWTFf51H809LQn+svh30"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 394,
    "path": "../public/assets/earth-D6quc1Qc.js"
  },
  "/assets/DestinationsMap-BlpTcuWy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-xO/gSzKxWuXGVHe7XwfX97WezfA"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-BlpTcuWy.js"
  },
  "/assets/external-link-CczECKxl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-oHjEu+/R4lYkVjKb4FnikRPfZzk"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 252,
    "path": "../public/assets/external-link-CczECKxl.js"
  },
  "/assets/eye-Br0FxfKE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-DGONYyJiw21654YX+AMYXkYvD8k"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 257,
    "path": "../public/assets/eye-Br0FxfKE.js"
  },
  "/assets/flame-BNYhntd0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-7LlEaG2Z11YuOtIRfM2lwPG9y1I"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 200,
    "path": "../public/assets/flame-BNYhntd0.js"
  },
  "/assets/folder-tree-D2_z8M98.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-lgM5VQSfRUcgzOxkKABnm47fFXU"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 480,
    "path": "../public/assets/folder-tree-D2_z8M98.js"
  },
  "/assets/gallery-CDGtdDwi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-SuUIQ92vRLZG1i7+qFNujEeoWkw"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 6285,
    "path": "../public/assets/gallery-CDGtdDwi.js"
  },
  "/assets/geocoding.functions-BXtTcwNr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-VrW2xMTylfgAH5Finh5mO+UGw8Q"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-BXtTcwNr.js"
  },
  "/assets/image-DxsxHdjD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-0PaprcCeDD3sfoPPy5oUmEASu2U"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 270,
    "path": "../public/assets/image-DxsxHdjD.js"
  },
  "/assets/house-1NlQqZae.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-mHhh3xpFZ0ZOIgE8ZJuCA07Sy2E"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 282,
    "path": "../public/assets/house-1NlQqZae.js"
  },
  "/assets/layers-DErjzIdS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-RGRpUjKLGf+jKvJUpOLoguOqQ/U"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 422,
    "path": "../public/assets/layers-DErjzIdS.js"
  },
  "/assets/index-DCC6zAE6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-iyTkEmv6daZyHxFu+hVrbQnL/0A"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 172647,
    "path": "../public/assets/index-DCC6zAE6.js"
  },
  "/assets/key-round-DbHjfho4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-IsqNVbQmJkcVfftuhIEDMesGvOY"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 356,
    "path": "../public/assets/key-round-DbHjfho4.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T09:42:24.194Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-DnnNb0Wp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-+PD0T0Eb7GDbR/VdXlNGFxMQp9M"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 290228,
    "path": "../public/assets/index-DnnNb0Wp.js"
  },
  "/assets/leaflet-src-Ca9KFvCN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-KJNaLn60peozx3FHN742HDCfJm4"',
    "mtime": "2026-08-27T09:42:24.213Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Ca9KFvCN.js"
  },
  "/assets/list-BDlb3gS4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-T07InLLVsw+TIUeWRZNkntfQxT8"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 303,
    "path": "../public/assets/list-BDlb3gS4.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-Bm6qQbof.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-7to8CsA+x40y9KJu18Jn8jtmaRg"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 914,
    "path": "../public/assets/maximize-2-Bm6qQbof.js"
  },
  "/assets/navigation-DGTqC2TG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-/Hm+nucw96vzc3KSTdndqibEy8k"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 149,
    "path": "../public/assets/navigation-DGTqC2TG.js"
  },
  "/assets/message-square-Bb3ZwiGM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-i7TsHpHeMNN367goSxE/fZwZDw4"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 234,
    "path": "../public/assets/message-square-Bb3ZwiGM.js"
  },
  "/assets/index-2kLzCMPz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8195-NsLGzAQfR13VGOVdR5R0OszRzS0"',
    "mtime": "2026-08-27T09:42:24.213Z",
    "size": 950677,
    "path": "../public/assets/index-2kLzCMPz.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T09:42:24.167Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T09:42:24.194Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-BaM0QvXs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-6N8t6akNbq/0VY2EfBToBLCO9dI"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 974,
    "path": "../public/assets/news._slug-BaM0QvXs.js"
  },
  "/assets/news._slug-Bl8Pb0RF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-Jdsifmlonsi4oflEddCqvMbidIc"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 4523,
    "path": "../public/assets/news._slug-Bl8Pb0RF.js"
  },
  "/assets/PageBreadcrumbs-Czs6FRsN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-YdhdRn2CBtBB1kCY1oiNfdvsn50"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-Czs6FRsN.js"
  },
  "/assets/plus-t1ikEnML.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-Fg4lsJjuyYgY8zWEHUspS1roVIk"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 154,
    "path": "../public/assets/plus-t1ikEnML.js"
  },
  "/assets/pencil-BjMp-Cal.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-l3GCrOiAsIKj4cjZr9H4pJVufLY"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 277,
    "path": "../public/assets/pencil-BjMp-Cal.js"
  },
  "/assets/PostCard-BmJlcfZo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f69-YKxezAoBD1dgrd5XKTu0OgOnDus"',
    "mtime": "2026-08-27T09:42:24.200Z",
    "size": 3945,
    "path": "../public/assets/PostCard-BmJlcfZo.js"
  },
  "/assets/PostEditor-B9J9pmn-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b13b-A8Zr19QgY8p14n7Du+zlpsOwvMc"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 45371,
    "path": "../public/assets/PostEditor-B9J9pmn-.js"
  },
  "/assets/radio-lPkGwJ6K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-KL33Y5MZAUVyMIOoVVFs1J8FfeE"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 375,
    "path": "../public/assets/radio-lPkGwJ6K.js"
  },
  "/assets/refresh-cw-BSXoxUHQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-YBUNypRTC8gHlBYTVLiheYD1Vf8"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-BSXoxUHQ.js"
  },
  "/assets/save-rtEoIZPc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-8a1ICw6iSu3OnqsFv4ue7xawa1o"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 328,
    "path": "../public/assets/save-rtEoIZPc.js"
  },
  "/assets/route-BBRg_Y5V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-GWZnWGXaljBxT1T1twG92Pr4pEg"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 95,
    "path": "../public/assets/route-BBRg_Y5V.js"
  },
  "/assets/settings-DIhHPIDv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-3sl5BDi/IOyyPtRJH/tLtYfsmvc"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 488,
    "path": "../public/assets/settings-DIhHPIDv.js"
  },
  "/assets/shield-BBYi43f-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-pfomnj69szLxGAnzhKqgm5OSvhk"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 273,
    "path": "../public/assets/shield-BBYi43f-.js"
  },
  "/assets/share-2-CXBW3cwh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-ITqPPmatVp1jyXea0J/FI3VaNPU"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 358,
    "path": "../public/assets/share-2-CXBW3cwh.js"
  },
  "/assets/shield-check-OBy_WhH4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-TDwr07/bJnWBRztm3ym8t7OYSs0"',
    "mtime": "2026-08-27T09:42:24.202Z",
    "size": 321,
    "path": "../public/assets/shield-check-OBy_WhH4.js"
  },
  "/assets/star-BLjbw_6c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-IM3sDc46JwA6FZc5ymkHNAJUCC0"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 473,
    "path": "../public/assets/star-BLjbw_6c.js"
  },
  "/assets/styles-BzsR2m11.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"28a8f-CkCHjJ3Qe44+yhkMAh+xXmwkw68"',
    "mtime": "2026-08-27T09:42:24.196Z",
    "size": 166543,
    "path": "../public/assets/styles-BzsR2m11.css"
  },
  "/assets/topics._slug-DvruoNlI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-kuljOJLUxNTVQm7uHztvnSrBEdc"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-DvruoNlI.js"
  },
  "/assets/trash-2-B_MPGmQ4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-LZpU2hHS7Kr2kaDVEjynmuO+JA0"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 329,
    "path": "../public/assets/trash-2-B_MPGmQ4.js"
  },
  "/assets/triangle-alert-zs4U3ze3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-ekW5iUabRqFoawMw28gIkh/tQx0"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-zs4U3ze3.js"
  },
  "/assets/upload-De0bZhil.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-Nuaujexcy1wJXIO7BYSYcvZxwHE"',
    "mtime": "2026-08-27T09:42:24.210Z",
    "size": 231,
    "path": "../public/assets/upload-De0bZhil.js"
  },
  "/assets/useMutation-CJtsr6a_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-pmXOadD2lSGmAKZ85hq3SLoKTNw"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 2211,
    "path": "../public/assets/useMutation-CJtsr6a_.js"
  },
  "/assets/users-Ck1pZgmk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-2vjNH2YRBALjBlh/02XxO1ljSD8"',
    "mtime": "2026-08-27T09:42:24.208Z",
    "size": 307,
    "path": "../public/assets/users-Ck1pZgmk.js"
  },
  "/assets/useSuspenseQuery-C3LB7F_Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-NiBBm/2G9eEXBECFX27sXDEWRzA"',
    "mtime": "2026-08-27T09:42:24.198Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-C3LB7F_Y.js"
  },
  "/assets/utils-C6F-UEBJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-CefFBlQDkk+sHBHq8c1zWq0stOw"',
    "mtime": "2026-08-27T09:42:24.206Z",
    "size": 59982,
    "path": "../public/assets/utils-C6F-UEBJ.js"
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
