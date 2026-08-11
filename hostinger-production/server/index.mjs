globalThis.__nitro_main__ = import.meta.url;
import "./_libs/unenv.mjs";

import { H as HookableCore } from "./_libs/hookable.mjs";
import { d as defineLazyEventHandler, H as HTTPError, a as H3Core } from "./_libs/h3.mjs";
import { a as FastResponse } from "./_libs/srvx.mjs";


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
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
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
  "/assets/about-Cf8Yfz9T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ffe-hDPp/VXmKVqwkHEqhKfhDepidlg"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 4094,
    "path": "../public/assets/about-Cf8Yfz9T.js"
  },
  "/assets/account-BFf4XfrA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"814-43QSTiusppk1ZOGov9RuZdUHVVY"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 2068,
    "path": "../public/assets/account-BFf4XfrA.js"
  },
  "/assets/admin-xKLm2LnQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"762-wbOwBJsM+XD/077QjiQq8daLdG4"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 1890,
    "path": "../public/assets/admin-xKLm2LnQ.js"
  },
  "/assets/admin.comments-CY1wvVab.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8cf-PcOwZK7eyBM/UtONu+OkDvOI6yg"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 2255,
    "path": "../public/assets/admin.comments-CY1wvVab.js"
  },
  "/assets/admin.destinations-DMDX9AJn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144b-zJzP1nGApI1Zoo0qrYiQHFmSq68"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 5195,
    "path": "../public/assets/admin.destinations-DMDX9AJn.js"
  },
  "/assets/admin.index-DCdt9Y6w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c02-hMLUDOOVpITiLX9/nhXk5+jrCDs"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 3074,
    "path": "../public/assets/admin.index-DCdt9Y6w.js"
  },
  "/assets/admin.messages-HLpZZ15L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1300-zey/LeU9C+bM/k68UE+GfmPflac"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 4864,
    "path": "../public/assets/admin.messages-HLpZZ15L.js"
  },
  "/assets/admin.posts.index-UCN_CLMM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e30-MdDwPQfxoDYWtyeLIyfaBNkw3o4"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 73264,
    "path": "../public/assets/admin.posts.index-UCN_CLMM.js"
  },
  "/assets/admin.posts.new-BqSMN3UJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-volIH0Gyzw0Z/AE5+ANDDKNJ/TE"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 344,
    "path": "../public/assets/admin.posts.new-BqSMN3UJ.js"
  },
  "/assets/admin.posts._id-BZak3qyg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-73cXCd5BeafgLt97jmwIZ5hYpIw"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 657,
    "path": "../public/assets/admin.posts._id-BZak3qyg.js"
  },
  "/assets/arrow-left-CTWBq6Lb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-7DpjVpPqzW4bnC1zIN9UzeU3g4o"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 166,
    "path": "../public/assets/arrow-left-CTWBq6Lb.js"
  },
  "/assets/auth-VoPQGW6V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ca8-J2RaeAT7ZHgCBSwFEKv4lyPJZVQ"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 11432,
    "path": "../public/assets/auth-VoPQGW6V.js"
  },
  "/assets/blog-Drgo5kEA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-480uK1SvT1eczj8+j2GxUUw8x6c"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 103,
    "path": "../public/assets/blog-Drgo5kEA.js"
  },
  "/assets/blog.index-CPB9TAWU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ce8-IEyKqeP4BdhuAxAqRjPrq7GssHA"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 3304,
    "path": "../public/assets/blog.index-CPB9TAWU.js"
  },
  "/assets/blog._slug-CRrQ7pgi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3165-Ailw8qPqwQWsIWhxm3gzMAjP7mA"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 12645,
    "path": "../public/assets/blog._slug-CRrQ7pgi.js"
  },
  "/assets/blog._slug-D0CXSC-w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b2-djo3Tjzr1S3Tiq8yoCSux8+hbeM"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 690,
    "path": "../public/assets/blog._slug-D0CXSC-w.js"
  },
  "/assets/calendar-BH7mvue5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-KPPw4LsSOjuUA+20KSsSkG77+PQ"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 258,
    "path": "../public/assets/calendar-BH7mvue5.js"
  },
  "/assets/clock-CuBhhtOP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-7izq/Algb4lreYmJv999Gmwyl0Y"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 165,
    "path": "../public/assets/clock-CuBhhtOP.js"
  },
  "/assets/contact-iXsCCRQk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13f5-G9JU3Ak8z8UVSh0R6O0uDU79mao"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 5109,
    "path": "../public/assets/contact-iXsCCRQk.js"
  },
  "/assets/dashboard-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 41,
    "path": "../public/assets/dashboard-DtqBFgK5.js"
  },
  "/assets/destinations-fc68Q33j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67-2PD0mFyNLu2E83PGbYUJ/iy0zQI"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 103,
    "path": "../public/assets/destinations-fc68Q33j.js"
  },
  "/assets/destinations.index-AJ58qLZI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1751-WK4luY5gWYt8KAJ66MfuRW3c7ZA"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 5969,
    "path": "../public/assets/destinations.index-AJ58qLZI.js"
  },
  "/assets/destinations._slug-D_KAQEAE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21f-B4E6P/0ZHt9po7deyqwlB0iw3yo"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 543,
    "path": "../public/assets/destinations._slug-D_KAQEAE.js"
  },
  "/assets/DestinationsMap-BxvVyFO7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82e-vVy7JFIVqAt1zIabR8mbKKzOEJM"',
    "mtime": "2026-08-11T17:33:32.225Z",
    "size": 2094,
    "path": "../public/assets/DestinationsMap-BxvVyFO7.js"
  },
  "/assets/DestinationsMap-CGoz3Q9q.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"3af4-DwNuVYap9sNCFe2ywhL3F4eGYuU"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 15092,
    "path": "../public/assets/DestinationsMap-CGoz3Q9q.css"
  },
  "/assets/eye-DhD4jmJX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-QNFNncDZNj8dtQK8bJQ6cQ9pE9g"',
    "mtime": "2026-08-11T17:33:32.225Z",
    "size": 252,
    "path": "../public/assets/eye-DhD4jmJX.js"
  },
  "/assets/gallery-BwQHmI45.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"acd-lnUSxoUUdvT1emlifObJfxHhSew"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 2765,
    "path": "../public/assets/gallery-BwQHmI45.js"
  },
  "/assets/index-Bcck-p_v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cdc7-8eNxAZ1uKquHomBceyAnBIL5BoM"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 118215,
    "path": "../public/assets/index-Bcck-p_v.js"
  },
  "/assets/index-C9ouSb3E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24895-78T161XgnTJv77zyMr3UAWosm9w"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 149653,
    "path": "../public/assets/index-C9ouSb3E.js"
  },
  "/assets/mail-2kdtJf81.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-ibrOmejx5s7g1UCXhxoH+0EwKs8"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 214,
    "path": "../public/assets/mail-2kdtJf81.js"
  },
  "/assets/map-BW8WP1GJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-EYH5KIzdSR/iSE8C4LsNMcjRXDs"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 426,
    "path": "../public/assets/map-BW8WP1GJ.js"
  },
  "/assets/leaflet-src-Bvc4xkLk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2498e-83pR59KR+fiL697mft1gn/x4uFk"',
    "mtime": "2026-08-11T17:33:32.226Z",
    "size": 149902,
    "path": "../public/assets/leaflet-src-Bvc4xkLk.js"
  },
  "/assets/map-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 41,
    "path": "../public/assets/map-DtqBFgK5.js"
  },
  "/assets/message-square-DmwOHSYt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ea-7Z3BCOQk3OAS0bT4unDpRBa5bR0"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 234,
    "path": "../public/assets/message-square-DmwOHSYt.js"
  },
  "/assets/ndsolo-travel-logo-DrOVnHMo.png": {
    "type": "image/png",
    "etag": '"1b6a-u1hWNjINOySvNqqdHXSOLO0PfVc"',
    "mtime": "2026-08-11T17:33:32.210Z",
    "size": 7018,
    "path": "../public/assets/ndsolo-travel-logo-DrOVnHMo.png"
  },
  "/assets/plus-ChGlC_-l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-gO2UOru4knmDPfgdDmt0TMfLPqs"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 154,
    "path": "../public/assets/plus-ChGlC_-l.js"
  },
  "/assets/PostCard-xIhMhhMJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7d3-xiCBe7+QEkpFkdTgNqegX/e7N4Y"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 2003,
    "path": "../public/assets/PostCard-xIhMhhMJ.js"
  },
  "/assets/PostEditor-ButDHtyU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5186-uvbr+avwWaRgsGYo95JtR/kzljM"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 20870,
    "path": "../public/assets/PostEditor-ButDHtyU.js"
  },
  "/assets/proxy-D1PC-JUd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1df54-tUSigdL48qz6jX5oZLsWmKQFYtM"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 122708,
    "path": "../public/assets/proxy-D1PC-JUd.js"
  },
  "/assets/star-BolNMdBf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-i0+y6+TwG8/MfwnCIt29srLArQE"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 473,
    "path": "../public/assets/star-BolNMdBf.js"
  },
  "/assets/route-CmrJWZR-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-F15EuFCkoPrjSRt2ni4vjGbFjOo"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 95,
    "path": "../public/assets/route-CmrJWZR-.js"
  },
  "/assets/styles-zRhZDL-K.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1a70b-0ApoX5y31SNpTobTPgkCTLUKQ5M"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 108299,
    "path": "../public/assets/styles-zRhZDL-K.css"
  },
  "/assets/useBaseQuery-DwQpw0YK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2299-mUlRXHR+dGiiXF6CkdB88//UuRg"',
    "mtime": "2026-08-11T17:33:32.225Z",
    "size": 8857,
    "path": "../public/assets/useBaseQuery-DwQpw0YK.js"
  },
  "/assets/trash-2-CJg3dx_h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-F3gW+sZZ0AzR5sTXue+PW8Ic0Uk"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 329,
    "path": "../public/assets/trash-2-CJg3dx_h.js"
  },
  "/assets/useLocalized-DK1jzdU6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7eb-7RZhTkpEXNDDZeXGhifbB1wB0m8"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 2027,
    "path": "../public/assets/useLocalized-DK1jzdU6.js"
  },
  "/assets/index-NRY-4nRa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aaeb5-wFIMQkYlaAW7Z4dhtrEJdc2OTeE"',
    "mtime": "2026-08-11T17:33:32.225Z",
    "size": 700085,
    "path": "../public/assets/index-NRY-4nRa.js"
  },
  "/assets/useMutation-Bi4bQSs8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-UmUKnFz78dsgcxZTMOsGvA9Zu/A"',
    "mtime": "2026-08-11T17:33:32.225Z",
    "size": 2210,
    "path": "../public/assets/useMutation-Bi4bQSs8.js"
  },
  "/assets/useQuery-BPKadYav.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64-szHz50dDokPjGBQsGWRFA0L9Uw8"',
    "mtime": "2026-08-11T17:33:32.225Z",
    "size": 100,
    "path": "../public/assets/useQuery-BPKadYav.js"
  },
  "/assets/users-DiiS8X0G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-OKuXHFocKnTbEZogZ1Cigef84To"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 307,
    "path": "../public/assets/users-DiiS8X0G.js"
  },
  "/assets/useSuspenseQuery-BTUd1-MF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad-+R+/9/ZP5KI80m8nNyX9qs4w9UM"',
    "mtime": "2026-08-11T17:33:32.221Z",
    "size": 173,
    "path": "../public/assets/useSuspenseQuery-BTUd1-MF.js"
  }
};
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
const headers = ((m) => function headersRouteRule(event) {
  for (const [key, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key, value);
  }
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
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
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
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
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
function useNitroHooks() {
  const nitroApp = useNitroApp();
  const hooks = nitroApp.hooks;
  if (hooks) {
    return hooks;
  }
  return nitroApp.hooks = new HookableCore();
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
function createHandler(hooks) {
  const nitroApp = useNitroApp();
  const nitroHooks = useNitroHooks();
  return {
    async fetch(request, env, context) {
      globalThis.__env__ = env;
      augmentReq(request, {
        env,
        context
      });
      const ctxExt = {};
      const url = new URL(request.url);
      if (hooks.fetch) {
        const res = await hooks.fetch(request, env, context, url, ctxExt);
        if (res) {
          return res;
        }
      }
      return await nitroApp.fetch(request);
    },
    scheduled(controller, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
        controller,
        env,
        context
      }) || Promise.resolve());
    },
    email(message, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:email", {
        message,
        event: message,
        env,
        context
      }) || Promise.resolve());
    },
    queue(batch, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
        batch,
        event: batch,
        env,
        context
      }) || Promise.resolve());
    },
    tail(traces, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
        traces,
        env,
        context
      }) || Promise.resolve());
    },
    trace(traces, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
        traces,
        env,
        context
      }) || Promise.resolve());
    }
  };
}
function augmentReq(cfReq, ctx) {
  const req = cfReq;
  req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
  req.runtime ??= { name: "cloudflare" };
  req.runtime.cloudflare = {
    ...req.runtime.cloudflare,
    ...ctx
  };
  req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
const cloudflareModule = createHandler({ fetch(cfRequest, env, context, url) {
  if (env.ASSETS && isPublicAssetURL(url.pathname)) {
    return env.ASSETS.fetch(cfRequest);
  }
} });
export {
  cloudflareModule as default
};
