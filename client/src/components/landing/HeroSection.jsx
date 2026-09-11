import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
      {/* Background Subtle Radial Glow (Restrained Slate & Indigo, NOT neon) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-900/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Announcement Tag Pill (Liquid Glass) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-pill text-xs text-slate-300 font-medium cursor-default"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Kairo v1.0 Production Architecture</span>
          <span className="text-slate-400">•</span>
          <span className="text-indigo-400 font-mono text-[11px]">Sprint Velocity Telemetry</span>
        </motion.div>

        {/* Hero Main Headline with Editorial Serif Accent */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-[1.08]"
        >
          Plan with <span className="font-serif-editorial italic font-normal text-indigo-300">precision</span>.
          <br />
          Ship with <span className="font-serif-editorial italic font-normal text-slate-300">velocity</span>.
        </motion.h1>

        {/* Concise Project Management Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Plan projects, balance engineering capacity, and track deliverable milestones from one focused workspace. Designed for high-velocity software teams.
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/app"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#preview"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#141824] hover:bg-[#181f30] text-slate-200 border border-[#222b3e] font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-indigo-400" />
              <span>Explore Architecture Preview</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>5-Stage Sprint Kanban</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Story Points Estimation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Team Workload Heatmap</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
