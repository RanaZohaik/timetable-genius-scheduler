
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GenerateTimetablePage from "./pages/generate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/generate" element={<GenerateTimetablePage />} />
          <Route path="/teachers" element={<NotFound />} />
          <Route path="/teachers/substitute" element={<NotFound />} />
          <Route path="/classes" element={<NotFound />} />
          <Route path="/subjects" element={<NotFound />} />
          <Route path="/reports" element={<NotFound />} />
          <Route path="/users" element={<NotFound />} />
          <Route path="/users/invite" element={<NotFound />} />
          <Route path="/guide" element={<NotFound />} />
          <Route path="/demo" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
