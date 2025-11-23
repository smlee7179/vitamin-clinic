'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  important: boolean;
  createdAt: string;
}

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const noticeId = params?.id as string;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(`/api/notices/${noticeId}`);
        if (response.ok) {
          const data = await response.json();
          setNotice(data);
        } else {
          alert('공지사항을 찾을 수 없습니다.');
          router.push('/notices');
        }
      } catch (error) {
        console.error('Failed to fetch notice:', error);
        alert('공지사항을 불러오는 중 오류가 발생했습니다.');
        router.push('/notices');
      } finally {
        setLoading(false);
      }
    };

    if (noticeId) {
      fetchNotice();
    }
  }, [noticeId, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      general: '일반',
      event: '이벤트',
      notice: '공지',
      holiday: '휴진',
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="bg-[#f8f7f5] min-h-screen">
        <NewHeader />
        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8 animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>
          </div>
        </main>
        <NewFooter />
      </div>
    );
  }

  if (!notice) {
    return null;
  }

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#f97316] transition-colors">
                홈
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/notices" className="hover:text-[#f97316] transition-colors">
                공지사항
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900">상세보기</li>
          </ol>
        </nav>

        {/* Notice Card */}
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                notice.important
                  ? 'bg-red-100 text-red-700'
                  : 'bg-[#fff4ed] text-[#f97316]'
              }`}>
                {notice.important ? '중요' : getCategoryLabel(notice.category)}
              </span>
              {notice.important && notice.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#fff4ed] text-[#f97316]">
                  {getCategoryLabel(notice.category)}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {notice.title}
            </h1>

            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(notice.createdAt)}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
          </div>

          {/* Footer */}
          <div className="p-8 bg-gray-50 border-t border-gray-200">
            <Link
              href="/notices"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#f97316] text-white font-medium hover:bg-[#ea580c] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              목록으로 돌아가기
            </Link>
          </div>
        </article>
      </main>

      <NewFooter />
    </div>
  );
}
