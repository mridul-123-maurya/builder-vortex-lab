import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Festival = {
  id: string;
  name: string;
  date?: string;
  location?: string;
  description: string;
  wikipediaUrl: string;
  bookingUrl?: string;
};

const festivals: Festival[] = [
  {
    id: "losar",
    name: "Losar - Tibetan New Year",
    date: "2025-02-28",
    location: "Rumtek / Gangtok",
    description:
      "Losar is the Tibetan New Year celebrated with prayers, feasts, masked dances, and community gatherings marking the start of a new year.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Losar",
    bookingUrl: "/services",
  },
  {
    id: "saga-dawa",
    name: "Saga Dawa",
    date: "2025-05-25",
    location: "Pelling",
    description:
      "Saga Dawa commemorates the birth, enlightenment and passing of Buddha and is observed with pilgrimages, offerings, and special ceremonies at monasteries.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Saga_Dawa",
    bookingUrl: "/services",
  },
  {
    id: "bumchu",
    name: "Bumchu Festival",
    date: "2025-03-12",
    location: "Tashiding Monastery",
    description:
      "Bumchu is a ritual and popular festival involving a sacred pot of water thought to predict the fortunes of the year ahead. Large crowds gather to witness the ceremony.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Bumchu",
    bookingUrl: "/services",
  },
  {
    id: "choskar",
    name: "Choskar Festival",
    date: "2025-09-10",
    location: "Lachung",
    description:
      "Choskar is a harvest and prayer festival featuring colorful processions, traditional music, and communal feasts to give thanks for the harvest.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Choskar",
    bookingUrl: "/services",
  },
];

function FestivalCard({ festival }: { festival: Festival }) {
  return (
    <article className="rounded-xl border bg-secondary/60 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-xl mb-2">{festival.name}</h3>
      <div className="text-sm text-muted-foreground mb-3">
        {festival.date && <span className="font-medium">{festival.date}</span>}
        {festival.location && (
          <span className="ml-2">• <span className="text-muted-foreground">{festival.location}</span></span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4">{festival.description}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={festival.wikipediaUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-border bg-background hover:bg-accent/5"
        >
          Learn More
        </a>

        <Button asChild variant="default">
          <Link to={festival.bookingUrl || "/services"}>Book Trip</Link>
        </Button>
      </div>
    </article>
  );
}

export default function CulturalCalendar() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Cultural Calendar</h1>
        <p className="text-muted-foreground mb-6">
          Explore upcoming festivals and cultural events. Click "Learn More" to open the festival's Wikipedia page, or "Book Trip" to plan your visit.
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map((f) => (
            <FestivalCard key={f.id} festival={f} />
          ))}
        </section>
      </div>
    </div>
  );
}
