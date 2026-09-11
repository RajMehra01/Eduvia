import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, ExternalLink, Calendar, Search, Sparkles, GraduationCap, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserLearningState } from '../services/enrollmentService';
import CertificateModal from '../components/CertificateModal';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function Certificates() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCert, setActiveCert] = useState(null);

  const learningState = getUserLearningState(user);
  
  // Format certificates for display
  const certificates = (learningState.certificates || []).map(cert => ({
    id: cert.id || 'EDV-CRED-8942-WD',
    courseTitle: cert.courseTitle || 'Technical Masterclass',
    studentName: cert.recipientName || user?.name || 'Eduvia Scholar',
    date: cert.issueDate || 'October 14, 2026',
    instructor: cert.instructor || 'Eduvia Lead Instructor',
    grade: 'Distinction'
  }));

  const filteredCerts = certificates.filter(c => 
    c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-700 text-xs uppercase tracking-wider font-bold font-mono">
            <GraduationCap className="w-4 h-4" /> Academic Accreditations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Verified Certificates
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Official completion credentials earned across your Eduvia learning journey.
          </p>
        </div>

        {/* Search */}
        {certificates.length > 0 && (
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by credential ID or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
            />
          </div>
        )}
      </div>

      {/* Certificate Cards Grid or Empty State */}
      {filteredCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="space-y-4">
                {/* Top Row: Icon & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {cert.id}
                      </span>
                      <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Authenticated & Verified
                      </div>
                    </div>
                  </div>

                  {cert.grade && (
                    <Badge variant="emerald" size="sm" icon={Sparkles}>
                      {cert.grade}
                    </Badge>
                  )}
                </div>

                {/* Title & Metadata */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {cert.courseTitle}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {cert.date}
                    </span>
                    <span>•</span>
                    <span>Instructor: <strong className="text-slate-700">{cert.instructor}</strong></span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Issued to: <strong className="text-slate-800">{cert.studentName}</strong></span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveCert(cert)}
                  icon={ExternalLink}
                >
                  View Certificate
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-xs text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-xs border border-amber-100">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              No certificates earned yet
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Complete any masterclass syllabus, finish the hands-on checkpoints, and pass the final assessment to earn your official verified digital credential.
            </p>
          </div>
          <div className="pt-3">
            <Link to="/courses">
              <Button variant="primary" size="lg" icon={BookOpen} className="font-semibold px-8 shadow-xs">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Certificate Modal View */}
      {activeCert && (
        <CertificateModal
          certificate={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
}
