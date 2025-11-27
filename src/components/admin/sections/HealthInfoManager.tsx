'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

interface HealthInfo {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function HealthInfoManager() {
  const [healthInfos, setHealthInfos] = useState<HealthInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingInfo, setEditingInfo] = useState<HealthInfo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHealthInfos();
  }, []);

  const fetchHealthInfos = async () => {
    try {
      const response = await fetch('/api/health-info');
      if (response.ok) {
        const data = await response.json();
        setHealthInfos(data);
      }
    } catch (error) {
      console.error('Failed to fetch health infos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingInfo({
      id: '',
      title: '',
      content: '',
      category: '💊',
      imageUrl: null,
      createdAt: new Date().toISOString()
    });
    setIsCreating(true);
  };

  const handleEdit = (info: HealthInfo) => {
    setEditingInfo({ ...info });
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingInfo) return;

    setSaving(true);
    setMessage('');

    try {
      const url = '/api/health-info';
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingInfo)
      });

      if (response.ok) {
        await fetchHealthInfos();
        setEditingInfo(null);
        setIsCreating(false);
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

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/health-info?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchHealthInfos();
        setMessage('✓ 삭제되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('✗ 삭제 실패');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (editingInfo) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {isCreating ? '새 건강정보 추가' : '건강정보 수정'}
          </h3>
          <button
            onClick={() => {
              setEditingInfo(null);
              setIsCreating(false);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕ 취소
          </button>
        </div>

        {/* Preview */}
        {editingInfo.imageUrl && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
            <div className="bg-white rounded-xl overflow-hidden max-w-sm mx-auto shadow-lg">
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  src={editingInfo.imageUrl}
                  alt={editingInfo.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4">
                  <span className="text-3xl">{editingInfo.category || 'ℹ️'}</span>
                </div>
                <h3 className="font-bold text-xl text-orange-600 mb-3">
                  {editingInfo.title}
                </h3>
                <div
                  className="text-sm text-gray-700 leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: editingInfo.content }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editingInfo.title}
              onChange={(e) => setEditingInfo({ ...editingInfo, title: e.target.value })}
              placeholder="허리 통증 예방법"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              카테고리 아이콘 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editingInfo.category}
              onChange={(e) => setEditingInfo({ ...editingInfo, category: e.target.value })}
              placeholder="💊"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              이모지를 입력하세요 (예: 💊, 🏥, 💉, 🩺, 📋 등)
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={editingInfo.content}
              onChange={(e) => setEditingInfo({ ...editingInfo, content: e.target.value })}
              placeholder="건강정보 내용을 입력하세요. HTML 태그를 사용할 수 있습니다."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">
              HTML 태그 사용 가능: &lt;p&gt;, &lt;br&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;
            </p>
          </div>

          <ImageUpload
            value={editingInfo.imageUrl || ''}
            onChange={(url) => setEditingInfo({ ...editingInfo, imageUrl: url })}
            preset="default"
            label="이미지 (선택)"
            required={false}
            aspectRatio="16/9"
          />

          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving || !editingInfo.title || !editingInfo.content || !editingInfo.category}
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">건강정보 관리</h3>
          <p className="text-sm text-gray-600 mt-1">총 {healthInfos.length}개의 건강정보</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          새 건강정보 추가
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* List */}
      {healthInfos.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <span className="text-6xl mb-4 block">📚</span>
          <p className="text-gray-500 text-lg">등록된 건강정보가 없습니다.</p>
          <p className="text-sm text-gray-400 mt-2">위의 버튼을 클릭하여 첫 건강정보를 추가해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthInfos.map((info) => (
            <div
              key={info.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {info.imageUrl && (
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={info.imageUrl}
                    alt={info.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{info.category}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 mb-1 line-clamp-2">
                      {info.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date(info.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>

                <div
                  className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4"
                  dangerouslySetInnerHTML={{ __html: info.content }}
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(info)}
                    className="flex-1 px-4 py-2 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(info.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">팁</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 건강정보는 자동으로 최신순으로 정렬됩니다</li>
              <li>• HTML 태그를 사용하여 내용을 풍부하게 작성할 수 있습니다</li>
              <li>• 이미지는 선택사항이며, 없어도 카드가 보기 좋게 표시됩니다</li>
              <li>• 카테고리 아이콘으로 주제를 시각적으로 표현할 수 있습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
