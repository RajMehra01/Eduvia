import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/workspace/Sidebar';
import Topbar from '../components/workspace/Topbar';
import TaskDetailModal from '../components/workspace/TaskDetailModal';
import CreateTaskModal from '../components/workspace/CreateTaskModal';
import { useProject } from '../context/ProjectContext';

export default function WorkspaceLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { selectedTask, setSelectedTask, showCreateModal, setShowCreateModal } = useProject();

  // Route change scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Topbar onOpenMobileMenu={() => setIsMobileOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>

      {/* Global Modals */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
