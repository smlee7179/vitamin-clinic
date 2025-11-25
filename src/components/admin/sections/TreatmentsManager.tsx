'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TreatmentsManager() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    spine: 0,
    joint: 0,
    special: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/treatments');
      if (response.ok) {
        const data = await response.json();
        setStats({
          total: data.length,
          active: data.filter((t: any) => t.active).length,
          spine: data.filter((t: any) => t.category === 'spine').length,
          joint: data.filter((t: any) => t.category === 'joint').length,
          special: data.filter((t: any) => t.category === 'special').length
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-semibold">전체 치료법</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-semibold">활성화</p>
            <p className="text-3xl font-bold text-green-900 mt-2">{stats.active}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-semibold">척추질환</p>
            <p className="text-3xl font-bold text-purple-900 mt-2">{stats.spine}</p>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <p className="text-sm text-pink-600 font-semibold">관절질환</p>
            <p className="text-3xl font-bold text-pink-900 mt-2">{stats.joint}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-600 font-semibold">특수치료</p>
            <p className="text-3xl font-bold text-orange-900 mt-2">{stats.special}</p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">치료법 관리</h3>
        <p className="text-gray-600 mb-6">
          치료법은 별도의 전용 관리 페이지에서 관리됩니다.
          아래 버튼을 클릭하여 치료법 관리 페이지로 이동하세요.
        </p>

        <div className="space-y-3">
          <Link
            href="/admin-new/treatments"
            className="flex items-center justify-between px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💉</span>
              <div>
                <p className="font-semibold">치료법 전체 관리</p>
                <p className="text-sm opacity-90">목록 조회, 추가, 수정, 삭제</p>
              </div>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <Link
            href="/admin-new/treatments/create"
            className="flex items-center justify-between px-6 py-4 bg-white border-2 border-orange-200 text-orange-600 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✏️</span>
              <div>
                <p className="font-semibold">새 치료법 추가</p>
                <p className="text-sm opacity-75">바로 치료법 추가하기</p>
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
            <span>치료법 항목 추가, 수정, 삭제</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>카테고리별 분류 (척추질환, 관절질환, 특수치료)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>치료법 상세 정보 관리</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>이미지 업로드 및 관리</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>활성화/비활성화 설정</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">✓</span>
            <span>순서 변경 (드래그 앤 드롭)</span>
          </li>
        </ul>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">팁</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 치료법은 카테고리별로 자동 필터링됩니다</li>
              <li>• 상세 정보는 각 치료법의 "상세 보기"에서 수정할 수 있습니다</li>
              <li>• 비활성화된 치료법은 사용자 페이지에 표시되지 않습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
