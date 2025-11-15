import { PrismaClient, Content } from '@prisma/client';

export default async function DirectorSection() {
  const prisma = new PrismaClient();
  let directors: Content[] = [];
  try {
    directors = await prisma.content.findMany({
      where: { page: 'about', section: 'director' },
      orderBy: { order: 'asc' },
    });
  } catch (e) {
    return (
      <div className="container py-16 text-center">
        <p className="text-red-500 text-lg">원장님 소개 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }
  if (!directors || directors.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-neutral-400 text-lg">원장님 소개 데이터가 없습니다.</p>
      </div>
    );
  }
  return (
    <section className="container py-16 sm:py-24">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
          의료진 소개
        </h2>
        <p className="text-lg text-neutral-600">
          풍부한 경험과 전문성으로 환자분들을 케어합니다
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {directors.map((director, index) => (
          <div
            key={director.id}
            className="flex flex-col md:flex-row items-center gap-8 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-vitamin-glow transition-all duration-300 hover:-translate-y-2 animate-slide-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* 프로필 이미지 */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-vitamin-200 to-vitamin-50 border-4 border-white">
                <img
                  src={director.image || "/director.jpg"}
                  alt={director.title || "원장님 프로필"}
                  className="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* 소개 내용 */}
            <div className="flex flex-col gap-4 w-full">
              <h3 className="text-2xl sm:text-3xl font-bold text-vitamin-600">
                {director.title || '원장님'}
              </h3>
              <div
                className="text-base sm:text-lg text-neutral-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: director.content || '소개 내용이 없습니다.' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
