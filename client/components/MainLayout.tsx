import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import OfflineBanner from "@/components/OfflineBanner";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <OfflineBanner />
      <NavBar />
      <main className="relative flex-1">
        <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(600px_circle_at_20%_10%,hsl(var(--accent)/0.08),transparent_70%),radial-gradient(500px_circle_at_80%_0%,hsl(var(--primary)/0.06),transparent_60%)]" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
