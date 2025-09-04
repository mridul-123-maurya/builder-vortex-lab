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

        <section
          id="quick-links"
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <QuickLink
            to="/tours"
            title={t("virtualTours")}
            description="Immerse in 360° views of monasteries."
            icon="🧭"
          />
          <QuickLink
            to="/map"
            title={t("interactiveMap")}
            description="Find monasteries and nearby spots."
            icon="🗺️"
          />
          <QuickLink
            to="/calendar"
            title={t("calendar")}
            description="Festivals, rituals, and events."
            icon="📅"
          />
          <QuickLink
            to="/archives"
            title={t("archives")}
            description="Manuscripts, murals, and more."
            icon="📜"
          />
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border p-6 bg-card/60">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">
              {t("monasteryOfWeek")}
            </h2>
            <p className="text-muted-foreground text-sm">
              Discover a highlighted site and its history.
            </p>
            <div className="mt-4 grid gap-5">
              <img
                src={highlight.image}
                alt={highlight.name}
                className="rounded-2xl w-full h-80 md:h-96 object-cover"
                loading="lazy"
              />
              <div className="px-1">
                <h3 className="text-2xl md:text-3xl font-display font-semibold">{highlight.name}</h3>
                <p className="mt-1 text-sm md:text-base text-muted-foreground">
                  {highlight.location}
                </p>
                <p className="mt-3 text-base leading-relaxed">
                  An important center of Buddhist learning and art, known for its serene surroundings and heritage. Explore detailed history, photos, and a 360° view.
                </p>
                <div className="mt-4 flex gap-3">
                  <Button asChild>
                    <Link to={`/tours/${highlight.id}`}>Start Tour</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/archives">View Archives</Link>
                  </Button>
                </div>
                <div className="mt-4">
                  <div className="text-base md:text-lg font-semibold text-muted-foreground">Top paid trips</div>
                  <div className="mt-2 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <a
                      href="https://www.makemytrip.com/holidays-india/sikkim-travel-packages.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[200px] inline-flex items-center gap-3 rounded-xl border bg-card px-4 py-2 hover:bg-accent"
                      aria-label="MakeMyTrip Sikkim packages"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/MakeMyTrip_Logo.svg/256px-MakeMyTrip_Logo.svg.png" alt="MakeMyTrip" className="h-6 w-auto" />
                      <span className="font-medium">MakeMyTrip</span>
                    </a>
                    <a
                      href="https://www.tripadvisor.in/Attractions-g297672-Activities-c42-Sikkim.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[200px] inline-flex items-center gap-3 rounded-xl border bg-card px-4 py-2 hover:bg-accent"
                      aria-label="Tripadvisor Sikkim tours"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Tripadvisor_Logo_circle-green_horizontal-lockup_registered_RGB.svg/512px-Tripadvisor_Logo_circle-green_horizontal-lockup_registered_RGB.svg.png" alt="Tripadvisor" className="h-6 w-auto" />
                      <span className="font-medium">Tripadvisor</span>
                    </a>
                    <a
                      href="https://www.google.com/search?q=Rumtek+Monastery+tour+packages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[200px] inline-flex items-center gap-3 rounded-xl border bg-card px-4 py-2 hover:bg-accent"
                      aria-label="More paid trips"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="More" className="h-6 w-auto" />
                      <span className="font-medium">More</span>
                    </a>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <a
                      href="https://www.makemytrip.com/holidays-india/package?id=100001&dest=Sikkim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border p-3 bg-card hover:bg-accent"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Rumtek & Gangtok Guided Tour</div>
                          <div className="text-xs text-muted-foreground">2N/3D • hotel + transfers</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">₹9,999</div>
                          <div className="text-xs text-muted-foreground">from</div>
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://www.tripadvisor.in/AttractionProductReview-g659796-d11453434-Private_Sikkim_Tour-Gangtok_East_Sikkim_Sikkim.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border p-3 bg-card hover:bg-accent"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Sikkim Highlights with Rumtek</div>
                          <div className="text-xs text-muted-foreground">4N/5D • private guide</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">₹18,500</div>
                          <div className="text-xs text-muted-foreground">from</div>
                        </div>
                      </div>
                    </a>
                  </div>
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

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">
              Explore Monasteries
            </h2>
            <Link to="/tours" className="text-sm text-primary hover:underline">
              See all
            </Link>
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

function QuickLink({
  to,
  title,
  description,
  icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border p-5 bg-card hover:shadow-md hover:-translate-y-0.5 transition"
    >
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
