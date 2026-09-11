-- ============================================================================
-- Kairo PM — Enterprise Project Management & Sprint Analytics Database Schema
-- Architecture: Relational MySQL 8.0+
-- Product Identity: Kairo PM (Precision Project Management SaaS)
-- Author: Software Engineering Team | Intern ID: CITS4953
-- ============================================================================

CREATE DATABASE IF NOT EXISTS kairo_pm_db;
USE kairo_pm_db;

-- ----------------------------------------------------------------------------
-- 1. Projects Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    key_identifier VARCHAR(10) NOT NULL UNIQUE,
    description TEXT,
    status ENUM('planning', 'active', 'completed', 'archived') DEFAULT 'active',
    health ENUM('on_track', 'at_risk', 'delayed') DEFAULT 'on_track',
    owner_name VARCHAR(100) DEFAULT 'Elena Rostova',
    start_date DATE,
    target_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 2. Sprints Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sprints (
    id VARCHAR(50) PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    sprint_number INT NOT NULL,
    goal TEXT,
    status ENUM('planning', 'active', 'completed') DEFAULT 'active',
    start_date DATE,
    end_date DATE,
    velocity_target INT DEFAULT 35,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 3. Team Members Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    role VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    capacity_points INT DEFAULT 35,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. Tasks Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(50) PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL,
    sprint_id VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('backlog', 'in_progress', 'review', 'qa', 'deployed') DEFAULT 'backlog',
    priority ENUM('Blocker', 'High', 'Normal', 'Low') DEFAULT 'High',
    category ENUM('Backend', 'Frontend', 'DevOps', 'Security', 'Architecture', 'UI/UX') DEFAULT 'Backend',
    story_points INT DEFAULT 3,
    assignee_id VARCHAR(50),
    assignee_name VARCHAR(100),
    due_date DATE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id) ON DELETE SET NULL,
    FOREIGN KEY (assignee_id) REFERENCES team_members(id) ON DELETE SET NULL
);

-- ----------------------------------------------------------------------------
-- 5. Subtasks Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subtasks (
    id VARCHAR(50) PRIMARY KEY,
    task_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 6. Task Activity Comments Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS comments (
    id VARCHAR(50) PRIMARY KEY,
    task_id VARCHAR(50) NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_avatar VARCHAR(500),
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- ============================================================================
-- Seed Production-Quality Baseline Data
-- ============================================================================

-- Team Members
INSERT INTO team_members (id, name, email, role, avatar_url, capacity_points) VALUES
('tm-1', 'Marcus Vance', 'marcus.vance@kairo.internal', 'Lead Systems Architect', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 40),
('tm-2', 'Elena Rostova', 'elena.rostova@kairo.internal', 'VP of Engineering', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', 35),
('tm-3', 'Tariq Chen', 'tariq.chen@kairo.internal', 'Senior Security & Infrastructure Engineer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 30),
('tm-4', 'Sofia Patel', 'sofia.patel@kairo.internal', 'Principal UI/UX Systems Designer', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', 35)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Projects
INSERT INTO projects (id, name, key_identifier, description, status, health, owner_name, start_date, target_date) VALUES
('proj-101', 'Kairo Distributed Real-Time Core Engine', 'KRO', 'High-throughput event streaming, distributed transaction pipeline, and real-time synchronization engine.', 'active', 'on_track', 'Marcus Vance', '2026-06-01', '2026-10-30'),
('proj-102', 'Collaborative Canvas & Milestone Workflow', 'WRK', 'Interactive node-based scheduling canvas, Gantt milestone rendering, and dependency solver.', 'active', 'on_track', 'Elena Rostova', '2026-06-15', '2026-11-15'),
('proj-103', 'Enterprise Zero-Trust Auth & Audit Shield', 'SEC', 'FIDO2 WebAuthn, OAuth2 provider integration, and cryptographic tamper-proof audit trails.', 'active', 'at_risk', 'Tariq Chen', '2026-07-01', '2026-12-01')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Sprints
INSERT INTO sprints (id, project_id, name, sprint_number, goal, status, start_date, end_date, velocity_target) VALUES
('sp-14', 'proj-101', 'Sprint #14 — Distributed Consensus & Delivery Roadmap', 14, 'Finalize ACID transaction handlers, WebSocket heartbeat synchronization, and workload matrix balancing.', 'active', '2026-07-15', '2026-07-31', 35),
('sp-15', 'proj-101', 'Sprint #15 — Milestone Solver & Telemetry Metrics', 15, 'Scale Gantt calculation algorithms and implement real-time velocity burndown telemetry.', 'planning', '2026-08-01', '2026-08-15', 38)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Tasks
INSERT INTO tasks (id, project_id, sprint_id, title, description, status, priority, category, story_points, assignee_id, assignee_name, due_date) VALUES
('task-101', 'proj-101', 'sp-14', 'Distributed ACID Transaction Isolation in Order Placement Pipeline', 'Guarantee zero race-condition stock deduction across multi-tenant shards with MySQL row-level lock rollbacks.', 'deployed', 'Blocker', 'Backend', 5, 'tm-1', 'Marcus Vance', '2026-07-25'),
('task-102', 'proj-101', 'sp-14', 'Interactive Video Accordion Syllabus & Player Micro-Module', 'Design responsive collapsible module player container with progress sync and optimistic checkbox states.', 'in_progress', 'High', 'Frontend', 3, 'tm-2', 'Elena Rostova', '2026-07-28'),
('task-103', 'proj-101', 'sp-14', 'Dynamic Section Order Drag-and-Drop Canvas Engine', 'Implement fluid pointer-event reorder controls with collision detection and state persistence in central context.', 'review', 'High', 'Full Stack', 8, 'tm-1', 'Marcus Vance', '2026-07-29'),
('task-104', 'proj-101', 'sp-14', 'JWT Refresh Token Rotation & Rate-Limiting Middleware', 'Harden authentication endpoints against replay attacks using sliding expiration tokens and Redis leaky-bucket throttles.', 'backlog', 'Blocker', 'Security', 5, 'tm-3', 'Tariq Chen', '2026-07-30'),
('task-105', 'proj-101', 'sp-14', 'Precision Executive Slate & Indigo Design Token System', 'Unify semantic color variables, accessible WCAG AAA contrast scales, and liquid-glass overlay styling.', 'qa', 'Normal', 'UI/UX', 3, 'tm-4', 'Sofia Patel', '2026-07-27'),
('task-106', 'proj-101', 'sp-14', 'Real-Time Capacity Heatmap & Workload Balancing Algorithm', 'Calculate active assigned story points against developer bandwidth with visual warning thresholds for overcapacity.', 'in_progress', 'High', 'Architecture', 5, 'tm-2', 'Elena Rostova', '2026-07-31')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Subtasks
INSERT INTO subtasks (id, task_id, title, is_completed) VALUES
('st-101-1', 'task-101', 'Implement isolation level READ COMMITTED with retry handler', TRUE),
('st-101-2', 'task-101', 'Run stress test with 500 concurrent stock deductions', TRUE),
('st-102-1', 'task-102', 'Build responsive video player iframe wrapper', TRUE),
('st-102-2', 'task-102', 'Wire lesson completion persistence to project progress', FALSE),
('st-103-1', 'task-103', 'Create drag preview ghost canvas element', TRUE),
('st-103-2', 'task-103', 'Verify keyboard accessibility for tab navigation', FALSE),
('st-104-1', 'task-104', 'Configure HMAC SHA-256 JWT signature verification', FALSE),
('st-105-1', 'task-105', 'Audit color contrast ratios on dark canvas surfaces', TRUE),
('st-106-1', 'task-106', 'Implement mathematical workload weighting for multi-assignee tasks', TRUE)
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Comments
INSERT INTO comments (id, task_id, author_name, author_avatar, comment_text, created_at) VALUES
('cm-1', 'task-101', 'Marcus Vance', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 'Transaction benchmarks completed: 0 deadlocks recorded under 1,000 req/sec stress test.', '2026-07-24 14:32:00'),
('cm-2', 'task-102', 'Elena Rostova', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', 'Accordion transition refined to 180ms cubic-bezier for snappy mobile feedback.', '2026-07-25 09:15:00'),
('cm-3', 'task-103', 'Sofia Patel', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', 'Added subtle haptic sound cues and border elevation during drag drag-over.', '2026-07-26 11:45:00')
ON DUPLICATE KEY UPDATE comment_text=VALUES(comment_text);
