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
  "/assets/about.functions-BeqWjKcN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32f2-sbQ7DUP6REc3vUfdYi3E1cwqlTQ"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 13042,
    "path": "../public/assets/about.functions-BeqWjKcN.js"
  },
  "/assets/account-DUz2Nt7M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-GQbltMKMdeCzLInRZv2K7hzfJe8"',
    "mtime": "2026-08-29T11:22:08.976Z",
    "size": 2068,
    "path": "../public/assets/account-DUz2Nt7M.js"
  },
  "/assets/admin-B9lmgwpF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c1-FjvbTU0OeyD+2XOs5sDFACH2/ig"',
    "mtime": "2026-08-29T11:22:08.976Z",
    "size": 2497,
    "path": "../public/assets/admin-B9lmgwpF.js"
  },
  "/assets/admin.about-CRiogHXZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11376-p7cIwfdPmA4oQA0Rp39wVFlrnYI"',
    "mtime": "2026-08-29T11:22:08.992Z",
    "size": 70518,
    "path": "../public/assets/admin.about-CRiogHXZ.js"
  },
  "/assets/admin.categories-CdVLlF81.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5918-v1WnGERi+zBN/ufkKeaW/20VT+k"',
    "mtime": "2026-08-29T11:22:08.990Z",
    "size": 22808,
    "path": "../public/assets/admin.categories-CdVLlF81.js"
  },
  "/assets/admin.comments-wfaKs1aH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-5zai9+Wclna43FXVAOepNxLyrNI"',
    "mtime": "2026-08-29T11:22:08.990Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-wfaKs1aH.js"
  },
  "/assets/admin.destinations--fvYhCzB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26ba-qjFw9JEqC0TxYv+k2A2szUOqeQE"',
    "mtime": "2026-08-29T11:22:08.990Z",
    "size": 9914,
    "path": "../public/assets/admin.destinations--fvYhCzB.js"
  },
  "/assets/admin.gallery-dLXW3SeY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56ba-Jb+yhGL0BlveVMiX/xL55g9r1wg"',
    "mtime": "2026-08-29T11:22:08.990Z",
    "size": 22202,
    "path": "../public/assets/admin.gallery-dLXW3SeY.js"
  },
  "/assets/admin.homepage-BOgWXzSW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d8f2-79Lf42xFi11kAYno3B/dPJYPO9Y"',
    "mtime": "2026-08-29T11:22:08.990Z",
    "size": 55538,
    "path": "../public/assets/admin.homepage-BOgWXzSW.js"
  },
  "/assets/admin.legal-CTsb6MQq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397f-32Yr2TQC1JpSWyXtZPDutflbpZQ"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 14719,
    "path": "../public/assets/admin.legal-CTsb6MQq.js"
  },
  "/assets/admin.index-Dh-hG0GT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-RpSz58ZZ5mo9viP7TuAVloMLzr8"',
    "mtime": "2026-08-29T11:22:08.976Z",
    "size": 4074,
    "path": "../public/assets/admin.index-Dh-hG0GT.js"
  },
  "/assets/admin.messages-CwGBF9pt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a9-iJBHrP5YhI2zAg7mb+h+ZOqARo8"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 4777,
    "path": "../public/assets/admin.messages-CwGBF9pt.js"
  },
  "/assets/admin.posts.index-wzeiefTS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a3-KpI/59EVxtjobt9o3pTo7V+KFKI"',
    "mtime": "2026-08-29T11:22:08.992Z",
    "size": 9635,
    "path": "../public/assets/admin.posts.index-wzeiefTS.js"
  },
  "/assets/admin.news-Db3Ag4uI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86b5-jyZKDM9iZRtd5PFJ9SuuAMm1k0c"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 34485,
    "path": "../public/assets/admin.news-Db3Ag4uI.js"
  },
  "/assets/admin.analytics-cke1QNTB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64266-Gl+4Eboxki3xHMw8IdZgepVvr2w"',
    "mtime": "2026-08-29T11:22:08.990Z",
    "size": 410214,
    "path": "../public/assets/admin.analytics-cke1QNTB.js"
  },
  "/assets/admin.posts.new-BBqoDudc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"320-+YZuoP3ae/WXQ2RocQyLgwYThl0"',
    "mtime": "2026-08-29T11:22:08.992Z",
    "size": 800,
    "path": "../public/assets/admin.posts.new-BBqoDudc.js"
  },
  "/assets/admin.posts._id-jAQw_Xr6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"455-zdeel/bXlcLyY/vjvGlsWJCP9WA"',
    "mtime": "2026-08-29T11:22:08.992Z",
    "size": 1109,
    "path": "../public/assets/admin.posts._id-jAQw_Xr6.js"
  },
  "/assets/admin.public-message-CmdjbES3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4cad-n/cCOiwwMOHP0vIhKmaTUAkec0Y"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 19629,
    "path": "../public/assets/admin.public-message-CmdjbES3.js"
  },
  "/assets/about-Cl_Qc2en.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"911f3-iXp0OY/IABqi66PLiW9h6scQFA8"',
    "mtime": "2026-08-29T11:22:08.994Z",
    "size": 594419,
    "path": "../public/assets/about-Cl_Qc2en.js"
  },
  "/assets/admin.subscribers-CO7kGsFM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2baf-fpnASTpEOMBwNJAhD15PP5ZDKs0"',
    "mtime": "2026-08-29T11:22:08.976Z",
    "size": 11183,
    "path": "../public/assets/admin.subscribers-CO7kGsFM.js"
  },
  "/assets/admin.settings-CRUW7dgL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dd4-ZFM2vyAf4LuY+awXwAnhHi0/R/w"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 15828,
    "path": "../public/assets/admin.settings-CRUW7dgL.js"
  },
  "/assets/AdSlot-xSBTC3iP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-cvV7KKWLtbhrv5yD/HR8q9LQUdA"',
    "mtime": "2026-08-29T11:22:08.973Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-xSBTC3iP.js"
  },
  "/assets/arrow-left-CxxOHTgi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-oQ98J+aK14YT9uIF1FGFwgpijjY"',
    "mtime": "2026-08-29T11:22:08.976Z",
    "size": 166,
    "path": "../public/assets/arrow-left-CxxOHTgi.js"
  },
  "/assets/alert-dialog-BodJBTY6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-MbLw3t585Lor5vFJeQRNTF2y//A"',
    "mtime": "2026-08-29T11:22:08.988Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-BodJBTY6.js"
  },
  "/assets/arrow-up-right-BN_ebUZf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-fcVQZ7jmXUarBrWIxhtOia2T3ig"',
    "mtime": "2026-08-29T11:22:08.984Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-BN_ebUZf.js"
  },
  "/assets/auth-Bru6EdzB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-64DIH5juqOF74AORl5wcBnKznM4"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 7644,
    "path": "../public/assets/auth-Bru6EdzB.js"
  },
  "/assets/blog-Ba8wsEzC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-pu0ITMjyi6fmY4PQ/e5RJbkr4yU"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 103,
    "path": "../public/assets/blog-Ba8wsEzC.js"
  },
  "/assets/blog.index-yIb2XfNP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2791-Al7sS/5yssNByIlk6ix8jgITxes"',
    "mtime": "2026-08-29T11:22:08.973Z",
    "size": 10129,
    "path": "../public/assets/blog.index-yIb2XfNP.js"
  },
  "/assets/blog._slug-9-0tv561.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-+zvmtdBZ8eawW45ux8pNuiJz358"',
    "mtime": "2026-08-29T11:22:08.975Z",
    "size": 572,
    "path": "../public/assets/blog._slug-9-0tv561.js"
  },
  "/assets/blog._slug-DTjjy1WQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf8-/+0yIJG0AD/Kwi/TLRtCX3d3TYg"',
    "mtime": "2026-08-29T11:22:08.975Z",
    "size": 27640,
    "path": "../public/assets/blog._slug-DTjjy1WQ.js"
  },
  "/assets/book-open-DrGGQICi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-KS3DPuack3c0e/cUE+LfVAUhvoA"',
    "mtime": "2026-08-29T11:22:08.971Z",
    "size": 280,
    "path": "../public/assets/book-open-DrGGQICi.js"
  },
  "/assets/calendar-C8ixHzQa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-xGP+Jxcd8GUUBjnGwLS44OOMJwY"',
    "mtime": "2026-08-29T11:22:08.984Z",
    "size": 258,
    "path": "../public/assets/calendar-C8ixHzQa.js"
  },
  "/assets/category._slug-CeyNuGGm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f10-X7PplVXHXBnekLaZfUaXefielF4"',
    "mtime": "2026-08-29T11:22:08.971Z",
    "size": 3856,
    "path": "../public/assets/category._slug-CeyNuGGm.js"
  },
  "/assets/chart-column-yZpV8BGM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-ZqXByLH4lbXMp//6eerYP9Y6GvQ"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 252,
    "path": "../public/assets/chart-column-yZpV8BGM.js"
  },
  "/assets/check-C7slzTnc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-WGte3+c04RDipLBVx1Fj9alkBNo"',
    "mtime": "2026-08-29T11:22:08.984Z",
    "size": 125,
    "path": "../public/assets/check-C7slzTnc.js"
  },
  "/assets/chevron-down-afK-qi_D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-oA13Rg1Cm+Plu9KNI79oOQ6IZho"',
    "mtime": "2026-08-29T11:22:08.984Z",
    "size": 129,
    "path": "../public/assets/chevron-down-afK-qi_D.js"
  },
  "/assets/chevron-left-bWb1AJjk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-8bQbRvQyC4rs+sOb+7WiW4SBGUw"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 131,
    "path": "../public/assets/chevron-left-bWb1AJjk.js"
  },
  "/assets/chevron-right-CsAsifVz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-e3jJaVhxeJUZhRptsstd9qSbysA"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 131,
    "path": "../public/assets/chevron-right-CsAsifVz.js"
  },
  "/assets/circle-check-Bxk2uCxE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-HAWOWLD8I7eHr9FVhrdKhy9QmpQ"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 179,
    "path": "../public/assets/circle-check-Bxk2uCxE.js"
  },
  "/assets/clock-BKvxCfC5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-dEwimd2dEXzlfB68WFxCwAUZ7Rc"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 170,
    "path": "../public/assets/clock-BKvxCfC5.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-29T11:22:08.988Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-DhWdyLn2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-YqJ2mzM/F0Ci7hIshY+ZotyawKE"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 252,
    "path": "../public/assets/compass-DhWdyLn2.js"
  },
  "/assets/contact-CmWNcrJk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a0a-yPOOpnnfpnUstEJpkivDQ35aIF0"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 14858,
    "path": "../public/assets/contact-CmWNcrJk.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-O2LxLrrN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-G18Eue+Tnjx2YFUhMAkEptfb+P4"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 103,
    "path": "../public/assets/destinations-O2LxLrrN.js"
  },
  "/assets/destinations.index-C9RsppGo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1437-wYk45V1j9jGQHkVxPdSmo7Aj0+s"',
    "mtime": "2026-08-29T11:22:08.973Z",
    "size": 5175,
    "path": "../public/assets/destinations.index-C9RsppGo.js"
  },
  "/assets/destinations._slug-DExRcVbJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-C3nZeOOsf3bI2GlXSls+42G83lM"',
    "mtime": "2026-08-29T11:22:08.973Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DExRcVbJ.js"
  },
  "/assets/destinations._slug-JgOjCZkQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cea-Wq8GXoHphsPuKlhuXl6cJOrhi8E"',
    "mtime": "2026-08-29T11:22:08.973Z",
    "size": 7402,
    "path": "../public/assets/destinations._slug-JgOjCZkQ.js"
  },
  "/assets/DestinationsMap-CWY36T16.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1023-Fo/IfKnxE1ih6nTn9+lvnhaMUu0"',
    "mtime": "2026-08-29T11:22:08.992Z",
    "size": 4131,
    "path": "../public/assets/DestinationsMap-CWY36T16.js"
  },
  "/assets/dialog-D4eEBpK_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-F2uva64jev0UvcHm4/EmvH7rjSQ"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 1830,
    "path": "../public/assets/dialog-D4eEBpK_.js"
  },
  "/assets/disclaimer-D9E7QqCw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"706-mZAgvWMERszrgh656ymHTP+Imzg"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 1798,
    "path": "../public/assets/disclaimer-D9E7QqCw.js"
  },
  "/assets/earth-BtGsxCbL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-zIPtg1uCycKfo+BaAWOl4HWXbEE"',
    "mtime": "2026-08-29T11:22:08.971Z",
    "size": 394,
    "path": "../public/assets/earth-BtGsxCbL.js"
  },
  "/assets/external-link-DROspBCW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-4kwt+UYpYwX/PxH3lDyMWkRraYk"',
    "mtime": "2026-08-29T11:22:08.985Z",
    "size": 252,
    "path": "../public/assets/external-link-DROspBCW.js"
  },
  "/assets/eye-BW8KFv6E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-PzIK6U9Pt2uGrzpXgNDg76VrdXc"',
    "mtime": "2026-08-29T11:22:08.985Z",
    "size": 257,
    "path": "../public/assets/eye-BW8KFv6E.js"
  },
  "/assets/eye-off-DCPHZ1Gn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-dCzQ5T0tzfQbvy5J6Ogo4cGifPY"',
    "mtime": "2026-08-29T11:22:08.985Z",
    "size": 431,
    "path": "../public/assets/eye-off-DCPHZ1Gn.js"
  },
  "/assets/folder-tree-C88eiQP0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-P3r3y0RxMTzbU8UBTBdbAo9IVcI"',
    "mtime": "2026-08-29T11:22:08.985Z",
    "size": 480,
    "path": "../public/assets/folder-tree-C88eiQP0.js"
  },
  "/assets/flame-CQ8CQYye.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-WJWEWj/YvBpjEmhvq3LnZfr5jIo"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 200,
    "path": "../public/assets/flame-CQ8CQYye.js"
  },
  "/assets/gallery-BfH8eVjT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"189a-kkOqDM45KXlxpAYHcaf+G/t+Ne0"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 6298,
    "path": "../public/assets/gallery-BfH8eVjT.js"
  },
  "/assets/geocoding.functions-oOwJXypy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-1ldNFDnUDQnradrkaG0pzrB27po"',
    "mtime": "2026-08-29T11:22:08.992Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-oOwJXypy.js"
  },
  "/assets/grip-vertical-Bk62hRbk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-NJ4D45cKlehhN2XZegEIJH9T6+Y"',
    "mtime": "2026-08-29T11:22:08.985Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-Bk62hRbk.js"
  },
  "/assets/image-Bk4KC48z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-S2s4ywxaeClAoYbk2imrCxVDv4w"',
    "mtime": "2026-08-29T11:22:08.985Z",
    "size": 270,
    "path": "../public/assets/image-Bk4KC48z.js"
  },
  "/assets/key-round-DTcGXvZ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-TVDZIQPsnTaBR6EGa8HRUeHb71Q"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 356,
    "path": "../public/assets/key-round-DTcGXvZ7.js"
  },
  "/assets/index-B6ItZflj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a521-NV3G6uuLHAfJxQ4T63ZNgCHrRkM"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 173345,
    "path": "../public/assets/index-B6ItZflj.js"
  },
  "/assets/layers-BiX2tCu1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-Vh9qu6n2TgjNvXMIPHTjn18jUYQ"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 422,
    "path": "../public/assets/layers-BiX2tCu1.js"
  },
  "/assets/index--XSjd3Oo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-/GGOTBKfTeSas5jEXqRDBqKD70A"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 290228,
    "path": "../public/assets/index--XSjd3Oo.js"
  },
  "/assets/layout-dashboard-BPxCDmcH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"249-Gw4gYL68JkWp9SnIgHcCP6McBEo"',
    "mtime": "2026-08-29T11:22:08.976Z",
    "size": 585,
    "path": "../public/assets/layout-dashboard-BPxCDmcH.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/leaflet-src-Dl7lKJi4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-mSoJq40FTJa+oqMSASpkBCPehwM"',
    "mtime": "2026-08-29T11:22:08.992Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Dl7lKJi4.js"
  },
  "/assets/index-BDn9uKC8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f025d-lk49VkWVwB9KkQjYbhHblnxaA5w"',
    "mtime": "2026-08-29T11:22:08.994Z",
    "size": 983645,
    "path": "../public/assets/index-BDn9uKC8.js"
  },
  "/assets/list-CoA_29Sq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-MVI+hcBx1C+lrBT6shMU+GdyZAc"',
    "mtime": "2026-08-29T11:22:08.985Z",
    "size": 303,
    "path": "../public/assets/list-CoA_29Sq.js"
  },
  "/assets/map-DlHbExYM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-LwS7qKufW3rr4lL9Y7OjARcoUdY"',
    "mtime": "2026-08-29T11:22:08.973Z",
    "size": 724,
    "path": "../public/assets/map-DlHbExYM.js"
  },
  "/assets/list-ordered-D-ArKS3J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-cjyuotISIzdr5+S/sNY7ERoJACw"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 644,
    "path": "../public/assets/list-ordered-D-ArKS3J.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-D-lUBV_F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-hH5r01S9fR2bR/OBm7FumKbsVec"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 239,
    "path": "../public/assets/maximize-2-D-lUBV_F.js"
  },
  "/assets/message-square-Dj24pmwA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-vjwq3FSqE2J+tA4nB2Mn7FpoGOc"',
    "mtime": "2026-08-29T11:22:08.976Z",
    "size": 234,
    "path": "../public/assets/message-square-Dj24pmwA.js"
  },
  "/assets/mountain-DAwq2mhK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-nCcB/E21P9nZQdwHWBUnFsueuHY"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 377,
    "path": "../public/assets/mountain-DAwq2mhK.js"
  },
  "/assets/navigation-Be1F9jAr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-sVVSuXxF8WA1GlSm88crfg63pP8"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 149,
    "path": "../public/assets/navigation-Be1F9jAr.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-29T11:22:08.932Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-sjNAocID.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-YTFAWPh6gNM5sQXR+0pWSXat6y0"',
    "mtime": "2026-08-29T11:22:08.971Z",
    "size": 974,
    "path": "../public/assets/news._slug-sjNAocID.js"
  },
  "/assets/news._slug-Ddcy7od5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-8Iiimrq9gKkDcOd/cYiRcTPjxGY"',
    "mtime": "2026-08-29T11:22:08.971Z",
    "size": 4524,
    "path": "../public/assets/news._slug-Ddcy7od5.js"
  },
  "/assets/PageBreadcrumbs-By-pUVrF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-cF/8ubvQ0ghA1WhyLaRXlMZlaAU"',
    "mtime": "2026-08-29T11:22:08.976Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-By-pUVrF.js"
  },
  "/assets/pen-line-BBMLrWAF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-9Qgc9HmTPiIglUvHOd9OSvAuaz4"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 1022,
    "path": "../public/assets/pen-line-BBMLrWAF.js"
  },
  "/assets/pencil-BJDPgv5a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-uj/LUNr7uFvRj6NOg8oEwQBYUhs"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 277,
    "path": "../public/assets/pencil-BJDPgv5a.js"
  },
  "/assets/plus-CMpessYB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-olN7UXGfGDRHWtT3JkPxZhda9rA"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 154,
    "path": "../public/assets/plus-CMpessYB.js"
  },
  "/assets/PostCard-m8k_fco3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-a3NcDyhpQ4z8FAQh9X2XWjw2noc"',
    "mtime": "2026-08-29T11:22:08.975Z",
    "size": 3935,
    "path": "../public/assets/PostCard-m8k_fco3.js"
  },
  "/assets/PostEditor-DHPX1cua.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd2a-8r+opQPbLMcNJRYtmKv15K8VOv4"',
    "mtime": "2026-08-29T11:22:08.992Z",
    "size": 48426,
    "path": "../public/assets/PostEditor-DHPX1cua.js"
  },
  "/assets/power-BDxz93_f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-N4Iv7SqYO/5TcAF8IZjztQowOkg"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 174,
    "path": "../public/assets/power-BDxz93_f.js"
  },
  "/assets/privacy-policy-BFcdTzak.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70a-LJhoXJe9D4OxUIjxb7OXj7yTeOI"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 1802,
    "path": "../public/assets/privacy-policy-BFcdTzak.js"
  },
  "/assets/quote-D1tRfIkt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-tGLByN+rLrtRAyB6bIFHE/RrUiI"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 390,
    "path": "../public/assets/quote-D1tRfIkt.js"
  },
  "/assets/radio-CjjoDGjs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-W9ZI2vqEl5aGa6xqNzhPAqPOpEo"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 375,
    "path": "../public/assets/radio-CjjoDGjs.js"
  },
  "/assets/refresh-cw-BDO1zyEZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-mxjQIpZ4oR72iMcVaT0spYtiPEo"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-BDO1zyEZ.js"
  },
  "/assets/rocket-DCvwWQ6-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"75b-7xu1Wj9dIVHnGQjjzqEV+DCMEeo"',
    "mtime": "2026-08-29T11:22:08.984Z",
    "size": 1883,
    "path": "../public/assets/rocket-DCvwWQ6-.js"
  },
  "/assets/rotate-ccw-awQKIfnD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-DPeD5BP1nDyzz2qihCrkcJ8vm6A"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-awQKIfnD.js"
  },
  "/assets/route-7uXu7yGM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-fQGJHgnfQ72ZVz9YCLP68THSBa4"',
    "mtime": "2026-08-29T11:22:08.971Z",
    "size": 543,
    "path": "../public/assets/route-7uXu7yGM.js"
  },
  "/assets/route-CUmVWbiW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-sDHOKPQZD3DO4ctqCrfS7Ous6gM"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 95,
    "path": "../public/assets/route-CUmVWbiW.js"
  },
  "/assets/scale-DwUiqvY5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-PAGM29lVmwuaHxVidhJjxBheOqA"',
    "mtime": "2026-08-29T11:22:08.980Z",
    "size": 333,
    "path": "../public/assets/scale-DwUiqvY5.js"
  },
  "/assets/settings-DtE7jv-w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-W8/VTXjoqwXQeR/t6hz9ugTYr6E"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 488,
    "path": "../public/assets/settings-DtE7jv-w.js"
  },
  "/assets/save-oQ1EVjBz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-lg5nRTBcoRFJBE2pvVxpc7TyPW4"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 328,
    "path": "../public/assets/save-oQ1EVjBz.js"
  },
  "/assets/share-2-C7pdRwuk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-h3I1odqU26Icl81J+/KOLsJenoA"',
    "mtime": "2026-08-29T11:22:08.986Z",
    "size": 358,
    "path": "../public/assets/share-2-C7pdRwuk.js"
  },
  "/assets/shield-alert-DueTQoC8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-i8YxLQBuf6I9uCuth1IQ4VQBSaI"',
    "mtime": "2026-08-29T11:22:08.971Z",
    "size": 668,
    "path": "../public/assets/shield-alert-DueTQoC8.js"
  },
  "/assets/shield-BHqfGpLS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-ealpP5O9+i0JHrxMuKu185lxjLg"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 273,
    "path": "../public/assets/shield-BHqfGpLS.js"
  },
  "/assets/shield-check-DaMEPKyj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-6se4LdIawc3ML6SdpxYsTPMV7NA"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 321,
    "path": "../public/assets/shield-check-DaMEPKyj.js"
  },
  "/assets/sliders-horizontal-hLoy59gu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-bMG87hf/Jplik4dSbAPxkvTNrBA"',
    "mtime": "2026-08-29T11:22:08.973Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-hLoy59gu.js"
  },
  "/assets/star-BqlOE5rh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-LRroNBf/U+xWp+9bz8tC1TGJmrw"',
    "mtime": "2026-08-29T11:22:08.988Z",
    "size": 473,
    "path": "../public/assets/star-BqlOE5rh.js"
  },
  "/assets/topics._slug-D4ZsVWvc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-Kpy+rKXrgZVzisdJfO1MU1OXYxk"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 2165,
    "path": "../public/assets/topics._slug-D4ZsVWvc.js"
  },
  "/assets/TranslatedMarkdown-BpHtQFgm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-bUpP3kTiiJv/NOeftIKCg1PfxG0"',
    "mtime": "2026-08-29T11:22:08.971Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-BpHtQFgm.js"
  },
  "/assets/styles-8glo1mRw.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2d9a4-JUOEzfLGfr+f8Tz02GyOjTcLo2Y"',
    "mtime": "2026-08-29T11:22:08.969Z",
    "size": 186788,
    "path": "../public/assets/styles-8glo1mRw.css"
  },
  "/assets/trash-2-CJV1tbZK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-pw3jjilGmlza0AYGp8oQPnM5RbE"',
    "mtime": "2026-08-29T11:22:08.988Z",
    "size": 329,
    "path": "../public/assets/trash-2-CJV1tbZK.js"
  },
  "/assets/trending-up-2DDwBrza.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-FtnOsy159z1W3zeveF98aBQ4mJA"',
    "mtime": "2026-08-29T11:22:08.982Z",
    "size": 932,
    "path": "../public/assets/trending-up-2DDwBrza.js"
  },
  "/assets/triangle-alert-nFI_1pky.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-F3N+Cx863snbRinf6Znnk/CFHBE"',
    "mtime": "2026-08-29T11:22:08.984Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-nFI_1pky.js"
  },
  "/assets/upload-Bybiw3A0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-SkAGaNvZDE2cx6k57GbO2uu1Obk"',
    "mtime": "2026-08-29T11:22:08.988Z",
    "size": 231,
    "path": "../public/assets/upload-Bybiw3A0.js"
  },
  "/assets/useMutation-BcSt_lfX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-4XTN+HZ3kpvCO3/3pa07iUvnyb0"',
    "mtime": "2026-08-29T11:22:08.990Z",
    "size": 2211,
    "path": "../public/assets/useMutation-BcSt_lfX.js"
  },
  "/assets/user-x-DH08ngUs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"412-mvz9IrfdpKD2b/HRfUiRglTMGvg"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 1042,
    "path": "../public/assets/user-x-DH08ngUs.js"
  },
  "/assets/user-plus-B583mTK7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-3U7DD5nNWefz4KlIkCfP5pw3xDA"',
    "mtime": "2026-08-29T11:22:08.978Z",
    "size": 311,
    "path": "../public/assets/user-plus-B583mTK7.js"
  },
  "/assets/users-9whkOgUQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-3KMuKRh3j/u8mKLvfbKspIep/o4"',
    "mtime": "2026-08-29T11:22:08.988Z",
    "size": 307,
    "path": "../public/assets/users-9whkOgUQ.js"
  },
  "/assets/useSuspenseQuery-BIz9yRnF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-YfFZQZ6vLDhdFMawiEQAsZFxqUw"',
    "mtime": "2026-08-29T11:22:08.973Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-BIz9yRnF.js"
  },
  "/assets/utils-CDP8Ga4Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-+zEYzg8kLJdqK1sDmiOJFaby3+M"',
    "mtime": "2026-08-29T11:22:08.988Z",
    "size": 59982,
    "path": "../public/assets/utils-CDP8Ga4Q.js"
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
