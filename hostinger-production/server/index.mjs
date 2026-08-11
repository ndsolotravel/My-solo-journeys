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
  "/assets/about-GE377Rru.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ffe-ISl0W7kmzNee2gO17oFuSyqAJWk"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 4094,
    "path": "../public/assets/about-GE377Rru.js"
  },
  "/assets/account-C94IkZmo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-kDewNEd78wF+LNk4AIUx55hD3Qw"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 2068,
    "path": "../public/assets/account-C94IkZmo.js"
  },
  "/assets/admin-jNO6qvAV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"762-pjP2+ohwMI5gDAYgX6JxZRsBP6c"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 1890,
    "path": "../public/assets/admin-jNO6qvAV.js"
  },
  "/assets/admin.comments-DJI-ielq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8cf-2fIYRWRSVinRKHoRYMz6PLI55Yk"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 2255,
    "path": "../public/assets/admin.comments-DJI-ielq.js"
  },
  "/assets/admin.destinations-BpU9GILA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144b-hU1Yy3RvgEjHH4REQZm+q+2/ZUM"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 5195,
    "path": "../public/assets/admin.destinations-BpU9GILA.js"
  },
  "/assets/admin.index-DnpEtvxX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c02-qYqT9+pdCrM56Ip/o38eu5KerCo"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 3074,
    "path": "../public/assets/admin.index-DnpEtvxX.js"
  },
  "/assets/admin.messages-BP8OPpSK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1300-eYlp8U6Ab2exWi7MBO6d++1GS1g"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 4864,
    "path": "../public/assets/admin.messages-BP8OPpSK.js"
  },
  "/assets/admin.posts.new-1QUbBmJP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-z7X291jcHYTlgLd+dOVlEmGbuNo"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-1QUbBmJP.js"
  },
  "/assets/admin.posts._id-FjEHmutx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-RgbRsqTAHYzsVuE76jCKtMNag6c"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-FjEHmutx.js"
  },
  "/assets/arrow-left-BMtPB1HO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-g1rfT+ZI1E040AP+f6MPgHzFRXE"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 166,
    "path": "../public/assets/arrow-left-BMtPB1HO.js"
  },
  "/assets/auth-DG_P6BQd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f51-lrpQuHtQEp+t2YFTJri1Qt+7PxI"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 8017,
    "path": "../public/assets/auth-DG_P6BQd.js"
  },
  "/assets/blog-BLXKmTir.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-d0jNUcrKUeVTh/ZsWCwQVEsoZnY"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 103,
    "path": "../public/assets/blog-BLXKmTir.js"
  },
  "/assets/blog.index-OFVp2n8A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ce8-bMOmAHrLlQrdtEX46bcOefc6yxc"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 3304,
    "path": "../public/assets/blog.index-OFVp2n8A.js"
  },
  "/assets/admin.posts.index-DVKJXjJb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e30-jsFhZmJ9aZUu23qRq+D60Xvi41U"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 73264,
    "path": "../public/assets/admin.posts.index-DVKJXjJb.js"
  },
  "/assets/blog._slug-C8ojdYzz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3165-Lkslp4KCpQRWYxCRNdAdEyO+XfA"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 12645,
    "path": "../public/assets/blog._slug-C8ojdYzz.js"
  },
  "/assets/blog._slug-CN2dr5iJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b2-LW1TZyXjTmrDlJhl9Wh3rpKpEl8"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 690,
    "path": "../public/assets/blog._slug-CN2dr5iJ.js"
  },
  "/assets/calendar-BSkCz00v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-iBK/tkTHFDeTLobLVd6nq7IE3hM"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 258,
    "path": "../public/assets/calendar-BSkCz00v.js"
  },
  "/assets/clock-BAuEDxZD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-apVBJYA3XDghFwO5e81AEvyoefY"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 165,
    "path": "../public/assets/clock-BAuEDxZD.js"
  },
  "/assets/contact-Dbxo1Xtd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13f5-KFXsbgkMdt4qEnNXCPpJH3TlXC8"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 5109,
    "path": "../public/assets/contact-Dbxo1Xtd.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-BHseumd1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-KhZZkddcDOCBtGIpaKQjmLwohxU"',
    "mtime": "2026-08-11T22:09:39.830Z",
    "size": 103,
    "path": "../public/assets/destinations-BHseumd1.js"
  },
  "/assets/destinations.index-UwvRpXiX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1751-ahh0IkfTnx3klffX+Hd9uK8xH/8"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 5969,
    "path": "../public/assets/destinations.index-UwvRpXiX.js"
  },
  "/assets/destinations._slug-uCQ1WPOq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-ZE3CdPjpCFqhPlTqe/kStpAunWY"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 543,
    "path": "../public/assets/destinations._slug-uCQ1WPOq.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-11T22:09:39.830Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/DestinationsMap-DGFtxPXe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-yBGD0IuwJB4Hp+iaLrBPqBX/eIA"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-DGFtxPXe.js"
  },
  "/assets/eye-B5jFMhnD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-QuGjeh1GzW0Q08Imbod+rZb0hL4"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 252,
    "path": "../public/assets/eye-B5jFMhnD.js"
  },
  "/assets/gallery-C-8JC3-j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"acd-wn5cQQrC6pH2Euqg1sbA/98ynCA"',
    "mtime": "2026-08-11T22:09:39.830Z",
    "size": 2765,
    "path": "../public/assets/gallery-C-8JC3-j.js"
  },
  "/assets/index-NoH_tMow.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cdc7-LNCTaaRX6dlih10xOG56/A2oNMI"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 118215,
    "path": "../public/assets/index-NoH_tMow.js"
  },
  "/assets/mail-FV3gi4JR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-92SeXo1CyImwTIMHQSPJqgJy2Qc"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 214,
    "path": "../public/assets/mail-FV3gi4JR.js"
  },
  "/assets/map-CdINsOnG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-UB15yS5WjYGBp7taeqIO8j1/PN8"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 426,
    "path": "../public/assets/map-CdINsOnG.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T22:09:39.830Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-CfFWP0Gc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-jdJzlSqVU7VM+Nh16jE8I3a8vtw"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 234,
    "path": "../public/assets/message-square-CfFWP0Gc.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-11T22:09:39.830Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/index-DUgDY2wj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24895-cn5laQAGU7pU3ArFipLobdpzbao"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 149653,
    "path": "../public/assets/index-DUgDY2wj.js"
  },
  "/assets/plus-C4NxL5jC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-7KIGd0aNkAUV25Un4lYR9R0DXSw"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 154,
    "path": "../public/assets/plus-C4NxL5jC.js"
  },
  "/assets/PostCard-CCkI0wT1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d3-ScOv95VN8DsuWtpZqpOYSWQUsCk"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 2003,
    "path": "../public/assets/PostCard-CCkI0wT1.js"
  },
  "/assets/leaflet-src-I8c48VRr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-Z7fxV7w7dfk8Mfoj8leuJNDILJw"',
    "mtime": "2026-08-11T22:09:39.833Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-I8c48VRr.js"
  },
  "/assets/PostEditor-GNolMz8n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5186-oNTGF9qpJ03qSpATmJMip6Rg1Hg"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 20870,
    "path": "../public/assets/PostEditor-GNolMz8n.js"
  },
  "/assets/route-BUFe_k1a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-Fq5jgtWbBuv+Nhw3aXQYhImQIeo"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 95,
    "path": "../public/assets/route-BUFe_k1a.js"
  },
  "/assets/star-B4-d_Kr4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-mnX5XX7cIrG4Ym17y/9uG/mbCdI"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 473,
    "path": "../public/assets/star-B4-d_Kr4.js"
  },
  "/assets/trash-2-B845-x6V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-wLxgjA+6TigxgaGlvTdxREJuTP8"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 329,
    "path": "../public/assets/trash-2-B845-x6V.js"
  },
  "/assets/proxy-CTv77MK3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1df54-caWgALHmpy+9qkRL5GF0g6UK5Ko"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 122708,
    "path": "../public/assets/proxy-CTv77MK3.js"
  },
  "/assets/useBaseQuery-BRTl-p8N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-iwteN6nC6PtWCTJPuyiB+fLPg3k"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-BRTl-p8N.js"
  },
  "/assets/useLocalized-DAedO2wG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7eb-btPnN8OW/nPhw31EjxOfXo8lN5w"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 2027,
    "path": "../public/assets/useLocalized-DAedO2wG.js"
  },
  "/assets/styles-Ct6pdyeU.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"19ea8-hF1KqlBpWhpiT21ONIjQ8AH6xF0"',
    "mtime": "2026-08-11T22:09:39.822Z",
    "size": 106152,
    "path": "../public/assets/styles-Ct6pdyeU.css"
  },
  "/assets/index-BCO5FRTO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aaead-UdKy30zNizJasJXNM/WKhXuWzcQ"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 700077,
    "path": "../public/assets/index-BCO5FRTO.js"
  },
  "/assets/useMutation-H4KhZuI-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-e0nh6VsyC+auaRqoYIhneFp7vtQ"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 2210,
    "path": "../public/assets/useMutation-H4KhZuI-.js"
  },
  "/assets/useQuery-DMhV0GwF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-SDiwFpL8is7lAS/r9+wlZkNTxko"',
    "mtime": "2026-08-11T22:09:39.832Z",
    "size": 100,
    "path": "../public/assets/useQuery-DMhV0GwF.js"
  },
  "/assets/users-BqsMsdBp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-xDvqrsD2zxG9iL9gy8ZDvxRW5ok"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 307,
    "path": "../public/assets/users-BqsMsdBp.js"
  },
  "/assets/useSuspenseQuery-kTwMpynI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-FgRDqa9ZAGYqe2rGM7X+jrUUvjk"',
    "mtime": "2026-08-11T22:09:39.831Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-kTwMpynI.js"
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
