'use client';

import AdminLayout from '@/components/admin-new/AdminLayout';

export default function AboutPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-gray-900 dark:text-gray-100 text-3xl font-bold tracking-tight">
          병원 소개 관리
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
          병원 소개 페이지의 내용을 관리합니다.
        </p>
      </div>

      <div className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              병원 소개
            </label>
            <textarea
              rows={6}
              defaultValue="비타민마취통증의학과는 부산 해운대구에 위치한 전문 의료기관입니다."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              의료진 정보
            </label>
            <textarea
              rows={4}
              defaultValue="전문 의료진이 환자분들의 건강을 책임집니다."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              시설 안내
            </label>
            <textarea
              rows={4}
              defaultValue="최신 의료 장비와 쾌적한 환경을 갖추고 있습니다."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100"
              disabled
            />
          </div>

          <div className="pt-4">
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            >
              저장 (준비 중)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 참고: 이 페이지는 향후 업데이트에서 완전한 기능이 추가될 예정입니다.
        </p>
      </div>
    </AdminLayout>
  );
}
