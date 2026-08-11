globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import fs, { promises } from "node:fs";
import minpath, { dirname, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { d as defineHandler, H as HTTPError, a as toEventHandler, b as toMiddleware, c as callMiddleware, e as defineLazyEventHandler, f as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
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
try {
  const envPath = minpath.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key2 = match[1].trim();
        const val = match[2].trim().replace(/^["']|["']$/g, "");
        if (!process.env[key2]) {
          process.env[key2] = val;
        }
      }
    });
  }
} catch (e) {
  console.error("Error loading .env file:", e);
}
const possibleEntries = [
  minpath.resolve(process.cwd(), ".output", "server", "index.mjs"),
  minpath.resolve(process.cwd(), "server", "index.mjs"),
  minpath.resolve(process.cwd(), "index.mjs")
];
const target = possibleEntries.find((p) => fs.existsSync(p));
if (target && target !== minpath.resolve(process.cwd(), "server.js")) {
  import(pathToFileURL(target).href);
} else {
  console.error("No valid Nitro server entry point found at:", possibleEntries);
}
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
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/assets/about-DleSRD4b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ffe-7Z+4mVcTOvxWjUHvIv2ryIH2VI4"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 4094,
    "path": "../public/assets/about-DleSRD4b.js"
  },
  "/assets/account-CC-F9UR9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-mG4yEmZx42UNmrBNdHqi1DIlV/U"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 2068,
    "path": "../public/assets/account-CC-F9UR9.js"
  },
  "/assets/admin-CKDBIUrD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"762-6vTP6T59Jk/FKdpg1ifkapAfous"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 1890,
    "path": "../public/assets/admin-CKDBIUrD.js"
  },
  "/assets/admin.comments-v9eFuZGF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8cf-RYTzA9PzXH4VNh0r4aHEv9k6gAA"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 2255,
    "path": "../public/assets/admin.comments-v9eFuZGF.js"
  },
  "/assets/admin.destinations-CfobqKYr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144b-Z2KoHOEPF/NOXaySj9kF5Dlzeac"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 5195,
    "path": "../public/assets/admin.destinations-CfobqKYr.js"
  },
  "/assets/admin.index-pxeqHuJT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c02-vGJWoAkmQyXkPVXVgkkbw6KO6lw"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 3074,
    "path": "../public/assets/admin.index-pxeqHuJT.js"
  },
  "/assets/admin.messages-DHipUPYy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1300-dIXZs9RO7uUbHcyqa+I6pJbDJrQ"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 4864,
    "path": "../public/assets/admin.messages-DHipUPYy.js"
  },
  "/assets/admin.posts.index-CbViyIQb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e30-SKzbYXjngSSVxyfeFFq+y8AcnIc"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 73264,
    "path": "../public/assets/admin.posts.index-CbViyIQb.js"
  },
  "/assets/admin.posts.new-41bx-5yQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-/jPvFt7AmwnMe0GWqanb82GU3Zo"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-41bx-5yQ.js"
  },
  "/assets/admin.posts._id-Sbv5k8iK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-2ixyKV9X4+Xqt4eBpM4iAXB8WdM"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-Sbv5k8iK.js"
  },
  "/assets/arrow-left-DWPn8qNj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-y0kcCOPNhh60Ukw3vnQpHWv7RbM"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 166,
    "path": "../public/assets/arrow-left-DWPn8qNj.js"
  },
  "/assets/auth-DC17KHAs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f51-+9cYZzJYFRfQStZDNYLOkho0kM8"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 8017,
    "path": "../public/assets/auth-DC17KHAs.js"
  },
  "/assets/blog-B1l60wNN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-EMgqHdTdDs5TDG9fvN7P+4mM0xs"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 103,
    "path": "../public/assets/blog-B1l60wNN.js"
  },
  "/assets/blog._slug-DHo0Jn2D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b2-N9ps0ZIIbmSK7FOD/uiw4SOhAoA"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 690,
    "path": "../public/assets/blog._slug-DHo0Jn2D.js"
  },
  "/assets/blog.index-BRebpY-R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ce8-l+bJ7+x//pE1DUoZiUoEI0tMlkE"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 3304,
    "path": "../public/assets/blog.index-BRebpY-R.js"
  },
  "/assets/blog._slug-J74vEAK6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3165-pXjm10Vfr2gM1K3U/AoQTFLk04g"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 12645,
    "path": "../public/assets/blog._slug-J74vEAK6.js"
  },
  "/assets/calendar-DYdnAtCB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-382dwe61LSqS/+GT8WImYT7twPI"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 258,
    "path": "../public/assets/calendar-DYdnAtCB.js"
  },
  "/assets/clock-B9qtejdm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-JPIyTs4tTQ67Mm6M9mFIK9qlZP4"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 165,
    "path": "../public/assets/clock-B9qtejdm.js"
  },
  "/assets/contact-D379_YKj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13f5-v2Qvjhvy/wKOVB66iubTgiL+B7E"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 5109,
    "path": "../public/assets/contact-D379_YKj.js"
  },
  "/assets/destinations-BglEtAxN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-jrwX1zc0nm1VqMXqsF+1zNLQ0sc"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 103,
    "path": "../public/assets/destinations-BglEtAxN.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/DestinationsMap-CdDbzoIz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-eOGljaMBgyd8es78SIq7hUSAko4"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-CdDbzoIz.js"
  },
  "/assets/destinations._slug-DKCLT12I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-MgSggr0+PN2VIcYAkeLYzgiXkhg"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 543,
    "path": "../public/assets/destinations._slug-DKCLT12I.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-11T21:18:07.174Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/destinations.index-Dq5KrWKe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1751-sNGEAVzM5Qb+vYMTl9xJFPAzS3M"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 5969,
    "path": "../public/assets/destinations.index-Dq5KrWKe.js"
  },
  "/assets/eye-DSlSbQv2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-JqiFVRIMC6Ag6xEWtGTHySjWmPg"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 252,
    "path": "../public/assets/eye-DSlSbQv2.js"
  },
  "/assets/gallery-CbAmggSx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"acd-QdrnmK9lqcUwESS9i+4FHxOKkLI"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 2765,
    "path": "../public/assets/gallery-CbAmggSx.js"
  },
  "/assets/index-Bhlv1d8O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24895-6p0tvl4VbgVqF0SevRLRkYASMzc"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 149653,
    "path": "../public/assets/index-Bhlv1d8O.js"
  },
  "/assets/index-B7BrvLey.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cdc7-O6arQgDhVfamu7vaDuU/vMtDVZc"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 118215,
    "path": "../public/assets/index-B7BrvLey.js"
  },
  "/assets/mail-DkL87X44.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-atrLuPs0UCFu1QABSVnPv+RrcRQ"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 214,
    "path": "../public/assets/mail-DkL87X44.js"
  },
  "/assets/map-CmFljGhK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-EErd7WlkbFAdjCE4OtDkjkhAPHs"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 426,
    "path": "../public/assets/map-CmFljGhK.js"
  },
  "/assets/message-square-B9LeXwyf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-TXDCvR4NBkG6GXTF7rmsLJ/1s24"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 234,
    "path": "../public/assets/message-square-B9LeXwyf.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/leaflet-src-FtGykMw3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-w84mk+FIy+kebA+WRlB6YBCVZv8"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-FtGykMw3.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-4aU2djRr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-Zh7gV8hsCnOPQyugw0p6v+P0jjM"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 154,
    "path": "../public/assets/plus-4aU2djRr.js"
  },
  "/assets/PostCard-CTtE-BkR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d3-SCeUWocBK970DVccMJrXS5YyZl8"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 2003,
    "path": "../public/assets/PostCard-CTtE-BkR.js"
  },
  "/assets/PostEditor-D5FGaqQT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5186-w+WcAKo+Us24Co749mqexXAkLbk"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 20870,
    "path": "../public/assets/PostEditor-D5FGaqQT.js"
  },
  "/assets/proxy-BjRmtNgF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1df54-jt3kBzf9Xbi33D9TskPscIGIhZk"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 122708,
    "path": "../public/assets/proxy-BjRmtNgF.js"
  },
  "/assets/route-BUyaSJhJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-tyDPJL54BMdnrdbRy54Gr39ERAA"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 95,
    "path": "../public/assets/route-BUyaSJhJ.js"
  },
  "/assets/star-DNRFUcZ2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-Xi7vuSObQrAVbSe6kK7jNlqDrok"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 473,
    "path": "../public/assets/star-DNRFUcZ2.js"
  },
  "/assets/trash-2-DKO0-5x1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-pk8/VoE597bimVOKCw08tBIMJh0"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 329,
    "path": "../public/assets/trash-2-DKO0-5x1.js"
  },
  "/assets/useBaseQuery-CYDVRoxG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-Ui/OdYzzovbyrLI5LGMNt4lVBLs"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-CYDVRoxG.js"
  },
  "/assets/styles-Ct6pdyeU.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"19ea8-hF1KqlBpWhpiT21ONIjQ8AH6xF0"',
    "mtime": "2026-08-11T21:18:07.174Z",
    "size": 106152,
    "path": "../public/assets/styles-Ct6pdyeU.css"
  },
  "/assets/useLocalized-CiRA00hy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7eb-mJv6egjF3cESyd4a4RuKPGHb0sA"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 2027,
    "path": "../public/assets/useLocalized-CiRA00hy.js"
  },
  "/assets/index-Dq3rkjhS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aad95-EV9bFExCt/FoEwHH7SBJeUZLQCM"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 699797,
    "path": "../public/assets/index-Dq3rkjhS.js"
  },
  "/assets/useMutation-De75pbPJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-kJIXP2tHioKWvOEwrTa5uvxp+04"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 2210,
    "path": "../public/assets/useMutation-De75pbPJ.js"
  },
  "/assets/useQuery-Comt_WgR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-AxzclAl8rsumk0DBL1bFsj3AO8k"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 100,
    "path": "../public/assets/useQuery-Comt_WgR.js"
  },
  "/assets/users-CYXzXL3G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-SotEaTURVxGO4Kx6Ff0JM1rznyI"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 307,
    "path": "../public/assets/users-CYXzXL3G.js"
  },
  "/assets/useSuspenseQuery-CERzfSW5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-+GUNhkN9N0sdo0+hXYvX0bwHiT8"',
    "mtime": "2026-08-11T21:18:07.190Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-CERzfSW5.js"
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
