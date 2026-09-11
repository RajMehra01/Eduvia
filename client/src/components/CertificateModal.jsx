import React, { useState } from 'react';
import { X, Printer, Check, ShieldCheck, Share2, GraduationCap, Award } from 'lucide-react';
import Button from './ui/Button';

export default function CertificateModal({ certificate, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(`https://eduvia.org/verify/${certificate.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl space-y-4 my-8">
        
        {/* Actions Bar (hidden when printing) */}
        <div className="print:hidden flex items-center justify-between text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-800">Eduvia Verified Academic Credential</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyHash} icon={copied ? Check : Share2}>
              {copied ? 'Link Copied' : 'Share'}
            </Button>
            <Button variant="primary" size="sm" onClick={handlePrint} icon={Printer}>
              Print / Save PDF
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas (Academic Ivory/Cream Parchment) */}
        <div className="bg-[#fefdf9] rounded-2xl border-4 border-double border-amber-700/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl space-y-6 text-slate-900">
          
          {/* Inner Decorative Frame */}
          <div className="absolute inset-2.5 rounded-xl border border-amber-600/20 pointer-events-none" />
          <div className="absolute inset-3.5 rounded-lg border border-amber-600/10 pointer-events-none" />

          {/* Certificate Header */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 mx-auto flex items-center justify-center text-blue-700 shadow-xs">
              <GraduationCap className="w-7 h-7 text-blue-600" />
            </div>
            
            <div className="space-y-1">
              <div className="text-xs tracking-[0.25em] text-blue-800 uppercase font-bold font-heading">
                EDUVIA ONLINE LEARNING ACADEMY
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                Certificate of Completion
              </h2>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
              CREDENTIAL ID: <span className="font-bold text-blue-700">{certificate.id}</span>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="text-center space-y-4 relative z-10 py-1">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              This is to certify that
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              {certificate.studentName}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              has successfully completed all required lectures, curriculum coursework, practical exercises, and passed the comprehensive assessment for
            </p>
            <div className="text-base sm:text-lg font-bold text-blue-900 bg-blue-50/90 py-3 px-6 rounded-xl border border-blue-200 max-w-lg mx-auto shadow-xs">
              {courseTitle(certificate.courseTitle)}
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-amber-600/20 grid grid-cols-3 items-end text-xs relative z-10">
            <div className="text-left space-y-1">
              <div className="font-semibold text-slate-800 text-xs">{certificate.date}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Date of Issue</div>
            </div>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-500/60 flex items-center justify-center mx-auto text-amber-800 shadow-xs">
                <Award className="w-6 h-6 text-amber-700" />
              </div>
              <div className="text-[9px] text-amber-800 font-bold uppercase tracking-wider">
                Eduvia Accredited
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="font-semibold text-slate-800 text-xs">{certificate.instructor || 'Lead Instructor'}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Course Instructor</div>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100 font-mono">
            Verify online at https://eduvia.org/verify/{certificate.id}
          </div>

        </div>
      </div>
    </div>
  );
}

function courseTitle(title) {
  return title || 'Professional Certification Course';
}
