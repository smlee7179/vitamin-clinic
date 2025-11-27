'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface ClinicHours {
  id: string;
  weekdayOpen: string;
  weekdayClose: string;
  saturdayOpen: string | null;
  saturdayClose: string | null;
  lunchStart: string | null;
  lunchEnd: string | null;
  closedDays: string;
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
  title: string;
  specialty: string;
  photoUrl: string | null;
  education: string;
  career: string;
  order: number;
  active: boolean;
}

const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_LABELS = ['월', '화', '수', '목', '금', '토'];

export default function HoursPage() {
  const [clinicHours, setClinicHours] = useState<ClinicHours | null>(null);
  const [doctorSchedules, setDoctorSchedules] = useState<DoctorSchedule[]>([]);
  const [chiefDoctor, setChiefDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all data in parallel
      const [hoursRes, schedulesRes, doctorsRes] = await Promise.all([
        fetch('/api/clinic-hours'),
        fetch('/api/doctor-schedule'),
        fetch('/api/doctors')
      ]);

      if (hoursRes.ok) {
        const hoursData = await hoursRes.json();
        // API returns array, take first item
        setClinicHours(Array.isArray(hoursData) ? hoursData[0] : hoursData);
      }

      if (schedulesRes.ok) {
        const schedulesData = await schedulesRes.json();
        setDoctorSchedules(schedulesData);
      }

      if (doctorsRes.ok) {
        const doctorsData = await doctorsRes.json();
        // Find first active doctor (chief doctor)
        const chief = doctorsData.find((d: Doctor) => d.active);
        setChiefDoctor(chief || null);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScheduleForDay = (dayOfWeek: string, period: 'morning' | 'afternoon'): React.ReactNode => {
    if (!chiefDoctor) return '진료';

    const schedule = doctorSchedules.find(s => s.dayOfWeek === dayOfWeek);
    if (!schedule) return '진료';

    const status = period === 'morning' ? schedule.morningStatus : schedule.afternoonStatus;

    if (status === 'closed') {
      return (
        <span className="bg-[#ee8c2b]/20 text-[#ee8c2b] font-semibold py-1 px-3 rounded-full text-xs">
          {period === 'morning' ? '오전 휴진' : '오후 휴진'}
        </span>
      );
    }

    if (status === 'note' && schedule.note) {
      return schedule.note;
    }

    return '진료';
  };

  // Parse specialty string to array
  const parseSpecialty = (specialty: string): string[] => {
    return specialty.split('\n').filter(line => line.trim());
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
            <p className="text-[#181411] text-4xl font-black leading-tight tracking-[-0.033em]">진료시간 안내</p>
            <p className="text-[#897561] text-base font-normal leading-normal">비타민마취통증의학과의 진료 시간표를 확인하세요.</p>
          </div>
        </div>

        {/* Overall Clinic Hours */}
        <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-8 md:pt-12">병원 전체 진료시간</h2>
        <div className="p-4">
          {clinicHours ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl border border-solid border-[#e6e0db] shadow-sm">
              <div className="flex flex-col gap-2 p-2">
                <div className="flex items-center gap-2 text-[#897561]">
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <p className="text-sm font-medium">평일</p>
                </div>
                <p className="text-[#181411] text-base font-bold leading-normal">
                  {clinicHours.weekdayOpen} - {clinicHours.weekdayClose}
                </p>
              </div>
              {clinicHours.saturdayOpen && clinicHours.saturdayClose && (
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex items-center gap-2 text-[#897561]">
                    <span className="material-symbols-outlined text-base">calendar_month</span>
                    <p className="text-sm font-medium">토요일</p>
                  </div>
                  <p className="text-[#181411] text-base font-bold leading-normal">
                    {clinicHours.saturdayOpen} - {clinicHours.saturdayClose}
                  </p>
                </div>
              )}
              {clinicHours.lunchStart && clinicHours.lunchEnd && (
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex items-center gap-2 text-[#897561]">
                    <span className="material-symbols-outlined text-base">restaurant</span>
                    <p className="text-sm font-medium">점심시간</p>
                  </div>
                  <p className="text-[#181411] text-base font-bold leading-normal">
                    {clinicHours.lunchStart} - {clinicHours.lunchEnd}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-2 p-2">
                <div className="flex items-center gap-2 text-[#897561]">
                  <span className="material-symbols-outlined text-base">door_open</span>
                  <p className="text-sm font-medium">휴진</p>
                </div>
                <p className="text-[#181411] text-base font-bold leading-normal">{clinicHours.closedDays}</p>
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

        {/* Doctor's Schedule */}
        {chiefDoctor && (
          <>
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-12">원장님 상세 진료 시간표</h2>
            <div className="p-4 flex flex-col lg:flex-row gap-8">
              {/* Schedule Table */}
              <div className="flex-grow overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead className="bg-[#ee8c2b]/10">
                    <tr>
                      <th className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">시간</th>
                      {DAY_LABELS.map((label) => (
                        <th key={label} className="p-4 font-medium text-sm text-[#181411] border border-[#e6e0db]">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[#897561] text-sm bg-white">
                    <tr>
                      <td className="p-4 font-medium text-[#181411] border border-[#e6e0db]">오전</td>
                      {DAYS_OF_WEEK.map((day) => (
                        <td key={`${day}-morning`} className="p-4 border border-[#e6e0db]">
                          {getScheduleForDay(day, 'morning')}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-[#181411] border border-[#e6e0db]">점심</td>
                      <td className="p-4 border border-[#e6e0db]" colSpan={5}>점심시간</td>
                      <td className="p-4 border border-[#e6e0db] bg-gray-100">-</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-[#181411] border border-[#e6e0db]">오후</td>
                      {DAYS_OF_WEEK.map((day) => (
                        <td
                          key={`${day}-afternoon`}
                          className={`p-4 border border-[#e6e0db] ${day === 'saturday' ? 'bg-gray-100' : ''}`}
                        >
                          {day === 'saturday' ? '휴진' : getScheduleForDay(day, 'afternoon')}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Doctor Profile */}
              <div className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-white border border-solid border-[#e6e0db] rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
                  {chiefDoctor.photoUrl ? (
                    <img
                      alt={`${chiefDoctor.name} 프로필 사진`}
                      className="w-28 h-28 rounded-full object-cover mb-4 ring-2 ring-[#ee8c2b]/30"
                      src={chiefDoctor.photoUrl}
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gray-200 mb-4 flex items-center justify-center ring-2 ring-[#ee8c2b]/30">
                      <span className="material-symbols-outlined text-4xl text-gray-400">person</span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-[#181411]">{chiefDoctor.name}</h3>
                  <p className="text-sm text-[#897561] mt-1">{chiefDoctor.title}</p>
                  <div className="border-t border-[#e6e0db] w-full my-4"></div>
                  <p className="text-xs text-left text-[#897561]">
                    {parseSpecialty(chiefDoctor.specialty).map((line, index) => (
                      <span key={index}>
                        - {line}<br/>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

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
