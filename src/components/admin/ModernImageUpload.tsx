'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface ModernImageUploadProps {
  currentImage?: string;
  onUpload: (url: string) => void;
  onDelete?: () => void;
  label?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto';
  maxSize?: number; // in MB
  showUrlInput?: boolean;
}

export default function ModernImageUpload({
  currentImage,
  onUpload,
  onDelete,
  label = '이미지',
  aspectRatio = 'auto',
  maxSize = 5,
  showUrlInput = false,
}: ModernImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // currentImage prop이 변경될 때 preview 업데이트
  useEffect(() => {
    console.log('🔄 ModernImageUpload: currentImage changed:', currentImage);
    if (currentImage && currentImage !== preview) {
      setPreview(currentImage);
      console.log('✅ Preview updated to:', currentImage);
    } else if (!currentImage && preview) {
      setPreview(null);
      console.log('🗑️ Preview cleared');
    }
  }, [currentImage]);

  // 종횡비에 따른 컨테이너 클래스
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'landscape':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return 'min-h-[200px]';
    }
  };

  const handleFileChange = async (file: File) => {
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
        const errorMsg = error.details
          ? `${error.error}\n상세: ${error.details}`
          : error.message || error.error || '업로드 실패';
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setPreview(data.url);
      onUpload(data.url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다';
      console.error('Upload error:', errorMessage);
      setError(errorMessage);
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  }, []);

  const handleDelete = async () => {
    if (!preview) return;

    try {
      setPreview(null);
      if (onDelete) {
        onDelete();
      }

      // Delete from server
      if (currentImage && currentImage.startsWith('http')) {
        await fetch(`/api/upload?url=${encodeURIComponent(currentImage)}`, {
          method: 'DELETE',
        });
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  const handleUrlSubmit = (url: string) => {
    if (url) {
      setPreview(url);
      onUpload(url);
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
        </label>
      )}

      <div
        className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${getAspectRatioClass()} ${
          dragActive
            ? 'border-orange-500 bg-orange-50'
            : preview
            ? 'border-gray-200'
            : 'border-dashed border-gray-300 hover:border-orange-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {preview ? (
          <>
            {/* 이미지 미리보기 */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />

            {/* 호버 오버레이 */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-200 ${
                showActions ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-white/90 hover:bg-white text-gray-900 px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <i className="ri-image-edit-line text-lg"></i>
                  변경
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 bg-red-500/90 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                  삭제
                </button>
              </div>
            </div>

            {/* 업로딩 오버레이 */}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-3"></div>
                  <p className="text-white font-medium">업로드 중...</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-8"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                <span className="text-sm font-medium text-gray-600">업로드 중...</span>
              </>
            ) : dragActive ? (
              <>
                <i className="ri-drag-drop-line text-6xl text-orange-500"></i>
                <div className="text-center">
                  <p className="text-base font-semibold text-orange-600 mb-1">
                    여기에 놓아주세요
                  </p>
                  <p className="text-sm text-gray-500">이미지를 업로드합니다</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                  <i className="ri-upload-cloud-2-line text-3xl text-orange-500"></i>
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-700 mb-1">
                    클릭하거나 드래그해서 업로드
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG, WebP, GIF (최대 {maxSize}MB)
                  </p>
                </div>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }}
        className="hidden"
        disabled={uploading}
      />

      {/* URL 입력 옵션 */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="또는 이미지 URL을 입력하세요"
            onBlur={(e) => handleUrlSubmit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUrlSubmit(e.currentTarget.value);
              }
            }}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
          />
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <i className="ri-error-warning-line text-red-500 text-lg mt-0.5"></i>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>
      )}

      {/* 도움말 */}
      {!preview && !error && (
        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <i className="ri-information-line text-blue-500 text-lg mt-0.5"></i>
          <p className="text-xs text-blue-700">
            이미지를 드래그 앤 드롭하거나 클릭하여 업로드하세요.
            업로드된 이미지는 클라우드에 안전하게 저장됩니다.
          </p>
        </div>
      )}
    </div>
  );
}
