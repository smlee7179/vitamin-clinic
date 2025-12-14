'use client';

import Link from 'next/link';

export default function NewInfoCards() {
  const cards = [
    {
      title: '의료진 소개',
      description: '풍부한 경험과 전문성을 갖춘 의료진을 소개합니다',
      href: '/about',
      icon: (
        <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: '진료시간 안내',
      description: '병원 운영 시간 및 진료 일정을 확인하세요',
      href: '/contact',
      icon: (
        <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: '오시는 길',
      description: '병원 위치와 교통 안내를 확인하세요',
      href: '/contact',
      icon: (
        <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="bg-white border-2 border-orange-200 hover:border-[#f97316] rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group block"
            >
              <div className="text-center">
                {/* Icon */}
                <div className="flex justify-center mb-4 text-[#f97316] group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#343A40] mb-2 sm:mb-3 group-hover:text-[#f97316] transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
