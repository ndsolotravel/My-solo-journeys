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
  "/.htaccess.zst": {
    "type": "text/plain; charset=utf-8",
    "encoding": "zstd",
    "etag": '"3c1-PuoBmDTnOTkw8qU8wSEXxsOiPqY"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 961,
    "path": "../public/.htaccess.zst"
  },
  "/.htaccess.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": '"312-MSJldFCVVlOMi8S8g9qR8an4ts0"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 786,
    "path": "../public/.htaccess.br"
  },
  "/.htaccess.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": '"391-fmf66dLPkKr3aNjw9PNv+zvk1yM"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 913,
    "path": "../public/.htaccess.gz"
  },
  "/.htaccess": {
    "type": "text/plain; charset=utf-8",
    "etag": '"e54-/ws8RH2Vpqu+9vhRjSPNpfWyYgU"',
    "mtime": "2026-09-25T16:13:18.128Z",
    "size": 3668,
    "path": "../public/.htaccess"
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
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"13a-WkFg/AmDpXwIZNb50wwBw/FeOJo"',
    "mtime": "2026-08-09T22:33:08.491Z",
    "size": 314,
    "path": "../public/manifest.webmanifest"
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
    "etag": '"9d-etLSqX3fG1B+TW9VM7mj7SGX4zs"',
    "mtime": "2026-09-12T21:14:00.085Z",
    "size": 157,
    "path": "../public/robots.txt"
  },
  "/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/nd-about.jpg"
  },
  "/assets/about-DaZF4bd4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6821-8AGW7Y34wJtrqnuq8tMpXi7VnLU"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 26657,
    "path": "../public/assets/about-DaZF4bd4.js"
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
  "/assets/about.functions-CGQp24DG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3225-fD9dntr6OYNWIITc7jYEJcBZ2NU"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 12837,
    "path": "../public/assets/about.functions-CGQp24DG.js"
  },
  "/assets/about-DaZF4bd4.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"14b3-/R9R/C/sIl4drkkH6JV5HM0k/zU"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 5299,
    "path": "../public/assets/about-DaZF4bd4.js.br"
  },
  "/images/nd-about.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-08-16T21:50:00.913Z",
    "size": 95709,
    "path": "../public/images/nd-about.jpg"
  },
  "/assets/about-DaZF4bd4.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1773-SQw5lBk6fYDHeyG3NOHiRGD7rAc"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 6003,
    "path": "../public/assets/about-DaZF4bd4.js.gz"
  },
  "/assets/about-DaZF4bd4.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1a52-QDFDgod3PoinNESjhQ484rzvZ3k"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 6738,
    "path": "../public/assets/about-DaZF4bd4.js.zst"
  },
  "/assets/about.functions-CGQp24DG.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"10af-aL7lCsM8usV4N/L1FxPhiTUtnuU"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 4271,
    "path": "../public/assets/about.functions-CGQp24DG.js.br"
  },
  "/assets/account-D7V6g4wD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81b-1f5KBJDAu8tTjgduYQEFp6ai6LM"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 2075,
    "path": "../public/assets/account-D7V6g4wD.js"
  },
  "/assets/about.functions-CGQp24DG.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"145d-YeDGDPOLQDnBd8awNI+cQfWOUbA"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 5213,
    "path": "../public/assets/about.functions-CGQp24DG.js.gz"
  },
  "/assets/about.functions-CGQp24DG.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"153c-lE/Du5l99OcZ7inaLhmIkKlnxQs"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 5436,
    "path": "../public/assets/about.functions-CGQp24DG.js.zst"
  },
  "/assets/account-D7V6g4wD.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"303-3oNIb44iq0PxJjssU4PZY8eV8gM"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 771,
    "path": "../public/assets/account-D7V6g4wD.js.br"
  },
  "/assets/account-D7V6g4wD.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"371-cNjthR7MDoR/5+hRf1YzB/GeK88"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 881,
    "path": "../public/assets/account-D7V6g4wD.js.gz"
  },
  "/assets/account-D7V6g4wD.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"39e-jTE1ZN60D/TmbTA+Fc6Hog0eNt8"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 926,
    "path": "../public/assets/account-D7V6g4wD.js.zst"
  },
  "/assets/admin-mDDJSrD-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f28-FiE2q+IXBf6YDA9Apw2WEAl6z7w"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 3880,
    "path": "../public/assets/admin-mDDJSrD-.js"
  },
  "/assets/activity-3Hvk_KxZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"eb-kGELRT5fi4iY8mapBjOX7Ea/wjM"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 235,
    "path": "../public/assets/activity-3Hvk_KxZ.js"
  },
  "/assets/admin-mDDJSrD-.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"6b7-99nCx1MMteDOWvLvVCeqUnufIiM"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 1719,
    "path": "../public/assets/admin-mDDJSrD-.js.gz"
  },
  "/assets/admin-mDDJSrD-.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"5f9-ZD9ONdeh3UPfjxUlhld13VKpkKk"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 1529,
    "path": "../public/assets/admin-mDDJSrD-.js.br"
  },
  "/assets/admin.about-_bKOyTxp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11336-MgD00OusSzZt1MxAOxzqSfPrUi8"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 70454,
    "path": "../public/assets/admin.about-_bKOyTxp.js"
  },
  "/assets/admin-mDDJSrD-.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"6ea-XOwXxEL3wO1wsbc2sQewiCkfLC8"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 1770,
    "path": "../public/assets/admin-mDDJSrD-.js.zst"
  },
  "/assets/admin.about-_bKOyTxp.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"1c7d-YgSDeXPNliASLE1t4IHIB+2U60c"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 7293,
    "path": "../public/assets/admin.about-_bKOyTxp.js.br"
  },
  "/assets/admin.analytics-rHZFv0Pt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"643d7-Eq1wjFerCgEs0H2i9hR6eP0VcS0"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 410583,
    "path": "../public/assets/admin.analytics-rHZFv0Pt.js"
  },
  "/assets/admin.about-_bKOyTxp.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"2238-Xcbm1xJTyLFIVtYKQYlm5otxYZo"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 8760,
    "path": "../public/assets/admin.about-_bKOyTxp.js.gz"
  },
  "/assets/admin.about-_bKOyTxp.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"2804-phcldiZZ0ZIbckPj540ZBrGZeqw"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 10244,
    "path": "../public/assets/admin.about-_bKOyTxp.js.zst"
  },
  "/assets/admin.categories-CrynS5Si.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5d86-S9qlLg1KwRPwiOssTvZsIx58o/8"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 23942,
    "path": "../public/assets/admin.categories-CrynS5Si.js"
  },
  "/assets/admin.analytics-rHZFv0Pt.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"166ab-pB/YipfTCGa7YhqTht1qoAn55vc"',
    "mtime": "2026-09-25T16:14:41.484Z",
    "size": 91819,
    "path": "../public/assets/admin.analytics-rHZFv0Pt.js.br"
  },
  "/assets/admin.analytics-rHZFv0Pt.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1b6e1-hAI7/73wCNSfXFTeqR0uNDk9qJc"',
    "mtime": "2026-09-25T16:14:41.114Z",
    "size": 112353,
    "path": "../public/assets/admin.analytics-rHZFv0Pt.js.gz"
  },
  "/assets/admin.colors-CmWAm97o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"520a-M11mkDhnizt+skSfuh3d0L31Yi4"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 21002,
    "path": "../public/assets/admin.colors-CmWAm97o.js"
  },
  "/assets/admin.analytics-rHZFv0Pt.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1b0ec-jV6gbq+etdfLrOgC4D9koT7MD+U"',
    "mtime": "2026-09-25T16:14:41.114Z",
    "size": 110828,
    "path": "../public/assets/admin.analytics-rHZFv0Pt.js.zst"
  },
  "/assets/admin.categories-CrynS5Si.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"13bb-NObbfW0bz2Lsu4dGhoGXCTB7S7o"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 5051,
    "path": "../public/assets/admin.categories-CrynS5Si.js.br"
  },
  "/assets/admin.categories-CrynS5Si.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"16ab-hQPLYZ+FtPf8Op/ii7qdJioF274"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 5803,
    "path": "../public/assets/admin.categories-CrynS5Si.js.gz"
  },
  "/assets/admin.categories-CrynS5Si.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"18e6-0aFOBksqlw9zf3to7t2PdI+zQds"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 6374,
    "path": "../public/assets/admin.categories-CrynS5Si.js.zst"
  },
  "/assets/admin.comments-BaGPXL2L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91e-dlKRStny4choW3MykdbC+k6AQKM"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 2334,
    "path": "../public/assets/admin.comments-BaGPXL2L.js"
  },
  "/assets/admin.colors-CmWAm97o.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"11d0-gWctXUdxto4HtAhXsazDpz+Cih8"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 4560,
    "path": "../public/assets/admin.colors-CmWAm97o.js.br"
  },
  "/assets/admin.colors-CmWAm97o.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"14dc-CAOj07Ai+Wj3RpD1S6YVgpi10jQ"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 5340,
    "path": "../public/assets/admin.colors-CmWAm97o.js.gz"
  },
  "/assets/admin.colors-CmWAm97o.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"16c4-QuA89apuLga/yImKoJM2BQ9betY"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 5828,
    "path": "../public/assets/admin.colors-CmWAm97o.js.zst"
  },
  "/assets/admin.comments-BaGPXL2L.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"3a6-p4fOLcLReXp/PvGf20kvej0v87M"',
    "mtime": "2026-09-25T16:14:41.043Z",
    "size": 934,
    "path": "../public/assets/admin.comments-BaGPXL2L.js.br"
  },
  "/assets/admin.comments-BaGPXL2L.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"436-E412/A3oHXrR8i/KUsf9Uok4spg"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 1078,
    "path": "../public/assets/admin.comments-BaGPXL2L.js.gz"
  },
  "/assets/admin.comments-BaGPXL2L.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"46b-IZDkpyzWSo+uXAn6GU8ILeY/dik"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 1131,
    "path": "../public/assets/admin.comments-BaGPXL2L.js.zst"
  },
  "/assets/admin.contact-BA8FbmJg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"393c-8AhvQZTjmG0aW6rG5rTi+k0WClw"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 14652,
    "path": "../public/assets/admin.contact-BA8FbmJg.js"
  },
  "/assets/admin.destinations-CuGsYWBk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6a75-S/Puf/M30T1+kcHxPpNhLwvBtTI"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 27253,
    "path": "../public/assets/admin.destinations-CuGsYWBk.js"
  },
  "/assets/admin.contact-BA8FbmJg.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"d1e-STlmKxuusFskGhxhaDPoiQALPSc"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 3358,
    "path": "../public/assets/admin.contact-BA8FbmJg.js.br"
  },
  "/assets/admin.contact-BA8FbmJg.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"f48-OiDxVCfDYOjB7c0GeOGeNQ/OUcI"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 3912,
    "path": "../public/assets/admin.contact-BA8FbmJg.js.gz"
  },
  "/assets/admin.contact-BA8FbmJg.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1067-dgB1Zp08Qs4sT1TlHaIJk4GnzWU"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 4199,
    "path": "../public/assets/admin.contact-BA8FbmJg.js.zst"
  },
  "/assets/admin.destinations-CuGsYWBk.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"163c-5bKkX79YcNyjgy0SsR3g/d6NY6w"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 5692,
    "path": "../public/assets/admin.destinations-CuGsYWBk.js.br"
  },
  "/assets/admin.destinations-CuGsYWBk.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1969-QkLr1Cc60yB+Isx0iNGUG+Ml9iA"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 6505,
    "path": "../public/assets/admin.destinations-CuGsYWBk.js.gz"
  },
  "/assets/admin.destinations-CuGsYWBk.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1c08-f9ChYetZ9LsrAS6GsiX5nUp6xfc"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 7176,
    "path": "../public/assets/admin.destinations-CuGsYWBk.js.zst"
  },
  "/assets/admin.gallery-BN5QK5fP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9417-ruVpb7s2Db8ZrOZcTYzpzyv5CD0"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 37911,
    "path": "../public/assets/admin.gallery-BN5QK5fP.js"
  },
  "/assets/admin.gallery-BN5QK5fP.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"1f55-MvZaW41krr5uSXMWt0Z+/GnNLT4"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 8021,
    "path": "../public/assets/admin.gallery-BN5QK5fP.js.br"
  },
  "/assets/admin.gallery-BN5QK5fP.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"2361-9V3hZ7rUuYTVdW7TtCQkdah/vNo"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 9057,
    "path": "../public/assets/admin.gallery-BN5QK5fP.js.gz"
  },
  "/assets/admin.homepage-DiVVnZ29.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f37c-CnxepOM99+x295T0Ndq4ICSulEI"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 62332,
    "path": "../public/assets/admin.homepage-DiVVnZ29.js"
  },
  "/assets/admin.gallery-BN5QK5fP.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"2797-axJq7uq+gNf4VeUzFJp1Ja4y0Tw"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 10135,
    "path": "../public/assets/admin.gallery-BN5QK5fP.js.zst"
  },
  "/assets/admin.homepage-DiVVnZ29.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"2895-nQtGbCqkT8X1qSMXsmPR3IQOdzo"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 10389,
    "path": "../public/assets/admin.homepage-DiVVnZ29.js.br"
  },
  "/assets/admin.index-BXrSS95T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fa7-an5XhLQoq0xiPBtybpiYXzGmizo"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 4007,
    "path": "../public/assets/admin.index-BXrSS95T.js"
  },
  "/assets/admin.homepage-DiVVnZ29.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"2f80-SSVoW0ZtzCH5ep1ihutMEzOFpf4"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 12160,
    "path": "../public/assets/admin.homepage-DiVVnZ29.js.gz"
  },
  "/assets/admin.homepage-DiVVnZ29.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"34f0-j0LwBJ2HPrExRPX45UwCnAi45us"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 13552,
    "path": "../public/assets/admin.homepage-DiVVnZ29.js.zst"
  },
  "/assets/admin.index-BXrSS95T.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"472-GNBOYTr19NjyDdQGyMQAS2EzlZI"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 1138,
    "path": "../public/assets/admin.index-BXrSS95T.js.br"
  },
  "/assets/admin.legal-C1IomasK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4366-l0jZAOeb8tecUj3Z0YFbH/O2RlE"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 17254,
    "path": "../public/assets/admin.legal-C1IomasK.js"
  },
  "/assets/admin.index-BXrSS95T.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"527-1DKu1H/SHPSQ8xeIDVJoHqdM0nI"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 1319,
    "path": "../public/assets/admin.index-BXrSS95T.js.gz"
  },
  "/assets/admin.index-BXrSS95T.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"580-NQDX+C53W9UbmPHN7+H9ZQodIUU"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 1408,
    "path": "../public/assets/admin.index-BXrSS95T.js.zst"
  },
  "/assets/admin.legal-C1IomasK.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"ed3-8I1h8itnHJphkLakEy5szKCfGx0"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 3795,
    "path": "../public/assets/admin.legal-C1IomasK.js.br"
  },
  "/assets/admin.legal-C1IomasK.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1118-6CZSZh+T0dWHpC0ma8kABQQmvJU"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 4376,
    "path": "../public/assets/admin.legal-C1IomasK.js.gz"
  },
  "/assets/admin.legal-C1IomasK.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1277-STk5ipawfhvn4kRu3fGyVtAfln0"',
    "mtime": "2026-09-25T16:14:41.045Z",
    "size": 4727,
    "path": "../public/assets/admin.legal-C1IomasK.js.zst"
  },
  "/assets/admin.messages-BOtNz2U_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d3a-gnra4tZT3QNGo3kmg3C6EYit5+k"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 19770,
    "path": "../public/assets/admin.messages-BOtNz2U_.js"
  },
  "/assets/admin.news-Bm2_rJqF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8e47-5qTNLFZnSdNWJ1hiydSDVb+0zJk"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 36423,
    "path": "../public/assets/admin.news-Bm2_rJqF.js"
  },
  "/assets/admin.messages-BOtNz2U_.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"12ef-GGeweRz5DvT1gMQ+Q3FoGoF0PEs"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 4847,
    "path": "../public/assets/admin.messages-BOtNz2U_.js.gz"
  },
  "/assets/admin.messages-BOtNz2U_.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"109c-lLonNS8uC3UIHasDibIqDJILpB8"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 4252,
    "path": "../public/assets/admin.messages-BOtNz2U_.js.br"
  },
  "/assets/admin.posts.index-CwdND-9N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ff2-4x8pTxxQlFSDGeURFyJrqU7SeTM"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 12274,
    "path": "../public/assets/admin.posts.index-CwdND-9N.js"
  },
  "/assets/admin.news-Bm2_rJqF.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"1bf3-MrNQXZ2c/163/2/EqtyUz72xf0A"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 7155,
    "path": "../public/assets/admin.news-Bm2_rJqF.js.br"
  },
  "/assets/admin.news-Bm2_rJqF.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1fee-xJEMtPRf2eaSGfazKSBSr89L02A"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 8174,
    "path": "../public/assets/admin.news-Bm2_rJqF.js.gz"
  },
  "/assets/admin.news-Bm2_rJqF.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"2394-nxw4ohHcIVMPF3ufpT3snuRNjhI"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 9108,
    "path": "../public/assets/admin.news-Bm2_rJqF.js.zst"
  },
  "/assets/admin.posts.index-CwdND-9N.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"c8c-buCbJxi2JmNUVIAapYz/JmFmlsc"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 3212,
    "path": "../public/assets/admin.posts.index-CwdND-9N.js.br"
  },
  "/assets/admin.posts.index-CwdND-9N.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"e36-botFPeLSCeKL8YOjrW4xwAdUhhY"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 3638,
    "path": "../public/assets/admin.posts.index-CwdND-9N.js.gz"
  },
  "/assets/admin.posts.index-CwdND-9N.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"f37-9vjGqMDgk4VcNLlA5h2PooaAvNg"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 3895,
    "path": "../public/assets/admin.posts.index-CwdND-9N.js.zst"
  },
  "/assets/admin.posts.new-COV1fCmA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"40a-ShCdf4be/37QlD0F4O8so7T/tbg"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 1034,
    "path": "../public/assets/admin.posts.new-COV1fCmA.js"
  },
  "/assets/admin.posts._id-CNRJPMBh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"534-UJOTHqDLA0Uc38k0JOOgkIIwN4k"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 1332,
    "path": "../public/assets/admin.posts._id-CNRJPMBh.js"
  },
  "/assets/admin.messages-BOtNz2U_.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"14b2-ZfSibdqwfqaZOUpWX5nBAAHRY/E"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 5298,
    "path": "../public/assets/admin.messages-BOtNz2U_.js.zst"
  },
  "/assets/admin.posts.new-COV1fCmA.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"220-504Jvi5owXhL4Yyow9QGId9DevU"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 544,
    "path": "../public/assets/admin.posts.new-COV1fCmA.js.gz"
  },
  "/assets/admin.posts.new-COV1fCmA.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"1ed-mENrzoE5hL4XOpDQHyekBISLq94"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 493,
    "path": "../public/assets/admin.posts.new-COV1fCmA.js.br"
  },
  "/assets/admin.posts.new-COV1fCmA.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"232-6kDuF0olbNmj4InN6/zW1WRbACo"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 562,
    "path": "../public/assets/admin.posts.new-COV1fCmA.js.zst"
  },
  "/assets/admin.posts._id-CNRJPMBh.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"27d-omvueZ1KnVYqmyThVCBMA0rU3Q8"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 637,
    "path": "../public/assets/admin.posts._id-CNRJPMBh.js.br"
  },
  "/assets/admin.public-message-CPwZrhE6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"52bc-ghJTolIJm4U0oWzbPcD+dzmeoOo"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 21180,
    "path": "../public/assets/admin.public-message-CPwZrhE6.js"
  },
  "/assets/admin.posts._id-CNRJPMBh.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"2cc-wEzfmRej4X6/T79tMk0qqWBSBG0"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 716,
    "path": "../public/assets/admin.posts._id-CNRJPMBh.js.gz"
  },
  "/assets/admin.posts._id-CNRJPMBh.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"2ee-hWaFCXIiDcLmBFKqxeNkk2+0vKc"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 750,
    "path": "../public/assets/admin.posts._id-CNRJPMBh.js.zst"
  },
  "/assets/admin.settings-CwJag8ak.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4c0c-8Eo/wphPdTYHqIgdOMcdPmXCLOM"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 19468,
    "path": "../public/assets/admin.settings-CwJag8ak.js"
  },
  "/assets/admin.public-message-CPwZrhE6.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"113c-iIcvaWRsyUjeElTplA7SMqTcMLs"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 4412,
    "path": "../public/assets/admin.public-message-CPwZrhE6.js.br"
  },
  "/assets/admin.public-message-CPwZrhE6.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"13de-eLi0cgE7mumESS3lBSOfQ7Q7zKQ"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 5086,
    "path": "../public/assets/admin.public-message-CPwZrhE6.js.gz"
  },
  "/assets/admin.public-message-CPwZrhE6.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"15df-QEDWKxIoROeeP/tHDwv1rhzp4Lc"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 5599,
    "path": "../public/assets/admin.public-message-CPwZrhE6.js.zst"
  },
  "/assets/admin.settings-CwJag8ak.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"10aa-r+e2VXl1TdCB9JUb1U20QIAHWMA"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 4266,
    "path": "../public/assets/admin.settings-CwJag8ak.js.br"
  },
  "/assets/admin.subscribers-bBJyGTuP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31d8-Kq+5V3foJa+57cluVJH9YYavkoE"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 12760,
    "path": "../public/assets/admin.subscribers-bBJyGTuP.js"
  },
  "/assets/admin.settings-CwJag8ak.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1514-h7hcqVgQv8Vec1UD5tdZvm3KEg4"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 5396,
    "path": "../public/assets/admin.settings-CwJag8ak.js.zst"
  },
  "/assets/admin.settings-CwJag8ak.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1351-2T/XvdWx0ikJwbnNGGH+ZIJWgPo"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 4945,
    "path": "../public/assets/admin.settings-CwJag8ak.js.gz"
  },
  "/assets/admin.subscribers-bBJyGTuP.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"c2f-ykOWVo/y4OizHlsKl47iQWjJSFw"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 3119,
    "path": "../public/assets/admin.subscribers-bBJyGTuP.js.br"
  },
  "/assets/admin.typography-CT491veu.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"18d0-sbV/d7Yo8j0JQDBIWfucY67HtT4"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 6352,
    "path": "../public/assets/admin.typography-CT491veu.js.br"
  },
  "/assets/admin.typography-CT491veu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9b30-le+8m2af27US8dwP3D343P730Sw"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 39728,
    "path": "../public/assets/admin.typography-CT491veu.js"
  },
  "/assets/admin.subscribers-bBJyGTuP.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"ef3-YFS7xWcPChXbYOlmEjlBiehGgdM"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 3827,
    "path": "../public/assets/admin.subscribers-bBJyGTuP.js.zst"
  },
  "/assets/AdSlot-BdtTApYB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-0q89EpdA06USMzlNpau+ml7i48Q"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 1559,
    "path": "../public/assets/AdSlot-BdtTApYB.js"
  },
  "/assets/admin.subscribers-bBJyGTuP.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"dce-NxTkN5qQ/BKv24c4xy+PlIdEvxE"',
    "mtime": "2026-09-25T16:14:41.050Z",
    "size": 3534,
    "path": "../public/assets/admin.subscribers-bBJyGTuP.js.gz"
  },
  "/assets/AdSlot-BdtTApYB.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"345-vVfadhf+7PHK9kYzy1lQGOVTRqc"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 837,
    "path": "../public/assets/AdSlot-BdtTApYB.js.gz"
  },
  "/assets/admin.typography-CT491veu.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1fdd-Urarf+4S7THtxHS3t/aOvWQAO2c"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 8157,
    "path": "../public/assets/admin.typography-CT491veu.js.zst"
  },
  "/assets/AdSlot-BdtTApYB.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"2cb-aCQRX2viRh81Y4E97gK9mOKLqMQ"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 715,
    "path": "../public/assets/AdSlot-BdtTApYB.js.br"
  },
  "/assets/alert-dialog-DQvsT-kt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190d-MMPeyJItpWUOaTtJ8KwIg6bOulE"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 6413,
    "path": "../public/assets/alert-dialog-DQvsT-kt.js"
  },
  "/assets/AdSlot-BdtTApYB.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"364-WEccqVLPqPt3XKezWo69DJ5mLxU"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 868,
    "path": "../public/assets/AdSlot-BdtTApYB.js.zst"
  },
  "/assets/arrow-down-CtfuHZx3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-XnpU3eNhyS1CfHN8D09WBNEPkLc"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 166,
    "path": "../public/assets/arrow-down-CtfuHZx3.js"
  },
  "/assets/arrow-left-C4PGfytn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-xNLlcVhjMpJSlgW7XoYDuIfwiu8"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 166,
    "path": "../public/assets/arrow-left-C4PGfytn.js"
  },
  "/assets/alert-dialog-DQvsT-kt.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"98d-1LIH4c735FK2etJUHe0xH4/FdTI"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 2445,
    "path": "../public/assets/alert-dialog-DQvsT-kt.js.gz"
  },
  "/assets/admin.typography-CT491veu.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1d1c-tk1e8szh+9oC3pY5UuCn0iHDkx0"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 7452,
    "path": "../public/assets/admin.typography-CT491veu.js.gz"
  },
  "/assets/arrow-up-right-Dujgh6iE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-PT3YrIVPCTOzW4MhGTPeGP+YbCo"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-Dujgh6iE.js"
  },
  "/assets/auth-C0eNA1CD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f95-K0WVYzFNh5IMhL67iR+pOLJltck"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 8085,
    "path": "../public/assets/auth-C0eNA1CD.js"
  },
  "/assets/alert-dialog-DQvsT-kt.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"a02-65eo1rBjzRnVPc/9aAcbVHrXAus"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 2562,
    "path": "../public/assets/alert-dialog-DQvsT-kt.js.zst"
  },
  "/assets/auth-C0eNA1CD.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"96d-yk0Sak4GEodBR3wOiEcmQcJxy6c"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 2413,
    "path": "../public/assets/auth-C0eNA1CD.js.br"
  },
  "/assets/alert-dialog-DQvsT-kt.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"841-qb307AcrRmFPZ3u5aWNNOvhh+w0"',
    "mtime": "2026-09-25T16:14:41.052Z",
    "size": 2113,
    "path": "../public/assets/alert-dialog-DQvsT-kt.js.br"
  },
  "/assets/auth-C0eNA1CD.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"ae3-8/EsO4UkAzZqMIjsxJNCEfutP4A"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 2787,
    "path": "../public/assets/auth-C0eNA1CD.js.gz"
  },
  "/assets/auth-C0eNA1CD.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"b79-yWhuF9rUnr0iZPr4zgUp4OAgi6s"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 2937,
    "path": "../public/assets/auth-C0eNA1CD.js.zst"
  },
  "/assets/bike-_xndw7m4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"121-gcfoCOLr5IuDoLoGm7ToRhFPCe4"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 289,
    "path": "../public/assets/bike-_xndw7m4.js"
  },
  "/assets/blog-CHRYVzRo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-mhychgToVih3QP8EI9IOoYH/2GA"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 103,
    "path": "../public/assets/blog-CHRYVzRo.js"
  },
  "/assets/blog._slug-B9sJcs-u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"240-MGQIlRU9iY+dMK4AM++nMTk6GzI"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 576,
    "path": "../public/assets/blog._slug-B9sJcs-u.js"
  },
  "/assets/blog.index-Cqw9f8bR.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"b5a-Zq7gpy6cfgrof0sc68cczU0mHxE"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 2906,
    "path": "../public/assets/blog.index-Cqw9f8bR.js.gz"
  },
  "/assets/blog.index-Cqw9f8bR.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"c2c-B2UwmjOWBg3inkq5zOQmUN5xxJg"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 3116,
    "path": "../public/assets/blog.index-Cqw9f8bR.js.zst"
  },
  "/assets/blog._slug-Be5cDRtx.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"1e9f-OjY8v2N2CtCB3IU2oS89snk0608"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 7839,
    "path": "../public/assets/blog._slug-Be5cDRtx.js.br"
  },
  "/assets/book-open-Bxn0_Nty.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-wx3s24JNRBqaY3CdYJ3j1YiflkA"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 280,
    "path": "../public/assets/book-open-Bxn0_Nty.js"
  },
  "/assets/blog._slug-Be5cDRtx.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"2338-xknetAYNqWdJZ9HvqZ8S/Ed+A1w"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 9016,
    "path": "../public/assets/blog._slug-Be5cDRtx.js.gz"
  },
  "/assets/calendar-DokQf9lC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-eYprC1Vae5/VBDgEblkhOvsWtN8"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 258,
    "path": "../public/assets/calendar-DokQf9lC.js"
  },
  "/assets/blog._slug-Be5cDRtx.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"2565-GXVD0LO6vcm3feCsMrAzekJpYFY"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 9573,
    "path": "../public/assets/blog._slug-Be5cDRtx.js.zst"
  },
  "/assets/camera-Cl5echpM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"151-QM/TNiiK+kiQlgFbiVAeLDObH6Y"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 337,
    "path": "../public/assets/camera-Cl5echpM.js"
  },
  "/assets/blog.index-Cqw9f8bR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22b9-nFTFk4eaalfQMpyDTJhfjsMF64U"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 8889,
    "path": "../public/assets/blog.index-Cqw9f8bR.js"
  },
  "/assets/blog._slug-Be5cDRtx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6c22-51klin8VC8N8Cists4iacqhUYuA"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 27682,
    "path": "../public/assets/blog._slug-Be5cDRtx.js"
  },
  "/assets/category._slug-psJTJw7Q.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"50c-8FxHq88s3GjFmnPq5NejjwVXQEs"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 1292,
    "path": "../public/assets/category._slug-psJTJw7Q.js.br"
  },
  "/assets/chart-column-gD4wzdp7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-mF6qytTgknB/HjswFoW59K0zOnM"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 252,
    "path": "../public/assets/chart-column-gD4wzdp7.js"
  },
  "/assets/chevron-down-DUDzdU6i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-uqfIPNpIKVVIeQXriycG/zEhkLI"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 129,
    "path": "../public/assets/chevron-down-DUDzdU6i.js"
  },
  "/assets/category._slug-psJTJw7Q.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"619-4ZGLsQRnj0Mw2skenUn8HUiJ0lY"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 1561,
    "path": "../public/assets/category._slug-psJTJw7Q.js.zst"
  },
  "/assets/blog.index-Cqw9f8bR.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"a09-5GEUfrjUvBgqYjqb1NukSXfbULA"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 2569,
    "path": "../public/assets/blog.index-Cqw9f8bR.js.br"
  },
  "/assets/chevron-right-BTGodu4q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-SuqCvZpewfoQy8XHgc87s/cxRbg"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 131,
    "path": "../public/assets/chevron-right-BTGodu4q.js"
  },
  "/assets/chevron-left-Cas-fvjN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-BI5X+slB3lNm7BpUqwhu/R/HRh4"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 131,
    "path": "../public/assets/chevron-left-Cas-fvjN.js"
  },
  "/assets/circle-check-BbhMq3Av.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-dVx++cFmdQV5XKqVWQ8yAwcah3c"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 179,
    "path": "../public/assets/circle-check-BbhMq3Av.js"
  },
  "/assets/circle-x-DieKO1Tx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0-nvJhdOyZvdKWrdDnoI9Nu7+f/SA"',
    "mtime": "2026-09-25T16:14:29.116Z",
    "size": 208,
    "path": "../public/assets/circle-x-DieKO1Tx.js"
  },
  "/assets/clock-C-E2mi0Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-R93v7vHoyNDrFajNJd/o2QN4PsA"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 170,
    "path": "../public/assets/clock-C-E2mi0Y.js"
  },
  "/assets/category._slug-psJTJw7Q.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"5ce-Nd8+L1CGMUzxnjXGOZHWB4H2SAk"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 1486,
    "path": "../public/assets/category._slug-psJTJw7Q.js.gz"
  },
  "/assets/category._slug-psJTJw7Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f36-d9rZajbVzWLHKxzGpFxHStpDgWs"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 3894,
    "path": "../public/assets/category._slug-psJTJw7Q.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/compass-DellWv6b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-RnrjR7wVYMzMoE+u3PlEXts2f1Q"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 252,
    "path": "../public/assets/compass-DellWv6b.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-XoB1mNma.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-fQhDqm6PJGHdDwsh/OzuzaHTMeE"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 103,
    "path": "../public/assets/destinations-XoB1mNma.js"
  },
  "/assets/contact-BeViqChU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"510e-585pDek8sbLP0zZWQb/kgl2oD84"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 20750,
    "path": "../public/assets/contact-BeViqChU.js"
  },
  "/assets/contact-BeViqChU.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"1452-JqaYfvyVTBL3iptSdV+MbSrre8o"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 5202,
    "path": "../public/assets/contact-BeViqChU.js.br"
  },
  "/assets/destinations.index-DeewKSoX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7787-ZF7/ps/eC/ucjsueT1k5JKVEXL0"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 30599,
    "path": "../public/assets/destinations.index-DeewKSoX.js"
  },
  "/assets/contact-BeViqChU.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1925-Fc9SsKf5a0rx+ec/nfS5yi+JXbo"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 6437,
    "path": "../public/assets/contact-BeViqChU.js.zst"
  },
  "/assets/contact-BeViqChU.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"17c8-0OeMUDYOai01BpCtUmjSxHm8KSE"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 6088,
    "path": "../public/assets/contact-BeViqChU.js.gz"
  },
  "/assets/destinations.index-DeewKSoX.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"2133-0NxR8jLRGKTzbyC+pwC6ZIdFXd0"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 8499,
    "path": "../public/assets/destinations.index-DeewKSoX.js.br"
  },
  "/assets/destinations.index-DeewKSoX.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"252c-AyaIYGBwYvM0DUX5L0fI9m+ieIg"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 9516,
    "path": "../public/assets/destinations.index-DeewKSoX.js.gz"
  },
  "/assets/destinations._slug-BuOpAoy8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ced-QK0X0tTJm8KyFWu/9kUqmen5NLk"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 7405,
    "path": "../public/assets/destinations._slug-BuOpAoy8.js"
  },
  "/assets/destinations.index-DeewKSoX.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"279e-vq3bLrL1osH8VyWlGe+Xs0Zdj3o"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 10142,
    "path": "../public/assets/destinations.index-DeewKSoX.js.zst"
  },
  "/assets/destinations._slug-DVLsA3XT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-dgXCCSfhaFDHLk+RCjdiLqDzFcI"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-DVLsA3XT.js"
  },
  "/assets/destinations._slug-BuOpAoy8.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"886-Y2M5LmzVaylaBYz/7qXnQxDv6js"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 2182,
    "path": "../public/assets/destinations._slug-BuOpAoy8.js.gz"
  },
  "/assets/DestinationsMap-aF5mgF5d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e0-mhG/h0jv5GQL/ZLiYTY9YnvXWBE"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 4832,
    "path": "../public/assets/DestinationsMap-aF5mgF5d.js"
  },
  "/assets/destinations._slug-BuOpAoy8.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"774-exrt0sHOTz9rT0K+ik5lG56dcx8"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 1908,
    "path": "../public/assets/destinations._slug-BuOpAoy8.js.br"
  },
  "/assets/destinations._slug-BuOpAoy8.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"932-2Jm6X3QPY6qmhSQOOhSDt2PUX0A"',
    "mtime": "2026-09-25T16:14:41.053Z",
    "size": 2354,
    "path": "../public/assets/destinations._slug-BuOpAoy8.js.zst"
  },
  "/assets/DestinationsMap-aF5mgF5d.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"7c2-tvWFSQODQMNoId/KBqv6TtvI17w"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 1986,
    "path": "../public/assets/DestinationsMap-aF5mgF5d.js.br"
  },
  "/assets/DestinationsMap-aF5mgF5d.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"93c-9ALWciJRe37dQQCYs78/relixAU"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 2364,
    "path": "../public/assets/DestinationsMap-aF5mgF5d.js.gz"
  },
  "/assets/dialog-DntxK-hK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"726-cShfEnXjIbvE9pphrGpdLgn0kO8"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 1830,
    "path": "../public/assets/dialog-DntxK-hK.js"
  },
  "/assets/DestinationsMap-aF5mgF5d.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"998-4K4ZCQQTCcUijgbV8Q8FLHsa3nc"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 2456,
    "path": "../public/assets/DestinationsMap-aF5mgF5d.js.zst"
  },
  "/assets/dialog-DntxK-hK.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"2fa-RHlZWIuoSxQslqjZYJojyPR1G1E"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 762,
    "path": "../public/assets/dialog-DntxK-hK.js.gz"
  },
  "/assets/dialog-DntxK-hK.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"28c-Vv5OiM4UFsbdk8+S40RBnPgb/cw"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 652,
    "path": "../public/assets/dialog-DntxK-hK.js.br"
  },
  "/assets/dialog-DntxK-hK.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"32b-T+4+h4L8TB6H1SA3OajvODfiHog"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 811,
    "path": "../public/assets/dialog-DntxK-hK.js.zst"
  },
  "/assets/download-CeoBvmle.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e9-1f9SdzvqhJBEkZth6fOTcFPbigU"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 233,
    "path": "../public/assets/download-CeoBvmle.js"
  },
  "/assets/disclaimer-DBw42Myp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d1-Zmssg1HYZeFyqQI8Q5eRjaNLCt0"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 2001,
    "path": "../public/assets/disclaimer-DBw42Myp.js"
  },
  "/assets/disclaimer-DBw42Myp.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"334-OvDjIgQFtLjQNRfzEClgh+NVDeE"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 820,
    "path": "../public/assets/disclaimer-DBw42Myp.js.br"
  },
  "/assets/earth-C38Q7AIM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18a-6j8a52TNpoq4NnU/JmLMrfJhfe0"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 394,
    "path": "../public/assets/earth-C38Q7AIM.js"
  },
  "/assets/external-link-CweTUZX_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-ldT4J10I2zymoh0AOmBJKmg/6Hg"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 252,
    "path": "../public/assets/external-link-CweTUZX_.js"
  },
  "/assets/eye-off-BlF0aDpe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1af-AuRov3cl09LK/cB4SDHE6ge99zw"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 431,
    "path": "../public/assets/eye-off-BlF0aDpe.js"
  },
  "/assets/file-image-DRhZjcnk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"191-NQxBypXt7LEwcr7hTQZwwb+P81M"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 401,
    "path": "../public/assets/file-image-DRhZjcnk.js"
  },
  "/assets/flame-Bf-9B0MG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-v5+zmxput6PjCH09Y0W33NGp1vM"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 200,
    "path": "../public/assets/flame-Bf-9B0MG.js"
  },
  "/assets/folder-tree-DcRiODl7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-C/j3De943INMzTlwJb1CKXv5iZM"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 480,
    "path": "../public/assets/folder-tree-DcRiODl7.js"
  },
  "/assets/disclaimer-DBw42Myp.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"3b9-Z4rZstkJhnEGbhI+1Teo8gsRl3c"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 953,
    "path": "../public/assets/disclaimer-DBw42Myp.js.gz"
  },
  "/assets/disclaimer-DBw42Myp.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"3df-sHUitIO57mf42nYfcS/z8YmdD2o"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 991,
    "path": "../public/assets/disclaimer-DBw42Myp.js.zst"
  },
  "/assets/gallery-coxRV3Ot.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1779-wQXa2MzRWh6ZFlS1SBdXa30mjIY"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 6009,
    "path": "../public/assets/gallery-coxRV3Ot.js.gz"
  },
  "/assets/gallery-coxRV3Ot.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4e6f-fsMrS8/q+GpzlMaUp7FgslHbqz0"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 20079,
    "path": "../public/assets/gallery-coxRV3Ot.js"
  },
  "/assets/gallery._slug-BE98KDWx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"19f2-SHmWYLcmLjPg+A3j1XVcdTAbBug"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 6642,
    "path": "../public/assets/gallery._slug-BE98KDWx.js"
  },
  "/assets/gallery-coxRV3Ot.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"147f-aIGQVuHtAA3G6lPvcl/5QV30CI8"',
    "mtime": "2026-09-25T16:14:41.056Z",
    "size": 5247,
    "path": "../public/assets/gallery-coxRV3Ot.js.br"
  },
  "/assets/geocoding.functions-r0HVSytJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a9-7VRjpKSozfEq5sNrCyVYZxM986k"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 425,
    "path": "../public/assets/geocoding.functions-r0HVSytJ.js"
  },
  "/assets/gallery._slug-BE98KDWx.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"74e-zHnojTQiigT3o2xr6b/8CExWOgo"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 1870,
    "path": "../public/assets/gallery._slug-BE98KDWx.js.br"
  },
  "/assets/gallery-coxRV3Ot.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1922-MNZayBFCxw7NWU++x9fl9Kkn/0I"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 6434,
    "path": "../public/assets/gallery-coxRV3Ot.js.zst"
  },
  "/assets/gallery._slug-BE98KDWx.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"842-OIAJ2It7LXGk0z5S6H/04PsikzE"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 2114,
    "path": "../public/assets/gallery._slug-BE98KDWx.js.gz"
  },
  "/assets/gallery._slug-BzFsa4Vv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26c-n/yJMzU8jjIAGFtRbU5SaowUkPU"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 620,
    "path": "../public/assets/gallery._slug-BzFsa4Vv.js"
  },
  "/assets/HeroBannerManager-C1dj0nCY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4635-QGIu37K+9DBIA9QvVXrC6qMzH3I"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 17973,
    "path": "../public/assets/HeroBannerManager-C1dj0nCY.js"
  },
  "/assets/gallery._slug-BE98KDWx.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"8bc-M5LTE2L+etePjy4FWQy8Ad/L7P0"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 2236,
    "path": "../public/assets/gallery._slug-BE98KDWx.js.zst"
  },
  "/assets/HeroBannerManager-C1dj0nCY.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"1414-6yqSaBHOvbgFwxU5sfHJFw3h6L8"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 5140,
    "path": "../public/assets/HeroBannerManager-C1dj0nCY.js.zst"
  },
  "/assets/HeroBannerManager-C1dj0nCY.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"105d-QIharXTEqlkBpI/juAMAPiLHf0w"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 4189,
    "path": "../public/assets/HeroBannerManager-C1dj0nCY.js.br"
  },
  "/assets/HeroBannerManager-C1dj0nCY.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"12b5-eC1/9ekBvoJMamfRd11PV01xn38"',
    "mtime": "2026-09-25T16:14:41.054Z",
    "size": 4789,
    "path": "../public/assets/HeroBannerManager-C1dj0nCY.js.gz"
  },
  "/assets/image-Cq0CNdfq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e-5YtYeJndevYjIR1w5jnjG7awV+g"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 270,
    "path": "../public/assets/image-Cq0CNdfq.js"
  },
  "/assets/image-plus-B7optzSA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16c-OMOsnB67EHyvhDFUcSxG01uHTzM"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 364,
    "path": "../public/assets/image-plus-B7optzSA.js"
  },
  "/assets/inbox-DGTeNfBc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e4-s5JveLsWexw7uyJg0l32ZdfCzWs"',
    "mtime": "2026-09-25T16:14:29.116Z",
    "size": 484,
    "path": "../public/assets/inbox-DGTeNfBc.js"
  },
  "/assets/image-off-4BDE4zA5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29f-OuLZePpa4i6v7nUwSyfpbMLgLzs"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 671,
    "path": "../public/assets/image-off-4BDE4zA5.js"
  },
  "/assets/index-CMKWdqL2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46db4-T0SD7mdddD6s05cfOtLcm7kqbSI"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 290228,
    "path": "../public/assets/index-CMKWdqL2.js"
  },
  "/assets/index-1QUcfwIi.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"3e9c0-FdjyWKV2E/yrwSj7GiXdzbVeYa8"',
    "mtime": "2026-09-25T16:14:42.761Z",
    "size": 256448,
    "path": "../public/assets/index-1QUcfwIi.js.br"
  },
  "/assets/index-1QUcfwIi.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"4d0c2-GMWSgoYfuIbGOtVVtKPknK7Hnms"',
    "mtime": "2026-09-25T16:14:41.139Z",
    "size": 315586,
    "path": "../public/assets/index-1QUcfwIi.js.zst"
  },
  "/assets/index-1QUcfwIi.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"4a951-tbpc8XGECffIpwl0XgmYvpEQdNw"',
    "mtime": "2026-09-25T16:14:41.131Z",
    "size": 305489,
    "path": "../public/assets/index-1QUcfwIi.js.gz"
  },
  "/assets/index-CMKWdqL2.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"11fda-TC2yquLjqAdFP+h+fZbBBtvHBIA"',
    "mtime": "2026-09-25T16:14:41.108Z",
    "size": 73690,
    "path": "../public/assets/index-CMKWdqL2.js.br"
  },
  "/assets/index-CsHQcC4d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"295f4-6DL9PfxEkrAjL9O4lo/BPvStOhY"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 169460,
    "path": "../public/assets/index-CsHQcC4d.js"
  },
  "/assets/index-CMKWdqL2.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"16ca1-O5QyQ/2B3DIuyi67qGpo+6HyiXg"',
    "mtime": "2026-09-25T16:14:41.110Z",
    "size": 93345,
    "path": "../public/assets/index-CMKWdqL2.js.zst"
  },
  "/assets/info-B_VLovIP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"cd-Mope9ol0QOLiWptwTnvqE534+wQ"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 205,
    "path": "../public/assets/info-B_VLovIP.js"
  },
  "/assets/key-round-EhgreijA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-1nlfGeI327aRRO2ArgivlXv8gec"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 356,
    "path": "../public/assets/key-round-EhgreijA.js"
  },
  "/assets/index-CMKWdqL2.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"157ed-Ox5y+8q045zMhOM7Al3eWfvSSdQ"',
    "mtime": "2026-09-25T16:14:41.110Z",
    "size": 88045,
    "path": "../public/assets/index-CMKWdqL2.js.gz"
  },
  "/assets/layers-BIjgWEyK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-5D4QYKNNh6Vatr/RqlD4DEKZGgI"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 422,
    "path": "../public/assets/layers-BIjgWEyK.js"
  },
  "/assets/index-CsHQcC4d.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"c669-FEJ/kG+g+YZNsX4AJoZRX2mnOco"',
    "mtime": "2026-09-25T16:14:41.107Z",
    "size": 50793,
    "path": "../public/assets/index-CsHQcC4d.js.br"
  },
  "/assets/index-CsHQcC4d.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"dee5-p/Ud1a4hd95yy+LqOd7kBP/m2mQ"',
    "mtime": "2026-09-25T16:14:41.101Z",
    "size": 57061,
    "path": "../public/assets/index-CsHQcC4d.js.gz"
  },
  "/assets/leaflet-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 15607,
    "path": "../public/assets/leaflet-CIGW-MKW.css"
  },
  "/assets/leaflet-CIGW-MKW.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": '"165b-BKwTXAwO01aTxaBlU1UYDBbGSj0"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 5723,
    "path": "../public/assets/leaflet-CIGW-MKW.css.br"
  },
  "/assets/index-CsHQcC4d.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"ebda-TYSjedKfUociAvIrv0x1M5Dl8TA"',
    "mtime": "2026-09-25T16:14:41.101Z",
    "size": 60378,
    "path": "../public/assets/index-CsHQcC4d.js.zst"
  },
  "/assets/index-1QUcfwIi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fb93d-kQ06iYB5fv4+/HK6tGX4smOp3Nk"',
    "mtime": "2026-09-25T16:14:29.123Z",
    "size": 1030461,
    "path": "../public/assets/index-1QUcfwIi.js"
  },
  "/assets/leaflet-src-Cc_7RcXt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-rOgqBeO4rfRro15FqXXqO548qFA"',
    "mtime": "2026-09-25T16:14:29.123Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Cc_7RcXt.js"
  },
  "/assets/leaflet-CIGW-MKW.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": '"1937-4Ex9TI9157sKocFfRi/zvQ9A4EU"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 6455,
    "path": "../public/assets/leaflet-CIGW-MKW.css.gz"
  },
  "/assets/leaflet-CIGW-MKW.css.zst": {
    "type": "text/css; charset=utf-8",
    "encoding": "zstd",
    "etag": '"19d5-1+HRLqKxR2Di0H0EMnOt2rdYzaE"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 6613,
    "path": "../public/assets/leaflet-CIGW-MKW.css.zst"
  },
  "/assets/leaflet-src-Cc_7RcXt.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"9378-+Oy3j2/tBw6oxMLwPldjqfDjuU8"',
    "mtime": "2026-09-25T16:14:41.100Z",
    "size": 37752,
    "path": "../public/assets/leaflet-src-Cc_7RcXt.js.br"
  },
  "/assets/list-D0t7Vmc7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-fd7/kbQlpcbFHjUsdvguWc1mQXI"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 303,
    "path": "../public/assets/list-D0t7Vmc7.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/maximize-2-BGnc1t0P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-eq4gxrEFpN5EI59tQUfFPx+VNqc"',
    "mtime": "2026-09-25T16:14:29.108Z",
    "size": 239,
    "path": "../public/assets/maximize-2-BGnc1t0P.js"
  },
  "/assets/message-square-D0EhF3gX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-dcpO/S2OLlV3+uQuiakNsJLiFUI"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 234,
    "path": "../public/assets/message-square-D0EhF3gX.js"
  },
  "/assets/monitor-_bpgtfvf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104-ah5pBthdJTO7c0mA+0QDN9VWOW8"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 260,
    "path": "../public/assets/monitor-_bpgtfvf.js"
  },
  "/assets/mountain-Dy0c0Y9r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"89-K78dP5VUJb0rO2DuIYxEn+9I0x4"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 137,
    "path": "../public/assets/mountain-Dy0c0Y9r.js"
  },
  "/assets/navigation-sDiu7OPr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-SA8EpnFgYVxAXL9uItKLK24N0Lg"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 149,
    "path": "../public/assets/navigation-sDiu7OPr.js"
  },
  "/assets/leaflet-src-Cc_7RcXt.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"a9d7-GsfNKC8Ke+Ar5OqPD1koUhp8MdA"',
    "mtime": "2026-09-25T16:14:41.095Z",
    "size": 43479,
    "path": "../public/assets/leaflet-src-Cc_7RcXt.js.gz"
  },
  "/assets/leaflet-src-Cc_7RcXt.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"b502-uGLhVl2m0d8RHxI+C2JTBEXXrnc"',
    "mtime": "2026-09-25T16:14:41.095Z",
    "size": 46338,
    "path": "../public/assets/leaflet-src-Cc_7RcXt.js.zst"
  },
  "/assets/nd-about-CHpXGkDQ.jpg": {
    "type": "image/jpeg",
    "etag": '"175dd-ATAAmHr4KlhSApN+jj0Tz+GJo4Q"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 95709,
    "path": "../public/assets/nd-about-CHpXGkDQ.jpg"
  },
  "/assets/news._slug-C9o8PzCf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ce-tMyBM3Co78wnXDik995KSSHr3Vs"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 974,
    "path": "../public/assets/news._slug-C9o8PzCf.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-09-25T16:14:29.073Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/news._slug-poubV-jW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1183-bhpHt0ypSNHodnBPxXVwZE7mM8o"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 4483,
    "path": "../public/assets/news._slug-poubV-jW.js"
  },
  "/assets/news._slug-poubV-jW.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"56e-4qdNiuxMdDeNam04c5jc5kmVBrA"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 1390,
    "path": "../public/assets/news._slug-poubV-jW.js.br"
  },
  "/assets/PageBreadcrumbs-CpwLUJGK.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"1fb-AtQO9kc1eV12apr8ItLJLl9AY+0"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 507,
    "path": "../public/assets/PageBreadcrumbs-CpwLUJGK.js.br"
  },
  "/assets/news._slug-poubV-jW.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"649-C1op4B7fWxYEDXLOlnOfMFhiABA"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 1609,
    "path": "../public/assets/news._slug-poubV-jW.js.gz"
  },
  "/assets/PageBreadcrumbs-CpwLUJGK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"42a-gw80NkVG6OGRNii/T1w1A8kmxGw"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 1066,
    "path": "../public/assets/PageBreadcrumbs-CpwLUJGK.js"
  },
  "/assets/news._slug-poubV-jW.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"6a6-zn9yRPwDvRAxSDbazwhnpadTiZI"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 1702,
    "path": "../public/assets/news._slug-poubV-jW.js.zst"
  },
  "/assets/pencil-B3MFqFbw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-c0nFiK20+zu41VNWikdcSDuQ6HE"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 277,
    "path": "../public/assets/pencil-B3MFqFbw.js"
  },
  "/assets/plus-D1UokThl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-Kq4pmREhUHVDvxIgnAhrom1JzW0"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 154,
    "path": "../public/assets/plus-D1UokThl.js"
  },
  "/assets/PageBreadcrumbs-CpwLUJGK.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"25c-+44XJyOHybvpc/go/Z+NaA5vJ2M"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 604,
    "path": "../public/assets/PageBreadcrumbs-CpwLUJGK.js.gz"
  },
  "/assets/pen-line-DyfXt4Iq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fe-0pZivLKqRak6KUS0+2a6qaBZnhU"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 1022,
    "path": "../public/assets/pen-line-DyfXt4Iq.js"
  },
  "/assets/PageBreadcrumbs-CpwLUJGK.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"264-Cbdn0jZG/DfuL8ticdOhlRLeSUM"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 612,
    "path": "../public/assets/PageBreadcrumbs-CpwLUJGK.js.zst"
  },
  "/assets/PostCard-YHyEdGSo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed1-EoK3fDAC08eYm242DNg3kpI/mcU"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 3793,
    "path": "../public/assets/PostCard-YHyEdGSo.js"
  },
  "/assets/PostCard-YHyEdGSo.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"4a4-ce9zE+FVt77CAsFANPWNv2hLooc"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 1188,
    "path": "../public/assets/PostCard-YHyEdGSo.js.br"
  },
  "/assets/PostEditor-BOgUdvko.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13870-BoRsy79x589jtqOI+pdnGwOI5VY"',
    "mtime": "2026-09-25T16:14:29.120Z",
    "size": 79984,
    "path": "../public/assets/PostEditor-BOgUdvko.js"
  },
  "/assets/PostCard-YHyEdGSo.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"5a7-PtD4aCHnahAFbVuwrfHkF/SzHc8"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 1447,
    "path": "../public/assets/PostCard-YHyEdGSo.js.zst"
  },
  "/assets/privacy-policy-DsbMdkg8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d9-20U3efxYBzSWT3TOO69J2Dj+AYI"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 2009,
    "path": "../public/assets/privacy-policy-DsbMdkg8.js"
  },
  "/assets/PostCard-YHyEdGSo.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"55e-zPGd13irgsQFkFZXqWf56BrCGBs"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 1374,
    "path": "../public/assets/PostCard-YHyEdGSo.js.gz"
  },
  "/assets/quote-gnCCKVwM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-q/LsANokpkGHOdjlzVwEf6z7iqY"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 390,
    "path": "../public/assets/quote-gnCCKVwM.js"
  },
  "/assets/PostEditor-BOgUdvko.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"40bf-X4hDMdeW6XeOVmuwElTC/5/JJaw"',
    "mtime": "2026-09-25T16:14:41.082Z",
    "size": 16575,
    "path": "../public/assets/PostEditor-BOgUdvko.js.br"
  },
  "/assets/radio-Ck0GKH_j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-OPur/zYb9DDBdDZc01s2//MrvMk"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 375,
    "path": "../public/assets/radio-Ck0GKH_j.js"
  },
  "/assets/PostEditor-BOgUdvko.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"4a13-xtlCy+pd0xFmQzaUnv3iznGBKkQ"',
    "mtime": "2026-09-25T16:14:41.089Z",
    "size": 18963,
    "path": "../public/assets/PostEditor-BOgUdvko.js.gz"
  },
  "/assets/privacy-policy-DsbMdkg8.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"338-zWfB9ODp5GeHi/OtiTnsr23i18w"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 824,
    "path": "../public/assets/privacy-policy-DsbMdkg8.js.br"
  },
  "/assets/privacy-policy-DsbMdkg8.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"3c0-fFX/0NmWiLhibTRryjn2k1vHjfs"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 960,
    "path": "../public/assets/privacy-policy-DsbMdkg8.js.gz"
  },
  "/assets/refresh-cw-BDQ9MyQl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-+4JjxzHwU2WyqB8U8QkEHxd2fNo"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 322,
    "path": "../public/assets/refresh-cw-BDQ9MyQl.js"
  },
  "/assets/rotate-ccw-CPFiyAKl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-23fBEJx33lnUew7mrBqVPLYmocY"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-CPFiyAKl.js"
  },
  "/assets/route-B95A778b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff-yhgV71y9mK2/Wh9S+719AFfkgNY"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 255,
    "path": "../public/assets/route-B95A778b.js"
  },
  "/assets/save-7gAvETMz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-LxCNGh85gRKJBXtjJmxC/uXpESY"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 328,
    "path": "../public/assets/save-7gAvETMz.js"
  },
  "/assets/route-BPBweBkN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-Ebd+TzbjHijkci0SwwInO2Vme80"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 95,
    "path": "../public/assets/route-BPBweBkN.js"
  },
  "/assets/scale-C08fWPzC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14d-PKJ7uUvptExwP4yr7qzvLxm+sYQ"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 333,
    "path": "../public/assets/scale-C08fWPzC.js"
  },
  "/assets/send-BeF2G85c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"123-ch3lMhZwF4EyD7xI05NC+fgYVpg"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 291,
    "path": "../public/assets/send-BeF2G85c.js"
  },
  "/assets/settings-DFfgUd_v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-SuCeOkcbbUQHlQcrZe/7pB6WV3g"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 488,
    "path": "../public/assets/settings-DFfgUd_v.js"
  },
  "/assets/PostEditor-BOgUdvko.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"512e-OKC9CL256p7w9oWnLHFB2YXIBB8"',
    "mtime": "2026-09-25T16:14:41.080Z",
    "size": 20782,
    "path": "../public/assets/PostEditor-BOgUdvko.js.zst"
  },
  "/assets/shield-check-DX_vJvYz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"141-FI0bTBxFZkoTjpLtEWlAJIpUp4U"',
    "mtime": "2026-09-25T16:14:29.116Z",
    "size": 321,
    "path": "../public/assets/shield-check-DX_vJvYz.js"
  },
  "/assets/share-2-BoSi04Ak.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-vkKHE3TeWUljbe+dEIecXsEb1q0"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 358,
    "path": "../public/assets/share-2-BoSi04Ak.js"
  },
  "/assets/privacy-policy-DsbMdkg8.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"3e8-owm5bESjV3uwfVx2SjXPjiHxiSs"',
    "mtime": "2026-09-25T16:14:41.058Z",
    "size": 1e3,
    "path": "../public/assets/privacy-policy-DsbMdkg8.js.zst"
  },
  "/assets/shield-j6eHdFUG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111-OXhLmX69+Xwm47LtIfZJIeu95jg"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 273,
    "path": "../public/assets/shield-j6eHdFUG.js"
  },
  "/assets/smartphone-C2-G4WNM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c6-HNEtuxcScnAHZcEaSxvpc00NAgo"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 198,
    "path": "../public/assets/smartphone-C2-G4WNM.js"
  },
  "/assets/sliders-vertical-Ckk5Jzkb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a7-Xtw77LPqaXLZiKo0cOP9ryrhSlQ"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 423,
    "path": "../public/assets/sliders-vertical-Ckk5Jzkb.js"
  },
  "/assets/star-DqfnX7UK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-lS9s3tJWOfv3WSCr44dVoqsyLyo"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 473,
    "path": "../public/assets/star-DqfnX7UK.js"
  },
  "/assets/tablet-3sGxDxfj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-6mZc0THjcjW4pkFWcFQUmJwdLwY"',
    "mtime": "2026-09-25T16:14:29.114Z",
    "size": 214,
    "path": "../public/assets/tablet-3sGxDxfj.js"
  },
  "/assets/tag-IWukdVC4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"147-NsqHCO3m4NU/TOGuupe0R1ATyNY"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 327,
    "path": "../public/assets/tag-IWukdVC4.js"
  },
  "/assets/styles-iewDO4-k.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": '"65cd-OSXuhbI++vmtX+BRtsg+hFjzw3M"',
    "mtime": "2026-09-25T16:14:41.146Z",
    "size": 26061,
    "path": "../public/assets/styles-iewDO4-k.css.br"
  },
  "/assets/styles-iewDO4-k.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3b0f4-DBszE+bTRKY4alsWX2DwooCan10"',
    "mtime": "2026-09-25T16:14:29.101Z",
    "size": 241908,
    "path": "../public/assets/styles-iewDO4-k.css"
  },
  "/assets/styles-iewDO4-k.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": '"85d3-tjolfHUMzrXVhSs89zLfQA57+rU"',
    "mtime": "2026-09-25T16:14:41.100Z",
    "size": 34259,
    "path": "../public/assets/styles-iewDO4-k.css.gz"
  },
  "/assets/topics._slug-Cr9VbBoT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"94d-P48BMnXntZ6l5UdP0QEUhHdpu6A"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 2381,
    "path": "../public/assets/topics._slug-Cr9VbBoT.js"
  },
  "/assets/styles-iewDO4-k.css.zst": {
    "type": "text/css; charset=utf-8",
    "encoding": "zstd",
    "etag": '"85d0-G/ccwCSnNxeD574FdnGwwfsdp1k"',
    "mtime": "2026-09-25T16:14:41.100Z",
    "size": 34256,
    "path": "../public/assets/styles-iewDO4-k.css.zst"
  },
  "/assets/topics._slug-Cr9VbBoT.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"3ae-HCR77XFsG8QKgm9lDLhFnfh6LU0"',
    "mtime": "2026-09-25T16:14:41.064Z",
    "size": 942,
    "path": "../public/assets/topics._slug-Cr9VbBoT.js.br"
  },
  "/assets/trash-2-DPFtG7-h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-aN4E79pVyJU35nKICbsy4Ubw/gU"',
    "mtime": "2026-09-25T16:14:29.116Z",
    "size": 329,
    "path": "../public/assets/trash-2-DPFtG7-h.js"
  },
  "/assets/topics._slug-Cr9VbBoT.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"45f-+tiIuvJVhkMROFxyO5dcA57NY94"',
    "mtime": "2026-09-25T16:14:41.064Z",
    "size": 1119,
    "path": "../public/assets/topics._slug-Cr9VbBoT.js.zst"
  },
  "/assets/topics._slug-Cr9VbBoT.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"431-rOMZoGskFSRZxnxcAzu0tp84k0o"',
    "mtime": "2026-09-25T16:14:41.064Z",
    "size": 1073,
    "path": "../public/assets/topics._slug-Cr9VbBoT.js.gz"
  },
  "/assets/triangle-alert-CrS1ci7i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-UAcwTnM6zf56RjAlgvnykahnSzw"',
    "mtime": "2026-09-25T16:14:29.117Z",
    "size": 266,
    "path": "../public/assets/triangle-alert-CrS1ci7i.js"
  },
  "/assets/TranslatedMarkdown-CfwP5MC8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6a-nDSaWPaL/U+l5x5b2HU325rsBEQ"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 2666,
    "path": "../public/assets/TranslatedMarkdown-CfwP5MC8.js"
  },
  "/assets/type-CklFhb0Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"dd-vU9POR0WUCaFCKpeCH6MM1WFoAs"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 221,
    "path": "../public/assets/type-CklFhb0Y.js"
  },
  "/assets/upload-C8g6_9n5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-LrUo5KCqYTK0wu+70C1RBE5IUCo"',
    "mtime": "2026-09-25T16:14:29.116Z",
    "size": 231,
    "path": "../public/assets/upload-C8g6_9n5.js"
  },
  "/assets/TranslatedMarkdown-CfwP5MC8.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"3b0-3CrRjUckM58K+Hb7Em7m0RzoHlY"',
    "mtime": "2026-09-25T16:14:41.064Z",
    "size": 944,
    "path": "../public/assets/TranslatedMarkdown-CfwP5MC8.js.br"
  },
  "/assets/users-BMNM_R6N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-NedoSzgQ3Ql2t5K2GkmFwtxGPns"',
    "mtime": "2026-09-25T16:14:29.110Z",
    "size": 307,
    "path": "../public/assets/users-BMNM_R6N.js"
  },
  "/assets/useSuspenseQuery-D5HFyumd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-/xc1vjmGR+fjqG+fqjPpSuHvKh8"',
    "mtime": "2026-09-25T16:14:29.106Z",
    "size": 169,
    "path": "../public/assets/useSuspenseQuery-D5HFyumd.js"
  },
  "/assets/TranslatedMarkdown-CfwP5MC8.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"417-Hu8BJ4tPhWxAM60PsVmZpsBOxKo"',
    "mtime": "2026-09-25T16:14:41.064Z",
    "size": 1047,
    "path": "../public/assets/TranslatedMarkdown-CfwP5MC8.js.gz"
  },
  "/assets/TranslatedMarkdown-CfwP5MC8.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"44c-HcBw6e4GJ7pOP7kVhBKi4IXzJV0"',
    "mtime": "2026-09-25T16:14:41.064Z",
    "size": 1100,
    "path": "../public/assets/TranslatedMarkdown-CfwP5MC8.js.zst"
  },
  "/assets/utils-xsT6Wtqk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea49-YrAQ0EwMbh/V86FG2NeRs5PE9aw"',
    "mtime": "2026-09-25T16:14:29.112Z",
    "size": 59977,
    "path": "../public/assets/utils-xsT6Wtqk.js"
  },
  "/assets/utils-xsT6Wtqk.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": '"444e-/2pEHkU5DMkPsEichFoq7NG5gmI"',
    "mtime": "2026-09-25T16:14:41.095Z",
    "size": 17486,
    "path": "../public/assets/utils-xsT6Wtqk.js.br"
  },
  "/assets/utils-xsT6Wtqk.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": '"4d6b-50O8xWEm6xSImZpirfo0hK5qT0A"',
    "mtime": "2026-09-25T16:14:41.091Z",
    "size": 19819,
    "path": "../public/assets/utils-xsT6Wtqk.js.gz"
  },
  "/assets/utils-xsT6Wtqk.js.zst": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "zstd",
    "etag": '"50df-Toq2fFnhs0BH0LPrxfNttX5f634"',
    "mtime": "2026-09-25T16:14:41.091Z",
    "size": 20703,
    "path": "../public/assets/utils-xsT6Wtqk.js.zst"
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
  const $0 = [{ name: "headers", route: "/favicon.ico", handler: headers, options: { "cache-control": "public, max-age=86400" } }], $1 = [{ name: "headers", route: "/_build/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }], $2 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }], $3 = [{ name: "headers", route: "/fonts/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }], $4 = [{ name: "headers", route: "/images/**", handler: headers, options: { "cache-control": "public, max-age=2592000" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    if (p === "/favicon.ico") {
      r.unshift({ data: $0 });
    }
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "_build") {
        if (l > 2) {
          if (s[2] === "assets") {
            r.unshift({ data: $1, params: { "_": s.slice(3).join("/") } });
          }
        }
      } else if (s[1] === "assets") {
        r.unshift({ data: $2, params: { "_": s.slice(2).join("/") } });
      } else if (s[1] === "fonts") {
        r.unshift({ data: $3, params: { "_": s.slice(2).join("/") } });
      } else if (s[1] === "images") {
        r.unshift({ data: $4, params: { "_": s.slice(2).join("/") } });
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
