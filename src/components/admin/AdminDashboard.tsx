'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalSections: number;
  lastUpdated: string;
  storageUsed: string;
  imagesCount: number;
}

interface ActivityLog {
  id: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityName?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSections: 8,
    lastUpdated: '',
    storageUsed: '0 KB',
    imagesCount: 0
  });
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Calculate storage usage
      let totalSize = 0;
      let imageCount = 0;

      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const item = localStorage.getItem(key);
          if (item) {
            totalSize += item.length;
            if (key.includes('image') || key.includes('Image')) {
              imageCount++;
            }
          }
        }
      }

      // Get last updated
      const content = localStorage.getItem('hospitalContent');
      const lastMod = content ? new Date().toLocaleString('ko-KR') : '업데이트 없음';

      setStats({
        totalSections: 8,
        lastUpdated: lastMod,
        storageUsed: `${(totalSize / 1024).toFixed(2)} KB`,
        imagesCount: imageCount
      });

      // Fetch recent activity
      const response = await fetch('/api/audit-logs?action=recent&limit=10');
      if (response.ok) {
        const data = await response.json();
        setRecentActivity(data.logs || []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { icon: '📢', title: '공지사항', desc: '마키 슬라이더', link: '#marquee' },
    { icon: '🏥', title: '병원 정보', desc: '병원 정보 수정', link: '#hospital' },
    { icon: '💉', title: '치료방법', desc: '치료 섹션', link: '#treatments' },
    { icon: '❓', title: 'FAQ', desc: '자주 묻는 질문', link: '#faq' },
    { icon: '👨‍⚕️', title: '의료진', desc: '의료진 소개', link: '/admin' },
    { icon: '🏢', title: '시설', desc: '시설 안내', link: '/admin' },
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE': return '➕';
      case 'UPDATE': return '✏️';
      case 'DELETE': return '🗑️';
      case 'LOGIN': return '🔐';
      case 'LOGOUT': return '👋';
      default: return '📝';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'text-green-600 bg-green-50';
      case 'UPDATE': return 'text-blue-600 bg-blue-50';
      case 'DELETE': return 'text-red-600 bg-red-50';
      case 'LOGIN': return 'text-purple-600 bg-purple-50';
      case 'LOGOUT': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl shadow-xl text-white">
        <h1 className="text-3xl font-bold mb-2">비타민마취통증의학과 관리 시스템</h1>
        <p className="text-orange-100">홈페이지 콘텐츠를 쉽고 빠르게 관리하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">총 섹션</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalSections}</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">이미지</p>
              <p className="text-3xl font-bold text-green-600">{stats.imagesCount}</p>
            </div>
            <div className="text-4xl">🖼️</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">저장 용량</p>
              <p className="text-lg font-bold text-orange-600">{stats.storageUsed}</p>
            </div>
            <div className="text-4xl">💾</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">최근 업데이트</p>
              <p className="text-xs font-medium text-purple-600 mt-1">{stats.lastUpdated}</p>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-rocket-line mr-2 text-orange-500"></i>
          빠른 액세스
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              href={action.link}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center group cursor-pointer border border-gray-100 hover:border-orange-300"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h4>
              <p className="text-xs text-gray-500">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <i className="ri-history-line mr-2 text-orange-500"></i>
            최근 활동
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-500">로딩 중...</p>
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2 block"></i>
              <p>아직 활동 내역이 없습니다</p>
            </div>
          ) : (
            recentActivity.slice(0, 10).map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl ${getActionColor(log.action)}`}>
                    {getActionIcon(log.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      <span className="font-semibold">{log.userEmail}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{log.action}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{log.entityType}</span>
                    </p>
                    {log.entityName && (
                      <p className="text-xs text-gray-500 mb-1">{log.entityName}</p>
                    )}
                    <p className="text-xs text-gray-400">{formatRelativeTime(log.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">💡</span> 사용 팁
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
            <span>변경 사항은 자동으로 저장되며, 메인 페이지에서 즉시 확인할 수 있습니다</span>
          </li>
          <li className="flex items-start">
            <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
            <span>이미지는 Vercel Blob Storage에 저장되어 빠르고 안정적으로 제공됩니다</span>
          </li>
          <li className="flex items-start">
            <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
            <span>모든 변경사항은 변경 이력에 기록되어 추적할 수 있습니다</span>
          </li>
          <li className="flex items-start">
            <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
            <span>우측 상단의 '미리보기' 버튼을 눌러 실시간으로 확인할 수 있습니다</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
