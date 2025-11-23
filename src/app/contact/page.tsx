'use client';

import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <NewHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">오시는 길</h1>
            <p className="text-lg md:text-xl opacity-90">
              부산 해운대구에 위치한 비타민마취통증의학과
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">전화번호</h3>
                  <a href="tel:051-XXX-XXXX" className="text-[#f97316] text-lg font-semibold hover:underline">
                    051-XXX-XXXX
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🕐</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">진료시간</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>평일: 09:00 - 18:00</p>
                    <p>토요일: 09:00 - 13:00</p>
                    <p className="text-sm text-red-500">일요일 및 공휴일 휴진</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">주소</h3>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <p className="text-gray-900 font-medium mb-2">
                  부산광역시 해운대구
                </p>
                <p className="text-gray-600 text-sm">
                  (상세 주소는 전화 문의 바랍니다)
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-4 block">🗺️</span>
                <p className="text-gray-600">
                  지도는 준비 중입니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transportation */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            교통편 안내
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-4xl mb-3">🚇</div>
              <p className="text-sm text-gray-600">
                지하철 2호선<br />해운대역 인근
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-4xl mb-3">🚌</div>
              <p className="text-sm text-gray-600">
                버스 정류장<br />도보 5분 거리
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-4xl mb-3">🚗</div>
              <p className="text-sm text-gray-600">
                주차 가능<br />(주차장 완비)
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-4xl mb-3">♿</div>
              <p className="text-sm text-gray-600">
                휠체어<br />접근 가능
              </p>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
