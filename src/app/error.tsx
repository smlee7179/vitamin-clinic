'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="flex-1 flex items-center justify-center px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* 500 Icon */}
          <div className="mb-8">
            <svg
              className="w-32 h-32 mx-auto text-red-500 opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl md:text-7xl font-black text-[#343A40] mb-4">
            500
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#343A40] mb-4">
            서버 오류가 발생했습니다
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            죄송합니다. 일시적인 서버 오류로 인해<br className="hidden md:block" />
            페이지를 표시할 수 없습니다.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-red-600 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white text-lg font-bold rounded-lg transition-colors shadow-lg w-full sm:w-auto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              다시 시도하기
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-[#343A40] text-lg font-bold rounded-lg border-2 border-[#E5E7EB] transition-colors w-full sm:w-auto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              홈으로 돌아가기
            </Link>
          </div>

          {/* Help Information */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-base md:text-lg font-semibold text-[#343A40] mb-4">
              문제가 계속될 경우
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <a
                href="tel:051-469-7581"
                className="flex items-center justify-center gap-2 p-4 bg-white hover:bg-gray-50 rounded-lg border border-[#E5E7EB] text-[#343A40] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-[#f97316]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
                <span className="font-semibold">전화 문의</span>
              </a>

              <Link
                href="/contact/location"
                className="flex items-center justify-center gap-2 p-4 bg-white hover:bg-gray-50 rounded-lg border border-[#E5E7EB] text-[#343A40] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-[#f97316]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-semibold">방문 문의</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
