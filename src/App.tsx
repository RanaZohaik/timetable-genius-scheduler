import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/generate" element={<GenerateTimetablePage />} />
          <Route path="/timetables" element={<TimetablesPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/substitute" element={<TeacherSubstitutePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/invite" element={<InviteUsersPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
