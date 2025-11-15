'use client';

import { useState, useEffect } from 'react';
import ModernImageUpload from './ModernImageUpload';

interface Service {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

interface ServicesData {
  orthopedic: Service;
  anesthesia: Service;
  rehabilitation: Service;
}

const DEFAULT_SERVICES: ServicesData = {
  orthopedic: {
    icon: '🦴',
    title: '정형외과',
    description: '관절염, 골절, 척추질환 등 근골격계 질환의 전문적인 진단과 치료',
    image: '',
  },
  anesthesia: {
    icon: '🏥',
    title: '마취통증의학과',
    description: '다양한 통증 질환의 정확한 진단과 효과적인 치료',
    image: '',
  },
  rehabilitation: {
    icon: '🏃',
    title: '재활의학과',
    description: '기능 회복과 삶의 질 향상을 위한 전문적인 재활치료',
    image: '',
  },
};

const EMOJI_OPTIONS = ['🦴', '🏥', '💊', '🏃', '⚕️', '💉', '🩺', '🏨', '💪', '🧬', '🫀', '🧠'];

interface ServiceCardsEditorProps {
  onSave?: () => void;
}

export default function ServiceCardsEditor({ onSave }: ServiceCardsEditorProps) {
  const [servicesData, setServicesData] = useState<ServicesData>(DEFAULT_SERVICES);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromDB();
  }, []);

  const loadFromDB = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/content?section=services');
      if (response.ok) {
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setServicesData({
            orthopedic: {
              ...DEFAULT_SERVICES.orthopedic,
              ...data.orthopedic,
            },
            anesthesia: {
              ...DEFAULT_SERVICES.anesthesia,
              ...data.anesthesia,
            },
            rehabilitation: {
              ...DEFAULT_SERVICES.rehabilitation,
              ...data.rehabilitation,
            },
          });
        }
      }
    } catch (error) {
      console.error('Failed to load services data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      console.log('💾 Saving services data:', servicesData);

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'services',
          data: servicesData,
        }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

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

      const result = await response.json();
      console.log('✅ Save successful:', result);

      setIsModified(false);
      if (onSave) onSave();
      alert('✅ 서비스 카드가 저장되었습니다!');
    } catch (error) {
      console.error('❌ Error saving services data:', error);
      alert(`❌ 저장 중 오류가 발생했습니다:\n${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const updateService = (
    serviceKey: keyof ServicesData,
    field: keyof Service,
    value: string
  ) => {
    setServicesData({
      ...servicesData,
      [serviceKey]: {
        ...servicesData[serviceKey],
        [field]: value,
      },
    });
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
            <span className="text-4xl mr-3">🏥</span> 서비스 카드
          </h3>
          <p className="text-base text-neutral-600 mt-2 font-medium">
            메인 페이지 하단의 3개 서비스 카드를 관리합니다
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

      <div className="space-y-8">
        {/* 정형외과 */}
        <div className="bg-gradient-to-br from-vitamin-50 via-white to-vitamin-50 p-6 rounded-2xl border-2 border-vitamin-200 shadow-md">
          <h4 className="text-xl font-bold text-vitamin-600 mb-4">1. 정형외과</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">아이콘</label>
              <select
                value={servicesData.orthopedic.icon}
                onChange={(e) => updateService('orthopedic', 'icon', e.target.value)}
                className="text-3xl p-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 bg-white cursor-pointer transition-all"
              >
                {EMOJI_OPTIONS.map((emoji) => (
                  <option key={emoji} value={emoji}>
                    {emoji}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">제목</label>
              <input
                type="text"
                value={servicesData.orthopedic.title}
                onChange={(e) => updateService('orthopedic', 'title', e.target.value)}
                className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
                placeholder="예: 정형외과"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">설명</label>
              <textarea
                value={servicesData.orthopedic.description}
                onChange={(e) => updateService('orthopedic', 'description', e.target.value)}
                className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all resize-none"
                rows={3}
                placeholder="서비스 설명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">이미지</label>
              <ModernImageUpload
                label="정형외과 이미지"
                currentImage={servicesData.orthopedic.image || ''}
                onUpload={(url) => updateService('orthopedic', 'image', url)}
                onDelete={() => updateService('orthopedic', 'image', '')}
                aspectRatio="square"
                maxSize={3}
                showUrlInput={true}
              />
            </div>
          </div>
        </div>

        {/* 마취통증의학과 */}
        <div className="bg-gradient-to-br from-vitamin-50 via-white to-vitamin-50 p-6 rounded-2xl border-2 border-vitamin-200 shadow-md">
          <h4 className="text-xl font-bold text-vitamin-600 mb-4">2. 마취통증의학과</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">아이콘</label>
              <select
                value={servicesData.anesthesia.icon}
                onChange={(e) => updateService('anesthesia', 'icon', e.target.value)}
                className="text-3xl p-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 bg-white cursor-pointer transition-all"
              >
                {EMOJI_OPTIONS.map((emoji) => (
                  <option key={emoji} value={emoji}>
                    {emoji}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">제목</label>
              <input
                type="text"
                value={servicesData.anesthesia.title}
                onChange={(e) => updateService('anesthesia', 'title', e.target.value)}
                className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
                placeholder="예: 마취통증의학과"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">설명</label>
              <textarea
                value={servicesData.anesthesia.description}
                onChange={(e) => updateService('anesthesia', 'description', e.target.value)}
                className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all resize-none"
                rows={3}
                placeholder="서비스 설명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">이미지</label>
              <ModernImageUpload
                label="마취통증의학과 이미지"
                currentImage={servicesData.anesthesia.image || ''}
                onUpload={(url) => updateService('anesthesia', 'image', url)}
                onDelete={() => updateService('anesthesia', 'image', '')}
                aspectRatio="square"
                maxSize={3}
                showUrlInput={true}
              />
            </div>
          </div>
        </div>

        {/* 재활의학과 */}
        <div className="bg-gradient-to-br from-vitamin-50 via-white to-vitamin-50 p-6 rounded-2xl border-2 border-vitamin-200 shadow-md">
          <h4 className="text-xl font-bold text-vitamin-600 mb-4">3. 재활의학과</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">아이콘</label>
              <select
                value={servicesData.rehabilitation.icon}
                onChange={(e) => updateService('rehabilitation', 'icon', e.target.value)}
                className="text-3xl p-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 bg-white cursor-pointer transition-all"
              >
                {EMOJI_OPTIONS.map((emoji) => (
                  <option key={emoji} value={emoji}>
                    {emoji}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">제목</label>
              <input
                type="text"
                value={servicesData.rehabilitation.title}
                onChange={(e) => updateService('rehabilitation', 'title', e.target.value)}
                className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
                placeholder="예: 재활의학과"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">설명</label>
              <textarea
                value={servicesData.rehabilitation.description}
                onChange={(e) => updateService('rehabilitation', 'description', e.target.value)}
                className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all resize-none"
                rows={3}
                placeholder="서비스 설명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">이미지</label>
              <ModernImageUpload
                label="재활의학과 이미지"
                currentImage={servicesData.rehabilitation.image || ''}
                onUpload={(url) => updateService('rehabilitation', 'image', url)}
                onDelete={() => updateService('rehabilitation', 'image', '')}
                aspectRatio="square"
                maxSize={3}
                showUrlInput={true}
              />
            </div>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="border-t-2 border-vitamin-100 pt-6">
          <h4 className="text-lg font-bold text-neutral-900 mb-4">미리보기</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([
              { key: 'orthopedic', data: servicesData.orthopedic },
              { key: 'anesthesia', data: servicesData.anesthesia },
              { key: 'rehabilitation', data: servicesData.rehabilitation },
            ] as const).map(({ data }, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-vitamin-100 hover:border-vitamin-300 transition-all duration-300 shadow-lg hover:shadow-vitamin-glow hover:-translate-y-2"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-vitamin-50 to-vitamin-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                {data.image ? (
                  <div className="w-24 h-24 mb-4 rounded-2xl overflow-hidden">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:rotate-12">
                    {data.icon}
                  </div>
                )}
                <h3 className="text-lg font-bold text-neutral-800 mb-3 group-hover:text-vitamin-700 transition-colors text-center">
                  {data.title}
                </h3>
                <p className="text-sm text-neutral-600 text-center leading-relaxed">
                  {data.description}
                </p>
              </div>
            ))}
          </div>
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
