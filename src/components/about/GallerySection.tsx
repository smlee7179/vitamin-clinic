import { PrismaClient } from '@prisma/client';

export default async function GallerySection() {
  const prisma = new PrismaClient();
  let galleries = [];
  try {
    galleries = await prisma.content.findMany({
      where: { section: 'gallery' },
      orderBy: { order: 'asc' },
    });
  } catch (e) {
    return <div className="text-center text-red-500 py-12">시설 갤러리 정보를 불러오지 못했습니다.</div>;
  }
  if (!galleries || galleries.length === 0) {
    return <div className="text-center text-neutral-400 py-12">시설 갤러리 데이터가 없습니다.</div>;
  }
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold text-primary-600 mb-8">시설 갤러리</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {galleries.map((g: any) => (
          <div key={g.id} className="overflow-hidden rounded-2xl shadow-lg group">
            <img
              src={g.image || "/device.jpg"}
              alt={g.title || "시설 이미지"}
              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {g.title && <div className="text-center text-sm font-semibold mt-2 text-primary-700">{g.title}</div>}
            {g.content && <div className="text-center text-xs text-neutral-600 mb-2">{g.content}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
