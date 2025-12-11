'use client';

import { useState, useEffect } from 'react';

interface Doctor {
  doctorId: string;
  doctorName: string;
  morningAvailable: boolean;
  afternoonAvailable: boolean;
  note?: string;
}

interface UnifiedSchedule {
  id?: string;
  dayOfWeek: string;
  morningOpen?: string;
  morningClose?: string;
  afternoonOpen?: string;
  afternoonClose?: string;
  lunchStart?: string;
  lunchEnd?: string;
  isClosed: boolean;
  doctors: Doctor[];
  note?: string;
}

interface DoctorInfo {
  id: string;
  name: string;
  active: boolean;
}

const DAYS_OF_WEEK = [
  { key: 'monday', label: '월요일' },
  { key: 'tuesday', label: '화요일' },
  { key: 'wednesday', label: '수요일' },
  { key: 'thursday', label: '목요일' },
  { key: 'friday', label: '금요일' },
  { key: 'saturday', label: '토요일' }
];

export default function UnifiedScheduleManager() {
  const [schedules, setSchedules] = useState<UnifiedSchedule[]>([]);
  const [doctorsList, setDoctorsList] = useState<DoctorInfo[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('monday');
  const [currentSchedule, setCurrentSchedule] = useState<UnifiedSchedule>({
    dayOfWeek: 'monday',
    morningOpen: '09:00',
    morningClose: '13:00',
    afternoonOpen: '14:00',
    afternoonClose: '18:00',
    lunchStart: '13:00',
    lunchEnd: '14:00',
    isClosed: false,
    doctors: [],
    note: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSchedules();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDay && schedules.length > 0) {
      const schedule = schedules.find(s => s.dayOfWeek === selectedDay);
      if (schedule) {
        setCurrentSchedule(schedule);
      } else {
        // Create default schedule for this day
        setCurrentSchedule({
          dayOfWeek: selectedDay,
          morningOpen: '09:00',
          morningClose: '13:00',
          afternoonOpen: '14:00',
          afternoonClose: '18:00',
          lunchStart: '13:00',
          lunchEnd: '14:00',
          isClosed: false,
          doctors: doctorsList.filter(d => d.active).map(doctor => ({
            doctorId: doctor.id,
            doctorName: doctor.name,
            morningAvailable: true,
            afternoonAvailable: true
          })),
          note: ''
        });
      }
    }
  }, [selectedDay, schedules, doctorsList]);

  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/unified-schedule');
      if (response.ok) {
        const data = await response.json();
        setSchedules(data);
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctorsList(data);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/unified-schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSchedule)
      });

      if (response.ok) {
        alert('저장되었습니다.');
        fetchSchedules();
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDoctorToggle = (doctorId: string, period: 'morning' | 'afternoon', available: boolean) => {
    setCurrentSchedule(prev => ({
      ...prev,
      doctors: prev.doctors.map(d =>
        d.doctorId === doctorId
          ? {
              ...d,
              ...(period === 'morning'
                ? { morningAvailable: available }
                : { afternoonAvailable: available })
            }
          : d
      )
    }));
  };

  const handleAddDoctor = () => {
    const availableDoctors = doctorsList.filter(
      d => !currentSchedule.doctors.some(sd => sd.doctorId === d.id)
    );

    if (availableDoctors.length === 0) {
      alert('추가할 의료진이 없습니다.');
      return;
    }

    const doctor = availableDoctors[0];
    setCurrentSchedule(prev => ({
      ...prev,
      doctors: [
        ...prev.doctors,
        {
          doctorId: doctor.id,
          doctorName: doctor.name,
          morningAvailable: true,
          afternoonAvailable: true
        }
      ]
    }));
  };

  const handleRemoveDoctor = (doctorId: string) => {
    setCurrentSchedule(prev => ({
      ...prev,
      doctors: prev.doctors.filter(d => d.doctorId !== doctorId)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">통합 진료 시간표 관리</h2>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            병원 진료시간과 의료진별 스케줄을 하나의 표로 통합 관리합니다.
          </p>

          {/* Day Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {DAYS_OF_WEEK.map(day => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDay === day.key
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>

          {/* Schedule Form */}
          <div className="space-y-6 border-t pt-6">
            {/* Closed Day Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isClosed"
                checked={currentSchedule.isClosed}
                onChange={(e) => setCurrentSchedule(prev => ({
                  ...prev,
                  isClosed: e.target.checked
                }))}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
              <label htmlFor="isClosed" className="text-sm font-medium text-gray-700">
                휴진일로 설정
              </label>
            </div>

            {!currentSchedule.isClosed && (
              <>
                {/* Hospital Hours */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">병원 진료시간</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        오전 시작
                      </label>
                      <input
                        type="time"
                        value={currentSchedule.morningOpen || ''}
                        onChange={(e) => setCurrentSchedule(prev => ({
                          ...prev,
                          morningOpen: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        오전 종료
                      </label>
                      <input
                        type="time"
                        value={currentSchedule.morningClose || ''}
                        onChange={(e) => setCurrentSchedule(prev => ({
                          ...prev,
                          morningClose: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        오후 시작
                      </label>
                      <input
                        type="time"
                        value={currentSchedule.afternoonOpen || ''}
                        onChange={(e) => setCurrentSchedule(prev => ({
                          ...prev,
                          afternoonOpen: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        오후 종료
                      </label>
                      <input
                        type="time"
                        value={currentSchedule.afternoonClose || ''}
                        onChange={(e) => setCurrentSchedule(prev => ({
                          ...prev,
                          afternoonClose: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        점심 시작
                      </label>
                      <input
                        type="time"
                        value={currentSchedule.lunchStart || ''}
                        onChange={(e) => setCurrentSchedule(prev => ({
                          ...prev,
                          lunchStart: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        점심 종료
                      </label>
                      <input
                        type="time"
                        value={currentSchedule.lunchEnd || ''}
                        onChange={(e) => setCurrentSchedule(prev => ({
                          ...prev,
                          lunchEnd: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Doctor Schedules */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">의료진 스케줄</h3>
                    <button
                      onClick={handleAddDoctor}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      + 의료진 추가
                    </button>
                  </div>

                  {currentSchedule.doctors.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">등록된 의료진이 없습니다.</p>
                      <p className="text-sm text-gray-400 mt-1">위 버튼을 클릭하여 의료진을 추가하세요.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentSchedule.doctors.map(doctor => (
                        <div key={doctor.doctorId} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">{doctor.doctorName}</h4>
                            <button
                              onClick={() => handleRemoveDoctor(doctor.doctorId)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              제거
                            </button>
                          </div>

                          <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={doctor.morningAvailable}
                                onChange={(e) => handleDoctorToggle(doctor.doctorId, 'morning', e.target.checked)}
                                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                              />
                              <span className="text-sm text-gray-700">오전 진료</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={doctor.afternoonAvailable}
                                onChange={(e) => handleDoctorToggle(doctor.doctorId, 'afternoon', e.target.checked)}
                                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                              />
                              <span className="text-sm text-gray-700">오후 진료</span>
                            </label>
                          </div>

                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder="특이사항 (선택사항)"
                              value={doctor.note || ''}
                              onChange={(e) => setCurrentSchedule(prev => ({
                                ...prev,
                                doctors: prev.doctors.map(d =>
                                  d.doctorId === doctor.doctorId
                                    ? { ...d, note: e.target.value }
                                    : d
                                )
                              }))}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Special Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    특별 공지 (선택사항)
                  </label>
                  <input
                    type="text"
                    value={currentSchedule.note || ''}
                    onChange={(e) => setCurrentSchedule(prev => ({
                      ...prev,
                      note: e.target.value
                    }))}
                    placeholder="예: 토요일 오후 휴진"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6 pt-6 border-t">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">주간 시간표 미리보기</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">요일</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">오전</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">점심</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">오후</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">의료진</th>
              </tr>
            </thead>
            <tbody>
              {DAYS_OF_WEEK.map(day => {
                const schedule = schedules.find(s => s.dayOfWeek === day.key) ||
                  (day.key === selectedDay ? currentSchedule : null);

                return (
                  <tr key={day.key} className={day.key === selectedDay ? 'bg-orange-50' : ''}>
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      {day.label}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {schedule?.isClosed ? (
                        <span className="text-red-500">휴진</span>
                      ) : (
                        schedule?.morningOpen && schedule?.morningClose &&
                        `${schedule.morningOpen} - ${schedule.morningClose}`
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {!schedule?.isClosed && schedule?.lunchStart && schedule?.lunchEnd &&
                        `${schedule.lunchStart} - ${schedule.lunchEnd}`
                      }
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {schedule?.isClosed ? (
                        <span className="text-red-500">휴진</span>
                      ) : (
                        schedule?.afternoonOpen && schedule?.afternoonClose &&
                        `${schedule.afternoonOpen} - ${schedule.afternoonClose}`
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {!schedule?.isClosed && schedule?.doctors && schedule.doctors.length > 0 ? (
                        <div className="space-y-1">
                          {schedule.doctors.map(d => (
                            <div key={d.doctorId} className="text-xs">
                              {d.doctorName} ({d.morningAvailable ? '오전' : ''}{d.morningAvailable && d.afternoonAvailable ? '/' : ''}{d.afternoonAvailable ? '오후' : ''})
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
