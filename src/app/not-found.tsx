import Link from 'next/link';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

export default function NotFound() {
  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="flex-1 flex items-center justify-center px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <svg
              className="w-32 h-32 mx-auto text-[#f97316] opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl md:text-7xl font-black text-[#343A40] mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#343A40] mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            죄송합니다. 요청하신 페이지가 존재하지 않거나<br className="hidden md:block" />
            이동되었을 수 있습니다.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              홈으로 돌아가기
            </Link>

            <Link
              href="/services"
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              진료과목 보기
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-base md:text-lg font-semibold text-[#343A40] mb-4">
              자주 찾는 페이지
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link
                href="/about/doctors"
                className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-[#E5E7EB] text-sm md:text-base text-[#343A40] transition-colors"
              >
                의료진 소개
              </Link>
              <Link
                href="/contact/hours"
                className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-[#E5E7EB] text-sm md:text-base text-[#343A40] transition-colors"
              >
                진료시간
              </Link>
              <Link
                href="/contact/location"
                className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-[#E5E7EB] text-sm md:text-base text-[#343A40] transition-colors"
              >
                오시는길
              </Link>
              <Link
                href="/notices"
                className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-[#E5E7EB] text-sm md:text-base text-[#343A40] transition-colors"
              >
                공지사항
              </Link>
            </div>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
