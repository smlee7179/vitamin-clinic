'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface HospitalInfo {
  id: string;
  hospitalName: string;
  address: string;
  phone: string;
  fax: string | null;
  email: string | null;
  mapImageUrl: string | null;
  kakaoMapUrl: string | null;
  naverMapUrl: string | null;
  googleMapUrl: string | null;
  subwayInfo: string | null;
  busInfo: string | null;
  parkingInfo: string | null;
}

export default function ContactPage() {
  const [copiedText, setCopiedText] = useState('');
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitalInfo();
  }, []);

  const fetchHospitalInfo = async () => {
    try {
      const response = await fetch('/api/contact-info');
      if (response.ok) {
        const data = await response.json();
        setHospitalInfo(data);
      }
    } catch (error) {
      console.error('Failed to fetch hospital info:', error);
    } finally {
      setLoading(false);
    }
  };

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

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
          <div className="flex flex-col gap-10 mt-10">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#181511] text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                  오시는 길 & 진료안내
                </p>
                <p className="text-[#8a7960] text-base md:text-lg font-normal leading-normal">
                  비타민마취통증의학과에 오시는 길을 안내해드립니다.
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="flex px-4 py-3">
              <div className="w-full space-y-4">
                {/* Map Preview - Clickable */}
                {hospitalInfo?.mapImageUrl ? (
                  <a
                    href={hospitalInfo.naverMapUrl || '#'}
                    target={hospitalInfo.naverMapUrl ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`block w-full group relative ${hospitalInfo.naverMapUrl ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover rounded-xl border border-[#EAE8E4] transition-opacity group-hover:opacity-90"
                      style={{
                        backgroundImage: `url("${hospitalInfo.mapImageUrl}")`
                      }}
                    >
                      {hospitalInfo.naverMapUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-xl">
                          <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-lg">
                            클릭하여 네이버 지도에서 보기
                          </span>
                        </div>
                      )}
                    </div>
                  </a>
                ) : (
                  <div className="w-full bg-gray-200 aspect-[2/1] rounded-xl border border-[#EAE8E4] flex flex-col items-center justify-center gap-2 text-gray-500">
                    <span className="material-symbols-outlined text-6xl">add_location</span>
                    <p className="text-sm">지도 이미지를 관리자 페이지에서 업로드해주세요</p>
                  </div>
                )}

                {/* Open in Naver Map Button */}
                {hospitalInfo?.naverMapUrl && (
                  <div className="flex justify-center">
                    <a
                      href={hospitalInfo.naverMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#03C75A] text-white font-semibold rounded-lg hover:bg-[#02b350] transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined">map</span>
                      <span>네이버 지도에서 열기</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h2 className="text-[#181511] text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  상세 정보
                </h2>
                <div className="flex flex-col divide-y divide-[#EAE8E4] border-t border-b border-[#EAE8E4]">
                  {/* Address */}
                  <div className="flex items-center gap-4 bg-transparent px-4 min-h-[72px] py-2 justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-[#181511] flex items-center justify-center rounded-lg bg-[#EAE8E4] shrink-0 size-12">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[#181511] text-base font-medium leading-normal line-clamp-1">
                          주소
                        </p>
                        <p className="text-[#8a7960] text-sm font-normal leading-normal line-clamp-2">
                          {hospitalInfo?.address || '주소를 관리자 페이지에서 입력해주세요'}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <button
                        onClick={() => handleCopy(hospitalInfo?.address || '', 'address')}
                        disabled={!hospitalInfo?.address}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#EAE8E4] text-[#181511] text-sm font-medium leading-normal w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="truncate">{copiedText === 'address' ? '복사됨!' : '주소 복사'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 bg-transparent px-4 min-h-[72px] py-2 justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-[#181511] flex items-center justify-center rounded-lg bg-[#EAE8E4] shrink-0 size-12">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[#181511] text-base font-medium leading-normal line-clamp-1">
                          연락처
                        </p>
                        <p className="text-[#8a7960] text-sm font-normal leading-normal line-clamp-2">
                          {hospitalInfo?.phone || '전화번호를 관리자 페이지에서 입력해주세요'}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <a
                        href={`tel:${hospitalInfo?.phone || ''}`}
                        className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f2930d] text-white text-sm font-medium leading-normal w-fit ${!hospitalInfo?.phone ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <span className="truncate">전화 걸기</span>
                      </a>
                    </div>
                  </div>

                  {/* Fax */}
                  {hospitalInfo?.fax && (
                    <div className="flex items-center gap-4 bg-transparent px-4 min-h-[72px] py-2 justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-[#181511] flex items-center justify-center rounded-lg bg-[#EAE8E4] shrink-0 size-12">
                          <span className="material-symbols-outlined">print</span>
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[#181511] text-base font-medium leading-normal line-clamp-1">
                            팩스
                          </p>
                          <p className="text-[#8a7960] text-sm font-normal leading-normal line-clamp-2">
                            {hospitalInfo.fax}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Transportation and Hours */}
              <div className="flex flex-col lg:flex-row gap-6 px-4">
                {/* Transportation */}
                <div className="flex-1 flex flex-col gap-4 p-6 rounded-xl bg-white border border-[#EAE8E4]">
                  <div className="flex items-center gap-3">
                    <div className="text-[#f2930d] flex items-center justify-center shrink-0 size-8">
                      <span className="material-symbols-outlined text-3xl">directions_transit</span>
                    </div>
                    <h3 className="text-[#181511] text-lg font-bold">대중교통 안내</h3>
                  </div>
                  {hospitalInfo?.subwayInfo && (
                    <div className="flex flex-col gap-2 text-sm">
                      <p className="font-semibold text-[#181511]">지하철</p>
                      <p className="text-[#8a7960] whitespace-pre-wrap">{hospitalInfo.subwayInfo}</p>
                    </div>
                  )}
                  {hospitalInfo?.busInfo && (
                    <div className="flex flex-col gap-2 text-sm">
                      <p className="font-semibold text-[#181511]">버스</p>
                      <p className="text-[#8a7960] whitespace-pre-wrap">{hospitalInfo.busInfo}</p>
                    </div>
                  )}
                  {hospitalInfo?.parkingInfo && (
                    <div className="flex flex-col gap-2 text-sm">
                      <p className="font-semibold text-[#181511]">주차</p>
                      <p className="text-[#8a7960] whitespace-pre-wrap">{hospitalInfo.parkingInfo}</p>
                    </div>
                  )}
                  {!hospitalInfo?.subwayInfo && !hospitalInfo?.busInfo && !hospitalInfo?.parkingInfo && (
                    <p className="text-sm text-[#8a7960]">대중교통 정보를 관리자 페이지에서 입력해주세요</p>
                  )}
                </div>

                {/* Hours */}
                <div className="flex-1 flex flex-col gap-4 p-6 rounded-xl bg-white border border-[#EAE8E4]">
                  <div className="flex items-center gap-3">
                    <div className="text-[#f2930d] flex items-center justify-center shrink-0 size-8">
                      <span className="material-symbols-outlined text-3xl">schedule</span>
                    </div>
                    <h3 className="text-[#181511] text-lg font-bold">진료 시간</h3>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-[#8a7960]">
                    <p>
                      <span className="font-semibold text-[#181511] w-16 inline-block">평일</span> 오전 9:00 - 오후 6:00
                    </p>
                    <p>
                      <span className="font-semibold text-[#181511] w-16 inline-block">토요일</span> 오전 9:00 - 오후 1:00
                    </p>
                    <p>
                      <span className="font-semibold text-[#181511] w-16 inline-block">점심시간</span> 오후 1:00 - 오후 2:00
                    </p>
                    <p>
                      <span className="font-semibold text-[#181511] w-16 inline-block">휴진</span> 일요일, 공휴일
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
