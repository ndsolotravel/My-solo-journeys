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
  "/assets/about-a4JwATRv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-tSi0CnG8FOak6t3kPpTKqCCv8ns"',
    "mtime": "2026-08-27T11:37:02.323Z",
    "size": 3398,
    "path": "../public/assets/about-a4JwATRv.js"
  },
  "/assets/account-DBIVR3WX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-W74vy6JXlVgcFbCVB69Kg8vFObE"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 2068,
    "path": "../public/assets/account-DBIVR3WX.js"
  },
  "/assets/admin-BdT94kL9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a4d-z2NQLhsfb10Az4bxRZRfuhoXLxA"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 2637,
    "path": "../public/assets/admin-BdT94kL9.js"
  },
  "/assets/admin.comments-7HwEXl5Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-+SEPQ3xclx+mqJAFqapDbEl0Z10"',
    "mtime": "2026-08-27T11:37:02.347Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-7HwEXl5Y.js"
  },
  "/assets/admin.categories-CbNPmU5d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591a-prn13Orb5h4VkhVFaY2tZJ6EyFU"',
    "mtime": "2026-08-27T11:37:02.347Z",
    "size": 22810,
    "path": "../public/assets/admin.categories-CbNPmU5d.js"
  },
  "/assets/admin.destinations-DacmAsQy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-jWEqO3vJtIFYbv82rZywBlbXNe4"',
    "mtime": "2026-08-27T11:37:02.347Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-DacmAsQy.js"
  },
  "/assets/admin.gallery-bRc83d3p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-0A87zLrryYHE6Ba0/teSrRA+65U"',
    "mtime": "2026-08-27T11:37:02.343Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-bRc83d3p.js"
  },
  "/assets/admin.homepage-CKdGLmPX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-zNBgFQbxT7k/NzJL5RGnx4I67RY"',
    "mtime": "2026-08-27T11:37:02.347Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-CKdGLmPX.js"
  },
  "/assets/admin.index-DsZkwBbM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-Xb5U6qcTYGzLGCF0xADB6PrcadM"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 4075,
    "path": "../public/assets/admin.index-DsZkwBbM.js"
  },
  "/assets/admin.legal-CTso7cZn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3cbe-dkR1aA8pkf1UMgsM0LdhJ3J/Em8"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 15550,
    "path": "../public/assets/admin.legal-CTso7cZn.js"
  },
  "/assets/admin.messages-DJczxNvd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12aa-G7E02Un1U+iEBi0mlfkkKHqKnss"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 4778,
    "path": "../public/assets/admin.messages-DJczxNvd.js"
  },
  "/assets/admin.posts.new-CxDZV-Zi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d9-uZWSMEc9n0oaxoZ5BKPySHgpADI"',
    "mtime": "2026-08-27T11:37:02.349Z",
    "size": 729,
    "path": "../public/assets/admin.posts.new-CxDZV-Zi.js"
  },
  "/assets/admin.analytics-B7tazvLw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-yZktlLCiLXCowzBrSEflnsz8+sQ"',
    "mtime": "2026-08-27T11:37:02.347Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-B7tazvLw.js"
  },
  "/assets/admin.news-DMEwfH5U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-fFyMeBxljaAGum5o8dhYHrCVSuI"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 34492,
    "path": "../public/assets/admin.news-DMEwfH5U.js"
  },
  "/assets/admin.posts.index-B_eIuQ0K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-dYz7UFvIQzECrrUYIcAyUe3eFLA"',
    "mtime": "2026-08-27T11:37:02.351Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-B_eIuQ0K.js"
  },
  "/assets/admin.posts._id-BPXeXMwy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"40e-6C3Yzkj3xzd1AP5z2T3PWREogig"',
    "mtime": "2026-08-27T11:37:02.431Z",
    "size": 1038,
    "path": "../public/assets/admin.posts._id-BPXeXMwy.js"
  },
  "/assets/admin.public-message-CSdHhO9i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-Hp7p80qrI8Nf4pfbUg2fvfOHxRc"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-CSdHhO9i.js"
  },
  "/assets/admin.settings-Cfn1CMuL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3eb4-YqYpRaDqDp8swIX41mwzcD82j1M"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 16052,
    "path": "../public/assets/admin.settings-Cfn1CMuL.js"
  },
  "/assets/admin.subscribers-CG4j5u9r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-z9s3HjXZ9SZqTrl3CsBX9VhpJSw"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-CG4j5u9r.js"
  },
  "/assets/AdSlot-CYtPTRYi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8bb-jnDOxtdqI02acfjEJW/6Oog91Yk"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 2235,
    "path": "../public/assets/AdSlot-CYtPTRYi.js"
  },
  "/assets/alert-dialog-BpXZzoVL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-4owFIDBia5koUZLoAJ4JKF+Pgdk"',
    "mtime": "2026-08-27T11:37:02.337Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-BpXZzoVL.js"
  },
  "/assets/arrow-left-CbTgIU0C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a1-TefHdp0g+PUUpfwY1Loc3b/wrHY"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 161,
    "path": "../public/assets/arrow-left-CbTgIU0C.js"
  },
  "/assets/arrow-up-right-BX7Te4QG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-gz3eWkHxg1e8I2SEGYSm/Xfgm4o"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-BX7Te4QG.js"
  },
  "/assets/auth-Db65ewpF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-EXzJtmnBMWLxFvlNaFKv7DTdwho"',
    "mtime": "2026-08-27T11:37:02.323Z",
    "size": 8188,
    "path": "../public/assets/auth-Db65ewpF.js"
  },
  "/assets/blog-BBusDB1d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-JvX4eLDeEKX4hvoMNuqpftvCBvQ"',
    "mtime": "2026-08-27T11:37:02.323Z",
    "size": 103,
    "path": "../public/assets/blog-BBusDB1d.js"
  },
  "/assets/blog.index-DxZhUvcn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28c0-I37M1NAbEpuLPbo8UeuibDNHh1g"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 10432,
    "path": "../public/assets/blog.index-DxZhUvcn.js"
  },
  "/assets/blog._slug-D_QsO_pu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-Pi0siFJvh2OhGnvOlQb4pwgiQUc"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 572,
    "path": "../public/assets/blog._slug-D_QsO_pu.js"
  },
  "/assets/blog._slug-ZNwNDGAW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6c41-L2Q7GY1zNLspxsStwlcxXtLogA8"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 27713,
    "path": "../public/assets/blog._slug-ZNwNDGAW.js"
  },
  "/assets/book-open-CRZohEhZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-wDWT9870K/DRdJx3BbkNJE0X2ho"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 280,
    "path": "../public/assets/book-open-CRZohEhZ.js"
  },
  "/assets/calendar-DeNx_Rhf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-MRDy474RIUPbGDytSZUNqWkm8Wc"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 253,
    "path": "../public/assets/calendar-DeNx_Rhf.js"
  },
  "/assets/category._slug-Bwy0cvbn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-0QkqrDWrGkiprXndpLQSjYG5ADw"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 3842,
    "path": "../public/assets/category._slug-Bwy0cvbn.js"
  },
  "/assets/chart-column-kOhgutna.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-gM9HuIrGR3KnhGWBzzpraRuBtuQ"',
    "mtime": "2026-08-27T11:37:02.332Z",
    "size": 252,
    "path": "../public/assets/chart-column-kOhgutna.js"
  },
  "/assets/check-DlEancMl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-2aXQtoVFVfoj6cDFL/Cjs3WKTsY"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 125,
    "path": "../public/assets/check-DlEancMl.js"
  },
  "/assets/chevron-left-Dwj_mqfp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7e-z96xNI9vnwwLAcFRiUxq5EkIY4U"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 126,
    "path": "../public/assets/chevron-left-Dwj_mqfp.js"
  },
  "/assets/chevron-right-BfmCr653.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-7LTH8+ZQ+d8FHgR7vudbYj9ndGk"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 131,
    "path": "../public/assets/chevron-right-BfmCr653.js"
  },
  "/assets/circle-check-QsqZQuiU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-/P5mgocp1RMZJzsDeqothanWKUg"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 179,
    "path": "../public/assets/circle-check-QsqZQuiU.js"
  },
  "/assets/clock-BH0CPJvA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-cj5CXxQo8RDNs4rh4kGDaL6M/uc"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 170,
    "path": "../public/assets/clock-BH0CPJvA.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T11:37:02.321Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-7JMH4IyU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-t0UU34Q0rOoKWMEr0q4jhDWQ6WE"',
    "mtime": "2026-08-27T11:37:02.321Z",
    "size": 103,
    "path": "../public/assets/destinations-7JMH4IyU.js"
  },
  "/assets/contact-DRBN_Nvn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-zUqErR6fTJ/07aQ6nh7CyZz8TKU"',
    "mtime": "2026-08-27T11:37:02.323Z",
    "size": 14845,
    "path": "../public/assets/contact-DRBN_Nvn.js"
  },
  "/assets/destinations.index-BUeedIHV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-W8i9TlusRu+4fLtiV27FIJ5kkcw"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-BUeedIHV.js"
  },
  "/assets/destinations._slug-BtdfxLke.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd4-6vuMveumt2hpXHNhyKorWHxgbqY"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 7380,
    "path": "../public/assets/destinations._slug-BtdfxLke.js"
  },
  "/assets/destinations._slug-iwd9TVeB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-s9J8M5LG+e8YCAfpKe1UWmEE2XM"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-iwd9TVeB.js"
  },
  "/assets/dialog-BupMYpF1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-1ID1bZMZb1IAd4g6dB5QfYWQnII"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 1830,
    "path": "../public/assets/dialog-BupMYpF1.js"
  },
  "/assets/DestinationsMap-Cbnu-AR_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-adBKk2a4Z2aZawfQdKvKFs5lRIs"',
    "mtime": "2026-08-27T11:37:02.431Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-Cbnu-AR_.js"
  },
  "/assets/disclaimer-D6loxzQv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6ea-D5pjxO/C7nMF/axyKuy6xnt77zA"',
    "mtime": "2026-08-27T11:37:02.323Z",
    "size": 1770,
    "path": "../public/assets/disclaimer-D6loxzQv.js"
  },
  "/assets/earth-BCnd3thr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-PPFASkyQRllx3X4HWZiQU4hba/A"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 394,
    "path": "../public/assets/earth-BCnd3thr.js"
  },
  "/assets/external-link-BfpFrDLY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-FEe3NpW+QkGcAMoREf2LYYJiVUQ"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 252,
    "path": "../public/assets/external-link-BfpFrDLY.js"
  },
  "/assets/eye-BjbHaiuX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-IuGoGwkxj/x+IBnlJ78F/xvAi5Y"',
    "mtime": "2026-08-27T11:37:02.332Z",
    "size": 257,
    "path": "../public/assets/eye-BjbHaiuX.js"
  },
  "/assets/flame-DxQtgsCg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c3-UkjZIYP/ndc9L9qjxgo8DYPj0Bc"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 195,
    "path": "../public/assets/flame-DxQtgsCg.js"
  },
  "/assets/folder-tree-CAxnuVAW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-dHjDKu0OXHgRaf9Qo9hGY8Yu0rU"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 480,
    "path": "../public/assets/folder-tree-CAxnuVAW.js"
  },
  "/assets/gallery-CyyQK21_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-X84iUEilk0tY3S2Bd45tQb5AgDY"',
    "mtime": "2026-08-27T11:37:02.321Z",
    "size": 6285,
    "path": "../public/assets/gallery-CyyQK21_.js"
  },
  "/assets/geocoding.functions-Dl4uDqYj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-s63kG3qOfh3t3fmEWFhMo04Z/j4"',
    "mtime": "2026-08-27T11:37:02.351Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-Dl4uDqYj.js"
  },
  "/assets/house-cUZ_dS_U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-uj9AC5lnfvgieHzAcCSu5quvfkc"',
    "mtime": "2026-08-27T11:37:02.332Z",
    "size": 282,
    "path": "../public/assets/house-cUZ_dS_U.js"
  },
  "/assets/image-cZpKgYs-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"109-JIxA4dSjBUIvMGuhWVOMUjRClU0"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 265,
    "path": "../public/assets/image-cZpKgYs-.js"
  },
  "/assets/key-round-BMDHgPWA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15f-mtyh7CSdtiIGhS+XuHyC+WstkCo"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 351,
    "path": "../public/assets/key-round-BMDHgPWA.js"
  },
  "/assets/index-CFK9drFI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-6pgd869lIO6D0LEaKVQ/xBK71SI"',
    "mtime": "2026-08-27T11:37:02.325Z",
    "size": 172647,
    "path": "../public/assets/index-CFK9drFI.js"
  },
  "/assets/layers-QRekXQHg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-W23G9wVnt6qABAKOsjbbquljPEg"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 422,
    "path": "../public/assets/layers-QRekXQHg.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T11:37:02.321Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/index-CYGb8HI7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-ppASVBIwg0BsWP3Ux91VtNuezJ0"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 290228,
    "path": "../public/assets/index-CYGb8HI7.js"
  },
  "/assets/list-CKCFP4IO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-/H9ImbjudtKGS3f6+p+E9W+gvzQ"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 303,
    "path": "../public/assets/list-CKCFP4IO.js"
  },
  "/assets/leaflet-src-CrhHyCgZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-w011GKeOxHRJPfXm2WLFvDXwWtc"',
    "mtime": "2026-08-27T11:37:02.431Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-CrhHyCgZ.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T11:37:02.321Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-BdasKYYU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-HfYHiUDSg64F+vCd6szbs7Rn14g"',
    "mtime": "2026-08-27T11:37:02.343Z",
    "size": 914,
    "path": "../public/assets/maximize-2-BdasKYYU.js"
  },
  "/assets/message-square-kRbuqPQZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e5-ccL+OKBmNH1c5XnmjuhMU213jec"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 229,
    "path": "../public/assets/message-square-kRbuqPQZ.js"
  },
  "/assets/navigation-BjNgoMTQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-3txeTjfgf1yv7HkDFt00rlBBWog"',
    "mtime": "2026-08-27T11:37:02.332Z",
    "size": 149,
    "path": "../public/assets/navigation-BjNgoMTQ.js"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T11:37:02.296Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/index-2UUJPE-8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea366-Q2+Adpz6ufuTmWQ7K7U+KScsvLI"',
    "mtime": "2026-08-27T11:37:02.419Z",
    "size": 959334,
    "path": "../public/assets/index-2UUJPE-8.js"
  },
  "/assets/news._slug-BMdEfGUS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-RC4l4hiKSotxu6XEIL+P7rwR8D0"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 974,
    "path": "../public/assets/news._slug-BMdEfGUS.js"
  },
  "/assets/news._slug-BMu2mgPj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-ZWnoD1qohngirzMM8lOYh2xWAIk"',
    "mtime": "2026-08-27T11:37:02.325Z",
    "size": 4523,
    "path": "../public/assets/news._slug-BMu2mgPj.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T11:37:02.321Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/pen-line-BKyZbvWw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-PL2sJd6OUDWzJELsHxUyS5DqSYk"',
    "mtime": "2026-08-27T11:37:02.343Z",
    "size": 1022,
    "path": "../public/assets/pen-line-BKyZbvWw.js"
  },
  "/assets/PageBreadcrumbs-Bw54ENnK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-DVM4kiv7QLc9j806Rz+EuZbj+7o"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-Bw54ENnK.js"
  },
  "/assets/pencil-odIgHV_x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-EdKKujmLoFHgfm4yxBxh6ZVNqx8"',
    "mtime": "2026-08-27T11:37:02.343Z",
    "size": 277,
    "path": "../public/assets/pencil-odIgHV_x.js"
  },
  "/assets/plus-DHsM_MqA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-DOUmaZ5XWSXjEbvxPJ0cCHinuAQ"',
    "mtime": "2026-08-27T11:37:02.339Z",
    "size": 149,
    "path": "../public/assets/plus-DHsM_MqA.js"
  },
  "/assets/PostEditor-CwEMhmBt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd26-5wM/YJpFsqJvGAqQotuJJAdi7ZA"',
    "mtime": "2026-08-27T11:37:02.431Z",
    "size": 48422,
    "path": "../public/assets/PostEditor-CwEMhmBt.js"
  },
  "/assets/PostCard-D4FpRVZC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5f-o9NpDuc52tTmnIMwXGLbrIgOhrU"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 3935,
    "path": "../public/assets/PostCard-D4FpRVZC.js"
  },
  "/assets/privacy-policy-Cmq4JK9B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6ee-eDDQmrFovoFXneFQzAt5IPb6WzQ"',
    "mtime": "2026-08-27T11:37:02.321Z",
    "size": 1774,
    "path": "../public/assets/privacy-policy-Cmq4JK9B.js"
  },
  "/assets/radio-BQzQkkhD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-wRh4bpMXPSYdtHOFFjK72wa8M68"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 375,
    "path": "../public/assets/radio-BQzQkkhD.js"
  },
  "/assets/refresh-cw-D0N9iK4U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13d-cNkae0A119NZkX5SPjXqauPMF0A"',
    "mtime": "2026-08-27T11:37:02.332Z",
    "size": 317,
    "path": "../public/assets/refresh-cw-D0N9iK4U.js"
  },
  "/assets/route--zSlxe_0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-CFyVYoA8nIDuCvtDuOxS/UDIHn8"',
    "mtime": "2026-08-27T11:37:02.323Z",
    "size": 95,
    "path": "../public/assets/route--zSlxe_0.js"
  },
  "/assets/save-Bbiq58wt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-XT7IIJlscQFP8ERp4+FpxzpfRgg"',
    "mtime": "2026-08-27T11:37:02.337Z",
    "size": 328,
    "path": "../public/assets/save-Bbiq58wt.js"
  },
  "/assets/scale-fQBlXUYl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-5nXvgAiskbxdtIv+lRWR6MPMvKs"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 333,
    "path": "../public/assets/scale-fQBlXUYl.js"
  },
  "/assets/settings-BAn9lBFU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e3-m6UFkcQ1AJwBbQwBj36ut5CRfno"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 483,
    "path": "../public/assets/settings-BAn9lBFU.js"
  },
  "/assets/share-2-D1VHRwih.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-Vrj3BC76FR/3G4UA1sNaL9VBx+4"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 358,
    "path": "../public/assets/share-2-D1VHRwih.js"
  },
  "/assets/shield-B4B8dnFg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10c-zQakw6u9T55ucqqxpa3wgo4ko5Q"',
    "mtime": "2026-08-27T11:37:02.343Z",
    "size": 268,
    "path": "../public/assets/shield-B4B8dnFg.js"
  },
  "/assets/shield-check-hLBTIO0C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13c-FJIFXL+z39WTf5RLAvHJbh5AP1U"',
    "mtime": "2026-08-27T11:37:02.328Z",
    "size": 316,
    "path": "../public/assets/shield-check-hLBTIO0C.js"
  },
  "/assets/star-eRhWs_9s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-TU0UPCx/NgKqBLQTISZHnNrc+vU"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 473,
    "path": "../public/assets/star-eRhWs_9s.js"
  },
  "/assets/topics._slug-DSAR7u-R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-s4TjgsdO00jAlojNv2BS+Nk52eA"',
    "mtime": "2026-08-27T11:37:02.325Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-DSAR7u-R.js"
  },
  "/assets/trash-2-DORL47iG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-6c9ZD3yHmiBJm7mp2FejWdwl/Hk"',
    "mtime": "2026-08-27T11:37:02.336Z",
    "size": 329,
    "path": "../public/assets/trash-2-DORL47iG.js"
  },
  "/assets/triangle-alert-CHsGjFur.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"105-9sP3AB1cO1LzQUM/BDkscd/k5Jw"',
    "mtime": "2026-08-27T11:37:02.339Z",
    "size": 261,
    "path": "../public/assets/triangle-alert-CHsGjFur.js"
  },
  "/assets/styles-pVzfRrFT.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"28fa1-qFrsXjuIIlZyP34U96DX1tgEoVU"',
    "mtime": "2026-08-27T11:37:02.321Z",
    "size": 167841,
    "path": "../public/assets/styles-pVzfRrFT.css"
  },
  "/assets/upload-CPDaUsLi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-fpENz3R3t4Xp7/QHA7w+HDonEyk"',
    "mtime": "2026-08-27T11:37:02.339Z",
    "size": 231,
    "path": "../public/assets/upload-CPDaUsLi.js"
  },
  "/assets/users-PrEcYjaw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-/VKaLFdQ2u/VTfvhlYMqCupc6Bw"',
    "mtime": "2026-08-27T11:37:02.332Z",
    "size": 302,
    "path": "../public/assets/users-PrEcYjaw.js"
  },
  "/assets/useSuspenseQuery-CwbNTVSf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-bKjG4zCgGlFeEQl9XSG5uyosHDk"',
    "mtime": "2026-08-27T11:37:02.326Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-CwbNTVSf.js"
  },
  "/assets/useMutation-DQj4scZz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-AB84QFiHOgQMf5FsO/mtk6h/vRs"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 2211,
    "path": "../public/assets/useMutation-DQj4scZz.js"
  },
  "/assets/utils-By4YztVL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-eNUHuqVrCEou4oHANhhYs2dh0r8"',
    "mtime": "2026-08-27T11:37:02.330Z",
    "size": 59982,
    "path": "../public/assets/utils-By4YztVL.js"
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
