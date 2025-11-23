'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';

interface SiteSettings {
  hospitalName: string;
  phone: string;
  address: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    hospitalName: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const responses = await Promise.all([
        fetch('/api/content?section=settings-hospital-name'),
        fetch('/api/content?section=settings-phone'),
        fetch('/api/content?section=settings-address'),
      ]);

      const data = await Promise.all(responses.map(r => r.ok ? r.json() : null));

      setSettings({
        hospitalName: data[0]?.content || '비타민마취통증의학과',
        phone: data[1]?.content || '051-xxx-xxxx',
        address: data[2]?.content || '부산광역시 해운대구',
      });
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = [
        { section: 'settings-hospital-name', data: { content: settings.hospitalName } },
        { section: 'settings-phone', data: { content: settings.phone } },
        { section: 'settings-address', data: { content: settings.address } },
      ];

      const responses = await Promise.all(
        updates.map(data =>
          fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
        )
      );

      const allSuccessful = responses.every(r => r.ok);

      if (allSuccessful) {
        alert('설정이 저장되었습니다.');
      } else {
        alert('일부 설정 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-gray-900 text-3xl font-bold tracking-tight">
          설정
        </p>
        <p className="text-gray-600 text-base font-normal leading-normal">
          시스템 설정을 관리합니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* Site Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900 text-xl font-bold">
              사이트 설정
            </h3>
          </div>
          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">로딩 중...</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  병원명
                </label>
                <input
                  type="text"
                  value={settings.hospitalName}
                  onChange={(e) => setSettings({ ...settings, hospitalName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
                  placeholder="병원명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  연락처
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
                  placeholder="연락처를 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  주소
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
                  placeholder="주소를 입력하세요"
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#f49d25] text-white font-medium hover:bg-[#f49d25]/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? '저장 중...' : '저장'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900 text-xl font-bold">
              시스템 정보
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">버전:</span>
                <span className="text-gray-900 font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">마지막 업데이트:</span>
                <span className="text-gray-900 font-medium">
                  {new Date().toLocaleDateString('ko-KR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">시스템 상태:</span>
                <span className="text-green-600 font-medium">정상</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 참고: 저장된 설정은 웹사이트 전체에 적용됩니다. 변경 후 반드시 저장 버튼을 클릭하세요.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
