import pool from '../config/db.js';

let mockCourses = [
  {
    id: 'course-1',
    title: 'Full-Stack Modern Web Development Masterclass',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Yogesh Singh',
    rating: 4.9,
    reviewsCount: 1280,
    duration: '28.5 Hours',
    price: 3499,
    enrolledCount: 3420,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Master React 19, Node.js, Express, REST APIs, Tailwind CSS, and MySQL database design through production-level projects.'
  },
  {
    id: 'course-2',
    title: 'AI & Machine Learning Foundations with Python',
    category: 'AI & ML',
    level: 'Beginner',
    instructor: 'Dr. Alok Verma',
    rating: 4.8,
    reviewsCount: 940,
    duration: '22 Hours',
    price: 2999,
    enrolledCount: 2190,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    description: 'Learn NumPy, Pandas, Scikit-Learn, Neural Networks, and deploy LLM applications with python.'
  }
];

export const getAllCourses = async (req, res) => {
  const { category, level, search } = req.query;
  let results = [...mockCourses];

  if (category && category !== 'All') {
    results = results.filter(c => c.category === category);
  }
  if (level && level !== 'All') {
    results = results.filter(c => c.level === level);
  }
  if (search) {
    results = results.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()));
  }

  res.json({ success: true, count: results.length, data: results });
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  res.json({ success: true, data: course });
};

export const createCourse = async (req, res) => {
  const { title, category, level, price, description, thumbnail } = req.body;
  if (!title || !category || !price) {
    return res.status(400).json({ success: false, error: 'Title, category, and price required' });
  }

  const newCourse = {
    id: `course-${Date.now()}`,
    title,
    category,
    level: level || 'Beginner',
    instructor: req.user?.name || 'Yogesh Singh',
    rating: 5.0,
    reviewsCount: 1,
    duration: '10 Hours',
    price: Number(price),
    enrolledCount: 0,
    thumbnail: thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: description || ''
  };

  mockCourses.unshift(newCourse);
  res.status(201).json({ success: true, message: 'Course created', data: newCourse });
};
