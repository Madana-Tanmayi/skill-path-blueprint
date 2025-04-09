
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SkillGap from "./pages/SkillGap";
import CareerSwap from "./pages/CareerSwap";
import DayInLife from "./pages/DayInLife";
import CareerCoach from "./pages/CareerCoach";
import Interests from "./pages/Interests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/career-swap" element={<CareerSwap />} />
          <Route path="/day-in-life" element={<DayInLife />} />
          <Route path="/career-coach" element={<CareerCoach />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
