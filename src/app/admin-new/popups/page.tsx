'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';

interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  active: boolean;
  showDoNotShow: boolean;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

export default function PopupsPage() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    active: true,
    showDoNotShow: true,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    try {
      const response = await fetch('/api/popups?admin=true');
      if (response.ok) {
        const data = await response.json();
        setPopups(data);
      }
    } catch (error) {
      console.error('Failed to fetch popups:', error);
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

    if (!formData.title || !formData.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      const url = '/api/popups';
      const method = editingPopup ? 'PUT' : 'POST';
      const body = editingPopup
        ? { ...formData, id: editingPopup.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(editingPopup ? '팝업이 수정되었습니다.' : '팝업이 생성되었습니다.');
        setShowForm(false);
        setEditingPopup(null);
        setFormData({
          title: '',
          content: '',
          imageUrl: '',
          active: true,
          showDoNotShow: true,
          startDate: '',
          endDate: '',
        });
        fetchPopups();
      } else {
        alert('저장 실패');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('저장 중 오류 발생');
    }
  };

  const handleEdit = (popup: Popup) => {
    setEditingPopup(popup);
    setFormData({
      title: popup.title,
      content: popup.content,
      imageUrl: popup.imageUrl || '',
      active: popup.active,
      showDoNotShow: popup.showDoNotShow,
      startDate: popup.startDate ? popup.startDate.split('T')[0] : '',
      endDate: popup.endDate ? popup.endDate.split('T')[0] : '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/popups?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        fetchPopups();
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류 발생');
    }
  };

  const handleToggleActive = async (popup: Popup) => {
    try {
      const response = await fetch('/api/popups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...popup,
          active: !popup.active,
        }),
      });

      if (response.ok) {
        fetchPopups();
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
          <p className="text-gray-900 dark:text-gray-100 text-3xl font-bold tracking-tight">
            팝업 관리
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
            홈페이지 팝업을 관리합니다.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingPopup(null);
            setFormData({
              title: '',
              content: '',
              imageUrl: '',
              active: true,
              showDoNotShow: true,
              startDate: '',
              endDate: '',
            });
          }}
          className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-[#f49d25] text-white text-sm font-bold leading-normal shadow-sm hover:bg-[#f49d25]/90 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            add
          </span>
          <span className="truncate">새 팝업 만들기</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#2c2c2c] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {editingPopup ? '팝업 수정' : '새 팝업 만들기'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-[#f8f7f5] dark:bg-[#1a1a1a] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900 dark:text-gray-100"
                  placeholder="팝업 제목을 입력하세요"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  내용 *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-[#f8f7f5] dark:bg-[#1a1a1a] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900 dark:text-gray-100"
                  placeholder="팝업 내용을 입력하세요"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  이미지
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer bg-[#f8f7f5] dark:bg-[#1a1a1a] focus:outline-none"
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

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    시작일
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-[#f8f7f5] dark:bg-[#1a1a1a] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    종료일
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-[#f8f7f5] dark:bg-[#1a1a1a] focus:ring-2 focus:ring-[#f49d25] focus:border-[#f49d25] text-sm text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-[#f49d25] focus:ring-[#f49d25]"
                  />
                  <span className="text-sm text-gray-900 dark:text-gray-100">활성화</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.showDoNotShow}
                    onChange={(e) => setFormData({ ...formData, showDoNotShow: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-[#f49d25] focus:ring-[#f49d25]"
                  />
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    "오늘 하루 보지 않기" 옵션 표시
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPopup(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#f49d25] text-white text-sm font-bold hover:bg-[#f49d25]/90"
                >
                  {editingPopup ? '수정' : '생성'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popups List */}
      <div className="mt-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
          </div>
        ) : popups.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">등록된 팝업이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {popups.map((popup) => (
              <div
                key={popup.id}
                className="bg-white dark:bg-[#2c2c2c] rounded-xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {popup.title}
                      </h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          popup.active
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {popup.active ? '활성' : '비활성'}
                      </span>
                    </div>
                    <div
                      className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: popup.content }}
                    />
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-500">
                      {popup.startDate && (
                        <span>시작: {new Date(popup.startDate).toLocaleDateString('ko-KR')}</span>
                      )}
                      {popup.endDate && (
                        <span>종료: {new Date(popup.endDate).toLocaleDateString('ko-KR')}</span>
                      )}
                      <span>생성: {new Date(popup.createdAt).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>

                  {popup.imageUrl && (
                    <img
                      src={popup.imageUrl}
                      alt={popup.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleToggleActive(popup)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {popup.active ? '비활성화' : '활성화'}
                  </button>
                  <button
                    onClick={() => handleEdit(popup)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(popup.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-900/20"
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
