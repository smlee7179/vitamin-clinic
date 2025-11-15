'use client';

import { useState, useEffect } from 'react';
import ModernImageUpload from './ModernImageUpload';

interface ContentSection {
  id: string;
  title: string;
  type: 'hero' | 'service' | 'gallery' | 'treatment' | 'faq';
  data: any;
}

interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

export default function UnifiedContentManager() {
  const [activeSection, setActiveSection] = useState('hero');
  const [heroData, setHeroData] = useState<HeroData>({
    title: '따뜻한 마음으로 치료하는\n비타민마취통증의학과',
    subtitle: '부산 동구 중앙대로 375 | 051-469-7581\n노인 전문 마취통증의학과, 맞춤 재활 및 통증 치료',
    buttonText: '전화 문의하기',
    buttonLink: 'tel:051-469-7581',
    backgroundImage: '/gallery1.jpg',
  });
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    { id: '1', url: '/gallery1.jpg', title: '병원 외관', description: '깨끗하고 현대적인 병원 건물' },
    { id: '2', url: '/gallery2.jpg', title: '진료실', description: '쾌적한 진료 환경' },
    { id: '3', url: '/gallery3.jpg', title: '대기실', description: '편안한 대기 공간' }
  ]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const sections = [
    { id: 'hero', name: '메인 히어로', icon: '🏠' },
    { id: 'gallery', name: '병원 이미지', icon: '🖼️' },
    { id: 'about', name: '병원 소개', icon: '🏥' },
    { id: 'services', name: '진료과목', icon: '💉' },
    { id: 'contact', name: '연락처', icon: '📞' },
  ];

  useEffect(() => {
    loadContent();
  }, [activeSection]);

  const loadContent = async () => {
    setLoading(true);
    try {
      if (activeSection === 'hero') {
        const response = await fetch('/api/content?section=hero');
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setHeroData(prev => ({ ...prev, ...data }));
          }
        }
      } else if (activeSection === 'gallery') {
        const response = await fetch('/api/content?section=gallery');
        if (response.ok) {
          const data = await response.json();
          if (data && data.images && Array.isArray(data.images) && data.images.length > 0) {
            setGalleryImages(data.images);
          }
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveHeroData = async () => {
    setSaveStatus('saving');
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'hero',
          ...heroData
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving hero data:', error);
      setSaveStatus('error');
    }
  };

  const saveAllGallery = async () => {
    setSaveStatus('saving');
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'gallery',
          data: { images: galleryImages },
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Error saving gallery:', errorData);
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving gallery:', error);
      setSaveStatus('error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border-2 border-vitamin-100">
        <h2 className="text-3xl font-extrabold text-neutral-900 mb-2 flex items-center">
          <span className="text-4xl mr-3">📝</span>
          통합 콘텐츠 관리
        </h2>
        <p className="text-neutral-600">
          홈페이지의 모든 이미지와 텍스트를 한 곳에서 관리하세요
        </p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-lg border-2 border-vitamin-100">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-200 font-semibold ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white shadow-lg scale-105'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-vitamin-50 hover:text-vitamin-600'
              }`}
            >
              <span className="text-2xl mr-2">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="bg-green-50 border-2 border-green-500 text-green-700 px-6 py-4 rounded-2xl flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <span className="font-semibold">저장 완료!</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border-2 border-red-500 text-red-700 px-6 py-4 rounded-2xl flex items-center">
          <span className="text-2xl mr-3">❌</span>
          <span className="font-semibold">저장 실패. 다시 시도해주세요.</span>
        </div>
      )}

      {/* Content Sections */}
      {loading ? (
        <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-xl border-2 border-vitamin-100 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vitamin-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">로딩 중...</p>
        </div>
      ) : (
        <>
          {/* Hero Section Editor */}
          {activeSection === 'hero' && (
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100 space-y-6">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">메인 히어로 섹션</h3>

              {/* Background Image */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  배경 이미지
                </label>
                <ModernImageUpload
                  currentImage={heroData.backgroundImage}
                  onUpload={(url) => setHeroData({ ...heroData, backgroundImage: url })}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  메인 제목
                </label>
                <textarea
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
                  rows={2}
                  placeholder="병원명과 소개 문구"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  부제목
                </label>
                <textarea
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
                  rows={2}
                  placeholder="주소, 전화번호, 전문 분야"
                />
              </div>

              {/* Button */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    버튼 텍스트
                  </label>
                  <input
                    type="text"
                    value={heroData.buttonText}
                    onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
                    placeholder="전화 문의하기"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    버튼 링크
                  </label>
                  <input
                    type="text"
                    value={heroData.buttonLink}
                    onChange={(e) => setHeroData({ ...heroData, buttonLink: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
                    placeholder="tel:051-469-7581"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveHeroData}
                disabled={saveStatus === 'saving'}
                className="w-full bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-vitamin-600 hover:to-vitamin-700 transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {saveStatus === 'saving' ? '저장 중...' : '저장하기'}
              </button>
            </div>
          )}

          {/* Gallery Section Editor */}
          {activeSection === 'gallery' && (
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100 space-y-6">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">병원 이미지 갤러리</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {galleryImages.map((image, index) => (
                  <div key={image.id} className="space-y-4 p-4 border-2 border-neutral-200 rounded-xl">
                    <ModernImageUpload
                      currentImage={image.url}
                      onUpload={(url) => {
                        const newImages = [...galleryImages];
                        newImages[index].url = url;
                        setGalleryImages(newImages);
                      }}
                    />

                    <input
                      type="text"
                      value={image.title}
                      onChange={(e) => {
                        const newImages = [...galleryImages];
                        newImages[index].title = e.target.value;
                        setGalleryImages(newImages);
                      }}
                      className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
                      placeholder="이미지 제목"
                    />

                    <input
                      type="text"
                      value={image.description}
                      onChange={(e) => {
                        const newImages = [...galleryImages];
                        newImages[index].description = e.target.value;
                        setGalleryImages(newImages);
                      }}
                      className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
                      placeholder="이미지 설명"
                    />
                  </div>
                ))}
              </div>

              {/* Save All Button */}
              <button
                onClick={saveAllGallery}
                disabled={saveStatus === 'saving'}
                className="w-full bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-vitamin-600 hover:to-vitamin-700 transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {saveStatus === 'saving' ? '저장 중...' : '모든 이미지 저장하기'}
              </button>
            </div>
          )}

          {/* Other Sections Placeholder */}
          {['about', 'services', 'contact'].includes(activeSection) && (
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {sections.find(s => s.id === activeSection)?.name}
              </h3>
              <p className="text-neutral-600 mb-4">
                이 섹션의 콘텐츠 편집 기능은 곧 추가될 예정입니다.
              </p>
              <div className="bg-vitamin-50 p-6 rounded-xl border-2 border-vitamin-200">
                <p className="text-vitamin-700 font-medium">
                  💡 현재는 각 페이지의 소스 코드에서 직접 수정하거나, 기존 에디터를 사용해주세요.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
