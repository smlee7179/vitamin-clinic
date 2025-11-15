'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
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
              병원 소개
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto">
              환자분들의 건강한 삶을 위해 최선을 다하겠습니다
            </p>
          </div>
        </section>

        {/* 원장 소개 섹션 */}
        <section className="section bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                원장 소개
              </h2>
              <p className="text-body-1 text-neutral-600">
                풍부한 경험과 전문성으로 여러분의 건강을 책임집니다
              </p>
            </div>

            <div className="card">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* 원장 사진 */}
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
                  <img
                    src="/director.jpg"
                    alt="원장"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 원장 정보 */}
                <div className="flex-1">
                  <h3 className="text-display-2 text-neutral-900 mb-4">
                    비타민마취통증의학과 원장
                  </h3>
                  <div className="space-y-3 text-body-1 text-neutral-700">
                    <p className="flex items-start">
                      <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0 mt-1">✓</span>
                      마취통증의학과 전문의
                    </p>
                    <p className="flex items-start">
                      <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0 mt-1">✓</span>
                      대한마취통증의학회 정회원
                    </p>
                    <p className="flex items-start">
                      <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0 mt-1">✓</span>
                      부산 지역 60년 진료 경험
                    </p>
                    <p className="flex items-start">
                      <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0 mt-1">✓</span>
                      노인 전문 통증 치료
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 진료 철학 섹션 */}
        <section className="section bg-neutral-50">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                진료 철학
              </h2>
              <p className="text-body-1 text-neutral-600">
                환자 중심의 따뜻한 진료를 실천합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-display-2 text-neutral-900 mb-3">
                  환자 중심
                </h3>
                <p className="text-body-1 text-neutral-600 leading-relaxed">
                  환자분들의 입장에서 생각하고, 최선의 치료 방법을 함께 고민합니다
                </p>
              </div>

              <div className="card text-center">
                <div className="text-4xl mb-4">💙</div>
                <h3 className="text-display-2 text-neutral-900 mb-3">
                  따뜻한 마음
                </h3>
                <p className="text-body-1 text-neutral-600 leading-relaxed">
                  가족을 대하듯 친절하고 정성스러운 진료를 제공합니다
                </p>
              </div>

              <div className="card text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-display-2 text-neutral-900 mb-3">
                  전문성
                </h3>
                <p className="text-body-1 text-neutral-600 leading-relaxed">
                  지속적인 연구와 학습으로 최신 치료 기술을 제공합니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 병원 시설 갤러리 */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                병원 시설
              </h2>
              <p className="text-body-1 text-neutral-600">
                쾌적하고 깨끗한 진료 환경을 제공합니다
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
                    alt="진료실"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-display-2 text-neutral-900 mb-2">진료실</h3>
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
              궁금하신 점이 있으신가요?
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
