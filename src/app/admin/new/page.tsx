'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminDashboard from '../../../components/admin/AdminDashboard';
import MarqueeEditor from '../../../components/admin/MarqueeEditor';
import TreatmentEditor from '../../../components/admin/TreatmentEditor';
import FAQEditor from '../../../components/admin/FAQEditor';

export default function NewAdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  useEffect(() => { setHydrated(true); }, []);

  const handleLogin = () => {
    if (password === 'vitamin2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setPassword('');
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, [hydrated]);

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">관리자 페이지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-orange-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i className="ri-shield-keyhole-line text-white text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">관리자 로그인</h2>
            <p className="text-gray-600">비타민마취통증의학과 관리 시스템</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
            />
            <button
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
              onClick={handleLogin}
            >
              로그인
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-6">
            보안을 위해 브라우저를 닫으면 자동으로 로그아웃됩니다.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', name: '대시보드', icon: 'ri-dashboard-line' },
    { id: 'marquee', name: '공지사항', icon: 'ri-megaphone-line' },
    { id: 'treatments', name: '치료방법', icon: 'ri-syringe-line' },
    { id: 'faq', name: 'FAQ', icon: 'ri-question-line' },
    { id: 'old-admin', name: '기존 관리자', icon: 'ri-settings-3-line' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="ri-settings-3-line text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">관리자 시스템</h1>
                <p className="text-sm text-gray-500">비타민마취통증의학과</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                target="_blank"
                className="flex items-center px-5 py-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 font-medium border border-gray-200"
              >
                <i className="ri-eye-line mr-2"></i>
                미리보기
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-5 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium border border-red-200"
              >
                <i className="ri-logout-box-line mr-2"></i>
                로그아웃
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-4 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-t-xl transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-b-2 border-transparent hover:border-orange-300'
                }`}
              >
                <i className={`${tab.icon} mr-2 text-lg`}></i>
                <span className="font-medium">{tab.name}</span>
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
        {activeTab === 'marquee' && <MarqueeEditor onSave={handleSave} />}
        {activeTab === 'treatments' && <TreatmentEditor onSave={handleSave} />}
        {activeTab === 'faq' && <FAQEditor onSave={handleSave} />}
        {activeTab === 'old-admin' && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">기존 관리자 페이지</h3>
            <p className="text-gray-600 mb-6">
              Hero, Services, Doctors, Facilities, Contact, Footer를 편집하려면<br />
              기존 관리자 페이지를 이용하세요.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              <i className="ri-external-link-line mr-2"></i>
              기존 관리자 페이지로 이동
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
