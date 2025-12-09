'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

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

export default function AboutPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [tourImages, setTourImages] = useState<TourImage[]>([]);

  useEffect(() => {
    fetchEquipment();
    fetchTourImages();
  }, []);

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

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main>
        {/* Hospital Equipment Section */}
        {equipment.length > 0 && (
          <section className="bg-white px-4 md:px-10 py-16 md:py-20 overflow-hidden">
            <h2 className="text-[#343A40] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
              병원 장비 소개
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              최신 의료 장비로 정확한 진단과 효과적인 치료를 제공합니다.
            </p>

            {/* 데이터가 4개 미만: 정적 그리드 */}
            {equipment.length < 4 ? (
              <div className="max-w-[1140px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {equipment.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#f8f7f5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
              </div>
            ) : (
              /* 데이터가 4개 이상: 무한 스크롤 애니메이션 */
              <div className="relative">
                <div
                  className="flex gap-6 hover:pause-animation"
                  style={{
                    animation: `scroll-left ${equipment.length * 8}s linear infinite`
                  }}
                >
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-6 flex-shrink-0">
                      {equipment.map((item) => (
                        <div
                          key={`${setIndex}-${item.id}`}
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
            )}
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

            {/* 데이터가 4개 미만: 정적 그리드 */}
            {tourImages.length < 4 ? (
              <div className="max-w-[1140px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tourImages.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
              </div>
            ) : (
              /* 데이터가 4개 이상: 무한 스크롤 애니메이션 */
              <div className="relative">
                <div
                  className="flex gap-6 hover:pause-animation"
                  style={{
                    animation: `scroll-left ${tourImages.length * 10}s linear infinite`
                  }}
                >
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-6 flex-shrink-0">
                      {tourImages.map((item) => (
                        <div
                          key={`${setIndex}-${item.id}`}
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
            )}
          </section>
        )}
      </main>

      <NewFooter />
    </div>
  );
}
