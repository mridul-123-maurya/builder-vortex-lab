import { useParams, Link } from "react-router-dom";
import tours from "@/data/tours.json";
import type { Tour } from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import PanoViewer from "@/components/PanoViewer";
import PhotoGallery from "@/components/PhotoGallery";
import ContributeDialog from "@/components/ContributeDialog";
import ReviewDialog, { type Review } from "@/components/ReviewDialog";

export default function TourDetail() {
  const { id } = useParams();
  const tour = (tours as Tour[]).find((t) => t.id === id);

  if (!tour) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Tour not found</h1>
        <p className="text-muted-foreground">
          We couldn't find this monastery.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/tours">Back to tours</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl overflow-hidden border">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-80 object-cover"
          />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">{tour.name}</h1>
          <p className="text-muted-foreground">{tour.location}</p>
          <div className="mt-4 rounded-xl overflow-hidden border">
            {(tour as any).streetViewEmbed ? (
              <iframe
                src={(tour as any).streetViewEmbed}
                className="w-full h-[320px]"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Street View"
              />
            ) : (
              <PanoViewer
                src={
                  (tour as any).pano ||
                  "https://photo-sphere-viewer-data.netlify.app/assets/spheremountains.jpg"
                }
                height={320}
              />
            )}
          </div>
          <div className="mt-6 flex gap-3">
            <Button>Start Tour</Button>
            <Button variant="outline" asChild>
              <Link to="/archives">Related Archives</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container py-10">
        <h2 className="font-semibold mb-3">Photo Gallery</h2>
        <PhotoGallery images={(tour as any).gallery || [tour.image]} />
      </div>
    </>
  );
}
