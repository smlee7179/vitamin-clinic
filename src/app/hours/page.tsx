'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

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
  note?: string;
}

interface DoctorSchedule {
  id: string;
  doctorId: string;
  dayOfWeek: string;
  morningStatus: string;
  afternoonStatus: string;
  note: string | null;
}

interface Doctor {
  id: string;
  name: string;
  active: boolean;
}

interface PageHeading {
  id: string;
  page: string;
  title: string;
  subtitle: string | null;
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
  const [doctorSchedules, setDoctorSchedules] = useState<DoctorSchedule[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pageHeading, setPageHeading] = useState<PageHeading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [schedulesRes, headingRes, doctorSchedulesRes, doctorsRes] = await Promise.all([
        fetch('/api/unified-schedule'),
        fetch('/api/page-heading?page=hours'),
        fetch('/api/doctor-schedule'),
        fetch('/api/doctors')
      ]);

      if (schedulesRes.ok) {
        const schedulesData = await schedulesRes.json();
        setSchedules(schedulesData);
      }

      if (headingRes.ok) {
        const headingData = await headingRes.json();
        setPageHeading(headingData);
      }

      if (doctorSchedulesRes.ok) {
        const doctorSchedulesData = await doctorSchedulesRes.json();
        setDoctorSchedules(doctorSchedulesData);
      }

      if (doctorsRes.ok) {
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData.filter((d: Doctor) => d.active));
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

  const getDoctorStatusForDay = (doctorId: string, dayOfWeek: string): 'available' | 'unavailable' => {
    const schedule = doctorSchedules.find(ds => ds.doctorId === doctorId && ds.dayOfWeek === dayOfWeek);
    if (!schedule) return 'unavailable';
    // If either morning or afternoon is available, show as available
    if (schedule.morningStatus === 'available' || schedule.afternoonStatus === 'available') {
      return 'available';
    }
    return 'unavailable';
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
        {pageHeading ? (
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#181411] text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                {pageHeading.title}
              </p>
              {pageHeading.subtitle && (
                <p className="text-[#897561] text-base md:text-lg font-normal leading-normal">
                  {pageHeading.subtitle}
                </p>
              )}
            </div>
          </div>
        ) : (
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
        )}

        {/* Hospital Hours Table */}
        <div className="p-4 mt-8">
          <h2 className="text-[#181411] text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-[-0.015em] pb-6">
            병원 진료 시간
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
                              <div className="font-medium text-gray-900">
                                {schedule.morningOpen} - {schedule.morningClose}
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
                              <div className="font-medium text-gray-900">
                                {schedule.afternoonOpen} - {schedule.afternoonClose}
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
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
                                <div className="text-gray-900">
                                  {schedule.morningOpen} - {schedule.morningClose}
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
                                <div className="text-gray-900">
                                  {schedule.afternoonOpen} - {schedule.afternoonClose}
                                </div>
                              )}
                            </div>
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

        {/* Doctor Schedule Table */}
        <div className="p-4 mt-12">
          <h2 className="text-[#181411] text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-[-0.015em] pb-6">
            원장님 시간표
          </h2>

          {doctors.length > 0 ? (
            <div className="bg-white rounded-xl border border-solid border-[#e6e0db] shadow-sm overflow-hidden">
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead className="bg-[#ee8c2b]/10">
                    <tr>
                      <th className="p-4 font-semibold text-sm text-[#181411] border border-[#e6e0db] w-32">
                        원장님
                      </th>
                      {DAYS_ORDER.map((day) => (
                        <th key={day} className="p-4 font-semibold text-sm text-[#181411] border border-[#e6e0db]">
                          {DAY_LABELS[day]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[#897561] text-sm">
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="p-4 font-medium text-[#181411] border border-[#e6e0db] bg-gray-50">
                          {doctor.name}
                        </td>
                        {DAYS_ORDER.map((day) => {
                          const status = getDoctorStatusForDay(doctor.id, day);
                          return (
                            <td
                              key={`${doctor.id}-${day}`}
                              className={`p-3 border border-[#e6e0db] ${status === 'unavailable' ? 'bg-gray-100' : ''}`}
                            >
                              {status === 'available' ? (
                                <span className="text-green-600 font-semibold">진료</span>
                              ) : (
                                <span className="text-red-500 font-semibold">휴진</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                <div className="divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4">
                      <h3 className="font-bold text-lg text-[#181411] mb-3">
                        {doctor.name}
                      </h3>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        {DAYS_ORDER.map((day) => {
                          const status = getDoctorStatusForDay(doctor.id, day);
                          return (
                            <div key={`${doctor.id}-${day}`} className="text-center p-2 rounded border border-gray-200">
                              <div className="font-medium text-gray-700 mb-1">{DAY_LABELS[day]}</div>
                              {status === 'available' ? (
                                <span className="text-green-600 font-semibold text-xs">진료</span>
                              ) : (
                                <span className="text-red-500 font-semibold text-xs">휴진</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">person</span>
              <p className="text-gray-500">의료진 정보가 없습니다.</p>
              <p className="text-sm text-gray-400 mt-2">관리자 페이지에서 의료진을 등록해주세요.</p>
            </div>
          )}
        </div>

      </main>

      <NewFooter />
    </div>
  );
}
