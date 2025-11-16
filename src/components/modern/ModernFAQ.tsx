'use client';

import { useState, useEffect } from 'react';

export default function ModernFAQ() {
  const [faqData, setFaqData] = useState([
    {
      id: '1',
      category: '진료',
      question: '예약은 어떻게 하나요?',
      answer: '전화(051-469-7581)로 예약하실 수 있습니다.',
    },
    {
      id: '2',
      category: '진료',
      question: '진료 시간은 어떻게 되나요?',
      answer: '평일 09:00-18:00, 토요일 09:00-13:00입니다. 일요일과 공휴일은 휴진입니다.',
    },
    {
      id: '3',
      category: '치료',
      question: '통증 치료는 어떻게 진행되나요?',
      answer: '환자의 상태를 정확히 진단한 후, 개인별 맞춤 치료 계획을 수립하여 진행합니다.',
    },
  ]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadFaqData = async () => {
      try {
        const response = await fetch('/api/content?section=faq');
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            setFaqData(data);
          }
        }
      } catch (error) {
        console.error('Failed to load FAQ data:', error);
      }
    };
    loadFaqData();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            궁금하신 점을 빠르게 확인하세요.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border-2 border-gray-100 hover:border-orange-200 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full mb-2">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <div
                  className={`flex-shrink-0 w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center ml-4 transition-all duration-300 ${
                    openIndex === index ? 'bg-orange-500 rotate-180' : ''
                  }`}
                >
                  <i className={`ri-arrow-down-s-line text-2xl ${openIndex === index ? 'text-white' : 'text-orange-600'}`}></i>
                </div>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl shadow-orange-500/30">
          <h3 className="text-2xl font-bold mb-3">더 궁금한 점이 있으신가요?</h3>
          <p className="mb-6 opacity-90">전화로 문의하시면 친절하게 안내해드립니다.</p>
          <a
            href="tel:051-469-7581"
            className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <i className="ri-phone-line mr-2 text-xl"></i>
            051-469-7581
          </a>
        </div>
      </div>
    </section>
  );
}
