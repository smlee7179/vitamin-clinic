'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  photoUrl: string | null;
  career: string;
  order: number;
  active: boolean;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main>
        {/* Doctors Section */}
        <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
          <div className="max-w-[1140px] mx-auto">
            <h2 className="text-[#343A40] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center mb-12">
              의료진 소개
            </h2>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
                <p className="mt-4 text-gray-500">의료진 정보를 불러오는 중...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    {doctor.photoUrl ? (
                      <Image
                        src={doctor.photoUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400 text-4xl">👤</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[#343A40] mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm font-medium text-[#D4AF37] mb-2">
                        {doctor.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {doctor.specialty}
                      </p>
                    </div>

                    {doctor.career && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">경력</h4>
                        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                          {doctor.career}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href="/about/hours"
                        className="inline-flex items-center text-xs text-[#f97316] hover:text-[#ea580c] font-medium transition-colors"
                      >
                        진료시간 자세히 보기
                        <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {doctors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">등록된 의료진이 없습니다.</p>
                </div>
              )}
            </div>
            )}
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
