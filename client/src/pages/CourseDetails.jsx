import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  PlayCircle, 
  ArrowLeft, 
  Users, 
  FileText, 
  Award, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { SAMPLE_COURSES } from '../data/coursesData';
import CourseCard from '../components/CourseCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { isUserEnrolledInCourse, enrollUserInCourse } from '../services/enrollmentService';

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const course = SAMPLE_COURSES.find((c) => c.id === id) || SAMPLE_COURSES[0];

  const [expandedModules, setExpandedModules] = useState([0]); // Expand first module by default
  const isEnrolled = isUserEnrolledInCourse(user, course.id);

  const relatedCourses = SAMPLE_COURSES.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 2);

  const toggleModule = (idx) => {
    if (expandedModules.includes(idx)) {
      setExpandedModules(expandedModules.filter((i) => i !== idx));
    } else {
      setExpandedModules([...expandedModules, idx]);
    }
  };

  const handleEnroll = () => {
    if (user) {
      enrollUserInCourse(user, course.id);
    }
    navigate(`/player/${course.id}`);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 space-y-8">
      {/* Back Button & Category Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> All Courses
        </button>
        <span>/</span>
        <span className="text-slate-800 font-medium">{course.category}</span>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left ~65% (8 Cols): Hero Header, Outcomes, Curriculum, Instructor Bio */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Course Hero Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
                {course.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                {course.level} Level
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> {course.duration}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug font-heading">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>

            {/* Instructor & Metadata Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructorAvatar || FALLBACK_AVATAR}
                  alt={course.instructor}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_AVATAR;
                  }}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-900">{course.instructor}</div>
                  <div className="text-[11px] text-blue-600 font-medium">{course.instructorTitle || 'Course Instructor'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal text-[11px]">({course.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.enrolledCount?.toLocaleString()} enrolled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Enrollment Card Placement (<lg only - single clean vertical flow) */}
          <div className="block lg:hidden">
            <EnrollmentCard
              course={course}
              isEnrolled={isEnrolled}
              onEnroll={handleEnroll}
            />
          </div>

          {/* What You Will Learn (Learning Outcomes) */}
          {course.learningOutcomes && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> What You Will Master
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/70 p-3 rounded-lg border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Syllabus & Curriculum Accordion */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Course Syllabus & Curriculum</h2>
                <p className="text-xs text-slate-500">
                  {course.modules.length} modules • {course.totalLessons} total lessons
                </p>
              </div>
              <button
                onClick={() => {
                  if (expandedModules.length === course.modules.length) {
                    setExpandedModules([]);
                  } else {
                    setExpandedModules(course.modules.map((_, i) => i));
                  }
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                {expandedModules.length === course.modules.length ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {course.modules.map((mod, mIdx) => {
                const isExpanded = expandedModules.includes(mIdx);
                return (
                  <div
                    key={mIdx}
                    className="rounded-xl border border-slate-200/80 bg-slate-50/40 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleModule(mIdx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs sm:text-sm text-slate-900">{mod.title}</div>
                        <div className="text-[11px] text-slate-500">{mod.lessons.length} lessons</div>
                      </div>
                      <div className="p-1 rounded-lg bg-white border border-slate-200 text-slate-500 shrink-0">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-3 pt-0 space-y-1.5 border-t border-slate-200/60">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/70 text-xs text-slate-700"
                          >
                            <span className="flex items-center gap-2.5 truncate">
                              <PlayCircle className="w-4 h-4 text-blue-600 shrink-0" />
                              <span className="truncate">{lesson.title}</span>
                            </span>
                            <span className="text-[11px] text-slate-500 shrink-0 pl-2">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructor Bio Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">About the Instructor</h3>
            <div className="flex items-start gap-4 pt-1">
              <img
                src={course.instructorAvatar || FALLBACK_AVATAR}
                alt={course.instructor}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_AVATAR;
                }}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-base">{course.instructor}</div>
                <div className="text-xs text-blue-600 font-medium">{course.instructorTitle || 'Staff Educator'}</div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  Practicing technology lead with over a decade of real-world software architecture experience. Trained over 25,000 engineering fellows across global cohorts.
                </p>
              </div>
            </div>
          </div>

          {/* Requirements & Target Audience */}
          {course.prerequisites && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Prerequisites & Target Audience</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{course.prerequisites}</p>
            </div>
          )}

          {/* Related Courses */}
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-slate-900 text-base">You May Also Be Interested In</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedCourses.map((c) => (
                <CourseCard key={c.id} course={c} isEnrolled={false} />
              ))}
            </div>
          </div>

        </div>

        {/* Right ~35% (4 Cols): Sticky Enrollment Card (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
          <EnrollmentCard
            course={course}
            isEnrolled={isEnrolled}
            onEnroll={handleEnroll}
          />
        </div>

      </div>
    </div>
  );
}

function EnrollmentCard({ course, isEnrolled, onEnroll }) {
  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="relative rounded-lg overflow-hidden aspect-[16/9] border border-slate-200 bg-slate-100 group">
        <img
          src={course.thumbnail || FALLBACK_THUMBNAIL}
          alt={course.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_THUMBNAIL;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
            <PlayCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="space-y-1 text-center">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
          {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString()}`}
        </div>
        <p className="text-[11px] text-slate-500">Full lifetime access • All future updates included</p>
      </div>

      {isEnrolled ? (
        <Link to={`/player/${course.id}`} className="block">
          <Button variant="emerald" size="lg" className="w-full font-bold" icon={PlayCircle}>
            Continue Learning
          </Button>
        </Link>
      ) : (
        <Button variant="primary" size="lg" className="w-full text-sm font-bold" onClick={onEnroll}>
          Enroll in Masterclass
        </Button>
      )}

      {/* Inclusions checklist */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
        <div className="font-bold text-slate-900 text-xs">Course Inclusions:</div>
        <ul className="space-y-2 text-slate-600 text-[11px]">
          <li className="flex items-center gap-2">
            <PlayCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{course.duration} modular on-demand lessons</span>
          </li>
          <li className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Lesson notes & downloadable repository assets</span>
          </li>
          <li className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Accredited Eduvia completion certificate</span>
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>30-day satisfaction guarantee</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
