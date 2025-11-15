import { PrismaClient, Content } from '@prisma/client';

export default async function ServiceGrid() {
  const prisma = new PrismaClient();
  let services: Content[] = [];
  try {
    services = await prisma.content.findMany({ where: { page: 'service' }, orderBy: { order: 'asc' } });
  } catch (e) {
    return (
      <div className="container py-16 text-center">
        <p className="text-red-500 text-lg">진료과목 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }
  if (!services || services.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-neutral-400 text-lg">진료과목 데이터가 없습니다.</p>
      </div>
    );
  }
  return (
    <section className="container py-16 sm:py-24">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
          전문 진료 분야
        </h2>
        <p className="text-lg text-neutral-600">
          다양한 통증 및 마취 관련 전문 치료를 제공합니다
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((s, index) => (
          <div
            key={s.id}
            className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-vitamin-glow transition-all duration-500 hover:-translate-y-2 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-vitamin-400 to-vitamin-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-vitamin-500/30">
              <svg width="48" height="48" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-vitamin-600 group-hover:text-vitamin-700 transition-colors text-center">
              {s.title}
            </h3>
            <p className="text-base text-neutral-700 text-center leading-relaxed">
              {s.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
