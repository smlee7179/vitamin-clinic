'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ModernHeaderProps {
  scrolled: boolean;
}

interface NavigationItem {
  label: string;
  href: string;
}

interface HeaderData {
  hospitalName: string;
  specialty: string;
  phone: string;
  navigationItems: NavigationItem[];
  buttonText: string;
}

export default function ModernHeader({ scrolled }: ModernHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderData>({
    hospitalName: '비타민의원',
    specialty: '마취통증의학과',
    phone: '051-469-7581',
    navigationItems: [
      { label: '병원소개', href: '/about' },
      { label: '진료안내', href: '/services' },
      { label: '치료방법', href: '#treatments' },
      { label: '시설안내', href: '#gallery' },
      { label: '오시는길', href: '/contact' },
    ],
    buttonText: '전화예약',
  });

  useEffect(() => {
    const loadHeaderData = async () => {
      try {
        const response = await fetch('/api/content?section=header');
        if (response.ok) {
          const data = await response.json();
          setHeaderData(data);
        }
      } catch (error) {
        console.error('Failed to load header data:', error);
      }
    };

    loadHeaderData();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-2xl shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-105">
              <i className="ri-hospital-line text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{headerData.hospitalName}</h1>
              <p className="text-xs text-gray-600 font-medium">{headerData.specialty}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {headerData.navigationItems.map((item) => {
              const isExternal = item.href.startsWith('#');
              return isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`tel:${headerData.phone}`}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              <i className="ri-phone-line mr-2"></i>
              {headerData.buttonText}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-all ${
              scrolled
                ? 'hover:bg-gray-100'
                : 'bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md'
            }`}
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <i className={`text-2xl text-gray-900 ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-6 py-4 space-y-2">
            {headerData.navigationItems.map((item) => {
              const isExternal = item.href.startsWith('#');
              return isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`tel:${headerData.phone}`}
              className="block px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center font-bold rounded-xl"
            >
              <i className="ri-phone-line mr-2"></i>
              {headerData.buttonText}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
