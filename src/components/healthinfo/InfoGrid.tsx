import { PrismaClient, HealthInfo } from '@prisma/client';

export default async function InfoGrid() {
  const prisma = new PrismaClient();
  let infos: HealthInfo[] = [];
  try {
    infos = await prisma.healthInfo.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (e) {
    return <div className="text-center text-red-500 py-12">건강정보를 불러오지 못했습니다.</div>;
  }
  if (!infos || infos.length === 0) {
    return <div className="text-center text-neutral-400 py-12">건강정보가 없습니다.</div>;
  }
  return (
    <section className="container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {infos.map((info) => (
        <div key={info.id} className="glass-card flex flex-col items-center p-8 shadow-card hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
          <span className="text-4xl mb-2">{info.category || 'ℹ️'}</span>
          <h3 className="text-xl font-bold mb-2 text-neutral-900">{info.title}</h3>
          <div className="text-base text-neutral-700 text-center mb-4" dangerouslySetInnerHTML={{ __html: info.content }} />
          {info.imageUrl && <img src={info.imageUrl} alt="건강정보 이미지" className="w-32 h-24 object-cover mt-2 rounded border-2 border-primary-300" />}
        </div>
      ))}
    </section>
  );
}
