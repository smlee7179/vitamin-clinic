'use client';

import { useState, useEffect } from 'react';

interface InfoCard {
  id: string;
  title: string;
  content: string;
  icon: string | null;
  order: number;
  active: boolean;
}

export default function InfoCardManager() {
  const [cards, setCards] = useState<InfoCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<InfoCard | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('/api/info-cards');
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      }
    } catch (error) {
      console.error('Failed to fetch info cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCard({
      id: '',
      title: '',
      content: '',
      icon: null,
      order: cards.length,
      active: true
    });
    setIsCreating(true);
  };

  const handleEdit = (card: InfoCard) => {
    setEditingCard({ ...card });
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingCard) return;

    setSaving(true);
    setMessage('');

    try {
      const url = '/api/info-cards';
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCard)
      });

      if (response.ok) {
        await fetchCards();
        setEditingCard(null);
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
      const response = await fetch(`/api/info-cards?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchCards();
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

  if (editingCard) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {isCreating ? '새 안내 카드 추가' : '안내 카드 수정'}
          </h3>
          <button
            onClick={() => {
              setEditingCard(null);
              setIsCreating(false);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕ 취소
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">미리보기</p>
          <div className="bg-white rounded-xl p-6 max-w-sm mx-auto shadow-sm border border-gray-200">
            {editingCard.icon && (
              <div className="text-4xl mb-4 text-center">{editingCard.icon}</div>
            )}
            <h3 className="font-bold text-lg text-gray-900 text-center mb-3">
              {editingCard.title}
            </h3>
            <p className="text-sm text-gray-600 text-center whitespace-pre-wrap">
              {editingCard.content}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editingCard.title}
              onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
              placeholder="진료 예약 안내"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={editingCard.content}
              onChange={(e) => setEditingCard({ ...editingCard, content: e.target.value })}
              placeholder="전화 또는 온라인으로 진료 예약이 가능합니다."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              아이콘 (이모지)
            </label>
            <input
              type="text"
              value={editingCard.icon || ''}
              onChange={(e) => setEditingCard({ ...editingCard, icon: e.target.value || null })}
              placeholder="📅"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              이모지를 입력하세요 (예: 📅, 📞, 📍)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                순서
              </label>
              <input
                type="number"
                value={editingCard.order}
                onChange={(e) => setEditingCard({ ...editingCard, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                활성화
              </label>
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingCard.active}
                  onChange={(e) => setEditingCard({ ...editingCard, active: e.target.checked })}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">카드 표시</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!editingCard.title || !editingCard.content}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            저장
          </button>
          <button
            onClick={() => {
              setEditingCard(null);
              setIsCreating(false);
            }}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">안내 정보 카드</h3>
          <p className="text-sm text-gray-600 mt-1">공지사항 페이지에 표시될 안내 카드를 관리합니다</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          + 새 카드
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {cards.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">등록된 안내 카드가 없습니다</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            첫 카드 추가하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              {card.icon && (
                <div className="text-3xl mb-3 text-center">{card.icon}</div>
              )}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 flex-1 text-center">{card.title}</h4>
                  <span className="text-xs font-semibold text-gray-500 ml-2">
                    #{card.order}
                  </span>
                </div>
                <p className="text-sm text-gray-600 text-center line-clamp-3">{card.content}</p>
                {!card.active && (
                  <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                    비활성
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
