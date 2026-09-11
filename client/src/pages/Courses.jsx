import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, BookOpen, GraduationCap, SlidersHorizontal } from 'lucide-react';
import { SAMPLE_COURSES, normalizeCategory } from '../data/coursesData';
import CourseCard from '../components/CourseCard';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useAuth } from '../context/AuthContext';
import { getUserLearningState, enrollUserInCourse } from '../services/enrollmentService';

export { SAMPLE_COURSES };

export default function Courses() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses] = useState(SAMPLE_COURSES);
  
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  
  const [userState, setUserState] = useState(() => getUserLearningState(user));

  useEffect(() => {
    setUserState(getUserLearningState(user));
  }, [user]);

  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    if (s !== null) setSearchQuery(s);
    if (c !== null) setSelectedCategory(c);
  }, [searchParams]);

  const categories = [
    'All', 
    'Web Development', 
    'AI & Machine Learning', 
    'Cloud & DevOps', 
    'UI/UX Design', 
    'Systems & Programming'
  ];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        const matchesSearch = 
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Match canonical category with robust normalization
        let matchesCategory = selectedCategory === 'All' || !selectedCategory;
        if (!matchesCategory) {
          matchesCategory = normalizeCategory(c.category).toLowerCase() === normalizeCategory(selectedCategory).toLowerCase();
        }

        const matchesLevel = selectedLevel === 'All' || c.level.toLowerCase() === selectedLevel.toLowerCase();
        return matchesSearch && matchesCategory && matchesLevel;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.enrolledCount - a.enrolledCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0;
      });
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handleEnroll = (id) => {
    if (user) {
      enrollUserInCourse(user, id);
      setUserState(getUserLearningState(user));
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedLevel !== 'All' || sortBy !== 'popular';
  const enrolledIds = userState.enrolledCourses.map(c => c.id);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-blue-700 text-xs uppercase tracking-wider font-bold font-mono">
          <GraduationCap className="w-4 h-4" /> Eduvia Academic Catalog
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
          Explore Courses & Masterclasses
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Curated practical curricula across full-stack engineering, AI/ML systems, cloud infrastructure, enterprise UI/UX, and high-concurrency systems programming.
        </p>
      </div>

      {/* Filter & Search Bar with Restrained Glassmorphism */}
      <div className="eduvia-glass p-4 sm:p-5 rounded-2xl space-y-3.5">
        
        {/* Top Search & Dropdown Controls */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by course title, instructor, or topic (e.g. React, PyTorch, Kubernetes...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Level Select */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="flex-1 md:flex-initial bg-white/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:flex-initial bg-white/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Reset Button */}
        <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-200/60 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === 'All'
                ? cat === 'All'
                : (cat !== 'All' && normalizeCategory(selectedCategory).toLowerCase() === normalizeCategory(cat).toLowerCase());
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    const newParams = new URLSearchParams(searchParams);
                    if (cat === 'All') {
                      newParams.delete('category');
                    } else {
                      newParams.set('category', cat);
                    }
                    setSearchParams(newParams);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong className="text-slate-800 font-bold">{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'} in catalog</span>
        {selectedCategory !== 'All' && (
          <span>Category: <strong className="text-blue-700 font-semibold">{normalizeCategory(selectedCategory)}</strong></span>
        )}
      </div>

      {/* Responsive Course Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledIds.includes(course.id)}
              onEnroll={handleEnroll}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description="We couldn't find any courses matching your search or filters. Try choosing a different category or clearing search terms."
          actionLabel="Clear Filters"
          onAction={clearFilters}
        />
      )}
    </div>
  );
}
