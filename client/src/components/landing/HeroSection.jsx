import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden bg-[#0B0D0F]">
      {/* Full-screen Video Background (No dark/gradient overlay per specification) */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Restrained Liquid-Glass Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass text-xs text-[#F3F4F1] font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#19B5A5]" />
          <span>Kairo Sprint Workspace</span>
          <span className="text-[#707A84]">•</span>
          <span className="text-[#2DD4BF] font-mono text-[11px]">v1.0 Production</span>
        </motion.div>

        {/* Large Typography-Led Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F3F4F1] leading-[1.08]"
        >
          Plan sprints with precision.
          <br />
          Deliver with velocity.
        </motion.h1>

        {/* Focused Product Management Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-[#A7B0B8] max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Plan projects, balance engineering capacity, and track milestone execution from one focused workspace. Designed for high-output software teams.
        </motion.p>

        {/* Minimal Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/app"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#preview"
              className="w-full sm:w-auto px-6 py-3 rounded-xl liquid-glass text-[#F3F4F1] hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>Explore Preview</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Clean Engineering Capability Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#A7B0B8]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#19B5A5]" />
            <span>5-Stage Sprint Kanban</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#19B5A5]" />
            <span>Story Points Estimation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#19B5A5]" />
            <span>Team Workload Heatmap</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
