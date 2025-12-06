'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [treatmentsMenuOpen, setTreatmentsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoAlt, setLogoAlt] = useState('병원 로고');

  useEffect(() => {
    // 병원 정보에서 로고 가져오기
    fetch('/api/hospital-info')
      .then(res => res.json())
      .then(data => {
        if (data.logoUrl) {
          setLogoUrl(data.logoUrl);
          setLogoAlt(data.logoAlt || '병원 로고');
        }
      })
      .catch(err => console.error('Failed to load logo:', err));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            ) : (
              <svg className="w-8 h-8 text-[#f97316]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_535)">
                  <path d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM34 26H26V34H22V26H14V22H22V14H26V22H34V26Z" fill="currentColor"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_535">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="flex flex-1 justify-end items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/about"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                병원소개
              </Link>
              <Link
                href="/services"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                진료안내
              </Link>

              {/* Treatments Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setTreatmentsMenuOpen(true)}
                onMouseLeave={() => setTreatmentsMenuOpen(false)}
              >
                <Link
                  href="/treatments"
                  className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors flex items-center gap-1"
                >
                  치료소개
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {treatmentsMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/treatments/spine"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                    >
                      척추 클리닉
                    </Link>
                    <Link
                      href="/treatments/joint"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                    >
                      관절 클리닉
                    </Link>
                    <Link
                      href="/treatments/pain"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                    >
                      통증 클리닉
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <Link
                      href="/treatments"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors font-medium"
                    >
                      전체 치료 보기
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/hours"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                진료시간
              </Link>
              <Link
                href="/notices"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                공지사항
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                오시는 길
              </Link>
            </nav>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f97316] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
            >
              <span className="truncate">온라인 예약</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-b border-gray-200">
            <nav className="flex flex-col gap-4">
              <Link
                href="/about"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                병원소개
              </Link>
              <Link
                href="/services"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                진료안내
              </Link>

              {/* Treatments Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setTreatmentsMenuOpen(!treatmentsMenuOpen)}
                  className="w-full text-left text-gray-800 hover:text-[#f97316] text-sm font-medium flex items-center justify-between"
                >
                  치료소개
                  <svg
                    className={`w-4 h-4 transition-transform ${treatmentsMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {treatmentsMenuOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    <Link
                      href="/treatments/spine"
                      className="text-gray-600 hover:text-[#f97316] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 척추 클리닉
                    </Link>
                    <Link
                      href="/treatments/joint"
                      className="text-gray-600 hover:text-[#f97316] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 관절 클리닉
                    </Link>
                    <Link
                      href="/treatments/pain"
                      className="text-gray-600 hover:text-[#f97316] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 통증 클리닉
                    </Link>
                    <Link
                      href="/treatments"
                      className="text-gray-600 hover:text-[#f97316] text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 전체 치료 보기
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/hours"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                진료시간
              </Link>
              <Link
                href="/notices"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                공지사항
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                오시는 길
              </Link>
              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center rounded-lg h-10 px-4 bg-[#f97316] text-white text-sm font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                온라인 예약
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
