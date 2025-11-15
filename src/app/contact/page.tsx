'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Contact() {
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
    <>
      <Header />
      <main className="pt-[56px] md:pt-[64px]">
        {/* Hero Section - 메인 페이지와 통일 */}
        <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* 병원 외관 배경 이미지 */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(/gallery1.jpg)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vitamin-500/80 via-vitamin-400/70 to-vitamin-300/60" />
            </div>
          </div>

          <div className="relative z-10 container text-center py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              오시는 길
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto">
              부산 동구 중앙대로 375에 위치하고 있습니다
            </p>
          </div>
        </section>

        {/* 연락처 정보 */}
        <section className="section bg-white">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                연락처
              </h2>
              <p className="text-body-1 text-neutral-600">
                진료 예약 및 문의는 전화로 가능합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-vitamin-50 flex items-center justify-center flex-shrink-0 text-vitamin-500">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-display-2 text-neutral-900 mb-3">{info.title}</h3>
                      <div className="text-body-1">{info.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 찾아오시는 길 */}
        <section className="section bg-neutral-50">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                찾아오시는 길
              </h2>
              <p className="text-body-1 text-neutral-600">
                쾌적하고 편리한 접근성을 자랑합니다
              </p>
            </div>

            {/* 지도 */}
            <div className="card p-0 overflow-hidden mb-8">
              <div className="relative w-full h-96 md:h-[500px]">
                <iframe
                  title="비타민마취통증의학과의원 위치"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=129.036%2C35.115%2C129.040%2C35.119&layer=mapnik"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-6 md:p-8 bg-vitamin-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-vitamin-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-display-2 text-neutral-900 mb-2">주소</h3>
                    <p className="text-body-1 text-neutral-800 mb-3">부산 동구 중앙대로 375</p>
                    <p className="text-body-2 text-neutral-600 leading-relaxed">
                      1호선 부산역 8번 출구 도보 3분 · 버스 27/41/87/103/134번 · 건물 내 주차장 완비
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 교통 및 접근성 */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-vitamin-50 flex items-center justify-center text-vitamin-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-display-2 text-neutral-900">교통 및 접근성</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {transportation.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-neutral-50">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <p className="text-body-2 text-neutral-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 병원 위치 사진 */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                병원 위치
              </h2>
              <p className="text-body-1 text-neutral-600">
                부산역에서 가까운 편리한 위치입니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-0 overflow-hidden">
                <div className="aspect-[4/3] bg-neutral-100">
                  <img
                    src="/gallery1.jpg"
                    alt="병원 외관"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-display-2 text-neutral-900 mb-2">병원 외관</h3>
                  <p className="text-body-2 text-neutral-600">깨끗하고 현대적인 병원 건물</p>
                </div>
              </div>

              <div className="card p-0 overflow-hidden">
                <div className="aspect-[4/3] bg-neutral-100">
                  <img
                    src="/gallery2.jpg"
                    alt="진료실 내부"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-display-2 text-neutral-900 mb-2">진료실 내부</h3>
                  <p className="text-body-2 text-neutral-600">쾌적한 진료 환경</p>
                </div>
              </div>

              <div className="card p-0 overflow-hidden">
                <div className="aspect-[4/3] bg-neutral-100">
                  <img
                    src="/gallery3.jpg"
                    alt="대기실"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-display-2 text-neutral-900 mb-2">대기실</h3>
                  <p className="text-body-2 text-neutral-600">편안한 대기 공간</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="section bg-gradient-to-br from-vitamin-50 to-vitamin-100">
          <div className="container max-w-4xl text-center">
            <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-6">
              방문 전 예약을 원하시나요?
            </h2>
            <p className="text-body-1 text-neutral-600 mb-8">
              전화로 상담 및 예약이 가능합니다
            </p>
            <a
              href="tel:051-469-7581"
              className="btn btn-primary text-lg px-8"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              전화 문의하기
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
