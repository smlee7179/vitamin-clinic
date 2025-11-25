'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  preset?: 'hero' | 'service' | 'gallery' | 'default';
  label?: string;
  required?: boolean;
  aspectRatio?: string; // e.g., "16/9", "4/5", "1/1"
}

export default function ImageUpload({
  value,
  onChange,
  preset = 'default',
  label = '이미지',
  required = false,
  aspectRatio
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('이미지 파일만 업로드 가능합니다 (JPG, PNG, WEBP, GIF)');
      return;
    }

    // Validate file size (4MB)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('파일 크기는 4MB 이하여야 합니다');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('preset', preset);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      onChange(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : '업로드 실패');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const presetInfo = {
    hero: { ratio: '4:5', size: '800x1000px' },
    service: { ratio: '16:9', size: '1280x720px' },
    gallery: { ratio: '1:1', size: '800x800px' },
    default: { ratio: '자유', size: '최대 1200x1200px' }
  };

  const info = presetInfo[preset];

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
          <div
            className="relative w-full"
            style={{
              aspectRatio: aspectRatio || (preset === 'hero' ? '4/5' : preset === 'service' ? '16/9' : preset === 'gallery' ? '1/1' : '16/9')
            }}
          >
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            title="이미지 제거"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload Area */}
      {!value && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
            dragActive
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center text-center">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-sm font-medium text-gray-700">업로드 중...</p>
              </>
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  이미지를 드래그하거나 클릭하여 업로드
                </p>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors mb-3"
                >
                  파일 선택
                </button>
                <p className="text-xs text-gray-500">
                  JPG, PNG, WEBP, GIF · 최대 4MB
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  권장 비율: {info.ratio} ({info.size})
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Change Button (when image exists) */}
      {value && !uploading && (
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          이미지 변경
        </button>
      )}

      {/* Hidden file input for change button */}
      {value && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleChange}
          className="hidden"
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          💡 업로드된 이미지는 자동으로 최적화되어 저장됩니다
        </p>
      </div>
    </div>
  );
}
