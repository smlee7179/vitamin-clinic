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
    loadFromDB();
  }, []);

  const loadFromDB = async () => {
    try {
      const response = await fetch('/api/marquee');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setNotices(data.map((item: any) => ({ icon: item.icon, text: item.text })));
        }
      }
    } catch (error) {
      console.error('Failed to load marquee notices from DB:', error);
      // Fallback to localStorage
      const saved = localStorage.getItem('marqueeNotices');
      if (saved) {
        try {
          setNotices(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load marquee notices');
        }
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/marquee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notices }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      // Also save to localStorage for backward compatibility
      localStorage.setItem('marqueeNotices', JSON.stringify(notices));
      setIsModified(false);
      if (onSave) onSave();
      alert('공지사항이 저장되었습니다!');
    } catch (error) {
      console.error('Error saving marquee notices:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
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
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-extrabold text-neutral-900 flex items-center">
            <span className="text-4xl mr-3">📢</span> 공지사항 슬라이더
          </h3>
          <p className="text-base text-neutral-600 mt-2 font-medium">상단에 표시되는 스크롤 공지사항을 편집합니다</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addNotice}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>➕</span> 추가
          </button>
          {isModified && (
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white rounded-xl hover:from-vitamin-600 hover:to-vitamin-700 transition-all duration-200 font-bold shadow-lg shadow-vitamin-500/30 hover:shadow-xl hover:scale-105"
            >
              💾 저장
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {notices.map((notice, index) => (
          <div key={index} className="bg-gradient-to-br from-vitamin-50 via-white to-vitamin-50 p-6 rounded-2xl border-2 border-vitamin-200 shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0">
                <label className="block text-sm font-bold text-neutral-700 mb-2">아이콘</label>
                <select
                  value={notice.icon}
                  onChange={(e) => updateNotice(index, 'icon', e.target.value)}
                  className="text-3xl p-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 bg-white cursor-pointer transition-all"
                >
                  {emojiOptions.map(emoji => (
                    <option key={emoji} value={emoji}>{emoji}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-bold text-neutral-700 mb-2">공지 내용</label>
                <input
                  type="text"
                  value={notice.text}
                  onChange={(e) => updateNotice(index, 'text', e.target.value)}
                  className="w-full px-5 py-3 border-2 border-vitamin-200 rounded-xl focus:ring-4 focus:ring-vitamin-100 focus:border-vitamin-500 font-medium transition-all"
                  placeholder="공지사항을 입력하세요"
                />
              </div>

              <div className="flex-shrink-0 pt-8">
                <button
                  onClick={() => removeNotice(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 border-2 border-transparent hover:border-red-200"
                  title="삭제"
                >
                  <span className="text-2xl">🗑️</span>
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="mt-5 p-4 bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white rounded-xl shadow-lg shadow-vitamin-500/30">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{notice.icon}</span>
                <span className="text-base font-bold">{notice.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModified && (
        <div className="mt-6 p-5 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl shadow-md animate-fade-in">
          <p className="text-base text-yellow-800 font-bold flex items-center">
            <span className="text-2xl mr-3">⚠️</span> 변경사항이 저장되지 않았습니다. 저장 버튼을 클릭하세요.
          </p>
        </div>
      )}
    </div>
  );
}
