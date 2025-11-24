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

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
          <div className="flex flex-col gap-10 mt-10">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#181511] text-4xl font-black leading-tight tracking-[-0.033em]">
                  오시는 길 & 진료안내
                </p>
                <p className="text-[#8a7960] text-base font-normal leading-normal">
                  비타민마취통증의학과에 오시는 길을 안내해드립니다.
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="flex px-4 py-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover rounded-xl object-cover border border-[#EAE8E4]"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBecyHsV_8xCcumqkiufXw6WklDnH49z_T044O5T5ZiGxp_n9kWeGr3vBQwdDZWEbi5xaXVekk7Qnmud8dRg7zzAtBga05T4A1aKRzvnMQUdvnTq8ynD5nizGzDvZEiZ0Cbhlh5vCK2Unl4Ms4FO1ekMMVpPZcqrXFHd3A1n9SLVJzTEXVju7ucX78UzwnQgvrY-GAAYudiCWdKX5YmDX-4XOIMUVyXh1cJJxkFGrV-HjgrSiIY1FKfosoRDP_BLA64tz0FFS16mryi")'
                }}
              ></div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h2 className="text-[#181511] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
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
                          서울특별시 강남구 테헤란로 123 비타민타워 4층
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <button
                        onClick={() => handleCopy('서울특별시 강남구 테헤란로 123 비타민타워 4층', 'address')}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#EAE8E4] text-[#181511] text-sm font-medium leading-normal w-fit"
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
                          02-1234-5678
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <a
                        href="tel:02-1234-5678"
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f2930d] text-white text-sm font-medium leading-normal w-fit"
                      >
                        <span className="truncate">전화 걸기</span>
                      </a>
                    </div>
                  </div>

                  {/* Fax */}
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
                          02-1234-5679
                        </p>
                      </div>
                    </div>
                  </div>
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
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="font-semibold text-[#181511]">지하철</p>
                    <p className="text-[#8a7960]">2호선 강남역 11번 출구에서 도보 5분</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="font-semibold text-[#181511]">버스</p>
                    <p className="text-[#8a7960]">
                      간선버스 140, 402, 420번 / 지선버스 3412, 4412번 '강남역' 정류장 하차
                    </p>
                  </div>
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
