'use client';

import { useState, useEffect } from 'react';

interface Condition {
  title: string;
  description: string;
  icon: string;
}

interface ClinicPage {
  id?: string;
  clinicType: 'spine' | 'joint' | 'pain';
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  introText1: string;
  introText2: string;
  conditions: string; // JSON string
}

interface ClinicPagesManagerProps {
  clinicType: 'spine' | 'joint' | 'pain';
}

const CLINIC_NAMES = {
  spine: '척추 클리닉',
  joint: '관절 클리닉',
  pain: '통증 클리닉'
};

export default function ClinicPagesManager({ clinicType }: ClinicPagesManagerProps) {
  const [clinicPage, setClinicPage] = useState<ClinicPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([]);

  useEffect(() => {
    fetchClinicPage();
  }, [clinicType]);

  const fetchClinicPage = async () => {
    try {
      const response = await fetch(`/api/clinic-pages?clinicType=${clinicType}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setClinicPage(data);
          setConditions(JSON.parse(data.conditions || '[]'));
        } else {
          // Initialize with default data if doesn't exist
          setClinicPage({
            clinicType,
            heroImageUrl: '',
            heroTitle: CLINIC_NAMES[clinicType],
            heroSubtitle: '',
            introText1: '',
            introText2: '',
            conditions: '[]'
          });
          setConditions([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch clinic page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!clinicPage) return;

    setSaving(true);
    setMessage('');

    try {
      const method = clinicPage.id ? 'PUT' : 'POST';
      const dataToSave = {
        ...clinicPage,
        conditions: JSON.stringify(conditions)
      };

      const response = await fetch('/api/clinic-pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });

      if (response.ok) {
        await fetchClinicPage();
        setMessage('✓ 저장되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ 저장 실패');
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage('✗ 저장 중 오류 발생');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCondition = () => {
    setConditions([...conditions, { title: '', description: '', icon: '🔴' }]);
  };

  const handleUpdateCondition = (index: number, field: keyof Condition, value: string) => {
    const updated = [...conditions];
    updated[index] = { ...updated[index], [field]: value };
    setConditions(updated);
  };

  const handleDeleteCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!clinicPage) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{CLINIC_NAMES[clinicType]} 관리</h3>
          <p className="text-sm text-gray-600 mt-1">{CLINIC_NAMES[clinicType]} 페이지의 내용을 관리합니다</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        {/* Hero Section */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-900">히어로 섹션</h4>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              히어로 이미지 URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={clinicPage.heroImageUrl}
              onChange={(e) => setClinicPage({ ...clinicPage, heroImageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              히어로 타이틀 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={clinicPage.heroTitle}
              onChange={(e) => setClinicPage({ ...clinicPage, heroTitle: e.target.value })}
              placeholder="척추 클리닉"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              히어로 서브타이틀 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={clinicPage.heroSubtitle}
              onChange={(e) => setClinicPage({ ...clinicPage, heroSubtitle: e.target.value })}
              placeholder="허리디스크, 척추관협착증, 척추측만증 등 다양한 척추질환을 전문적으로 치료합니다."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Intro Section */}
        <div className="space-y-4 border-t pt-6">
          <h4 className="font-bold text-gray-900">클리닉 소개</h4>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              소개 문단 1 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={clinicPage.introText1}
              onChange={(e) => setClinicPage({ ...clinicPage, introText1: e.target.value })}
              placeholder="첫 번째 소개 문단을 입력하세요."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              소개 문단 2 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={clinicPage.introText2}
              onChange={(e) => setClinicPage({ ...clinicPage, introText2: e.target.value })}
              placeholder="두 번째 소개 문단을 입력하세요."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Conditions Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-900">주요 치료 질환</h4>
            <button
              onClick={handleAddCondition}
              className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              + 질환 추가
            </button>
          </div>

          {conditions.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">등록된 질환이 없습니다</p>
              <button
                onClick={handleAddCondition}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                첫 질환 추가하기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {conditions.map((condition, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">질환 #{index + 1}</span>
                    <button
                      onClick={() => handleDeleteCondition(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">아이콘 (이모지)</label>
                      <input
                        type="text"
                        value={condition.icon}
                        onChange={(e) => handleUpdateCondition(index, 'icon', e.target.value)}
                        placeholder="🔴"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">질환명</label>
                      <input
                        type="text"
                        value={condition.title}
                        onChange={(e) => handleUpdateCondition(index, 'title', e.target.value)}
                        placeholder="허리디스크"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">설명</label>
                    <textarea
                      value={condition.description}
                      onChange={(e) => handleUpdateCondition(index, 'description', e.target.value)}
                      placeholder="척추뼈 사이의 디스크가 탈출하여 신경을 압박하는 질환"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={!clinicPage.heroImageUrl || !clinicPage.heroTitle || saving}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
}
