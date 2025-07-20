import { PrismaClient, Notice } from '@prisma/client';

export default async function NoticeList() {
  const prisma = new PrismaClient();
  let notices: Notice[] = [];
  try {
    notices = await prisma.notice.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (e) {
    return <div className="text-center text-red-500 py-12">공지사항을 불러오지 못했습니다.</div>;
  }
  if (!notices || notices.length === 0) {
    return <div className="text-center text-neutral-400 py-12">공지사항이 없습니다.</div>;
  }
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold text-primary-600 mb-8">공지사항</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notices.map((n) => (
          <div key={n.id} className="glass-card p-6 shadow-card flex flex-col gap-2 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center gap-2 mb-1">
              {n.important && <span className="bg-accent-red text-white text-xs font-bold px-2 py-1 rounded">중요</span>}
              <span className="text-sm text-neutral-500">{n.category}</span>
              <span className="ml-auto text-xs text-neutral-400">
                {n.createdAt ? new Date(n.createdAt).toISOString().slice(0,10) : ''}
              </span>
            </div>
            <div className="text-lg font-semibold text-neutral-900 mb-1">{n.title}</div>
            <div className="text-base text-neutral-700" dangerouslySetInnerHTML={{ __html: n.content }} />
          </div>
        ))}
      </div>
    </section>
  );
}
