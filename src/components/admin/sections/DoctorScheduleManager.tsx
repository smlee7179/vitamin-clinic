'use client';

import { useState, useEffect } from 'react';

interface DoctorSchedule {
  id: string;
  doctorName: string;
  specialty: string | null;
  scheduleData: string; // JSON stringified
  active: boolean;
}

interface ScheduleEntry {
  day: string;
  timeSlots: string[];
  notes?: string;
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

export default function DoctorScheduleManager() {
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSchedule, setEditingSchedule] = useState<DoctorSchedule | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/doctor-schedule');
      if (response.ok) {
        const data = await response.json();
        setSchedules(data);
      }
    } catch (error) {
      console.error('Failed to fetch doctor schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSchedule({
      id: '',
      doctorName: '',
      specialty: null,
      scheduleData: JSON.stringify([]),
      active: true
    });
    setIsCreating(true);
  };

  const handleEdit = (schedule: DoctorSchedule) => {
    setEditingSchedule({ ...schedule });
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingSchedule) return;

    try {
      const url = '/api/doctor-schedule';
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSchedule)
      });

      if (response.ok) {
        await fetchSchedules();
        setEditingSchedule(null);
        setIsCreating(false);
        setMessage('✓ 저장되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage('✗ 저장 실패');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/doctor-schedule?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchSchedules();
        setMessage('✓ 삭제되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('✗ 삭제 실패');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (editingSchedule) {
    const scheduleData: ScheduleEntry[] = editingSchedule.scheduleData
      ? JSON.parse(editingSchedule.scheduleData)
      : [];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {isCreating ? '새 원장 시간표 추가' : '원장 시간표 수정'}
          </h3>
          <button
            onClick={() => {
              setEditingSchedule(null);
              setIsCreating(false);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕ 취소
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                원장명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={editingSchedule.doctorName}
                onChange={(e) => setEditingSchedule({ ...editingSchedule, doctorName: e.target.value })}
                placeholder="홍길동"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                전문분야
              </label>
              <input
                type="text"
                value={editingSchedule.specialty || ''}
                onChange={(e) => setEditingSchedule({ ...editingSchedule, specialty: e.target.value || null })}
                placeholder="마취통증의학과 전문의"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              시간표 데이터 (JSON)
            </label>
            <textarea
              value={editingSchedule.scheduleData}
              onChange={(e) => setEditingSchedule({ ...editingSchedule, scheduleData: e.target.value })}
              placeholder='[{"day":"monday","timeSlots":["09:00-12:00","14:00-18:00"],"notes":"예약 필수"}]'
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">
              JSON 형식으로 시간표를 입력하세요
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingSchedule.active}
                onChange={(e) => setEditingSchedule({ ...editingSchedule, active: e.target.checked })}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-semibold text-gray-700">시간표 활성화</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!editingSchedule.doctorName}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            저장
          </button>
          <button
            onClick={() => {
              setEditingSchedule(null);
              setIsCreating(false);
            }}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">원장 시간표</h3>
          <p className="text-sm text-gray-600 mt-1">원장별 진료 시간표를 관리합니다</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          + 새 시간표
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {schedules.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">등록된 시간표가 없습니다</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            첫 시간표 추가하기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{schedule.doctorName}</h4>
                  {schedule.specialty && (
                    <p className="text-sm text-gray-600 mt-1">{schedule.specialty}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!schedule.active && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                      비활성
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-xs text-gray-600 overflow-x-auto">{schedule.scheduleData}</pre>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(schedule)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(schedule.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">JSON 형식 예시</p>
            <pre className="text-xs text-blue-800 bg-white p-3 rounded overflow-x-auto">
{`[
  {
    "day": "monday",
    "timeSlots": ["09:00-12:00", "14:00-18:00"],
    "notes": "예약 필수"
  },
  {
    "day": "tuesday",
    "timeSlots": ["09:00-13:00"],
    "notes": "오전만 진료"
  }
]`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
