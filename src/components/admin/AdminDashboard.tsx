'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  totalSections: number;
  lastUpdated: string;
  storageUsed: string;
  imagesCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSections: 8,
    lastUpdated: '',
    storageUsed: '0 KB',
    imagesCount: 0
  });

  useEffect(() => {
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
  }, []);

  const quickActions = [
    { icon: '📢', title: '공지사항', desc: '마키 슬라이더', link: '#marquee' },
    { icon: '🏥', title: '진료과목', desc: '서비스 편집', link: '#services' },
    { icon: '💉', title: '치료방법', desc: '치료 섹션', link: '#treatments' },
    { icon: '❓', title: 'FAQ', desc: '자주 묻는 질문', link: '#faq' },
    { icon: '👨‍⚕️', title: '의료진', desc: '의료진 소개', link: '#doctors' },
    { icon: '🏢', title: '시설', desc: '시설 안내', link: '#facilities' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">총 섹션</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalSections}</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">이미지</p>
              <p className="text-3xl font-bold text-green-600">{stats.imagesCount}</p>
            </div>
            <div className="text-4xl">🖼️</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">저장 용량</p>
              <p className="text-lg font-bold text-orange-600">{stats.storageUsed}</p>
            </div>
            <div className="text-4xl">💾</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">최근 업데이트</p>
              <p className="text-xs font-medium text-purple-600 mt-1">{stats.lastUpdated}</p>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 액세스</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, idx) => (
            <a
              key={idx}
              href={action.link}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center group cursor-pointer"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h4>
              <p className="text-xs text-gray-500">{action.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">💡</span> 사용 팁
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• 변경 사항은 자동으로 저장되며, 메인 페이지에서 즉시 확인할 수 있습니다</li>
          <li>• 이미지는 최적화하여 업로드하면 로딩 속도가 개선됩니다</li>
          <li>• 각 섹션의 미리보기 버튼을 눌러 실시간으로 확인할 수 있습니다</li>
          <li>• LocalStorage를 사용하므로 브라우저를 닫아도 데이터가 유지됩니다</li>
        </ul>
      </div>
    </div>
  );
}
