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
      // Fetch real-time statistics from API
      const statsResponse = await fetch('/api/dashboard-stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats({
          totalSections: statsData.totalSections || 0,
          lastUpdated: statsData.lastUpdated ? new Date(statsData.lastUpdated).toLocaleString('ko-KR') : '업데이트 없음',
          storageUsed: `${(statsData.storageUsed / 1024).toFixed(2)} KB`,
          imagesCount: statsData.imagesCount || 0
        });
      }

      // Fetch recent activity
      const activityResponse = await fetch('/api/audit-logs?action=recent&limit=10');
      if (activityResponse.ok) {
        const data = await activityResponse.json();
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
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner - Vitamin 스타일 */}
      <div className="bg-gradient-to-r from-vitamin-500 to-vitamin-600 p-8 rounded-3xl shadow-2xl shadow-vitamin-500/30 text-white border-2 border-vitamin-400">
        <h1 className="text-4xl font-extrabold mb-3">비타민마취통증의학과 관리 시스템</h1>
        <p className="text-vitamin-100 text-lg font-medium">홈페이지 콘텐츠를 쉽고 빠르게 관리하세요</p>
      </div>

      {/* Stats Grid - Vitamin 스타일 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-vitamin-glow transition-all duration-300 border-2 border-vitamin-100 hover:border-vitamin-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-semibold">총 섹션</p>
              <p className="text-4xl font-extrabold text-vitamin-600">{stats.totalSections}</p>
            </div>
            <div className="text-5xl opacity-20">📋</div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-vitamin-glow transition-all duration-300 border-2 border-vitamin-100 hover:border-vitamin-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-semibold">이미지</p>
              <p className="text-4xl font-extrabold text-vitamin-600">{stats.imagesCount}</p>
            </div>
            <div className="text-5xl opacity-20">🖼️</div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-vitamin-glow transition-all duration-300 border-2 border-vitamin-100 hover:border-vitamin-300 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-semibold">저장 용량</p>
              <p className="text-xl font-extrabold text-vitamin-600">{stats.storageUsed}</p>
            </div>
            <div className="text-5xl opacity-20">💾</div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-vitamin-glow transition-all duration-300 border-2 border-vitamin-100 hover:border-vitamin-300 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-semibold">최근 업데이트</p>
              <p className="text-xs font-bold text-vitamin-600 mt-1">{stats.lastUpdated}</p>
            </div>
            <div className="text-5xl opacity-20">⏰</div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Vitamin 스타일 */}
      <div>
        <h3 className="text-2xl font-extrabold text-neutral-900 mb-6 flex items-center">
          <i className="ri-rocket-line mr-3 text-vitamin-500 text-3xl"></i>
          빠른 액세스
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              href={action.link}
              className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-lg hover:shadow-vitamin-glow transition-all duration-300 text-center group cursor-pointer border-2 border-vitamin-100 hover:border-vitamin-400 hover:-translate-y-1 animate-slide-up"
              style={{animationDelay: `${0.1 * (idx + 1)}s`}}
            >
              <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">{action.icon}</div>
              <h4 className="font-bold text-neutral-900 text-sm mb-1 group-hover:text-vitamin-600 transition-colors">{action.title}</h4>
              <p className="text-xs text-neutral-500">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity - Vitamin 스타일 */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-vitamin-100">
        <div className="p-6 border-b-2 border-vitamin-100">
          <h3 className="text-2xl font-extrabold text-neutral-900 flex items-center">
            <i className="ri-history-line mr-3 text-vitamin-500 text-3xl"></i>
            최근 활동
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-vitamin-500 mx-auto mb-4"></div>
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

      {/* Tips - Vitamin 스타일 */}
      <div className="bg-gradient-to-br from-vitamin-50 via-vitamin-100/50 to-vitamin-50 p-8 rounded-3xl border-l-4 border-vitamin-500 shadow-xl">
        <h3 className="text-2xl font-extrabold text-neutral-900 mb-5 flex items-center">
          <span className="text-3xl mr-3">💡</span> 사용 팁
        </h3>
        <ul className="space-y-3 text-base text-neutral-700">
          <li className="flex items-start">
            <i className="ri-check-line text-vitamin-500 text-xl mr-3 mt-1 font-bold"></i>
            <span className="font-medium">변경 사항은 자동으로 저장되며, 메인 페이지에서 즉시 확인할 수 있습니다</span>
          </li>
          <li className="flex items-start">
            <i className="ri-check-line text-vitamin-500 text-xl mr-3 mt-1 font-bold"></i>
            <span className="font-medium">이미지는 Vercel Blob Storage에 저장되어 빠르고 안정적으로 제공됩니다</span>
          </li>
          <li className="flex items-start">
            <i className="ri-check-line text-vitamin-500 text-xl mr-3 mt-1 font-bold"></i>
            <span className="font-medium">모든 변경사항은 변경 이력에 기록되어 추적할 수 있습니다</span>
          </li>
          <li className="flex items-start">
            <i className="ri-check-line text-vitamin-500 text-xl mr-3 mt-1 font-bold"></i>
            <span className="font-medium">우측 상단의 '미리보기' 버튼을 눌러 실시간으로 확인할 수 있습니다</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
