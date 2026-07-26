import React from 'react';
import { GraduationCap, X } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-amber-500/40 p-8 space-y-6 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header */}
        <div className="text-center space-y-2 border-b border-amber-500/20 pb-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-300">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-amber-400 tracking-widest uppercase">Certificate of Completion</h2>
          <p className="text-xs text-slate-400 font-mono">VERIFICATION ID: {certificate.id}</p>
        </div>

        {/* Certificate Content */}
        <div className="text-center space-y-4 py-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">This is proudly presented to</p>
          <h3 className="text-3xl font-extrabold text-white gradient-text">{certificate.studentName}</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            for successfully completing all module lessons, interactive exercises, and passing the final certification assessment for
          </p>
          <div className="text-lg font-bold text-indigo-300 bg-indigo-950/50 py-2 px-4 rounded-xl border border-indigo-500/30 max-w-lg mx-auto">
            {certificate.courseTitle}
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-6 border-t border-amber-500/20 flex items-end justify-between text-xs">
          <div className="text-left space-y-1">
            <div className="font-semibold text-slate-200">{certificate.date}</div>
            <div className="text-[10px] text-slate-500">Date of Issue</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-bold text-amber-400 italic font-serif text-sm">SkillStream LMS</div>
            <div className="text-[10px] text-slate-500">Authorized Platform</div>
          </div>
          <div className="text-right space-y-1">
            <div className="font-bold text-indigo-300 font-serif">{certificate.instructor}</div>
            <div className="text-[10px] text-slate-500">Lead Course Instructor</div>
          </div>
        </div>
      </div>
    </div>
  );
}
