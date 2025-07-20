"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("admin-auth");
      if (!isAuth) router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-50">
      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-2 top-2 z-50 bg-primary-600 text-white px-4 py-2 rounded focus:outline-dashed focus:outline-2 focus:outline-primary-700" tabIndex={0}>
        본문 바로가기
      </a>
      {/* 모바일 상단바 + 햄버거 */}
      <header className="md:hidden flex items-center justify-between h-14 px-4 bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-30">
        <button
          className="p-2 rounded focus:outline focus:outline-2 focus:outline-primary-500"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className="block w-6 h-0.5 bg-primary-600 mb-1" />
          <span className="block w-6 h-0.5 bg-primary-600 mb-1" />
          <span className="block w-6 h-0.5 bg-primary-600" />
        </button>
        <span className="font-bold text-primary-700 text-lg">관리자</span>
      </header>
      {/* 사이드바 */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-white border-r border-neutral-200 shadow-lg md:shadow-none p-4 transition-transform duration-200 md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:flex flex-col`}
        role="navigation"
        aria-label="관리자 메뉴"
      >
        <button
          className="md:hidden mb-6 p-2 text-neutral-500 hover:text-primary-600 focus:outline focus:outline-2 focus:outline-primary-500"
          aria-label="메뉴 닫기"
          onClick={() => setMenuOpen(false)}
        >
          닫기
        </button>
        <div className="text-xl font-bold text-primary-600 mb-8" aria-label="관리자 대시보드">관리자</div>
        <nav className="flex flex-col gap-2" aria-label="관리 메뉴">
          <a href="/admin" className="text-lg font-semibold text-neutral-800 hover:text-primary-500 py-2 px-3 rounded transition focus:outline focus:outline-2 focus:outline-primary-500" tabIndex={0} aria-label="대시보드" onClick={()=>setMenuOpen(false)}>대시보드</a>
          <a href="/admin/about" className="text-lg font-semibold text-neutral-800 hover:text-primary-500 py-2 px-3 rounded transition focus:outline focus:outline-2 focus:outline-primary-500" tabIndex={0} aria-label="병원 소개 관리" onClick={()=>setMenuOpen(false)}>병원 소개 관리</a>
          <a href="/admin/services" className="text-lg font-semibold text-neutral-800 hover:text-primary-500 py-2 px-3 rounded transition focus:outline focus:outline-2 focus:outline-primary-500" tabIndex={0} aria-label="진료과목 관리" onClick={()=>setMenuOpen(false)}>진료과목 관리</a>
          <a href="/admin/notices" className="text-lg font-semibold text-neutral-800 hover:text-primary-500 py-2 px-3 rounded transition focus:outline focus:outline-2 focus:outline-primary-500" tabIndex={0} aria-label="공지사항 관리" onClick={()=>setMenuOpen(false)}>공지사항 관리</a>
          <a href="/admin/health-info" className="text-lg font-semibold text-neutral-800 hover:text-primary-500 py-2 px-3 rounded transition focus:outline focus:outline-2 focus:outline-primary-500" tabIndex={0} aria-label="건강정보 관리" onClick={()=>setMenuOpen(false)}>건강정보 관리</a>
          <a href="/admin/logout" className="text-lg font-semibold text-neutral-400 hover:text-red-500 py-2 px-3 rounded transition mt-8 focus:outline focus:outline-2 focus:outline-red-500" tabIndex={0} aria-label="로그아웃" onClick={()=>setMenuOpen(false)}>로그아웃</a>
        </nav>
      </aside>
      {/* 오버레이(모바일 메뉴 열림 시) */}
      {menuOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={()=>setMenuOpen(false)} aria-label="메뉴 닫기 오버레이" />}
      {/* 메인 콘텐츠 */}
      <main id="main-content" className="flex-1 p-4 md:p-6 focus:outline-none max-w-full overflow-x-auto" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
} 