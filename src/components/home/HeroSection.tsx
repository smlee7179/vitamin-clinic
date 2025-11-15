'use client';

import { useState, useEffect } from 'react';

interface HeroData {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

const DEFAULT_HERO: HeroData = {
  title: '따뜻한 마음으로 치료하는\n비타민마취통증의학과',
  subtitle: '부산 동구 중앙대로 375 | 051-469-7581\n노인 전문 마취통증의학과, 맞춤 재활 및 통증 치료',
  buttonText: '전화 문의하기',
  buttonLink: 'tel:051-469-7581',
  backgroundImage: '/gallery1.jpg',
};

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>(DEFAULT_HERO);

  useEffect(() => {
    // Load data from API
    const loadHeroData = async () => {
      console.log('🔍 [HeroSection] Starting to load hero data...');
      console.log('🔍 [HeroSection] Current default state:', DEFAULT_HERO);

      try {
        const response = await fetch('/api/content?section=hero');
        console.log('🔍 [HeroSection] API response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('🔍 [HeroSection] Data received from API:', data);
          console.log('🔍 [HeroSection] backgroundImage in API response:', data.backgroundImage);

          if (data && Object.keys(data).length > 0) {
            setHeroData(prev => {
              const newHeroData = {
                ...prev,
                ...data
              };
              console.log('🔍 [HeroSection] Previous state:', prev);
              console.log('🔍 [HeroSection] New merged state:', newHeroData);
              console.log('🔍 [HeroSection] backgroundImage in new state:', newHeroData.backgroundImage);
              return newHeroData;
            });
          } else {
            console.log('⚠️ [HeroSection] API returned empty data, using defaults');
          }
        } else {
          console.log('❌ [HeroSection] API response not OK:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('❌ [HeroSection] Error loading hero data:', error);
        // Keep default data on error
      }
    };

    loadHeroData();
  }, []);


  // Log when rendering
  console.log('🎨 [HeroSection] Rendering with heroData:', heroData);
  console.log('🎨 [HeroSection] backgroundImage for render:', heroData.backgroundImage);

  return (
    <section className="relative w-full min-h-[480px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-white pt-[56px] md:pt-[64px]">
      {/* 배경 이미지 - 항상 표시 */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroData.backgroundImage || '/gallery1.jpg'})` }}
        >
          {/* 비타민 색상 그라디언트 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-br from-vitamin-500/80 via-vitamin-400/70 to-vitamin-300/60" />
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="container relative z-10 flex flex-col items-center text-center py-16 md:py-24">
        {/* 메인 타이틀 */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 whitespace-pre-line max-w-4xl text-white">
          {heroData.title}
        </h1>

        {/* 서브타이틀 */}
        <p className="text-body-1 md:text-lg mb-8 md:mb-12 whitespace-pre-line max-w-2xl text-white/95">
          {heroData.subtitle}
        </p>

        {/* CTA 버튼 */}
        <a
          href={heroData.buttonLink || 'tel:051-469-7581'}
          className="btn btn-primary text-lg px-8 transition-all duration-300 ease-in-out"
          style={{ minWidth: '180px' }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="transition-opacity duration-300">{heroData.buttonText || '전화 문의하기'}</span>
        </a>
      </div>
    </section>
  );
}
