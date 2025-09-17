export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-background/70">
      <div className="container py-8 grid gap-6 md:grid-cols-3">
        <div>
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
            <div className="flex flex-col leading-tight font-extrabold">
              <span className="text-lg tracking-tight">Monastery</span>
              <span className="text-xs text-muted-foreground font-medium">360° Tours</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            A digital heritage platform to explore the monasteries of Sikkim
            through immersive experiences.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Explore</h3>
          <ul className="text-sm text-muted-foreground grid gap-1">
            <li>
              <a href="/tours" className="hover:text-primary">
                Virtual Tours
              </a>
            </li>
            <li>
              <a href="/map" className="hover:text-primary">
                Interactive Map
              </a>
            </li>
            <li>
              <a href="/archives" className="hover:text-primary">
                Digital Archives
              </a>
            </li>
            <li>
              <a href="/calendar" className="hover:text-primary">
                Cultural Calendar
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <ul className="text-sm text-muted-foreground grid gap-1">
            <li>
              <a href="/about" className="hover:text-primary">
                About & Community
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-primary">
                Tourist Services
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@monastery360.org"
                className="hover:text-primary"
              >
                contact@monastery360.org
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Monastery360. All rights reserved.
      </div>
    </footer>
  );
}
