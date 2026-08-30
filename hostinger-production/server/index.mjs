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
  },
  "/assets/about.functions-C74ow_AO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31f9-mCioQNLtbkteyYp0QS3rureu7Ss"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 12793,
    "path": "../public/assets/about.functions-C74ow_AO.js"
  },
  "/assets/account-BvIVgvVE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"80f-jlsySs8iwsWzEbfP+UwSmaUf5Uc"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 2063,
    "path": "../public/assets/account-BvIVgvVE.js"
  },
  "/assets/admin-DrjvWCI7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9ff-/6MKUFXvWmbc4iy0XVT+jcNX/7M"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 2559,
    "path": "../public/assets/admin-DrjvWCI7.js"
  },
  "/assets/admin.categories-BJ5xq75_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5de0-y5d7AGmTrN4b6r3AEa97pLmpWJE"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 24032,
    "path": "../public/assets/admin.categories-BJ5xq75_.js"
  },
  "/assets/admin.comments-oOqy-OHM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"94b-pOKcHenPrl/FkaOf39jv0f4nLEo"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 2379,
    "path": "../public/assets/admin.comments-oOqy-OHM.js"
  },
  "/assets/admin.about-CZHNIuC1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1139e-EIxAJNWcZocT61J+YToqp4lmxwk"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 70558,
    "path": "../public/assets/admin.about-CZHNIuC1.js"
  },
  "/assets/admin.contact-D7WeF3L8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cb-PWh1gmkZqNopISdiT9noIorofH0"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 1739,
    "path": "../public/assets/admin.contact-D7WeF3L8.js"
  },
  "/assets/admin.destinations-BixKzas6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f38-eeUszNysZ91BQ8rR1VdrknaBSt0"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 20280,
    "path": "../public/assets/admin.destinations-BixKzas6.js"
  },
  "/assets/admin.gallery-Dw90ggY_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5d23-38r9FyP0OSa5OuNxVSBUT9KoI74"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 23843,
    "path": "../public/assets/admin.gallery-Dw90ggY_.js"
  },
  "/assets/admin.homepage-Clp64SNj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d924-eF8MpvlYTT9r+ilFpOoWeAnrkyc"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 55588,
    "path": "../public/assets/admin.homepage-Clp64SNj.js"
  },
  "/assets/admin.index-BJvy7GTf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-lEN7vBrzz1yyKqcrz0s0/sJT/7o"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 4074,
    "path": "../public/assets/admin.index-BJvy7GTf.js"
  },
  "/assets/admin.legal-B4p6D04m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39e8-dI3mgRyrsE0R9XnSLGiiAI7bsI4"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 14824,
    "path": "../public/assets/admin.legal-B4p6D04m.js"
  },
  "/assets/admin.analytics-v1CYZOLT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"642c4-xEO9YZT8WPW/LIujQYTe56hdfng"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 410308,
    "path": "../public/assets/admin.analytics-v1CYZOLT.js"
  },
  "/assets/admin.messages-BdCGGB69.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137a-REa1urtHqTCWYrgRC6QnZauK3jk"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 4986,
    "path": "../public/assets/admin.messages-BdCGGB69.js"
  },
  "/assets/admin.news-dNqF340e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f0c-0TmkYK/Iitj5cQKcpTB3dgcyofY"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 36620,
    "path": "../public/assets/admin.news-dNqF340e.js"
  },
  "/assets/about-JvDJQT0e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91226-TiECCKjFw24EmpeE8Y0hNRzCURI"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 594470,
    "path": "../public/assets/about-JvDJQT0e.js"
  },
  "/assets/admin.posts.new-DgW8BzNi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38d-sy59iNQQwluFbAo75yhoehZFgl4"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 909,
    "path": "../public/assets/admin.posts.new-DgW8BzNi.js"
  },
  "/assets/admin.posts.index-C7qyqPK8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ec2-8+cOMbMDP39L+aUw+cZsYQ21vss"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 11970,
    "path": "../public/assets/admin.posts.index-C7qyqPK8.js"
  },
  "/assets/admin.posts._id-Dbje-CwF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4b7-7L8gINVt9z6LIQXDgEl2wsSeNqQ"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 1207,
    "path": "../public/assets/admin.posts._id-Dbje-CwF.js"
  },
  "/assets/admin.public-message-BUYCbN1U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"52fc-LZpZ0DxxIADegaA9ho8zbhJzjDc"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 21244,
    "path": "../public/assets/admin.public-message-BUYCbN1U.js"
  },
  "/assets/admin.settings-C3zcBuj7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"434d-CbL1tnoyaJxJG8f3MpiH5Zdz7XQ"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 17229,
    "path": "../public/assets/admin.settings-C3zcBuj7.js"
  },
  "/assets/admin.subscribers-DtHMEinE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c31-4xxLdAO0qJStOB2XQpyhCBhFeLg"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 11313,
    "path": "../public/assets/admin.subscribers-DtHMEinE.js"
  },
  "/assets/AdSlot-2_BVW5G3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-Pv6mT7/aEUABso+w5PTalsp9d7I"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-2_BVW5G3.js"
  },
  "/assets/alert-dialog-C6iVMDjf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-NJlSvclETpGQ/7lP2lF46gvZ/Js"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-C6iVMDjf.js"
  },
  "/assets/arrow-up-right-DIvj3n1R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-w1zYUDj6FhBSdpFmMxGt9UEE6QU"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-DIvj3n1R.js"
  },
  "/assets/arrow-left-DvBLX-qM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-F9VfgwKevCI0IHjc0ClaXULudVc"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 166,
    "path": "../public/assets/arrow-left-DvBLX-qM.js"
  },
  "/assets/blog-CeOy41UG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-Gr6e4YUponjsj7yu76dRHUHNSsg"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 103,
    "path": "../public/assets/blog-CeOy41UG.js"
  },
  "/assets/auth-k9DB7B0S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-KGgt+22hczSMd3JH6vUvjrVL9Dw"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 7644,
    "path": "../public/assets/auth-k9DB7B0S.js"
  },
  "/assets/blog._slug-b-rfVuI-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf3-OzeHR+dgaOMQjhZrImiRQRxMgmg"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 27635,
    "path": "../public/assets/blog._slug-b-rfVuI-.js"
  },
  "/assets/blog.index-C3V368Yi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27ee-d2V8OmhRKmuy4o96rWNy2XhvzIs"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 10222,
    "path": "../public/assets/blog.index-C3V368Yi.js"
  },
  "/assets/blog._slug-Di82qbLa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-1zOoV3LmoEiviRha9wTB0SGwjJ4"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 572,
    "path": "../public/assets/blog._slug-Di82qbLa.js"
  },
  "/assets/book-open-DQNMcRRT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-VC4o0THbJdG8jUjJ2Q2IGVryhG0"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 280,
    "path": "../public/assets/book-open-DQNMcRRT.js"
  },
  "/assets/calendar-C8JecpFa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-Vs6zzrT3gQBu1jmpUKF4XOuJd9g"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 258,
    "path": "../public/assets/calendar-C8JecpFa.js"
  },
  "/assets/category._slug-CzB2QaRq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-+oT1bADv4M6YpiY6g+bRNbxBjRg"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 3842,
    "path": "../public/assets/category._slug-CzB2QaRq.js"
  },
  "/assets/chart-column-CCtZXrOQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-tHYjDYX/SNJ+RFpnp/kK/wE4s88"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 252,
    "path": "../public/assets/chart-column-CCtZXrOQ.js"
  },
  "/assets/check-gRmeEnFf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-XLP8edWtwkNIK94v1Oit9gwySXg"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 125,
    "path": "../public/assets/check-gRmeEnFf.js"
  },
  "/assets/chevron-down-DRUef00y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-jAzJAC8kKL1bsg+OPm/t4c9KzX0"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 129,
    "path": "../public/assets/chevron-down-DRUef00y.js"
  },
  "/assets/chevron-left-Bi5KSke_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-jOW7Tkf5m9OM9Leb/Md4YwWtePA"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 131,
    "path": "../public/assets/chevron-left-Bi5KSke_.js"
  },
  "/assets/chevron-right-AXGABOQV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-Y0viaaiycME4tlkMI28LBb56xQc"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 131,
    "path": "../public/assets/chevron-right-AXGABOQV.js"
  },
  "/assets/circle-check-CgogeD0S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-BI9ST780DEZmlqM3e8kyC3ZZl2c"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 179,
    "path": "../public/assets/circle-check-CgogeD0S.js"
  },
  "/assets/circle-x-CnWdfcox.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0-v0dGRyRFROQaOELOiB15EOOQQ78"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 208,
    "path": "../public/assets/circle-x-CnWdfcox.js"
  },
  "/assets/clock-Be-HKl97.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-Mq6JfvcgA6V9D0IWelncwodUazo"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 170,
    "path": "../public/assets/clock-Be-HKl97.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-B1sARa9k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-ofpRgpsCNSPVWAqGe7Zyw3GyokQ"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 252,
    "path": "../public/assets/compass-B1sARa9k.js"
  },
  "/assets/contact-BhgS0EtC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3aac-wblbE8hRe+Mg9K/0FgRlYZFtKD4"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 15020,
    "path": "../public/assets/contact-BhgS0EtC.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-DJPKgyhW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-v+vRNHVrEUzH2qDDS1xne23xyvc"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 103,
    "path": "../public/assets/destinations-DJPKgyhW.js"
  },
  "/assets/destinations.index-C6SNL3bw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14f3-4Y7qhbHdeussp7d2zax6PIi8jRg"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 5363,
    "path": "../public/assets/destinations.index-C6SNL3bw.js"
  },
  "/assets/destinations._slug-BqxQ6W5z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26c-YgRK99oeKfgLl8P+x9fPnH61tf0"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 620,
    "path": "../public/assets/destinations._slug-BqxQ6W5z.js"
  },
  "/assets/destinations._slug-dfl4WkH5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c66-nvQU8htIDUZ5HhzzFbY9P9hJVEM"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 7270,
    "path": "../public/assets/destinations._slug-dfl4WkH5.js"
  },
  "/assets/DestinationsMap-B4OE2ymH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"124c-JhuFcBtZdp1ODz2eL6ylxABYOuI"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 4684,
    "path": "../public/assets/DestinationsMap-B4OE2ymH.js"
  },
  "/assets/dialog-CE9TY5VT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-El6r0IbYd1mKrwjfFotg2SCN1Dw"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 1830,
    "path": "../public/assets/dialog-CE9TY5VT.js"
  },
  "/assets/disclaimer--blg0cXx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"71c-O9mylsFVvsAXc7Pq2nsF8ZoBqVc"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 1820,
    "path": "../public/assets/disclaimer--blg0cXx.js"
  },
  "/assets/earth-DlRukRzV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-Yx/OEyKAh40MJ2aWBS5D76G1fpM"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 394,
    "path": "../public/assets/earth-DlRukRzV.js"
  },
  "/assets/external-link-Drb00nv_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-WQR4UnfIkZHtyYm2+0noXlWeP4A"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 252,
    "path": "../public/assets/external-link-Drb00nv_.js"
  },
  "/assets/eye-BqrjL3Zw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-oEuu6K0MtRf79sSCnrguApKiq/w"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 257,
    "path": "../public/assets/eye-BqrjL3Zw.js"
  },
  "/assets/eye-off-kjpn2v-G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-3ZNvEHqL4zMEQ0u1+f81jp8YiJ8"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 431,
    "path": "../public/assets/eye-off-kjpn2v-G.js"
  },
  "/assets/flame-DEa84cgv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-xSG2NePPrHJLi67forCnrEVfA48"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 200,
    "path": "../public/assets/flame-DEa84cgv.js"
  },
  "/assets/folder-tree-f2008sDT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-OSJhRqwKPUeTE2z2yxIDes2DEAA"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 480,
    "path": "../public/assets/folder-tree-f2008sDT.js"
  },
  "/assets/gallery-DfwIDtPW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18e5-/cByoz2kuGNEmjpctUZqHs97j1I"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 6373,
    "path": "../public/assets/gallery-DfwIDtPW.js"
  },
  "/assets/geocoding.functions-eP0HNucD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-FGSmBiiIGSG/SXz99D00IerAC/Y"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-eP0HNucD.js"
  },
  "/assets/grip-vertical-DoEWtL_I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-imseTRS8DQhjA5GeaZjQPQWDkWQ"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 724,
    "path": "../public/assets/grip-vertical-DoEWtL_I.js"
  },
  "/assets/HeroBannerManager-BB6EMnbE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b55-M4r8E6ww7i/rkd3WFTsXXiMd3Cc"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 11093,
    "path": "../public/assets/HeroBannerManager-BB6EMnbE.js"
  },
  "/assets/image-DOEpUE7Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-MFGGy74NGzzf4BadjaR3KSnxKUQ"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 270,
    "path": "../public/assets/image-DOEpUE7Q.js"
  },
  "/assets/image-off-TBmxrqMb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29f-FVg1d0xOTyjk2yPy49wpGboAKyQ"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 671,
    "path": "../public/assets/image-off-TBmxrqMb.js"
  },
  "/assets/index-C6kUcPoj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f0942-Dq3tW4jEOv5moO9FEb37G9LxiFc"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 985410,
    "path": "../public/assets/index-C6kUcPoj.js"
  },
  "/assets/key-round-BslWMBHK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-Nb0EkpEv8TdybdQSmB43abKhLcQ"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 356,
    "path": "../public/assets/key-round-BslWMBHK.js"
  },
  "/assets/index-CCEm1xrJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a4a6-0YxGAicUc6Ksr2EBE+IyynfZhHw"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 173222,
    "path": "../public/assets/index-CCEm1xrJ.js"
  },
  "/assets/layers-yZLhHWfC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-3pZJEpZiFltE9s6zBSxHDyVIP5c"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 422,
    "path": "../public/assets/layers-yZLhHWfC.js"
  },
  "/assets/layout-dashboard-CPhquzmJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"368-CZPzldKiuAs7G25f9lXPrW6pBls"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 872,
    "path": "../public/assets/layout-dashboard-CPhquzmJ.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-Dshnbuts.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-Vz2apI+7sf0ADorBfqFex/mXhhE"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 290228,
    "path": "../public/assets/index-Dshnbuts.js"
  },
  "/assets/list-De7qsSpG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-n+Qsz/m4YUFL+GjtcIRsmG1oB9k"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 303,
    "path": "../public/assets/list-De7qsSpG.js"
  },
  "/assets/list-ordered-BPpQBUdS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-L0uPvm9eH+Xzbx8iTX1G/i5oTAs"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 644,
    "path": "../public/assets/list-ordered-BPpQBUdS.js"
  },
  "/assets/leaflet-src-DEUs7gpY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-GS9ZZJgS2Bl5IspXzS/j6xSvLWg"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-DEUs7gpY.js"
  },
  "/assets/map-5_QevTSc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-ccmxn26/s/whwqIYcr55McjjOfg"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 724,
    "path": "../public/assets/map-5_QevTSc.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-CH87sDsi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-a/PC13iJOvnwgwiQiVr6O2V6LuU"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 239,
    "path": "../public/assets/maximize-2-CH87sDsi.js"
  },
  "/assets/message-square-CI5zpWO3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-zYHO2iX6+sqboLsdDDKQ1C8j8NQ"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 234,
    "path": "../public/assets/message-square-CI5zpWO3.js"
  },
  "/assets/mountain-CM8_5e2g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-o3PI/p3SZ3tyvmSANWheVd+ca9U"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 377,
    "path": "../public/assets/mountain-CM8_5e2g.js"
  },
  "/assets/navigation-LUG_0ukT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-5njgO43SpFpoAVKBk8aynlUcaZk"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 149,
    "path": "../public/assets/navigation-LUG_0ukT.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-C_OMuGDa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-byaKLIUTLPGGtJkKUBDw+Kn7L+s"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 4524,
    "path": "../public/assets/news._slug-C_OMuGDa.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-30T20:29:10.317Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-Dia_HXx4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-ZjOxArscvpU8NwZUv0x0IzNHnFM"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 974,
    "path": "../public/assets/news._slug-Dia_HXx4.js"
  },
  "/assets/PageBreadcrumbs-CT-0Zkq-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-j69GPbvkBbrgJl0Uq9QzQ36KxL8"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-CT-0Zkq-.js"
  },
  "/assets/pen-line-DjdLB8vy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-6IQadmfCnovW411FI2dAZmEk1QM"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 1022,
    "path": "../public/assets/pen-line-DjdLB8vy.js"
  },
  "/assets/pencil-BwJJQMOa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-z/nbGZxGrHhstUkVGPG5bCHUm8k"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 277,
    "path": "../public/assets/pencil-BwJJQMOa.js"
  },
  "/assets/plus-QdQTo1ZF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-Jfnlc+uWQE0hjMV3av0Gz0SxqD0"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 154,
    "path": "../public/assets/plus-QdQTo1ZF.js"
  },
  "/assets/PostCard-DRsyTUBq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed1-NRDjSFBOMHLfxqZh/sf0r0cLGQ4"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 3793,
    "path": "../public/assets/PostCard-DRsyTUBq.js"
  },
  "/assets/PostEditor-Broc_M0a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ecd2-rgBdpIYZKGJh/+dVcbxeAbPyFJI"',
    "mtime": "2026-08-30T20:29:10.358Z",
    "size": 60626,
    "path": "../public/assets/PostEditor-Broc_M0a.js"
  },
  "/assets/power-D25YjKMa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-SxiN63Arepm6poLxwH4kkpWSB4s"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 174,
    "path": "../public/assets/power-D25YjKMa.js"
  },
  "/assets/privacy-policy-zqwGkfYL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"720-fxUFCLDlyGLxmR3tGq6ix+PvCNo"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 1824,
    "path": "../public/assets/privacy-policy-zqwGkfYL.js"
  },
  "/assets/quote-D08fbf1y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-FGCFqnr0Jxri29fI31ZEn8k1fnY"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 390,
    "path": "../public/assets/quote-D08fbf1y.js"
  },
  "/assets/radio-D5xJxP83.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-qjo+tXamk/3jaxD45d+F5Wy1YZI"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 375,
    "path": "../public/assets/radio-D5xJxP83.js"
  },
  "/assets/refresh-cw-BY2I5KV1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-PbgmphlyuPmRV8u6sPLibeu9dD4"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-BY2I5KV1.js"
  },
  "/assets/rocket-fYiOZu-F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4ed-ijHcfUFIBTv35d+dXg3B8cEtgnA"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 1261,
    "path": "../public/assets/rocket-fYiOZu-F.js"
  },
  "/assets/route-Csm0HLka.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-yq8Q26/GMpPgis6N7uIsqE8bLM8"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 543,
    "path": "../public/assets/route-Csm0HLka.js"
  },
  "/assets/rotate-ccw-BUzhunzQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-t/NB5q4HcYe2Wa1Z5qcwOjRMx88"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-BUzhunzQ.js"
  },
  "/assets/route-mdpnlnjH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-SzEun7ZZISrJVvPSnQ59v2fJtY4"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 95,
    "path": "../public/assets/route-mdpnlnjH.js"
  },
  "/assets/save-cUOgnbRg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-MAxBngQuUDVpZ1OUpreYvdTXAAE"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 328,
    "path": "../public/assets/save-cUOgnbRg.js"
  },
  "/assets/scale-CrJTFG7w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-LJdp9+hDEnaNNqbbqDwl3Yz4Ahk"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 333,
    "path": "../public/assets/scale-CrJTFG7w.js"
  },
  "/assets/settings-De-R3WWo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-2rv5QQRDaysCpqHfr8v1TZUAySQ"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 488,
    "path": "../public/assets/settings-De-R3WWo.js"
  },
  "/assets/share-2-BZO9dQK3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-zYbieUKhT+NTJJ5m/08HK6F30p8"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 358,
    "path": "../public/assets/share-2-BZO9dQK3.js"
  },
  "/assets/shield-alert-DEU6WS6D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-yaBAO93xFJZ99b5fynCMaGkBv/A"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 668,
    "path": "../public/assets/shield-alert-DEU6WS6D.js"
  },
  "/assets/shield-check-DpZVQr0i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-RcZQiERe7rGoUgvqfzfNb7WoZUQ"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 321,
    "path": "../public/assets/shield-check-DpZVQr0i.js"
  },
  "/assets/shield-lEF69amb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-DRrjNrL4HCFwDg2EVujsq5YHLpY"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 273,
    "path": "../public/assets/shield-lEF69amb.js"
  },
  "/assets/sliders-horizontal-SjmHF5H7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-Xz/qWHDIM+pAsHPE32nE5DpgDL0"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-SjmHF5H7.js"
  },
  "/assets/star-DqrITBNA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-q1/ATkAt7aAPVaarfiYVXmDeM7k"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 473,
    "path": "../public/assets/star-DqrITBNA.js"
  },
  "/assets/topics._slug-Bh8iqueH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f5-By6FfpcsL8ZM3IIQbNB/ruvwHbI"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 2293,
    "path": "../public/assets/topics._slug-Bh8iqueH.js"
  },
  "/assets/TranslatedMarkdown-CbIih3Tj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-2TMsT4N6lnW3+larrktqlEbWzvk"',
    "mtime": "2026-08-30T20:29:10.354Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-CbIih3Tj.js"
  },
  "/assets/trash-2-DWj84wvX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-GVErCcj9ObaWMG/WEX5D+/k0POg"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 329,
    "path": "../public/assets/trash-2-DWj84wvX.js"
  },
  "/assets/styles-lPBJtWFI.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2e5b2-bjzyfFy47cOcI0xzWow8ObzlFxo"',
    "mtime": "2026-08-30T20:29:10.353Z",
    "size": 189874,
    "path": "../public/assets/styles-lPBJtWFI.css"
  },
  "/assets/trending-up-OGm6WVrR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-EDZZyOcUqcnoOjFKHH18R9i+pHY"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 932,
    "path": "../public/assets/trending-up-OGm6WVrR.js"
  },
  "/assets/triangle-alert-DGYXQFtZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-vnNK5vpcfhEVkVBzxaI/cO0buHI"',
    "mtime": "2026-08-30T20:29:10.356Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-DGYXQFtZ.js"
  },
  "/assets/upload-DW-Kn0iA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-1AU090Re8XBx73m2Lg+NvqwA3EE"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 231,
    "path": "../public/assets/upload-DW-Kn0iA.js"
  },
  "/assets/useMutation-MOLrffh3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-XIk8+ll9QfU4CSmHZkBYWdRx1Ns"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 2211,
    "path": "../public/assets/useMutation-MOLrffh3.js"
  },
  "/assets/user-plus-BUiyuOXy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-9xsBn3KTC8Ce4ABsY0w8/tYNMwk"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 311,
    "path": "../public/assets/user-plus-BUiyuOXy.js"
  },
  "/assets/users-BK8MqyDb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-//zR4HCZ6DdaIvMzleC9Vme6dQU"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 307,
    "path": "../public/assets/users-BK8MqyDb.js"
  },
  "/assets/useSuspenseQuery-ueRtR2Jt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-Uv0DrOP/2Sn+9Irs3Jh3cgjaK4o"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-ueRtR2Jt.js"
  },
  "/assets/utils-PPHmuekp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-Tn4N79u/78fRQ+CbgwLwtZ5tZ9M"',
    "mtime": "2026-08-30T20:29:10.357Z",
    "size": 59982,
    "path": "../public/assets/utils-PPHmuekp.js"
  },
  "/assets/user-x-ZV15d9Ux.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"373-Wwf1DCb6axpNuKwC5pXqB5nZWIw"',
    "mtime": "2026-08-30T20:29:10.355Z",
    "size": 883,
    "path": "../public/assets/user-x-ZV15d9Ux.js"
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
