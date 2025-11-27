'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Treatment {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string | null;
  features: string[];
  imageUrl?: string;
}

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'spine', label: '척추질환' },
    { value: 'joint', label: '관절질환' },
    { value: 'special', label: '특수치료' },
  ];

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('/api/treatments');
        if (response.ok) {
          const data = await response.json();
          // Filter active treatments and sort by order
          const activeTreatments = data
            .filter((t: Treatment & { active: boolean }) => t.active)
            .sort((a: Treatment & { order: number }, b: Treatment & { order: number }) => a.order - b.order);
          setTreatments(activeTreatments);
        }
      } catch (error) {
        console.error('Failed to fetch treatments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  const filteredTreatments = selectedCategory === 'all'
    ? treatments
    : treatments.filter(t => t.category === selectedCategory);

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-6xl flex-1 px-4">
          {/* Hero Section */}
          <section className="w-full relative">
            <div className="w-full h-[400px] md:h-[480px] relative overflow-hidden rounded-xl bg-gray-900">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80"
                alt="비타민마취통증의학과 치료"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50 pointer-events-none" />
            </div>
            <div className="absolute inset-0 flex flex-col gap-6 items-start justify-end p-6 md:p-12">
              <div className="flex flex-col gap-3 text-left max-w-3xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  비타민마취통증의학과의<br />전문적인 치료법
                </h1>
                <h2 className="text-white text-base font-normal leading-normal md:text-lg">
                  환자 개개인에 맞춘 정밀한 진단과 비수술적 치료를 통해 통증의 근본 원인을 해결합니다.
                </h2>
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="w-full py-12 md:py-16">
            <div className="flex justify-center">
              <div className="flex gap-2 md:gap-3 p-3 flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 text-sm font-bold transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-[#f97316]/20 text-[#f97316]'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Treatments Grid */}
          <section className="w-full pb-12 md:pb-16">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col gap-3 rounded-xl bg-white p-4 border border-gray-200 animate-pulse">
                    <div className="w-full aspect-video bg-gray-200 rounded-lg" />
                    <div className="h-6 bg-gray-200 rounded w-2/3" />
                    <div className="h-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredTreatments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-center max-w-md">
                  <span className="material-symbols-outlined text-7xl text-gray-400 mb-4 block">healing</span>
                  <p className="text-gray-500 text-lg font-medium mb-2">
                    {selectedCategory === 'all'
                      ? '등록된 치료가 없습니다.'
                      : '해당 카테고리에 등록된 치료가 없습니다.'}
                  </p>
                  {selectedCategory === 'all' && (
                    <p className="text-sm text-gray-400 mt-2">
                      관리자 페이지에서 치료 정보를 추가해주세요.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTreatments.map((treatment) => (
                  <div
                    key={treatment.id}
                    className="flex flex-col gap-3 rounded-xl bg-white p-4 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                      style={{
                        backgroundImage: `url("${treatment.imageUrl}")`
                      }}
                    />
                    <div className="flex flex-col flex-grow">
                      <p className="text-gray-900 text-lg font-bold leading-normal">
                        {treatment.title}
                      </p>
                      <p className="text-gray-600 text-sm font-normal leading-normal mt-1 mb-3 flex-grow">
                        {treatment.description}
                      </p>
                      <button
                        onClick={() => alert('치료 상세 페이지는 준비 중입니다.')}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#f97316] hover:underline cursor-pointer"
                      >
                        자세히 보기
                        <span className="text-base">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
