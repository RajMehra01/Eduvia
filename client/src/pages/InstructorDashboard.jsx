import React, { useState } from 'react';
import { PlusCircle, Layers, Users, DollarSign, X } from 'lucide-react';
import { SAMPLE_COURSES } from './Courses';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState(SAMPLE_COURSES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Web Development',
    level: 'Beginner',
    price: 1999,
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  });

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const created = {
      ...newCourse,
      id: `course-${Date.now()}`,
      instructor: 'Yogesh Singh',
      rating: 5.0,
      reviewsCount: 1,
      duration: '12 Hours',
      totalLessons: 15,
      enrolledCount: 0,
      modules: [
        {
          title: 'Module 1: Overview',
          lessons: [{ id: `l-${Date.now()}`, title: 'Introduction', duration: '15 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }]
        }
      ]
    };

    setCourses([created, ...courses]);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Instructor Studio</h2>
          <p className="text-slate-400 text-xs">Create, publish, and track course enrollments & earnings</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Publish New Course
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total Authored Courses</div>
          <div className="text-2xl font-black text-white">{courses.length}</div>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total Enrolled Students</div>
          <div className="text-2xl font-black text-indigo-400">
            {courses.reduce((acc, c) => acc + c.enrolledCount, 0).toLocaleString()}
          </div>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total Sales Revenue (Est.)</div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{courses.reduce((acc, c) => acc + (c.price * c.enrolledCount), 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Authored Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 font-bold text-slate-200 text-xs">
          Published Courses Table
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Course</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Enrolled Students</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {courses.map(c => (
                <tr key={c.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-slate-200 flex items-center gap-3">
                    <img src={c.thumbnail} alt={c.title} className="w-10 h-10 object-cover rounded-lg border border-slate-800" />
                    <span>{c.title}</span>
                  </td>
                  <td className="p-4 text-slate-300">{c.category}</td>
                  <td className="p-4 font-bold text-emerald-400">₹{c.price}</td>
                  <td className="p-4 text-slate-300">{c.enrolledCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white">Create New Course</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="Master React 19 & Next.js App Router"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description</label>
                <textarea
                  rows="3"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Course curriculum summary..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
