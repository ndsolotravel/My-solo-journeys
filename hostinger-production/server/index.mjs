globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import minpath, { dirname, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { d as defineHandler, H as HTTPError, a as toEventHandler, b as toMiddleware, c as callMiddleware, e as defineLazyEventHandler, f as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
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
const entryPath = minpath.resolve(process.cwd(), ".output", "server", "index.mjs");
import(pathToFileURL(entryPath).href);
function _Ksl3kK() {
}
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
  "/assets/account-Cqooxx30.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-2//yHpce00U6KFVaanK2qssjQP4"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 2068,
    "path": "../public/assets/account-Cqooxx30.js"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/assets/about-rLD07iSN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ffe-3+1Ozi2grG0wT2FPp/Q3aBvfXdc"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 4094,
    "path": "../public/assets/about-rLD07iSN.js"
  },
  "/assets/admin.destinations-CX22j0Ie.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144b-7rd8ZC1kUAHcAtJo4e/gXhYy8zw"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 5195,
    "path": "../public/assets/admin.destinations-CX22j0Ie.js"
  },
  "/assets/admin.comments-DDKvGkoq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8cf-iFjdsg229w/cYV3JzN9oXiY7LGA"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 2255,
    "path": "../public/assets/admin.comments-DDKvGkoq.js"
  },
  "/assets/admin-BSnLCAAs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"762-4JjrPZopJMsOgQbs1RhFFLInx7U"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 1890,
    "path": "../public/assets/admin-BSnLCAAs.js"
  },
  "/assets/admin.index-DWJeC1yX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c02-lsV74zWXKXRm6xdb0BYVnlop+pw"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 3074,
    "path": "../public/assets/admin.index-DWJeC1yX.js"
  },
  "/assets/admin.messages-V9RcEQ1t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1300-IK1tuIQNd/S8axRMNxIHAgwOaek"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 4864,
    "path": "../public/assets/admin.messages-V9RcEQ1t.js"
  },
  "/assets/admin.posts._id-DMl0CMnU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-xSUpA8hhDUdq/5SeRfoHc25ymr8"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-DMl0CMnU.js"
  },
  "/assets/admin.posts.new-CDFWtMvu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-cI0CWHnOAejjJQ0qmEVa7B2IiYo"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-CDFWtMvu.js"
  },
  "/assets/admin.posts.index-d9Aml6QK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e30-XUIn8AHBtJFf69soyGnpnSJNhak"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 73264,
    "path": "../public/assets/admin.posts.index-d9Aml6QK.js"
  },
  "/assets/blog-C05whGHN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-endO53acA05dHIVkS4PBmZlzg/Y"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 103,
    "path": "../public/assets/blog-C05whGHN.js"
  },
  "/assets/arrow-left-O9UuWK8X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-ae24VvE15Rx02dlkzHJ0CAnJOmI"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 166,
    "path": "../public/assets/arrow-left-O9UuWK8X.js"
  },
  "/assets/auth-kMkgGD59.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f51-EWAYw3AvyzJm2BaZoVFPKzFQtqQ"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 8017,
    "path": "../public/assets/auth-kMkgGD59.js"
  },
  "/assets/blog._slug-D1EVBRNf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b2-MDpxdDcgZFj2OMoimlunodPlP00"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 690,
    "path": "../public/assets/blog._slug-D1EVBRNf.js"
  },
  "/assets/blog.index-DaqlUVpG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ce8-zWJlRVt7BZO1k5OhQKglhhjK38A"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 3304,
    "path": "../public/assets/blog.index-DaqlUVpG.js"
  },
  "/assets/calendar-CCPagZX3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-PZnQ8r+f+95ygmA5UaO6lCs81fM"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 258,
    "path": "../public/assets/calendar-CCPagZX3.js"
  },
  "/assets/blog._slug-D3yKe7m8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3165-e3Gvr7rDlu6713r6YBqnLtE50vs"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 12645,
    "path": "../public/assets/blog._slug-D3yKe7m8.js"
  },
  "/assets/clock-BTWhYzZd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-H2jhpIkF/5kyuomsSSjiS407+Ho"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 165,
    "path": "../public/assets/clock-BTWhYzZd.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/contact-CvvPJwNL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13f5-nmxBxUCrmmWWOJUoPendi6LpBwQ"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 5109,
    "path": "../public/assets/contact-CvvPJwNL.js"
  },
  "/assets/destinations-DSB0gvbZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-9rdBtlUtCV7+H1VC9ARUyDbUDAU"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 103,
    "path": "../public/assets/destinations-DSB0gvbZ.js"
  },
  "/assets/destinations.index-C4gjb2c-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1751-WGoxEb/ym31Fck55s80X19doAUo"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 5969,
    "path": "../public/assets/destinations.index-C4gjb2c-.js"
  },
  "/assets/destinations._slug-BIZDLKVy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-TbwE2ILqSvETu6NspmNAXHYt4Vw"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 543,
    "path": "../public/assets/destinations._slug-BIZDLKVy.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/DestinationsMap-Cl3qK8ph.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-NInkjb/QhyVr4q4PXO0VuCFdu7A"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-Cl3qK8ph.js"
  },
  "/assets/eye-CATfRVHY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-dbU6M4FfGqGGt98GMAQdIzSvLfI"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 252,
    "path": "../public/assets/eye-CATfRVHY.js"
  },
  "/assets/gallery-CzxAFA4o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"acd-b1++jM/lP+mXNQoERdhd8xg7tcw"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 2765,
    "path": "../public/assets/gallery-CzxAFA4o.js"
  },
  "/assets/index-CMFfdtB4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24895-kVPZ7F0pUF1gU8se8zA6qJmyRzs"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 149653,
    "path": "../public/assets/index-CMFfdtB4.js"
  },
  "/assets/mail-CtD0Rt-a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-GSidR/3rbmRxEy0e8ayWZnd+Hw8"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 214,
    "path": "../public/assets/mail-CtD0Rt-a.js"
  },
  "/assets/index-DvqfHujE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cdc7-Z9jSeYmn090sCsVnjtRt1RUjFC4"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 118215,
    "path": "../public/assets/index-DvqfHujE.js"
  },
  "/assets/map-BXfB5mWE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-kl3rXomqPiMT4i7QkoEz4leB5Yc"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 426,
    "path": "../public/assets/map-BXfB5mWE.js"
  },
  "/assets/message-square-BtfBg-wp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-cOAZ1MjmL12xn9xx0X57bo/Xdjc"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 234,
    "path": "../public/assets/message-square-BtfBg-wp.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/leaflet-src-BJ_HyOga.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-r+NHjMi5kyVzgVWInQGFdsHR26Y"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-BJ_HyOga.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-CgqfXn5J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-Jcj38aG4vutP3d361CFgB0zcEfw"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 154,
    "path": "../public/assets/plus-CgqfXn5J.js"
  },
  "/assets/PostCard-mQxwCgL7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d3-KFIQozSuKPv8TzPy/rvgGFZzPdE"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 2003,
    "path": "../public/assets/PostCard-mQxwCgL7.js"
  },
  "/assets/PostEditor-DYNYFt1Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5186-9utEcmY75wluFxWnZYnefu5gNtI"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 20870,
    "path": "../public/assets/PostEditor-DYNYFt1Q.js"
  },
  "/assets/route-BzrmnfgE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-kXj2oV+caw6QVgOoYS0WgMQ4uJk"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 95,
    "path": "../public/assets/route-BzrmnfgE.js"
  },
  "/assets/proxy-BHsGDXJp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1df54-uIKXYO9Os91Hf5aVPlmIvaUZrvc"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 122708,
    "path": "../public/assets/proxy-BHsGDXJp.js"
  },
  "/assets/star-DW5kowoh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-fYjW6PrHd2sWNJ/wwA04zwvv8mI"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 473,
    "path": "../public/assets/star-DW5kowoh.js"
  },
  "/assets/trash-2-Bc9zX7XY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-2fObQvEGFH7E/2XEG+wySfFHrNE"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 329,
    "path": "../public/assets/trash-2-Bc9zX7XY.js"
  },
  "/assets/useBaseQuery-CMEYye6u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-LFTW0Ow8hNtLdlPmv63Y6WB9CX8"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-CMEYye6u.js"
  },
  "/assets/styles-Ct6pdyeU.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"19ea8-hF1KqlBpWhpiT21ONIjQ8AH6xF0"',
    "mtime": "2026-08-11T20:55:19.394Z",
    "size": 106152,
    "path": "../public/assets/styles-Ct6pdyeU.css"
  },
  "/assets/useLocalized-TNaA2kSi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7eb-EZFQWHTEu9f5/vobFwrQQ/rJ0a0"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 2027,
    "path": "../public/assets/useLocalized-TNaA2kSi.js"
  },
  "/assets/index-B9SLAZSB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aaf09-XWy7H03Q+tUp5+N0HqcG65GL5yU"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 700169,
    "path": "../public/assets/index-B9SLAZSB.js"
  },
  "/assets/useMutation-D7kpSro3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-Qq0HOqT6UOYVxTyKJl/lTS357vo"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 2210,
    "path": "../public/assets/useMutation-D7kpSro3.js"
  },
  "/assets/useQuery-Cqo2_V_t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-XOMk8Q4iVkO/JSS5rw6Myv8q6Vg"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 100,
    "path": "../public/assets/useQuery-Cqo2_V_t.js"
  },
  "/assets/useSuspenseQuery-Ct553qT2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-247G4sNFu+epYA5xUKPbe6EwXCo"',
    "mtime": "2026-08-11T20:55:19.398Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-Ct553qT2.js"
  },
  "/assets/users-1CBYm6sP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-hs2RZYVy6DwVD/U7NEjoh0adCOU"',
    "mtime": "2026-08-11T20:55:19.399Z",
    "size": 307,
    "path": "../public/assets/users-1CBYm6sP.js"
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
const multiHandler = (...handlers) => {
  const final = handlers.pop();
  const middleware = handlers.filter(Boolean).map((h) => toMiddleware(h));
  return (ev) => callMiddleware(ev, middleware, final);
};
const _lazy_LGfWhZ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const $0 = { route: "/**", handler: multiHandler(toEventHandler(_Ksl3kK), _lazy_LGfWhZ) };
  return (m, p) => {
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/");
    s.length;
    return { data: $0, params: { "_": s.slice(1).join("/") } };
  };
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
