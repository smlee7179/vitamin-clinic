export default function MapSection() {
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold text-primary-600 mb-8">오시는 길</h2>
      <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
        {/* 실제 배포 시 아래 iframe src를 병원 위치로 교체하세요 */}
        <iframe
          title="비타민 의원 위치"
          src="https://www.openstreetmap.org/export/embed.html?bbox=129.163%2C35.163%2C129.165%2C35.165&layer=mapnik"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
