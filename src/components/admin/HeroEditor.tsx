'use client';

import { useState, useEffect } from 'react';
import ModernImageUpload from './ModernImageUpload';

interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  secondButtonText: string;
  secondButtonLink: string;
  backgroundImage: string;
}

const DEFAULT_HERO: HeroData = {
  title: '따뜻한 마음으로 치료하는\n비타민마취통증의학과',
  subtitle: '부산 동구 중앙대로 375 | 051-469-7581\n노인 전문 마취통증의학과, 맞춤 재활 및 통증 치료',
  buttonText: '📞 전화걸기',
  buttonLink: 'tel:051-469-7581',
  secondButtonText: '오시는 길',
  secondButtonLink: '/contact',
  backgroundImage: '',
};

interface HeroEditorProps {
  onSave?: () => void;
}

export default function HeroEditor({ onSave }: HeroEditorProps) {
  const [heroData, setHeroData] = useState<HeroData>(DEFAULT_HERO);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromDB();
  }, []);

  const loadFromDB = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/content?section=hero');
      if (response.ok) {
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setHeroData({
            title: data.title || DEFAULT_HERO.title,
            subtitle: data.subtitle || DEFAULT_HERO.subtitle,
            buttonText: data.buttonText || DEFAULT_HERO.buttonText,
            buttonLink: data.buttonLink || DEFAULT_HERO.buttonLink,
            secondButtonText: data.secondButtonText || DEFAULT_HERO.secondButtonText,
            secondButtonLink: data.secondButtonLink || DEFAULT_HERO.secondButtonLink,
            backgroundImage: data.backgroundImage || DEFAULT_HERO.backgroundImage,
          });
        }
      }
    } catch (error) {
      console.error('Failed to load hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    console.log('💾 Saving hero data...', heroData);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'hero',
          data: heroData,
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
      alert('✅ Hero 섹션이 저장되었습니다!');
    } catch (error) {
      console.error('❌ Error saving hero data:', error);
      alert(`❌ 저장 실패: ${error instanceof Error ? error.message : '다시 시도해주세요'}`);
    }
  };

  const updateField = (field: keyof HeroData, value: string) => {
    setHeroData({ ...heroData, [field]: value });
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
            <span className="text-4xl mr-3">🏠</span> 메인 화면 (Hero 섹션)
          </h3>
          <p className="text-base text-neutral-600 mt-2 font-medium">
            홈페이지 메인 화면의 제목, 부제목, 버튼을 관리합니다
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

      <div className="space-y-6">
        {/* 메인 타이틀 */}
        <div>
          <label className="block text-sm font-bold text-neutral-700 mb-3">
            메인 타이틀
            <span className="text-neutral-500 font-normal ml-2">(줄바꿈: \n 사용)</span>
          </label>
          <textarea
            value={heroData.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-5 py-4 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all resize-none"
            rows={3}
            placeholder="메인 화면에 표시될 제목을 입력하세요"
          />
        </div>

        {/* 부제목 */}
        <div>
          <label className="block text-sm font-bold text-neutral-700 mb-3">
            부제목
            <span className="text-neutral-500 font-normal ml-2">(줄바꿈: \n 사용)</span>
          </label>
          <textarea
            value={heroData.subtitle}
            onChange={(e) => updateField('subtitle', e.target.value)}
            className="w-full px-5 py-4 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all resize-none"
            rows={3}
            placeholder="부제목을 입력하세요"
          />
        </div>

        {/* 첫 번째 버튼 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-3">
              첫 번째 버튼 텍스트
            </label>
            <input
              type="text"
              value={heroData.buttonText}
              onChange={(e) => updateField('buttonText', e.target.value)}
              className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
              placeholder="예: 📞 전화걸기"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-3">
              첫 번째 버튼 링크
            </label>
            <input
              type="text"
              value={heroData.buttonLink}
              onChange={(e) => updateField('buttonLink', e.target.value)}
              className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
              placeholder="예: tel:051-469-7581"
            />
          </div>
        </div>

        {/* 두 번째 버튼 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-3">
              두 번째 버튼 텍스트
            </label>
            <input
              type="text"
              value={heroData.secondButtonText}
              onChange={(e) => updateField('secondButtonText', e.target.value)}
              className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
              placeholder="예: 오시는 길"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-3">
              두 번째 버튼 링크
            </label>
            <input
              type="text"
              value={heroData.secondButtonLink}
              onChange={(e) => updateField('secondButtonLink', e.target.value)}
              className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
              placeholder="예: /contact"
            />
          </div>
        </div>

        {/* 배경 이미지 */}
        <div>
          <label className="block text-sm font-bold text-neutral-700 mb-3">
            배경 이미지
          </label>
          <ModernImageUpload
            label="Hero 섹션 배경 이미지"
            currentImage={heroData.backgroundImage}
            onUpload={(url) => updateField('backgroundImage', url)}
            onDelete={() => updateField('backgroundImage', '')}
            aspectRatio="landscape"
            maxSize={5}
            showUrlInput={true}
          />
        </div>

        {/* 미리보기 */}
        <div className="border-t-2 border-vitamin-100 pt-6">
          <h4 className="text-lg font-bold text-neutral-900 mb-4">미리보기</h4>
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
            {heroData.backgroundImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
              >
                {/* 부드러운 다크 오버레이 - 이미지 가독성 향상 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
                {/* 하단 비타민 컬러 하이라이트 */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-vitamin-500/30 via-vitamin-400/10 to-transparent" />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-vitamin-600 via-vitamin-500 to-vitamin-400 absolute inset-0">
                {/* 기본 그라디언트 배경 */}
                <div className="absolute inset-0 bg-gradient-to-br from-vitamin-500/20 via-vitamin-400/10 to-transparent" />
              </div>
            )}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <h1 className="text-2xl font-bold text-white drop-shadow-2xl mb-2 whitespace-pre-line">
                {heroData.title}
              </h1>
              <p className="text-sm text-white/95 font-medium mb-4 whitespace-pre-line">
                {heroData.subtitle}
              </p>
              <div className="flex gap-2">
                <button className="bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white text-xs px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  {heroData.buttonText}
                </button>
                <button className="bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white text-xs px-4 py-2 rounded-lg hover:bg-white/30 transition-all">
                  {heroData.secondButtonText}
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-3 italic">
            💡 이미지가 업로드되면 배경에 부드러운 다크 오버레이가 적용되어 텍스트 가독성이 향상됩니다.
          </p>
        </div>
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
