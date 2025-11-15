import { PrismaClient, Notice } from '@prisma/client';

export default async function NoticeList() {
  const prisma = new PrismaClient();
  let notices: Notice[] = [];
  try {
    notices = await prisma.notice.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (e) {
    return (
      <div className="container py-16 text-center">
        <p className="text-red-500 text-lg">공지사항을 불러오지 못했습니다.</p>
      </div>
    );
  }
  if (!notices || notices.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-neutral-400 text-lg">공지사항이 없습니다.</p>
      </div>
    );
  }
  return (
    <section className="container py-16 sm:py-24">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
          최신 소식
        </h2>
        <p className="text-lg text-neutral-600">
          병원의 새로운 소식과 중요한 안내사항을 확인하세요
        </p>
      </div>

      <div className="space-y-4">
        {notices.map((n, index) => (
          <div
            key={n.id}
            className={`group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-vitamin-glow transition-all duration-300 hover:-translate-y-1 animate-slide-up ${
              n.important ? 'border-2 border-vitamin-500' : ''
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Important Badge */}
            {n.important && (
              <div className="absolute -top-3 left-6">
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  중요
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Content */}
              <div className="flex-grow">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {n.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-vitamin-100 text-vitamin-700">
                      {n.category}
                    </span>
                  )}
                  <span className="text-sm text-neutral-500">
                    {n.createdAt
                      ? new Date(n.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-neutral-900 group-hover:text-vitamin-600 transition-colors">
                  {n.title}
                </h3>

                {/* Content Preview */}
                <div
                  className="text-base text-neutral-700 leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: n.content }}
                />
              </div>

              {/* Arrow Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-vitamin-400 to-vitamin-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-vitamin-500/30">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
