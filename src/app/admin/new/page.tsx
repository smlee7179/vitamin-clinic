'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminDashboard from '../../../components/admin/AdminDashboard';
import CompleteUnifiedContentManager from '../../../components/admin/CompleteUnifiedContentManager';

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
    { id: 'content', name: '콘텐츠 관리', icon: 'ri-file-edit-line' },
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
        {activeTab === 'content' && <CompleteUnifiedContentManager />}
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
