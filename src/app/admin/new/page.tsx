'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LogoManager from '@/components/admin/sections/LogoManager';
import FooterManager from '@/components/admin/sections/FooterManager';
import HeroCarouselManager from '@/components/admin/sections/HeroCarouselManager';
import NoticesManager from '@/components/admin/sections/NoticesManager';
import TreatmentsManager from '@/components/admin/sections/TreatmentsManager';

export default function NewAdminPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('main');
  const [activeSection, setActiveSection] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => { setHydrated(true); }, []);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check-session');
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/admin/login');
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/simple-logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/admin/login');
    }
  };

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  // Loading state
  if (!hydrated || isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">관리자 페이지를 불러오는 중...</p>
        </div>
      </div>
    );
  };

  // Redirect to login (will happen in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  const menuStructure = [
    {
      id: 'global',
      name: '전역 설정',
      icon: '⚙️',
      sections: [
        { id: 'logo', name: '병원 로고 관리' },
        { id: 'footer', name: '푸터 정보 관리' }
      ]
    },
    {
      id: 'main',
      name: '메인 페이지',
      icon: '🏠',
      sections: [
        { id: 'hero-carousel', name: '히어로 캐러셀 관리' }
      ]
    },
    {
      id: 'about',
      name: '병원소개',
      icon: '🏥',
      sections: [
        { id: 'hero-image', name: '히어로 이미지' },
        { id: 'greeting', name: '인사말 관리' },
        { id: 'equipment', name: '병원 장비 관리' },
        { id: 'tour', name: '병원 둘러보기 관리' }
      ]
    },
    {
      id: 'services',
      name: '진료안내',
      icon: '💊',
      sections: [
        { id: 'hero-image', name: '히어로 이미지' },
        { id: 'services', name: '진료 과목 관리' }
      ]
    },
    {
      id: 'treatments',
      name: '치료소개',
      icon: '💉',
      sections: [
        { id: 'hero-image', name: '히어로 이미지' },
        { id: 'treatments', name: '치료법 항목 관리' },
        { id: 'treatment-detail', name: '치료 상세 정보 관리' }
      ]
    },
    {
      id: 'hours',
      name: '진료시간',
      icon: '⏰',
      sections: [
        { id: 'page-heading', name: '페이지 헤딩' },
        { id: 'clinic-hours', name: '병원 진료시간' },
        { id: 'doctor-schedule', name: '원장 시간표' },
        { id: 'notice', name: '참고사항' }
      ]
    },
    {
      id: 'notices',
      name: '공지사항',
      icon: '📢',
      sections: [
        { id: 'hero-banner', name: '히어로 배너' },
        { id: 'notices', name: '공지사항 목록 관리' },
        { id: 'info-cards', name: '안내 정보 카드' }
      ]
    },
    {
      id: 'contact',
      name: '오시는길',
      icon: '📍',
      sections: [
        { id: 'page-heading', name: '페이지 헤딩' },
        { id: 'map', name: '지도 관리' },
        { id: 'contact-info', name: '연락처 정보' },
        { id: 'transportation', name: '대중교통 안내' }
      ]
    }
  ];

  const currentMenu = menuStructure.find(m => m.id === activeMenu);

  const renderSectionContent = () => {
    const key = `${activeMenu}-${activeSection}`;

    switch (key) {
      // 전역 설정
      case 'global-logo':
        return <LogoManager />;
      case 'global-footer':
        return <FooterManager />;

      // 메인 페이지
      case 'main-hero-carousel':
        return <HeroCarouselManager />;

      // 치료소개
      case 'treatments-treatments':
        return <TreatmentsManager />;

      // 공지사항
      case 'notices-notices':
        return <NoticesManager />;

      default:
        return (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">🚧 준비 중입니다</p>
            <p className="text-sm">이 섹션의 관리 UI는 곧 추가될 예정입니다.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col fixed h-full z-30`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div>
                <h2 className="text-lg font-bold text-gray-900">관리자</h2>
                <p className="text-xs text-gray-500">비타민병원</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-xl">{isSidebarOpen ? '◀' : '▶'}</span>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-3">
          {menuStructure.map((menu) => (
            <button
              key={menu.id}
              onClick={() => {
                setActiveMenu(menu.id);
                setActiveSection('');
              }}
              className={`w-full flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center px-2'} py-3 mb-2 rounded-lg transition-all ${
                activeMenu === menu.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={!isSidebarOpen ? menu.name : undefined}
            >
              <span className="text-2xl">{menu.icon}</span>
              {isSidebarOpen && <span className="ml-3 font-medium">{menu.name}</span>}
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-gray-200 space-y-2">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center px-2'} py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all`}
            title={!isSidebarOpen ? '미리보기' : undefined}
          >
            <span className="text-xl">👁️</span>
            {isSidebarOpen && <span className="ml-3 text-sm font-medium">미리보기</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center px-2'} py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all`}
            title={!isSidebarOpen ? '로그아웃' : undefined}
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span className="ml-3 text-sm font-medium">로그아웃</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentMenu?.name}</h1>
                <p className="text-sm text-gray-500 mt-1">페이지 섹션을 관리하세요</p>
              </div>
              {activeSection && (
                <button
                  onClick={() => setActiveSection('')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  ← 섹션 목록으로
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {!activeSection ? (
            // Section List
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentMenu?.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {section.name}
                    </h3>
                    <span className="text-2xl group-hover:scale-110 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">클릭하여 관리하기</p>
                </button>
              ))}
            </div>
          ) : (
            // Section Content
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {currentMenu?.sections.find(s => s.id === activeSection)?.name}
              </h2>
              {renderSectionContent()}
            </div>
          )}
        </main>
      </div>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <span className="text-xl mr-3">✓</span>
            <div>
              <p className="font-semibold">저장 완료!</p>
              <p className="text-sm opacity-90">변경사항이 저장되었습니다.</p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Link */}
      <Link
        href="/admin/gallery"
        className="fixed bottom-8 right-8 bg-purple-500 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-600 transition-all flex items-center font-bold z-40"
      >
        <span className="text-xl mr-2">🖼️</span>
        이미지 자료실
      </Link>
    </div>
  );
}
