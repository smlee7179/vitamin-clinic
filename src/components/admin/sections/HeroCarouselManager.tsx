'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
  aspectRatio?: string | null;
  order: number;
  active: boolean;
}

export default function HeroCarouselManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/hero-slides');
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      }
    } catch (error) {
      console.error('Failed to fetch slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSlide({
      id: '',
      imageUrl: '',
      title: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      order: slides.length,
      active: true
    });
    setIsCreating(true);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide({ ...slide });
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingSlide) return;

    try {
      const url = isCreating ? '/api/hero-slides' : `/api/hero-slides`;
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSlide)
      });

      if (response.ok) {
        await fetchSlides();
        setEditingSlide(null);
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
      const response = await fetch(`/api/hero-slides?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchSlides();
        setMessage('✓ 삭제되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('✗ 삭제 실패');
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    try {
      const response = await fetch('/api/hero-slides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...slide, active: !slide.active })
      });

      if (response.ok) {
        await fetchSlides();
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

  if (editingSlide) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {isCreating ? '새 슬라이드 추가' : '슬라이드 수정'}
          </h3>
          <button
            onClick={() => {
              setEditingSlide(null);
              setIsCreating(false);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕ 취소
          </button>
        </div>

        {/* Preview */}
        {editingSlide.imageUrl && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
            <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={editingSlide.imageUrl}
                alt={editingSlide.title}
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
              <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center p-6">
                <h1 className="text-white text-2xl font-bold whitespace-pre-wrap text-center">{editingSlide.title}</h1>
                {editingSlide.description && (
                  <p className="text-white text-sm whitespace-pre-wrap text-center">{editingSlide.description}</p>
                )}
                {editingSlide.buttonText && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg">
                    {!editingSlide.buttonLink && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                      </svg>
                    )}
                    {editingSlide.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <ImageUpload
            value={editingSlide.imageUrl}
            onChange={(url) => setEditingSlide({ ...editingSlide, imageUrl: url })}
            preset="hero"
            label="이미지"
            required
            aspectRatio={editingSlide.aspectRatio || undefined}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={editingSlide.title}
              onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
              placeholder="환자 중심의 전문적인 치료 (들여쓰기 지원)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 스페이스와 엔터키를 사용하여 들여쓰기와 줄바꿈이 가능합니다
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={editingSlide.description || ''}
              onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
              placeholder="저희는 최신 시설과 따뜻한 마음으로 최상의 의료 서비스를 제공합니다. (들여쓰기 지원)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 스페이스와 엔터키를 사용하여 들여쓰기와 줄바꿈이 가능합니다
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                버튼 타입
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="buttonType"
                    checked={!editingSlide.buttonText}
                    onChange={() => setEditingSlide({ ...editingSlide, buttonText: '', buttonLink: '' })}
                    className="w-4 h-4 text-orange-500"
                  />
                  <span className="text-sm text-gray-700">없음</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="buttonType"
                    checked={editingSlide.buttonText !== '' && !editingSlide.buttonLink}
                    onChange={() => setEditingSlide({ ...editingSlide, buttonText: '전화 상담', buttonLink: '' })}
                    className="w-4 h-4 text-orange-500"
                  />
                  <span className="text-sm text-gray-700">전화 버튼</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="buttonType"
                    checked={editingSlide.buttonText !== '' && editingSlide.buttonLink !== ''}
                    onChange={() => setEditingSlide({ ...editingSlide, buttonText: '자세히 보기', buttonLink: '/contact' })}
                    className="w-4 h-4 text-orange-500"
                  />
                  <span className="text-sm text-gray-700">링크 버튼</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 전화 버튼은 병원 전화번호로 자동 연결되며, 링크 버튼은 원하는 페이지로 이동합니다.
              </p>
            </div>

            {editingSlide.buttonText && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  버튼 텍스트 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingSlide.buttonText || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, buttonText: e.target.value })}
                  placeholder={editingSlide.buttonLink ? '자세히 보기' : '전화 상담'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            )}

            {editingSlide.buttonText && editingSlide.buttonLink !== '' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  버튼 링크 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingSlide.buttonLink || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, buttonLink: e.target.value })}
                  placeholder="/contact 또는 /notices"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 내부 페이지는 /로 시작 (예: /contact), 외부 링크는 https://로 시작
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                순서
              </label>
              <input
                type="number"
                value={editingSlide.order}
                onChange={(e) => setEditingSlide({ ...editingSlide, order: parseInt(e.target.value) })}
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
                  checked={editingSlide.active}
                  onChange={(e) => setEditingSlide({ ...editingSlide, active: e.target.checked })}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">슬라이드 표시</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!editingSlide.imageUrl || !editingSlide.title}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            저장
          </button>
          <button
            onClick={() => {
              setEditingSlide(null);
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
          <h3 className="text-xl font-bold text-gray-900">히어로 캐러셀 슬라이드</h3>
          <p className="text-sm text-gray-600 mt-1">메인 페이지 상단에 표시될 슬라이드를 관리합니다</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          + 새 슬라이드
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {slides.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">등록된 슬라이드가 없습니다</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            첫 슬라이드 추가하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative w-full h-48 bg-gray-900">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                {!slide.active && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                      비활성
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{slide.title}</h4>
                    {slide.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{slide.description}</p>
                    )}
                    {slide.buttonText && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          slide.buttonLink
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {slide.buttonLink ? '🔗 링크 버튼' : '📞 전화 버튼'}
                        </span>
                        <span className="text-xs text-gray-600">"{slide.buttonText}"</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 ml-2">
                    #{slide.order}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => toggleActive(slide)}
                    className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      slide.active
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {slide.active ? '비활성화' : '활성화'}
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
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
