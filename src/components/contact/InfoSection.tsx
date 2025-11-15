'use client';

export default function InfoSection() {
  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: '전화번호',
      content: (
        <a href="tel:051-469-7581" className="text-vitamin-600 font-bold text-lg hover:text-vitamin-700 transition-colors">
          051-469-7581
        </a>
      ),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '진료시간',
      content: (
        <div className="space-y-1">
          <p className="text-neutral-800">평일: 09:00 - 18:00</p>
          <p className="text-neutral-800">토요일: 09:00 - 13:00</p>
          <p className="text-sm text-neutral-600 mt-2">일요일 및 공휴일 휴진</p>
        </div>
      ),
    },
  ];

  const transportation = [
    { icon: '🚇', text: '지하철 1호선 부산역 8번 출구 도보 3분' },
    { icon: '🚌', text: '버스 27, 41, 87, 103, 134번 (중앙대로 하차)' },
    { icon: '🚗', text: '건물 내 주차장 완비 (무료 주차 가능)' },
    { icon: '♿', text: '건물 입구 및 진료실 휠체어 접근 가능' },
  ];

  return (
    <section className="container pb-16 sm:pb-24">
      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {contactInfo.map((info, index) => (
          <div
            key={info.title}
            className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-vitamin-glow transition-all duration-300 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-vitamin-400 to-vitamin-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-vitamin-500/30">
                <div className="text-white">{info.icon}</div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{info.title}</h3>
                <div className="text-base">{info.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transportation Info */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-vitamin-glow transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-vitamin-400 to-vitamin-600 flex items-center justify-center shadow-lg shadow-vitamin-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-neutral-900">교통 및 접근성</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {transportation.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-vitamin-50/30 hover:from-vitamin-50 hover:to-vitamin-100/50 transition-colors duration-300">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
