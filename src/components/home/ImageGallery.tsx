'use client';

import { useState, useEffect } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    id: '1',
    url: '/gallery1.jpg',
    title: '병원 외관',
    description: '깨끗하고 현대적인 병원 건물'
  },
  {
    id: '2',
    url: '/gallery2.jpg',
    title: '진료실',
    description: '쾌적한 진료 환경'
  },
  {
    id: '3',
    url: '/gallery3.jpg',
    title: '대기실',
    description: '편안한 대기 공간'
  }
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>(DEFAULT_IMAGES);

  useEffect(() => {
    // Load images from content API (matches admin GalleryEditor)
    const loadImages = async () => {
      try {
        const response = await fetch('/api/content?section=gallery');
        if (response.ok) {
          const data = await response.json();
          // Data structure: { images: [...] }
          if (data && data.images && Array.isArray(data.images) && data.images.length > 0) {
            setImages(data.images);
          }
        }
      } catch (error) {
        console.error('Error loading gallery images:', error);
        // Keep default images on error
      }
    };

    loadImages();
  }, []);

  return (
    <section className="section bg-white">
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">병원 둘러보기</h2>
          <p className="text-body-1 text-neutral-600">
            쾌적하고 깨끗한 진료 환경을 확인하세요
          </p>
        </div>

        {/* 이미지 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="card p-0 overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-normal"
              onClick={() => setSelectedImage(image)}
            >
              {/* 이미지 */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={image.url}
                  alt={image.title || '병원 이미지'}
                  className="w-full h-full object-cover transition-transform duration-normal group-hover:scale-105"
                  loading="lazy"
                />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" />
              </div>

              {/* 텍스트 정보 */}
              <div className="p-4">
                {image.title && (
                  <h3 className="text-display-2 text-neutral-900 mb-2">{image.title}</h3>
                )}
                {image.description && (
                  <p className="text-body-2 text-neutral-600">{image.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 모달 */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full text-neutral-900 hover:bg-white transition-colors duration-fast"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 이미지 */}
              <div className="relative aspect-[16/9] bg-neutral-100">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title || '병원 이미지'}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 정보 */}
              {(selectedImage.title || selectedImage.description) && (
                <div className="p-6 border-t border-neutral-200">
                  {selectedImage.title && (
                    <h3 className="text-display-2 text-neutral-900 mb-2">
                      {selectedImage.title}
                    </h3>
                  )}
                  {selectedImage.description && (
                    <p className="text-body-1 text-neutral-600">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
