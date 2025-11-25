'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HospitalInfo {
  id: string;
  logoUrl: string | null;
  logoAlt: string;
}

export default function LogoManager() {
  const [info, setInfo] = useState<HospitalInfo | null>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [logoAlt, setLogoAlt] = useState('병원 로고');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await fetch('/api/hospital-info');
      if (response.ok) {
        const data = await response.json();
        setInfo(data);
        setLogoUrl(data.logoUrl || '');
        setLogoAlt(data.logoAlt || '병원 로고');
      }
    } catch (error) {
      console.error('Failed to fetch hospital info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/hospital-info', {
        method: info ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logoUrl: logoUrl || null,
          logoAlt
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      {logoUrl && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8">
          <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
          <div className="flex items-center justify-center bg-white p-6 rounded-lg">
            <div className="relative w-48 h-24">
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Logo URL */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          로고 이미지 URL
        </label>
        <input
          type="url"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://example.com/logo.png"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          이미지 자료실에서 업로드한 이미지 URL을 사용하세요.
        </p>
      </div>

      {/* Logo Alt Text */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          대체 텍스트 (Alt Text)
        </label>
        <input
          type="text"
          value={logoAlt}
          onChange={(e) => setLogoAlt(e.target.value)}
          placeholder="병원 로고"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          접근성을 위한 대체 텍스트입니다.
        </p>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
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

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">팁</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 로고는 투명 배경(PNG)을 권장합니다</li>
              <li>• 권장 크기: 가로 200-400px</li>
              <li>• 이미지 자료실에서 업로드 후 URL을 복사하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
