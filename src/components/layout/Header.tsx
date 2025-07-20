'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Logo from './Logo';

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow' : 'bg-transparent'}`}>
      <nav className="container flex items-center justify-between h-16 sm:h-20">
        {/* 병원명/로고 */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        {/* 데스크톱 메뉴 */}
        <ul className="hidden sm:flex gap-1 sm:gap-2 md:gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-2 sm:px-3 md:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm md:text-base transition-all duration-200
                  ${pathname === item.href ? 'text-primary-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-500 after:w-full after:scale-x-100 after:transition-transform after:duration-300' : 'text-neutral-700 hover:text-primary-500 hover:bg-primary-50'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          className="sm:hidden flex items-center justify-center w-10 h-10 rounded-md border border-neutral-200 bg-white/80 backdrop-blur-md shadow text-primary-500"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        {/* 모바일 메뉴 오버레이 */}
        {menuOpen && (
          <div className="sm:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMenuOpen(false)}>
            <ul className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col divide-y divide-neutral-200 animate-fade-in">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-6 py-4 text-xs sm:text-sm md:text-base font-medium text-neutral-800 hover:bg-primary-50 transition-all ${pathname === item.href ? 'text-primary-600 font-bold' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
