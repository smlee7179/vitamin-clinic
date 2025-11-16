'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ModernHeaderProps {
  scrolled: boolean;
}

export default function ModernHeader({ scrolled }: ModernHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <h1 className="text-xl font-bold text-gray-900">비타민의원</h1>
              <p className="text-xs text-gray-500 font-medium">마취통증의학과</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { label: '병원소개', href: '#about' },
              { label: '진료안내', href: '#services' },
              { label: '치료방법', href: '#treatments' },
              { label: '시설안내', href: '#gallery' },
              { label: '오시는길', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:051-469-7581"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              <i className="ri-phone-line mr-2"></i>
              전화예약
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <i className={`text-2xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-6 py-4 space-y-2">
            {[
              { label: '병원소개', href: '#about' },
              { label: '진료안내', href: '#services' },
              { label: '치료방법', href: '#treatments' },
              { label: '시설안내', href: '#gallery' },
              { label: '오시는길', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:051-469-7581"
              className="block px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center font-bold rounded-xl"
            >
              <i className="ri-phone-line mr-2"></i>
              전화예약
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
