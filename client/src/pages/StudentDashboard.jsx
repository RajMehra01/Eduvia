import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlayCircle, 
  Award, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Flame, 
  ArrowRight, 
  GraduationCap,
  Sparkles,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_COURSES } from '../data/coursesData';
import { getUserLearningState, enrollUserInCourse } from '../services/enrollmentService';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [learningState, setLearningState] = useState(() => getUserLearningState(user));

  useEffect(() => {
    setLearningState(getUserLearningState(user));
  }, [user]);

  const enrolledCourses = learningState.enrolledCourses || [];
  const primaryActiveCourse = enrolledCourses.length > 0 ? enrolledCourses[0] : null;
  
  // Recommend courses not currently enrolled
  const recommendedCourses = SAMPLE_COURSES
    .filter(c => !enrolledCourses.some(e => e.id === c.id))
    .slice(0, 4);

  const daysOfWeek = [
    { day: 'M', active: enrolledCourses.length > 0 },
    { day: 'T', active: enrolledCourses.length > 0 },
    { day: 'W', active: enrolledCourses.length > 0 },
    { day: 'T', active: enrolledCourses.length > 0 },
    { day: 'F', active: enrolledCourses.length > 0 },
    { day: 'S', active: false },
    { day: 'S', active: false },
  ];

  const handleEnrollRecommended = (courseId) => {
    if (user) {
      enrollUserInCourse(user, courseId);
      setLearningState(getUserLearningState(user));
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 space-y-8">
      
      {/* 1. Compact Welcome Header: Dynamically tied to authenticated user */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider font-mono">
            <GraduationCap className="w-4 h-4" /> Eduvia Learner Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
            {enrolledCourses.length > 0 
              ? `Welcome back, ${user?.name || 'Learner'} 👋` 
              : `Welcome to Eduvia, ${user?.name || 'Learner'} 👋`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {enrolledCourses.length > 0 
              ? 'Continue where you left off in your technical curriculum.' 
              : 'Your learning journey starts here. Explore our courses and choose your first learning path.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {learningState.streak > 0 ? (
            <div className="px-3.5 py-1.5 rounded-xl eduvia-glass-card border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs font-mono">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{learningState.streak}-day streak 🔥</span>
            </div>
          ) : (
            <div className="px-3.5 py-1.5 rounded-xl eduvia-glass-card border border-slate-200 text-slate-600 text-xs font-medium flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Day 1 • Ready to learn</span>
            </div>
          )}
          <Link to="/courses">
            <Button variant="outline" size="sm" icon={BookOpen}>
              Explore Catalog
            </Button>
          </Link>
        </div>
      </div>

      {/* IF USER HAS ENROLLED COURSES: 2-COLUMN WORKSPACE */}
      {enrolledCourses.length > 0 && primaryActiveCourse ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Continue Learning Module (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                <PlayCircle className="w-4 h-4" /> Continue Learning
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold font-mono">
                {primaryActiveCourse.progress || 0}% Completed
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="relative aspect-[16/9] w-full sm:w-60 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <img
                  src={primaryActiveCourse.thumbnail || FALLBACK_THUMBNAIL}
                  alt={primaryActiveCourse.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_THUMBNAIL;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 min-w-0 flex-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  {primaryActiveCourse.category}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {primaryActiveCourse.title}
                </h2>
                <p className="text-xs text-slate-600 truncate">
                  Current lesson: <strong className="text-slate-800 font-medium">{primaryActiveCourse.lastLesson || 'Introduction & Architecture'}</strong>
                </p>
                
                <div className="pt-1 max-w-md">
                  <ProgressBar value={primaryActiveCourse.progress || 0} variant="blue" label="Curriculum Progress" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Instructor: <strong className="text-slate-700 font-medium">{primaryActiveCourse.instructor}</strong></span>
              <Link to={`/player/${primaryActiveCourse.id}`}>
                <Button variant="primary" size="md" icon={PlayCircle} className="font-semibold">
                  Resume Learning
                </Button>
              </Link>
            </div>
          </div>

          {/* Weekly Learning & Progress (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                <Clock className="w-4 h-4 text-blue-600" /> Weekly Progress
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">On Track ✓</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-center">
                <div className="text-2xl font-black text-slate-900 font-heading">{learningState.studyHours}h</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">Study Time</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-center">
                <div className="text-2xl font-black text-slate-900 font-heading">{learningState.completedLessonsCount}</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">Lessons Done</div>
              </div>
            </div>

            {/* Daily Activity Chart Pills */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Goal: 5 of 7 days active</span>
                <span className="font-semibold text-slate-700 font-mono">80%</span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                {daysOfWeek.map((d, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                      d.active
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-400 border border-slate-200/60'
                    }`}
                  >
                    {d.day}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 text-center">
              Consistent daily practice accelerates skill retention by 3.2x
            </div>
          </div>

        </div>
      ) : (
        /* CLEAN EMPTY STATE FOR NEW LEARNERS */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs border border-blue-100">
            <Compass className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Your learning journey starts here
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              You haven't enrolled in any masterclasses yet. Explore our curated catalog of 24 industry-aligned courses and start building in-demand skills today.
            </p>
          </div>
          <div className="pt-3">
            <Link to="/courses">
              <Button variant="primary" size="lg" icon={BookOpen} className="font-semibold px-8 shadow-xs">
                Explore All 24 Courses
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-center max-w-md mx-auto">
            <div className="p-2">
              <div className="text-xl font-bold text-slate-900 font-heading">0</div>
              <div className="text-[11px] text-slate-500">Enrolled</div>
            </div>
            <div className="p-2">
              <div className="text-xl font-bold text-slate-900 font-heading">0.0h</div>
              <div className="text-[11px] text-slate-500">Study Time</div>
            </div>
            <div className="p-2">
              <div className="text-xl font-bold text-slate-900 font-heading">0</div>
              <div className="text-[11px] text-slate-500">Certificates</div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MY COURSES (Only shown if enrolled courses exist) */}
      {enrolledCourses.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-heading">
                My Courses
              </h2>
              <p className="text-xs text-slate-500">Review your ongoing tracks and syllabus modules</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 font-mono">{enrolledCourses.length} active enrollments</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {enrolledCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={c.thumbnail || FALLBACK_THUMBNAIL}
                    alt={c.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_THUMBNAIL;
                    }}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">
                        {c.category}
                      </span>
                      <span className="text-[11px] text-slate-400">• {c.duration}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                      {c.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 truncate">
                      Instructor: <span className="font-medium text-slate-700">{c.instructor}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <ProgressBar value={c.progress || 0} variant={c.progress > 50 ? 'emerald' : 'blue'} label="Completion" />
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium truncate max-w-[200px]">
                    Next: {c.lastLesson || 'Resume Course'}
                  </span>
                  <Link to={`/player/${c.id}`}>
                    <Button variant="primary" size="sm" icon={PlayCircle}>
                      Resume
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. RECOMMENDED COURSES (Curated tracks for this learner) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-heading">
              {enrolledCourses.length > 0 ? "Recommended for You" : "Recommended Starter Masterclasses"}
            </h2>
            <p className="text-xs text-slate-500">Based on industry hiring demand and verified career curricula</p>
          </div>
          <Link to="/courses" className="text-xs font-semibold text-blue-600 hover:underline">
            View All 24 Courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendedCourses.map((c) => (
            <div key={c.id} className="flex flex-col">
              <CourseCard course={c} isEnrolled={false} onEnroll={handleEnrollRecommended} />
            </div>
          ))}
        </div>
      </div>

      {/* 6. CERTIFICATES & ACHIEVEMENTS */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">
              {learningState.certificates.length > 0 
                ? `${learningState.certificates.length} Verified Certificate${learningState.certificates.length > 1 ? 's' : ''} Earned` 
                : 'Accredited Completion Certificates'}
            </h4>
            <p className="text-xs text-slate-500">
              {learningState.certificates.length > 0
                ? 'Your credentials are cryptographically verifiable and ready to share on LinkedIn.'
                : 'Complete all syllabus lessons and pass the unit assessment to earn your accredited digital credential.'}
            </p>
          </div>
        </div>

        <Link to="/certificates" className="shrink-0">
          <Button variant="outline" size="sm" icon={ArrowRight}>
            View Certificates
          </Button>
        </Link>
      </div>

    </div>
  );
}
