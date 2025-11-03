'use client';

const treatments = [
  {
    title: '신경차단술',
    icon: '💉',
    description: '통증 부위에 직접 약물을 주입하여 신경을 차단하고 통증을 완화합니다.',
    features: ['척추 신경차단', '관절 신경차단', '근막통증 치료', '대상포진 후 신경통']
  },
  {
    title: '주사치료',
    icon: '💊',
    description: '염증과 통증을 완화하는 약물을 직접 주입하여 빠른 효과를 얻습니다.',
    features: ['스테로이드 주사', 'DNA 주사', '프롤로 주사', '히알루론산 주사']
  },
  {
    title: '도수치료',
    icon: '🤲',
    description: '전문 치료사의 손으로 근육과 관절을 치료하여 기능을 회복합니다.',
    features: ['근막이완술', '관절가동술', '척추교정', '자세교정']
  },
  {
    title: '체외충격파',
    icon: '⚡',
    description: '고에너지 충격파로 통증 부위를 자극하여 재생을 촉진합니다.',
    features: ['석회성 건염', '족저근막염', '테니스엘보', '오십견']
  }
];

export default function TreatmentSection() {
  return (
    <section id="treatments" className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">치료방법</h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            환자 개개인의 상태에 맞는 최적의 치료 방법을 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {treatments.map((treatment, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start mb-4">
                <div className="text-4xl sm:text-5xl mr-4 group-hover:scale-110 transition-transform">
                  {treatment.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {treatment.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 pl-16">
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  {treatment.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center">
                      <span className="text-orange-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
