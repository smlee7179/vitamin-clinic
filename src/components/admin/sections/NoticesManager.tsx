'use client';

import { useEffect, useState } from 'react';

interface Notice {
  id: string;
  title: string;
  content: string;
  important: boolean;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function NoticesManager() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    important: false,
    category: 'general',
    status: 'published',
  });

  useEffect(() => {
    fetchNotices();
  }, [filterStatus, filterCategory]);

  const fetchNotices = async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterCategory !== 'all') params.append('category', filterCategory);

      const response = await fetch(`/api/notices?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
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
      const url = '/api/notices';
      const method = editingNotice ? 'PUT' : 'POST';
      const body = editingNotice
        ? { ...formData, id: editingNotice.id }
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
        setEditingNotice(null);
        resetForm();
        fetchNotices();
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

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      important: notice.important,
      category: notice.category,
      status: notice.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/notices?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✓ 삭제되었습니다.');
        setTimeout(() => setMessage(''), 3000);
        fetchNotices();
      } else {
        setMessage('✗ 삭제 실패');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('✗ 삭제 중 오류 발생');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      important: false,
      category: 'general',
      status: 'published',
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNotice(null);
    resetForm();
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      general: '일반',
      event: '이벤트',
      notice: '공지',
    };
    return labels[category] || category;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      published: '게시중',
      draft: '임시저장',
    };
    return labels[status] || status;
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">공지사항 관리</h2>
          <p className="text-sm text-gray-600 mt-1">공지사항을 등록하고 관리할 수 있습니다</p>
        </div>
        <button
          onClick={() => {
            setEditingNotice(null);
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          + 새 공지사항 작성
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">
            {editingNotice ? '공지사항 수정' : '새 공지사항 작성'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="공지사항 제목을 입력하세요"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="공지사항 내용을 입력하세요"
              />
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  카테고리
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="general">일반</option>
                  <option value="event">이벤트</option>
                  <option value="notice">공지</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  게시 상태
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="published">게시중</option>
                  <option value="draft">임시저장</option>
                </select>
              </div>
            </div>

            {/* Important */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="important"
                checked={formData.important}
                onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="important" className="text-sm font-medium text-gray-700">
                중요 공지로 설정 (상단 고정)
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? '저장 중...' : editingNotice ? '수정하기' : '등록하기'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              게시 상태
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">전체</option>
              <option value="published">게시중</option>
              <option value="draft">임시저장</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">전체</option>
              <option value="general">일반</option>
              <option value="event">이벤트</option>
              <option value="notice">공지</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {notices.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">등록된 공지사항이 없습니다</p>
            <p className="text-sm">새 공지사항을 작성해보세요</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notices.map((notice) => (
              <div key={notice.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {notice.important && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          중요
                        </span>
                      )}
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {getCategoryLabel(notice.category)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        notice.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {getStatusLabel(notice.status)}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{notice.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{notice.content}</p>
                    <p className="text-xs text-gray-500">
                      작성일: {new Date(notice.createdAt).toLocaleDateString('ko-KR')} {new Date(notice.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
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
    </div>
  );
}
