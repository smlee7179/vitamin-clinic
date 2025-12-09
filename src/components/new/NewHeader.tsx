'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
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

    // 드롭다운 외부 클릭 시 닫기
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.services-dropdown')) {
        setServicesMenuOpen(false);
      }
      if (!target.closest('.treatments-dropdown')) {
        setTreatmentsMenuOpen(false);
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
          <Link href="/" className="flex items-center flex-shrink-0 mr-4">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={1000}
                height={60}
                className="h-16 w-auto object-contain"
                style={{ maxWidth: 'none' }}
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
                href="/doctors"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                의료진 소개
              </Link>

              <Link
                href="/about"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                병원소개
              </Link>

              {/* Services Dropdown */}
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
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/services/spine"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      척추 클리닉
                    </Link>
                    <Link
                      href="/services/joint"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      관절 클리닉
                    </Link>
                    <Link
                      href="/services/pain"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      통증 클리닉
                    </Link>
                  </div>
                )}
              </div>

              {/* Treatments Dropdown */}
              <div className="relative treatments-dropdown">
                <button
                  onClick={() => setTreatmentsMenuOpen(!treatmentsMenuOpen)}
                  className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors flex items-center gap-1"
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
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/treatments/non-surgical"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setTreatmentsMenuOpen(false)}
                    >
                      비수술 치료
                    </Link>
                    <Link
                      href="/treatments/manual-therapy"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                      onClick={() => setTreatmentsMenuOpen(false)}
                    >
                      도수 치료
                    </Link>
                  </div>
                )}
              </div>
            </nav>

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
                href="/doctors"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                의료진 소개
              </Link>

              <Link
                href="/about"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                병원소개
              </Link>

              {/* Services Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                  className="w-full text-left text-gray-800 hover:text-[#f97316] text-sm font-medium flex items-center justify-between"
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
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    <Link
                      href="/services/spine"
                      className="text-gray-600 hover:text-[#f97316] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 척추 클리닉
                    </Link>
                    <Link
                      href="/services/joint"
                      className="text-gray-600 hover:text-[#f97316] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 관절 클리닉
                    </Link>
                    <Link
                      href="/services/pain"
                      className="text-gray-600 hover:text-[#f97316] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 통증 클리닉
                    </Link>
                  </div>
                )}
              </div>

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
                      href="/treatments/non-surgical"
                      className="text-gray-600 hover:text-[#f97316] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 비수술 치료
                    </Link>
                    <Link
                      href="/treatments/manual-therapy"
                      className="text-gray-600 hover:text-[#f97316] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • 도수 치료
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
