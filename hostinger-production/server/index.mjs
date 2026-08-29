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
  "/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/author-hussain.jpg"
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
  "/images/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/images/author-hussain.jpg"
  },
  "/assets/about.functions-DnbwqFwj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32f2-1LB/LI4BuWEad0+ChYbvRtLaZCY"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 13042,
    "path": "../public/assets/about.functions-DnbwqFwj.js"
  },
  "/assets/account-h2fNYd8b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-EjIKTam+xNWH6/Ivs9JyTebPnYw"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 2068,
    "path": "../public/assets/account-h2fNYd8b.js"
  },
  "/assets/admin-Abneo0hZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c1-WsUYd8wNac4N/hfzXKRtek5DU+4"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 2497,
    "path": "../public/assets/admin-Abneo0hZ.js"
  },
  "/assets/admin.categories-DnV6hoTo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5918-xKyi8lBaSzCQwg5pnjBIgnfnlmY"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 22808,
    "path": "../public/assets/admin.categories-DnV6hoTo.js"
  },
  "/assets/admin.comments--XHh3V2B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-I02hXBoIfEd33QGuzgPzp673KaQ"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 2199,
    "path": "../public/assets/admin.comments--XHh3V2B.js"
  },
  "/assets/admin.destinations-BTFmtnTB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26ba-wlEDnBu38+f0fufO3gKmOkytDg8"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 9914,
    "path": "../public/assets/admin.destinations-BTFmtnTB.js"
  },
  "/assets/admin.gallery-8wp9os5H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56ba-bOD4DpvtikzOf7e1jfnkkT6Qgj4"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 22202,
    "path": "../public/assets/admin.gallery-8wp9os5H.js"
  },
  "/assets/admin.homepage-6wQYspqO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d8f2-8T37smuwFXoSPw5iN2RxaExMipc"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 55538,
    "path": "../public/assets/admin.homepage-6wQYspqO.js"
  },
  "/assets/admin.about-CYg4g4bj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1138a-DoAq0f/AC+pEGFSmMU3UV47gbd4"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 70538,
    "path": "../public/assets/admin.about-CYg4g4bj.js"
  },
  "/assets/admin.index-D-oAy9It.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-4tGYAV4RTIAv7sFCSfiPl9fPTsM"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 4074,
    "path": "../public/assets/admin.index-D-oAy9It.js"
  },
  "/assets/admin.legal-8-Kmr-Nn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397f-czhGdP3edakbFjYLr83aPlIN3uU"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 14719,
    "path": "../public/assets/admin.legal-8-Kmr-Nn.js"
  },
  "/assets/admin.messages-7gzaVaSw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a9-6lB99o9rnRvVNnqO8sFGd2QmkL0"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 4777,
    "path": "../public/assets/admin.messages-7gzaVaSw.js"
  },
  "/assets/admin.posts.index-DnC-1g3G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a3-Ef62misSM953UKP1fU4M7riOM3k"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 9635,
    "path": "../public/assets/admin.posts.index-DnC-1g3G.js"
  },
  "/assets/admin.news-esSJrQhD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86b5-iRMOzJI+YC8g82PNj+AfGtDwUzw"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 34485,
    "path": "../public/assets/admin.news-esSJrQhD.js"
  },
  "/assets/admin.analytics-B-0D7I8K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64266-Y4wIR0yhqQCN8IW7YngW36zZOiE"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 410214,
    "path": "../public/assets/admin.analytics-B-0D7I8K.js"
  },
  "/assets/about-DGsjMtnM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9131e-+OUX8U65UBELn1m2nJpRV/NoNF4"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 594718,
    "path": "../public/assets/about-DGsjMtnM.js"
  },
  "/assets/admin.posts.new-BsJ1QNIv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"320-jVoXl9CbT962nWGE6dXwCBnl88w"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 800,
    "path": "../public/assets/admin.posts.new-BsJ1QNIv.js"
  },
  "/assets/admin.posts._id-Bl1bINWL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"455-fpafKxbtaCWQL2Rbemq6n1Gk0kE"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 1109,
    "path": "../public/assets/admin.posts._id-Bl1bINWL.js"
  },
  "/assets/admin.public-message-BbuSqukg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4cad-7nS2iIoen+adxKBL4LBBXLDSgz8"',
    "mtime": "2026-08-29T21:15:22.515Z",
    "size": 19629,
    "path": "../public/assets/admin.public-message-BbuSqukg.js"
  },
  "/assets/admin.subscribers-DzxwTBrt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2baf-sRVgg4osLcvi0rt9hM1Es4m4JRo"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 11183,
    "path": "../public/assets/admin.subscribers-DzxwTBrt.js"
  },
  "/assets/admin.settings-BtIBMLot.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dd4-JWWef4v+y1JOIjVz+jpMA7Un1Vs"',
    "mtime": "2026-08-29T21:15:22.514Z",
    "size": 15828,
    "path": "../public/assets/admin.settings-BtIBMLot.js"
  },
  "/assets/AdSlot-BFeI9Z2f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-C8R4VbJMg/xku4qqTIGVY9bkhaU"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-BFeI9Z2f.js"
  },
  "/assets/alert-dialog-DjpN3U4l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-5XQW0WD99CKE5dEvLQPYn3Ggsgk"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-DjpN3U4l.js"
  },
  "/assets/arrow-left-DynZbHbb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-yLb2wVBjXp7ltxKJ/8MT07F06BU"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 166,
    "path": "../public/assets/arrow-left-DynZbHbb.js"
  },
  "/assets/arrow-up-right-BG0poM-o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-5eQmbA1Qa2Wyhcg8811uO0aO2fc"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-BG0poM-o.js"
  },
  "/assets/auth-BP30rA1P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-0rYUN6y53SH4w43XOO9ZMLyynSw"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 7644,
    "path": "../public/assets/auth-BP30rA1P.js"
  },
  "/assets/blog-COSP6iFx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-GA0ZIwgC7L1klhmA9ikpC2n7IG8"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 103,
    "path": "../public/assets/blog-COSP6iFx.js"
  },
  "/assets/blog.index-DOGb9YxF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2791-i5MTwpmwZWN09lseVodrc7FbeYY"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 10129,
    "path": "../public/assets/blog.index-DOGb9YxF.js"
  },
  "/assets/blog._slug-BXmFU9fE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-A48UDARpVtIhPfdTAxkkDJmUs/E"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 572,
    "path": "../public/assets/blog._slug-BXmFU9fE.js"
  },
  "/assets/blog._slug-BzRJPmUm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf8-qBmajHBOedAb6sZXGmQjvNoS0Is"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 27640,
    "path": "../public/assets/blog._slug-BzRJPmUm.js"
  },
  "/assets/book-open-C45p-4Hx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-u7BeTwKc6ke3vQvwkTLZvKi0GIY"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 280,
    "path": "../public/assets/book-open-C45p-4Hx.js"
  },
  "/assets/calendar-Bsh29ssW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-8ZeakZemcOR67ohgO/7BwUqKTEg"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 258,
    "path": "../public/assets/calendar-Bsh29ssW.js"
  },
  "/assets/category._slug-T7RlokUj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f10-Z8laZXOF1re3Rs2h/4lHdcqRfLs"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 3856,
    "path": "../public/assets/category._slug-T7RlokUj.js"
  },
  "/assets/chart-column-dpbocXfF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-09TzIiME1klt0TP/3aHXfW14Bfc"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 252,
    "path": "../public/assets/chart-column-dpbocXfF.js"
  },
  "/assets/check-CNhMcvKe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-m2qc3Fu/8ZpprEW+MltjZUfUj2c"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 125,
    "path": "../public/assets/check-CNhMcvKe.js"
  },
  "/assets/chevron-down-C2DWXGsC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-O12BA9h02kP0YGQYxnG42ovZ6rk"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 129,
    "path": "../public/assets/chevron-down-C2DWXGsC.js"
  },
  "/assets/chevron-left-Bof6eFfP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-xZ+KSCIuU2A1d/IlN5i/Vh95n6k"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 131,
    "path": "../public/assets/chevron-left-Bof6eFfP.js"
  },
  "/assets/chevron-right-D2XbpMei.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-YLMmrdvA4UNwwW30kIJiChL/1Uk"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 131,
    "path": "../public/assets/chevron-right-D2XbpMei.js"
  },
  "/assets/circle-check-C3lOfMZ_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-oXBzfE5ClVSFjV/O/EpTUXycf3M"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 179,
    "path": "../public/assets/circle-check-C3lOfMZ_.js"
  },
  "/assets/clock-Chw4z-ld.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-Nj8huqW5W/130qyCBDk8JRM/2bM"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 170,
    "path": "../public/assets/clock-Chw4z-ld.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-CguiWB9j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-3uif9v6Q+mVPbNLr61enIcW64eY"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 252,
    "path": "../public/assets/compass-CguiWB9j.js"
  },
  "/assets/contact-NAs8vCQC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a0a-TjwZxPZ1EKNzSKaWH7WIQsqJHaw"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 14858,
    "path": "../public/assets/contact-NAs8vCQC.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-wzBEgk9w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-pqgnMmNlbqNBViduMQrC94o+ncE"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 103,
    "path": "../public/assets/destinations-wzBEgk9w.js"
  },
  "/assets/destinations.index-DHRtGPTD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1437-tMiJ46bJt6sq0jzrPwtyU7MQauA"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 5175,
    "path": "../public/assets/destinations.index-DHRtGPTD.js"
  },
  "/assets/destinations._slug-B8lYpQLn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cea-CMbyNOJpzy5meqkOtsP+SaqX5JE"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 7402,
    "path": "../public/assets/destinations._slug-B8lYpQLn.js"
  },
  "/assets/destinations._slug-Cr8Ggzp9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-VxIwv7rD93eW4RaLECcRgxEnEQw"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-Cr8Ggzp9.js"
  },
  "/assets/DestinationsMap-Bh3oviVB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a2-NBRVoVlOQsVkTTiEsE1uumBBnUw"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 4514,
    "path": "../public/assets/DestinationsMap-Bh3oviVB.js"
  },
  "/assets/dialog-DaG3H5U0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-4fBPr/LZqTxL1r5Rp4/WQEwozjY"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 1830,
    "path": "../public/assets/dialog-DaG3H5U0.js"
  },
  "/assets/disclaimer-DYdhXs8M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706-9hAzD/aMzWXW1DMLHOU872XG1Po"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 1798,
    "path": "../public/assets/disclaimer-DYdhXs8M.js"
  },
  "/assets/earth-BQcezxnr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-c9JV27vB2rUMqqkIK0H4DklUGt8"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 394,
    "path": "../public/assets/earth-BQcezxnr.js"
  },
  "/assets/external-link-CpVvXTZe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-T1VSREjSXEVLR6PjY5EGNpIn0mw"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 252,
    "path": "../public/assets/external-link-CpVvXTZe.js"
  },
  "/assets/eye-B0CFXaIY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-Gbr72uHPgiq5KvssiA3uhgvLOIQ"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 257,
    "path": "../public/assets/eye-B0CFXaIY.js"
  },
  "/assets/eye-off-DFqe5U47.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-tylZegrCz92SfZ2Mfor7FMwXgCA"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 431,
    "path": "../public/assets/eye-off-DFqe5U47.js"
  },
  "/assets/flame-Cgz4y0e_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-S/L3MxXyLs9FSuDgiaJNI2p19TA"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 200,
    "path": "../public/assets/flame-Cgz4y0e_.js"
  },
  "/assets/folder-tree-DU5-I9zt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-W8NfanmixbAzfPUHUO/rB1FMihg"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 480,
    "path": "../public/assets/folder-tree-DU5-I9zt.js"
  },
  "/assets/gallery-ZHx8HJTy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"189a-PUvIuWCiX0r77SXKHhJUrWcf0Bk"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 6298,
    "path": "../public/assets/gallery-ZHx8HJTy.js"
  },
  "/assets/geocoding.functions-CoxrhTKO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-6pfbwEdkHhhV0O230xn/XkVxkJQ"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-CoxrhTKO.js"
  },
  "/assets/grip-vertical-D59V5D6d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-1SjlL1YobNueCCOZvkTQHBPIUgc"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-D59V5D6d.js"
  },
  "/assets/image-O02KFHYD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-bdsMEGMX39+IpnabUOpDb35tiLo"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 270,
    "path": "../public/assets/image-O02KFHYD.js"
  },
  "/assets/index-BT-yO77N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a536-3bq5hN+NhFaiJ/yEJXCOzDzkvdI"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 173366,
    "path": "../public/assets/index-BT-yO77N.js"
  },
  "/assets/index-1nmfBw5D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-gCeq6RnAFsaGgq5yQwZGrmMssEY"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 290228,
    "path": "../public/assets/index-1nmfBw5D.js"
  },
  "/assets/key-round-BL8ry6Ij.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-/+JEscOu1HP3fGycc5PRRvOYPLM"',
    "mtime": "2026-08-29T21:15:22.514Z",
    "size": 356,
    "path": "../public/assets/key-round-BL8ry6Ij.js"
  },
  "/assets/layers-BL9hz4tx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-ezb1bcIJQ3KGZbOzFRUQQBrZXZc"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 422,
    "path": "../public/assets/layers-BL9hz4tx.js"
  },
  "/assets/index-DyvM2gNR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02d2-PPp4sI1r2RBWVQlcjpWITpzf0IQ"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 983762,
    "path": "../public/assets/index-DyvM2gNR.js"
  },
  "/assets/layout-dashboard-DfsQO_zw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"249-7ImDL2OzsTofcjyjSqUFvN8wlHk"',
    "mtime": "2026-08-29T21:15:22.514Z",
    "size": 585,
    "path": "../public/assets/layout-dashboard-DfsQO_zw.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-ordered-CEijX1WH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-dJGUn+OiDC2ROwIw4sdBS9aqfPg"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 644,
    "path": "../public/assets/list-ordered-CEijX1WH.js"
  },
  "/assets/list-URjSosBR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-Q+mZfbblzR997zGlLlnIpunZCWY"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 303,
    "path": "../public/assets/list-URjSosBR.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/leaflet-src-CauI2maG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-yO2Qc3CpJRHejI7hiCodgYxm354"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-CauI2maG.js"
  },
  "/assets/map-sSIvLwZv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-k2imOCLRBMGmgyFWWhO+g+45OEs"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 724,
    "path": "../public/assets/map-sSIvLwZv.js"
  },
  "/assets/maximize-2-BPldyp8S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-pcpnF2xThVtwrgNNOeFS9ruwnPs"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 239,
    "path": "../public/assets/maximize-2-BPldyp8S.js"
  },
  "/assets/message-square-FBY_4C7G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-FinC7hcgkx6YLkKez27gA4Vk+VA"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 234,
    "path": "../public/assets/message-square-FBY_4C7G.js"
  },
  "/assets/mountain-gnVo9ESl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-ZFfjZqsjuRt/F1aAOZ0n9X/yG3o"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 377,
    "path": "../public/assets/mountain-gnVo9ESl.js"
  },
  "/assets/navigation-fTYuAZnO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-MNrqGEo1r8E1iHgufJsY/MDGaQg"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 149,
    "path": "../public/assets/navigation-fTYuAZnO.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-29T21:15:22.478Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-CeLASZBA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-GrCOXXipdMkvensuGrbLoNHRDmk"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 974,
    "path": "../public/assets/news._slug-CeLASZBA.js"
  },
  "/assets/news._slug-CLsOoZFN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-QYDriLal/KnWEFql7no9pggY44k"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 4524,
    "path": "../public/assets/news._slug-CLsOoZFN.js"
  },
  "/assets/PageBreadcrumbs-hpdxxwNj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-84ovELR+A0+wynK2co4OczI6lXo"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-hpdxxwNj.js"
  },
  "/assets/pen-line-CJfLuYK2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-rkAgus6KxkKsKQsRRuimPX8U6do"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 1022,
    "path": "../public/assets/pen-line-CJfLuYK2.js"
  },
  "/assets/pencil-DW1_9xE_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-mcg0lakVrl3MSDKRJjiBQqEIJLk"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 277,
    "path": "../public/assets/pencil-DW1_9xE_.js"
  },
  "/assets/plus-FjhxTm75.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-qwJPhPHGICkxpss6L8K3u4r29Fc"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 154,
    "path": "../public/assets/plus-FjhxTm75.js"
  },
  "/assets/PostCard-Btt0JUiv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-sASBcILjVNGXx7KUqW+Q6usnbRs"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 3935,
    "path": "../public/assets/PostCard-Btt0JUiv.js"
  },
  "/assets/PostEditor-DLY-vdAk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd2a-t3+QxSdYPDhaCM2pJjVWsne/Ufg"',
    "mtime": "2026-08-29T21:15:22.525Z",
    "size": 48426,
    "path": "../public/assets/PostEditor-DLY-vdAk.js"
  },
  "/assets/power-vNzFk-jR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-GyO/iqBRg1hE5pv/YyOF2Ux1EXk"',
    "mtime": "2026-08-29T21:15:22.515Z",
    "size": 174,
    "path": "../public/assets/power-vNzFk-jR.js"
  },
  "/assets/privacy-policy-8dpWlVY4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70a-FeQpQlN+KKYF41sQd95qDjHRi7A"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 1802,
    "path": "../public/assets/privacy-policy-8dpWlVY4.js"
  },
  "/assets/quote-etdCxVNH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-rZT/rP2xUpoGRWU3DuO9XISPuM8"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 390,
    "path": "../public/assets/quote-etdCxVNH.js"
  },
  "/assets/radio-ClzhTZyi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-DIQlIQnbqf9af7LGO9NZ32cnTQ0"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 375,
    "path": "../public/assets/radio-ClzhTZyi.js"
  },
  "/assets/refresh-cw-Dr01UmWq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-xtsCz2O9Pl1PCEz2VP15Dbm8WRc"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-Dr01UmWq.js"
  },
  "/assets/rocket-ChfkiFvv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"75b-q2rEpJS6K3oi421s+Jkqrdl/9EY"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 1883,
    "path": "../public/assets/rocket-ChfkiFvv.js"
  },
  "/assets/rotate-ccw-CQ-1ok2F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-eFPVlpWq7OHyOQCW5mnJbHV97Ek"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-CQ-1ok2F.js"
  },
  "/assets/route-BVe9uvk2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-42ZeqIJcal9lMJHQWKR91Vm5x7c"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 543,
    "path": "../public/assets/route-BVe9uvk2.js"
  },
  "/assets/route-DVfCO03F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-dNpfJvCtIsM3YsJy25zI3BHy7U4"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 95,
    "path": "../public/assets/route-DVfCO03F.js"
  },
  "/assets/save-BH5A-3Oa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-93FbF8xhRKWKu4WnbPpciXrYAKo"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 328,
    "path": "../public/assets/save-BH5A-3Oa.js"
  },
  "/assets/scale-CKBSxDrt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-aNYDn7FoiXhcsB5MvQiedDKgpjg"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 333,
    "path": "../public/assets/scale-CKBSxDrt.js"
  },
  "/assets/settings-CvMvDnKr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-WYJesjjPq7Bbnyqi8XpdCBHDb8E"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 488,
    "path": "../public/assets/settings-CvMvDnKr.js"
  },
  "/assets/share-2-CTsOIp7F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-C6f2rKjwugA6qZEHOAMUfr2VgPQ"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 358,
    "path": "../public/assets/share-2-CTsOIp7F.js"
  },
  "/assets/shield-alert-DZANhRWH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-oXBR+iXh3DGSyB0OcwAYQ4ALuMs"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 668,
    "path": "../public/assets/shield-alert-DZANhRWH.js"
  },
  "/assets/sliders-horizontal-DhQJ81TY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-RwZpVnid210AkkbwksfZqgxzdk0"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-DhQJ81TY.js"
  },
  "/assets/shield-check-wXbF-QZB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-XqAqUKRPb5cmXoGWtRgCcWiLQVs"',
    "mtime": "2026-08-29T21:15:22.515Z",
    "size": 321,
    "path": "../public/assets/shield-check-wXbF-QZB.js"
  },
  "/assets/shield-sNEoCwJg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-SJIIYN0oVqxYKUSnUoFsxMSF5EQ"',
    "mtime": "2026-08-29T21:15:22.517Z",
    "size": 273,
    "path": "../public/assets/shield-sNEoCwJg.js"
  },
  "/assets/star-CalYZJll.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-SQU7gpPV8eFXFr6Eid1ku5kyttM"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 473,
    "path": "../public/assets/star-CalYZJll.js"
  },
  "/assets/topics._slug-Bjx7Lrlm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-/5rnTnIK/GSsI3mlotohKwR8GSs"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 2165,
    "path": "../public/assets/topics._slug-Bjx7Lrlm.js"
  },
  "/assets/TranslatedMarkdown-DX77h_j4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-7hoS2T6QGRqjV1gkdWnZbr/odkE"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-DX77h_j4.js"
  },
  "/assets/styles-P451MGzu.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2db02-EN/6Fm2tdPIBH6LRnaN+CZNl2Fo"',
    "mtime": "2026-08-29T21:15:22.507Z",
    "size": 187138,
    "path": "../public/assets/styles-P451MGzu.css"
  },
  "/assets/trash-2-Dz3YE4jb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-V3/8aHOX/dVH309po+SV74+sij0"',
    "mtime": "2026-08-29T21:15:22.521Z",
    "size": 329,
    "path": "../public/assets/trash-2-Dz3YE4jb.js"
  },
  "/assets/trending-up-Dz8pHTuy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-INLxEV4l7IJ9mAOY/UvVaM1V728"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 932,
    "path": "../public/assets/trending-up-Dz8pHTuy.js"
  },
  "/assets/triangle-alert--xICUTlW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-2gATUb64NBO8VExWAd1hkI6N3yA"',
    "mtime": "2026-08-29T21:15:22.519Z",
    "size": 266,
    "path": "../public/assets/triangle-alert--xICUTlW.js"
  },
  "/assets/upload-Ca39fNcy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-W6MgAvW5+BqPJegE8KhKQ4/EVIo"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 231,
    "path": "../public/assets/upload-Ca39fNcy.js"
  },
  "/assets/useMutation-uSWrRMKF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-7IPNeav66MQOhKkZgx9QGsPiDYs"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 2211,
    "path": "../public/assets/useMutation-uSWrRMKF.js"
  },
  "/assets/user-plus-B0gRCg0J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-37Z+WJvd90UrXlMK3nC7aHIXJHo"',
    "mtime": "2026-08-29T21:15:22.514Z",
    "size": 311,
    "path": "../public/assets/user-plus-B0gRCg0J.js"
  },
  "/assets/user-x-BDRwERwx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"412-f/S9dXSSvE3oBLfFmda++aKXQ6E"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 1042,
    "path": "../public/assets/user-x-BDRwERwx.js"
  },
  "/assets/users-DblvyI-f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-fHQZ6H1sRT+5/DKvi2fZAgEugr8"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 307,
    "path": "../public/assets/users-DblvyI-f.js"
  },
  "/assets/useSuspenseQuery-BbDSdJIV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-rTdWo5e+OqtrQIzGMgBGeS9hSqY"',
    "mtime": "2026-08-29T21:15:22.512Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-BbDSdJIV.js"
  },
  "/assets/utils-B6vcMp9j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-A/ndhAgEv33/LeUa4eoNCxTr4I4"',
    "mtime": "2026-08-29T21:15:22.523Z",
    "size": 59982,
    "path": "../public/assets/utils-B6vcMp9j.js"
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
