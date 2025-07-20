export default function InfoSection() {
  return (
    <section className="container pb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="glass-card p-8 flex flex-col gap-4 shadow-card">
        <h3 className="text-xl font-bold text-primary-600 mb-2">주소 및 연락처</h3>
        <p className="text-base text-neutral-800">부산광역시 해운대구 해운대로 123</p>
        <p className="text-base text-neutral-800">전화: <a href="tel:051-123-4567" className="text-primary-500 font-bold">051-123-4567</a></p>
      </div>
      <div className="glass-card p-8 flex flex-col gap-4 shadow-card">
        <h3 className="text-xl font-bold text-primary-600 mb-2">교통/주차/접근성</h3>
        <ul className="list-disc pl-5 text-base text-neutral-700">
          <li>지하철 2호선 해운대역 3번 출구 도보 5분</li>
          <li>버스 100, 200, 307번 이용</li>
          <li>주차장 완비</li>
          <li>건물 입구 및 진료실 휠체어 접근 가능</li>
        </ul>
      </div>
    </section>
  );
}
