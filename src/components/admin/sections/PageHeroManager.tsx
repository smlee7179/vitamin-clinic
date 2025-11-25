'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

interface PageHeroManagerProps {
  page: string;
  pageName: string;
}

interface PageHero {
  id: string;
  page: string;
  imageUrl: string;
  title: string;
  subtitle: string | null;
}

export default function PageHeroManager({ page, pageName }: PageHeroManagerProps) {
  const [hero, setHero] = useState<PageHero | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHero();
  }, [page]);

  const fetchHero = async () => {
    try {
      const response = await fetch(`/api/page-hero?page=${page}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHero(data);
          setImageUrl(data.imageUrl || '');
          setTitle(data.title || '');
          setSubtitle(data.subtitle || '');
        }
      }
    } catch (error) {
      console.error('Failed to fetch page hero:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/page-hero', {
        method: hero ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: hero?.id,
          page,
          imageUrl,
          title,
          subtitle: subtitle || null
        })
      });

      if (response.ok) {
        const data = await response.json();
        setHero(data);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      {imageUrl && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
          <div className="relative w-full h-80 bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
            <div className="absolute inset-0 flex flex-col gap-3 items-start justify-end p-6">
              <h1 className="text-white text-3xl font-bold">{title}</h1>
              {subtitle && (
                <p className="text-white text-base">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">{pageName} 히어로 이미지 설정</h3>

        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          preset="service"
          label="이미지"
          required
          aspectRatio="16/9"
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="페이지 제목을 입력하세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            부제목
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="부제목을 입력하세요 (선택사항)"
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || !imageUrl || !title}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? '저장 중...' : '저장'}
        </button>

        {message && (
          <span className={`text-sm font-medium ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">팁</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 이미지는 object-contain으로 표시되어 잘리지 않습니다</li>
              <li>• 배경은 어두운 그라디언트가 자동으로 적용됩니다</li>
              <li>• 텍스트는 왼쪽 하단에 배치됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
