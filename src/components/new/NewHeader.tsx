'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 text-gray-900">
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
            <h2 className="text-xl font-bold tracking-[-0.015em]">비타민마취통증의학과</h2>
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
              <Link
                href="/treatments"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium leading-normal transition-colors"
              >
                치료소개
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
              <Link
                href="/treatments"
                className="text-gray-800 hover:text-[#f97316] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                치료소개
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
