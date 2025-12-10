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

interface ProgramItem {
  title: string;
  content: string;
}

interface TreatmentProgram {
  title: string;
  description: string;
  items: ProgramItem[];
}

interface Advantage {
  title: string;
  description: string;
  icon: string;
}

interface TreatmentPage {
  id: string;
  treatmentType: string;
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  treatmentPrograms?: string; // JSON string
  advantages?: string; // JSON string
}

export default function ManualTherapyPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [treatmentData, setTreatmentData] = useState<TreatmentPage | null>(null);
  const [treatmentPrograms, setTreatmentPrograms] = useState<TreatmentProgram[]>([]);
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch treatment page data
        const treatmentResponse = await fetch('/api/treatment-pages?treatmentType=manual-therapy');
        if (treatmentResponse.ok) {
          const treatmentPageData = await treatmentResponse.json();
          if (treatmentPageData) {
            setTreatmentData(treatmentPageData);
            setTreatmentPrograms(JSON.parse(treatmentPageData.treatmentPrograms || '[]'));
            setAdvantages(JSON.parse(treatmentPageData.advantages || '[]'));
          }
        }

        // Fetch treatments - manual-therapy category
        const treatmentsResponse = await fetch('/api/treatments');
        if (treatmentsResponse.ok) {
          const data = await treatmentsResponse.json();
          const manualTherapyTreatments = data
            .filter((t: Treatment & { active: boolean }) => t.active && t.category === 'manual-therapy')
            .sort((a: Treatment & { order: number }, b: Treatment & { order: number }) => a.order - b.order);
          setTreatments(manualTherapyTreatments);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Default fallback data
  const defaultData = {
    heroImageUrl: '',
    heroTitle: '',
    heroSubtitle: '',
    description: ''
  };

  const displayData = treatmentData || defaultData;

  // 아이콘 이름을 SVG 컴포넌트로 변환하는 함수
  const getIconSvg = (iconName: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      shield: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      flask: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      ),
      heart: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      star: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      ),
      check: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      zap: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      target: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4m13.657-5.657L5.343 18.343m13.314 0L5.343 5.657" />
      ),
      award: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      ),
    };

    return icons[iconName] || icons.shield;
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-6xl flex-1 px-4">
          {/* Hero Section */}
          <section className="w-full relative">
            <div className="w-full h-[400px] md:h-[480px] relative overflow-hidden rounded-xl bg-gray-900">
              <Image
                src={displayData.heroImageUrl}
                alt={displayData.heroTitle}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none" />
            </div>
            <div className="absolute inset-0 flex flex-col gap-6 items-center justify-end p-6 md:p-12">
              <div className="flex flex-col gap-3 text-center max-w-3xl">
                <h1 className="text-white text-3xl font-black leading-tight tracking-tight md:text-4xl lg:text-5xl whitespace-pre-wrap">
                  {displayData.heroTitle}
                </h1>
                <h2 className="text-white text-base font-normal leading-normal md:text-lg lg:text-xl whitespace-pre-wrap">
                  {displayData.heroSubtitle}
                </h2>
              </div>
            </div>
          </section>

          {/* Treatment Introduction - 소개글 카드 */}
          <section className="w-full py-12 md:py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-[#343A40] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
                도수 치료 소개
              </h2>
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                  {displayData.description}
                </p>
              </div>
            </div>
          </section>

          {/* Treatment Programs - 주요 치료 프로그램 */}
          {treatmentPrograms.length > 0 && (
            <section className="w-full pb-8 md:pb-12">
              <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
                주요 치료 프로그램
              </h3>
              <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
                {treatmentPrograms.map((program, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
                  >
                    <h4 className="font-bold text-xl text-[#343A40] mb-3">
                      {program.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {program.description}
                    </p>

                    {/* Program Items */}
                    {program.items && program.items.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <h5 className="font-bold text-base text-[#D4AF37] mb-2">
                              {item.title}
                            </h5>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Advantages - 비타민 치료의 장점 */}
          {advantages.length > 0 && (
            <section className="w-full pb-12 md:pb-16">
              <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
                비타민 도수 치료의 장점
              </h3>
              <div className={`grid gap-6 max-w-5xl mx-auto ${
                advantages.length === 1
                  ? 'grid-cols-1 max-w-2xl'
                  : advantages.length === 2
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-3'
              }`}>
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {getIconSvg(advantage.icon)}
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg text-[#343A40] mb-3">
                      {advantage.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
