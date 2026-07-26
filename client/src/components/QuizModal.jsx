import React, { useState } from 'react';
import { Award, X } from 'lucide-react';

export default function QuizModal({ quiz, courseTitle, instructor, onClose, onPassed }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score += 1;
    });
    const passed = score >= Math.ceil(quiz.questions.length * 0.5);
    setResult({ score, total: quiz.questions.length, passed });
    if (passed && onPassed) {
      onPassed({ courseTitle, instructor });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-xl rounded-2xl border border-slate-800 p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> {quiz.title}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {result ? (
          <div className="text-center py-6 space-y-4">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${result.passed ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-rose-500/20 border border-rose-500/40 text-rose-400'}`}>
              {result.passed ? <Award className="w-8 h-8" /> : <X className="w-8 h-8" />}
            </div>
            <h4 className="text-xl font-bold text-white">
              {result.passed ? 'Certification Granted!' : 'Quiz Attempt Failed'}
            </h4>
            <p className="text-slate-300 text-sm">
              You scored <span className="font-bold text-indigo-400">{result.score} / {result.total}</span> points.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30"
            >
              Close Assessment Window
            </button>
          </div>
        ) : (
          <div className="space-y-5 text-xs">
            {quiz.questions.map((q, qIdx) => (
              <div key={qIdx} className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-slate-200 text-sm">
                  {qIdx + 1}. {q.q}
                </div>
                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt, oIdx) => (
                    <label 
                      key={oIdx} 
                      className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        answers[qIdx] === oIdx 
                          ? 'bg-indigo-600/20 border-indigo-500/60 text-indigo-200 font-medium' 
                          : 'border-slate-800 hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${qIdx}`}
                        checked={answers[qIdx] === oIdx}
                        onChange={() => setAnswers({ ...answers, [qIdx]: oIdx })}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30"
            >
              Submit Assessment Answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
