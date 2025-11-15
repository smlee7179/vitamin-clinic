'use client';

import { useState, useEffect } from 'react';

interface Treatment {
  title: string;
  icon: string;
  description: string;
  features: string[];
}

const DEFAULT_TREATMENTS: Treatment[] = [
  {
    title: '신경차단술',
    icon: '💉',
    description: '통증 부위에 직접 약물을 주입하여 신경을 차단하고 통증을 완화합니다.',
    features: ['척추 신경차단', '관절 신경차단', '근막통증 치료', '대상포진 후 신경통']
  },
  {
    title: '주사치료',
    icon: '💊',
    description: '염증과 통증을 완화하는 약물을 직접 주입하여 빠른 효과를 얻습니다.',
    features: ['스테로이드 주사', 'DNA 주사', '프롤로 주사', '히알루론산 주사']
  },
  {
    title: '도수치료',
    icon: '🤲',
    description: '전문 치료사의 손으로 근육과 관절을 치료하여 기능을 회복합니다.',
    features: ['근막이완술', '관절가동술', '척추교정', '자세교정']
  },
  {
    title: '체외충격파',
    icon: '⚡',
    description: '고에너지 충격파로 통증 부위를 자극하여 재생을 촉진합니다.',
    features: ['석회성 건염', '족저근막염', '테니스엘보', '오십견']
  }
];

export default function TreatmentSection() {
  const [treatments, setTreatments] = useState<Treatment[]>(DEFAULT_TREATMENTS);

  useEffect(() => {
    const loadTreatments = async () => {
      try {
        const response = await fetch('/api/treatments');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setTreatments(data);
          }
        }
      } catch (error) {
        console.error('Error loading treatments:', error);
        // Keep default treatments on error
      }
    };

    loadTreatments();
  }, []);

  return (
    <section id="treatments" className="section bg-neutral-50">
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">치료방법</h2>
          <p className="text-body-1 text-neutral-600">
            환자 개개인의 상태에 맞는 최적의 치료 방법을 제공합니다
          </p>
        </div>

        {/* 치료 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treatments.map((treatment, idx) => (
            <div
              key={idx}
              className="card hover:shadow-md transition-all duration-normal"
            >
              {/* 아이콘 & 제목 */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-9 h-9 flex-shrink-0 text-3xl">
                  {treatment.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-display-2 text-neutral-900 mb-2">
                    {treatment.title}
                  </h3>
                  <p className="text-body-1 text-neutral-600 leading-relaxed">
                    {treatment.description}
                  </p>
                </div>
              </div>

              {/* 특징 리스트 */}
              <ul className="space-y-1 pl-[52px]">
                {treatment.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center text-body-2 text-neutral-700">
                    <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
