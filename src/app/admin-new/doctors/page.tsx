'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  photoUrl: string | null;
  education: string;
  career: string;
  order: number;
  active: boolean;
  createdAt: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    specialty: '',
    photoUrl: '',
    education: '',
    career: '',
    order: 0,
    active: true,
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors?admin=true');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', errorData);
        // If it's a database error, show helpful message
        if (response.status === 500) {
          console.log('데이터베이스 테이블이 생성되지 않았을 수 있습니다. Vercel 배포 후 자동으로 마이그레이션됩니다.');
        }
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, photoUrl: data.url });
      } else {
        alert('이미지 업로드 실패');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('이미지 업로드 중 오류 발생');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.title || !formData.specialty) {
      alert('이름, 직책, 전문 분야를 입력해주세요.');
      return;
    }

    try {
      const url = '/api/doctors';
      const method = editingDoctor ? 'PUT' : 'POST';
      const body = editingDoctor
        ? { ...formData, id: editingDoctor.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(editingDoctor ? '의료진 정보가 수정되었습니다.' : '의료진이 추가되었습니다.');
        setShowForm(false);
        setEditingDoctor(null);
        setFormData({
          name: '',
          title: '',
          specialty: '',
          photoUrl: '',
          education: '',
          career: '',
          order: 0,
          active: true,
        });
        fetchDoctors();
      } else {
        alert('저장 실패');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('저장 중 오류 발생');
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      title: doctor.title,
      specialty: doctor.specialty,
      photoUrl: doctor.photoUrl || '',
      education: doctor.education,
      career: doctor.career,
      order: doctor.order,
      active: doctor.active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/doctors?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        fetchDoctors();
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류 발생');
    }
  };

  const handleToggleActive = async (doctor: Doctor) => {
    try {
      const response = await fetch('/api/doctors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...doctor,
          active: !doctor.active,
        }),
      });

      if (response.ok) {
        fetchDoctors();
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  return (
    <AdminLayout>
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-900 text-3xl font-bold tracking-tight">
            의료진 관리
          </p>
          <p className="text-gray-600 text-base font-normal leading-normal">
            병원 의료진 정보를 관리합니다.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingDoctor(null);
            setFormData({
              name: '',
              title: '',
              specialty: '',
              photoUrl: '',
              education: '',
              career: '',
              order: 0,
              active: true,
            });
          }}
          className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-[#f49d25] text-white text-sm font-bold leading-normal shadow-sm hover:bg-[#f49d25]/90 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            add
          </span>
          <span className="truncate">의료진 추가</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingDoctor ? '의료진 수정' : '의료진 추가'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  사진
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-[#f8f7f5] focus:outline-none"
                />
                {uploading && <p className="mt-2 text-sm text-[#f49d25]">업로드 중...</p>}
                {formData.photoUrl && (
                  <div className="mt-4">
                    <img
                      src={formData.photoUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                  </div>
                )}
              </div>

              {/* Name & Title */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    직책 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                    placeholder="원장"
                  />
                </div>
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  전문 분야 *
                </label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                  placeholder="마취통증의학과 전문의"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  학력
                </label>
                <textarea
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                  placeholder="서울대학교 의과대학 졸업&#10;서울대학교병원 인턴&#10;서울대학교병원 마취통증의학과 전공의"
                />
              </div>

              {/* Career */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  경력
                </label>
                <textarea
                  value={formData.career}
                  onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                  placeholder="서울대학교병원 마취통증의학과 임상강사&#10;대한통증학회 정회원&#10;대한마취통증의학회 정회원"
                />
              </div>

              {/* Order & Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    순서
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                    min="0"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-[#f49d25] focus:ring-[#f49d25]"
                    />
                    <span className="text-sm text-gray-900">활성화</span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingDoctor(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-900 text-sm font-medium hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#f49d25] text-white text-sm font-bold hover:bg-[#f49d25]/90"
                >
                  {editingDoctor ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctors List */}
      <div className="mt-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">로딩 중...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600">등록된 의료진이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-start gap-6">
                  {doctor.photoUrl && (
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {doctor.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-600">
                        {doctor.title}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        순서: {doctor.order}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          doctor.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {doctor.active ? '활성' : '비활성'}
                      </span>
                    </div>
                    <p className="text-sm text-[#f49d25] font-medium mb-3">{doctor.specialty}</p>
                    {doctor.education && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">학력:</p>
                        <p className="text-xs text-gray-600 whitespace-pre-line">{doctor.education}</p>
                      </div>
                    )}
                    {doctor.career && (
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">경력:</p>
                        <p className="text-xs text-gray-600 whitespace-pre-line">{doctor.career}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleToggleActive(doctor)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-900 text-xs font-medium hover:bg-gray-100"
                  >
                    {doctor.active ? '비활성화' : '활성화'}
                  </button>
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-900 text-xs font-medium hover:bg-gray-100"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
