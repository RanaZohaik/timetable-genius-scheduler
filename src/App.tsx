
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GenerateTimetablePage from "./pages/generate";

// Import all the pages
import TeachersPage from "./pages/teachers";
import TeacherSubstitutePage from "./pages/teachers/substitute";
import ClassesPage from "./pages/classes";
import SubjectsPage from "./pages/subjects";
import ReportsPage from "./pages/reports";
import UsersPage from "./pages/users";
import InviteUsersPage from "./pages/users/invite";
import GuidePage from "./pages/guide";
import DemoPage from "./pages/demo";
import SettingsPage from "./pages/settings";
import TimetablesPage from "./pages/timetables";
import ProfilePage from "./pages/profile";

// Auth pages
import LoginPage from "./pages/auth/login";
import ForgotPasswordPage from "./pages/auth/forgot-password";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated (in a real app, this would validate the token)
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication status
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

// Public route that redirects to dashboard if already logged in
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  if (isAuthenticated === null) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public routes */}
          <Route path="/auth/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
          
          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/generate" element={<ProtectedRoute><GenerateTimetablePage /></ProtectedRoute>} />
          <Route path="/timetables" element={<ProtectedRoute><TimetablesPage /></ProtectedRoute>} />
          <Route path="/teachers" element={<ProtectedRoute><TeachersPage /></ProtectedRoute>} />
          <Route path="/teachers/substitute" element={<ProtectedRoute><TeacherSubstitutePage /></ProtectedRoute>} />
          <Route path="/classes" element={<ProtectedRoute><ClassesPage /></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="/users/invite" element={<ProtectedRoute><InviteUsersPage /></ProtectedRoute>} />
          <Route path="/guide" element={<ProtectedRoute><GuidePage /></ProtectedRoute>} />
          <Route path="/demo" element={<ProtectedRoute><DemoPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
