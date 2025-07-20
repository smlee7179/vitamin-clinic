const values = [
  { icon: '🤝', title: '신뢰', desc: '환자와의 신뢰를 최우선으로 생각합니다.' },
  { icon: '💬', title: '소통', desc: '어르신과의 소통을 통해 맞춤 진료를 제공합니다.' },
  { icon: '🌱', title: '성장', desc: '지속적인 연구와 교육으로 성장합니다.' },
  { icon: '❤️', title: '따뜻함', desc: '따뜻한 마음으로 환자를 대합니다.' },
];

export default function PhilosophySection() {
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold text-primary-600 mb-8">비타민 의원의 핵심 가치</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((v) => (
          <div key={v.title} className="glass-card flex flex-col items-center p-8 shadow-card">
            <span className="text-4xl mb-2">{v.icon}</span>
            <h3 className="text-xl font-bold mb-1 text-primary-600">{v.title}</h3>
            <p className="text-base text-neutral-700 text-center">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
