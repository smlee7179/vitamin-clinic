'use client';

import { useState, useEffect } from 'react';

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
  note?: string;
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
    note: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDay) {
      updateCurrentSchedule(selectedDay);
    }
  }, [selectedDay, schedules]);

  const fetchData = async () => {
    try {
      const schedulesRes = await fetch('/api/unified-schedule');

      if (schedulesRes.ok) {
        const data = await schedulesRes.json();
        setSchedules(data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentSchedule = (day: string) => {
    const existingSchedule = schedules.find(s => s.dayOfWeek === day);

    if (existingSchedule) {
      setCurrentSchedule(existingSchedule);
    } else {
      setCurrentSchedule({
        dayOfWeek: day,
        morningOpen: '09:00',
        morningClose: '13:00',
        afternoonOpen: '14:00',
        afternoonClose: '18:00',
        lunchStart: '13:00',
        lunchEnd: '14:00',
        isClosed: false,
        note: ''
      });
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
        fetchData();
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">병원 진료 시간 관리</h2>
        <p className="text-sm text-gray-600 mb-6">
          병원 전체 운영 시간을 설정합니다. 원장님별 진료 시간은 '의료진 소개 &gt; 의료진 관리'에서 설정할 수 있습니다.
        </p>

        <div className="mb-6">
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
