import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, PlayCircle } from 'lucide-react';

export default function CourseCard({ course, isEnrolled, onEnroll }) {
  return (
    <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group flex flex-col justify-between">
      <div>
        {/* Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-slate-950/80 backdrop-blur-md text-indigo-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-indigo-500/30">
              {course.category}
            </span>
            <span className="bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700">
              {course.level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> {course.duration}
            </span>
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating} ({course.reviewsCount})
            </span>
          </div>

          <h3 className="font-bold text-slate-100 text-base line-clamp-2 group-hover:text-indigo-300 transition-colors">
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2">
            {course.description}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
            <span className="text-slate-300 font-medium">By {course.instructor}</span>
            <span className="text-slate-400">{course.enrolledCount} enrolled</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-black text-white">
            ₹{course.price}
          </div>
          {isEnrolled ? (
            <Link
              to={`/player/${course.id}`}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition-all"
            >
              <PlayCircle className="w-4 h-4" /> Continue
            </Link>
          ) : (
            <button
              onClick={() => onEnroll && onEnroll(course.id)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
