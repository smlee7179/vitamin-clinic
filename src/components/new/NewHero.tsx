'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop',
    title: '환자 중심의 전문적인 치료',
    subtitle: '저희는 최신 시설과 따뜻한 마음으로 최상의 의료 서비스를 제공합니다.',
  },
  {
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1600&h=900&fit=crop',
    title: '첨단 의료 시설과 경험',
    subtitle: '최신 장비와 풍부한 임상 경험으로 안전한 치료를 약속드립니다.',
  },
];

export default function NewHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full relative">
      {/* Slider Container */}
      <div
        className="w-full overflow-hidden relative rounded-xl"
        style={{ aspectRatio: '16 / 9' }}
      >
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url("${slide.image}")`,
              }}
            >
              {/* Content Overlay */}
              <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-start justify-center text-left">
                <div className="max-w-2xl text-white">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                    {slide.title}
                  </h1>
                  <h2 className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg font-normal leading-normal mt-3">
                    {slide.subtitle}
                  </h2>
                  <Link
                    href="/contact"
                    className="mt-4 sm:mt-6 inline-flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-3 sm:h-10 sm:px-4 md:h-12 md:px-5 bg-[#f97316] text-white text-xs sm:text-sm md:text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                  >
                    <span className="truncate">온라인 예약하기</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              currentSlide === index ? 'bg-white opacity-100' : 'bg-white opacity-50 hover:opacity-75'
            }`}
            aria-label={`슬라이드 ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
