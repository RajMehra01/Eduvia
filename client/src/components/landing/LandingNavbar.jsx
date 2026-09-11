import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Menu, X } from 'lucide-react';

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0D0F]/90 backdrop-blur-md border-b border-[#1D2329] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#19B5A5] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4 text-[#0B0D0F]" />
            </div>
            <span className="font-bold text-base text-[#F3F4F1] tracking-tight">
              Kairo
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171C21] text-[#2DD4BF] border border-[#262F38]">
              PM
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#A7B0B8]">
            <a href="#overview" className="hover:text-[#F3F4F1] transition-colors">
              Overview
            </a>
            <a href="#story" className="hover:text-[#F3F4F1] transition-colors">
              Philosophy
            </a>
            <a href="#features" className="hover:text-[#F3F4F1] transition-colors">
              Capabilities
            </a>
            <a href="#reviews" className="hover:text-[#F3F4F1] transition-colors">
              Reviews
            </a>
            <Link to="/app" className="text-[#2DD4BF] hover:text-[#19B5A5] transition-colors">
              Workspace Live Demo
            </Link>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/app"
            className="text-xs font-medium text-[#A7B0B8] hover:text-[#F3F4F1] px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/app"
            className="px-4 py-2 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] font-semibold text-xs transition-all flex items-center gap-1.5"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#A7B0B8] hover:text-[#F3F4F1]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12161A] border-b border-[#1D2329] px-4 py-4 space-y-3">
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#A7B0B8] hover:text-[#F3F4F1] py-1"
          >
            Overview
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#A7B0B8] hover:text-[#F3F4F1] py-1"
          >
            Philosophy
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#A7B0B8] hover:text-[#F3F4F1] py-1"
          >
            Capabilities
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#A7B0B8] hover:text-[#F3F4F1] py-1"
          >
            Reviews
          </a>
          <div className="pt-2 border-t border-[#1D2329] flex flex-col gap-2">
            <Link
              to="/app"
              className="w-full text-center py-2 rounded-xl bg-[#19B5A5] text-[#0B0D0F] font-semibold text-xs"
            >
              Launch Workspace
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
