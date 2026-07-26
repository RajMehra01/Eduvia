# SkillStream LMS - Enterprise Learning Management System 🎓⚡

SkillStream LMS is a modular full-stack **Learning Management System** built with **React 19, Node.js, Express, and MySQL**.

It features role separation between **Students** and **Instructors**, JWT authentication, course catalog filtering, an interactive video course player, automated assessment quizzes, verified PDF certificate generation, and an Instructor Studio.

---

## 👨‍💻 Developer Profile

- **Developer**: Yogesh Singh Bhadoriya
- **LinkedIn**: [Yogesh Singh's LinkedIn](https://www.linkedin.com/in/er-yogeshsingh02/)
- **Project Scope**: CodeTech IT Solutions Software Engineering Internship Submission (Task 2)

---

## 🏗️ Project Architecture & Folder Structure

```
CodeTechITSolution_LMS/
├── client/
│   ├── src/
│   │   ├── components/        # Navbar, Footer, CourseCard, QuizModal, CertificateModal, ProtectedRoute
│   │   ├── context/           # AuthContext (JWT & Role Management)
│   │   ├── layouts/           # MainLayout
│   │   ├── pages/             # Home, Login, Register, Courses, CourseDetails, CoursePlayer, Dashboards, Certificates
│   │   ├── services/          # api.js (Axios REST API service)
│   │   ├── App.jsx            # React Router DOM v7 configuration
│   │   ├── main.jsx
│   │   └── index.css          # Tailwind CSS v4 styling
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/                # db.js (MySQL Pool configuration)
│   ├── controllers/           # authController, courseController, enrollmentController, certificateController
│   ├── middleware/            # authMiddleware (JWT Verification & Role Guard)
│   ├── routes/                # authRoutes, courseRoutes, enrollmentRoutes, certificateRoutes
│   ├── server.js              # Express API Server entry point
│   ├── package.json
│   └── .env
└── schema.sql                 # MySQL Relational Database Script
```

---

## 🌟 Key Features

### 🔐 Auth & Role Management
- **Role-Based Portals**: Separate login/register flows for **Students** and **Instructors**.
- **JWT Protection**: Secured routes with bearer token verification.

### 🎓 Student Features
- **Course Catalog**: Live filtering by category, search by title, and difficulty level sorting.
- **Interactive Player**: Module video syllabus navigation, lesson progress checkboxes, and quiz assessment window.
- **Student Dashboard**: Tracks enrolled courses and % completion rates.
- **Verified Certificates**: Authenticated completion credentials with unique verification IDs.

### 👨‍🏫 Instructor Studio Features
- **Publishing Studio**: Modal form to launch new courses with custom thumbnails, pricing, and modules.
- **Studio Dashboard**: Track total authored courses, enrolled student counts, and sales revenue (₹).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React Icons, React Router DOM v7
- **Backend**: Node.js, Express.js, JWT, BcryptJS, CORS, REST APIs
- **Database**: MySQL Relational Database (with fallback mock store)

---

## 🚀 Installation & Running Locally

### 1. Backend Server Setup
```bash
cd server
npm install
npm start
```
*(Runs on `http://localhost:5001`)*

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev
```
*(Vite Dev Server runs on `http://localhost:5174`)*

---

## 📜 License
This project was developed for the **CodeTech IT Solutions Software Engineering Internship Task**.
