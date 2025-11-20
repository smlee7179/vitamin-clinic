'use client';

import { useState, useEffect, useRef } from 'react';
import ModernImageUpload from './ModernImageUpload';
import CompactFontSelector from './CompactFontSelector';
import CompactImagePreset, { ImagePreset } from './CompactImagePreset';
import AccordionSection from './AccordionSection';

// ==================== Type Definitions ====================

interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  secondButtonText?: string;
  secondButtonLink?: string;
  imageUrl: string;
  titleFontSize?: string;
  subtitleFontSize?: string;
  descriptionFontSize?: string;
  addressBadge?: string;
  scrollText?: string;
  stats?: Array<{ icon: string; label: string; value: string }>;
  floatingCard?: { title?: string; weekday?: string; saturday?: string };
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

interface NavigationItem {
  label: string;
  href: string;
}

interface HeaderData {
  hospitalName: string;
  specialty: string;
  phone: string;
  navigationItems: NavigationItem[];
  buttonText: string;
}

// ==================== Main Component ====================


export default function CompleteUnifiedContentManager() {
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Ref for section tabs container for keyboard navigation
  const sectionTabsRef = useRef<HTMLDivElement>(null);

  // Image preset states for different sections
  const [heroImagePreset, setHeroImagePreset] = useState<ImagePreset>('hero');
  const [serviceImagePresets, setServiceImagePresets] = useState<Record<string, ImagePreset>>({});
  const [galleryImagePresets, setGalleryImagePresets] = useState<Record<string, ImagePreset>>({});

  // Section data states
  const [heroData, setHeroData] = useState<HeroData>({
    title: '따뜻한 마음으로 치료하는\n비타민마취통증의학과',
    subtitle: '부산 동구 중앙대로 375 | 051-469-7581\n노인 전문 마취통증의학과, 맞춤 재활 및 통증 치료',
    buttonText: '📞 전화걸기',
    buttonLink: 'tel:051-469-7581',
    secondButtonText: '오시는 길',
    secondButtonLink: '/contact',
    imageUrl: '',
    titleFontSize: 'text-4xl',
    subtitleFontSize: 'text-xl',
    descriptionFontSize: 'text-lg',
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

  const [headerData, setHeaderData] = useState<HeaderData>({
    hospitalName: '비타민마취통증의학과',
    specialty: '노인 전문 마취통증의학과',
    phone: '051-469-7581',
    navigationItems: [
      { label: '병원소개', href: '#about' },
      { label: '진료안내', href: '#services' },
      { label: '치료방법', href: '#treatments' },
      { label: '시설안내', href: '#gallery' },
      { label: '오시는길', href: '#contact' },
    ],
    buttonText: '전화예약',
  });

  // Sections configuration
  const sections = [
    { id: 'header', name: '헤더', icon: '🏷️', description: '상단 헤더 영역' },
    { id: 'hero', name: '메인 히어로', icon: '🏠', description: '메인 페이지 상단 섹션' },
    { id: 'marquee', name: '공지사항 슬라이더', icon: '📢', description: '상단 공지사항 배너' },
    { id: 'features', name: '주요 특징', icon: '⭐', description: '병원의 주요 특징 3가지' },
    { id: 'services', name: '서비스 카드', icon: '💉', description: '주요 진료 서비스' },
    { id: 'gallery', name: '갤러리', icon: '🖼️', description: '병원 이미지 갤러리' },
    { id: 'treatments', name: '치료 방법', icon: '🏥', description: '제공하는 치료 방법' },
    { id: 'faq', name: 'FAQ', icon: '❓', description: '자주 묻는 질문' },
    { id: 'footer', name: '푸터 정보', icon: '📍', description: '병원 연락처 및 정보' },
  ];

  // Ref for scrollable content area
  const contentScrollRef = useRef<HTMLDivElement>(null);

  // beforeunload event listener for unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Load data on section change
  useEffect(() => {
    loadSectionData();
    // Scroll to top when section changes
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  // Keyboard shortcuts and arrow key navigation for tabs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl (Windows/Linux) or Cmd (Mac)
      const isModifierPressed = e.ctrlKey || e.metaKey;

      // Ctrl+S / Cmd+S: Save
      if (isModifierPressed && e.key === 's') {
        e.preventDefault();
        // Only save if not already saving and not loading
        if (saveStatus !== 'saving' && !loading) {
          handleSave();
        }
      }

      // Ctrl+P / Cmd+P: Preview
      if (isModifierPressed && e.key === 'p') {
        e.preventDefault();
        handlePreview();
      }

      // ESC: Cancel editing (scroll to top)
      if (e.key === 'Escape') {
        if (contentScrollRef.current) {
          contentScrollRef.current.scrollTop = 0;
        }
      }

      // Arrow key navigation for section tabs (when focused on a tab)
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && document.activeElement?.hasAttribute('data-section-tab')) {
        e.preventDefault();
        const currentIndex = sections.findIndex(s => s.id === activeSection);
        let newIndex: number;

        if (e.key === 'ArrowLeft') {
          newIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        } else {
          newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
        }

        const newSection = sections[newIndex].id;
        handleSectionChange(newSection);

        // Focus the new tab
        setTimeout(() => {
          const newTab = document.querySelector(`[data-section-tab="${newSection}"]`) as HTMLElement;
          if (newTab) {
            newTab.focus();
          }
        }, 0);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [saveStatus, loading, activeSection, sections]); // Dependencies to ensure we have latest state

  const loadSectionData = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      let endpoint = '';
      let setter: ((data: any) => void) | null = null;

      switch (activeSection) {
        case 'header':
          endpoint = '/api/content?section=header';
          setter = (data: any) => {
            if (data && Object.keys(data).length > 0) {
              setHeaderData(prev => ({ ...prev, ...data }));
            }
          };
          break;
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
            if (data?.services) setServiceCards(data.services);
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
      // Reset unsaved changes flag when data is loaded
      setHasUnsavedChanges(false);
    }
  };

  const handleSectionChange = (newSection: string) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('저장하지 않은 변경사항이 있습니다. 계속하시겠습니까?');
      if (!confirmed) {
        return;
      }
    }
    setActiveSection(newSection);
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    setErrorMessage('');

    try {
      let endpoint = '';
      let body = {};

      switch (activeSection) {
        case 'header':
          endpoint = '/api/content';
          body = { section: 'header', data: headerData };
          break;
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
          body = { section: 'services', data: { services: serviceCards } };
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
      // Reset unsaved changes flag on successful save
      setHasUnsavedChanges(false);
      setTimeout(() => {
        setSaveStatus('idle');
        setErrorMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving:', error);
      setSaveStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '저장 중 오류가 발생했습니다.');
      setTimeout(() => {
        setSaveStatus('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  // ==================== Render Functions ====================

  const renderHeaderEditor = () => (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="헤더 설정 폼">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="header-hospital-name" className="block text-sm font-semibold text-neutral-700 mb-2">
            병원명
          </label>
          <input
            id="header-hospital-name"
            type="text"
            value={headerData.hospitalName}
            onChange={(e) => {
              setHeaderData({ ...headerData, hospitalName: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
            placeholder="비타민마취통증의학과"
            aria-label="병원명 입력"
          />
        </div>
        <div>
          <label htmlFor="header-specialty" className="block text-sm font-semibold text-neutral-700 mb-2">
            전문분야
          </label>
          <input
            id="header-specialty"
            type="text"
            value={headerData.specialty}
            onChange={(e) => {
              setHeaderData({ ...headerData, specialty: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
            placeholder="노인 전문 마취통증의학과"
            aria-label="전문분야 입력"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="header-phone" className="block text-sm font-semibold text-neutral-700 mb-2">
            전화번호
          </label>
          <input
            id="header-phone"
            type="tel"
            value={headerData.phone}
            onChange={(e) => {
              setHeaderData({ ...headerData, phone: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
            placeholder="051-469-7581"
            aria-label="전화번호 입력"
          />
        </div>
        <div>
          <label htmlFor="header-button-text" className="block text-sm font-semibold text-neutral-700 mb-2">
            버튼 텍스트
          </label>
          <input
            id="header-button-text"
            type="text"
            value={headerData.buttonText}
            onChange={(e) => {
              setHeaderData({ ...headerData, buttonText: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
            placeholder="전화예약"
            aria-label="버튼 텍스트 입력"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-3">네비게이션 메뉴</label>
        <div className="space-y-3" role="list" aria-label="네비게이션 메뉴 목록">
          {headerData.navigationItems.map((item, index) => (
            <div key={index} className="flex gap-3 items-center p-4 border-2 border-neutral-200 rounded-xl" role="listitem">
              <div className="flex-1">
                <label htmlFor={`nav-label-${index}`} className="sr-only">
                  메뉴 {index + 1} 이름
                </label>
                <input
                  id={`nav-label-${index}`}
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const updated = [...headerData.navigationItems];
                    updated[index].label = e.target.value;
                    setHeaderData({ ...headerData, navigationItems: updated });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
                  placeholder="메뉴명"
                  aria-label={`메뉴 ${index + 1} 이름`}
                />
              </div>
              <div className="flex-1">
                <label htmlFor={`nav-href-${index}`} className="sr-only">
                  메뉴 {index + 1} 링크
                </label>
                <input
                  id={`nav-href-${index}`}
                  type="text"
                  value={item.href}
                  onChange={(e) => {
                    const updated = [...headerData.navigationItems];
                    updated[index].href = e.target.value;
                    setHeaderData({ ...headerData, navigationItems: updated });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
                  placeholder="#section"
                  aria-label={`메뉴 ${index + 1} 링크 주소`}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const updated = headerData.navigationItems.filter((_, i) => i !== index);
                  setHeaderData({ ...headerData, navigationItems: updated });
                  setHasUnsavedChanges(true);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={headerData.navigationItems.length <= 1}
                aria-label={`메뉴 ${index + 1} 삭제`}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setHeaderData({
              ...headerData,
              navigationItems: [...headerData.navigationItems, { label: '새 메뉴', href: '#new' }]
            });
            setHasUnsavedChanges(true);
          }}
          className="mt-3 w-full px-4 py-3 bg-vitamin-100 text-vitamin-700 rounded-xl hover:bg-vitamin-200 focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2 font-semibold transition-colors"
          aria-label="새 메뉴 항목 추가"
        >
          + 메뉴 추가
        </button>
      </div>
    </form>
  );

  const renderHeroEditor = () => (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="메인 히어로 섹션 폼">
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2" id="hero-image-label">
          배경 이미지
        </label>
        <div aria-labelledby="hero-image-label" aria-describedby="hero-image-description">
          <CompactImagePreset
            preset={heroImagePreset}
            onPresetChange={setHeroImagePreset}
          />
          <ModernImageUpload
            currentImage={heroData.imageUrl}
            onUpload={(url) => {
              setHeroData({ ...heroData, imageUrl: url });
              setHasUnsavedChanges(true);
            }}
            preset={heroImagePreset}
          />
        </div>
        <p id="hero-image-description" className="sr-only">
          메인 페이지 배경으로 사용될 이미지를 업로드하세요
        </p>
      </div>

      <div>
        <label htmlFor="hero-title" className="block text-sm font-semibold text-neutral-700 mb-2">
          메인 제목
        </label>
        <textarea
          id="hero-title"
          value={heroData.title}
          onChange={(e) => {
            setHeroData({ ...heroData, title: e.target.value });
            setHasUnsavedChanges(true);
          }}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
          rows={2}
          placeholder="병원명과 소개 문구"
          aria-label="메인 제목 입력"
        />
        <div className="mt-4">
          <CompactFontSelector
            label="제목 폰트 크기"
            value={heroData.titleFontSize || 'text-4xl'}
            onChange={(value) => {
              setHeroData({ ...heroData, titleFontSize: value });
              setHasUnsavedChanges(true);
            }}
            showPreview={true}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">부제목</label>
        <textarea
          value={heroData.subtitle}
          onChange={(e) => {
            setHeroData({ ...heroData, subtitle: e.target.value });
            setHasUnsavedChanges(true);
          }}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          rows={2}
          placeholder="주소, 전화번호, 전문 분야"
        />
        <div className="mt-4">
          <CompactFontSelector
            label="부제목 폰트 크기"
            value={heroData.subtitleFontSize || 'text-xl'}
            onChange={(value) => {
              setHeroData({ ...heroData, subtitleFontSize: value });
              setHasUnsavedChanges(true);
            }}
            showPreview={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">버튼 1 텍스트</label>
          <input
            type="text"
            value={heroData.buttonText}
            onChange={(e) => {
              setHeroData({ ...heroData, buttonText: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">버튼 1 링크</label>
          <input
            type="text"
            value={heroData.buttonLink}
            onChange={(e) => {
              setHeroData({ ...heroData, buttonLink: e.target.value });
              setHasUnsavedChanges(true);
            }}
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
            onChange={(e) => {
              setHeroData({ ...heroData, secondButtonText: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">버튼 2 링크 (선택)</label>
          <input
            type="text"
            value={heroData.secondButtonLink || ''}
            onChange={(e) => {
              setHeroData({ ...heroData, secondButtonLink: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">주소 배지</label>
        <input
          type="text"
          value={heroData.addressBadge || ''}
          onChange={(e) => {
            setHeroData({ ...heroData, addressBadge: e.target.value });
            setHasUnsavedChanges(true);
          }}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          placeholder="부산 동구 중앙대로 375"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">스크롤 텍스트</label>
        <input
          type="text"
          value={heroData.scrollText || ''}
          onChange={(e) => {
            setHeroData({ ...heroData, scrollText: e.target.value });
            setHasUnsavedChanges(true);
          }}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          placeholder="스크롤하여 더보기"
        />
      </div>

      <AccordionSection title="통계 카드 (3개)" defaultOpen={false}>
        <div className="space-y-3">
          {(heroData.stats || [{ icon: '', label: '', value: '' }, { icon: '', label: '', value: '' }, { icon: '', label: '', value: '' }]).map((stat: any, index: number) => (
            <div key={index} className="grid grid-cols-3 gap-3 p-3 border-2 border-neutral-200 rounded-xl">
              <input
                type="text"
                value={stat.icon}
                onChange={(e) => {
                  const updated = [...(heroData.stats || [])];
                  updated[index] = { ...updated[index], icon: e.target.value };
                  setHeroData({ ...heroData, stats: updated });
                  setHasUnsavedChanges(true);
                }}
                className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
                placeholder="ri-icon-name"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const updated = [...(heroData.stats || [])];
                  updated[index] = { ...updated[index], label: e.target.value };
                  setHeroData({ ...heroData, stats: updated });
                  setHasUnsavedChanges(true);
                }}
                className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
                placeholder="라벨"
              />
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const updated = [...(heroData.stats || [])];
                  updated[index] = { ...updated[index], value: e.target.value };
                  setHeroData({ ...heroData, stats: updated });
                  setHasUnsavedChanges(true);
                }}
                className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
                placeholder="값"
              />
            </div>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="플로팅 카드 (진료시간)" defaultOpen={false}>
        <div className="space-y-3 p-4 border-2 border-neutral-200 rounded-xl">
          <input
            type="text"
            value={heroData.floatingCard?.title || ''}
            onChange={(e) => {
              setHeroData({ ...heroData, floatingCard: { ...heroData.floatingCard, title: e.target.value } });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            placeholder="제목 (예: 진료시간)"
          />
          <input
            type="text"
            value={heroData.floatingCard?.weekday || ''}
            onChange={(e) => {
              setHeroData({ ...heroData, floatingCard: { ...heroData.floatingCard, weekday: e.target.value } });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            placeholder="평일 시간"
          />
          <input
            type="text"
            value={heroData.floatingCard?.saturday || ''}
            onChange={(e) => {
              setHeroData({ ...heroData, floatingCard: { ...heroData.floatingCard, saturday: e.target.value } });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            placeholder="토요일 시간"
          />
        </div>
      </AccordionSection>
    </form>
  );

  const renderMarqueeEditor = () => (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="공지사항 슬라이더 폼">
      {marqueeItems.map((item, index) => (
        <div key={index} className="flex gap-4 items-start p-4 border-2 border-neutral-200 rounded-xl" role="group" aria-label={`공지사항 ${index + 1}`}>
          <label htmlFor={`marquee-icon-${index}`} className="sr-only">
            공지사항 {index + 1} 아이콘
          </label>
          <input
            id={`marquee-icon-${index}`}
            type="text"
            value={item.icon}
            onChange={(e) => {
              const updated = [...marqueeItems];
              updated[index].icon = e.target.value;
              setMarqueeItems(updated);
              setHasUnsavedChanges(true);
            }}
            className="w-20 px-4 py-2 border-2 border-neutral-200 rounded-lg text-center text-2xl focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
            placeholder="📢"
            aria-label={`공지사항 ${index + 1} 아이콘`}
          />
          <label htmlFor={`marquee-text-${index}`} className="sr-only">
            공지사항 {index + 1} 내용
          </label>
          <input
            id={`marquee-text-${index}`}
            type="text"
            value={item.text}
            onChange={(e) => {
              const updated = [...marqueeItems];
              updated[index].text = e.target.value;
              setMarqueeItems(updated);
              setHasUnsavedChanges(true);
            }}
            className="flex-1 px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2"
            placeholder="공지사항 내용"
            aria-label={`공지사항 ${index + 1} 내용`}
          />
          <button
            type="button"
            onClick={() => {
              setMarqueeItems(marqueeItems.filter((_, i) => i !== index));
              setHasUnsavedChanges(true);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={marqueeItems.length <= 1}
            aria-label={`공지사항 ${index + 1} 삭제`}
          >
            삭제
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setMarqueeItems([...marqueeItems, { icon: '📌', text: '새 공지사항' }]);
          setHasUnsavedChanges(true);
        }}
        className="w-full px-4 py-3 bg-vitamin-100 text-vitamin-700 rounded-xl hover:bg-vitamin-200 focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2 font-semibold transition-colors"
        aria-label="새 공지사항 추가"
      >
        + 공지사항 추가
      </button>
    </form>
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
                  setHasUnsavedChanges(true);
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
                  setHasUnsavedChanges(true);
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
                setHasUnsavedChanges(true);
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
      {serviceCards.map((card, index) => {
        const currentPreset = serviceImagePresets[card.id] || 'service';
        return (
          <div key={card.id} className="space-y-4 p-4 border-2 border-neutral-200 rounded-xl">
            <CompactImagePreset
              preset={currentPreset}
              onPresetChange={(preset) => {
                setServiceImagePresets({ ...serviceImagePresets, [card.id]: preset });
              }}
            />
            <ModernImageUpload
              currentImage={card.image}
              onUpload={(url) => {
                const updated = [...serviceCards];
                updated[index].image = url;
                setServiceCards(updated);
                setHasUnsavedChanges(true);
              }}
              preset={currentPreset}
            />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={card.icon}
              onChange={(e) => {
                const updated = [...serviceCards];
                updated[index].icon = e.target.value;
                setServiceCards(updated);
                setHasUnsavedChanges(true);
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
                setHasUnsavedChanges(true);
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
              setHasUnsavedChanges(true);
            }}
            className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            rows={2}
            placeholder="서비스 설명"
          />
          </div>
        );
      })}
    </div>
  );

  const renderGalleryEditor = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {galleryImages.map((image, index) => {
        const currentPreset = galleryImagePresets[image.id] || 'gallery';
        return (
          <div key={image.id} className="space-y-4 p-4 border-2 border-neutral-200 rounded-xl">
            <CompactImagePreset
              preset={currentPreset}
              onPresetChange={(preset) => {
                setGalleryImagePresets({ ...galleryImagePresets, [image.id]: preset });
              }}
            />
            <ModernImageUpload
              currentImage={image.url}
              onUpload={(url) => {
                const updated = [...galleryImages];
                updated[index].url = url;
                setGalleryImages(updated);
                setHasUnsavedChanges(true);
              }}
              preset={currentPreset}
            />

          <input
            type="text"
            value={image.title}
            onChange={(e) => {
              const updated = [...galleryImages];
              updated[index].title = e.target.value;
              setGalleryImages(updated);
              setHasUnsavedChanges(true);
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
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none"
            placeholder="이미지 설명"
          />
          </div>
        );
      })}
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
              setHasUnsavedChanges(true);
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
              setHasUnsavedChanges(true);
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
              setHasUnsavedChanges(true);
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
              setHasUnsavedChanges(true);
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
              setHasUnsavedChanges(true);
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
              setHasUnsavedChanges(true);
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
            onChange={(e) => {
              setFooterData({ ...footerData, hospitalName: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">주소</label>
          <input
            type="text"
            value={footerData.address}
            onChange={(e) => {
              setFooterData({ ...footerData, address: e.target.value });
              setHasUnsavedChanges(true);
            }}
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
            onChange={(e) => {
              setFooterData({ ...footerData, phone: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">팩스</label>
          <input
            type="text"
            value={footerData.fax}
            onChange={(e) => {
              setFooterData({ ...footerData, fax: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">이메일</label>
          <input
            type="email"
            value={footerData.email}
            onChange={(e) => {
              setFooterData({ ...footerData, email: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">진료 시간</label>
        <input
          type="text"
          value={footerData.businessHours}
          onChange={(e) => {
            setFooterData({ ...footerData, businessHours: e.target.value });
            setHasUnsavedChanges(true);
          }}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">카카오톡 링크</label>
          <input
            type="text"
            value={footerData.kakaoLink}
            onChange={(e) => {
              setFooterData({ ...footerData, kakaoLink: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">네이버 링크</label>
          <input
            type="text"
            value={footerData.naverLink}
            onChange={(e) => {
              setFooterData({ ...footerData, naverLink: e.target.value });
              setHasUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">Copyright</label>
        <input
          type="text"
          value={footerData.copyright}
          onChange={(e) => {
            setFooterData({ ...footerData, copyright: e.target.value });
            setHasUnsavedChanges(true);
          }}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-vitamin-500 focus:outline-none"
        />
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'header': return renderHeaderEditor();
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
    <div className="flex flex-col h-screen max-h-screen overflow-hidden" role="main">
      {/* Fixed Header */}
      <header className="flex-none bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border-2 border-vitamin-100 m-6 mb-0">
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2 flex items-center">
          <span className="text-4xl mr-3" aria-hidden="true">📝</span>
          완전 통합 콘텐츠 관리
        </h1>
        <p className="text-neutral-600">
          홈페이지의 모든 콘텐츠를 한 곳에서 관리하세요
        </p>
      </header>

      {/* Fixed Section Tabs - Horizontal Scrollable */}
      <nav
        className="flex-none bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-lg border-2 border-vitamin-100 m-6 my-4"
        aria-label="콘텐츠 섹션 탭"
        ref={sectionTabsRef}
      >
        <div
          className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-vitamin-300 scrollbar-track-vitamin-50 pb-2"
          role="tablist"
          aria-label="콘텐츠 섹션 선택"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionChange(section.id)}
              className={`flex-none flex items-center px-5 py-3 rounded-xl transition-all duration-200 font-semibold whitespace-nowrap focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white shadow-lg scale-105'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-vitamin-50 hover:text-vitamin-600'
              }`}
              role="tab"
              aria-selected={activeSection === section.id}
              aria-controls={`section-panel-${section.id}`}
              title={section.description}
              data-section-tab={section.id}
              tabIndex={activeSection === section.id ? 0 : -1}
            >
              <span className="text-2xl mr-2" aria-hidden="true">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Scrollable Content Area */}
      <div
        ref={contentScrollRef}
        className="flex-1 overflow-y-auto px-6 pb-4 scrollbar-thin scrollbar-thumb-vitamin-300 scrollbar-track-vitamin-50"
        role="tabpanel"
        id={`section-panel-${activeSection}`}
        aria-labelledby={`section-tab-${activeSection}`}
      >
        {/* Status Messages */}
        {saveStatus === 'success' && (
          <div
            className="bg-green-50 border-2 border-green-500 text-green-700 px-6 py-4 rounded-2xl flex items-center animate-fade-in mb-4"
            role="status"
            aria-live="polite"
          >
            <span className="text-2xl mr-3" aria-hidden="true">✅</span>
            <span className="font-semibold">저장 완료! 변경사항이 즉시 반영됩니다.</span>
          </div>
        )}

        {saveStatus === 'error' && (
          <div
            className="bg-red-50 border-2 border-red-500 text-red-700 px-6 py-4 rounded-2xl animate-fade-in mb-4"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3" aria-hidden="true">❌</span>
              <span className="font-semibold">저장 실패</span>
            </div>
            {errorMessage && <p className="text-sm ml-11">{errorMessage}</p>}
          </div>
        )}

        {/* Content Editor */}
        {loading ? (
          <div
            className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-xl border-2 border-vitamin-100 text-center"
            role="status"
            aria-live="polite"
            aria-label="콘텐츠 로딩 중"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vitamin-500 mx-auto mb-4" aria-hidden="true"></div>
            <p className="text-neutral-600">로딩 중...</p>
          </div>
        ) : (
          <section className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-2 border-vitamin-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">
                {sections.find(s => s.id === activeSection)?.name} 편집
              </h2>
              <p className="text-sm text-neutral-600">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </div>

            {renderActiveSection()}
          </section>
        )}
      </div>

      {/* Fixed Footer - Action Buttons */}
      <footer className="flex-none bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border-2 border-vitamin-100 m-6 mt-4">
        {/* Unsaved Changes Indicator */}
        {hasUnsavedChanges && (
          <div
            className="mb-4 px-4 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl flex items-center justify-center gap-2"
            role="status"
            aria-live="polite"
          >
            <span className="text-amber-600 text-xl" aria-hidden="true">⚠️</span>
            <span className="text-amber-800 font-semibold">저장되지 않은 변경사항이 있습니다</span>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handlePreview}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
            aria-label="새 탭에서 미리보기 열기"
          >
            <span className="text-2xl" aria-hidden="true">👁️</span>
            새 탭으로 미리보기
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === 'saving' || loading}
            className={`flex-1 bg-gradient-to-r from-vitamin-500 to-vitamin-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-vitamin-600 hover:to-vitamin-700 focus-visible:ring-2 focus-visible:ring-vitamin-500 focus-visible:ring-offset-2 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              hasUnsavedChanges ? 'ring-4 ring-amber-400 ring-opacity-50 animate-pulse' : ''
            }`}
            aria-label={saveStatus === 'saving' ? '저장 중' : hasUnsavedChanges ? '변경사항 저장하기' : '저장하기'}
            aria-disabled={saveStatus === 'saving' || loading}
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" aria-hidden="true"></div>
                저장 중...
              </>
            ) : (
              <>
                <span className="text-2xl" aria-hidden="true">💾</span>
                저장하기
                {hasUnsavedChanges && <span className="ml-2 text-sm">(변경됨)</span>}
              </>
            )}
          </button>
        </div>

        {/* Keyboard Shortcuts Guide */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 text-center">
            <span className="font-semibold">⌨️ 단축키:</span>
            {' '}
            <kbd className="px-2 py-1 bg-neutral-100 border border-neutral-300 rounded text-xs font-mono">Ctrl+S</kbd>
            {' '}또는{' '}
            <kbd className="px-2 py-1 bg-neutral-100 border border-neutral-300 rounded text-xs font-mono">⌘+S</kbd>
            {' '}저장
            {' '}|{' '}
            <kbd className="px-2 py-1 bg-neutral-100 border border-neutral-300 rounded text-xs font-mono">Ctrl+P</kbd>
            {' '}또는{' '}
            <kbd className="px-2 py-1 bg-neutral-100 border border-neutral-300 rounded text-xs font-mono">⌘+P</kbd>
            {' '}미리보기
            {' '}|{' '}
            <kbd className="px-2 py-1 bg-neutral-100 border border-neutral-300 rounded text-xs font-mono">ESC</kbd>
            {' '}상단으로
          </p>
        </div>
      </footer>
    </div>
  );
}
