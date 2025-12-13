'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useHospitalInfo } from '@/contexts/HospitalInfoContext';

export default function NewHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const { hospitalInfo } = useHospitalInfo();

  useEffect(() => {

    // 데스크톱에서만 드롭다운 외부 클릭 시 닫기 (모바일은 제외)
    const handleClickOutside = (event: MouseEvent) => {
      // 768px 미만은 모바일로 간주하여 이벤트 무시
      if (window.innerWidth < 768) return;

      const target = event.target as HTMLElement;
      if (!target.closest('.about-dropdown')) {
        setAboutMenuOpen(false);
      }
      if (!target.closest('.services-dropdown')) {
        setServicesMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 mr-4 max-w-[60%] md:max-w-none">
            {hospitalInfo?.logoUrl ? (
              <Image
                src={hospitalInfo.logoUrl}
                alt={hospitalInfo.logoAlt || '병원 로고'}
                width={1000}
                height={60}
                className="h-8 md:h-10 w-auto object-contain"
                style={{ maxWidth: '100%' }}
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
              {/* 병원소개 Dropdown */}
              <div className="relative about-dropdown">
                <button
                  onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                  className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors flex items-center gap-1"
                >
                  병원소개
                  <svg
                    className={`w-4 h-4 transition-transform ${aboutMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {aboutMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/about/greeting"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setAboutMenuOpen(false)}
                    >
                      인사말
                    </Link>
                    <Link
                      href="/about/doctors"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setAboutMenuOpen(false)}
                    >
                      의료진소개
                    </Link>
                    <Link
                      href="/about/hours"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setAboutMenuOpen(false)}
                    >
                      진료시간안내
                    </Link>
                  </div>
                )}
              </div>

              {/* 진료안내 Dropdown */}
              <div className="relative services-dropdown">
                <button
                  onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                  className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors flex items-center gap-1"
                >
                  진료안내
                  <svg
                    className={`w-4 h-4 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {servicesMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/services/spine"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      척추클리닉
                    </Link>
                    <Link
                      href="/services/joint"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      관절클리닉
                    </Link>
                    <Link
                      href="/services/pain"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      통증클리닉
                    </Link>
                    <Link
                      href="/services/osteoporosis"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      골다공증 클리닉
                    </Link>
                    <Link
                      href="/services/manual-therapy"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      도수치료 및 물리치료
                    </Link>
                    <Link
                      href="/services/wellness"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      비타민 웰니스
                    </Link>
                  </div>
                )}
              </div>

              {/* 장비 및 시설 */}
              <Link
                href="/facilities"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                장비 및 시설
              </Link>

              {/* 오시는길 */}
              <Link
                href="/contact"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                오시는길
              </Link>

              {/* 공지사항 */}
              <Link
                href="/notices"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                공지사항
              </Link>
            </nav>

            {/* Desktop: 오시는길 Button */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6a0a] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              오시는길
            </Link>

            {/* Mobile: 전화하기 Button */}
            <a
              href={`tel:${hospitalInfo?.phone || '051-469-7581'}`}
              className="md:hidden flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6a0a] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              전화하기
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 -mr-3 text-gray-800 hover:text-[#f97316] transition-colors"
              aria-label="메뉴"
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
          <div className="md:hidden py-4 border-b border-gray-200 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              {/* 병원소개 Mobile Dropdown */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setServicesMenuOpen(false);
                    setAboutMenuOpen(!aboutMenuOpen);
                  }}
                  className="w-full text-left text-gray-800 hover:text-[#f97316] text-base font-medium py-3 px-2 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-between"
                  type="button"
                >
                  병원소개
                  <svg
                    className={`w-5 h-5 transition-transform ${aboutMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {aboutMenuOpen && (
                  <div className="mt-1 ml-2 flex flex-col gap-1 bg-gray-50 rounded-lg p-2">
                    <Link
                      href="/about/greeting"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setAboutMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 인사말
                    </Link>
                    <Link
                      href="/about/doctors"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setAboutMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 의료진소개
                    </Link>
                    <Link
                      href="/about/hours"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setAboutMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 진료시간안내
                    </Link>
                  </div>
                )}
              </div>

              {/* 진료안내 Mobile Dropdown */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAboutMenuOpen(false);
                    setServicesMenuOpen(!servicesMenuOpen);
                  }}
                  className="w-full text-left text-gray-800 hover:text-[#f97316] text-base font-medium py-3 px-2 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-between"
                  type="button"
                >
                  진료안내
                  <svg
                    className={`w-5 h-5 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesMenuOpen && (
                  <div className="mt-1 ml-2 flex flex-col gap-1 bg-gray-50 rounded-lg p-2">
                    <Link
                      href="/services/spine"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setServicesMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 척추클리닉
                    </Link>
                    <Link
                      href="/services/joint"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setServicesMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 관절클리닉
                    </Link>
                    <Link
                      href="/services/pain"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setServicesMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 통증클리닉
                    </Link>
                    <Link
                      href="/services/osteoporosis"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setServicesMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 골다공증 클리닉
                    </Link>
                    <Link
                      href="/services/manual-therapy"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setServicesMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 도수치료 및 물리치료
                    </Link>
                    <Link
                      href="/services/wellness"
                      className="text-gray-600 hover:text-[#f97316] text-base py-3 px-4 rounded-lg hover:bg-white transition-colors block touch-manipulation"
                      onClick={() => {
                        setServicesMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      • 비타민 웰니스
                    </Link>
                  </div>
                )}
              </div>

              {/* 장비 및 시설 */}
              <Link
                href="/facilities"
                className="text-gray-800 hover:text-[#f97316] text-base font-medium py-3 px-2 rounded-lg hover:bg-orange-50 transition-colors block"
                onClick={() => {
                  setAboutMenuOpen(false);
                  setServicesMenuOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                장비 및 시설
              </Link>

              {/* 오시는길 */}
              <Link
                href="/contact"
                className="text-gray-800 hover:text-[#f97316] text-base font-medium py-3 px-2 rounded-lg hover:bg-orange-50 transition-colors block"
                onClick={() => {
                  setAboutMenuOpen(false);
                  setServicesMenuOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                오시는길
              </Link>

              {/* 공지사항 */}
              <Link
                href="/notices"
                className="text-gray-800 hover:text-[#f97316] text-base font-medium py-3 px-2 rounded-lg hover:bg-orange-50 transition-colors block"
                onClick={() => {
                  setAboutMenuOpen(false);
                  setServicesMenuOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                공지사항
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
