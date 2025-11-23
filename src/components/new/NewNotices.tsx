'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  category: string;
  date: string;
}

export default function NewNotices() {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: '진료 시간 변경 안내 (2024년 11월)',
      category: '최신 변동 사항',
      date: '2024.11.20',
    },
    {
      id: '2',
      title: '겨울맞이 비급여 항목 할인 이벤트',
      category: '할인행사',
      date: '2024.11.15',
    },
    {
      id: '3',
      title: '연말 연휴 진료 안내',
      category: '연휴공지',
      date: '2024.11.10',
    },
  ]);

  useEffect(() => {
    // 나중에 API에서 데이터 가져오기
    // fetch('/api/notices')
    //   .then(res => res.json())
    //   .then(data => setNotices(data));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <div className="bg-white dark:bg-[#101822] p-8 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900 dark:text-gray-200 text-3xl font-bold leading-tight tracking-[-0.015em]">
            공지사항
          </h2>
          <Link
            href="/notices"
            className="text-sm font-medium text-[#f97316] hover:underline"
          >
            더보기
          </Link>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {notices.map((notice) => (
            <div key={notice.id} className="py-4 flex justify-between items-center">
              <div>
                <Link
                  href={`/notices/${notice.id}`}
                  className="text-gray-800 dark:text-gray-200 hover:text-[#f97316] text-base font-medium transition-colors"
                >
                  {notice.title}
                </Link>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {notice.category}
                </p>
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-sm whitespace-nowrap ml-4">
                {notice.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
