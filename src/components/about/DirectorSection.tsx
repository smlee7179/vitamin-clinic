import Image from 'next/image';
import { PrismaClient } from '@prisma/client';

export default async function DirectorSection() {
  const prisma = new PrismaClient();
  let directors = [];
  try {
    directors = await prisma.content.findMany({
      where: { page: 'about', section: 'director' },
      orderBy: { order: 'asc' },
    });
  } catch (e) {
    return <div className="text-center text-red-500 py-12">원장님 소개 정보를 불러오지 못했습니다.</div>;
  }
  if (!directors || directors.length === 0) {
    return <div className="text-center text-neutral-400 py-12">원장님 소개 데이터가 없습니다.</div>;
  }
  return (
    <section className="container py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {directors.map((director: any) => (
        <div key={director.id} className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="flex justify-center">
            <div className="relative w-56 h-56 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-200 to-primary-50">
              <Image
                src={director.image || "/director.jpg"}
                alt={director.title || "원장님 프로필"}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          <div className="glass-card p-8 flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">{director.title || '원장님'}</h2>
            <div className="text-lg text-neutral-800 font-medium" dangerouslySetInnerHTML={{ __html: director.content || '소개 내용이 없습니다.' }} />
          </div>
        </div>
      ))}
    </section>
  );
}
