import { useParams, Link } from "react-router-dom";
import tours from "@/data/tours.json";
import type { Tour } from "@/components/TourCard";
import { Button } from "@/components/ui/button";

export default function TourDetail() {
  const { id } = useParams();
  const tour = (tours as Tour[]).find((t) => t.id === id);

  if (!tour) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Tour not found</h1>
        <p className="text-muted-foreground">We couldn't find this monastery.</p>
        <div className="mt-6">
          <Button asChild><Link to="/tours">Back to tours</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 grid gap-6 md:grid-cols-2">
      <div className="rounded-xl overflow-hidden border">
        <img src={tour.image} alt={tour.name} className="w-full h-80 object-cover" />
      </div>
      <div>
        <h1 className="font-display text-3xl font-bold">{tour.name}</h1>
        <p className="text-muted-foreground">{tour.location}</p>
        <div className="mt-4 rounded-xl border bg-secondary/50 p-4">
          <div className="text-lg font-semibold">360° Viewer</div>
          <p className="text-sm text-muted-foreground">Embed your panoramic viewer here.</p>
        </div>
        <div className="mt-6 flex gap-3">
          <Button>Start Tour</Button>
          <Button variant="outline" asChild><Link to="/archives">Related Archives</Link></Button>
        </div>
      </div>
    </div>
  );
}
