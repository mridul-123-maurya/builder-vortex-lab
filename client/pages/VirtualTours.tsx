import LanguageSelector from "@/components/LanguageSelector";
import TourCard, { type Tour } from "@/components/TourCard";
import tours from "@/data/tours.json";

export default function VirtualTours() {
  const items = tours as Tour[];
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Virtual Tours</h1>
        <div className="flex items-center gap-3">
          <LanguageSelector />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border overflow-hidden">
          <PanoViewer src={(items[0] as any).pano || "https://photo-sphere-viewer-data.netlify.app/assets/spheremountains.jpg"} height={420} />
          <div className="p-4 text-sm text-muted-foreground">
            Drag to look around. Use the fullscreen button for an immersive view.
          </div>
        </div>
        <div className="rounded-xl border p-4 bg-secondary/40">
          <h2 className="font-semibold">Featured Monasteries</h2>
          <p className="text-sm text-muted-foreground">Browse and start a tour.</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {items.slice(0, 4).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
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
