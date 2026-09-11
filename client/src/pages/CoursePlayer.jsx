import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  PlayCircle, 
  CheckCircle2, 
  Award, 
  Layers, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Download, 
  Check, 
  X,
  Menu,
  GraduationCap
} from 'lucide-react';
import { SAMPLE_COURSES } from '../data/coursesData';
import QuizModal from '../components/QuizModal';
import CertificateModal from '../components/CertificateModal';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { updateCourseLessonProgress, getUserLearningState } from '../services/enrollmentService';

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const course = SAMPLE_COURSES.find((c) => c.id === id) || SAMPLE_COURSES[0];

  // Flatten all lessons across modules for simple next/prev traversal
  const allLessons = useMemo(() => {
    return course.modules?.flatMap((m) => m.lessons) || [];
  }, [course]);

  const userState = getUserLearningState(user);
  const enrolledRecord = userState.enrolledCourses.find((c) => c.id === course.id);
  const initialCompleted = enrolledRecord?.completedLessons || (enrolledRecord ? ['l1'] : []);

  const [currentLesson, setCurrentLesson] = useState(allLessons[0] || null);
  const [completedLessonIds, setCompletedLessonIds] = useState(initialCompleted);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'notes' | 'resources'
  const [showQuiz, setShowQuiz] = useState(false);
  const [issuedCertificate, setIssuedCertificate] = useState(null);
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState(false);

  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const progressPercent = allLessons.length > 0 ? Math.round((completedLessonIds.length / allLessons.length) * 100) : 0;

  const toggleLessonComplete = (lessonId) => {
    const isCurrentlyDone = completedLessonIds.includes(lessonId);
    const updated = isCurrentlyDone
      ? completedLessonIds.filter((lid) => lid !== lessonId)
      : [...completedLessonIds, lessonId];
    setCompletedLessonIds(updated);
    if (user) {
      updateCourseLessonProgress(user, course.id, lessonId, !isCurrentlyDone);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLesson(allLessons[currentLessonIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLesson(allLessons[currentLessonIndex - 1]);
    }
  };

  const handleQuizPassed = () => {
    const cert = {
      id: `EDV-${Date.now().toString().slice(-6)}`,
      courseTitle: course.title,
      studentName: user?.name || 'Learner',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      instructor: course.instructor
    };
    setIssuedCertificate(cert);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Learning Navigation Bar */}
      <div className="border-b border-slate-200 bg-white px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-xs sticky top-16 z-30">
        <div className="flex items-center gap-3 truncate">
          <Link
            to="/courses"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Catalog</span>
          </Link>
          <div className="h-4 w-px bg-slate-200 shrink-0" />
          <div className="truncate">
            <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{course.title}</h1>
            <span className="text-[11px] text-slate-500 truncate hidden md:inline">
              Module: {course.modules.find(m => m.lessons.some(l => l.id === currentLesson?.id))?.title || 'Syllabus'}
            </span>
          </div>
        </div>

        {/* Progress & Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="text-right">
              <div className="text-[10px] text-slate-500 font-medium">Progress</div>
              <div className="text-xs font-bold text-blue-700">{progressPercent}%</div>
            </div>
            <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Mobile Syllabus Toggle Button */}
          <button
            onClick={() => setMobileSyllabusOpen(!mobileSyllabusOpen)}
            className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Syllabus</span>
          </button>

          {course.quiz && (
            <Button
              variant="emerald"
              size="sm"
              onClick={() => setShowQuiz(true)}
              icon={Award}
            >
              Take Quiz
            </Button>
          )}
        </div>
      </div>

      {/* Main Learning Workspace with Reddit-like independent scrolling */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 relative lg:h-[calc(100vh-8rem)]">
        
        {/* Left / Center: Video Player & Contextual Tabs (8 Cols) */}
        <div className="lg:col-span-8 p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto lg:h-full">
          
          {/* Video Container */}
          <div className="rounded-xl overflow-hidden bg-slate-950 shadow-xs relative aspect-video flex items-center justify-center">
            {currentLesson ? (
              <video
                key={currentLesson.id}
                controls
                className="w-full h-full object-cover"
                poster={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
              >
                <source src={currentLesson.videoUrl} type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
            ) : (
              <div className="text-center p-6 space-y-2 text-white">
                <PlayCircle className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-300">Select a lesson to begin playback</p>
              </div>
            )}
          </div>

          {/* Lesson Action Controls */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">
                  Lesson {currentLessonIndex + 1} of {allLessons.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">{currentLesson?.duration}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">
                {currentLesson?.title || 'Lesson Overview'}
              </h2>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end shrink-0">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentLessonIndex === 0}
                onClick={handlePrevLesson}
                icon={ChevronLeft}
              >
                Prev
              </Button>

              <Button
                variant={completedLessonIds.includes(currentLesson?.id) ? 'emerald' : 'primary'}
                size="sm"
                onClick={() => toggleLessonComplete(currentLesson?.id)}
                icon={completedLessonIds.includes(currentLesson?.id) ? Check : CheckCircle2}
              >
                {completedLessonIds.includes(currentLesson?.id) ? 'Completed' : 'Mark Complete'}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                disabled={currentLessonIndex === allLessons.length - 1}
                onClick={handleNextLesson}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Tab Navigation: Overview | Notes | Resources */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Lesson Notes
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'resources'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Resources & Code
              </button>
            </div>

            {/* Tab Contents: Overview */}
            {activeTab === 'overview' && (
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4 text-xs leading-relaxed text-slate-600">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">{course.title}</h3>
                  <p>{course.description}</p>
                </div>

                {course.learningOutcomes && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="font-bold text-slate-900">What You Will Master:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {course.learningOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                  <div className="text-slate-500">Instructor: <strong className="text-slate-900">{course.instructor}</strong></div>
                  <span>•</span>
                  <div className="text-slate-500">Level: <strong className="text-slate-900">{course.level}</strong></div>
                  <span>•</span>
                  <div className="text-slate-500">Duration: <strong className="text-slate-900">{course.duration}</strong></div>
                </div>
              </div>
            )}

            {/* Tab Contents: Notes */}
            {activeTab === 'notes' && (
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-3 text-xs leading-relaxed text-slate-600">
                <h3 className="text-sm font-bold text-slate-900">Session Notes & Architecture Concepts</h3>
                <p>
                  In this session, we examine practical patterns for building scalable components and managing lifecycles. Follow along with code exercises and test your understanding at curriculum milestones.
                </p>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="font-bold text-slate-900">Key Takeaways:</div>
                  <div>• Practice component composition for maximum reusability</div>
                  <div>• Maintain proper state lifecycles to prevent unwanted re-renders</div>
                  <div>• Verify responsive touch targets on mobile viewports</div>
                </div>
              </div>
            )}

            {/* Tab Contents: Resources */}
            {activeTab === 'resources' && (
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-3 text-xs text-slate-600">
                <h3 className="text-sm font-bold text-slate-900">Downloadable Repository Assets</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2.5 text-slate-800 font-medium">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>starter-code-repository.zip</span>
                    </div>
                    <Button variant="outline" size="sm" icon={Download}>Download</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2.5 text-slate-800 font-medium">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>architecture-summary-guide.pdf</span>
                    </div>
                    <Button variant="outline" size="sm" icon={Download}>Download</Button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Desktop Syllabus Sidebar (4 Cols) - Independent scrolling context */}
        <div className="hidden lg:block lg:col-span-4 border-l border-slate-200 bg-white p-5 space-y-4 overflow-y-auto lg:h-full">
          <SyllabusContent
            course={course}
            allLessons={allLessons}
            currentLesson={currentLesson}
            completedLessonIds={completedLessonIds}
            onSelectLesson={setCurrentLesson}
            onLaunchQuiz={() => setShowQuiz(true)}
          />
        </div>

      </div>

      {/* Mobile Syllabus Drawer */}
      {mobileSyllabusOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-full max-w-sm bg-white h-full p-5 space-y-4 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" /> Course Syllabus
              </div>
              <button
                onClick={() => setMobileSyllabusOpen(false)}
                className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <SyllabusContent
              course={course}
              allLessons={allLessons}
              currentLesson={currentLesson}
              completedLessonIds={completedLessonIds}
              onSelectLesson={(lesson) => {
                setCurrentLesson(lesson);
                setMobileSyllabusOpen(false);
              }}
              onLaunchQuiz={() => {
                setShowQuiz(true);
                setMobileSyllabusOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Quiz Assessment Modal */}
      {showQuiz && course.quiz && (
        <QuizModal
          quiz={course.quiz}
          courseTitle={course.title}
          instructor={course.instructor}
          onClose={() => setShowQuiz(false)}
          onPassed={handleQuizPassed}
        />
      )}

      {/* Verified Certificate Modal */}
      {issuedCertificate && (
        <CertificateModal
          certificate={issuedCertificate}
          onClose={() => setIssuedCertificate(null)}
        />
      )}
    </div>
  );
}

function SyllabusContent({ course, allLessons, currentLesson, completedLessonIds, onSelectLesson, onLaunchQuiz }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs pb-1">
        <span className="font-semibold text-slate-500">
          {completedLessonIds.length} of {allLessons.length} lessons completed
        </span>
      </div>

      <div className="space-y-3.5">
        {course.modules.map((mod, mIdx) => (
          <div key={mIdx} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2.5">
            <div className="font-bold text-xs text-slate-800 flex items-center justify-between">
              <span className="truncate pr-2">{mod.title}</span>
              <span className="text-[10px] text-slate-400 shrink-0 font-medium">{mod.lessons.length} lessons</span>
            </div>

            <div className="space-y-1.5">
              {mod.lessons.map((lesson) => {
                const isSelected = currentLesson?.id === lesson.id;
                const isDone = completedLessonIds.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isDone ? (
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                      ) : (
                        <PlayCircle className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <span className={`text-[10px] shrink-0 pl-2 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {lesson.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Assessment Action */}
      {course.quiz && (
        <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-800 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-600" /> Final Assessment
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Finish all module lessons and achieve 70%+ on the exam to earn your certificate.
          </p>
          <Button
            variant="primary"
            size="sm"
            className="w-full text-xs font-bold"
            onClick={onLaunchQuiz}
          >
            Launch Assessment
          </Button>
        </div>
      )}
    </div>
  );
}
