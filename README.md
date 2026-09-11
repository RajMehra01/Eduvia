# Kairo PM — Enterprise Project Management & Sprint Velocity SaaS ⚡📊

> **Precision engineering project management, capacity balancing, and deliverable velocity telemetry for modern software teams.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/Frontend-React%2019-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%206-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Styles-Tailwind%20v4-38bdf8.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%2024-339933.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express%204-000000.svg)](https://expressjs.com/)
[![MySQL 8](https://img.shields.io/badge/Database-MySQL%208.0-4479a1.svg)](https://www.mysql.com/)
[![Intern ID](https://img.shields.io/badge/Intern%20ID-CITS4953-orange.svg)](#author)

---

## 📖 Overview

**Kairo** is an enterprise-grade project management SaaS web application engineered to bridge the gap between high-level milestone planning and granular sprint execution. Designed with the precision aesthetic of modern productivity software such as Linear and Height, Kairo eliminates visual noise and "AI neon" clutter in favor of an **Executive Slate & Precision Indigo** design system.

The platform provides a cinematic public landing page with scroll-driven word reveals and parallax, paired with an authenticated workspace containing a **5-stage sprint Kanban board**, **story point estimations (1, 2, 3, 5, 8 pts)**, an interactive **milestone Gantt timeline**, a **real-time team capacity allocation heatmap**, and **sprint velocity burn-down telemetry**.

---

## ✨ Key Capabilities & Features

### 1. 🌐 Cinematic Public Landing Page
- **Editorial Typography**: Pairing clean UI typography (`Inter`) with an intentional editorial italic accent (`Instrument Serif`).
- **Scroll-Driven Parallax**: Subtle motion orchestration via Framer Motion tied to viewport progression.
- **Liquid-Glass Accents**: Selective, restrained luminosity blending and backdrop-filter treatment for floating controls and announcement badges.
- **Scroll-Driven Word-Reveal Testimonial**: Progressive word-by-word opacity and contrast transitions tied to scroll depth.
- **Interactive Capabilities Showcase**: Tabbed interactive live previews demonstrating project health, sprint boards, Gantt timelines, and workload matrices.

### 2. 📋 Sprint Kanban Board
- **5-Stage Workflow Pipeline**: `Backlog` ➔ `In Progress` ➔ `Code Review` ➔ `QA Testing` ➔ `Deployed`.
- **Live Story Point Aggregations**: Automatic real-time sums of story points and task counts per column header.
- **Fluid Status Shifting**: Instant single-click column transitions without entering deep modal trees.
- **Dense Linear-Style Task Cards**: High information density displaying priority badges, category tags, assignee avatars, subtask checklists, and due dates.

### 3. 🎯 Task Management & Subtask Checklist
- **Multi-Level Deliverable Tracking**: Support for parent sprint tasks with nested subtask checklists.
- **Real-Time Activity Comments**: Chronological team discussion stream with author attribution and relative timestamps.
- **Fibonacci Difficulty Rating**: Calibrated effort estimation scale (1, 2, 3, 5, and 8 story points).
- **Categorical Tagging**: Specific domain categorization (`Backend`, `Frontend`, `Architecture`, `Security`, `UI/UX`, `Full Stack`).

### 4. 👥 Team Workload & Capacity Heatmap
- **Bandwidth Utilization Matrix**: Measures assigned story points against individual developer limits.
- **Semantic Workload States**:
  - **Healthy (< 75%)**: Balanced bandwidth with sufficient headroom for code review and unexpected bugs.
  - **At Capacity (75% – 90%)**: Near-optimal sprint load threshold.
  - **Overloaded (> 90%)**: High-risk burnout warning with visual threshold indicators.
- **Zero Color-Only Dependence**: Every state combines distinct semantic badges, text labels, numeric percentages, and icon cues for full accessibility.

### 5. 📅 Milestone Gantt Schedule
- **Synchronized Date Scale**: Two-week sprint horizon with deliverable track progress bars.
- **Automated Trajectory Calculation**: Visual bar width and status color dynamically reflect active Kanban stages.
- **Milestone Deadlines**: Direct identification of upcoming target deliverable dates.

### 6. 📈 Sprint Velocity & Burn-Down Telemetry
- **Sprint Completion Rate Gauge**: Real-time ratio of deployed story points against total sprint backlog.
- **Controlled Chart Palette**: Accessible, colorblind-safe color roles (Indigo, Emerald, Amber, Sky, Slate) avoiding jarring rainbow gradients.
- **Priority Distribution Analysis**: Quantitative breakdown across Blocker (P0), High (P1), Normal (P2), and Low (P3) deliverables.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 6 (ES Modules, HMR)
- **Routing**: React Router DOM v7 (BrowserRouter with SPA scroll management)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom CSS custom properties (tokens)
- **Motion & Parallax**: Framer Motion 13 (`useScroll`, `useTransform`, `AnimatePresence`)
- **Iconography**: Lucide React (consistent 24px grid, 1.75 stroke weight)
- **HTTP Client**: Axios with automatic fallback interceptors

### Backend Architecture
- **Runtime**: Node.js v24 (ES Modules)
- **Server Framework**: Express 4.21
- **Database Driver**: MySQL2 with Promise connection pooling
- **Security & Headers**: CORS, JSON body-parser, Dotenv
- **Resilience Strategy**: Dual-mode data access with automatic, persistent in-memory fallback store when MySQL is offline during local evaluation.

---

## 📐 Architecture & System Design

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KAIRO PM ARCHITECTURE                           │
└────────────────────────────────────────────────────────────────────────┘

 [ Client Layer — React 19 + Vite + Tailwind v4 + Framer Motion ]
   │
   ├── Public Landing Page (Parallax, Word-Reveal, Product Story, Hero)
   │
   └── Workspace Application Shell (/app)
         │
         ├── Context Layer (ProjectContext.jsx)
         │     ├── Multi-Project State (activeProjectId, health)
         │     ├── Sprint Backlog & Kanban Columns (moveTaskStatus)
         │     ├── Team Allocation & Capacity Utilization
         │     └── Subtasks Checklist & Activity Comments Stream
         │
         └── Workspace Views:
               ├── Executive Overview (Velocity Gauge, Health, Deadlines)
               ├── Projects Directory (Multi-project switching & cards)
               ├── Sprint Kanban Board (Dense Linear cards, live point sums)
               ├── Deliverable Data Table (Filterable, inline status)
               ├── Milestone Gantt (Visual schedule tracks, status colors)
               ├── Team Workload Heatmap (Bandwidth matrix, semantic states)
               ├── Sprint Velocity Telemetry (Points distribution charts)
               └── Settings (Sprint cycles, estimation scale, environment)
   │
   ▼ REST API via Axios (Port 5003)
┌────────────────────────────────────────────────────────────────────────┐
 [ Backend Layer — Express 4 REST API Server ]
   │
   ├── /api/projects   ── Project CRUD, health statuses, active sprint
   ├── /api/tasks      ── Task CRUD, subtask toggling, activity comments
   ├── /api/team       ── Team capacity calculations & workload weighting
   ├── /api/analytics  ── Sprint velocity rate, point distributions
   └── /api/health     ── Service health telemetry & metadata
   │
   ▼ Connection Pooling / Dual-Mode Store
┌────────────────────────────────────────────────────────────────────────┐
 [ Data Persistence Layer ]
   │
   ├── Primary: MySQL 8.0 Relational Database (kairo_pm_db)
   └── Resilient Fallback: Memory store initialized with Kairo seed data
```

---

## 📂 Project Structure

```
d:/Internship Projects/Project Mgmt/
├── client/
│   ├── public/
│   │   └── favicon.svg                    # Custom Kairo PM SVG favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/                   # Public landing page modules
│   │   │   │   ├── LandingNavbar.jsx      # Sticky glass navbar with branding & CTA
│   │   │   │   ├── HeroSection.jsx        # Cinematic hero with editorial typography
│   │   │   │   ├── ProductPreview.jsx     # Composed live dashboard hero frame
│   │   │   │   ├── ProductStory.jsx       # 4-stage narrative sequence (WHAT/WHY/HOW)
│   │   │   │   ├── TestimonialReveal.jsx  # Scroll-driven word-reveal testimonial
│   │   │   │   ├── FeatureShowcase.jsx    # Interactive tabbed feature suite
│   │   │   │   ├── FinalCTA.jsx           # Clean conversion prompt
│   │   │   │   └── LandingFooter.jsx      # SaaS footer with CITS4953 attribution
│   │   │   └── workspace/                 # Authenticated workspace components
│   │   │       ├── Sidebar.jsx            # Collapsible navigation & project switcher
│   │   │       ├── Topbar.jsx             # Active project health, search & new task
│   │   │       ├── TaskCard.jsx           # Linear-style dense card with status shift
│   │   │       ├── TaskDetailModal.jsx    # Subtask checklist & comments stream modal
│   │   │       ├── CreateTaskModal.jsx    # Task creation modal with point selector
│   │   │       └── PriorityBadge.jsx      # Semantic priority badges (Blocker-Low)
│   │   ├── context/
│   │   │   └── ProjectContext.jsx         # Multi-project, task CRUD, and filter state
│   │   ├── layouts/
│   │   │   └── WorkspaceLayout.jsx        # Workspace shell layout with modals & topbar
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx            # Public marketing homepage
│   │   │   ├── DashboardOverview.jsx      # Executive health, sprint progress, deadlines
│   │   │   ├── ProjectsPage.jsx           # Multi-project directory & health cards
│   │   │   ├── KanbanBoard.jsx            # 5-column sprint Kanban board with filters
│   │   │   ├── TaskTableView.jsx          # Dense, filterable task data table
│   │   │   ├── TimelineGantt.jsx          # Milestone schedule & Gantt timeline
│   │   │   ├── WorkloadMatrix.jsx         # Team capacity allocation heatmap
│   │   │   ├── SprintAnalytics.jsx        # Sprint velocity & distribution charts
│   │   │   └── SettingsPage.jsx           # Workspace settings & environment status
│   │   ├── services/
│   │   │   └── api.js                     # Axios REST client with fallback handling
│   │   ├── index.css                      # Design tokens, liquid glass, custom scrollbars
│   │   ├── App.jsx                        # Application router configuration
│   │   └── main.jsx                       # React DOM entry point
│   ├── index.html                         # HTML template with Google Fonts
│   ├── package.json                       # Frontend dependencies & scripts
│   └── vite.config.js                     # Vite 6 configuration (Port 5176)
├── server/
│   ├── config/
│   │   └── db.js                          # MySQL connection pool + fallback store
│   ├── controllers/
│   │   ├── projectController.js           # Project REST handlers
│   │   ├── taskController.js              # Task, subtask, and comment handlers
│   │   ├── teamController.js              # Team capacity & workload handlers
│   │   └── analyticsController.js         # Velocity telemetry & metrics handlers
│   ├── routes/
│   │   ├── projectRoutes.js               # /api/projects router
│   │   ├── taskRoutes.js                  # /api/tasks router
│   │   ├── teamRoutes.js                  # /api/team router
│   │   └── analyticsRoutes.js             # /api/analytics router
│   ├── server.js                          # Express entry point (Port 5003)
│   ├── package.json                       # Backend dependencies & scripts
│   └── .env.example                       # Backend environment template
├── schema.sql                             # Relational database schema with Kairo seeds
├── .env.example                           # Root environment variable template
├── .gitignore                             # Production git ignore configuration
└── README.md                              # Complete product documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.0.0` or higher (tested on Node v24)
- **npm**: `v10.0.0` or higher
- **MySQL Server** (Optional for local testing; application includes automatic resilient in-memory data store fallback)

---

### Installation & Local Setup

#### 1. Clone the Local Repository
```bash
cd "d:/Internship Projects/Project Mgmt"
```

#### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the root and in `server/`:
```bash
cp .env.example .env
cp server/.env.example server/.env
```

#### 3. Backend Server Setup
```bash
cd server
npm install
npm start
```
> The API server will start on **`http://localhost:5003`**.  
> Test health: `curl http://localhost:5003/api/health`

#### 4. Frontend Client Setup
Open a separate terminal:
```bash
cd client
npm install
npm run dev
```
> Vite dev server will start on **`http://localhost:5176`**.  
> Open your browser and navigate to **`http://localhost:5176`**.

---

## 🔐 Environment Variables

The project strictly follows security best practices. Zero credentials or secret tokens are committed to source control.

| Variable | Description | Default / Recommended |
| :--- | :--- | :--- |
| `PORT` | Express API port | `5003` |
| `NODE_ENV` | Runtime environment mode | `development` |
| `DB_HOST` | MySQL hostname | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL database user | `root` |
| `DB_PASSWORD` | MySQL password | *(set in your local .env)* |
| `DB_NAME` | Database name | `kairo_pm_db` |
| `JWT_SECRET` | Authentication secret key | *(random 32+ character string)* |
| `VITE_API_URL` | Frontend API base URL | `http://localhost:5003/api` |

---

## 🗄️ Database Setup

If you wish to run against a real MySQL instance:

1. Start your local MySQL service.
2. Execute `schema.sql`:
```bash
mysql -u root -p < schema.sql
```
3. The script will automatically create `kairo_pm_db` and populate initial production seed records for projects, sprints, team members, tasks, subtasks, and activity comments.

---

## 🎨 Design System & Token Architecture

Kairo utilizes a semantic design token system avoiding arbitrary hex codes inside components.

```css
:root {
  /* Slate Surface Foundations */
  --background: #0b0d11;
  --surface: #11141c;
  --surface-elevated: #161b26;
  --surface-muted: #1e2433;

  /* Borders */
  --border: #1f2637;
  --border-subtle: #161c28;
  --border-strong: #2e384f;

  /* Typography */
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Primary Brand: Precision Indigo */
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --primary-soft: rgba(99, 102, 241, 0.12);

  /* Semantic Roles (WCAG AAA Compliant) */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #0ea5e9;

  /* Controlled Accessible Chart Roles */
  --chart-1: #6366f1; /* Velocity */
  --chart-2: #10b981; /* Deployed */
  --chart-3: #f59e0b; /* In Progress */
  --chart-4: #0ea5e9; /* Review / QA */
  --chart-5: #64748b; /* Backlog */
}
```

---

## 🔒 Security Audit & Best Practices

- **Zero Hardcoded Secrets**: All configuration values are loaded from `process.env` via `dotenv`.
- **Environment Isolation**: `.env` and `.env.*` are explicitly listed in `.gitignore`. Only `.env.example` with safe placeholder keys is present in the repository.
- **SQL Injection Prevention**: Parameterized queries via `mysql2/promise` prepared statements.
- **CORS Configuration**: Restrained Cross-Origin Resource Sharing middleware.
- **Input Sanitization**: Trimmed and type-validated payload fields for task and subtask creation.

---

## 🧪 Build & Verification

To verify production bundle compilation and code validity:

```bash
# Frontend build verification
cd client
npm run build
```

The output bundle will be generated into `client/dist/` with zero TypeScript or JSX syntax errors.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author & Project Attribution

- **Project Submission**: CodeTech IT Solutions Software Engineering Internship Final Deliverable
- **Intern ID**: `CITS4953`
- **Application**: Kairo PM — Enterprise Project Management & Sprint Velocity SaaS
