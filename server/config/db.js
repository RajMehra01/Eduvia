import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// In-memory fallback dataset for seamless offline operation & immediate runtime reliability
export const fallbackStore = {
  projects: [
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
  ],
  team: [
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
  ],
  tasks: [
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
  ]
};

let pool = null;
let isConnected = false;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kairo_pm_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Verify connection asynchronously
  pool.getConnection()
    .then((conn) => {
      isConnected = true;
      console.log('⚡ MySQL Pool connected successfully to kairo_pm_db');
      conn.release();
    })
    .catch((err) => {
      isConnected = false;
      console.warn(`ℹ️ MySQL connection notice: ${err.message}. Kairo PM server is operating smoothly with resilient in-memory fallback store.`);
    });
} catch (err) {
  isConnected = false;
  console.warn('ℹ️ MySQL not configured. Utilizing resilient in-memory store.');
}

export { pool, isConnected };
export default pool;
