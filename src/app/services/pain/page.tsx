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

export default function PainClinicPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('/api/treatments');
        if (response.ok) {
          const data = await response.json();
          // Filter special category treatments (통증 클리닉 = 특수치료)
          const painTreatments = data
            .filter((t: Treatment & { active: boolean }) => t.active && t.category === 'special')
            .sort((a: Treatment & { order: number }, b: Treatment & { order: number }) => a.order - b.order);
          setTreatments(painTreatments);
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
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-6xl flex-1 px-4">
          {/* Hero Section */}
          <section className="w-full relative">
            <div className="w-full h-[400px] md:h-[480px] relative overflow-hidden rounded-xl bg-gray-900">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
                alt="통증 클리닉"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none" />
            </div>
            <div className="absolute inset-0 flex flex-col gap-6 items-start justify-end p-6 md:p-12">
              <div className="flex flex-col gap-3 text-left max-w-3xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  통증 클리닉
                </h1>
                <h2 className="text-white text-base font-normal leading-normal md:text-lg">
                  만성 통증, 신경병증성 통증 등 다양한 통증 질환을 전문적으로 치료합니다.
                </h2>
              </div>
            </div>
          </section>

          {/* Clinic Introduction */}
          <section className="w-full py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-[#343A40] text-2xl md:text-3xl font-bold text-center mb-6">
                통증 클리닉 소개
              </h2>
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed mb-4">
                  통증은 단순한 증상을 넘어 삶의 질을 크게 저하시키는 질환입니다.
                  비타민마취통증의학과 통증 클리닉은 마취통증의학과 전문의의 풍부한 경험과
                  최신 통증 치료 기술을 바탕으로 만성 통증의 근본 원인을 찾아 해결합니다.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  대상포진 후 신경통, 삼차신경통, 복합부위통증증후군(CRPS) 등
                  난치성 통증부터 일반적인 근골격계 통증까지 폭넓은 통증 질환을
                  비수술적 방법으로 효과적으로 치료합니다.
                </p>
              </div>
            </div>
          </section>

          {/* Common Pain Conditions */}
          <section className="w-full pb-8 md:pb-12">
            <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
              주요 치료 질환
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: '대상포진 후 신경통',
                  description: '대상포진 감염 후 지속되는 만성 신경병증성 통증',
                  icon: '⚡'
                },
                {
                  title: '삼차신경통',
                  description: '얼굴 부위의 극심한 전기 충격 같은 통증',
                  icon: '😖'
                },
                {
                  title: '복합부위통증증후군',
                  description: '외상 후 발생하는 심한 만성 통증 질환(CRPS)',
                  icon: '🔥'
                },
                {
                  title: '근막동통증후군',
                  description: '근육과 근막의 통증 유발점으로 인한 통증',
                  icon: '💢'
                },
                {
                  title: '두통/편두통',
                  description: '만성 긴장성 두통, 편두통, 군발두통 등',
                  icon: '🤕'
                },
                {
                  title: '암성 통증',
                  description: '암 치료 과정에서 발생하는 다양한 통증',
                  icon: '🎗️'
                }
              ].map((condition, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-3">{condition.icon}</div>
                  <h4 className="font-bold text-lg text-[#343A40] mb-2">
                    {condition.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {condition.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Treatment Features */}
          <section className="w-full pb-8 md:pb-12">
            <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
              통증 클리닉 특징
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: '마취통증의학과 전문의 진료',
                  description: '통증 치료 전문가의 정확한 진단과 치료',
                  icon: '👨‍⚕️'
                },
                {
                  title: '다학제적 접근',
                  description: '약물치료, 신경블록, 물리치료 등 종합적 치료',
                  icon: '🔬'
                },
                {
                  title: '최신 치료 장비',
                  description: '초음파 유도 시술 등 정밀한 통증 치료',
                  icon: '🏥'
                },
                {
                  title: '맞춤형 통증 관리',
                  description: '환자별 통증 원인에 따른 개별화된 치료 계획',
                  icon: '📋'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#f97316]/10 to-white rounded-lg p-6 shadow-sm border border-[#f97316]/20"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="font-bold text-lg text-[#343A40] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Treatments List */}
          <section className="w-full pb-12 md:pb-16">
            <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
              통증 치료 프로그램
            </h3>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col gap-3 rounded-xl bg-white p-4 border border-gray-200 animate-pulse">
                    <div className="w-full aspect-video bg-gray-200 rounded-lg" />
                    <div className="h-6 bg-gray-200 rounded w-2/3" />
                    <div className="h-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            ) : treatments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-center max-w-md">
                  <span className="text-7xl mb-4 block">🏥</span>
                  <p className="text-gray-500 text-lg font-medium mb-2">
                    통증 클리닉 치료 프로그램을 준비 중입니다.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    관리자 페이지에서 치료 정보를 추가해주세요.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {treatments.map((treatment) => (
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
                      {treatment.features && treatment.features.length > 0 && (
                        <ul className="text-xs text-gray-500 space-y-1 mb-3">
                          {treatment.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-[#f97316] mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
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
