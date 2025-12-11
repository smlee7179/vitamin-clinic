'use client';

import Link from 'next/link';

export default function NewInfoCards() {
  return (
    <section className="py-12 md:py-16 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/contact"
          className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group block"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            {/* Icons Section */}
            <div className="flex gap-4 flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-xl flex items-center justify-center text-4xl md:text-5xl shadow-md group-hover:scale-110 transition-transform duration-300">
                📍
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-xl flex items-center justify-center text-4xl md:text-5xl shadow-md group-hover:scale-110 transition-transform duration-300">
                ⏰
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4">
                오시는 길 & 진료안내
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                병원 위치, 교통 안내, 운영 시간 및 진료 일정을 확인하세요
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                  <div className="text-white/80 text-xs md:text-sm font-semibold mb-1">평일</div>
                  <div className="text-white text-sm md:text-base font-bold">09:00 ~ 18:00</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                  <div className="text-white/80 text-xs md:text-sm font-semibold mb-1">토요일</div>
                  <div className="text-white text-sm md:text-base font-bold">09:00 ~ 13:00</div>
                </div>
              </div>

              {/* Arrow Button */}
              <div className="flex items-center justify-center md:justify-start text-white font-bold text-sm md:text-base group-hover:translate-x-2 transition-transform duration-300">
                <span>자세히 보기</span>
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
