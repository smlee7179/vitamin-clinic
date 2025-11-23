'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: '홈페이지 관리', icon: 'home', href: '/admin-new' },
  { id: 'about', label: '병원 소개 관리', icon: 'info', href: '/admin-new/about' },
  { id: 'services', label: '진료 과목 안내', icon: 'medical_services', href: '/admin-new/services' },
  { id: 'treatments', label: '치료 소개 관리', icon: 'healing', href: '/admin-new/treatments' },
  { id: 'notices', label: '공지사항 관리', icon: 'campaign', href: '/admin-new/notices' },
  { id: 'popups', label: '팝업 관리', icon: 'web_asset', href: '/admin-new/popups' },
  { id: 'accounts', label: '계정 관리', icon: 'group', href: '/admin-new/accounts' },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/simple-logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full bg-[#f8f7f5] dark:bg-[#1a1a1a]">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2c2c2c] p-4">
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=100&h=100&fit=crop')`,
              }}
            />
            <div className="flex flex-col">
              <h1 className="text-gray-900 dark:text-gray-100 text-base font-bold leading-normal">
                비타민마취통증의학과
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">
                콘텐츠 관리 시스템
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 mt-6">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium leading-normal transition-colors ${
                    isActive
                      ? 'bg-[#f49d25]/10 text-[#f49d25] font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-[#f49d25]/10 hover:text-[#f49d25]'
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>
                    {item.icon}
                  </span>
                  <p>{item.label}</p>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col gap-1">
          <Link
            href="/admin-new/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-[#f49d25]/10 hover:text-[#f49d25] text-sm font-medium leading-normal"
          >
            <span className="material-symbols-outlined">settings</span>
            <p>설정</p>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-[#f49d25]/10 hover:text-[#f49d25] text-sm font-medium leading-normal"
          >
            <span className="material-symbols-outlined">logout</span>
            <p>로그아웃</p>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>

      {/* Material Symbols CSS */}
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
        }
        .material-symbols-outlined.fill {
          font-variation-settings: 'FILL' 1;
        }
      `}</style>
    </div>
  );
}
