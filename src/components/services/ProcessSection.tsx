'use client';

const steps = [
  { num: 1, title: '접수 및 상담', desc: '환자 상태와 증상에 대해 충분히 상담합니다.' },
  { num: 2, title: '진단 및 검사', desc: '정확한 진단을 위해 필요한 검사를 시행합니다.' },
  { num: 3, title: '맞춤 치료 계획', desc: '환자별 맞춤 치료 및 재활 계획을 수립합니다.' },
  { num: 4, title: '치료 및 재활', desc: '비수술적 치료, 수술, 재활 등 최적의 치료를 제공합니다.' },
  { num: 5, title: '경과 관찰 및 관리', desc: '치료 후에도 지속적으로 경과를 관찰하고 관리합니다.' },
];

export default function ProcessSection() {
  return (
    <section className="bg-gradient-to-br from-neutral-50 to-vitamin-50/30 py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
            진료 프로세스
          </h2>
          <p className="text-lg text-neutral-600">
            체계적이고 전문적인 5단계 진료 과정
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-4 lg:gap-0">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="flex flex-col items-center relative w-full lg:w-auto animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Step Number Circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-vitamin-500 to-vitamin-600 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white mb-4 shadow-lg shadow-vitamin-500/30 border-4 border-white group-hover:scale-110 transition-transform">
                {s.num}
              </div>

              {/* Card */}
              <div className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 w-full lg:w-56 text-center shadow-lg hover:shadow-vitamin-glow transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-vitamin-600 mb-2 group-hover:text-vitamin-700 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Arrow (Desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute right-[-16px] top-8 z-10">
                  <svg width="32" height="32" fill="none" stroke="#ff6b35" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M8 12h8M16 12l-4 4m4-4l-4-4"/>
                  </svg>
                </div>
              )}

              {/* Arrow (Mobile - Vertical) */}
              {i < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <svg width="24" height="32" fill="none" stroke="#ff6b35" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M12 8v8M12 16l-4-4m4 4l4-4"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
