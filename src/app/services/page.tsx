'use client';

import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

const services = [
  {
    icon: '💉',
    title: '신경차단술',
    description: '통증 부위에 직접 약물을 주입하여 신경을 차단하고 통증을 완화합니다.',
    features: ['척추 신경차단', '관절 신경차단', '근막통증 치료', '대상포진 후 신경통'],
  },
  {
    icon: '💊',
    title: '주사치료',
    description: '염증과 통증을 완화하는 약물을 직접 주입하여 빠른 효과를 얻습니다.',
    features: ['스테로이드 주사', 'DNA 주사', '프롤로 주사', '히알루론산 주사'],
  },
  {
    icon: '🤲',
    title: '도수치료',
    description: '전문 치료사의 손으로 근육과 관절을 치료하여 기능을 회복합니다.',
    features: ['근막이완술', '관절가동술', '척추교정', '자세교정'],
  },
  {
    icon: '⚡',
    title: '체외충격파',
    description: '고에너지 충격파로 통증 부위를 자극하여 재생을 촉진합니다.',
    features: ['석회성 건염', '족저근막염', '테니스엘보', '오십견'],
  },
  {
    icon: '🏥',
    title: '재활치료',
    description: '맞춤형 재활 프로그램으로 일상생활 복귀를 돕습니다.',
    features: ['운동치료', '물리치료', '작업치료', '기능 회복 훈련'],
  },
  {
    icon: '🔬',
    title: '정밀검사',
    description: '최신 장비를 통한 정확한 진단으로 최적의 치료 계획을 수립합니다.',
    features: ['X-ray 촬영', '초음파 검사', '혈액 검사', '정밀 진단'],
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      <NewHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">진료 안내</h1>
            <p className="text-lg md:text-xl opacity-90">
              전문적인 통증 치료 서비스를 제공합니다
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-lg mb-4 text-3xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">세부 항목:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <span className="text-[#f97316] mr-2">•</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">진료 예약 문의</h2>
            <p className="text-lg mb-8 opacity-90">
              자세한 진료 안내는 전화로 문의해 주세요
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#f97316] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              연락처 보기
            </a>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
