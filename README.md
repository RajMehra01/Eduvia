# Kairo — Precision Project Management & Sprint Workspace ⚡📊

> **Technical, calm, and precise engineering execution platform. Plan sprints, balance developer capacity, and track milestone delivery with zero noise.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/Frontend-React%2019-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%206-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Styles-Tailwind%20v4-14b8a6.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%2024-339933.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express%204-000000.svg)](https://expressjs.com/)
[![MySQL 8](https://img.shields.io/badge/Database-MySQL%208.0-4479a1.svg)](https://www.mysql.com/)
[![Intern ID](https://img.shields.io/badge/Intern%20ID-CITS4953-orange.svg)](#author)

---

## 📖 Overview

**Kairo** is an enterprise-grade project management SaaS platform engineered to bridge high-level milestone roadmaps with granular sprint execution. Designed with the intentional restraint of modern developer productivity tools (such as Linear and Height), Kairo replaces generic "AI SaaS" neon gradients and glowing cards with a focused **Graphite, Deep Charcoal, and Technical Teal** design system.

The application combines a typography-led public website featuring a full-screen engineering video background and subtle liquid-glass accents, paired with a robust workspace providing a **5-stage sprint Kanban board**, **Fibonacci story points estimation (1, 2, 3, 5, 8 pts)**, an interactive **milestone Gantt timeline**, a **team workload matrix**, and **sprint velocity metrics**.

---

## ✨ Key Capabilities & Features

### 1. 🌐 Typography-Led Public Website
- **Minimalist Restraint**: Deep graphite (`#0B0D0F`) canvas, clean white typography (`Inter`), and restrained technical teal accents.
- **Full-Screen Video Hero**: Engineering execution visual background without artificial overlays or heavy gradients.
- **Subtle Liquid Glass**: Restrained luminosity blending and backdrop-filter treatment used exclusively for navigation and interactive CTAs.
- **Scroll-Driven Word-Reveal**: Dynamic customer evaluation reveal tracking viewport progression.
- **Interactive Capability Preview**: Live interactive mock workspace demonstrating project health, sprint boards, Gantt milestones, and capacity allocations.

### 2. 📋 Sprint Kanban Board
- **5-Stage Workflow Pipeline**: `Backlog` ➔ `In Progress` ➔ `Code Review` ➔ `QA Testing` ➔ `Deployed`.
- **Board-First Visual Hierarchy**: Information-dense task cards prioritized over decorative containers.
- **Real-Time Point Aggregations**: Automatic live summation of story points and task counts per workflow stage.
- **Single-Click Quick Transitions**: Move deliverables between stages directly from the card footer without modal friction.

### 3. 🎯 Task Management & Subtask Checklists
- **Hierarchical Deliverables**: Parent deliverables with interactive subtask completion checklists.
- **Chronological Activity Discussions**: Comment stream with author attribution and relative timestamps.
- **Fibonacci Effort Calibration**: Strict estimation scale (1, 2, 3, 5, and 8 story points).
- **Engineering Domains**: Categorization across `Backend`, `Frontend`, `Full Stack`, `Architecture`, `Security`, and `UI/UX`.

### 4. 👥 Team Workload & Capacity Heatmap
- **Capacity Utilization Matrix**: Measures assigned story points against individual developer bandwidth.
- **Semantic Health Thresholds**:
  - **Healthy (< 75%)**: Balanced capacity with headroom for review and bug triage (`#10B981`).
  - **At Capacity (75% – 90%)**: Optimal sprint load threshold (`#F2A93B`).
  - **Overloaded (> 90%)**: Warning threshold indicating risk of delivery bottleneck (`#EF4444`).
- **Accessible Multi-Cue Indicators**: Every state combines distinct semantic badges, labels, percentages, and icon cues.

### 5. 📅 Milestone Gantt Schedule
- **Timeline-First Composition**: Clean date scale where milestone trajectories visually dominate the view.
- **Automated Stage Mapping**: Visual track completion percentages and status colors dynamically reflect active Kanban stages.
- **Sprint Horizon Alignment**: Clear tracking against two-week sprint deadlines.

### 6. 📈 Sprint Velocity & Burn-Down Metrics
- **Velocity Completion Gauge**: Real-time ratio of deployed story points against total active sprint backlog.
- **Reconciled Data Model**: Guaranteed numeric agreement across Overview, Kanban, Table, Gantt, and Analytics.
- **Dynamic Sprint Risk Evaluation**: Real-time risk analysis dynamically detecting unresolved blockers in the backlog.

---

## 🛠️ Tech Stack

### Frontend Architecture
- **Core**: HTML5, JavaScript (ES2023), CSS3
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 6 (ES Modules, HMR, Optimized Production Bundler)
- **Routing**: React Router DOM v7 (SPA with automatic scroll-to-top)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom design tokens
- **Animations**: Framer Motion 13 (`useScroll`, `useTransform`, `AnimatePresence`)
- **Iconography**: Lucide React (standardized 24px grid)
- **API Client**: Axios with centralized error handling

### Backend Architecture
- **Runtime**: Node.js v24 (ES Modules)
- **Server Framework**: Express 4.21
- **Database Client**: MySQL2 with Promise connection pooling
- **Security Middleware**: CORS, JSON Body Parser, Dotenv configuration
- **Resilience**: Dual-mode persistence architecture featuring automatic, resilient in-memory fallback store when MySQL is offline.

---

## 📐 Architecture & System Design

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KAIRO PM ARCHITECTURE                           │
└────────────────────────────────────────────────────────────────────────┘

  [ Client Layer — React 19 + Vite 6 + Tailwind v4 + Framer Motion ]
    │
    ├── Public Website (Hero, Parallax, Product Story, Testimonial)
    │
    └── Workspace Shell (/app)
          │
          ├── State Layer (ProjectContext.jsx)
          │     ├── Project Selection & Metrics
          │     ├── Active Tasks & Story Points (Single Source of Truth)
          │     └── Team Workload & Dynamic Sprint Risk
          │
          └── Interactive Views
                ├── Dashboard Overview (/app)
                ├── Project Directory (/app/projects)
                ├── Sprint Kanban Board (/app/kanban)
                ├── Task Data Table (/app/table)
                ├── Milestone Gantt (/app/gantt)
                ├── Team Workload Matrix (/app/workload)
                ├── Sprint Velocity Analytics (/app/analytics)
                └── Workspace Settings (/app/settings)
    │
    ▼ (REST API / JSON via Axios)
  [ Backend Layer — Express 4.21 + Node.js v24 ]
    │
    ├── /api/health       -> System uptime & health telemetry
    ├── /api/projects     -> Multi-project catalog & status
    ├── /api/tasks        -> CRUD operations, subtasks, comments
    ├── /api/team         -> Team capacity & bandwidth limits
    └── /api/analytics    -> Velocity metrics & dynamic sprint risk
    │
    ▼ (MySQL2 Promise Pool / Fallback Store)
  [ Data Layer ]
    ├── Primary: MySQL Database (kairo_pm_db)
    └── Fallback: In-Memory Resilient Store (Zero-config instant evaluation)
```

---

## 📁 Project Structure

```
d:/Internship Projects/Project Mgmt/
├── client/                               # React 19 Frontend Application
│   ├── public/                           # Static assets and favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/                  # Landing page modules
│   │   │   │   ├── FeatureShowcase.jsx   # Tabbed capability showcase
│   │   │   │   ├── FinalCTA.jsx          # Conversion call-to-action
│   │   │   │   ├── HeroSection.jsx       # Full-screen video hero section
│   │   │   │   ├── LandingFooter.jsx     # Production website footer
│   │   │   │   ├── LandingNavbar.jsx     # Liquid-glass navigation header
│   │   │   │   ├── ProductPreview.jsx    # Parallax mockup workspace frame
│   │   │   │   ├── ProductStory.jsx      # Step-by-step engineering chapters
│   │   │   │   └── TestimonialReveal.jsx # Scroll-driven text opacity reveal
│   │   │   └── workspace/                # Workspace application components
│   │   │       ├── CreateTaskModal.jsx   # Work item creation dialog
│   │   │       ├── PriorityBadge.jsx     # WCAG-compliant priority tokens
│   │   │       ├── Sidebar.jsx           # Responsive workspace sidebar
│   │   │       ├── TaskCard.jsx          # Information-dense Kanban card
│   │   │       ├── TaskDetailModal.jsx   # Deep inspection, subtasks, comments
│   │   │       └── Topbar.jsx            # Context bar, search, velocity pill
│   │   ├── context/
│   │   │   └── ProjectContext.jsx        # Central state, metrics & calculations
│   │   ├── layouts/
│   │   │   └── WorkspaceLayout.jsx       # Authenticated shell layout
│   │   ├── pages/
│   │   │   ├── DashboardOverview.jsx     # Executive KPI & pipeline overview
│   │   │   ├── KanbanBoard.jsx           # 5-stage sprint Kanban board
│   │   │   ├── LandingPage.jsx           # Public SaaS portal
│   │   │   ├── ProjectsPage.jsx          # Project directory & portfolio view
│   │   │   ├── SettingsPage.jsx          # Workspace utility settings
│   │   │   ├── SprintAnalytics.jsx       # Velocity & dynamic risk metrics
│   │   │   ├── TaskTableView.jsx         # Dense filterable catalog
│   │   │   ├── TimelineGantt.jsx         # Milestone visual schedule
│   │   │   └── WorkloadMatrix.jsx        # Developer capacity heatmap
│   │   ├── services/
│   │   │   └── api.js                    # Axios service layer
│   │   ├── App.jsx                       # Routing configuration
│   │   ├── index.css                     # Graphite & Teal design tokens
│   │   └── main.jsx                      # Application entry point
│   ├── index.html                        # HTML5 document with Inter font
│   ├── package.json                      # Client dependencies & scripts
│   └── vite.config.js                    # Vite bundler configuration
│
├── server/                               # Node.js Express REST Backend
│   ├── config/
│   │   └── db.js                         # MySQL pool & resilient fallback store
│   ├── controllers/
│   │   ├── analyticsController.js        # Velocity & dynamic risk logic
│   │   ├── projectController.js          # Project portfolio endpoints
│   │   ├── taskController.js             # Task CRUD, subtask, comment logic
│   │   └── teamController.js             # Team member & capacity endpoints
│   ├── routes/                           # Express route definitions
│   │   ├── analyticsRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── teamRoutes.js
│   ├── package.json                      # Server dependencies & scripts
│   └── server.js                         # Express application entry point
│
├── .env.example                          # Environment variable placeholders
├── .gitignore                            # Comprehensive ignore rules
├── LICENSE                               # MIT License
├── README.md                             # Production documentation
└── schema.sql                            # Production MySQL relational schema
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v24 recommended)
- **npm**: v9.0.0 or higher
- **MySQL** *(Optional)*: v8.0+ for persistent database storage

### 1. Clone & Setup
```bash
git clone https://github.com/RajMehra01/Eduvia.git
cd Eduvia
```

### 2. Backend Setup
```bash
cd server
npm install

# (Optional) Create .env from template
cp .env.example .env

# Start backend server
node server.js
```
The backend will launch on:
- API Server: `http://localhost:5003`
- Health Check: `http://localhost:5003/api/health`

*(Note: If MySQL is not running locally, Kairo automatically falls back to its built-in in-memory dataset, ensuring 100% offline evaluation without setup friction).*

### 3. Frontend Setup
In a new terminal:
```bash
cd client
npm install

# Launch Vite dev server
npm run dev
```
The frontend will launch on:
- Public Website & Workspace: `http://localhost:5176`

---

## 🔐 Environment Variables

The repository follows strict security practices. No credentials or secrets are committed to version control.

| Variable | Description | Safe Placeholder / Default |
| :--- | :--- | :--- |
| `PORT` | Express server port | `5003` |
| `NODE_ENV` | Runtime environment | `development` |
| `DB_HOST` | MySQL database host | `localhost` |
| `DB_PORT` | MySQL database port | `3306` |
| `DB_USER` | MySQL username | `your_mysql_username` |
| `DB_PASSWORD` | MySQL password | `your_mysql_password` |
| `DB_NAME` | MySQL database name | `kairo_pm_db` |
| `JWT_SECRET` | Authentication token secret | `your_secure_jwt_secret_token` |
| `VITE_API_URL` | Client API target base URL | `http://localhost:5003/api` |

---

## 🗄️ Database Setup (Optional)

To connect Kairo to a local MySQL instance:

1. Start your local MySQL service.
2. Execute the schema file:
```bash
mysql -u your_username -p < schema.sql
```
3. Update `server/.env` with your database credentials.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health and telemetry | `200 OK` |
| `GET` | `/api/projects` | Fetch all project roadmaps | `200 OK` |
| `POST` | `/api/projects` | Register a new project | `201 Created` |
| `GET` | `/api/tasks` | Fetch sprint deliverables | `200 OK` |
| `POST` | `/api/tasks` | Create a new deliverable item | `201 Created` |
| `PUT` | `/api/tasks/:id` | Update deliverable stage or attributes | `200 OK` |
| `DELETE` | `/api/tasks/:id` | Remove a deliverable from sprint | `200 OK` |
| `POST` | `/api/tasks/:id/subtasks` | Add a subtask checklist item | `201 Created` |
| `POST` | `/api/tasks/:id/comments` | Post an activity discussion note | `201 Created` |
| `GET` | `/api/team` | Fetch team members and capacity limits | `200 OK` |
| `GET` | `/api/analytics` | Fetch sprint velocity & risk evaluation | `200 OK` |

---

## 🎨 Design System & Color Palette

Kairo replaces noisy gradients with a curated, professional color system:

```css
:root {
  /* Graphite & Charcoal Surfaces */
  --background: #0B0D0F;       /* Graphite / Near-black canvas */
  --surface: #12161A;          /* Deep charcoal container */
  --surface-elevated: #171C21; /* Card & interactive surface */
  --surface-card: #1D2329;     /* Elevated item surface */

  /* Borders */
  --border: #1D2329;
  --border-subtle: #161B20;
  --border-strong: #262F38;

  /* Typography */
  --text-primary: #F3F4F1;     /* High contrast clean white */
  --text-secondary: #A7B0B8;   /* Balanced slate gray */
  --text-muted: #707A84;       /* Muted technical gray */

  /* Primary Brand Accent: Technical Teal */
  --primary: #19B5A5;          /* Base brand accent */
  --primary-active: #2DD4BF;   /* Bright teal for active states */
  --primary-hover: #149A8C;    /* Interaction hover state */

  /* Secondary Accent */
  --secondary-accent: #F2A93B; /* Warm amber for high priority */

  /* Semantic Status Roles */
  --success: #10B981;          /* Deployed / Verified */
  --warning: #F2A93B;          /* High Priority / At Capacity */
  --danger: #EF4444;           /* Blocker / Overloaded */
  --info: #0EA5E9;             /* Review & QA Testing */
}
```

---

## 🔒 Security Audit & Handling

- **Zero Committed Credentials**: Complete audit verified that no real passwords, API tokens, database keys, or private certificates exist in the repository.
- **Environment Isolation**: `.env` and `.env.*` are strictly ignored by `.gitignore`.
- **SQL Injection Prevention**: Parameterized queries via `mysql2/promise` prepared statements.
- **Dual-Mode Fallback Security**: Offline fallback uses an in-memory data store with no external attack surface.

---

## 🧪 Build & Verification

To verify production bundle compilation:

```bash
cd client
npm run build
```

Expected result: Zero TypeScript/JSX syntax errors, production bundle compiled into `client/dist/`.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author & Attribution

- **Developer**: Raj Mehra
- **Intern ID**: `CITS4953`
- **Application**: Kairo — Precision Project Management / Sprint Workspace
- **Target Repository**: `https://github.com/RajMehra01/Eduvia.git`
