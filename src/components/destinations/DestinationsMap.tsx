import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Destination } from "@/lib/destinations.functions";

// Curated coordinates by slug, with country-centroid fallback.
const SLUG_COORDS: Record<string, [number, number]> = {
  "nanga-parbat-base-camp": [35.2375, 74.589],
  "hunza-valley": [36.3167, 74.65],
  "skardu-deosai": [35.2971, 75.6333],
  "karakoram-highway": [35.92, 74.31],
  "phander-valley": [36.1667, 72.9333],
};

const COUNTRY_COORDS: Record<string, [number, number]> = {
  Pakistan: [30.3753, 69.3451],
};

function coordsFor(d: Destination): [number, number] | null {
  // Support explicit destination latitude/longitude from CMS/database
  const dLat = (d as any).latitude;
  const dLng = (d as any).longitude;
  if (
    typeof dLat === "number" &&
    typeof dLng === "number" &&
    !isNaN(dLat) &&
    !isNaN(dLng) &&
    dLat >= -90 &&
    dLat <= 90 &&
    dLng >= -180 &&
    dLng <= 180
  ) {
    return [dLat, dLng];
  }

  // Check if any linked post in this destination has coordinates
  if (d.posts && Array.isArray(d.posts)) {
    const postWithCoords = d.posts.find(
      (p: any) =>
        typeof p.latitude === "number" &&
        typeof p.longitude === "number" &&
        !isNaN(p.latitude) &&
        !isNaN(p.longitude) &&
        p.latitude >= -90 &&
        p.latitude <= 90 &&
        p.longitude >= -180 &&
        p.longitude <= 180,
    );
    if (postWithCoords) {
      return [(postWithCoords as any).latitude, (postWithCoords as any).longitude];
    }
  }

  return SLUG_COORDS[d.slug] ?? COUNTRY_COORDS[d.country] ?? null;
}

export function DestinationsMap({ destinations }: { destinations: Destination[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    let isMounted = true;

    // Ensure any previously attached Leaflet instance on this container is cleanly removed
    if (mapRef.current) {
      try {
        mapRef.current.remove();
      } catch (e) {
        // ignore cleanup error
      }
      mapRef.current = null;
    }
    if ((ref.current as any)._leaflet_id) {
      delete (ref.current as any)._leaflet_id;
    }

    let resizeObserver: ResizeObserver | null = null;

    import("leaflet").then((LModule) => {
      if (!isMounted || !ref.current || mapRef.current) return;
      const L = LModule.default || LModule;

      // Fix container re-attachment check
      if ((ref.current as any)._leaflet_id) {
        delete (ref.current as any)._leaflet_id;
      }

      const map = L.map(ref.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([35.5, 74.5], 6);

      // OpenStreetMap standard tile layer (free, reliable, no API key, no watermarks)
      const osmTileLayer = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
          maxZoom: 19,
        },
      );
      osmTileLayer.addTo(map);

      // Branded pin icon
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
        popupAnchor: [0, -14],
      });

      const bounds: [number, number][] = [];
      destinations.forEach((d) => {
        const c = coordsFor(d);
        if (!c) return;
        bounds.push(c);
        const popup = `
          <div style="min-width:180px;font-family:system-ui,-apple-system,sans-serif;padding:2px;">
            ${d.featured_image ? `<img src="${d.featured_image}" alt="${d.title}" style="width:100%;height:85px;object-fit:cover;border-radius:8px;margin-bottom:6px;" onerror="this.style.display='none'"/>` : ""}
            <strong style="font-size:13px;color:#111;display:block;margin-bottom:2px;">${d.title}</strong>
            <span style="font-size:11px;color:#666;display:block;margin-bottom:6px;">📍 ${d.country}${d.region ? ` · ${d.region}` : ""}</span>
            <a href="/destinations/${d.slug}" style="color:#FF7A00;font-size:12px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:3px;">Explore guide →</a>
          </div>`;
        L.marker(c, { icon: pinIcon, title: d.title }).addTo(map).bindPopup(popup);
      });

      // Automatically fit all available destination markers
      if (bounds.length > 1) {
        map.fitBounds(bounds as any, { padding: [40, 40], maxZoom: 12 });
      } else if (bounds.length === 1) {
        map.setView(bounds[0], 8);
      }

      // Invalidate size once container layout is settled
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 150);

      // Responsive resize observer to re-center and adapt map
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
          // ignore cleanup error
        }
        mapRef.current = null;
      }
    };
  }, [destinations]);

  return (
    <div className="relative h-[380px] sm:h-[440px] lg:h-[480px] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {!mapLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/40 animate-pulse">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Loading interactive map...
          </span>
        </div>
      )}
      <div
        ref={ref}
        role="region"
        aria-label="Interactive map of destinations"
        className="h-full w-full"
      />
    </div>
  );
}
