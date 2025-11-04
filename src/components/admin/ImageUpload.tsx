'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (url: string) => void;
  onDelete?: () => void;
  label?: string;
  maxSize?: number; // in MB
}

export default function ImageUpload({
  currentImage,
  onUpload,
  onDelete,
  label = '이미지 업로드',
  maxSize = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('이미지 파일만 업로드 가능합니다 (JPG, PNG, WebP, GIF)');
      return;
    }

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`파일 크기는 ${maxSize}MB를 초과할 수 없습니다`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '업로드 실패');
      }

      const data = await response.json();
      onUpload(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!preview) return;

    try {
      setPreview(null);
      if (onDelete) {
        onDelete();
      }

      // Optionally delete from server
      if (currentImage && currentImage.startsWith('http')) {
        await fetch(`/api/upload?url=${encodeURIComponent(currentImage)}`, {
          method: 'DELETE',
        });
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="opacity-0 group-hover:opacity-100 bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all"
            >
              변경
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all"
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              <span className="text-sm text-gray-600">업로드 중...</span>
            </>
          ) : (
            <>
              <i className="ri-upload-cloud-line text-4xl text-gray-400"></i>
              <span className="text-sm text-gray-600">클릭하여 이미지 업로드</span>
              <span className="text-xs text-gray-500">JPG, PNG, WebP, GIF (최대 {maxSize}MB)</span>
            </>
          )}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
