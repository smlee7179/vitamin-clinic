'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface DoctorSchedule {
  id: string;
  doctorId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  photoUrl: string;
  experience: string | null;
  education: string | null;
  certifications: string | null;
  order: number;
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

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      if (response.ok) {
        const data = await response.json();

        // Fetch schedules for each doctor
        const doctorsWithSchedules = await Promise.all(
          data.map(async (doctor: Doctor) => {
            const scheduleResponse = await fetch(`/api/doctor-schedule?doctorId=${doctor.id}`);
            if (scheduleResponse.ok) {
              const schedules = await scheduleResponse.json();
              return { ...doctor, schedules };
            }
            return doctor;
          })
        );

        setDoctors(doctorsWithSchedules);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const formatSchedule = (schedules: DoctorSchedule[] = []) => {
    if (schedules.length === 0) return '진료 시간 미정';

    return schedules
      .map((schedule) => {
        const day = dayOfWeekMap[schedule.dayOfWeek] || schedule.dayOfWeek;
        const start = schedule.startTime.slice(0, 5);
        const end = schedule.endTime.slice(0, 5);
        return `${day} ${start}-${end}`;
      })
      .join(', ');
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    {doctor.photoUrl ? (
                      <Image
                        src={doctor.photoUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
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

                    {doctor.experience && (
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">경력</h4>
                        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                          {doctor.experience}
                        </p>
                      </div>
                    )}

                    {doctor.education && (
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">학력</h4>
                        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                          {doctor.education}
                        </p>
                      </div>
                    )}

                    {doctor.certifications && (
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">자격</h4>
                        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                          {doctor.certifications}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">진료 시간</h4>
                      <p className="text-xs text-gray-600">
                        {formatSchedule(doctor.schedules)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {doctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">등록된 의료진이 없습니다.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
