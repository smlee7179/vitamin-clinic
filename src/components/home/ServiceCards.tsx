const services = [
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
    ),
    title: '관절염',
    desc: '무릎, 어깨, 손목 등 관절 질환 전문 치료',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" /><path d="M8 12h8" /></svg>
    ),
    title: '척추 질환',
    desc: '허리, 목 등 척추 질환 및 통증 관리',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="6" /><path d="M12 8v8" /></svg>
    ),
    title: '골절 치료',
    desc: '노인 골절, 외상 치료 및 재활',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 16l4-8 4 8" /></svg>
    ),
    title: '재활 치료',
    desc: '맞춤 재활 프로그램 및 운동 치료',
  },
];

export default function ServiceCards() {
  return (
    <section className="container py-4 sm:py-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
      {services.map((s, i) => (
        <div
          key={s.title}
          className="glass-card flex flex-col items-center p-3 sm:p-5 md:p-8 shadow-card hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group w-full"
        >
          <div className="mb-2 sm:mb-4 text-primary-500 group-hover:scale-110 transition-transform duration-300">
            {s.icon}
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-neutral-900">{s.title}</h3>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 text-center">{s.desc}</p>
        </div>
      ))}
    </section>
  );
}
