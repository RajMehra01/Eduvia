import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
      <div className="panel-slate rounded-3xl p-10 sm:p-16 border border-[#222b3e] space-y-6 relative overflow-hidden">
        {/* Subtle Background Radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-60 bg-indigo-900/15 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            Ready to Accelerate?
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight leading-tight">
            Bring every project into <span className="font-serif-editorial italic font-normal text-indigo-300">focus</span>.
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
            Plan work, align engineering capacity, and keep delivery moving from one unified workspace.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/app"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Kairo Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <Link
              to="/app/kanban"
              className="px-5 py-3 rounded-xl bg-[#141824] hover:bg-[#181f30] text-slate-200 border border-[#222b3e] font-semibold text-xs transition-colors"
            >
              Open Direct Sprint Kanban
            </Link>
          </div>

          <div className="pt-4 text-[11px] text-slate-500 font-mono">
            Zero setup required • Instant local evaluation • Dual-mode persistence
          </div>
        </div>
      </div>
    </section>
  );
}
