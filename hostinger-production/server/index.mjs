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
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-08-05T07:31:30.811Z",
    "size": 23,
    "path": "../public/robots.txt"
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
  "/assets/about.functions-BRrLeLVv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31f9-wplZrnFmw1uL3IoAr3mgdZWBBbU"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 12793,
    "path": "../public/assets/about.functions-BRrLeLVv.js"
  },
  "/assets/account-DFcUyjec.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-QW5fGaHHtZtx/Z6oR8y80DAhaOI"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 2068,
    "path": "../public/assets/account-DFcUyjec.js"
  },
  "/assets/admin-BDaz6GgZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9ff-+9ztr96Bmo9tBobC8DRLxS9V0xk"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 2559,
    "path": "../public/assets/admin-BDaz6GgZ.js"
  },
  "/assets/admin.about-BDxsekEW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1139e-FZ2CfBL6Pxk2UUZK0+iZHUWYlnk"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 70558,
    "path": "../public/assets/admin.about-BDxsekEW.js"
  },
  "/assets/admin.categories-HNU3OuCP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5de0-HPMODkjxbNkkly2x7zjfm/L56m4"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 24032,
    "path": "../public/assets/admin.categories-HNU3OuCP.js"
  },
  "/assets/admin.comments-4Gk7U4Uo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"94b-Nz0D5l9vjfMuHaXTeNM7N9OjOcg"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 2379,
    "path": "../public/assets/admin.comments-4Gk7U4Uo.js"
  },
  "/assets/admin.contact-DPz89dKF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cb-s/KCmpCoQy7QZ3tXgDVWJqUIcjw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 1739,
    "path": "../public/assets/admin.contact-DPz89dKF.js"
  },
  "/assets/admin.analytics-XGb3lR2S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"642c4-+9R8+PG4/8admrsG1yFGCoJGBgM"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 410308,
    "path": "../public/assets/admin.analytics-XGb3lR2S.js"
  },
  "/assets/admin.destinations-CbZ_93ZT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f38-syB09gHDWHRM6LeyL465n5V/Cq8"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 20280,
    "path": "../public/assets/admin.destinations-CbZ_93ZT.js"
  },
  "/assets/admin.gallery-CGPgBRRa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8fb3-Aorh0wA9Ev/NIrvaBw9P/4dyX04"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 36787,
    "path": "../public/assets/admin.gallery-CGPgBRRa.js"
  },
  "/assets/admin.homepage-svB2ejD5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d94a-W1wzQtrx5bh55mNIBUplRcCP2zI"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 55626,
    "path": "../public/assets/admin.homepage-svB2ejD5.js"
  },
  "/assets/admin.index-_laeaCXu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-D2F4vba/lLpZfSH3yA+17vj4lJ0"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 4074,
    "path": "../public/assets/admin.index-_laeaCXu.js"
  },
  "/assets/admin.legal-OM7SGs9V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39e8-miFQkcWJ4KXXUZdHlY6KRcEx8Rk"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 14824,
    "path": "../public/assets/admin.legal-OM7SGs9V.js"
  },
  "/assets/admin.messages-BPMayGvZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137a-5TmGy/my7/3KLkOM62wSsDCJPso"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 4986,
    "path": "../public/assets/admin.messages-BPMayGvZ.js"
  },
  "/assets/admin.news-CXmTLlZU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f0c-xt4158cd8x02qmGjBPK6zkZ1Ujc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 36620,
    "path": "../public/assets/admin.news-CXmTLlZU.js"
  },
  "/assets/about-Cihf6DcY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91177-o3yn5/SVrClOjicvOXqpPXR0nwM"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 594295,
    "path": "../public/assets/about-Cihf6DcY.js"
  },
  "/assets/admin.posts.index-DFgwGTe3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ec2-cRmzn+UnzG0YrnXrl/iQP0To65o"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 11970,
    "path": "../public/assets/admin.posts.index-DFgwGTe3.js"
  },
  "/assets/admin.posts.new-DRxPkewT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38b-ePQWLbirwXcJutJmxNCqu7gtXHs"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 907,
    "path": "../public/assets/admin.posts.new-DRxPkewT.js"
  },
  "/assets/admin.posts._id-FiAukz5k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4b0-dOy8QRdZEnRDXVQNy5Ad9h9nTqA"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 1200,
    "path": "../public/assets/admin.posts._id-FiAukz5k.js"
  },
  "/assets/admin.public-message-DW5k6m9G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5301-/ovmlRX3mCzuqmtDXsx1X5iKgjY"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 21249,
    "path": "../public/assets/admin.public-message-DW5k6m9G.js"
  },
  "/assets/admin.settings-Y5cGqn6j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"434d-8AlGlOJrUKZ7ccqX//XOVLhv0jY"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 17229,
    "path": "../public/assets/admin.settings-Y5cGqn6j.js"
  },
  "/assets/admin.subscribers-mxqbZv-p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c31-DZiL9ns6nVvdjX9jI95yX2FRmpQ"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 11313,
    "path": "../public/assets/admin.subscribers-mxqbZv-p.js"
  },
  "/assets/AdSlot-D9Aoi5Sv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-2mMvIWkHYpOM8qrIKDKyf/ZyYOw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-D9Aoi5Sv.js"
  },
  "/assets/alert-dialog-DMfcVN_L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-mxdq5m8N4FfdEsum4aNeLXfAfB0"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-DMfcVN_L.js"
  },
  "/assets/arrow-left--dV7hO50.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-78ukosrQ70FiVzdRIGTAMW3+EgQ"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 166,
    "path": "../public/assets/arrow-left--dV7hO50.js"
  },
  "/assets/arrow-up-right-DS3RlBU0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-IPdZkJAtyAVT7tn3E0/zq9kAwbA"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-DS3RlBU0.js"
  },
  "/assets/auth-V2Dt9wej.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-hCXCuK+FmLTc6Eq2LPIqidHnZAw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 7644,
    "path": "../public/assets/auth-V2Dt9wej.js"
  },
  "/assets/blog-BVfreWOc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-1Udu7REsZrQtwi65ulFrE42Kmp4"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 103,
    "path": "../public/assets/blog-BVfreWOc.js"
  },
  "/assets/blog.index-C-tfnK9m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27f3-QhrcYv02yloYu2A1FmRlgmUO8iw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 10227,
    "path": "../public/assets/blog.index-C-tfnK9m.js"
  },
  "/assets/blog._slug-ClSs-wMN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf3-mQU5qkyV7YJLT0eEJxx41nw/p1Q"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 27635,
    "path": "../public/assets/blog._slug-ClSs-wMN.js"
  },
  "/assets/book-open-UyQt8tZw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-tyamb9/GlzeGWQ24llk2pv4I5ns"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 280,
    "path": "../public/assets/book-open-UyQt8tZw.js"
  },
  "/assets/calendar-ST2XK-di.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-Qs+jG2ZMhjpXokEL/QT7NmdiYbA"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 258,
    "path": "../public/assets/calendar-ST2XK-di.js"
  },
  "/assets/camera-HnGfKB4Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"151-XtxWx8H6hVacldwL37QaCU0L24g"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 337,
    "path": "../public/assets/camera-HnGfKB4Z.js"
  },
  "/assets/blog._slug-BySUc5bl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-kqCvdb7Dh3LJpuzqm3pMiHolve8"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 572,
    "path": "../public/assets/blog._slug-BySUc5bl.js"
  },
  "/assets/chart-column-DTu7WwkG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-u8Iyse9GVj4q3FHX8o7jeoPKygM"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 252,
    "path": "../public/assets/chart-column-DTu7WwkG.js"
  },
  "/assets/category._slug-Bh1utQJq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-jdLnCqo5QSpONn53Nhan9zldTMc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 3842,
    "path": "../public/assets/category._slug-Bh1utQJq.js"
  },
  "/assets/check-Bw8pApGR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-BkBvTiXRGZoSxEgzm0ubT2PLpEs"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 125,
    "path": "../public/assets/check-Bw8pApGR.js"
  },
  "/assets/chevron-left-BIjGBqb_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-u8R8bVzPSDAEKETcbm/Rkt17gJo"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 131,
    "path": "../public/assets/chevron-left-BIjGBqb_.js"
  },
  "/assets/chevron-right--3soTxhZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-M7OT8aK0UNNDwZsBVsR0SRQ/zME"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 131,
    "path": "../public/assets/chevron-right--3soTxhZ.js"
  },
  "/assets/circle-check-Daqko_rl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-cEL+yJUaQAMx6oRmUsTfrQL+JEw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 179,
    "path": "../public/assets/circle-check-Daqko_rl.js"
  },
  "/assets/circle-x-eNXlwu_4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0-U13zXp8bJfX4elFvcuDcfVisskY"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 208,
    "path": "../public/assets/circle-x-eNXlwu_4.js"
  },
  "/assets/clock-D4hULBkM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-mPHQ33k2OLtzOi9OBR6/kYQ62AQ"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 170,
    "path": "../public/assets/clock-D4hULBkM.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-DMg2GCaY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-ZkeMi/Omn3T5O3SRBOpnQ9+oJBU"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 252,
    "path": "../public/assets/compass-DMg2GCaY.js"
  },
  "/assets/contact-Csi8wOQJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3aa7-MAik3f6q55/znMZbFuLqVwyuOLs"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 15015,
    "path": "../public/assets/contact-Csi8wOQJ.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-DzoFHnyu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-71s9al+uwcs1vcdVRmrdUY2uw1Y"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 103,
    "path": "../public/assets/destinations-DzoFHnyu.js"
  },
  "/assets/destinations.index-CFqFWGI7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14f3-kc6vk4LYZ80Ns4Cpfv1svBzhSKs"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 5363,
    "path": "../public/assets/destinations.index-CFqFWGI7.js"
  },
  "/assets/destinations._slug-BxnGK4Kb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c66-dGdGMe94P75CNulTD7OqSHmIYXg"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 7270,
    "path": "../public/assets/destinations._slug-BxnGK4Kb.js"
  },
  "/assets/destinations._slug-l1uxcOzP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-mY7l3xCp7xK6WsjLa0cx8uYxDNc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-l1uxcOzP.js"
  },
  "/assets/DestinationsMap-ZjxPRHkB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"124c-ULmx3/iqaiHTFv1pVpoSU6tZAtM"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 4684,
    "path": "../public/assets/DestinationsMap-ZjxPRHkB.js"
  },
  "/assets/dialog-CB-bgVHc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-UgnWduIzMf+J1hxJBPQOu/8Oxjs"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 1830,
    "path": "../public/assets/dialog-CB-bgVHc.js"
  },
  "/assets/disclaimer-FBJdKfmu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"71c-06S9dfF0EqM596eAeaD5kb7de7I"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 1820,
    "path": "../public/assets/disclaimer-FBJdKfmu.js"
  },
  "/assets/earth-DqY6FaYa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-Lo4lo3jZpLB79yAsdC08fgGG8xY"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 394,
    "path": "../public/assets/earth-DqY6FaYa.js"
  },
  "/assets/external-link-kiKkscOy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-8ADm+m0k76CXSE+JEbZRg6XIOvI"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 252,
    "path": "../public/assets/external-link-kiKkscOy.js"
  },
  "/assets/eye-By4pCNY9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-QSnW3T2+OsILUxBEyL8dNraf2/Y"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 257,
    "path": "../public/assets/eye-By4pCNY9.js"
  },
  "/assets/eye-off-qLinLwNf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-xuo9Jc2wkT6J5KK5YT5ClIGdeeE"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 431,
    "path": "../public/assets/eye-off-qLinLwNf.js"
  },
  "/assets/file-image-Dc8wIYyp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"191-YQEb8lDF98jw+NB2cROBsIFyH5w"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 401,
    "path": "../public/assets/file-image-Dc8wIYyp.js"
  },
  "/assets/flame-BTmnBZyA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-lvzdQSvJThftQVhrlsb9CMbP6sw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 200,
    "path": "../public/assets/flame-BTmnBZyA.js"
  },
  "/assets/folder-tree-CimK1dec.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-Lzc1AtbHtWAmJUWBlnt0yqdCwZo"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 480,
    "path": "../public/assets/folder-tree-CimK1dec.js"
  },
  "/assets/gallery-WQUXt8lE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1429-IvMTrrmyofxZG/eD8TDxEC/XCt4"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 5161,
    "path": "../public/assets/gallery-WQUXt8lE.js"
  },
  "/assets/gallery._slug-C6S95D_4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26c-NIgVDyDB12RQVFMpItl1e4q4f+8"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 620,
    "path": "../public/assets/gallery._slug-C6S95D_4.js"
  },
  "/assets/gallery._slug-h_GyLe1I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190e-Y9RaTR61PEE5QEdR8KbsIlL7Omg"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 6414,
    "path": "../public/assets/gallery._slug-h_GyLe1I.js"
  },
  "/assets/geocoding.functions-DelAmdCw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-NI1tIXtdD4UEpREL5y0D4UVgx1c"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-DelAmdCw.js"
  },
  "/assets/grip-vertical-71WXL09c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c4-Zzi4xh8H+/luakgt4Sf5a4h+QeM"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 452,
    "path": "../public/assets/grip-vertical-71WXL09c.js"
  },
  "/assets/HeroBannerManager-EJJT9jWP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b55-+BYXE6mc8cgrX0ij8ADcnkTWDwI"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 11093,
    "path": "../public/assets/HeroBannerManager-EJJT9jWP.js"
  },
  "/assets/image-Brd1yvNw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-INeugYEr4+vso+8JUU77PJlQoqQ"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 270,
    "path": "../public/assets/image-Brd1yvNw.js"
  },
  "/assets/image-off-BvsZsiCC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29f-S+MuxFq4Qlz4SAPgaqHForLaTCw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 671,
    "path": "../public/assets/image-off-BvsZsiCC.js"
  },
  "/assets/image-plus-Gp5lHKbg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16c-QHlamu+JLDSKOjz61G8SNd7Z+Ek"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 364,
    "path": "../public/assets/image-plus-Gp5lHKbg.js"
  },
  "/assets/index-C9hS_2ET.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2900d-4ie9N6ZsUXtmMnMB+QrSZ4+G/iE"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 167949,
    "path": "../public/assets/index-C9hS_2ET.js"
  },
  "/assets/key-round-vZjQ2jO_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-BH9l6QO3945qmSH2Dl9xg+r6Wxo"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 356,
    "path": "../public/assets/key-round-vZjQ2jO_.js"
  },
  "/assets/layers-DXWgMhF2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-i6QOnBR5RHXa8wVEWcPItf3HVWo"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 422,
    "path": "../public/assets/layers-DXWgMhF2.js"
  },
  "/assets/layout-dashboard-bkFfiLr-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"368-dQa5WEUCzu7PCzuHb2wBlojq1K8"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 872,
    "path": "../public/assets/layout-dashboard-bkFfiLr-.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-DGHYnqDH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-cDBs8QoAEW1GAvYLB1q1FiH5WRw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 290228,
    "path": "../public/assets/index-DGHYnqDH.js"
  },
  "/assets/list-IQMSdISn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-p0EK+AOStXXrA3EOsN8SVYF2PEw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 303,
    "path": "../public/assets/list-IQMSdISn.js"
  },
  "/assets/leaflet-src-v3314QA7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-9SLF1hHkpxBAs6mnl1+89SZhOec"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-v3314QA7.js"
  },
  "/assets/list-ordered-CfJchFwP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-OJpVTmEUhvvnYvBvUSCCSvMyPJg"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 644,
    "path": "../public/assets/list-ordered-CfJchFwP.js"
  },
  "/assets/map-9_RzqFzf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-OmBIzJiCzG5V5uc36Eg3jSr77RU"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 724,
    "path": "../public/assets/map-9_RzqFzf.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-mbVB8PsG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-xn+4AY4RHOURrmsZTH0P/bKtQiM"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 239,
    "path": "../public/assets/maximize-2-mbVB8PsG.js"
  },
  "/assets/message-square-B70g2Y4H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-Btpf0fRTlmFoXTm240Y1VDKW0Sc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 234,
    "path": "../public/assets/message-square-B70g2Y4H.js"
  },
  "/assets/mountain-B9xkAb38.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-Gv78yYSljF6sP68/ciGDgRBb+pE"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 377,
    "path": "../public/assets/mountain-B9xkAb38.js"
  },
  "/assets/navigation-C5Wr_mWX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-v0Jwxu6awAf1WmGhTdIyYISwm9E"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 149,
    "path": "../public/assets/navigation-C5Wr_mWX.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-CqgTt-YK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-ttqPh0qBKirPD6KrJHfP34KBrNQ"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 974,
    "path": "../public/assets/news._slug-CqgTt-YK.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-30T21:20:44.832Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-HMlZymMz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-fL9/nvZMljyVrRkKNpb6FGqvfFc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 4524,
    "path": "../public/assets/news._slug-HMlZymMz.js"
  },
  "/assets/PageBreadcrumbs-BGPUMbX_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-dC3hzmcH/gytftI2ZFqt0B9OQaU"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-BGPUMbX_.js"
  },
  "/assets/pen-line-BLG7ySpm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-NZ4H6gh7IQln8seUwpfCVNTyh6Q"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 1022,
    "path": "../public/assets/pen-line-BLG7ySpm.js"
  },
  "/assets/index-BJCCSa1a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f141c-F4hUAEIF6kNfXyHwuQCQ+KsznYo"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 988188,
    "path": "../public/assets/index-BJCCSa1a.js"
  },
  "/assets/pencil-DPK9K1XA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-5EcfkeTvkxtrKzXm3GgYKoID58o"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 277,
    "path": "../public/assets/pencil-DPK9K1XA.js"
  },
  "/assets/plus-DMe5x1oG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-PUkSNLcfg/RzHc5fonT7nBqg2nc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 154,
    "path": "../public/assets/plus-DMe5x1oG.js"
  },
  "/assets/PostCard-DX_pWMsR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed1-DgmaqGW4AqtSqhf3YxDKCGWlyDA"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 3793,
    "path": "../public/assets/PostCard-DX_pWMsR.js"
  },
  "/assets/power-CFAUzsok.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-aqoUVSAcViqb9nqJQC75xds0/ME"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 174,
    "path": "../public/assets/power-CFAUzsok.js"
  },
  "/assets/PostEditor-K5gScn9v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ecd5-1HQGKOt7Sjd6s+XMTr1WAfMAnpY"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 60629,
    "path": "../public/assets/PostEditor-K5gScn9v.js"
  },
  "/assets/privacy-policy-CzbxLZPm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"720-NAT69ZcYF3e2OEH7fqf52AuPp/c"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 1824,
    "path": "../public/assets/privacy-policy-CzbxLZPm.js"
  },
  "/assets/quote-Djw4Oc38.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-dab+OO0E3Dwggpga/b6WLyb8WlU"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 390,
    "path": "../public/assets/quote-Djw4Oc38.js"
  },
  "/assets/radio-C5-4hSyU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-ZCYof5fj9gJFzS0r+zM1YGlZDHk"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 375,
    "path": "../public/assets/radio-C5-4hSyU.js"
  },
  "/assets/refresh-cw-Dki_-BOt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-BABTwc2CisKYXtQBeUQ7yP2KwJ4"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-Dki_-BOt.js"
  },
  "/assets/rocket-2IxbTbMV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b2-uN6k8gDiMZfDaJ7GdIoWuHwrm1Q"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 946,
    "path": "../public/assets/rocket-2IxbTbMV.js"
  },
  "/assets/rotate-ccw-CAxsuZfT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-Cm7hF8vm6R+712Erdx3/0a5r5u4"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-CAxsuZfT.js"
  },
  "/assets/route-B1QBQSuG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff-piro7lAvukZOfK46twP2tW04Oks"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 255,
    "path": "../public/assets/route-B1QBQSuG.js"
  },
  "/assets/route-C2VVo8Pf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-la/xmRroVmoBCPwSr3TtyGkz5Ig"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 95,
    "path": "../public/assets/route-C2VVo8Pf.js"
  },
  "/assets/save-BiH0KJ6u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-uz2Dso8eFKCWv8/WEAsNLYtrHjw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 328,
    "path": "../public/assets/save-BiH0KJ6u.js"
  },
  "/assets/scale-Df5wLtd9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-gAT1IjwPT2eJYbbbl7PrVX2kLwo"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 333,
    "path": "../public/assets/scale-Df5wLtd9.js"
  },
  "/assets/settings-BUgJu-fT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-TmcHl4jPFinnbhSuLlqbFQjE+xk"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 488,
    "path": "../public/assets/settings-BUgJu-fT.js"
  },
  "/assets/share-2-BosfO9j3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-tECh6DfNqpPhpeSmZaKwycwtczM"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 358,
    "path": "../public/assets/share-2-BosfO9j3.js"
  },
  "/assets/shield-alert-DznFbCd0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-FWLQ+oOCd7IDpVofkNR0F0drrtY"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 668,
    "path": "../public/assets/shield-alert-DznFbCd0.js"
  },
  "/assets/shield-B4PlnFGu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-h89ajoPMZd555bHZ4vlmwQJbY4s"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 273,
    "path": "../public/assets/shield-B4PlnFGu.js"
  },
  "/assets/shield-check-Dq7gDBQz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-ozSn5+7NZD5lU/sSn4J/pqCdIVc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 321,
    "path": "../public/assets/shield-check-Dq7gDBQz.js"
  },
  "/assets/sliders-horizontal-C_u0hKI4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-r3OB+BYzDUGszr6x1QEPtBy3KMw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-C_u0hKI4.js"
  },
  "/assets/star-DtmwMQ97.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-c74TjTIHrXxBNDdMOGqhTMTuyqw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 473,
    "path": "../public/assets/star-DtmwMQ97.js"
  },
  "/assets/styles-CGEP3iLw.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2edc4-G3gILdHrqfJ2FEMblOAavWs4NpY"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 191940,
    "path": "../public/assets/styles-CGEP3iLw.css"
  },
  "/assets/tag-BY5oOBu1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"147-Hcx0g5h15i2WGVWanKfim4elZuE"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 327,
    "path": "../public/assets/tag-BY5oOBu1.js"
  },
  "/assets/topics._slug-D4JLckeJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f5-fWmYV1cH0rhTSqkfzX/q3QwhQQc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 2293,
    "path": "../public/assets/topics._slug-D4JLckeJ.js"
  },
  "/assets/TranslatedMarkdown-CkHN9aiV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-PKYDQIwyVgIBIBJo1wfnZ/852j0"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-CkHN9aiV.js"
  },
  "/assets/trash-2-DPmAGEX6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-iZ01PhiIr1Xdh9hkq7Eb0oRnjFw"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 329,
    "path": "../public/assets/trash-2-DPmAGEX6.js"
  },
  "/assets/triangle-alert-DH9Fsr8g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-KZ4iG+VesrC7HdX3zc0mPA0XD20"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-DH9Fsr8g.js"
  },
  "/assets/trending-up-DDRUP-I5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-/JxHMjqOCtZvVn3QB3vMSci+SEc"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 932,
    "path": "../public/assets/trending-up-DDRUP-I5.js"
  },
  "/assets/upload-BT5SgMMk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-OkJ5e/mc9jbKqIGgxFu55a7OyDo"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 231,
    "path": "../public/assets/upload-BT5SgMMk.js"
  },
  "/assets/useMutation-C2KNcPjw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-kL4eYp8Qcr6z+Bc37oHsqxQEr2M"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 2211,
    "path": "../public/assets/useMutation-C2KNcPjw.js"
  },
  "/assets/user-plus-C_g1-1qg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-hUpqKMRXJIZ34krPn/3JayuoeDQ"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 311,
    "path": "../public/assets/user-plus-C_g1-1qg.js"
  },
  "/assets/user-x-DIv35EwH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"373-vnsBEyjR12+NvSwsB2OcZjzeK/k"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 883,
    "path": "../public/assets/user-x-DIv35EwH.js"
  },
  "/assets/users-DyKE_KsN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-fnggHvVi9wnIC8Mf4wiUHrbwevo"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 307,
    "path": "../public/assets/users-DyKE_KsN.js"
  },
  "/assets/useSuspenseQuery-J_RBNQap.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-hJlXjO1tiUMEjaq/tUaABgk7VsU"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-J_RBNQap.js"
  },
  "/assets/utils-CB1nfDSO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-s/5TBrv1lxi56/MJ+aEoLPCpi1o"',
    "mtime": "2026-08-30T21:20:44.860Z",
    "size": 59982,
    "path": "../public/assets/utils-CB1nfDSO.js"
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
