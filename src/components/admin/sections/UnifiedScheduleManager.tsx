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

interface HoursFormData {
  // Weekday (Mon-Fri)
  weekdayOpen: string;
  weekdayClose: string;

  // Saturday
  saturdayOpen: string;
  saturdayClose: string;

  // Lunch time (applies to all days)
  lunchStart: string;
  lunchEnd: string;

  // Special notes for each day
  notes: {
    [key: string]: string;
  };
}

const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export default function UnifiedScheduleManager() {
  const [formData, setFormData] = useState<HoursFormData>({
    weekdayOpen: '09:00',
    weekdayClose: '18:00',
    saturdayOpen: '09:00',
    saturdayClose: '13:00',
    lunchStart: '13:00',
    lunchEnd: '14:00',
    notes: {}
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const schedulesRes = await fetch('/api/unified-schedule');

      if (schedulesRes.ok) {
        const schedules: UnifiedSchedule[] = await schedulesRes.json();

        // Find Monday schedule for weekday defaults
        const monday = schedules.find(s => s.dayOfWeek === 'monday');
        const saturday = schedules.find(s => s.dayOfWeek === 'saturday');

        // Extract notes from all days
        const notes: { [key: string]: string } = {};
        schedules.forEach(s => {
          if (s.note) {
            notes[s.dayOfWeek] = s.note;
          }
        });

        setFormData({
          weekdayOpen: monday?.morningOpen || '09:00',
          weekdayClose: monday?.afternoonClose || '18:00',
          saturdayOpen: saturday?.morningOpen || '09:00',
          saturdayClose: saturday?.afternoonClose || saturday?.morningClose || '13:00',
          lunchStart: monday?.lunchStart || '13:00',
          lunchEnd: monday?.lunchEnd || '14:00',
          notes
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // Prepare schedules for all days
      const schedulesToSave: Omit<UnifiedSchedule, 'id'>[] = [];

      // Weekdays (Mon-Fri) - all get the same hours
      WEEKDAYS.forEach(day => {
        schedulesToSave.push({
          dayOfWeek: day,
          morningOpen: formData.weekdayOpen,
          morningClose: formData.lunchStart, // Morning ends when lunch starts
          afternoonOpen: formData.lunchEnd,   // Afternoon starts when lunch ends
          afternoonClose: formData.weekdayClose,
          lunchStart: formData.lunchStart,
          lunchEnd: formData.lunchEnd,
          isClosed: false,
          note: formData.notes[day] || ''
        });
      });

      // Saturday - typically shorter hours
      schedulesToSave.push({
        dayOfWeek: 'saturday',
        morningOpen: formData.saturdayOpen,
        morningClose: formData.saturdayClose,
        afternoonOpen: undefined,
        afternoonClose: undefined,
        lunchStart: undefined,
        lunchEnd: undefined,
        isClosed: false,
        note: formData.notes['saturday'] || ''
      });

      // Sunday - always closed
      schedulesToSave.push({
        dayOfWeek: 'sunday',
        morningOpen: undefined,
        morningClose: undefined,
        afternoonOpen: undefined,
        afternoonClose: undefined,
        lunchStart: undefined,
        lunchEnd: undefined,
        isClosed: true,
        note: formData.notes['sunday'] || '일요일 및 공휴일 휴진'
      });

      // Save all schedules
      const responses = await Promise.all(
        schedulesToSave.map(schedule =>
          fetch('/api/unified-schedule', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schedule)
          })
        )
      );

      const allSuccessful = responses.every(res => res.ok);

      if (allSuccessful) {
        alert('✓ 진료시간이 저장되었습니다.');
        fetchData(); // Refresh data
      } else {
        alert('⚠ 일부 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('❌ 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3"></div>
          <p className="text-sm text-gray-600">진료시간 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">진료시간 관리</h2>
          <p className="text-sm text-gray-600">
            홈페이지 진료시간 안내 페이지에 표시될 진료시간을 설정합니다.
          </p>
        </div>

        <div className="space-y-6">
          {/* Weekday Hours (Mon-Fri) */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-orange-500">📅</span>
              평일 (월~금)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  진료 시작 시간
                </label>
                <input
                  type="time"
                  value={formData.weekdayOpen}
                  onChange={(e) => setFormData(prev => ({ ...prev, weekdayOpen: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  진료 종료 시간
                </label>
                <input
                  type="time"
                  value={formData.weekdayClose}
                  onChange={(e) => setFormData(prev => ({ ...prev, weekdayClose: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>
            <div className="mt-3 px-4 py-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>미리보기:</strong> 평일 (월~금) <span className="font-semibold text-gray-900">{formData.weekdayOpen} - {formData.weekdayClose}</span>
              </p>
            </div>
          </div>

          {/* Saturday Hours */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-500">📅</span>
              토요일
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  진료 시작 시간
                </label>
                <input
                  type="time"
                  value={formData.saturdayOpen}
                  onChange={(e) => setFormData(prev => ({ ...prev, saturdayOpen: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  진료 종료 시간
                </label>
                <input
                  type="time"
                  value={formData.saturdayClose}
                  onChange={(e) => setFormData(prev => ({ ...prev, saturdayClose: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>
            <div className="mt-3 px-4 py-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>미리보기:</strong> 토요일 <span className="font-semibold text-gray-900">{formData.saturdayOpen} - {formData.saturdayClose}</span>
              </p>
            </div>
          </div>

          {/* Lunch Time */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-green-500">🍽️</span>
              점심시간
            </h3>
            <p className="text-sm text-gray-600 mb-4">평일 점심시간을 설정합니다. (토요일은 점심시간 없음)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  점심 시작
                </label>
                <input
                  type="time"
                  value={formData.lunchStart}
                  onChange={(e) => setFormData(prev => ({ ...prev, lunchStart: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  점심 종료
                </label>
                <input
                  type="time"
                  value={formData.lunchEnd}
                  onChange={(e) => setFormData(prev => ({ ...prev, lunchEnd: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>
            <div className="mt-3 px-4 py-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>미리보기:</strong> 점심시간 <span className="font-semibold text-gray-900">{formData.lunchStart} - {formData.lunchEnd}</span>
              </p>
            </div>
          </div>

          {/* Sunday (Always Closed) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-red-500">🚫</span>
              일요일 / 공휴일
            </h3>
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>미리보기:</strong> 일요일 / 공휴일 <span className="font-semibold text-red-600">휴진</span>
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
          >
            {saving ? '저장 중...' : '✓ 저장하기'}
          </button>
        </div>
      </div>

      {/* Preview - How it will appear on the website */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>👁️</span>
          홈페이지 표시 미리보기
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          진료시간 안내 페이지에 다음과 같이 표시됩니다.
        </p>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h4 className="font-bold text-gray-900">진료 시간</h4>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">평일 (월~금)</span>
                <span className="font-medium text-gray-900">
                  {formData.weekdayOpen} - {formData.weekdayClose}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">토요일</span>
                <span className="font-medium text-gray-900">
                  {formData.saturdayOpen} - {formData.saturdayClose}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">점심시간</span>
                <span className="font-medium text-gray-900">
                  {formData.lunchStart} - {formData.lunchEnd}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">일요일 / 공휴일</span>
                <span className="font-medium text-red-500">휴진</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
