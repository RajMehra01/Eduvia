import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectApi, taskApi, teamApi, analyticsApi } from '../services/api';

const ProjectContext = createContext();

const INITIAL_PROJECTS = [
  {
    id: 'proj-101',
    name: 'Kairo Distributed Real-Time Core Engine',
    keyIdentifier: 'KRO',
    description: 'High-throughput event streaming, distributed transaction pipeline, and real-time synchronization engine.',
    status: 'active',
    health: 'on_track',
    ownerName: 'Marcus Vance',
    startDate: '2026-06-01',
    targetDate: '2026-10-30',
    activeSprint: 'Sprint #14 — Distributed Consensus & Delivery Roadmap'
  },
  {
    id: 'proj-102',
    name: 'Collaborative Canvas & Milestone Workflow',
    keyIdentifier: 'WRK',
    description: 'Interactive node-based scheduling canvas, Gantt milestone rendering, and dependency solver.',
    status: 'active',
    health: 'on_track',
    ownerName: 'Elena Rostova',
    startDate: '2026-06-15',
    targetDate: '2026-11-15',
    activeSprint: 'Sprint #08 — Interactive Canvas Node Links'
  },
  {
    id: 'proj-103',
    name: 'Enterprise Zero-Trust Auth & Audit Shield',
    keyIdentifier: 'SEC',
    description: 'FIDO2 WebAuthn, OAuth2 provider integration, and cryptographic tamper-proof audit trails.',
    status: 'active',
    health: 'at_risk',
    ownerName: 'Tariq Chen',
    startDate: '2026-07-01',
    targetDate: '2026-12-01',
    activeSprint: 'Sprint #04 — Audit Log Cryptographic Signatures'
  }
];

const INITIAL_TEAM = [
  {
    id: 'tm-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@kairo.internal',
    role: 'Lead Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    capacity: 40
  },
  {
    id: 'tm-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@kairo.internal',
    role: 'VP of Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    capacity: 35
  },
  {
    id: 'tm-3',
    name: 'Tariq Chen',
    email: 'tariq.chen@kairo.internal',
    role: 'Senior Security & Infrastructure Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    capacity: 30
  },
  {
    id: 'tm-4',
    name: 'Sofia Patel',
    email: 'sofia.patel@kairo.internal',
    role: 'Principal UI/UX Systems Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    capacity: 35
  }
];

const INITIAL_TASKS = [
  {
    id: 'task-101',
    projectId: 'proj-101',
    sprintId: 'sp-14',
    title: 'Distributed ACID Transaction Isolation in Order Placement Pipeline',
    description: 'Guarantee zero race-condition stock deduction across multi-tenant shards with MySQL row-level lock rollbacks.',
    status: 'deployed',
    priority: 'Blocker',
    category: 'Backend',
    points: 5,
    assignee: 'Marcus Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueDate: '2026-07-25',
    subtasks: [
      { id: 'st-101-1', title: 'Implement isolation level READ COMMITTED with retry handler', completed: true },
      { id: 'st-101-2', title: 'Run stress test with 500 concurrent stock deductions', completed: true }
    ],
    comments: [
      { author: 'Marcus Vance', text: 'Transaction stress test passed: 0 deadlocks recorded under 1,000 req/sec benchmark.', time: '2 days ago' }
    ]
  },
  {
    id: 'task-102',
    projectId: 'proj-101',
    sprintId: 'sp-14',
    title: 'Interactive Video Accordion Syllabus & Player Micro-Module',
    description: 'Design responsive collapsible module player container with progress sync and optimistic checkbox states.',
    status: 'in_progress',
    priority: 'High',
    category: 'Frontend',
    points: 3,
    assignee: 'Elena Rostova',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    dueDate: '2026-07-28',
    subtasks: [
      { id: 'st-102-1', title: 'Build responsive video player iframe wrapper', completed: true },
      { id: 'st-102-2', title: 'Wire lesson completion persistence to project progress', completed: false }
    ],
    comments: [
      { author: 'Elena Rostova', text: 'Accordion transition refined to 180ms cubic-bezier for snappy mobile feedback.', time: 'Yesterday' }
    ]
  },
  {
    id: 'task-103',
    projectId: 'proj-101',
    sprintId: 'sp-14',
    title: 'Dynamic Section Order Drag-and-Drop Canvas Engine',
    description: 'Implement fluid pointer-event reorder controls with collision detection and state persistence in central context.',
    status: 'review',
    priority: 'High',
    category: 'Full Stack',
    points: 8,
    assignee: 'Marcus Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueDate: '2026-07-29',
    subtasks: [
      { id: 'st-103-1', title: 'Create drag preview ghost canvas element', completed: true },
      { id: 'st-103-2', title: 'Verify keyboard accessibility for tab navigation', completed: false }
    ],
    comments: [
      { author: 'Sofia Patel', text: 'Added subtle haptic sound cues and border elevation during drag drag-over.', time: '4 hours ago' }
    ]
  },
  {
    id: 'task-104',
    projectId: 'proj-101',
    sprintId: 'sp-14',
    title: 'JWT Refresh Token Rotation & Rate-Limiting Middleware',
    description: 'Harden authentication endpoints against replay attacks using sliding expiration tokens and Redis leaky-bucket throttles.',
    status: 'backlog',
    priority: 'Blocker',
    category: 'Security',
    points: 5,
    assignee: 'Tariq Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    dueDate: '2026-07-30',
    subtasks: [
      { id: 'st-104-1', title: 'Configure HMAC SHA-256 JWT signature verification', completed: false }
    ],
    comments: []
  },
  {
    id: 'task-105',
    projectId: 'proj-101',
    sprintId: 'sp-14',
    title: 'Precision Executive Slate & Indigo Design Token System',
    description: 'Unify semantic color variables, accessible WCAG AAA contrast scales, and liquid-glass overlay styling.',
    status: 'qa',
    priority: 'Normal',
    category: 'UI/UX',
    points: 3,
    assignee: 'Sofia Patel',
    assigneeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    dueDate: '2026-07-27',
    subtasks: [
      { id: 'st-105-1', title: 'Audit color contrast ratios on dark canvas surfaces', completed: true }
    ],
    comments: []
  },
  {
    id: 'task-106',
    projectId: 'proj-101',
    sprintId: 'sp-14',
    title: 'Real-Time Capacity Heatmap & Workload Balancing Algorithm',
    description: 'Calculate active assigned story points against developer bandwidth with visual warning thresholds for overcapacity.',
    status: 'in_progress',
    priority: 'High',
    category: 'Architecture',
    points: 5,
    assignee: 'Elena Rostova',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    dueDate: '2026-07-31',
    subtasks: [
      { id: 'st-106-1', title: 'Implement mathematical workload weighting for multi-assignee tasks', completed: true }
    ],
    comments: []
  }
];

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState('proj-101');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync initial state from backend if available
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, taskRes, teamRes] = await Promise.allSettled([
          projectApi.getProjects(),
          taskApi.getTasks(),
          teamApi.getTeamMembers()
        ]);

        if (projRes.status === 'fulfilled' && projRes.value.data?.data) {
          setProjects(projRes.value.data.data);
        }
        if (taskRes.status === 'fulfilled' && taskRes.value.data?.data) {
          setTasks(taskRes.value.data.data);
        }
        if (teamRes.status === 'fulfilled' && teamRes.value.data?.data) {
          setTeam(teamRes.value.data.data);
        }
      } catch (err) {
        console.warn('Backend sync warning (running local store):', err.message);
      }
    };

    fetchData();
  }, []);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0] || INITIAL_PROJECTS[0];

  // Move task to a different Kanban column
  const moveTaskStatus = async (taskId, newStatus) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t)));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => ({ ...prev, status: newStatus }));
    }

    try {
      await taskApi.updateTask(taskId, { status: newStatus });
    } catch (err) {
      console.warn('Background sync for task update:', err.message);
    }
  };

  // Add new task
  const addTask = async (newTaskData) => {
    const createdTask = {
      ...newTaskData,
      id: newTaskData.id || `task-${Date.now()}`,
      projectId: activeProjectId,
      subtasks: newTaskData.subtasks || [],
      comments: newTaskData.comments || []
    };

    setTasks(prev => [createdTask, ...prev]);

    try {
      await taskApi.createTask(createdTask);
    } catch (err) {
      console.warn('Background sync for task creation:', err.message);
    }
  };

  // Update existing task
  const updateTask = async (updatedTask) => {
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }

    try {
      await taskApi.updateTask(updatedTask.id, updatedTask);
    } catch (err) {
      console.warn('Background sync for task update:', err.message);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }

    try {
      await taskApi.deleteTask(taskId);
    } catch (err) {
      console.warn('Background sync for task deletion:', err.message);
    }
  };

  // Toggle subtask completion
  const toggleSubtask = async (taskId, subtaskId) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== taskId) return t;
        const updatedSubs = t.subtasks.map(s => (s.id === subtaskId ? { ...s, completed: !s.completed } : s));
        const updated = { ...t, subtasks: updatedSubs };
        if (selectedTask && selectedTask.id === taskId) setSelectedTask(updated);
        return updated;
      })
    );

    try {
      await taskApi.toggleSubtask(taskId, subtaskId);
    } catch (err) {
      console.warn('Background sync for subtask toggle:', err.message);
    }
  };

  // Add subtask
  const addSubtask = async (taskId, title) => {
    const newSt = { id: `st-${Date.now()}`, title, completed: false };
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== taskId) return t;
        const updated = { ...t, subtasks: [...t.subtasks, newSt] };
        if (selectedTask && selectedTask.id === taskId) setSelectedTask(updated);
        return updated;
      })
    );

    try {
      await taskApi.addSubtask(taskId, { title });
    } catch (err) {
      console.warn('Background sync for subtask addition:', err.message);
    }
  };

  // Add comment
  const addComment = async (taskId, text, author = 'Elena Rostova') => {
    const newComm = { author, text, time: 'Just now' };
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== taskId) return t;
        const updated = { ...t, comments: [...t.comments, newComm] };
        if (selectedTask && selectedTask.id === taskId) setSelectedTask(updated);
        return updated;
      })
    );

    try {
      await taskApi.addComment(taskId, { text, author });
    } catch (err) {
      console.warn('Background sync for comment:', err.message);
    }
  };

  // Create Project
  const createProject = async (projData) => {
    const newProj = {
      ...projData,
      id: `proj-${Date.now()}`,
      status: 'active',
      health: 'on_track',
      startDate: new Date().toISOString().split('T')[0],
      activeSprint: 'Sprint #01 — Setup & Roadmap'
    };
    setProjects(prev => [newProj, ...prev]);
    setActiveProjectId(newProj.id);

    try {
      await projectApi.createProject(newProj);
    } catch (err) {
      console.warn('Background sync for project create:', err.message);
    }
  };

  // Live Metric Aggregations for Active Project
  const activeTasks = tasks.filter(t => !t.projectId || t.projectId === activeProjectId);
  const totalPoints = activeTasks.reduce((acc, t) => acc + (t.points || 0), 0);
  const deployedPoints = activeTasks.filter(t => t.status === 'deployed').reduce((acc, t) => acc + (t.points || 0), 0);
  const inProgressPoints = activeTasks.filter(t => t.status === 'in_progress').reduce((acc, t) => acc + (t.points || 0), 0);
  const reviewPoints = activeTasks.filter(t => t.status === 'review').reduce((acc, t) => acc + (t.points || 0), 0);
  const backlogPoints = activeTasks.filter(t => t.status === 'backlog').reduce((acc, t) => acc + (t.points || 0), 0);
  const velocityRate = Math.round((deployedPoints / Math.max(totalPoints, 1)) * 100);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        activeProjectId,
        setActiveProjectId,
        createProject,
        tasks,
        activeTasks,
        team,
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority,
        filterCategory,
        setFilterCategory,
        selectedTask,
        setSelectedTask,
        showCreateModal,
        setShowCreateModal,
        moveTaskStatus,
        addTask,
        updateTask,
        deleteTask,
        toggleSubtask,
        addSubtask,
        addComment,
        metrics: {
          totalPoints,
          deployedPoints,
          inProgressPoints,
          reviewPoints,
          backlogPoints,
          velocityRate
        }
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
