const notices = [
  { title: '8월 15일(광복절) 휴진 안내', important: true, category: '휴진', date: '2024-08-15' },
  { title: '노인 건강보험 적용 안내', important: false, category: '건강보험', date: '2024-07-01' },
  { title: '신규 진료 장비 도입', important: false, category: '병원 소식', date: '2024-06-20' },
];

export default function NoticeSection() {
  return (
    <section className="container py-4 sm:py-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-primary-600">공지사항</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 md:gap-8">
        {notices.map((n) => (
          <div key={n.title} className="glass-card p-3 sm:p-5 md:p-8 shadow-card flex flex-col gap-1 sm:gap-2 w-full">
            <div className="flex items-center gap-1 sm:gap-2">
              {n.important && <span className="bg-accent-red text-white text-xs font-bold px-2 py-1 rounded">중요</span>}
              <span className="text-xs md:text-sm text-neutral-500">{n.category}</span>
              <span className="ml-auto text-xs text-neutral-400">{n.date}</span>
            </div>
            <div className="text-sm sm:text-base md:text-lg font-semibold text-neutral-900">{n.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
