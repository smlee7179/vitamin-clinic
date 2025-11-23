'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';

interface ContentData {
  intro: string;
  staff: string;
  facilities: string;
}

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContentData>({
    intro: '',
    staff: '',
    facilities: '',
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const responses = await Promise.all([
        fetch('/api/content?page=about&section=intro'),
        fetch('/api/content?page=about&section=staff'),
        fetch('/api/content?page=about&section=facilities'),
      ]);

      const data = await Promise.all(responses.map(r => r.json()));

      setContent({
        intro: data[0]?.content || '비타민마취통증의학과는 부산 해운대구에 위치한 전문 의료기관입니다.',
        staff: data[1]?.content || '전문 의료진이 환자분들의 건강을 책임집니다.',
        facilities: data[2]?.content || '최신 의료 장비와 쾌적한 환경을 갖추고 있습니다.',
      });
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = [
        { page: 'about', section: 'intro', content: content.intro },
        { page: 'about', section: 'staff', content: content.staff },
        { page: 'about', section: 'facilities', content: content.facilities },
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
        alert('저장되었습니다.');
      } else {
        alert('일부 내용 저장에 실패했습니다.');
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
          병원 소개 관리
        </p>
        <p className="text-gray-600 text-base font-normal leading-normal">
          병원 소개 페이지의 내용을 관리합니다.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">로딩 중...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                병원 소개
              </label>
              <textarea
                rows={6}
                value={content.intro}
                onChange={(e) => setContent({ ...content, intro: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
                placeholder="병원 소개 내용을 입력하세요..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                의료진 정보
              </label>
              <textarea
                rows={4}
                value={content.staff}
                onChange={(e) => setContent({ ...content, staff: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
                placeholder="의료진 정보를 입력하세요..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                시설 안내
              </label>
              <textarea
                rows={4}
                value={content.facilities}
                onChange={(e) => setContent({ ...content, facilities: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
                placeholder="시설 안내 내용을 입력하세요..."
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
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 참고: 의료진 개별 정보는 "의료진 관리" 메뉴에서 관리할 수 있습니다.
        </p>
      </div>
    </AdminLayout>
  );
}
