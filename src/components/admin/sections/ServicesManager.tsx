'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  iconUrl: string | null;
  order: number;
  active: boolean;
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingService({
      id: '',
      title: '',
      description: '',
      iconUrl: null,
      order: services.length,
      active: true
    });
    setIsCreating(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService({ ...service });
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingService) return;

    setSaving(true);
    setMessage('');

    try {
      const url = '/api/services';
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService)
      });

      if (response.ok) {
        await fetchServices();
        setEditingService(null);
        setIsCreating(false);
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

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchServices();
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

  if (editingService) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {isCreating ? '새 진료 과목 추가' : '진료 과목 수정'}
          </h3>
          <button
            onClick={() => {
              setEditingService(null);
              setIsCreating(false);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕ 취소
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
          <div className="bg-white rounded-xl p-6 max-w-sm mx-auto shadow-sm">
            {editingService.iconUrl && (
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image
                  src={editingService.iconUrl}
                  alt={editingService.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="font-bold text-lg text-gray-900 text-center mb-2">
              {editingService.title}
            </h3>
            <p className="text-sm text-gray-600 text-center">{editingService.description}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              진료 과목명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editingService.title}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
              placeholder="척추 통증 치료"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={editingService.description}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
              placeholder="척추 디스크, 협착증, 측만증 등 척추 관련 통증을 전문적으로 치료합니다."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              아이콘 URL
            </label>
            <input
              type="url"
              value={editingService.iconUrl || ''}
              onChange={(e) => setEditingService({ ...editingService, iconUrl: e.target.value || null })}
              placeholder="https://example.com/icon.svg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              정사각형 비율 권장 (예: 64x64px)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                순서
              </label>
              <input
                type="number"
                value={editingService.order}
                onChange={(e) => setEditingService({ ...editingService, order: parseInt(e.target.value) })}
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
                  checked={editingService.active}
                  onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">과목 표시</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!editingService.title || !editingService.description}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            저장
          </button>
          <button
            onClick={() => {
              setEditingService(null);
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
          <h3 className="text-xl font-bold text-gray-900">진료 과목</h3>
          <p className="text-sm text-gray-600 mt-1">진료안내 페이지에 표시될 진료 과목을 관리합니다</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          + 새 과목
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {services.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">등록된 진료 과목이 없습니다</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            첫 과목 추가하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              {service.iconUrl && (
                <div className="relative w-12 h-12 mb-4">
                  <Image
                    src={service.iconUrl}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 flex-1">{service.title}</h4>
                  <span className="text-xs font-semibold text-gray-500 ml-2">
                    #{service.order}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                {!service.active && (
                  <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                    비활성
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
