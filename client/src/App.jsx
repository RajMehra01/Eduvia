import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import CoursePlayer from './pages/CoursePlayer';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import Certificates from './pages/Certificates';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollManager from './utils/scrollManager';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path="player/:id" element={
              <ProtectedRoute>
                <CoursePlayer />
              </ProtectedRoute>
            } />
            <Route path="student-dashboard" element={
              <ProtectedRoute allowedRole="STUDENT">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="instructor-dashboard" element={
              <ProtectedRoute allowedRole="INSTRUCTOR">
                <InstructorDashboard />
              </ProtectedRoute>
            } />
            <Route path="certificates" element={<Certificates />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
