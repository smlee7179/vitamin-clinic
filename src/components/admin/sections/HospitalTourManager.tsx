'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

interface HospitalTour {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
  active: boolean;
}

export default function HospitalTourManager() {
  const [tours, setTours] = useState<HospitalTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState<HospitalTour | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('/api/hospital-tour');
      if (response.ok) {
        const data = await response.json();
        setTours(data);
      }
    } catch (error) {
      console.error('Failed to fetch hospital tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTour({
      id: '',
      title: '',
      imageUrl: '',
      order: tours.length,
      active: true
    });
    setIsCreating(true);
  };

  const handleEdit = (tour: HospitalTour) => {
    setEditingTour({ ...tour });
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingTour) return;

    try {
      const url = '/api/hospital-tour';
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTour)
      });

      if (response.ok) {
        await fetchTours();
        setEditingTour(null);
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
      const response = await fetch(`/api/hospital-tour?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchTours();
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

  if (editingTour) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {isCreating ? '새 이미지 추가' : '이미지 수정'}
          </h3>
          <button
            onClick={() => {
              setEditingTour(null);
              setIsCreating(false);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕ 취소
          </button>
        </div>

        {/* Preview */}
        {editingTour.imageUrl && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
            <div className="bg-white rounded-xl overflow-hidden max-w-sm mx-auto shadow-sm">
              <div className="relative w-full aspect-video bg-gray-200">
                <Image
                  src={editingTour.imageUrl}
                  alt={editingTour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-gray-900">
                  {editingTour.title}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editingTour.title}
              onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })}
              placeholder="대기실"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <ImageUpload
            value={editingTour.imageUrl}
            onChange={(url) => setEditingTour({ ...editingTour, imageUrl: url })}
            preset="service"
            label="이미지"
            required
            aspectRatio="16/9"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                순서
              </label>
              <input
                type="number"
                value={editingTour.order}
                onChange={(e) => setEditingTour({ ...editingTour, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                활성화
              </label>
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingTour.active}
                  onChange={(e) => setEditingTour({ ...editingTour, active: e.target.checked })}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">이미지 표시</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!editingTour.title || !editingTour.imageUrl}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            저장
          </button>
          <button
            onClick={() => {
              setEditingTour(null);
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
          <h3 className="text-xl font-bold text-gray-900">병원 둘러보기</h3>
          <p className="text-sm text-gray-600 mt-1">병원소개 페이지에 표시될 시설 이미지를 관리합니다</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          + 새 이미지
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {tours.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">등록된 이미지가 없습니다</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            첫 이미지 추가하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-video bg-gray-200">
                <Image
                  src={tour.imageUrl}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
                {!tour.active && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                      비활성
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 flex-1">{tour.title}</h4>
                  <span className="text-xs font-semibold text-gray-500 ml-2">
                    #{tour.order}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(tour)}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
