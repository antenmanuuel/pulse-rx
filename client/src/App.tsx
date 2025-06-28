
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/Index";
import PrescriptionQueue from "./pages/PrescriptionQueue";
import PatientLookup from "./pages/PatientLookup";
import Inventory from "./pages/Inventory";
import Alerts from "./pages/Alerts";
import Appointments from "./pages/Appointments";
import Deliveries from "./pages/Deliveries";
import NewPrescription from "./pages/NewPrescription";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Help from "./pages/Help";
import Issues from "./pages/Issues";
import AdminDashboard from "./pages/AdminDashboard";
import StaffManagement from "./pages/StaffManagement";
import VendorManagement from "./pages/VendorManagement";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle role-based routing for the home page
const HomeRoute = () => {
  const { isAdmin } = useAuth();

  if (isAdmin()) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Index />;
};

// Component to protect regular user routes from admin access
const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuth();

  if (isAdmin()) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <HomeRoute />
              </ProtectedRoute>
            } />
            <Route path="/prescription-queue" element={
              <ProtectedRoute>
                <UserRoute>
                  <PrescriptionQueue />
                </UserRoute>
              </ProtectedRoute>
            } />
            <Route path="/patient-lookup" element={
              <ProtectedRoute>
                <UserRoute>
                  <PatientLookup />
                </UserRoute>
              </ProtectedRoute>
            } />
            <Route path="/inventory" element={
              <ProtectedRoute>
                <UserRoute>
                  <Inventory />
                </UserRoute>
              </ProtectedRoute>
            } />
            <Route path="/alerts" element={
              <ProtectedRoute>
                <UserRoute>
                  <Alerts />
                </UserRoute>
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <UserRoute>
                  <Appointments />
                </UserRoute>
              </ProtectedRoute>
            } />
            <Route path="/deliveries" element={
              <ProtectedRoute>
                <UserRoute>
                  <Deliveries />
                </UserRoute>
              </ProtectedRoute>
            } />
            <Route path="/new-prescription" element={
              <ProtectedRoute>
                <NewPrescription />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            } />
            <Route path="/issues" element={
              <ProtectedRoute>
                <Issues />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />

            <Route path="/staff-management" element={
              <AdminRoute>
                <StaffManagement />
              </AdminRoute>
            } />
            <Route path="/vendor-management" element={
              <AdminRoute>
                <VendorManagement />
              </AdminRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
