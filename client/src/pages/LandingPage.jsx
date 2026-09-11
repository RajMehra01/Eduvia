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
    <div className="min-h-screen bg-[#0B0D0F] text-[#F3F4F1] selection:bg-[#19B5A5]/30 selection:text-[#2DD4BF]">
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
