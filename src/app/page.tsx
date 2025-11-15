'use client';

import HeroSection from '@/components/home/HeroSection';
import ServiceCards from '@/components/home/ServiceCards';
import FeatureSection from '@/components/home/FeatureSection';
import ImageGallery from '@/components/home/ImageGallery';
import TreatmentSection from '@/components/TreatmentSection';
import FAQSection from '@/components/FAQSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServiceCards />
        <FeatureSection />
        <ImageGallery />
        <TreatmentSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
