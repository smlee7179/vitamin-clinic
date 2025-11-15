import { PrismaClient, HealthInfo } from '@prisma/client';

export default async function InfoGrid() {
  const prisma = new PrismaClient();
  let infos: HealthInfo[] = [];
  try {
    infos = await prisma.healthInfo.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (e) {
    return (
      <div className="container py-16 text-center">
        <p className="text-red-500 text-lg">건강정보를 불러오지 못했습니다.</p>
      </div>
    );
  }
  if (!infos || infos.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-neutral-400 text-lg">건강정보가 없습니다.</p>
      </div>
    );
  }
  return (
    <section className="container py-16 sm:py-24">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
          건강 정보 아카이브
        </h2>
        <p className="text-lg text-neutral-600">
          전문의가 제공하는 신뢰할 수 있는 건강 정보
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {infos.map((info, index) => (
          <div
            key={info.id}
            className="group flex flex-col bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-vitamin-glow transition-all duration-500 hover:-translate-y-2 animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Image Section */}
            {info.imageUrl && (
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-vitamin-100 to-vitamin-50">
                <img
                  src={info.imageUrl}
                  alt={info.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              {/* Category Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-vitamin-400 to-vitamin-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-vitamin-500/30">
                <span className="text-3xl">{info.category || 'ℹ️'}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-vitamin-600 group-hover:text-vitamin-700 transition-colors line-clamp-2">
                {info.title}
              </h3>

              {/* Content */}
              <div
                className="text-sm sm:text-base text-neutral-700 leading-relaxed line-clamp-3 flex-grow"
                dangerouslySetInnerHTML={{ __html: info.content }}
              />

              {/* Date */}
              {info.createdAt && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <p className="text-xs text-neutral-500">
                    {new Date(info.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
