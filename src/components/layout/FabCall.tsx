export default function FabCall() {
  return (
    <a
      href="tel:051-123-4567"
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white text-2xl font-bold rounded-full p-5 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out backdrop-blur-sm border border-white/20 flex items-center gap-2"
      aria-label="전화걸기"
    >
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"/></svg>
      <span className="hidden md:inline">전화걸기</span>
    </a>
  );
}
