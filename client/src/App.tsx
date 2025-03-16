
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pulse from "./pages/Pulse";
import NotFound from "./pages/NotFound";
import HealthForm from "./components/common/Healthform";
import Results from "./components/common/Result";
import DoshaPage from "./pages/Cosmos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pulse" element={<Pulse />} />
          <Route path="/harmony" element={<HealthForm />} />
          <Route path="/results" element={<Results/>} />
          <Route path="/cosmos" element={<DoshaPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
