-- ==========================================================
-- Eduvia LMS Database Schema
-- Production-grade Learning Management System schema for MySQL
-- ==========================================================

CREATE DATABASE IF NOT EXISTS eduvia_lms_db;
USE eduvia_lms_db;

-- 1. Users Table (Students & Instructors)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN') DEFAULT 'STUDENT',
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    instructor_id VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    price DECIMAL(10, 2) DEFAULT 0.00,
    rating DECIMAL(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    enrolled_count INT DEFAULT 0,
    duration VARCHAR(50),
    thumbnail_url TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Modules Table
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    sequence_order INT DEFAULT 1,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 4. Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    video_url TEXT,
    duration VARCHAR(50),
    sequence_order INT DEFAULT 1,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- 5. Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    progress_percent INT DEFAULT 0,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 6. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    issued_date DATE NOT NULL,
    verification_code VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Seed Initial Demo Data
INSERT INTO users (id, name, email, password_hash, role, avatar_url) VALUES 
('usr-101', 'Alex Morgan', 'alex.morgan@eduvia.org', '$2a$10$e8N...hashedpass', 'STUDENT', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'),
('user-inst-1', 'Dr. Elena Rostova', 'elena@eduvia.org', '$2a$10$e8N...hashedpass', 'INSTRUCTOR', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO courses (id, instructor_id, title, category, level, price, rating, reviews_count, enrolled_count, duration, thumbnail_url, description) VALUES
('course-1', 'user-inst-1', 'Full-Stack Modern Web Development Masterclass', 'Web Development', 'Intermediate', 3499.00, 4.95, 1420, 3840, '32.5 Hours', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', 'Master React 19 architecture, Node.js, Express microservices, relational MySQL schemas, and Tailwind CSS v4 design systems.'),
('course-6', 'user-inst-1', 'Machine Learning with Python & Scikit-Learn', 'AI & Machine Learning', 'Beginner', 2999.00, 4.88, 1120, 2680, '26.0 Hours', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80', 'Learn NumPy, Pandas, Scikit-Learn algorithms, exploratory data analysis, regression, classification, and clustering.')
ON DUPLICATE KEY UPDATE title=VALUES(title);
