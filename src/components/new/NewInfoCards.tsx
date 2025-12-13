'use client';

import Link from 'next/link';

export default function NewInfoCards() {
  return (
    <section className="py-12 md:py-16 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/contact"
          className="bg-white border-2 border-orange-200 hover:border-[#f97316] rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group block"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#343A40] mb-3 md:mb-4 group-hover:text-[#f97316] transition-colors">
              오시는 길 & 진료안내
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              병원 위치, 교통 안내, 운영 시간 및 진료 일정을 확인하세요
            </p>

            {/* Arrow Button */}
            <div className="flex items-center justify-center text-[#f97316] font-bold text-sm md:text-base group-hover:translate-x-2 transition-transform duration-300">
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
        </Link>
      </div>
    </section>
  );
}
