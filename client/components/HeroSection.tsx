import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/context/i18n";

export default function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-secondary to-white animate-fade-up">
      <div className="absolute inset-0">
        <img
          src="https://www.wtravelmagazine.com/wp-content/uploads/2020/09/30.113.5-Beautiful-statue-of-Lord-Buddha-at-Ravangla-Sikkim-image-by-Rudra-Narayan-Mitra.jpg"
          alt="Buddha statue at Ravangla, Sikkim"
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/30 to-transparent" />
      </div>
      <div className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-3xl rounded-2xl border border-white/30 bg-white/40 backdrop-blur-md p-6 md:p-8 shadow-lg dark:bg-white/5 dark:border-white/10">
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
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition focus-visible:ring-4 focus-visible:ring-primary/30"
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
