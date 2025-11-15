'use client';

import { useState, useEffect } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQ[] = [
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
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const response = await fetch('/api/faqs');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // API에서 반환된 데이터를 FAQ 형태로 변환
            const faqsData = data.map((item: any) => ({
              question: item.question,
              answer: item.answer
            }));
            setFaqs(faqsData);
          }
        }
      } catch (error) {
        console.error('Error loading FAQs:', error);
        // Keep default FAQs on error
      }
    };

    loadFaqs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section bg-white">
      <div className="container max-w-4xl">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">
            자주 묻는 질문
          </h2>
          <p className="text-body-1 text-neutral-600">
            환자분들이 자주 문의하시는 내용을 정리했습니다
          </p>
        </div>

        {/* FAQ 아코디언 */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-neutral-50 active:bg-neutral-100 transition-colors duration-fast touch-target"
              >
                <span className="text-display-2 text-neutral-900 pr-4">
                  {faq.question}
                </span>
                <span className="text-neutral-400 text-xl flex-shrink-0 transition-transform duration-normal" style={{
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-normal ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 py-4 bg-neutral-50">
                  <p className="text-body-1 text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-body-1 text-neutral-600 mb-4">더 궁금하신 사항이 있으신가요?</p>
          <a
            href="tel:051-469-7581"
            className="btn btn-primary text-lg px-8"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            전화 문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
