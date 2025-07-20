const steps = [
  { num: 1, title: '접수 및 상담', desc: '환자 상태와 증상에 대해 충분히 상담합니다.' },
  { num: 2, title: '진단 및 검사', desc: '정확한 진단을 위해 필요한 검사를 시행합니다.' },
  { num: 3, title: '맞춤 치료 계획', desc: '환자별 맞춤 치료 및 재활 계획을 수립합니다.' },
  { num: 4, title: '치료 및 재활', desc: '비수술적 치료, 수술, 재활 등 최적의 치료를 제공합니다.' },
  { num: 5, title: '경과 관찰 및 관리', desc: '치료 후에도 지속적으로 경과를 관찰하고 관리합니다.' },
];

export default function ProcessSection() {
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold text-primary-600 mb-8">진료 프로세스</h2>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {steps.map((s, i) => (
          <div key={s.num} className="flex flex-col items-center relative">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-600 mb-2 border-4 border-primary-300 shadow">
              {s.num}
            </div>
            <div className="glass-card p-4 w-48 text-center mb-2">
              <div className="text-lg font-semibold text-primary-700 mb-1">{s.title}</div>
              <div className="text-base text-neutral-700">{s.desc}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute right-[-32px] top-1/2 -translate-y-1/2">
                <svg width="32" height="32" fill="none" stroke="#ff6b35" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 12h8M16 12l-4 4m4-4l-4-4"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
