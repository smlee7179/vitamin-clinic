'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminDashboard from '../../../components/admin/AdminDashboard';
import HeroEditor from '../../../components/admin/HeroEditor';
import ServiceCardsEditor from '../../../components/admin/ServiceCardsEditor';
import GalleryEditor from '../../../components/admin/GalleryEditor';
import UnifiedContentManager from '../../../components/admin/UnifiedContentManager';
import FooterEditor from '../../../components/admin/FooterEditor';
import FeatureSectionEditor from '../../../components/admin/FeatureSectionEditor';

export default function NewAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hydrated, setHydrated] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
  }

  // Redirect to login (will happen in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'dashboard', name: '대시보드', icon: 'ri-dashboard-line' },
    { id: 'unified', name: '통합 콘텐츠 관리', icon: 'ri-file-edit-line' },
    { id: 'home', name: '홈 (메인 화면)', icon: 'ri-home-line' },
    { id: 'about', name: '병원 소개', icon: 'ri-building-line' },
    { id: 'services', name: '진료과목', icon: 'ri-hospital-line' },
    { id: 'health-info', name: '건강 정보', icon: 'ri-heart-pulse-line' },
    { id: 'notices', name: '공지사항', icon: 'ri-notification-line' },
    { id: 'contact', name: '오시는 길', icon: 'ri-map-pin-line' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitamin-50 via-neutral-50 to-vitamin-100/30">
      {/* Header - Vitamin 스타일 */}
      <header className="bg-white/90 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b-2 border-vitamin-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-vitamin-500 to-vitamin-600 rounded-2xl flex items-center justify-center shadow-lg shadow-vitamin-500/30 animate-scale-in">
                <i className="ri-settings-3-line text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-neutral-900">관리자 시스템</h1>
                <p className="text-sm font-semibold text-vitamin-600">비타민마취통증의학과</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                target="_blank"
                className="flex items-center px-5 py-2.5 text-neutral-700 hover:text-vitamin-600 hover:bg-vitamin-50 rounded-xl transition-all duration-200 font-semibold border-2 border-neutral-200 hover:border-vitamin-300"
              >
                <i className="ri-eye-line mr-2"></i>
                미리보기
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-5 py-2.5 text-neutral-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-semibold border-2 border-neutral-200 hover:border-red-300"
              >
                <i className="ri-logout-box-line mr-2"></i>
                로그아웃
              </button>
            </div>
          </div>

          {/* Tabs - Vitamin 스타일 */}
          <div className="flex space-x-2 overflow-x-auto pb-4 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-t-2xl transition-all duration-200 whitespace-nowrap font-semibold ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white shadow-lg shadow-vitamin-500/30 scale-105'
                    : 'bg-white/70 text-neutral-700 hover:bg-vitamin-50 hover:text-vitamin-600 border-b-2 border-transparent hover:border-vitamin-300'
                }`}
              >
                <i className={`${tab.icon} mr-2 text-lg`}></i>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed top-24 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-in slide-in-from-right">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <i className="ri-check-line text-lg"></i>
            </div>
            <div>
              <p className="font-semibold">저장 완료!</p>
              <p className="text-sm opacity-90">변경사항이 저장되었습니다.</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'unified' && <UnifiedContentManager />}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <HeroEditor onSave={handleSave} />
            <FeatureSectionEditor />
            <ServiceCardsEditor onSave={handleSave} />
            <GalleryEditor onSave={handleSave} />
            <FooterEditor />
          </div>
        )}
        {activeTab === 'about' && (
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100">
            <h3 className="text-3xl font-extrabold text-neutral-900 flex items-center mb-6">
              <span className="text-4xl mr-3">🏥</span> 병원 소개
            </h3>
            <p className="text-neutral-600 mb-4">
              병원 소개 페이지는 다음 섹션으로 구성되어 있습니다:
            </p>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <span className="text-vitamin-500 mr-2">•</span>
                <div>
                  <strong>원장 소개 (DirectorSection)</strong>
                  <p className="text-sm text-neutral-600">원장님 정보는 Prisma Content 모델을 통해 <code className="bg-neutral-100 px-2 py-1 rounded">/admin</code> 페이지에서 관리됩니다.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-vitamin-500 mr-2">•</span>
                <div>
                  <strong>진료 철학 (PhilosophySection)</strong>
                  <p className="text-sm text-neutral-600">현재 하드코딩되어 있습니다.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-vitamin-500 mr-2">•</span>
                <div>
                  <strong>갤러리 (GallerySection)</strong>
                  <p className="text-sm text-neutral-600">이미지는 <Link href="/admin/gallery" className="text-vitamin-600 hover:underline">/admin/gallery</Link>에서 관리됩니다.</p>
                </div>
              </li>
            </ul>
          </div>
        )}
        {activeTab === 'services' && (
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100">
            <h3 className="text-3xl font-extrabold text-neutral-900 flex items-center mb-6">
              <span className="text-4xl mr-3">🏥</span> 진료과목
            </h3>
            <p className="text-neutral-600 mb-4">
              진료과목 페이지는 다음 섹션으로 구성되어 있습니다:
            </p>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <span className="text-vitamin-500 mr-2">•</span>
                <div>
                  <strong>진료 항목 그리드 (ServiceGrid)</strong>
                  <p className="text-sm text-neutral-600">진료 항목은 Prisma Content 모델을 통해 <code className="bg-neutral-100 px-2 py-1 rounded">/admin</code> 페이지에서 관리됩니다.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-vitamin-500 mr-2">•</span>
                <div>
                  <strong>진료 프로세스 (ProcessSection)</strong>
                  <p className="text-sm text-neutral-600">현재 하드코딩되어 있습니다.</p>
                </div>
              </li>
            </ul>
          </div>
        )}
        {activeTab === 'health-info' && (
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100">
            <h3 className="text-3xl font-extrabold text-neutral-900 flex items-center mb-6">
              <span className="text-4xl mr-3">❤️</span> 건강 정보
            </h3>
            <p className="text-neutral-600 mb-4">
              건강 정보는 Prisma Content 모델을 통해 관리됩니다.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white rounded-xl hover:from-vitamin-600 hover:to-vitamin-700 transition-all duration-200 font-bold shadow-lg"
            >
              <i className="ri-external-link-line mr-2"></i>
              /admin 페이지에서 관리하기
            </Link>
          </div>
        )}
        {activeTab === 'notices' && (
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100">
            <h3 className="text-3xl font-extrabold text-neutral-900 flex items-center mb-6">
              <span className="text-4xl mr-3">📢</span> 공지사항
            </h3>
            <p className="text-neutral-600 mb-4">
              공지사항은 Prisma Content 모델을 통해 관리됩니다.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white rounded-xl hover:from-vitamin-600 hover:to-vitamin-700 transition-all duration-200 font-bold shadow-lg"
            >
              <i className="ri-external-link-line mr-2"></i>
              /admin 페이지에서 관리하기
            </Link>
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100">
            <h3 className="text-3xl font-extrabold text-neutral-900 flex items-center mb-6">
              <span className="text-4xl mr-3">📍</span> 오시는 길
            </h3>
            <p className="text-neutral-600 mb-4">
              오시는 길 페이지는 다음 섹션으로 구성되어 있습니다:
            </p>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <span className="text-vitamin-500 mr-2">•</span>
                <div>
                  <strong>지도 섹션 (MapSection)</strong>
                  <p className="text-sm text-neutral-600">현재 하드코딩되어 있습니다 (카카오맵 API).</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-vitamin-500 mr-2">•</span>
                <div>
                  <strong>병원 정보 (InfoSection)</strong>
                  <p className="text-sm text-neutral-600">병원 정보는 Prisma Content 모델을 통해 <code className="bg-neutral-100 px-2 py-1 rounded">/admin</code> 페이지에서 관리됩니다.</p>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Quick Link to Gallery */}
      <Link
        href="/admin/gallery"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-110 flex items-center font-bold z-40"
      >
        <i className="ri-image-2-line mr-2 text-xl"></i>
        이미지 자료실
      </Link>
    </div>
  );
}
