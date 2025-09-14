import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import tours from "@/data/tours.json";

function loadLeaflet(): Promise<void> {
  if ((window as any)._leafletLoading) return (window as any)._leafletLoading;
  const promise = new Promise<void>((resolve, reject) => {
    // load css
    if (!document.querySelector('link[data-leaflet-css]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.setAttribute("data-leaflet-css", "");
      document.head.appendChild(link);
    }
    // load script
    if ((window as any).L) return resolve();
    const existing = document.querySelector('script[data-leaflet-js]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Leaflet JS")));
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
  const [loading, setLoading] = useState(true);
  const items = tours as any[];

  useEffect(() => {
    let mounted = true;
    loadLeaflet()
      .then(() => {
        if (!mounted) return;
        const L = (window as any).L;
        if (!L) throw new Error("Leaflet not available after loading");

        // create map
        const defaultCenter: [number, number] = [27.5333, 88.5];
        const map = L.map(containerRef.current as HTMLElement, {
          center: defaultCenter,
          zoom: 9,
          scrollWheelZoom: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // ensure default icon paths work when loaded from CDN
        try {
          // Leaflet 1.9+ loads icons relative to CSS; using CDN CSS should work.
        } catch (e) {
          // ignore
        }

        const markers: any[] = [];
        const positions: [number, number][] = [];

        items.forEach((tour, i) => {
          const coords = parseCoordsFromEmbed(tour.streetViewEmbed) || parseCoordsFromEmbed(tour.streetView) || null;
          let latlng: [number, number];
          if (coords) latlng = coords;
          else {
            // fallback: jitter around default center so markers are visible
            const jitter = (i % 10) * 0.0025;
            latlng = [defaultCenter[0] + jitter, defaultCenter[1] + (i % 5) * 0.0025 - 0.005];
          }
          positions.push(latlng);
          const marker = L.marker(latlng).addTo(map);
          const popupContent = `
            <div style="min-width:160px">
              <a href="/tours/${tour.id}" style="font-weight:600;color:#0b5fff;text-decoration:none">${tour.name}</a>
              <div style="font-size:12px;color:#444">${tour.location || ""}</div>
            </div>
          `;
          marker.bindPopup(popupContent);
          markers.push(marker);
        });

        if (positions.length === 1) {
          map.setView(positions[0], 12);
        } else if (positions.length > 1) {
          const bounds = L.latLngBounds(positions as any);
          map.fitBounds(bounds.pad(0.2));
        }

        mapRef.current = map;
        setLoading(false);
      })
      .catch((err) => {
        // keep loading false to show an error state
        console.error(err);
        setLoading(false);
      });

    return () => {
      mounted = false;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          // ignore
        }
        mapRef.current = null;
      }
    };
  }, [items]);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Interactive Map</h1>
        <div>
          <Link to="/tours" className="text-sm text-primary underline">
            Back to Virtual Tours
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-xl overflow-hidden border" style={{ height: 600 }}>
        <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-md bg-white/80 px-4 py-2">Loading map…</div>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Click markers for details and to open the tour page.
      </p>
    </div>
  );
}
