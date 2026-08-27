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
  "/author-hussain.jpg": {
    "type": "image/jpeg",
    "etag": '"17ea0-JUvH/AVYeIyu8O1xBx6LKgrm5FY"',
    "mtime": "2026-08-27T03:13:35.960Z",
    "size": 97952,
    "path": "../public/author-hussain.jpg"
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
  "/assets/about-8sB_CB7Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d46-TkWFPcV29pkbSoKR3TNBZXtdSMA"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 3398,
    "path": "../public/assets/about-8sB_CB7Z.js"
  },
  "/assets/account-4xuBxsgD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-wJKFabuy5KBpGlqcsJthlwx9Wl4"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 2068,
    "path": "../public/assets/account-4xuBxsgD.js"
  },
  "/assets/admin-C88gUxUJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9fb-TEiinCENc+QmTo7uTW4YyLPw1ms"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 2555,
    "path": "../public/assets/admin-C88gUxUJ.js"
  },
  "/assets/admin.categories-CT3xKJY6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591f-DG7rgnVuftcDQ/vY/+z/DQeGjmk"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 22815,
    "path": "../public/assets/admin.categories-CT3xKJY6.js"
  },
  "/assets/admin.comments-BBmEa6f-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897-sdznRNd928nFoiRgToyONINi6og"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 2199,
    "path": "../public/assets/admin.comments-BBmEa6f-.js"
  },
  "/assets/admin.destinations-C-DY-VN1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26bb-syrmdZqFfBANvCVekgXR4GZPxaE"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 9915,
    "path": "../public/assets/admin.destinations-C-DY-VN1.js"
  },
  "/assets/admin.gallery-D3yn67bN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5693-ISYE7ADjLELWgU99eK14o5XIjDA"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 22163,
    "path": "../public/assets/admin.gallery-D3yn67bN.js"
  },
  "/assets/admin.analytics-iwnlFNuE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64585-6QIlQAcqikEE36BaOuGBbl7nvdM"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 411013,
    "path": "../public/assets/admin.analytics-iwnlFNuE.js"
  },
  "/assets/admin.homepage-Ci7mw1W_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6719-55zcshgzGdQVGEV76RYj+kacCwU"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 26393,
    "path": "../public/assets/admin.homepage-Ci7mw1W_.js"
  },
  "/assets/admin.index-bPqxvTg8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"feb-suKut8uuyclILLWMB6FqsXr4lRw"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 4075,
    "path": "../public/assets/admin.index-bPqxvTg8.js"
  },
  "/assets/admin.messages-CoIYSN_z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a5-jl7i72GREi3nbZ0D7Mg/XNiGyqQ"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 4773,
    "path": "../public/assets/admin.messages-CoIYSN_z.js"
  },
  "/assets/admin.news-CzTHt2sr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"86bc-iOXvnt/Kbz0nXMBGfJ+ui515Yq8"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 34492,
    "path": "../public/assets/admin.news-CzTHt2sr.js"
  },
  "/assets/admin.posts.index-DaTLnC6k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"243b-jFFR84dZMlj5n3HSel7Yeqz9TOg"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 9275,
    "path": "../public/assets/admin.posts.index-DaTLnC6k.js"
  },
  "/assets/admin.posts.new-CPLjSmRo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ba-pkXjB13dZTlE03LWqRtrCN/5W/Y"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 698,
    "path": "../public/assets/admin.posts.new-CPLjSmRo.js"
  },
  "/assets/admin.posts._id-DUqiMxYo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ef-N6APDksniSmw/kcb2q7xHk+wXvY"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 1007,
    "path": "../public/assets/admin.posts._id-DUqiMxYo.js"
  },
  "/assets/admin.public-message-D9J3J0FD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d6f-jJYffDyDgX7lNa0K5Pw8shYjHVQ"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 19823,
    "path": "../public/assets/admin.public-message-D9J3J0FD.js"
  },
  "/assets/admin.settings-Bh1fC1JW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ebd-SuS/9AgglMUdQDZJocvyzyHT9zo"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 16061,
    "path": "../public/assets/admin.settings-Bh1fC1JW.js"
  },
  "/assets/admin.subscribers-B8mmAppy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f30-DrkKlTJRCk78y+GxhWxxkOrwcEc"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 12080,
    "path": "../public/assets/admin.subscribers-B8mmAppy.js"
  },
  "/assets/AdSlot-BU6Ez6Ms.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b6-9F5hsrjupcrl4+2ZhIA9ZYEwW5g"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 2230,
    "path": "../public/assets/AdSlot-BU6Ez6Ms.js"
  },
  "/assets/arrow-left-CUdSOpWj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-fET20eivWGZW5KMMhW5yNjE9zLM"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 166,
    "path": "../public/assets/arrow-left-CUdSOpWj.js"
  },
  "/assets/alert-dialog-Dvav0VZp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190b-Y13NAD7tVcG/NKV/2OHlFadHt1w"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 6411,
    "path": "../public/assets/alert-dialog-Dvav0VZp.js"
  },
  "/assets/arrow-up-right-BKwdPMp_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-dDRi/JC5FsDkjUqRmUu1JYel/ZA"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-BKwdPMp_.js"
  },
  "/assets/auth-CLdrv64X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ffc-swpZq1Atbpa5wg9Rha9nZlmMZjQ"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 8188,
    "path": "../public/assets/auth-CLdrv64X.js"
  },
  "/assets/blog-gIBcZyBx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-5PLbcKgiJqyjLPeq0mmKzVqUr0g"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 103,
    "path": "../public/assets/blog-gIBcZyBx.js"
  },
  "/assets/blog._slug-CLL_Pu2g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-vio7s/TAqXSWZcwBtGp5ONgwd5Q"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 572,
    "path": "../public/assets/blog._slug-CLL_Pu2g.js"
  },
  "/assets/blog.index-BL7XzqsR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"288e-r64CxjbW5YprzKU6w205RtnlpqQ"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 10382,
    "path": "../public/assets/blog.index-BL7XzqsR.js"
  },
  "/assets/blog._slug-DUGFpXm6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"71bb-fZzMLPgXOteI1C8A268Ge7qRiRk"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 29115,
    "path": "../public/assets/blog._slug-DUGFpXm6.js"
  },
  "/assets/calendar-Dg3-6MC-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-QoqwL1I0Ylx7iELWEkjF/saGqNM"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 258,
    "path": "../public/assets/calendar-Dg3-6MC-.js"
  },
  "/assets/book-open-370VtRX8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-txnXB5rF+ODmANXiOC62Ou0nE2g"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 280,
    "path": "../public/assets/book-open-370VtRX8.js"
  },
  "/assets/category._slug-3esrTAAi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f02-ozcgOLlgk5YJysDjAF4wX5Zv/+Q"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 3842,
    "path": "../public/assets/category._slug-3esrTAAi.js"
  },
  "/assets/chart-column-BLqMkl6w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-YQu0RKtS74NqXkya9helzSE3+rU"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 252,
    "path": "../public/assets/chart-column-BLqMkl6w.js"
  },
  "/assets/check-D9BvLyDp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d-34mWSK0bxRIIxEJCGWxidtcXTjQ"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 125,
    "path": "../public/assets/check-D9BvLyDp.js"
  },
  "/assets/chevron-left-lFqtOjmB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-DYAD5Hop0rjojxjrqoyNF4MnDK4"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 131,
    "path": "../public/assets/chevron-left-lFqtOjmB.js"
  },
  "/assets/chevron-right-CTDxbtGV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-jTUB8dWTrqhkuSm1MWbLEaFWPkQ"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 131,
    "path": "../public/assets/chevron-right-CTDxbtGV.js"
  },
  "/assets/circle-check-C2l05Nar.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-CR3aNgLJSeMAw1EkfWg9Z9QrSEU"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 179,
    "path": "../public/assets/circle-check-C2l05Nar.js"
  },
  "/assets/clock-ek2sCoqx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-BmJ78dkMhzMcewZy1zBN/1djlOw"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 170,
    "path": "../public/assets/clock-ek2sCoqx.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/contact-BkVyrZxm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"39fd-cxh/6y7V9WDeeePEqVlPNOiVFJ8"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 14845,
    "path": "../public/assets/contact-BkVyrZxm.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-B7td2sBp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-BTUKrJgDUphJYT0bItx40w2kgPI"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 103,
    "path": "../public/assets/destinations-B7td2sBp.js"
  },
  "/assets/destinations.index-GQ_CwLYc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1409-HgqAjVCbslg3mhimBnuIldvKewg"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 5129,
    "path": "../public/assets/destinations.index-GQ_CwLYc.js"
  },
  "/assets/destinations._slug-DzwGaTm8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-d+10bv+mBTW6YZdiVlItHP2KRIA"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DzwGaTm8.js"
  },
  "/assets/destinations._slug-JAIeexYf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cd9-S8KUo5oT6yTolImXg1dVjFrDlvg"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 7385,
    "path": "../public/assets/destinations._slug-JAIeexYf.js"
  },
  "/assets/DestinationsMap-4kvS0vv6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f64-wdUPZvOZkY+TOgH3K7CkE0+nMyA"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 3940,
    "path": "../public/assets/DestinationsMap-4kvS0vv6.js"
  },
  "/assets/dialog-DB_bB9Nh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-DneDy2XuvAZWCHgSRMKsZmCCLlg"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 1830,
    "path": "../public/assets/dialog-DB_bB9Nh.js"
  },
  "/assets/earth-CQaqZk7u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-u90Rq/92vRMQDD8KLLRPm1gG5G8"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 394,
    "path": "../public/assets/earth-CQaqZk7u.js"
  },
  "/assets/external-link-B0B3obhW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-HOMHlBRmVixhX5pSuDTIBZYvVts"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 252,
    "path": "../public/assets/external-link-B0B3obhW.js"
  },
  "/assets/eye-B88sutPy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-/jASV/gdue0vCmhEEVhAV7MCmC8"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 257,
    "path": "../public/assets/eye-B88sutPy.js"
  },
  "/assets/flame-CRcdAVUP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-iHKDgJc5qBl59QuUavkpmV8YtqA"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 200,
    "path": "../public/assets/flame-CRcdAVUP.js"
  },
  "/assets/folder-tree-BYR0z0Em.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-kJYlqRmDXJgbaPFbGINVPC7qnEQ"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 480,
    "path": "../public/assets/folder-tree-BYR0z0Em.js"
  },
  "/assets/gallery-BnsTZiCn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"188d-8JlByN7suFvfiVvYIjDDilw7WPk"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 6285,
    "path": "../public/assets/gallery-BnsTZiCn.js"
  },
  "/assets/geocoding.functions-CZfabOq_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-GSSJF2bpXjpV522OWWtelLrvRa8"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 302,
    "path": "../public/assets/geocoding.functions-CZfabOq_.js"
  },
  "/assets/house-C8v1FP2d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11a-3nZ9Rh+Zazoa0O2nuF2LnbmlELY"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 282,
    "path": "../public/assets/house-C8v1FP2d.js"
  },
  "/assets/image-DnIE9O0o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-SDOnGke/js3lTVArkoPjziUOTHo"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 270,
    "path": "../public/assets/image-DnIE9O0o.js"
  },
  "/assets/index-D6oUG22c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a267-LrVV/Rd5urokzUK3zcpIir8imr8"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 172647,
    "path": "../public/assets/index-D6oUG22c.js"
  },
  "/assets/key-round-ovipXU8j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-K3gKPw2izMEYcF2PX3cshSbBXAs"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 356,
    "path": "../public/assets/key-round-ovipXU8j.js"
  },
  "/assets/layers-CD7rwf71.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-7Y6+zEZMWdjOQv+ILL7AGephtWk"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 422,
    "path": "../public/assets/layers-CD7rwf71.js"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/list-CoT0T7OT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-IPQZIxr03DqimgC0AAYJVYodQRw"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 303,
    "path": "../public/assets/list-CoT0T7OT.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-BQloW2x5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"392-yUiP1vZefBNl4UINCmsdk0hU8sU"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 914,
    "path": "../public/assets/maximize-2-BQloW2x5.js"
  },
  "/assets/message-square-xjxv7-hm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-8kszXsPCk6gP/rwJL/+ey9VPQFc"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 234,
    "path": "../public/assets/message-square-xjxv7-hm.js"
  },
  "/assets/leaflet-src-cKxjQIh8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-MFBlBD54BQYWxZVS5TPmF1AaYRI"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-cKxjQIh8.js"
  },
  "/assets/index-DAdpT3XH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-+pfRHAS99HiSQmkymI+IgDHLk2Q"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 290228,
    "path": "../public/assets/index-DAdpT3XH.js"
  },
  "/assets/navigation-C3U4Wmp-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-WPEOiOJ0L0HnNTP9lHBiDMqkFFE"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 149,
    "path": "../public/assets/navigation-C3U4Wmp-.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-27T03:31:27.276Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-BYGWuiyd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ab-KClIKTqwf2R5jZO7peMEBj5RLg4"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 4523,
    "path": "../public/assets/news._slug-BYGWuiyd.js"
  },
  "/assets/index-CZ5dXz7i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8195-hlEr7XhjzTpETdE8zII6rOPeS3w"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 950677,
    "path": "../public/assets/index-CZ5dXz7i.js"
  },
  "/assets/PageBreadcrumbs-BosRKfWS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-epggFZiO5RqJH0KulJZI+qdNE3c"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-BosRKfWS.js"
  },
  "/assets/news._slug-DJ59Ufp0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-AOW+U4RbUZqCEmpG4Nj8uXItCWU"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 974,
    "path": "../public/assets/news._slug-DJ59Ufp0.js"
  },
  "/assets/plus-C985YQsP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-6Y94mP2t4Fq3Q2Sx3qB6pOfu9Ho"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 154,
    "path": "../public/assets/plus-C985YQsP.js"
  },
  "/assets/pencil-Bll07RQW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-OS26mv2DzyKotU3lttbsZl6Kg0M"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 277,
    "path": "../public/assets/pencil-Bll07RQW.js"
  },
  "/assets/PostCard-1FtKlHQD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"da6-bYRVwmT9/TltAiUhIambKaJuEpM"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 3494,
    "path": "../public/assets/PostCard-1FtKlHQD.js"
  },
  "/assets/radio-BVEX8N3k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-BS2cpC+rqnlfw0UNknpnG+6lveQ"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 375,
    "path": "../public/assets/radio-BVEX8N3k.js"
  },
  "/assets/PostEditor-BUAythMG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b13b-Wza0loQQXiinRie99nifjPPd49g"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 45371,
    "path": "../public/assets/PostEditor-BUAythMG.js"
  },
  "/assets/refresh-cw-DIbPMl-K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-XlBeMUWJvzPMjW3HxQJdRfGWemM"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-DIbPMl-K.js"
  },
  "/assets/route-dnGWYmIU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-6g0CNhfbGpcu/jfsATis/TjOfnc"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 95,
    "path": "../public/assets/route-dnGWYmIU.js"
  },
  "/assets/save-Hfcy46HD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-O4dVxpL0FYzWGwHyGy58Q/oke9Y"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 328,
    "path": "../public/assets/save-Hfcy46HD.js"
  },
  "/assets/settings-BmZbHeI6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-XRm63y13j9eQ4FOYo+/QA3zqBQM"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 488,
    "path": "../public/assets/settings-BmZbHeI6.js"
  },
  "/assets/shield-check-DX2QeMBi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-XoMTcpL9OoErtOOZZ3rpU7Ya5xw"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 321,
    "path": "../public/assets/shield-check-DX2QeMBi.js"
  },
  "/assets/share-2-DmynQAw7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-5f3apohfN7+qn7yZyPB8sUdQbwY"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 358,
    "path": "../public/assets/share-2-DmynQAw7.js"
  },
  "/assets/shield-CURA9ACV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-bubce01eYhO8niall8OpsTXBTgU"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 273,
    "path": "../public/assets/shield-CURA9ACV.js"
  },
  "/assets/star-C_5VKsJM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-CMTqjrAOEk9cjPSqHWbD0BNGorM"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 473,
    "path": "../public/assets/star-C_5VKsJM.js"
  },
  "/assets/topics._slug-BshKRKCH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"858-xUi4Fqr9SnpKYEKwQDPGu0tyjbw"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 2136,
    "path": "../public/assets/topics._slug-BshKRKCH.js"
  },
  "/assets/styles-C0dABRQT.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2a106-2/DYlva+h9VXWpj1M3L8N+TljZk"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 172294,
    "path": "../public/assets/styles-C0dABRQT.css"
  },
  "/assets/trash-2-BLLquTkr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-T/0/7CvG7MQ3JIh45BlqWfWAYSs"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 329,
    "path": "../public/assets/trash-2-BLLquTkr.js"
  },
  "/assets/triangle-alert-YlVPuzV9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-XqK3A+EyA2O07R0XfaCH7n+Uzyc"',
    "mtime": "2026-08-27T03:31:27.297Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-YlVPuzV9.js"
  },
  "/assets/upload-D1AMIPhr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-u/t1L9iEmDbg1Y5q04QaIQofgp4"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 231,
    "path": "../public/assets/upload-D1AMIPhr.js"
  },
  "/assets/useMutation-CBAGcuZn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a3-HKhi6OrJIKBXL0UgJZDvRnWU6+A"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 2211,
    "path": "../public/assets/useMutation-CBAGcuZn.js"
  },
  "/assets/users-fzdxm61w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-HlmRk5kekM7kUxQWyaVvoUryezA"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 307,
    "path": "../public/assets/users-fzdxm61w.js"
  },
  "/assets/useSuspenseQuery-0ysHkhGK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-SSZ+zTZ66V0yjvyTXWy8x3PdJy0"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-0ysHkhGK.js"
  },
  "/assets/utils-DxBjRLZD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea4e-jpnU5jns+FlO/Ghyza/Xyx5+W4o"',
    "mtime": "2026-08-27T03:31:27.292Z",
    "size": 59982,
    "path": "../public/assets/utils-DxBjRLZD.js"
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
