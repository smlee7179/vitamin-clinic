'use client';
import { useEffect, useRef, useState } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureSectionData {
  features: Feature[];
  experienceYears: number;
}

const DEFAULT_FEATURES: FeatureSectionData = {
  experienceYears: 60,
  features: [
    { icon: '🏥', title: '60년 진료 경험', description: '부산 지역 어르신 건강을 지켜온 오랜 노하우' },
    { icon: '👨‍⚕️', title: '노인 전문 진료', description: '고령 환자 맞춤 치료와 재활 프로그램' },
    { icon: '🤝', title: '따뜻한 치료', description: '환자 중심, 신뢰와 소통의 진료 철학' },
  ]
};

export default function FeatureSection() {
  const [count, setCount] = useState(0);
  const [featuresData, setFeaturesData] = useState<FeatureSectionData>(DEFAULT_FEATURES);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Load features data from API
    const loadFeaturesData = async () => {
      try {
        const response = await fetch('/api/content?section=features');
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setFeaturesData(prev => ({ ...prev, ...data }));
          }
        }
      } catch (error) {
        console.error('Error loading features data:', error);
      }
    };

    loadFeaturesData();
  }, []);

  useEffect(() => {
    // 이미 애니메이션이 실행되었으면 다시 실행하지 않음
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let n = 0;
    const interval = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= featuresData.experienceYears) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [featuresData.experienceYears]);

  return (
    <section className="section bg-neutral-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 첫 번째 카드 - 숫자 애니메이션 */}
          <div className="card text-center">
            <div className="text-4xl mb-4">{featuresData.features[0]?.icon || '🏥'}</div>
            <h3 className="text-display-2 text-neutral-900 mb-2">
              <span>{count}</span>년 진료 경험
            </h3>
            <p className="text-body-1 text-neutral-600">
              {featuresData.features[0]?.description || '부산 지역 어르신 건강을 지켜온 오랜 노하우'}
            </p>
          </div>

          {/* 나머지 카드들 */}
          {featuresData.features.slice(1).map((f, index) => (
            <div key={index} className="card text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-display-2 text-neutral-900 mb-2">{f.title}</h3>
              <p className="text-body-1 text-neutral-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
