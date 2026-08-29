import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation } from "lucide-react";

interface BlogPostMapProps {
  locationName?: string | null;
  latitude: number | null | undefined;
  longitude: number | null | undefined;
  title?: string;
}

export function BlogPostMap({ locationName, latitude, longitude, title }: BlogPostMapProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const isValidLat =
    typeof latitude === "number" && !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  const isValidLng =
    typeof longitude === "number" && !isNaN(longitude) && longitude >= -180 && longitude <= 180;

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    if (!isValidLat || !isValidLng || latitude == null || longitude == null) return;

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

    let resizeObserver: ResizeObserver | null = null;

    import("leaflet").then((LModule) => {
      if (!isMounted || !ref.current || mapRef.current) return;
      const L = LModule.default || LModule;

      if ((ref.current as any)._leaflet_id) {
        delete (ref.current as any)._leaflet_id;
      }

      const map = L.map(ref.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([latitude, longitude], 10);

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
        className: "custom-blog-pin",
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:24px;height:24px;border-radius:9999px;background:rgba(255,122,0,0.3);animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="width:16px;height:16px;border-radius:9999px;background:#FF7A00;border:2.5px solid #ffffff;box-shadow:0 2px 6px rgba(0,0,0,0.4);position:relative;z-index:2;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14],
      });

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 180px; padding: 2px;">
          ${title ? `<p style="font-size: 13px; font-weight: bold; margin: 0 0 4px; color: #111;">${title}</p>` : ""}
          ${locationName ? `<p style="font-size: 12px; margin: 0 0 6px; color: #555; display: flex; align-items: center; gap: 4px;">📍 ${locationName}</p>` : ""}
          <p style="font-size: 11px; margin: 0; color: #888;">Coordinates: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E</p>
        </div>
      `;

      L.marker([latitude, longitude], { icon: pinIcon, title: locationName || title || "Location" })
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();

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
          // ignore
        }
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, locationName, title, isValidLat, isValidLng]);

  if (!isValidLat || !isValidLng || latitude == null || longitude == null) {
    return null;
  }

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
          <MapPin className="h-4 w-4 text-[#FF7A00]" />
          <span>{locationName || "Story Coordinates"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Navigation className="h-3.5 w-3.5 text-[#FF7A00]" />
          <span>
            {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
          </span>
        </div>
      </div>
      <div className="relative h-[340px] w-full sm:h-[400px]">
        {!mapLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/40 animate-pulse">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Loading location map...
            </span>
          </div>
        )}
        <div
          ref={ref}
          role="region"
          aria-label={`Interactive map of ${locationName || "story location"}`}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
