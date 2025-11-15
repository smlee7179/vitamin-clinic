'use client';

const values = [
  { icon: '🤝', title: '신뢰', desc: '환자와의 신뢰를 최우선으로 생각합니다.' },
  { icon: '💬', title: '소통', desc: '어르신과의 소통을 통해 맞춤 진료를 제공합니다.' },
  { icon: '🌱', title: '성장', desc: '지속적인 연구와 교육으로 성장합니다.' },
  { icon: '❤️', title: '따뜻함', desc: '따뜻한 마음으로 환자를 대합니다.' },
];

export default function PhilosophySection() {
  return (
    <section className="bg-gradient-to-br from-neutral-50 to-vitamin-50/30 py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
            비타민 의원의 핵심 가치
          </h2>
          <p className="text-lg text-neutral-600">
            우리가 중요하게 생각하는 네 가지 핵심 가치
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((v, index) => (
            <div
              key={v.title}
              className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-vitamin-glow transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-vitamin-400 to-vitamin-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-vitamin-500/30">
                <span className="text-5xl">{v.icon}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-vitamin-600 group-hover:text-vitamin-700 transition-colors">
                {v.title}
              </h3>
              <p className="text-base text-neutral-700 text-center leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
