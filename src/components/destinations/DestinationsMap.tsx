import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Destination } from "@/lib/destinations.functions";

// Curated coordinates by slug, with country-centroid fallback.
const SLUG_COORDS: Record<string, [number, number]> = {
  "nanga-parbat-base-camp": [35.2375, 74.589],
  "hunza-valley": [36.3167, 74.65],
  "skardu-deosai": [35.2971, 75.6333],
  "karakoram-highway": [35.92, 74.31],
  "phander-valley": [36.179, 73.751],
};

const COUNTRY_COORDS: Record<string, [number, number]> = {
  Pakistan: [30.3753, 69.3451],
};

function coordsFor(d: Destination): [number, number] | null {
  return SLUG_COORDS[d.slug] ?? COUNTRY_COORDS[d.country] ?? null;
}

export function DestinationsMap({ destinations }: { destinations: Destination[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || mapRef.current) return;
    let isMounted = true;

    import("leaflet").then((LModule) => {
      if (!isMounted || !ref.current || mapRef.current) return;
      const L = LModule.default || LModule;

      const markerIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const map = L.map(ref.current, { scrollWheelZoom: false }).setView([35.5, 74.5], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const bounds: [number, number][] = [];
      destinations.forEach((d) => {
        const c = coordsFor(d);
        if (!c) return;
        bounds.push(c);
        const popup = `
          <div style="min-width:160px">
            <strong>${d.title}</strong><br/>
            <span style="font-size:11px;color:#666">${d.country}${d.region ? ` · ${d.region}` : ""}</span><br/>
            <a href="/destinations/${d.slug}" style="color:#FF7A00;font-size:12px;text-decoration:underline">View guide →</a>
          </div>`;
        L.marker(c, { icon: markerIcon, title: d.title }).addTo(map).bindPopup(popup);
      });
      if (bounds.length > 1) map.fitBounds(bounds as any, { padding: [40, 40] });
      else if (bounds.length === 1) map.setView(bounds[0], 8);
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
      aria-label="Interactive map of destinations"
      className="h-[480px] w-full overflow-hidden rounded-2xl border border-border"
    />
  );
}
