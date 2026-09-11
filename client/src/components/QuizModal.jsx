import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, X, RotateCcw, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';

export default function QuizModal({ quiz, courseTitle, instructor, onClose, onPassed }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score += 1;
    });
    const passingThreshold = Math.ceil(quiz.questions.length * 0.7); // 70% passing threshold
    const passed = score >= passingThreshold;
    const res = { score, total: quiz.questions.length, passed };
    setResult(res);

    if (passed && onPassed) {
      onPassed({ courseTitle, instructor });
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{quiz.title}</h3>
              <p className="text-xs text-slate-500">70% passing score required to earn verified credential</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Screen */}
        {result ? (
          <div className="text-center py-6 space-y-5">
            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
              result.passed 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-xs' 
                : 'bg-rose-50 border border-rose-200 text-rose-600 shadow-xs'
            }`}>
              {result.passed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl font-bold text-slate-900">
                {result.passed ? 'Assessment Passed! Certificate Granted' : 'Assessment Not Passed'}
              </h4>
              <p className="text-xs text-slate-600">
                You achieved a score of <strong className="text-slate-900 font-bold">{result.score}</strong> out of <strong className="text-slate-900 font-bold">{result.total}</strong> questions.
              </p>
              {result.passed && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Eduvia Verified Certificate Ready
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              {result.passed ? (
                <Button variant="emerald" size="md" onClick={onClose}>
                  Done & View Certificate
                </Button>
              ) : (
                <>
                  <Button variant="secondary" size="md" onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="primary" size="md" onClick={handleRetry} icon={RotateCcw}>
                    Retake Quiz
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Question List */
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
              {quiz.questions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="font-semibold text-slate-900">
                    <span className="text-blue-600 font-bold mr-1">Q{qIdx + 1}.</span> {q.q}
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                          answers[qIdx] === optIdx
                            ? 'bg-blue-50 border-blue-400 text-blue-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${qIdx}`}
                          checked={answers[qIdx] === optIdx}
                          onChange={() => setAnswers({ ...answers, [qIdx]: optIdx })}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-slate-500 text-[11px]">
                {Object.keys(answers).length} of {quiz.questions.length} answered
              </span>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={Object.keys(answers).length < quiz.questions.length}
              >
                Submit Assessment
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
