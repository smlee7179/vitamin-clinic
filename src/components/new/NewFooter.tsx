'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterInfo {
  id: string;
  hospitalName: string;
  address: string;
  representative: string | null;
  businessNumber: string | null;
  phone: string;
  fax: string | null;
  email: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  copyrightText: string;
  logoUrl: string | null;
  logoAlt: string;
}

export default function NewFooter() {
  const [footerInfo, setFooterInfo] = useState<FooterInfo | null>(null);

  useEffect(() => {
    fetchFooterInfo();
  }, []);

  const fetchFooterInfo = async () => {
    try {
      const response = await fetch('/api/hospital-info');
      if (response.ok) {
        const data = await response.json();
        setFooterInfo(data);
      }
    } catch (error) {
      console.error('Failed to fetch footer info:', error);
    }
  };

  return (
    <footer className="bg-gray-100 mt-24 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center flex-shrink-0 max-w-[70%] md:max-w-none">
              {footerInfo?.logoUrl ? (
                <Image
                  src={footerInfo.logoUrl}
                  alt={footerInfo.logoAlt || '병원 로고'}
                  width={1000}
                  height={60}
                  className="h-10 md:h-12 w-auto object-contain"
                  style={{ maxWidth: '100%' }}
                />
              ) : (
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
              )}
            </Link>
            <p className="text-xs md:text-sm text-gray-500">
              {footerInfo?.copyrightText || '© 2024 비타민마취통증의학과. All Rights Reserved.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-sm md:text-base">
            <h3 className="font-bold text-gray-800 mb-3 text-base md:text-lg">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/doctors"
                  className="text-gray-600 hover:text-[#f97316] transition-colors text-sm md:text-base"
                >
                  의료진 소개
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#f97316] transition-colors text-sm md:text-base"
                >
                  병원소개
                </Link>
              </li>
              <li className="pt-1">
                <span className="text-gray-800 font-medium text-sm md:text-base">진료안내</span>
                <ul className="ml-2 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/services/spine"
                      className="text-gray-600 hover:text-[#f97316] transition-colors text-sm md:text-base"
                    >
                      • 척추 클리닉
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/joint"
                      className="text-gray-600 hover:text-[#f97316] transition-colors text-sm md:text-base"
                    >
                      • 관절 클리닉
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/pain"
                      className="text-gray-600 hover:text-[#f97316] transition-colors text-sm md:text-base"
                    >
                      • 통증 클리닉
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="pt-1">
                <span className="text-gray-800 font-medium text-sm md:text-base">치료소개</span>
                <ul className="ml-2 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/treatments/non-surgical"
                      className="text-gray-600 hover:text-[#f97316] transition-colors text-sm md:text-base"
                    >
                      • 비수술 치료
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/treatments/manual-therapy"
                      className="text-gray-600 hover:text-[#f97316] transition-colors text-sm md:text-base"
                    >
                      • 도수 치료
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="text-sm md:text-base">
            <h3 className="font-bold text-gray-800 mb-3 text-base md:text-lg">주소</h3>
            <p className="text-gray-600 leading-relaxed">{footerInfo?.address || '부산광역시 동구 중앙대로 375'}</p>
            <p className="text-gray-600 leading-relaxed">전화: {footerInfo?.phone || '051-469-7581'}</p>
            {footerInfo?.fax && <p className="text-gray-600 leading-relaxed">팩스: {footerInfo.fax}</p>}
            {footerInfo?.email && <p className="text-gray-600 leading-relaxed">이메일: {footerInfo.email}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
