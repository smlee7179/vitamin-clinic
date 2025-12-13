'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

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
  order: number;
  active: boolean;
  schedules?: DoctorSchedule[];
}

const dayOfWeekMap: { [key: string]: string } = {
  'monday': '월',
  'tuesday': '화',
  'wednesday': '수',
  'thursday': '목',
  'friday': '금',
  'saturday': '토',
  'sunday': '일',
};

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default function HoursPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/doctors');
      if (response.ok) {
        const data = await response.json();

        // Fetch schedules for each doctor
        const doctorsWithSchedules = await Promise.all(
          data.map(async (doctor: Doctor) => {
            try {
              const scheduleResponse = await fetch(`/api/doctor-schedule?doctorId=${doctor.id}`);
              if (scheduleResponse.ok) {
                const schedules = await scheduleResponse.json();
                return { ...doctor, schedules };
              }
            } catch (err) {
              console.error(`Failed to fetch schedule for ${doctor.name}:`, err);
            }
            return doctor;
          })
        );

        setDoctors(doctorsWithSchedules);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSchedule = (schedules: DoctorSchedule[] = []) => {
    if (schedules.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500 text-sm">
          진료시간 정보 없음
        </div>
      );
    }

    // Sort schedules by day order (Mon-Sat only)
    const sortedSchedules = [...schedules]
      .filter(s => s.dayOfWeek !== 'sunday')
      .sort((a, b) => {
        return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
      });

    return (
      <div className="grid grid-cols-6 gap-2">
        {sortedSchedules.map((schedule) => {
          const day = dayOfWeekMap[schedule.dayOfWeek] || schedule.dayOfWeek;
          const isClosed = schedule.morningStatus === 'closed' && schedule.afternoonStatus === 'closed';
          const isAvailable = schedule.morningStatus === 'available' || schedule.afternoonStatus === 'available';

          return (
            <div
              key={schedule.id}
              className={`
                text-center py-3 px-2 rounded-lg font-semibold text-sm
                ${isAvailable
                  ? 'bg-green-50 text-green-700 border-2 border-green-200'
                  : 'bg-gray-50 text-gray-400 border-2 border-gray-200'}
              `}
            >
              <div className="mb-1">{day}</div>
              <div className="text-xs">
                {isAvailable ? '진료' : '휴진'}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1140px] mx-auto">
          {/* Page Heading */}
          <div className="text-center mb-12">
            <h1 className="text-[#343A40] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-[-0.015em] mb-4">
              진료시간 안내
            </h1>
            <p className="text-[#8a7960] text-base md:text-lg">
              의료진별 진료 시간을 확인하세요.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
              <p className="mt-4 text-gray-500">진료시간 정보를 불러오는 중...</p>
            </div>
          ) : (
            <>
              {/* Standard Hours Info */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f97316]">schedule</span>
                  병원 진료시간
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">평일 (월~금)</span>
                      <span className="text-gray-900">09:00 - 18:00</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">토요일</span>
                      <span className="text-gray-900">09:00 - 13:00</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="font-medium text-gray-700">일요일 / 공휴일</span>
                      <span className="text-red-500 font-medium">휴진</span>
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#f97316] text-xl">info</span>
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-2">점심시간 안내</p>
                      <p>평일: 13:00 - 14:00</p>
                      <p className="mt-2 text-xs text-gray-600">
                        점심시간에는 진료가 불가합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Schedules */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">원장님별 진료시간</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                        <p className="text-orange-100 text-sm">{doctor.title}</p>
                        <p className="text-orange-100 text-xs mt-1">{doctor.specialty}</p>
                      </div>
                      <div className="p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">진료 요일</h4>
                        {renderSchedule(doctor.schedules)}
                      </div>
                    </div>
                  ))}
                </div>

                {doctors.length === 0 && (
                  <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-12 text-center">
                    <p className="text-gray-500">등록된 의료진이 없습니다.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
