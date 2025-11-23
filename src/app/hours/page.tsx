'use client';

import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

export default function HoursPage() {
  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#181411] text-4xl font-black leading-tight tracking-[-0.033em]">진료시간 안내</p>
            <p className="text-[#897561] text-base font-normal leading-normal">비타민마취통증의학과의 진료 시간표를 확인하세요.</p>
          </div>
        </div>

        {/* Overall Clinic Hours */}
        <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-8 md:pt-12">병원 전체 진료시간</h2>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl border border-solid border-[#e6e0db] shadow-sm">
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2 text-[#897561]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium">평일</p>
              </div>
              <p className="text-[#181411] text-base font-bold leading-normal">09:00 - 18:00</p>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2 text-[#897561]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium">토요일</p>
              </div>
              <p className="text-[#181411] text-base font-bold leading-normal">09:00 - 13:00</p>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2 text-[#897561]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">점심시간</p>
              </div>
              <p className="text-[#181411] text-base font-bold leading-normal">13:00 - 14:00</p>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2 text-[#897561]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-sm font-medium">휴진</p>
              </div>
              <p className="text-[#181411] text-base font-bold leading-normal">일요일 / 공휴일</p>
            </div>
          </div>
        </div>

        {/* Doctor's Schedule */}
        <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-12">원장님 상세 진료 시간표</h2>
        <div className="p-4 flex flex-col lg:flex-row gap-8">
          {/* Schedule Table */}
          <div className="flex-grow overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead className="bg-[#f97316]/10">
                <tr>
                  <th className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">시간</th>
                  <th className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">월</th>
                  <th className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">화</th>
                  <th className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">수</th>
                  <th className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">목</th>
                  <th className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">금</th>
                  <th className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">토</th>
                </tr>
              </thead>
              <tbody className="text-[#897561] text-sm bg-white">
                <tr>
                  <td className="p-4 font-medium text-[#181411] border border-[#e6e0db]">오전</td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                  <td className="p-4 border border-[#e6e0db]">
                    <span className="bg-[#f97316]/20 text-[#f97316] font-semibold py-1 px-3 rounded-full text-xs">오전 휴진</span>
                  </td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-[#181411] border border-[#e6e0db]">점심</td>
                  <td className="p-4 border border-[#e6e0db]" colSpan={5}>점심시간</td>
                  <td className="p-4 border border-[#e6e0db] bg-gray-100">-</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-[#181411] border border-[#e6e0db]">오후</td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                  <td className="p-4 border border-[#e6e0db]">
                    <span className="bg-[#f97316]/20 text-[#f97316] font-semibold py-1 px-3 rounded-full text-xs">오후 휴진</span>
                  </td>
                  <td className="p-4 border border-[#e6e0db]">진료</td>
                  <td className="p-4 border border-[#e6e0db] bg-gray-100">휴진</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Doctor Profile */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white border border-solid border-[#e6e0db] rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#f97316] to-[#fb923c] flex items-center justify-center mb-4 ring-2 ring-[#f97316]/30">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#181411]">홍길동 원장</h3>
              <p className="text-sm text-[#897561] mt-1">마취통증의학과 전문의</p>
              <div className="border-t border-[#e6e0db] w-full my-4"></div>
              <p className="text-xs text-left text-[#897561]">
                - 척추 통증 클리닉<br/>
                - 관절 통증 클리닉<br/>
                - 도수 치료
              </p>
            </div>
          </div>
        </div>

        {/* Notice Box */}
        <div className="p-4 mt-8">
          <div className="bg-[#f97316]/10 border-l-4 border-[#f97316] p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-[#f97316] mb-1">참고사항</h4>
                <p className="text-sm text-[#181411]">
                  예약 없이 방문하셔도 진료가 가능하지만, 대기 시간이 길어질 수 있습니다. <br className="hidden sm:inline"/>
                  원활한 진료를 위해 방문 전 전화 예약을 권장합니다. 공휴일은 휴진입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
