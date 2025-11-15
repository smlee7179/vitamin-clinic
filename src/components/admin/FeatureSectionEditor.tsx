'use client';

import { useState, useEffect } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureSectionData {
  features: Feature[];
  experienceYears: number;
}

const DEFAULT_FEATURES: FeatureSectionData = {
  experienceYears: 60,
  features: [
    { icon: '🏥', title: '60년 진료 경험', description: '부산 지역 어르신 건강을 지켜온 오랜 노하우' },
    { icon: '👨‍⚕️', title: '노인 전문 진료', description: '고령 환자 맞춤 치료와 재활 프로그램' },
    { icon: '🤝', title: '따뜻한 치료', description: '환자 중심, 신뢰와 소통의 진료 철학' },
  ]
};

export default function FeatureSectionEditor() {
  const [featuresData, setFeaturesData] = useState<FeatureSectionData>(DEFAULT_FEATURES);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadFeaturesData();
  }, []);

  const loadFeaturesData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/content?section=features');
      if (response.ok) {
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setFeaturesData(prev => ({ ...prev, ...data }));
        }
      }
    } catch (error) {
      console.error('Error loading features data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'features',
          data: featuresData,
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error saving features data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...featuresData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFeaturesData({ ...featuresData, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-xl border-2 border-vitamin-100 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vitamin-500 mx-auto mb-4"></div>
        <p className="text-neutral-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-neutral-900 flex items-center">
          <span className="text-3xl mr-3">✨</span>
          핵심 특징 섹션 관리
        </h3>
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

      {/* Experience Years */}
      <div className="p-6 bg-gradient-to-r from-vitamin-50 to-vitamin-100 rounded-2xl">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">🏥</span>
          경험 년수
        </h4>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={featuresData.experienceYears}
            onChange={(e) => setFeaturesData({ ...featuresData, experienceYears: parseInt(e.target.value) || 0 })}
            className="w-32 px-4 py-3 border-2 border-vitamin-300 rounded-xl focus:border-vitamin-500 focus:outline-none text-2xl font-bold text-vitamin-600 text-center"
            min="0"
            max="100"
          />
          <span className="text-lg font-semibold text-neutral-700">년</span>
          <p className="text-sm text-neutral-600 ml-auto">
            첫 번째 카드에 표시될 년수입니다 (애니메이션 효과 포함)
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-neutral-900">특징 카드 (3개)</h4>

        {featuresData.features.map((feature, index) => (
          <div key={index} className="p-6 bg-neutral-50 rounded-2xl space-y-4 border-2 border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-md font-semibold text-neutral-800">
                {index === 0 ? '첫 번째 카드 (애니메이션 포함)' : `${index + 1}번째 카드`}
              </h5>
              <span className="text-3xl">{feature.icon}</span>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                아이콘 (이모지)
              </label>
              <input
                type="text"
                value={feature.icon}
                onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none text-2xl text-center"
                placeholder="🏥"
              />
              <p className="text-xs text-neutral-500 mt-1">
                이모지를 입력하세요 (예: 🏥, 👨‍⚕️, 🤝)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={feature.title}
                onChange={(e) => updateFeature(index, 'title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
                placeholder="60년 진료 경험"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                설명
              </label>
              <textarea
                value={feature.description}
                onChange={(e) => updateFeature(index, 'description', e.target.value)}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
                rows={2}
                placeholder="부산 지역 어르신 건강을 지켜온 오랜 노하우"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="p-6 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">👁️</span>
          미리보기
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First card with years */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-3">{featuresData.features[0].icon}</div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              <span className="text-vitamin-600">{featuresData.experienceYears}</span>년 진료 경험
            </h3>
            <p className="text-sm text-neutral-600">{featuresData.features[0].description}</p>
          </div>

          {/* Other cards */}
          {featuresData.features.slice(1).map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saveStatus === 'saving'}
        className="w-full bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-vitamin-600 hover:to-vitamin-700 transition-all duration-200 shadow-lg disabled:opacity-50"
      >
        {saveStatus === 'saving' ? '저장 중...' : '저장하기'}
      </button>
    </div>
  );
}
