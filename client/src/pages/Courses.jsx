import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CourseCard from '../components/CourseCard';

export const SAMPLE_COURSES = [
  {
    id: 'course-1',
    title: 'Full-Stack Modern Web Development Masterclass',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Yogesh Singh',
    instructorTitle: 'Senior Software Engineer & Lead Instructor',
    rating: 4.9,
    reviewsCount: 1280,
    duration: '28.5 Hours',
    totalLessons: 34,
    price: 3499,
    enrolledCount: 3420,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Master React 19, Node.js, Express, REST APIs, Tailwind CSS, and MySQL database design through production-level projects.',
    modules: [
      {
        title: 'Module 1: React 19 Architecture & State Management',
        lessons: [
          { id: 'l1', title: 'Component Composition & Custom Hooks', duration: '24 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
          { id: 'l2', title: 'State Persistence & Context API', duration: '32 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
          { id: 'l3', title: 'Optimizing Render Cycles & Performance', duration: '18 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      },
      {
        title: 'Module 2: RESTful Express Backend & MySQL DB',
        lessons: [
          { id: 'l4', title: 'Setting up Node.js Express API Server', duration: '30 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l5', title: 'Database Relational Schemas & Foreign Keys', duration: '45 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Full-Stack Development Certification Quiz',
      questions: [
        { q: 'Which hook is recommended for handling side effects in React 19?', options: ['useEffect', 'useSideEffect', 'useAction', 'useLogic'], correct: 0 },
        { q: 'In Express.js, what does app.use(express.json()) accomplish?', options: ['Parses incoming HTML forms', 'Parses incoming JSON request bodies', 'Compresses HTTP responses'], correct: 1 },
        { q: 'What type of database is MySQL?', options: ['NoSQL Document Store', 'Relational Database Management System (RDBMS)', 'Graph Database'], correct: 1 }
      ]
    }
  },
  {
    id: 'course-2',
    title: 'AI & Machine Learning Foundations with Python',
    category: 'AI & ML',
    level: 'Beginner',
    instructor: 'Dr. Alok Verma',
    instructorTitle: 'AI Research Scientist',
    rating: 4.8,
    reviewsCount: 940,
    duration: '22 Hours',
    totalLessons: 26,
    price: 2999,
    enrolledCount: 2190,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    description: 'Learn NumPy, Pandas, Scikit-Learn, Neural Networks, and deploy LLM applications with python.',
    modules: [
      {
        title: 'Module 1: Python Data Processing Essentials',
        lessons: [
          { id: 'l20', title: 'NumPy Arrays & Matrix Operations', duration: '20 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l21', title: 'Pandas DataFrames & Data Cleaning', duration: '35 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Python AI Foundations Quiz',
      questions: [
        { q: 'Which Python library is primarily used for Data Manipulation & DataFrames?', options: ['NumPy', 'Pandas', 'Flask'], correct: 1 }
      ]
    }
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Systems & Glassmorphism Masterclass',
    category: 'UI/UX Design',
    level: 'Advanced',
    instructor: 'Neha Sharma',
    instructorTitle: 'Lead Product Designer',
    rating: 4.95,
    reviewsCount: 810,
    duration: '16.5 Hours',
    totalLessons: 20,
    price: 2499,
    enrolledCount: 1850,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    description: 'Design accessible, high-converting digital products, interactive prototypes, and design token architectures in Figma.',
    modules: [
      {
        title: 'Module 1: Design Systems Architecture',
        lessons: [
          { id: 'l30', title: 'Typography Hierarchy & Tokenization', duration: '25 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Design Systems Quiz',
      questions: [
        { q: 'What is the standard contrast ratio for normal text under WCAG AA standards?', options: ['3:1', '4.5:1', '7:1'], correct: 1 }
      ]
    }
  }
];

export default function Courses() {
  const [courses] = useState(SAMPLE_COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [enrolledIds, setEnrolledIds] = useState(['course-1']);

  const categories = ['All', 'Web Development', 'AI & ML', 'UI/UX Design', 'Cloud & DevOps'];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = (id) => {
    if (!enrolledIds.includes(id)) {
      setEnrolledIds([...enrolledIds, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-white">Course Catalog</h2>
        <p className="text-slate-400 text-xs">Explore curated software engineering tracks, video lessons, and certification modules</p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Level Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search course title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={enrolledIds.includes(course.id)}
            onEnroll={handleEnroll}
          />
        ))}
      </div>
    </div>
  );
}
