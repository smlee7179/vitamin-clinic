'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  order: number;
  active: boolean;
}

export default function NewHeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/hero-slides');
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      }
    } catch (error) {
      console.error('Failed to fetch hero slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="w-full relative">
        <div className="w-full h-[550px] bg-gray-200 animate-pulse" />
      </section>
    );
  }

  if (slides.length === 0) {
    // Default slide if no slides configured
    return (
      <section className="w-full relative">
        <div className="w-full h-[550px] overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=1080&fit=crop')`,
            }}
          />
        </div>
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 flex flex-col items-start justify-center text-left">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
              환자 중심의 전문적인 치료
            </h1>
            <h2 className="text-white/90 text-sm sm:text-base font-normal leading-normal mt-3">
              저희는 최신 시설과 따뜻한 마음으로 최상의 의료 서비스를 제공합니다.
            </h2>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-[#f97316] text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
            >
              <span className="truncate">온라인 예약하기</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full relative">
      <div className="w-full h-[550px] overflow-hidden">
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${slide.imageUrl}')`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 max-w-6xl mx-auto px-4 flex flex-col items-start justify-center text-left">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
            {slides[currentSlide].title}
          </h1>
          {slides[currentSlide].description && (
            <h2 className="text-white/90 text-sm sm:text-base font-normal leading-normal mt-3">
              {slides[currentSlide].description}
            </h2>
          )}
          {slides[currentSlide].buttonText && slides[currentSlide].buttonLink && (
            <Link
              href={slides[currentSlide].buttonLink || '/contact'}
              className="mt-6 inline-flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-[#f97316] text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
            >
              <span className="truncate">{slides[currentSlide].buttonText}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition ${
                index === currentSlide
                  ? 'bg-white opacity-100'
                  : 'bg-white opacity-50 hover:opacity-100'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
