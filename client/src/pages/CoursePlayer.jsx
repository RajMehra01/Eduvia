import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Award, Layers, Video, ArrowLeft } from 'lucide-react';
import { SAMPLE_COURSES } from './Courses';
import QuizModal from '../components/QuizModal';

export default function CoursePlayer() {
  const { id } = useParams();
  const course = SAMPLE_COURSES.find(c => c.id === id) || SAMPLE_COURSES[0];
  
  const [currentLesson, setCurrentLesson] = useState(course.modules[0]?.lessons[0] || null);
  const [completedLessonIds, setCompletedLessonIds] = useState(['l1', 'l2']);
  const [showQuiz, setShowQuiz] = useState(false);

  const toggleLesson = (lId) => {
    if (completedLessonIds.includes(lId)) {
      setCompletedLessonIds(completedLessonIds.filter(i => i !== lId));
    } else {
      setCompletedLessonIds([...completedLessonIds, lId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          to="/courses"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-medium">
          {course.category} • {course.level} Level
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Player & Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative">
            {currentLesson ? (
              <video 
                key={currentLesson.id}
                controls 
                className="w-full aspect-video bg-black object-cover"
                poster={course.thumbnail}
              >
                <source src={currentLesson.videoUrl} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center text-slate-400">
                <Video className="w-12 h-12 text-slate-600 mb-2" />
                <p>Select a lesson from the syllabus.</p>
              </div>
            )}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-100">{currentLesson?.title || course.title}</h2>
                <p className="text-xs text-slate-400">Instructor: {course.instructor}</p>
              </div>
              {currentLesson && (
                <button 
                  onClick={() => toggleLesson(currentLesson.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    completedLessonIds.includes(currentLesson.id) 
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {completedLessonIds.includes(currentLesson.id) ? 'Completed' : 'Mark Complete'}
                </button>
              )}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-white">Course Overview</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>
          </div>
        </div>

        {/* Right Column: Syllabus Accordion & Quiz Trigger */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Syllabus
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {completedLessonIds.length} done
              </span>
            </div>

            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {course.modules.map((mod, mIdx) => (
                <div key={mIdx} className="bg-slate-900/70 rounded-xl p-3 border border-slate-800 space-y-2">
                  <div className="font-semibold text-xs text-slate-200">{mod.title}</div>
                  <div className="space-y-1">
                    {mod.lessons.map(lesson => {
                      const isSelected = currentLesson?.id === lesson.id;
                      const isDone = completedLessonIds.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => setCurrentLesson(lesson)}
                          className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-all ${
                            isSelected ? 'bg-indigo-600/30 border border-indigo-500/50 text-white font-medium' : 'hover:bg-slate-800/60 text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            {isDone ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <PlayCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                            <span className="truncate">{lesson.title}</span>
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{lesson.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {course.quiz && (
              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-300" /> Take Certification Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showQuiz && course.quiz && (
        <QuizModal 
          quiz={course.quiz}
          courseTitle={course.title}
          instructor={course.instructor}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
