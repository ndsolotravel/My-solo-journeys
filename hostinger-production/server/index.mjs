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
  "/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/author-hussain.jpg"
  },
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
  "/assets/about-DF0vT7Z6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-oQSJH35HFu/3Qbxi59oAVuvFBM8"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 3398,
    "path": "../public/assets/about-DF0vT7Z6.js"
  },
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/assets/account-CCUdJzA-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-leXAaqlMFixkxkMqu3T1OGCe0nE"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 2068,
    "path": "../public/assets/account-CCUdJzA-.js"
  },
  "/assets/admin-BllooFBX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-O/ato/o/qnB9ldevppj6Kxlgngk"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 2555,
    "path": "../public/assets/admin-BllooFBX.js"
  },
  "/assets/admin.categories-CLKJ6Oot.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-Pl2Z1sciYWFteXcHV4dzAOqwrU4"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-CLKJ6Oot.js"
  },
  "/assets/admin.comments-W0AKrbep.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-MhIgxetA8lP6yBciJj2ISEdSYKI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-W0AKrbep.js"
  },
  "/assets/admin.destinations-BY4bLz_x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-rUfimuOqJLBV2zadCWENw3GWlRo"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-BY4bLz_x.js"
  },
  "/assets/admin.analytics-BCO7HU3t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-XYApCj4rjb2hLG2JINrCtQQwMMI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-BCO7HU3t.js"
  },
  "/assets/admin.gallery-sxR7p-Rm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-7/C0IJEixdRSFWJjNJT5A4HjN14"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-sxR7p-Rm.js"
  },
  "/assets/admin.homepage-BHCYYXA4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-SeOITFyFkbuzEuxQ0VFB+5iI3mc"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-BHCYYXA4.js"
  },
  "/assets/admin.index-BSRUXCRF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-C/Wgx4FYh0sdmXYzKvyeTAiHzS8"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 4075,
    "path": "../public/assets/admin.index-BSRUXCRF.js"
  },
  "/assets/admin.messages-CmBtJwSj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-q9oN+SKigaybjpstAb++1fPU8iw"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-CmBtJwSj.js"
  },
  "/assets/admin.news-_5qcJXFs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-IqzXoXxIRfqp/S7eN44h8Xmlxbc"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 34492,
    "path": "../public/assets/admin.news-_5qcJXFs.js"
  },
  "/assets/admin.posts.index-qY7LHo4V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-od6+ZZkWLGWlr9WQ7qFpSy6ar2I"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-qY7LHo4V.js"
  },
  "/assets/admin.posts.new-fcfD3f3N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-gg5fpHRHjttIpRrCOpDIdGD1TtI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-fcfD3f3N.js"
  },
  "/assets/admin.posts._id-BE9onOLg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-a378MCa7tmzx7bNW15v+88O4cVI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-BE9onOLg.js"
  },
  "/assets/admin.public-message-C0EqACc2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-eNNeFjoqOYOtuZDAjk4GgUBV34U"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-C0EqACc2.js"
  },
  "/assets/admin.settings-BdS-mhM7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ebd-N16bWultPAqIPsF23OD7GZMjZMo"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 16061,
    "path": "../public/assets/admin.settings-BdS-mhM7.js"
  },
  "/assets/admin.subscribers-wT8jlhcH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-NLqzVEEpG21p8g59OyLrNuQhcuM"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-wT8jlhcH.js"
  },
  "/assets/AdSlot-C6o-LbUq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-gxcaoJcM7xRLKc85hmTQ0cXJwxc"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-C6o-LbUq.js"
  },
  "/assets/alert-dialog-ZFH1dRA7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-ETyNBb+wlyG2G4m5b7FItXqVDZU"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-ZFH1dRA7.js"
  },
  "/assets/arrow-left-C6VppP1K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-Sx26PtwWckHKxlyoEQfF4FPeqlk"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 166,
    "path": "../public/assets/arrow-left-C6VppP1K.js"
  },
  "/assets/arrow-up-right-DcX-SM7O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-arRuAHm9ytJaX2bJFY5b2wGkqVM"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-DcX-SM7O.js"
  },
  "/assets/blog-BVnx2mHQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-2+eyMvcpCgHdukZhkX2TR+rTsVc"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 103,
    "path": "../public/assets/blog-BVnx2mHQ.js"
  },
  "/assets/auth-BXDj9GHy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-d7zTOqy0FBoCZMFDW2JR5EMDmfQ"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 8188,
    "path": "../public/assets/auth-BXDj9GHy.js"
  },
  "/assets/blog.index-DAbXh3od.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28be-/Fd4zPi9YxVzme/rMcuidE3ZFWE"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 10430,
    "path": "../public/assets/blog.index-DAbXh3od.js"
  },
  "/assets/blog._slug-Byn32AtP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-xXY96cY9XjZIUAzeFHbScCZ05Zc"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 572,
    "path": "../public/assets/blog._slug-Byn32AtP.js"
  },
  "/assets/blog._slug-D3r5EUR3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706f-tyE4BjjhbYGVIRIX8eAfVqXQugU"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 28783,
    "path": "../public/assets/blog._slug-D3r5EUR3.js"
  },
  "/assets/book-open-CE2VNAqR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-eQErefEXRLi2y8b6ELMHP7AI1S4"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 280,
    "path": "../public/assets/book-open-CE2VNAqR.js"
  },
  "/assets/calendar-DRo-KkHL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-kG7P1vDVxoi2piS07xD2d+R2xho"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 258,
    "path": "../public/assets/calendar-DRo-KkHL.js"
  },
  "/assets/category._slug-BOoLkgp1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-ykmog3C9jpxWRhU4zSm/YW/J8eI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 3842,
    "path": "../public/assets/category._slug-BOoLkgp1.js"
  },
  "/assets/chart-column-moW9OLHl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-jawGbuKcp7RxfgZzfFYQa0hW5ks"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 252,
    "path": "../public/assets/chart-column-moW9OLHl.js"
  },
  "/assets/check-Djr2OoQB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-qQjYN45wdL+RDzz5msKPo9Fw32M"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 125,
    "path": "../public/assets/check-Djr2OoQB.js"
  },
  "/assets/chevron-left-CXFgGAkm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-jIQD2cEzib4V9xKROmHgzKqZtFo"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 131,
    "path": "../public/assets/chevron-left-CXFgGAkm.js"
  },
  "/assets/chevron-right-B-FNij6g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-AcmYcEdR28UrADzP7ny0sehbTk8"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 131,
    "path": "../public/assets/chevron-right-B-FNij6g.js"
  },
  "/assets/circle-check-BJs4M-Wz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-Ed3poph2Jtk7ey1AoUwz7BRbm7I"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 179,
    "path": "../public/assets/circle-check-BJs4M-Wz.js"
  },
  "/assets/clock-CexTTNkO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-D1SOP8B4VDQuv7JzOSpHG01V+9g"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 170,
    "path": "../public/assets/clock-CexTTNkO.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-CHQd_asO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-Q+9kO15j8sisSp84xcejQtgMMJY"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 14845,
    "path": "../public/assets/contact-CHQd_asO.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-qtM7Aljl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-7Buph65dmdBBIIqnMw5ItMqqTP8"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 103,
    "path": "../public/assets/destinations-qtM7Aljl.js"
  },
  "/assets/destinations.index-CHumG94G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-uZvvvJv7UjzX0j2yArmbIx7IFvA"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-CHumG94G.js"
  },
  "/assets/destinations._slug-BN0ObIvY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-kX+kKIW3sCnNLZH4W6v1XzJIL9Q"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-BN0ObIvY.js"
  },
  "/assets/destinations._slug-DWuYuYki.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-NaEFqrbt4oxxOKgVtmlRoFmqUYM"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DWuYuYki.js"
  },
  "/assets/DestinationsMap-CLOB3GLJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-e30d1qQFYX+I8Y/SSgdxpOrUYZc"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-CLOB3GLJ.js"
  },
  "/assets/dialog-B3f9X9nX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-wluBk4a71UoZijfVnDbGKnZ9slQ"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 1830,
    "path": "../public/assets/dialog-B3f9X9nX.js"
  },
  "/assets/earth-BLdFsxfC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-RPW47sK5qY/yMa7wtKwNuX/Mz1U"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 394,
    "path": "../public/assets/earth-BLdFsxfC.js"
  },
  "/assets/external-link-CZcDMDv_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-x8FrFGcQBRqEC8g0yS9xNfSvQq0"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 252,
    "path": "../public/assets/external-link-CZcDMDv_.js"
  },
  "/assets/flame-BCQiqLgX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-AgshdvlH09EXNLBY0uerXuXhR3U"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 200,
    "path": "../public/assets/flame-BCQiqLgX.js"
  },
  "/assets/eye-BxJVqVD7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-o8XWcr+hOYNMV4BY3EHXyNwYNk8"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 257,
    "path": "../public/assets/eye-BxJVqVD7.js"
  },
  "/assets/folder-tree-uds_DJDr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-fjTFV8XiHSyFxAmA8JpKa/TAHOk"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 480,
    "path": "../public/assets/folder-tree-uds_DJDr.js"
  },
  "/assets/geocoding.functions-xV07igma.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-OdVH3Q2RYIDcYcKIXdCDhB2tzGw"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-xV07igma.js"
  },
  "/assets/gallery-DVEsgBde.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-XeZlFF+6dHqn0vDwNMQFKM5RsKI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 6285,
    "path": "../public/assets/gallery-DVEsgBde.js"
  },
  "/assets/house-GaJngwwe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-vWNOS3XOmlnDRCN0p+wHizjlT3M"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 282,
    "path": "../public/assets/house-GaJngwwe.js"
  },
  "/assets/image-haiqtkz1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-QbLjKo2DYpnkunmDuc8SNO5NL2E"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 270,
    "path": "../public/assets/image-haiqtkz1.js"
  },
  "/assets/index-ClKVRMIC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-eLUFbLpuHVFQK+CedaWzHndsLOQ"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 172647,
    "path": "../public/assets/index-ClKVRMIC.js"
  },
  "/assets/key-round-DqEjMhxe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-ufaqDB1SKUR/H5qoml99w+FeY3U"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 356,
    "path": "../public/assets/key-round-DqEjMhxe.js"
  },
  "/assets/layers-CUnWDwZm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-wj7ttWqZmA8DzVIn4N+FTpd8baY"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 422,
    "path": "../public/assets/layers-CUnWDwZm.js"
  },
  "/assets/index-4ITJSeb1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-Wu7w+MWU9SYAw3QLxemYY2Fn50M"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 290228,
    "path": "../public/assets/index-4ITJSeb1.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-CAmeduN0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-rBYbZcnlRnxYDZRn2cITahXV/84"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 303,
    "path": "../public/assets/list-CAmeduN0.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/leaflet-src-RpyVeTBp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-59cv4dBsQ0K0iXLF/BzGF1l28IA"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-RpyVeTBp.js"
  },
  "/assets/maximize-2-wK05UKIm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-Ce/E0pjWgy7BfyFVAG2cfsVTDbg"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 914,
    "path": "../public/assets/maximize-2-wK05UKIm.js"
  },
  "/assets/message-square-Bqze3C0D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-eduNNhFwre3fzXEa5+bFEgTHLXU"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 234,
    "path": "../public/assets/message-square-Bqze3C0D.js"
  },
  "/assets/navigation-DKKAk3vF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-naMI5jeggyHa+9EDvEaLVF74iqw"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 149,
    "path": "../public/assets/navigation-DKKAk3vF.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T10:10:52.136Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-B6q4rImQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-FlxZC4Ptv6L1o2gKgzaOXFvPfmM"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 974,
    "path": "../public/assets/news._slug-B6q4rImQ.js"
  },
  "/assets/index-DJK-IMJq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8195-Lhv+iXztsiXsdanrP+lvLrKjqHw"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 950677,
    "path": "../public/assets/index-DJK-IMJq.js"
  },
  "/assets/news._slug-qsCDIh_3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-iJGtI7wDADCxse8ZkLHNkp9fobs"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 4523,
    "path": "../public/assets/news._slug-qsCDIh_3.js"
  },
  "/assets/PageBreadcrumbs-D4vdKQzs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-SVKCPWE2ezvHwZCK8r5pCLjVkgU"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-D4vdKQzs.js"
  },
  "/assets/pencil-Dy81n8OH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-O6XL4vsuLb2LdEr6vl4XrO+Kv7g"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 277,
    "path": "../public/assets/pencil-Dy81n8OH.js"
  },
  "/assets/plus-C1GF_A8-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-x7V6u5Q0V+FMa49wwu3hHInfpAQ"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 154,
    "path": "../public/assets/plus-C1GF_A8-.js"
  },
  "/assets/PostCard-B7yUuxgR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f69-l6pfoSHHt1oeta3/MXvIxr8Lk7c"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 3945,
    "path": "../public/assets/PostCard-B7yUuxgR.js"
  },
  "/assets/PostEditor-NLfoUgdK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bfe6-JeJ70Hh4YDnzI/pTgZTY752dw54"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 49126,
    "path": "../public/assets/PostEditor-NLfoUgdK.js"
  },
  "/assets/radio-D_9iKPhI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-mFLT6IK3x0/B+mO1JB/u574Jw84"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 375,
    "path": "../public/assets/radio-D_9iKPhI.js"
  },
  "/assets/refresh-cw-CPp9bzQw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-W3qneqxzZO5Ock87ciY+tsJ+siA"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-CPp9bzQw.js"
  },
  "/assets/route-BkM1hwoK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-JtNhPT4cHwdL/NXulnk/lgHyvJw"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 95,
    "path": "../public/assets/route-BkM1hwoK.js"
  },
  "/assets/save-8Cqh0czm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-Ic4TLtF2AahxTLYRGFsgSPkpiww"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 328,
    "path": "../public/assets/save-8Cqh0czm.js"
  },
  "/assets/settings-C5OL8U9t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-EBLTOsS4MYDkgm2e0g9wR7I3y/M"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 488,
    "path": "../public/assets/settings-C5OL8U9t.js"
  },
  "/assets/share-2-V8ijiUJS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-cn4nB2DipzCVXhBf5XISIyH7sHU"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 358,
    "path": "../public/assets/share-2-V8ijiUJS.js"
  },
  "/assets/shield-check-ChABCnRK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-UrALrQIWVo6JfgHKgTZhm/2+fH8"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 321,
    "path": "../public/assets/shield-check-ChABCnRK.js"
  },
  "/assets/shield-NRSn4f8E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-aT7vTvVucSf4qsSHj3eM/Bsx+D8"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 273,
    "path": "../public/assets/shield-NRSn4f8E.js"
  },
  "/assets/star-DCEhK0Pm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-XUY5PyeGLRJsqa8RZnHCLjEugXI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 473,
    "path": "../public/assets/star-DCEhK0Pm.js"
  },
  "/assets/topics._slug-C7VbDQuU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-3bHzKw0GrZb3mXOF1ySNdHMMYvI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-C7VbDQuU.js"
  },
  "/assets/trash-2-C9h2c_nf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-TbhiiTDYsTuer9QMVu3ElmkzBnI"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 329,
    "path": "../public/assets/trash-2-C9h2c_nf.js"
  },
  "/assets/triangle-alert-FftxUZq4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-zjnqVIiZ+yPEawePOE7i+w7W72o"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-FftxUZq4.js"
  },
  "/assets/styles-Dx1XDBPV.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"28c2c-RWEL8iubUuLL+W5UuDFbLd2DocQ"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 166956,
    "path": "../public/assets/styles-Dx1XDBPV.css"
  },
  "/assets/upload-B-T2E6Un.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-fxJs6S4EWmFWfv4Wl3aw5cl5dmk"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 231,
    "path": "../public/assets/upload-B-T2E6Un.js"
  },
  "/assets/useMutation-DzD7Gfwb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-nrnlRJluP/UQO2b7d5cqzbBgjtY"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 2211,
    "path": "../public/assets/useMutation-DzD7Gfwb.js"
  },
  "/assets/users-DWftjf3I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-oOwSwzcS86FOeRVcmnaFJU+MEMo"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 307,
    "path": "../public/assets/users-DWftjf3I.js"
  },
  "/assets/useSuspenseQuery-Cem_EJbL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-Us619u0cH35rOec3Q/HhLOUDJ98"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-Cem_EJbL.js"
  },
  "/assets/utils-VoK5cWz9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-MSDdJ2+muStk/9G6WlFzXJoskA0"',
    "mtime": "2026-08-27T10:10:52.157Z",
    "size": 59982,
    "path": "../public/assets/utils-VoK5cWz9.js"
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
