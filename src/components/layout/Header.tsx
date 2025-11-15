'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: '홈' },
  { href: '/about', label: '병원 소개' },
  { href: '/services', label: '진료과목' },
  { href: '/health-info', label: '건강 정보' },
  { href: '/notices', label: '공지사항' },
  { href: '/contact', label: '오시는 길' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-normal bg-white ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      {/* 하단 테두리 */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-neutral-200 transition-opacity duration-normal ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`} />

      <nav className="container relative flex items-center justify-between h-[56px] md:h-[64px]">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 touch-target">
          <div className="w-8 h-8 rounded-lg bg-vitamin-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">비</span>
          </div>
          <span className="text-sm md:text-base font-bold text-neutral-900 hidden xs:inline whitespace-nowrap">
            비타민마취통증의학과
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-4 py-2 text-body-1 font-medium transition-colors duration-normal rounded-md ${
                  pathname === item.href
                    ? 'text-neutral-900'
                    : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {item.label}
                {/* Active indicator */}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-vitamin-500 rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="md:hidden touch-target flex items-center justify-center w-12 h-12 rounded-md text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 transition-colors duration-fast"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/20 animate-fade-in"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="absolute top-[56px] left-0 right-0 bg-white shadow-lg animate-slide-down"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="divide-y divide-neutral-100">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-4 text-body-1 font-medium transition-colors duration-fast touch-target ${
                        pathname === item.href
                          ? 'text-neutral-900 bg-neutral-100'
                          : 'text-neutral-700 active:bg-neutral-100'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA 버튼 */}
              <div className="p-4 border-t border-neutral-100">
                <a
                  href="tel:051-469-7581"
                  className="btn btn-primary w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  전화 문의하기
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
