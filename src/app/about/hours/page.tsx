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

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[960px] mx-auto">
          {/* Page Heading */}
          <h1 className="text-[#343A40] text-3xl md:text-4xl font-bold mb-8">
            진료시간 안내
          </h1>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
              <p className="mt-4 text-gray-500">진료시간 정보를 불러오는 중...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Standard Hours */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">진료 시간</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">평일 (월~금)</span>
                      <span className="font-medium text-gray-900">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">토요일</span>
                      <span className="font-medium text-gray-900">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">점심시간</span>
                      <span className="font-medium text-gray-900">13:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">일요일 / 공휴일</span>
                      <span className="font-medium text-red-500">휴진</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Schedules Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">원장님별 진료 요일</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">원장님</th>
                        {dayOrder.map(day => (
                          <th key={day} className="px-3 py-3 text-center text-sm font-semibold text-gray-700">
                            {dayOfWeekMap[day]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {doctors.map((doctor) => {
                        // Create a map of schedules by day
                        const scheduleMap = new Map(
                          (doctor.schedules || []).map(s => [s.dayOfWeek, s])
                        );

                        return (
                          <tr key={doctor.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{doctor.name}</div>
                              <div className="text-xs text-gray-500">{doctor.title}</div>
                            </td>
                            {dayOrder.map(day => {
                              const schedule = scheduleMap.get(day);
                              const isAvailable = schedule &&
                                (schedule.morningStatus === 'available' || schedule.afternoonStatus === 'available');

                              return (
                                <td key={day} className="px-3 py-4 text-center">
                                  {isAvailable ? (
                                    <span className="inline-block w-6 h-6 bg-green-500 rounded-full"></span>
                                  ) : (
                                    <span className="inline-block w-6 h-6 bg-gray-200 rounded-full"></span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {doctors.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                      등록된 의료진이 없습니다.
                    </div>
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>
                  <span>진료</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-gray-200 rounded-full"></span>
                  <span>휴진</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
