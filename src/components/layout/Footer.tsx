'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface FooterData {
  hospitalName: string;
  address: string;
  description: string;
  phone: string;
  weekdayHours: string;
  saturdayHours: string;
  copyright: string;
  quickLinks: Array<{
    label: string;
    href: string;
  }>;
  legalLinks: Array<{
    label: string;
    href: string;
  }>;
}

const DEFAULT_FOOTER: FooterData = {
  hospitalName: '비타민마취통증의학과',
  address: '부산 동구 중앙대로 375',
  description: '환자분들의 건강한 삶을 위해\n최선을 다하겠습니다.',
  phone: '051-469-7581',
  weekdayHours: '평일 09:00 - 18:00',
  saturdayHours: '토요일 09:00 - 13:00',
  copyright: '© 2024 비타민마취통증의학과. All rights reserved.',
  quickLinks: [
    { label: '병원 소개', href: '/about' },
    { label: '진료과목', href: '/services' },
    { label: '건강 정보', href: '/health-info' },
    { label: '공지사항', href: '/notices' },
    { label: '오시는 길', href: '/contact' },
  ],
  legalLinks: [
    { label: '개인정보처리방침', href: '/privacy' },
    { label: '이용약관', href: '/terms' },
  ]
};

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData>(DEFAULT_FOOTER);

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const response = await fetch('/api/content?section=footer');
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setFooterData(prev => ({ ...prev, ...data }));
          }
        }
      } catch (error) {
        console.error('Error loading footer data:', error);
      }
    };

    loadFooterData();
  }, []);

  return (
    <footer className="w-full bg-neutral-800 text-white">
      <div className="container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-vitamin-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">비</span>
              </div>
              <h3 className="text-lg font-bold">{footerData.hospitalName}</h3>
            </div>
            <p className="text-body-2 text-neutral-300 leading-relaxed whitespace-pre-line">
              {footerData.address}<br />
              {footerData.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-body-2 text-neutral-300 hover:text-vitamin-400 transition-colors duration-normal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">연락처</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-vitamin-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-body-2 text-neutral-300 mb-1">전화번호</p>
                  <a href={`tel:${footerData.phone}`} className="text-body-1 text-white hover:text-vitamin-400 font-medium transition-colors duration-normal">
                    {footerData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-vitamin-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-body-2 text-neutral-300 mb-1">진료시간</p>
                  <p className="text-body-2 text-white">{footerData.weekdayHours}</p>
                  <p className="text-body-2 text-white">{footerData.saturdayHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-body-2 text-neutral-400">
              {footerData.copyright}
            </p>
            <div className="flex gap-6">
              {footerData.legalLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-body-2 text-neutral-400 hover:text-vitamin-400 transition-colors duration-normal">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
