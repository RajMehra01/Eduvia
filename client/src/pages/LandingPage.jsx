import React, { useEffect } from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import ProductPreview from '../components/landing/ProductPreview';
import ProductStory from '../components/landing/ProductStory';
import TestimonialReveal from '../components/landing/TestimonialReveal';
import FeatureShowcase from '../components/landing/FeatureShowcase';
import FinalCTA from '../components/landing/FinalCTA';
import LandingFooter from '../components/landing/LandingFooter';

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <LandingNavbar />
      <main>
        <HeroSection />
        <ProductPreview />
        <ProductStory />
        <TestimonialReveal />
        <FeatureShowcase />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
