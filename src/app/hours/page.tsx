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
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <p className="text-sm font-medium">평일</p>
              </div>
              <p className="text-[#181411] text-base font-bold leading-normal">09:00 - 18:00</p>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2 text-[#897561]">
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <p className="text-sm font-medium">토요일</p>
              </div>
              <p className="text-[#181411] text-base font-bold leading-normal">09:00 - 13:00</p>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2 text-[#897561]">
                <span className="material-symbols-outlined text-base">restaurant</span>
                <p className="text-sm font-medium">점심시간</p>
              </div>
              <p className="text-[#181411] text-base font-bold leading-normal">13:00 - 14:00</p>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2 text-[#897561]">
                <span className="material-symbols-outlined text-base">door_open</span>
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
              <thead className="bg-[#ee8c2b]/10">
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
                    <span className="bg-[#ee8c2b]/20 text-[#ee8c2b] font-semibold py-1 px-3 rounded-full text-xs">오전 휴진</span>
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
                    <span className="bg-[#ee8c2b]/20 text-[#ee8c2b] font-semibold py-1 px-3 rounded-full text-xs">오후 휴진</span>
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
              <img
                alt="홍길동 원장 프로필 사진"
                className="w-28 h-28 rounded-full object-cover mb-4 ring-2 ring-[#ee8c2b]/30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV4L8pQOkoHNFHtWF6evEV1l8IHAEl2OcUj-CKelvJ3iSACx81aD1rOAx-6vPAz0a4He3FY526lk_tldHTxyvGTPQ1DuzllI0PQLyOAKrBwc78EDESO6bQvyeFjZojBJLzMRf1sEK2ABrTTHr5Ve4qaDPcm5psVgOYBifYmQtnaM2sJldqhw8p4fCfrLZNOeD-5YdC7rgYrDnfN0B8LwKfJEvXyvvttrscrMxpdRemo1vBGmG_tM3drHJX4RqUUcklv6z5Sg0dPht5"
              />
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
          <div className="bg-[#ee8c2b]/10 border-l-4 border-[#ee8c2b] p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <span className="material-symbols-outlined text-[#ee8c2b] text-2xl">info</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-[#ee8c2b] mb-1">참고사항</h4>
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
