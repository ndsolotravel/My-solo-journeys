import { useEffect, useRef } from "react";
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

  const isValidLat = typeof latitude === "number" && !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  const isValidLng = typeof longitude === "number" && !isNaN(longitude) && longitude >= -180 && longitude <= 180;

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || mapRef.current) return;
    if (!isValidLat || !isValidLng || latitude == null || longitude == null) return;

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

      const map = L.map(ref.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([latitude, longitude], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const popupContent = `
        <div style="font-family: inherit; min-width: 180px; padding: 2px;">
          ${title ? `<p style="font-size: 13px; font-weight: bold; margin: 0 0 4px; color: #111;">${title}</p>` : ""}
          ${locationName ? `<p style="font-size: 12px; margin: 0 0 6px; color: #555; display: flex; align-items: center; gap: 4px;">📍 ${locationName}</p>` : ""}
          <p style="font-size: 11px; margin: 0; color: #888;">Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</p>
        </div>
      `;

      L.marker([latitude, longitude], { icon: markerIcon, title: locationName || title || "Location" })
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();

      mapRef.current = map;
    });

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
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
          <MapPin className="h-4 w-4 text-accent" />
          <span>{locationName || "Story Coordinates"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Navigation className="h-3.5 w-3.5 text-accent" />
          <span>{latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E</span>
        </div>
      </div>
      <div
        ref={ref}
        role="region"
        aria-label={`Interactive map of ${locationName || "story location"}`}
        className="h-[340px] w-full sm:h-[400px]"
      />
    </div>
  );
}
