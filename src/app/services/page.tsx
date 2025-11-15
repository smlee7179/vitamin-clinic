'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const services = [
  {
    icon: '💉',
    title: '신경차단술',
    description: '통증 부위에 직접 약물을 주입하여 신경을 차단하고 통증을 완화합니다.',
    features: ['척추 신경차단', '관절 신경차단', '근막통증 치료', '대상포진 후 신경통'],
    image: '/gallery2.jpg'
  },
  {
    icon: '💊',
    title: '주사치료',
    description: '염증과 통증을 완화하는 약물을 직접 주입하여 빠른 효과를 얻습니다.',
    features: ['스테로이드 주사', 'DNA 주사', '프롤로 주사', '히알루론산 주사'],
    image: '/gallery2.jpg'
  },
  {
    icon: '🤲',
    title: '도수치료',
    description: '전문 치료사의 손으로 근육과 관절을 치료하여 기능을 회복합니다.',
    features: ['근막이완술', '관절가동술', '척추교정', '자세교정'],
    image: '/gallery3.jpg'
  },
  {
    icon: '⚡',
    title: '체외충격파',
    description: '고에너지 충격파로 통증 부위를 자극하여 재생을 촉진합니다.',
    features: ['석회성 건염', '족저근막염', '테니스엘보', '오십견'],
    image: '/gallery3.jpg'
  },
  {
    icon: '🏥',
    title: '재활치료',
    description: '맞춤형 재활 프로그램으로 일상생활 복귀를 돕습니다.',
    features: ['운동치료', '물리치료', '작업치료', '기능 회복 훈련'],
    image: '/gallery1.jpg'
  },
  {
    icon: '🔬',
    title: '정밀검사',
    description: '최신 장비를 통한 정확한 진단으로 최적의 치료 계획을 수립합니다.',
    features: ['X-ray 촬영', '초음파 검사', '혈액 검사', '정밀 진단'],
    image: '/gallery1.jpg'
  }
];

const processSteps = [
  { number: '01', title: '접수 및 상담', desc: '증상에 대한 자세한 상담을 진행합니다' },
  { number: '02', title: '정밀 검사', desc: '필요한 검사를 통해 정확한 진단을 내립니다' },
  { number: '03', title: '치료 계획', desc: '환자별 맞춤 치료 계획을 수립합니다' },
  { number: '04', title: '치료 진행', desc: '전문의의 체계적인 치료를 받습니다' },
  { number: '05', title: '경과 관찰', desc: '정기적인 검진으로 회복 상태를 확인합니다' }
];

export default function Services() {
  return (
    <>
      <Header />
      <main className="pt-[56px] md:pt-[64px]">
        {/* Hero Section */}
        <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(/gallery2.jpg)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vitamin-500/80 via-vitamin-400/70 to-vitamin-300/60" />
            </div>
          </div>

          <div className="relative z-10 container text-center py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              진료과목
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto">
              전문적이고 체계적인 치료 서비스를 제공합니다
            </p>
          </div>
        </section>

        {/* 진료 과목 그리드 */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                전문 진료 과목
              </h2>
              <p className="text-body-1 text-neutral-600">
                다양한 치료 방법으로 환자분들의 빠른 회복을 돕습니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="card hover:shadow-lg transition-all duration-normal">
                  {/* 서비스 이미지 */}
                  <div className="aspect-[16/9] bg-neutral-100 rounded-lg overflow-hidden mb-4 -mx-4 -mt-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 아이콘 & 제목 */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{service.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-display-2 text-neutral-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-body-2 text-neutral-600 leading-relaxed mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* 특징 리스트 */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-center text-body-2 text-neutral-700">
                        <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 진료 프로세스 */}
        <section className="section bg-neutral-50">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                진료 프로세스
              </h2>
              <p className="text-body-1 text-neutral-600">
                체계적인 진료 과정을 통해 최상의 치료 결과를 제공합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="card text-center">
                    <div className="text-4xl font-bold text-vitamin-500 mb-3">
                      {step.number}
                    </div>
                    <h3 className="text-display-2 text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-body-2 text-neutral-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-vitamin-300">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 주요 치료 대상 */}
        <section className="section bg-white">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
                주요 치료 대상
              </h2>
              <p className="text-body-1 text-neutral-600">
                다음과 같은 증상이 있으시면 내원해 주세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-display-2 text-neutral-900 mb-4">척추 질환</h3>
                <ul className="space-y-2">
                  {['목 디스크', '허리 디스크', '척추관 협착증', '척추측만증', '척추 압박골절'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-body-1 text-neutral-700">
                      <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 className="text-display-2 text-neutral-900 mb-4">관절 질환</h3>
                <ul className="space-y-2">
                  {['퇴행성 관절염', '오십견', '무릎 통증', '손목터널증후군', '테니스엘보'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-body-1 text-neutral-700">
                      <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 className="text-display-2 text-neutral-900 mb-4">통증 질환</h3>
                <ul className="space-y-2">
                  {['만성 두통', '근막통증증후군', '대상포진 후 신경통', '복합부위 통증증후군'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-body-1 text-neutral-700">
                      <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 className="text-display-2 text-neutral-900 mb-4">기타 질환</h3>
                <ul className="space-y-2">
                  {['족저근막염', '아킬레스건염', '골다공증', '골절 후 통증', '수술 후 재활'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-body-1 text-neutral-700">
                      <span className="w-4 h-4 mr-2 text-vitamin-500 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="section bg-gradient-to-br from-vitamin-50 to-vitamin-100">
          <div className="container max-w-4xl text-center">
            <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-6">
              정확한 진단과 치료가 필요하신가요?
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
