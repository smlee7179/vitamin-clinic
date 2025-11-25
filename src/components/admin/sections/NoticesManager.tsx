'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NoticesManager() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/notices');
      if (response.ok) {
        const data = await response.json();
        setStats({
          total: data.length,
          published: data.filter((n: any) => n.status === 'published').length,
          draft: data.filter((n: any) => n.status === 'draft').length
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-semibold">전체 공지</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-semibold">게시중</p>
            <p className="text-3xl font-bold text-green-900 mt-2">{stats.published}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-semibold">임시저장</p>
            <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.draft}</p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">공지사항 관리</h3>
        <p className="text-gray-600 mb-6">
          공지사항은 별도의 전용 관리 페이지에서 관리됩니다.
          아래 버튼을 클릭하여 공지사항 관리 페이지로 이동하세요.
        </p>

        <div className="space-y-3">
          <Link
            href="/admin-new/notices"
            className="flex items-center justify-between px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📢</span>
              <div>
                <p className="font-semibold">공지사항 전체 관리</p>
                <p className="text-sm opacity-90">목록 조회, 추가, 수정, 삭제</p>
              </div>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <Link
            href="/admin-new/notices/create"
            className="flex items-center justify-between px-6 py-4 bg-white border-2 border-orange-200 text-orange-600 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✏️</span>
              <div>
                <p className="font-semibold">새 공지사항 작성</p>
                <p className="text-sm opacity-75">바로 공지사항 작성하기</p>
              </div>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-4">주요 기능</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>공지사항 작성 및 수정 (Rich Text Editor 지원)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>카테고리별 분류 (일반, 이벤트, 공지)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>중요 공지 설정 (상단 고정)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>게시 상태 관리 (게시, 임시저장, 내려감)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>검색 및 필터링</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>페이지네이션</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
