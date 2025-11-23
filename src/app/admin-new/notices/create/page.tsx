'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin-new/AdminLayout';

export default function CreateNoticePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    important: false,
    status: 'published',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('공지사항이 등록되었습니다.');
        router.push('/admin-new/notices');
      } else {
        const error = await response.json();
        alert(`오류: ${error.error || '공지사항 등록에 실패했습니다.'}`);
      }
    } catch (error) {
      console.error('Failed to create notice:', error);
      alert('공지사항 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-gray-900 dark:text-gray-100 text-3xl font-bold tracking-tight">
          새 공지사항 작성
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
          새로운 공지사항을 작성합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
              placeholder="공지사항 제목을 입력하세요"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              카테고리
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
            >
              <option value="general">일반</option>
              <option value="event">이벤트</option>
              <option value="notice">공지</option>
              <option value="holiday">휴진</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              상태
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
            >
              <option value="published">게시됨</option>
              <option value="draft">임시저장</option>
              <option value="archived">내려감</option>
            </select>
          </div>

          {/* Important */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="important"
              checked={formData.important}
              onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
              className="w-4 h-4 text-[#f49d25] bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-600 rounded focus:ring-[#f49d25] focus:ring-2"
            />
            <label htmlFor="important" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              중요 공지사항으로 표시
            </label>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              required
              rows={12}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
              placeholder="공지사항 내용을 입력하세요"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a] transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[#f49d25] text-white hover:bg-[#f49d25]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
