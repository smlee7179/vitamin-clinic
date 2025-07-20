import { PrismaClient, Content } from '@prisma/client';

export default async function ServiceGrid() {
  const prisma = new PrismaClient();
  let services: Content[] = [];
  try {
    services = await prisma.content.findMany({ where: { page: 'service' }, orderBy: { order: 'asc' } });
  } catch (e) {
    return <div className="text-center text-red-500 py-12">진료과목 정보를 불러오지 못했습니다.</div>;
  }
  if (!services || services.length === 0) {
    return <div className="text-center text-neutral-400 py-12">진료과목 데이터가 없습니다.</div>;
  }
  return (
    <section className="container py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      {services.map((s) => (
        <div
          key={s.id}
          className="glass-card flex flex-col items-center p-8 shadow-card hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
        >
          <div className="mb-4 text-primary-500 group-hover:scale-110 transition-transform duration-300">
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-neutral-900">{s.title}</h3>
          <p className="text-base text-neutral-700 text-center mb-2">{s.content}</p>
        </div>
      ))}
    </section>
  );
}
