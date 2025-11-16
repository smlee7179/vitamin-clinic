'use client';

import { useState, useEffect } from 'react';

export default function ModernFeatures() {
  const [featuresData, setFeaturesData] = useState({
    features: [
      {
        icon: 'ri-user-heart-line',
        title: '노인 전문 진료',
        description: '노인 환자분들을 위한 맞춤 진료 서비스를 제공합니다.',
      },
      {
        icon: 'ri-shield-check-line',
        title: '안전한 치료',
        description: '최신 장비와 숙련된 의료진으로 안전하게 치료합니다.',
      },
      {
        icon: 'ri-heart-pulse-line',
        title: '체계적 관리',
        description: '환자 개개인에 맞는 체계적인 통증 관리를 제공합니다.',
      },
    ],
  });

  useEffect(() => {
    const loadFeaturesData = async () => {
      try {
        const response = await fetch('/api/content?section=features');
        if (response.ok) {
          const data = await response.json();
          if (data && data.features && Array.isArray(data.features) && data.features.length > 0) {
            setFeaturesData(data);
          }
        }
      } catch (error) {
        console.error('Failed to load features data:', error);
      }
    };
    loadFeaturesData();
  }, []);

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            왜 비타민의원을 선택해야 할까요?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            환자 중심의 진료 철학과 최고의 의료 서비스로 여러분의 건강을 책임집니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-8 border-2 border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-orange-500/20">
                <i className={`${feature.icon} text-3xl text-white`}></i>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>

              {/* Decorative Element */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-orange-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
