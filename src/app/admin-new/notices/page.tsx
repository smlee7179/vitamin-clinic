'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  author: string;
  date: string;
  status: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, [filterStatus]);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const url = filterStatus === 'all'
        ? '/api/notices'
        : `/api/notices?status=${filterStatus}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Map API data to component format
        const mappedNotices = data.map((notice: any) => ({
          id: notice.id,
          title: notice.title,
          author: '관리자', // Default author since we don't have this field in the DB yet
          date: new Date(notice.createdAt).toLocaleDateString('ko-KR'),
          status: notice.status || 'published',
        }));
        setNotices(mappedNotices);
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      published: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      draft: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      archived: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    };
    const labels = {
      published: '게시됨',
      draft: '임시저장',
      archived: '내려감',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || notice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-900 dark:text-gray-100 text-3xl font-bold tracking-tight">
            공지사항 관리
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
            병원의 최신 소식과 공지사항을 관리합니다.
          </p>
        </div>
        <Link
          href="/admin-new/notices/create"
          className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-[#f49d25] text-white text-sm font-bold leading-normal shadow-sm hover:bg-[#f49d25]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f49d25] transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            add
          </span>
          <span className="truncate">새 글 작성</span>
        </Link>
      </div>

      {/* Content Card */}
      <div className="mt-8 flex flex-col bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Toolbar */}
        <div className="flex justify-between gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                search
              </span>
              <input
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-[#f8f7f5] dark:bg-[#1a1a1a] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900 dark:text-gray-100"
                placeholder="검색..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <select
              className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-transparent border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a]"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="published">게시됨</option>
              <option value="draft">임시저장</option>
              <option value="archived">내려감</option>
            </select>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-transparent border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a]">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              download
            </span>
            <span>내보내기</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-[#f8f7f5] dark:bg-[#1a1a1a]">
                <tr>
                  <th
                    className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                    scope="col"
                  >
                    제목
                  </th>
                  <th
                    className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                    scope="col"
                  >
                    작성자
                  </th>
                  <th
                    className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                    scope="col"
                  >
                    작성일
                  </th>
                  <th
                    className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                    scope="col"
                  >
                    상태
                  </th>
                  <th className="relative py-3.5 px-4" scope="col">
                    <span className="sr-only">관리</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#2c2c2c]">
                {loading ? (
                  // Loading skeleton
                  [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td className="px-4 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 ml-auto animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : filteredNotices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      {searchTerm || filterStatus !== 'all'
                        ? '검색 결과가 없습니다.'
                        : '등록된 공지사항이 없습니다.'}
                    </td>
                  </tr>
                ) : (
                  filteredNotices.map((notice) => (
                    <tr key={notice.id}>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {notice.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {notice.author}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {notice.date}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        {getStatusBadge(notice.status)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                        <Link className="text-[#f49d25] hover:text-[#f49d25]/80" href={`/admin-new/notices/${notice.id}`}>
                          수정
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center p-4 border-t border-gray-200 dark:border-gray-700">
          <nav className="flex items-center gap-2">
            <a
              className="flex size-9 items-center justify-center rounded-lg hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a]"
              href="#"
            >
              <span
                className="material-symbols-outlined text-gray-600 dark:text-gray-400"
                style={{ fontSize: '20px' }}
              >
                chevron_left
              </span>
            </a>
            <a
              className="text-sm font-bold leading-normal flex size-9 items-center justify-center rounded-lg bg-[#f49d25] text-white"
              href="#"
            >
              1
            </a>
            <a
              className="text-sm font-medium leading-normal flex size-9 items-center justify-center rounded-lg text-gray-900 dark:text-gray-100 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a]"
              href="#"
            >
              2
            </a>
            <a
              className="text-sm font-medium leading-normal flex size-9 items-center justify-center rounded-lg text-gray-900 dark:text-gray-100 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a]"
              href="#"
            >
              3
            </a>
            <a
              className="text-sm font-medium leading-normal flex size-9 items-center justify-center rounded-lg text-gray-900 dark:text-gray-100 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a]"
              href="#"
            >
              4
            </a>
            <a
              className="text-sm font-medium leading-normal flex size-9 items-center justify-center rounded-lg text-gray-900 dark:text-gray-100 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a]"
              href="#"
            >
              5
            </a>
            <a
              className="flex size-9 items-center justify-center rounded-lg hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a]"
              href="#"
            >
              <span
                className="material-symbols-outlined text-gray-600 dark:text-gray-400"
                style={{ fontSize: '20px' }}
              >
                chevron_right
              </span>
            </a>
          </nav>
        </div>
      </div>
    </AdminLayout>
  );
}
