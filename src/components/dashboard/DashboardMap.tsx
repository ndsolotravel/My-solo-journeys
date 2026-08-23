import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Destination } from "@/lib/destinations.functions";

const SLUG_COORDS: Record<string, [number, number]> = {
  "nanga-parbat-base-camp": [35.2375, 74.589],
  "hunza-valley": [36.3167, 74.65],
  "skardu-deosai": [35.2971, 75.6333],
  "karakoram-highway": [35.92, 74.31],
  "phander-valley": [36.1667, 72.9333],
};
const COUNTRY_COORDS: Record<string, [number, number]> = { Pakistan: [30.3753, 69.3451] };

function coordsFor(d: Destination): [number, number] | null {
  return SLUG_COORDS[d.slug] ?? COUNTRY_COORDS[d.country] ?? null;
}

export function DashboardMap({ destinations }: { destinations: Destination[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    let isMounted = true;

    if (mapRef.current) {
      try {
        mapRef.current.remove();
      } catch (e) {
        // ignore
      }
      mapRef.current = null;
    }
    if ((ref.current as any)._leaflet_id) {
      delete (ref.current as any)._leaflet_id;
    }

    import("leaflet").then((LModule) => {
      if (!isMounted || !ref.current || mapRef.current) return;
      const L = LModule.default || LModule;

      if ((ref.current as any)._leaflet_id) {
        delete (ref.current as any)._leaflet_id;
      }

      const pinIcon = L.divIcon({
        className: "custom-dashboard-pin",
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:22px;height:22px;border-radius:9999px;background:rgba(255,122,0,0.25);animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="width:14px;height:14px;border-radius:9999px;background:#FF7A00;border:2px solid #ffffff;box-shadow:0 2px 6px rgba(0,0,0,0.4);position:relative;z-index:2;"></div>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12],
      });

      const map = L.map(ref.current, { scrollWheelZoom: false, zoomControl: true }).setView([30, 60], 3);

      const primaryTileLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',
          maxZoom: 18,
          subdomains: "abcd",
        },
      );

      primaryTileLayer.on("tileerror", () => {
        if (!map.hasLayer(fallbackTileLayer)) {
          map.removeLayer(primaryTileLayer);
          fallbackTileLayer.addTo(map);
        }
      });

      const fallbackTileLayer = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
          maxZoom: 18,
        },
      );

      primaryTileLayer.addTo(map);

      const pts: [number, number][] = [];
      destinations.forEach((d) => {
        const c = coordsFor(d);
        if (!c) return;
        pts.push(c);
        const popup = `
          <div style="min-width:180px;font-family:system-ui,-apple-system,sans-serif;padding:2px;">
            ${d.featured_image ? `<img src="${d.featured_image}" alt="${d.title}" style="width:100%;height:85px;object-fit:cover;border-radius:6px;margin-bottom:6px" onerror="this.style.display='none'"/>` : ""}
            <strong style="font-size:13px;color:#111;display:block;margin-bottom:2px;">${d.title}</strong>
            <span style="font-size:11px;color:#666;display:block;margin-bottom:6px;">📍 ${d.country}${d.region ? ` · ${d.region}` : ""}</span>
            <a href="/destinations/${d.slug}" style="color:#FF7A00;font-size:12px;font-weight:600;text-decoration:none;">View destination →</a>
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
      setMapLoaded(true);
    });

    return () => {
      isMounted = false;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          // ignore
        }
        mapRef.current = null;
      }
    };
  }, [destinations]);

  return (
    <div className="relative h-[480px] sm:h-[560px] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {!mapLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/40 animate-pulse">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Loading expedition map...
          </span>
        </div>
      )}
      <div
        ref={ref}
        role="region"
        aria-label="Travel map"
        className="h-full w-full"
      />
    </div>
  );
}
