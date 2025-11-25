'use client';

import { useState, useEffect } from 'react';

interface PageNoticeManagerProps {
  page: string;
  pageName: string;
}

interface PageNotice {
  id: string;
  page: string;
  content: string;
  type: string; // 'info', 'warning', 'alert'
  active: boolean;
}

export default function PageNoticeManager({ page, pageName }: PageNoticeManagerProps) {
  const [notice, setNotice] = useState<PageNotice | null>(null);
  const [content, setContent] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'alert'>('info');
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotice();
  }, [page]);

  const fetchNotice = async () => {
    try {
      const response = await fetch(`/api/page-notice?page=${page}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setNotice(data);
          setContent(data.content || '');
          setType(data.type || 'info');
          setActive(data.active ?? true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch page notice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/page-notice', {
        method: notice ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: notice?.id,
          page,
          content,
          type,
          active
        })
      });

      if (response.ok) {
        const data = await response.json();
        setNotice(data);
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

  const getNoticeStyle = (noticeType: string) => {
    switch (noticeType) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'alert':
        return 'bg-red-50 border-red-200 text-red-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  const getNoticeIcon = (noticeType: string) => {
    switch (noticeType) {
      case 'warning':
        return '⚠️';
      case 'alert':
        return '🚨';
      default:
        return 'ℹ️';
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
      {content && active && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
          <div className={`rounded-xl p-6 border-2 ${getNoticeStyle(type)}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getNoticeIcon(type)}</span>
              <p className="flex-1 whitespace-pre-wrap">{content}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">{pageName} 참고사항 설정</h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="참고사항을 입력하세요&#10;예: 예약 없이 방문하시는 경우 대기시간이 길어질 수 있습니다."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="mt-2 text-sm text-gray-500">
            줄바꿈은 Enter 키를 사용하세요
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            알림 타입
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="info"
                checked={type === 'info'}
                onChange={(e) => setType(e.target.value as 'info')}
                className="w-4 h-4 text-blue-500"
              />
              <span className="text-sm text-gray-700">정보 (파란색)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="warning"
                checked={type === 'warning'}
                onChange={(e) => setType(e.target.value as 'warning')}
                className="w-4 h-4 text-yellow-500"
              />
              <span className="text-sm text-gray-700">주의 (노란색)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="alert"
                checked={type === 'alert'}
                onChange={(e) => setType(e.target.value as 'alert')}
                className="w-4 h-4 text-red-500"
              />
              <span className="text-sm text-gray-700">경고 (빨간색)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-sm font-semibold text-gray-700">참고사항 표시</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || !content}
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
              <li>• 참고사항은 페이지 하단에 강조 박스로 표시됩니다</li>
              <li>• 중요도에 따라 적절한 타입을 선택하세요</li>
              <li>• 비활성화하면 사용자에게 표시되지 않습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
