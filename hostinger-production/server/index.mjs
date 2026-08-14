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
  "/assets/about-CkwvcN6W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f2f-fldmuU1A/Bz+A2wVv/hQ51JJVzs"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 3887,
    "path": "../public/assets/about-CkwvcN6W.js"
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
  "/assets/account-CpBxel1c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-hIrhVl1tdaSIcR9/DCdWUuW66dI"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 2068,
    "path": "../public/assets/account-CpBxel1c.js"
  },
  "/assets/activity-BU-O9aci.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"eb-Y6OeCcUK0cC9ztta2y7ntl28b64"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 235,
    "path": "../public/assets/activity-BU-O9aci.js"
  },
  "/assets/admin-C1QjFFXU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"79a-ExwldrwcYhPWupZWA0KwyVhXu2s"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 1946,
    "path": "../public/assets/admin-C1QjFFXU.js"
  },
  "/assets/admin.comments-BvRPqQcQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8dc-js3hn1XNckeJm62ZoaNB5SF+oHI"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 2268,
    "path": "../public/assets/admin.comments-BvRPqQcQ.js"
  },
  "/assets/admin.messages-C5Ov6_5y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"130e-q+PL3FKXQ/s+1LjwSWhYKfVXYq4"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 4878,
    "path": "../public/assets/admin.messages-C5Ov6_5y.js"
  },
  "/assets/admin.destinations-BgtzQ4j3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"145a-Uvh7rRZyLelJQJaoPFIZ0EkjvZ0"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 5210,
    "path": "../public/assets/admin.destinations-BgtzQ4j3.js"
  },
  "/assets/admin.index-rdr15DMQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"dd1-ZkqhG/RlqvfYC170330IJZCmYDc"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 3537,
    "path": "../public/assets/admin.index-rdr15DMQ.js"
  },
  "/assets/admin.analytics-DV5lPUzr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"642e4-yVF/dJjmYVNWKVufx72Wpafetws"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 410340,
    "path": "../public/assets/admin.analytics-DV5lPUzr.js"
  },
  "/assets/admin.posts.index-gzHWiQ3g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11cf9-RgA8erEfv38I2lkKD35Z7O/cYtI"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 72953,
    "path": "../public/assets/admin.posts.index-gzHWiQ3g.js"
  },
  "/assets/admin.posts.new-C9GBuqrs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-hMs3ZSGXyoSXpIvrW5T8pA7Kx2Q"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-C9GBuqrs.js"
  },
  "/assets/admin.posts._id-DO6ens7X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-1+HlCvP52bkElgYjH2fDKUms4Ng"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-DO6ens7X.js"
  },
  "/assets/arrow-right-1Dz4Apy5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-n45Is16UJu22JKLKbGyq7Avri2k"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 166,
    "path": "../public/assets/arrow-right-1Dz4Apy5.js"
  },
  "/assets/arrow-left-rJmVYThv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-sXN6XUD6yAgnX9Fdcqtfk61SJmw"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 166,
    "path": "../public/assets/arrow-left-rJmVYThv.js"
  },
  "/assets/arrow-up-right-DttZeZTg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a8-f+epXxvv1FMbvRQ0tbrvBg0/kD8"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 168,
    "path": "../public/assets/arrow-up-right-DttZeZTg.js"
  },
  "/assets/auth-CH-2Ra-T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f51-I8EFZLLjlY1R8V80pvPfckKNvHw"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 8017,
    "path": "../public/assets/auth-CH-2Ra-T.js"
  },
  "/assets/blog-6jirlZCI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-I6MFGi5OJK/BG/8qZHkDGEV6Erc"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 103,
    "path": "../public/assets/blog-6jirlZCI.js"
  },
  "/assets/blog.index-BSn39_eY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2327-4DOSa3W+eN05jdB4fpaZxmpgSb8"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 8999,
    "path": "../public/assets/blog.index-BSn39_eY.js"
  },
  "/assets/blog._slug-BmjE6Sdo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"237-ivzH4Svx7V5VBtSBoLKQUw1d/fs"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 567,
    "path": "../public/assets/blog._slug-BmjE6Sdo.js"
  },
  "/assets/blog._slug-vkrObA_y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4bb4-UPYIvDK1QiuQT8VPHugBlRA4mEM"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 19380,
    "path": "../public/assets/blog._slug-vkrObA_y.js"
  },
  "/assets/calendar-DA7iC6VO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-U42kdKeTwZZAHE43NPEMZ79SHfc"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 258,
    "path": "../public/assets/calendar-DA7iC6VO.js"
  },
  "/assets/chevron-right-B5fUsaUI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d5-CIFeOgxnp+bgT5/mb9AeCL2JrFY"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 213,
    "path": "../public/assets/chevron-right-B5fUsaUI.js"
  },
  "/assets/clock-BSEXrdLS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-PF7XSKgJGE8HmnC/Tor3ZVLLKRA"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 165,
    "path": "../public/assets/clock-BSEXrdLS.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 374,
    "path": "../public/assets/clsx-B-dksMZM.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-14T17:34:51.872Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/contact-BJEBFM2m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1661-bZ31UJmy7uxqqz2ANw7PN+j3Cdw"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 5729,
    "path": "../public/assets/contact-BJEBFM2m.js"
  },
  "/assets/destinations-CMDG-kK_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-Fkiy7T9GxJOeCC1GY/qaCyYcxnM"',
    "mtime": "2026-08-14T17:34:51.872Z",
    "size": 103,
    "path": "../public/assets/destinations-CMDG-kK_.js"
  },
  "/assets/destinations._slug-B9RAtGsW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"271-vzSrp/tHVJqqRLn35Gus/zPlzHs"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 625,
    "path": "../public/assets/destinations._slug-B9RAtGsW.js"
  },
  "/assets/destinations.index-Cxg_oi7A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"162b-cya5+ssIaPKWopWruG+fWrp+dEE"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 5675,
    "path": "../public/assets/destinations.index-Cxg_oi7A.js"
  },
  "/assets/destinations._slug-DH_L3Fhb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c23-0VALiUZxuW4aDeRtt1EGH5f5Jcc"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 7203,
    "path": "../public/assets/destinations._slug-DH_L3Fhb.js"
  },
  "/assets/DestinationsMap-CIGW-MKW.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3cf7-GSfYBurqLbmcVM5PnUOstAgC2rk"',
    "mtime": "2026-08-14T17:34:51.872Z",
    "size": 15607,
    "path": "../public/assets/DestinationsMap-CIGW-MKW.css"
  },
  "/assets/DestinationsMap-ot2jfNIE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-ruvTbANK94gQ5BEG8fDE75LW5C4"',
    "mtime": "2026-08-14T17:34:51.875Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-ot2jfNIE.js"
  },
  "/assets/eye-DuQdZ06w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-iM1PSM9q/nBjx8sZiAYBhC7Y34Y"',
    "mtime": "2026-08-14T17:34:51.875Z",
    "size": 252,
    "path": "../public/assets/eye-DuQdZ06w.js"
  },
  "/assets/gallery-B3WtOHfU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1831-UCvyB+2AQ/UTuwv1R9FISaMuKb8"',
    "mtime": "2026-08-14T17:34:51.872Z",
    "size": 6193,
    "path": "../public/assets/gallery-B3WtOHfU.js"
  },
  "/assets/index-CjZwxCir.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ceca-LBlJnOEtAVyrBLD419dv5PCaf/E"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 118474,
    "path": "../public/assets/index-CjZwxCir.js"
  },
  "/assets/mail-DOklFaK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-xuqDBKsawTXrP+uK1MOH+whW8l8"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 214,
    "path": "../public/assets/mail-DOklFaK5.js"
  },
  "/assets/map-CyxfqEfg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-2eb7KPP/Y5m69nEZ+7i7jFbO9m8"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 426,
    "path": "../public/assets/map-CyxfqEfg.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-14T17:34:51.872Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-CYF-wZ2I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b5-3f3Mhy3qVaCe1Z3QpIrpBuDULQM"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 437,
    "path": "../public/assets/message-square-CYF-wZ2I.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-14T17:34:51.868Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/leaflet-src-7WEdoaTG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-zkGkh84cmotpFlzqPFUszXniDT4"',
    "mtime": "2026-08-14T17:34:51.875Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-7WEdoaTG.js"
  },
  "/assets/plus-ks3dkLRm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-uJJupv66ujl76AFBJwc11uB5TvY"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 154,
    "path": "../public/assets/plus-ks3dkLRm.js"
  },
  "/assets/index-H8DA97va.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"237ef-d46+oD/+SCixqMV+44xe4kApuVY"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 145391,
    "path": "../public/assets/index-H8DA97va.js"
  },
  "/assets/PostCard-i45j-rMX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"88b-jxH5/UW/HK/TkwgcNGccgRSNdhY"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 2187,
    "path": "../public/assets/PostCard-i45j-rMX.js"
  },
  "/assets/PostEditor-BtYAh1-5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5030-XHWtUDx9Tsw2f7Raem9xsMUENUI"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 20528,
    "path": "../public/assets/PostEditor-BtYAh1-5.js"
  },
  "/assets/index-DuGHKTYK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d4d74-PnYkgU7jMTW/VJmtu8Gn0QPMJQ8"',
    "mtime": "2026-08-14T17:34:51.875Z",
    "size": 871796,
    "path": "../public/assets/index-DuGHKTYK.js"
  },
  "/assets/route-DCnZSzjx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-IkUax6FirQlaq/APXhlwEDHIbgo"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 95,
    "path": "../public/assets/route-DCnZSzjx.js"
  },
  "/assets/share-2-B5eBbX_O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"161-cKpzvJrPHg80CYznjqnDOrbavPU"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 353,
    "path": "../public/assets/share-2-B5eBbX_O.js"
  },
  "/assets/sparkles-CgvXIvti.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-X+qKcUvl5rKTHf5b49sij+eANVo"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 495,
    "path": "../public/assets/sparkles-CgvXIvti.js"
  },
  "/assets/star-DuxV_JrF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-K2ALzVz/QhXlzHpTKWEyLIKFOAk"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 473,
    "path": "../public/assets/star-DuxV_JrF.js"
  },
  "/assets/trash-2-q59uPKUM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-Nrcoez5qScL3ZmUkrI+MT3R2TIE"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 329,
    "path": "../public/assets/trash-2-q59uPKUM.js"
  },
  "/assets/useBaseQuery-CzMwpvi1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-rmsNL5mRtuDHoyhxPUabCwFyg8M"',
    "mtime": "2026-08-14T17:34:51.875Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-CzMwpvi1.js"
  },
  "/assets/styles-DE7m7pOP.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1eca1-N5qEXij55ssRIJdwle+k9zeKUYg"',
    "mtime": "2026-08-14T17:34:51.872Z",
    "size": 126113,
    "path": "../public/assets/styles-DE7m7pOP.css"
  },
  "/assets/useMutation-BKjhb5wl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-bsPmkQ6FTGkQxUPUHeRu9mA1uq8"',
    "mtime": "2026-08-14T17:34:51.875Z",
    "size": 2210,
    "path": "../public/assets/useMutation-BKjhb5wl.js"
  },
  "/assets/useQuery-Dkbg0LO9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-JVnVuW/WpvqqZc+KWzRjgyaoZp0"',
    "mtime": "2026-08-14T17:34:51.875Z",
    "size": 100,
    "path": "../public/assets/useQuery-Dkbg0LO9.js"
  },
  "/assets/users-BE2I5o7W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-M5FgyTFwNJgQklzu0iUBOcmZ5Po"',
    "mtime": "2026-08-14T17:34:51.874Z",
    "size": 307,
    "path": "../public/assets/users-BE2I5o7W.js"
  },
  "/assets/useSuspenseQuery-aqqTjOe5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-IQzuk7LYCZd1Bx5AmnCEs39w6vQ"',
    "mtime": "2026-08-14T17:34:51.873Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-aqqTjOe5.js"
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
