import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/context/i18n";

export default function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-secondary to-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1601957561916-38f0397e1b92?q=80&w=2000&auto=format&fit=crop"
          alt="Sikkim monastery"
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/30 to-transparent" />
      </div>
      <div className="relative z-10 px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="uppercase tracking-widest text-xs text-accent-foreground/80">
            {t("appName")}
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-extrabold leading-tight">
            Explore Sikkim's Monasteries in 360°
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Virtual tours, interactive maps, digital archives, and smart audio
            guides—designed for tourists, researchers, and locals.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
              asChild
            >
              <Link to="/tours">{t("exploreNow")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#quick-links">{t("quickLinks")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
