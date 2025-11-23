'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Treatment {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('/api/treatments');
        if (response.ok) {
          const data = await response.json();
          setTreatments(data);
        }
      } catch (error) {
        console.error('Failed to fetch treatments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  return (
    <div className="bg-white dark:bg-[#101822] min-h-screen">
      <NewHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">치료 소개</h1>
            <p className="text-lg md:text-xl opacity-90">
              전문적이고 체계적인 통증 치료 서비스
            </p>
          </div>
        </section>

        {/* Treatments Grid */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-[#2c2c2c] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : treatments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">등록된 치료가 없습니다.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="bg-white dark:bg-[#2c2c2c] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-lg mb-4 text-3xl">
                    {treatment.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {treatment.description}
                  </p>
                  {treatment.features && treatment.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">주요 특징:</h4>
                      <ul className="space-y-2">
                        {treatment.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-gray-600 dark:text-gray-400">
                            <span className="text-[#f97316] mr-2">✓</span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 dark:bg-[#1a1a1a] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
              치료의 장점
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">빠른 효과</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  즉각적인 통증 완화
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">정확한 치료</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  원인 부위 집중 치료
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">부작용 최소화</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  안전한 치료 방법
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">지속적 관리</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  재발 방지 프로그램
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">치료 상담 예약</h2>
            <p className="text-lg mb-8 opacity-90">
              나에게 맞는 치료 방법을 찾아드립니다
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#f97316] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              상담 예약하기
            </a>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
