'use client';

import Image from 'next/image';

export default function NewLocation() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
      <h2 className="text-[#111418] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] pb-6 sm:pb-8 text-center">
        오시는 길 및 연락처
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm">
        {/* Map */}
        <div className="w-full h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden relative">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop"
            alt="병원 위치 지도"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={80}
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6 text-gray-800">
          {/* Address */}
          <div className="flex items-start gap-4">
            <svg
              className="w-6 h-6 text-[#f97316] mt-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl text-[#111418]">주소</h3>
              <p className="mt-1 text-sm sm:text-base">부산광역시 동구 중앙대로 375</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <svg
              className="w-6 h-6 text-[#f97316] mt-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl text-[#111418]">전화번호</h3>
              <p className="mt-1 text-sm sm:text-base">051-469-7581 (예약 및 상담)</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4">
            <svg
              className="w-6 h-6 text-[#f97316] mt-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl text-[#111418]">진료 시간</h3>
              <p className="mt-1 text-sm sm:text-base">
                평일: 09:00 - 18:00
                <br />
                토요일: 09:00 - 13:00
                <br />
                일요일 및 공휴일: 휴진
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
