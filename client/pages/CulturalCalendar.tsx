import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoogleCalendarEmbed from "@/components/GoogleCalendarEmbed";

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
  {
    id: "pang-lhabsol",
    name: "Pang Lhabsol",
    date: "2025-08-30",
    location: "Gangtok / Rabong",
    description:
      "Pang Lhabsol honors Mount Khangchendzonga with masked dances and prayers for protection and unity across communities in Sikkim.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Pang_Lhabsol",
    bookingUrl: "/services",
  },
  {
    id: "drukpa-teshi",
    name: "Drukpa Teshi",
    date: "2025-07-31",
    location: "Ravangla / Namchi",
    description:
      "Drukpa Teshi marks the day the Buddha first taught the Four Noble Truths; observed with prayers and Dharma discourses.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Drukpa_Teshi",
    bookingUrl: "/services",
  },
  {
    id: "hemis-festival",
    name: "Hemis Festival",
    date: "2025-06-20",
    location: "Hemis Monastery, Ladakh",
    description:
      "Hemis Festival celebrates Guru Padmasambhava with vibrant cham dances, thangka displays, and traditional music.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Hemis_festival",
    bookingUrl: "/services",
  },
  {
    id: "lhabab-duchen",
    name: "Lhabab Düchen",
    date: "2025-11-10",
    location: "Multiple Monasteries",
    description:
      "Lhabab Düchen commemorates the Buddha’s descent from the heavenly realm; a day of merit-making and special rituals.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Lhabab_D%C3%BCchen",
    bookingUrl: "/services",
  },
  {
    id: "kagyed-dance",
    name: "Kagyed Dance",
    date: "2025-12-05",
    location: "Phodong / Rumtek",
    description:
      "Kagyed is a masked cham dance performed before Losoong, symbolizing the destruction of evil and welcoming peace.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Kagyed_Dance",
    bookingUrl: "/services",
  },
  {
    id: "losoong",
    name: "Losoong / Namsoong",
    date: "2025-12-15",
    location: "Sikkim",
    description:
      "Losoong marks the Sikkimese New Year and the end of the harvest season with traditional games, dances, and community feasts.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Losoong",
    bookingUrl: "/services",
  },
];

function CalendarHeader({ count }: { count: number }) {
  return (
    <header className="mb-6">
      <h1 className="font-display text-3xl md:text-4xl font-bold">Cultural Calendar</h1>
      <p className="text-muted-foreground mt-2">Upcoming festivals and cultural events — discover dates, locations, and how to join.</p>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">{count} events</div>
          <div className="text-sm text-muted-foreground">Plan ahead and book early for the best experience.</div>
        </div>
      </div>
    </header>
  );
}

function SearchBar({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  return (
    <div className="mt-4">
      <label className="sr-only">Search events</label>
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search festivals, locations, or dates"
          className="w-full rounded-full border border-input bg-background px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">Press Enter</div>
      </div>
    </div>
  );
}

function FestivalCard({ festival }: { festival: Festival }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/60 to-white/40 dark:from-slate-900 dark:to-slate-800 p-6 shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight">{festival.name}</h3>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            {festival.date && <span className="rounded-full bg-muted/10 px-2 py-0.5 font-medium">{festival.date}</span>}
            {festival.location && <span className="text-sm">{festival.location}</span>}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{festival.description}</p>

      <div className="mt-5 flex items-center gap-3">
        <a
          href={festival.wikipediaUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md border border-input px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/5"
        >
          Learn More
        </a>

        <Button asChild variant="default" size="sm">
          <Link to={festival.bookingUrl || "/services"} className="inline-flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/MakeMyTrip_Logo.svg/256px-MakeMyTrip_Logo.svg.png"
              alt="MakeMyTrip"
              className="h-4 w-auto rounded-[2px] bg-white p-[1px]"
              loading="lazy"
              decoding="async"
            />
            <span>Book Trip</span>
          </Link>
        </Button>

      </div>
    </article>
  );
}

export default function CulturalCalendar() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return festivals;
    return festivals.filter((f) => {
      return (
        f.name.toLowerCase().includes(q) ||
        (f.location && f.location.toLowerCase().includes(q)) ||
        (f.date && f.date.toLowerCase().includes(q)) ||
        f.description.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const gcalId = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined;
  const timeZone = (import.meta as any).env?.VITE_GOOGLE_CALENDAR_TZ || "Asia/Kolkata";

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-6xl">
        <CalendarHeader count={festivals.length} />

        <SearchBar query={query} setQuery={setQuery} />

        <div className="mt-6">
          <GoogleCalendarEmbed calendarId={gcalId} timeZone={timeZone} />
        </div>

        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (
            <FestivalCard key={f.id} festival={f} />
          ))}
        </section>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">No events found — try different keywords.</div>
        )}
      </div>
    </div>
  );
}
