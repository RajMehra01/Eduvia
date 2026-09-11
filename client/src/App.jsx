import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import LandingPage from './pages/LandingPage';
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
    <ProjectProvider>
      <BrowserRouter>
        <Routes>
          {/* Public SaaS Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authenticated Workspace Application */}
          <Route path="/app" element={<WorkspaceLayout />}>
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
  );
}
