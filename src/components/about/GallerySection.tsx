import { PrismaClient, Content } from '@prisma/client';

export default async function GallerySection() {
  const prisma = new PrismaClient();
  let galleries: Content[] = [];
  try {
    galleries = await prisma.content.findMany({
      where: { section: 'gallery' },
      orderBy: { order: 'asc' },
    });
  } catch (e) {
    return (
      <div className="container py-16 text-center">
        <p className="text-red-500 text-lg">시설 갤러리 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }
  if (!galleries || galleries.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-neutral-400 text-lg">시설 갤러리 데이터가 없습니다.</p>
      </div>
    );
  }
  return (
    <section className="container py-16 sm:py-24">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
          시설 갤러리
        </h2>
        <p className="text-lg text-neutral-600">
          깨끗하고 안전한 치료 환경을 제공합니다
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {galleries.map((g, index) => (
          <div
            key={g.id}
            className="group overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-vitamin-glow transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={g.image || "/device.jpg"}
                alt={g.title || "시설 이미지"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {(g.title || g.content) && (
              <div className="p-4 bg-white">
                {g.title && (
                  <h3 className="text-sm sm:text-base font-semibold text-vitamin-600 mb-1">
                    {g.title}
                  </h3>
                )}
                {g.content && (
                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2">
                    {g.content}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
