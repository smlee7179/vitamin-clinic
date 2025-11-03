'use client';

import { useState, useEffect } from 'react';

interface MarqueeItem {
  icon: string;
  text: string;
}

interface MarqueeEditorProps {
  onSave?: () => void;
}

export default function MarqueeEditor({ onSave }: MarqueeEditorProps) {
  const [notices, setNotices] = useState<MarqueeItem[]>([
    { icon: '🏥', text: '비타민마취통증의학과의원 홈페이지 오픈하였습니다.' },
    { icon: '📋', text: '진료과목 ) 정형외과, 마취통증의학과, 재활의학과' },
    { icon: '✅', text: '비수술 척추 · 관절 클리닉 통증 치료 전문' },
  ]);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('marqueeNotices');
    if (saved) {
      try {
        setNotices(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load marquee notices');
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('marqueeNotices', JSON.stringify(notices));
    setIsModified(false);
    if (onSave) onSave();
    alert('공지사항이 저장되었습니다!');
  };

  const updateNotice = (index: number, field: 'icon' | 'text', value: string) => {
    const updated = [...notices];
    updated[index][field] = value;
    setNotices(updated);
    setIsModified(true);
  };

  const addNotice = () => {
    setNotices([...notices, { icon: '📌', text: '새로운 공지사항을 입력하세요' }]);
    setIsModified(true);
  };

  const removeNotice = (index: number) => {
    if (notices.length <= 1) {
      alert('최소 1개의 공지사항은 필요합니다.');
      return;
    }
    setNotices(notices.filter((_, i) => i !== index));
    setIsModified(true);
  };

  const emojiOptions = ['🏥', '📋', '✅', '📢', '🎯', '💊', '⚕️', '🏨', '📍', '📞', '⏰', '🚗', '🎉', '💡', '❤️'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">📢</span> 공지사항 슬라이더
          </h3>
          <p className="text-sm text-gray-600 mt-1">상단에 표시되는 스크롤 공지사항을 편집합니다</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addNotice}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <span>➕</span> 추가
          </button>
          {isModified && (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              💾 저장
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {notices.map((notice, index) => (
          <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-1">아이콘</label>
                <select
                  value={notice.icon}
                  onChange={(e) => updateNotice(index, 'icon', e.target.value)}
                  className="text-2xl p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white cursor-pointer"
                >
                  {emojiOptions.map(emoji => (
                    <option key={emoji} value={emoji}>{emoji}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">공지 내용</label>
                <input
                  type="text"
                  value={notice.text}
                  onChange={(e) => updateNotice(index, 'text', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="공지사항을 입력하세요"
                />
              </div>

              <div className="flex-shrink-0 pt-6">
                <button
                  onClick={() => removeNotice(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="삭제"
                >
                  <span className="text-xl">🗑️</span>
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="mt-3 p-3 bg-orange-500 text-white rounded-lg">
              <div className="flex items-center">
                <span className="text-xl mr-2">{notice.icon}</span>
                <span className="text-sm font-medium">{notice.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModified && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ 변경사항이 저장되지 않았습니다. 저장 버튼을 클릭하세요.
          </p>
        </div>
      )}
    </div>
  );
}
