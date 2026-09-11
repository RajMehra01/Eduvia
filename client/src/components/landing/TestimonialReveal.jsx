import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ['#64748b', '#f1f5f9']);

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.28em] transition-colors">
      {children}
    </motion.span>
  );
}

export default function TestimonialReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.3']
  });

  const quote =
    "Kairo brought an unprecedented level of clarity to our sprint cycles. Our team velocity increased by 38% within the first month because engineering priorities and capacity were finally in sync.";

  const words = quote.split(' ');

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[60vh] flex flex-col justify-center relative"
    >
      <div className="panel-slate rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#20283c] space-y-8 relative overflow-hidden">
        {/* Subtle Decorative Quote Icon */}
        <Quote className="w-12 h-12 text-indigo-500/20 absolute top-6 right-8 pointer-events-none" />

        <div className="space-y-4">
          <span className="text-[11px] font-mono font-semibold text-indigo-400 uppercase tracking-wider block">
            Engineering Perspective • ScaleGrid Infrastructure
          </span>

          {/* Scroll-Driven Word Reveal Headline */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.35] tracking-tight font-sans">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </div>
        </div>

        {/* Author Details Row */}
        <div className="flex items-center gap-3.5 pt-4 border-t border-[#1c2436]">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
            alt="Elena Rostova"
            className="w-11 h-11 rounded-xl object-cover border border-indigo-400/40"
          />
          <div>
            <h4 className="font-bold text-slate-100 text-sm">Elena Rostova</h4>
            <p className="text-xs text-indigo-300">VP of Engineering, ScaleGrid Systems</p>
            <p className="text-[10px] text-slate-400 font-mono">Verified Production Customer Evaluation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
