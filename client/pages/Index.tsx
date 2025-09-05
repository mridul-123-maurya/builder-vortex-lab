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
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base md:text-lg font-semibold">Top paid trips</div>
                      <div className="text-xs text-muted-foreground">Curated packages from trusted providers</div>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="text-primary hover:underline">See all offers</a>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {[
                      {
                        href: "https://www.makemytrip.com/holidays-india/sikkim-travel-packages.html",
                        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/MakeMyTrip_Logo.svg/256px-MakeMyTrip_Logo.svg.png",
                        label: "MakeMyTrip",
                        blurb: "Sikkim packages",
                      },
                      {
                        href: "https://www.tripadvisor.in/Attractions-g297672-Activities-c42-Sikkim.html",
                        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Tripadvisor_Logo_circle-green_horizontal-lockup_registered_RGB.svg/512px-Tripadvisor_Logo_circle-green_horizontal-lockup_registered_RGB.svg.png",
                        label: "Tripadvisor",
                        blurb: "Top-rated experiences",
                      },
                      {
                        href: "https://www.google.com/search?q=Rumtek+Monastery+tour+packages",
                        img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                        label: "More",
                        blurb: "Search offers",
                      },
                    ].map((p) => (
                      <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="min-w-[220px] flex-shrink-0 rounded-xl border bg-card p-3 hover:shadow-lg hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-3">
                          <img src={p.img} alt={p.label} className="h-8 w-auto object-contain" />
                          <div>
                            <div className="font-medium">{p.label}</div>
                            <div className="text-xs text-muted-foreground">{p.blurb}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        href: "https://www.makemytrip.com/holidays-india/package?id=100001&dest=Sikkim",
                        title: "Rumtek & Gangtok Guided Tour",
                        meta: "2N/3D • hotel + transfers",
                        price: "₹9,999",
                      },
                      {
                        href: "https://www.tripadvisor.in/AttractionProductReview-g659796-d11453434-Private_Sikkim_Tour-Gangtok_East_Sikkim_Sikkim.html",
                        title: "Sikkim Highlights with Rumtek",
                        meta: "4N/5D • private guide",
                        price: "₹18,500",
                      },
                    ].map((t) => (
                      <a key={t.href} href={t.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border p-3 bg-card hover:shadow-md hover:bg-accent transition">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="font-medium">{t.title}</div>
                            <div className="text-xs text-muted-foreground">{t.meta}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary">{t.price}</div>
                            <div className="text-xs text-muted-foreground">from</div>
                          </div>
                        </div>
                      </a>
                    ))}
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
