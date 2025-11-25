'use client';

import { useState, useEffect } from 'react';

interface ClinicHours {
  id: string;
  dayOfWeek: string;
  openTime: string | null;
  closeTime: string | null;
  lunchStart: string | null;
  lunchEnd: string | null;
  isClosed: boolean;
  note: string | null;
}

const DAYS_OF_WEEK = [
  { value: 'monday', label: '월요일' },
  { value: 'tuesday', label: '화요일' },
  { value: 'wednesday', label: '수요일' },
  { value: 'thursday', label: '목요일' },
  { value: 'friday', label: '금요일' },
  { value: 'saturday', label: '토요일' },
  { value: 'sunday', label: '일요일' }
];

export default function ClinicHoursManager() {
  const [hours, setHours] = useState<ClinicHours[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchClinicHours();
  }, []);

  const fetchClinicHours = async () => {
    try {
      const response = await fetch('/api/clinic-hours');
      if (response.ok) {
        const data = await response.json();
        // Ensure all days are present
        const allDays = DAYS_OF_WEEK.map(day => {
          const existing = data.find((h: ClinicHours) => h.dayOfWeek === day.value);
          return existing || {
            id: '',
            dayOfWeek: day.value,
            openTime: '09:00',
            closeTime: '18:00',
            lunchStart: '12:30',
            lunchEnd: '14:00',
            isClosed: false,
            note: null
          };
        });
        setHours(allDays);
      }
    } catch (error) {
      console.error('Failed to fetch clinic hours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/clinic-hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hours })
      });

      if (response.ok) {
        await fetchClinicHours();
        setMessage('✓ 저장되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ 저장 실패');
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage('✗ 저장 중 오류 발생');
    } finally {
      setSaving(false);
    }
  };

  const updateHour = (index: number, field: keyof ClinicHours, value: any) => {
    const newHours = [...hours];
    newHours[index] = { ...newHours[index], [field]: value };
    setHours(newHours);
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
      <div>
        <h3 className="text-xl font-bold text-gray-900">진료 시간</h3>
        <p className="text-sm text-gray-600 mt-1">요일별 진료 시간을 설정합니다</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        {hours.map((hour, index) => (
          <div key={hour.dayOfWeek} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Day of Week */}
              <div className="w-20">
                <span className="font-bold text-gray-900">
                  {DAYS_OF_WEEK.find(d => d.value === hour.dayOfWeek)?.label}
                </span>
              </div>

              {/* Closed Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hour.isClosed}
                  onChange={(e) => updateHour(index, 'isClosed', e.target.checked)}
                  className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">휴진</span>
              </label>

              {!hour.isClosed && (
                <>
                  {/* Open Time */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-16">진료 시작</label>
                    <input
                      type="time"
                      value={hour.openTime || ''}
                      onChange={(e) => updateHour(index, 'openTime', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Close Time */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-16">진료 종료</label>
                    <input
                      type="time"
                      value={hour.closeTime || ''}
                      onChange={(e) => updateHour(index, 'closeTime', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Lunch Start */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-16">점심 시작</label>
                    <input
                      type="time"
                      value={hour.lunchStart || ''}
                      onChange={(e) => updateHour(index, 'lunchStart', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Lunch End */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-16">점심 종료</label>
                    <input
                      type="time"
                      value={hour.lunchEnd || ''}
                      onChange={(e) => updateHour(index, 'lunchEnd', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </>
              )}

              {/* Note */}
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={hour.note || ''}
                  onChange={(e) => updateHour(index, 'note', e.target.value || null)}
                  placeholder="참고사항 (선택)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">팁</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 휴진일은 체크박스를 선택하면 시간 입력이 비활성화됩니다</li>
              <li>• 점심시간이 없는 경우 빈 값으로 둘 수 있습니다</li>
              <li>• 참고사항에는 특이사항을 입력할 수 있습니다 (예: "사전 예약 필수")</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
