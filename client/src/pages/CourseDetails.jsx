import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Star, Layers, CheckCircle, ShieldCheck, PlayCircle, ArrowLeft } from 'lucide-react';
import { SAMPLE_COURSES } from './Courses';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = SAMPLE_COURSES.find(c => c.id === id) || SAMPLE_COURSES[0];

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      {/* Hero Header */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {course.category}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300">
              {course.level} Level
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white">{course.title}</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{course.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
            <span className="text-slate-300 font-semibold">Instructor: {course.instructor}</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" /> {course.rating} ({course.reviewsCount} ratings)
            </span>
            <span className="text-slate-400">{course.enrolledCount} students enrolled</span>
          </div>
        </div>

        {/* Enroll Action Box */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
          <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-xl border border-slate-800" />
          <div className="text-3xl font-black text-white">₹{course.price}</div>
          <Link
            to={`/player/${course.id}`}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <PlayCircle className="w-5 h-5" /> Start Course Player
          </Link>
          <p className="text-[11px] text-slate-400">Includes lifetime access & completion certificate</p>
        </div>
      </div>

      {/* Syllabus Modules */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" /> Course Syllabus & Modules
        </h2>
        <div className="space-y-4 pt-2">
          {course.modules.map((mod, idx) => (
            <div key={idx} className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-200 text-sm">{mod.title}</h3>
              <div className="space-y-1.5">
                {mod.lessons.map(lesson => (
                  <div key={lesson.id} className="flex justify-between items-center text-xs text-slate-400 p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-indigo-400" /> {lesson.title}
                    </span>
                    <span className="font-mono text-[11px]">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
