'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
  const equipmentScrollRef = useRef<HTMLDivElement>(null);
  const tourScrollRef = useRef<HTMLDivElement>(null);
  const [showEquipmentLeftArrow, setShowEquipmentLeftArrow] = useState(false);
  const [showEquipmentRightArrow, setShowEquipmentRightArrow] = useState(true);
  const [showTourLeftArrow, setShowTourLeftArrow] = useState(false);
  const [showTourRightArrow, setShowTourRightArrow] = useState(true);

  useEffect(() => {
    fetchEquipment();
    fetchTourImages();
  }, []);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, setLeft: (v: boolean) => void, setRight: (v: boolean) => void) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setLeft(scrollLeft > 10);
    setRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const scrollAmount = 400;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Drag to scroll functionality
  const useDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (!ref.current) return;
      setIsDragging(true);
      setStartX(e.pageX - ref.current.offsetLeft);
      setScrollLeft(ref.current.scrollLeft);
      ref.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2;
      ref.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (ref.current) ref.current.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      if (ref.current) ref.current.style.cursor = 'grab';
    };

    return { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave };
  };

  const equipmentDrag = useDragScroll(equipmentScrollRef);
  const tourDrag = useDragScroll(tourScrollRef);

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
          <section className="bg-white px-4 md:px-10 py-16 md:py-20">
            <h2 className="text-[#343A40] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
              병원 장비 소개
            </h2>
            <p className="text-center text-gray-600 text-base md:text-lg mb-12 max-w-2xl mx-auto">
              최신 의료 장비로 정확한 진단과 효과적인 치료를 제공합니다.
            </p>

            <div className="max-w-[1140px] mx-auto relative">
              {/* 좌측 화살표 */}
              {showEquipmentLeftArrow && equipment.length > 3 && (
                <button
                  onClick={() => scroll(equipmentScrollRef, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                  aria-label="이전"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* 스크롤 컨테이너 */}
              <div
                ref={equipmentScrollRef}
                onScroll={() => handleScroll(equipmentScrollRef, setShowEquipmentLeftArrow, setShowEquipmentRightArrow)}
                onMouseDown={equipmentDrag.handleMouseDown}
                onMouseMove={equipmentDrag.handleMouseMove}
                onMouseUp={equipmentDrag.handleMouseUp}
                onMouseLeave={equipmentDrag.handleMouseLeave}
                className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab select-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {equipment.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-80 bg-[#f8f7f5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-gray-200 relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover pointer-events-none"
                        draggable="false"
                        sizes="(max-width: 768px) 90vw, 320px"
                        quality={85}
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

              {/* 우측 화살표 */}
              {showEquipmentRightArrow && equipment.length > 3 && (
                <button
                  onClick={() => scroll(equipmentScrollRef, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                  aria-label="다음"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </section>
        )}

        {/* Hospital Tour Section */}
        {tourImages.length > 0 && (
          <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
            <h2 className="text-[#343A40] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
              병원 둘러보기
            </h2>
            <p className="text-center text-gray-600 text-base md:text-lg mb-12 max-w-2xl mx-auto">
              쾌적하고 편안한 병원 시설을 소개합니다.
            </p>

            <div className="max-w-[1140px] mx-auto relative">
              {/* 좌측 화살표 */}
              {showTourLeftArrow && tourImages.length > 3 && (
                <button
                  onClick={() => scroll(tourScrollRef, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                  aria-label="이전"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* 스크롤 컨테이너 */}
              <div
                ref={tourScrollRef}
                onScroll={() => handleScroll(tourScrollRef, setShowTourLeftArrow, setShowTourRightArrow)}
                onMouseDown={tourDrag.handleMouseDown}
                onMouseMove={tourDrag.handleMouseMove}
                onMouseUp={tourDrag.handleMouseUp}
                onMouseLeave={tourDrag.handleMouseLeave}
                className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab select-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {tourImages.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-96 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[4/3] bg-gray-200 relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover pointer-events-none"
                        draggable="false"
                        sizes="(max-width: 768px) 90vw, 384px"
                        quality={85}
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

              {/* 우측 화살표 */}
              {showTourRightArrow && tourImages.length > 3 && (
                <button
                  onClick={() => scroll(tourScrollRef, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                  aria-label="다음"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </section>
        )}
      </main>

      <NewFooter />
    </div>
  );
}
