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

interface Equipment {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  order: number;
}

interface TourImage {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
}

interface Greeting {
  id: string;
  imageUrl: string;
  content: string;
  signature: string;
}

export default function AboutPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [tourImages, setTourImages] = useState<TourImage[]>([]);
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  useEffect(() => {
    fetchDoctors();
    fetchEquipment();
    fetchTourImages();
    fetchGreeting();
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

  const fetchEquipment = async () => {
    try {
      const response = await fetch('/api/equipment');
      if (response.ok) {
        const data = await response.json();
        setEquipment(data);
      }
    } catch (error) {
      console.error('Failed to fetch equipment:', error);
    }
  };

  const fetchTourImages = async () => {
    try {
      const response = await fetch('/api/hospital-tour');
      if (response.ok) {
        const data = await response.json();
        setTourImages(data);
      }
    } catch (error) {
      console.error('Failed to fetch tour images:', error);
    }
  };

  const fetchGreeting = async () => {
    try {
      const response = await fetch('/api/greeting');
      if (response.ok) {
        const data = await response.json();
        setGreeting(data);
      }
    } catch (error) {
      console.error('Failed to fetch greeting:', error);
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
        {greeting && (
          <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
            <div className="max-w-[1140px] mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-8 md:p-12 rounded-xl border border-[#E5E7EB] shadow-sm">
                {greeting.imageUrl && (
                  <div className="w-full md:w-1/3">
                    <img
                      alt="병원 내부 사진"
                      className="w-full h-auto object-cover rounded-lg aspect-square"
                      src={greeting.imageUrl}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4 w-full md:w-2/3">
                  <h2 className="text-[#343A40] tracking-tight text-2xl md:text-3xl font-bold leading-tight">
                    인사말
                  </h2>
                  <p className="text-gray-600 text-base font-normal leading-relaxed whitespace-pre-wrap">
                    {greeting.content}
                  </p>
                  {greeting.signature && (
                    <p className="text-right font-bold text-lg text-[#343A40] mt-4">
                      {greeting.signature}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Doctor Section */}
        {doctors.length > 0 && (
          <section className="px-4 md:px-10 py-16 md:py-20">
            <h2 className="text-[#343A40] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
              의료진 소개
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              비타민마취통증의학과의 분야별 전문 의료진이 환자 여러분의 건강한 삶을 위해 최선을 다하고 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-[1140px] mx-auto">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex flex-col items-center text-center p-6 rounded-xl"
                >
                  {doctor.photoUrl && (
                    <div className="w-48 h-48 rounded-full bg-[#f8f7f5] mb-6 shadow-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={doctor.photoUrl}
                        alt={doctor.name}
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-xl text-[#343A40] mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-[#f97316] font-semibold text-base mb-1">
                    {doctor.title}
                  </p>
                  <p className="text-gray-600 font-medium text-sm mb-4">
                    {doctor.specialty}
                  </p>
                  {(doctor.education || doctor.career) && (
                    <ul className="text-gray-600 text-sm mt-3 text-left list-disc list-inside space-y-1">
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
        {equipment.length > 0 && (
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
                    {equipment.map((item, index) => (
                      <div
                        key={`${setIndex}-${index}`}
                        className="flex-shrink-0 w-80 bg-[#f8f7f5] rounded-xl overflow-hidden shadow-sm"
                      >
                        <div className="aspect-video bg-gray-200 relative">
                          <img
                            src={item.imageUrl}
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
        )}

        {/* Hospital Tour Section */}
        {tourImages.length > 0 && (
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
                            src={item.imageUrl}
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
        )}
      </main>

      <NewFooter />
    </div>
  );
}
