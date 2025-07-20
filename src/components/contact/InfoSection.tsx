export default function InfoSection() {
  return (
    <section className="container pb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="glass-card p-8 flex flex-col gap-4 shadow-card">
        <h3 className="text-xl font-bold text-primary-600 mb-2">주소 및 연락처</h3>
        <p className="text-base text-neutral-800">부산 동구 중앙대로 375</p>
        <p className="text-base text-neutral-800">전화: <a href="tel:051-469-7581" className="text-primary-500 font-bold">051-469-7581</a></p>
      </div>
      <div className="glass-card p-8 flex flex-col gap-4 shadow-card">
        <h3 className="text-xl font-bold text-primary-600 mb-2">교통/주차/접근성</h3>
        <ul className="list-disc pl-5 text-base text-neutral-700">
          <li>지하철 1호선 부산역 8번 출구 도보 3분</li>
          <li>버스 27, 41, 87, 103, 134번 이용 (중앙대로 하차)</li>
          <li>건물 내 주차장 완비</li>
          <li>건물 입구 및 진료실 휠체어 접근 가능</li>
        </ul>
      </div>
    </section>
  );
}
