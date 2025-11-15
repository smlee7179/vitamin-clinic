'use client';

import { useState, useEffect } from 'react';

interface FooterData {
  hospitalName: string;
  address: string;
  description: string;
  phone: string;
  weekdayHours: string;
  saturdayHours: string;
  copyright: string;
  quickLinks: Array<{
    label: string;
    href: string;
  }>;
  legalLinks: Array<{
    label: string;
    href: string;
  }>;
}

const DEFAULT_FOOTER: FooterData = {
  hospitalName: '비타민마취통증의학과',
  address: '부산 동구 중앙대로 375',
  description: '환자분들의 건강한 삶을 위해\n최선을 다하겠습니다.',
  phone: '051-469-7581',
  weekdayHours: '평일 09:00 - 18:00',
  saturdayHours: '토요일 09:00 - 13:00',
  copyright: '© 2024 비타민마취통증의학과. All rights reserved.',
  quickLinks: [
    { label: '병원 소개', href: '/about' },
    { label: '진료과목', href: '/services' },
    { label: '건강 정보', href: '/health-info' },
    { label: '공지사항', href: '/notices' },
    { label: '오시는 길', href: '/contact' },
  ],
  legalLinks: [
    { label: '개인정보처리방침', href: '/privacy' },
    { label: '이용약관', href: '/terms' },
  ]
};

export default function FooterEditor() {
  const [footerData, setFooterData] = useState<FooterData>(DEFAULT_FOOTER);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/content?section=footer');
      if (response.ok) {
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setFooterData(prev => ({ ...prev, ...data }));
        }
      }
    } catch (error) {
      console.error('Error loading footer data:', error);
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
          section: 'footer',
          data: footerData,
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
      console.error('Error saving footer data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const updateQuickLink = (index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...footerData.quickLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFooterData({ ...footerData, quickLinks: newLinks });
  };

  const updateLegalLink = (index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...footerData.legalLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFooterData({ ...footerData, legalLinks: newLinks });
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
          <span className="text-3xl mr-3">📄</span>
          푸터 콘텐츠 관리
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

      {/* Hospital Info Section */}
      <div className="space-y-4 p-6 bg-neutral-50 rounded-2xl">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">병원 정보</h4>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            병원명
          </label>
          <input
            type="text"
            value={footerData.hospitalName}
            onChange={(e) => setFooterData({ ...footerData, hospitalName: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            주소
          </label>
          <input
            type="text"
            value={footerData.address}
            onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            설명
          </label>
          <textarea
            value={footerData.description}
            onChange={(e) => setFooterData({ ...footerData, description: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
            rows={2}
          />
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="space-y-4 p-6 bg-neutral-50 rounded-2xl">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">연락처 정보</h4>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            전화번호
          </label>
          <input
            type="text"
            value={footerData.phone}
            onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
            placeholder="051-469-7581"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              평일 진료시간
            </label>
            <input
              type="text"
              value={footerData.weekdayHours}
              onChange={(e) => setFooterData({ ...footerData, weekdayHours: e.target.value })}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              토요일 진료시간
            </label>
            <input
              type="text"
              value={footerData.saturdayHours}
              onChange={(e) => setFooterData({ ...footerData, saturdayHours: e.target.value })}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="space-y-4 p-6 bg-neutral-50 rounded-2xl">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">빠른 링크</h4>
        {footerData.quickLinks.map((link, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                링크 텍스트
              </label>
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                링크 URL
              </label>
              <input
                type="text"
                value={link.href}
                onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Legal Links Section */}
      <div className="space-y-4 p-6 bg-neutral-50 rounded-2xl">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">하단 링크</h4>
        {footerData.legalLinks.map((link, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                링크 텍스트
              </label>
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLegalLink(index, 'label', e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                링크 URL
              </label>
              <input
                type="text"
                value={link.href}
                onChange={(e) => updateLegalLink(index, 'href', e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Copyright Section */}
      <div className="space-y-4 p-6 bg-neutral-50 rounded-2xl">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">저작권 표시</h4>
        <div>
          <input
            type="text"
            value={footerData.copyright}
            onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
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
