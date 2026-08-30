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
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/assets/about.functions-BSEviBsH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31f9-hteidc4lxR04plPQ6/mj3IFfTVA"',
    "mtime": "2026-08-30T20:14:40.266Z",
    "size": 12793,
    "path": "../public/assets/about.functions-BSEviBsH.js"
  },
  "/assets/account-C79nEjFU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"80f-RGTEole5d6YZsIXU1kBtgwI4Uuo"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 2063,
    "path": "../public/assets/account-C79nEjFU.js"
  },
  "/assets/admin-e-Q_ll6X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9ff-m9uqYvj92KPXIno2T5F97CrbMwQ"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 2559,
    "path": "../public/assets/admin-e-Q_ll6X.js"
  },
  "/assets/admin.about-CUAa59UM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1139e-gX6SIOHclH1K5oMB76drT8GX41k"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 70558,
    "path": "../public/assets/admin.about-CUAa59UM.js"
  },
  "/assets/admin.analytics-BuSEZbxN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"642c4-gZCOkWDSvzSy01+HevUDGVWAgLk"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 410308,
    "path": "../public/assets/admin.analytics-BuSEZbxN.js"
  },
  "/assets/admin.categories-17QEsFyH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5de0-Qz5ikT947ob4Z7zqtZYDhEUjYtM"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 24032,
    "path": "../public/assets/admin.categories-17QEsFyH.js"
  },
  "/assets/admin.comments-DB6LXCb-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"94b-LDsjW1R95N8HMLzQSQqD8g2Bbjk"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 2379,
    "path": "../public/assets/admin.comments-DB6LXCb-.js"
  },
  "/assets/admin.contact-DygQ0Gtv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cb-v9VFVey42zZGu1Q+3SiLLMUviAo"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 1739,
    "path": "../public/assets/admin.contact-DygQ0Gtv.js"
  },
  "/assets/admin.destinations-OPalQXT_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f38-+hQd6OHSFNAr+iBigJLjZcFABNI"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 20280,
    "path": "../public/assets/admin.destinations-OPalQXT_.js"
  },
  "/assets/admin.gallery-8gju224V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5d23-XoXeVjlLpofvlrGMG+S85VNCdvk"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 23843,
    "path": "../public/assets/admin.gallery-8gju224V.js"
  },
  "/assets/admin.homepage-D2len9gX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d924-b92UQ5NSoQLvwjYdWzloO1ktqPc"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 55588,
    "path": "../public/assets/admin.homepage-D2len9gX.js"
  },
  "/assets/admin.index-BOTwdjFf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-7ePpT/vTIr8cUcmA8Lvi32HUoMo"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 4074,
    "path": "../public/assets/admin.index-BOTwdjFf.js"
  },
  "/assets/admin.legal-CcBjfMpk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39e8-6Okq0T1GPWvRfGhxG24DOUp3NN8"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 14824,
    "path": "../public/assets/admin.legal-CcBjfMpk.js"
  },
  "/assets/admin.messages-Dme6oiut.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137a-jszdUM19U+T1vzeEva4FwCruT8U"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 4986,
    "path": "../public/assets/admin.messages-Dme6oiut.js"
  },
  "/assets/admin.news-CC_1wrbP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f0c-db5KXyYYAuvgWIs9ZydJhcsehNU"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 36620,
    "path": "../public/assets/admin.news-CC_1wrbP.js"
  },
  "/assets/about-Co2A9a0D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91226-Ge7G4/waJ1SW22MMh1Zd8g/2V9A"',
    "mtime": "2026-08-30T20:14:40.289Z",
    "size": 594470,
    "path": "../public/assets/about-Co2A9a0D.js"
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
  "/assets/admin.posts.index-DPPyq_rj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ec2-CiIbh+TL1AUwYpNVIW3Y1UgtciM"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 11970,
    "path": "../public/assets/admin.posts.index-DPPyq_rj.js"
  },
  "/assets/admin.posts.new-BhzfLoiV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38d-DIZiNgcDtfR0fTCl1C6Z9jUNAbk"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 909,
    "path": "../public/assets/admin.posts.new-BhzfLoiV.js"
  },
  "/assets/admin.posts._id-a_Eq2ofU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4b7-V0syAm8t+Vk2hDkkIpmdecYznz0"',
    "mtime": "2026-08-30T20:14:40.282Z",
    "size": 1207,
    "path": "../public/assets/admin.posts._id-a_Eq2ofU.js"
  },
  "/assets/admin.public-message-CdisnMJX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"52fc-30KOFX1b/G3KYr9kjd0SGaRfcMQ"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 21244,
    "path": "../public/assets/admin.public-message-CdisnMJX.js"
  },
  "/assets/admin.settings-CA3eKkwv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"434d-4HY/2Hirwed0+dbt6+ihn2JDw0I"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 17229,
    "path": "../public/assets/admin.settings-CA3eKkwv.js"
  },
  "/assets/AdSlot-DgxddEbr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-YZw4+VxROyt24R4P/mxij74b9qg"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-DgxddEbr.js"
  },
  "/assets/alert-dialog-MzIdzLBa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-hW8FMBupZk/HvAy4y+sTw4lYyJk"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-MzIdzLBa.js"
  },
  "/assets/admin.subscribers-JdsQJs8a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c31-+IzsZLI3AbH5nFSpZwJxFKQSUI8"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 11313,
    "path": "../public/assets/admin.subscribers-JdsQJs8a.js"
  },
  "/assets/arrow-left-DMhW-oAr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-fcvDzUG+nO0SjiYpe6FuGkL9L2s"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 166,
    "path": "../public/assets/arrow-left-DMhW-oAr.js"
  },
  "/assets/arrow-up-right-bev7z5WI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-OeIROGCe1Eiiukkty5Xf4VcAFsQ"',
    "mtime": "2026-08-30T20:14:40.271Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-bev7z5WI.js"
  },
  "/assets/auth-ZgVdiurP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-st0fUeeRKWy+vUsQjLSQaqV7/ww"',
    "mtime": "2026-08-30T20:14:40.256Z",
    "size": 7644,
    "path": "../public/assets/auth-ZgVdiurP.js"
  },
  "/assets/blog.index-CmE3_TDd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27ee-NBfrRXdhA7tpeI2auErHv9NYS7M"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 10222,
    "path": "../public/assets/blog.index-CmE3_TDd.js"
  },
  "/assets/blog-sz1H7TpU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-pnlXtiGfyzUX0RuTANhIw1dBOkc"',
    "mtime": "2026-08-30T20:14:40.255Z",
    "size": 103,
    "path": "../public/assets/blog-sz1H7TpU.js"
  },
  "/assets/blog._slug-DP6jkl8I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-P007FjwdeIfaUtLjpY4KF+X81vw"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 572,
    "path": "../public/assets/blog._slug-DP6jkl8I.js"
  },
  "/assets/book-open-Cj3hJf7-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-d70ME0w4RtjXqNGuLRT5cooWaVg"',
    "mtime": "2026-08-30T20:14:40.272Z",
    "size": 280,
    "path": "../public/assets/book-open-Cj3hJf7-.js"
  },
  "/assets/blog._slug-DsXrrpl2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf3-eIESAJK257jPvpjDJ4FcPnJpvWI"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 27635,
    "path": "../public/assets/blog._slug-DsXrrpl2.js"
  },
  "/assets/calendar-CXHsKPv1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-xkDpAuhOkjwkdaaorZ1WNl9vkvQ"',
    "mtime": "2026-08-30T20:14:40.272Z",
    "size": 258,
    "path": "../public/assets/calendar-CXHsKPv1.js"
  },
  "/assets/category._slug-DKvz_uEi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-dHCmoHCcR2gpzbIlabrU7WFDXqE"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 3842,
    "path": "../public/assets/category._slug-DKvz_uEi.js"
  },
  "/assets/chart-column-CQidwawg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-00YPPVN0kdAuB/8s0Iaoa7Eo+jI"',
    "mtime": "2026-08-30T20:14:40.266Z",
    "size": 252,
    "path": "../public/assets/chart-column-CQidwawg.js"
  },
  "/assets/check-ycJu-xpw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-rMkvxqVvCWPN+lsERwy7l30Xjls"',
    "mtime": "2026-08-30T20:14:40.273Z",
    "size": 125,
    "path": "../public/assets/check-ycJu-xpw.js"
  },
  "/assets/chevron-down-BkBfSyYm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-Eji0A57z2S75D6zdPUGbgjij8+Y"',
    "mtime": "2026-08-30T20:14:40.274Z",
    "size": 129,
    "path": "../public/assets/chevron-down-BkBfSyYm.js"
  },
  "/assets/chevron-left-Bqe1y8-w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-Uax/3qcn0czYBZD2GzO/wtbeIDg"',
    "mtime": "2026-08-30T20:14:40.266Z",
    "size": 131,
    "path": "../public/assets/chevron-left-Bqe1y8-w.js"
  },
  "/assets/circle-check-psqEABn_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-7PoX/aE7Yzht7HHSzO0ogowPgqU"',
    "mtime": "2026-08-30T20:14:40.266Z",
    "size": 179,
    "path": "../public/assets/circle-check-psqEABn_.js"
  },
  "/assets/chevron-right-B9QYN9JB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-Cc+cBMbuyLi2TKJ/GbPxhmuegjA"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 131,
    "path": "../public/assets/chevron-right-B9QYN9JB.js"
  },
  "/assets/circle-x-aqArcXFj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0-9hpVUKEDZCW2eNSdDRGkt6VuNhU"',
    "mtime": "2026-08-30T20:14:40.268Z",
    "size": 208,
    "path": "../public/assets/circle-x-aqArcXFj.js"
  },
  "/assets/clock-RpfrehIP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-3CoReVUkgrvz4+3zO9kCrFonM0s"',
    "mtime": "2026-08-30T20:14:40.266Z",
    "size": 170,
    "path": "../public/assets/clock-RpfrehIP.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-Cklv4N69.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-7hK/K1bcZISStyoaKQJMb10UxSg"',
    "mtime": "2026-08-30T20:14:40.266Z",
    "size": 252,
    "path": "../public/assets/compass-Cklv4N69.js"
  },
  "/assets/contact-CgaEUp4V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a78-naDptlSoLEeclfTwgNKDKy7a+Tc"',
    "mtime": "2026-08-30T20:14:40.255Z",
    "size": 14968,
    "path": "../public/assets/contact-CgaEUp4V.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T20:14:40.255Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-jaglBRSb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-v4da3ZXhWZCZcf7TcJPQbV7te7g"',
    "mtime": "2026-08-30T20:14:40.255Z",
    "size": 103,
    "path": "../public/assets/destinations-jaglBRSb.js"
  },
  "/assets/destinations.index-BDwkB48T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14f3-hIpYIXRSXTkUgBSuQk0xmUxfE6E"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 5363,
    "path": "../public/assets/destinations.index-BDwkB48T.js"
  },
  "/assets/destinations._slug-Di9MCOh2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c66-Hqa5Z/CV8lRNXiuH79Vs0MUxawE"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 7270,
    "path": "../public/assets/destinations._slug-Di9MCOh2.js"
  },
  "/assets/DestinationsMap-0kG_93JP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"124c-YGFQnTJ22Md/kxhgU+2BW58V8/g"',
    "mtime": "2026-08-30T20:14:40.282Z",
    "size": 4684,
    "path": "../public/assets/DestinationsMap-0kG_93JP.js"
  },
  "/assets/dialog-vdX0-bLN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-75puygNdOZiU+vWo/2PtnkOh94M"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 1830,
    "path": "../public/assets/dialog-vdX0-bLN.js"
  },
  "/assets/destinations._slug-DuOl5JHP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26c-LnquNINK73iGF/DwhkxodJQcUqk"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 620,
    "path": "../public/assets/destinations._slug-DuOl5JHP.js"
  },
  "/assets/disclaimer-ClNZSj5b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"71c-QcdbkNVYlcwxrZv+XSky6+L42k4"',
    "mtime": "2026-08-30T20:14:40.255Z",
    "size": 1820,
    "path": "../public/assets/disclaimer-ClNZSj5b.js"
  },
  "/assets/earth-DQxp9Vkb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-c5rax1X7X8NuyNayohg8v9MpS7A"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 394,
    "path": "../public/assets/earth-DQxp9Vkb.js"
  },
  "/assets/external-link-B2avD6ak.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-jJciU0Z2o0P6U1X2Jgtoif+V7wk"',
    "mtime": "2026-08-30T20:14:40.274Z",
    "size": 252,
    "path": "../public/assets/external-link-B2avD6ak.js"
  },
  "/assets/eye-BhOfUZ3E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-B/abIhs7jPGK1ZAimhp8PXkulDc"',
    "mtime": "2026-08-30T20:14:40.274Z",
    "size": 257,
    "path": "../public/assets/eye-BhOfUZ3E.js"
  },
  "/assets/eye-off-BOe6DgfI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-OxuR16aeTwf0dsKVio/JffpWc58"',
    "mtime": "2026-08-30T20:14:40.274Z",
    "size": 431,
    "path": "../public/assets/eye-off-BOe6DgfI.js"
  },
  "/assets/flame-CtnHr_-t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-edfR+1nNviPJBZCuj2pWMG03tlo"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 200,
    "path": "../public/assets/flame-CtnHr_-t.js"
  },
  "/assets/folder-tree-Dk80f4r_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-U8TT6ZoF+Yvvn6cdbcmCd5FK0jY"',
    "mtime": "2026-08-30T20:14:40.274Z",
    "size": 480,
    "path": "../public/assets/folder-tree-Dk80f4r_.js"
  },
  "/assets/gallery-DvJw-EX4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18e5-42npPYhPPUBVAnWEEmahnqhUHL8"',
    "mtime": "2026-08-30T20:14:40.254Z",
    "size": 6373,
    "path": "../public/assets/gallery-DvJw-EX4.js"
  },
  "/assets/geocoding.functions-PeIwKGN2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-j3WZ/QJNnpRWMFUmYAFsSv2DcmQ"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-PeIwKGN2.js"
  },
  "/assets/grip-vertical-BzjgHWbH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-Kn7eYOpws/uU8YT517yk6XtwGfk"',
    "mtime": "2026-08-30T20:14:40.274Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-BzjgHWbH.js"
  },
  "/assets/HeroBannerManager-3MAcTtPy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b55-6MC5Iy6c4x4aF9dltUrKk0VOaA4"',
    "mtime": "2026-08-30T20:14:40.280Z",
    "size": 11093,
    "path": "../public/assets/HeroBannerManager-3MAcTtPy.js"
  },
  "/assets/image-DTRpKnZW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-0qMwVE6VEMjcMtXMJTm/0AcSxS8"',
    "mtime": "2026-08-30T20:14:40.274Z",
    "size": 270,
    "path": "../public/assets/image-DTRpKnZW.js"
  },
  "/assets/image-off-D7TIRoC7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29f-+6Wq1tcYJyTcwgs0vhehBpknjkE"',
    "mtime": "2026-08-30T20:14:40.272Z",
    "size": 671,
    "path": "../public/assets/image-off-D7TIRoC7.js"
  },
  "/assets/index-BEbxDcsb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-OVRCr9Kr7ZiCxfcHWU2vlhmIMi0"',
    "mtime": "2026-08-30T20:14:40.266Z",
    "size": 290228,
    "path": "../public/assets/index-BEbxDcsb.js"
  },
  "/assets/key-round-Drisk4xV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-Dz2lfHlgvSd7e5seNX/zERT9nQs"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 356,
    "path": "../public/assets/key-round-Drisk4xV.js"
  },
  "/assets/layers-CaNFZgO7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-nsT+yW6rp0YfTJm7EE0EnDtUSsM"',
    "mtime": "2026-08-30T20:14:40.268Z",
    "size": 422,
    "path": "../public/assets/layers-CaNFZgO7.js"
  },
  "/assets/index-C4zSZgBD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a4a6-vkG55qCKFHRpSVO9FlR/qoRwub4"',
    "mtime": "2026-08-30T20:14:40.257Z",
    "size": 173222,
    "path": "../public/assets/index-C4zSZgBD.js"
  },
  "/assets/layout-dashboard-ByA9qmDw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"368-ck0044Gu5m9/5AxB2hL7FecGTao"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 872,
    "path": "../public/assets/layout-dashboard-ByA9qmDw.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-30T20:14:40.254Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-C79Nyipm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-CZqR+MTQrW3kJVRjfMWr7z0RO6E"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 303,
    "path": "../public/assets/list-C79Nyipm.js"
  },
  "/assets/list-ordered-Bjbsho1S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-/hWWAjpq7SebmPSJKOgHhmQUrZQ"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 644,
    "path": "../public/assets/list-ordered-Bjbsho1S.js"
  },
  "/assets/leaflet-src-y2iq4p01.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-8xEJdyV9et7bPt2QCsr75mtj2LM"',
    "mtime": "2026-08-30T20:14:40.282Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-y2iq4p01.js"
  },
  "/assets/map-DlvRAwvv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-2RSKWAXEu3eciu8uaCP+SsOR4Vk"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 724,
    "path": "../public/assets/map-DlvRAwvv.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T20:14:40.254Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-dC_7K4kd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-qWMnf7V2u3mIkw/GmyQB0fXSGqM"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 239,
    "path": "../public/assets/maximize-2-dC_7K4kd.js"
  },
  "/assets/message-square-BLK8jZGa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-G+3K1YibavgFN1d0o0UbLDYlsd4"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 234,
    "path": "../public/assets/message-square-BLK8jZGa.js"
  },
  "/assets/mountain-5FptH8XS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-p0xH14OLx3T/V7oXhB7ioU731oA"',
    "mtime": "2026-08-30T20:14:40.268Z",
    "size": 377,
    "path": "../public/assets/mountain-5FptH8XS.js"
  },
  "/assets/navigation-DHHi-QBB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-wLtKgH2ErLEDL8KJUW5nt7c1vhY"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 149,
    "path": "../public/assets/navigation-DHHi-QBB.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-30T20:14:40.231Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-B6i-u9XN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-lM4LElxfglHM8jydFJNqAboJoMc"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 974,
    "path": "../public/assets/news._slug-B6i-u9XN.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-30T20:14:40.253Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-B_Ymwuli.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-9VUi9ATBZy895p6Y9wAoVvoT5ng"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 4524,
    "path": "../public/assets/news._slug-B_Ymwuli.js"
  },
  "/assets/PageBreadcrumbs-Bu2ED-pL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-B7EKRBpUebyTa/g/Yq/+nvlwOIk"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-Bu2ED-pL.js"
  },
  "/assets/pen-line-DeIGICEb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-M2FIwcMqFgFO4AOoaoVnmlbAISI"',
    "mtime": "2026-08-30T20:14:40.268Z",
    "size": 1022,
    "path": "../public/assets/pen-line-DeIGICEb.js"
  },
  "/assets/pencil-Cj2iF8Wb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-YdWIDrTVUCZTPgvXCgAJRcgEBMI"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 277,
    "path": "../public/assets/pencil-Cj2iF8Wb.js"
  },
  "/assets/index-DDxa-FEf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f0942-oyt3bbJTlhzh7GSwmJDyFbwsdSI"',
    "mtime": "2026-08-30T20:14:40.289Z",
    "size": 985410,
    "path": "../public/assets/index-DDxa-FEf.js"
  },
  "/assets/plus-BMYqCqiy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-dTou+UteNrgd4SYg9p4bNUVfTR0"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 154,
    "path": "../public/assets/plus-BMYqCqiy.js"
  },
  "/assets/PostCard-LOiKd9rU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed1-uk+r+AYCKkb7/UxOvuxZZE6a7cA"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 3793,
    "path": "../public/assets/PostCard-LOiKd9rU.js"
  },
  "/assets/PostEditor-rAKjUjho.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ecd2-xkwYN2JD3FpmkLOc9SgK8M1qnNM"',
    "mtime": "2026-08-30T20:14:40.282Z",
    "size": 60626,
    "path": "../public/assets/PostEditor-rAKjUjho.js"
  },
  "/assets/privacy-policy-T3Sx-xkA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"720-lCiYm7BOYj0WZKCHR1NY9gemaQM"',
    "mtime": "2026-08-30T20:14:40.254Z",
    "size": 1824,
    "path": "../public/assets/privacy-policy-T3Sx-xkA.js"
  },
  "/assets/power-BtYJ4Zg_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-2j4aPaJuYeKPbk3C+YYgDs2IdSo"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 174,
    "path": "../public/assets/power-BtYJ4Zg_.js"
  },
  "/assets/quote-x5p1Ictk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-mjuaexCd7hk4WwUcQoNCF2YuH6I"',
    "mtime": "2026-08-30T20:14:40.268Z",
    "size": 390,
    "path": "../public/assets/quote-x5p1Ictk.js"
  },
  "/assets/radio-KvBCZSw6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-6XJiaOfP1O4Q+hAJpjOPa7Yn4Oc"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 375,
    "path": "../public/assets/radio-KvBCZSw6.js"
  },
  "/assets/refresh-cw-Cjm-69GQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-MRVBezVcb7JeLseFsJNTSZ+NI3k"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-Cjm-69GQ.js"
  },
  "/assets/rocket-DpmH82a8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4ed-1D8wkzUeQ0p5oXDO8/EGkw1T9I0"',
    "mtime": "2026-08-30T20:14:40.273Z",
    "size": 1261,
    "path": "../public/assets/rocket-DpmH82a8.js"
  },
  "/assets/rotate-ccw-mdv06yYd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-RHlUdiEaIp6Cr5sD5BSZdilXZhg"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-mdv06yYd.js"
  },
  "/assets/route-BLcZCGB1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-iG5S96PXGZeAkSh2r6aLSFLrrUk"',
    "mtime": "2026-08-30T20:14:40.256Z",
    "size": 95,
    "path": "../public/assets/route-BLcZCGB1.js"
  },
  "/assets/route-CnCA5Dsb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-N/HdUeRATbDiFK22h4YDXAlu8mQ"',
    "mtime": "2026-08-30T20:14:40.257Z",
    "size": 543,
    "path": "../public/assets/route-CnCA5Dsb.js"
  },
  "/assets/save-4qHa_5rH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-p2JIHOAnz4dg+V9WvXgM55v3xeQ"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 328,
    "path": "../public/assets/save-4qHa_5rH.js"
  },
  "/assets/scale-CX0gCVvV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-wAmjsVn5NgVK7TIvv2MTpijaNw8"',
    "mtime": "2026-08-30T20:14:40.264Z",
    "size": 333,
    "path": "../public/assets/scale-CX0gCVvV.js"
  },
  "/assets/settings-C1y2sESC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-lz7Of9uGjSAyrjWPc+CT7sjiNjA"',
    "mtime": "2026-08-30T20:14:40.276Z",
    "size": 488,
    "path": "../public/assets/settings-C1y2sESC.js"
  },
  "/assets/share-2-ic_Vyp17.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-Vt3SZUJm1EPWuI7M3o1LAsp2rXU"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 358,
    "path": "../public/assets/share-2-ic_Vyp17.js"
  },
  "/assets/shield-alert-DPnC5G4J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-dpahHaWfsqpNile2lYq95bhrQ90"',
    "mtime": "2026-08-30T20:14:40.256Z",
    "size": 668,
    "path": "../public/assets/shield-alert-DPnC5G4J.js"
  },
  "/assets/shield-check-DREqCYT_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-I0FghdAWLXyvhLQJJl1K/j9pNDc"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 321,
    "path": "../public/assets/shield-check-DREqCYT_.js"
  },
  "/assets/shield-D9Hmg5w5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-4Kc45CHN8D7wWUauROQZM5LxmxI"',
    "mtime": "2026-08-30T20:14:40.266Z",
    "size": 273,
    "path": "../public/assets/shield-D9Hmg5w5.js"
  },
  "/assets/sliders-horizontal-U5IelvbG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-hDIzFbrQ0bR0nKIQ2OZhzTI/h7Y"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-U5IelvbG.js"
  },
  "/assets/star-CVT0X3uX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-Sk5G0SwSEUpQalugPWLwHxZ/8QY"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 473,
    "path": "../public/assets/star-CVT0X3uX.js"
  },
  "/assets/styles-D_n-WDEH.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2e643-qrmIzDv0zKQ9I04DHR4tiYopETA"',
    "mtime": "2026-08-30T20:14:40.253Z",
    "size": 190019,
    "path": "../public/assets/styles-D_n-WDEH.css"
  },
  "/assets/topics._slug-DDCtII4N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f5-7fU0rSMfS6HWjsy2802WEgoqOKE"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 2293,
    "path": "../public/assets/topics._slug-DDCtII4N.js"
  },
  "/assets/TranslatedMarkdown-ChRl02G7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-NIyK2XjH+KDVJMewyLBpoiFOGn8"',
    "mtime": "2026-08-30T20:14:40.258Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-ChRl02G7.js"
  },
  "/assets/trash-2-CDlEzPg-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-4VERG4sdEr/I7UZxmCaw1igGUyg"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 329,
    "path": "../public/assets/trash-2-CDlEzPg-.js"
  },
  "/assets/trending-up-DVzSAwvG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-4KXuBiqyx1nbYrqnu1zalMXdmF4"',
    "mtime": "2026-08-30T20:14:40.268Z",
    "size": 932,
    "path": "../public/assets/trending-up-DVzSAwvG.js"
  },
  "/assets/triangle-alert-B80mj5r2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-v+UMBdTM2zBDhF7Lqgftbb1l6Do"',
    "mtime": "2026-08-30T20:14:40.268Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-B80mj5r2.js"
  },
  "/assets/upload-CqSyyKrY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-QIInBtX8+SqeQfFV+BfPOmMltMY"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 231,
    "path": "../public/assets/upload-CqSyyKrY.js"
  },
  "/assets/useMutation-CUQnzp5z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-hb90nlXTIPeydSnoJLsBk77Tazo"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 2211,
    "path": "../public/assets/useMutation-CUQnzp5z.js"
  },
  "/assets/user-plus-CgTQMyut.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-IT/WpWAmHaeiN8dvILxrElO6YPg"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 311,
    "path": "../public/assets/user-plus-CgTQMyut.js"
  },
  "/assets/user-x-DRY0x2F3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"373-9x71NR1M1fweDYKh2yIxxPw68OE"',
    "mtime": "2026-08-30T20:14:40.262Z",
    "size": 883,
    "path": "../public/assets/user-x-DRY0x2F3.js"
  },
  "/assets/users-34WHnmde.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-5ivFHOkc+VSEiwEOqlcla1OxN7o"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 307,
    "path": "../public/assets/users-34WHnmde.js"
  },
  "/assets/useSuspenseQuery-tI-syiwC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-f+ye3IE/b/IHb1Pqf1mlTJ3Q/Hw"',
    "mtime": "2026-08-30T20:14:40.260Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-tI-syiwC.js"
  },
  "/assets/utils-Bk4Z_K8v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-aGkzCMbqr49uygwCkP+EzzjudLM"',
    "mtime": "2026-08-30T20:14:40.278Z",
    "size": 59982,
    "path": "../public/assets/utils-Bk4Z_K8v.js"
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
