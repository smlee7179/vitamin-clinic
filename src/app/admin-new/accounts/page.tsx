'use client';

import AdminLayout from '@/components/admin-new/AdminLayout';

export default function AccountsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-900 text-3xl font-bold tracking-tight">
            계정 관리
          </p>
          <p className="text-gray-600 text-base font-normal leading-normal">
            관리자 계정을 관리합니다.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👤</div>
          <p className="text-gray-600 mb-4">계정 관리 기능은 준비 중입니다.</p>
          <p className="text-sm text-gray-500">
            현재 로그인된 계정으로 모든 관리 기능을 사용하실 수 있습니다.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
