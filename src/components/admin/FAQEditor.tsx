'use client';

import { useState, useEffect } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQEditorProps {
  onSave?: () => void;
}

export default function FAQEditor({ onSave }: FAQEditorProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: '초진 시 필요한 서류가 있나요?',
      answer: '신분증과 건강보험증을 지참해 주시면 됩니다. 타 병원에서 치료 받으신 적이 있다면 관련 기록이나 영상 자료를 가져오시면 진단에 도움이 됩니다.'
    },
    {
      question: '주차가 가능한가요?',
      answer: '네, 건물 지하에 주차장이 있어 편리하게 이용하실 수 있습니다. 주차 공간이 부족한 경우 인근 공영주차장을 이용하실 수 있습니다.'
    },
    {
      question: '예약 없이 방문해도 되나요?',
      answer: '예약 없이도 진료가 가능하지만, 대기 시간이 길어질 수 있습니다. 전화로 미리 예약하시면 더욱 편리하게 진료받으실 수 있습니다.'
    },
  ]);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('faqs');
    if (saved) {
      try {
        setFaqs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load FAQs');
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('faqs', JSON.stringify(faqs));
    setIsModified(false);
    if (onSave) onSave();
    alert('FAQ가 저장되었습니다!');
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
    setIsModified(true);
  };

  const addFAQ = () => {
    setFaqs([...faqs, { question: '새로운 질문', answer: '답변을 입력하세요' }]);
    setIsModified(true);
  };

  const removeFAQ = (index: number) => {
    if (faqs.length <= 1) {
      alert('최소 1개의 FAQ는 필요합니다.');
      return;
    }
    setFaqs(faqs.filter((_, i) => i !== index));
    setIsModified(true);
  };

  const moveFAQ = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === faqs.length - 1)) {
      return;
    }
    const updated = [...faqs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setFaqs(updated);
    setIsModified(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">❓</span> 자주 묻는 질문 (FAQ)
          </h3>
          <p className="text-sm text-gray-600 mt-1">환자들이 자주 문의하는 내용을 편집합니다</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addFAQ}
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
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">Q{index + 1}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveFAQ(index, 'up')}
                    disabled={index === 0}
                    className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-100'}`}
                    title="위로"
                  >
                    ⬆️
                  </button>
                  <button
                    onClick={() => moveFAQ(index, 'down')}
                    disabled={index === faqs.length - 1}
                    className={`p-1 rounded ${index === faqs.length - 1 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-100'}`}
                    title="아래로"
                  >
                    ⬇️
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFAQ(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="삭제"
              >
                <span className="text-xl">🗑️</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">질문</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                  placeholder="질문을 입력하세요"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">답변</label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="답변을 입력하세요"
                />
              </div>

              {/* Preview */}
              <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-white">
                  <div className="font-semibold text-gray-900 text-lg">{faq.question}</div>
                </div>
                <div className="px-6 py-4 bg-gradient-to-br from-orange-50 to-amber-50">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModified && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ 변경사항이 저장되지 않았습니다. 저장 버튼을 클릭하세요.
          </p>
        </div>
      )}
    </div>
  );
}
