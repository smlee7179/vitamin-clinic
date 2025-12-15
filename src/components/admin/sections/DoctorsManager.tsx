'use client';

import { useEffect, useState } from 'react';
import ModernImageUpload from '@/components/admin/ModernImageUpload';

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  photoUrl: string | null;
  career: string;
  order: number;
  active: boolean;
}

interface DaySchedule {
  dayOfWeek: string;
  morningStatus: 'available' | 'closed';
  afternoonStatus: 'available' | 'closed';
  note: string;
}

const DAYS_OF_WEEK = [
  { value: 'monday', label: '월요일' },
  { value: 'tuesday', label: '화요일' },
  { value: 'wednesday', label: '수요일' },
  { value: 'thursday', label: '목요일' },
  { value: 'friday', label: '금요일' },
  { value: 'saturday', label: '토요일' }
];

export default function DoctorsManager() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'schedule'>('info');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    specialty: '',
    photoUrl: '',
    career: '',
    order: 0,
    active: true
  });
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>(
    DAYS_OF_WEEK.map(day => ({
      dayOfWeek: day.value,
      morningStatus: 'available' as const,
      afternoonStatus: 'available' as const,
      note: ''
    }))
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors?admin=true');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingDoctor(null);
    setFormData({
      name: '',
      title: '',
      specialty: '',
      photoUrl: '',
      career: '',
      order: doctors.length,
      active: true
    });
    setScheduleData(
      DAYS_OF_WEEK.map(day => ({
        dayOfWeek: day.value,
        morningStatus: 'available' as const,
        afternoonStatus: 'available' as const,
        note: ''
      }))
    );
    setActiveTab('info');
    setShowModal(true);
  };

  const handleEdit = async (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      title: doctor.title,
      specialty: doctor.specialty,
      photoUrl: doctor.photoUrl || '',
      career: doctor.career,
      order: doctor.order,
      active: doctor.active
    });

    // Load existing schedule
    try {
      const response = await fetch(`/api/doctor-schedule?doctorId=${doctor.id}`);
      if (response.ok) {
        const schedules = await response.json();
        if (schedules && schedules.length > 0) {
          // Sort schedules to match DAYS_OF_WEEK order (Mon-Sat)
          // API returns alphabetically sorted by dayOfWeek, but we need Mon-Sat order
          const sortedSchedules = DAYS_OF_WEEK.map(day => {
            const schedule = schedules.find((s: any) => s.dayOfWeek === day.value);
            return schedule || {
              dayOfWeek: day.value,
              morningStatus: 'available' as const,
              afternoonStatus: 'available' as const,
              note: ''
            };
          });
          setScheduleData(sortedSchedules);
        } else {
          // No schedule found, use default
          setScheduleData(
            DAYS_OF_WEEK.map(day => ({
              dayOfWeek: day.value,
              morningStatus: 'available' as const,
              afternoonStatus: 'available' as const,
              note: ''
            }))
          );
        }
      }
    } catch (error) {
      console.error('Failed to load schedule:', error);
    }

    setActiveTab('info');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      // Save doctor info
      const response = await fetch('/api/doctors', {
        method: editingDoctor ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDoctor ? { ...formData, id: editingDoctor.id } : formData)
      });

      if (response.ok) {
        const savedDoctor = await response.json();

        // Save schedule data if doctor is saved successfully
        const doctorId = savedDoctor.id;
        const scheduleResponse = await fetch('/api/doctor-schedule', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            doctorId,
            schedules: scheduleData
          })
        });

        if (scheduleResponse.ok) {
          setMessage('✓ 저장되었습니다.');
          setTimeout(() => setMessage(''), 3000);
          setShowModal(false);
          fetchDoctors();
        } else {
          setMessage('✓ 의료진 정보는 저장되었으나 시간표 저장에 실패했습니다.');
        }
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

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/doctors?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('✓ 삭제되었습니다.');
        setTimeout(() => setMessage(''), 3000);
        fetchDoctors();
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('✗ 삭제 실패');
    }
  };

  const toggleActive = async (doctor: Doctor) => {
    try {
      const response = await fetch('/api/doctors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...doctor, active: !doctor.active })
      });

      if (response.ok) {
        fetchDoctors();
      } else {
        setMessage('✗ 상태 변경 실패');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Toggle error:', error);
      setMessage('✗ 상태 변경 중 오류 발생');
      setTimeout(() => setMessage(''), 3000);
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
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-semibold">전체 의료진</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">{doctors.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-semibold">활성화</p>
          <p className="text-3xl font-bold text-green-900 mt-2">
            {doctors.filter(d => d.active).length}
          </p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-3 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
      >
        + 의료진 추가
      </button>

      {/* Doctors List */}
      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`p-4 border rounded-lg ${doctor.active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'}`}
          >
            <div className="flex items-start gap-4">
              {doctor.photoUrl && (
                <div className="w-24 h-32 rounded-lg bg-white overflow-hidden border border-gray-200 flex-shrink-0">
                  <img
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                    <p className="text-orange-600 font-semibold text-sm">{doctor.title}</p>
                    <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                    <p className="text-gray-500 text-xs mt-1">순서: {doctor.order}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleActive(doctor)}
                      className={`px-3 py-1 text-xs font-medium rounded ${doctor.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {doctor.active ? '활성' : '비활성'}
                    </button>
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {doctors.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">등록된 의료진이 없습니다</p>
            <p className="text-sm">위 버튼을 클릭하여 의료진을 추가하세요.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingDoctor ? '의료진 수정' : '의료진 추가'}
            </h2>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'info'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                기본정보
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'schedule'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                진료시간표
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Info Tab */}
              {activeTab === 'info' && (
                <>
                  {/* Photo */}
                  <ModernImageUpload
                    currentImage={formData.photoUrl}
                    onUpload={(url) => setFormData({ ...formData, photoUrl: url })}
                    label="프로필 사진"
                    aspectRatio="portrait"
                    preset="default"
                    maxSize={10}
                  />
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      💡 인물 사진은 얼굴이 중앙에 오도록 촬영하면 원형으로 표시될 때 잘 보입니다.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      직책 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="예: 원장, 부원장"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      전문분야 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      placeholder="예: 마취통증의학과 전문의"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Career */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">경력</label>
                    <textarea
                      value={formData.career}
                      onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                      placeholder="줄바꿈으로 구분하여 입력&#10;예:&#10;○○대학교 의과대학 졸업&#10;○○병원 전문의 수료&#10;前 ○○병원 통증센터 임상강사&#10;대한마취통증의학회 정회원"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      rows={6}
                    />
                  </div>

                  {/* Order */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">표시 순서</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                    <p className="text-sm text-gray-500 mt-1">숫자가 작을수록 먼저 표시됩니다</p>
                  </div>

                  {/* Active */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="active" className="text-sm font-semibold text-gray-700">
                      활성화 (체크하면 홈페이지에 표시됩니다)
                    </label>
                  </div>
                </>
              )}

              {/* Schedule Tab */}
              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      의료진별 요일 진료 여부를 설정합니다. 월~토요일의 진료 여부를 선택하세요.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {scheduleData.map((schedule, index) => {
                      const isAvailable = schedule.morningStatus === 'available' || schedule.afternoonStatus === 'available';

                      return (
                        <button
                          key={schedule.dayOfWeek}
                          type="button"
                          onClick={() => {
                            const newSchedule = [...scheduleData];
                            if (isAvailable) {
                              // Currently available -> make it closed
                              newSchedule[index].morningStatus = 'closed';
                              newSchedule[index].afternoonStatus = 'closed';
                            } else {
                              // Currently closed -> make it available
                              newSchedule[index].morningStatus = 'available';
                              newSchedule[index].afternoonStatus = 'available';
                            }
                            setScheduleData(newSchedule);
                          }}
                          className={`
                            py-4 px-3 rounded-lg border-2 font-semibold text-sm transition-all
                            ${isAvailable
                              ? 'bg-green-50 border-green-500 text-green-700 hover:bg-green-100'
                              : 'bg-gray-50 border-gray-300 text-gray-500 hover:bg-gray-100'}
                          `}
                        >
                          <div className="text-base mb-1">{DAYS_OF_WEEK[index].label}</div>
                          <div className="text-xs">
                            {isAvailable ? '진료' : '휴진'}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600">
                      💡 클릭하여 진료/휴진을 전환할 수 있습니다. 녹색은 진료일, 회색은 휴진일을 나타냅니다.
                    </p>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50"
                >
                  {saving ? '저장 중...' : '저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
