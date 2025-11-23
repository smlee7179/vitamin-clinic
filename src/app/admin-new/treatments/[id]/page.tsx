'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin-new/AdminLayout';

interface Treatment {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export default function EditTreatmentPage() {
  const router = useRouter();
  const params = useParams();
  const treatmentId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Treatment>({
    id: '',
    title: '',
    description: '',
    icon: '💊',
    features: [''],
  });

  const iconOptions = ['💊', '💉', '🏥', '⚕️', '🩺', '🧬', '🔬', '💪', '🦴', '❤️'];

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await fetch('/api/treatments');
        if (response.ok) {
          const treatments = await response.json();
          const treatment = treatments.find((t: Treatment) => t.id === treatmentId);

          if (treatment) {
            setFormData({
              id: treatment.id,
              title: treatment.title,
              description: treatment.description,
              icon: treatment.icon,
              features: treatment.features.length > 0 ? treatment.features : [''],
            });
          } else {
            alert('치료 항목을 찾을 수 없습니다.');
            router.push('/admin-new/treatments');
          }
        } else {
          alert('치료 항목을 불러오는데 실패했습니다.');
          router.push('/admin-new/treatments');
        }
      } catch (error) {
        console.error('Failed to fetch treatment:', error);
        alert('치료 항목을 불러오는 중 오류가 발생했습니다.');
        router.push('/admin-new/treatments');
      } finally {
        setLoading(false);
      }
    };

    if (treatmentId) {
      fetchTreatment();
    }
  }, [treatmentId, router]);

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/treatments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          title: formData.title,
          description: formData.description,
          icon: formData.icon,
          features: formData.features.filter((f) => f.trim() !== ''),
        }),
      });

      if (response.ok) {
        alert('치료가 수정되었습니다.');
        router.push('/admin-new/treatments');
      } else {
        const error = await response.json();
        alert(`오류: ${error.error || '치료 수정에 실패했습니다.'}`);
      }
    } catch (error) {
      console.error('Failed to update treatment:', error);
      alert('치료 수정 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 치료 항목을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/treatments?id=${treatmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('치료가 삭제되었습니다.');
        router.push('/admin-new/treatments');
      } else {
        const error = await response.json();
        alert(`오류: ${error.error || '치료 삭제에 실패했습니다.'}`);
      }
    } catch (error) {
      console.error('Failed to delete treatment:', error);
      alert('치료 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-600 dark:text-gray-400">로딩 중...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-gray-900 dark:text-gray-100 text-3xl font-bold tracking-tight">
          치료 수정
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
          치료 항목 내용을 수정합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              치료명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
              placeholder="예: 통증 클리닉"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              아이콘 선택
            </label>
            <div className="flex flex-wrap gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`w-12 h-12 text-2xl rounded-lg border-2 transition-colors ${
                    formData.icon === icon
                      ? 'border-[#f49d25] bg-[#f49d25]/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#f49d25]/50'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
              placeholder="치료에 대한 간단한 설명을 입력하세요"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              주요 특징
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25]"
                    placeholder={`특징 ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="px-3 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a] transition-colors text-sm"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                add
              </span>
              특징 추가
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            삭제
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-[#f8f7f5] dark:hover:bg-[#1a1a1a] transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-[#f49d25] text-white hover:bg-[#f49d25]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
