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
  "/favicon.png": {
    "type": "image/png",
    "etag": '"491-mnU3CPL5fB13KzfG4nVJvCRwZ+0"',
    "mtime": "2026-07-10T12:03:22.000Z",
    "size": 1169,
    "path": "../public/favicon.png"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"13a-WkFg/AmDpXwIZNb50wwBw/FeOJo"',
    "mtime": "2026-08-09T22:33:08.491Z",
    "size": 314,
    "path": "../public/manifest.webmanifest"
  },
  "/assets/about-CuzKKL0a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ffe-I5uzpUmUPnactX7Ip3TxXm2lqKU"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 4094,
    "path": "../public/assets/about-CuzKKL0a.js"
  },
  "/assets/account-BbNTKUC1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-dqCPWnpJySVs3S3rU0uxTOdhpWg"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 2068,
    "path": "../public/assets/account-BbNTKUC1.js"
  },
  "/assets/admin-DPKGbg2T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"762-SHQCe8fGMkdv40xjBSoMrzFLTPI"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 1890,
    "path": "../public/assets/admin-DPKGbg2T.js"
  },
  "/assets/admin.comments-CFXTa9fl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8cf-+v2LywWg558HGArfS71l07K4ms8"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 2255,
    "path": "../public/assets/admin.comments-CFXTa9fl.js"
  },
  "/assets/admin.destinations-M3kVBmgl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144b-B82DRDWVnpmm5xiTYlxwBDy77+k"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 5195,
    "path": "../public/assets/admin.destinations-M3kVBmgl.js"
  },
  "/assets/admin.index-C1np_WZ6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c02-x+DBYuU10nVKj9QFpkTHmS6CpbQ"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 3074,
    "path": "../public/assets/admin.index-C1np_WZ6.js"
  },
  "/assets/admin.messages-CSvDL0hO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1300-CYNMaiDeSue71HEFLIuCFfvNurk"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 4864,
    "path": "../public/assets/admin.messages-CSvDL0hO.js"
  },
  "/assets/admin.posts.new-j1zU6i77.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-+UAaWK7agA0AcWoPaITao1yq6wg"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-j1zU6i77.js"
  },
  "/assets/admin.posts._id-DvzkopGS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-DFcEclfpAeyZ6Ek2v9TPUiILFTo"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-DvzkopGS.js"
  },
  "/assets/arrow-left-CSNdinZX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-ALAg46WYm1+W4gteSc2qb9TJAAw"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 166,
    "path": "../public/assets/arrow-left-CSNdinZX.js"
  },
  "/assets/admin.posts.index-BFl10ETA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e30-9BUXgixu49fZ7Dp2pvJgQzmsGT8"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 73264,
    "path": "../public/assets/admin.posts.index-BFl10ETA.js"
  },
  "/assets/auth-D3ETThpC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f51-MwaMS7ts0m0nlkAzXVf4Fj23E1E"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 8017,
    "path": "../public/assets/auth-D3ETThpC.js"
  },
  "/assets/blog-ChKcwE_4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-Mkbct20O7OS5gL2GtH94SryAlZ8"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 103,
    "path": "../public/assets/blog-ChKcwE_4.js"
  },
  "/assets/blog.index-C-zAPUby.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ce8-c4jGsISOIqMkeptrv88/BjPaIzM"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 3304,
    "path": "../public/assets/blog.index-C-zAPUby.js"
  },
  "/assets/blog._slug-D7SF82TJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3165-rBGApTEB7X+WHQ5mOj5bWgWpXNo"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 12645,
    "path": "../public/assets/blog._slug-D7SF82TJ.js"
  },
  "/assets/blog._slug-DJKMSJPC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b2-34EgB30hnI1xFftBW3DWzi4nTac"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 690,
    "path": "../public/assets/blog._slug-DJKMSJPC.js"
  },
  "/assets/calendar-CgpAGsjN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-fWKlSfVchCZY5A3sTtd/7TA7AQQ"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 258,
    "path": "../public/assets/calendar-CgpAGsjN.js"
  },
  "/assets/clock-C8G4tVSe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-oqpe1EISk4/fczSvUvg6OOW6McI"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 165,
    "path": "../public/assets/clock-C8G4tVSe.js"
  },
  "/assets/contact-vCLQnSZ1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18bb-wckcFSmM4+4r4ghl0QwG+afpig4"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 6331,
    "path": "../public/assets/contact-vCLQnSZ1.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T22:36:28.737Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-DlDEQ5-q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-MKR4oXxCHm/8pZp+3TDBRrpCI4c"',
    "mtime": "2026-08-11T22:36:28.737Z",
    "size": 103,
    "path": "../public/assets/destinations-DlDEQ5-q.js"
  },
  "/assets/destinations._slug-B1kX4595.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-EsDZgIVKcGy5hbIrogeSBgiXWPE"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 543,
    "path": "../public/assets/destinations._slug-B1kX4595.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-11T22:36:28.737Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/destinations.index-4Myjs6aN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1751-4K7MRbEtdul5+5ARk+b3KISubNE"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 5969,
    "path": "../public/assets/destinations.index-4Myjs6aN.js"
  },
  "/assets/DestinationsMap-tqWoQO1s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-iKGm6gTbVECoFX24T3hZWkLHccc"',
    "mtime": "2026-08-11T22:36:28.740Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-tqWoQO1s.js"
  },
  "/assets/eye-N2OUbG_w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-LoNyigSV/T4ALd33sx3v/uhYOko"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 252,
    "path": "../public/assets/eye-N2OUbG_w.js"
  },
  "/assets/gallery-BlX9v_Bi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"acd-hRnypCEj7PIJgr2x14qYBpSpXTw"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 2765,
    "path": "../public/assets/gallery-BlX9v_Bi.js"
  },
  "/assets/index-BcDaJ-Vi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cdc7-XfH9/uB1wuRJwAmsUFLKabzDPgY"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 118215,
    "path": "../public/assets/index-BcDaJ-Vi.js"
  },
  "/assets/index-DIUqUt1Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24895-IwzeiwwaZXx8uoOfXw0LzDNWJ7o"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 149653,
    "path": "../public/assets/index-DIUqUt1Q.js"
  },
  "/assets/mail-Du6uNxcS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-Z8FB8sFUmFTDwCsdKeR0qqf1vz8"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 214,
    "path": "../public/assets/mail-Du6uNxcS.js"
  },
  "/assets/leaflet-src-DcVVPuDo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-35GLCm3/6EkI7Y6MwTAvrslyzEw"',
    "mtime": "2026-08-11T22:36:28.740Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-DcVVPuDo.js"
  },
  "/assets/map-BIntl8uj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-E9RZDuOUSaVf+gQT81IF6DbZe58"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 426,
    "path": "../public/assets/map-BIntl8uj.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T22:36:28.737Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-1xUYsyg1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-DEIuj8YhoKbT6JqJa5dm5qcwfHs"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 234,
    "path": "../public/assets/message-square-1xUYsyg1.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-11T22:36:28.731Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-XiKvrbeC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-0U638DOkQ0VICtfcjib98BYU/aU"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 154,
    "path": "../public/assets/plus-XiKvrbeC.js"
  },
  "/assets/PostCard-BJ9WyCPA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d3-J02802nBu7dHirXKk8oYcD0kGa4"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 2003,
    "path": "../public/assets/PostCard-BJ9WyCPA.js"
  },
  "/assets/PostEditor-CwEaMG1c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5186-mZdKZZBpASlrykj5i7D15+2C5hM"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 20870,
    "path": "../public/assets/PostEditor-CwEaMG1c.js"
  },
  "/assets/route-DyOzYRLm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-jNd7OjPC7+YNj/TifbAS3P7FhWc"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 95,
    "path": "../public/assets/route-DyOzYRLm.js"
  },
  "/assets/star-D3Tt7sY0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-J+udzIoSeqYhF9Szyr+D0GX6TWc"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 473,
    "path": "../public/assets/star-D3Tt7sY0.js"
  },
  "/assets/proxy-vU5EgXBg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1df54-gamH4ENsdYKWQd0bQrkKcjfnlD0"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 122708,
    "path": "../public/assets/proxy-vU5EgXBg.js"
  },
  "/assets/styles-Ct6pdyeU.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"19ea8-hF1KqlBpWhpiT21ONIjQ8AH6xF0"',
    "mtime": "2026-08-11T22:36:28.737Z",
    "size": 106152,
    "path": "../public/assets/styles-Ct6pdyeU.css"
  },
  "/assets/trash-2-tG894pRN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-hvw3EuTZ4lWNw7eOPOCGfAqkYJ8"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 329,
    "path": "../public/assets/trash-2-tG894pRN.js"
  },
  "/assets/useBaseQuery-CUlQkyfG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-3P4X49fFtMOo1sjWvkYN/7e47+Y"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-CUlQkyfG.js"
  },
  "/assets/useLocalized-B5NL19U9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7eb-nE2thhkAeZiWK/H356pd79GJYEI"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 2027,
    "path": "../public/assets/useLocalized-B5NL19U9.js"
  },
  "/assets/index-DnlIn68K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aaead-p4+9ki3exYsHEGCZFq2fAdt/abQ"',
    "mtime": "2026-08-11T22:36:28.740Z",
    "size": 700077,
    "path": "../public/assets/index-DnlIn68K.js"
  },
  "/assets/useMutation-CnAhPs10.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-v35MqtIgbd08Ol2PgEwBAfjzdWo"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 2210,
    "path": "../public/assets/useMutation-CnAhPs10.js"
  },
  "/assets/useQuery-BiivHUme.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-ChtRj5t7cy/mntbY2wGq0NwhD5Y"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 100,
    "path": "../public/assets/useQuery-BiivHUme.js"
  },
  "/assets/users-CS_sYxTV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-AxE2SwdOwuqu0zd1hbGrCbNXRgU"',
    "mtime": "2026-08-11T22:36:28.739Z",
    "size": 307,
    "path": "../public/assets/users-CS_sYxTV.js"
  },
  "/assets/useSuspenseQuery-Dj0ArY72.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-jVB+WSP53jiTED/1ik0UZeQ1t3M"',
    "mtime": "2026-08-11T22:36:28.738Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-Dj0ArY72.js"
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
