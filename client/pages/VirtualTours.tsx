import { useEffect, useState, useRef } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import TourCard, { type Tour } from "@/components/TourCard";
import tours from "@/data/tours.json";
import PanoViewer from "@/components/PanoViewer";

export default function VirtualTours() {
  const items = tours as Tour[];
  const [index, setIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // rotate every 6 seconds when not interacting
    const rotate = () => {
      if (isInteracting) return;
      setIndex((i) => (i + 1) % items.length);
    };
    intervalRef.current = window.setInterval(rotate, 6000);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInteracting, items.length]);

  const current = items[index] as any;
  const panoSrc = current.pano || "https://photo-sphere-viewer-data.netlify.app/assets/spheremountains.jpg";

  // helpers for iframe interaction detection
  const iframeTimeoutRef = useRef<number | null>(null);
  const startIframeInteract = () => {
    if (iframeTimeoutRef.current) {
      window.clearTimeout(iframeTimeoutRef.current);
      iframeTimeoutRef.current = null;
    }
    setIsInteracting(true);
  };
  const stopIframeInteract = () => {
    if (iframeTimeoutRef.current) window.clearTimeout(iframeTimeoutRef.current);
    iframeTimeoutRef.current = window.setTimeout(() => setIsInteracting(false), 2000);
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          Virtual Tours
        </h1>
        <div className="flex items-center gap-3">
          <LanguageSelector />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border overflow-hidden relative">
          <div className="absolute left-4 top-4 bg-black/60 text-white text-sm font-medium px-3 py-1 rounded shadow">
            {current.name}
          </div>
          {current.streetViewEmbed ? (
            <div style={{ height: 420 }} className="w-full rounded-b-xl overflow-hidden">
              <iframe
                src={current.streetViewEmbed}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onMouseDown={startIframeInteract}
                onTouchStart={startIframeInteract}
                onMouseEnter={startIframeInteract}
                onFocus={startIframeInteract}
                onMouseUp={stopIframeInteract}
                onTouchEnd={stopIframeInteract}
                onMouseLeave={stopIframeInteract}
                title={current.name + " street view"}
              />
            </div>
          ) : (
            <PanoViewer src={panoSrc} height={420} onInteractionChange={setIsInteracting} />
          )}
          <div className="p-4 text-sm text-muted-foreground">
            Drag to look around. Use the fullscreen button for an immersive
            view.
          </div>
        </div>
        <div className="rounded-xl border p-4 bg-secondary/40">
          <h2 className="font-semibold">Featured Monasteries</h2>
          <p className="text-sm text-muted-foreground">
            Browse and start a tour.
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {items.slice(0, 4).map((tour, i) => (
              <div key={tour.id} onClick={() => setIndex(i)}>
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="mt-10 font-semibold">All Tours</h2>
      <div className="mt-3 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
