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
import PlaceholderPage from "./pages/PlaceholderPage";
import MainLayout from "@/components/MainLayout";
import { I18nProvider } from "@/context/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<VirtualTours />} />
              <Route path="/tours/:id" element={<TourDetail />} />
              <Route
                path="/map"
                element={<PlaceholderPage title="Interactive Map" />}
              />
              <Route
                path="/archives"
                element={<PlaceholderPage title="Digital Archives" />}
              />
              <Route
                path="/calendar"
                element={<PlaceholderPage title="Cultural Calendar" />}
              />
              <Route
                path="/audio"
                element={<PlaceholderPage title="Smart Audio Guide" />}
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
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
