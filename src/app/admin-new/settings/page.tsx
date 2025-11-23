'use client';

import AdminLayout from '@/components/admin-new/AdminLayout';

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-gray-900 dark:text-gray-100 text-3xl font-bold tracking-tight">
          설정
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
          시스템 설정을 관리합니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* Site Settings */}
        <div className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-gray-100 text-xl font-bold">
              사이트 설정
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                병원명
              </label>
              <input
                type="text"
                defaultValue="비타민마취통증의학과"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                연락처
              </label>
              <input
                type="text"
                defaultValue="051-xxx-xxxx"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                주소
              </label>
              <input
                type="text"
                defaultValue="부산광역시 해운대구"
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

        {/* Admin Info */}
        <div className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-gray-100 text-xl font-bold">
              관리자 정보
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">버전:</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">마지막 로그인:</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {new Date().toLocaleDateString('ko-KR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">시스템 상태:</span>
                <span className="text-green-600 dark:text-green-400 font-medium">정상</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
