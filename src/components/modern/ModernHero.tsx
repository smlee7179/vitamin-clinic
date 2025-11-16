'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ModernHero() {
  const [heroData, setHeroData] = useState({
    title: '통증 없는 일상을 위한',
    subtitle: '비타민마취통증의학과',
    description: '환자 한 분 한 분의 통증을 정확히 진단하고, 개인별 맞춤 치료를 제공합니다.',
    imageUrl: '',
    ctaText: '진료 예약하기',
    ctaPhone: '051-469-7581',
  });

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const response = await fetch('/api/content?section=hero');
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setHeroData((prev) => ({ ...prev, ...data }));
          }
        }
      } catch (error) {
        console.error('Failed to load hero data:', error);
      }
    };
    loadHeroData();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50/30 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(249 115 22) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-orange-100">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-semibold text-gray-700">부산 동구 중앙대로 375</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {heroData.title}
                </span>
                <br />
                <span className="text-gray-900">{heroData.subtitle}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                {heroData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={`tel:${heroData.ctaPhone}`}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <i className="ri-phone-line mr-2 text-xl"></i>
                  {heroData.ctaText}
                </span>
              </a>
              <a
                href="#about"
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center"
              >
                자세히 알아보기
                <i className="ri-arrow-right-line ml-2 text-xl"></i>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { icon: 'ri-user-heart-line', label: '노인 전문', value: '맞춤 진료' },
                { icon: 'ri-shield-check-line', label: '안전한', value: '치료 시스템' },
                { icon: 'ri-heart-pulse-line', label: '체계적', value: '통증 관리' },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-2xl mb-2">
                    <i className={`${stat.icon} text-2xl text-orange-600`}></i>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              {heroData.imageUrl ? (
                <Image
                  src={heroData.imageUrl}
                  alt="비타민마취통증의학과"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center">
                  <i className="ri-hospital-line text-9xl text-white opacity-50"></i>
                </div>
              )}
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-time-line text-2xl text-white"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">진료시간</p>
                  <p className="text-xs text-gray-600">평일 09:00 - 18:00</p>
                  <p className="text-xs text-gray-600">토요일 09:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#features" className="flex flex-col items-center space-y-2 text-gray-400 hover:text-orange-600 transition-colors">
          <span className="text-xs font-semibold">스크롤하여 더보기</span>
          <i className="ri-arrow-down-line text-2xl"></i>
        </a>
      </div>
    </section>
  );
}
