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
  schedules?: DoctorSchedule[];
}

interface PageHero {
  id: string;
  page: string;
  imageUrl: string;
  title: string;
  subtitle: string | null;
}

interface Greeting {
  id: string;
  imageUrl: string;
  content: string;
  signature: string;
}

const DAY_OF_WEEK_MAP: { [key: string]: string } = {
  monday: '월',
  tuesday: '화',
  wednesday: '수',
  thursday: '목',
  friday: '금',
  saturday: '토'
};

const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hero, setHero] = useState<PageHero | null>(null);
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  useEffect(() => {
    fetchHero();
    fetchGreeting();
    fetchDoctors();
  }, []);

  const fetchHero = async () => {
    try {
      const response = await fetch('/api/page-hero?page=doctors');
      if (response.ok) {
        const data = await response.json();
        setHero(data);
      }
    } catch (error) {
      console.error('Failed to fetch page hero:', error);
    }
  };

  const fetchGreeting = async () => {
    try {
      const response = await fetch('/api/greeting');
      if (response.ok) {
        const data = await response.json();
        setGreeting(data);
      }
    } catch (error) {
      console.error('Failed to fetch greeting:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      if (response.ok) {
        const doctorsData = await response.json();

        // Fetch schedules for each doctor
        const doctorsWithSchedules = await Promise.all(
          doctorsData.map(async (doctor: Doctor) => {
            try {
              const scheduleResponse = await fetch(`/api/doctor-schedule?doctorId=${doctor.id}`);
              if (scheduleResponse.ok) {
                const schedules = await scheduleResponse.json();
                return { ...doctor, schedules };
              }
              return doctor;
            } catch (error) {
              console.error(`Failed to fetch schedule for doctor ${doctor.id}:`, error);
              return doctor;
            }
          })
        );

        setDoctors(doctorsWithSchedules);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main>
        {/* Greeting Section with Hero Image */}
        {greeting && (
          <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
            <div className="max-w-[1140px] mx-auto">
              <div className="flex flex-col bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                {/* Hero Image */}
                {hero?.imageUrl && (
                  <div className="w-full bg-gray-50 flex items-center justify-center p-6 md:p-8">
                    <div className="w-full max-w-2xl">
                      <Image
                        src={hero.imageUrl}
                        alt="의료진 소개"
                        width={800}
                        height={800}
                        priority
                        className="w-full h-auto object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                        quality={85}
                      />
                    </div>
                  </div>
                )}
                {/* Greeting Content */}
                <div className="flex flex-col gap-4 w-full p-8 md:p-12">
                  <h2 className="text-[#343A40] tracking-tight text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    인사말
                  </h2>
                  <div
                    className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap [&_p]:mb-[1em] [&_p]:min-h-[1.5em] [&_p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: greeting.content }}
                  />
                  {greeting.signature && (
                    <p className="text-right font-bold text-lg md:text-xl text-[#343A40] mt-4">
                      {greeting.signature}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Doctor Section */}
        {doctors.length > 0 && (
          <section className="px-4 md:px-10 py-16 md:py-20">
            <h2 className="text-[#343A40] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
              의료진 소개
            </h2>
            <p className="text-center text-gray-600 text-base md:text-lg mb-12 max-w-2xl mx-auto">
              비타민마취통증의학과의 분야별 전문 의료진이 환자 여러분의 건강한 삶을 위해 최선을 다하고 있습니다.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1140px] mx-auto">
              {doctors.map((doctor) => {
                // Sort schedules by day order
                const sortedSchedules = doctor.schedules?.sort((a, b) => {
                  return DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek);
                }) || [];

                return (
                  <div
                    key={doctor.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {/* Doctor Info Header */}
                    <div className="p-6 bg-gradient-to-r from-orange-50 to-white border-b border-gray-200">
                      <div className="flex items-start gap-6">
                        {doctor.photoUrl && (
                          <div className="w-40 h-52 rounded-lg bg-white shadow-md flex-shrink-0 overflow-hidden border border-gray-200">
                            <img
                              className="w-full h-full object-cover"
                              src={doctor.photoUrl}
                              alt={doctor.name}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-2xl text-[#343A40] mb-2">
                            {doctor.name}
                          </h3>
                          <p className="text-[#f97316] font-semibold text-base mb-1">
                            {doctor.title}
                          </p>
                          <p className="text-gray-600 font-medium text-sm">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Career Section */}
                    {doctor.career && (
                      <div className="p-6 border-b border-gray-200">
                        <h4 className="font-bold text-base md:text-lg text-gray-700 mb-3">경력</h4>
                        <ul className="text-gray-600 text-sm md:text-base space-y-1.5 list-disc list-inside">
                          {doctor.career.split('\n').map((line, idx) => (
                            line.trim() && <li key={`career-${idx}`}>{line.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Schedule Section */}
                    {sortedSchedules.length > 0 && (
                      <div className="p-6">
                        <h4 className="font-bold text-base md:text-lg text-gray-700 mb-3">진료 시간표</h4>
                        <div className="rounded-lg border border-gray-200 shadow-sm">
                          <table className="w-full border-collapse text-xs md:text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                {sortedSchedules.map((schedule) => (
                                  <th key={schedule.id} className="py-2 px-1 md:px-2 text-center font-semibold text-gray-700 border border-gray-200">
                                    {DAY_OF_WEEK_MAP[schedule.dayOfWeek]}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {sortedSchedules.map((schedule) => {
                                  // If either morning or afternoon is available, show as available
                                  const isAvailable = schedule.morningStatus === 'available' || schedule.afternoonStatus === 'available';
                                  return (
                                    <td key={schedule.id} className="py-2 md:py-3 px-1 md:px-2 text-center border border-gray-200">
                                      <span className={`inline-block px-2 md:px-3 py-1 rounded text-xs font-medium ${
                                        isAvailable
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-red-100 text-red-700'
                                      }`}>
                                        {isAvailable ? '진료' : '휴진'}
                                      </span>
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <NewFooter />
    </div>
  );
}
