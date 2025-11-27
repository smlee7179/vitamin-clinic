'use client';

import { useState, useEffect } from 'react';

interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  fax: string | null;
  email: string | null;
  kakaoMapUrl: string | null;
  naverMapUrl: string | null;
  googleMapUrl: string | null;
  busInfo: string | null;
  subwayInfo: string | null;
  parkingInfo: string | null;
}

export default function ContactInfoManager() {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    fax: '',
    email: '',
    mapImageUrl: '',
    kakaoMapUrl: '',
    naverMapUrl: '',
    googleMapUrl: '',
    busInfo: '',
    subwayInfo: '',
    parkingInfo: ''
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/contact-info');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setInfo(data);
          setFormData({
            address: data.address || '',
            phone: data.phone || '',
            fax: data.fax || '',
            email: data.email || '',
            mapImageUrl: data.mapImageUrl || '',
            kakaoMapUrl: data.kakaoMapUrl || '',
            naverMapUrl: data.naverMapUrl || '',
            googleMapUrl: data.googleMapUrl || '',
            busInfo: data.busInfo || '',
            subwayInfo: data.subwayInfo || '',
            parkingInfo: data.parkingInfo || ''
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact-info', {
        method: info ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: info?.id,
          ...formData
        })
      });

      if (response.ok) {
        const data = await response.json();
        setInfo(data);
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

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Basic Info Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">기본 정보</h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            주소 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="서울특별시 강남구 테헤란로 123"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="02-1234-5678"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              팩스번호
            </label>
            <input
              type="tel"
              value={formData.fax}
              onChange={(e) => handleChange('fax', e.target.value)}
              placeholder="02-1234-5679"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            이메일
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="contact@hospital.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Map URLs Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">지도 정보</h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            지도 이미지 URL
          </label>
          <input
            type="url"
            value={formData.mapImageUrl}
            onChange={(e) => handleChange('mapImageUrl', e.target.value)}
            placeholder="https://example.com/map-image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="mt-2 text-sm text-gray-500">
            지도 스크린샷 이미지 URL을 입력하세요 (오시는 길 페이지에 표시됩니다)
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            네이버맵 URL
          </label>
          <input
            type="url"
            value={formData.naverMapUrl}
            onChange={(e) => handleChange('naverMapUrl', e.target.value)}
            placeholder="https://map.naver.com/..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="mt-2 text-sm text-gray-500">
            네이버 지도에서 공유 버튼을 눌러 URL을 복사하세요
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            카카오맵 URL
          </label>
          <input
            type="url"
            value={formData.kakaoMapUrl}
            onChange={(e) => handleChange('kakaoMapUrl', e.target.value)}
            placeholder="https://map.kakao.com/..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            구글맵 URL
          </label>
          <input
            type="url"
            value={formData.googleMapUrl}
            onChange={(e) => handleChange('googleMapUrl', e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Transportation Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">대중교통 안내</h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            버스 안내
          </label>
          <textarea
            value={formData.busInfo}
            onChange={(e) => handleChange('busInfo', e.target.value)}
            placeholder="간선버스: 143, 148, 471&#10;지선버스: 3011, 3420"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="mt-2 text-sm text-gray-500">
            줄바꿈은 Enter 키를 사용하세요
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            지하철 안내
          </label>
          <textarea
            value={formData.subwayInfo}
            onChange={(e) => handleChange('subwayInfo', e.target.value)}
            placeholder="2호선 강남역 3번 출구에서 도보 5분&#10;신분당선 강남역 10번 출구에서 도보 3분"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="mt-2 text-sm text-gray-500">
            줄바꿈은 Enter 키를 사용하세요
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            주차 안내
          </label>
          <textarea
            value={formData.parkingInfo}
            onChange={(e) => handleChange('parkingInfo', e.target.value)}
            placeholder="건물 지하 1~3층 주차 가능 (방문 시 2시간 무료)"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || !formData.address || !formData.phone}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? '저장 중...' : '저장'}
        </button>

        {message && (
          <span className={`text-sm font-medium ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">팁</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 주소와 전화번호는 필수 항목입니다</li>
              <li>• 지도 이미지 URL: 지도 스크린샷을 업로드하고 URL을 입력하세요</li>
              <li>• 네이버맵 URL: 지도에서 공유 버튼을 눌러 링크를 복사하세요</li>
              <li>• 대중교통 안내는 줄바꿈을 사용하여 보기 좋게 작성하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
