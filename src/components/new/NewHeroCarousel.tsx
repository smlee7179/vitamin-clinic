'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  aspectRatio: string | null;
  order: number;
  active: boolean;
}

export default function NewHeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string>('051-469-7581');
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9); // Default 16:9

  useEffect(() => {
    fetchSlides();
    fetchPhoneNumber();
  }, []);

  const fetchPhoneNumber = async () => {
    try {
      const response = await fetch('/api/hospital-info');
      if (response.ok) {
        const data = await response.json();
        if (data.phone) {
          setPhoneNumber(data.phone);
        }
      }
    } catch (error) {
      console.error('Failed to fetch phone number:', error);
    }
  };

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

        // Calculate aspect ratio from first slide's image
        if (data.length > 0 && data[0].imageUrl) {
          const img = new window.Image();
          img.onload = () => {
            const ratio = img.width / img.height;
            setAspectRatio(ratio);
          };
          img.src = data[0].imageUrl;
        }
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
        <div
          className="w-full bg-gray-200 animate-pulse rounded-xl"
          style={{ aspectRatio: aspectRatio.toString() }}
        />
      </section>
    );
  }

  if (slides.length === 0) {
    // Default slide if no slides configured
    return (
      <section className="w-full relative">
        <div
          className="w-full relative overflow-hidden rounded-xl bg-gray-900"
          style={{ aspectRatio: aspectRatio.toString() }}
        >
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=1080&fit=crop"
            alt="병원 환경"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50 pointer-events-none" />
        </div>
        <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center p-6 md:p-12">
          <div className="flex flex-col gap-3 text-center max-w-3xl">
            <h1 className="text-white text-3xl font-black leading-tight tracking-tight md:text-4xl lg:text-5xl whitespace-pre-wrap">
              환자 중심의 전문적인 치료
            </h1>
            <h2 className="text-white text-base font-normal leading-normal md:text-lg lg:text-xl whitespace-pre-wrap">
              저희는 최신 시설과 따뜻한 마음으로 최상의 의료 서비스를 제공합니다.
            </h2>
            <a
              href={`tel:${phoneNumber.replace(/[\s-]/g, '')}`}
              className="mt-3 inline-flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-[#f97316] text-white text-sm md:text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#ea580c] transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
              <span className="truncate">전화 상담</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full relative">
      <div
        className="w-full relative overflow-hidden rounded-xl bg-gray-900"
        style={{ aspectRatio: aspectRatio.toString() }}
      >
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center p-6 md:p-12">
        <div className="flex flex-col gap-3 text-center max-w-3xl">
          <h1 className="text-white text-3xl font-black leading-tight tracking-tight md:text-4xl lg:text-5xl whitespace-pre-wrap">
            {slides[currentSlide].title}
          </h1>
          {slides[currentSlide].description && (
            <h2 className="text-white text-base font-normal leading-normal md:text-lg lg:text-xl whitespace-pre-wrap">
              {slides[currentSlide].description}
            </h2>
          )}
          {slides[currentSlide].buttonText && (
            <>
              {slides[currentSlide].buttonLink ? (
                // 링크 버튼
                <Link
                  href={slides[currentSlide].buttonLink}
                  className="mt-3 inline-flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-[#f97316] text-white text-sm md:text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#ea580c] transition-colors shadow-lg"
                >
                  <span className="truncate">{slides[currentSlide].buttonText}</span>
                </Link>
              ) : (
                // 전화 버튼
                <a
                  href={`tel:${phoneNumber.replace(/[\s-]/g, '')}`}
                  className="mt-3 inline-flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-[#f97316] text-white text-sm md:text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#ea580c] transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                  <span className="truncate">{slides[currentSlide].buttonText}</span>
                </a>
              )}
            </>
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
