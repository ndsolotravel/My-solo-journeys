import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
const SLUG_COORDS = {
  "nanga-parbat-base-camp": [35.2375, 74.589],
  "hunza-valley": [36.3167, 74.65],
  "skardu-deosai": [35.2971, 75.6333],
  "karakoram-highway": [35.92, 74.31],
  "phander-valley": [36.1667, 72.9333]
};
const COUNTRY_COORDS = {
  Pakistan: [30.3753, 69.3451]
};
function coordsFor(d) {
  const dLat = d.latitude;
  const dLng = d.longitude;
  if (typeof dLat === "number" && typeof dLng === "number" && !isNaN(dLat) && !isNaN(dLng) && dLat >= -90 && dLat <= 90 && dLng >= -180 && dLng <= 180) {
    return [dLat, dLng];
  }
  if (d.posts && Array.isArray(d.posts)) {
    const postWithCoords = d.posts.find(
      (p) => typeof p.latitude === "number" && typeof p.longitude === "number" && !isNaN(p.latitude) && !isNaN(p.longitude) && p.latitude >= -90 && p.latitude <= 90 && p.longitude >= -180 && p.longitude <= 180
    );
    if (postWithCoords) {
      return [postWithCoords.latitude, postWithCoords.longitude];
    }
  }
  return SLUG_COORDS[d.slug] ?? COUNTRY_COORDS[d.country] ?? null;
}
function DestinationsMap({ destinations }) {
  const ref = reactExports.useRef(null);
  const mapRef = reactExports.useRef(null);
  const [mapLoaded, setMapLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    let isMounted = true;
    if (mapRef.current) {
      try {
        mapRef.current.remove();
      } catch (e) {
      }
      mapRef.current = null;
    }
    if (ref.current._leaflet_id) {
      delete ref.current._leaflet_id;
    }
    let resizeObserver = null;
    import("../_libs/leaflet.mjs").then(function(n) {
      return n.l;
    }).then((LModule) => {
      if (!isMounted || !ref.current || mapRef.current) return;
      const L = LModule.default || LModule;
      if (ref.current._leaflet_id) {
        delete ref.current._leaflet_id;
      }
      const map = L.map(ref.current, {
        scrollWheelZoom: false,
        zoomControl: true
      }).setView([35.5, 74.5], 6);
      const tileLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        {
          minZoom: 2,
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, DeLorme, NAVTEQ, TomTom, USGS, &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        }
      );
      tileLayer.addTo(map);
      const pinIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:24px;height:24px;border-radius:9999px;background:rgba(255,122,0,0.25);animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="width:14px;height:14px;border-radius:9999px;background:#FF7A00;border:2.5px solid #ffffff;box-shadow:0 2px 6px rgba(0,0,0,0.4);position:relative;z-index:2;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14]
      });
      const bounds = [];
      destinations.forEach((d) => {
        const c = coordsFor(d);
        if (!c) return;
        bounds.push(c);
        const descHtml = d.description ? `<p style="font-size:11px;color:#555;margin:0 0 6px 0;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${d.description.replace(/<[^>]*>/g, "")}</p>` : "";
        const popup = `
          <div style="min-width:190px;max-width:220px;font-family:system-ui,-apple-system,sans-serif;padding:2px;">
            ${d.featured_image ? `<img src="${d.featured_image}" alt="${d.title}" style="width:100%;height:85px;object-fit:cover;border-radius:8px;margin-bottom:6px;" onerror="this.style.display='none'"/>` : ""}
            <strong style="font-size:13px;color:#111;display:block;margin-bottom:2px;">${d.title}</strong>
            <span style="font-size:11px;color:#666;display:block;margin-bottom:4px;">📍 ${d.country}${d.region ? ` · ${d.region}` : ""}</span>
            ${descHtml}
            <a href="/destinations/${d.slug}" style="color:#FF7A00;font-size:12px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:3px;">View Story →</a>
          </div>`;
        L.marker(c, { icon: pinIcon, title: d.title }).addTo(map).bindPopup(popup);
      });
      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
      } else if (bounds.length === 1) {
        map.setView(bounds[0], 8);
      }
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 150);
      if (ref.current && typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        });
        resizeObserver.observe(ref.current);
      }
      mapRef.current = map;
      setMapLoaded(true);
    });
    return () => {
      isMounted = false;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
        }
        mapRef.current = null;
      }
    };
  }, [destinations]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[380px] sm:h-[440px] lg:h-[480px] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm", children: [
    !mapLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-muted/40 animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Loading interactive map..." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        role: "region",
        "aria-label": "Interactive map of destinations",
        className: "h-full w-full"
      }
    )
  ] });
}
export {
  DestinationsMap
};
