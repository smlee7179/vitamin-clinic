'use client';

import { useState } from 'react';

const faqs = [
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
  {
    question: '도수치료는 몇 회 정도 받아야 하나요?',
    answer: '환자분의 상태에 따라 다르지만, 일반적으로 10~20회 정도 받으시는 것을 권장드립니다. 초기 진단 후 개인별 맞춤 치료 계획을 수립해 드립니다.'
  },
  {
    question: '건강보험 적용이 되나요?',
    answer: '대부분의 진료와 치료는 건강보험이 적용됩니다. 다만 일부 비급여 항목이 있을 수 있으니, 자세한 사항은 접수 시 문의해 주시기 바랍니다.'
  },
  {
    question: '치료 기간은 얼마나 걸리나요?',
    answer: '증상과 질환의 정도에 따라 다르지만, 일반적으로 4~12주 정도의 치료 기간이 소요됩니다. 정기적인 진료를 통해 경과를 확인하며 치료 계획을 조정합니다.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            환자분들이 자주 문의하시는 내용을 정리했습니다
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-orange-50 transition-colors"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span className="text-orange-500 text-2xl flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 bg-gradient-to-br from-orange-50 to-amber-50">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">더 궁금하신 사항이 있으신가요?</p>
          <a
            href="tel:051-469-7581"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition-colors"
          >
            <i className="ri-phone-line"></i>
            전화 문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
