'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';

interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  order: number;
  active: boolean;
  createdAt: string;
}

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    order: 0,
    active: true,
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/hero-slides?admin=true');
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      } else if (response.status === 500) {
        console.log('데이터베이스 테이블이 생성되지 않았을 수 있습니다. Vercel 배포 후 자동으로 마이그레이션됩니다.');
      }
    } catch (error) {
      console.error('Failed to fetch hero slides:', error);
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
        setFormData({ ...formData, imageUrl: data.url });
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

    if (!formData.imageUrl || !formData.title) {
      alert('이미지와 제목을 입력해주세요.');
      return;
    }

    try {
      const url = '/api/hero-slides';
      const method = editingSlide ? 'PUT' : 'POST';
      const body = editingSlide
        ? { ...formData, id: editingSlide.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(editingSlide ? '슬라이드가 수정되었습니다.' : '슬라이드가 생성되었습니다.');
        setShowForm(false);
        setEditingSlide(null);
        setFormData({
          imageUrl: '',
          title: '',
          description: '',
          buttonText: '',
          buttonLink: '',
          order: 0,
          active: true,
        });
        fetchSlides();
      } else {
        alert('저장 실패');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('저장 중 오류 발생');
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      imageUrl: slide.imageUrl,
      title: slide.title,
      description: slide.description || '',
      buttonText: slide.buttonText || '',
      buttonLink: slide.buttonLink || '',
      order: slide.order,
      active: slide.active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/hero-slides?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        fetchSlides();
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류 발생');
    }
  };

  const handleToggleActive = async (slide: HeroSlide) => {
    try {
      const response = await fetch('/api/hero-slides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...slide,
          active: !slide.active,
        }),
      });

      if (response.ok) {
        fetchSlides();
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
            히어로 슬라이드 관리
          </p>
          <p className="text-gray-600 text-base font-normal leading-normal">
            홈페이지 메인 이미지 슬라이드를 관리합니다.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingSlide(null);
            setFormData({
              imageUrl: '',
              title: '',
              description: '',
              buttonText: '',
              buttonLink: '',
              order: 0,
              active: true,
            });
          }}
          className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-[#f49d25] text-white text-sm font-bold leading-normal shadow-sm hover:bg-[#f49d25]/90 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            add
          </span>
          <span className="truncate">새 슬라이드 추가</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingSlide ? '슬라이드 수정' : '새 슬라이드 만들기'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  이미지 * (권장: 1920x550px)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-[#f8f7f5] focus:outline-none"
                />
                {uploading && <p className="mt-2 text-sm text-[#f49d25]">업로드 중...</p>}
                {formData.imageUrl && (
                  <div className="mt-4">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                  placeholder="환자 중심의 전문적인 치료"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                  placeholder="저희는 최신 시설과 따뜻한 마음으로 최상의 의료 서비스를 제공합니다."
                />
              </div>

              {/* Button Text & Link */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    버튼 텍스트
                  </label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                    placeholder="온라인 예약하기"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    버튼 링크
                  </label>
                  <input
                    type="text"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-[#f8f7f5] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900"
                    placeholder="/contact"
                  />
                </div>
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
                    setEditingSlide(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-900 text-sm font-medium hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#f49d25] text-white text-sm font-bold hover:bg-[#f49d25]/90"
                >
                  {editingSlide ? '수정' : '생성'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slides List */}
      <div className="mt-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">로딩 중...</p>
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600">등록된 슬라이드가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {slide.title}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          순서: {slide.order}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            slide.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {slide.active ? '활성' : '비활성'}
                        </span>
                      </div>
                      {slide.description && (
                        <p className="text-sm text-gray-600 mb-2">{slide.description}</p>
                      )}
                      {slide.buttonText && (
                        <p className="text-xs text-gray-500">
                          버튼: {slide.buttonText} → {slide.buttonLink || '링크 없음'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleToggleActive(slide)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-900 text-xs font-medium hover:bg-gray-100"
                  >
                    {slide.active ? '비활성화' : '활성화'}
                  </button>
                  <button
                    onClick={() => handleEdit(slide)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-900 text-xs font-medium hover:bg-gray-100"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
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
