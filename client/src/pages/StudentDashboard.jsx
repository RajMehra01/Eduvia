import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Award, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_COURSES } from './Courses';

export default function StudentDashboard() {
  const { user } = useAuth();
  const enrolledCourses = [SAMPLE_COURSES[0], SAMPLE_COURSES[1]];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, {user?.name || 'Student'}!</h2>
          <p className="text-slate-400 text-xs">Track your enrolled courses, lesson completion, and certificates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolledCourses.map((course, idx) => {
          const percent = idx === 0 ? 65 : 20;
          return (
            <div key={course.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <img src={course.thumbnail} alt={course.title} className="w-24 h-24 object-cover rounded-xl border border-slate-800" />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {course.category}
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm line-clamp-2">{course.title}</h3>
                    <p className="text-xs text-slate-400">Instructor: {course.instructor}</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Progression</span>
                    <span className="text-indigo-400">{percent}% Completed</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to={`/player/${course.id}`}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <PlayCircle className="w-4 h-4" /> Resume Player
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
