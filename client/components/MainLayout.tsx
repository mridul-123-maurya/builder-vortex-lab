import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import OfflineBanner from "@/components/OfflineBanner";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <OfflineBanner />
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
