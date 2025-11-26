import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import RoleSelection from "./pages/RoleSelection";
import VendorOnboarding from "./pages/VendorOnboarding";
import TrainerOnboarding from "./pages/TrainerOnboarding";
import TrainerDashboard from "./pages/TrainerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import ApplyJob from "./pages/ApplyJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
              <Route path="/trainer-onboarding" element={<TrainerOnboarding />} />
              <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="/apply-job" element={<ApplyJob />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
