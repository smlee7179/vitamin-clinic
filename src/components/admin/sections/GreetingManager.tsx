'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

interface GreetingSection {
  id: string;
  imageUrl: string | null;
  content: string;
  signature: string;
}

export default function GreetingManager() {
  const [greeting, setGreeting] = useState<GreetingSection | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchGreeting();
  }, []);

  const fetchGreeting = async () => {
    try {
      const response = await fetch('/api/greeting');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setGreeting(data);
          setImageUrl(data.imageUrl || '');
          setContent(data.content || '');
          setSignature(data.signature || '');
        }
      }
    } catch (error) {
      console.error('Failed to fetch greeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/greeting', {
        method: greeting ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: greeting?.id,
          imageUrl: imageUrl || null,
          content,
          signature
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGreeting(data);
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
      {(imageUrl || content) && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
          <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto border border-gray-200">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {imageUrl && (
                <div className="w-full md:w-1/3">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt="원장 사진"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">인사말</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{content}</p>
                {signature && (
                  <p className="text-right font-bold text-lg text-gray-900 mt-6">
                    {signature}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">인사말 설정</h3>

        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          preset="gallery"
          label="원장 사진"
          aspectRatio="1/1"
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            인사말 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="안녕하십니까? 비타민마취통증의학과에 오신 것을 진심으로 환영합니다.&#10;&#10;저희 병원은 환자 한 분 한 분의 목소리에 귀 기울이고..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="mt-2 text-sm text-gray-500">
            줄바꿈은 Enter 키를 사용하세요
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            서명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="원장 홍길동"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || !content || !signature}
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
    </div>
  );
}
