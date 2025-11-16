'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ModernGallery() {
  const [galleryData, setGalleryData] = useState({
    images: [],
  });

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch('/api/content?section=gallery');
        if (response.ok) {
          const data = await response.json();
          if (data && data.images && Array.isArray(data.images) && data.images.length > 0) {
            setGalleryData(data);
          }
        }
      } catch (error) {
        console.error('Failed to load gallery data:', error);
      }
    };
    loadGalleryData();
  }, []);

  if (!galleryData.images || galleryData.images.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">병원 갤러리</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            깨끗하고 안전한 진료 환경을 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryData.images.map((image: any, index: number) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src={image.url || image}
                alt={image.caption || `Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-semibold">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
