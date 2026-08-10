import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Destination } from "@/lib/destinations.functions";

const SLUG_COORDS: Record<string, [number, number]> = {
  "nanga-parbat-base-camp": [35.2375, 74.589],
  "hunza-valley": [36.3167, 74.65],
  "skardu-deosai": [35.2971, 75.6333],
  "karakoram-highway": [35.92, 74.31],
};
const COUNTRY_COORDS: Record<string, [number, number]> = { Pakistan: [30.3753, 69.3451] };

function coordsFor(d: Destination): [number, number] | null {
  return SLUG_COORDS[d.slug] ?? COUNTRY_COORDS[d.country] ?? null;
}

export function DashboardMap({ destinations }: { destinations: Destination[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || mapRef.current) return;
    let isMounted = true;

    import("leaflet").then((LModule) => {
      if (!isMounted || !ref.current || mapRef.current) return;
      const L = LModule.default || LModule;

      const pinIcon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;border-radius:9999px;background:#FF7A00;box-shadow:0 0 0 4px rgba(255,122,0,.25),0 2px 6px rgba(0,0,0,.4);border:2px solid #fff"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const map = L.map(ref.current, { scrollWheelZoom: false, zoomControl: true }).setView([30, 60], 3);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 18,
      }).addTo(map);

      const pts: [number, number][] = [];
      destinations.forEach((d) => {
        const c = coordsFor(d);
        if (!c) return;
        pts.push(c);
        const popup = `
          <div style="min-width:180px;font-family:inherit">
            ${d.featured_image ? `<img src="${d.featured_image}" style="width:100%;height:90px;object-fit:cover;border-radius:6px;margin-bottom:6px"/>` : ""}
            <strong>${d.title}</strong><br/>
            <span style="font-size:11px;color:#666">${d.country}${d.region ? ` · ${d.region}` : ""}</span><br/>
            <a href="/destinations/${d.slug}" style="color:#FF7A00;font-size:12px">View trip →</a>
          </div>`;
        L.marker(c, { icon: pinIcon, title: d.title }).addTo(map).bindPopup(popup);
      });

      if (pts.length > 1) {
        L.polyline(pts as any, { color: "#FF7A00", weight: 2.5, opacity: 0.8, dashArray: "6 6" }).addTo(map);
        map.fitBounds(pts as any, { padding: [50, 50] });
      } else if (pts.length === 1) {
        map.setView(pts[0], 6);
      }
      mapRef.current = map;
    });

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [destinations]);

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Travel map"
      className="h-[560px] w-full overflow-hidden rounded-3xl border border-border"
    />
  );
}
