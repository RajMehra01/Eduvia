import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WorkspaceLayout from './layouts/WorkspaceLayout';
import DashboardOverview from './pages/DashboardOverview';
import ProjectsPage from './pages/ProjectsPage';
import KanbanBoard from './pages/KanbanBoard';
import TaskTableView from './pages/TaskTableView';
import TimelineGantt from './pages/TimelineGantt';
import WorkloadMatrix from './pages/WorkloadMatrix';
import SprintAnalytics from './pages/SprintAnalytics';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            {/* Public SaaS Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication Flow Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/register" element={<Navigate to="/signup" replace />} />

            {/* Authenticated Workspace Application Protected Shell */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <WorkspaceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="kanban" element={<KanbanBoard />} />
              <Route path="table" element={<TaskTableView />} />
              <Route path="gantt" element={<TimelineGantt />} />
              <Route path="workload" element={<WorkloadMatrix />} />
              <Route path="analytics" element={<SprintAnalytics />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Direct Shortcuts for Convenience */}
            <Route path="/overview" element={<Navigate to="/app" replace />} />
            <Route path="/kanban" element={<Navigate to="/app/kanban" replace />} />
            <Route path="/table" element={<Navigate to="/app/table" replace />} />
            <Route path="/gantt" element={<Navigate to="/app/gantt" replace />} />
            <Route path="/workload" element={<Navigate to="/app/workload" replace />} />
            <Route path="/analytics" element={<Navigate to="/app/analytics" replace />} />
            <Route path="/projects" element={<Navigate to="/app/projects" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}
