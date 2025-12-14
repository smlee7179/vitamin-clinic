'use client';

import { useState, useEffect } from 'react';

interface SiteSettings {
  id: string;
  siteTitle: string;
  siteDescription: string;
  keywords: string | null;
  ogImageUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  twitterImageUrl: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  faviconUrl: string | null;
}

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'seo' | 'og' | 'twitter'>('og');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('설정이 저장되었습니다!');
        fetchSettings();
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('저장 중 오류가 발생했습니다.');
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

  if (!settings) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>설정을 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SEO 및 링크 공유 설정</h2>
          <p className="text-sm text-gray-500 mt-1">
            사이트 제목, 설명, 링크 공유 시 보이는 썸네일 이미지를 관리합니다
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('og')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'og'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🖼️ 링크 공유 썸네일 (Open Graph)
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'seo'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🔍 기본 SEO 설정
          </button>
          <button
            onClick={() => setActiveTab('twitter')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'twitter'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🐦 트위터 카드
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        {/* Open Graph Tab */}
        {activeTab === 'og' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Open Graph 이미지 설정
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                카카오톡, 페이스북, 네이버 등에서 링크 공유 시 표시되는 썸네일 이미지입니다.
                <br />
                권장 크기: 1200 x 630px (비율 1.91:1)
              </p>
            </div>

            {/* Image Preview */}
            {settings.ogImageUrl && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  현재 이미지 미리보기
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden max-w-md">
                  <img
                    src={settings.ogImageUrl}
                    alt="OG Image Preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이미지 URL
              </label>
              <input
                type="url"
                value={settings.ogImageUrl || ''}
                onChange={(e) =>
                  setSettings({ ...settings, ogImageUrl: e.target.value })
                }
                placeholder="https://example.com/og-image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                이미지를 업로드하고 URL을 입력하세요
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG 제목 (선택사항)
              </label>
              <input
                type="text"
                value={settings.ogTitle || ''}
                onChange={(e) =>
                  setSettings({ ...settings, ogTitle: e.target.value })
                }
                placeholder="비타민 의원 - 부산 정형외과"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                비워두면 기본 사이트 제목이 사용됩니다
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG 설명 (선택사항)
              </label>
              <textarea
                value={settings.ogDescription || ''}
                onChange={(e) =>
                  setSettings({ ...settings, ogDescription: e.target.value })
                }
                placeholder="부산 해운대구 비타민 의원은 노인 친화적 정형외과 전문병원입니다."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                비워두면 기본 사이트 설명이 사용됩니다
              </p>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                기본 SEO 설정
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                검색 엔진에 표시되는 기본 정보를 설정합니다.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사이트 제목
              </label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) =>
                  setSettings({ ...settings, siteTitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사이트 설명
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                키워드 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={settings.keywords || ''}
                onChange={(e) =>
                  setSettings({ ...settings, keywords: e.target.value })
                }
                placeholder="부산 정형외과, 해운대 정형외과, 노인 친화적 병원"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Twitter Tab */}
        {activeTab === 'twitter' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                트위터 카드 설정
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                트위터(X)에서 링크 공유 시 표시되는 정보입니다.
                <br />
                비워두면 Open Graph 설정이 사용됩니다.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                트위터 이미지 URL
              </label>
              <input
                type="url"
                value={settings.twitterImageUrl || ''}
                onChange={(e) =>
                  setSettings({ ...settings, twitterImageUrl: e.target.value })
                }
                placeholder="https://example.com/twitter-image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                트위터 제목
              </label>
              <input
                type="text"
                value={settings.twitterTitle || ''}
                onChange={(e) =>
                  setSettings({ ...settings, twitterTitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                트위터 설명
              </label>
              <textarea
                value={settings.twitterDescription || ''}
                onChange={(e) =>
                  setSettings({ ...settings, twitterDescription: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
