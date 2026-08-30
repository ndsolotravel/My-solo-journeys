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
  "/assets/about.functions-Bh9rlNAX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31f9-rJ49CCvdQu1AY1KNNYNTTQx4QjQ"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 12793,
    "path": "../public/assets/about.functions-Bh9rlNAX.js"
  },
  "/assets/account-BYScfqqt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-BfCUtB4b5wdtNSOrdJ3HjnWqm1o"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 2068,
    "path": "../public/assets/account-BYScfqqt.js"
  },
  "/assets/admin-CCu8UlrD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9ff-G0eBw7trcrOs4Md9UVk4G4m15zg"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 2559,
    "path": "../public/assets/admin-CCu8UlrD.js"
  },
  "/assets/admin.about-UuAdMF4U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1139e-UWOsGbvh+C385LnJHhhJrsHAAGU"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 70558,
    "path": "../public/assets/admin.about-UuAdMF4U.js"
  },
  "/assets/admin.categories-Bxh05ZSk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5de0-wdV5bBWIa8FyikY5Pc7kkVJ6dQc"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 24032,
    "path": "../public/assets/admin.categories-Bxh05ZSk.js"
  },
  "/assets/admin.comments-DOyQnCgO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"94b-WuoQmyCKsV9RcNDY6Lp4Lge6gsg"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 2379,
    "path": "../public/assets/admin.comments-DOyQnCgO.js"
  },
  "/assets/admin.contact-sArblc0g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6cb-x3TJFBCzahu3F0BEhoQWcy5pZvg"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 1739,
    "path": "../public/assets/admin.contact-sArblc0g.js"
  },
  "/assets/admin.destinations-DTWR90TB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f38-1FUs9hUhFgksMlty4qHF3gPbWyU"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 20280,
    "path": "../public/assets/admin.destinations-DTWR90TB.js"
  },
  "/assets/admin.gallery-hUr5obYW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8fb3-aqD5i8R8l1MoA5QTa1lxkKnLdJY"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 36787,
    "path": "../public/assets/admin.gallery-hUr5obYW.js"
  },
  "/assets/admin.analytics-B5orD4dl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"642c4-7JYyUfTVm1yCxiIzCLkKhUWJ8PI"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 410308,
    "path": "../public/assets/admin.analytics-B5orD4dl.js"
  },
  "/assets/admin.homepage-Bb7omx9R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d94a-a5qvJm2ZS12mwkVd7M4FdYdMRZo"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 55626,
    "path": "../public/assets/admin.homepage-Bb7omx9R.js"
  },
  "/assets/admin.index-CjWulEdm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fea-PP/294s6NA+rQzH6yGOfw5uf8c8"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 4074,
    "path": "../public/assets/admin.index-CjWulEdm.js"
  },
  "/assets/admin.legal-1hiRpwbR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39e8-JlVitwHvTap5gnYmzM1/dBaMWyA"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 14824,
    "path": "../public/assets/admin.legal-1hiRpwbR.js"
  },
  "/assets/admin.messages-CYJ22Y8L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137a-/WkJS3++p+k8ZQi2eFDDBF41fu0"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 4986,
    "path": "../public/assets/admin.messages-CYJ22Y8L.js"
  },
  "/assets/admin.news-Ct3gHkPX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f0c-EPAuCSCf74M3dkEBFb96iNWnzp8"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 36620,
    "path": "../public/assets/admin.news-Ct3gHkPX.js"
  },
  "/assets/about-Ca6m51l9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91177-+dcmzaSaOg5NqwhTloULRx6MNfM"',
    "mtime": "2026-08-30T20:55:08.448Z",
    "size": 594295,
    "path": "../public/assets/about-Ca6m51l9.js"
  },
  "/assets/admin.posts.index-BIGoJJIv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ec2-onA62FvACUyLZfkreuRrsQ5iMlo"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 11970,
    "path": "../public/assets/admin.posts.index-BIGoJJIv.js"
  },
  "/assets/admin.posts.new-BR6OolR3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38b-YBs+e8HTy7p9sLm6lnqs6nuGPeE"',
    "mtime": "2026-08-30T20:55:08.448Z",
    "size": 907,
    "path": "../public/assets/admin.posts.new-BR6OolR3.js"
  },
  "/assets/admin.posts._id-gM0IcmCh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4b0-LAp0cJW1fhAZNVDljCQP1bEC00M"',
    "mtime": "2026-08-30T20:55:08.448Z",
    "size": 1200,
    "path": "../public/assets/admin.posts._id-gM0IcmCh.js"
  },
  "/assets/admin.public-message-DP2YRvGs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5301-/JzkhYpctmVnjrkbA9Pnx1/1BoA"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 21249,
    "path": "../public/assets/admin.public-message-DP2YRvGs.js"
  },
  "/assets/admin.subscribers-BEMXAs_f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c31-/CoSRGLzIltpD2PSbyniMOMYaRE"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 11313,
    "path": "../public/assets/admin.subscribers-BEMXAs_f.js"
  },
  "/assets/AdSlot-CJCz6m6W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-h9MXks4OeW5xX1vEjeFSbZV0U2s"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-CJCz6m6W.js"
  },
  "/assets/alert-dialog-BBThHFoY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-rFHT52NV8EkDkL/WMi5ICOg69nI"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-BBThHFoY.js"
  },
  "/assets/arrow-left-CKCoK_it.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-dJEMDuxFtWEfMY5wK7ntxn3N16I"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 166,
    "path": "../public/assets/arrow-left-CKCoK_it.js"
  },
  "/assets/arrow-up-right-C--zASFL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-U4RQhERCsHKwgepu23l2SUUkIK0"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-C--zASFL.js"
  },
  "/assets/admin.settings-BmT_5s7H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"434d-KRa9mRYuzsEBKoiW55L+o9sdhs8"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 17229,
    "path": "../public/assets/admin.settings-BmT_5s7H.js"
  },
  "/assets/auth-CSKll88b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddc-mznFxvblKZitH4Ou7YlbGTqKYCE"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 7644,
    "path": "../public/assets/auth-CSKll88b.js"
  },
  "/assets/blog-B8qALrqS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-02NQNXduYCNN+TIoJqhd575RLtA"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 103,
    "path": "../public/assets/blog-B8qALrqS.js"
  },
  "/assets/blog.index-CIWzth-J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27f3-IrZtqcFFLTM7RwrXTU9pam+3cC8"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 10227,
    "path": "../public/assets/blog.index-CIWzth-J.js"
  },
  "/assets/blog._slug-Dnzla56W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-BiAgvobbkHCccAb1E9owUvujrnU"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 572,
    "path": "../public/assets/blog._slug-Dnzla56W.js"
  },
  "/assets/blog._slug-C81npFaW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bf3-kD6FQkgvGte+XM9YDYWLy5GoFhI"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 27635,
    "path": "../public/assets/blog._slug-C81npFaW.js"
  },
  "/assets/book-open-B4Bs6UJI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-cIkx79ZmkULzKDUGzV9+66QZ1S8"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 280,
    "path": "../public/assets/book-open-B4Bs6UJI.js"
  },
  "/assets/calendar-DSwTLZPi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-XCKIr1mXxE3rFY6u/DbIH1B8Gdo"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 258,
    "path": "../public/assets/calendar-DSwTLZPi.js"
  },
  "/assets/camera-Da3R7CfU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"151-AatUJufihDChciPvrHcBjjSHtyc"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 337,
    "path": "../public/assets/camera-Da3R7CfU.js"
  },
  "/assets/chart-column-CugQ9liw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-bty56xLr18PYfeZVIQUP8pSZdcY"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 252,
    "path": "../public/assets/chart-column-CugQ9liw.js"
  },
  "/assets/category._slug-BOCM8ce6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-ZEmOttttHo/0tbdkcpEk1eFJwX4"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 3842,
    "path": "../public/assets/category._slug-BOCM8ce6.js"
  },
  "/assets/check-CjijWd4i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-JyxT1d4WoIk3L/OrxY6JgBjkgSE"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 125,
    "path": "../public/assets/check-CjijWd4i.js"
  },
  "/assets/chevron-left-S2FU6weO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-eT71NAyYdTVzG2YC9DxvNqqpQ5Y"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 131,
    "path": "../public/assets/chevron-left-S2FU6weO.js"
  },
  "/assets/chevron-right-CWRnRTJn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-F2CZ4aD+DDTYEtNkX099KstK6Og"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 131,
    "path": "../public/assets/chevron-right-CWRnRTJn.js"
  },
  "/assets/circle-check-DhDgJxiU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-I/mEmp2HR3xSo5vpGnQrd4bCyg0"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 179,
    "path": "../public/assets/circle-check-DhDgJxiU.js"
  },
  "/assets/circle-x-DjXbRdJN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0-z4iXQGS8vCls9opNdfmZX9M/1Ao"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 208,
    "path": "../public/assets/circle-x-DjXbRdJN.js"
  },
  "/assets/clock-BtrT5yY-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-y8ZW7NLjYz/qwlWv1L2ZhIb9qH4"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 170,
    "path": "../public/assets/clock-BtrT5yY-.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-CGV6h6aZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3aa7-mRTGwY6BYVN9BZbfuf0FrQYTCHM"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 15015,
    "path": "../public/assets/contact-CGV6h6aZ.js"
  },
  "/assets/compass-6u5gibTl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-/BSTRd2umS5aL9+YLjFTKsCD/NY"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 252,
    "path": "../public/assets/compass-6u5gibTl.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-CeY43u7H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-gDJlQXQxheEjcGZ4lHHo9G4H2Zs"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 103,
    "path": "../public/assets/destinations-CeY43u7H.js"
  },
  "/assets/destinations.index-bzHiJ9Ho.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14f3-QWR8WmLinphOOxrLfRIyHEJNLUI"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 5363,
    "path": "../public/assets/destinations.index-bzHiJ9Ho.js"
  },
  "/assets/destinations._slug-C8I_g0zN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-50q2b0D5pERdEKjwKI1So2ntmlc"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-C8I_g0zN.js"
  },
  "/assets/destinations._slug-D6Dqolaj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c66-9AoVNmIq6jcaDl7O5+XxKbFJZrg"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 7270,
    "path": "../public/assets/destinations._slug-D6Dqolaj.js"
  },
  "/assets/DestinationsMap-BcXA3d_J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"124c-ezazdCZ7dfQDv1Z9E3tZiNo3Y8k"',
    "mtime": "2026-08-30T20:55:08.448Z",
    "size": 4684,
    "path": "../public/assets/DestinationsMap-BcXA3d_J.js"
  },
  "/assets/dialog-DjYRJsmU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-9r8PR1bSX2NGCBHmqRTuufASf2k"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 1830,
    "path": "../public/assets/dialog-DjYRJsmU.js"
  },
  "/assets/disclaimer-C7Wv8aku.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"71c-ZuZC1A7Wp3woE0dNr2qc5piqPhc"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 1820,
    "path": "../public/assets/disclaimer-C7Wv8aku.js"
  },
  "/assets/earth-Dc-fk-cI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-GwvLvc5jZde9aEshO3Zeyc7FSl4"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 394,
    "path": "../public/assets/earth-Dc-fk-cI.js"
  },
  "/assets/external-link--zOK_PlE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-rn7lbdxdO1ndsGDDrFpbk2mwaSw"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 252,
    "path": "../public/assets/external-link--zOK_PlE.js"
  },
  "/assets/eye-DjbMsWy-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-ppWtJGBThcXtLghtrUOQ9Iq5bV0"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 257,
    "path": "../public/assets/eye-DjbMsWy-.js"
  },
  "/assets/eye-off-BPCmxedC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-gxuM4sZCm3vRXMMoPPwOhO3HLCs"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 431,
    "path": "../public/assets/eye-off-BPCmxedC.js"
  },
  "/assets/file-image-jyULbxnB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"191-H4ckhIYVGQnKSuPRe4as7tRm8vY"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 401,
    "path": "../public/assets/file-image-jyULbxnB.js"
  },
  "/assets/flame-B_1CM5MV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-VZFiI4ISyYC3O8zyy4FwPQMioKo"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 200,
    "path": "../public/assets/flame-B_1CM5MV.js"
  },
  "/assets/folder-tree-B0xt6gXI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-//fFLPX07QEfw21WyYapn8CYI6g"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 480,
    "path": "../public/assets/folder-tree-B0xt6gXI.js"
  },
  "/assets/gallery-BBfwwwWN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1429-lwQbtfJuPkfUDnkou6qFp5AjJMo"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 5161,
    "path": "../public/assets/gallery-BBfwwwWN.js"
  },
  "/assets/gallery._slug-BZKKKeUJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190e-cBXv/9os8rnD9qBvdDb99mn/gGw"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 6414,
    "path": "../public/assets/gallery._slug-BZKKKeUJ.js"
  },
  "/assets/gallery._slug-DYj1zocH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26c-jDUgiRz9+DhGp3BGfDyONTWP8qc"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 620,
    "path": "../public/assets/gallery._slug-DYj1zocH.js"
  },
  "/assets/geocoding.functions-DDe99dGt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-Se2NOlD7DNjDmsa1+Q3eSGnYdm4"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-DDe99dGt.js"
  },
  "/assets/grip-vertical-w3YASU11.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c4-RW70/T3sw6f71fQWAOUmNC1VxgY"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 452,
    "path": "../public/assets/grip-vertical-w3YASU11.js"
  },
  "/assets/HeroBannerManager-CuMa8uib.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b55-sMcxSRccRu+FTH7NAv2eOVBSw9s"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 11093,
    "path": "../public/assets/HeroBannerManager-CuMa8uib.js"
  },
  "/assets/image-off-DocrUx-L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29f-g3GOG0itQGCI+WsSIfQhwohem24"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 671,
    "path": "../public/assets/image-off-DocrUx-L.js"
  },
  "/assets/image-B8cWwZn4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-8onkN6Pv1qJqhd5LNSP0f35RmM4"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 270,
    "path": "../public/assets/image-B8cWwZn4.js"
  },
  "/assets/image-plus-B_FlbFGb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16c-qEOsljp6P1ZycjyKxgnnZH9hab4"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 364,
    "path": "../public/assets/image-plus-B_FlbFGb.js"
  },
  "/assets/layers-ePtaZiN9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-jE4c5+6o3TNe/UnWm5+/UR9pMJw"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 422,
    "path": "../public/assets/layers-ePtaZiN9.js"
  },
  "/assets/key-round-BnwcM2Yl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-LMudM9KaDV4y61KhX4sez5ZFdSY"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 356,
    "path": "../public/assets/key-round-BnwcM2Yl.js"
  },
  "/assets/index-DrrUdMWA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a4c9-923EoMX1G+EIlX52e8xNKApF8CQ"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 173257,
    "path": "../public/assets/index-DrrUdMWA.js"
  },
  "/assets/layout-dashboard-BXBAnzNv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"368-MmPnIeDDtPhIOMPEvTX7qjufPTQ"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 872,
    "path": "../public/assets/layout-dashboard-BXBAnzNv.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-qAIWurtH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-2dAtqWFr/YRc3KhS9YdrEllNYes"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 290228,
    "path": "../public/assets/index-qAIWurtH.js"
  },
  "/assets/list-DdnOhOP-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-irq0/ig5JbWUzb452gDY5A+rFEc"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 303,
    "path": "../public/assets/list-DdnOhOP-.js"
  },
  "/assets/list-ordered-DDx4rTsu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"284-fVLrEenI/4U6nAhsGwC7JIiolgE"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 644,
    "path": "../public/assets/list-ordered-DDx4rTsu.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/leaflet-src-B8SPOjJc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-dDnLQQBOqjO1W6KAX7ntGNqq7BY"',
    "mtime": "2026-08-30T20:55:08.448Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-B8SPOjJc.js"
  },
  "/assets/map-by_tXuD0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d4-6qyXqSCzq0v5pqzNsRceG/UGvJE"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 724,
    "path": "../public/assets/map-by_tXuD0.js"
  },
  "/assets/maximize-2-3E6Wq3J5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-rD9lI78QUTiEJDxtGbgykl+i73Y"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 239,
    "path": "../public/assets/maximize-2-3E6Wq3J5.js"
  },
  "/assets/message-square-DaOxK6c_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-Evs3+9/cSbrck1xz+fGbMEI5130"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 234,
    "path": "../public/assets/message-square-DaOxK6c_.js"
  },
  "/assets/mountain-DZvq54ca.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"179-iXPs979fKUs7gI7a7knyfqCo0ZM"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 377,
    "path": "../public/assets/mountain-DZvq54ca.js"
  },
  "/assets/navigation-B4ON3uQ2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-7WplD6Uygc3swci2hH+Jm7jIhzU"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 149,
    "path": "../public/assets/navigation-B4ON3uQ2.js"
  },
  "/assets/news._slug-L1kzGu46.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ac-BXS2mjnSNEM6JGeMK3lwx4kQqrI"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 4524,
    "path": "../public/assets/news._slug-L1kzGu46.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-30T20:55:08.409Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-QVmRQxKV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-ixfFub1TDS/iD4OIx2InjnOXgT0"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 974,
    "path": "../public/assets/news._slug-QVmRQxKV.js"
  },
  "/assets/PageBreadcrumbs-BkXRQtSH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-tttgVSse2TWbH8x+zeseExYyDy4"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-BkXRQtSH.js"
  },
  "/assets/pen-line-kFuJbLLW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-BHMx3V5hxdp70Jy2yVEc5klJziU"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 1022,
    "path": "../public/assets/pen-line-kFuJbLLW.js"
  },
  "/assets/index-DuByIMKo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f14b1-zQLHBsUxSRMQZM/OgSmK3I8TsPg"',
    "mtime": "2026-08-30T20:55:08.448Z",
    "size": 988337,
    "path": "../public/assets/index-DuByIMKo.js"
  },
  "/assets/pencil-F1-umSve.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-Tdb7Pqra98AjhW6k1svDaMp6ajE"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 277,
    "path": "../public/assets/pencil-F1-umSve.js"
  },
  "/assets/plus-DBjSCAlw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-EICNw7LoTMjDgVgZ3RhjFckcwLw"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 154,
    "path": "../public/assets/plus-DBjSCAlw.js"
  },
  "/assets/PostCard-DUk3FmwA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed1-M2ax9Cfy43Wu1y8jKnQOxHppNUI"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 3793,
    "path": "../public/assets/PostCard-DUk3FmwA.js"
  },
  "/assets/PostEditor-BDqCQxEB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ecd5-wDJvDUivfOALtam7epClri7wMrw"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 60629,
    "path": "../public/assets/PostEditor-BDqCQxEB.js"
  },
  "/assets/power-n4Iu-xml.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-C4ly2qx1opwEsx0KSJKbYMj87b4"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 174,
    "path": "../public/assets/power-n4Iu-xml.js"
  },
  "/assets/privacy-policy-Vpnnu3nL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"720-/Jg9/CbJM0tXxj0glvX0ObN1mxE"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 1824,
    "path": "../public/assets/privacy-policy-Vpnnu3nL.js"
  },
  "/assets/quote-oXhfW9g1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-Yev/rI+3UO66H7H3B27QFDobyUg"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 390,
    "path": "../public/assets/quote-oXhfW9g1.js"
  },
  "/assets/radio-Bv6ynw5w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-xSzegGFB+egsRhRsxj7ZZ9q7A9I"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 375,
    "path": "../public/assets/radio-Bv6ynw5w.js"
  },
  "/assets/refresh-cw-Bqb4jrZm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-wd8jWvRxYsuAbzQNcAZEn1KcuYc"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-Bqb4jrZm.js"
  },
  "/assets/rocket-CJe5TIED.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b2-+8VS/Rh0Mb/AU8DPo8pBfCDEe+4"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 946,
    "path": "../public/assets/rocket-CJe5TIED.js"
  },
  "/assets/rotate-ccw-CKAjXsyQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-T6IcbwbrRTaYArmAK6I457THsSI"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-CKAjXsyQ.js"
  },
  "/assets/route-Cy_V2YuY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff-RjxSniyzpiipUxlaTMMMVP+Z1/s"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 255,
    "path": "../public/assets/route-Cy_V2YuY.js"
  },
  "/assets/route-DhjwscM6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-009y81U+3cp7o0005hBPlqnSdDA"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 95,
    "path": "../public/assets/route-DhjwscM6.js"
  },
  "/assets/save-Zqnpviza.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-AQzyktjOKy7ORjXazDiGmTIgZg8"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 328,
    "path": "../public/assets/save-Zqnpviza.js"
  },
  "/assets/scale-NeZ6yW51.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-9QP3EgVETdsz2ZCjAVRWB+GjvWU"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 333,
    "path": "../public/assets/scale-NeZ6yW51.js"
  },
  "/assets/settings-DmkA9s-G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-2wW12I4lA+aJNB47rKX2A1KYOQE"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 488,
    "path": "../public/assets/settings-DmkA9s-G.js"
  },
  "/assets/share-2-L4CiA3Yp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-bREHa1i635jGOiTrLbG8LCBMBek"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 358,
    "path": "../public/assets/share-2-L4CiA3Yp.js"
  },
  "/assets/shield-alert-CDmCw41t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c-8CWPJDWWlubesGiOFEp6qRmBbzU"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 668,
    "path": "../public/assets/shield-alert-CDmCw41t.js"
  },
  "/assets/shield-BEAiyAmi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-buEuquT+wh1ZUtYdYk5en6T6nHE"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 273,
    "path": "../public/assets/shield-BEAiyAmi.js"
  },
  "/assets/shield-check-Dw18_xqq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-dAH7VWwUD8yXQVqu6FDgADOuxr4"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 321,
    "path": "../public/assets/shield-check-Dw18_xqq.js"
  },
  "/assets/sliders-horizontal-Qg3iO3Ac.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-V1W1PvUt9jz15C7AK2nHuYzAKPI"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 425,
    "path": "../public/assets/sliders-horizontal-Qg3iO3Ac.js"
  },
  "/assets/star-5VRSHi4d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-xAFT15o29ZCNtP26EoH/X47uQy4"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 473,
    "path": "../public/assets/star-5VRSHi4d.js"
  },
  "/assets/styles-CyL5Sbwl.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2ee78-8/WMqStkiELf3+pqfu0tqbu4x88"',
    "mtime": "2026-08-30T20:55:08.442Z",
    "size": 192120,
    "path": "../public/assets/styles-CyL5Sbwl.css"
  },
  "/assets/tag-BzZ5X8IH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"147-RL5TETLB39B25dsQtOBAYrFxbx0"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 327,
    "path": "../public/assets/tag-BzZ5X8IH.js"
  },
  "/assets/topics._slug-BIWu6ga_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f5-0z0g04PImMp50XsU/unOAflV0oU"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 2293,
    "path": "../public/assets/topics._slug-BIWu6ga_.js"
  },
  "/assets/trash-2-CpAqdG6H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-szqE4+5iB31eAZhGcIPeBhcoZ7w"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 329,
    "path": "../public/assets/trash-2-CpAqdG6H.js"
  },
  "/assets/TranslatedMarkdown-DooDHUV9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c2-qBS7ZTJogOucpr69gBL7U1yh9Aw"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 2242,
    "path": "../public/assets/TranslatedMarkdown-DooDHUV9.js"
  },
  "/assets/trending-up-BSPHBbbK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a4-KShYMAtXfTy/rI4OXyOrhgDtAWw"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 932,
    "path": "../public/assets/trending-up-BSPHBbbK.js"
  },
  "/assets/triangle-alert-BgXKU1aE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-OvCwntKE3QZUtGhm9Qn1FHeCWPk"',
    "mtime": "2026-08-30T20:55:08.445Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-BgXKU1aE.js"
  },
  "/assets/upload-BoA_w7_1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-bVuklWOWR6fJ4jIYRuDKwmrKAOw"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 231,
    "path": "../public/assets/upload-BoA_w7_1.js"
  },
  "/assets/useMutation-y4hN5mva.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-/I/oNlXnkhjjdQs9Hs/8ftBvCbg"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 2211,
    "path": "../public/assets/useMutation-y4hN5mva.js"
  },
  "/assets/user-plus-ChilThzr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-fbFLcrViAUjJ6HSfkWSI3xB50lA"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 311,
    "path": "../public/assets/user-plus-ChilThzr.js"
  },
  "/assets/user-x-Dq8826Ab.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"373-Zhi9XQ0d+cXP4HFPbbx20s/Yapo"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 883,
    "path": "../public/assets/user-x-Dq8826Ab.js"
  },
  "/assets/users-Do7-bzT8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-YMetFFylvq5xSrnujx2B+3ct6RE"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 307,
    "path": "../public/assets/users-Do7-bzT8.js"
  },
  "/assets/useSuspenseQuery-Q3bVo-3Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-VhEA9qcFuZjCE3yv4PpSXgcwwEY"',
    "mtime": "2026-08-30T20:55:08.443Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-Q3bVo-3Z.js"
  },
  "/assets/utils-E5qMloTU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-qY2y4fL8qr9fxeGxdb2vg33fHvU"',
    "mtime": "2026-08-30T20:55:08.447Z",
    "size": 59982,
    "path": "../public/assets/utils-E5qMloTU.js"
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
