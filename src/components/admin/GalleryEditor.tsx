'use client';

import { useState, useEffect } from 'react';
import ModernImageUpload from './ModernImageUpload';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    id: '1',
    url: '/images/hospital-1.jpg',
    title: '병원 외관',
    description: '깨끗하고 현대적인 병원 건물'
  },
  {
    id: '2',
    url: '/images/hospital-2.jpg',
    title: '진료실',
    description: '쾌적한 진료 환경'
  },
  {
    id: '3',
    url: '/images/hospital-3.jpg',
    title: '대기실',
    description: '편안한 대기 공간'
  }
];

interface GalleryEditorProps {
  onSave?: () => void;
}

export default function GalleryEditor({ onSave }: GalleryEditorProps) {
  const [images, setImages] = useState<GalleryImage[]>(DEFAULT_IMAGES);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromDB();
  }, []);

  const loadFromDB = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/content?section=gallery');
      if (response.ok) {
        const data = await response.json();
        if (data && data.images && Array.isArray(data.images) && data.images.length > 0) {
          setImages(data.images);
        }
      }
    } catch (error) {
      console.error('Failed to load gallery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    console.log('💾 Saving gallery data...', images);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'gallery',
          data: { images },
        }),
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Error response:', errorData);

        // 인증 오류 처리
        if (response.status === 401) {
          alert('❌ 로그인이 필요합니다. 관리자 로그인 페이지로 이동합니다.');
          window.location.href = '/admin/login';
          return;
        }

        if (response.status === 403) {
          alert('❌ 권한이 없습니다. 관리자 계정으로 로그인해주세요.');
          window.location.href = '/admin/login';
          return;
        }

        throw new Error(`서버 오류 (${response.status}): ${errorData.error || errorData.details || 'Unknown error'}`);
      }

      console.log('✅ Save successful');
      setIsModified(false);
      if (onSave) onSave();
      alert('✅ 이미지 갤러리가 저장되었습니다!');
    } catch (error) {
      console.error('❌ Error saving gallery data:', error);
      alert(`❌ 저장 실패: ${error instanceof Error ? error.message : '다시 시도해주세요'}`);
    }
  };

  const updateImage = (id: string, field: keyof Omit<GalleryImage, 'id'>, value: string) => {
    setImages(images.map(img =>
      img.id === id ? { ...img, [field]: value } : img
    ));
    setIsModified(true);
  };

  const addImage = () => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: '',
      title: '',
      description: ''
    };
    setImages([...images, newImage]);
    setIsModified(true);
  };

  const deleteImage = (id: string) => {
    if (confirm('이 이미지를 삭제하시겠습니까?')) {
      setImages(images.filter(img => img.id !== id));
      setIsModified(true);
    }
  };

  const moveImage = (id: string, direction: 'up' | 'down') => {
    const index = images.findIndex(img => img.id === id);
    if (index === -1) return;

    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === images.length - 1) return;

    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];

    setImages(newImages);
    setIsModified(true);
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100 animate-fade-in">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vitamin-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-extrabold text-neutral-900 flex items-center">
            <span className="text-4xl mr-3">🖼️</span> 병원 이미지 갤러리
          </h3>
          <p className="text-base text-neutral-600 mt-2 font-medium">
            병원 시설 이미지를 관리합니다
          </p>
        </div>
        {isModified && (
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white rounded-xl hover:from-vitamin-600 hover:to-vitamin-700 transition-all duration-200 font-bold shadow-lg shadow-vitamin-500/30 hover:shadow-xl hover:scale-105"
          >
            💾 저장
          </button>
        )}
      </div>

      {/* Images List */}
      <div className="space-y-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="border-2 border-vitamin-200 rounded-2xl p-6 bg-white/50 hover:bg-white/80 transition-all duration-200"
          >
            {/* Image Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-neutral-900">
                이미지 #{index + 1}
              </h4>
              <div className="flex gap-2">
                {/* Move Up */}
                <button
                  onClick={() => moveImage(image.id, 'up')}
                  disabled={index === 0}
                  className="p-2 text-neutral-600 hover:text-vitamin-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="위로 이동"
                >
                  ⬆️
                </button>
                {/* Move Down */}
                <button
                  onClick={() => moveImage(image.id, 'down')}
                  disabled={index === images.length - 1}
                  className="p-2 text-neutral-600 hover:text-vitamin-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="아래로 이동"
                >
                  ⬇️
                </button>
                {/* Delete */}
                <button
                  onClick={() => deleteImage(image.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-all"
                  title="삭제"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-neutral-700 mb-3">
                이미지
              </label>
              <ModernImageUpload
                label="병원 이미지"
                currentImage={image.url}
                onUpload={(url) => updateImage(image.id, 'url', url)}
                onDelete={() => updateImage(image.id, 'url', '')}
                aspectRatio="landscape"
                maxSize={5}
                showUrlInput={true}
              />
            </div>

            {/* Title & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-3">
                  제목
                </label>
                <input
                  type="text"
                  value={image.title}
                  onChange={(e) => updateImage(image.id, 'title', e.target.value)}
                  className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
                  placeholder="예: 병원 외관"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-3">
                  설명
                </label>
                <input
                  type="text"
                  value={image.description}
                  onChange={(e) => updateImage(image.id, 'description', e.target.value)}
                  className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
                  placeholder="예: 깨끗하고 현대적인 병원 건물"
                />
              </div>
            </div>

            {/* Preview */}
            {image.url && (
              <div className="mt-4">
                <label className="block text-sm font-bold text-neutral-700 mb-3">
                  미리보기
                </label>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    src={image.url}
                    alt={image.title || '병원 이미지'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {(image.title || image.description) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        {image.title && (
                          <h5 className="text-white font-bold mb-1">{image.title}</h5>
                        )}
                        {image.description && (
                          <p className="text-white/90 text-sm">{image.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Image Button */}
        <button
          onClick={addImage}
          className="w-full py-4 border-2 border-dashed border-vitamin-300 rounded-2xl text-vitamin-600 hover:bg-vitamin-50 hover:border-vitamin-500 transition-all duration-200 font-bold flex items-center justify-center gap-2"
        >
          <span className="text-2xl">➕</span> 이미지 추가
        </button>
      </div>

      {isModified && (
        <div className="mt-6 p-5 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl shadow-md animate-fade-in">
          <p className="text-base text-yellow-800 font-bold flex items-center">
            <span className="text-2xl mr-3">⚠️</span> 변경사항이 저장되지 않았습니다. 저장 버튼을 클릭하세요.
          </p>
        </div>
      )}
    </div>
  );
}
