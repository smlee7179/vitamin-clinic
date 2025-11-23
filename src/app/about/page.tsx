'use client';

import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

export default function AboutPage() {
  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">병원 소개</h1>
            <p className="text-lg md:text-xl opacity-90">
              환자 중심의 전문적인 마취통증의학과
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                비타민마취통증의학과
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                비타민마취통증의학과는 부산 해운대구에 위치한 전문 의료기관으로,
                환자분들의 통증 완화와 건강 회복을 최우선으로 생각합니다.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                최신 의료 장비와 풍부한 임상 경험을 바탕으로
                급성 및 만성 통증에 대한 전문적인 진단과 치료를 제공하고 있습니다.
              </p>
              <p className="text-gray-600 leading-relaxed">
                환자 한 분 한 분의 상태를 정확히 파악하고,
                개인별 맞춤 치료 계획을 수립하여 최상의 치료 결과를 제공합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#f97316]/10 to-[#fb923c]/10 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚕️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">전문 의료진</h3>
                    <p className="text-sm text-gray-600">
                      풍부한 임상 경험을 보유한 마취통증의학과 전문의
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">최신 시설</h3>
                    <p className="text-sm text-gray-600">
                      첨단 의료 장비와 쾌적한 진료 환경
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">환자 중심</h3>
                    <p className="text-sm text-gray-600">
                      맞춤형 치료와 세심한 케어 서비스
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              우리의 약속
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  정확한 진단
                </h3>
                <p className="text-gray-600">
                  체계적인 검사와 정밀한 분석을 통한 정확한 통증 원인 파악
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  효과적인 치료
                </h3>
                <p className="text-gray-600">
                  최신 치료법과 풍부한 경험을 바탕으로 한 효과적인 통증 관리
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  지속적인 관리
                </h3>
                <p className="text-gray-600">
                  치료 후에도 지속적인 모니터링과 재발 방지를 위한 사후 관리
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">진료 예약 및 상담</h2>
            <p className="text-lg mb-8 opacity-90">
              통증으로 고민하고 계신가요? 전문의와 상담하세요.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#f97316] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              오시는 길 보기
            </a>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
