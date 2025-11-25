'use client';

import { useState, useEffect } from 'react';

interface PageHeadingManagerProps {
  page: string;
  pageName: string;
}

interface PageHeading {
  id: string;
  page: string;
  title: string;
  subtitle: string | null;
}

export default function PageHeadingManager({ page, pageName }: PageHeadingManagerProps) {
  const [heading, setHeading] = useState<PageHeading | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHeading();
  }, [page]);

  const fetchHeading = async () => {
    try {
      const response = await fetch(`/api/page-heading?page=${page}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHeading(data);
          setTitle(data.title || '');
          setSubtitle(data.subtitle || '');
        }
      }
    } catch (error) {
      console.error('Failed to fetch page heading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/page-heading', {
        method: heading ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: heading?.id,
          page,
          title,
          subtitle: subtitle || null
        })
      });

      if (response.ok) {
        const data = await response.json();
        setHeading(data);
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
      {title && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
          <div className="bg-white rounded-xl p-8 max-w-3xl mx-auto border border-gray-200 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
            {subtitle && (
              <p className="text-lg text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">{pageName} 페이지 헤딩 설정</h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="페이지 제목을 입력하세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            부제목
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="부제목을 입력하세요 (선택사항)"
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || !title}
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
              <li>• 제목은 페이지 상단에 크게 표시됩니다</li>
              <li>• 부제목은 제목 아래에 작게 표시됩니다 (선택사항)</li>
              <li>• 간결하고 명확한 제목을 사용하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
