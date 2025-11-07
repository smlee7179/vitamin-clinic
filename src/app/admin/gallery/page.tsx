'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Image {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

export default function GalleryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'size' | 'name'>('date');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  // Load images
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('📂 Loading images from /api/images...');
      const response = await fetch('/api/images');

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API error:', errorData);
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}: Failed to load images`);
      }

      const data = await response.json();
      console.log('✅ Received data:', data);

      setImages(data.images || []);
    } catch (err) {
      console.error('❌ Load images error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load images';
      setError(errorMessage);
      alert('이미지 로드 실패: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (image: Image) => {
    if (!confirm(`"${image.pathname}"을(를) 삭제하시겠습니까?\n\n⚠️ 이 이미지를 사용 중인 페이지에서는 이미지가 표시되지 않습니다.`)) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/images?url=${encodeURIComponent(image.url)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Remove from list
      setImages(prev => prev.filter(img => img.url !== image.url));
      setSelectedImage(null);

      alert('✅ 이미지가 삭제되었습니다.');
    } catch (err) {
      alert('❌ 삭제 실패: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setDeleting(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('✅ URL이 클립보드에 복사되었습니다.');
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter and sort images
  const filteredImages = images
    .filter(img => {
      if (!searchTerm) return true;
      return img.pathname.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case 'size':
          return b.size - a.size;
        case 'name':
          return a.pathname.localeCompare(b.pathname);
        default:
          return 0;
      }
    });

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-image-2-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">이미지 자료실</h1>
                <p className="text-sm text-gray-500">업로드된 이미지 관리</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/admin"
                className="flex items-center px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                관리자 홈
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats & Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-500">전체 이미지</p>
                <p className="text-2xl font-bold text-gray-900">{images.length}</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <p className="text-sm text-gray-500">총 용량</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatSize(images.reduce((sum, img) => sum + img.size, 0))}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:min-w-[300px]">
                <input
                  type="text"
                  placeholder="파일명 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'size' | 'name')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="date">최신순</option>
                <option value="size">크기순</option>
                <option value="name">이름순</option>
              </select>

              {/* Refresh */}
              <button
                onClick={loadImages}
                disabled={loading}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <i className={`ri-refresh-line ${loading ? 'animate-spin' : ''}`}></i>
                새로고침
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <i className="ri-error-warning-line text-red-500 text-xl mt-0.5"></i>
              <div className="flex-1">
                <p className="font-semibold text-red-800">오류 발생</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">이미지를 불러오는 중...</p>
            </div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-image-line text-5xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? '검색 결과 없음' : '이미지가 없습니다'}
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? '다른 검색어로 시도해보세요.'
                : '관리자 페이지에서 이미지를 업로드하세요.'}
            </p>
          </div>
        ) : (
          /* Image Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.url}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Preview */}
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img
                    src={image.url}
                    alt={image.pathname}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <i className="ri-eye-line text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 truncate mb-2" title={image.pathname}>
                    {image.pathname}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatSize(image.size)}</span>
                    <span>{new Date(image.uploadedAt).toLocaleDateString('ko-KR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">이미지 상세</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Image */}
            <div className="p-6">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.pathname}
                  className="w-full h-auto"
                />
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">파일명</label>
                  <p className="text-gray-900 break-all">{selectedImage.pathname}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">파일 크기</label>
                    <p className="text-gray-900">{formatSize(selectedImage.size)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">업로드 일시</label>
                    <p className="text-gray-900">{formatDate(selectedImage.uploadedAt)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedImage.url}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                    />
                    <button
                      onClick={() => handleCopyUrl(selectedImage.url)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <i className="ri-file-copy-line"></i>
                      복사
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium text-center flex items-center justify-center gap-2"
                >
                  <i className="ri-external-link-line"></i>
                  새 탭에서 열기
                </a>
                <button
                  onClick={() => handleDelete(selectedImage)}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <i className={`ri-delete-bin-line ${deleting ? 'animate-spin' : ''}`}></i>
                  {deleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
