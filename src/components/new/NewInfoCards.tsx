'use client';

import Link from 'next/link';

export default function NewInfoCards() {
  const cards = [
    {
      id: 'hours',
      title: '진료시간',
      description: '병원 운영 시간 및 진료 일정을 확인하세요',
      icon: '⏰',
      link: '/hours',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      hoverColor: 'hover:from-orange-100 hover:to-orange-200'
    },
    {
      id: 'location',
      title: '오시는 길',
      description: '병원 위치 및 교통 안내를 확인하세요',
      icon: '📍',
      link: '/contact',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      hoverColor: 'hover:from-blue-100 hover:to-blue-200'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.link}
              className={`${card.bgColor} ${card.hoverColor} rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 group`}
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#f97316] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="flex items-center text-[#f97316] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                    <span>자세히 보기</span>
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
