import React, { useState } from 'react';
import { Award, ShieldCheck, Download } from 'lucide-react';
import CertificateModal from '../components/CertificateModal';

export default function Certificates() {
  const [certificates] = useState([
    {
      id: 'CERT-SKILL-8942',
      courseTitle: 'Full-Stack Modern Web Development Masterclass',
      studentName: 'Yogesh Singh Bhadoriya',
      date: 'July 26, 2026',
      instructor: 'Yogesh Singh'
    }
  ]);
  const [activeCert, setActiveCert] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Certificates & Credentials</h2>
        <p className="text-slate-400 text-xs">View authenticated digital completion certificates earned on SkillStream LMS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map(cert => (
          <div key={cert.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {cert.id}
                </span>
                <h3 className="font-bold text-slate-100 text-base mt-1">{cert.courseTitle}</h3>
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div>Issued to: <strong className="text-slate-200">{cert.studentName}</strong></div>
              <div>Issue Date: <strong className="text-slate-200">{cert.date}</strong></div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Verified Credential
              </span>
              <button
                onClick={() => setActiveCert(cert)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeCert && (
        <CertificateModal
          certificate={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
}
