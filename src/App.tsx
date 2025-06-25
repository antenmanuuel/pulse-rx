
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PrescriptionQueue from "./pages/PrescriptionQueue";
import PatientLookup from "./pages/PatientLookup";
import Inventory from "./pages/Inventory";
import Alerts from "./pages/Alerts";
import Appointments from "./pages/Appointments";
import Deliveries from "./pages/Deliveries";
import Reports from "./pages/Reports";
import Documentation from "./pages/Documentation";
import NewPrescription from "./pages/NewPrescription";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
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
          <Route path="/prescription-queue" element={<PrescriptionQueue />} />
          <Route path="/patient-lookup" element={<PatientLookup />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/new-prescription" element={<NewPrescription />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/messages" element={<Messages />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
