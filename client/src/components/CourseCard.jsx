import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, PlayCircle, Users, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

export default function CourseCard({ course, isEnrolled, onEnroll }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Course Thumbnail with 16:9 Aspect Ratio */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <img 
            src={course.thumbnail || FALLBACK_THUMBNAIL} 
            alt={course.title} 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_THUMBNAIL;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
          
          {/* Top Left: Category Tag */}
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
              {course.category}
            </span>
          </div>

          {/* Top Right: Status / Level */}
          <div className="absolute top-2.5 right-2.5">
            {isEnrolled ? (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-600 text-white shadow-xs flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Enrolled
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/75 text-white backdrop-blur-xs">
                {course.level}
              </span>
            )}
          </div>

          {/* Bottom Thumbnail Overlay: Duration & Learners */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-medium">
            <span className="flex items-center gap-1 drop-shadow-sm">
              <Clock className="w-3.5 h-3.5 text-blue-200" /> {course.duration}
            </span>
            <span className="flex items-center gap-1 drop-shadow-sm font-semibold">
              <Users className="w-3.5 h-3.5 text-blue-200" /> {course.enrolledCount?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Instructor row */}
          <div className="flex items-center gap-2 pt-0.5">
            <img
              src={course.instructorAvatar || FALLBACK_AVATAR}
              alt={course.instructor}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_AVATAR;
              }}
              className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <span className="text-xs text-slate-700 font-medium truncate">{course.instructor}</span>
          </div>

          {/* Rating & lessons row */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 font-bold text-slate-900">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{course.rating}</span>
              <span className="text-slate-400 font-normal text-[11px]">({course.reviewsCount})</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">{course.totalLessons} lessons</span>
          </div>
        </div>
      </div>

      {/* Footer & Action */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">Tuition</div>
            <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString()}`}
            </div>
          </div>

          {isEnrolled ? (
            <Link to={`/player/${course.id}`}>
              <Button variant="emerald" size="sm" icon={PlayCircle}>
                Continue
              </Button>
            </Link>
          ) : (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onEnroll && onEnroll(course.id)}
            >
              Enroll Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
