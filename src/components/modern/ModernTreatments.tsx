'use client';

import { useState, useEffect } from 'react';

export default function ModernTreatments() {
  const [treatmentsData, setTreatmentsData] = useState({
    sectionTitle: '치료 방법',
    sectionDescription: '다양한 통증 치료 방법으로 환자분들의 빠른 회복을 돕습니다.',
    treatments: [
      {
        id: '1',
        title: '신경차단술',
        description: '통증을 유발하는 신경에 직접 약물을 주입하여 통증을 완화합니다.',
        icon: 'ri-syringe-line',
      },
      {
        id: '2',
        title: '물리치료',
        description: '전문 장비를 활용한 물리치료로 통증을 완화하고 기능을 회복합니다.',
        icon: 'ri-pulse-line',
      },
      {
        id: '3',
        title: '도수치료',
        description: '전문 치료사의 숙련된 손기술로 근육과 관절을 치료합니다.',
        icon: 'ri-hand-heart-line',
      },
    ],
  });

  useEffect(() => {
    const loadTreatmentsData = async () => {
      try {
        const response = await fetch('/api/content?section=treatments');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setTreatmentsData(prevData => ({
              ...prevData,
              ...data,
            }));
          }
        }
      } catch (error) {
        console.error('Failed to load treatments data:', error);
      }
    };
    loadTreatmentsData();
  }, []);

  return (
    <section id="treatments" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {treatmentsData.sectionTitle || '치료 방법'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {treatmentsData.sectionDescription || '다양한 통증 치료 방법으로 환자분들의 빠른 회복을 돕습니다.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {treatmentsData.treatments?.map((treatment, index) => (
            <div
              key={treatment.id}
              className="relative group bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Number Badge */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-orange-600 text-xl shadow-lg">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                <i className={`${treatment.icon} text-3xl text-white`}></i>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{treatment.title}</h3>
              <p className="text-gray-600 leading-relaxed">{treatment.description}</p>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
