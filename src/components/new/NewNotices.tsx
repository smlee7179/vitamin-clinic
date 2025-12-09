'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  category: string;
  important: boolean;
  createdAt: string;
}

export default function NewNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/notices?limit=5');
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
        }
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  if (loading) {
    return (
      <section className="flex justify-center px-4 py-16 sm:py-20 bg-[#f8f7f5]">
        <div className="max-w-6xl w-full">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
            <div className="divide-y divide-gray-200">
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-4 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-20 ml-4 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center px-4 py-16 sm:py-20 bg-[#f8f7f5]">
      <div className="max-w-6xl w-full">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#f97316] text-3xl font-bold leading-tight tracking-[-0.015em]">
              비타민 소식
            </h2>
            <Link
              href="/notices"
              className="text-sm font-medium text-[#f97316] hover:underline"
            >
              더보기
            </Link>
          </div>
        <div className="divide-y divide-gray-200">
          {notices.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              등록된 소식이 없습니다.
            </div>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="py-4 flex justify-between items-center">
                <div>
                  <Link
                    href={`/notices/${notice.id}`}
                    className="text-gray-800 hover:text-[#f97316] text-base font-medium transition-colors"
                  >
                    {notice.title}
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">
                    {notice.category}
                  </p>
                </div>
                <span className="text-gray-400 text-sm whitespace-nowrap ml-4">
                  {formatDate(notice.createdAt)}
                </span>
              </div>
            ))
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
