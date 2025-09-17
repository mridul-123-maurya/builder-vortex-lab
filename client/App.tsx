import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VirtualTours from "./pages/VirtualTours";
import TourDetail from "./pages/TourDetail";
import MapPage from "./pages/MapPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import SmartAudioGuide from "./pages/SmartAudioGuide";
import CulturalCalendar from "./pages/CulturalCalendar";
import MainLayout from "@/components/MainLayout";
import { I18nProvider } from "@/context/i18n";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MainLayout>
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<VirtualTours />} />
              <Route path="/tours/:id" element={<TourDetail />} />
              <Route path="/map" element={<MapPage />} />
              <Route
                path="/archives"
                element={<PlaceholderPage title="Digital Archives" />}
              />
              <Route
                path="/calendar"
                element={<CulturalCalendar />}
              />
              <Route
                path="/audio"
                element={<SmartAudioGuide />}
              />
              <Route
                path="/services"
                element={<PlaceholderPage title="Tourist Services" />}
              />
              <Route
                path="/about"
                element={<PlaceholderPage title="About & Community" />}
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </ThemeProvider>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

const container = document.getElementById("root")!;
let root = (window as any).__appRoot;
if (!root) {
  root = createRoot(container);
  (window as any).__appRoot = root;
}
root.render(<App />);
