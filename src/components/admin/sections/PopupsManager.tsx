'use client';

import { useEffect, useState } from 'react';

interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  active: boolean;
  showDoNotShow: boolean;
  startDate: string | null;
  endDate: string | null;
  order: number;
  createdAt: string;
}

export default function PopupsManager() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    active: true,
    showDoNotShow: true,
    startDate: '',
    endDate: '',
    order: 0,
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
    setSaving(true);
    setMessage('');

    if (!formData.title || !formData.content) {
      setMessage('✗ 제목과 내용을 입력해주세요.');
      setSaving(false);
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
        setMessage('✓ 저장되었습니다.');
        setTimeout(() => setMessage(''), 3000);
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
          order: 0,
        });
        fetchPopups();
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
      order: popup.order,
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
        setMessage('✓ 삭제되었습니다.');
        setTimeout(() => setMessage(''), 3000);
        fetchPopups();
      } else {
        setMessage('✗ 삭제 실패');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('✗ 삭제 중 오류 발생');
      setTimeout(() => setMessage(''), 3000);
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

  const stats = {
    total: popups.length,
    active: popups.filter(p => p.active).length,
    inactive: popups.filter(p => !p.active).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-semibold">전체 팝업</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-semibold">활성 팝업</p>
            <p className="text-3xl font-bold text-green-900 mt-2">{stats.active}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-semibold">비활성 팝업</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.inactive}</p>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
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
              order: 0,
            });
          }}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          새 팝업 만들기
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-orange-50">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingPopup ? '팝업 수정' : '새 팝업 만들기'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="팝업 제목을 입력하세요"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  내용 *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="팝업 내용을 입력하세요"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  이미지 (선택)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                />
                {uploading && <p className="mt-2 text-sm text-orange-500">업로드 중...</p>}
                {formData.imageUrl && (
                  <div className="mt-4">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    시작일 (선택)
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    종료일 (선택)
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  우선순위 (작을수록 먼저 표시)
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  min="0"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-900">활성화</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showDoNotShow}
                    onChange={(e) => setFormData({ ...formData, showDoNotShow: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    "오늘 하루 보지 않기" 옵션 표시
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPopup(null);
                  }}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 font-semibold transition-colors"
                >
                  {editingPopup ? '수정' : '생성'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popups List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">등록된 팝업 목록</h3>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">로딩 중...</p>
          </div>
        ) : popups.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">📭</p>
            <p className="text-gray-600">등록된 팝업이 없습니다.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {popups.map((popup) => (
              <div
                key={popup.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {popup.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        (순서: {popup.order})
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          popup.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {popup.active ? '활성' : '비활성'}
                      </span>
                    </div>
                    <div
                      className="text-sm text-gray-600 mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: popup.content }}
                    />
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
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
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleToggleActive(popup)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition-colors"
                  >
                    {popup.active ? '비활성화' : '활성화'}
                  </button>
                  <button
                    onClick={() => handleEdit(popup)}
                    className="px-4 py-2 rounded-lg border border-orange-200 text-orange-600 text-sm hover:bg-orange-50 transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(popup.id)}
                    className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span>💡</span>
          팝업 관리 안내
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>활성화된 팝업만 홈페이지에 표시됩니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>시작일/종료일을 설정하여 특정 기간에만 팝업을 표시할 수 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>우선순위 숫자가 작을수록 먼저 표시됩니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>"오늘 하루 보지 않기" 옵션을 활성화하면 사용자가 팝업을 숨길 수 있습니다.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
