import Image from 'next/image';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[320px] sm:h-[400px] md:h-[520px] flex items-center justify-center overflow-hidden">
      <Image
        src="/hero-hospital.jpg"
        alt="비타민마취통증의학과의원 외관"
        fill
        className="object-cover object-center z-0"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/90 via-primary-300/80 to-primary-100/60 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-4 leading-tight">따뜻한 마음으로 치료하는<br />비타민마취통증의학과의원</h1>
        {/* 주소/전화번호 텍스트 제거 */}
        {/* <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-8 drop-shadow">부산 동구 중앙대로 375 | 051-469-7581<br />노인 전문 마취통증의학과, 맞춤 재활 및 통증 치료</p> */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-lg mx-auto relative z-30">
          <a href="tel:051-469-7581" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out backdrop-blur-sm border border-white/20 relative z-40 min-w-[120px]">📞 전화걸기</a>
          <Link href="/contact" className="bg-white border-2 border-white text-primary-600 hover:bg-white hover:text-primary-700 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 relative z-40 min-w-[120px] whitespace-nowrap">오시는 길</Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 md:h-20 z-30 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 0h1440v40c-240 40-480 40-720 0S240 0 0 40V0z" fill="#fff" />
        </svg>
      </div>
    </section>
  );
}
