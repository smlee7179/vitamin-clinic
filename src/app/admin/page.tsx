'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // 즉시 /admin/new로 리디렉션
    router.replace('/admin/new');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vitamin-50 via-neutral-50 to-vitamin-100/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vitamin-500 mx-auto mb-4"></div>
        <p className="text-neutral-600 font-medium">새로운 관리자 페이지로 이동 중...</p>
      </div>
    </div>
  );
}
