export default function Footer() {
  return (
    <footer className="w-full bg-primary-50 border-t border-neutral-200 mt-8 sm:mt-16">
      <div className="container py-4 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="text-base sm:text-lg font-bold text-primary-600">비타민마취통증의학과의원</div>
        <div className="text-xs sm:text-base text-neutral-600">부산 동구 중앙대로 375 | 전화: <a href="tel:051-469-7581" className="text-primary-500 font-semibold">051-469-7581</a></div>
        <div className="flex gap-2 sm:gap-4 text-neutral-500 text-xs sm:text-sm">
          <a href="/about" className="hover:text-primary-500 transition">병원 소개</a>
          <a href="/services" className="hover:text-primary-500 transition">진료과목</a>
          <a href="/contact" className="hover:text-primary-500 transition">오시는 길</a>
        </div>
      </div>
    </footer>
  );
}
