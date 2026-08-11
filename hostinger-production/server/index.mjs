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
  "/assets/about-CQX9JLi_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ffe-hLSTZQeNe7a//GMr+urGjhZIvEg"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 4094,
    "path": "../public/assets/about-CQX9JLi_.js"
  },
  "/assets/account-COu4ZgsU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-1ptgjccEY9droedskXb+sJF6nXw"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 2068,
    "path": "../public/assets/account-COu4ZgsU.js"
  },
  "/assets/admin-BeLcaIRH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"762-JQEsrlp9hHnd7HVYhLHY7NO3Cjk"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 1890,
    "path": "../public/assets/admin-BeLcaIRH.js"
  },
  "/assets/admin.comments-BJdGFVxg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8cf-dCfZTaVXl6ovWxv5EMCr2/9j1dA"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 2255,
    "path": "../public/assets/admin.comments-BJdGFVxg.js"
  },
  "/assets/admin.destinations-D2paROTp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144b-JQL+y0LniszrMCV3naltOsD0WBQ"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 5195,
    "path": "../public/assets/admin.destinations-D2paROTp.js"
  },
  "/assets/admin.index-CCuUDokE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c02-f2liQ1OSUDeq6AdoFv8QE+mFxrY"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 3074,
    "path": "../public/assets/admin.index-CCuUDokE.js"
  },
  "/assets/admin.messages-CD52RYKy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1300-qEk2SAQhl0+jTfXKY9gC19JY1ZA"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 4864,
    "path": "../public/assets/admin.messages-CD52RYKy.js"
  },
  "/assets/admin.posts.index-BXM3VJDl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e30-+0OXKvghQpt6ABSs9tf+2qWCg4g"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 73264,
    "path": "../public/assets/admin.posts.index-BXM3VJDl.js"
  },
  "/assets/admin.posts.new-BKooaQkj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-srQTwZF+yF/Up0VOgQIcN8qwqzE"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-BKooaQkj.js"
  },
  "/assets/admin.posts._id-B0k77QtJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-T850EuX4fsYO9403XuuqF29ouXI"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-B0k77QtJ.js"
  },
  "/assets/arrow-left-Dm4N8PlE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-9EVrA4Bhj9yblr55FUHG//z9YAo"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 166,
    "path": "../public/assets/arrow-left-Dm4N8PlE.js"
  },
  "/assets/auth-D6iVQpdB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f51-U1QGSQQPVoIoZcAgpyqK4y+Hw7w"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 8017,
    "path": "../public/assets/auth-D6iVQpdB.js"
  },
  "/assets/blog-SfWjFAh9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-mVPJIVrR1AbDpk132+9uVRXR+Y0"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 103,
    "path": "../public/assets/blog-SfWjFAh9.js"
  },
  "/assets/blog.index-CGA_GUOb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ce8-/Ir4nN2EoVdvrC7m4sRvZ+T5n4g"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 3304,
    "path": "../public/assets/blog.index-CGA_GUOb.js"
  },
  "/assets/blog._slug-BAQw9V1z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b2-8Ckbw2i59M3l9T1MyLEy17HJ3Gw"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 690,
    "path": "../public/assets/blog._slug-BAQw9V1z.js"
  },
  "/assets/blog._slug-DwcdN4ex.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3165-VdzTibTICWzyTrhOqpZi7QuqiY0"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 12645,
    "path": "../public/assets/blog._slug-DwcdN4ex.js"
  },
  "/assets/calendar-D8P3GlJi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-0bLX8XHovuNfHWYV8HIeZCGp6cw"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 258,
    "path": "../public/assets/calendar-D8P3GlJi.js"
  },
  "/assets/clock-BhhNDYAQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-8co8f2FPWGPkkpl3NDWRUIzJKKw"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 165,
    "path": "../public/assets/clock-BhhNDYAQ.js"
  },
  "/assets/contact-kAkLJVjR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18af-fq5UCOa8psobjafXjosrAGgBpDA"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 6319,
    "path": "../public/assets/contact-kAkLJVjR.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-Bdk8sG36.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-Rrar4OXDfQo2U70uU7DSJv828L0"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 103,
    "path": "../public/assets/destinations-Bdk8sG36.js"
  },
  "/assets/destinations._slug-fJoCeOm8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-GNjTF/vzyoW08g586/WOxVf+I7Y"',
    "mtime": "2026-08-11T22:21:51.097Z",
    "size": 543,
    "path": "../public/assets/destinations._slug-fJoCeOm8.js"
  },
  "/assets/destinations.index-fyZbdg1f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1751-24jIHl7kYTBXEHFG7m938ALMdVA"',
    "mtime": "2026-08-11T22:21:51.097Z",
    "size": 5969,
    "path": "../public/assets/destinations.index-fyZbdg1f.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/DestinationsMap-tIdOaxXO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-240ovPsoOA2nwPr/1vfJmw75eIM"',
    "mtime": "2026-08-11T22:21:51.099Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-tIdOaxXO.js"
  },
  "/assets/eye-x7XfMGUw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-DAuLS5mptGoEqynBRFWF9lGbyp4"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 252,
    "path": "../public/assets/eye-x7XfMGUw.js"
  },
  "/assets/gallery-B1JDcHmw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"acd-O7ik/fnM6taLTQdkq+jowVMPDuQ"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 2765,
    "path": "../public/assets/gallery-B1JDcHmw.js"
  },
  "/assets/index-CBtvXf4A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cdc7-dAAsrBoyqn+lnTQikqqE5Xq1qEs"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 118215,
    "path": "../public/assets/index-CBtvXf4A.js"
  },
  "/assets/leaflet-src-DBLlstAX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-hX2Yq2oTFNCU+QGRxRfYRBoFmbc"',
    "mtime": "2026-08-11T22:21:51.099Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-DBLlstAX.js"
  },
  "/assets/index-CC1dCmmD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24895-7CwGezng+trYk6vogzNgGcx1AWs"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 149653,
    "path": "../public/assets/index-CC1dCmmD.js"
  },
  "/assets/mail-BAckJVF3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-3RN87RYr232WCYhy7AVBcLlBt3Y"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 214,
    "path": "../public/assets/mail-BAckJVF3.js"
  },
  "/assets/map-Dktirr4Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-7AM24fPW0iGH8fxiRFEh6STBr2o"',
    "mtime": "2026-08-11T22:21:51.097Z",
    "size": 426,
    "path": "../public/assets/map-Dktirr4Q.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-DqWK9lrc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-4Bn7ZVhAkyvCRR42wBwtTfwtG24"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 234,
    "path": "../public/assets/message-square-DqWK9lrc.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-11T22:21:51.086Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-D3txOMLa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-JhaxlEkkExKnTxrcny4+L6F/VVc"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 154,
    "path": "../public/assets/plus-D3txOMLa.js"
  },
  "/assets/PostCard-CYP7WDsW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d3-ZYYvmLxJ75D00pGZfd327OMa5Nk"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 2003,
    "path": "../public/assets/PostCard-CYP7WDsW.js"
  },
  "/assets/PostEditor-Bu_b2Dav.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5186-pTSm1qEJ68UnKDyll6+60FOLSds"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 20870,
    "path": "../public/assets/PostEditor-Bu_b2Dav.js"
  },
  "/assets/route-DxaLkY9q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-F9h8/sMmdH2cjcujtIdJ/0kmXD8"',
    "mtime": "2026-08-11T22:21:51.097Z",
    "size": 95,
    "path": "../public/assets/route-DxaLkY9q.js"
  },
  "/assets/proxy-hkVeS99Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1df54-UsHK72XVnRC8hNE4w+AouF6GFMc"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 122708,
    "path": "../public/assets/proxy-hkVeS99Z.js"
  },
  "/assets/star-DqvVOTlv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-MGKR6Y1VZn9qHcu7ofY2997wOHo"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 473,
    "path": "../public/assets/star-DqvVOTlv.js"
  },
  "/assets/trash-2-C-ZEodyU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-mlfPudRTUu2CQg1RXECIkGbmO1k"',
    "mtime": "2026-08-11T22:21:51.099Z",
    "size": 329,
    "path": "../public/assets/trash-2-C-ZEodyU.js"
  },
  "/assets/styles-Ct6pdyeU.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"19ea8-hF1KqlBpWhpiT21ONIjQ8AH6xF0"',
    "mtime": "2026-08-11T22:21:51.095Z",
    "size": 106152,
    "path": "../public/assets/styles-Ct6pdyeU.css"
  },
  "/assets/useBaseQuery-8zHh4p1I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-IvI986qdRe94WcdrRXR0eL4PU4I"',
    "mtime": "2026-08-11T22:21:51.099Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-8zHh4p1I.js"
  },
  "/assets/useLocalized-CpRpV368.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7eb-gTQtlYS+fWPQaLmcZQUm/HbmPus"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 2027,
    "path": "../public/assets/useLocalized-CpRpV368.js"
  },
  "/assets/index-0S9fuRhq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aaead-QI5iRYeAFfYuEHSgOR+WyFDv7X0"',
    "mtime": "2026-08-11T22:21:51.099Z",
    "size": 700077,
    "path": "../public/assets/index-0S9fuRhq.js"
  },
  "/assets/useQuery-DNTjQWYS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-u120yhjkX4cDI4NCVVqhxBGtouE"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 100,
    "path": "../public/assets/useQuery-DNTjQWYS.js"
  },
  "/assets/useMutation-CnsiiyEl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-GD+V4nnLywuL9Gphib0GTzLx8WI"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 2210,
    "path": "../public/assets/useMutation-CnsiiyEl.js"
  },
  "/assets/users-B8hM23ls.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-gPl53XBMu+u4BaZJ9D1AmnaUlz0"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 307,
    "path": "../public/assets/users-B8hM23ls.js"
  },
  "/assets/useSuspenseQuery-Dycr4xwL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-rVmgew2IFkeY5aZm4wRQIn4yS8Y"',
    "mtime": "2026-08-11T22:21:51.098Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-Dycr4xwL.js"
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
