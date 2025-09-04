import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!id) return;
    try {
      const c = localStorage.getItem(`contrib:${id}`);
      if (c) {
        const parsed = JSON.parse(c);
        setExtraImages(parsed.images || []);
      }
      const r = localStorage.getItem(`reviews:${id}`);
      if (r) setReviews(JSON.parse(r));
    } catch {}
  }, [id]);

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
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Start Tour</Button>
            <Button variant="outline" asChild>
              <Link to="/archives">Related Archives</Link>
            </Button>
            {id && (
              <ContributeDialog
                tourId={id}
                onSaved={(d) => {
                  setExtraImages(d.images || []);
                }}
              />
            )}
            {id && (
              <ReviewDialog tourId={id} onSaved={(r) => setReviews((prev) => [...prev, r])} />
            )}
          </div>
        </div>
      </div>
      <div className="container py-10">
        <h2 className="font-semibold mb-3">Photo Gallery</h2>
        <PhotoGallery images={[...(((tour as any).gallery as string[]) || [tour.image]), ...extraImages]} />
      </div>
      <div className="container pb-12">
        <h2 className="font-semibold mb-3">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">No reviews yet.</p>
        ) : (
          <ul className="grid gap-3">
            {reviews.map((r, i) => (
              <li key={i} className="rounded-xl border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                </div>
                <p className="text-sm mt-1">{r.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
