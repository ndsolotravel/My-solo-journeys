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
  "/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/author-hussain.jpg"
  },
  "/favicon.svg": {
    "type": "image/svg+xml",
    "etag": '"10f-x37Z27Iot3Yaz1uSBXvbE23MuYs"',
    "mtime": "2026-08-09T19:21:04.027Z",
    "size": 271,
    "path": "../public/favicon.svg"
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
  "/assets/account-CfS5ofTN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-upONHasUUTVXQRXMl9dy0sUNal0"',
    "mtime": "2026-08-29T16:45:12.714Z",
    "size": 2068,
    "path": "../public/assets/account-CfS5ofTN.js"
  },
  "/assets/about.functions-XutIk3Yv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32f2-SjaUaxAmRR+5FZnM/5DXQQe6/Sc"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 13042,
    "path": "../public/assets/about.functions-XutIk3Yv.js"
  },
  "/assets/admin-CJGvhVJH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c1-0ME6x0fALC8D7w10zTTTJ4SIXIU"',
    "mtime": "2026-08-29T16:45:12.689Z",
    "size": 2497,
    "path": "../public/assets/admin-CJGvhVJH.js"
  },
  "/assets/admin.about-DfPEMwDm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1138a-sVnpUj0gUs1YI0+FdnVCWJyd+xQ"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 70538,
    "path": "../public/assets/admin.about-DfPEMwDm.js"
  },
  "/assets/admin.categories-CtXd1zly.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5918-uB3HLvEK54cXXVzxqCA2orhvA4s"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 22808,
    "path": "../public/assets/admin.categories-CtXd1zly.js"
  },
  "/assets/admin.comments-p0Jc3pFj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-6sJd1WOC8A9ZQTOnzySj37KpQyI"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-p0Jc3pFj.js"
  },
  "/assets/admin.destinations-CVqmpGoF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26ba-0NCq6Ccph+ACkgKC9Ws7gP+AmkY"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 9914,
    "path": "../public/assets/admin.destinations-CVqmpGoF.js"
  },
  "/assets/admin.analytics-BB--jsDW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64266-w+1bPK/oXgEQ4tGLZZ7HAwKF2uI"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 410214,
    "path": "../public/assets/admin.analytics-BB--jsDW.js"
  },
  "/assets/admin.gallery-C1C0UFEN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56ba-BSzG0azZ/78cQgYQxwVroqU5ue4"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 22202,
    "path": "../public/assets/admin.gallery-C1C0UFEN.js"
  },
  "/assets/admin.homepage-Cyu1N5WV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d8f2-K6QGaJFDgjRvUyfZXkpylLyOb10"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 55538,
    "path": "../public/assets/admin.homepage-Cyu1N5WV.js"
  },
  "/assets/admin.index-CnDpITWh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-8uyCy5vPfqWcyMiIMKYguKXhsCs"',
    "mtime": "2026-08-29T16:45:12.714Z",
    "size": 4074,
    "path": "../public/assets/admin.index-CnDpITWh.js"
  },
  "/assets/admin.legal-BxS92Osk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397f-5+xBpQOIdYApCg9buf3QxkU1+wM"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 14719,
    "path": "../public/assets/admin.legal-BxS92Osk.js"
  },
  "/assets/admin.messages-B7kQe953.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a9-tmqzKWfobJV2mq3Gc34s1/V8LqA"',
    "mtime": "2026-08-29T16:45:12.720Z",
    "size": 4777,
    "path": "../public/assets/admin.messages-B7kQe953.js"
  },
  "/assets/admin.news-X6J-CaMx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86b5-9vbx/0xwuEPuLeCYVTidErW3stU"',
    "mtime": "2026-08-29T16:45:12.720Z",
    "size": 34485,
    "path": "../public/assets/admin.news-X6J-CaMx.js"
  },
  "/assets/admin.posts.index-Ba-sVpcC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a3-3gh2FiMKW1J2Rm6jT1FizSwBilE"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 9635,
    "path": "../public/assets/admin.posts.index-Ba-sVpcC.js"
  },
  "/assets/about-CeQ6BTWJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"912e7-eiZ/YQRZvniYdBTIdOP1upyXqO8"',
    "mtime": "2026-08-29T16:45:12.760Z",
    "size": 594663,
    "path": "../public/assets/about-CeQ6BTWJ.js"
  },
  "/assets/admin.posts._id-CzKaTt6z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"455-baFHJ//b4KKLjq/qFMJIa+tVDTQ"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 1109,
    "path": "../public/assets/admin.posts._id-CzKaTt6z.js"
  },
  "/assets/admin.posts.new-DmcoyZK6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"320-MRWUFwovZEMTIHBhuUREABkANIE"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 800,
    "path": "../public/assets/admin.posts.new-DmcoyZK6.js"
  },
  "/assets/admin.public-message-DmnCnC2t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4cad-sSk1qQI5IDwTuX/F8Swhr0Nb3EQ"',
    "mtime": "2026-08-29T16:45:12.719Z",
    "size": 19629,
    "path": "../public/assets/admin.public-message-DmnCnC2t.js"
  },
  "/assets/admin.settings-DoeKC_tb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dd4-tqL/c6s098QA8YPknAl/jF5tYAY"',
    "mtime": "2026-08-29T16:45:12.715Z",
    "size": 15828,
    "path": "../public/assets/admin.settings-DoeKC_tb.js"
  },
  "/assets/admin.subscribers-DxKSm8eZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2baf-Yz4Upe09sxafPvuLBu7ukaLrdyU"',
    "mtime": "2026-08-29T16:45:12.714Z",
    "size": 11183,
    "path": "../public/assets/admin.subscribers-DxKSm8eZ.js"
  },
  "/assets/AdSlot-CvPZ9I91.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-RfKBdwG59pztQHolPUUuYbopwl4"',
    "mtime": "2026-08-29T16:45:12.687Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-CvPZ9I91.js"
  },
  "/assets/alert-dialog-CYXka40V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-6B/QaiXQ96dnOcqPizTkjfYcufg"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-CYXka40V.js"
  },
  "/assets/arrow-left-CpJC_YLQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-CRUec+N1K1cd3pyMFMUESNnWf7w"',
    "mtime": "2026-08-29T16:45:12.689Z",
    "size": 166,
    "path": "../public/assets/arrow-left-CpJC_YLQ.js"
  },
  "/assets/arrow-up-right-Ctx6WxLX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-1I+YB3qoW8riUm1shmbnovYjm4I"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-Ctx6WxLX.js"
  },
  "/assets/auth-BoKyRu6f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-SFl2/8/KqJ/LgwoPDu9rfakNfeE"',
    "mtime": "2026-08-29T16:45:12.682Z",
    "size": 7644,
    "path": "../public/assets/auth-BoKyRu6f.js"
  },
  "/assets/blog-Dq_4XpxB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-TDf+ZQTYKTT7LSmCaB98LRRgQP8"',
    "mtime": "2026-08-29T16:45:12.681Z",
    "size": 103,
    "path": "../public/assets/blog-Dq_4XpxB.js"
  },
  "/assets/blog.index-CiZzud1h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2791-GbMHG4lMC4AUF0vl0J08ZK94QB0"',
    "mtime": "2026-08-29T16:45:12.688Z",
    "size": 10129,
    "path": "../public/assets/blog.index-CiZzud1h.js"
  },
  "/assets/blog._slug-B3adbtEe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf8-FnY2YM1Qz3UVHnAa/Ccw8ozerVc"',
    "mtime": "2026-08-29T16:45:12.688Z",
    "size": 27640,
    "path": "../public/assets/blog._slug-B3adbtEe.js"
  },
  "/assets/blog._slug-y5cCEBZ6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-rCYHeR8WmXh+ykjAp/Uihj9sAYw"',
    "mtime": "2026-08-29T16:45:12.688Z",
    "size": 572,
    "path": "../public/assets/blog._slug-y5cCEBZ6.js"
  },
  "/assets/book-open-BEiJgVYx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-jl11llnDsHKM3c4iMnirIJnE3uM"',
    "mtime": "2026-08-29T16:45:12.687Z",
    "size": 280,
    "path": "../public/assets/book-open-BEiJgVYx.js"
  },
  "/assets/calendar-DfZn9akz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-PL53rhRtzUMrPE2Fgs+U2PGn9w0"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 258,
    "path": "../public/assets/calendar-DfZn9akz.js"
  },
  "/assets/category._slug-CBvi-Etp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f10-ItL59DjoyaEMk59OLRDmtCboaps"',
    "mtime": "2026-08-29T16:45:12.687Z",
    "size": 3856,
    "path": "../public/assets/category._slug-CBvi-Etp.js"
  },
  "/assets/chart-column-fh8_KJST.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-TaNyq0svacaN+J5Rcn8EZlq7KKM"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 252,
    "path": "../public/assets/chart-column-fh8_KJST.js"
  },
  "/assets/check-Ce-Vco3g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-AduPelgA0OS/qL2unnXj2bMQmj4"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 125,
    "path": "../public/assets/check-Ce-Vco3g.js"
  },
  "/assets/chevron-down-Ci6G1S61.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-Uo1CFxs5fK68pZ8iAv3ZjxJZoys"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 129,
    "path": "../public/assets/chevron-down-Ci6G1S61.js"
  },
  "/assets/chevron-left-Bt2tq4i0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-fjISlU/G+7fpWhJS+HKhayHQzHM"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 131,
    "path": "../public/assets/chevron-left-Bt2tq4i0.js"
  },
  "/assets/chevron-right-oi9VCeNz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-TiX2bbReTqEUZHXONkqq/8DPs3o"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 131,
    "path": "../public/assets/chevron-right-oi9VCeNz.js"
  },
  "/assets/circle-check-ViYE8QP4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-PJoJe9Ft5JK6dOnDDCRc7Ow86z4"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 179,
    "path": "../public/assets/circle-check-ViYE8QP4.js"
  },
  "/assets/clock-VDTYnVxj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-xrsQyTEVb6PAJgMmO3DtlfM6Hqw"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 170,
    "path": "../public/assets/clock-VDTYnVxj.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-BSnYXKoi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a0a-qGjH+qeXtwrdpPA8FjrhBnAXgWg"',
    "mtime": "2026-08-29T16:45:12.681Z",
    "size": 14858,
    "path": "../public/assets/contact-BSnYXKoi.js"
  },
  "/assets/compass-DMp84Lc_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-XqvArd7GXCb4dLuN8L+w5DES6co"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 252,
    "path": "../public/assets/compass-DMp84Lc_.js"
  },
  "/assets/destinations-CmqQzy-0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-buT3jEaS7oIG11TQFG98yGCqeFc"',
    "mtime": "2026-08-29T16:45:12.681Z",
    "size": 103,
    "path": "../public/assets/destinations-CmqQzy-0.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T16:45:12.681Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations.index-C_xbHLcn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1437-0MAltszzxW6BhLYsr1gN2loTmQo"',
    "mtime": "2026-08-29T16:45:12.687Z",
    "size": 5175,
    "path": "../public/assets/destinations.index-C_xbHLcn.js"
  },
  "/assets/destinations._slug-CVZaoaKO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-Uawofi6PauLqNqviWAelvMDbVOU"',
    "mtime": "2026-08-29T16:45:12.687Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-CVZaoaKO.js"
  },
  "/assets/destinations._slug-DJFIHxHY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cea-yMUoo4uH72/phm9pnhLlAiTXtww"',
    "mtime": "2026-08-29T16:45:12.687Z",
    "size": 7402,
    "path": "../public/assets/destinations._slug-DJFIHxHY.js"
  },
  "/assets/DestinationsMap-BLfF5O99.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1023-1MLOSMQnUyHFDUZdYVUZkiqzzMk"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 4131,
    "path": "../public/assets/DestinationsMap-BLfF5O99.js"
  },
  "/assets/disclaimer-CQAsNoHa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706-gRA9DzYW4Yty5+5DIrFi0h8yuzQ"',
    "mtime": "2026-08-29T16:45:12.681Z",
    "size": 1798,
    "path": "../public/assets/disclaimer-CQAsNoHa.js"
  },
  "/assets/dialog-O7oH76U2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-/AZbJT7MHMQwhxgSXZtQZd7h+kg"',
    "mtime": "2026-08-29T16:45:12.719Z",
    "size": 1830,
    "path": "../public/assets/dialog-O7oH76U2.js"
  },
  "/assets/earth-CHepuq4I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-Yx2ywjk5BmbIUn7rY6joJ9Z6kUM"',
    "mtime": "2026-08-29T16:45:12.686Z",
    "size": 394,
    "path": "../public/assets/earth-CHepuq4I.js"
  },
  "/assets/eye-kUTlcpHu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-U8RzMnWF5ySItiE4OqnQI/16krw"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 257,
    "path": "../public/assets/eye-kUTlcpHu.js"
  },
  "/assets/external-link-BGaKHYzR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-wDfAT8uBkgFVM6ifHJlLeTbeEbs"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 252,
    "path": "../public/assets/external-link-BGaKHYzR.js"
  },
  "/assets/flame-BKnNu3Xe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-hQT9Q63kcVCUvrxUB+a0NjaJxVc"',
    "mtime": "2026-08-29T16:45:12.720Z",
    "size": 200,
    "path": "../public/assets/flame-BKnNu3Xe.js"
  },
  "/assets/eye-off--m9nsH0p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-E19NWQT9arJea8p/FrgS1uGHgeQ"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 431,
    "path": "../public/assets/eye-off--m9nsH0p.js"
  },
  "/assets/folder-tree-LXhzLZVI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-1BTbSKLlnastbrRUW0Z8QCTGCWQ"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 480,
    "path": "../public/assets/folder-tree-LXhzLZVI.js"
  },
  "/assets/gallery-Cva1Ehu0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"189a-ovGSSAIyto1qXfGk6CTqSEWEUYI"',
    "mtime": "2026-08-29T16:45:12.680Z",
    "size": 6298,
    "path": "../public/assets/gallery-Cva1Ehu0.js"
  },
  "/assets/geocoding.functions-Dd1RswJL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-eiNh5Y03g1XrsRXfpJFxJ4/HfaA"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-Dd1RswJL.js"
  },
  "/assets/grip-vertical-D4YnpogW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-RKQKIiSMzLZAwlJXLV/ujZ1ePNc"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-D4YnpogW.js"
  },
  "/assets/image-Ck_OXQTA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-odZeo+bR0lJczeuMB24h1/efVmI"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 270,
    "path": "../public/assets/image-Ck_OXQTA.js"
  },
  "/assets/index-BgKeS6WR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a521-nkI7IxFtpHNvujZGX1lIIc9Qn38"',
    "mtime": "2026-08-29T16:45:12.686Z",
    "size": 173345,
    "path": "../public/assets/index-BgKeS6WR.js"
  },
  "/assets/index-CCswC4z4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-CCqkTaTm9AX6VeDN4OOPoDH8YcY"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 290228,
    "path": "../public/assets/index-CCswC4z4.js"
  },
  "/assets/key-round-BlhrOAKY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-xa8vLIvzOO1HcP1OpcuwkUe3NP4"',
    "mtime": "2026-08-29T16:45:12.715Z",
    "size": 356,
    "path": "../public/assets/key-round-BlhrOAKY.js"
  },
  "/assets/layers-CkhwbVZ0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-ooK+1rOAe4QsJg55EgeM8XadG3U"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 422,
    "path": "../public/assets/layers-CkhwbVZ0.js"
  },
  "/assets/index-BaZVauwH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f025d-idYCQtSXWEQjND8xIZwm1v8hOCs"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 983645,
    "path": "../public/assets/index-BaZVauwH.js"
  },
  "/assets/layout-dashboard-86aHATDo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"249-jsSzkzHRPoyB4mHYF7kHPChxlno"',
    "mtime": "2026-08-29T16:45:12.714Z",
    "size": 585,
    "path": "../public/assets/layout-dashboard-86aHATDo.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-29T16:45:12.679Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/leaflet-src-CuEr5Yyx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-S2xhre1TYdWisH1yoEnvCse2yrE"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-CuEr5Yyx.js"
  },
  "/assets/list-Dyl1cIIa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-lAzI4mhXDyDWhSs0n7q30yWe+hU"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 303,
    "path": "../public/assets/list-Dyl1cIIa.js"
  },
  "/assets/list-ordered-nq2Zq7V0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-z5fxw9KQoINe7sUDFsjxTAOlH60"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 644,
    "path": "../public/assets/list-ordered-nq2Zq7V0.js"
  },
  "/assets/map-B_e3Dath.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-lZVQ9GGitBuqC8rd2lr+cQS8zGg"',
    "mtime": "2026-08-29T16:45:12.687Z",
    "size": 724,
    "path": "../public/assets/map-B_e3Dath.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T16:45:12.680Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-BkSb5DUz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-7LrZSbTsnwkEEFgEFvDSL1Btb6o"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 239,
    "path": "../public/assets/maximize-2-BkSb5DUz.js"
  },
  "/assets/message-square-uH1GAUQF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-0ugdQvxzKt5jpWokciH8DvPuiug"',
    "mtime": "2026-08-29T16:45:12.714Z",
    "size": 234,
    "path": "../public/assets/message-square-uH1GAUQF.js"
  },
  "/assets/navigation-F5Hxs7il.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-05NkZA0ZBZPCSn9pYRm8BcXXIjA"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 149,
    "path": "../public/assets/navigation-F5Hxs7il.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-29T16:45:12.678Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-6N9YnHnJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-z0g1LauxVZKIdikq7U49vCd28Y8"',
    "mtime": "2026-08-29T16:45:12.686Z",
    "size": 974,
    "path": "../public/assets/news._slug-6N9YnHnJ.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-29T16:45:12.584Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/mountain-BAbhWRct.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-Cx7CDxAtMWaPyiNPmYOxRATskho"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 377,
    "path": "../public/assets/mountain-BAbhWRct.js"
  },
  "/assets/news._slug-BMcrBi_O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-z8bQp7RrERL8Y0KeJ9nnF0JZuoA"',
    "mtime": "2026-08-29T16:45:12.686Z",
    "size": 4524,
    "path": "../public/assets/news._slug-BMcrBi_O.js"
  },
  "/assets/PageBreadcrumbs-D0KRNrO9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-zjYdmeIfj0gtMVBNMNG9DlmuuwE"',
    "mtime": "2026-08-29T16:45:12.688Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-D0KRNrO9.js"
  },
  "/assets/pen-line-Cp_evNjP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-qYWQ4gQVcDQ2nyr7LBYdSOwwpw4"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 1022,
    "path": "../public/assets/pen-line-Cp_evNjP.js"
  },
  "/assets/pencil-BBhezTsv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-kM5N2txnxs0ak9IrtaEUJ7mpAyY"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 277,
    "path": "../public/assets/pencil-BBhezTsv.js"
  },
  "/assets/plus-C4SQjBti.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-qYfOH8GVnZi7qHPU2FDz1EXlf04"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 154,
    "path": "../public/assets/plus-C4SQjBti.js"
  },
  "/assets/PostCard-DzorQt1E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-xA4EKUzGOS74KMeQOIFarteOK0I"',
    "mtime": "2026-08-29T16:45:12.688Z",
    "size": 3935,
    "path": "../public/assets/PostCard-DzorQt1E.js"
  },
  "/assets/power-BOsdfPc2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-zjHDXy0SRe3By+SMo6KZ6yuFK/k"',
    "mtime": "2026-08-29T16:45:12.719Z",
    "size": 174,
    "path": "../public/assets/power-BOsdfPc2.js"
  },
  "/assets/privacy-policy-DlENOXfH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70a-UPK+sTQmCydi6R+5xQPsvxAw1ME"',
    "mtime": "2026-08-29T16:45:12.680Z",
    "size": 1802,
    "path": "../public/assets/privacy-policy-DlENOXfH.js"
  },
  "/assets/PostEditor-C98ZIaik.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd2a-CSVUHyUV7h3eBGYC2QFR7iWDV34"',
    "mtime": "2026-08-29T16:45:12.758Z",
    "size": 48426,
    "path": "../public/assets/PostEditor-C98ZIaik.js"
  },
  "/assets/quote-BA7KUAT8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-o2vninU1/IWE3HVcVy6wJdQcMcI"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 390,
    "path": "../public/assets/quote-BA7KUAT8.js"
  },
  "/assets/radio-DZUmWkaP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-eoeDqknhUkd+ysVywmDzqzTO0hU"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 375,
    "path": "../public/assets/radio-DZUmWkaP.js"
  },
  "/assets/refresh-cw-B5vOM4qQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-/rdz3rZZeQRShWXGyWhtAT74RRA"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-B5vOM4qQ.js"
  },
  "/assets/rocket-BhRwuRCX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"75b-hQiAdGMFxJXY1GJBR3D+PnVVicY"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 1883,
    "path": "../public/assets/rocket-BhRwuRCX.js"
  },
  "/assets/rotate-ccw-Bd99HZ8m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-gAVPIL87RmNmUJT9YyBixNKcGR0"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-Bd99HZ8m.js"
  },
  "/assets/route-BfZP73W3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-QrCnoQsdyJqHxEhVOAzeWWb2314"',
    "mtime": "2026-08-29T16:45:12.685Z",
    "size": 95,
    "path": "../public/assets/route-BfZP73W3.js"
  },
  "/assets/route-DScMp-Qn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-WDYGjXTVkRBtZSGfXZwS8unAjAs"',
    "mtime": "2026-08-29T16:45:12.686Z",
    "size": 543,
    "path": "../public/assets/route-DScMp-Qn.js"
  },
  "/assets/save-B7T_JRNJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-9kxxBGootwi840myTW3rpmSRpAo"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 328,
    "path": "../public/assets/save-B7T_JRNJ.js"
  },
  "/assets/scale-BQdZt_J3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-xegp3o5k8I78alMiEDfPILfsaRo"',
    "mtime": "2026-08-29T16:45:12.754Z",
    "size": 333,
    "path": "../public/assets/scale-BQdZt_J3.js"
  },
  "/assets/share-2-DQAJ7gzI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-FIV+rbQGkQaZ3aL4tpBpiW1Smog"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 358,
    "path": "../public/assets/share-2-DQAJ7gzI.js"
  },
  "/assets/settings-47ot-LXI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-1UUiuqtQYoe0qsvES7PF6bTRqNY"',
    "mtime": "2026-08-29T16:45:12.756Z",
    "size": 488,
    "path": "../public/assets/settings-47ot-LXI.js"
  },
  "/assets/shield-alert-Be75wXYh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-9JbBS87KGKV0MnNrYpje9h+ZoKQ"',
    "mtime": "2026-08-29T16:45:12.682Z",
    "size": 668,
    "path": "../public/assets/shield-alert-Be75wXYh.js"
  },
  "/assets/shield-check-D67BLFQy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-Pu/5w9GmtfW8TLQ2MhccovCeGsM"',
    "mtime": "2026-08-29T16:45:12.719Z",
    "size": 321,
    "path": "../public/assets/shield-check-D67BLFQy.js"
  },
  "/assets/sliders-horizontal-BUZyno-4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-VkFJkD1csdzPBybKB5qSrpneaes"',
    "mtime": "2026-08-29T16:45:12.688Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-BUZyno-4.js"
  },
  "/assets/shield-CoqaHlQo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-oxePhjzxLEFfzCo2Xl0TD00ghvM"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 273,
    "path": "../public/assets/shield-CoqaHlQo.js"
  },
  "/assets/star-vHrmS9Vl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-icmYa+1s7GG52aH6zOUd9jvMjMo"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 473,
    "path": "../public/assets/star-vHrmS9Vl.js"
  },
  "/assets/topics._slug-pz_z3OOm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-AJo3BUA1rdG4c7jLHrEF8usCwcI"',
    "mtime": "2026-08-29T16:45:12.686Z",
    "size": 2165,
    "path": "../public/assets/topics._slug-pz_z3OOm.js"
  },
  "/assets/TranslatedMarkdown-m0QDZpo7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-1R1SboNuc7503d4fWmyRGBuxAEM"',
    "mtime": "2026-08-29T16:45:12.686Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-m0QDZpo7.js"
  },
  "/assets/trash-2-Czl4jI5n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-OwvnuT3JOd/bFfF82s2pd49hvZA"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 329,
    "path": "../public/assets/trash-2-Czl4jI5n.js"
  },
  "/assets/trending-up-ZeFgMXbl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-43e7jLZ70L+5XAfVL79jLVT1qX0"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 932,
    "path": "../public/assets/trending-up-ZeFgMXbl.js"
  },
  "/assets/styles-gRYwYsTW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2db4e-Q5R1MVVTUuAwItZSQzQDLfAR1gg"',
    "mtime": "2026-08-29T16:45:12.679Z",
    "size": 187214,
    "path": "../public/assets/styles-gRYwYsTW.css"
  },
  "/assets/triangle-alert-CqnzatJh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-qtDiF1HbZ+8Aot4TY04Uc133jpg"',
    "mtime": "2026-08-29T16:45:12.755Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-CqnzatJh.js"
  },
  "/assets/upload-HEkQZ-PG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-tu8sz3nG7125UbPg/zrgHekrca0"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 231,
    "path": "../public/assets/upload-HEkQZ-PG.js"
  },
  "/assets/useMutation-Ckb0Ry4t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-OWW2RE1eEu3HA2R6LI78ZIIBmsU"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 2211,
    "path": "../public/assets/useMutation-Ckb0Ry4t.js"
  },
  "/assets/user-plus-ChLv0IGO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-mDDqCozBgHW3zqtETmSfbIZWb6c"',
    "mtime": "2026-08-29T16:45:12.715Z",
    "size": 311,
    "path": "../public/assets/user-plus-ChLv0IGO.js"
  },
  "/assets/user-x-Y6UDlC1i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"412-bu2yXYjjrYBakTHoWUcDWDgyEUE"',
    "mtime": "2026-08-29T16:45:12.715Z",
    "size": 1042,
    "path": "../public/assets/user-x-Y6UDlC1i.js"
  },
  "/assets/users-nRkU_tCs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-rRqULb6xHSkipAP9Gk+TNZANu+o"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 307,
    "path": "../public/assets/users-nRkU_tCs.js"
  },
  "/assets/useSuspenseQuery-BHOwZoeh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-2U9pTDgdQzkBumtUUEpNi5A49J8"',
    "mtime": "2026-08-29T16:45:12.688Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-BHOwZoeh.js"
  },
  "/assets/utils-CWkn-cIW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-JMgyoRPaB7a6ucI3HOfyU7m0eAs"',
    "mtime": "2026-08-29T16:45:12.757Z",
    "size": 59982,
    "path": "../public/assets/utils-CWkn-cIW.js"
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
