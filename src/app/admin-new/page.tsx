'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';
import Link from 'next/link';

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([
    { label: '총 공지사항', value: '24', change: '+3', icon: 'campaign' },
    { label: '게시된 치료', value: '12', change: '+2', icon: 'healing' },
    { label: '활성 서비스', value: '8', change: '0', icon: 'medical_services' },
    { label: '총 방문자', value: '1,234', change: '+156', icon: 'people' },
  ]);

  const [recentNotices, setRecentNotices] = useState([
    { id: '1', title: '병원 휴진 안내 (11월)', date: '2024-11-20' },
    { id: '2', title: '새로운 도수치료 프로그램 도입', date: '2024-11-15' },
    { id: '3', title: '홈페이지 리뉴얼 안내', date: '2024-11-10' },
  ]);

  return (
    <AdminLayout>
      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <p className="text-gray-900 dark:text-gray-100 text-3xl font-bold tracking-tight">
          대시보드
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
          병원 웹사이트 관리 시스템에 오신 것을 환영합니다.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="mt-2 text-gray-900 dark:text-gray-100 text-3xl font-bold">
                  {stat.value}
                </p>
                <p className="mt-1 text-green-600 dark:text-green-400 text-sm font-medium">
                  {stat.change} 이번 주
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#f49d25]/10">
                <span className="material-symbols-outlined text-[#f49d25]" style={{ fontSize: '28px' }}>
                  {stat.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-gray-900 dark:text-gray-100 text-xl font-bold mb-4">
          빠른 작업
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin-new/notices"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <span className="material-symbols-outlined text-[#f49d25]">add_circle</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">새 공지사항</span>
          </Link>
          <Link
            href="/admin-new/treatments"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <span className="material-symbols-outlined text-[#f49d25]">edit</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">치료 수정</span>
          </Link>
          <Link
            href="/admin-new/settings"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <span className="material-symbols-outlined text-[#f49d25]">settings</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">설정</span>
          </Link>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="mt-8 bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900 dark:text-gray-100 text-xl font-bold">
              최근 공지사항
            </h3>
            <Link
              href="/admin-new/notices"
              className="text-[#f49d25] text-sm font-medium hover:underline"
            >
              전체 보기
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentNotices.map((notice) => (
            <div key={notice.id} className="p-6 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {notice.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {notice.date}
                  </p>
                </div>
                <Link
                  href={`/admin-new/notices/${notice.id}`}
                  className="text-[#f49d25] text-sm font-medium hover:underline"
                >
                  수정
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
