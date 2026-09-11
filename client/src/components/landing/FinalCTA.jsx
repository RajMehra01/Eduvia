import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
      <div className="panel-slate rounded-2xl p-10 sm:p-14 border border-[#1D2329] space-y-6 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold text-[#2DD4BF] uppercase tracking-wider">
            Ready to Execute?
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#F3F4F1] tracking-tight leading-tight">
            Bring every sprint into focus.
          </h2>

          <p className="text-xs sm:text-sm text-[#A7B0B8] leading-relaxed max-w-lg mx-auto">
            Plan work, balance engineering capacity, and keep delivery moving from one unified workspace.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/app"
                className="px-6 py-3 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <Link
              to="/app/kanban"
              className="px-5 py-3 rounded-xl bg-[#171C21] hover:bg-[#1D2329] text-[#F3F4F1] border border-[#1D2329] font-semibold text-xs transition-colors"
            >
              Open Direct Sprint Kanban
            </Link>
          </div>

          <div className="pt-4 text-[11px] text-[#707A84] font-mono">
            Zero setup required • Instant local evaluation • Dual-mode persistence
          </div>
        </div>
      </div>
    </section>
  );
}
