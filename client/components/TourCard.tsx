import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface Tour {
  id: string;
  name: string;
  location: string;
  image: string;
  century?: string;
}

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="group rounded-2xl border bg-card/60 text-card-foreground overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-base">{tour.name}</h3>
          {tour.century && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {tour.century}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{tour.location}</p>
        <div className="mt-3">
          <Button size="sm" asChild>
            <Link to={`/tours/${tour.id}`}>Start Tour</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
