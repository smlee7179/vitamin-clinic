export default function MapSection() {
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold text-primary-600 mb-8">오시는 길</h2>
      <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
        {/* 실제 배포 시 아래 iframe src를 병원 위치로 교체하세요 */}
        <iframe
          title="비타민마취통증의학과의원 위치"
          src="https://www.openstreetmap.org/export/embed.html?bbox=129.036%2C35.115%2C129.040%2C35.119&layer=mapnik"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="text-neutral-600 text-sm">부산 동구 중앙대로 375 (1호선 부산역 8번 출구 도보 3분, 버스 27/41/87/103/134번, 건물 내 주차장 완비)</div>
    </section>
  );
}
