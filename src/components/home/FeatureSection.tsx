'use client';
import { useEffect, useRef } from 'react';

const features = [
  { icon: '🏥', title: '60년 진료 경험', desc: '부산 지역 어르신 건강을 지켜온 오랜 노하우' },
  { icon: '👨‍⚕️', title: '노인 전문 진료', desc: '고령 환자 맞춤 치료와 재활 프로그램' },
  { icon: '🤝', title: '따뜻한 치료', desc: '환자 중심, 신뢰와 소통의 진료 철학' },
];

export default function FeatureSection() {
  // 숫자 애니메이션(예시)
  const countRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let n = 0;
    const el = countRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      n += 1;
      el.textContent = n.toString();
      if (n >= 60) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <div className="glass-card flex flex-col items-center p-4 sm:p-6 md:p-8 shadow-card">
        <span className="text-3xl md:text-4xl mb-2">🏥</span>
        <h3 className="text-lg md:text-2xl font-bold mb-1 text-primary-600"><span ref={countRef}>0</span>년 진료 경험</h3>
        <p className="text-base md:text-lg text-neutral-700 text-center">부산 지역 어르신 건강을 지켜온 오랜 노하우</p>
      </div>
      {features.slice(1).map((f) => (
        <div key={f.title} className="glass-card flex flex-col items-center p-4 sm:p-6 md:p-8 shadow-card">
          <span className="text-3xl md:text-4xl mb-2">{f.icon}</span>
          <h3 className="text-lg md:text-2xl font-bold mb-1 text-primary-600">{f.title}</h3>
          <p className="text-base md:text-lg text-neutral-700 text-center">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}
