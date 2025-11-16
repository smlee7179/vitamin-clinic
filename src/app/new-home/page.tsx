'use client';

import { useEffect, useState } from 'react';
import ModernHeader from '@/components/modern/ModernHeader';
import ModernHero from '@/components/modern/ModernHero';
import ModernMarquee from '@/components/modern/ModernMarquee';
import ModernFeatures from '@/components/modern/ModernFeatures';
import ModernServices from '@/components/modern/ModernServices';
import ModernTreatments from '@/components/modern/ModernTreatments';
import ModernGallery from '@/components/modern/ModernGallery';
import ModernFAQ from '@/components/modern/ModernFAQ';
import ModernFooter from '@/components/modern/ModernFooter';

export default function NewHomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <ModernHeader scrolled={scrolled} />

      <main className="overflow-hidden">
        <ModernHero />
        <ModernMarquee />
        <ModernFeatures />
        <ModernServices />
        <ModernTreatments />
        <ModernGallery />
        <ModernFAQ />
      </main>

      <ModernFooter />
    </div>
  );
}
