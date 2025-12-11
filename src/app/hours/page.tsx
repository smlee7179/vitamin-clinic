'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface DoctorScheduleInfo {
  doctorId: string;
  doctorName: string;
  morningAvailable: boolean;
  afternoonAvailable: boolean;
  note?: string;
}

interface UnifiedSchedule {
  id: string;
  dayOfWeek: string;
  morningOpen?: string;
  morningClose?: string;
  afternoonOpen?: string;
  afternoonClose?: string;
  lunchStart?: string;
  lunchEnd?: string;
  isClosed: boolean;
  doctors: DoctorScheduleInfo[];
  note?: string;
}

interface PageNotice {
  id: string;
  page: string;
  content: string;
  type: string;
  active: boolean;
}

const DAY_LABELS: { [key: string]: string } = {
  monday: '월',
  tuesday: '화',
  wednesday: '수',
  thursday: '목',
  friday: '금',
  saturday: '토'
};

const DAYS_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default function HoursPage() {
  const [schedules, setSchedules] = useState<UnifiedSchedule[]>([]);
  const [pageNotice, setPageNotice] = useState<PageNotice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [schedulesRes, noticeRes] = await Promise.all([
        fetch('/api/unified-schedule'),
        fetch('/api/page-notice?page=hours')
      ]);

      if (schedulesRes.ok) {
        const schedulesData = await schedulesRes.json();
        setSchedules(schedulesData);
      }

      if (noticeRes.ok) {
        const noticeData = await noticeRes.json();
        if (noticeData && noticeData.active) {
          setPageNotice(noticeData);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScheduleForDay = (dayOfWeek: string): UnifiedSchedule | undefined => {
    return schedules.find(s => s.dayOfWeek === dayOfWeek);
  };

  if (loading) {
    return (
      <div className="bg-[#f8f7f5] min-h-screen">
        <NewHeader />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <NewFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#181411] text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
              진료시간 안내
            </p>
            <p className="text-[#897561] text-base md:text-lg font-normal leading-normal">
              비타민마취통증의학과의 진료 시간표를 확인하세요.
            </p>
          </div>
        </div>

        {/* Unified Schedule Table */}
        <div className="p-4 mt-8">
          <h2 className="text-[#181411] text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-[-0.015em] pb-6">
            진료 시간표
          </h2>

          {schedules.length > 0 ? (
            <div className="bg-white rounded-xl border border-solid border-[#e6e0db] shadow-sm overflow-hidden">
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead className="bg-[#ee8c2b]/10">
                    <tr>
                      <th className="p-4 font-semibold text-sm text-[#181411] border border-[#e6e0db] w-24">
                        시간
                      </th>
                      {DAYS_ORDER.map((day) => (
                        <th key={day} className="p-4 font-semibold text-sm text-[#181411] border border-[#e6e0db]">
                          {DAY_LABELS[day]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[#897561] text-sm">
                    {/* Morning Row */}
                    <tr>
                      <td className="p-4 font-medium text-[#181411] border border-[#e6e0db] bg-gray-50">
                        오전
                      </td>
                      {DAYS_ORDER.map((day) => {
                        const schedule = getScheduleForDay(day);
                        return (
                          <td key={`${day}-morning`} className="p-3 border border-[#e6e0db]">
                            {schedule?.isClosed ? (
                              <span className="text-red-500 font-semibold">휴진</span>
                            ) : schedule?.morningOpen && schedule?.morningClose ? (
                              <div>
                                <div className="font-medium text-gray-900 mb-1">
                                  {schedule.morningOpen} - {schedule.morningClose}
                                </div>
                                {schedule.doctors && schedule.doctors.length > 0 && (
                                  <div className="text-xs space-y-1">
                                    {schedule.doctors
                                      .filter(d => d.morningAvailable)
                                      .map(doctor => (
                                        <div key={`${day}-morning-${doctor.doctorId}`} className="text-orange-600">
                                          {doctor.doctorName}
                                        </div>
                                      ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Lunch Row */}
                    <tr>
                      <td className="p-4 font-medium text-[#181411] border border-[#e6e0db] bg-gray-50">
                        점심
                      </td>
                      {DAYS_ORDER.map((day) => {
                        const schedule = getScheduleForDay(day);
                        return (
                          <td
                            key={`${day}-lunch`}
                            className={`p-3 border border-[#e6e0db] ${schedule?.isClosed ? 'bg-gray-100' : ''}`}
                          >
                            {schedule?.isClosed ? (
                              <span className="text-gray-400">-</span>
                            ) : schedule?.lunchStart && schedule?.lunchEnd ? (
                              <div className="text-gray-600">
                                {schedule.lunchStart} - {schedule.lunchEnd}
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Afternoon Row */}
                    <tr>
                      <td className="p-4 font-medium text-[#181411] border border-[#e6e0db] bg-gray-50">
                        오후
                      </td>
                      {DAYS_ORDER.map((day) => {
                        const schedule = getScheduleForDay(day);
                        return (
                          <td
                            key={`${day}-afternoon`}
                            className={`p-3 border border-[#e6e0db] ${schedule?.isClosed || day === 'saturday' ? 'bg-gray-100' : ''}`}
                          >
                            {schedule?.isClosed || day === 'saturday' ? (
                              <span className="text-red-500 font-semibold">휴진</span>
                            ) : schedule?.afternoonOpen && schedule?.afternoonClose ? (
                              <div>
                                <div className="font-medium text-gray-900 mb-1">
                                  {schedule.afternoonOpen} - {schedule.afternoonClose}
                                </div>
                                {schedule.doctors && schedule.doctors.length > 0 && (
                                  <div className="text-xs space-y-1">
                                    {schedule.doctors
                                      .filter(d => d.afternoonAvailable)
                                      .map(doctor => (
                                        <div key={`${day}-afternoon-${doctor.doctorId}`} className="text-orange-600">
                                          {doctor.doctorName}
                                        </div>
                                      ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                            {schedule?.note && (
                              <div className="text-xs text-gray-500 mt-1">{schedule.note}</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                <div className="divide-y divide-gray-200">
                  {DAYS_ORDER.map((day) => {
                    const schedule = getScheduleForDay(day);
                    return (
                      <div key={day} className="p-4">
                        <h3 className="font-bold text-lg text-[#181411] mb-3">
                          {DAY_LABELS[day]}요일
                        </h3>

                        {schedule?.isClosed ? (
                          <div className="text-red-500 font-semibold">휴진</div>
                        ) : (
                          <div className="space-y-3 text-sm">
                            {/* Morning */}
                            <div>
                              <div className="font-medium text-gray-700 mb-1">오전</div>
                              {schedule?.morningOpen && schedule?.morningClose ? (
                                <div>
                                  <div className="text-gray-900">
                                    {schedule.morningOpen} - {schedule.morningClose}
                                  </div>
                                  {schedule.doctors && schedule.doctors.some(d => d.morningAvailable) && (
                                    <div className="text-xs text-orange-600 mt-1">
                                      {schedule.doctors
                                        .filter(d => d.morningAvailable)
                                        .map(d => d.doctorName)
                                        .join(', ')}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-400">-</div>
                              )}
                            </div>

                            {/* Lunch */}
                            <div>
                              <div className="font-medium text-gray-700 mb-1">점심</div>
                              {schedule?.lunchStart && schedule?.lunchEnd ? (
                                <div className="text-gray-600">
                                  {schedule.lunchStart} - {schedule.lunchEnd}
                                </div>
                              ) : (
                                <div className="text-gray-400">-</div>
                              )}
                            </div>

                            {/* Afternoon */}
                            <div>
                              <div className="font-medium text-gray-700 mb-1">오후</div>
                              {day === 'saturday' || !schedule?.afternoonOpen || !schedule?.afternoonClose ? (
                                <div className="text-red-500 font-semibold">휴진</div>
                              ) : (
                                <div>
                                  <div className="text-gray-900">
                                    {schedule.afternoonOpen} - {schedule.afternoonClose}
                                  </div>
                                  {schedule.doctors && schedule.doctors.some(d => d.afternoonAvailable) && (
                                    <div className="text-xs text-orange-600 mt-1">
                                      {schedule.doctors
                                        .filter(d => d.afternoonAvailable)
                                        .map(d => d.doctorName)
                                        .join(', ')}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {schedule?.note && (
                              <div className="text-xs text-gray-500 italic border-t pt-2">
                                {schedule.note}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">schedule</span>
              <p className="text-gray-500">진료시간 정보가 없습니다.</p>
              <p className="text-sm text-gray-400 mt-2">관리자 페이지에서 진료시간을 설정해주세요.</p>
            </div>
          )}
        </div>

        {/* Notice Box */}
        {pageNotice ? (
          <div className="p-4 mt-8">
            <div className="bg-[#ee8c2b]/10 border-l-4 border-[#ee8c2b] p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-[#ee8c2b] text-2xl">info</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-[#ee8c2b] mb-1">참고사항</h4>
                  <p className="text-sm text-[#181411] whitespace-pre-wrap">{pageNotice.content}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 mt-8">
            <div className="bg-[#ee8c2b]/10 border-l-4 border-[#ee8c2b] p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-[#ee8c2b] text-2xl">info</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-[#ee8c2b] mb-1">참고사항</h4>
                  <p className="text-sm text-[#181411]">
                    예약 없이 방문하셔도 진료가 가능하지만, 대기 시간이 길어질 수 있습니다.{' '}
                    <br className="hidden sm:inline" />
                    원활한 진료를 위해 방문 전 전화 예약을 권장합니다. 공휴일은 휴진입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <NewFooter />
    </div>
  );
}
