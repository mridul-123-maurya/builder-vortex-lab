import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import tours from "@/data/tours.json";

function loadLeaflet(): Promise<void> {
  if ((window as any)._leafletLoading) return (window as any)._leafletLoading;
  const promise = new Promise<void>((resolve, reject) => {
    // load css
    if (!document.querySelector("link[data-leaflet-css]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.setAttribute("data-leaflet-css", "");
      document.head.appendChild(link);
    }
    // load script
    if ((window as any).L) return resolve();
    const existing = document.querySelector("script[data-leaflet-js]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Leaflet JS")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.setAttribute("data-leaflet-js", "");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Leaflet JS"));
    document.body.appendChild(script);
  });
  (window as any)._leafletLoading = promise;
  return promise;
}

function parseCoordsFromEmbed(embed?: string): [number, number] | null {
  if (!embed) return null;
  // Try pattern !1d{lat}!2d{lng}
  const m = embed.match(/!1d([\-\d.]+)!2d([\-\d.]+)/);
  if (m) return [parseFloat(m[1]), parseFloat(m[2])];
  // Try @lat,lng pattern
  const m2 = embed.match(/@([\-\d.]+),([\-\d.]+)/);
  if (m2) return [parseFloat(m2[1]), parseFloat(m2[2])];
  return null;
}

export default function MapPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const items = tours as any[];

  function haversineKm(a: [number, number], b: [number, number]) {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(b[0] - a[0]);
    const dLon = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const sinDlat = Math.sin(dLat / 2);
    const sinDlon = Math.sin(dLon / 2);
    const aa = sinDlat * sinDlat + sinDlon * sinDlon * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
    return R * c;
  }

  function formatDistance(km: number) {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${Math.round(km)} km`;
  }

  function estimateTime(km: number) {
    // estimate travel time by road: average 40 km/h
    const hours = km / 40;
    if (hours < 0.5) return `30 mins`;
    if (hours < 1.5) return `1-2 hours`;
    if (hours < 3) return `2-3 hours`;
    return `3+ hours`;
  }

  useEffect(() => {
    let mounted = true;
    loadLeaflet()
      .then(() => {
        if (!mounted) return;
        const L = (window as any).L;
        if (!L) throw new Error("Leaflet not available after loading");

        const defaultCenter: [number, number] = [27.5333, 88.5]; // Gangtok center fallback
        const map = L.map(containerRef.current as HTMLElement, {
          center: defaultCenter,
          zoom: 9,
          scrollWheelZoom: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const positions: [number, number][] = [];

        items.forEach((tour, i) => {
          const coords =
            parseCoordsFromEmbed(tour.streetViewEmbed) || parseCoordsFromEmbed(tour.streetView) || null;
          let latlng: [number, number];
          if (coords) latlng = coords;
          else {
            const jitter = (i % 10) * 0.0025;
            latlng = [defaultCenter[0] + jitter, defaultCenter[1] + (i % 5) * 0.0025 - 0.005];
          }

          positions.push(latlng);
          const marker = L.marker(latlng).addTo(map);

          const popupContent = `
            <div style="min-width:200px">
              <a href="/tours/${tour.id}" style="font-weight:700;color:var(--primary);text-decoration:none">${tour.name}</a>
              <div style="font-size:12px;color:var(--muted-foreground);margin-top:6px">${tour.location || ""}</div>
              <div style="font-size:12px;color:var(--muted-foreground);margin-top:6px">${tour.century || ""}</div>
            </div>
          `;

          marker.bindPopup(popupContent);
          markersRef.current[tour.id] = marker;
        });

        if (positions.length === 1) map.setView(positions[0], 12);
        else if (positions.length > 1) map.fitBounds((L as any).latLngBounds(positions).pad(0.2));

        mapRef.current = map;
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    return () => {
      mounted = false;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {}
        mapRef.current = null;
      }
    };
  }, [items]);

  const gangtok: [number, number] = [27.3389, 88.6065];

  const flyToTour = (tour: any) => {
    const map = mapRef.current;
    if (!map) return;
    const marker = markersRef.current[tour.id];
    const coords =
      parseCoordsFromEmbed(tour.streetViewEmbed) || parseCoordsFromEmbed(tour.streetView) || null;
    const latlng = coords || [27.5333, 88.5];
    map.setView(latlng, 12, { animate: true });
    if (marker) marker.openPopup();
    setActiveId(tour.id);
  };

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Interactive Map</h1>
        <div>
          <Link to="/tours" className="text-sm text-primary underline">Back to Virtual Tours</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          {items.map((tour) => {
            const coords =
              parseCoordsFromEmbed(tour.streetViewEmbed) || parseCoordsFromEmbed(tour.streetView) || null;
            const latlng = (coords as [number, number]) || [27.5333, 88.5];
            const dist = haversineKm(gangtok, latlng);
            return (
              <div
                key={tour.id}
                onClick={() => flyToTour(tour)}
                className={`rounded-xl border bg-secondary/60 p-4 cursor-pointer transition-shadow hover:shadow-lg ${
                  activeId === tour.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <img src={tour.image} alt={tour.name} className="h-16 w-24 rounded-md object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{tour.name}</h3>
                    <div className="text-sm text-muted-foreground">{tour.location}</div>
                    <div className="mt-2 text-sm text-muted-foreground flex gap-3">
                      <div className="flex items-center gap-2">📍 {formatDistance(dist)}</div>
                      <div className="flex items-center gap-2">⏱ {estimateTime(dist)}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link to={`/tours/${tour.id}`} className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium">
                    Virtual Tour
                  </Link>
                  <a href={tour.streetViewEmbed || tour.streetView || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-yellow-300 to-yellow-600 px-3 py-2 text-sm font-medium text-white">
                    Visit
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-span-2 rounded-xl overflow-hidden border" style={{ height: 600 }}>
          <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rounded-md bg-white/80 px-4 py-2">Loading map…</div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">Click markers for details and to open the tour page.</p>
    </div>
  );
}
