'use client';

import { useState } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

export default function ContactPage() {
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
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
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">전화번호</h3>
                  <p className="text-[#f97316] text-lg font-semibold mb-3">
                    051-XXX-XXXX
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="tel:051-XXX-XXXX"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#f97316] text-white rounded-lg text-sm font-medium hover:bg-[#f97316]/90 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      전화 걸기
                    </a>
                    <button
                      onClick={() => handleCopy('051-XXX-XXXX', 'phone')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedText === 'phone' ? '복사됨!' : '복사'}
                    </button>
                  </div>
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
              <div className="flex-1">
                <p className="text-gray-900 font-medium mb-2">
                  부산광역시 해운대구
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  (상세 주소는 전화 문의 바랍니다)
                </p>
                <button
                  onClick={() => handleCopy('부산광역시 해운대구', 'address')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copiedText === 'address' ? '복사됨!' : '주소 복사'}
                </button>
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
