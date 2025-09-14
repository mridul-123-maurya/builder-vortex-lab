import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/context/i18n";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

export default function NavBar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-md">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2Z"
                  fill="white"
                />
                <path
                  d="M6 11C6 9 8 7 12 7C16 7 18 9 18 11C18 15 12 17 12 21C12 17 6 15 6 11Z"
                  fill="rgba(255,255,255,0.95)"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight">
                Monastery
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                360° Tours
              </span>
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Dropdown label={t("explore")}>
            <DropdownItem to="/tours" label={t("virtualTours")} />
            <DropdownItem to="/map" label={t("interactiveMap")} />
            <DropdownItem to="/archives" label={t("archives")} />
            <DropdownItem to="/calendar" label={t("calendar")} />
          </Dropdown>
          <NavLink
            to="/audio"
            className={({ isActive }) =>
              cn(
                "text-sm hover:text-primary",
                isActive && "text-primary font-semibold",
              )
            }
          >
            {t("audioGuide")}
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              cn(
                "text-sm hover:text-primary",
                isActive && "text-primary font-semibold",
              )
            }
          >
            {t("services")}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                "text-sm hover:text-primary",
                isActive && "text-primary font-semibold",
              )
            }
          >
            {t("about")}
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
          <Button
            className="hidden md:inline-flex bg-primary text-primary-foreground shadow hover:shadow-lg hover:-translate-y-0.5 transition"
            asChild
          >
            <Link to="/tours">{t("exploreNow")}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu />
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t md:hidden bg-background">
          <div className="container py-2 grid gap-2">
            <MobileLink to="/tours" label={t("virtualTours")} />
            <MobileLink to="/map" label={t("interactiveMap")} />
            <MobileLink to="/archives" label={t("archives")} />
            <MobileLink to="/calendar" label={t("calendar")} />
            <MobileLink to="/audio" label={t("audioGuide")} />
            <MobileLink to="/services" label={t("services")} />
            <MobileLink to="/about" label={t("about")} />
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="inline-flex items-center gap-1 text-sm hover:text-primary"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-md border bg-popover p-1 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="block rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent"
    >
      <span>{label}</span>
      <ChevronDown className="rotate-[-90deg]" />
    </Link>
  );
}
