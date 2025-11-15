'use client';

import { useState, useEffect } from 'react';
import ModernImageUpload from './ModernImageUpload';

// ==================== Type Definitions ====================

interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  secondButtonText?: string;
  secondButtonLink?: string;
  backgroundImage: string;
}

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface MarqueeItem {
  icon: string;
  text: string;
}

interface Treatment {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FooterData {
  hospitalName: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  businessHours: string;
  kakaoLink: string;
  naverLink: string;
  copyright: string;
}

// ==================== Main Component ====================

export default function CompleteUnifiedContentManager() {
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Section data states
  const [heroData, setHeroData] = useState<HeroData>({
    title: '따뜻한 마음으로 치료하는\n비타민마취통증의학과',
    subtitle: '부산 동구 중앙대로 375 | 051-469-7581\n노인 전문 마취통증의학과, 맞춤 재활 및 통증 치료',
    buttonText: '📞 전화걸기',
    buttonLink: 'tel:051-469-7581',
    secondButtonText: '오시는 길',
    secondButtonLink: '/contact',
    backgroundImage: '',
  });

  const [features, setFeatures] = useState<FeatureItem[]>([
    { icon: '⚕️', title: '전문 의료진', description: '풍부한 경험의 전문 의료진이 직접 진료합니다' },
    { icon: '🏥', title: '첨단 장비', description: '최신 의료 장비로 정확한 진단과 치료를 제공합니다' },
    { icon: '💊', title: '맞춤 치료', description: '환자 개개인에 맞는 맞춤형 치료 계획을 수립합니다' },
  ]);

  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([
    { id: '1', title: '통증 치료', description: '만성 통증 전문 치료', icon: '💉', image: '' },
    { id: '2', title: '재활 치료', description: '체계적인 재활 프로그램', icon: '🏃', image: '' },
    { id: '3', title: '물리 치료', description: '최신 물리 치료 장비', icon: '⚡', image: '' },
  ]);

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    { id: '1', url: '', title: '병원 외관', description: '깨끗하고 현대적인 병원 건물' },
    { id: '2', url: '', title: '진료실', description: '쾌적한 진료 환경' },
    { id: '3', url: '', title: '대기실', description: '편안한 대기 공간' },
  ]);

  const [marqueeItems, setMarqueeItems] = useState<MarqueeItem[]>([
    { icon: '🏥', text: '비타민마취통증의학과의원 홈페이지 오픈하였습니다.' },
    { icon: '📋', text: '진료과목 ) 정형외과, 마취통증의학과, 재활의학과' },
    { icon: '✅', text: '비수술 척추 · 관절 클리닉 통증 치료 전문' },
  ]);

  const [treatments, setTreatments] = useState<Treatment[]>([
    { id: '1', title: '척추 통증 치료', description: '비수술적 척추 통증 치료', icon: '🦴' },
    { id: '2', title: '관절 통증 치료', description: '관절염 및 통증 완화', icon: '🦵' },
  ]);

  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: '1', question: '진료 시간은 어떻게 되나요?', answer: '평일 오전 9시부터 오후 6시까지 진료합니다.', category: '진료' },
    { id: '2', question: '주차는 가능한가요?', answer: '병원 건물 지하에 주차장이 있습니다.', category: '편의' },
  ]);

  const [footerData, setFooterData] = useState<FooterData>({
    hospitalName: '비타민마취통증의학과',
    address: '부산광역시 동구 중앙대로 375',
    phone: '051-469-7581',
    fax: '051-469-7582',
    email: 'info@vitamin-clinic.com',
    businessHours: '평일 09:00-18:00 | 토요일 09:00-13:00',
    kakaoLink: '',
    naverLink: '',
    copyright: '© 2024 비타민마취통증의학과. All rights reserved.',
  });

  // Sections configuration
  const sections = [
    { id: 'hero', name: '메인 히어로', icon: '🏠', description: '메인 페이지 상단 섹션' },
    { id: 'marquee', name: '공지사항 슬라이더', icon: '📢', description: '상단 공지사항 배너' },
    { id: 'features', name: '주요 특징', icon: '⭐', description: '병원의 주요 특징 3가지' },
    { id: 'services', name: '서비스 카드', icon: '💉', description: '주요 진료 서비스' },
    { id: 'gallery', name: '갤러리', icon: '🖼️', description: '병원 이미지 갤러리' },
    { id: 'treatments', name: '치료 방법', icon: '🏥', description: '제공하는 치료 방법' },
    { id: 'faq', name: 'FAQ', icon: '❓', description: '자주 묻는 질문' },
    { id: 'footer', name: '푸터 정보', icon: '📍', description: '병원 연락처 및 정보' },
  ];

  // Load data on section change
  useEffect(() => {
    loadSectionData();
  }, [activeSection]);

  const loadSectionData = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      let endpoint = '';
      let setter: ((data: any) => void) | null = null;

      switch (activeSection) {
        case 'hero':
          endpoint = '/api/content?section=hero';
          setter = (data: any) => {
            if (data && Object.keys(data).length > 0) {
              setHeroData(prev => ({ ...prev, ...data }));
            }
          };
          break;
        case 'features':
          endpoint = '/api/content?section=features';
          setter = (data: any) => {
            if (data?.features) setFeatures(data.features);
          };
          break;
        case 'services':
          endpoint = '/api/content?section=services';
          setter = (data: any) => {
            if (data?.cards) setServiceCards(data.cards);
          };
          break;
        case 'gallery':
          endpoint = '/api/content?section=gallery';
          setter = (data: any) => {
            if (data?.images) setGalleryImages(data.images);
          };
          break;
        case 'marquee':
          endpoint = '/api/marquee';
          setter = (data: any) => {
            if (Array.isArray(data) && data.length > 0) setMarqueeItems(data);
          };
          break;
        case 'treatments':
          endpoint = '/api/treatments';
          setter = (data: any) => {
            if (Array.isArray(data) && data.length > 0) setTreatments(data);
          };
          break;
        case 'faq':
          endpoint = '/api/faqs';
          setter = (data: any) => {
            if (Array.isArray(data) && data.length > 0) setFaqs(data);
          };
          break;
        case 'footer':
          endpoint = '/api/content?section=footer';
          setter = (data: any) => {
            if (data && Object.keys(data).length > 0) {
              setFooterData(prev => ({ ...prev, ...data }));
            }
          };
          break;
      }

      if (endpoint && setter) {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setter(data);
        }
      }
    } catch (error) {
      console.error('Error loading section data:', error);
      setErrorMessage('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    setErrorMessage('');

    try {
      let endpoint = '';
      let body = {};

      switch (activeSection) {
        case 'hero':
          endpoint = '/api/content';
          body = { section: 'hero', data: heroData };
          break;
        case 'features':
          endpoint = '/api/content';
          body = { section: 'features', data: { features } };
          break;
        case 'services':
          endpoint = '/api/content';
          body = { section: 'services', data: { cards: serviceCards } };
          break;
        case 'gallery':
          endpoint = '/api/content';
          body = { section: 'gallery', data: { images: galleryImages } };
          break;
        case 'marquee':
          endpoint = '/api/marquee';
          body = { notices: marqueeItems };
          break;
        case 'treatments':
          endpoint = '/api/treatments';
          body = { treatments };
          break;
        case 'faq':
          endpoint = '/api/faqs';
          body = { faqs };
          break;
        case 'footer':
          endpoint = '/api/content';
          body = { section: 'footer', data: footerData };
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`저장 실패: ${response.status}`);
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving:', error);
      setSaveStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '저장 중 오류가 발생했습니다.');
    }
  };

  // ==================== Render Functions ====================

  const renderHeroEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">배경 이미지</label>
        <ModernImageUpload
          currentImage={heroData.backgroundImage}
          onUpload={(url) => setHeroData({ ...heroData, backgroundImage: url })}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">메인 제목</label>
        <textarea
          value={heroData.title}
          onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          rows={2}
          placeholder="병원명과 소개 문구"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">부제목</label>
        <textarea
          value={heroData.subtitle}
          onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          rows={2}
          placeholder="주소, 전화번호, 전문 분야"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">버튼 1 텍스트</label>
          <input
            type="text"
            value={heroData.buttonText}
            onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">버튼 1 링크</label>
          <input
            type="text"
            value={heroData.buttonLink}
            onChange={(e) => setHeroData({ ...heroData, buttonLink: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">버튼 2 텍스트 (선택)</label>
          <input
            type="text"
            value={heroData.secondButtonText || ''}
            onChange={(e) => setHeroData({ ...heroData, secondButtonText: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">버튼 2 링크 (선택)</label>
          <input
            type="text"
            value={heroData.secondButtonLink || ''}
            onChange={(e) => setHeroData({ ...heroData, secondButtonLink: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  const renderMarqueeEditor = () => (
    <div className="space-y-4">
      {marqueeItems.map((item, index) => (
        <div key={index} className="flex gap-4 items-start p-4 border-2 border-neutral-200 rounded-xl">
          <input
            type="text"
            value={item.icon}
            onChange={(e) => {
              const updated = [...marqueeItems];
              updated[index].icon = e.target.value;
              setMarqueeItems(updated);
            }}
            className="w-20 px-4 py-2 border-2 border-neutral-200 rounded-lg text-center text-2xl"
            placeholder="📢"
          />
          <input
            type="text"
            value={item.text}
            onChange={(e) => {
              const updated = [...marqueeItems];
              updated[index].text = e.target.value;
              setMarqueeItems(updated);
            }}
            className="flex-1 px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            placeholder="공지사항 내용"
          />
          <button
            onClick={() => setMarqueeItems(marqueeItems.filter((_, i) => i !== index))}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            disabled={marqueeItems.length <= 1}
          >
            삭제
          </button>
        </div>
      ))}
      <button
        onClick={() => setMarqueeItems([...marqueeItems, { icon: '📌', text: '새 공지사항' }])}
        className="w-full px-4 py-3 bg-vitamin-100 text-vitamin-700 rounded-xl hover:bg-vitamin-200 font-semibold"
      >
        + 공지사항 추가
      </button>
    </div>
  );

  const renderFeaturesEditor = () => (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="p-4 border-2 border-neutral-200 rounded-xl space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">아이콘</label>
              <input
                type="text"
                value={feature.icon}
                onChange={(e) => {
                  const updated = [...features];
                  updated[index].icon = e.target.value;
                  setFeatures(updated);
                }}
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg text-center text-2xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">제목</label>
              <input
                type="text"
                value={feature.title}
                onChange={(e) => {
                  const updated = [...features];
                  updated[index].title = e.target.value;
                  setFeatures(updated);
                }}
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">설명</label>
            <textarea
              value={feature.description}
              onChange={(e) => {
                const updated = [...features];
                updated[index].description = e.target.value;
                setFeatures(updated);
              }}
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderServicesEditor = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {serviceCards.map((card, index) => (
        <div key={card.id} className="space-y-4 p-4 border-2 border-neutral-200 rounded-xl">
          <ModernImageUpload
            currentImage={card.image}
            onUpload={(url) => {
              const updated = [...serviceCards];
              updated[index].image = url;
              setServiceCards(updated);
            }}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={card.icon}
              onChange={(e) => {
                const updated = [...serviceCards];
                updated[index].icon = e.target.value;
                setServiceCards(updated);
              }}
              className="px-3 py-2 border-2 border-neutral-200 rounded-lg text-center text-xl"
              placeholder="💉"
            />
            <input
              type="text"
              value={card.title}
              onChange={(e) => {
                const updated = [...serviceCards];
                updated[index].title = e.target.value;
                setServiceCards(updated);
              }}
              className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
              placeholder="서비스명"
            />
          </div>

          <textarea
            value={card.description}
            onChange={(e) => {
              const updated = [...serviceCards];
              updated[index].description = e.target.value;
              setServiceCards(updated);
            }}
            className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            rows={2}
            placeholder="서비스 설명"
          />
        </div>
      ))}
    </div>
  );

  const renderGalleryEditor = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {galleryImages.map((image, index) => (
        <div key={image.id} className="space-y-4 p-4 border-2 border-neutral-200 rounded-xl">
          <ModernImageUpload
            currentImage={image.url}
            onUpload={(url) => {
              const updated = [...galleryImages];
              updated[index].url = url;
              setGalleryImages(updated);
            }}
          />

          <input
            type="text"
            value={image.title}
            onChange={(e) => {
              const updated = [...galleryImages];
              updated[index].title = e.target.value;
              setGalleryImages(updated);
            }}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            placeholder="이미지 제목"
          />

          <input
            type="text"
            value={image.description}
            onChange={(e) => {
              const updated = [...galleryImages];
              updated[index].description = e.target.value;
              setGalleryImages(updated);
            }}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            placeholder="이미지 설명"
          />
        </div>
      ))}
    </div>
  );

  const renderTreatmentsEditor = () => (
    <div className="space-y-4">
      {treatments.map((treatment, index) => (
        <div key={treatment.id} className="p-4 border-2 border-neutral-200 rounded-xl grid grid-cols-3 gap-4">
          <input
            type="text"
            value={treatment.icon}
            onChange={(e) => {
              const updated = [...treatments];
              updated[index].icon = e.target.value;
              setTreatments(updated);
            }}
            className="px-4 py-2 border-2 border-neutral-200 rounded-lg text-center text-2xl"
          />
          <input
            type="text"
            value={treatment.title}
            onChange={(e) => {
              const updated = [...treatments];
              updated[index].title = e.target.value;
              setTreatments(updated);
            }}
            className="px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
          />
          <input
            type="text"
            value={treatment.description}
            onChange={(e) => {
              const updated = [...treatments];
              updated[index].description = e.target.value;
              setTreatments(updated);
            }}
            className="px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      ))}
    </div>
  );

  const renderFAQEditor = () => (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={faq.id} className="p-4 border-2 border-neutral-200 rounded-xl space-y-3">
          <input
            type="text"
            value={faq.category}
            onChange={(e) => {
              const updated = [...faqs];
              updated[index].category = e.target.value;
              setFaqs(updated);
            }}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            placeholder="카테고리"
          />
          <input
            type="text"
            value={faq.question}
            onChange={(e) => {
              const updated = [...faqs];
              updated[index].question = e.target.value;
              setFaqs(updated);
            }}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none font-semibold"
            placeholder="질문"
          />
          <textarea
            value={faq.answer}
            onChange={(e) => {
              const updated = [...faqs];
              updated[index].answer = e.target.value;
              setFaqs(updated);
            }}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            rows={3}
            placeholder="답변"
          />
        </div>
      ))}
    </div>
  );

  const renderFooterEditor = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">병원명</label>
          <input
            type="text"
            value={footerData.hospitalName}
            onChange={(e) => setFooterData({ ...footerData, hospitalName: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">주소</label>
          <input
            type="text"
            value={footerData.address}
            onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">전화번호</label>
          <input
            type="text"
            value={footerData.phone}
            onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">팩스</label>
          <input
            type="text"
            value={footerData.fax}
            onChange={(e) => setFooterData({ ...footerData, fax: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">이메일</label>
          <input
            type="email"
            value={footerData.email}
            onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">진료 시간</label>
        <input
          type="text"
          value={footerData.businessHours}
          onChange={(e) => setFooterData({ ...footerData, businessHours: e.target.value })}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">카카오톡 링크</label>
          <input
            type="text"
            value={footerData.kakaoLink}
            onChange={(e) => setFooterData({ ...footerData, kakaoLink: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">네이버 링크</label>
          <input
            type="text"
            value={footerData.naverLink}
            onChange={(e) => setFooterData({ ...footerData, naverLink: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">Copyright</label>
        <input
          type="text"
          value={footerData.copyright}
          onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
        />
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero': return renderHeroEditor();
      case 'marquee': return renderMarqueeEditor();
      case 'features': return renderFeaturesEditor();
      case 'services': return renderServicesEditor();
      case 'gallery': return renderGalleryEditor();
      case 'treatments': return renderTreatmentsEditor();
      case 'faq': return renderFAQEditor();
      case 'footer': return renderFooterEditor();
      default: return <div>섹션을 선택하세요</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border-2 border-vitamin-100">
        <h2 className="text-3xl font-extrabold text-neutral-900 mb-2 flex items-center">
          <span className="text-4xl mr-3">📝</span>
          완전 통합 콘텐츠 관리
        </h2>
        <p className="text-neutral-600">
          홈페이지의 모든 콘텐츠를 한 곳에서 관리하세요
        </p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-lg border-2 border-vitamin-100">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-5 py-3 rounded-xl transition-all duration-200 font-semibold ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white shadow-lg scale-105'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-vitamin-50 hover:text-vitamin-600'
              }`}
              title={section.description}
            >
              <span className="text-2xl mr-2">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Status Messages */}
      {saveStatus === 'success' && (
        <div className="bg-green-50 border-2 border-green-500 text-green-700 px-6 py-4 rounded-2xl flex items-center animate-fade-in">
          <span className="text-2xl mr-3">✅</span>
          <span className="font-semibold">저장 완료! 변경사항이 즉시 반영됩니다.</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border-2 border-red-500 text-red-700 px-6 py-4 rounded-2xl animate-fade-in">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-3">❌</span>
            <span className="font-semibold">저장 실패</span>
          </div>
          {errorMessage && <p className="text-sm ml-11">{errorMessage}</p>}
        </div>
      )}

      {/* Content Editor */}
      {loading ? (
        <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-xl border-2 border-vitamin-100 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vitamin-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">로딩 중...</p>
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-neutral-900">
              {sections.find(s => s.id === activeSection)?.name} 편집
            </h3>
            <p className="text-sm text-neutral-600">
              {sections.find(s => s.id === activeSection)?.description}
            </p>
          </div>

          {renderActiveSection()}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="w-full bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-vitamin-600 hover:to-vitamin-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveStatus === 'saving' ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                저장 중...
              </span>
            ) : (
              '💾 저장하기'
            )}
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gradient-to-br from-vitamin-50 via-vitamin-100/50 to-vitamin-50 p-6 rounded-2xl border-l-4 border-vitamin-500">
        <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center">
          <span className="text-2xl mr-2">💡</span> 사용 팁
        </h4>
        <ul className="space-y-2 text-sm text-neutral-700">
          <li className="flex items-start">
            <span className="text-vitamin-500 mr-2">•</span>
            <span>변경사항은 저장하기 버튼을 눌러야 반영됩니다</span>
          </li>
          <li className="flex items-start">
            <span className="text-vitamin-500 mr-2">•</span>
            <span>이미지는 최적화되어 Vercel Blob Storage에 저장됩니다</span>
          </li>
          <li className="flex items-start">
            <span className="text-vitamin-500 mr-2">•</span>
            <span>우측 상단 미리보기 버튼으로 실시간 확인 가능합니다</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
