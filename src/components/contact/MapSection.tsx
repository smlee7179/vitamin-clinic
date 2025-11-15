'use client';

export default function MapSection() {
  return (
    <section className="container py-16 sm:py-24">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
          찾아오시는 길
        </h2>
        <p className="text-lg text-neutral-600">
          부산 동구 중앙대로 375에 위치하고 있습니다
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-vitamin-glow transition-all duration-300 animate-slide-up">
        {/* Map Container */}
        <div className="relative w-full h-96 sm:h-[500px]">
          <iframe
            title="비타민마취통증의학과의원 위치"
            src="https://www.openstreetmap.org/export/embed.html?bbox=129.036%2C35.115%2C129.040%2C35.119&layer=mapnik"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Address Info */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-vitamin-50 to-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-vitamin-400 to-vitamin-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-vitamin-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">주소</h3>
              <p className="text-base text-neutral-700 mb-3">부산 동구 중앙대로 375</p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                1호선 부산역 8번 출구 도보 3분 · 버스 27/41/87/103/134번 · 건물 내 주차장 완비
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
