'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface ClinicHours {
  id: string;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  lunchStartTime: string | null;
  lunchEndTime: string | null;
  isClosed: boolean;
}

const dayOfWeekMap: { [key: string]: string } = {
  'monday': '월요일',
  'tuesday': '화요일',
  'wednesday': '수요일',
  'thursday': '목요일',
  'friday': '금요일',
  'saturday': '토요일',
  'sunday': '일요일',
};

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function HoursPage() {
  const [clinicHours, setClinicHours] = useState<ClinicHours[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClinicHours();
  }, []);

  const fetchClinicHours = async () => {
    try {
      const response = await fetch('/api/clinic-hours');
      if (response.ok) {
        const data = await response.json();
        // Sort by day of week
        const sorted = data.sort((a: ClinicHours, b: ClinicHours) => {
          return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
        });
        setClinicHours(sorted);
      }
    } catch (error) {
      console.error('Failed to fetch clinic hours:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5); // HH:MM format
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4">
          <div className="flex flex-col gap-10 mt-10 mb-10">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#181511] text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                  진료시간 안내
                </p>
                <p className="text-[#8a7960] text-base md:text-lg font-normal leading-normal">
                  비타민마취통증의학과의 진료 시간을 안내해드립니다.
                </p>
              </div>
            </div>

            {/* Clinic Hours Table */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 md:p-8">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">진료시간 정보를 불러오는 중...</p>
                </div>
              ) : clinicHours.length > 0 ? (
                <div className="space-y-4">
                  {clinicHours.map((hours) => (
                    <div
                      key={hours.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <span className="text-[#f97316] font-bold text-lg w-20">
                          {dayOfWeekMap[hours.dayOfWeek]}
                        </span>
                      </div>
                      <div className="flex-1 sm:text-right">
                        {hours.isClosed ? (
                          <span className="text-red-500 font-medium">휴진</span>
                        ) : (
                          <div className="text-[#343A40]">
                            <div className="font-medium">
                              {formatTime(hours.openTime)} - {formatTime(hours.closeTime)}
                            </div>
                            {hours.lunchStartTime && hours.lunchEndTime && (
                              <div className="text-sm text-gray-500">
                                점심시간: {formatTime(hours.lunchStartTime)} - {formatTime(hours.lunchEndTime)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Notice */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#f97316] text-xl">info</span>
                        <div className="text-sm text-gray-700">
                          <p className="font-semibold mb-1">공휴일 휴진 안내</p>
                          <p>공휴일은 휴진입니다. 방문 전 미리 확인해주세요.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">진료시간 정보가 없습니다.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    관리자 페이지에서 진료시간을 설정해주세요.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
