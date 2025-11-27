'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Notice {
  id: string;
  title: string;
  content: string;
  category?: string;
  important: boolean;
  createdAt: string;
}

interface InfoCard {
  id: string;
  page: string;
  title: string;
  description: string;
  emoji: string;
  order: number;
  active: boolean;
}

interface PageNotice {
  id: string;
  page: string;
  content: string;
  type: string;
  active: boolean;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [infoCards, setInfoCards] = useState<InfoCard[]>([]);
  const [pageNotice, setPageNotice] = useState<PageNotice | null>(null);

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'general', label: '일반' },
    { value: 'event', label: '이벤트' },
    { value: 'notice', label: '공지' },
  ];

  useEffect(() => {
    fetchNotices();
    fetchInfoCards();
    fetchPageNotice();
  }, [selectedCategory]);

  const fetchNotices = async () => {
    try {
      const url = selectedCategory === 'all'
        ? '/api/notices'
        : `/api/notices?category=${selectedCategory}`;

      const response = await fetch(url);
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

  const fetchInfoCards = async () => {
    try {
      const response = await fetch('/api/info-cards');
      if (response.ok) {
        const data = await response.json();
        const activeCards = data.filter((card: InfoCard) => card.page === 'notices' && card.active);
        setInfoCards(activeCards.sort((a: InfoCard, b: InfoCard) => a.order - b.order));
      }
    } catch (error) {
      console.error('Failed to fetch info cards:', error);
    }
  };

  const fetchPageNotice = async () => {
    try {
      const response = await fetch('/api/page-notice?page=notices');
      if (response.ok) {
        const data = await response.json();
        if (data && data.active) {
          setPageNotice(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch page notice:', error);
    }
  };

  const getNoticeStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-300 text-yellow-900';
      case 'alert':
        return 'bg-red-50 border-red-300 text-red-900';
      default:
        return 'bg-blue-50 border-blue-300 text-blue-900';
    }
  };

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'alert':
        return '🚨';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">공지사항</h1>
            <p className="text-lg md:text-xl opacity-90">
              병원의 새로운 소식과 중요한 안내사항을 확인하세요
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-[#f97316] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {/* Page Notice */}
        {pageNotice && (
          <section className="max-w-6xl mx-auto px-4 pb-6">
            <div className={`rounded-xl p-4 border-2 ${getNoticeStyle(pageNotice.type)}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getNoticeIcon(pageNotice.type)}</span>
                <p className="flex-1 whitespace-pre-wrap">{pageNotice.content}</p>
              </div>
            </div>
          </section>
        )}

        {/* Notices List */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📢</div>
              <p className="text-gray-500 text-lg">
                등록된 공지사항이 없습니다.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/notices/${notice.id}`}
                  className={`block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all ${
                    notice.important
                      ? 'border-2 border-[#f97316]'
                      : 'border border-gray-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-grow">
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {notice.important && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                            <span className="mr-1">🔔</span>
                            중요
                          </span>
                        )}
                        {notice.category && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#f97316]/10 text-[#f97316]">
                            {notice.category}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {new Date(notice.createdAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
                        {notice.title}
                      </h3>

                      {/* Content Preview */}
                      <div
                        className="text-base text-gray-600 leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: notice.content }}
                      />
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#f97316] to-[#fb923c] flex items-center justify-center shadow-md">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {infoCards.length > 0 ? (
                infoCards.map((card) => (
                  <div key={card.id} className="text-center">
                    <div className="text-4xl mb-4">{card.emoji}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600">
                      {card.description}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-4xl mb-4">📅</div>
                    <h3 className="font-bold text-gray-900 mb-2">정기 업데이트</h3>
                    <p className="text-sm text-gray-600">
                      주요 소식은 정기적으로 업데이트됩니다
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🔔</div>
                    <h3 className="font-bold text-gray-900 mb-2">중요 공지</h3>
                    <p className="text-sm text-gray-600">
                      중요한 안내사항을 놓치지 마세요
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">📞</div>
                    <h3 className="font-bold text-gray-900 mb-2">문의하기</h3>
                    <p className="text-sm text-gray-600">
                      궁금한 사항은 전화로 문의해주세요
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
