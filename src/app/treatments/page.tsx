'use client';

import { useState, useEffect } from 'react';
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

// 기본 치료 데이터 (템플릿 기반)
const defaultTreatments: Treatment[] = [
  {
    id: '1',
    title: '도수치료',
    description: '전문의의 손을 이용해 척추와 관절의 불균형을 바로잡아 통증을 완화하고 기능을 회복시키는 치료법입니다.',
    icon: '🤲',
    category: 'spine',
    features: [],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'
  },
  {
    id: '2',
    title: '신경차단술',
    description: '통증을 유발하는 신경 주위에 약물을 주입하여 염증과 부종을 줄이고 통증을 효과적으로 완화시키는 시술입니다.',
    icon: '💉',
    category: 'spine',
    features: [],
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'
  },
  {
    id: '3',
    title: '프롤로테라피',
    description: '손상된 인대와 힘줄에 증식제를 주사하여 조직의 재생을 유도하고 만성 통증을 근본적으로 완화하는 주사 요법입니다.',
    icon: '💊',
    category: 'joint',
    features: [],
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80'
  },
  {
    id: '4',
    title: '체외충격파',
    description: '강력한 충격파 에너지를 통증 부위에 전달하여 혈류를 개선하고 손상된 조직의 재생을 돕는 비수술적 치료입니다.',
    icon: '⚡',
    category: 'special',
    features: [],
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'
  },
  {
    id: '5',
    title: '물리치료',
    description: '열, 전기, 광선 등 다양한 물리적 요소를 이용하여 통증을 완화하고 손상된 조직의 기능을 회복시키는 치료입니다.',
    icon: '🔥',
    category: 'special',
    features: [],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
  },
  {
    id: '6',
    title: '운동치료',
    description: '개인의 상태에 맞는 맞춤형 운동 프로그램을 통해 근력을 강화하고 신체 균형을 개선하여 재발을 방지합니다.',
    icon: '🏃',
    category: 'special',
    features: [],
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80'
  }
];

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>(defaultTreatments);
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
          if (data && data.length > 0) {
            // API 데이터가 있으면 이미지 URL 추가
            const enrichedData = data.map((t: Treatment, index: number) => ({
              ...t,
              imageUrl: t.imageUrl || defaultTreatments[index]?.imageUrl
            }));
            setTreatments(enrichedData);
          }
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
          <section className="w-full">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end p-6 md:p-12"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80")'
              }}
            >
              <div className="flex flex-col gap-3 text-left">
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
              <div className="text-center py-12">
                <p className="text-gray-500">해당 카테고리에 등록된 치료가 없습니다.</p>
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
                      <a
                        href={`/treatments/${treatment.id}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#f97316] hover:underline"
                      >
                        자세히 보기
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </a>
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
