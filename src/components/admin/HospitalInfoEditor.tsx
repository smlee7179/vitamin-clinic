'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

interface HospitalInfo {
  name: string;
  description: string;
  phone: string;
  address: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  logo?: string;
  heroImage?: string;
}

interface HospitalInfoEditorProps {
  onSave?: () => void;
}

const DEFAULT_INFO: HospitalInfo = {
  name: '비타민마취통증의학과의원',
  description: '환자 중심의 전문적인 통증 치료',
  phone: '051-469-7581',
  address: '부산광역시 해운대구 센텀동로 99',
  hours: {
    weekday: '평일 09:00 - 18:00',
    saturday: '토요일 09:00 - 13:00',
    sunday: '일요일 휴진'
  }
};

export default function HospitalInfoEditor({ onSave }: HospitalInfoEditorProps) {
  const [info, setInfo] = useState<HospitalInfo>(DEFAULT_INFO);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    loadFromDB();
  }, []);

  const loadFromDB = async () => {
    try {
      const response = await fetch('/api/content?section=hospital_info');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setInfo(JSON.parse(data.data));
        }
      }
    } catch (error) {
      console.error('Failed to load hospital info from DB:', error);
      // Fallback to localStorage
      const saved = localStorage.getItem('hospitalInfo');
      if (saved) {
        try {
          setInfo(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load hospital info');
        }
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'hospital_info',
          data: JSON.stringify(info),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      // Also save to localStorage for backward compatibility
      localStorage.setItem('hospitalInfo', JSON.stringify(info));
      setIsModified(false);
      if (onSave) onSave();
      alert('병원 정보가 저장되었습니다!');
    } catch (error) {
      console.error('Error saving hospital info:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const updateField = (field: keyof HospitalInfo, value: any) => {
    setInfo({ ...info, [field]: value });
    setIsModified(true);
  };

  const updateHours = (period: keyof HospitalInfo['hours'], value: string) => {
    setInfo({
      ...info,
      hours: { ...info.hours, [period]: value }
    });
    setIsModified(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🏥</span> 병원 정보
          </h3>
          <p className="text-sm text-gray-600 mt-1">기본 병원 정보와 이미지를 관리합니다</p>
        </div>
        {isModified && (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            💾 저장
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* 기본 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">병원명</label>
            <input
              type="text"
              value={info.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="병원명"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
            <input
              type="tel"
              value={info.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="051-XXX-XXXX"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">병원 소개</label>
          <textarea
            value={info.description}
            onChange={(e) => updateField('description', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={3}
            placeholder="병원 소개 문구"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
          <input
            type="text"
            value={info.address}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="병원 주소"
          />
        </div>

        {/* 진료 시간 */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">진료 시간</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">평일</label>
              <input
                type="text"
                value={info.hours.weekday}
                onChange={(e) => updateHours('weekday', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="예: 평일 09:00 - 18:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">토요일</label>
              <input
                type="text"
                value={info.hours.saturday}
                onChange={(e) => updateHours('saturday', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="예: 토요일 09:00 - 13:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">일요일</label>
              <input
                type="text"
                value={info.hours.sunday}
                onChange={(e) => updateHours('sunday', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="예: 일요일 휴진"
              />
            </div>
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">이미지 관리</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload
              label="로고 이미지"
              currentImage={info.logo}
              onUpload={(url) => updateField('logo', url)}
              onDelete={() => updateField('logo', undefined)}
              maxSize={2}
            />
            <ImageUpload
              label="메인 히어로 이미지"
              currentImage={info.heroImage}
              onUpload={(url) => updateField('heroImage', url)}
              onDelete={() => updateField('heroImage', undefined)}
              maxSize={5}
            />
          </div>
        </div>
      </div>

      {isModified && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ 변경사항이 저장되지 않았습니다. 저장 버튼을 클릭하세요.
          </p>
        </div>
      )}
    </div>
  );
}
