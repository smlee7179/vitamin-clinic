'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  photoUrl: string | null;
  education: string;
  career: string;
  order: number;
}

const equipmentItems = [
  {
    name: 'C-arm (투시촬영장치)',
    description: '실시간 영상을 통해 정확한 시술 부위를 확인하며 안전하고 효과적인 통증 치료를 제공합니다.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80'
  },
  {
    name: '초음파 진단기',
    description: '근골격계 질환의 정확한 진단과 실시간 유도 하에 안전한 주사 치료가 가능합니다.',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80'
  },
  {
    name: '체외충격파 치료기',
    description: '비수술적 치료로 만성 통증과 근골격계 질환을 효과적으로 개선합니다.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'
  },
  {
    name: '고주파 열 치료기',
    description: '신경 차단술을 통해 만성 통증을 장기적으로 완화시키는 최신 치료 장비입니다.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'
  }
];

const tourImages = [
  {
    title: '쾌적한 대기실',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80'
  },
  {
    title: '최신 시설의 진료실',
    image: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80'
  },
  {
    title: '첨단 치료실',
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&q=80'
  },
  {
    title: '편안한 회복실',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80'
  },
  {
    title: '깨끗한 복도',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80'
  }
];

export default function AboutPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEvT0RCsOOUU4RQkVcUJOlQoCxEc7RFWZ7CRkAvr5eUigZKCdBugReAIFNL-1IVahADzOYLbxzkm7_sxcCFOVVrXUu64h0mweifH7xCsKS3MkjhsYqZnWdSOjOgpaHRgAc-kYzPoxCqU5Akjdr775rljufqNCSOeSgbLTnCXTO7_E4KlRHcU34T8bg1ePxkomRqqTve53qko_PoE96KX0sR6K4cJmUp74AlKq7StbBUV5R8ywM0oCH5tUcN5qtsHWP0m1WXZ0WCSnZ"
                alt="비타민마취통증의학과"
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
                  통증 없는 건강한 삶,<br />비타민이 함께합니다
                </h1>
                <h2 className="text-white text-base font-normal leading-normal md:text-lg">
                  환자 중심의 따뜻하고 전문적인 통증 치료를 약속합니다.
                </h2>
              </div>
            </div>
          </section>
        </div>
      </main>

      <main>

        {/* Greeting Section */}
        <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
          <div className="max-w-[1140px] mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-8 md:p-12 rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="w-full md:w-1/3">
                <img
                  alt="병원 내부 사진"
                  className="w-full h-auto object-cover rounded-lg aspect-square"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACJ6rVG0bW9U7VfgrNWfNJw4pgjTorthRESmONfucJg_tNnp8u9LG2896HF3jDrnCSPDRoQWxHT0sV19CWzIjVca7q8PqvhadeoP4vOUfXaTcMTXzjA8dWM0MhigfqTnkb5Fkv9Ee3_forM-MTaPkeO9ZOIH0HDCpXgHD3882pwHIpfJkHh988d8SaBVdlnyy4FYBX4HF7ZhUQKM4kUZ9T8ch8J8SZ7aQnRELMXTRN5m3UlOM3_h_4XW84N4GKFZl2D6MVntjcUNto"
                />
              </div>
              <div className="flex flex-col gap-4 w-full md:w-2/3">
                <h2 className="text-[#343A40] tracking-tight text-2xl md:text-3xl font-bold leading-tight">
                  인사말
                </h2>
                <p className="text-gray-600 text-base font-normal leading-relaxed">
                  안녕하십니까? 비타민마취통증의학과에 오신 것을 진심으로 환영합니다.<br />
                  저희 병원은 환자 한 분 한 분의 목소리에 귀 기울이고, 최신 의료 지식과 기술을 바탕으로 정확한 진단과 효과적인 치료를 제공하기 위해 최선을 다하고 있습니다. 통증으로 고통받는 모든 분들이 건강한 일상을 되찾을 수 있도록 따뜻한 마음으로 함께하겠습니다. 감사합니다.
                </p>
                <p className="text-right font-bold text-lg text-[#343A40] mt-4">
                  원장 홍길동
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Staff Section */}
        {doctors.length > 0 && (
          <section className="px-4 md:px-10 py-16 md:py-20 bg-[#f8f7f5]">
            <h2 className="text-[#343A40] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
              의료진 소개
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              비타민마취통증의학과의 분야별 전문 의료진이 환자 여러분의 건강한 삶을 위해 최선을 다하고 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1140px] mx-auto">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB]"
                >
                  {doctor.photoUrl && (
                    <img
                      className="w-32 h-32 rounded-full object-cover mb-4"
                      src={doctor.photoUrl}
                      alt={doctor.name}
                    />
                  )}
                  <h3 className="font-bold text-lg text-[#343A40]">
                    {doctor.name}
                  </h3>
                  <p className="text-[#F97316] font-medium text-sm">
                    {doctor.specialty}
                  </p>
                  {(doctor.education || doctor.career) && (
                    <ul className="text-gray-500 text-sm mt-3 text-left list-disc list-inside space-y-1">
                      {doctor.education && doctor.education.split('\n').map((line, idx) => (
                        line.trim() && <li key={`edu-${idx}`}>{line.trim()}</li>
                      ))}
                      {doctor.career && doctor.career.split('\n').map((line, idx) => (
                        line.trim() && <li key={`career-${idx}`}>{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hospital Equipment Section */}
        <section className="bg-white px-4 md:px-10 py-16 md:py-20 overflow-hidden">
          <h2 className="text-[#343A40] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
            병원 장비 소개
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            최신 의료 장비로 정확한 진단과 효과적인 치료를 제공합니다.
          </p>
          <div className="relative">
            <div className="flex gap-6 animate-scroll-left hover:pause-animation">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 flex-shrink-0">
                  {equipmentItems.map((item, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="flex-shrink-0 w-80 bg-[#f8f7f5] rounded-xl overflow-hidden shadow-sm"
                    >
                      <div className="aspect-video bg-gray-200 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-[#343A40] mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hospital Tour Section */}
        <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20 overflow-hidden">
          <h2 className="text-[#343A40] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
            병원 둘러보기
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            쾌적하고 편안한 병원 시설을 소개합니다.
          </p>
          <div className="relative">
            <div className="flex gap-6 animate-scroll-left-slow hover:pause-animation">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 flex-shrink-0">
                  {tourImages.map((item, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="flex-shrink-0 w-96 bg-white rounded-xl overflow-hidden shadow-sm"
                    >
                      <div className="aspect-[4/3] bg-gray-200 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-base text-[#343A40] text-center">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
