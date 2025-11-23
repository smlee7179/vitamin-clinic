'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';
import Link from 'next/link';

interface Treatment {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  active: boolean;
}

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const response = await fetch('/api/treatments');
      if (response.ok) {
        const data = await response.json();
        setTreatments(data);
      }
    } catch (error) {
      console.error('Failed to fetch treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const response = await fetch('/api/treatments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, active: !currentActive }),
      });

      if (response.ok) {
        // Refresh list
        fetchTreatments();
      } else {
        alert('상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to toggle treatment active:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`정말로 "${title}" 치료를 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/treatments?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('치료가 삭제되었습니다.');
        fetchTreatments();
      } else {
        alert('치료 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to delete treatment:', error);
      alert('치료 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-900 dark:text-gray-100 text-3xl font-bold tracking-tight">
            치료 소개 관리
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
            홈페이지에 표시되는 치료 항목을 관리합니다.
          </p>
        </div>
        <Link
          href="/admin-new/treatments/create"
          className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-[#f49d25] text-white text-sm font-bold leading-normal shadow-sm hover:bg-[#f49d25]/90 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            add
          </span>
          <span className="truncate">새 치료 추가</span>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                </div>
              </div>
            </div>
          ))
        ) : treatments.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">등록된 치료가 없습니다.</p>
          </div>
        ) : (
          treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#f49d25] to-[#fb923c] rounded-lg text-2xl">
                  {treatment.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900 dark:text-gray-100 font-bold">
                      {treatment.title}
                    </h3>
                    {!treatment.active && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        비활성
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {treatment.description}
                  </p>
                </div>
              </div>

              {treatment.features && treatment.features.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-2">
                    주요 특징:
                  </p>
                  <ul className="space-y-1">
                    {treatment.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="mr-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href={`/admin-new/treatments/${treatment.id}`}
                  className="flex-1 text-center px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a] transition-colors"
                >
                  수정
                </Link>
                <button
                  onClick={() => handleToggleActive(treatment.id, treatment.active)}
                  className={`flex-1 text-center px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    treatment.active
                      ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      : 'border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
                >
                  {treatment.active ? '비활성화' : '활성화'}
                </button>
                <button
                  onClick={() => handleDelete(treatment.id, treatment.title)}
                  className="px-3 py-1.5 rounded-lg border border-red-500 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
