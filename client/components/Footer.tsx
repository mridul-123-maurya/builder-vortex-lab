export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-background/70">
      <div className="container py-8 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg">
            <span className="inline-flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground font-bold">卍</span>
            Monastery360
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            A digital heritage platform to explore the monasteries of Sikkim through immersive experiences.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Explore</h3>
          <ul className="text-sm text-muted-foreground grid gap-1">
            <li><a href="/tours" className="hover:text-primary">Virtual Tours</a></li>
            <li><a href="/map" className="hover:text-primary">Interactive Map</a></li>
            <li><a href="/archives" className="hover:text-primary">Digital Archives</a></li>
            <li><a href="/calendar" className="hover:text-primary">Cultural Calendar</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <ul className="text-sm text-muted-foreground grid gap-1">
            <li><a href="/about" className="hover:text-primary">About & Community</a></li>
            <li><a href="/services" className="hover:text-primary">Tourist Services</a></li>
            <li>
              <a href="mailto:contact@monastery360.org" className="hover:text-primary">contact@monastery360.org</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Monastery360. All rights reserved.</div>
    </footer>
  );
}
