'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
  career: string;
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

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function DoctorsPage() {
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
      return <p className="text-xs text-gray-500 text-center py-2">진료시간 정보 없음</p>;
    }

    // Sort schedules by day order
    const sortedSchedules = [...schedules].sort((a, b) => {
      return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
    });

    return (
      <div className="space-y-1">
        {sortedSchedules.map((schedule) => {
          const day = dayOfWeekMap[schedule.dayOfWeek] || schedule.dayOfWeek;
          const isClosed = schedule.morningStatus === 'closed' && schedule.afternoonStatus === 'closed';

          if (isClosed) {
            return (
              <div key={schedule.id} className="flex items-center text-xs">
                <span className="w-6 font-medium text-gray-700">{day}</span>
                <span className="flex-1 text-gray-400">휴진</span>
              </div>
            );
          }

          return (
            <div key={schedule.id} className="flex items-center text-xs">
              <span className="w-6 font-medium text-gray-700">{day}</span>
              <div className="flex-1 flex gap-2">
                <span className={schedule.morningStatus === 'available' ? 'text-green-600' : 'text-gray-400'}>
                  {schedule.morningStatus === 'available' ? '오전 ●' : '오전 ○'}
                </span>
                <span className={schedule.afternoonStatus === 'available' ? 'text-green-600' : 'text-gray-400'}>
                  {schedule.afternoonStatus === 'available' ? '오후 ●' : '오후 ○'}
                </span>
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

      <main>
        {/* Doctors Section */}
        <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
          <div className="max-w-[1140px] mx-auto">
            <h2 className="text-[#343A40] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center mb-12">
              의료진 소개
            </h2>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
                <p className="mt-4 text-gray-500">의료진 정보를 불러오는 중...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/5] bg-gray-100 relative">
                    {doctor.photoUrl ? (
                      <Image
                        src={doctor.photoUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={90}
                        priority={doctor.order <= 3}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400 text-4xl">👤</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[#343A40] mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm font-medium text-[#D4AF37] mb-2">
                        {doctor.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {doctor.specialty}
                      </p>
                    </div>

                    {doctor.career && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">경력</h4>
                        <div className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                          {doctor.career}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-700 mb-3">진료시간표</h4>
                      {renderSchedule(doctor.schedules)}
                    </div>
                  </div>
                </div>
              ))}

              {doctors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">등록된 의료진이 없습니다.</p>
                </div>
              )}
            </div>
            )}
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
