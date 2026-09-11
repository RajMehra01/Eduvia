import React, { useState } from 'react';
import { 
  PlusCircle, 
  Layers, 
  Users, 
  DollarSign, 
  X, 
  Star, 
  BookOpen, 
  Search,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { SAMPLE_COURSES } from '../data/coursesData';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState(SAMPLE_COURSES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Web Development',
    level: 'Beginner',
    price: 2499,
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  });

  const totalStudents = courses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0);
  const totalRevenue = courses.reduce((acc, c) => acc + ((c.price || 0) * (c.enrolledCount || 0)), 0);
  const avgRating = (courses.reduce((acc, c) => acc + (c.rating || 0), 0) / courses.length).toFixed(2);

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const created = {
      ...newCourse,
      id: `course-${Date.now()}`,
      instructor: user?.name || 'Lead Instructor',
      instructorTitle: user?.title || 'Lead Technical Educator',
      rating: 5.0,
      reviewsCount: 1,
      duration: '14.0 Hours',
      totalLessons: 18,
      enrolledCount: 0,
      modules: [
        {
          title: 'Module 1: Course Foundations & Orientation',
          lessons: [
            { id: `l-${Date.now()}-1`, title: 'Welcome & Curriculum Overview', duration: '15 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
          ]
        }
      ],
      quiz: {
        title: `${newCourse.title} Comprehensive Assessment`,
        questions: [
          { q: 'What is the core learning objective of this course?', options: ['To build production-ready practical skills', 'To read slides only', 'To memorize syntax'], correct: 0 }
        ]
      }
    };

    setCourses([created, ...courses]);
    setShowCreateModal(false);
    setNewCourse({
      title: '',
      category: 'Web Development',
      level: 'Beginner',
      price: 2499,
      description: '',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    });
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-700 text-xs uppercase tracking-wider font-bold">
            <Briefcase className="w-4 h-4" /> Instructor Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Eduvia Creator Studio
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Publish courses, manage curricula, and monitor learner enrollments and revenue.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setShowCreateModal(true)}
          icon={PlusCircle}
        >
          Create New Course
        </Button>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Published Courses"
          value={courses.length.toString()}
          subtitle="All live on Eduvia catalog"
          icon={BookOpen}
        />
        <StatCard
          title="Total Learners"
          value={totalStudents.toLocaleString()}
          subtitle="Enrolled across all tracks"
          trend="+18% this month"
          icon={Users}
        />
        <StatCard
          title="Gross Tuition Sales"
          value={`₹${totalRevenue.toLocaleString()}`}
          subtitle="Total marketplace volume"
          trend="+32% vs last quarter"
          icon={DollarSign}
        />
        <StatCard
          title="Average Rating"
          value={avgRating}
          subtitle="From student reviews"
          trend="4.9+ Outstanding"
          icon={Star}
        />
      </div>

      {/* Authored Courses Management Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs space-y-4">
        
        {/* Table Top Bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Course Management</h2>
            <p className="text-xs text-slate-500">View and manage your active courses</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search authored courses..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-3.5 px-5">Course Title</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Level</th>
                <th className="py-3.5 px-5">Tuition</th>
                <th className="py-3.5 px-5">Learners</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm truncate max-w-xs sm:max-w-sm">
                          {c.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {c.duration} • {c.modules?.length || 2} modules
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <Badge variant="blue" size="sm">{c.category}</Badge>
                  </td>
                  <td className="py-4 px-5 text-slate-600 font-medium">
                    {c.level}
                  </td>
                  <td className="py-4 px-5 font-bold text-slate-900 text-sm">
                    {c.price === 0 ? 'Free' : `₹${c.price.toLocaleString()}`}
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-blue-700 font-semibold">
                      {c.enrolledCount?.toLocaleString() || 0}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <Badge variant="emerald" size="sm">Active Live</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Publish New Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 my-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="space-y-0.5">
                <h3 className="font-bold text-lg text-slate-900">Create New Masterclass</h3>
                <p className="text-xs text-slate-500">Add a new course offering to the Eduvia marketplace</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Course Title</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g. Distributed Cloud Architecture with Go & Kubernetes"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Skill Level</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Tuition Price (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="100"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Course Description</label>
                <textarea
                  rows="3"
                  required
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Describe learning outcomes, tools used, and course milestones..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Cover Thumbnail URL</label>
                <input
                  type="url"
                  value={newCourse.thumbnail}
                  onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                >
                  Publish Course
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
