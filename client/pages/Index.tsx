import HeroSection from "@/components/HeroSection";
import TourCard, { type Tour } from "@/components/TourCard";
import tours from "@/data/tours.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/i18n";

export default function Index() {
  const items = tours as Tour[];
  const highlight = items[0];
  const { t } = useI18n();

  return (
    <div className="bg-gradient-to-b from-secondary/60 to-background">
      <div className="container py-8 md:py-12">
        <HeroSection />

        <section id="quick-links" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickLink to="/tours" title={t("virtualTours")} description="Immerse in 360° views of monasteries." icon="🧭" />
          <QuickLink to="/map" title={t("interactiveMap")} description="Find monasteries and nearby spots." icon="🗺️" />
          <QuickLink to="/calendar" title={t("calendar")} description="Festivals, rituals, and events." icon="📅" />
          <QuickLink to="/archives" title={t("archives")} description="Manuscripts, murals, and more." icon="📜" />
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border p-6 bg-card/60">
            <h2 className="font-display text-2xl font-bold">{t("monasteryOfWeek")}</h2>
            <p className="text-muted-foreground text-sm">Discover a highlighted site and its history.</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <img src={highlight.image} alt={highlight.name} className="rounded-xl w-full h-60 object-cover" loading="lazy" />
              <div>
                <h3 className="text-xl font-semibold">{highlight.name}</h3>
                <p className="text-sm text-muted-foreground">{highlight.location}</p>
                <p className="mt-3 text-sm">An important center of Buddhist learning and art, known for its serene surroundings and heritage.</p>
                <div className="mt-4 flex gap-3">
                  <Button asChild>
                    <Link to={`/tours/${highlight.id}`}>Start Tour</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/archives">View Archives</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6 bg-secondary/40">
            <h2 className="font-semibold">Trending Tours</h2>
            <div className="mt-4 grid gap-4">
              {items.slice(1, 4).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">Explore Monasteries</h2>
            <Link to="/tours" className="text-sm text-primary hover:underline">See all</Link>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function QuickLink({ to, title, description, icon }: { to: string; title: string; description: string; icon: string }) {
  return (
    <Link to={to} className="group rounded-2xl border p-5 bg-card hover:shadow-md hover:-translate-y-0.5 transition">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-semibold group-hover:text-primary">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
