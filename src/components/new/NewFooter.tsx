'use client';

import Link from 'next/link';

export default function NewFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-[#101822] mt-24 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              <svg
                className="w-7 h-7 text-[#f97316]"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_535_footer)">
                  <path
                    d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM34 26H26V34H22V26H14V22H22V14H26V22H34V26Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_535_footer">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
              <h2 className="text-lg font-bold">비타민마취통증의학과</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 비타민마취통증의학과. All Rights Reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] transition-colors"
                >
                  병원소개
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] transition-colors"
                >
                  진료안내
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] transition-colors"
                >
                  치료소개
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] transition-colors"
                >
                  오시는 길
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div className="text-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">정보</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] transition-colors"
                >
                  이용약관
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">문의</h3>
            <p className="text-gray-600 dark:text-gray-400">부산광역시 동구 중앙대로 375</p>
            <p className="text-gray-600 dark:text-gray-400">전화: 051-469-7581</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
