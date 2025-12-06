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

export default function JointClinicPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('/api/treatments');
        if (response.ok) {
          const data = await response.json();
          // Filter joint category treatments only
          const jointTreatments = data
            .filter((t: Treatment & { active: boolean }) => t.active && t.category === 'joint')
            .sort((a: Treatment & { order: number }, b: Treatment & { order: number }) => a.order - b.order);
          setTreatments(jointTreatments);
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
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80"
                alt="관절 클리닉"
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
                  관절 클리닉
                </h1>
                <h2 className="text-white text-base font-normal leading-normal md:text-lg">
                  어깨, 무릎, 팔꿈치, 손목 등 전신 관절 질환을 전문적으로 치료합니다.
                </h2>
              </div>
            </div>
          </section>

          {/* Clinic Introduction */}
          <section className="w-full py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-[#343A40] text-2xl md:text-3xl font-bold text-center mb-6">
                관절 클리닉 소개
              </h2>
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed mb-4">
                  관절은 신체 활동의 핵심으로, 관절 건강이 일상생활의 질을 좌우합니다.
                  비타민마취통증의학과 관절 클리닉은 어깨, 무릎, 팔꿈치, 손목 등
                  전신 관절의 다양한 질환을 전문적으로 진단하고 치료합니다.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  퇴행성 관절염, 오십견, 테니스엘보, 손목터널증후군 등
                  관절 통증으로 불편을 겪고 계신 분들께 비수술적 치료를 통해
                  통증 완화와 관절 기능 회복을 제공합니다.
                </p>
              </div>
            </div>
          </section>

          {/* Common Joint Conditions */}
          <section className="w-full pb-8 md:pb-12">
            <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
              주요 치료 질환
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: '어깨 통증',
                  description: '오십견, 회전근개파열, 석회성건염 등 어깨 관절 질환',
                  icon: '💪'
                },
                {
                  title: '무릎 통증',
                  description: '퇴행성 관절염, 반월상연골파열, 십자인대손상 등',
                  icon: '🦵'
                },
                {
                  title: '손목 통증',
                  description: '손목터널증후군, 건초염, 손목 관절염',
                  icon: '✋'
                },
                {
                  title: '팔꿈치 통증',
                  description: '테니스엘보, 골프엘보, 팔꿈치 관절염',
                  icon: '💪'
                },
                {
                  title: '발목 통증',
                  description: '족저근막염, 아킬레스건염, 발목 염좌',
                  icon: '🦶'
                },
                {
                  title: '턱관절 장애',
                  description: 'TMJ 장애, 턱관절 통증 및 기능 장애',
                  icon: '😮'
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

          {/* Treatments List */}
          <section className="w-full pb-12 md:pb-16">
            <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
              관절 치료 프로그램
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
                    관절 클리닉 치료 프로그램을 준비 중입니다.
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
