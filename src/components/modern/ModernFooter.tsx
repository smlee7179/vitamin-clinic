'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ModernFooter() {
  const [footerData, setFooterData] = useState({
    hospitalName: '비타민마취통증의학과',
    englishName: 'Vitamin Pain Management Clinic',
    description: '환자 한 분 한 분의 통증을 정확히 진단하고, 개인별 맞춤 치료를 제공합니다.',
    address: '부산광역시 동구 중앙대로 375',
    phone: '051-469-7581',
    email: 'info@vitamin-clinic.com',
    hours: {
      contactTitle: '연락처',
      hoursTitle: '진료시간',
      weekday: '평일 09:00 - 18:00',
      saturday: '토요일 09:00 - 13:00',
      closed: '일요일/공휴일 휴진'
    },
    social: {
      facebook: '',
      instagram: '',
      naver: '',
      kakao: ''
    },
    links: {
      privacy: '개인정보처리방침',
      privacyUrl: '/privacy',
      terms: '이용약관',
      termsUrl: '/terms',
      admin: '관리자',
      adminUrl: '/admin/login'
    },
    copyright: {
      text: 'All rights reserved.',
      showYear: true
    }
  });

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const response = await fetch('/api/content?section=footer');
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setFooterData((prev) => ({ ...prev, ...data }));
          }
        }
      } catch (error) {
        console.error('Failed to load footer data:', error);
      }
    };
    loadFooterData();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Branding */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="ri-hospital-line text-white text-3xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{footerData.hospitalName || '비타민마취통증의학과'}</h3>
                <p className="text-sm text-gray-400">{footerData.englishName || 'Vitamin Pain Management Clinic'}</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              {footerData.description || '환자 한 분 한 분의 통증을 정확히 진단하고, 개인별 맞춤 치료를 제공합니다.'}
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {footerData.social.facebook && (
                <a
                  href={footerData.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors duration-300"
                >
                  <i className="ri-facebook-fill text-xl"></i>
                </a>
              )}
              {footerData.social.instagram && (
                <a
                  href={footerData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors duration-300"
                >
                  <i className="ri-instagram-line text-xl"></i>
                </a>
              )}
              {footerData.social.naver && (
                <a
                  href={footerData.social.naver}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors duration-300"
                >
                  <i className="ri-map-pin-line text-xl"></i>
                </a>
              )}
              {footerData.social.kakao && (
                <a
                  href={footerData.social.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors duration-300"
                >
                  <i className="ri-kakao-talk-fill text-xl"></i>
                </a>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <i className="ri-phone-line mr-2 text-orange-400"></i>
              {footerData.hours?.contactTitle || '연락처'}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <i className="ri-phone-fill mr-2 text-orange-400 mt-1"></i>
                <div>
                  <a href={`tel:${footerData.phone || '051-469-7581'}`} className="hover:text-orange-400 transition-colors">
                    {footerData.phone || '051-469-7581'}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-mail-fill mr-2 text-orange-400 mt-1"></i>
                <div>
                  <a href={`mailto:${footerData.email || 'info@vitamin-clinic.com'}`} className="hover:text-orange-400 transition-colors">
                    {footerData.email || 'info@vitamin-clinic.com'}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-map-pin-fill mr-2 text-orange-400 mt-1"></i>
                <div>{footerData.address || '부산광역시 동구 중앙대로 375'}</div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <i className="ri-time-line mr-2 text-orange-400"></i>
              {footerData.hours?.hoursTitle || '진료시간'}
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="ri-calendar-line mr-2 text-orange-400"></i>
                {footerData.hours?.weekday || '평일 09:00 - 18:00'}
              </li>
              <li className="flex items-center">
                <i className="ri-calendar-line mr-2 text-orange-400"></i>
                {footerData.hours?.saturday || '토요일 09:00 - 13:00'}
              </li>
              <li className="flex items-center text-red-400">
                <i className="ri-close-circle-line mr-2"></i>
                {footerData.hours?.closed || '일요일/공휴일 휴진'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {footerData.copyright?.showYear ? new Date().getFullYear() : ''} {footerData.hospitalName || '비타민마취통증의학과'}. {footerData.copyright?.text || 'All rights reserved.'}
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href={footerData.links?.privacyUrl || '/privacy'} className="text-gray-400 hover:text-orange-400 transition-colors">
                {footerData.links?.privacy || '개인정보처리방침'}
              </Link>
              <Link href={footerData.links?.termsUrl || '/terms'} className="text-gray-400 hover:text-orange-400 transition-colors">
                {footerData.links?.terms || '이용약관'}
              </Link>
              <Link href={footerData.links?.adminUrl || '/admin/login'} className="text-gray-400 hover:text-orange-400 transition-colors">
                {footerData.links?.admin || '관리자'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Button */}
      <a
        href={`tel:${footerData.phone || '051-469-7581'}`}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 hover:scale-110 transition-all duration-300 z-40"
      >
        <i className="ri-phone-line text-3xl text-white"></i>
      </a>
    </footer>
  );
}
